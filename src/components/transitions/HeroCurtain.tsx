'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useIsomorphicLayoutEffect } from '@/hooks/use-isomorphic-layout-effect'
import { clearEntryTransition, isEntryTransitionActive } from '@/lib/entry-transition'

export default function HeroCurtain() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  const [isVisible, setIsVisible] = useState(false)
  const [isContentReady, setIsContentReady] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Wait for critical content to be ready
  useEffect(() => {
    if (!isVisible) return

    // Check if critical content is loaded
    const checkContentReady = () => {
      if (typeof window === 'undefined') return false

      // Check if fonts are loaded
      const fontsReady = document.fonts ? document.fonts.status === 'loaded' : true

      // Check if critical images are loaded (hero section)
      const criticalImages = document.querySelectorAll('img[fetchpriority="high"], img[priority]')
      const imagesReady =
        criticalImages.length === 0 ||
        Array.from(criticalImages).every((img) => (img as HTMLImageElement).complete)

      // Check if document is ready
      const docReady = document.readyState === 'complete' || document.readyState === 'interactive'

      return fontsReady && imagesReady && docReady
    }

    const startReveal = () => {
      setIsContentReady(true)
      // Small delay to ensure render is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShouldAnimate(true)
        })
      })
    }

    // Check immediately
    if (checkContentReady()) {
      startReveal()
      return
    }

    // Poll for content readiness
    const pollInterval = setInterval(() => {
      if (checkContentReady()) {
        clearInterval(pollInterval)
        startReveal()
      }
    }, 50)

    // Fallback: Start animation after max 800ms even if not fully ready
    // This prevents indefinite waiting and ensures good UX
    timeoutRef.current = setTimeout(() => {
      clearInterval(pollInterval)
      startReveal()
    }, 800)

    return () => {
      clearInterval(pollInterval)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isVisible])

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
            willChange: 'transform',
          }}
          initial={{
            y: 0,
          }}
          animate={
            shouldAnimate
              ? {
                  y: '140vh',
                }
              : {
                  y: 0,
                }
          }
          exit={{
            opacity: 0,
          }}
          transition={{
            y: {
              duration: 1.2,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1], // Smooth easeOutExpo curve
              type: 'tween',
            },
            opacity: {
              duration: 0.25,
              delay: 1.35,
            },
          }}
          onAnimationComplete={handleAnimationComplete}
        >
          {/* Content Loading Indicator - shown while waiting */}
          {!isContentReady && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-[#4CD787] rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

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
                <stop offset="85%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
                <stop offset="95%" style={{ stopColor: '#000000', stopOpacity: 0.98 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 0.95 }} />
              </linearGradient>
              {/* Add subtle shadow for depth */}
              <filter id="curtainShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="2" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Smooth curved path with enhanced curve for better reveal effect */}
            <path
              d="M 0,0 L 0,80 Q 25,87 50,88 Q 75,87 100,80 L 100,0 Z"
              fill="url(#curtainGradient)"
              style={{
                filter: 'url(#curtainShadow)',
                transform: 'translateZ(0)',
              }}
              shapeRendering="geometricPrecision"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
