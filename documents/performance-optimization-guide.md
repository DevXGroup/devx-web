# Next.js 15 Performance Optimization Guide
## DevX Group - Best Practices & Techniques

*Last Updated: 2025-05-10*

---

## Table of Contents
1. [Testing Performance](#testing-performance)
2. [Canvas & Animation Optimization](#canvas--animation-optimization)
3. [Font Loading Strategies](#font-loading-strategies)
4. [Dynamic Imports & Code Splitting](#dynamic-imports--code-splitting)
5. [Next.js Configuration](#nextjs-configuration)
6. [Framer Motion Optimization](#framer-motion-optimization)
7. [Resource Hints](#resource-hints)
8. [Image Optimization](#image-optimization)
9. [Calendly Scheduling Embed](#calendly-scheduling-embed)
10. [Metrics to Monitor](#metrics-to-monitor)

---

## Testing Performance

### Development vs Production Testing

**⚠️ ALWAYS test performance in production mode**, not development:

```bash
# ❌ DON'T test performance in dev mode
pnpm run dev

# ✅ DO test in production mode
pnpm run build
pnpm run start

# Then test on http://localhost:3000
```

**Why Production Only?**
- Dev mode includes hot reload, source maps, unminified code
- Bundle sizes are 5-10x larger in dev
- No code splitting or tree shaking in dev
- React Strict Mode causes double renders
- Lighthouse/PageSpeed only accurate in production

### Testing Tools

1. **Lighthouse (Chrome DevTools)**
   ```
   1. Build production: pnpm run build && pnpm run start
   2. Open Chrome DevTools (F12)
   3. Go to Lighthouse tab
   4. Select "Performance" + "Desktop/Mobile"
   5. Click "Analyze page load"
   ```

2. **WebPageTest** (https://www.webpagetest.org)
   - More accurate real-world metrics
   - Multiple location testing
   - Filmstrip view for LCP visualization

3. **Vercel Speed Insights** (Already integrated)
   - Real user monitoring (RUM)
   - Deployed site only

---

## Canvas & Animation Optimization

### 1. Reduce Particle/Element Count

**Before:**
```typescript
const stars = Array.from({ length: 150 }, ...)  // ❌ Too many
```

**After:**
```typescript
const stars = Array.from({ length: 80 }, ...)   // ✅ 47% reduction
```

**Guideline:**
- Mobile: 50-80 particles max
- Desktop: 80-150 particles max
- Reduce by 50% for low-end devices

### 2. Optimize Canvas Rendering

**Device Pixel Ratio (DPR) Optimization:**
```typescript
// ❌ Before: Can be 3x on high-DPI displays
const dpr = window.devicePixelRatio || 1

// ✅ After: Cap at 1.5 for better performance
const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
```

**Why?**
- DPR of 3 = 9x more pixels to render
- Capping at 1.5 saves ~75% rendering work on retina displays

### 3. Reduce Update Frequency

**Before:**
```typescript
const updatePercentage = isMobile ? 0.02 : 0.05  // ❌ Updates 2-5% of elements
```

**After:**
```typescript
const updatePercentage = isMobile ? 0.015 : 0.03  // ✅ Updates 1.5-3%
```

**Impact:** 40% fewer DOM updates per frame

### 4. Request Animation Frame Best Practices

```typescript
// ✅ Good: Check for changes before redrawing
const animate = () => {
  const now = Date.now()
  if (now - lastTime >= targetDelay) {
    updateElements()
    drawElements()
    lastTime = now
  }
  requestAnimationFrame(animate)
}

// ❌ Bad: Drawing every frame unconditionally
const animate = () => {
  updateElements()
  drawElements()
  requestAnimationFrame(animate)
}
```

---

## Font Loading Strategies

### Font Display Strategy

**Critical Content (Hero Text):**
```typescript
// ✅ Use 'swap' for LCP elements
const ibmPlexMono = IBM_Plex_Mono({
  display: 'swap',        // Show fallback immediately, swap when loaded
  preload: true,
  adjustFontFallback: true,
})
```

**Non-Critical Content:**
```typescript
// Use 'optional' for below-fold content
const decorativeFont = Local_Font({
  display: 'optional',    // Use fallback if font not loaded in 100ms
})
```

### Reduce Font Weights

**Before:**
```typescript
weight: ['300', '400', '500', '600', '700']  // ❌ 5 weights = 5 file downloads
```

**After:**
```typescript
weight: ['400', '600']  // ✅ 2 weights = 60% smaller bundle
```

**Pro Tip:** Use CSS font-synthesis for missing weights:
```css
.font-light { font-weight: 400; opacity: 0.85; }  /* Simulate 300 */
.font-bold { font-weight: 600; }
.font-extrabold { font-weight: 600; transform: scaleX(1.05); }  /* Simulate 700 */
```

### Font Fallback Optimization

```typescript
// ✅ Always specify fallbacks matching font metrics
fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI']
adjustFontFallback: true  // Next.js adjusts fallback metrics to reduce CLS
```

---

## Dynamic Imports & Code Splitting

### 1. Prioritize Critical Content

**Hero Section (Critical Path):**
```typescript
// ✅ Load synchronously
import Hero from '@sections/Hero'

function HomePage() {
  return <Hero />  // Blocks, but needed for LCP
}
```

**Below-Fold Sections (Non-Critical):**
```typescript
// ✅ Lazy load with no loading state (faster LCP)
const Features = dynamic(() => import('@sections/Features'), {
  ssr: false,
  loading: () => null,  // Don't show spinner, just load when ready
})
```

### 2. requestIdleCallback for Heavy Components

```typescript
useEffect(() => {
  const loadHeavyComponents = () => {
    setShowBackground(true)
  }

  if (window.requestIdleCallback) {
    const idleHandle = requestIdleCallback(loadHeavyComponents, {
      timeout: 2000,  // Force load after 2s even if not idle
    })
  } else {
    // Fallback for Safari
    setTimeout(loadHeavyComponents, 600)
  }
}, [])
```

**Why?**
- Browser loads heavy components when CPU is idle
- LCP-critical content renders first
- Timeout ensures components load even on slow devices

### 3. Webpack Code Splitting Strategy

```javascript
// next.config.mjs
splitChunks: {
  cacheGroups: {
    // Separate chunk for heavy libraries
    three: {
      name: 'three',
      test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
      priority: 30,
      reuseExistingChunk: true,
    },
    // Separate chunk for Framer Motion
    framerMotion: {
      name: 'framer-motion',
      test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
      priority: 30,
    },
  },
}
```

**Benefits:**
- Parallel chunk downloads
- Better caching (vendor code changes less often)
- Smaller initial bundle

---

## Next.js Configuration

### 1. Package Import Optimization

```javascript
// next.config.mjs
experimental: {
  optimizePackageImports: [
    'framer-motion',      // Tree-shake unused animations
    'lucide-react',       // Only import used icons
    '@radix-ui/react-*',  // Reduce Radix bundle
    'three',              // Tree-shake Three.js
    '@react-three/fiber',
    '@react-three/drei',
  ],
}
```

**Impact:** 30-50% smaller bundle for these libraries

### 2. Image Optimization

```javascript
images: {
  unoptimized: false,  // ✅ Enable Next.js optimization
  formats: ['image/avif', 'image/webp'],  // Modern formats
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
}
```

**Usage:**
```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={630}
  priority  // For LCP images
  placeholder="blur"  // Prevent CLS
/>
```

### 3. Webpack Optimization

```javascript
webpack: (config, { dev, isServer }) => {
  if (!dev) {
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',  // Better long-term caching
      runtimeChunk: 'single',      // Shared runtime across pages
      splitChunks: { /* ... */ },
    }
  }
  return config
}
```

---

## Framer Motion Optimization

### 1. Use willChange for Animated Elements

```typescript
// ✅ Tells browser to optimize these properties
<motion.div
  style={{ willChange: 'opacity, transform' }}
  animate={{ opacity: 1, y: 0 }}
/>

// ❌ Browser has to figure out what will change
<motion.div animate={{ opacity: 1, y: 0 }} />
```

### 2. Optimize Animation Variants

**Before:**
```typescript
const variants = {
  visible: {
    transition: {
      staggerChildren: 0.2,    // ❌ Slow, sequential
      delayChildren: 0.1,      // ❌ Delays LCP
    },
  },
}
```

**After:**
```typescript
const variants = {
  visible: {
    transition: {
      staggerChildren: 0.12,   // ✅ 40% faster
      delayChildren: 0,        // ✅ Start immediately
    },
  },
}
```

### 3. Reduce Animation Duration

**User Perception Study Results:**
- 0.2-0.3s: Feels instant
- 0.4-0.5s: Feels smooth
- 0.6s+: Feels slow

```typescript
// ✅ Snappy animations
transition={{ duration: 0.4 }}

// ❌ Feels sluggish
transition={{ duration: 0.8 }}
```

### 4. Use layout="preserve-aspect" Sparingly

```typescript
// ❌ Expensive: Recalculates layout every frame
<motion.div layout />

// ✅ Cheap: Only animates transform/opacity
<motion.div animate={{ x: 100, opacity: 1 }} />
```

---

## Resource Hints

### 1. DNS Prefetch for External Resources

```html
<!-- Resolve DNS early for third-party scripts -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com" />
<link rel="dns-prefetch" href="https://www.google-analytics.com" />
```

**Savings:** 20-120ms DNS lookup time

### 2. Preconnect for Critical Resources

```html
<!-- Establish connection early (DNS + TCP + TLS) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

**Savings:** 100-300ms connection time

### 3. When to Use Each

| Hint | Use For | Savings |
|------|---------|---------|
| `dns-prefetch` | Analytics, ads, optional resources | 20-120ms |
| `preconnect` | Fonts, CDNs, critical API endpoints | 100-300ms |
| `prefetch` | Next page user will likely visit | Full page load |
| `preload` | Critical resources needed for LCP | Prioritizes download |

---

## Logo Optimization (Critical for LCP)

### Why Logo Optimization Matters

The logo is typically one of the first visible elements on your site, often contributing to LCP (Largest Contentful Paint). Optimizing it is critical for performance.

### Implementation

**Before (Regular `<img>` tag):**
```tsx
// ❌ Unoptimized: Large PNG, no modern formats
<img
  src="/images/logos/devx-logo.png"  // 28KB PNG
  alt="DevX Logo"
  width={200}
  height={36}
/>
```

**After (Next.js Image with optimization):**
```tsx
// ✅ Optimized: AVIF/WebP, responsive sizing, compression
import Image from 'next/image'

<Image
  src="/images/logos/devx-logo.png"
  alt="DevX Group LLC"
  width={200}
  height={40}
  priority                      // Preload for LCP
  quality={70}                  // 70% quality (sweet spot)
  sizes="(max-width: 640px) 160px, 200px"
  style={{ height: 'auto', width: 'auto', maxWidth: 200 }}
/>
```

### Key Optimizations Applied

1. **`priority` prop**: Preloads logo, improves LCP
2. **`quality={70}`**: Reduces file size by ~30% with minimal visual difference
3. **Responsive `sizes`**: Serves correct size per device (160px mobile, 200px desktop)
4. **Auto-sizing styles**: Prevents layout shift
5. **Next.js auto-generates**: AVIF (best) → WebP (good) → PNG (fallback)

### Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Desktop** | 28KB PNG | ~4-6KB AVIF | 78-85% smaller |
| **Mobile** | 28KB PNG | ~3-4KB AVIF | 85-90% smaller |
| **Format Support** | PNG only | AVIF/WebP/PNG | 3 formats |
| **LCP Impact** | Delays LCP | Improves LCP | Faster render |

---

## Image Optimization

### 1. Choose the Right Format

| Format | Use Case | Savings vs JPEG |
|--------|----------|-----------------|
| AVIF | Modern browsers, best compression | 50-70% |
| WebP | Fallback for AVIF | 25-35% |
| JPEG | Legacy browsers | Baseline |

### 2. Responsive Images

```tsx
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 80vw,
         1200px"
  priority  // For above-fold images
/>
```

### 3. Lazy Load Below-Fold Images

```tsx
// ✅ Default behavior (good for below-fold)
<Image src="/feature.jpg" width={600} height={400} loading="lazy" />

// ❌ Don't use for LCP image
<Image src="/hero.jpg" width={1200} height={630} loading="lazy" />
```

---

---

## Calendly Scheduling Embed

### Inline Embed Strategy
- Use a direct `<iframe>` sourced with theme parameters instead of injecting `widget.js` at runtime.
- Reserve height with inline styles (e.g., `height: '1000px'`) and wrap in a fixed-height container to prevent CLS.
- Set `loading="lazy"` so the scheduler defers until scrolled into view.
- Provide a descriptive `title` such as `"Schedule a consultation with DevX Group"` for accessibility.

```tsx
const calendlyEmbedUrl =
  'https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=4CD787&embed_type=Inline'

<iframe
  title="Schedule a consultation with DevX Group"
  src={calendlyEmbedUrl}
  loading="lazy"
  className="w-full rounded-xl"
  style={{ minWidth: '320px', height: '1000px', border: 'none', backgroundColor: '#000000' }}
  allow="fullscreen"
/>
```

### Animated Headline Stabilization
- Animation-heavy headings (e.g., `TextPressure`) should size themselves with an isomorphic layout effect to match SSR output.
- Run a follow-up `setSize` inside a short timeout to satisfy Safari's delayed layout reporting.
- The combination keeps the hero text from jumping during hydration while preserving the interactive feel.

---

## Metrics to Monitor

### Core Web Vitals

| Metric | Target | What It Measures | How to Improve |
|--------|--------|------------------|----------------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Time to largest element visible | - Optimize fonts (swap)<br>- Defer heavy JS<br>- Optimize images<br>- Reduce server response time |
| **FID** (First Input Delay) | < 100ms | Time to first interaction | - Reduce JS execution<br>- Code split<br>- Defer non-critical JS |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability | - Set image dimensions<br>- Reserve space for ads<br>- Font fallback matching |
| **FCP** (First Contentful Paint) | < 1.8s | Time to first render | - Inline critical CSS<br>- Reduce render-blocking resources<br>- Fast server response |
| **TBT** (Total Blocking Time) | < 200ms | Main thread blocking | - Code split<br>- Defer heavy operations<br>- Use web workers |

### DevX Group Target Scores

```
Performance:  90+  ✅
Accessibility: 95+  ✅
Best Practices: 95+  ✅
SEO: 100  ✅
```

---

## Quick Reference Checklist

### Before Optimization
- [ ] Test in **production mode** (`pnpm build && pnpm start`)
- [ ] Run Lighthouse baseline score
- [ ] Identify LCP element in Performance tab
- [ ] Check bundle size (`/.next/analyze.html` if using @next/bundle-analyzer)

### Optimization Steps
- [ ] Optimize fonts (swap, reduce weights)
- [ ] Defer non-critical components (requestIdleCallback)
- [ ] Reduce particle counts (50% reduction for mobile)
- [ ] Cap canvas DPR at 1.5
- [ ] Add resource hints (dns-prefetch, preconnect)
- [ ] Optimize images (Next Image, AVIF/WebP)
- [ ] Code split heavy libraries (Three.js, Framer Motion)
- [ ] Add willChange to animated elements
- [ ] Reduce animation durations (0.4s max)

### After Optimization
- [ ] Test in production mode again
- [ ] Verify Lighthouse score improved
- [ ] Check bundle size reduced
- [ ] Test on slow 3G throttling
- [ ] Test on low-end mobile device
- [ ] Verify animations still smooth

---

## Common Pitfalls

### ❌ Don't Do This

```typescript
// 1. Testing performance in dev mode
pnpm run dev  // ❌

// 2. Not capping DPR
const dpr = window.devicePixelRatio  // ❌ Can be 3x

// 3. Animating expensive properties
animate={{ width: '100%', height: '100%' }}  // ❌ Causes reflow

// 4. Loading all fonts weights
weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']  // ❌

// 5. Not deferring heavy components
import ThreeJSScene from './ThreeJSScene'  // ❌ Blocks LCP
```

### ✅ Do This Instead

```typescript
// 1. Test in production
pnpm build && pnpm start  // ✅

// 2. Cap DPR
const dpr = Math.min(window.devicePixelRatio, 1.5)  // ✅

// 3. Animate transform/opacity only
animate={{ x: '100%', opacity: 1 }}  // ✅ GPU accelerated

// 4. Use only needed weights
weight: ['400', '600']  // ✅

// 5. Defer with requestIdleCallback
const ThreeJSScene = dynamic(() => import('./ThreeJSScene'), {
  ssr: false,
  loading: () => null,
})  // ✅
```

---

## Tools & Resources

### Performance Testing
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/) - Chrome DevTools
- [WebPageTest](https://www.webpagetest.org/) - Real-world testing
- [Chrome DevTools Performance Tab](https://developer.chrome.com/docs/devtools/performance/)

### Bundle Analysis
```bash
# Install bundle analyzer
pnpm add -D @next/bundle-analyzer

# Add to next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Run analysis
ANALYZE=true pnpm build
```

### Performance Monitoring
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights) - Real user monitoring
- [Sentry Performance](https://sentry.io/) - Transaction monitoring
- [web-vitals](https://github.com/GoogleChrome/web-vitals) - NPM package

---

## DevX Group Specific Notes

### Current Optimizations Applied (2025-10-02)

1. **Entry Page** (`/src/components/sections/EntryPage.tsx`)
   - Star count: 150 → 80
   - Update frequency: 0.02/0.05 → 0.015/0.03
   - DPR cap: Safari-dependent → 1.5 max

2. **Hero Section** (`/src/components/sections/Hero.tsx`)
   - Background defer: 900ms → 1500ms
   - Animation stagger: 0.2s → 0.12s
   - Item duration: 0.6s → 0.4s

3. **Fonts** (`/src/app/layout.tsx`)
   - Display: optional → swap
   - Weights: 5 → 2 (400, 600)

4. **Config** (`next.config.mjs`)
   - Image optimization: enabled
   - AVIF/WebP formats: enabled
   - Code splitting: vendor + three + framer-motion chunks
   - Package imports: expanded to 6 libraries

5. **Logo Optimization** (`/src/common/Navbar.tsx`, `/src/components/ui/StaggeredMenu.tsx`)
   - Added `quality={70}` for compression
   - Added responsive `sizes` attribute
   - Set proper dimensions and auto-sizing
   - Next.js will auto-generate AVIF/WebP versions
   - Priority preload on navbar logo

6. **JavaScript Bundle Optimization** (`next.config.mjs`, `package.json`)
   - Code splitting: 1 vendor chunk → 13 smaller chunks
   - Tree-shaking enabled with `sideEffects` configuration
   - GTM/GA deferred with `lazyOnload` strategy
   - Vendor chunks capped at 244KB with `maxSize`
   - Three.js split separately with 150KB `maxSize`
   - Added Radix UI to separate chunk

7. **Modern JavaScript Targeting** (`.browserslistrc`, `next.config.mjs`)
   - Target modern browsers only (Chrome 87+, Firefox 78+, Safari 14+)
   - Remove legacy polyfills (~14 KB saved)
   - Use native ES2020+ features (optional chaining, nullish coalescing)
   - Enable SWC compiler (17x faster than Babel)
   - Remove console.log in production

### Expected Results
- LCP: ~2.0s → ~1.2-1.5s (25-40% improvement)
- First Load JS: 585 kB → 532 kB (9% smaller)
- Shared JS: 543 kB → 490 kB (10% smaller)
- Vendor chunks: 1 file → 13 files (better caching, parallel loading)
- Logo size: ~28KB PNG → ~4-10KB AVIF/WebP (65-85% reduction)
- Unused JavaScript: 664 KB → ~300 KB (55% reduction)
- Legacy polyfills: ~14 KB → 0 KB (100% removed)
- Parse/execution time: -30% faster (native vs polyfills)
- Performance Score: 75-80 → 90+

---

*This document is a living guide. Update it as you discover new optimization techniques!*
