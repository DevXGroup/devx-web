'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useBackdropFilterSupport } from '@/hooks/use-backdrop-filter-support'
import { StaggeredMenu } from '@/components/ui/StaggeredMenu'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const supportsBackdropFilter = useBackdropFilterSupport()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null)
  const isOpenRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    isOpenRef.current = isOpen
  }, [isOpen])

  useEffect(() => {
    if (isOpenRef.current) {
      setIsOpen(false)
      isOpenRef.current = false
      document.body.style.overflow = 'unset'
    }
  }, [pathname])

  // Click outside to close mobile menu and handle escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isClickInsideMenu = mobileMenuRef.current && mobileMenuRef.current.contains(target)
      const isClickOnButton =
        hamburgerButtonRef.current && hamburgerButtonRef.current.contains(target)

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

  // Handle clicking the same page link in mobile menu
  const handleMobileLinkClick = (path: string) => {
    if (isActive(path)) {
      // If clicking current page, reload and close menu
      setIsOpen(false)
      isOpenRef.current = false
      document.body.style.overflow = 'unset'
      window.location.href = path
    }
  }

  // Get the active page color based on current pathname
  const getActiveColor = (path: string) => {
    if (!isActive(path)) return null

    switch (path) {
      case '/home':
        return {
          text: 'text-[#ccff00]',
          bg: 'bg-[#ccff00]/10',
          shadow: 'shadow-[#ccff00]/30',
          indicator: 'bg-gradient-to-b from-[#ccff00] to-transparent',
        }
      case '/services':
        return {
          text: 'text-purple-400',
          bg: 'bg-purple-400/10',
          shadow: 'shadow-purple-400/30',
          indicator: 'bg-gradient-to-b from-purple-400 to-transparent',
        }
      case '/services/creative-animation':
        return {
          text: 'text-yellow-400',
          bg: 'bg-yellow-400/10',
          shadow: 'shadow-yellow-400/30',
          indicator: 'bg-gradient-to-b from-yellow-400 to-transparent',
        }
      case '/portfolio':
        return {
          text: 'text-blue-400',
          bg: 'bg-blue-400/10',
          shadow: 'shadow-blue-400/30',
          indicator: 'bg-gradient-to-b from-blue-400 to-transparent',
        }
      case '/about':
        return {
          text: 'text-green-400',
          bg: 'bg-green-400/10',
          shadow: 'shadow-green-400/30',
          indicator: 'bg-gradient-to-b from-green-400 to-transparent',
        }
      case '/pricing':
        return {
          text: 'text-orange-400',
          bg: 'bg-orange-400/10',
          shadow: 'shadow-orange-400/30',
          indicator: 'bg-gradient-to-b from-orange-400 to-transparent',
        }
      case '/contact':
        return {
          text: 'text-rose-400',
          bg: 'bg-rose-400/10',
          shadow: 'shadow-rose-400/30',
          indicator: 'bg-gradient-to-b from-rose-400 to-transparent',
        }
      default:
        return {
          text: 'text-[#ccff00]',
          bg: 'bg-[#ccff00]/10',
          shadow: 'shadow-[#ccff00]/30',
          indicator: 'bg-gradient-to-b from-[#ccff00] to-transparent',
        }
    }
  }

  // Determine background opacity based on backdrop-filter support
  const bgOpacity = supportsBackdropFilter ? 0.2 : 0.5
  const navbarStyle = {
    backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
    backdropFilter: supportsBackdropFilter ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: supportsBackdropFilter ? 'blur(12px)' : 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: isScrolled
      ? '0 18px 40px rgba(0,0,0,0.35)'
      : '0 12px 28px rgba(0,0,0,0.2)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  }

  return (
    <nav className={`fixed w-full z-[9999] transition-all duration-300 mt-0 top-0`} style={navbarStyle}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-[14px]">
          <Link href="/" aria-label="DevX Group LLC" className="flex-shrink-0">
            <Image
              src="/images/logos/devx-logo.png"
              alt="DevX Group LLC"
              width={200}
              height={40}
              priority
              quality={90}
              sizes="(max-width: 640px) 160px, 200px"
              className="w-[200px] h-auto"
              style={{ maxWidth: '200px', height: 'auto' }}
            />
          </Link>
          {/* Desktop Menu - right aligned */}
          <div className="hidden lg:flex items-center space-x-6 font-['IBM_Plex_Mono']">
            <Link
              href="/home"
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/home')
                  ? getActiveColor('/home')?.text + ' font-bold'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/home') && (
                <>
                  <div
                    className={`absolute inset-0 ${getActiveColor('/home')?.bg} rounded -z-10`}
                  />
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 ${
                      getActiveColor('/home')?.indicator
                    } z-[-1]`}
                    style={{
                      width: '100%',
                      height: '80px',
                      top: '-80px',
                    }}
                  />
                </>
              )}
              Home
            </Link>
            <Link
              href="/services"
              scroll={false}
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/services')
                  ? getActiveColor('/services')?.text + ' font-bold'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/services') && (
                <>
                  <div
                    className={`absolute inset-0 ${getActiveColor('/services')?.bg} rounded -z-10`}
                  />
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 ${
                      getActiveColor('/services')?.indicator
                    } z-[-1]`}
                    style={{
                      width: '100%',
                      height: '80px',
                      top: '-80px',
                    }}
                  />
                </>
              )}
              Services
            </Link>
            <Link
              href="/portfolio"
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/portfolio')
                  ? getActiveColor('/portfolio')?.text + ' font-bold'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/portfolio') && (
                <>
                  <div
                    className={`absolute inset-0 ${getActiveColor('/portfolio')?.bg} rounded -z-10`}
                  />
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 ${
                      getActiveColor('/portfolio')?.indicator
                    } z-[-1]`}
                    style={{
                      width: '100%',
                      height: '80px',
                      top: '-80px',
                    }}
                  />
                </>
              )}
              Portfolio
            </Link>
            <Link
              href="/about"
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/about')
                  ? getActiveColor('/about')?.text + ' font-bold'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/about') && (
                <>
                  <div
                    className={`absolute inset-0 ${getActiveColor('/about')?.bg} rounded -z-10`}
                  />
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 ${
                      getActiveColor('/about')?.indicator
                    } z-[-1]`}
                    style={{
                      width: '100%',
                      height: '80px',
                      top: '-80px',
                    }}
                  />
                </>
              )}
              About
            </Link>
            <Link
              href="/pricing"
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/pricing')
                  ? getActiveColor('/pricing')?.text + ' font-bold'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/pricing') && (
                <>
                  <div
                    className={`absolute inset-0 ${getActiveColor('/pricing')?.bg} rounded -z-10`}
                  />
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 ${
                      getActiveColor('/pricing')?.indicator
                    } z-[-1]`}
                    style={{
                      width: '100%',
                      height: '80px',
                      top: '-80px',
                    }}
                  />
                </>
              )}
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/contact')
                  ? getActiveColor('/contact')?.text + ' font-bold'
                  : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/contact') && (
                <>
                  <div
                    className={`absolute inset-0 ${getActiveColor('/contact')?.bg} rounded -z-10`}
                  />
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 ${
                      getActiveColor('/contact')?.indicator
                    } z-[-1]`}
                    style={{
                      width: '100%',
                      height: '80px',
                      top: '-80px',
                    }}
                  />
                </>
              )}
              Contact
            </Link>
            <motion.a
              href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-robinhood text-black hover:bg-white hover:text-black px-5 md:px-6 py-3 rounded-lg transition-all duration-300 ease-out font-medium border-2 border-robinhood shadow-lg relative overflow-hidden whitespace-nowrap text-sm md:text-base min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Schedule a meeting with DevX Group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-theme-green to-theme-gold opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Let&apos;s Talk</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button - Clean Hamburger Lines */}
          <div className="relative lg:hidden flex items-center z-[10000]">
            <motion.button
              ref={hamburgerButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-3 group cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {/* Hamburger lines */}
              <div className="relative flex flex-col items-center justify-center space-y-1.5">
                {/* Top line - shortest */}
                <motion.div
                  className="relative rounded-full"
                  style={{
                    width: '16px',
                    height: '2px',
                    background: 'white',
                  }}
                  animate={
                    isOpen
                      ? { rotate: 45, y: 8, width: '24px' }
                      : { rotate: 0, y: 0, width: '16px' }
                  }
                  whileHover={{
                    background: [
                      'white',
                      '#4CD787', // theme-green
                      '#CFB53B', // theme-gold
                      '#9d4edd', // theme-purple
                      '#4834D4', // theme-blue
                      'white',
                    ],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />

                {/* Middle line - medium */}
                <motion.div
                  className="relative rounded-full"
                  style={{
                    width: '20px',
                    height: '2px',
                    background: 'white',
                  }}
                  animate={
                    isOpen
                      ? { opacity: 0, scale: 0, rotate: 180 }
                      : { opacity: 1, scale: 1, rotate: 0 }
                  }
                  whileHover={{
                    background: [
                      'white',
                      '#CFB53B', // theme-gold
                      '#9d4edd', // theme-purple
                      '#4834D4', // theme-blue
                      '#4CD787', // theme-green
                      'white',
                    ],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.3, // Stagger the animation
                    },
                  }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                />

                {/* Bottom line - longest */}
                <motion.div
                  className="relative rounded-full"
                  style={{
                    width: '24px',
                    height: '2px',
                    background: 'white',
                  }}
                  animate={
                    isOpen
                      ? { rotate: -45, y: -8, width: '24px' }
                      : { rotate: 0, y: 0, width: '24px' }
                  }
                  whileHover={{
                    background: [
                      'white',
                      '#9d4edd', // theme-purple
                      '#4834D4', // theme-blue
                      '#4CD787', // theme-green
                      '#CFB53B', // theme-gold
                      'white',
                    ],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.6, // Stagger the animation
                    },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* StaggeredMenu - Always rendered but controlled by navbar state */}
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed top-0 left-0 w-full h-screen z-[9998]"
          style={{
            visibility: isOpen ? 'visible' : 'hidden',
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
        >
          <StaggeredMenu
            position="right"
            colors={['#8b5cf6', '#6b7280', '#f3f4f6', '#9333ea']}
            items={[
              { label: 'Home', ariaLabel: 'Navigate to home page', link: '/home', hoverColor: '#ccff00' },
              { label: 'Services', ariaLabel: 'Navigate to services page', link: '/services', hoverColor: '#c084fc' },
              { label: 'Portfolio', ariaLabel: 'Navigate to portfolio page', link: '/portfolio', hoverColor: '#60a5fa' },
              { label: 'About', ariaLabel: 'Navigate to about page', link: '/about', hoverColor: '#4ade80' },
              { label: 'Pricing', ariaLabel: 'Navigate to pricing page', link: '/pricing', hoverColor: '#fb923c' },
              { label: 'Contact', ariaLabel: 'Navigate to contact page', link: '/contact', hoverColor: '#fb7185' },
            ]}
            socialItems={[
              { label: '💬 Free Consultation', link: 'https://calendly.com/a-sheikhizadeh/devx-group-llc-representative' },
            ]}
            displaySocials={true}
            displayItemNumbering={true}
            logoUrl="/images/logos/devx-logo.png"
            menuButtonColor="#fff"
            openMenuButtonColor="#fff"
            accentColor="#4CD787"
            changeMenuColorOnOpen={true}
            hideToggleButton={true}
            isOpen={isOpen}
            currentPath={pathname}
            onMenuOpen={() => {
              document.body.style.overflow = 'hidden'
            }}
            onMenuClose={() => {
              document.body.style.overflow = 'unset'
              setIsOpen(false)
            }}
            onLinkClick={handleMobileLinkClick}
          />
        </div>
      </div>
    </nav>
  )
}
