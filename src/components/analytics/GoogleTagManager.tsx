'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface GoogleTagManagerProps {
  gtmId: string
}

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []

      // Push initial GTM configuration
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      })

      // Initialize gtag function
      window.gtag = function() {
        window.dataLayer.push(arguments)
      }

      // Set initial configuration
      window.gtag('config', gtmId, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      })
    }
  }, [gtmId])

  if (!gtmId) {
    console.warn('Google Tag Manager ID is missing')
    return null
  }

  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
      />

      {/* Google Tag Manager Noscript */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}

// Analytics utility functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters?.label || '',
      value: parameters?.value || 0,
      ...parameters
    })
  }
}

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GTM_ID, {
      page_title: title || document.title,
      page_location: url,
      send_page_view: true
    })
  }
}

export const trackConversion = (conversionId: string, conversionLabel: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
      value: value || 1,
      currency: 'USD'
    })
  }
}

export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  trackEvent('form_submit', {
    event_category: 'form',
    event_label: formName,
    form_name: formName,
    ...formData
  })
}

export const trackCalendlyBooking = () => {
  trackEvent('calendly_booking', {
    event_category: 'lead_generation',
    event_label: 'calendly_consultation',
    value: 1
  })
}