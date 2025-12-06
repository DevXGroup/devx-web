'use client'

import { useScrollRef } from '@/hooks/use-scrollRef'
import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * Simplified responsive planet divider
 * - Fixed large size on all devices (700px)
 * - Continuous rotation with CSS animation
 * - Scroll-based opacity and movement
 * - Positioned lower for better visibility
 */
export default function PlanetDivider({ opacity = 0.68 }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollYRef = useScrollRef({ throttleDelay: 4 })
  const isInView = useInView(containerRef, { margin: '200px', amount: 0.1 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const element = containerRef.current
    if (!element) return

    let ticking = false

    const updatePlanet = () => {
      const scrollY = scrollYRef.current
      const scrollProgress = Math.min(scrollY / 600, 1)

      const easeOutQuad = (t: number): number => t * (2 - t)
      const easedOffset = easeOutQuad(scrollProgress) * 200

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

    updatePlanet()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [opacity, scrollYRef])

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto pointer-events-none h-[440px] lg:h-[500px] xl:h-[540px] 2xl:h-[580px]"
      style={
        {
          background: 'transparent',
          overflow: 'visible',
          '--planet-offset-y': '0px',
          '--planet-opacity': `${opacity}`,
        } as React.CSSProperties
      }
    >
      {/* Planet container - responsive size that scales with viewport */}
      <div
        className="planet-visual absolute left-1/2 bottom-0 w-[640px] h-[640px] -ml-[320px] lg:w-[680px] lg:h-[680px] lg:-ml-[340px] xl:w-[720px] xl:h-[720px] xl:-ml-[360px] 2xl:w-[800px] 2xl:h-[800px] 2xl:-ml-[400px]"
        style={{ overflow: 'visible' }}
      >
        {/* Rotating planet */}
        <div className="planet-rotate-container">
          <div className="planet-container">
            <picture className="planet-sphere-wrapper">
              <source
                srcSet="/moon_hero_1024.webp 1024w, /moon_hero_768.webp 768w, /moon_hero_512.webp 512w"
                sizes="(min-width: 1536px) 720px, (min-width: 1280px) 680px, (min-width: 1024px) 620px, (min-width: 640px) 520px, 360px"
                type="image/webp"
              />
              <img
                src="/moon_hero_768.webp"
                srcSet="/moon_hero_768.webp 768w, /moon_hero_512.png 512w"
                sizes="(min-width: 1536px) 720px, (min-width: 1280px) 680px, (min-width: 1024px) 620px, (min-width: 640px) 520px, 360px"
                width="768"
                height="768"
                alt=""
                fetchPriority="high"
                loading="eager"
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
          animation-duration: 100s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: ${isInView ? 'running' : 'paused'};
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

        .planet-visual {
          transform: translateY(calc(34% + var(--planet-offset-y)));
        }

        @media (min-width: 1024px) {
          .planet-visual {
            transform: translateY(calc(30% + var(--planet-offset-y)));
          }
        }

        @media (min-width: 1280px) {
          .planet-visual {
            transform: translateY(calc(26% + var(--planet-offset-y)));
          }
        }

        @media (min-width: 1536px) {
          .planet-visual {
            transform: translateY(calc(22% + var(--planet-offset-y)));
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
