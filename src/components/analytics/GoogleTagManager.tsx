'use client'

// Analytics utility functions and type definitions
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
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
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-GXG9QQLB7C'
    window.gtag('config', gaId, {
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