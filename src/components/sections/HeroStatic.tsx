import Link from 'next/link'

/**
 * Static Hero content for SSR and immediate FCP/LCP
 * No client-side JavaScript, animations loaded separately
 */
export default function HeroStatic() {
  return (
    <section className="relative min-h-screen min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Static background gradient */}
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-black/55 to-black pointer-events-none" />
      </div>

      {/* Content */}
      <div className="w-full mx-auto px-0 sm:px-6 lg:px-8 xl:px-12 relative z-[80] pt-20 sm:pt-12 lg:pt-20 xl:pt-24 pb-40 sm:pb-48 lg:pb-52 xl:pb-60">
        <div className="text-center mx-auto w-full px-0 sm:px-8 md:px-12 xl:px-16 space-y-2 sm:space-y-8 lg:space-y-12 xl:space-y-16 pt-2 sm:pt-6 lg:pt-8 flex flex-col items-center justify-center translate-y-0">
          <div className="space-y-3 sm:space-y-6 lg:space-y-8 xl:space-y-10">
            {/* Hero Title - Static for immediate LCP */}
            <div
              className="hero-title mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-x-2 sm:gap-x-3 md:gap-x-3 lg:gap-x-4 text-center text-white w-full leading-none mb-1 sm:mb-6 md:mb-8 lg:mb-10 overflow-visible px-4 sm:px-6"
              style={{
                fontFamily: 'var(--font-playfair-display)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                wordBreak: 'keep-all',
                maxWidth: 'min(1040px, calc(100vw - 32px))',
              }}
            >
              <span
                className="inline-flex font-editorial font-thin justify-center whitespace-nowrap"
                style={{
                  textShadow: '0 0 60px rgba(255,255,255,0.4), 0 10px 24px rgba(0,0,0,0.5)',
                }}
              >
                Your Vision,
              </span>
              <span
                className="inline-flex font-editorial-semibold-italic text-[#ccff00] justify-center whitespace-nowrap"
                style={{
                  textShadow:
                    '0 0 60px rgba(204,255,0,0.5), 0 10px 24px rgba(0,0,0,0.5), 0 0 120px rgba(204,255,0,0.2)',
                }}
              >
                Engineered.
              </span>
            </div>

            {/* Hero Subtitle - Static for immediate LCP */}
            <div className="text-center w-full mx-auto space-y-2 sm:space-y-8 md:space-y-10 lg:space-y-8 xl:space-y-6 px-3 sm:px-4">
              <div
                className="hero-subtitle hero-subtitle-lift text-white text-center mx-auto leading-[1.3] tracking-wide flex flex-col items-center text-[clamp(1.1rem,3.5vw,2.35rem)] sm:text-[clamp(1.3rem,3.2vw,2rem)] lg:text-[clamp(1.4rem,2.5vw,2.35rem)]"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontOpticalSizing: 'auto',
                  fontWeight: 200,
                  fontStyle: 'normal',
                  maxWidth: 'min(48ch, calc(100vw - 1.5rem))',
                  wordBreak: 'break-word',
                  whiteSpace: 'normal',
                  textWrap: 'balance',
                }}
              >
                <span className="justify-center text-center whitespace-normal">
                  Senior software team shipping high-impact
                </span>
                <span className="justify-center text-center whitespace-normal">
                  web, mobile, and AI projects fast
                </span>
              </div>

              {/* Static badges */}
              <div className="relative mx-auto w-full flex justify-center pt-1 sm:pt-4 xl:pt-3">
                <div className="relative flex flex-col items-center justify-center gap-1.5 sm:flex-row sm:flex-nowrap sm:gap-3 md:gap-4 lg:gap-5">
                  <Link
                    href="/services"
                    className="uppercase tracking-[0.14em] sm:tracking-[0.18em] subtitle-sm font-semibold opacity-90 hover:opacity-100 transition-all duration-300 hover:tracking-[0.18em] sm:hover:tracking-[0.22em] text-amber-50/90 hover:text-amber-50 mt-[10px] sm:mt-0 whitespace-nowrap"
                  >
                    Fast Delivery
                  </Link>
                  <span className="hidden sm:inline text-amber-200/30 subtitle-sm">•</span>
                  <Link
                    href="/portfolio"
                    className="uppercase tracking-[0.14em] sm:tracking-[0.18em] subtitle-sm font-semibold opacity-90 hover:opacity-100 transition-all duration-300 hover:tracking-[0.18em] sm:hover:tracking-[0.22em] text-amber-50/90 hover:text-amber-50 whitespace-nowrap"
                  >
                    Proven Record
                  </Link>
                  <span className="hidden md:inline text-amber-200/30 subtitle-sm">•</span>
                  <Link
                    href="/pricing"
                    className="uppercase tracking-[0.14em] sm:tracking-[0.18em] subtitle-sm font-semibold opacity-90 hover:opacity-100 transition-all duration-300 hover:tracking-[0.18em] sm:hover:tracking-[0.22em] text-amber-50/90 hover:text-amber-50 whitespace-nowrap"
                  >
                    Transparent Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Static typewriter placeholder */}
          <div
            className="mt-2 sm:mt-8 mb-12 sm:mb-16 md:mb-20 lg:mb-24 flex justify-center items-center w-full px-2"
            style={{
              minHeight: '4.25rem',
              height: '4.5rem',
              overflow: 'hidden',
              contain: 'layout size',
            }}
          >
            <p
              className="font-mono tracking-[0.08em] text-center mx-auto leading-tight px-2 text-[clamp(0.95rem,3.4vw,1.25rem)] sm:text-[clamp(1rem,2.8vw,1.35rem)] max-w-[90vw]"
              style={{
                color: '#ccff00',
                textShadow: '0 0 40px rgba(204,255,0,0.4), 0 4px 12px rgba(0,0,0,0.4)',
              }}
            >
              AI Automation
            </p>
          </div>
        </div>
      </div>

      {/* CTA Buttons - Static */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
        style={{
          bottom: 'clamp(50px, 8vh, 120px)',
          pointerEvents: 'auto',
        }}
      >
        <div className="flex flex-col items-center gap-4 sm:gap-5 relative z-[100]">
          <Link
            href="/portfolio"
            className="cursor-pointer font-sans font-bold text-xs sm:text-sm md:text-base px-6 sm:px-8 py-2 sm:py-2.5 md:py-3 min-h-[36px] sm:min-h-[40px] md:min-h-[44px] min-w-[140px] sm:min-w-[160px] md:min-w-[190px] flex items-center justify-center text-center tracking-wide hover:tracking-wider transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/15"
            aria-label="View DevX Group portfolio"
          >
            See Our Work
          </Link>
          <Link
            href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-sans font-bold text-xs sm:text-sm md:text-base px-6 sm:px-8 py-2 sm:py-2.5 md:py-3 min-h-[36px] sm:min-h-[40px] md:min-h-[44px] min-w-[140px] sm:min-w-[160px] md:min-w-[190px] flex items-center justify-center text-center tracking-wide hover:tracking-wider transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/15"
            aria-label="Schedule a free call with DevX Group"
          >
            Schedule Free Consultation
          </Link>
        </div>
      </div>
    </section>
  )
}
