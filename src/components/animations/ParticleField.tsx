"use client"

import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface ParticleFieldProps {
  className?: string
  particleCount?: number
  colors?: string[]
}

export default function ParticleField({ 
  className = "", 
  particleCount = 50,
  colors = ["#4CD787", "#4834D4", "#FFD700", "#9d4edd"]
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)] || '#4CD787',
      life: 0,
      maxLife: Math.random() * 200 + 100
    })

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, createParticle)
    }

    const updateParticles = () => {
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += dx * force * 0.0002
          particle.vy += dy * force * 0.0002
        }

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.clientWidth
        if (particle.x > canvas.clientWidth) particle.x = 0
        if (particle.y < 0) particle.y = canvas.clientHeight
        if (particle.y > canvas.clientHeight) particle.y = 0

        // Respawn particle
        if (particle.life > particle.maxLife) {
          particlesRef.current[index] = createParticle()
        }
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      
      // Draw connections
      particlesRef.current.forEach((particle, i) => {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j]
          if (!other) continue
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 80) {
            const opacity = (80 - distance) / 80 * 0.1
            ctx.strokeStyle = `rgba(76, 215, 135, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        }
      })

      // Draw particles
      particlesRef.current.forEach(particle => {
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        )
        gradient.addColorStop(0, particle.color + "80")
        gradient.addColorStop(1, particle.color + "00")
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [shouldReduceMotion, particleCount, colors])

  if (shouldReduceMotion) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#4CD787]/5 via-transparent to-[#4834D4]/5" />
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  )
}