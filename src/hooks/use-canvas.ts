import { useInView, UseInViewOptions } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { usePerformanceOptimizedAnimation } from './use-performance-optimized-animation'

export interface UseCanvasRenderArgs {
  time: number
  width: number
  height: number
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  dpr: number
}

interface UseCanvasMouseArgs {
  mouseEvent: MouseEvent
  type: MouseEventType
  x: number
  y: number
  dpr: number
}

type MouseEventType = 'move' | 'enter' | 'leave'
export type RenderFunction = (e: UseCanvasRenderArgs) => void
export type RenderCondition = (e: UseCanvasRenderArgs) => boolean | void

export interface UseCanvasOptions {
  renderFrame?: RenderFunction
  // We use renderCondition to determine if the canvas should be rendered. It's useful for preloading to be successful.
  // For example, checking if states are ready before render.
  renderCondition?: RenderCondition
  preload?: boolean
  useInViewOptions?: UseInViewOptions
  // For canvas resolution handle
  useDPR?: boolean
  onResize?: () => void
  onMouse?: (e: UseCanvasMouseArgs) => void
  // skipping mouse event to optimize performance
  mouseThrottleTime?: number
  resizeDebounceTime?: number
  scrollThrottleTime?: number
}

export function useCanvas({
  renderFrame = () => {},
  renderCondition = () => true,
  preload = true,
  useDPR = false,
  useInViewOptions,
  resizeDebounceTime = 50,
  mouseThrottleTime = 8,
  scrollThrottleTime = 150,
  onResize,
  onMouse,
}: UseCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(canvasRef, useInViewOptions)
  const { isMobile } = usePerformanceOptimizedAnimation()
  const animationStateRef = useRef({
    time: 0,
    lastRenderTimestamp: 0,
    frameId: 0,
    isAlive: false,
    isPaused: false,
    isPreloaded: false,
  })
  const dpr = useMemo(() => {
    if (typeof window === 'undefined') return 1
    return isMobile ? 1 : window.devicePixelRatio || 1
  }, [isMobile])

  // Keep render function updated without breaking dependencies
  const renderFrameRef = useRef(renderFrame)
  const renderConditionRef = useRef(renderCondition)
  useEffect(() => {
    renderFrameRef.current = renderFrame
    renderConditionRef.current = renderCondition
  }, [renderFrame, renderCondition])

  useEffect(() => {
    animationStateRef.current.isPaused = !isInView
    if (!canvasRef.current) return
    // Reduce quality when not in view for performance
    canvasRef.current.style.imageRendering = isInView ? 'auto' : 'pixelated'
  }, [isInView])

  // Event handlers
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Resize Logic

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * (useDPR ? dpr : 1)
      canvas.height = canvas.offsetHeight * (useDPR ? dpr : 1)

      // Render when resized?
      // const ctx = canvas.getContext('2d');
      // if (ctx) {
      //   renderFrameRef.current(ctx, {
      //     ...
      //   });
      // }

      onResize?.()
    }

    let resizeTimeout: any = null
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, resizeDebounceTime)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    // Mouse Move Logic

    let lastMoveTime = 0
    let lastMouseEvent: MouseEvent | null = null
    let isMouseOverCanvas = false
    const handleMouseEvent = (event: MouseEvent, type: MouseEventType) => {
      if (!onMouse) return

      lastMouseEvent = event

      // enter and leave should be called immediately; except move
      if (type === 'move') {
        const now = performance.now()
        if (now - lastMoveTime < mouseThrottleTime) {
          return // Skip
        }
        lastMoveTime = now
      }

      if (type === 'enter') isMouseOverCanvas = true
      if (type === 'leave') isMouseOverCanvas = false

      const rect = canvas.getBoundingClientRect()
      const x = (event.clientX - rect.left) * (useDPR ? dpr : 1)
      const y = (event.clientY - rect.top) * (useDPR ? dpr : 1)

      if (
        (type === 'move' && x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) ||
        type === 'enter' ||
        type === 'leave'
      ) {
        onMouse({ x, y, mouseEvent: event, type, dpr })
      }
    }
    const handleMouseEnter = (e: MouseEvent) => {
      handleMouseEvent(e, 'enter')
    }
    const handleMouseLeave = (e: MouseEvent) => {
      handleMouseEvent(e, 'leave')
    }
    const handleMouseMove = (e: MouseEvent) => {
      handleMouseEvent(e, 'move')
    }

    // Only handle mouse if we have a mouse listener prop
    if (onMouse) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseenter', handleMouseEnter)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    }

    // Scroll Logic

    const updateMousePositionOnScroll = () => {
      if (!lastMouseEvent) return
      if (!onMouse) return

      const rect = canvas.getBoundingClientRect()

      // Check if the last known mouse position is within the canvas's NEW bounds
      const isNowOver =
        lastMouseEvent.clientX >= rect.left &&
        lastMouseEvent.clientX <= rect.right &&
        lastMouseEvent.clientY >= rect.top &&
        lastMouseEvent.clientY <= rect.bottom

      // Last status of the mouse position in relation to the canvas
      const wasOver = isMouseOverCanvas

      if (isNowOver && wasOver) {
        // Was inside, still inside -> Fire a 'move' to update position
        handleMouseEvent(lastMouseEvent, 'move')
      } else if (!isNowOver && wasOver) {
        // Was inside, now outside -> Fire a 'leave'
        handleMouseEvent(lastMouseEvent, 'leave')
      } else if (isNowOver && !wasOver) {
        // Was outside, now inside -> Fire an 'enter'
        handleMouseEvent(lastMouseEvent, 'enter')
      }
    }

    let scrollTimer: any = null;
    let throttleScroll = false
    const handleScroll = () => {
      if (throttleScroll) return;

      throttleScroll = true;

      updateMousePositionOnScroll()

      scrollTimer = setTimeout(() => {
        throttleScroll = false;
      }, scrollThrottleTime)
    }

    // for Scroll, I'm only using mouse updates (temporarily I guess?)
    if (onMouse) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (onMouse) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseenter', handleMouseEnter)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
        window.removeEventListener('scroll', handleScroll)
      }

      if (resizeTimeout) clearTimeout(resizeTimeout)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || typeof window === 'undefined') return

    const state = animationStateRef.current

    const createStateEventArgs = () =>
      ({
        time: state.time,
        width: canvas.width,
        height: canvas.height,
        canvas,
        ctx,
        dpr,
      }) satisfies UseCanvasRenderArgs

    const triggerRender = () => {
      const e = createStateEventArgs()
      const shouldRender = renderConditionRef.current(e)
      if (shouldRender !== false) renderFrameRef.current(e)
    }

    const animate = (timestamp: number) => {
      if (state.lastRenderTimestamp === 0) {
        state.lastRenderTimestamp = timestamp
      }

      const deltaTime = timestamp - state.lastRenderTimestamp
      state.lastRenderTimestamp = timestamp

      if (isInView) {
        // time updates only when the canvas is in view
        state.time += deltaTime / 1000 // to seconds
        triggerRender()
      } else if (preload && !state.isPreloaded) {
        // Preload it!
        state.isPreloaded = true
        triggerRender()
      }

      state.frameId = requestAnimationFrame(animate)
      state.isAlive = true
    }

    state.frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(state.frameId)
      state.isAlive = false
    }
  }, [isInView, preload])

  return { canvasRef, animationState: animationStateRef, isInView, dpr, isMobile }
}
