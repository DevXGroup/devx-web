'use client'

import type React from 'react'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticIcon({
  children,
  strength = 30,
}: {
  children: React.ReactNode
  strength?: number
}) {
  const iconRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!iconRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = iconRef.current.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    // Calculate distance from center
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // Only apply effect within a certain radius
    if (distance < 100) {
      const maxMovement = strength
      const moveX = (distanceX / 100) * maxMovement
      const moveY = (distanceY / 100) * maxMovement
      setPosition({ x: moveX, y: moveY })
    } else {
      // Gradually return to center when mouse is far
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    // Smoothly animate back to center
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={iconRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative"
    >
      {children}
    </motion.div>
  )
}
