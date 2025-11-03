'use client'

import { useEffect, useState } from 'react'

/**
 * Lightweight PNG-based planet divider
 * - Uses moon PNG image with 1/2 visible (bottom half) at 20% opacity
 * - Continuous rotation with CSS animation
 * - Subtle greenish-yellow grayish glow directly on the image
 * - Scroll-based movement (moves down as you scroll, with delay)
 * - High performance on all devices
 */
export default function PlanetDivider() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsMobile(window.innerWidth < 768)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  if (!mounted) return null

  // Responsive sizing
  const planetSize = isMobile ? 360 : 700
  const containerHeight = isMobile ? 180 : 350

  // Calculate scroll-based movement (similar to original but simplified)
  // Move down slowly as user scrolls (with easing)
  const scrollProgress = Math.min(scrollY / 500, 1) // 0 to 1 over 500px scroll

  // Easing function for smooth movement
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  const easedOffset = easeOutCubic(scrollProgress) * (isMobile ? 150 : 250)

  return (
    <div
      className="relative w-full mx-auto pointer-events-none"
      style={{
        height: `${containerHeight}px`,
        background: 'transparent',
        overflow: 'visible', // Allow glow to extend beyond container
      }}
    >
      {/* Planet container - only shows bottom 1/2 */}
      <div
        className="absolute left-1/2 bottom-0 transition-transform duration-300 ease-out"
        style={{
          width: `${planetSize}px`,
          height: `${planetSize}px`,
          marginLeft: `-${planetSize / 2}px`,
          transform: `translateY(calc(50% + ${easedOffset}px))`, // Show only 50% (1/2) + scroll offset
          overflow: 'visible', // Allow glow to extend
        }}
      >
        {/* Rotating planet with glow */}
        <div className="planet-rotate-container">
          <div className="planet-glow-container">
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
              loading="lazy"
              decoding="async"
              className="planet-sphere"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: 0.8, // 80% opacity on the image
                // Ensure proper rendering in Safari and other browsers
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                willChange: 'filter, opacity',
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
          /* Hardware acceleration for smooth rotation */
          transform: translateZ(0);
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .planet-glow-container {
          width: 100%;
          height: 100%;
          /* Apply the glow effect to the container to prevent square clipping */
          filter: 
            drop-shadow(0 0 60px rgba(180, 200, 160, 0.25))
            drop-shadow(0 0 100px rgba(170, 190, 150, 0.18))
            drop-shadow(0 0 140px rgba(160, 180, 140, 0.12))
            drop-shadow(0 0 180px rgba(150, 170, 130, 0.08));
          -webkit-filter: 
            drop-shadow(0 0 60px rgba(180, 200, 160, 0.25))
            drop-shadow(0 0 100px rgba(170, 190, 150, 0.18))
            drop-shadow(0 0 140px rgba(160, 180, 140, 0.12))
            drop-shadow(0 0 180px rgba(150, 170, 130, 0.08));
          border-radius: 50%;
          overflow: visible; /* Allow glow to extend beyond boundaries */
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
        }

        /* Mobile optimizations - more subtle glow */
        @media screen and (max-width: 767px) {
          .planet-glow-container {
            filter:
              drop-shadow(0 0 50px rgba(180, 200, 160, 0.22))
              drop-shadow(0 0 90px rgba(170, 190, 150, 0.15))
              drop-shadow(0 0 130px rgba(160, 180, 140, 0.1)) !important;
            -webkit-filter:
              drop-shadow(0 0 50px rgba(180, 200, 160, 0.22))
              drop-shadow(0 0 90px rgba(170, 190, 150, 0.15))
              drop-shadow(0 0 130px rgba(160, 180, 140, 0.1)) !important;
          }
        }

        /* Safari-specific fixes for glow effect */
        @media not all and (min-resolution:.001dpcm) { 
          @media {
            .planet-glow-container {
              /* Safari-specific filter adjustments for better glow rendering */
              -webkit-filter: 
                drop-shadow(0 0 60px rgba(180, 200, 160, 0.25))
                drop-shadow(0 0 100px rgba(170, 190, 150, 0.18))
                drop-shadow(0 0 140px rgba(160, 180, 140, 0.12))
                drop-shadow(0 0 180px rgba(150, 170, 130, 0.08));
              filter: 
                drop-shadow(0 0 60px rgba(180, 200, 160, 0.25))
                drop-shadow(0 0 100px rgba(170, 190, 150, 0.18))
                drop-shadow(0 0 140px rgba(160, 180, 140, 0.12))
                drop-shadow(0 0 180px rgba(150, 170, 130, 0.08));
              -webkit-transform: translateZ(0);
              transform: translateZ(0);
              backface-visibility: hidden;
              border-radius: 50%;
            }
            
            @media screen and (max-width: 767px) {
              .planet-glow-container {
                -webkit-filter:
                  drop-shadow(0 0 50px rgba(180, 200, 160, 0.22))
                  drop-shadow(0 0 90px rgba(170, 190, 150, 0.15))
                  drop-shadow(0 0 130px rgba(160, 180, 140, 0.1)) !important;
                filter:
                  drop-shadow(0 0 50px rgba(180, 200, 160, 0.22))
                  drop-shadow(0 0 90px rgba(170, 190, 150, 0.15))
                  drop-shadow(0 0 130px rgba(160, 180, 140, 0.1)) !important;
              }
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
