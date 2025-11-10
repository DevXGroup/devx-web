'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface IntertwineAnimationProps {
  className?: string
  width?: number
  height?: number
}

// Custom hook for Safari detection with proper hydration handling
function useSafariDetection() {
  const [mounted, setMounted] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // Only run on client to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase()
      const isSafariBrowser =
        userAgent.includes('safari') &&
        !userAgent.includes('chrome') &&
        !userAgent.includes('firefox')
      setIsSafari(isSafariBrowser)
    }
    setMounted(true)
  }, [])

  return { mounted, isSafari }
}

export default function IntertwineAnimation({
  className = '',
  width = 400,
  height = 100,
}: IntertwineAnimationProps) {
  const shouldReduceMotion = useReducedMotion()
  const { mounted, isSafari } = useSafariDetection()

  // Ensure we render the same on server and initial client render
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!mounted || !isClient) {
    return (
      <div className={`flex justify-center items-center ${className}`} style={{ width, height }}>
        <div className="w-8 h-8 border-2 border-[#4CD787]/30 border-t-[#4CD787] rounded-full animate-spin" />
      </div>
    )
  }

  // Define the intertwined path data with proper number validation
  const generatePath = (w: number, h: number) => {
    const safeWidth = Math.max(1, Math.round(w))
    const safeHeight = Math.max(1, Math.round(h))

    return {
      path1: `M 0,${Math.round(safeHeight / 2)} Q ${Math.round(safeWidth / 4)},${Math.round(safeHeight / 4)} ${Math.round(safeWidth / 2)},${Math.round(safeHeight / 2)} Q ${Math.round((safeWidth * 3) / 4)},${Math.round((safeHeight * 3) / 4)} ${safeWidth},${Math.round(safeHeight / 2)}`,
      path2: `M 0,${Math.round(safeHeight / 2)} Q ${Math.round(safeWidth / 4)},${Math.round((safeHeight * 3) / 4)} ${Math.round(safeWidth / 2)},${Math.round(safeHeight / 2)} Q ${Math.round((safeWidth * 3) / 4)},${Math.round(safeHeight / 4)} ${safeWidth},${Math.round(safeHeight / 2)}`,
      path3: `M ${Math.round(safeWidth / 8)},${Math.round(safeHeight / 2)} Q ${Math.round((safeWidth * 3) / 8)},${Math.round(safeHeight / 8)} ${Math.round((safeWidth * 5) / 8)},${Math.round(safeHeight / 2)} Q ${Math.round((safeWidth * 7) / 8)},${Math.round((safeHeight * 7) / 8)} ${safeWidth},${Math.round(safeHeight / 2)}`,
    }
  }

  const { path1, path2, path3 } = generatePath(width, height)

  // Use a stable key to force re-render after Safari detection
  const stableKey = `intertwine-${mounted ? (isSafari ? 'safari' : 'other') : 'loading'}`

  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={{
        // Force hardware acceleration on container
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      }}
    >
      <motion.div
        key={stableKey}
        style={{
          // Safari optimizations for smooth rendering
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
        }}
        className="relative"
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible drop-shadow-lg"
          suppressHydrationWarning
          style={{
            // Consistent base properties for all browsers
            width: `${width}px`,
            height: `${height}px`,
            shapeRendering: 'geometricPrecision',
            textRendering: 'geometricPrecision',
            imageRendering: 'auto' as const,
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            WebkitPerspective: '1000px',
            perspective: '1000px',
          }}
        >
          {/* Enhanced gradient definitions with better opacity and shiny effects */}
          <defs>
            <linearGradient id="intertwineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4CD787" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#4834D4" />
            </linearGradient>
            <linearGradient id="intertwineGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#9d4edd" />
              <stop offset="100%" stopColor="#4CD787" />
            </linearGradient>
            <linearGradient id="intertwineGradient3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#4834D4" />
              <stop offset="50%" stopColor="#4CD787" />
              <stop offset="100%" stopColor="#9d4edd" />
            </linearGradient>

            {/* Enhanced glow filters similar to infinity logo */}
            <filter id="intertwineGlow1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="intertwineGlow2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="intertwineGlow3" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* First intertwined path */}
          <motion.path
            d={path1}
            stroke="url(#intertwineGradient1)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#intertwineGlow1)"
            style={{
              vectorEffect: 'non-scaling-stroke',
            }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.5 : 2,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          />

          {/* Second intertwined path */}
          <motion.path
            d={path2}
            stroke="url(#intertwineGradient2)"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#intertwineGlow2)"
            style={{
              vectorEffect: 'non-scaling-stroke',
            }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.5 : 2.5,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          />

          {/* Third intertwined path */}
          <motion.path
            d={path3}
            stroke="url(#intertwineGradient3)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#intertwineGlow3)"
            style={{
              vectorEffect: 'non-scaling-stroke',
            }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: 1,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.5 : 3,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* Enhanced animated dots that travel along the paths */}
          {!shouldReduceMotion && (
            <>
              <motion.circle
                r="3.5"
                fill="#4CD787"
                filter="url(#intertwineGlow1)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                }}
                style={{
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                }}
              >
                <animateMotion dur="6s" repeatCount="indefinite" path={path1} begin="2s" />
              </motion.circle>

              <motion.circle
                r="3"
                fill="#FFD700"
                filter="url(#intertwineGlow2)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                style={{
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                }}
              >
                <animateMotion dur="5s" repeatCount="indefinite" path={path2} begin="3s" />
              </motion.circle>

              <motion.circle
                r="2.5"
                fill="#9d4edd"
                filter="url(#intertwineGlow3)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut',
                  delay: 2,
                }}
                style={{
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                }}
              >
                <animateMotion dur="7s" repeatCount="indefinite" path={path3} begin="4s" />
              </motion.circle>
            </>
          )}

          {/* Enhanced connecting nodes at intersection points */}
          <motion.circle
            cx={width / 2}
            cy={height / 2}
            r="4.5"
            fill="url(#intertwineGradient1)"
            filter="url(#intertwineGlow1)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: shouldReduceMotion ? 0.5 : 3.5,
              ease: 'easeOut',
            }}
            style={{
              WebkitTransform: 'translateZ(0)',
              transform: 'translateZ(0)',
            }}
          />

          {/* Outer pulsing ring with enhanced glow */}
          <motion.circle
            cx={width / 2}
            cy={height / 2}
            r="9"
            fill="none"
            stroke="url(#intertwineGradient2)"
            strokeWidth="1.5"
            filter="url(#intertwineGlow2)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: shouldReduceMotion ? 1 : [1, 1.3, 1],
              opacity: shouldReduceMotion ? 0.6 : [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: shouldReduceMotion ? 0.5 : 2.5,
              repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
              delay: shouldReduceMotion ? 0.5 : 4,
              ease: 'easeInOut',
            }}
            style={{
              WebkitTransform: 'translateZ(0)',
              transform: 'translateZ(0)',
              vectorEffect: 'non-scaling-stroke',
            }}
          />

          {/* Additional subtle glow effect around center point */}
          <motion.circle
            cx={width / 2}
            cy={height / 2}
            r="2"
            fill="#FFFFFF"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: shouldReduceMotion ? 1 : [1, 1.2, 1],
              opacity: shouldReduceMotion ? 0.8 : [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: shouldReduceMotion ? 0.5 : 1.5,
              repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
              delay: shouldReduceMotion ? 0.5 : 4.5,
              ease: 'easeInOut',
            }}
            style={{
              WebkitTransform: 'translateZ(0)',
              transform: 'translateZ(0)',
            }}
          />
        </svg>
      </motion.div>
    </div>
  )
}
