'use client'

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
export default function PlanetDivider() {
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Intersection observer to pause rotation when out of view
  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '100px', // Start observing 100px before entering viewport
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [mounted])

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

  // Calculate opacity based on scroll position
  // Initially at full opacity (0.68) in hero section
  // Scroll down: fade out from 0.68 to 0 over first 500px while moving down
  // Scroll up: fade back in from 0 to 0.68 as you return to hero
  const maxOpacity = 0.68
  const opacity = maxOpacity * (1 - Math.min(scrollY / 500, 1))

  return (
    <div
      ref={containerRef}
      className="relative w-full mx-auto pointer-events-none"
      style={{
        height: `${containerHeight}px`,
        background: 'transparent',
        overflow: 'visible', // Allow glow to extend beyond container
      }}
    >
      {/* Planet container - only shows bottom 1/2 */}
      <div
        className="absolute left-1/2 bottom-0"
        style={{
          width: `${planetSize}px`,
          height: `${planetSize}px`,
          marginLeft: `-${planetSize / 2}px`,
          transform: `translateY(calc(50% + ${easedOffset}px))`, // Show only 50% (1/2) + scroll offset
          overflow: 'visible', // Allow glow to extend
          willChange: 'transform, opacity',
        }}
      >
        {/* Rotating planet with glow */}
        <div className="planet-rotate-container">
          <div className="planet-glow-container">
            {/* Safari-compatible glow layer using radial gradient */}
            <div
              className="planet-glow-bg"
              style={{
                opacity, // Match planet opacity
              }}
            />
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
                fetchPriority='high'
                loading="lazy"
                decoding="async"
                className="planet-sphere"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  opacity, // Dynamic opacity based on scroll direction
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
          filter:
            drop-shadow(0 0 40px rgba(180, 200, 160, 0.2))
            drop-shadow(0 0 70px rgba(170, 190, 150, 0.14))
            drop-shadow(0 0 100px rgba(160, 180, 140, 0.08));
          -webkit-filter:
            drop-shadow(0 0 40px rgba(180, 200, 160, 0.2))
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
            filter:
              drop-shadow(0 0 35px rgba(180, 200, 160, 0.18))
              drop-shadow(0 0 60px rgba(170, 190, 150, 0.12))
              drop-shadow(0 0 85px rgba(160, 180, 140, 0.07)) !important;
            -webkit-filter:
              drop-shadow(0 0 35px rgba(180, 200, 160, 0.18))
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
