/**
 * Performance Monitoring Utility
 *
 * Comprehensive Core Web Vitals monitoring and reporting system
 * Integrates with Vercel Analytics and provides development logging
 *
 * @module lib/performance-monitor
 */

/**
 * Core Web Vitals metric types
 */
export type WebVitalsMetric = {
  id: string
  name: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: 'navigate' | 'reload' | 'back-forward' | 'back-forward-cache' | 'prerender'
  attribution?: Record<string, unknown>
}

/**
 * Extended performance metric with device context
 */
export type PerformanceMetricReport = WebVitalsMetric & {
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

/**
 * Configuration options for performance monitoring
 */
export interface PerformanceMonitorConfig {
  /** Enable console logging in development */
  enableDevLogging?: boolean
  /** Report to Vercel Analytics */
  reportToVercel?: boolean
  /** Custom callback for metrics */
  onMetric?: (metric: PerformanceMetricReport) => void
  /** Threshold overrides for rating calculation */
  thresholds?: {
    [key in WebVitalsMetric['name']]?: {
      good: number
      needsImprovement: number
    }
  }
}

/**
 * Default thresholds for Core Web Vitals (in milliseconds/score)
 * Based on web.dev/vitals recommendations
 */
const DEFAULT_THRESHOLDS = {
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  INP: { good: 200, needsImprovement: 500 }, // Interaction to Next Paint
} as const

/**
 * Calculate metric rating based on thresholds
 */
function calculateRating(
  metricName: WebVitalsMetric['name'],
  value: number,
  thresholds:
    | typeof DEFAULT_THRESHOLDS
    | PerformanceMonitorConfig['thresholds'] = DEFAULT_THRESHOLDS
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = thresholds?.[metricName]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needs-improvement'
  return 'poor'
}

/**
 * Detect device type from viewport width
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'

  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

/**
 * Get network connection information if available
 */
function getConnectionInfo():
  | {
      effectiveType: string
      downlink?: number
      rtt?: number
      saveData?: boolean
    }
  | undefined {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return undefined
  }

  const connection = (navigator as any).connection
  if (!connection) return undefined

  return {
    effectiveType: connection.effectiveType || 'unknown',
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  }
}

/**
 * Format metric for console logging
 */
function formatMetricForConsole(metric: PerformanceMetricReport): string {
  const emoji =
    metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌'
  const unit = metric.name === 'CLS' ? '' : 'ms'
  const value = metric.name === 'CLS' ? metric.value.toFixed(4) : Math.round(metric.value)

  return [
    `${emoji} ${metric.name}: ${value}${unit} (${metric.rating})`,
    `Device: ${metric.deviceType}`,
    `URL: ${metric.url}`,
    metric.connection ? `Connection: ${metric.connection.effectiveType}` : '',
  ]
    .filter(Boolean)
    .join(' | ')
}

/**
 * Report metric to Vercel Analytics
 */
async function reportToVercelAnalytics(metric: PerformanceMetricReport) {
  try {
    // Use dynamic import to avoid bundling analytics in dev
    const speedInsights = await import('@vercel/speed-insights')

    // Check if sendAnalytics exists (it may not in all versions)
    if ('sendAnalytics' in speedInsights && typeof speedInsights.sendAnalytics === 'function') {
      // Report to Vercel's Speed Insights
      speedInsights.sendAnalytics({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
      } as any)
    }
  } catch (error) {
    // Silently fail if analytics is not available
    if (process.env.NODE_ENV === 'development') {
      console.warn('Failed to report to Vercel Analytics:', error)
    }
  }
}

/**
 * Create a performance metric report with full context
 */
function createMetricReport(
  metric: Omit<WebVitalsMetric, 'rating'>,
  config: PerformanceMonitorConfig = {}
): PerformanceMetricReport {
  const rating = calculateRating(metric.name, metric.value, config.thresholds)
  const connection = getConnectionInfo()

  return {
    ...metric,
    rating,
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.pathname : '',
    deviceType: getDeviceType(),
    ...(connection ? { connection } : {}),
    viewport: {
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
      height: typeof window !== 'undefined' ? window.innerHeight : 0,
    },
  } as PerformanceMetricReport
}

/**
 * Main performance monitoring function
 *
 * @example
 * ```ts
 * import { monitorPerformance } from '@/lib/performance-monitor'
 *
 * // In your app layout or page
 * monitorPerformance({
 *   enableDevLogging: process.env.NODE_ENV === 'development',
 *   reportToVercel: process.env.NODE_ENV === 'production',
 *   onMetric: (metric) => {
 *     // Custom handling
 *     console.log('Metric received:', metric)
 *   }
 * })
 * ```
 */
export function monitorPerformance(config: PerformanceMonitorConfig = {}) {
  // Only run in browser
  if (typeof window === 'undefined') {
    return
  }

  const {
    enableDevLogging = process.env.NODE_ENV === 'development',
    reportToVercel = process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true',
    onMetric,
  } = config

  // Handle metric reporting
  const handleMetric = (metric: Omit<WebVitalsMetric, 'rating'>) => {
    const report = createMetricReport(metric, config)

    // Development logging
    if (enableDevLogging) {
      console.log(formatMetricForConsole(report))
    }

    // Report to Vercel Analytics
    if (reportToVercel) {
      void reportToVercelAnalytics(report)
    }

    // Custom callback
    if (onMetric) {
      onMetric(report)
    }
  }

  // NOTE: Web vitals monitoring disabled - web-vitals package needs to be installed
  // void import('web-vitals').then(({ onCLS, onFCP, onFID, onLCP, onTTFB, onINP }) => {
  //   onCLS(handleMetric as any)
  //   onFCP(handleMetric as any)
  //   onFID(handleMetric as any)
  //   onLCP(handleMetric as any)
  //   onTTFB(handleMetric as any)
  //   onINP(handleMetric as any)
  // })
}

/**
 * Get current performance metrics snapshot
 * Useful for manual performance audits
 */
export function getPerformanceSnapshot() {
  if (typeof window === 'undefined' || !window.performance) {
    return null
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  const paint = performance.getEntriesByType('paint')

  return {
    navigation: {
      type: navigation?.type || 'unknown',
      redirectCount: navigation?.redirectCount || 0,
      transferSize: navigation?.transferSize || 0,
    },
    timing: {
      domContentLoaded: navigation?.domContentLoadedEventEnd || 0,
      loadComplete: navigation?.loadEventEnd || 0,
      firstPaint: paint.find((entry) => entry.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint:
        paint.find((entry) => entry.name === 'first-contentful-paint')?.startTime || 0,
    },
    resources: {
      count: performance.getEntriesByType('resource').length,
      totalSize: performance
        .getEntriesByType('resource')
        .reduce((acc, resource: any) => acc + (resource.transferSize || 0), 0),
    },
    memory: (performance as any).memory
      ? {
          usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
          totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
          jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
        }
      : null,
  }
}

/**
 * Log performance snapshot to console
 * Useful for debugging
 */
export function logPerformanceSnapshot() {
  const snapshot = getPerformanceSnapshot()
  if (!snapshot) {
    console.warn('Performance API not available')
    return
  }

  console.group('📊 Performance Snapshot')
  console.table({
    'Navigation Type': snapshot.navigation.type,
    'Redirect Count': snapshot.navigation.redirectCount,
    'Transfer Size': `${(snapshot.navigation.transferSize / 1024).toFixed(2)} KB`,
    'DOM Content Loaded': `${snapshot.timing.domContentLoaded.toFixed(2)} ms`,
    'Load Complete': `${snapshot.timing.loadComplete.toFixed(2)} ms`,
    'First Paint': `${snapshot.timing.firstPaint.toFixed(2)} ms`,
    'First Contentful Paint': `${snapshot.timing.firstContentfulPaint.toFixed(2)} ms`,
    'Resource Count': snapshot.resources.count,
    'Total Resource Size': `${(snapshot.resources.totalSize / 1024).toFixed(2)} KB`,
  })

  if (snapshot.memory) {
    console.group('💾 Memory Usage')
    console.table({
      'Used JS Heap': `${(snapshot.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      'Total JS Heap': `${(snapshot.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      'JS Heap Limit': `${(snapshot.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
    })
    console.groupEnd()
  }

  console.groupEnd()
}

/**
 * Export default thresholds for reference
 */
export { DEFAULT_THRESHOLDS as PERFORMANCE_THRESHOLDS }
