'use client'

import { useRef } from 'react'
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
  const scrollerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full overflow-hidden py-8 pb-20">
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
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => {
          const shouldApplyGrayscale = logo.grayscale !== false

          return (
            <div
              key={`${logo.name}-${index}`}
              className="flex-shrink-0 transition-transform duration-300 hover:scale-125 group/item cursor-pointer"
            >
              <div className="relative flex flex-col items-center gap-3">
                <div
                  className={`relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all duration-500 ${
                    shouldApplyGrayscale ? 'grayscale group-hover/item:grayscale-0' : ''
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
