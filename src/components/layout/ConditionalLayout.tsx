"use client"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Navbar from "@/common/Navbar"
import Footer from "@/common/Footer"
import ScrollToTop from "@layout/ScrollToTop"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isEntryPage = pathname === "/"
  const [navbarClass, setNavbarClass] = useState(pathname === "/home" ? "navbar-hidden" : "")

  useEffect(() => {
    if (pathname === "/home") {
      // Hide navbar immediately with CSS
      setNavbarClass("navbar-hidden")
      // Show navbar after transition
      const timer = setTimeout(() => {
        setNavbarClass("")
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setNavbarClass("")
    }
  }, [pathname])

  if (isEntryPage) {
    return <>{children}</>
  }

  return (
    <>
      <div className={navbarClass}>
        <Navbar />
      </div>
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  )
}