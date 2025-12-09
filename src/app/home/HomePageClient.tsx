'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Enable SSR for Hero to improve FCP/LCP - hero content renders immediately
const Hero = dynamic(() => import('@sections/Hero'), {
  ssr: true,
  loading: () => <div className="min-h-screen min-h-[100vh] bg-black" />,
})

const FeaturesSection = dynamic(() => import('@sections/Features'), {
  ssr: true,
  loading: () => null,
})

const ProcessSection = dynamic(() => import('@sections/Process'), {
  ssr: false,
  loading: () => <div className="h-96" />, // Placeholder to prevent layout shift
})

const DevelopmentToolsSection = dynamic(() => import('@sections/DevelopmentTools'), {
  ssr: false,
  loading: () => <div className="h-96" />, // Placeholder to prevent layout shift
})

export default function HomePageClient() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [navbarReady, setNavbarReady] = useState(false)
  const [shouldFadeIn, setShouldFadeIn] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Performance monitoring function
  const logPerformance = useCallback((section: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      const perfEntries = performance.getEntriesByType('measure')
      const sectionLoadTime = perfEntries.find((entry) => entry.name === `${section}-load`)

      // Send performance data to analytics if needed
      // analytics.track('section_load_time', { section, load_time: sectionLoadTime?.duration })
    }
  }, [])

  // Performance observer removed to reduce CPU usage - use browser DevTools instead

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

    // Check if coming from entry page for smooth fade-in
    const fromEntry =
      typeof window !== 'undefined' && sessionStorage.getItem('fromEntry') === 'true'

    if (fromEntry) {
      // Clear the flag
      sessionStorage.removeItem('fromEntry')
      // Small delay for smooth transition
      setTimeout(() => {
        setShouldFadeIn(true)
      }, 50)
    } else {
      // Direct navigation, no fade needed
      setShouldFadeIn(true)
    }

    // Mark time when page is loaded
    if (typeof window !== 'undefined' && window.performance) {
      performance.mark('home-page-loaded')
      performance.measure('home-page-load', 'home-page-start', 'home-page-loaded')
    }

    // Show navbar immediately for better performance
    setNavbarReady(true)
  }, [])

  useEffect(() => {
    logPerformance('page-ready')
  }, [logPerformance])

  return (
    <motion.main
      data-page="home"
      className={`relative flex min-h-screen min-h-[100vh] flex-col items-center w-full bg-black overflow-x-hidden ${
        isLoaded ? 'loaded' : ''
      } ${navbarReady ? 'navbar-ready' : ''}`}
      style={{
        backgroundColor: '#000000',
      }}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={prefersReducedMotion ? false : { opacity: shouldFadeIn ? 1 : 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1], // Smooth easeOutExpo
            }
      }
    >
      <Hero />
      <FeaturesSection />
      <ProcessSection />
      <DevelopmentToolsSection />
    </motion.main>
  )
}
