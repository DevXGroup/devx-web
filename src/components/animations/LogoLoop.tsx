'use client'

import { useRef } from 'react'
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

  return (
    <div className="relative w-full overflow-hidden py-8">
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
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex-shrink-0 transition-transform duration-300 hover:scale-125 group/item cursor-pointer"
          >
            <div className="relative flex flex-col items-center gap-3">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 grayscale group-hover/item:grayscale-0 transition-all duration-500">
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
              {/* Label - Shows on hover */}
              <div
                className={`
                  absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap z-30
                  bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg
                  border border-purple-500/30 text-white text-xs sm:text-sm font-['IBM_Plex_Mono']
                  transition-all duration-300 pointer-events-none opacity-0 translate-y-2
                  group-hover/item:opacity-100 group-hover/item:translate-y-0
                `}
              >
                {logo.name}
              </div>
            </div>
          </div>
        ))}
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
