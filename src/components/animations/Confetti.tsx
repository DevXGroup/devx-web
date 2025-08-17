'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  color: string
  size: number
  shape: 'circle' | 'square' | 'triangle'
  life: number
  gravity: number
}

interface ConfettiProps {
  isActive: boolean
  onComplete?: () => void
  duration?: number
  particleCount?: number
  originX?: number
  originY?: number
}

const Confetti = ({ isActive, onComplete, duration = 3000, particleCount = 50, originX, originY }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<ConfettiPiece[]>([])
  const animationFrameRef = useRef<number>()
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()

    // Create confetti particles
    const createConfetti = () => {
      const newParticles: ConfettiPiece[] = []
      const colors = ['#4CD787', '#FFD700', '#9d4edd', '#4834D4', '#ff6b6b', '#00D2FF', '#ccff00']
      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle']

      for (let i = 0; i < particleCount; i++) {
        // Start from provided coordinates or default to center-bottom
        const startX = (originX ?? window.innerWidth / 2) + (Math.random() - 0.5) * 100
        const startY = (originY ?? window.innerHeight * 0.8) - 20 // Slightly above the button

        newParticles.push({
          id: i,
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 15, // Horizontal spread
          vy: -(Math.random() * 12 + 8), // Upward velocity
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          life: 0,
          gravity: Math.random() * 0.3 + 0.2
        })
      }
      particlesRef.current = newParticles
      startTimeRef.current = Date.now()
    }

    createConfetti()

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTimeRef.current

      if (elapsed > duration) {
        if (onComplete) onComplete()
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update particles without React state
      const particles = particlesRef.current
      particles.forEach((particle, index) => {
        // Update physics
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += particle.gravity // Apply gravity
        particle.vx *= 0.99 // Air resistance
        particle.rotation += particle.rotationSpeed
        particle.life += 1

        // Draw particle
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        
        // Fade out over time
        const fadeProgress = elapsed / duration
        ctx.globalAlpha = Math.max(0, 1 - fadeProgress * 0.8)

        ctx.fillStyle = particle.color
        ctx.strokeStyle = particle.color

        // Draw different shapes
        switch (particle.shape) {
          case 'circle':
            ctx.beginPath()
            ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
            ctx.fill()
            break
          
          case 'square':
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
            break
          
          case 'triangle':
            ctx.beginPath()
            ctx.moveTo(0, -particle.size / 2)
            ctx.lineTo(-particle.size / 2, particle.size / 2)
            ctx.lineTo(particle.size / 2, particle.size / 2)
            ctx.closePath()
            ctx.fill()
            break
        }

        ctx.restore()
      })

      // Filter out particles that are off-screen
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        if (particle.y > canvas.height + 100 || 
            particle.x < -100 || 
            particle.x > canvas.width + 100) {
          particles.splice(i, 1)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isActive, duration, particleCount, onComplete])

  if (!isActive) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 pointer-events-none z-50"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* Additional celebration elements */}
        <div className="absolute inset-0">
          {/* Radial burst effect */}
          <motion.div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: originX ?? '50%',
              top: originY ?? '80%',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="w-32 h-32 border-4 border-[#FFD700] rounded-full"></div>
          </motion.div>
          
          {/* Success message burst */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-[#4CD787] to-[#FFD700] text-black px-6 py-3 rounded-full font-bold text-lg shadow-2xl">
              🎉 Message Sent! 🎉
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Confetti