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
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }

    // Detect Safari browser
    const detectSafari = () => {
      if (typeof navigator === 'undefined') return false
      const userAgent = navigator.userAgent.toLowerCase()
      return userAgent.includes('safari') && !userAgent.includes('chrome') && !userAgent.includes('chromium')
    }

    // Set initial values
    setScrollY(window.scrollY)
    handleResize()
    setIsSafari(detectSafari())

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })

    // Animation timer for continuous rotation and lighting effects
    // Slower animation for Safari to reduce artifacts
    const animationSpeed = detectSafari() ? 120 : 80
    const interval = setInterval(() => {
      setTime(prev => prev + 1)
    }, animationSpeed)

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
    const width = screenSize.width
    let basePosition: number
    let positionRange: number
    let bottomOffset: number

    if (width < 480) {
      basePosition = 0.33
      positionRange = 0.24
      bottomOffset = -8
    } else if (width < 640) {
      basePosition = 0.24
      positionRange = 0.22
      bottomOffset = -12
    } else if (width < 1024) {
      basePosition = -0.15
      positionRange = 0.4
      bottomOffset = -18
    } else {
      basePosition = -0.3
      positionRange = 0.45
      bottomOffset = -26
    }
    const position = basePosition + progress * positionRange
    
    // Reduce rotation speed for Safari to prevent artifacts
    const rotationMultiplier = isSafari ? 0.6 : 1.2
    const scrollRotationMultiplier = isSafari ? 4 : 8

    return {
      position,
      bottomOffset,
      opacity: 1 - progress, // Original scroll-based opacity
      scrollRotation: progress * scrollRotationMultiplier, // Rotation during scroll
      continuousRotation: time * rotationMultiplier // Continuous visible rotation
    }
  }

  // Responsive sizing helper
  const getResponsiveSizes = () => {
    const { width } = screenSize
    // Better breakpoint handling for planet sizing
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024
    const isDesktop = width >= 1024

    let planetSize, planetMargin, containerWidth, containerHeight, translateY

    if (isMobile) {
      // Mobile: Optimized for iPhone and mobile devices
      // Reduce complexity for better performance
      planetSize = Math.min(width * 1.18, 460) // Slightly larger footprint for visibility
      planetMargin = -planetSize / 2 // Perfect centering
      containerWidth = width
      containerHeight = Math.min(width * 0.95, 360) // Increased height to avoid clipping
      translateY = '28%'
    } else if (isTablet) {
      planetSize = 600 // Increased from 400
      planetMargin = -300 // Adjusted for new size
      containerWidth = 700
      containerHeight = 350
      translateY = '42%'
    } else {
      planetSize = 800 // Increased from 500
      planetMargin = -400 // Adjusted for new size
      containerWidth = 900
      containerHeight = 450
      translateY = '48%'
    }

    return {
      glowRadius: getResponsiveValue(80, 100, 120), // Increased for mobile visibility
      glowRadius2: getResponsiveValue(160, 200, 240), // Increased for mobile visibility
      shadowSize: getResponsiveValue(15, 25, 30),
      blurAmount: getResponsiveValue(1.5, 2.5, 3),
      planetShadow: getResponsiveValue(40, 75, 90),
      planetGlow: getResponsiveValue(200, 250, 300), // Increased for mobile visibility
      // Pixel-based sizing for better control
      planetMaxWidth: planetSize,
      planetMarginLeft: planetMargin,
      containerMaxWidth: containerWidth,
      containerHeight: containerHeight,
      translateY,
    }
  }

  const { position, bottomOffset, opacity, scrollRotation, continuousRotation } = calculateVisibility()
  const sizes = getResponsiveSizes()
  const isMobileViewport = screenSize.width < 768

  // Disable rotation on small screens to avoid the iOS rotating square artifact.
  const getTransform = (rotationFactor: number) => {
    const translate = sizes.translateY

    if (isMobileViewport) {
      return `translateY(${translate})`
    }

    const effectiveRotation = (scrollRotation + continuousRotation) * rotationFactor
    return `translateY(${translate}) rotate(${effectiveRotation}deg)`
  }

  // Cross-browser compatible styles with mobile-specific fixes
  const getCrossBrowserStyle = (transform: string, additionalStyles: any = {}) => ({
    WebkitTransform: transform,
    MozTransform: transform,
    msTransform: transform,
    transform: transform,
    WebkitBorderRadius: '50%',
    MozBorderRadius: '50%',
    borderRadius: '50%',
    // Force proper circle rendering on mobile
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitPerspective: 1000,
    perspective: 1000,
    // Ensure smooth rendering
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    ...additionalStyles
  })

  return (
    <div
      className={`relative w-full mx-auto pointer-events-none z-50`}
      style={{
        height: `${sizes.containerHeight}px`,
        background: 'transparent',
        // Safari-specific optimizations
        overflow: 'visible', // Ensure glow isn't clipped
        // Ensure proper compositing layer
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      {/* Main planet body with enhanced 3D definition */}
      <div
        className="absolute w-full h-[200%] left-0 planet-glow-effect"
        style={getCrossBrowserStyle(getTransform(1), {
          bottom: `${position * 20 + bottomOffset}%`,
          aspectRatio: "1/1",
          borderRadius: "50%",
          width: `${sizes.planetMaxWidth}px`,
          height: `${sizes.planetMaxWidth}px`,
          left: "50%",
          marginLeft: `${sizes.planetMarginLeft}px`,
          background: `
            radial-gradient(circle at 35% 35%, rgba(58, 58, 58, 0.9) 0%, rgba(47, 47, 47, 0.8) 25%, rgba(37, 37, 37, 0.7) 50%, rgba(28, 28, 28, 0.6) 75%, rgba(18, 18, 18, 0.5) 100%),
            radial-gradient(ellipse 50% 60% at 30% 30%, rgba(60, 60, 60, 0.4) 0%, rgba(50, 50, 50, 0.3) 30%, rgba(40, 40, 40, 0.2) 55%, transparent 80%),
            radial-gradient(ellipse 40% 50% at 70% 60%, rgba(45, 45, 45, 0.3) 0%, rgba(35, 35, 35, 0.2) 35%, transparent 70%),
            radial-gradient(ellipse 30% 40% at 40% 70%, rgba(30, 30, 30, 0.25) 0%, rgba(20, 20, 20, 0.15) 45%, transparent 75%),
            #3a3a3a
          `,
          boxShadow: `
            0 0 ${sizes.glowRadius}px rgba(76, 215, 135, ${0.06 + Math.sin(time * 0.02) * 0.015}),
            0 0 ${sizes.glowRadius2}px rgba(76, 215, 135, ${0.03 + Math.sin(time * 0.015) * 0.008}),
            0 0 ${sizes.planetGlow}px rgba(76, 215, 135, ${0.02 + Math.sin(time * 0.01) * 0.003}),
            inset -${sizes.shadowSize * 0.8}px -${sizes.shadowSize * 0.8}px ${sizes.planetShadow * 1.2}px rgba(0, 0, 0, 0.4),
            inset ${Math.floor(sizes.shadowSize * 0.4)}px ${Math.floor(sizes.shadowSize * 0.4)}px ${Math.floor(sizes.shadowSize * 0.8)}px rgba(255, 255, 255, 0.02),
            inset -${Math.floor(sizes.shadowSize * 0.2)}px -${Math.floor(sizes.shadowSize * 0.2)}px ${Math.floor(sizes.shadowSize * 0.6)}px rgba(76, 215, 135, 0.015)
          `,
          opacity: opacity,
        })}
      />

      {/* Large crater formations and rock outcrops - Layer 1 */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle(getTransform(isSafari ? 0.9 : 0.8), {
          bottom: `${position * 20 + bottomOffset}%`,
          aspectRatio: "1/1",
          borderRadius: "50%",
          width: `${sizes.planetMaxWidth}px`,
          height: `${sizes.planetMaxWidth}px`,
          left: "50%",
          marginLeft: `${sizes.planetMarginLeft}px`,
          background: `
            radial-gradient(ellipse 25% 30% at 30% 20%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 25%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.05) 70%, transparent 85%),
            radial-gradient(ellipse 20% 26% at 70% 40%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.025) 20%, rgba(255, 255, 255, 0.008) 40%, transparent 65%),
            radial-gradient(ellipse 16% 22% at 20% 70%, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.15) 55%, transparent 75%),
            radial-gradient(ellipse 30% 37% at 80% 25%, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.45) 20%, rgba(0, 0, 0, 0.25) 40%, rgba(0, 0, 0, 0.1) 60%, transparent 80%),
            radial-gradient(ellipse 12% 18% at 50% 85%, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.006) 50%, transparent 75%),
            radial-gradient(ellipse 18% 24% at 85% 75%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.25) 35%, rgba(0, 0, 0, 0.08) 65%, transparent 80%),
            radial-gradient(ellipse 10% 14% at 10% 45%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.06) 70%, transparent 85%)
          `,
          opacity: 1,
        })}
      />

      {/* Medium rocky terrain and boulder fields - Layer 2 */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle(getTransform(isSafari ? 0.85 : 0.6), {
          bottom: `${position * 20 + bottomOffset}%`,
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
          opacity: opacity * 0.95,
        })}
      />

      {/* Fine surface details, rocks and debris - Layer 3 */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle(getTransform(isSafari ? 0.8 : 0.4), {
          bottom: `${position * 20 + bottomOffset}%`,
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
          opacity: opacity * 0.9,
        })}
      />

      {/* Ultra-fine surface texture and micro-details - Layer 4 */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle(getTransform(isSafari ? 0.75 : 0.2), {
          bottom: `${position * 20 + bottomOffset}%`,
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
          opacity: opacity * 0.85,
        })}
      />

      {/* Subtle rim lighting effect - rotates with globe for realistic shadows */}
      <div
        className="absolute w-full h-[200%] left-0"
        style={getCrossBrowserStyle(getTransform(1), {
          bottom: `${position * 20 + bottomOffset}%`,
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
      <style jsx>{`
        .planet-glow-effect {
          will-change: transform, opacity;
          filter: drop-shadow(0 0 60px rgba(76, 215, 135, 0.25)) drop-shadow(0 0 110px rgba(76, 215, 135, 0.18)) drop-shadow(0 0 160px rgba(76, 215, 135, 0.12));
          -webkit-filter: drop-shadow(0 0 60px rgba(76, 215, 135, 0.25)) drop-shadow(0 0 110px rgba(76, 215, 135, 0.18)) drop-shadow(0 0 160px rgba(76, 215, 135, 0.12));
        }

        /* Safari-specific optimizations for large screens */
        @media screen and (min-width: 1200px) {
          @supports (-webkit-appearance: none) {
            .planet-glow-effect {
              /* Reduce complexity for Safari on large screens to prevent cutoff and artifacts */
              filter: drop-shadow(0 0 40px rgba(76, 215, 135, 0.25));
              -webkit-filter: drop-shadow(0 0 40px rgba(76, 215, 135, 0.25));
              -webkit-transform: translateZ(0);
              transform: translateZ(0);
              /* Add containment to prevent overflow issues */
              contain: layout style paint;
              /* Ensure proper compositing */
              -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
              /* Prevent anti-aliasing artifacts */
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          }
        }

        /* Medium screen Safari optimizations */
        @media screen and (min-width: 768px) and (max-width: 1199px) {
          @supports (-webkit-appearance: none) {
            .planet-glow-effect {
              filter: drop-shadow(0 0 35px rgba(76, 215, 135, 0.22)) drop-shadow(0 0 70px rgba(76, 215, 135, 0.15));
              -webkit-filter: drop-shadow(0 0 35px rgba(76, 215, 135, 0.22)) drop-shadow(0 0 70px rgba(76, 215, 135, 0.15));
              -webkit-transform: translateZ(0);
              transform: translateZ(0);
            }
          }
        }

        /* Mobile Safari optimizations - iPhone specific */
        @media screen and (max-width: 767px) {
          .planet-glow-effect {
            /* Simplified filter for better mobile performance */
            filter: drop-shadow(0 0 25px rgba(76, 215, 135, 0.25)) drop-shadow(0 0 50px rgba(76, 215, 135, 0.15));
            -webkit-filter: drop-shadow(0 0 25px rgba(76, 215, 135, 0.25)) drop-shadow(0 0 50px rgba(76, 215, 135, 0.15));
            /* Hardware acceleration */
            -webkit-transform: translateZ(0) scale3d(1, 1, 1);
            transform: translateZ(0) scale3d(1, 1, 1);
            /* Optimize for touch devices */
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-perspective: 1000px;
            perspective: 1000px;
            /* Reduce complexity */
            will-change: transform;
          }
        }

        /* iOS-specific optimizations */
        @supports (-webkit-overflow-scrolling: touch) {
          .planet-glow-effect {
            /* Further reduce complexity on iOS devices */
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  )
}
