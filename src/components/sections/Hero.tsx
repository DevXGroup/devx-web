'use client'

import { useEffect, useCallback, useState, useRef } from 'react'
import { motion, useReducedMotion, useAnimation, useInView } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ClientOnly from '@layout/ClientOnly'
import dynamic from 'next/dynamic'
import BlurText from '@animations/BlurText'
import StarBorder from '@animations/StarBorder'
import TextType from '@animations/TextType'
import ShinyText from '@/components/ui/ShinyText'
import { usePerformanceOptimizedAnimation } from '@/hooks/use-performance-optimized-animation'
import PlanetDivider from '../planet/PlanetDivider'

// Dynamically import components only when in viewport - optimized loading
const DynamicCosmicStars = dynamic(() => import('../hero/CosmicStars'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-black" style={{ minHeight: '100vh', width: '100%' }} />
  ),
})

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

// Simplified - no animations to prevent CLS
const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

const itemVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
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
  const [StarFieldComp, setStarFieldComp] = useState<(() => React.ReactElement) | null>(null)
  const [HeroBgComp, setHeroBgComp] = useState<(() => React.ReactElement) | null>(null)
  const [ShootingStarsComp, setShootingStarsComp] = useState<(() => React.ReactElement) | null>(
    null
  )
  const [OrionComp, setOrionComp] = useState<(() => React.ReactElement) | null>(null)
  const [visualsReady, setVisualsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Use performance optimization hook to detect slow devices
  const { shouldOptimizeAnimations } = usePerformanceOptimizedAnimation()

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

  // Allow heavy visuals after first user interaction or slight delay
  useEffect(() => {
    const enable = () => setVisualsReady(true)
    // Only enable when the user interacts; skip automatic timer to avoid background JS during LCP/TBT
    window.addEventListener('pointermove', enable, { once: true, passive: true })
    window.addEventListener('scroll', enable, { once: true, passive: true })
    window.addEventListener('click', enable, { once: true, passive: true })
    return () => {
      window.removeEventListener('pointermove', enable)
      window.removeEventListener('scroll', enable)
      window.removeEventListener('click', enable)
    }
  }, [])

  // Trigger entrance animation and load background components when in view
  const scheduleIdleTask = useCallback((cb: IdleRequestCallback, timeout = 1000) => {
    if (typeof window === 'undefined') return undefined
    const idleCallback = window.requestIdleCallback
    if (typeof idleCallback === 'function') {
      return idleCallback(cb, { timeout })
    }
    return window.setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => 0,
      })
    }, timeout)
  }, [])

  const cancelIdleTask = useCallback((id?: number) => {
    if (typeof window === 'undefined' || typeof id === 'undefined') return
    const cancelIdle = window.cancelIdleCallback
    if (typeof cancelIdle === 'function') {
      cancelIdle(id)
    } else {
      window.clearTimeout(id)
    }
  }, [])

  // Show animations only when device isn't in low-power or reduced-motion mode
  const canUseHeavyVisuals = visualsReady && !shouldOptimizeAnimations && !shouldReduceMotion

  useEffect(() => {
    controls.start('visible')
    if (!canUseHeavyVisuals) {
      setEnableCosmicStars(false)
      setEnableShootingStars(false)
      return
    }

    const loadVisuals = async () => {
      try {
        const [
          { StarTwinklingField },
          { default: HeroBackground },
          { default: ShootingStars },
          orion,
        ] = await Promise.all([
          import('../animations/StarTwinklingField'),
          import('../hero/HeroBackground'),
          import('../hero/ShootingStars'),
          import('../hero/OrionCanvasWrapper'),
        ])
        const StarFieldLazy = () => <StarTwinklingField className="z-1" count={100} />
        StarFieldLazy.displayName = 'StarFieldLazy'
        const HeroBgLazy = () => <HeroBackground />
        HeroBgLazy.displayName = 'HeroBackgroundLazy'
        const ShootingStarsLazy = () => <ShootingStars />
        ShootingStarsLazy.displayName = 'ShootingStarsLazy'
        const OrionLazy = () => <orion.default />
        OrionLazy.displayName = 'OrionCanvasLazy'

        setStarFieldComp(() => StarFieldLazy)
        setHeroBgComp(() => HeroBgLazy)
        setShootingStarsComp(() => ShootingStarsLazy)
        setOrionComp(() => OrionLazy)
      } catch {
        // ignore load errors; skip visuals
      }
    }

    const backgroundTimer = scheduleIdleTask(() => {
      // Delay expensive canvases until main thread is idle to help LCP/INP
      setEnableCosmicStars(true)
      loadVisuals()
    }, 800)

    const shootingStarsTimer = scheduleIdleTask(() => {
      setEnableShootingStars(true)
    }, 1400)

    return () => {
      cancelIdleTask(backgroundTimer)
      cancelIdleTask(shootingStarsTimer)
    }
  }, [cancelIdleTask, canUseHeavyVisuals, controls, scheduleIdleTask])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 w-full h-full z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black pointer-events-none" />
        <ClientOnly>
          {enableCosmicStars && canUseHeavyVisuals && (
            <>
              {StarFieldComp && <StarFieldComp />}
              {HeroBgComp && <HeroBgComp />}
              {/* Orion constellation - fixed position, stays in same spot at all screen sizes */}
              {OrionComp && (
                <div className="fixed z-[10000] pointer-events-none left-1/2 translate-x-[32%] sm:left-auto sm:right-3 sm:translate-x-0 top-[26vh] sm:top-[28vh] md:top-[30vh] md:right-4 lg:right-12 lg:top-[32vh] xl:right-20 xl:top-[30vh] w-60 h-60 sm:w-64 sm:h-64 md:w-72 md:h-72 xl:w-[360px] xl:h-[360px]">
                  <OrionComp />
                </div>
              )}
            </>
          )}
        </ClientOnly>
      </div>

      {/* Shooting Stars - Only rendered on client */}
      <ClientOnly>
        {enableShootingStars && canUseHeavyVisuals && ShootingStarsComp && <ShootingStarsComp />}
      </ClientOnly>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-[80] w-full pt-16 sm:pt-20 lg:pt-24 xl:pt-32 pb-32 sm:pb-40 lg:pb-48 xl:pb-56">
        <div className="text-center mx-auto w-full px-4 sm:px-8 md:px-12 xl:px-16 space-y-8 sm:space-y-10 lg:space-y-12 xl:space-y-16 pt-4 sm:pt-6 lg:pt-8 flex flex-col items-center justify-center">
          {/* Hero content wrapper */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 xl:space-y-12">
            <div
              className="hero-title mx-auto flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 sm:gap-4 md:gap-5 xl:gap-6 2xl:gap-7 text-center text-white font-mono font-black tracking-[-0.02em] w-full whitespace-normal lg:whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] 2xl:text-[5.5rem] leading-[1.1]"
              style={{
                minHeight: '4rem',
                height: 'auto',
              }}
            >
              <BlurText
                text="Your Vision,"
                className="inline-flex"
                animateBy="letters"
                delay={80}
                once
                animationFrom={{ filter: 'blur(12px)', opacity: 0, y: -16 }}
                animationTo={[
                  { filter: 'blur(6px)', opacity: 0.6, y: 4 },
                  { filter: 'blur(0px)', opacity: 1, y: 0 },
                ]}
                stepDuration={0.25}
                style={{
                  textShadow: '0 0 60px rgba(255,255,255,0.4), 0 10px 24px rgba(0,0,0,0.5)',
                }}
              />
              <BlurText
                text="Engineered."
                className="inline-flex"
                animateBy="letters"
                delay={190}
                once
                animationFrom={{ filter: 'blur(12px)', opacity: 0, y: -16 }}
                animationTo={[
                  { filter: 'blur(6px)', opacity: 0.6, y: 4 },
                  { filter: 'blur(0px)', opacity: 1, y: 0 },
                ]}
                stepDuration={0.25}
                style={{
                  color: '#ccff00',
                  textShadow:
                    '0 0 60px rgba(204,255,0,0.5), 0 10px 24px rgba(0,0,0,0.5), 0 0 120px rgba(204,255,0,0.2)',
                }}
              />
            </div>

            <div className="text-center w-full mx-auto space-y-6 sm:space-y-7 md:space-y-8 lg:space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 1.9 }}
                className="text-white/90 text-center mx-auto px-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[2rem] 2xl:text-[2.25rem] font-light leading-relaxed"
              >
                Elite software team shipping polished products
                <span className="block">at startup speed.</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="relative mx-auto w-full mt-6 flex justify-center"
              >
                <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:gap-5">
                  <Link
                    href="/services"
                    className="uppercase tracking-[0.15em] subtitle-lg font-semibold opacity-90 hover:opacity-100 transition-all duration-300 hover:tracking-[0.2em]"
                  >
                    <ShinyText text="Elite Services" speed={isMobile ? 5 : 3} delay={0} />
                  </Link>
                  <span className="hidden sm:inline text-gray-400/60 subtitle-lg">•</span>
                  <Link
                    href="/portfolio"
                    className="uppercase tracking-[0.15em] subtitle-lg font-semibold opacity-90 hover:opacity-100 transition-all duration-300 hover:tracking-[0.2em]"
                  >
                    <ShinyText text="Proven Record" speed={isMobile ? 7 : 5} delay={0.2} />
                  </Link>
                  <span className="hidden md:inline text-gray-400/60 subtitle-lg">•</span>
                  <Link
                    href="/pricing"
                    className="uppercase tracking-[0.15em] subtitle-lg font-semibold opacity-90 hover:opacity-100 transition-all duration-300 hover:tracking-[0.2em]"
                  >
                    <ShinyText text="Transparent Pricing" speed={isMobile ? 9 : 7} delay={0.4} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-6 sm:mt-8 flex justify-center items-center w-full px-2"
            style={{
              minHeight: '5rem',
              height: 'auto',
              overflow: 'hidden',
            }}
          >
            <TextType
              text={subheaders}
              as="p"
              typingSpeed={shouldReduceMotion ? 40 : isMobile ? 60 : 80}
              deletingSpeed={shouldReduceMotion ? 25 : isMobile ? 35 : 50}
              pauseDuration={shouldReduceMotion ? 800 : isMobile ? 2500 : 2000}
              className="font-mono typewriter-text tracking-[0.08em] text-center mx-auto leading-tight px-2"
              style={{
                color: '#ccff00',
                textShadow: '0 0 40px rgba(204,255,0,0.4), 0 4px 12px rgba(0,0,0,0.4)',
              }}
              showCursor={true}
              cursorCharacter="_"
              cursorClassName=""
              loop={true}
            />
            {/* Hidden SEO-friendly content for search engines - all typewriter phrases */}
            <span className="sr-only">
              Elite software development services: {subheaders.join(', ')}. Custom software
              development, mobile applications, AI and machine learning solutions, cloud
              infrastructure, IoT integration, and digital transformation services.
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-5 sm:gap-6 lg:gap-8 relative z-[120] w-full max-w-3xl mx-auto px-2 mt-8 sm:mt-10 lg:mt-12 mb-10 sm:mb-14 lg:mb-16"
          >
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="relative z-[130] w-full sm:w-auto"
            >
              <StarBorder
                as="a"
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                color="#ccff00"
                speed={isMobile ? '5s' : '3s'}
                className="ui-code font-extrabold btn-text-primary px-6 py-3 sm:px-7 sm:py-3.5 lg:px-8 lg:py-4 min-h-[44px] min-w-[230px] flex w-full sm:w-auto items-center justify-center text-center tracking-wide hover:tracking-wider transition-all duration-300"
                aria-label="Schedule a free consultation with DevX Group"
              >
                Schedule a Free Consultation
              </StarBorder>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="relative z-[130] w-full sm:w-auto"
            >
              <StarBorder
                onClick={navigateToPortfolio}
                color="#e534eb"
                speed={isMobile ? '6s' : '4s'}
                className="ui-code font-extrabold btn-text-primary px-6 py-3 sm:px-7 sm:py-3.5 lg:px-8 lg:py-4 min-h-[44px] min-w-[230px] flex w-full sm:w-auto items-center justify-center text-center tracking-wide hover:tracking-wider transition-all duration-300"
                aria-label="View DevX Group portfolio"
              >
                See Our Work
              </StarBorder>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Planet Divider at the bottom of hero */}
      <div className="absolute bottom-0 left-0 w-full z-10" aria-hidden>
        <PlanetDivider />
      </div>
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
