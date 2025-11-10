'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Individual 3D Cube Component
function Cube3D({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  const depth = size * 0.6 // Depth perspective

  return (
    <g>
      {/* Front face */}
      <motion.rect
        x={x}
        y={y}
        width={size}
        height={size}
        fill="none"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay,
        }}
      />

      {/* Back face (offset for perspective) */}
      <motion.rect
        x={x + depth}
        y={y - depth}
        width={size}
        height={size}
        fill="none"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay + 0.2,
        }}
      />

      {/* Connecting lines (edges creating depth) */}
      {/* Top-left to back */}
      <motion.line
        x1={x}
        y1={y}
        x2={x + depth}
        y2={y - depth}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay + 0.1,
        }}
      />
      {/* Top-right to back */}
      <motion.line
        x1={x + size}
        y1={y}
        x2={x + size + depth}
        y2={y - depth}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay + 0.15,
        }}
      />
      {/* Bottom-left to back */}
      <motion.line
        x1={x}
        y1={y + size}
        x2={x + depth}
        y2={y + size - depth}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay + 0.2,
        }}
      />
      {/* Bottom-right to back */}
      <motion.line
        x1={x + size}
        y1={y + size}
        x2={x + size + depth}
        y2={y + size - depth}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: delay + 0.25,
        }}
      />
    </g>
  )
}

export default function GridBackground3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations for mouse movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Transform mouse position to rotation and translation
  const rotateY = useTransform(springX, [-1, 1], [-5, 5])
  const rotateX = useTransform(springY, [-1, 1], [5, -5])
  const translateX = useTransform(springX, [-1, 1], [-10, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX - centerX) / (rect.width / 2)
      const y = (e.clientY - centerY) / (rect.height / 2)

      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Generate cube grid pattern
  const cubes = []
  const cubeSize = 60
  const spacing = 80
  const cols = 5
  const rows = 3

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cubes.push({
        x: col * spacing + 20,
        y: row * spacing + 20,
        delay: (row * cols + col) * 0.1,
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Cube Grid Background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          x: [0, 15, -15, 0],
          y: [0, -8, 8, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            translateX,
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Multiple 3D Cubes */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 450 300"
            style={{ transform: 'translateZ(0)' }}
          >
            {cubes.map((cube, index) => (
              <Cube3D key={index} x={cube.x} y={cube.y} size={cubeSize} delay={cube.delay} />
            ))}
          </svg>

          {/* Subtle accent glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(204, 255, 0, 0.03) 0%, transparent 60%)',
            }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
