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
      className={`fixed w-full z-[200] transition-all duration-300`}
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
              className={`${isActive("/") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/") ? "active" : ""} transition-colors duration-200 antialiased`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              Home
            </Link>
            <Link
              href="/services"
              scroll={false}
              className={`${isActive("/services") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/services") ? "active" : ""} transition-colors duration-200 antialiased`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className={`${isActive("/portfolio") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/portfolio") ? "active" : ""} transition-colors duration-200 antialiased`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className={`${isActive("/about") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/about") ? "active" : ""} transition-colors duration-200 antialiased`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              About
            </Link>
            <Link
              href="/pricing"
              className={`${isActive("/pricing") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/pricing") ? "active" : ""} transition-colors duration-200 antialiased`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`${isActive("/contact") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/contact") ? "active" : ""} transition-colors duration-200 antialiased`}
              style={{ textShadow: "0 0 1px rgba(255, 255, 255, 0.3)" }}
            >
              Contact
            </Link>
            <Link
              href="/schedule"
              className="bg-robinhood text-black hover:bg-robinhood-90 px-6 py-2 rounded-lg transition-colors font-medium border border-black/30 hover:border-black/60"
            >
              Schedule
            </Link>
          </div>

          {/* Mobile Menu Button - show for tablets too */}
          <div className="lg:hidden flex items-center">
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
                className={`block px-3 py-2 ${isActive("/") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/") ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                scroll={false}
                className={`block px-3 py-2 ${isActive("/services") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/services") ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className={`block px-3 py-2 ${isActive("/portfolio") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/portfolio") ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 ${isActive("/about") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/about") ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className={`block px-3 py-2 ${isActive("/pricing") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/pricing") ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 ${isActive("/contact") ? "text-pink-400 bg-pink-400/10 rounded px-2 py-1" : "text-white hover:text-white/80"} nav-link ${isActive("/contact") ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/schedule"
                className="block px-3 py-2 bg-robinhood text-black hover:bg-robinhood-90 rounded-lg transition-colors font-medium border border-black/30 hover:border-black/60"
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
