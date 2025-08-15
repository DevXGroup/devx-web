"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface RunningLineAnimationProps {
  className?: string
  color?: string
  duration?: number
}

export default function RunningLineAnimation({ 
  className = "", 
  color = "#4CD787", 
  duration = 3 
}: RunningLineAnimationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Top line */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"
        style={{ color }}
        initial={{ width: "0%", x: "-100%" }}
        animate={{ 
          width: ["0%", "100%", "0%"],
          x: ["0%", "0%", "100%"]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Right line */}
      <motion.div
        className="absolute top-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-current to-transparent"
        style={{ color }}
        initial={{ height: "0%", y: "-100%" }}
        animate={{ 
          height: ["0%", "100%", "0%"],
          y: ["0%", "0%", "100%"]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: duration * 0.25
        }}
      />
      
      {/* Bottom line */}
      <motion.div
        className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-current to-transparent"
        style={{ color }}
        initial={{ width: "0%", x: "100%" }}
        animate={{ 
          width: ["0%", "100%", "0%"],
          x: ["0%", "0%", "-100%"]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: duration * 0.5
        }}
      />
      
      {/* Left line */}
      <motion.div
        className="absolute bottom-0 left-0 w-0.5 bg-gradient-to-t from-transparent via-current to-transparent"
        style={{ color }}
        initial={{ height: "0%", y: "100%" }}
        animate={{ 
          height: ["0%", "100%", "0%"],
          y: ["0%", "0%", "-100%"]
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: duration * 0.75
        }}
      />
    </div>
  )
}