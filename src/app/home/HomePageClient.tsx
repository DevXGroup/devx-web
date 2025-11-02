'use client'

import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Enable SSR for Hero to improve FCP/LCP - hero content renders immediately
const Hero = dynamic(() => import('@sections/Hero'), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <h1 className="text-5xl font-bold text-white">DevX Group</h1>
    </div>
  ),
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
  const [showDeferredSections, setShowDeferredSections] = useState(false)

  // Performance monitoring function
  const logPerformance = useCallback((section: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      const perfEntries = performance.getEntriesByType('measure')
      const sectionLoadTime = perfEntries.find(entry => entry.name === `${section}-load`)

      if (sectionLoadTime) {
        console.log(`${section} load time: ${sectionLoadTime.duration.toFixed(2)}ms`)
      }

      // Send performance data to analytics if needed
      // analytics.track('section_load_time', { section, load_time: sectionLoadTime?.duration })
    }
  }, [])

  // Performance observer for layout shifts
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Type guard to check if entry is a LayoutShift
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number }
          if (layoutShiftEntry.hadRecentInput) continue // Ignore layout shifts after user input
          // Log cumulative layout shift
          console.log(`Layout shift detected: ${layoutShiftEntry.value}`)
        }
      })

      try {
        observer.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        // Some browsers might not support this entry type
        console.warn('Layout shift observer not supported:', e)
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
    // Show deferred sections immediately for better performance
    setShowDeferredSections(true)
    logPerformance('deferred-sections')
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
      {showDeferredSections && (
        <>
          <FeaturesSection />
          <ProcessSection />
          <DevelopmentToolsSection />
        </>
      )}
    </main>
  )
}
