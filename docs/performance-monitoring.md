# Performance Monitoring System

Comprehensive Core Web Vitals monitoring and reporting system for the DevX Group website.

## Overview

The performance monitoring system provides:

- **Core Web Vitals Tracking**: FCP, LCP, FID, CLS, TTFB, INP
- **Vercel Analytics Integration**: Automatic reporting to Vercel Speed Insights
- **Development Logging**: Console output with color-coded ratings
- **Device Context**: Device type, connection info, viewport dimensions
- **Performance Snapshots**: On-demand performance audits

## Quick Start

### 1. Basic Integration (Recommended)

Add to your root layout to monitor all pages:

```tsx
// src/app/layout.tsx
'use client'

import { usePerformanceMonitorLite } from '@/hooks/use-performance-monitor'

export default function RootLayout({ children }) {
  usePerformanceMonitorLite({
    enableDevLogging: process.env.NODE_ENV === 'development',
    reportToVercel: process.env.NODE_ENV === 'production',
  })

  return <html>{children}</html>
}
```

### 2. Component-Level Monitoring

For pages that need access to metrics:

```tsx
// src/app/home/page.tsx
'use client'

import { usePerformanceMonitor } from '@/hooks/use-performance-monitor'

export default function HomePage() {
  const { lastMetric, getSummary, logSnapshot } = usePerformanceMonitor()

  return (
    <div>
      <button onClick={logSnapshot}>Debug Performance</button>
      {lastMetric && (
        <p>Last metric: {lastMetric.name} = {lastMetric.value.toFixed(2)}ms</p>
      )}
    </div>
  )
}
```

### 3. Development Debugging

```tsx
// src/components/debug/PerformanceDebugPanel.tsx
'use client'

import { usePerformanceDebug } from '@/hooks/use-performance-monitor'

export function PerformanceDebugPanel() {
  const { metrics, getSummary, logSnapshot } = usePerformanceDebug()

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/90 text-white rounded shadow-lg">
      <h3 className="font-bold mb-2">Performance Metrics</h3>
      {Object.entries(getSummary()).map(([name, data]) => (
        <div key={name} className="text-sm">
          <span className={data.rating === 'good' ? 'text-green-400' : 'text-yellow-400'}>
            {name}: {data.value.toFixed(2)}ms ({data.rating})
          </span>
        </div>
      ))}
      <button onClick={logSnapshot} className="mt-2 px-2 py-1 bg-blue-600 rounded text-xs">
        Log Full Snapshot
      </button>
    </div>
  )
}
```

## API Reference

### Core Functions

#### `monitorPerformance(config)`

Main function to initialize performance monitoring.

```ts
import { monitorPerformance } from '@/lib/performance-monitor'

monitorPerformance({
  enableDevLogging: true,
  reportToVercel: true,
  onMetric: (metric) => {
    // Custom handling
    console.log('Metric received:', metric)
  },
  thresholds: {
    LCP: { good: 2000, needsImprovement: 3500 }, // Custom thresholds
  },
})
```

**Config Options:**

- `enableDevLogging` (boolean): Enable console logging
- `reportToVercel` (boolean): Send metrics to Vercel Analytics
- `onMetric` (function): Custom callback for each metric
- `thresholds` (object): Override default rating thresholds

#### `getPerformanceSnapshot()`

Get current performance metrics snapshot.

```ts
import { getPerformanceSnapshot } from '@/lib/performance-monitor'

const snapshot = getPerformanceSnapshot()
console.log(snapshot)
// {
//   navigation: { type: 'navigate', redirectCount: 0, transferSize: 12345 },
//   timing: { domContentLoaded: 1234, loadComplete: 2345, ... },
//   resources: { count: 45, totalSize: 567890 },
//   memory: { usedJSHeapSize: 12345678, ... }
// }
```

#### `logPerformanceSnapshot()`

Log formatted performance snapshot to console.

```ts
import { logPerformanceSnapshot } from '@/lib/performance-monitor'

// Outputs formatted table to console
logPerformanceSnapshot()
```

### Hooks

#### `usePerformanceMonitor(config)`

Full-featured hook with metric state tracking.

```ts
const {
  metrics,           // All collected metrics
  lastMetric,        // Most recent metric
  isMonitoring,      // Monitoring status
  getSnapshot,       // Get current snapshot
  logSnapshot,       // Log to console
  getMetricsByName,  // Filter by metric name
  getAverageValue,   // Get average for metric type
  getMetricsByRating,// Filter by rating
  areAllMetricsGood, // Check if all good
  getSummary,        // Get latest of each type
} = usePerformanceMonitor({
  enableDevLogging: true,
  reportToVercel: true,
})
```

#### `usePerformanceMonitorLite(config)`

Lightweight hook without state (recommended for layouts).

```ts
// Just monitors, doesn't track in state
usePerformanceMonitorLite({
  enableDevLogging: process.env.NODE_ENV === 'development',
  reportToVercel: true,
})
```

#### `usePerformanceDebug()`

Development-only hook (auto-disabled in production).

```ts
const { lastMetric, logSnapshot } = usePerformanceDebug()
```

## Metric Types

### Core Web Vitals

| Metric | Description | Good | Needs Improvement | Poor |
|--------|-------------|------|-------------------|------|
| **FCP** | First Contentful Paint | < 1.8s | 1.8s - 3s | > 3s |
| **LCP** | Largest Contentful Paint | < 2.5s | 2.5s - 4s | > 4s |
| **FID** | First Input Delay | < 100ms | 100ms - 300ms | > 300ms |
| **CLS** | Cumulative Layout Shift | < 0.1 | 0.1 - 0.25 | > 0.25 |
| **TTFB** | Time to First Byte | < 800ms | 800ms - 1.8s | > 1.8s |
| **INP** | Interaction to Next Paint | < 200ms | 200ms - 500ms | > 500ms |

### Metric Report Structure

```ts
type PerformanceMetricReport = {
  // Core metric data
  id: string
  name: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: 'navigate' | 'reload' | 'back-forward' | ...

  // Context
  timestamp: number
  url: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
  connection?: {
    effectiveType: string
    downlink?: number
    rtt?: number
    saveData?: boolean
  }
  viewport: {
    width: number
    height: number
  }
}
```

## Usage Patterns

### Pattern 1: Global Monitoring

**Best for:** All pages, minimal overhead

```tsx
// src/app/layout.tsx
'use client'

import { usePerformanceMonitorLite } from '@/hooks/use-performance-monitor'

export default function RootLayout({ children }) {
  usePerformanceMonitorLite({
    reportToVercel: process.env.NODE_ENV === 'production',
  })

  return <html>{children}</html>
}
```

### Pattern 2: Custom Analytics Integration

**Best for:** Sending to custom analytics service

```tsx
import { monitorPerformance } from '@/lib/performance-monitor'

monitorPerformance({
  onMetric: async (metric) => {
    // Send to your analytics service
    await fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        event: 'web_vital',
        metric: metric.name,
        value: metric.value,
        rating: metric.rating,
        deviceType: metric.deviceType,
        url: metric.url,
      }),
    })
  },
})
```

### Pattern 3: Performance Dashboard

**Best for:** Admin/debug dashboards

```tsx
'use client'

import { usePerformanceMonitor } from '@/hooks/use-performance-monitor'

export function PerformanceDashboard() {
  const { metrics, getSummary, areAllMetricsGood } = usePerformanceMonitor()

  const summary = getSummary()

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Performance Status: {areAllMetricsGood() ? '✅ Good' : '⚠️ Needs Improvement'}
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(summary).map(([name, data]) => (
          <div key={name} className="p-4 border rounded">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-2xl">{data.value.toFixed(2)}ms</p>
            <p className={`text-sm ${getRatingColor(data.rating)}`}>
              {data.rating}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">All Metrics ({metrics.length})</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Rating</th>
              <th>Device</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => (
              <tr key={i}>
                <td>{m.name}</td>
                <td>{m.value.toFixed(2)}ms</td>
                <td className={getRatingColor(m.rating)}>{m.rating}</td>
                <td>{m.deviceType}</td>
                <td>{new Date(m.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function getRatingColor(rating: string) {
  return rating === 'good'
    ? 'text-green-600'
    : rating === 'needs-improvement'
    ? 'text-yellow-600'
    : 'text-red-600'
}
```

### Pattern 4: Conditional Monitoring

**Best for:** Feature flags, A/B testing

```tsx
import { monitorPerformance } from '@/lib/performance-monitor'

// Only monitor for subset of users
const shouldMonitor = Math.random() < 0.1 // 10% sampling

if (shouldMonitor) {
  monitorPerformance({
    reportToVercel: true,
    onMetric: (metric) => {
      // Tag with experiment info
      console.log('Experiment A:', metric)
    },
  })
}
```

## Integration with Existing Systems

### Vercel Analytics

The system automatically integrates with `@vercel/speed-insights`:

```tsx
// Automatically reports to Vercel when enabled
usePerformanceMonitorLite({
  reportToVercel: process.env.NODE_ENV === 'production',
})
```

### Google Tag Manager

```tsx
import { monitorPerformance } from '@/lib/performance-monitor'

monitorPerformance({
  onMetric: (metric) => {
    // Push to GTM dataLayer
    window.dataLayer?.push({
      event: 'web_vital',
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      metric_delta: metric.delta,
      device_type: metric.deviceType,
      page_url: metric.url,
    })
  },
})
```

### Sentry Performance

```tsx
import { monitorPerformance } from '@/lib/performance-monitor'
import * as Sentry from '@sentry/nextjs'

monitorPerformance({
  onMetric: (metric) => {
    Sentry.captureMessage('Web Vital', {
      level: metric.rating === 'poor' ? 'warning' : 'info',
      tags: {
        metric: metric.name,
        rating: metric.rating,
        device: metric.deviceType,
      },
      extra: metric,
    })
  },
})
```

## Performance Best Practices

### 1. Use Lightweight Hook in Layouts

```tsx
// ✅ Good: Minimal overhead
usePerformanceMonitorLite({ reportToVercel: true })

// ❌ Avoid: Unnecessary state tracking
const { metrics } = usePerformanceMonitor() // Don't track if not using
```

### 2. Sample in Production

For high-traffic sites, consider sampling:

```tsx
const shouldMonitor = Math.random() < 0.1 // 10% of users

if (shouldMonitor) {
  monitorPerformance({ reportToVercel: true })
}
```

### 3. Custom Thresholds for Your App

Adjust thresholds based on your app's characteristics:

```tsx
monitorPerformance({
  thresholds: {
    LCP: { good: 2000, needsImprovement: 3000 }, // Stricter for hero image
    CLS: { good: 0.05, needsImprovement: 0.15 }, // Very strict for layout
  },
})
```

### 4. Debug with Console Logging

```tsx
// Development only
if (process.env.NODE_ENV === 'development') {
  monitorPerformance({
    enableDevLogging: true,
    reportToVercel: false,
  })
}
```

## Troubleshooting

### Metrics Not Appearing

1. Check browser compatibility (needs modern browsers)
2. Ensure script runs client-side (`'use client'`)
3. Check console for errors
4. Verify Vercel Analytics is enabled in environment

### Duplicate Metrics

In development with React Strict Mode, components mount twice. This is expected and won't happen in production.

### High Memory Usage

If tracking many metrics in state:

```tsx
// Use lite version
usePerformanceMonitorLite() // No state tracking

// Or limit stored metrics
const [metrics, setMetrics] = useState([])
const handleMetric = (metric) => {
  setMetrics(prev => [...prev.slice(-50), metric]) // Keep last 50
}
```

## Files

- `src/lib/performance-monitor.ts` - Core monitoring utilities
- `src/hooks/use-performance-monitor.ts` - React hooks
- `docs/performance-monitoring.md` - This documentation

## References

- [Web Vitals - web.dev](https://web.dev/vitals/)
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Core Web Vitals Thresholds](https://web.dev/defining-core-web-vitals-thresholds/)
