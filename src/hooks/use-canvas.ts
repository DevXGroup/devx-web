import { useInView, UseInViewOptions } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { usePerformanceOptimizedAnimation } from './use-performance-optimized-animation'

/**
 * Arguments passed to the renderFrame callback on each animation frame
 */
export interface UseCanvasRenderArgs {
  /** Elapsed time in seconds since canvas initialization (only increments when in view) */
  time: number
  /** Time delta in seconds since last frame */
  delta: number
  /** Canvas width in pixels (scaled by DPR if useDPR is true) */
  width: number
  /** Canvas height in pixels (scaled by DPR if useDPR is true) */
  height: number
  /** 2D rendering context for drawing operations */
  ctx: CanvasRenderingContext2D
  /** Canvas HTML element reference */
  canvas: HTMLCanvasElement
  /** Device pixel ratio (1 on mobile, window.devicePixelRatio on desktop) */
  dpr: number
}

/**
 * Arguments passed to the onMouse callback when mouse events occur
 */
interface UseCanvasMouseArgs {
  /** Original mouse event */
  mouseEvent: MouseEvent
  /** Type of mouse event: 'move' (inside canvas), 'enter' (mouse enters), 'leave' (mouse exits) */
  type: MouseEventType
  /** Mouse X position relative to canvas (scaled by DPR if useDPR is true) */
  x: number
  /** Mouse Y position relative to canvas (scaled by DPR if useDPR is true) */
  y: number
  /** Device pixel ratio */
  dpr: number
}

type MouseEventType = 'move' | 'enter' | 'leave'
export type RenderFunction = (e: UseCanvasRenderArgs) => void
export type RenderCondition = (e: UseCanvasRenderArgs) => boolean | void

/**
 * Options for configuring the useCanvas hook
 */
export interface UseCanvasOptions {
  /** Callback function called on each animation frame with rendering context */
  renderFrame?: RenderFunction
  /**
   * Optional condition to determine if rendering should occur.
   * Useful for preventing render until required state is initialized.
   * Return false to skip rendering that frame.
   *
   * @example
   * renderCondition: ({ width, height }) => width > 0 && height > 0
   */
  renderCondition?: RenderCondition
  /**
   * If true, renders a single frame when canvas is off-screen for instant display when scrolled into view.
   * Improves perceived performance. Default: true
   */
  preload?: boolean
  /** Options passed to framer-motion's useInView hook for viewport detection */
  useInViewOptions?: UseInViewOptions
  /**
   * If true, scales canvas dimensions by device pixel ratio for sharp rendering on retina displays.
   * Uses 1x on mobile, devicePixelRatio on desktop. Default: false
   */
  useDPR?: boolean
  /** Callback when canvas is resized (debounced by resizeDebounceTime) */
  onResize?: () => void
  /**
   * Callback for mouse events over the canvas.
   * Mouse position is automatically tracked and throttled for performance.
   *
   * @example
   * onMouse: ({ x, y, type }) => {
   *   if (type === 'move') {
   *     // Draw at mouse position
   *   }
   * }
   */
  onMouse?: (e: UseCanvasMouseArgs) => void
  /** Time in ms to throttle mouse move events. Default: 8ms (~120fps) */
  mouseThrottleTime?: number
  /** Time in ms to debounce window resize events. Default: 50ms */
  resizeDebounceTime?: number
  /** Time in ms to throttle scroll events (for updating mouse position). Default: 150ms */
  scrollThrottleTime?: number
}

/**
 * A comprehensive hook for managing canvas-based animations with built-in performance optimizations.
 *
 * Features:
 * - Automatic pause/resume when scrolled in/out of view
 * - Optional DPR scaling for retina displays
 * - Smart mouse tracking with throttling
 * - Resize handling with debouncing
 * - Preloading support for instant display
 * - Mobile-optimized (1x DPR)
 *
 * @example
 * ```tsx
 * const { canvasRef, isMobile } = useCanvas({
 *   useDPR: true,
 *   renderFrame: ({ ctx, width, height, time, delta }) => {
 *     ctx.clearRect(0, 0, width, height)
 *     // Draw your animation using time/delta for smooth frame-independent motion
 *   },
 *   onMouse: ({ x, y, type }) => {
 *     if (type === 'move') {
 *       // Handle mouse interaction
 *     }
 *   }
 * })
 *
 * return <canvas ref={canvasRef} style={{ width: '100%', height: '400px' }} />
 * ```
 *
 * @param options - Configuration options for canvas behavior
 * @returns Object containing canvasRef to attach to <canvas>, animation state, viewport detection, DPR, and mobile detection
 */
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
    delta: 0,
    lastRenderTimestamp: 0,
    frameId: 0,
    isAlive: false,
    isPaused: false,
    isPreloaded: false,
  })
  const mouseStateRef = useRef({
    lastMouseEvent: null as MouseEvent | null,
    wasMouseOverCanvas: false,
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

    const isMouseInsideRect = (event: MouseEvent, rect: DOMRect) => {
      return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      )
    }

    let lastMoveTime = 0
    let { wasMouseOverCanvas, lastMouseEvent } = mouseStateRef.current
    const handleMouseEvent = (event: MouseEvent) => {
      if (!onMouse) return

      lastMouseEvent = event

      if (animationStateRef.current.isPaused || !animationStateRef.current.isAlive) return

      const rect = canvas.getBoundingClientRect()

      const isNowOverCanvas = isMouseInsideRect(lastMouseEvent, rect)

      let type: MouseEventType | null = null
      if (!isNowOverCanvas && wasMouseOverCanvas) {
        type = 'leave'
      } else if (isNowOverCanvas && !wasMouseOverCanvas) {
        type = 'enter'
      } else if (isNowOverCanvas && wasMouseOverCanvas) {
        type = 'move'
      }

      wasMouseOverCanvas = isNowOverCanvas

      if (!type) {
        // is not over the canvas, and it wasn't before; so ignore this event!
        return
      }

      // enter and leave should be called immediately; except move
      if (type === 'move') {
        const now = performance.now()
        if (now - lastMoveTime < mouseThrottleTime) {
          return // Skip
        }
        lastMoveTime = now
      }

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

    // Only handle mouse if we have a mouse listener prop
    if (onMouse) {
      window.addEventListener('mousemove', handleMouseEvent)
    }

    // Scroll Logic

    const updateMousePositionOnScroll = () => {
      if (!lastMouseEvent) return
      if (!onMouse) return

      handleMouseEvent(lastMouseEvent)
    }

    let scrollTimer: any = null
    let throttleScroll = false
    const handleScroll = () => {
      if (throttleScroll) return

      throttleScroll = true

      updateMousePositionOnScroll()

      scrollTimer = setTimeout(() => {
        throttleScroll = false
      }, scrollThrottleTime)
    }

    // for Scroll, I'm only using mouse updates (temporarily I guess?)
    if (onMouse) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (onMouse) {
        window.removeEventListener('mousemove', handleMouseEvent)
        window.removeEventListener('scroll', handleScroll)
      }

      if (resizeTimeout) clearTimeout(resizeTimeout)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || typeof window === 'undefined') return

    const state = animationStateRef.current

    const createStateEventArgs = () =>
      ({
        time: state.time,
        delta: state.delta,
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
      state.delta = deltaTime / 1000 // to seconds
      state.lastRenderTimestamp = timestamp

      if (isInView) {
        // time updates only when the canvas is in view
        state.time += state.delta
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
  }, [isInView, preload, dpr])

  return { canvasRef, animationState: animationStateRef, isInView, dpr, isMobile }
}
