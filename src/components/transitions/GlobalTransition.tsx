'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { clearEntryTransition, isEntryTransitionActive } from '@/lib/entry-transition'

export default function GlobalTransition() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  // Fix hydration: Always start with false on server, then check client-side
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasShownTransition, setHasShownTransition] = useState(false)
  const [mounted, setMounted] = useState(false)
  const FADE_DURATION = 0.8 // Smooth fade-out duration
  const DELAY_BEFORE_FADE = 0.2 // Small delay before starting fade

  // Mount detection to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only run on client after mount
    if (!mounted) return

    // Show transition only once when first arriving at /home
    if (pathname === '/home' && !hasShownTransition) {
      if (isEntryTransitionActive()) {
        setIsTransitioning(true)
        setHasShownTransition(true)

        // Hide navbar during transition
        document.body.classList.add('navbar-hidden')

        // Start fade after small delay, then end transition
        const timer = setTimeout(
          () => {
            setIsTransitioning(false)
            document.body.classList.remove('navbar-hidden')
            // Clear the flag after transition completes
            clearEntryTransition()
          },
          (DELAY_BEFORE_FADE + FADE_DURATION) * 1000
        )

        return () => {
          clearTimeout(timer)
          document.body.classList.remove('navbar-hidden')
          clearEntryTransition()
        }
      }
    }
    return undefined
  }, [pathname, hasShownTransition, mounted])

  if (reduceMotion) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          key="transition-overlay"
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 9999999,
            backgroundColor: '#000000',
            willChange: 'opacity',
          }}
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0, // Start fading out immediately
          }}
          transition={{
            duration: FADE_DURATION,
            delay: DELAY_BEFORE_FADE,
            ease: 'easeInOut',
          }}
        />
      )}
    </AnimatePresence>
  )
}
