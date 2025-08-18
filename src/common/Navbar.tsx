'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useBackdropFilterSupport } from '@/hooks/use-backdrop-filter-support'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const supportsBackdropFilter = useBackdropFilterSupport()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0) // Changed from 10 to 0 for immediate activation
    }

    // Initial check on mount - set to true initially for contact page effect
    setIsScrolled(true)
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Get the active page color based on current pathname
  const getActiveColor = (path: string) => {
    if (!isActive(path)) return null
    
    switch (path) {
      case '/home':
        return {
          text: 'text-pink-500',
          bg: 'bg-pink-400/10',
          shadow: 'shadow-pink-500/30',
          indicator: 'bg-gradient-to-b from-pink-500 to-transparent'
        }
      case '/services':
        return {
          text: 'text-purple-400',
          bg: 'bg-purple-400/10',
          shadow: 'shadow-purple-400/30',
          indicator: 'bg-gradient-to-b from-purple-400 to-transparent'
        }
      case '/services/creative-animation':
        return {
          text: 'text-yellow-400',
          bg: 'bg-yellow-400/10',
          shadow: 'shadow-yellow-400/30',
          indicator: 'bg-gradient-to-b from-yellow-400 to-transparent'
        }
      case '/portfolio':
        return {
          text: 'text-blue-400',
          bg: 'bg-blue-400/10',
          shadow: 'shadow-blue-400/30',
          indicator: 'bg-gradient-to-b from-blue-400 to-transparent'
        }
      case '/about':
        return {
          text: 'text-green-400',
          bg: 'bg-green-400/10',
          shadow: 'shadow-green-400/30',
          indicator: 'bg-gradient-to-b from-green-400 to-transparent'
        }
      case '/pricing':
        return {
          text: 'text-orange-400',
          bg: 'bg-orange-400/10',
          shadow: 'shadow-orange-400/30',
          indicator: 'bg-gradient-to-b from-orange-400 to-transparent'
        }
      case '/contact':
        return {
          text: 'text-rose-400',
          bg: 'bg-rose-400/10',
          shadow: 'shadow-rose-400/30',
          indicator: 'bg-gradient-to-b from-rose-400 to-transparent'
        }
      default:
        return {
          text: 'text-pink-500',
          bg: 'bg-pink-400/10',
          shadow: 'shadow-pink-500/30',
          indicator: 'bg-gradient-to-b from-pink-500 to-transparent'
        }
    }
  }

  // Determine background opacity based on backdrop-filter support
  const bgOpacity = supportsBackdropFilter ? 0.5 : 0.85
  const scrolledBgStyle = {
    backgroundColor: `rgba(0, 0, 0, ${bgOpacity})`,
    backdropFilter: supportsBackdropFilter ? 'blur(10px)' : 'none',
    WebkitBackdropFilter: supportsBackdropFilter ? 'blur(10px)' : 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  }

  return (
    <nav
      className={`fixed w-full z-[9999] transition-all duration-300`}
      style={isScrolled ? scrolledBgStyle : { backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex-shrink-0">
            <Link href="/home" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devx-logo-main-light-qTrRkjnHwbdPvqPRaKWQzeV7Emn14i.png"
                alt="DevX Logo"
                width={180}
                height={48}
                className="h-12 w-auto lg:w-auto"
                style={{ width: "auto" }}
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu - centered and spaced properly */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-8 font-['IBM_Plex_Mono'] font-large">
            <Link
              href="/home"
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/home') ? getActiveColor('/home')?.text + ' font-bold' : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/home') && (
                <>
                  <div className={`absolute inset-0 ${getActiveColor('/home')?.bg} rounded -z-10`} />
                  <div className={`absolute left-1/2 transform -translate-x-1/2 ${getActiveColor('/home')?.indicator} z-[-1]`} 
                       style={{ 
                         width: '100%', 
                         height: '80px',
                         top: '-80px'
                       }} />
                </>
              )}
              Home
            </Link>
            <Link
              href="/services"
              scroll={false}
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/services') ? getActiveColor('/services')?.text + ' font-bold' : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/services') && (
                <>
                  <div className={`absolute inset-0 ${getActiveColor('/services')?.bg} rounded -z-10`} />
                  <div className={`absolute left-1/2 transform -translate-x-1/2 ${getActiveColor('/services')?.indicator} z-[-1]`} 
                       style={{ 
                         width: '100%', 
                         height: '80px',
                         top: '-80px'
                       }} />
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
                  <div className={`absolute inset-0 ${getActiveColor('/portfolio')?.bg} rounded -z-10`} />
                  <div className={`absolute left-1/2 transform -translate-x-1/2 ${getActiveColor('/portfolio')?.indicator} z-[-1]`} 
                       style={{ 
                         width: '100%', 
                         height: '80px',
                         top: '-80px'
                       }} />
                </>
              )}
              Portfolio
            </Link>
            <Link
              href="/about"
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/about') ? getActiveColor('/about')?.text + ' font-bold' : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/about') && (
                <>
                  <div className={`absolute inset-0 ${getActiveColor('/about')?.bg} rounded -z-10`} />
                  <div className={`absolute left-1/2 transform -translate-x-1/2 ${getActiveColor('/about')?.indicator} z-[-1]`} 
                       style={{ 
                         width: '100%', 
                         height: '80px',
                         top: '-80px'
                       }} />
                </>
              )}
              About
            </Link>
            <Link
              href="/pricing"
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/pricing') ? getActiveColor('/pricing')?.text + ' font-bold' : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/pricing') && (
                <>
                  <div className={`absolute inset-0 ${getActiveColor('/pricing')?.bg} rounded -z-10`} />
                  <div className={`absolute left-1/2 transform -translate-x-1/2 ${getActiveColor('/pricing')?.indicator} z-[-1]`} 
                       style={{ 
                         width: '100%', 
                         height: '80px',
                         top: '-80px'
                       }} />
                </>
              )}
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`relative px-3 py-1 rounded transition-all duration-150 ease-out transform will-change-transform antialiased ${
                isActive('/contact') ? getActiveColor('/contact')?.text + ' font-bold' : 'text-white hover:text-white/80 hover:bg-white/10'
              }`}
              style={{ textShadow: '0 0 1px rgba(255, 255, 255, 0.3)' }}
            >
              {isActive('/contact') && (
                <>
                  <div className={`absolute inset-0 ${getActiveColor('/contact')?.bg} rounded -z-10`} />
                  <div className={`absolute left-1/2 transform -translate-x-1/2 ${getActiveColor('/contact')?.indicator} z-[-1]`} 
                       style={{ 
                         width: '100%', 
                         height: '80px',
                         top: '-80px'
                       }} />
                </>
              )}
              Contact
            </Link>
            <motion.a
              href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-robinhood text-black hover:bg-robinhood-90 px-6 py-2 rounded-lg transition-all duration-300 ease-out font-medium border border-black/30 hover:border-black/60 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
          <div className="lg:hidden flex items-center z-[10000]">
            <motion.button
              ref={hamburgerButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {/* Hamburger lines */}
              <div className="flex flex-col items-center justify-center space-y-1.5">
                {/* Top line - shortest */}
                <motion.div
                  className="rounded-full"
                  style={{
                    width: '16px',
                    height: '2px',
                    background: 'white',
                  }}
                  animate={isOpen ? { rotate: 45, y: 8, width: '24px' } : { rotate: 0, y: 0, width: '16px' }}
                  whileHover={{
                    background: [
                      'white',
                      '#4CD787', // theme-green
                      '#CFB53B', // theme-gold
                      '#9d4edd', // theme-purple
                      '#4834D4', // theme-blue
                      'white'
                    ],
                    transition: { 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />

                {/* Middle line - medium */}
                <motion.div
                  className="rounded-full"
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
                      'white'
                    ],
                    transition: { 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.3 // Stagger the animation
                    }
                  }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                />

                {/* Bottom line - longest */}
                <motion.div
                  className="rounded-full"
                  style={{
                    width: '24px',
                    height: '2px',
                    background: 'white',
                  }}
                  animate={isOpen ? { rotate: -45, y: -8, width: '24px' } : { rotate: 0, y: 0, width: '24px' }}
                  whileHover={{
                    background: [
                      'white',
                      '#9d4edd', // theme-purple
                      '#4834D4', // theme-blue
                      '#4CD787', // theme-green
                      '#CFB53B', // theme-gold
                      'white'
                    ],
                    transition: { 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.6 // Stagger the animation
                    }
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Full Height with Grayish Grainy Background */}
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="lg:hidden fixed top-0 left-0 w-full h-screen z-[9998] flex flex-col"
            style={{
              background: `
                linear-gradient(135deg, rgba(40, 40, 45, 0.95) 0%, rgba(30, 30, 35, 0.95) 50%, rgba(25, 25, 30, 0.95) 100%)
              `,
              backdropFilter: supportsBackdropFilter ? 'blur(20px)' : 'none',
              WebkitBackdropFilter: supportsBackdropFilter ? 'blur(20px)' : 'none',
            }}
          >
            {/* Enhanced grainy texture overlay */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23ffffff'/%3E%3C/svg%3E")`,
                backgroundSize: '200px 200px',
                mixBlendMode: 'overlay',
              }}
            />
            
            {/* Top spacing to avoid navbar overlap */}
            <div className="h-20 flex-shrink-0" />
            
            <div className="relative flex-1 flex flex-col justify-center px-6 space-y-6 font-['IBM_Plex_Mono']">
              {[
                { href: '/home', label: 'Home', group: 'main' },
                { href: '/services', label: 'Services', scroll: false, group: 'main' },
                { href: '/portfolio', label: 'Portfolio', group: 'main' },
                { href: '/about', label: 'About', group: 'company' },
                { href: '/pricing', label: 'Pricing', group: 'company' },
                { href: '/contact', label: 'Contact', group: 'company' },
              ].map((item, index) => (
                <div key={item.href}>
                  {/* Add separator line before About (company section) */}
                  {item.href === '/about' && (
                    <div className="flex items-center my-4 -mx-2">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      <div className="px-3 text-xs text-white/60 font-light tracking-wider uppercase">
                        Company
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    scroll={item.scroll ?? true}
                    className={`relative block text-2xl font-light tracking-wide transition-all duration-300 ease-out group ${
                      isActive(item.href) 
                        ? getActiveColor(item.href)?.text + ' font-medium' 
                        : 'text-white hover:text-theme-green'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Cosmic Supernova Hover Effect - Black and White */}
                    <motion.div
                      className="absolute -inset-x-6 -inset-y-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
                      style={{
                        background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 30%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.4) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='supernovaFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='1 1 1 0 0 1 1 1 0 0 1 1 1 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23supernovaFilter)' fill='%23ffffff' opacity='0.2'/%3E%3C/svg%3E")`,
                        backgroundSize: '120px 120px',
                        backgroundBlendMode: 'overlay',
                        boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      {/* Central bright core */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-80"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{
                          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2)',
                        }}
                      />
                      
                      {/* Expanding energy rings */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full opacity-0 group-hover:opacity-60"
                        animate={{
                          scale: [0, 3],
                          opacity: [0.6, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                        style={{ width: '20px', height: '20px' }}
                      />
                      
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full opacity-0 group-hover:opacity-40"
                        animate={{
                          scale: [0, 5],
                          opacity: [0.4, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.3
                        }}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </motion.div>
                    
                    {/* Active state background */}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute -inset-x-4 -inset-y-2 rounded-xl"
                        style={{
                          background: `linear-gradient(90deg, ${getActiveColor(item.href)?.bg?.replace('bg-', 'rgba(')} 0%, transparent 100%)`,
                          border: `1px solid ${getActiveColor(item.href)?.text?.replace('text-', 'rgba(')}`,
                        }}
                        layoutId="activeMenuItem"
                      />
                    )}
                    
                    {/* Text with hover animation */}
                    <span className="relative z-10 block group-hover:translate-x-2 transition-transform duration-300">
                      {item.label}
                    </span>
                    
                    {/* Decorative line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-theme-green to-transparent"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                  </motion.div>
                </div>
              ))}
              
              {/* Separator before CTA */}
              <div className="flex items-center my-6 -mx-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="px-3 text-xs text-white/60 font-light tracking-wider uppercase">
                  Get Started
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="pt-4"
              >
                <motion.a
                  href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xl font-medium bg-robinhood text-black px-6 py-4 rounded-xl transition-all duration-300 ease-out border border-black/30 relative overflow-hidden"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-theme-green to-theme-gold opacity-0"
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-robinhood-90"
                    whileHover={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Let&apos;s Talk</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
