'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navbar from '@/common/Navbar'
import Footer from '@/common/Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isEntryPage = pathname === '/'
  const [showNavbar, setShowNavbar] = useState(true)

  useEffect(() => {
    // Only manage navbar visibility on /home page
    if (pathname !== '/home') {
      setShowNavbar(true)
      return undefined
    }

    // Check if we came from entry page - only check once on mount
    const fromEntry = sessionStorage.getItem('fromEntry') === 'true'

    if (fromEntry) {
      // Hide navbar initially
      setShowNavbar(false)

      // Show navbar after transition completes with longer delay for smoother experience
      const timer = setTimeout(() => {
        setShowNavbar(true)
      }, 2800) // Increased from 1100ms to 1800ms

      return () => clearTimeout(timer)
    }

    // Not from entry, show navbar immediately
    setShowNavbar(true)
    return undefined
  }, [pathname])

  if (isEntryPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
