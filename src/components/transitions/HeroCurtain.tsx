'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import { clearEntryTransition, isEntryTransitionActive } from '@/lib/entry-transition'

const HOLD_DURATION = 0.65
const SLIDE_DURATION = 2.1
const FADE_DURATION = 0.55
const FADE_DELAY = HOLD_DURATION + SLIDE_DURATION - FADE_DURATION

export default function HeroCurtain() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  const [isVisible, setIsVisible] = useState(false)

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) {
      clearEntryTransition()
      return
    }

    const shouldShowCurtain = pathname === '/home' && isEntryTransitionActive()
    setIsVisible(shouldShowCurtain)

    if (!shouldShowCurtain) {
      clearEntryTransition()
    }
  }, [pathname, reduceMotion])

  const handleAnimationComplete = () => {
    setIsVisible(false)
    clearEntryTransition()
  }

  if (reduceMotion) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          <motion.div
            key="hero-curtain"
            className="fixed inset-0 pointer-events-none"
            style={{
              zIndex: 100000,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              top: '-30vh',
              height: '180vh',
            }}
            initial={{
              y: 0,
              opacity: 1,
            }}
            animate={{
              y: '140vh',
              opacity: [1, 1, 0],
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              y: {
                duration: SLIDE_DURATION,
                delay: HOLD_DURATION,
                ease: [0.12, 0.45, 0.17, 1],
                type: 'tween',
              },
              opacity: {
                duration: FADE_DURATION,
                delay: FADE_DELAY,
                ease: 'easeOut',
              },
            }}
            onAnimationComplete={handleAnimationComplete}
          >
            {/* SVG with smooth curved bottom edge */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="curtainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
                  <stop offset="88%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.98 }} />
                </linearGradient>
              </defs>
              {/* Smooth curved path using cubic bezier for better anti-aliasing */}
              <path
                d="M 0,0 L 0,82 C 20,88 40,92 50,93 C 60,92 80,88 100,82 L 100,0 Z"
                fill="url(#curtainGradient)"
                style={{
                  filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.5))',
                  transform: 'translateZ(0)',
                }}
                shapeRendering="optimizeSpeed"
              />
            </svg>
          </motion.div>

          <motion.div
            key="hero-curtain-overlay"
            className="fixed inset-0 pointer-events-none bg-black"
            style={{ zIndex: 99999 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.35,
              delay: HOLD_DURATION,
              ease: 'easeOut',
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}
