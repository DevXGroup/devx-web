"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type WavySeparatorProps = {
  color?: string
  height?: number
  opacity?: number
}

export default function WavySeparator({ color = "#9d4edd", height = 200, opacity = 0.2 }: WavySeparatorProps) {
  const [mounted, setMounted] = useState(false)
  
  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Validate inputs to prevent rendering issues
  const safeHeight = Math.max(50, Math.round(height))
  const safeOpacity = Math.max(0, Math.min(1, opacity))
  
  if (!mounted) {
    return <div style={{ height: `${safeHeight}px` }} className="w-full bg-black" />
  }
  
  // Define smoother wave paths with more fluid curves
  const createSmoothWavePath = (offset: number, amplitude: number, frequency: number) => {
    const points = []
    const width = 1440
    const steps = 100
    
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * width
      const baseY = safeHeight * 0.6
      const wave1 = Math.sin((x / width) * frequency * Math.PI + offset) * amplitude
      const wave2 = Math.sin((x / width) * frequency * 2 * Math.PI + offset * 1.5) * (amplitude * 0.3)
      const y = baseY + wave1 + wave2
      points.push([x, Math.max(y, safeHeight * 0.3)])
    }
    
    let path = `M0,${safeHeight}L`
    points.forEach(([x, y], i) => {
      if (i === 0) {
        path += `${x},${y}`
      } else {
        const prevPoint = points[i - 1]
        const controlX1 = prevPoint[0] + (x - prevPoint[0]) * 0.25
        const controlY1 = prevPoint[1]
        const controlX2 = prevPoint[0] + (x - prevPoint[0]) * 0.75  
        const controlY2 = y
        path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${x},${y}`
      }
    })
    path += ` L${width},${safeHeight} L0,${safeHeight}Z`
    return path
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: `${safeHeight}px`,
        maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
      }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          height: `${safeHeight}px`,
        }}
      >
        {/* Primary Wave Layer - Smooth continuous animation */}
        <motion.svg
          viewBox="0 0 1440 320"
          className="absolute w-full h-full"
          preserveAspectRatio="none"
          animate={{
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          <motion.path
            fill={color}
            fillOpacity={safeOpacity * 0.8}
            animate={{
              d: [
                `M0,${safeHeight}L0,${safeHeight * 0.6}C240,${safeHeight * 0.5},480,${safeHeight * 0.7},720,${safeHeight * 0.55}C960,${safeHeight * 0.4},1200,${safeHeight * 0.65},1440,${safeHeight * 0.5}L1440,${safeHeight}Z`,
                `M0,${safeHeight}L0,${safeHeight * 0.7}C240,${safeHeight * 0.6},480,${safeHeight * 0.4},720,${safeHeight * 0.65}C960,${safeHeight * 0.8},1200,${safeHeight * 0.45},1440,${safeHeight * 0.6}L1440,${safeHeight}Z`,
                `M0,${safeHeight}L0,${safeHeight * 0.55}C240,${safeHeight * 0.75},480,${safeHeight * 0.5},720,${safeHeight * 0.7}C960,${safeHeight * 0.35},1200,${safeHeight * 0.6},1440,${safeHeight * 0.45}L1440,${safeHeight}Z`,
                `M0,${safeHeight}L0,${safeHeight * 0.6}C240,${safeHeight * 0.5},480,${safeHeight * 0.7},720,${safeHeight * 0.55}C960,${safeHeight * 0.4},1200,${safeHeight * 0.65},1440,${safeHeight * 0.5}L1440,${safeHeight}Z`,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop",
            }}
          />
        </motion.svg>

        {/* Secondary Wave Layer - Offset animation for depth */}
        <motion.svg
          viewBox="0 0 1440 320"
          className="absolute w-full h-full"
          preserveAspectRatio="none"
          animate={{
            x: [20, 0, 20],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          <motion.path
            fill={color}
            fillOpacity={safeOpacity * 0.6}
            animate={{
              d: [
                `M0,${safeHeight}L0,${safeHeight * 0.75}C240,${safeHeight * 0.6},480,${safeHeight * 0.8},720,${safeHeight * 0.65}C960,${safeHeight * 0.5},1200,${safeHeight * 0.75},1440,${safeHeight * 0.6}L1440,${safeHeight}Z`,
                `M0,${safeHeight}L0,${safeHeight * 0.6}C240,${safeHeight * 0.75},480,${safeHeight * 0.55},720,${safeHeight * 0.8}C960,${safeHeight * 0.65},1200,${safeHeight * 0.5},1440,${safeHeight * 0.7}L1440,${safeHeight}Z`,
                `M0,${safeHeight}L0,${safeHeight * 0.8}C240,${safeHeight * 0.55},480,${safeHeight * 0.7},720,${safeHeight * 0.5}C960,${safeHeight * 0.75},1200,${safeHeight * 0.6},1440,${safeHeight * 0.55}L1440,${safeHeight}Z`,
                `M0,${safeHeight}L0,${safeHeight * 0.75}C240,${safeHeight * 0.6},480,${safeHeight * 0.8},720,${safeHeight * 0.65}C960,${safeHeight * 0.5},1200,${safeHeight * 0.75},1440,${safeHeight * 0.6}L1440,${safeHeight}Z`,
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop",
            }}
          />
        </motion.svg>

        {/* Accent Wave Layer - Neon green with subtle glow */}
        <motion.svg
          viewBox="0 0 1440 320"
          className="absolute w-full h-full"
          preserveAspectRatio="none"
          animate={{
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          <motion.path
            fill="#39FF14"
            fillOpacity={0.25}
            filter="drop-shadow(0 0 8px rgba(57, 255, 20, 0.3))"
            animate={{
              d: [
                `M0,${safeHeight}L0,${safeHeight * 0.8}C240,${safeHeight * 0.7},480,${safeHeight * 0.85},720,${safeHeight * 0.75}C960,${safeHeight * 0.9},1200,${safeHeight * 0.7},1440,${safeHeight * 0.8}L1440,${safeHeight}Z`,
                `M0,${safeHeight}L0,${safeHeight * 0.7}C240,${safeHeight * 0.85},480,${safeHeight * 0.6},720,${safeHeight * 0.9}C960,${safeHeight * 0.75},1200,${safeHeight * 0.8},1440,${safeHeight * 0.65}L1440,${safeHeight}Z`,
                `M0,${safeHeight}L0,${safeHeight * 0.85}C240,${safeHeight * 0.65},480,${safeHeight * 0.8},720,${safeHeight * 0.6}C960,${safeHeight * 0.85},1200,${safeHeight * 0.9},1440,${safeHeight * 0.75}L1440,${safeHeight}Z`,
                `M0,${safeHeight}L0,${safeHeight * 0.8}C240,${safeHeight * 0.7},480,${safeHeight * 0.85},720,${safeHeight * 0.75}C960,${safeHeight * 0.9},1200,${safeHeight * 0.7},1440,${safeHeight * 0.8}L1440,${safeHeight}Z`,
              ],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop",
            }}
          />
        </motion.svg>

        {/* Subtle glow effect */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(to bottom, transparent 60%, ${color}15 80%, ${color}25 100%)`,
            filter: `blur(2px)`,
          }}
        />
      </div>
    </div>
  )
}
