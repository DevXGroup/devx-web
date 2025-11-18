'use client'

import { usePerformanceOptimizedAnimation } from '@/hooks/use-performance-optimized-animation'
import { useScrollRef } from '@/hooks/use-scrollRef'
import { useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

/**
 * Optimized PNG-based planet divider
 * - Uses moon PNG image with 1/2 visible (bottom half)
 * - Continuous rotation with CSS animation (pauses when out of view)
 * - Scroll-based opacity: fully visible in hero (68%), fades out while moving down on scroll
 * - Scroll-based movement (moves down as you scroll, with delay)
 * - Pure CSS animations (GPU-accelerated, no JavaScript)
 * - Respects prefers-reduced-motion for accessibility
 */
export default function PlanetDivider({ opacity = 0.68 }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const scrollYRef = useScrollRef({ throttleDelay: 4 })
  const { isMobile } = usePerformanceOptimizedAnimation()
  const isInView = useInView(containerRef, { margin: '0px' })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = containerRef.current
    if (!element) return

    let animationFrameId: number

    const animate = () => {
      const scrollY = scrollYRef.current
      const scrollProgress = Math.min(scrollY / 500, 1)

      const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3)
      const easedOffset = easeOutCubic(scrollProgress) * (isMobile ? 150 : 250)
      const currentOpacity = opacity * (1 - scrollProgress)

      element.style.setProperty('--planet-offset-y', `${easedOffset}px`)
      element.style.setProperty('--planet-opacity', currentOpacity.toString())

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = window.requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Responsive sizing
  const planetSize = isMobile ? 360 : 700
  const containerHeight = isMobile ? 180 : 350

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
      {/* Planet container - only shows bottom 1/2 */}
      <div
        className="absolute left-1/2 bottom-0"
        style={{
          width: `${planetSize}px`,
          height: `${planetSize}px`,
          marginLeft: `-${planetSize / 2}px`,
          transform: `translateY(calc(50% + var(--planet-offset-y)))`,
          transition: 'transform 0.1s ease-out',
          overflow: 'visible',
          willChange: 'transform',
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
                sizes={isMobile ? '360px' : '700px'}
                width="768"
                height="768"
                alt=""
                fetchPriority="high"
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
          animation: rotate-planet ${isMobile ? '140s' : '100s'} linear infinite;
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
