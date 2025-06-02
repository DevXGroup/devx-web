"use client"

import { useRef, useEffect } from "react"

export default function ParticleAnimation({ color = "#4CD787", density = 50, speed = 0.7 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<any[]>([])
  const requestRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Optimize by reducing particle count
    const actualDensity = Math.min(density, 10)

    // Simple particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      baseColor: string
      opacity: number
      private canvas: HTMLCanvasElement
      private ctx: CanvasRenderingContext2D

      constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * speed * 0.3
        this.speedY = (Math.random() - 0.5) * speed * 0.3
        this.baseColor = color
        this.opacity = Math.random() * 0.2 + 0.1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = this.canvas.width
        if (this.x > this.canvas.width) this.x = 0
        if (this.y < 0) this.y = this.canvas.height
        if (this.y > this.canvas.height) this.y = 0
      }

      draw() {
        if (isNaN(this.x) || isNaN(this.y)) return

        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        this.ctx.fillStyle = this.baseColor
        this.ctx.globalAlpha = this.opacity
        this.ctx.fill()
      }
    }

    // Initialize particles
    const particles: Particle[] = []
    for (let i = 0; i < actualDensity; i++) {
      particles.push(new Particle(canvas, ctx))
    }
    particlesRef.current = particles

    let previousTime = 0;
    // Animation loop with throttling
    const animate = (timestamp: DOMHighResTimeStamp) => {
      const deltaTime = timestamp - previousTime

      // Limit to ~30fps for better performance
      if (deltaTime > 33) {
        previousTime = timestamp

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < particles.length; i++) {
          particles[i].update()
          particles[i].draw()
        }
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    // Handle resize with debounce
    const handleResize = debounce(() => {
      if (canvas) {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
    }, 200)

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [color, density, speed])

  // Simple debounce function
  function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60" />
}
