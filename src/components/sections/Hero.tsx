'use client'

import { useEffect, useCallback, useState } from 'react'
import { motion, useReducedMotion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ClientOnly from '@layout/ClientOnly'
import dynamic from 'next/dynamic'
import StarBorder from '@animations/StarBorder'
import TextType from '@animations/TextType'
import ShinyText from '@/components/ui/ShinyText'

// Dynamically import heavy components with loading={null} for faster LCP
const DynamicHeroBackground = dynamic(() => import('../hero/HeroBackground'), {
  ssr: false,
  loading: () => null,
})
const DynamicPlanetDivider = dynamic(() => import('../planet/PlanetDivider'), {
  ssr: false,
  loading: () => null,
})
const DynamicShootingStars = dynamic(() => import('../hero/ShootingStars'), {
  ssr: false,
  loading: () => null,
})

const subheaders = [
  'Stunning UI/UX',
  'Rapid MVP Launches',
  'SOC2-Ready Engineering',
  'Full-Stack Engineering',
  'Predictive Analytics',
  'Scale with Confidence',
  'AI Automation',
]

// Optimized animation variants for better performance and LCP
const containerVariants = {
  hidden: { opacity: 1 },  // Changed from 0 to 1 for immediate visibility (better LCP)
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,  // Reduced from 0.12
      delayChildren: 0,       // No delay for faster LCP
    },
  },
}

const itemVariants = {
  hidden: { opacity: 1, y: 0 },  // Changed to 1, 0 for immediate visibility (better LCP)
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,  // Reduced from 0.4
    },
  },
}

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },  // Reduced from 0.3
  },
  tap: { scale: 0.98 },
}

export default function Hero() {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimation()
  const [enableBackground, setEnableBackground] = useState(false)
  const [enableShootingStars, setEnableShootingStars] = useState(false)
  const [enablePlanetDivider, setEnablePlanetDivider] = useState(false)

  // Function to navigate to the portfolio page
  const navigateToPortfolio = useCallback(() => {
    router.push('/portfolio')
  }, [router])

  // Trigger entrance animation
  useEffect(() => {
    controls.start('visible')
  }, [controls])

  useEffect(() => {
    let idleHandle: number | null = null
    let timeoutHandle: ReturnType<typeof setTimeout> | null = null
    let shootingTimeout: ReturnType<typeof setTimeout> | null = null
    let planetTimeout: ReturnType<typeof setTimeout> | null = null

    const activateBackground = () => {
      setEnableBackground(true)
      // Defer shooting stars more to prioritize LCP
      if (shootingTimeout) {
        clearTimeout(shootingTimeout)
      }
      shootingTimeout = setTimeout(() => setEnableShootingStars(true), 300)
      if (planetTimeout) {
        clearTimeout(planetTimeout)
      }
      planetTimeout = setTimeout(() => setEnablePlanetDivider(true), 600)
    }

    if (typeof window !== 'undefined') {
      const requestIdle = window.requestIdleCallback?.bind(window)

      if (requestIdle) {
        idleHandle = requestIdle(
          () => {
            activateBackground()
          },
          { timeout: 1500 } // Increased timeout for better LCP
        )
      }
    }

    if (idleHandle === null) {
      timeoutHandle = setTimeout(activateBackground, 400) // Increased from 180ms
    }

    return () => {
      if (idleHandle !== null && typeof window !== 'undefined') {
        window.cancelIdleCallback?.(idleHandle)
      }
      if (timeoutHandle) {
        clearTimeout(timeoutHandle)
      }
      if (shootingTimeout) {
        clearTimeout(shootingTimeout)
      }
      if (planetTimeout) {
        clearTimeout(planetTimeout)
      }
    }
  }, [])

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 tech-flow"></div>

      {/* Starfield Background - Always visible, especially on mobile */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="stars-layer-1"></div>
        <div className="stars-layer-2"></div>
        <div className="stars-layer-3"></div>
      </div>

      {/* 3D Background - Only rendered on client */}
      <ClientOnly>
        {enableBackground && (
          <div className="absolute inset-0 w-full h-full">
            <DynamicHeroBackground />
          </div>
        )}
      </ClientOnly>

      {/* Shooting Stars - Only rendered on client */}
      <ClientOnly>
        {enableShootingStars && <DynamicShootingStars />}
      </ClientOnly>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[80] w-full py-12 sm:py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        style={{ willChange: 'opacity' }}
      >
        <div className="text-center mx-auto w-full px-6 sm:px-[50px] space-y-7 sm:space-y-9 pt-2 sm:pt-4 flex flex-col items-center justify-center">
          {/* Hero content wrapper - this div prevents movement on button hover */}
          <div className="space-y-5 sm:space-y-7">
            <motion.h1
              variants={itemVariants}
              className="hero-title mx-auto flex flex-wrap md:flex-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-center text-white font-mono font-bold tracking-tight w-full"
              style={{
                willChange: 'opacity, transform',
                minHeight: '5rem',  // Reserve space to prevent CLS
              }}
            >
              <span
                className="inline-block"
                style={{
                  textShadow:
                    '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.2), 0 0 120px rgba(255,255,255,0.1)',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))',
                }}
              >
                Your Vision,
              </span>
              <span
                className="inline-block"
                style={{
                  color: '#ccff00',
                  textShadow:
                    '0 0 40px rgba(204,255,0,0.4), 0 0 80px rgba(204,255,0,0.3), 0 0 120px rgba(204,255,0,0.2)',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))',
                }}
              >
                Engineered.
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-center w-full mx-auto space-y-5"
              style={{ willChange: 'opacity, transform' }}
            >
              <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-white font-sans font-light leading-relaxed text-center mx-auto max-w-4xl">
                Elite software team shipping polished software at&nbsp;startup&nbsp;speed.
              </p>
              <div className="relative mx-auto w-full mt-10 flex justify-center">
                <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-8 py-6 rounded-2xl overflow-hidden bg-gradient-to-r from-black/50 via-black/40 to-black/50 backdrop-blur-sm border border-white/10">
                  {/* Subtle animated gradient background */}
                  <div className="absolute inset-0 opacity-30">
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-[#4CD787]/5 via-transparent to-[#ccff00]/5 animate-pulse"
                      style={{ animationDuration: '4s' }}
                    />
                  </div>

                  {/* Content with z-index to appear above background */}
                  <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                    <Link
                      href="/services"
                      className="uppercase tracking-[0.19em] text-base sm:text-lg md:text-lg lg:text-lg font-medium opacity-90 hover:opacity-100"
                    >
                      <ShinyText text="Elite Services" speed={3} delay={0.3} />
                    </Link>
                    <span className="hidden sm:inline text-gray-600 text-base md:text-lg lg:text-lg">
                      •
                    </span>
                    <Link
                      href="/portfolio"
                      className="uppercase tracking-[0.19em] text-base sm:text-lg md:text-lg lg:text-lg font-medium opacity-90 hover:opacity-100"
                    >
                      <ShinyText text="Proven Record" speed={5} delay={0.6} />
                    </Link>

                    <span className="hidden md:inline text-gray-600 text-base md:text-lg lg:text-lg">
                      •
                    </span>
                    <Link
                      href="/pricing"
                      className="uppercase tracking-[0.19em] text-base sm:text-lg md:text-lg lg:text-lg font-medium opacity-90 hover:opacity-100"
                    >
                      <ShinyText text="Competitive Pricing" speed={7} delay={0.9} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="h-[4rem] sm:h-[4.5rem] md:h-[4rem] mt-3 sm:mt-4 md:mt-5 flex justify-center items-center w-full"
            style={{ minHeight: '4rem' }}
          >
            <TextType
              text={subheaders}
              as="p"
              typingSpeed={shouldReduceMotion ? 40 : 80}
              deletingSpeed={shouldReduceMotion ? 25 : 50}
              pauseDuration={shouldReduceMotion ? 800 : 2000}
              className="font-mono typewriter-text tracking-[0.08em] text-center mx-auto leading-tight"
              showCursor={true}
              cursorCharacter="_"
              cursorClassName=""
              loop={true}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-row flex-wrap justify-center gap-4 sm:gap-5 relative z-[120] mt-6 sm:mt-7 mb-12 md:mb-16 lg:mb-20"
          >
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="relative z-[130]"
            >
              <StarBorder
                as="a"
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                color="#ccff00"
                speed="3s"
                className="font-mono font-semibold text-base sm:text-md md:text-md px-6 py-3 sm:px-8 sm:py-3 min-h-[44px] flex items-center justify-center"
                aria-label="Book a free consultation call with DevX Group"
              >
                Book a Free Call
              </StarBorder>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="relative z-[130]"
            >
              <StarBorder
                onClick={navigateToPortfolio}
                color="#e534eb"
                speed="4s"
                className="font-mono font-semibold text-base sm:text-md md:text-md px-6 py-3 sm:px-8 sm:py-3 min-h-[44px] flex items-center justify-center"
                aria-label="View DevX Group portfolio"
              >
                See Our Work
              </StarBorder>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Planet Divider at the bottom of hero - Only rendered on client */}
      <ClientOnly>
        {enablePlanetDivider && (
          <div className="absolute bottom-0 left-0 w-full z-50" aria-hidden>
            <DynamicPlanetDivider />
          </div>
        )}
      </ClientOnly>
      <style jsx>{`
        .link-gradient {
          background: linear-gradient(120deg, #4cd787, #9d4edd, #ccff00, #4cd787);
          background-size: 250% 250%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: linkGradient 8s ease-in-out infinite;
        }

        @keyframes linkGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}
