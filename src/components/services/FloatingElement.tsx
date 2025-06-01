"use client"
import { motion } from "framer-motion"

interface FloatingElementProps {
  delay?: number
  duration?: number
  size?: number
  color?: string
  left: string
  top: string
}

export default function FloatingElement({
  delay = 0,
  duration = 10,
  size = 300,
  color = "#4CD787",
  left,
  top,
}: FloatingElementProps) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl opacity-10 pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        left: left,
        top: top,
      }}
      animate={{
        y: [0, -10, 0, 10, 0],
        x: [0, 7, 0, -7, 0],
        scale: [1, 1.03, 1, 0.97, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "linear",
      }}
    />
  )
}
