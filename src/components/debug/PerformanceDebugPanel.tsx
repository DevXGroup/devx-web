'use client'

import { usePerformanceDebug } from '@/hooks/use-performance-monitor'
import { useState } from 'react'

/**
 * Development-only performance debug panel
 * Shows real-time Core Web Vitals metrics
 *
 * Usage: Add to layout during development
 * @example
 * ```tsx
 * {process.env.NODE_ENV === 'development' && <PerformanceDebugPanel />}
 * ```
 */
export function PerformanceDebugPanel() {
  const { metrics, getSummary, logSnapshot, lastMetric } = usePerformanceDebug()
  const [isExpanded, setIsExpanded] = useState(false)

  // Don't render in production
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  const summary = getSummary()
  const hasMetrics = metrics.length > 0

  return (
    <div
      className="fixed bottom-4 right-4 bg-black/95 text-white rounded-lg shadow-2xl border border-gray-700 z-50 max-w-md"
      style={{ fontFamily: 'monospace' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <h3 className="font-bold text-sm">Performance Monitor</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Latest Metric */}
        {lastMetric && (
          <div className="text-xs p-2 bg-gray-800 rounded">
            <span className="text-gray-400">Latest: </span>
            <span className={getMetricColor(lastMetric.rating)}>
              {lastMetric.name} = {formatValue(lastMetric.name, lastMetric.value)} (
              {lastMetric.rating})
            </span>
          </div>
        )}

        {/* Summary */}
        {hasMetrics && (
          <div className="space-y-1">
            {Object.entries(summary).map(([name, data]) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <span className="text-gray-400 font-semibold">{name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white tabular-nums">
                    {formatValue(name as any, data.value)}
                  </span>
                  <span
                    className={`${getMetricColor(data.rating as any)} text-xs px-1.5 py-0.5 rounded`}
                  >
                    {getRatingEmoji(data.rating as any)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No metrics */}
        {!hasMetrics && (
          <div className="text-xs text-gray-500 text-center py-2">Waiting for metrics...</div>
        )}

        {/* Expanded Details */}
        {isExpanded && hasMetrics && (
          <div className="pt-2 border-t border-gray-700 space-y-2">
            <div className="text-xs space-y-1">
              <div className="text-gray-400">Total Metrics: {metrics.length}</div>
              {lastMetric && (
                <>
                  <div className="text-gray-400">Device: {lastMetric.deviceType}</div>
                  <div className="text-gray-400">
                    Viewport: {lastMetric.viewport.width}×{lastMetric.viewport.height}
                  </div>
                  {lastMetric.connection && (
                    <div className="text-gray-400">
                      Connection: {lastMetric.connection.effectiveType}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Recent metrics list */}
            <div className="max-h-48 overflow-y-auto space-y-1">
              <div className="text-xs text-gray-400 mb-1">Recent Metrics:</div>
              {metrics
                .slice(-10)
                .reverse()
                .map((m, i) => (
                  <div
                    key={i}
                    className="text-xs p-1.5 bg-gray-800/50 rounded flex justify-between"
                  >
                    <span className="text-gray-400">{m.name}</span>
                    <span className={getMetricColor(m.rating)}>{formatValue(m.name, m.value)}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={logSnapshot}
            className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-xs font-semibold transition-colors"
          >
            Log Snapshot
          </button>
          <button
            onClick={() => {
              console.table(
                metrics.map((m) => ({
                  Metric: m.name,
                  Value: formatValue(m.name, m.value),
                  Rating: m.rating,
                  Device: m.deviceType,
                }))
              )
            }}
            className="flex-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs font-semibold transition-colors"
          >
            Log Table
          </button>
        </div>
      </div>
    </div>
  )
}

function getMetricColor(rating: 'good' | 'needs-improvement' | 'poor'): string {
  switch (rating) {
    case 'good':
      return 'text-green-400'
    case 'needs-improvement':
      return 'text-yellow-400'
    case 'poor':
      return 'text-red-400'
  }
}

function getRatingEmoji(rating: 'good' | 'needs-improvement' | 'poor'): string {
  switch (rating) {
    case 'good':
      return '✓'
    case 'needs-improvement':
      return '⚠'
    case 'poor':
      return '✗'
  }
}

function formatValue(name: string, value: number): string {
  if (name === 'CLS') {
    return value.toFixed(4)
  }
  return `${Math.round(value)}ms`
}
