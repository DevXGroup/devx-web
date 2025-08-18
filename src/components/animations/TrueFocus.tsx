"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface TrueFocusProps {
  sentence?: string
  manualMode?: boolean
  blurAmount?: number
  borderColor?: string
  glowColor?: string
  animationDuration?: number
  pauseBetweenAnimations?: number
}

interface FocusRect {
  x: number
  y: number
  width: number
  height: number
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#4CD787", // Changed to a color from the palette
  glowColor = "rgba(76, 215, 135, 0.6)", // Changed to a color from the palette
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(" ")
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(
        () => {
          setCurrentIndex((prev) => (prev + 1) % words.length)
        },
        (animationDuration + pauseBetweenAnimations) * 1000,
      )

      return () => clearInterval(interval)
    }
    return undefined
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length])

  useEffect(() => {
    if (currentIndex === null || currentIndex === -1) return
    if (!wordRefs.current[currentIndex] || !containerRef.current) return

    const parentRect = containerRef.current.getBoundingClientRect()
    const activeRect = wordRefs.current[currentIndex]!.getBoundingClientRect()

    setFocusRect({
      x: activeRect.left - parentRect.left,
      y: activeRect.top - parentRect.top,
      width: activeRect.width,
      height: activeRect.height,
    })
  }, [currentIndex, words.length])

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(index)
      setCurrentIndex(index)
    }
  }

  const handleMouseLeave = () => {
    if (manualMode) {
      setCurrentIndex(lastActiveIndex!)
    }
  }

  return (
    <div className="relative flex gap-4 justify-center items-center flex-wrap mt-[100]" ref={containerRef}>
      {words.map((word, index) => {
        const isActive = index === currentIndex
        return (
          <span
            key={index}
            ref={(el) => { wordRefs.current[index] = el }}
            className="relative text-3xl md:text-4xl lg:text-5xl font-black cursor-pointer text-[#FFD700]" // Adjusted font size and color
            style={
              {
                filter: manualMode
                  ? isActive
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`
                  : isActive
                    ? `blur(0px)`
                    : `blur(${blurAmount}px)`,
                transition: `filter ${animationDuration}s ease`,
              } as React.CSSProperties
            }
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        )
      })}

      <motion.div
        className="absolute top-0 left-0 pointer-events-none box-border border-0"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentIndex >= 0 ? 1 : 0,
        }}
        transition={{
          duration: animationDuration,
        }}
        style={
          {
            "--border-color": borderColor,
            "--glow-color": glowColor,
          } as any
        }
      >
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] left-[-10px] border-r-0 border-b-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] top-[-10px] right-[-10px] border-l-0 border-b-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] left-[-10px] border-r-0 border-t-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
        <span
          className="absolute w-4 h-4 border-[3px] rounded-[3px] bottom-[-10px] right-[-10px] border-l-0 border-t-0"
          style={{
            borderColor: "var(--border-color)",
            filter: "drop-shadow(0 0 4px var(--border-color))",
          }}
        ></span>
      </motion.div>
    </div>
  )
}

export default TrueFocus
