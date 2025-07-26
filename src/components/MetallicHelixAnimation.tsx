"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface MetallicHelixAnimationProps {
  className?: string
  width?: number
  height?: number
}

export default function MetallicHelixAnimation({ 
  className = "", 
  width = 1400, 
  height = 800 
}: MetallicHelixAnimationProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`flex justify-center items-center ${className}`} style={{ width, height }}>
        <div className="w-8 h-8 border-2 border-[#4CD787]/30 border-t-[#4CD787] rounded-full animate-spin" />
      </div>
    )
  }

  // Generate slanted metallic helix that extends to top and fades out
  const generateSlantedMetallicHelix = (offset: number = 0, amplitude: number = 180) => {
    const points = []
    const segments = 80
    const frequency = 3.2 // More twists for dramatic effect
    const slantAngle = 15 // Degrees of slant
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const angle = (t * frequency * Math.PI * 2) + offset
      
      // Create slanted helix with stronger metallic curves
      const baseX = width / 2 + Math.cos(angle) * amplitude * (1 - t * 0.2)
      const slantOffset = (height - (height * t)) * Math.tan((slantAngle * Math.PI) / 180) * 0.3
      const x = isFinite(baseX + slantOffset) ? baseX + slantOffset : width / 2
      
      // Start from top of viewport and go down
      const y = isFinite(height * t) ? height * t : 0
      const z = isFinite(Math.sin(angle) * 60) ? Math.sin(angle) * 60 : 0 // Enhanced depth for metallic effect
      
      // Opacity fading towards top
      const opacity = Math.max(0.1, t * 0.9 + 0.1)
      
      points.push({ x, y, z, t, angle, opacity })
    }
    return points
  }

  const helix1 = generateSlantedMetallicHelix(0, 180)
  const helix2 = generateSlantedMetallicHelix(Math.PI, 180)

  // Create smooth curve path with enhanced metallic effect
  const createSmoothPath = (points: any[]) => {
    if (points.length < 2) return ""
    
    // Ensure first point is valid
    const firstX = isFinite(points[0].x) ? points[0].x : 0
    const firstY = isFinite(points[0].y) ? points[0].y : 0
    let path = `M ${firstX} ${firstY}`
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      const next = points[i + 1] || curr
      
      // Validate all coordinates to prevent NaN
      const validCurrX = isFinite(curr.x) ? curr.x : prev.x
      const validCurrY = isFinite(curr.y) ? curr.y : prev.y
      const validNextX = isFinite(next.x) ? next.x : curr.x
      const validNextY = isFinite(next.y) ? next.y : curr.y
      const validPrevX = isFinite(prev.x) ? prev.x : 0
      const validPrevY = isFinite(prev.y) ? prev.y : 0
      
      // Enhanced control points for more dramatic metallic curves
      const cp1x = validPrevX + (validCurrX - validPrevX) * 0.4
      const cp1y = validPrevY + (validCurrY - validPrevY) * 0.4
      const cp2x = validCurrX - (validNextX - validCurrX) * 0.4
      const cp2y = validCurrY - (validNextY - validCurrY) * 0.4
      
      // Final validation before adding to path
      const finalCP1X = isFinite(cp1x) ? cp1x : validPrevX
      const finalCP1Y = isFinite(cp1y) ? cp1y : validPrevY
      const finalCP2X = isFinite(cp2x) ? cp2x : validCurrX
      const finalCP2Y = isFinite(cp2y) ? cp2y : validCurrY
      
      path += ` C ${finalCP1X} ${finalCP1Y}, ${finalCP2X} ${finalCP2Y}, ${validCurrX} ${validCurrY}`
    }
    
    return path
  }

  const path1 = createSmoothPath(helix1)
  const path2 = createSmoothPath(helix2)

  return (
    <div className={`absolute inset-0 w-full overflow-hidden ${className}`}>
      {/* Fade out gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          willChange: "transform, opacity",
        }}
        className="relative w-full h-full flex justify-center items-start"
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="overflow-visible"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: "optimizeQuality",
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
        >
          <defs>
            {/* Enhanced metallic gradients for slanted helix */}
            <linearGradient id="metallicRope1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8F8F8" />
              <stop offset="10%" stopColor="#4CD787" />
              <stop offset="25%" stopColor="#C0C0C0" />
              <stop offset="40%" stopColor="#CFB53B" />
              <stop offset="55%" stopColor="#E0E0E0" />
              <stop offset="70%" stopColor="#4834D4" />
              <stop offset="85%" stopColor="#BEBEBE" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
            
            <linearGradient id="metallicRope2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="15%" stopColor="#9d4edd" />
              <stop offset="30%" stopColor="#E0E0E0" />
              <stop offset="45%" stopColor="#CFB53B" />
              <stop offset="60%" stopColor="#C0C0C0" />
              <stop offset="75%" stopColor="#4CD787" />
              <stop offset="90%" stopColor="#F8F8F8" />
              <stop offset="100%" stopColor="#F0F0F0" />
            </linearGradient>

            {/* Enhanced radial gradients for metallic depth */}
            <radialGradient id="ropeHighlight1" cx="25%" cy="25%" r="75%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="30%" stopColor="#4CD787" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#CFB53B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4834D4" stopOpacity="0.1" />
            </radialGradient>
            
            <radialGradient id="ropeHighlight2" cx="75%" cy="25%" r="75%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="30%" stopColor="#9d4edd" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#CFB53B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#4CD787" stopOpacity="0.1" />
            </radialGradient>

            {/* Fade gradient for top/bottom */}
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>

            {/* Enhanced glow and shadow effects */}
            <filter id="metallicGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="metallicShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.3"/>
            </filter>

            {/* Animation gradients for flowing effect */}
            <linearGradient id="flowingGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4CD787" stopOpacity="0">
                <animate attributeName="stop-opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#CFB53B" stopOpacity="0.8">
                <animate attributeName="stop-opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" begin="0.5s" />
              </stop>
              <stop offset="100%" stopColor="#4834D4" stopOpacity="0">
                <animate attributeName="stop-opacity" values="0;1;0" dur="3s" repeatCount="indefinite" begin="1s" />
              </stop>
            </linearGradient>
          </defs>

          {/* Enhanced shadow layers for depth */}
          <motion.path
            d={path1}
            fill="none"
            stroke="#000000"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.3}
            style={{ 
              transform: "translate(4px, 6px)",
              vectorEffect: "non-scaling-stroke",
            }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 0.1
            }}
          />

          <motion.path
            d={path2}
            fill="none"
            stroke="#000000"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.3}
            style={{ 
              transform: "translate(4px, 6px)",
              vectorEffect: "non-scaling-stroke",
            }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          {/* Main metallic helix strands - enhanced */}
          <motion.path
            d={path1}
            fill="none"
            stroke="url(#metallicRope1)"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#metallicShadow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 0.2
            }}
            style={{
              vectorEffect: "non-scaling-stroke",
            }}
          />

          <motion.path
            d={path2}
            fill="none"
            stroke="url(#metallicRope2)"
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#metallicShadow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 0.6
            }}
            style={{
              vectorEffect: "non-scaling-stroke",
            }}
          />

          {/* Enhanced highlight layers for metallic shine */}
          <motion.path
            d={path1}
            fill="none"
            stroke="url(#ropeHighlight1)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 0.8
            }}
            style={{
              vectorEffect: "non-scaling-stroke",
            }}
          />

          <motion.path
            d={path2}
            fill="none"
            stroke="url(#ropeHighlight2)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 1
            }}
            style={{
              vectorEffect: "non-scaling-stroke",
            }}
          />

          {/* Additional metallic sheen layers */}
          <motion.path
            d={path1}
            fill="none"
            stroke="url(#fadeGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#metallicGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 1.2
            }}
            style={{
              vectorEffect: "non-scaling-stroke",
            }}
          />

          <motion.path
            d={path2}
            fill="none"
            stroke="url(#fadeGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#metallicGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              delay: 1.4
            }}
            style={{
              vectorEffect: "non-scaling-stroke",
            }}
          />

          {/* Enhanced continuous flowing animation */}
          <motion.g
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear"
            }}
            style={{ transformOrigin: `${width/2}px ${height/2}px` }}
          >
            {/* Enhanced rotating metallic highlights */}
            <motion.circle
              cx={width/2 - 120}
              cy={height/4}
              r="8"
              fill="url(#ropeHighlight1)"
              opacity={0.8}
              animate={{ 
                scale: [1, 2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
              filter="url(#metallicGlow)"
            />
            <motion.circle
              cx={width/2 + 120}
              cy={height*3/4}
              r="8"
              fill="url(#ropeHighlight2)"
              opacity={0.8}
              animate={{ 
                scale: [2, 1, 2],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2
              }}
              filter="url(#metallicGlow)"
            />
            
            {/* Additional metallic sparkles */}
            <motion.circle
              cx={width/2}
              cy={height/6}
              r="6"
              fill="#FFFFFF"
              opacity={0.9}
              animate={{ 
                scale: [0.5, 1.8, 0.5],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1
              }}
              filter="url(#metallicGlow)"
            />
            <motion.circle
              cx={width/2 - 80}
              cy={height/2}
              r="5"
              fill="#CFB53B"
              opacity={0.7}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 3
              }}
              filter="url(#metallicGlow)"
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  )
}