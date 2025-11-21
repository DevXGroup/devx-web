'use client'

import { usePerformanceOptimizedAnimation } from '@/hooks/use-performance-optimized-animation'
import { useScrollRef } from '@/hooks/use-scrollRef'
import { useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

/**
 * Optimized PNG-based planet divider
 * - Uses moon PNG image with 1/2 visible (bottom half)
 * - Continuous rotation with CSS animation (pauses when out of view)
 * - Scroll-based opacity: fades from 68% to 40% (always visible for smooth scroll-back)
 * - Scroll-based movement (moves down as you scroll with smooth easing)
 * - Event-driven updates (only on scroll, not constant RAF loop)
 * - Smooth CSS transitions for opacity changes
 * - Respects prefers-reduced-motion for accessibility
 */
export default function PlanetDivider({ opacity = 0.68 }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [planetSize, setPlanetSize] = useState(700)
  const scrollYRef = useScrollRef({ throttleDelay: 4 })
  const { isMobile } = usePerformanceOptimizedAnimation()
  const isInView = useInView(containerRef, { margin: '200px', amount: 0.1 })

  // Update planet size on mount and resize
  useEffect(() => {
    const updateSize = () => {
      const maxWidth = window.innerWidth - 100 // 50px margin on each side
      const maxSize = Math.min(maxWidth, 700) // Cap at 700px max
      setPlanetSize(Math.max(maxSize, 300)) // Minimum 300px
    }

    updateSize()

    const handleResize = () => {
      updateSize()
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = containerRef.current
    if (!element) return

    let ticking = false

    const updatePlanet = () => {
      const scrollY = scrollYRef.current
      // Longer scroll range for smoother movement
      const scrollProgress = Math.min(scrollY / 600, 1)

      // Direct easing - no interpolation for instant response
      const easeOutQuad = (t: number): number => t * (2 - t)
      const easedOffset = easeOutQuad(scrollProgress) * (isMobile ? 120 : 300)

      // Fade to nearly invisible
      const minOpacity = 0.05
      const currentOpacity = opacity - scrollProgress * (opacity - minOpacity)

      element.style.setProperty('--planet-offset-y', `${easedOffset}px`)
      element.style.setProperty('--planet-opacity', currentOpacity.toString())

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePlanet)
        ticking = true
      }
    }

    // Initial update
    updatePlanet()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, opacity])

  // Responsive container and offset based on planet size
  const containerHeight = Math.floor(planetSize * 0.6) // 60% of planet size
  const verticalOffset = '40%' // Consistent offset for all sizes

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto pointer-events-none"
      style={
        {
          height: `${containerHeight}px`,
          background: 'transparent',
          overflow: 'visible',
          '--planet-offset-y': '0px',
          '--planet-opacity': `${opacity}`,
        } as React.CSSProperties
      }
    >
      {/* Planet container - shows bottom portion (more visible on mobile) */}
      <div
        className="absolute left-1/2 bottom-0"
        style={{
          width: `${planetSize}px`,
          height: `${planetSize}px`,
          marginLeft: `-${planetSize / 2}px`,
          transform: `translateY(calc(${verticalOffset} + var(--planet-offset-y)))`,
          overflow: 'visible',
          transition: 'width 0.3s ease-out, height 0.3s ease-out, margin-left 0.3s ease-out',
        }}
      >
        {/* Rotating planet */}
        <div className="planet-rotate-container">
          <div className="planet-container">
            <picture className="planet-sphere-wrapper">
              <source
                srcSet="/moon_hero_1536.webp 1536w, /moon_hero_1024.webp 1024w, /moon_hero_768.webp 768w, /moon_hero_512.webp 512w"
                type="image/webp"
              />
              <img
                src="/moon_hero_768.png"
                srcSet="/moon_hero_768.png 768w, /moon_hero_512.png 512w"
                sizes={`${planetSize}px`}
                width="768"
                height="768"
                alt=""
                fetchPriority="low"
                loading="lazy"
                decoding="async"
                className="planet-sphere"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  opacity: 'var(--planet-opacity)',
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'opacity',
                }}
              />
            </picture>
          </div>
        </div>
      </div>

      <style jsx>{`
        .planet-rotate-container {
          width: 100%;
          height: 100%;
          animation-name: rotate-planet;
          animation-duration: ${isMobile ? '140s' : '100s'};
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: ${isInView ? 'running' : 'paused'};
          /* Hardware acceleration for smooth rotation */
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .planet-container {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 50%;
          overflow: visible;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .planet-sphere-wrapper {
          display: block;
          width: 100%;
          height: 100%;
        }

        .planet-sphere {
          display: block;
          width: 100%;
          height: 100%;
          /* Hardware acceleration for smooth rotation */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: filter, opacity;
          border-radius: 50%;
          /* Smooth opacity transitions for scroll */
          transition: opacity 0.15s ease-out;
        }

        @keyframes rotate-planet {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .planet-rotate-container {
            animation: none;
          }
          .planet-sphere {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
