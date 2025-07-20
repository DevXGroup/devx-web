"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

interface IntertwineAnimationProps {
  className?: string
  width?: number
  height?: number
}

export default function IntertwineAnimation({ 
  className = "", 
  width = 400, 
  height = 100 
}: IntertwineAnimationProps) {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Define the intertwined path data
  const path1 = `M 0,${height/2} Q ${width/4},${height/4} ${width/2},${height/2} Q ${width*3/4},${height*3/4} ${width},${height/2}`
  const path2 = `M 0,${height/2} Q ${width/4},${height*3/4} ${width/2},${height/2} Q ${width*3/4},${height/4} ${width},${height/2}`
  const path3 = `M ${width/8},${height/2} Q ${width*3/8},${height/8} ${width*5/8},${height/2} Q ${width*7/8},${height*7/8} ${width},${height/2}`

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        style={{ filter: "drop-shadow(0 0 8px rgba(76, 215, 135, 0.3))" }}
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4CD787" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#4CD787" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#CFB53B" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CFB53B" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#9d4edd" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#4834D4" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4834D4" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#4CD787" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9d4edd" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* First intertwined path */}
        <motion.path
          d={path1}
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1 
          }}
          transition={{
            duration: shouldReduceMotion ? 0.5 : 2,
            ease: "easeInOut",
            delay: 0.2
          }}
        />

        {/* Second intertwined path */}
        <motion.path
          d={path2}
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1 
          }}
          transition={{
            duration: shouldReduceMotion ? 0.5 : 2.5,
            ease: "easeInOut",
            delay: 0.6
          }}
        />

        {/* Third intertwined path */}
        <motion.path
          d={path3}
          stroke="url(#gradient3)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1 
          }}
          transition={{
            duration: shouldReduceMotion ? 0.5 : 3,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Animated dots that travel along the paths */}
        {!shouldReduceMotion && (
          <>
            <motion.circle
              r="3"
              fill="#4CD787"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            >
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path={path1}
                begin="2s"
              />
            </motion.circle>

            <motion.circle
              r="2.5"
              fill="#CFB53B"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path={path2}
                begin="3s"
              />
            </motion.circle>

            <motion.circle
              r="2"
              fill="#9d4edd"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path={path3}
                begin="4s"
              />
            </motion.circle>
          </>
        )}

        {/* Connecting nodes at intersection points */}
        <motion.circle
          cx={width/2}
          cy={height/2}
          r="4"
          fill="#4CD787"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: shouldReduceMotion ? 0.5 : 3.5,
            ease: "easeOut"
          }}
        />
        
        <motion.circle
          cx={width/2}
          cy={height/2}
          r="8"
          fill="none"
          stroke="#4CD787"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: shouldReduceMotion ? 1 : [1, 1.5, 1], 
            opacity: shouldReduceMotion ? 0.5 : [0.5, 0.8, 0.5] 
          }}
          transition={{
            duration: shouldReduceMotion ? 0.5 : 2,
            repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
            delay: shouldReduceMotion ? 0.5 : 4,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  )
}