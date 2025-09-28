"use client"

import React, { useRef, useLayoutEffect, useState } from "react"
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

interface ScrollVelocityTextProps {
  children: React.ReactNode[]
  baseVelocity?: number
  className?: string
  scrollContainerRef?: React.RefObject<HTMLElement>
  damping?: number
  stiffness?: number
  numCopies?: number
  velocityMapping?: VelocityMapping
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
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

export default function ScrollVelocityText({
  children,
  baseVelocity = 50, // Reduced default speed
  className = "",
  scrollContainerRef,
  damping = 30,
  stiffness = 300,
  numCopies = 4,
  velocityMapping = { input: [0, 1000], output: [0, 1.5] }, // Further reduced output range
}: ScrollVelocityTextProps) {
  const baseX = useMotionValue(0)
  const scrollOptions = scrollContainerRef
    ? { container: scrollContainerRef }
    : {}
  const { scrollY } = useScroll(scrollOptions)
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping,
    stiffness: stiffness,
  })
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping.input,
    velocityMapping.output,
    { clamp: false }
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
    // Safari safety check: delta can be undefined
    const safeDelta = delta || 16.67 // fallback to ~60fps (16.67ms per frame)
    let moveBy = directionFactor.current * baseVelocity * (safeDelta / 1000)
    
    // Get current velocity factor
    const currentVelocity = velocityFactor.get()
    
    // Smooth direction changes to prevent stuttering
    if (Math.abs(currentVelocity) > 0.1) {
      if (currentVelocity < 0) {
        directionFactor.current = -1
      } else if (currentVelocity > 0) {
        directionFactor.current = 1
      }
    }

    // Apply velocity factor more smoothly
    moveBy += moveBy * Math.abs(currentVelocity)
    baseX.set(baseX.get() + moveBy)
  })

  const spans = []
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span
        className="flex-shrink-0"
        key={i}
        ref={i === 0 ? copyRef : null}
      >
        {children.map((child, childIndex) => (
          <span key={`${i}-${childIndex}`} className="mx-4">
            {child}
          </span>
        ))}
      </span>
    )
  }

  return (
    <div className={`w-full overflow-hidden relative ${className}`}>
      <motion.div
        className="flex whitespace-nowrap items-center"
        style={{ x }}
      >
        {spans}
      </motion.div>
      {/* Left fade-out gradient */}
      <div 
        className="absolute top-0 left-0 w-32 md:w-48 lg:w-64 h-full pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 60%, transparent 100%)'
        }}
      />
      {/* Right fade-out gradient */}
      <div 
        className="absolute top-0 right-0 w-32 md:w-48 lg:w-64 h-full pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 60%, transparent 100%)'
        }}
      />
    </div>
  )
}