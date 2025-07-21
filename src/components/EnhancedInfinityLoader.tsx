"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface EnhancedInfinityLoaderProps {
  scrollThreshold?: number
  baseScale?: number
  maxScale?: number
}

// Custom hook for Safari detection with proper hydration handling
function useSafariDetection() {
  const [mounted, setMounted] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    // Only run on client to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase()
      const isSafariBrowser = userAgent.includes('safari') && !userAgent.includes('chrome') && !userAgent.includes('firefox')
      setIsSafari(isSafariBrowser)
    }
    setMounted(true)
  }, [])

  return { mounted, isSafari }
}

export default function EnhancedInfinityLoader({
  scrollThreshold = 0.3,
  baseScale = 0.8,
  maxScale = 1.2,
}: EnhancedInfinityLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { mounted, isSafari } = useSafariDetection()
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      })
    }
    
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Simplified, smooth scaling that works consistently across devices
  const scale = useSpring(
    useTransform(
      scrollYProgress,
      [0, scrollThreshold, 1 - scrollThreshold, 1],
      [baseScale, maxScale, maxScale, baseScale],
    ),
    { stiffness: 100, damping: 25, mass: 1 },
  )

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]), {
    stiffness: 120,
    damping: 20,
  })

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-32 w-full">
        <div className="w-16 h-16 border-4 border-[#4CD787]/30 border-t-[#4CD787] rounded-full animate-spin" />
      </div>
    )
  }

  // Use a stable key to force re-render after Safari detection
  const stableKey = `infinity-${isSafari ? 'safari' : 'other'}`

  // Get responsive size based on screen dimensions
  const getInfinitySize = () => {
    if (screenSize.width < 640) {
      // Mobile: smaller, consistent size
      return { width: 120, height: 60, className: "w-[120px] h-[60px]" }
    } else if (screenSize.width < 1024) {
      // Tablet: medium size
      return { width: 160, height: 80, className: "w-[160px] h-[80px]" }
    } else {
      // Desktop: larger size
      return { width: 200, height: 100, className: "w-[200px] h-[100px]" }
    }
  }

  const infinitySize = getInfinitySize()

  return (
    <div 
      ref={containerRef} 
      className="flex items-center justify-center h-[30vh] sm:h-[35vh] md:h-[40vh] w-full"
      style={{
        // Force hardware acceleration on container
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
      }}
    >
      <motion.div
        key={stableKey}
        style={{
          scale,
          opacity,
          // Safari optimizations for smooth scaling
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity",
        }}
        className="relative"
      >
        {/* Responsive infinity symbol - Safari optimized */}
        <svg 
          viewBox="0 0 200 100" 
          className={`${infinitySize.className} drop-shadow-lg`}
          suppressHydrationWarning
          style={{
            shapeRendering: isSafari ? "optimizeQuality" : "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: isSafari ? "optimizeQuality" : "crisp-edges",
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            ...(isSafari && {
              WebkitFontSmoothing: "antialiased",
              WebkitTextStroke: "0.1px transparent",
            }),
          }}
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4CD787" />
              <stop offset="50%" stopColor="#CFB53B" />
              <stop offset="100%" stopColor="#4834D4" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%" suppressHydrationWarning>
              <feGaussianBlur stdDeviation={isSafari ? "1" : "1.5"} result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Infinity path - Safari optimized rendering */}
          <motion.path
            d="M50 50 C50 25, 75 25, 100 50 C125 75, 150 75, 150 50 C150 25, 125 25, 100 50 C75 75, 50 75, 50 50"
            fill="none"
            stroke="url(#infinityGradient)"
            strokeWidth={screenSize.width < 640 ? "4" : screenSize.width < 1024 ? "5" : "6"}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={isSafari ? "none" : "url(#glow)"}
            suppressHydrationWarning
            style={{
              vectorEffect: isSafari ? "none" : "non-scaling-stroke",
              strokeMiterlimit: "10",
              paintOrder: "stroke fill markers",
              ...(isSafari && {
                WebkitTransform: "translateZ(0)",
                transform: "translateZ(0)",
              }),
            }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </svg>

      </motion.div>
    </div>
  )
}
