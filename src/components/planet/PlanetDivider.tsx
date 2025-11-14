'use client'

import { usePerformanceOptimizedAnimation } from '@/hooks/use-performance-optimized-animation'
import { useScrollRef } from '@/hooks/use-scrollRef'
import { useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

/**
 * Lightweight PNG-based planet divider
 * - Uses moon PNG image with 1/2 visible (bottom half)
 * - Continuous rotation with CSS animation (pauses when out of view)
 * - Subtle greenish-yellow grayish glow directly on the image
 * - Scroll-based opacity: fully visible in hero (68%), fades out while moving down on scroll
 * - Scroll-based movement (moves down as you scroll, with delay)
 * - High performance on all devices
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
          overflow: 'visible', // Allow glow to extend beyond container
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
          overflow: 'visible', // Allow glow to extend
          willChange: 'transform',
        }}
      >
        {/* Rotating planet with glow */}
        <div className="planet-rotate-container">
          <div className="planet-glow-container">
            {/* Safari-compatible glow layer using radial gradient */}
            <div className="planet-glow-bg" style={{ opacity: 'var(--planet-opacity)' }} />
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

        .planet-glow-container {
          width: 100%;
          height: 100%;
          position: relative;
          /* Apply the glow effect to the container to prevent square clipping */
          filter: drop-shadow(0 0 40px rgba(180, 200, 160, 0.2))
            drop-shadow(0 0 70px rgba(170, 190, 150, 0.14))
            drop-shadow(0 0 100px rgba(160, 180, 140, 0.08));
          -webkit-filter: drop-shadow(0 0 40px rgba(180, 200, 160, 0.2))
            drop-shadow(0 0 70px rgba(170, 190, 150, 0.14))
            drop-shadow(0 0 100px rgba(160, 180, 140, 0.08));
          border-radius: 50%;
          overflow: visible; /* Allow glow to extend beyond boundaries */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Safari-compatible glow background layer */
        .planet-glow-bg {
          position: absolute;
          inset: -30%;
          width: 160%;
          height: 160%;
          background: radial-gradient(
            circle at center,
            rgba(180, 200, 160, 0.22) 0%,
            rgba(170, 190, 150, 0.18) 20%,
            rgba(160, 180, 140, 0.12) 40%,
            rgba(150, 170, 130, 0.06) 60%,
            transparent 80%
          );
          border-radius: 50%;
          pointer-events: none;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: opacity;
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
        }

        /* Mobile optimizations - more subtle glow */
        @media screen and (max-width: 767px) {
          .planet-glow-container {
            filter: drop-shadow(0 0 35px rgba(180, 200, 160, 0.18))
              drop-shadow(0 0 60px rgba(170, 190, 150, 0.12))
              drop-shadow(0 0 85px rgba(160, 180, 140, 0.07)) !important;
            -webkit-filter: drop-shadow(0 0 35px rgba(180, 200, 160, 0.18))
              drop-shadow(0 0 60px rgba(170, 190, 150, 0.12))
              drop-shadow(0 0 85px rgba(160, 180, 140, 0.07)) !important;
          }

          .planet-glow-bg {
            inset: -25%;
            width: 150%;
            height: 150%;
            background: radial-gradient(
              circle at center,
              rgba(180, 200, 160, 0.2) 0%,
              rgba(170, 190, 150, 0.16) 20%,
              rgba(160, 180, 140, 0.1) 40%,
              rgba(150, 170, 130, 0.05) 60%,
              transparent 80%
            );
          }
        }

        /* Safari-specific fixes for glow effect */
        @supports (-webkit-backdrop-filter: blur(1px)) {
          .planet-glow-bg {
            /* Enhanced glow for Safari using backdrop blur support detection */
            inset: -40%;
            width: 180%;
            height: 180%;
            background: radial-gradient(
              circle at center,
              rgba(180, 200, 160, 0.45) 0%,
              rgba(170, 190, 150, 0.38) 15%,
              rgba(160, 180, 140, 0.28) 30%,
              rgba(150, 170, 130, 0.18) 50%,
              rgba(140, 160, 120, 0.1) 65%,
              transparent 80%
            );
          }

          @media screen and (max-width: 767px) {
            .planet-glow-bg {
              inset: -35%;
              width: 170%;
              height: 170%;
              background: radial-gradient(
                circle at center,
                rgba(180, 200, 160, 0.4) 0%,
                rgba(170, 190, 150, 0.32) 15%,
                rgba(160, 180, 140, 0.22) 30%,
                rgba(150, 170, 130, 0.14) 50%,
                rgba(140, 160, 120, 0.08) 65%,
                transparent 80%
              );
            }
          }
        }

        /* Respect reduced motion for all animations */
        @media (prefers-reduced-motion: reduce) {
          .planet-sphere {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
