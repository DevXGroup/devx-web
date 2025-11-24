import React, { ReactNode, useLayoutEffect, useRef, useCallback, useMemo, useState } from 'react'

export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    }}
  >
    {children}
  </div>
)

interface ScrollStackProps {
  className?: string
  children: ReactNode
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string
  scaleEndPosition?: string
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  onStackComplete?: () => void
  smoothing?: number
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
  smoothing = 0.18,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const transformFrameRef = useRef<number | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const cardOffsetsRef = useRef<number[]>([])
  const lastTransformsRef = useRef(new Map<number, any>())
  const isUpdatingRef = useRef(false)
  const [isInView, setIsInView] = useState(true)

  // Cache calculation functions with useMemo to prevent recreation on every scroll
  const calculateProgress = useMemo(
    () => (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0
      if (scrollTop > end) return 1
      return (scrollTop - start) / (end - start)
    },
    []
  )

  const parsePercentage = useMemo(
    () => (value: string | number, containerHeight: number) => {
      if (typeof value === 'string' && value.includes('%')) {
        return (parseFloat(value) / 100) * containerHeight
      }
      return parseFloat(value as string)
    },
    []
  )

  const getScrollData = useMemo(
    () => () => {
      if (useWindowScroll) {
        return {
          scrollTop: window.scrollY,
          containerHeight: window.innerHeight,
          scrollContainer: document.documentElement,
        }
      } else {
        const scroller = scrollerRef.current
        return {
          scrollTop: scroller ? scroller.scrollTop : 0,
          containerHeight: scroller ? scroller.clientHeight : 0,
          scrollContainer: scroller,
        }
      }
    },
    [useWindowScroll]
  )

  const getElementOffset = useMemo(
    () => (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect()
        return rect.top + window.scrollY
      } else {
        return element.offsetTop
      }
    },
    [useWindowScroll]
  )

  const cacheCardOffsets = useCallback(() => {
    if (!cardsRef.current.length) return

    const offsets: number[] = []

    cardsRef.current.forEach((card, index) => {
      if (!card) return

      const currentTransform = card.style.transform
      card.style.transform = 'none'

      const baseOffset = useWindowScroll
        ? card.getBoundingClientRect().top + window.scrollY
        : card.offsetTop

      offsets[index] = baseOffset
      card.style.transform = currentTransform
    })

    cardOffsetsRef.current = offsets
  }, [useWindowScroll])

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current || !isInView) return

    isUpdatingRef.current = true

    const { scrollTop, containerHeight } = getScrollData()
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)

    const endElement = useWindowScroll
      ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)
      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null)

    const endElementTop = endElement ? getElementOffset(endElement) : 0

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      const cardTop = cardOffsetsRef.current[i] ?? getElementOffset(card)
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i
      const triggerEnd = cardTop - scaleEndPositionPx
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i
      const pinEnd = endElementTop - containerHeight / 2

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd)
      const targetScale = baseScale + i * itemScale
      const scale = 1 - scaleProgress * (1 - targetScale)
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0

      let blur = 0
      if (blurAmount) {
        let topCardIndex = 0
        for (let j = 0; j < cardsRef.current.length; j++) {
          const card = cardsRef.current[j]
          if (!card) continue
          const jCardTop = cardOffsetsRef.current[j] ?? getElementOffset(card)
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i
          blur = Math.max(0, depthInStack * blurAmount)
        }
      }

      let translateY = 0
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i
      }

      const targetTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      }

      const lastTransform = lastTransformsRef.current.get(i)
      const appliedTransform = lastTransform
        ? {
            translateY:
              lastTransform.translateY +
              (targetTransform.translateY - lastTransform.translateY) * smoothing,
            scale: lastTransform.scale + (targetTransform.scale - lastTransform.scale) * smoothing,
            rotation:
              lastTransform.rotation +
              (targetTransform.rotation - lastTransform.rotation) * smoothing,
            blur: lastTransform.blur + (targetTransform.blur - lastTransform.blur) * smoothing,
          }
        : targetTransform

      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - targetTransform.translateY) > 0.5 ||
        Math.abs(lastTransform.scale - targetTransform.scale) > 0.003 ||
        Math.abs(lastTransform.rotation - targetTransform.rotation) > 0.5 ||
        Math.abs(lastTransform.blur - targetTransform.blur) > 0.5

      if (hasChanged) {
        const transform = `translate3d(0, ${appliedTransform.translateY}px, 0) scale(${appliedTransform.scale}) rotate(${appliedTransform.rotation}deg)`
        const filter = appliedTransform.blur > 0 ? `blur(${appliedTransform.blur}px)` : ''

        // Use will-change sparingly and only when needed
        if (isPinned) {
          card.style.willChange = 'transform, filter'
        } else {
          card.style.willChange = 'auto'
        }

        card.style.transform = transform
        card.style.filter = filter

        lastTransformsRef.current.set(i, appliedTransform)
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true
          onStackComplete?.()
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false
        }
      }
    })

    isUpdatingRef.current = false
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
    isInView,
    smoothing,
  ])

  const handleScroll = useCallback(() => {
    if (transformFrameRef.current !== null) return

    transformFrameRef.current = requestAnimationFrame(() => {
      transformFrameRef.current = null
      updateCardTransforms()
    })
  }, [updateCardTransforms])

  useLayoutEffect(() => {
    if (!useWindowScroll && !scrollerRef.current) return

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])
    ) as HTMLElement[]
    cardsRef.current = cards
    cacheCardOffsets()
    const transformsCache = lastTransformsRef.current

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = 'auto'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.transform = 'translateZ(0)'
      card.style.webkitTransform = 'translateZ(0)'
      card.style.perspective = '1000px'
      card.style.webkitPerspective = '1000px'
      // @ts-ignore - vendor-specific properties not in CSSStyleDeclaration
      card.style.WebkitFontSmoothing = 'antialiased'
      // @ts-ignore - vendor-specific properties not in CSSStyleDeclaration
      card.style.MozOsxFontSmoothing = 'grayscale'
    })

    const scrollTarget = useWindowScroll ? window : scrollerRef.current
    scrollTarget?.addEventListener('scroll', handleScroll, { passive: true })

    updateCardTransforms()

    return () => {
      if (transformFrameRef.current) {
        cancelAnimationFrame(transformFrameRef.current)
        transformFrameRef.current = null
      }
      scrollTarget?.removeEventListener('scroll', handleScroll)
      stackCompletedRef.current = false
      cardsRef.current = []
      transformsCache.clear()
      isUpdatingRef.current = false
    }
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    cacheCardOffsets,
    updateCardTransforms,
    handleScroll,
  ])

  useLayoutEffect(() => {
    if (!cardsRef.current.length) return

    const handleResize = () => {
      cacheCardOffsets()
      updateCardTransforms()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [cacheCardOffsets, updateCardTransforms])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (!cardsRef.current.length) return

    const target = useWindowScroll ? document.documentElement : scrollerRef.current
    if (!target) return

    const frameId = window.requestAnimationFrame(() => {
      cacheCardOffsets()
      updateCardTransforms()
    })

    let observer: ResizeObserver | null = null
    if ('ResizeObserver' in window) {
      observer = new ResizeObserver(() => {
        cacheCardOffsets()
        updateCardTransforms()
      })
      observer.observe(target)
    }

    return () => {
      window.cancelAnimationFrame(frameId)
      observer?.disconnect()
    }
  }, [cacheCardOffsets, updateCardTransforms, useWindowScroll])

  // Intersection Observer to pause calculations when section is off-screen
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (!scrollerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
          // Force update when coming back into view
          if (entry.isIntersecting) {
            updateCardTransforms()
          }
        })
      },
      {
        rootMargin: '200px', // Start calculations 200px before entering viewport
        threshold: 0,
      }
    )

    observer.observe(scrollerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [updateCardTransforms])

  return (
    <div
      className={`relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position',
      }}
    >
      <div className="scroll-stack-inner pt-[18vh] px-20 pb-[28rem] min-h-screen">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  )
}

export default ScrollStack
