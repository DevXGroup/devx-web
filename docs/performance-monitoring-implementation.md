# Performance Monitoring Implementation Guide

Step-by-step guide to integrate performance monitoring into the DevX Group website.

## Quick Implementation (5 minutes)

### Step 1: Add to Root Layout

Add lightweight monitoring to your root layout for global tracking:

```tsx
// src/app/layout.tsx
'use client'

import { usePerformanceMonitorLite } from '@/hooks/use-performance-monitor'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Add this hook at the top of the component
  usePerformanceMonitorLite({
    enableDevLogging: process.env.NODE_ENV === 'development',
    reportToVercel: process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true',
  })

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

### Step 2: Add Debug Panel (Development Only)

For development debugging, add the debug panel:

```tsx
// src/app/layout.tsx
import { PerformanceDebugPanel } from '@/components/debug/PerformanceDebugPanel'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ... existing code

  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === 'development' && <PerformanceDebugPanel />}
      </body>
    </html>
  )
}
```

### Step 3: Verify Setup

1. Run `pnpm dev`
2. Open browser DevTools console
3. You should see performance metrics logged with color-coded ratings
4. In development, you'll see a debug panel in the bottom-right corner

## Advanced Implementation

### Custom Analytics Integration

Send metrics to your own analytics service:

```tsx
// src/app/layout.tsx
'use client'

import { monitorPerformance } from '@/lib/performance-monitor'
import { useEffect } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    monitorPerformance({
      enableDevLogging: process.env.NODE_ENV === 'development',
      reportToVercel: true,
      onMetric: async (metric) => {
        // Send to custom analytics
        try {
          await fetch('/api/analytics/performance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              metric: metric.name,
              value: metric.value,
              rating: metric.rating,
              deviceType: metric.deviceType,
              url: metric.url,
              timestamp: metric.timestamp,
            }),
          })
        } catch (error) {
          console.error('Failed to send performance metric:', error)
        }
      },
    })
  }, [])

  return <html>{children}</html>
}
```

### Google Tag Manager Integration

Push metrics to GTM dataLayer:

```tsx
// src/lib/gtm-performance.ts
import { monitorPerformance } from '@/lib/performance-monitor'

export function initGTMPerformanceTracking() {
  monitorPerformance({
    reportToVercel: true,
    onMetric: (metric) => {
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'web_vital',
          metric_name: metric.name,
          metric_value: metric.value,
          metric_rating: metric.rating,
          metric_delta: metric.delta,
          device_type: metric.deviceType,
          page_url: metric.url,
          connection_type: metric.connection?.effectiveType,
        })
      }
    },
  })
}

// In your layout:
// useEffect(() => { initGTMPerformanceTracking() }, [])
```

### Sentry Integration

Send poor performance metrics to Sentry:

```tsx
// src/lib/sentry-performance.ts
import { monitorPerformance } from '@/lib/performance-monitor'
import * as Sentry from '@sentry/nextjs'

export function initSentryPerformanceTracking() {
  monitorPerformance({
    reportToVercel: true,
    onMetric: (metric) => {
      // Only report poor or needs-improvement metrics
      if (metric.rating === 'poor' || metric.rating === 'needs-improvement') {
        Sentry.captureMessage('Performance Issue', {
          level: metric.rating === 'poor' ? 'warning' : 'info',
          tags: {
            metric: metric.name,
            rating: metric.rating,
            device: metric.deviceType,
            page: metric.url,
          },
          extra: {
            value: metric.value,
            delta: metric.delta,
            connection: metric.connection,
            viewport: metric.viewport,
          },
        })
      }
    },
  })
}
```

### Page-Specific Monitoring

Monitor specific pages with custom thresholds:

```tsx
// src/app/services/page.tsx
'use client'

import { usePerformanceMonitor } from '@/hooks/use-performance-monitor'

export default function ServicesPage() {
  const { lastMetric, getSummary } = usePerformanceMonitor({
    thresholds: {
      // Stricter thresholds for services page
      LCP: { good: 2000, needsImprovement: 3000 },
      CLS: { good: 0.05, needsImprovement: 0.15 },
    },
  })

  return (
    <div>
      {/* Your page content */}
    </div>
  )
}
```

### Performance Dashboard

Create a performance monitoring dashboard:

```tsx
// src/app/admin/performance/page.tsx
'use client'

import { usePerformanceMonitor } from '@/hooks/use-performance-monitor'

export default function PerformanceDashboard() {
  const {
    metrics,
    getSummary,
    areAllMetricsGood,
    getMetricsByRating,
  } = usePerformanceMonitor()

  const summary = getSummary()
  const poorMetrics = getMetricsByRating('poor')
  const needsImprovement = getMetricsByRating('needs-improvement')

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Performance Dashboard</h1>

      {/* Status Overview */}
      <div className="mb-8 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Overall Status</h2>
        <p className={`text-2xl ${areAllMetricsGood() ? 'text-green-600' : 'text-yellow-600'}`}>
          {areAllMetricsGood() ? '✅ All Metrics Good' : '⚠️ Needs Attention'}
        </p>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Total Metrics</p>
            <p className="text-xl font-bold">{metrics.length}</p>
          </div>
          <div>
            <p className="text-gray-600">Poor Metrics</p>
            <p className="text-xl font-bold text-red-600">{poorMetrics.length}</p>
          </div>
          <div>
            <p className="text-gray-600">Needs Improvement</p>
            <p className="text-xl font-bold text-yellow-600">{needsImprovement.length}</p>
          </div>
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(summary).map(([name, data]) => (
          <div
            key={name}
            className={`p-6 rounded-lg border-2 ${
              data.rating === 'good'
                ? 'border-green-500 bg-green-50'
                : data.rating === 'needs-improvement'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-red-500 bg-red-50'
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="text-3xl font-bold mb-1">
              {name === 'CLS' ? data.value.toFixed(4) : `${Math.round(data.value)}ms`}
            </p>
            <p className="text-sm capitalize">{data.rating}</p>
          </div>
        ))}
      </div>

      {/* Recent Metrics Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Metrics</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Metric</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Rating</th>
                <th className="px-4 py-2 text-left">Device</th>
                <th className="px-4 py-2 text-left">Connection</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {metrics.slice(-20).reverse().map((metric, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2 font-semibold">{metric.name}</td>
                  <td className="px-4 py-2">
                    {metric.name === 'CLS'
                      ? metric.value.toFixed(4)
                      : `${Math.round(metric.value)}ms`}
                  </td>
                  <td className={`px-4 py-2 ${getRatingClass(metric.rating)}`}>
                    {metric.rating}
                  </td>
                  <td className="px-4 py-2">{metric.deviceType}</td>
                  <td className="px-4 py-2">{metric.connection?.effectiveType || 'N/A'}</td>
                  <td className="px-4 py-2">
                    {new Date(metric.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function getRatingClass(rating: string) {
  return rating === 'good'
    ? 'text-green-600'
    : rating === 'needs-improvement'
    ? 'text-yellow-600'
    : 'text-red-600'
}
```

## Environment Configuration

Add to your `.env.local`:

```bash
# Enable Vercel Analytics (already configured)
NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=true

# Optional: Custom performance tracking endpoint
NEXT_PUBLIC_PERFORMANCE_API_ENDPOINT=https://your-api.com/performance
```

## Testing the Implementation

### 1. Development Testing

```bash
# Start development server
pnpm dev

# Open browser
# Check console for performance logs
# Look for debug panel in bottom-right corner
```

### 2. Production Testing

```bash
# Build production bundle
pnpm build

# Start production server
pnpm start

# Verify Vercel Analytics receives data
```

### 3. Manual Performance Check

Add this to any page for one-time debugging:

```tsx
import { logPerformanceSnapshot } from '@/lib/performance-monitor'

// In a button click handler or useEffect
logPerformanceSnapshot()
```

## Troubleshooting

### Metrics Not Appearing

1. **Check browser compatibility**: Requires modern browsers with Web Vitals support
2. **Verify client-side rendering**: Ensure `'use client'` directive is present
3. **Check console for errors**: Look for any initialization errors
4. **Verify environment variables**: Ensure `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS` is set

### Duplicate Metrics in Development

This is normal in development due to React Strict Mode. Metrics will be deduplicated in production.

### High Memory Usage

If tracking many metrics in component state:

```tsx
// Use lite version instead
usePerformanceMonitorLite() // No state tracking
```

### Vercel Analytics Not Receiving Data

1. Check environment variable is set to `true`
2. Verify `@vercel/speed-insights` package is installed
3. Check Vercel dashboard for analytics configuration
4. Ensure production build (not development)

## Best Practices

### 1. Use Lite Hook in Layouts

```tsx
// ✅ Recommended
usePerformanceMonitorLite({ reportToVercel: true })

// ❌ Avoid unnecessary state
const { metrics } = usePerformanceMonitor() // Only if you need the data
```

### 2. Sample High-Traffic Pages

```tsx
// Monitor 10% of users
const shouldMonitor = Math.random() < 0.1

if (shouldMonitor) {
  monitorPerformance({ reportToVercel: true })
}
```

### 3. Custom Thresholds for Critical Pages

```tsx
// Stricter thresholds for landing pages
usePerformanceMonitor({
  thresholds: {
    LCP: { good: 2000, needsImprovement: 3000 },
  },
})
```

### 4. Alert on Poor Performance

```tsx
monitorPerformance({
  onMetric: (metric) => {
    if (metric.rating === 'poor') {
      // Send alert
      fetch('/api/alerts/performance', {
        method: 'POST',
        body: JSON.stringify({ metric }),
      })
    }
  },
})
```

## Next Steps

1. Implement basic monitoring in root layout
2. Add debug panel for development
3. Set up custom analytics integration (if needed)
4. Create performance dashboard for monitoring
5. Set up alerts for poor performance
6. Review metrics weekly and optimize

## Related Documentation

- [Performance Monitoring Overview](./performance-monitoring.md)
- [Core Web Vitals - web.dev](https://web.dev/vitals/)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
