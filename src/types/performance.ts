/**
 * Performance monitoring type definitions
 * @module types/performance
 */

/**
 * Core Web Vitals metric names
 */
export type WebVitalsMetricName = 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'INP'

/**
 * Performance metric rating
 */
export type MetricRating = 'good' | 'needs-improvement' | 'poor'

/**
 * Navigation type for page loads
 */
export type NavigationType =
  | 'navigate'
  | 'reload'
  | 'back-forward'
  | 'back-forward-cache'
  | 'prerender'

/**
 * Device type classification
 */
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Network connection information
 */
export interface ConnectionInfo {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown'
  downlink?: number
  rtt?: number
  saveData?: boolean
}

/**
 * Viewport dimensions
 */
export interface ViewportInfo {
  width: number
  height: number
}

/**
 * Performance threshold configuration
 */
export interface MetricThreshold {
  good: number
  needsImprovement: number
}

/**
 * Thresholds for all Core Web Vitals
 */
export type PerformanceThresholds = {
  [K in WebVitalsMetricName]?: MetricThreshold
}

/**
 * Performance snapshot from Performance API
 */
export interface PerformanceSnapshot {
  navigation: {
    type: string
    redirectCount: number
    transferSize: number
  }
  timing: {
    domContentLoaded: number
    loadComplete: number
    firstPaint: number
    firstContentfulPaint: number
  }
  resources: {
    count: number
    totalSize: number
  }
  memory: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  } | null
}

/**
 * Memory usage information
 */
export interface MemoryInfo {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

/**
 * Performance metric attribution data
 */
export interface MetricAttribution {
  element?: string
  url?: string
  loadState?: string
  navigationEntry?: PerformanceNavigationTiming
  fcpEntry?: PerformanceEntry
  lcpEntry?: PerformanceEntry
  fidEntry?: PerformanceEventTiming
  clsEntries?: PerformanceEntry[]
}

/**
 * Web Vitals metric data
 */
export interface WebVitalsMetric {
  id: string
  name: WebVitalsMetricName
  value: number
  rating: MetricRating
  delta: number
  navigationType: NavigationType
  attribution?: MetricAttribution
}

/**
 * Extended performance metric with context
 */
export interface PerformanceMetricReport extends WebVitalsMetric {
  timestamp: number
  url: string
  deviceType: DeviceType
  connection?: ConnectionInfo
  viewport: ViewportInfo
}

/**
 * Performance monitoring configuration
 */
export interface PerformanceMonitorConfig {
  /** Enable console logging in development */
  enableDevLogging?: boolean
  /** Report to Vercel Analytics */
  reportToVercel?: boolean
  /** Custom callback for metrics */
  onMetric?: (metric: PerformanceMetricReport) => void
  /** Threshold overrides for rating calculation */
  thresholds?: PerformanceThresholds
}

/**
 * Performance summary for all metrics
 */
export type PerformanceSummary = {
  [K in WebVitalsMetricName]?: {
    value: number
    rating: MetricRating
  }
}

/**
 * Performance monitoring state
 */
export interface PerformanceMonitorState {
  metrics: PerformanceMetricReport[]
  lastMetric: PerformanceMetricReport | null
  isMonitoring: boolean
}

/**
 * Resource timing entry with transfer size
 */
export interface ResourceTimingEntry extends PerformanceResourceTiming {
  transferSize: number
}

/**
 * Navigation timing entry
 */
export interface NavigationTimingEntry extends Omit<PerformanceNavigationTiming, 'type'> {
  type: string
  redirectCount: number
  transferSize: number
}
