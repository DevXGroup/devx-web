"use client"

import type React from "react"
import { useRef, useLayoutEffect, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion"

interface VelocityMapping {
  input: [number, number]
  output: [number, number]
}

interface VelocityTextProps {
  children: React.ReactNode
  baseVelocity: number
  scrollContainerRef?: React.RefObject<HTMLElement>
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
  parallaxClassName?: string
  scrollerClassName?: string
  parallaxStyle?: React.CSSProperties
  scrollerStyle?: React.CSSProperties
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>
  texts: string[]
  velocity?: number
  className?: string
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
  parallaxClassName?: string
  scrollerClassName?: string
  parallaxStyle?: React.CSSProperties
  scrollerStyle?: React.CSSProperties
}

function useElementWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [ref])

  return width
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = "",
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle,
  }: VelocityTextProps) {
    const [isClient, setIsClient] = useState(false)
    const baseX = useMotionValue(0)
    
    useLayoutEffect(() => {
      setIsClient(true)
    }, [])
    
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {}
    // Always call useScroll to maintain hooks order
    const { scrollY } = useScroll(scrollOptions)
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400,
    })
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false },
    )

    const copyRef = useRef<HTMLSpanElement>(null)
    const copyWidth = useElementWidth(copyRef)

    function wrap(min: number, max: number, v: number): number {
      const range = max - min
      const mod = (((v - min) % range) + range) % range
      return mod + min
    }

    const x = useTransform(baseX, (v) => {
      if (copyWidth === 0) return "0px"
      return `${wrap(-copyWidth, 0, v)}px`
    })

    const directionFactor = useRef<number>(1)
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get()
      baseX.set(baseX.get() + moveBy)
    })

    const spans = []
    for (let i = 0; i < numCopies!; i++) {
      spans.push(
        <span className={`flex-shrink-0 ${className}`} key={i} ref={i === 0 ? copyRef : null}>
          {children}
        </span>,
      )
    }

    return (
      <div className={`${parallaxClassName || ""} relative overflow-hidden`} style={parallaxStyle}>
        <motion.div
          className={`${scrollerClassName || ""} flex whitespace-nowrap text-center font-bold tracking-[-0.02em] drop-shadow text-4xl md:text-[5rem] md:leading-[4rem] opacity-50`}
          style={{
            x,
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontWeight: 700,
            ...(scrollerStyle && Object.fromEntries(
              Object.entries(scrollerStyle).filter(([, value]) => value !== undefined)
            )),
          }}
        >
          {spans}
        </motion.div>
      </div>
    )
  }

  return (
    <section className="py-0 -space-y-4">
      {texts.map((text: string, index: number) => (
        <VelocityText
          key={index}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          {...(className && { className })}
          {...(scrollContainerRef && { scrollContainerRef })}
          {...(parallaxClassName && { parallaxClassName })}
          {...(scrollerClassName && { scrollerClassName })}
          {...(parallaxStyle && { parallaxStyle })}
          {...(scrollerStyle && { scrollerStyle })}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </section>
  )
}

export default ScrollVelocity
