'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navbar from '@/common/Navbar'
import Footer from '@/common/Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isEntryPage = pathname === '/'
  const [navbarClass, setNavbarClass] = useState(pathname === '/home' ? 'navbar-hidden' : '')

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    if (pathname === '/home') {
      // Hide navbar immediately with CSS
      setNavbarClass('navbar-hidden')
      // Show navbar after transition
      timer = setTimeout(() => {
        setNavbarClass('')
      }, 500)
    } else {
      setNavbarClass('')
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [pathname])

  if (isEntryPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className={navbarClass}>
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
