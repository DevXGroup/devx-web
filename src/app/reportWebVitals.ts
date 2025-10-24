import type { NextWebVitalsMetric } from 'next/app'

export function reportWebVitals(metric: NextWebVitalsMetric) {
  void import('@sentry/nextjs').then((Sentry) => {
    Sentry.captureMessage('web-vital', {
      level: 'info',
      tags: {
        metric: metric.name,
        label: metric.label,
      },
      extra: metric,
    })
  })
}
