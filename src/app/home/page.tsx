'use client'

import { useEffect, useState } from 'react'
import Hero from '@sections/Hero'
import Features from '@sections/Features'
import Process from '@sections/Process'
import DevelopmentTools from '@sections/DevelopmentTools'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [navbarReady, setNavbarReady] = useState(false)

  useEffect(() => {
    // Short delay to allow circle animation to start
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200)
    
    // Longer delay for navbar to appear
    const navbarTimer = setTimeout(() => {
      setNavbarReady(true)
    }, 500)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(navbarTimer)
    }
  }, [])

  return (
    <main 
      data-page="home" 
      className={`flex min-h-screen flex-col items-center w-full bg-black ${isLoaded ? 'loaded' : ''} ${navbarReady ? 'navbar-ready' : ''}`}
    >
      <Hero />
      <Features />
      <Process />
      <DevelopmentTools />
    </main>
  )
}