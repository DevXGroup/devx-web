import { useInView, UseInViewOptions } from 'framer-motion'
import { useEffect, useRef } from 'react'

export interface UseCanvasRenderArgs {
  time: number
  width: number
  height: number
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
}

export type RenderFunction = (e: UseCanvasRenderArgs) => void

export interface UseCanvasOptions {
  renderFrame?: RenderFunction
  preload?: boolean
  useInViewOptions?: UseInViewOptions
  resizeDebounceTime?: number
}

export function useCanvas({
  renderFrame = () => {},
  preload = true,
  useInViewOptions,
  resizeDebounceTime = 50,
}: UseCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(canvasRef, useInViewOptions)
  const animationStateRef = useRef({
    time: 0,
    lastRenderTimestamp: 0,
    frameId: 0,
    isAlive: false,
    isPaused: false,
    isPreloaded: false,
  })

  // Keep render function updated without breaking dependencies
  const renderFrameRef = useRef(renderFrame)
  useEffect(() => {
    renderFrameRef.current = renderFrame
  }, [renderFrame])

  useEffect(() => {
    animationStateRef.current.isPaused = !isInView
    if (!canvasRef.current) return
    // Reduce quality when not in view for performance
    canvasRef.current.style.imageRendering = isInView ? 'auto' : 'pixelated'
  }, [isInView])

  // Resizing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Render when resized?
      // const ctx = canvas.getContext('2d');
      // if (ctx) {
      //   renderFrameRef.current(ctx, {
      //     ...
      //   });
      // }
    }

    let timeout: any = null
    const resizeDebounce = () => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(resizeCanvas, resizeDebounceTime)
    }

    window.addEventListener('resize', resizeDebounce)
    resizeDebounce()

    return () => {
      if (timeout) clearTimeout(timeout)
      window.removeEventListener('resize', resizeDebounce)
    }
  }, [resizeDebounceTime])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const state = animationStateRef.current

    const createStateEventArgs = () =>
      ({
        time: state.time,
        width: canvas.width,
        height: canvas.height,
        canvas,
        ctx,
      }) satisfies UseCanvasRenderArgs

    const animate = (timestamp: number) => {
      if (state.lastRenderTimestamp === 0) {
        state.lastRenderTimestamp = timestamp
      }

      const deltaTime = timestamp - state.lastRenderTimestamp
      state.lastRenderTimestamp = timestamp

      if (isInView) {
        // time updates only when the canvas is in view
        state.time += deltaTime / 1000 // to seconds
        renderFrameRef.current(createStateEventArgs())
      } else if (preload && !state.isPreloaded) {
        // Preload it!
        state.isPreloaded = true
        renderFrameRef.current(createStateEventArgs())
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

  return { canvasRef, animationState: animationStateRef, isInView }
}
