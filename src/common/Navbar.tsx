"use client"

import { useState, useEffect, useRef } from "react"
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
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Initial check on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Click outside to close mobile menu and handle escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isClickInsideMenu = mobileMenuRef.current && mobileMenuRef.current.contains(target)
      const isClickOnButton = hamburgerButtonRef.current && hamburgerButtonRef.current.contains(target)
      
      if (!isClickInsideMenu && !isClickOnButton) {
        setIsOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
      // Also prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
            <Link href="/home" className="flex items-center">
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
              href="/home"
              className={`relative px-2 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive("/home") 
                  ? "text-pink-400" 
                  : "text-white hover:text-white/80"
              }`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              {isActive("/home") && (
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
            <motion.button
              ref={hamburgerButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 rounded-full bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {/* Background glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-blue-400/10"
                animate={isOpen ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Hamburger lines container */}
              <div className="flex flex-col items-center justify-center w-full h-full space-y-1">
                {/* Top line */}
                <motion.div
                  className="w-5 h-0.5 bg-gradient-to-r from-white via-pink-300 to-purple-300 rounded-full shadow-sm"
                  animate={isOpen 
                    ? { rotate: 45, y: 6, background: "linear-gradient(45deg, #ff6b6b, #feca57)" } 
                    : { rotate: 0, y: 0, background: "linear-gradient(90deg, #ffffff, #f8bbd9, #e1bee7)" }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                
                {/* Middle line */}
                <motion.div
                  className="w-5 h-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 rounded-full shadow-sm"
                  animate={isOpen 
                    ? { opacity: 0, scale: 0, rotate: 180 } 
                    : { opacity: 1, scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                
                {/* Bottom line */}
                <motion.div
                  className="w-5 h-0.5 bg-gradient-to-r from-purple-300 via-blue-300 to-cyan-300 rounded-full shadow-sm"
                  animate={isOpen 
                    ? { rotate: -45, y: -6, background: "linear-gradient(45deg, #feca57, #ff6b6b)" } 
                    : { rotate: 0, y: 0, background: "linear-gradient(90deg, #e1bee7, #b39ddb, #90caf9)" }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
              
              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1.5, opacity: [0, 1, 0] }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Rotating ring effect */}
              <motion.div
                className="absolute inset-0 rounded-full border border-gradient-to-r from-purple-400/30 via-pink-400/30 to-blue-400/30"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden"
            style={scrolledBgStyle}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 font-['IBM_Plex_Mono'] font-light">
              <Link
                href="/home"
                className={`relative block px-3 py-2 rounded transition-all duration-150 ease-out transform will-change-transform ${
                  isActive("/home") 
                    ? "text-pink-400" 
                    : "text-white hover:text-white/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {isActive("/home") && (
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
