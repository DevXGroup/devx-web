'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface LogoLoopProps {
  logos: Array<{
    name: string
    icon: string
  }>
  speed?: number
}

export default function LogoLoop({ logos, speed = 15 }: LogoLoopProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    // Duplicate the logos for seamless loop
    const scrollerContent = Array.from(scroller.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      scroller.appendChild(duplicatedItem)
    })
  }, [])

  const handleIconClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="relative w-full overflow-hidden py-8 pb-16">
      {/* Dark gradient overlays on the edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

      <div
        ref={scrollerRef}
        className="flex gap-12 md:gap-16 lg:gap-20"
        style={{
          animation: `scroll ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {logos.map((logo, index) => {
          const isActive = activeIndex === index
          return (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 transition-transform duration-300 hover:scale-125 group/item cursor-pointer"
              onClick={() => handleIconClick(index)}
            >
              <div className="relative flex flex-col items-center gap-3">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 grayscale group-hover/item:grayscale-0 transition-all duration-500">
                  <Image
                    src={logo.icon}
                    alt={logo.name}
                    fill
                    className="object-contain"
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
                {/* Label - Shows on hover for desktop, on click/touch for mobile */}
                <div
                  className={`
                    absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-30
                    bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg
                    border border-purple-500/30 text-white text-xs sm:text-sm font-['IBM_Plex_Mono']
                    transition-all duration-300 pointer-events-none
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
                    md:group-hover/item:opacity-100 md:group-hover/item:translate-y-0
                  `}
                >
                  {logo.name}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
