"use client"

import { useEffect, useState } from "react"

// Utility function for responsive values
const getResponsiveValue = (mobile: number, tablet: number, desktop: number) => {
  if (typeof window === 'undefined') return desktop
  const width = window.innerWidth
  if (width < 768) return mobile
  if (width < 1024) return tablet
  return desktop
}

export default function PlanetDivider() {
  const [scrollY, setScrollY] = useState(0)
  const [time, setTime] = useState(0)
  const [screenSize, setScreenSize] = useState({ width: 1024, height: 768 })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }

    // Set initial values
    setScrollY(window.scrollY)
    handleResize()

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    // Animation timer for continuous rotation and lighting effects
    const interval = setInterval(() => {
      setTime(prev => prev + 1)
    }, 50) // Update every 50ms for smooth animation

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      clearInterval(interval)
    }
  }, [])

  // Enhanced calculation for planet visibility and position - fully responsive
  const calculateVisibility = () => {
    // Responsive scroll threshold based on screen size
    const maxScroll = getResponsiveValue(200, 250, 300)
    const progress = Math.min(1, scrollY / maxScroll)
    
    return {
      position: -0.8 + progress * 0.5,
      opacity: 1 - progress,
      scrollRotation: progress * 10, // Rotation during scroll
      continuousRotation: time * 0.2 // Continuous slow rotation
    }
  }

  // Responsive sizing helper
  const getResponsiveSizes = () => {
    const { width } = screenSize
    // Better breakpoint handling for planet sizing
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024
    const isDesktop = width >= 1024
    
    let planetSize, planetMargin, containerWidth, containerHeight
    
    if (isMobile) {
      // Mobile: Use screen width percentage for better centering
      planetSize = Math.min(width * 0.9, 350) // 90% of screen width, max 350px
      planetMargin = -planetSize / 2 // Perfect centering
      containerWidth = width
      containerHeight = Math.min(width * 0.5, 200)
    } else if (isTablet) {
      planetSize = 400
      planetMargin = -200
      containerWidth = 500
      containerHeight = 250
    } else {
      planetSize = 500
      planetMargin = -250
      containerWidth = 600
      containerHeight = 300
    }
    
    return {
      glowRadius: getResponsiveValue(60, 70, 80),
      glowRadius2: getResponsiveValue(120, 140, 160),
      shadowSize: getResponsiveValue(15, 18, 20),
      blurAmount: getResponsiveValue(1.5, 1.8, 2),
      planetShadow: getResponsiveValue(40, 50, 60),
      planetGlow: getResponsiveValue(150, 175, 200),
      // Pixel-based sizing for better control
      planetMaxWidth: planetSize,
      planetMarginLeft: planetMargin,
      containerMaxWidth: containerWidth,
      containerHeight: containerHeight
    }
  }

  const { position, opacity, scrollRotation, continuousRotation } = calculateVisibility()
  const sizes = getResponsiveSizes()

  // Cross-browser compatible styles
  const getCrossBrowserStyle = (transform: string, additionalStyles: any = {}) => ({
    WebkitTransform: transform,
    MozTransform: transform,
    msTransform: transform,
    transform: transform,
    WebkitBorderRadius: '50%',
    MozBorderRadius: '50%',
    borderRadius: '50%',
    ...additionalStyles
  })

  return (
    <div className={`relative w-full mx-auto overflow-hidden pointer-events-none z-10`} style={{ maxWidth: `${sizes.containerMaxWidth}px`, height: `${sizes.containerHeight}px` }}>
      {/* Main planet body with enhanced 3D definition */}
      <div
        className="absolute w-full h-[200%] left-0 planet-glow-effect"
        style={getCrossBrowserStyle("translateY(50%)", {
          bottom: `${position * 20 - 30}%`,
          aspectRatio: "1/1",
          borderRadius: "50%",
          width: `${sizes.planetMaxWidth}px`,
          height: `${sizes.planetMaxWidth}px`,
          left: "50%",
          marginLeft: `${sizes.planetMarginLeft}px`,
          background: `
            radial-gradient(circle at 30% 30%, #444444 0%, #2f2f2f 20%, #1f1f1f 40%, #0d0d0d 70%, #000000 100%),
            radial-gradient(ellipse 45% 55% at 25% 25%, rgba(51, 51, 51, 0.8) 0%, rgba(42, 42, 42, 0.6) 25%, rgba(31, 31, 31, 0.4) 50%, transparent 70%),
            radial-gradient(ellipse 35% 45% at 70% 60%, rgba(34, 34, 34, 0.7) 0%, rgba(26, 26, 26, 0.5) 30%, transparent 60%),
            radial-gradient(ellipse 25% 35% at 40% 70%, rgba(24, 24, 24, 0.6) 0%, rgba(15, 15, 15, 0.4) 40%, transparent 65%)
          `,
          boxShadow: `
            0 0 ${sizes.glowRadius}px rgba(76, 215, 135, ${0.05 + Math.sin(time * 0.05) * 0.01}), 
            0 0 ${sizes.glowRadius2}px rgba(76, 215, 135, ${0.025 + Math.sin(time * 0.04) * 0.005}),
            inset -${sizes.shadowSize * 1.2}px -${sizes.shadowSize * 1.2}px ${sizes.planetShadow * 1.5}px rgba(0, 0, 0, 0.9),
            inset ${Math.floor(sizes.shadowSize * 0.6)}px ${Math.floor(sizes.shadowSize * 0.6)}px ${Math.floor(sizes.shadowSize * 1.2)}px rgba(255, 255, 255, 0.04),
            inset -${Math.floor(sizes.shadowSize * 0.3)}px -${Math.floor(sizes.shadowSize * 0.3)}px ${Math.floor(sizes.shadowSize * 0.8)}px rgba(76, 215, 135, 0.015),
            0 0 ${sizes.glowRadius}px rgba(0, 0, 0, 0.7),
            0 0 ${sizes.planetGlow}px rgba(76, 215, 135, 0.05)
          `,
          opacity: opacity,
        })}
      />

      {/* Large crater formations and rock outcrops - Layer 1 */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle(`translateY(50%) rotate(${(scrollRotation + continuousRotation) * 0.8}deg)`, {
          bottom: `${position * 20 - 30}%`,
          aspectRatio: "1/1",
          borderRadius: "50%",
          width: `${sizes.planetMaxWidth}px`,
          height: `${sizes.planetMaxWidth}px`,
          left: "50%",
          marginLeft: `${sizes.planetMarginLeft}px`,
          background: `
            radial-gradient(ellipse 22% 28% at 30% 20%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.1) 60%, transparent 75%),
            radial-gradient(ellipse 18% 24% at 70% 40%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 15%, rgba(255, 255, 255, 0.01) 30%, transparent 50%),
            radial-gradient(ellipse 14% 20% at 20% 70%, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.2) 45%, transparent 65%),
            radial-gradient(ellipse 28% 35% at 80% 25%, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.8) 15%, rgba(0, 0, 0, 0.5) 30%, rgba(0, 0, 0, 0.2) 50%, transparent 70%),
            radial-gradient(ellipse 10% 16% at 50% 85%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 20%, rgba(255, 255, 255, 0.01) 40%, transparent 65%),
            radial-gradient(ellipse 16% 22% at 85% 75%, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.4) 30%, rgba(0, 0, 0, 0.1) 55%, transparent 70%),
            radial-gradient(ellipse 8% 12% at 10% 45%, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.3) 35%, rgba(0, 0, 0, 0.1) 60%, transparent 75%)
          `,
          opacity: opacity * 0.9,
        })}
      />

      {/* Medium rocky terrain and boulder fields - Layer 2 */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle(`translateY(50%) rotate(${(scrollRotation + continuousRotation) * 0.6}deg)`, {
          bottom: `${position * 20 - 30}%`,
          aspectRatio: "1/1",
          borderRadius: "50%",
          width: `${sizes.planetMaxWidth}px`,
          height: `${sizes.planetMaxWidth}px`,
          left: "50%",
          marginLeft: `${sizes.planetMarginLeft}px`,
          background: `
            radial-gradient(ellipse 10% 14% at 35% 35%, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.4) 25%, rgba(0, 0, 0, 0.1) 50%, transparent 70%),
            radial-gradient(ellipse 6% 10% at 15% 55%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 25%, rgba(255, 255, 255, 0.01) 50%, transparent 75%),
            radial-gradient(ellipse 12% 18% at 75% 65%, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.3) 20%, rgba(0, 0, 0, 0.1) 40%, transparent 60%),
            radial-gradient(ellipse 5% 8% at 55% 20%, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.2) 40%, transparent 70%),
            radial-gradient(ellipse 8% 12% at 25% 80%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 30%, transparent 65%),
            radial-gradient(ellipse 11% 16% at 90% 45%, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 20%, rgba(0, 0, 0, 0.2) 40%, transparent 55%),
            radial-gradient(ellipse 4% 7% at 65% 75%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 75%),
            radial-gradient(ellipse 13% 18% at 5% 80%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 25%, rgba(0, 0, 0, 0.1) 45%, transparent 50%),
            radial-gradient(ellipse 7% 10% at 45% 10%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 70%)
          `,
          opacity: opacity * 0.8,
        })}
      />

      {/* Fine surface details, rocks and debris - Layer 3 */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle(`translateY(50%) rotate(${(scrollRotation + continuousRotation) * 0.4}deg)`, {
          bottom: `${position * 20 - 30}%`,
          aspectRatio: "1/1",
          borderRadius: "50%",
          width: `${sizes.planetMaxWidth}px`,
          height: `${sizes.planetMaxWidth}px`,
          left: "50%",
          marginLeft: `${sizes.planetMarginLeft}px`,
          background: `
            radial-gradient(ellipse 5% 7% at 20% 30%, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.25) 30%, rgba(0, 0, 0, 0.08) 60%, transparent 80%),
            radial-gradient(ellipse 3% 5% at 40% 15%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 85%),
            radial-gradient(ellipse 6% 8% at 70% 80%, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.3) 25%, rgba(0, 0, 0, 0.1) 50%, transparent 70%),
            radial-gradient(ellipse 4% 6% at 85% 25%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 45%, transparent 75%),
            radial-gradient(ellipse 5% 7% at 30% 90%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 35%, transparent 80%),
            radial-gradient(ellipse 7% 9% at 10% 65%, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 20%, rgba(0, 0, 0, 0.15) 45%, transparent 65%),
            radial-gradient(ellipse 2% 4% at 80% 50%, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 90%),
            radial-gradient(ellipse 6% 8% at 60% 70%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.05) 60%, transparent 75%),
            radial-gradient(ellipse 3% 5% at 95% 85%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.12) 50%, transparent 85%),
            radial-gradient(ellipse 4% 6% at 5% 20%, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 40%, transparent 75%),
            radial-gradient(ellipse 2% 3% at 50% 45%, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.1) 60%, transparent 90%),
            radial-gradient(ellipse 3% 4% at 75% 15%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 50%, transparent 95%)
          `,
          opacity: opacity * 0.7,
        })}
      />

      {/* Ultra-fine surface texture and micro-details - Layer 4 */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle(`translateY(50%) rotate(${(scrollRotation + continuousRotation) * 0.2}deg)`, {
          bottom: `${position * 20 - 30}%`,
          aspectRatio: "1/1",
          borderRadius: "50%",
          width: `${sizes.planetMaxWidth}px`,
          height: `${sizes.planetMaxWidth}px`,
          left: "50%",
          marginLeft: `${sizes.planetMarginLeft}px`,
          background: `
            radial-gradient(ellipse 2% 3% at 25% 25%, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.1) 60%, transparent 85%),
            radial-gradient(ellipse 1% 2% at 45% 35%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 70%, transparent 90%),
            radial-gradient(ellipse 2% 3% at 65% 55%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.15) 50%, transparent 80%),
            radial-gradient(ellipse 1% 2% at 85% 75%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.08) 65%, transparent 90%),
            radial-gradient(ellipse 1% 2% at 15% 85%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.008) 75%, transparent 95%),
            radial-gradient(ellipse 2% 3% at 35% 65%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.05) 70%, transparent 85%),
            radial-gradient(ellipse 1% 2% at 75% 25%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 60%, transparent 90%),
            radial-gradient(ellipse 1% 2% at 55% 85%, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.12) 55%, transparent 85%),
            radial-gradient(ellipse 1% 1% at 95% 45%, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.06) 70%, transparent 95%),
            radial-gradient(ellipse 1% 2% at 5% 55%, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.01) 65%, transparent 90%)
          `,
          opacity: opacity * 0.6,
        })}
      />

      {/* Subtle rim lighting effect - no rotation to maintain perfect circle */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle("translateY(50%)", {
          bottom: `${position * 20 - 30}%`,
          aspectRatio: "1/1",
          borderRadius: "50%",
          width: `${sizes.planetMaxWidth}px`,
          height: `${sizes.planetMaxWidth}px`,
          left: "50%",
          marginLeft: `${sizes.planetMarginLeft}px`,
          background: `radial-gradient(circle at ${20 + Math.sin(time * 0.04) * 2}% ${20 + Math.cos(time * 0.03) * 1.5}%, 
            transparent 65%, 
            rgba(76, 215, 135, ${0.03 + Math.sin(time * 0.06) * 0.01}) 78%, 
            rgba(76, 215, 135, ${0.05 + Math.sin(time * 0.05) * 0.015}) 88%, 
            transparent 100%)`,
          opacity: opacity * 0.4,
        })}
      />
    </div>
  )
}
