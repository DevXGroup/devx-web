'use client'

import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Enable SSR for Hero to improve FCP/LCP - hero content renders immediately
const Hero = dynamic(() => import('@sections/Hero'), {
  ssr: true,
  loading: () => <div className="min-h-screen bg-black" />,
})

const FeaturesSection = dynamic(() => import('@sections/Features'), {
  ssr: true,
  loading: () => null,
})

const ProcessSection = dynamic(() => import('@sections/Process'), {
  ssr: false,
  loading: () => null,
})

const DevelopmentToolsSection = dynamic(() => import('@sections/DevelopmentTools'), {
  ssr: false,
  loading: () => null,
})

export default function HomePageClient() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [navbarReady, setNavbarReady] = useState(false)

  // Performance monitoring function
  const logPerformance = useCallback((section: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      const perfEntries = performance.getEntriesByType('measure')
      const sectionLoadTime = perfEntries.find((entry) => entry.name === `${section}-load`)

      // Send performance data to analytics if needed
      // analytics.track('section_load_time', { section, load_time: sectionLoadTime?.duration })
    }
  }, [])

  // Performance observer for layout shifts (disabled in production)
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'PerformanceObserver' in window &&
      process.env.NODE_ENV === 'development'
    ) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Type guard to check if entry is a LayoutShift
          const layoutShiftEntry = entry as PerformanceEntry & {
            hadRecentInput?: boolean
            value?: number
          }
          if (layoutShiftEntry.hadRecentInput) continue // Ignore layout shifts after user input
          // Track cumulative layout shift silently
        }
      })

      try {
        observer.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        // Some browsers might not support this entry type
      }

      return () => observer.disconnect()
    }
    // Return undefined when PerformanceObserver is not available
    return undefined
  }, [])

  useEffect(() => {
    // Performance marking
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark('home-page-start')
    }

    // Prevent scroll restoration causing page to scroll up on refresh
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Ensure page starts at top
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
    }

    // Set loaded immediately for better performance
    setIsLoaded(true)
    // Mark time when page is loaded
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark('home-page-loaded')
      performance.measure('home-page-load', 'home-page-start', 'home-page-loaded')
    }

    // Check if coming from entry page (session storage flag)
    const fromEntry = sessionStorage.getItem('fromEntry') === 'true'

    // Show navbar immediately for better performance
    setNavbarReady(true)

    // Clear the flag after using it
    if (fromEntry) {
      sessionStorage.removeItem('fromEntry')
    }
  }, [])

  useEffect(() => {
    logPerformance('page-ready')
  }, [logPerformance])

  return (
    <main
      data-page="home"
      className={`flex min-h-screen flex-col items-center w-full bg-black ${
        isLoaded ? 'loaded' : ''
      } ${navbarReady ? 'navbar-ready' : ''}`}
      style={{ backgroundColor: '#000000' }}
    >
      <Hero />
      <FeaturesSection />
      <ProcessSection />
      <DevelopmentToolsSection />
    </main>
  )
}
