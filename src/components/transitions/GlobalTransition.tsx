'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export default function GlobalTransition() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Only show transition when navigating TO /home FROM root
    if (pathname === '/home') {
      setIsTransitioning(true)

      // Remove the overlay after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false)
      }, 3600)

      return () => clearTimeout(timer)
    } else {
      setIsTransitioning(false)
    }
    return undefined
  }, [pathname])

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
          transition={{ duration: 0.7 }}
        >
          {/* Visible black circle that slides down from top */}
          <motion.div
            className="rounded-full bg-black"
            style={{
              boxShadow: '0 0 50px rgba(0,0,0,0.8)',
              zIndex: 999999,
            }}
            initial={{
              width: '400vmax',
              height: '400vmax',
              y: '-100vmax',
            }}
            animate={{
              y: '150vh',
            }}
            transition={{
              duration: 1.9,
              delay: 0,
              ease: 'easeInOut',
            }}
            onAnimationComplete={() => setIsTransitioning(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
