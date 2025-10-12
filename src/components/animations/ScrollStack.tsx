'use client'

import React, { ReactNode, useLayoutEffect, useRef, useCallback, useMemo } from 'react'
import Lenis from 'lenis'

export interface ScrollStackItemProps {
  itemClassName?: string
  children: ReactNode
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full min-h-[20rem] my-6 p-12 rounded-[40px] shadow-[0_0_30px_rgba(8,10,25,0.45)] box-border origin-top will-change-transform bg-[#070b1d] border border-white/5 ${itemClassName}`.trim()}
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
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stackCompletedRef = useRef(false)
  const animationFrameRef = useRef<number | null>(null)
  const pendingUpdateRef = useRef<number | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const lastTransformsRef = useRef(new Map<number, any>())
  const isUpdatingRef = useRef(false)
  const cardBaseOffsetsRef = useRef<Map<number, number>>(new Map())
  const endElementBaseOffsetRef = useRef<number | null>(null)
  const needsMeasurementRef = useRef(true)
  const stackPositionCssValue = useMemo(() => {
    if (typeof stackPosition === 'number') {
      return `${stackPosition}px`
    }
    return stackPosition
  }, [stackPosition])
  const cardCount = useMemo(() => React.Children.toArray(children).length, [children])
  const stickyMinHeight = useMemo(() => {
    if (!useWindowScroll) return undefined
    const travel =
      Math.max(0, cardCount - 1) * itemStackDistance + cardCount * (itemDistance + 80)
    return `calc(130vh + ${travel}px)`
  }, [useWindowScroll, cardCount, itemStackDistance, itemDistance])

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0
    if (scrollTop > end) return 1
    return (scrollTop - start) / (end - start)
  }, [])

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight
    }
    return parseFloat(value as string)
  }, [])

  const getScrollData = useCallback(() => {
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
  }, [useWindowScroll])

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect()
        return rect.top + window.scrollY
      } else {
        return element.offsetTop
      }
    },
    [useWindowScroll]
  )

  const measureLayouts = useCallback(() => {
    const cards = cardsRef.current
    if (!cards.length) return

    const baseOffsets = cardBaseOffsetsRef.current
    baseOffsets.clear()

    cards.forEach((card, i) => {
      if (!card) return
      let baseTop = 0
      if (useWindowScroll) {
        const prevTransform = card.style.transform
        const prevTransition = card.style.transition
        card.style.transition = 'none'
        card.style.transform = 'none'
        const rect = card.getBoundingClientRect()
        baseTop = rect.top + window.scrollY
        card.style.transform = prevTransform
        card.style.transition = prevTransition
      } else {
        baseTop = card.offsetTop
      }
      baseOffsets.set(i, baseTop)
    })

    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null
    if (endElement) {
      if (useWindowScroll) {
        const rect = endElement.getBoundingClientRect()
        endElementBaseOffsetRef.current = rect.top + window.scrollY
      } else {
        endElementBaseOffsetRef.current = endElement.offsetTop
      }
    } else {
      endElementBaseOffsetRef.current = null
    }

    needsMeasurementRef.current = false
  }, [useWindowScroll])

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return

    isUpdatingRef.current = true

    if (needsMeasurementRef.current) {
      measureLayouts()
    }

    const { scrollTop, containerHeight } = getScrollData()
    const stackPositionPx = parsePercentage(stackPosition, containerHeight)
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight)

    const endElementTop =
      endElementBaseOffsetRef.current ??
      (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null
        ? getElementOffset(
            scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement
          )
        : 0)

    cardsRef.current.forEach((card, i) => {
      if (!card) return

      if (!cardBaseOffsetsRef.current.has(i)) {
        needsMeasurementRef.current = true
      }

      const cardTop =
        cardBaseOffsetsRef.current.get(i) ??
        (useWindowScroll ? getElementOffset(card) : card.offsetTop)
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
          const jCard = cardsRef.current[j]
          if (!jCard) continue
          const jCardTop =
            cardBaseOffsetsRef.current.get(j) ??
            (useWindowScroll ? getElementOffset(jCard) : jCard.offsetTop)
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

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      }

      const lastTransform = lastTransformsRef.current.get(i)
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : 'none'

        card.style.transform = transform
        card.style.filter = filter

        lastTransformsRef.current.set(i, newTransform)
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
    measureLayouts,
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
  ])

  const scheduleUpdate = useCallback(() => {
    if (pendingUpdateRef.current !== null) return
    pendingUpdateRef.current = requestAnimationFrame(() => {
      pendingUpdateRef.current = null
      updateCardTransforms()
    })
  }, [updateCardTransforms])

  const handleScroll = useCallback(() => {
    scheduleUpdate()
  }, [scheduleUpdate])

  const setupLenis = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.off('scroll', handleScroll)
      lenisRef.current.destroy()
      lenisRef.current = null
    }

    if (useWindowScroll) {
      return null
    }

    const scroller = scrollerRef.current
    if (!scroller) return null

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      wrapper: scroller,
      content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,
      gestureOrientation: 'vertical',
    })

    lenis.on('scroll', handleScroll)

    const raf = (time: number) => {
      lenis.raf(time)
      animationFrameRef.current = requestAnimationFrame(raf)
    }
    animationFrameRef.current = requestAnimationFrame(raf)

    lenisRef.current = lenis
    return lenis
  }, [handleScroll, useWindowScroll])

  useLayoutEffect(() => {
    if (!scrollerRef.current) return

    const cards = Array.from(
      scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? []
    ) as HTMLElement[]
    cardsRef.current = cards
    const transformsCache = lastTransformsRef.current

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`
      }
      card.style.willChange = 'transform, filter'
      card.style.transformOrigin = 'top center'
      card.style.backfaceVisibility = 'hidden'
      card.style.transform = 'translateZ(0)'
      card.style.webkitTransform = 'translateZ(0)'
      card.style.perspective = '1000px'
      card.style.webkitPerspective = '1000px'
    })

    if (!useWindowScroll) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      setupLenis()
    }

    needsMeasurementRef.current = true
    measureLayouts()

    const handleResize = () => {
      needsMeasurementRef.current = true
      scheduleUpdate()
    }
    window.addEventListener('resize', handleResize)

    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    scheduleUpdate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (useWindowScroll) {
        window.removeEventListener('scroll', handleScroll)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      if (pendingUpdateRef.current) {
        cancelAnimationFrame(pendingUpdateRef.current)
        pendingUpdateRef.current = null
      }
      if (lenisRef.current) {
        lenisRef.current.off('scroll', handleScroll)
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      stackCompletedRef.current = false
      cardsRef.current = []
      transformsCache.clear()
      isUpdatingRef.current = false
      cardBaseOffsetsRef.current.clear()
      endElementBaseOffsetRef.current = null
      needsMeasurementRef.current = true
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
    setupLenis,
    updateCardTransforms,
    handleScroll,
    measureLayouts,
  ])

  return (
    <div
      className={`scroll-stack-container relative w-full ${
        useWindowScroll ? 'overflow-visible' : 'h-full overflow-y-auto'
      } overflow-x-visible ${className}`.trim()}
      ref={scrollerRef}
      style={{
        overscrollBehavior: useWindowScroll ? undefined : 'contain',
        WebkitOverflowScrolling: useWindowScroll ? undefined : 'touch',
        scrollBehavior: useWindowScroll ? undefined : 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: useWindowScroll ? 'transform' : 'scroll-position',
        minHeight: stickyMinHeight,
      }}
    >
      <div
        className="scroll-stack-inner pt-[10vh] px-16 pb-[32rem]"
        style={
          useWindowScroll
            ? {
                position: 'sticky',
                top: stackPositionCssValue ?? '20vh',
              }
            : undefined
        }
      >
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  )
}

export default ScrollStack
