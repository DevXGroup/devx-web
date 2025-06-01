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

  // Calculate how much of the planet should be revealed based on scroll
  const calculateReveal = () => {
    const scrollProgress = Math.max(0, Math.min(1, scrollY / 500))
    return scrollProgress * 0.5 // Controls how much the planet rises
  }

  const revealAmount = calculateReveal()
  const planetPosition = -0.8 + revealAmount

  return (
    <div className="relative w-full h-[40vh] overflow-hidden pointer-events-none z-10">
      <div
        className="absolute w-full h-[200%] bg-black rounded-[50%] left-0 planet-glow-effect"
        style={{
          bottom: `${planetPosition * 20 - 30}%`,
          transform: "translateY(50%)",
          background: "#000000",
        }}
      />
    </div>
  )
}
