'use client'

import { useEffect, useState } from 'react'
import Hero from '@sections/Hero'
import Features from '@sections/Features'
import Process from '@sections/Process'
import DevelopmentTools from '@sections/DevelopmentTools'

export default function HomePageClient() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [navbarReady, setNavbarReady] = useState(false)
  const [mounted, setMounted] = useState(false)

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
      <Features />
      <Process />
      <DevelopmentTools />
    </main>
  )
}