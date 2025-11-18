'use client'

import { useEffect, useRef, useState, useCallback, type CSSProperties } from 'react'
import Image from 'next/image'

interface LogoLoopLogo {
  name: string
  icon: string
  wrapperClassName?: string
  imageClassName?: string
  grayscale?: boolean
  loopWrapperClassName?: string
  loopImageClassName?: string
}

interface LogoLoopProps {
  logos: LogoLoopLogo[]
  speed?: number
}

export default function LogoLoop({ logos, speed = 15 }: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [scrollDistance, setScrollDistance] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Debounced resize handler to prevent excessive re-renders
  const updateDistance = useCallback(() => {
    if (!scrollerRef.current || !containerRef.current) return
    const scrollerWidth = scrollerRef.current.scrollWidth
    const containerWidth = containerRef.current.clientWidth
    setScrollDistance(Math.max(0, scrollerWidth - containerWidth))
  }, [])

  // IntersectionObserver to pause animation when off-screen
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px',
      }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    updateDistance()

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      resizeTimeoutRef.current = setTimeout(updateDistance, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [updateDistance])

  const clearTouchTimeout = useCallback(() => {
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current)
      touchTimeoutRef.current = null
    }
  }, [])

  const handleActivate = useCallback((index: number) => {
    clearTouchTimeout()
    setActiveIndex(index)
  }, [clearTouchTimeout])

  const handleDeactivate = useCallback(() => {
    clearTouchTimeout()
    setActiveIndex(null)
  }, [clearTouchTimeout])

  const handleTouchStart = useCallback((index: number) => {
    handleActivate(index)
  }, [handleActivate])

  const handleTouchEnd = useCallback(() => {
    clearTouchTimeout()
    touchTimeoutRef.current = setTimeout(() => {
      setActiveIndex(null)
    }, 600)
  }, [clearTouchTimeout])

  useEffect(() => {
    return () => {
      clearTouchTimeout()
    }
  }, [])

  const scrollerStyles: CSSProperties & { '--scroll-distance'?: string } = {
    animationName: scrollDistance > 0 && isVisible ? 'scroll' : 'none',
    animationDuration: `${speed}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    // Only use willChange when animation is actually running
    willChange: scrollDistance > 0 && isVisible ? 'transform' : 'auto',
    '--scroll-distance': `${scrollDistance}px`,
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-8 pb-20">
      {/* Dark gradient overlays on the edges - optimized with GPU acceleration */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      />

      <div className="relative w-full">
        <div
          ref={scrollerRef}
          className="flex gap-12 md:gap-16 lg:gap-20"
          style={{
            ...scrollerStyles,
            // Force GPU acceleration for smoother animations
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {[...logos, ...logos].map((logo, index) => {
            const isActive = activeIndex === index
            const shouldApplyGrayscale = logo.grayscale !== false && !isActive

            return (
              <div
                key={`${logo.name}-${index}`}
                role="button"
                tabIndex={0}
                className={`flex-shrink-0 transition-transform duration-300 hover:scale-125 group/item cursor-pointer ${
                  isActive ? 'scale-110' : ''
                }`}
                style={{
                  // GPU acceleration for smooth hover effects
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
                onMouseEnter={() => handleActivate(index)}
                onMouseLeave={handleDeactivate}
                onFocus={() => handleActivate(index)}
                onBlur={handleDeactivate}
                onTouchStart={() => handleTouchStart(index)}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
              >
                <div className="relative flex flex-col items-center gap-3">
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-500 ${
                      shouldApplyGrayscale
                        ? 'grayscale group-hover/item:grayscale-0'
                        : 'grayscale-0'
                    } ${logo.loopWrapperClassName ?? ''}`}
                    style={{ background: 'transparent' }}
                  >
                    <Image
                      src={logo.icon}
                      alt={logo.name}
                      fill
                      sizes="(min-width: 1280px) 6rem, (min-width: 1024px) 5rem, (min-width: 768px) 4.5rem, (min-width: 640px) 4rem, 3rem"
                      className={`object-contain ${logo.imageClassName ?? ''} ${
                        logo.loopImageClassName ?? ''
                      }`}
                      style={
                        logo.name === 'Laravel'
                          ? {
                              filter:
                                'brightness(1.5) saturate(1.5) hue-rotate(300deg) contrast(1.2)',
                            }
                          : undefined
                      }
                    />
                  </div>
                  {/* Label - Shows on hover */}
                  <div
                    className={`
                      absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-[999]
                      bg-black/95 backdrop-blur-md px-4 py-2 rounded-lg
                      border border-[#4CD787]/50 text-white text-sm sm:text-base font-['IBM_Plex_Mono'] font-medium
                      shadow-lg shadow-[#4CD787]/20
                      transition-all duration-300 pointer-events-none opacity-0 translate-y-2 scale-95
                      group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:scale-100
                      ${isActive ? 'opacity-100 translate-y-0 scale-100' : ''}
                    `}
                  >
                    {logo.name}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-1 * var(--scroll-distance, 0px)));
          }
        }
      `}</style>
    </div>
  )
}
