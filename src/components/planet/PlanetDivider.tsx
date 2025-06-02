"use client"

import { useEffect, useState } from "react"

export default function PlanetDivider() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Set initial scroll position
    setScrollY(window.scrollY)

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Simple calculation for planet visibility and position
  const calculateVisibility = () => {
    const maxScroll = 300 // Adjust this value to control how quickly it disappears
    const progress = Math.min(1, scrollY / maxScroll)
    
    return {
      position: -0.8 + progress * 0.5, // Move down slightly as it fades
      opacity: 1 - progress // Fade out completely
    }
  }

  const { position, opacity } = calculateVisibility()

  return (
    <div className="relative w-full h-[40vh] overflow-hidden pointer-events-none z-10">
      <div
        className="absolute w-full h-[200%] bg-black rounded-[50%] left-0 planet-glow-effect transition-all duration-200"
        style={{
          bottom: `${position * 20 - 30}%`,
          transform: "translateY(50%)",
          background: "radial-gradient(circle at center, #1a1a1a 0%, #000000 70%)",
          boxShadow: "0 0 100px rgba(0, 0, 0, 0.5)",
          opacity: opacity,
        }}
      />
    </div>
  )
}
