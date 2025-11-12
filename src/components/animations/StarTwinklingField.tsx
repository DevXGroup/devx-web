import { useCanvas } from '@/hooks/use-canvas'
import { useMemo } from 'react'

export function StarTwinklingField({
  minSize = 0.3,
  maxSize = 1.2,
  count = 240,
}: {
  minSize?: number
  maxSize?: number
  count?: number
}) {
  const stars = useMemo(() => {
    const stars: {
      x: number
      y: number
      radius: number
      baseBrightness: number
      twinkleSpeed: number
      // Staggered animation start for each star
      phase: number
      isBright: boolean
    }[] = []
    for (let i = 0; i < count; i++) {
      const isBright = Math.random() < 0.15
      stars.push({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * (maxSize - minSize) + minSize,
        baseBrightness: isBright ? 0.8 : 0.4,
        twinkleSpeed: 0.5 + Math.random() * 2.0,
        phase: Math.random() * Math.PI * 2,
        isBright,
      })
    }
    return stars
  }, [count, maxSize, minSize])

  const { canvasRef } = useCanvas({
    useInViewOptions: { once: false, margin: '-90px' },
    renderFrame: ({ width, height, ctx, time }) => {
      ctx.clearRect(0, 0, width, height)

      stars.forEach((star) => {
        const starX = star.x * width
        const starY = star.y * height

        const twinkle = Math.sin(time * star.twinkleSpeed + star.phase)
        const intensity = star.baseBrightness * (0.5 + 0.5 * twinkle)

        ctx.beginPath()
        ctx.arc(starX, starY, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`
        ctx.fill()

        // Add shine!
        if (star.isBright) {
          const glowRadius = star.radius * 3
          const gradient = ctx.createRadialGradient(starX, starY, 0, starX, starY, glowRadius)
          gradient.addColorStop(0, `rgba(255, 255, 255, ${intensity * 0.6})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.beginPath()
          ctx.arc(starX, starY, glowRadius, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })
    },
  })

  return (
    <div className="absolute inset-0 pointer-events-none -z-1">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
