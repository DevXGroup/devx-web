"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SpiralAnimationProps {
  size?: number
  color?: string
  duration?: number
  className?: string
}

export default function SpiralAnimation({ 
  size = 400, 
  color = "#4CD787", 
  duration = 8,
  className = ""
}: SpiralAnimationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Generate spiral path with validation to prevent SVG parsing errors
  const generateSpiralPath = (size: number) => {
    if (!size || size <= 0 || !isFinite(size)) {
      return "M0,0"
    }
    
    const safeSize = Math.max(100, Math.round(size))
    const centerX = Math.round(safeSize / 2)
    const centerY = Math.round(safeSize / 2)
    
    // Ensure all values are valid numbers and properly rounded
    const segments = [
      `M${centerX},${centerY}`,
      `m-${Math.round(safeSize/4)},0`,
      `a${Math.round(safeSize/4)},${Math.round(safeSize/4)} 0 1,1 ${Math.round(safeSize/2)},0`,
      `a${Math.round(safeSize/6)},${Math.round(safeSize/6)} 0 1,1 -${Math.round(safeSize/3)},0`,
      `a${Math.round(safeSize/8)},${Math.round(safeSize/8)} 0 1,1 ${Math.round(safeSize/4)},0`,
      `a${Math.round(safeSize/12)},${Math.round(safeSize/12)} 0 1,1 -${Math.round(safeSize/6)},0`,
      `a${Math.round(safeSize/16)},${Math.round(safeSize/16)} 0 1,1 ${Math.round(safeSize/8)},0`,
      `a${Math.round(safeSize/20)},${Math.round(safeSize/20)} 0 1,1 -${Math.round(safeSize/10)},0`,
      `a${Math.round(safeSize/24)},${Math.round(safeSize/24)} 0 1,1 ${Math.round(safeSize/12)},0`,
      `a${Math.round(safeSize/28)},${Math.round(safeSize/28)} 0 1,1 -${Math.round(safeSize/14)},0`,
      `a${Math.round(safeSize/32)},${Math.round(safeSize/32)} 0 1,1 ${Math.round(safeSize/16)},0`
    ]
    
    return segments.join(' ')
  }

  const spiralPath = generateSpiralPath(size)

  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        <defs>
          <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          d={spiralPath}
          fill="none"
          stroke="url(#spiralGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            rotate: 360
          }}
          transition={{
            pathLength: { duration: duration, ease: "easeInOut" },
            opacity: { duration: 1 },
            rotate: { 
              duration: duration * 2, 
              repeat: Infinity, 
              ease: "linear" 
            }
          }}
        />
        
        {/* Animated dots along the spiral */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            r="3"
            fill={color}
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              offsetDistance: ["0%", "100%"],
            }}
            transition={{
              opacity: { duration: 2, repeat: Infinity, delay: i * 0.4 },
              offsetDistance: { duration: duration, repeat: Infinity, delay: i * 0.4, ease: "linear" }
            }}
            style={{
              offsetPath: `path('${spiralPath}')`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}