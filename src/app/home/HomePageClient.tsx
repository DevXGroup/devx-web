'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@sections/Hero'

// Optimize dynamic imports with loading={null} for better performance
const FeaturesSection = dynamic(() => import('@sections/Features'), {
  ssr: false,
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
  const [mounted, setMounted] = useState(false)
  const [showDeferredSections, setShowDeferredSections] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Prevent scroll restoration causing page to scroll up on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Ensure page starts at top
    window.scrollTo(0, 0)

    // Delay to allow circle animation to start
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Check if coming from entry page (session storage flag)
    const fromEntry = sessionStorage.getItem('fromEntry') === 'true'

    // Show navbar after circle transition completes (only if from entry)
    const navbarTimer = setTimeout(() => {
      setNavbarReady(true)
    }, fromEntry ? 500 : 0)

    // Clear the flag after using it
    if (fromEntry) {
      sessionStorage.removeItem('fromEntry')
    }

    return () => {
      clearTimeout(timer)
      clearTimeout(navbarTimer)
    }
  }, [])

  useEffect(() => {
    if (!mounted || showDeferredSections) {
      return
    }

    let idleHandle: number | null = null
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null

    const enableDeferredSections = () => {
      setShowDeferredSections(true)
    }

    if (typeof window !== 'undefined') {
      const requestIdle = window.requestIdleCallback?.bind(window)

      if (requestIdle) {
        idleHandle = requestIdle(
          () => {
            enableDeferredSections()
          },
          { timeout: 2000 } // Increased from 1200ms for better LCP priority
        )
      }
    }

    if (idleHandle === null) {
      timeoutHandle = setTimeout(enableDeferredSections, 600) // Increased from 300ms
    }

    return () => {
      if (idleHandle !== null && typeof window !== 'undefined') {
        window.cancelIdleCallback?.(idleHandle)
      }
      if (timeoutHandle) {
        clearTimeout(timeoutHandle)
      }
    }
  }, [mounted, showDeferredSections])

  // Don't render content until mounted to prevent white flash
  if (!mounted) {
    return (
      <main
        data-page="home"
        className="flex min-h-screen flex-col items-center w-full bg-black"
        style={{ backgroundColor: '#000000', opacity: 0 }}
      />
    )
  }

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
