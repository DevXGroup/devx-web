'use client'

import { useRef, useEffect, useCallback, useMemo, CSSProperties } from 'react'

// Typed throttle helper
const throttle = <T extends (...args: any[]) => void>(func: T, limit: number) => {
  let lastCall = 0
  return function (this: unknown, ...args: Parameters<T>) {
    const now = performance.now()
    if (now - lastCall >= limit) {
      lastCall = now
      func.apply(this, args as unknown as any[])
    }
  }
}

// Hex -> RGB helper
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!m) return { r: 0, g: 0, b: 0 }
  const rStr = m[1] ?? '00'
  const gStr = m[2] ?? '00'
  const bStr = m[3] ?? '00'
  return {
    r: parseInt(rStr, 16),
    g: parseInt(gStr, 16),
    b: parseInt(bStr, 16),
  }
}

interface DotGridProps {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  speedTrigger?: number
  shockRadius?: number
  shockStrength?: number
  maxSpeed?: number
  resistance?: number
  returnDuration?: number
  className?: string
  style?: CSSProperties
}

interface Dot {
  cx: number
  cy: number
  xOffset: number
  yOffset: number
  _animating: boolean
}

interface PointerState {
  x: number
  y: number
  vx: number
  vy: number
  speed: number
  lastTime: number
  lastX: number
  lastY: number
}

const DotGrid = ({
  dotSize = 8,
  gap = 16,
  baseColor = '#4CD787',
  activeColor = '#4834D4',
  proximity = 80,
  speedTrigger = 100,
  shockRadius = 120,
  shockStrength = 3,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style,
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const dotsRef = useRef<Dot[]>([])
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  })
  const resizeHandlerRef = useRef<(() => void) | null>(null)

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor])
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor])

  const circlePath = useMemo(() => {
    if (typeof window === 'undefined' || !window.Path2D) return null

    const p = new Path2D()
    p.arc(0, 0, dotSize / 1.6, 0, Math.PI * 2)
    return p
  }, [dotSize])

  const retryCountRef = useRef(0)
  const MAX_RETRIES = 10

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const { width, height } = wrap.getBoundingClientRect()

    // Debug logging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('DotGrid buildGrid called:', { width, height })
    }

    // If container hasn't been sized yet, wait for next frame (with retry limit)
    if (width === 0 || height === 0) {
      if (retryCountRef.current < MAX_RETRIES) {
        if (process.env.NODE_ENV === 'development') {
          console.log('DotGrid container not sized yet, retrying...', retryCountRef.current + 1)
        }
        retryCountRef.current++
        setTimeout(() => requestAnimationFrame(buildGrid), 50) // Add small delay
        return
      } else {
        // Use fallback dimensions if retries exceeded
        if (process.env.NODE_ENV === 'development') {
          console.log('DotGrid max retries reached, using fallback dimensions')
        }
      }
    } else {
      // Reset retry count on successful measurement
      retryCountRef.current = 0
    }

    // Use minimum dimensions for stability
    const finalWidth = Math.max(width || 100, 100)
    const finalHeight = Math.max(height || 100, 100)

    const dpr = window.devicePixelRatio || 1

    canvas.width = finalWidth * dpr
    canvas.height = finalHeight * dpr
    canvas.style.width = `${finalWidth}px`
    canvas.style.height = `${finalHeight}px`
    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)

    // Add padding to prevent dots from overlapping with borders
    const padding = 4 // 4px padding from edges
    const availableWidth = finalWidth - padding * 2 - dotSize
    const availableHeight = finalHeight - padding * 2 - dotSize

    // Calculate number of columns and rows that will fit
    const cols = Math.max(Math.floor(availableWidth / (dotSize + gap)) + 1, 1)
    const rows = Math.max(Math.floor(availableHeight / (dotSize + gap)) + 1, 1)

    // Calculate actual spacing to distribute dots evenly across the container
    const actualGapX = cols > 1 ? (availableWidth - dotSize * (cols - 1)) / (cols - 1) : 0
    const actualGapY = rows > 1 ? (availableHeight - dotSize * (rows - 1)) / (rows - 1) : 0

    // Start position with padding
    const startX = padding + dotSize / 2
    const startY = padding + dotSize / 2

    const dots: Dot[] = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * (dotSize + actualGapX)
        const cy = startY + y * (dotSize + actualGapY)

        // Ensure dots stay within bounds with padding
        if (
          cx >= padding + dotSize / 2 &&
          cx <= finalWidth - padding - dotSize / 2 &&
          cy >= padding + dotSize / 2 &&
          cy <= finalHeight - padding - dotSize / 2
        ) {
          dots.push({ cx, cy, xOffset: 0, yOffset: 0, _animating: false })
        }
      }
    }
    dotsRef.current = dots
  }, [dotSize, gap])

  useEffect(() => {
    if (!circlePath) return

    let rafId: number
    const proxSq = proximity * proximity

    const draw = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: px, y: py } = pointerRef.current

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset
        const oy = dot.cy + dot.yOffset
        const dx = dot.cx - px
        const dy = dot.cy - py
        const dsq = dx * dx + dy * dy

        let style = baseColor
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq)
          const t = 1 - dist / proximity
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t)
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t)
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t)
          style = `rgb(${r},${g},${b})`
        }

        ctx.save()
        ctx.translate(ox, oy)
        ctx.fillStyle = style
        ctx.fill(circlePath as Path2D)
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafId)
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath])

  useEffect(() => {
    // Use multiple strategies to ensure proper initialization
    let timeouts: NodeJS.Timeout[] = []
    
    // Immediate attempt
    buildGrid()
    
    // Progressive delays to catch different initialization phases
    const delays = [50, 150, 300, 500, 800]
    delays.forEach(delay => {
      const timeout = setTimeout(() => {
        buildGrid()
      }, delay)
      timeouts.push(timeout)
    })

    // Keep existing ResizeObserver logic
    let ro = null
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid)
      if (wrapperRef.current) ro.observe(wrapperRef.current)
    } else if (typeof window !== 'undefined') {
      const onResize = () => buildGrid()
      resizeHandlerRef.current = onResize
      ;(
        window as unknown as {
          addEventListener: (
            type: string,
            listener: EventListenerOrEventListenerObject,
            options?: any
          ) => void
        }
      ).addEventListener('resize', onResize as unknown as EventListener)
    }

    // Start a sizing watchdog after the first buildGrid()
    const startSizingWatchdog = () => {
      const wrap = wrapperRef.current
      if (!wrap) return () => {}

      let disposed = false
      const rafIds: number[] = []
      const timeoutIds: number[] = []

      const getSize = () => ({ w: wrap.clientWidth || 0, h: wrap.clientHeight || 0 })
      let { w: lastW, h: lastH } = getSize()

      const safeBuildIfChanged = () => {
        if (disposed) return
        const { w, h } = getSize()
        // Guard: don't run when width or height is zero
        if (w === 0 || h === 0) return
        if (w !== lastW || h !== lastH) {
          lastW = w
          lastH = h
          buildGrid()
        }
      }

      // Chain 3 requestAnimationFrame calls, then re-measure
      rafIds[0] = requestAnimationFrame(() => {
        rafIds[1] = requestAnimationFrame(() => {
          rafIds[2] = requestAnimationFrame(() => {
            safeBuildIfChanged()
          })
        })
      })

      // Schedule setTimeouts at ~150 ms, 300 ms, 600 ms, and optionally 1000 ms
      ;[150, 300, 600, 1000].forEach((ms) => {
        const id = window.setTimeout(safeBuildIfChanged, ms)
        timeoutIds.push(id)
      })

      // Cleanup function to cancel timeouts and RAFs
      return () => {
        disposed = true
        rafIds.forEach((id) => cancelAnimationFrame(id))
        timeoutIds.forEach((id) => window.clearTimeout(id))
      }
    }
    const stopWatchdog = startSizingWatchdog()

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
      if (ro) ro.disconnect()
      else if (typeof window !== 'undefined' && resizeHandlerRef.current) {
        ;(
          window as unknown as {
            removeEventListener: (
              type: string,
              listener: EventListenerOrEventListenerObject,
              options?: any
            ) => void
          }
        ).removeEventListener('resize', resizeHandlerRef.current as unknown as EventListener)
        resizeHandlerRef.current = null
      }
      // Cleanup watchdog timers/RAFs
      if (stopWatchdog) stopWatchdog()
    }
  }, [buildGrid])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      let target: HTMLElement | null = canvas;
      let offsetX = 0;
      let offsetY = 0;

      while (target) {
        offsetX += target.offsetLeft;
        offsetY += target.offsetTop;
        target = target.offsetParent as HTMLElement | null;
      }

      const x = e.pageX - offsetX;
      const y = e.pageY - offsetY;

      const rect = canvas.getBoundingClientRect();
      // Check if pointer is within canvas bounds with small margin
      if (x < -10 || y < -10 || x > rect.width + 10 || y > rect.height + 10) return

      const now = performance.now()
      const pr = pointerRef.current
      const dt = pr.lastTime ? now - pr.lastTime : 16
      const dx = x - pr.x
      const dy = y - pr.y
      let vx = (dx / dt) * 1000
      let vy = (dy / dt) * 1000
      let speed = Math.hypot(vx, vy)
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed
        vx *= scale
        vy *= scale
        speed = maxSpeed
      }
      pr.lastTime = now
      pr.x = x
      pr.y = y
      pr.vx = vx
      pr.vy = vy
      pr.speed = speed

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - x, dot.cy - y)
        if (speed > speedTrigger && dist < proximity && !dot._animating) {
          dot._animating = true
          const pushX = (dot.cx - x) * 0.4 + vx * 0.002
          const pushY = (dot.cy - y) * 0.4 + vy * 0.002

          // Simple spring animation without GSAP
          let startTime: number | null = null
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / (returnDuration * 1000), 1)

            // Elastic ease out
            const t =
              progress === 1
                ? 1
                : 1 -
                  Math.pow(2, -10 * progress) *
                    Math.cos(((progress * 10 - 0.75) * (2 * Math.PI)) / 3)

            dot.xOffset = pushX * (1 - t)
            dot.yOffset = pushY * (1 - t)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              dot.xOffset = 0
              dot.yOffset = 0
              dot._animating = false
            }
          }

          requestAnimationFrame(animate)
        }
      }
    }

    const onClick = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return

      let target: HTMLElement | null = canvas;
      let offsetX = 0;
      let offsetY = 0;

      while (target) {
        offsetX += target.offsetLeft;
        offsetY += target.offsetTop;
        target = target.offsetParent as HTMLElement | null;
      }

      const cx = e.pageX - offsetX;
      const cy = e.pageY - offsetY;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy)
        if (dist < shockRadius && !dot._animating) {
          dot._animating = true
          const falloff = Math.max(0, 1 - dist / shockRadius)
          const pushX = (dot.cx - cx) * shockStrength * falloff
          const pushY = (dot.cy - cy) * shockStrength * falloff

          // Simple spring animation without GSAP
          let startTime: number | null = null
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / (returnDuration * 1000), 1)

            // Elastic ease out
            const t =
              progress === 1
                ? 1
                : 1 -
                  Math.pow(2, -10 * progress) *
                    Math.cos(((progress * 10 - 0.75) * (2 * Math.PI)) / 3)

            dot.xOffset = pushX * (1 - t)
            dot.yOffset = pushY * (1 - t)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              dot.xOffset = 0
              dot.yOffset = 0
              dot._animating = false
            }
          }

          requestAnimationFrame(animate)
        }
      }
    }

    const onMouseLeave = () => {
      // Reset all dots to their original positions when mouse leaves
      for (const dot of dotsRef.current) {
        dot.xOffset = 0
        dot.yOffset = 0
        dot._animating = false
      }
      // Reset pointer position outside canvas
      pointerRef.current.x = -1000
      pointerRef.current.y = -1000
    }

    const throttledMove = throttle(onMove, 16)
    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('mousemove', throttledMove as unknown as EventListener, {
        passive: true,
      })
      canvas.addEventListener('mouseleave', onMouseLeave, {
        passive: true,
      })
      canvas.addEventListener('click', onClick as unknown as EventListener)
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('mousemove', throttledMove as unknown as EventListener)
        canvas.removeEventListener('mouseleave', onMouseLeave)
        canvas.removeEventListener('click', onClick as unknown as EventListener)
      }
    }
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength])

  return (
    <section className={`h-full w-full relative ${className}`} style={style}>
      <div ref={wrapperRef} className="w-full h-full relative">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </section>
  )
}

export default DotGrid
