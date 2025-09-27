'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export default function GlobalTransition() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [previousPath, setPreviousPath] = useState<string | null>(null)
  const [hasShownEntryTransition, setHasShownEntryTransition] = useState(false)

  useEffect(() => {
    // Only show transition when navigating TO /home FROM root entry page (/) 
    // and only if we haven't shown the entry transition yet
    if (pathname === '/home' && previousPath === '/' && !hasShownEntryTransition) {
      setIsTransitioning(true)
      setHasShownEntryTransition(true)

      // Simple navbar hiding during transition
      document.body.classList.add('navbar-hidden')

      // Remove the overlay after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        document.body.classList.remove('navbar-hidden')
      }, 3000)

      return () => {
        clearTimeout(timer)
        document.body.classList.remove('navbar-hidden')
      }
    } else {
      setIsTransitioning(false)
      document.body.classList.remove('navbar-hidden')
    }

    // Update previous path for next navigation
    setPreviousPath(pathname)
    return undefined
  }, [pathname, previousPath, hasShownEntryTransition])

  if (reduceMotion) {
    return null
  }

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 pointer-events-none flex items-start justify-center"
          style={{ zIndex: 999999 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 3.0 }}
        >
          {/* Visible circular slide down from top */}
          <motion.div
            className="rounded-full bg-black"
            style={{
              boxShadow: '0 0 50px rgba(0,0,0,0.8)',
              zIndex: 999999,
            }}
            initial={{
              width: '150vw',
              height: '150vw',
              y: '-75vw',
            }}
            animate={{
              y: '150vh',
            }}
            transition={{
              duration: 4.3,
              delay: 0,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            onAnimationComplete={() => setIsTransitioning(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
