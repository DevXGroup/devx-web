'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  monitorPerformance,
  getPerformanceSnapshot,
  logPerformanceSnapshot,
  type PerformanceMetricReport,
  type PerformanceMonitorConfig,
} from '@/lib/performance-monitor'

/**
 * Performance monitoring state
 */
interface PerformanceMonitorState {
  metrics: PerformanceMetricReport[]
  lastMetric: PerformanceMetricReport | null
  isMonitoring: boolean
}

/**
 * Performance monitoring hook for React components
 *
 * Automatically monitors Core Web Vitals and provides utilities
 * for performance debugging and optimization.
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   const { metrics, lastMetric, logSnapshot } = usePerformanceMonitor({
 *     enableDevLogging: true,
 *     reportToVercel: true,
 *   })
 *
 *   return (
 *     <div>
 *       <button onClick={logSnapshot}>Log Performance</button>
 *       {lastMetric && (
 *         <p>Last metric: {lastMetric.name} = {lastMetric.value}ms</p>
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export function usePerformanceMonitor(config: PerformanceMonitorConfig = {}) {
  const [state, setState] = useState<PerformanceMonitorState>({
    metrics: [],
    lastMetric: null,
    isMonitoring: false,
  })

  // Track if monitoring has been initialized
  const monitoringInitialized = useRef(false)

  // Custom metric handler that updates component state
  const handleMetric = useCallback((metric: PerformanceMetricReport) => {
    setState((prev) => ({
      ...prev,
      metrics: [...prev.metrics, metric],
      lastMetric: metric,
    }))
  }, [])

  // Initialize monitoring on mount
  useEffect(() => {
    // Prevent double initialization in strict mode
    if (monitoringInitialized.current) {
      return
    }

    monitoringInitialized.current = true

    setState((prev) => ({ ...prev, isMonitoring: true }))

    // Start monitoring with custom handler
    monitorPerformance({
      ...config,
      onMetric: (metric) => {
        handleMetric(metric)
        // Call user's custom handler if provided
        if (config.onMetric) {
          config.onMetric(metric)
        }
      },
    })

    return () => {
      setState((prev) => ({ ...prev, isMonitoring: false }))
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Get current performance snapshot
  const getSnapshot = useCallback(() => {
    return getPerformanceSnapshot()
  }, [])

  // Log performance snapshot to console
  const logSnapshot = useCallback(() => {
    logPerformanceSnapshot()
  }, [])

  // Get metrics by name
  const getMetricsByName = useCallback(
    (name: PerformanceMetricReport['name']) => {
      return state.metrics.filter((m) => m.name === name)
    },
    [state.metrics]
  )

  // Get average value for a metric
  const getAverageValue = useCallback(
    (name: PerformanceMetricReport['name']) => {
      const metrics = getMetricsByName(name)
      if (metrics.length === 0) return 0

      const sum = metrics.reduce((acc, m) => acc + m.value, 0)
      return sum / metrics.length
    },
    [getMetricsByName]
  )

  // Get metrics by rating
  const getMetricsByRating = useCallback(
    (rating: PerformanceMetricReport['rating']) => {
      return state.metrics.filter((m) => m.rating === rating)
    },
    [state.metrics]
  )

  // Check if all metrics are good
  const areAllMetricsGood = useCallback(() => {
    if (state.metrics.length === 0) return false
    return state.metrics.every((m) => m.rating === 'good')
  }, [state.metrics])

  // Get performance summary
  const getSummary = useCallback(() => {
    const summary: Record<string, { value: number; rating: string }> = {}

    // Get the latest value for each metric type
    const metricNames: PerformanceMetricReport['name'][] = [
      'FCP',
      'LCP',
      'FID',
      'CLS',
      'TTFB',
      'INP',
    ]

    metricNames.forEach((name) => {
      const metrics = getMetricsByName(name)
      if (metrics.length > 0) {
        const latest = metrics[metrics.length - 1]
        if (latest) {
          summary[name] = {
            value: latest.value,
            rating: latest.rating,
          }
        }
      }
    })

    return summary
  }, [getMetricsByName])

  return {
    // State
    metrics: state.metrics,
    lastMetric: state.lastMetric,
    isMonitoring: state.isMonitoring,

    // Utility functions
    getSnapshot,
    logSnapshot,
    getMetricsByName,
    getAverageValue,
    getMetricsByRating,
    areAllMetricsGood,
    getSummary,
  }
}

/**
 * Lightweight hook that only monitors without state
 * Useful when you don't need to track metrics in component state
 *
 * @example
 * ```tsx
 * function Layout({ children }) {
 *   usePerformanceMonitorLite({
 *     enableDevLogging: process.env.NODE_ENV === 'development',
 *     reportToVercel: true,
 *   })
 *
 *   return <div>{children}</div>
 * }
 * ```
 */
export function usePerformanceMonitorLite(config: PerformanceMonitorConfig = {}) {
  const monitoringInitialized = useRef(false)

  useEffect(() => {
    // Prevent double initialization in strict mode
    if (monitoringInitialized.current) {
      return
    }

    monitoringInitialized.current = true

    monitorPerformance(config)

    // No cleanup needed as monitoring is passive
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * Hook for development-only performance debugging
 * Automatically disabled in production
 *
 * @example
 * ```tsx
 * function DebugPanel() {
 *   const { lastMetric, logSnapshot } = usePerformanceDebug()
 *
 *   if (!lastMetric) return null
 *
 *   return (
 *     <div className="fixed bottom-4 right-4 p-4 bg-black text-white">
 *       <p>{lastMetric.name}: {lastMetric.value.toFixed(2)}ms</p>
 *       <button onClick={logSnapshot}>Log Full Snapshot</button>
 *     </div>
 *   )
 * }
 * ```
 */
export function usePerformanceDebug() {
  const isDevelopment = process.env.NODE_ENV === 'development'

  return usePerformanceMonitor({
    enableDevLogging: isDevelopment,
    reportToVercel: false,
  })
}
