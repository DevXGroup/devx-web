'use client'

import { useEffect, useRef } from 'react'

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // Hint for better performance
    })
    if (!ctx) return

    // Track if page is visible to pause animation when hidden
    let isPageVisible = !document.hidden
    let width = 0
    let height = 0
    let dpr = 1

    // Set canvas dimensions to match window with proper DPR
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2x for performance
      width = rect.width
      height = rect.height

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
    }

    // Throttled resize handler to prevent resize loops
    let resizeTimeout: NodeJS.Timeout
    const throttledResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 150)
    }

    resizeCanvas()
    window.addEventListener('resize', throttledResize)

    // Visibility change handler to pause when tab is hidden
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

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
      angle: number
      cosAngle: number
      sinAngle: number
    }[] = []

    // Pre-create a reusable gradient canvas for better performance
    const createGradientPattern = () => {
      const gradCanvas = document.createElement('canvas')
      gradCanvas.width = 200
      gradCanvas.height = 2
      const gradCtx = gradCanvas.getContext('2d')
      if (!gradCtx) return null

      // Reversed gradient: transparent at start, bright at end
      // This way when drawn backward, the bright part is at current position
      const grad = gradCtx.createLinearGradient(0, 0, 200, 0)
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.8)')
      gradCtx.fillStyle = grad
      gradCtx.fillRect(0, 0, 200, 2)
      return gradCanvas
    }
    const gradientPattern = createGradientPattern()

    // Create stars with randomized directions - reduced to 4 total
    for (let i = 0; i < 4; i++) {
      // Randomize direction by setting different speedX and speedY values
      const angle = Math.random() * Math.PI * 2 // Random angle in radians
      const speed = Math.random() * 2 + 1 // Slower base speed (1-3 instead of 2-6)
      const cosAngle = Math.cos(angle)
      const sinAngle = Math.sin(angle)

      stars.push({
        x: Math.random() * width,
        y: (Math.random() * height) / 2, // Only in top half of screen
        length: Math.random() * 80 + 40,
        speedX: cosAngle * speed, // X component of velocity
        speedY: sinAngle * speed, // Y component of velocity
        size: Math.random() * 1.5 + 0.5,
        active: false,
        delay: Math.random() * 6000 + 2000, // Random delay 2-8 seconds
        angle,
        cosAngle,
        sinAngle,
      })
    }

    let lastTime = 0
    const animate = (time: number) => {
      // Skip animation if page is not visible
      if (!isPageVisible) {
        lastTime = time
        requestAnimationFrame(animate)
        return
      }

      const deltaTime = time - lastTime
      lastTime = time

      // Clear canvas with faster method
      ctx.clearRect(0, 0, width, height)

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
            star.x = Math.random() * width
            star.y = (Math.random() * height) / 3
          }
          return
        }

        // Move star with separate X and Y speeds
        star.x += star.speedX
        star.y += star.speedY

        // Use optimized gradient drawing if available
        if (gradientPattern) {
          ctx.save()
          ctx.translate(star.x, star.y)
          ctx.rotate(star.angle)
          ctx.globalAlpha = 0.8
          // Draw backward (negative offset) so trail is behind the star
          ctx.drawImage(gradientPattern, -star.length, -star.size / 2, star.length, star.size)
          ctx.restore()
        } else {
          // Fallback to gradient creation (same as before)

          const trailEndX = star.x - star.cosAngle * star.length
          const trailEndY = star.y - star.sinAngle * star.length

          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          const gradient = ctx.createLinearGradient(star.x, star.y, trailEndX, trailEndY)
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.lineTo(trailEndX, trailEndY)
          ctx.strokeStyle = gradient
          ctx.lineWidth = star.size
          ctx.stroke()
        }

        // Reset star if it goes off screen
        const OFFSCREEN_MARGIN = 40
        if (
          star.x < -OFFSCREEN_MARGIN ||
          star.x > width + OFFSCREEN_MARGIN ||
          star.y < -OFFSCREEN_MARGIN ||
          star.y > height + OFFSCREEN_MARGIN
        ) {
          star.active = false
          star.delay = Math.random() * 4000 + 3000 // Random delay 3-7 seconds before reappearing

          // Randomize direction again when resetting
          const newAngle = Math.random() * Math.PI * 2
          const newSpeed = Math.random() * 2 + 1 // Match the slower speed
          star.angle = newAngle
          star.cosAngle = Math.cos(newAngle)
          star.sinAngle = Math.sin(newAngle)
          star.speedX = star.cosAngle * newSpeed
          star.speedY = star.sinAngle * newSpeed
        }
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', throttledResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-5"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  )
}
