'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  trackEvent,
  trackPageView,
  trackConversion,
  trackFormSubmission,
  trackCalendlyBooking,
} from '@/components/analytics/GoogleTagManager'

/**
 * Hook to automatically track page views on route changes
 * Best practice: Use this in your layout or individual pages
 */
export function usePageTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      trackPageView(url)
    }
  }, [pathname, searchParams])
}

/**
 * Hook that provides analytics tracking functions
 * Usage: const analytics = useAnalytics()
 * Then: analytics.trackEvent('button_click', { button_name: 'cta' })
 */
export function useAnalytics() {
  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackFormSubmission,
    trackCalendlyBooking,

    // Convenience methods for common events
    trackButtonClick: (buttonName: string, extraData?: Record<string, any>) => {
      trackEvent('button_click', {
        button_name: buttonName,
        ...extraData,
      })
    },

    trackLinkClick: (linkUrl: string, linkText?: string) => {
      trackEvent('link_click', {
        link_url: linkUrl,
        link_text: linkText,
      })
    },

    trackScrollDepth: (depth: number) => {
      trackEvent('scroll_depth', {
        scroll_depth: depth,
        event_category: 'engagement',
      })
    },

    trackVideoPlay: (videoTitle: string) => {
      trackEvent('video_play', {
        video_title: videoTitle,
        event_category: 'engagement',
      })
    },

    trackDownload: (fileName: string) => {
      trackEvent('file_download', {
        file_name: fileName,
        event_category: 'engagement',
      })
    },
  }
}
