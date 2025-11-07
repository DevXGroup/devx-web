'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import { motion, useReducedMotion, useAnimation, useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ClientOnly from '@layout/ClientOnly'
import dynamic from 'next/dynamic'
import StarBorder from '@animations/StarBorder'
import TextType from '@animations/TextType'
import ShinyText from '@/components/ui/ShinyText'

// Dynamically import components only when in viewport - optimized loading
const DynamicCosmicStars = dynamic(() => import('../hero/CosmicStars'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black" style={{ minHeight: '100vh', width: '100%' }} />
  ),
})
const DynamicPlanetDivider = dynamic(
  () => import('../planet/PlanetDivider').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '350px', background: 'transparent' }}
      />
    ),
  }
)
const DynamicShootingStars = dynamic(
  () => import('../hero/ShootingStars').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0" style={{ minHeight: '100vh', width: '100%' }} />
    ),
  }
)

const subheaders = [
  'Stunning UI/UX',
  'Rapid MVP Launches',
  'SOC2-Ready Engineering',
  'Full-Stack Engineering',
  'Predictive Analytics',
  'Scale with Confidence',
  'AI Automation',
  'Agentic AI Solutions',
  'RAG Implementation',
  'Intelligent Workflows',
]

// Optimized animation variants for better performance and LCP
const containerVariants = {
  hidden: { opacity: 1 }, // Immediate visibility for better FCP/LCP
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0, // No stagger for instant visibility
      delayChildren: 0, // No delay for faster FCP
    },
  },
}

const itemVariants = {
  hidden: { opacity: 1, y: 0 }, // Immediate visibility for better FCP/LCP
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0, // Instant for better FCP
    },
  },
}

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }, // Reduced from 0.3
  },
  tap: { scale: 0.98 },
}

export default function Hero() {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimation()
  const [enableCosmicStars, setEnableCosmicStars] = useState(false)
  const [enableShootingStars, setEnableShootingStars] = useState(false)
  const [enablePlanetDivider, setEnablePlanetDivider] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Intersection observer to load 3D components only when visible
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '200px' })

  // Function to navigate to the portfolio page
  const navigateToPortfolio = useCallback(() => {
    router.push('/portfolio')
  }, [router])

  // Check for mobile devices to optimize performance
  useEffect(() => {
    const checkIfMobile = () => window.innerWidth < 768
    setIsMobile(checkIfMobile())

    const handleResize = () => setIsMobile(checkIfMobile())
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Trigger entrance animation and load background components when in view
  useEffect(() => {
    controls.start('visible')
    // Load backgrounds immediately for better perceived performance
    setEnableCosmicStars(true)
    setEnableShootingStars(true)
    setEnablePlanetDivider(true)
  }, [controls])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Cosmic Stars Background - Lightweight CSS-based stars */}
      <ClientOnly>
        {enableCosmicStars && (
          <div className="absolute inset-0 w-full h-full z-[1]">
            <DynamicCosmicStars />
          </div>
        )}
      </ClientOnly>

      {/* Shooting Stars - Only rendered on client */}
      <ClientOnly>{enableShootingStars && <DynamicShootingStars />}</ClientOnly>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[80] w-full pt-12 sm:pt-16 lg:pt-20 pb-36 sm:pb-44 lg:pb-52"
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
                willChange: 'auto', // Changed from 'opacity, transform' for better LCP
                minHeight: '5rem',
                maxHeight: '5rem', // Prevent expansion
                height: '5rem', // Fixed height to prevent CLS
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
                <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 px-5 py-4 sm:px-8 sm:py-6 rounded-2xl overflow-hidden border-2 border-white/20 bg-black/60 backdrop-blur-md shadow-xl shadow-black/50 sm:bg-gradient-to-r sm:from-black/70 sm:via-black/60 sm:to-black/70">
                  {/* Subtle animated gradient background - disable on mobile for performance */}
                  <div className="absolute inset-0 hidden sm:block opacity-30">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-[#4CD787]/8 via-transparent to-[#ccff00]/8 ${isMobile ? '' : 'animate-pulse'}`}
                      style={{
                        animationDuration: '4s',
                        animationPlayState: isMobile ? 'paused' : 'running',
                      }}
                    />
                  </div>

                  {/* Content with z-index to appear above background */}
                  <div className="relative z-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                    <Link
                      href="/services"
                      className="uppercase tracking-[0.19em] text-sm sm:text-base md:text-lg lg:text-lg font-medium opacity-90 hover:opacity-100"
                    >
                      <ShinyText text="Elite Services" speed={isMobile ? 5 : 3} delay={0.3} />
                    </Link>
                    <span className="hidden sm:inline text-gray-600 text-base md:text-lg lg:text-lg">
                      •
                    </span>
                    <Link
                      href="/portfolio"
                      className="uppercase tracking-[0.19em] text-sm sm:text-base md:text-lg lg:text-lg font-medium opacity-90 hover:opacity-100"
                    >
                      <ShinyText text="Proven Record" speed={isMobile ? 7 : 5} delay={0.6} />
                    </Link>

                    <span className="hidden md:inline text-gray-600 text-base md:text-lg lg:text-lg">
                      •
                    </span>
                    <Link
                      href="/pricing"
                      className="uppercase tracking-[0.19em] text-sm sm:text-base md:text-lg lg:text-lg font-medium opacity-90 hover:opacity-100"
                    >
                      <ShinyText text="Transparent Pricing" speed={isMobile ? 9 : 7} delay={0.9} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-3 sm:mt-4 md:mt-5 flex justify-center items-center w-full"
            style={{
              minHeight: '4.5rem',
              maxHeight: '4.5rem',
              height: '4.5rem',
              overflow: 'hidden',
            }}
          >
            <TextType
              text={subheaders}
              as="p"
              typingSpeed={shouldReduceMotion ? 40 : isMobile ? 60 : 80} // Slower on mobile
              deletingSpeed={shouldReduceMotion ? 25 : isMobile ? 35 : 50} // Slower on mobile
              pauseDuration={shouldReduceMotion ? 800 : isMobile ? 2500 : 2000} // Longer on mobile
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
                speed={isMobile ? '5s' : '3s'} // Slower animation on mobile
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
                speed={isMobile ? '6s' : '4s'} // Slower animation on mobile
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
          <div className="absolute bottom-0 left-0 w-full z-10" aria-hidden>
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
