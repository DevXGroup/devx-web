'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Splash {
  id: number
  x: number
  y: number
}

interface SplashCursorProps {
  children: React.ReactNode
  className?: string
  splashColor?: string
}

export default function SplashCursor({
  children,
  className = '',
  splashColor = '#4CD787',
}: SplashCursorProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [splashes, setSplashes] = useState<Splash[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const splashIdRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
    }

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newSplash: Splash = {
          id: splashIdRef.current++,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }

        setSplashes((prev) => [...prev, newSplash])

        // Remove splash after animation
        setTimeout(() => {
          setSplashes((prev) => prev.filter((splash) => splash.id !== newSplash.id))
        }, 800)
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
      container.addEventListener('click', handleClick)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
        container.removeEventListener('click', handleClick)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}

      {/* Custom Cursor */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute pointer-events-none z-50 rounded-full border-2 mix-blend-difference"
            style={{
              left: cursorPosition.x - 16,
              top: cursorPosition.y - 16,
              width: 32,
              height: 32,
              borderColor: splashColor,
              backgroundColor: `${splashColor}20`,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: splashColor }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Splash Effects */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <motion.div
            key={splash.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute pointer-events-none z-40 rounded-full border-2"
            style={{
              left: splash.x - 20,
              top: splash.y - 20,
              width: 40,
              height: 40,
              borderColor: splashColor,
              backgroundColor: `${splashColor}10`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Ripple Effects on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0.1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute pointer-events-none z-30 rounded-full"
            style={{
              left: cursorPosition.x - 50,
              top: cursorPosition.y - 50,
              width: 100,
              height: 100,
              backgroundColor: splashColor,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
