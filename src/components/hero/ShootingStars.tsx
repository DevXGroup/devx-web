'use client'

import { useCanvas } from '@/hooks/use-canvas'
import { useEffect, useMemo, useRef } from 'react'

export default function ShootingStars({ count = 4 }: { count?: number }) {
  // Didn't used useMemo, because we update/randomize the stars when they go out of the screen (during frame render)
  const starsRef = useRef<
    {
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
      opacity: number
    }[]
  >([])

  useEffect(() => {
    starsRef.current = []
    for (let i = 0; i < count; i++) {
      // Randomize direction by setting different speedX and speedY values
      const angle = Math.random() * Math.PI * 2 // Random angle in radians
      const speed = Math.random() * 3 + 2 // Slower base speed (1-3 instead of 2-6)
      const cosAngle = Math.cos(angle)
      const sinAngle = Math.sin(angle)

      starsRef.current.push({
        x: Math.random(),
        y: Math.random() / 2, // Only in top half of screen
        length: Math.random() * 80 + 40,
        speedX: cosAngle * speed, // X component of velocity
        speedY: sinAngle * speed, // Y component of velocity
        size: Math.random() * 1.5 + 0.5,
        active: false,
        delay: i === 0 ? 0 : Math.random() * 3 + 1, // Random delay 1-4 seconds
        angle,
        cosAngle,
        sinAngle,
        opacity: 0,
      })
    }
  }, [count])

  const gradientPattern = useMemo(() => {
    {
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
  }, [])

  const { canvasRef } = useCanvas({
    preload: false,
    renderCondition: () => {
      if (!starsRef.current.length) return false
      return true
    },
    renderFrame: ({ ctx, width, height, time, delta }) => {
      const stars = starsRef.current
      ctx.clearRect(0, 0, width, height)

      // Update and draw stars
      stars.forEach((star) => {
        if (!star.active) {
          star.delay -= delta
          if (star.delay <= 0) {
            star.active = true
            // Reset position when activating
            star.x = Math.random()
            star.y = Math.random() / 2
            star.opacity = 0
          }

          return
        }

        star.opacity += delta * 0.5
        const opacity = star.opacity * 0.8

        // Move star with separate X and Y speeds
        star.x += star.speedX / width
        star.y += star.speedY / height
        const starX = star.x * width
        const starY = star.y * height

        // Use optimized gradient drawing if available
        if (gradientPattern) {
          ctx.save()
          ctx.translate(starX, starY)
          ctx.rotate(star.angle)
          ctx.globalAlpha = opacity
          // Draw backward (negative offset) so trail is behind the star
          ctx.drawImage(gradientPattern, -star.length, -star.size / 2, star.length, star.size)
          ctx.restore()
        } else {
          // Fallback to gradient creation (same as before)

          const trailEndX = starX - star.cosAngle * star.length
          const trailEndY = starY - star.sinAngle * star.length

          ctx.beginPath()
          ctx.moveTo(starX, starY)
          const gradient = ctx.createLinearGradient(starX, starY, trailEndX, trailEndY)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.lineTo(trailEndX, trailEndY)
          ctx.strokeStyle = gradient
          ctx.lineWidth = star.size
          ctx.stroke()
        }

        // Reset star if it goes off screen
        const OFFSCREEN_MARGIN = star.length
        if (
          starX < -OFFSCREEN_MARGIN ||
          starX > width + OFFSCREEN_MARGIN ||
          starY < -OFFSCREEN_MARGIN ||
          starY > height + OFFSCREEN_MARGIN
        ) {
          star.active = false
          star.delay = Math.random() * 3 + 1

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
    },
  })

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   if (!canvas) return

  //   // const ctx = canvas.getContext('2d', {
  //   //   alpha: true,
  //   //   desynchronized: true, // Hint for better performance
  //   // })
  //   // if (!ctx) return

  //   // Track if page is visible to pause animation when hidden
  //   // let isPageVisible = !document.hidden
  //   // let width = 0
  //   // let height = 0
  //   // let dpr = 1

  //   // // Set canvas dimensions to match window with proper DPR
  //   // const resizeCanvas = () => {
  //   //   const rect = canvas.getBoundingClientRect()
  //   //   dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2x for performance
  //   //   width = rect.width
  //   //   height = rect.height

  //   //   canvas.width = rect.width * dpr
  //   //   canvas.height = rect.height * dpr
  //   //   canvas.style.width = `${rect.width}px`
  //   //   canvas.style.height = `${rect.height}px`
  //   //   ctx.scale(dpr, dpr)
  //   // }

  //   let lastTime = 0
  //   const animate = (time: number) => {
  //     // Skip animation if page is not visible
  //     if (!isPageVisible) {
  //       lastTime = time
  //       requestAnimationFrame(animate)
  //       return
  //     }

  //     const deltaTime = time - lastTime
  //     lastTime = time

  //     // Clear canvas with faster method

  //     requestAnimationFrame(animate)
  //   }

  //   const animationId = requestAnimationFrame(animate)

  //   return () => {
  //     window.removeEventListener('resize', throttledResize)
  //     document.removeEventListener('visibilitychange', handleVisibilityChange)
  //     clearTimeout(resizeTimeout)
  //     cancelAnimationFrame(animationId)
  //   }
  // }, [])

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
