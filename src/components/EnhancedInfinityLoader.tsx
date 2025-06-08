"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface EnhancedInfinityLoaderProps {
  scrollThreshold?: number
  baseScale?: number
  maxScale?: number
}

export default function EnhancedInfinityLoader({
  scrollThreshold = 0.3,
  baseScale = 9.5,
  maxScale = 2,
}: EnhancedInfinityLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Smooth spring animations
  const scale = useSpring(
    useTransform(
      scrollYProgress,
      [0, scrollThreshold, 1 - scrollThreshold, 1],
      [baseScale, maxScale, maxScale, baseScale],
    ),
    { stiffness: 250, damping: 25, mass: 0.5 },
  )

  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.3, 1, 1, 0.3]), {
    stiffness: 250,
    damping: 55,
    mass: 0.5
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-32 w-full">
        <div className="w-16 h-16 border-4 border-[#4CD787]/30 border-t-[#4CD787] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="flex items-center justify-center min-h-[40vh] w-full">
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="relative"
      >
        {/* Main infinity symbol - simplified without rotation */}
        <svg width="200" height="100" viewBox="0 0 200 100" className="drop-shadow-lg">
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4CD787" />
              <stop offset="50%" stopColor="#CFB53B" />
              <stop offset="100%" stopColor="#4834D4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Infinity path - kept with animation */}
          <motion.path
            d="M50 50 C50 25, 75 25, 100 50 C125 75, 150 75, 150 50 C150 25, 125 25, 100 50 C75 75, 50 75, 50 50"
            fill="none"
            stroke="url(#infinityGradient)"
            strokeWidth="4"
            filter="url(#glow)"
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

        {/* Central subtle glow effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#4CD787] via-[#CFB53B] to-[#4834D4] blur-sm opacity-30" />
        </motion.div>
      </motion.div>
    </div>
  )
}
