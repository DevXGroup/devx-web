'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export default function GlobalTransition() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasShownTransition, setHasShownTransition] = useState(false)

  useEffect(() => {
    // Show transition only once when first arriving at /home
    if (pathname === '/home' && !hasShownTransition) {
      setIsTransitioning(true)
      setHasShownTransition(true)

      // Hide navbar during transition
      document.body.classList.add('navbar-hidden')

      // End transition after animation
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        document.body.classList.remove('navbar-hidden')
      }, 500)

      return () => {
        clearTimeout(timer)
        document.body.classList.remove('navbar-hidden')
      }
    }
  }, [pathname, hasShownTransition])

  if (reduceMotion) {
    return null
  }

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          className="fixed inset-0 pointer-events-none flex items-start justify-center overflow-hidden"
          style={{ zIndex: 9999999 }}
        >
          {/* Black circle that slides down to reveal page */}
          <motion.div
            className="rounded-full bg-black"
            style={{
              width: '300vmax',
              height: '300vmax',
            }}
            initial={{
              y: '-150vmax',
            }}
            animate={{
              y: '150vmax',
            }}
            transition={{
              duration: 3.5,
              ease: [2.43, 3.13, 1.23, 0.16],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
