"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useSafariDetection } from "@/hooks/use-safari-detection"

interface ScrollVelocityTextProps {
  children: React.ReactNode[]
  baseVelocity?: number
  className?: string
}

export default function ScrollVelocityText({ 
  children, 
  baseVelocity = 100, 
  className = "" 
}: ScrollVelocityTextProps) {
  const { isSafari, isClient } = useSafariDetection()
  const baseX = useRef(0)
  const scrollVelocity = useRef(0)
  const smoothVelocity = useRef(0) 
  const velocityFactor = useRef(0)
  const [animationX, setAnimationX] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const directionFactor = useRef(1)

  useEffect(() => {
    if (!isClient) return
    
    const delay = isSafari ? 600 : 100
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [isClient, isSafari])

  useEffect(() => {
    if (!isMounted) return
    
    let lastScrollY = window.scrollY
    let animationFrame: number

    const updateVelocity = () => {
      const currentScrollY = window.scrollY
      const scrollDelta = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      // Calculate scroll velocity
      scrollVelocity.current = scrollDelta
      
      // Smooth the velocity for better animation
      smoothVelocity.current = smoothVelocity.current * 0.8 + scrollVelocity.current * 0.2
      
      // Determine direction (-1 for up, 1 for down)
      directionFactor.current = smoothVelocity.current < 0 ? -1 : 1
      
      // Calculate velocity factor (affects animation speed)
      velocityFactor.current = Math.min(Math.abs(smoothVelocity.current) / 300, 2)
      
      // Update base position with continuous movement and scroll influence
      const moveBy = (baseVelocity * directionFactor.current * (1 + velocityFactor.current)) / 100
      baseX.current += moveBy
      
      // Keep the animation position within bounds for seamless looping
      if (baseX.current > 100) baseX.current = -100
      if (baseX.current < -100) baseX.current = 100
      
      setAnimationX(baseX.current)
      
      animationFrame = requestAnimationFrame(updateVelocity)
    }

    animationFrame = requestAnimationFrame(updateVelocity)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [baseVelocity])

  if (!isClient || !isMounted) {
    return (
      <div className={`flex whitespace-nowrap overflow-hidden ${className}`} suppressHydrationWarning={true}>
        <div className="flex whitespace-nowrap">
          {children.map((child, childIndex) => (
            <div key={childIndex} className="mx-4">
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex whitespace-nowrap overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        style={{
          x: `${animationX}%`,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0
        }}
      >
        {/* Render children multiple times for seamless loop */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex shrink-0">
            {children.map((child, childIndex) => (
              <div key={`${i}-${childIndex}`} className="mx-4">
                {child}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}