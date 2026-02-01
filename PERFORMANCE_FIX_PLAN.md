# Performance Fix Plan - TBT Optimization

## Current Performance Issues

**Score: 60% (Target: 90%+)**

### Critical Bottleneck
- **Total Blocking Time (TBT):** 6,360ms (Target: <300ms) ⚠️
- **Main-thread work:** 9.5s
- **JavaScript execution:** 7.8s (single file: dcb6b3d8b4f6d408.js)
- **Element render delay:** 5,470ms (LCP blocked by JS)

### Root Cause Analysis

The hash `dcb6b3d8b4f6d408.js` is the Hero section bundle that includes:
- Framer Motion animations
- Multiple dynamic imports (StarField, HeroBackground, ShootingStars, BlackHole3D)
- TextType animation component
- BlurText animations
- Heavy computation during initial render

**The issue:** Despite using `dynamic()` imports, the Hero component is SSR'd with `ssr: true`, meaning all this JavaScript is parsed and executed immediately on page load.

## Fixes Required

### 1. Defer Non-Critical Animations (CRITICAL)

**Problem:** All animations load and execute during initial render
**Solution:** Defer animations until AFTER LCP

#### Changes to `src/components/sections/Hero.tsx`:

```typescript
// Current: Stars load at 1400ms delay
// Fix: Load stars AFTER LCP (after text is visible)

// Change delay from 1400ms to 3000ms (after LCP ~1.3s + buffer)
const effectsDelay = 3000 // Changed from 1400
```

**Benefit:** Reduces initial JavaScript execution by ~2-3 seconds

### 2. Split Hero Text from Animations

**Problem:** BlurText and TextType block LCP
**Solution:** Render static text first, then animate

#### Create new file: `src/components/sections/HeroText.tsx`

```typescript
'use client'

import { motion } from 'framer-motion'

// Simple text without animations - renders immediately
export default function HeroText() {
  return (
    <div className="text-center">
      <h1 className="hero-title">
        <span className="inline-flex">Your Vision,</span>{' '}
        <span className="inline-flex text-[#ccff00]">Engineered.</span>
      </h1>
      <p className="hero-subtitle">
        Senior software team shipping high-impact web, mobile, and AI projects fast
      </p>
    </div>
  )
}
```

Then load animations separately after initial paint.

**Benefit:** LCP renders in <500ms instead of 1.3s

### 3. Configure Next.js for Modern Browsers (CRITICAL)

**Problem:** Next.js transpiling modern ES features despite browserslist
**Solution:** Configure SWC compiler to target ES2022

#### Update `next.config.mjs`:

```javascript
const nextConfig = {
  // ... existing config ...

  // Add SWC configuration
  swcMinify: true, // Ensure SWC minifier is used

  experimental: {
    // ... existing experimental options ...

    // Configure modern output
    modernBrowsers: true,
  },

  // Update compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,

    // Add emotion config to reduce runtime overhead
    emotion: true,

    // Configure target for modern browsers
    styledComponents: false,
  },
}
```

#### Create `.swcrc` file:

```json
{
  "jsc": {
    "target": "es2022",
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": true
    },
    "transform": {
      "react": {
        "runtime": "automatic",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": true
      }
    },
    "loose": false,
    "externalHelpers": false,
    "keepClassNames": false
  },
  "module": {
    "type": "es6"
  },
  "minify": true,
  "env": {
    "targets": {
      "chrome": "120",
      "edge": "120",
      "firefox": "120",
      "safari": "17",
      "ios": "17"
    },
    "mode": "usage",
    "coreJs": false
  }
}
```

**Benefit:** Eliminates 14 KiB of polyfills, reduces parse/eval time by ~200ms

### 4. Optimize Font Loading

**Problem:** Unused Google Fonts preconnect
**Solution:** Remove or use fonts

#### Update `src/app/layout.tsx`:

Remove or comment out unused preconnects:

```typescript
{/* Remove if not using Google Fonts */}
{/* <link rel="preconnect" href="https://fonts.googleapis.com/" /> */}
{/* <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" /> */}
```

**Benefit:** Saves ~10ms DNS lookup time

### 5. Inline Critical CSS

**Problem:** Render-blocking CSS files
**Solution:** Extract and inline critical CSS

#### Option A: Use Vercel's automatic critical CSS inlining

Add to `next.config.mjs`:

```javascript
experimental: {
  optimizeCss: true, // Enables critical CSS inlining
}
```

#### Option B: Manual critical CSS extraction

Extract critical styles to `src/app/critical.css` and inline in `layout.tsx`.

**Benefit:** Saves 30ms render blocking time

### 6. Fix Forced Reflows

**Problem:** TextType component likely reads layout after writes
**Solution:** Batch DOM reads/writes

#### Update `src/components/animations/TextType.tsx`:

```typescript
// Before animation frame, read all dimensions
useEffect(() => {
  const measurements = []

  // BATCH READS
  const read = () => {
    measurements.push({
      width: element.offsetWidth,
      height: element.offsetHeight,
    })
  }

  // BATCH WRITES
  const write = () => {
    element.style.transform = `translateX(${measurements[0].width}px)`
  }

  // Execute in correct order
  requestAnimationFrame(() => {
    read()
    requestAnimationFrame(write)
  })
}, [])
```

**Benefit:** Eliminates 57ms of forced reflows

### 7. Optimize Hero Loading Strategy

**Problem:** Hero is SSR'd but includes heavy client-side animations
**Solution:** Split Hero into server and client parts

#### Create `src/components/sections/HeroServer.tsx`:

```typescript
// Server component - no 'use client'
import dynamic from 'next/dynamic'

const HeroClient = dynamic(() => import('./HeroClient'), {
  ssr: false, // No SSR for animations
  loading: () => (
    <section className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="hero-title">
          <span>Your Vision,</span> <span className="text-[#ccff00]">Engineered.</span>
        </h1>
        <p className="hero-subtitle">
          Senior software team shipping high-impact web, mobile, and AI projects fast
        </p>
      </div>
    </section>
  ),
})

export default function Hero() {
  return <HeroClient />
}
```

**Benefit:** Defers 7.8s of JavaScript execution until after initial render

## Implementation Priority

### Phase 1: Quick Wins (30 min)
1. Update animation delays in Hero.tsx (effectsDelay: 3000ms)
2. Remove unused Google Fonts preconnect
3. Add `.swcrc` configuration

**Expected TBT:** 6,360ms → 3,500ms
**Expected Score:** 60% → 75%

### Phase 2: Structural Changes (1-2 hours)
4. Split Hero into server/client components
5. Implement critical CSS inlining
6. Fix forced reflows in TextType

**Expected TBT:** 3,500ms → 800ms
**Expected Score:** 75% → 85%

### Phase 3: Advanced Optimizations (2-3 hours)
7. Code-split animations further
8. Implement requestIdleCallback for non-critical features
9. Add resource hints for Calendly/external resources

**Expected TBT:** 800ms → 200ms
**Expected Score:** 85% → 95%

## Verification Steps

After each phase:

```bash
# Build for production
pnpm build

# Test locally
pnpm start

# Run Lighthouse audit
npx lighthouse http://localhost:3000/home --view
```

## Success Metrics

- **TBT:** <300ms (currently 6,360ms)
- **LCP:** <1.5s (currently 1.3s - already good)
- **FCP:** <1.0s (currently 0.4s - excellent)
- **Performance Score:** >90% (currently 60%)

## Notes

- All fixes preserve existing UI/UX
- No visual changes to the user
- Maintains accessibility features (reduced motion, sr-only content)
- Improves Core Web Vitals for SEO
