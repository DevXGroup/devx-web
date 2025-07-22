"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useBackdropFilterSupport } from "@/hooks/use-backdrop-filter-support"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const supportsBackdropFilter = useBackdropFilterSupport()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Initial check on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  // Determine background opacity based on backdrop-filter support
  const bgOpacity = supportsBackdropFilter ? 0.5 : 0.85
  const scrolledBgStyle = {
    backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
    backdropFilter: supportsBackdropFilter ? "blur(10px)" : "none",
    WebkitBackdropFilter: supportsBackdropFilter ? "blur(10px)" : "none",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  }

  return (
    <nav
      className={`fixed w-full z-[9999] transition-all duration-300`}
      style={isScrolled ? scrolledBgStyle : { backgroundColor: "rgba(0, 0, 0, 0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devx-logo-main-light-qTrRkjnHwbdPvqPRaKWQzeV7Emn14i.png"
                alt="DevX Logo"
                width={180}
                height={48}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu - switch to mobile earlier to prevent cutoff */}
          <div className="hidden lg:flex items-center space-x-8 font-['IBM_Plex_Mono'] font-medium">
            <Link
              href="/"
              className={`relative px-2 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive("/") 
                  ? "text-pink-400" 
                  : "text-white hover:text-white/80"
              }`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              {isActive("/") && (
                <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
              )}
              Home
            </Link>
            <Link
              href="/services"
              scroll={false}
              className={`relative px-2 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive("/services") 
                  ? "text-pink-400" 
                  : "text-white hover:text-white/80"
              }`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              {isActive("/services") && (
                <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
              )}
              Services
            </Link>
            <Link
              href="/portfolio"
              className={`relative px-2 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive("/portfolio") 
                  ? "text-pink-400" 
                  : "text-white hover:text-white/80"
              }`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              {isActive("/portfolio") && (
                <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
              )}
              Portfolio
            </Link>
            <Link
              href="/about"
              className={`relative px-2 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive("/about") 
                  ? "text-pink-400" 
                  : "text-white hover:text-white/80"
              }`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              {isActive("/about") && (
                <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
              )}
              About
            </Link>
            <Link
              href="/pricing"
              className={`relative px-2 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive("/pricing") 
                  ? "text-pink-400" 
                  : "text-white hover:text-white/80"
              }`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              {isActive("/pricing") && (
                <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
              )}
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`relative px-2 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive("/contact") 
                  ? "text-pink-400" 
                  : "text-white hover:text-white/80"
              }`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              {isActive("/contact") && (
                <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
              )}
              Contact
            </Link>
            <Link
              href="/schedule"
              className="bg-robinhood text-black hover:bg-robinhood-90 px-6 py-2 rounded-lg transition-all duration-150 ease-out transform hover:scale-105 will-change-transform font-medium border border-black/30 hover:border-black/60"
            >
              Schedule
            </Link>
          </div>

          {/* Mobile Menu Button - show for tablets too */}
          <div className="lg:hidden flex items-center z-[10000]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden"
            style={scrolledBgStyle}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 font-['IBM_Plex_Mono'] font-light">
              <Link
                href="/"
                className={`relative block px-3 py-2 rounded transition-all duration-150 ease-out transform will-change-transform ${
                  isActive("/") 
                    ? "text-pink-400" 
                    : "text-white hover:text-white/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isActive("/") && (
                  <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
                )}
                Home
              </Link>
              <Link
                href="/services"
                scroll={false}
                className={`relative block px-3 py-2 rounded transition-all duration-150 ease-out transform will-change-transform ${
                  isActive("/services") 
                    ? "text-pink-400" 
                    : "text-white hover:text-white/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isActive("/services") && (
                  <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
                )}
                Services
              </Link>
              <Link
                href="/portfolio"
                className={`relative block px-3 py-2 rounded transition-all duration-150 ease-out transform will-change-transform ${
                  isActive("/portfolio") 
                    ? "text-pink-400" 
                    : "text-white hover:text-white/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isActive("/portfolio") && (
                  <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
                )}
                Portfolio
              </Link>
              <Link
                href="/about"
                className={`relative block px-3 py-2 rounded transition-all duration-150 ease-out transform will-change-transform ${
                  isActive("/about") 
                    ? "text-pink-400" 
                    : "text-white hover:text-white/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isActive("/about") && (
                  <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
                )}
                About
              </Link>
              <Link
                href="/pricing"
                className={`relative block px-3 py-2 rounded transition-all duration-150 ease-out transform will-change-transform ${
                  isActive("/pricing") 
                    ? "text-pink-400" 
                    : "text-white hover:text-white/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isActive("/pricing") && (
                  <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
                )}
                Pricing
              </Link>
              <Link
                href="/contact"
                className={`relative block px-3 py-2 rounded transition-all duration-150 ease-out transform will-change-transform ${
                  isActive("/contact") 
                    ? "text-pink-400" 
                    : "text-white hover:text-white/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isActive("/contact") && (
                  <div className="absolute inset-0 bg-pink-400/10 rounded -z-10" />
                )}
                Contact
              </Link>
              <Link
                href="/schedule"
                className="block px-3 py-2 bg-robinhood text-black hover:bg-robinhood-90 rounded-lg transition-all duration-150 ease-out transform will-change-transform font-medium border border-black/30 hover:border-black/60"
                onClick={() => setIsOpen(false)}
              >
                Schedule
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
