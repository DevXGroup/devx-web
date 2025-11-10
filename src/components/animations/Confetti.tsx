'use client'

import { useEffect, useRef } from 'react'
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

const Confetti = ({
  isActive,
  onComplete,
  duration = 3000,
  particleCount = 50,
  originX,
  originY,
}: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<ConfettiPiece[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number>(0)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

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
        const startX = (originX ?? window.innerWidth / 2) + (Math.random() - 0.5) * 50
        const startY = (originY ?? window.innerHeight * 0.8) - 20 // Slightly above the button

        newParticles.push({
          id: i,
          x: startX,
          y: startY,
          vx: (Math.random() - 0.5) * 18, // More horizontal spread
          vy: -(Math.random() * 15 + 10), // More upward velocity
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          color: colors[Math.floor(Math.random() * colors.length)] || '#4CD787',
          size: Math.random() * 4 + 2, // Smaller particles (2-6 instead of 4-12)
          shape: shapes[Math.floor(Math.random() * shapes.length)] || 'circle',
          life: 0,
          gravity: Math.random() * 0.25 + 0.15,
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
        if (onCompleteRef.current) onCompleteRef.current()
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
        if (
          particle &&
          (particle.y > canvas.height + 100 || particle.x < -100 || particle.x > canvas.width + 100)
        ) {
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
  }, [isActive, duration, particleCount, originX, originY])

  if (!isActive) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 pointer-events-none z-50"
      >
        <canvas ref={canvasRef} className="w-full h-full" style={{ pointerEvents: 'none' }} />
      </motion.div>
    </AnimatePresence>
  )
}

export default Confetti
