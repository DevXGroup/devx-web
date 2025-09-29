"use client"

import { useEffect, useRef } from "react"

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Throttled resize handler to prevent resize loops
    let resizeTimeout: NodeJS.Timeout
    const throttledResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }

    resizeCanvas()
    window.addEventListener("resize", throttledResize)

    // Star properties - REDUCED from 15 to 8
    const stars: {
      x: number
      y: number
      length: number
      speedX: number
      speedY: number
      size: number
      active: boolean
      delay: number
    }[] = []

    // Create stars with randomized directions - reduced to 4 total
    for (let i = 0; i < 4; i++) {
      // Randomize direction by setting different speedX and speedY values
      const angle = Math.random() * Math.PI * 2 // Random angle in radians
      const speed = Math.random() * 2 + 1 // Slower base speed (1-3 instead of 2-6)

      stars.push({
        x: Math.random() * canvas.width,
        y: (Math.random() * canvas.height) / 2, // Only in top half of screen
        length: Math.random() * 80 + 40,
        speedX: Math.cos(angle) * speed, // X component of velocity
        speedY: Math.sin(angle) * speed, // Y component of velocity
        size: Math.random() * 1.5 + 0.5,
        active: false,
        delay: Math.random() * 6000 + 2000, // Random delay 2-8 seconds
      })
    }

    let lastTime = 0
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Count active stars
      let activeStarCount = stars.filter((star) => star.active).length

      // Update and draw stars
      stars.forEach((star) => {
        // Check if star should activate (limit to 2 active at a time)
        if (!star.active) {
          star.delay -= deltaTime
          if (star.delay <= 0 && activeStarCount < 2) {
            star.active = true
            activeStarCount++
            // Reset position when activating
            star.x = Math.random() * canvas.width
            star.y = (Math.random() * canvas.height) / 3
          }
          return
        }

        // Move star with separate X and Y speeds
        star.x += star.speedX
        star.y += star.speedY

        // Draw star
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)

        // Calculate trail end point based on velocity direction
        const angle = Math.atan2(star.speedY, star.speedX)
        const trailEndX = star.x - Math.cos(angle) * star.length
        const trailEndY = star.y - Math.sin(angle) * star.length

        // Create gradient for trail
        const gradient = ctx.createLinearGradient(star.x, star.y, trailEndX, trailEndY)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.lineTo(trailEndX, trailEndY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = star.size
        ctx.stroke()

        // Reset star if it goes off screen
        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
          star.active = false
          star.delay = Math.random() * 4000 + 3000 // Random delay 3-7 seconds before reappearing

          // Randomize direction again when resetting
          const newAngle = Math.random() * Math.PI * 2
          const newSpeed = Math.random() * 2 + 1 // Match the slower speed
          star.speedX = Math.cos(newAngle) * newSpeed
          star.speedY = Math.sin(newAngle) * newSpeed
        }
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", throttledResize)
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-5" />
}
