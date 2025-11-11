import { useCanvas } from '@/hooks/use-canvas'
import { useRef, useEffect } from 'react'

type Star = {
  x: number
  y: number
  radius: number
  twinkleSpeed: number
  phase: number
  lastBrightness: number
  flickerSpeed: number
  flickerPhase: number
}

export function StarTwinklingField({
  minSize = 0.3,
  maxSize = 1.2,
  count = 240,
  flickerIntensity = 0.14,
  className,
}: {
  minSize?: number
  maxSize?: number
  count?: number
  flickerIntensity?: number
  className?: string
}) {
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const newStars: Star[] = []
    for (let i = 0; i < count; i++) {
      newStars.push({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * (maxSize - minSize) + minSize,
        twinkleSpeed: 0.3 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
        lastBrightness: 0,
        flickerSpeed: 5 + Math.random() * 10,
        flickerPhase: Math.random() * Math.PI * 2,
      })
    }
    starsRef.current = newStars
  }, [count, minSize, maxSize])

  const { canvasRef } = useCanvas({
    useInViewOptions: { once: false, margin: '-90px' },
    renderFrame: ({ width, height, ctx, time }) => {
      ctx.clearRect(0, 0, width, height)

      starsRef.current.forEach((star) => {
        const brightness = (1 + Math.sin(time * star.twinkleSpeed + star.phase)) / 2

        if (star.lastBrightness < 0.01 && brightness >= 0.01) {
          star.x = Math.random()
          star.y = Math.random()
          star.radius = Math.random() * (maxSize - minSize) + minSize
        }

        const starX = star.x * width
        const starY = star.y * height

        const flickerWave = (1 + Math.sin(time * star.flickerSpeed + star.flickerPhase)) / 2
        const flicker = 1 - flickerIntensity * flickerWave
        const finalBrightness = brightness * flicker
        const intensity = Math.pow(finalBrightness, 2)

        ctx.beginPath()
        ctx.arc(starX, starY, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${intensity})`
        ctx.fill()

        star.lastBrightness = brightness
      })
    },
  })

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
