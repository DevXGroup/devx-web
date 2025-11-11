import { useCanvas } from '@/hooks/use-canvas'
import { useRef, useEffect } from 'react'

type CanvasStrokeStyle = string | CanvasGradient | CanvasPattern

interface GridOffset {
  x: number
  y: number
}

const GridAnimation = ({
  direction = 'right',
  speed = 1,
  borderColor = '#999',
  hoverFillColor = '#222',
  flickerColor = '#fff',
  squareSize = 40,
  randomFlicker = false,
  flickerInterval = 550,
  maxFlickerSquares = 10,
  showRadialGradient = true,
}: {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left'
  speed?: number
  borderColor?: CanvasStrokeStyle
  hoverFillColor?: CanvasStrokeStyle
  flickerColor?: CanvasStrokeStyle
  squareSize?: number
  randomFlicker?: boolean
  flickerInterval?: number
  maxFlickerSquares?: number
  showRadialGradient?: boolean
}) => {
  const numSquaresX = useRef<number>(0)
  const numSquaresY = useRef<number>(0)
  const gridOffset = useRef<GridOffset>({ x: 0, y: 0 })
  const hoveredSquareRef = useRef<GridOffset | null>(null)
  const flickerSquaresRef = useRef<Set<string>>(new Set())
  const timeSinceLastFlickerRef = useRef(0)
  const gradientRef = useRef<CanvasGradient | null>(null)

  const generateGradient = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    numSquaresX.current = Math.ceil(canvas.offsetWidth / squareSize) + 1
    numSquaresY.current = Math.ceil(canvas.offsetHeight / squareSize) + 1

    // Cache gradient on resize (only if needed and not on mobile)
    if (!showRadialGradient || isMobile) return

    gradientRef.current = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
    )
    gradientRef.current.addColorStop(0, 'rgba(0, 0, 0, 0.88)')
    gradientRef.current.addColorStop(0.35, 'rgba(0, 0, 0, 0.65)')
    gradientRef.current.addColorStop(0.65, 'rgba(0, 0, 0, 0.25)')
    gradientRef.current.addColorStop(1, 'rgba(0, 0, 0, 0)')
  }

  useEffect(() => {
    generateGradient()
  }, [])

  const { canvasRef, isMobile } = useCanvas({
    useDPR: true,
    onResize: () => {
      generateGradient()
    },
    onMouse: ({ x, y, type }) => {
      if (type === 'leave') {
        hoveredSquareRef.current = null
        return
      }

      hoveredSquareRef.current = { x, y }
    },
    renderCondition: () => {
      if (!numSquaresX.current || !numSquaresY.current) return false
      return true
    },
    renderFrame: ({ ctx, width, height, time, dpr }) => {
      ctx.clearRect(0, 0, width, height)

      const effectiveSpeed = Math.max(speed, 0.1) * dpr
      const scaledSquareSize = squareSize * dpr

      // Movement calculation

      switch (direction) {
        case 'right':
          gridOffset.current.x -= effectiveSpeed
          break
        case 'left':
          gridOffset.current.x += effectiveSpeed
          break
        case 'up':
          gridOffset.current.y += effectiveSpeed
          break
        case 'down':
          gridOffset.current.y -= effectiveSpeed
          break
        case 'diagonal':
          gridOffset.current.x -= effectiveSpeed
          gridOffset.current.y -= effectiveSpeed
          break
      }

      // Flicker timer and calculation

      if (randomFlicker) {
        timeSinceLastFlickerRef.current += time
        if (timeSinceLastFlickerRef.current >= flickerInterval) {
          flickerSquaresRef.current.clear()
          const numToFlicker = Math.floor(Math.random() * maxFlickerSquares) + 1
          for (let i = 0; i < numToFlicker; i++) {
            const x = Math.floor(Math.random() * numSquaresX.current)
            const y = Math.floor(Math.random() * numSquaresY.current)
            flickerSquaresRef.current.add(`${x}-${y}`)
          }
          timeSinceLastFlickerRef.current = 0
        }
      }

      // Render!

      ctx.lineWidth = Math.max(0.5, 0.5 * dpr)

      const startX = Math.floor(gridOffset.current.x / scaledSquareSize)
      const startY = Math.floor(gridOffset.current.y / scaledSquareSize)
      const endX = Math.ceil((gridOffset.current.x + width) / scaledSquareSize)
      const endY = Math.ceil((gridOffset.current.y + height) / scaledSquareSize)

      if (hoveredSquareRef.current) {
        const { x: mx, y: my } = hoveredSquareRef.current

        const x = Math.floor((mx + gridOffset.current.x) / scaledSquareSize)
        const y = Math.floor((my + gridOffset.current.y) / scaledSquareSize)

        const squareX = x * scaledSquareSize - gridOffset.current.x
        const squareY = y * scaledSquareSize - gridOffset.current.y
        if (
          squareX + scaledSquareSize > 0 &&
          squareX < width &&
          squareY + scaledSquareSize > 0 &&
          squareY < height
        ) {
          ctx.fillStyle = hoverFillColor
          // ctx.shadowColor = typeof borderColor === 'string' ? borderColor : '#FFD700'
          ctx.fillRect(squareX, squareY, scaledSquareSize, scaledSquareSize)
        }
      }

      if (randomFlicker) {
        flickerSquaresRef.current.forEach((key) => {
          const [gx, gy] = key.split('-').map(Number)
          const squareX = gx! * scaledSquareSize - gridOffset.current.x
          const squareY = gy! * scaledSquareSize - gridOffset.current.y
          // Simple bounds check to avoid drawing off-screen
          if (
            squareX + scaledSquareSize > 0 &&
            squareX < width &&
            squareY + scaledSquareSize > 0 &&
            squareY < height
          ) {
            ctx.fillStyle = flickerColor
            ctx.fillRect(squareX, squareY, scaledSquareSize, scaledSquareSize)
          }
        })
      }

      ctx.beginPath()

      // Vertical lines
      for (let gridX = startX; gridX <= endX; gridX++) {
        const x = gridX * scaledSquareSize - gridOffset.current.x
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }

      // Horizontal lines
      for (let gridY = startY; gridY <= endY; gridY++) {
        const y = gridY * scaledSquareSize - gridOffset.current.y
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }

      ctx.strokeStyle = borderColor
      ctx.shadowBlur = 0
      ctx.shadowColor = ''
      ctx.stroke()

      // Use cached gradient on desktop only (skip on mobile for performance)
      if (showRadialGradient && !isMobile && gradientRef.current) {
        ctx.fillStyle = gradientRef.current
        ctx.fillRect(0, 0, width, height)
      }
    },
  })

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full border-none block"
        style={{
          cursor: 'default',
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      ></canvas>
      {/* CSS-based gradient overlay for mobile (better performance than canvas) */}
      {/*<div className="absolute inset-0" style={{
        backgroundImage: 'repeating-linear-gradient(to right, #999 0 2px, transparent 1px 40px), repeating-linear-gradient(to bottom, #999 0 1px, transparent 2px 40px)',
        backgroundPosition: '0 0',
        backgroundSize: '40px 40px',
      }} />*/}
      {showRadialGradient && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0) 100%)',
            mixBlendMode: 'normal',
            opacity: 1,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default GridAnimation
