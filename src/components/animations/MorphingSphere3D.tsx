'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface MorphingSphere3DProps {
  isTyping?: boolean
  typingIntensity?: number
}

const MorphingSphere3D = ({ isTyping = false, typingIntensity = 0 }: MorphingSphere3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      ctx.imageSmoothingEnabled = true
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Create initial particles
    const createParticles = () => {
      const newParticles: Particle[] = []
      const baseColors = ['#4CD787', '#9d4edd', '#4834D4', '#FFD700', '#ff6b6b']

      for (let i = 0; i < 20; i++) {
        // Reduced particle count for subtlety
        newParticles.push({
          id: i,
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 1.5, // Slower movement
          vy: (Math.random() - 0.5) * 1.5,
          life: 0,
          maxLife: Math.random() * 300 + 200, // Longer life
          color: baseColors[Math.floor(Math.random() * baseColors.length)] || '#4CD787',
          size: Math.random() * 2 + 1, // Smaller particles
        })
      }
      setParticles(newParticles)
    }

    createParticles()

    const animate = () => {
      timeRef.current += 0.015 // Slower animation
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw AI messaging blob - positioned like a chat bubble
      const centerX = canvas.offsetWidth * 0.3 // Move left (30% from left)
      const centerY = canvas.offsetHeight * 0.7 // Move down (70% from top)
      const baseRadiusX = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.15 // Wider oval
      const baseRadiusY = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.1 // Shorter height for oval

      // Typing response - pulse and color shift
      const typingPulse = isTyping ? 1 + typingIntensity * 0.3 : 1
      const typingColorShift = isTyping ? typingIntensity * 0.5 : 0

      // Create smooth morphing blob
      ctx.beginPath()
      const points = 8 // Much fewer points for smooth blob
      const controlPoints = []

      // Generate control points for oval AI messaging blob
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2

        // Create oval shape with different X and Y radii
        const radiusModulationX =
          Math.sin(timeRef.current * 1.2 + angle * 1.5) * 6 +
          Math.cos(timeRef.current * 0.8 + i * 0.6) * 4
        const radiusModulationY =
          Math.sin(timeRef.current * 1.0 + angle * 1.8) * 4 +
          Math.cos(timeRef.current * 1.1 + i * 0.7) * 3

        const radiusX = (baseRadiusX + radiusModulationX) * typingPulse
        const radiusY = (baseRadiusY + radiusModulationY) * typingPulse

        controlPoints.push({
          x: centerX + Math.cos(angle) * radiusX,
          y: centerY + Math.sin(angle) * radiusY,
        })
      }

      // Draw smooth curves between points
      if (controlPoints[0]) {
        ctx.moveTo(controlPoints[0].x, controlPoints[0].y)
      }

      for (let i = 0; i < points; i++) {
        const current = controlPoints[i]
        const next = controlPoints[(i + 1) % points]
        const nextNext = controlPoints[(i + 2) % points]
        const prev = controlPoints[(i - 1 + points) % points]

        if (!current || !next || !nextNext || !prev) continue

        // Calculate control points for smooth curves
        const cp1x = current.x + (next.x - prev.x) * 0.2
        const cp1y = current.y + (next.y - prev.y) * 0.2
        const cp2x = next.x - (nextNext.x - current.x) * 0.2
        const cp2y = next.y - (nextNext.y - current.y) * 0.2

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, next.x, next.y)
      }

      ctx.closePath()

      // Dynamic gradient based on typing state - adjusted for oval
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(baseRadiusX, baseRadiusY) * 2
      )
      if (isTyping) {
        // Typing colors - warmer, more vibrant
        gradient.addColorStop(0, `rgba(255, 215, 0, ${0.2 + typingColorShift * 0.1})`) // Gold
        gradient.addColorStop(0.5, `rgba(157, 78, 221, ${0.15 + typingColorShift * 0.08})`) // Purple
        gradient.addColorStop(1, `rgba(76, 215, 135, ${0.1 + typingColorShift * 0.05})`) // Green
      } else {
        // Default colors - cooler, subtle
        gradient.addColorStop(0, 'rgba(76, 215, 135, 0.15)')
        gradient.addColorStop(0.5, 'rgba(157, 78, 221, 0.1)')
        gradient.addColorStop(1, 'rgba(72, 52, 212, 0.08)')
      }

      ctx.fillStyle = gradient
      ctx.fill()

      // Dynamic glowing border
      const glowIntensity = isTyping ? 0.4 + typingColorShift * 0.2 : 0.3
      const glowColor = isTyping ? '#FFD700' : '#4CD787'
      ctx.strokeStyle = `rgba(${isTyping ? '255, 215, 0' : '76, 215, 135'}, ${
        glowIntensity + Math.sin(timeRef.current * 3) * 0.2
      })`
      ctx.lineWidth = isTyping ? 2 + typingIntensity * 0.5 : 1.5
      ctx.shadowBlur = isTyping ? 15 + typingIntensity * 5 : 10
      ctx.shadowColor = glowColor
      ctx.stroke()

      // Draw and update particles
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Gravitational pull towards sphere center
          const dx = centerX - particle.x
          const dy = centerY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const force = 0.001

          let newVx = particle.vx + (dx / distance) * force
          let newVy = particle.vy + (dy / distance) * force

          // Orbital motion around sphere
          const orbitalForce = 0.02
          newVx += (-dy * orbitalForce) / distance
          newVy += (dx * orbitalForce) / distance

          // Apply some damping
          newVx *= 0.99
          newVy *= 0.99

          const newParticle = {
            ...particle,
            x: particle.x + newVx,
            y: particle.y + newVy,
            vx: newVx,
            vy: newVy,
            life: particle.life + 1,
          }

          // Wrap around edges
          if (newParticle.x < 0) newParticle.x = canvas.offsetWidth
          if (newParticle.x > canvas.offsetWidth) newParticle.x = 0
          if (newParticle.y < 0) newParticle.y = canvas.offsetHeight
          if (newParticle.y > canvas.offsetHeight) newParticle.y = 0

          // Reset particle if it's too old
          if (newParticle.life > newParticle.maxLife) {
            newParticle.x = Math.random() * canvas.offsetWidth
            newParticle.y = Math.random() * canvas.offsetHeight
            newParticle.life = 0
            newParticle.maxLife = Math.random() * 200 + 100
          }

          // Draw particle with typing response
          const baseOpacity = 1 - (newParticle.life / newParticle.maxLife) * 0.5
          const typingOpacity = isTyping
            ? baseOpacity * (1 + typingIntensity * 0.3)
            : baseOpacity * 0.7
          ctx.save()
          ctx.globalAlpha = Math.min(typingOpacity, 0.8)
          ctx.fillStyle = isTyping && Math.random() < 0.3 ? '#FFD700' : newParticle.color
          ctx.shadowBlur = isTyping ? 6 + typingIntensity * 2 : 4
          ctx.shadowColor = isTyping ? '#FFD700' : newParticle.color
          ctx.beginPath()
          ctx.arc(
            newParticle.x,
            newParticle.y,
            newParticle.size * (isTyping ? 1 + typingIntensity * 0.2 : 1),
            0,
            Math.PI * 2
          )
          ctx.fill()
          ctx.restore()

          // Draw connection lines (more subtle)
          prevParticles.forEach((otherParticle) => {
            if (otherParticle.id !== newParticle.id) {
              const dx = otherParticle.x - newParticle.x
              const dy = otherParticle.y - newParticle.y
              const distance = Math.sqrt(dx * dx + dy * dy)

              if (distance < 60) {
                // Shorter connection distance
                ctx.save()
                const lineOpacity = (1 - distance / 60) * (isTyping ? 0.25 : 0.15)
                ctx.globalAlpha = lineOpacity
                ctx.strokeStyle = isTyping ? '#FFD700' : '#4CD787'
                ctx.lineWidth = 0.5
                ctx.beginPath()
                ctx.moveTo(newParticle.x, newParticle.y)
                ctx.lineTo(otherParticle.x, otherParticle.y)
                ctx.stroke()
                ctx.restore()
              }
            }
          })

          return newParticle
        })
      )

      // Add subtle energy pulses - oval shaped
      const pulseRadiusX =
        (Math.sin(timeRef.current * (isTyping ? 6 : 3)) + 1) * 12 + baseRadiusX * typingPulse
      const pulseRadiusY =
        (Math.sin(timeRef.current * (isTyping ? 6 : 3)) + 1) * 8 + baseRadiusY * typingPulse
      ctx.save()
      ctx.globalAlpha = isTyping ? 0.15 + typingIntensity * 0.1 : 0.08
      ctx.strokeStyle = isTyping ? '#FFD700' : '#4CD787'
      ctx.lineWidth = isTyping ? 2 : 1
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, pulseRadiusX, pulseRadiusY, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [isTyping, typingIntensity])

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          mixBlendMode: 'screen',
          filter: 'brightness(0.8)',
        }}
      />

      {/* Subtle floating elements */}
      <div className="absolute inset-0 opacity-60">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-0.5 h-0.5 rounded-full ${
              isTyping ? 'bg-[#FFD700]' : 'bg-[#4CD787]'
            }`}
            style={{
              left: `${30 + i * 15}%`,
              top: `${40 + Math.sin(i) * 30}%`,
            }}
            animate={{
              scale: [0.5, isTyping ? 2 : 1.2, 0.5],
              opacity: [0.2, isTyping ? 0.8 : 0.5, 0.2],
              y: [0, isTyping ? -15 : -10, 0],
            }}
            transition={{
              duration: isTyping ? 2 : 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Subtle glowing orbs - typing responsive */}
      <motion.div
        className={`absolute top-1/3 left-1/3 w-2 h-2 rounded-full blur-sm ${
          isTyping ? 'bg-[#FFD700]' : 'bg-[#9d4edd]'
        }`}
        animate={{
          x: [0, isTyping ? 30 : 20, isTyping ? -20 : -15, 0],
          y: [0, isTyping ? -20 : -15, isTyping ? 15 : 10, 0],
          scale: [1, isTyping ? 1.8 : 1.3, 0.8, 1],
          opacity: [0.3, isTyping ? 0.7 : 0.5, 0.3, 0.3],
        }}
        transition={{
          duration: isTyping ? 4 : 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className={`absolute top-2/3 right-1/3 w-1.5 h-1.5 rounded-full blur-sm ${
          isTyping ? 'bg-[#FFD700]' : 'bg-[#4CD787]'
        }`}
        animate={{
          x: [0, isTyping ? -25 : -15, isTyping ? 20 : 12, 0],
          y: [0, isTyping ? 10 : 8, isTyping ? -18 : -12, 0],
          scale: [0.8, isTyping ? 1.5 : 1.1, 1, 0.8],
          opacity: [0.4, isTyping ? 0.8 : 0.6, 0.4, 0.4],
        }}
        transition={{
          duration: isTyping ? 3 : 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />
    </motion.div>
  )
}

export default MorphingSphere3D
