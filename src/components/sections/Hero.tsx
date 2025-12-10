'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import ClientOnly from '@layout/ClientOnly'
import BlurText from '@animations/BlurText'
import StarBorder from '@animations/StarBorder'
import TextType from '@animations/TextType'
import ShinyText from '@/components/ui/ShinyText'
import { usePerformanceOptimizedAnimation } from '@/hooks/use-performance-optimized-animation'

const BlackHole3D = dynamic(() => import('@/components/3d/BlackHole3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[320px] bg-gradient-to-b from-black via-zinc-950 to-black" />
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

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }, // Reduced from 0.3
  },
  tap: { scale: 0.98 },
}

const ctaButtonClasses =
  'cursor-pointer font-sans font-bold text-xs sm:text-sm md:text-base px-6 sm:px-8 py-2 sm:py-2.5 md:py-3 min-h-[36px] sm:min-h-[40px] md:min-h-[44px] min-w-[140px] sm:min-w-[160px] md:min-w-[190px] flex items-center justify-center text-center tracking-wide hover:tracking-wider transition-all duration-300'

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [StarFieldComp, setStarFieldComp] = useState<(() => React.ReactElement) | null>(null)
  const [HeroBgComp, setHeroBgComp] = useState<(() => React.ReactElement) | null>(null)
  const [ShootingStarsComp, setShootingStarsComp] = useState<(() => React.ReactElement) | null>(
    null
  )
  const [isViewportMobile, setIsViewportMobile] = useState(false)
  const [showStars, setShowStars] = useState(false)
  const [showShootingStars, setShowShootingStars] = useState(false)

  // Use performance optimization hook to detect slow devices
  const {
    shouldOptimizeAnimations,
    isMobile,
    isLowPower,
    hasReducedMotion,
    isSlowCpu,
    shouldSkip3dEffects,
  } = usePerformanceOptimizedAnimation()

  // Check for mobile devices to optimize performance
  useEffect(() => {
    const checkIfMobile = () => window.innerWidth < 768
    setIsViewportMobile(checkIfMobile())

    const handleResize = () => setIsViewportMobile(checkIfMobile())
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const canUseHeavyVisuals = !shouldOptimizeAnimations && !shouldReduceMotion && !isSlowCpu
  const sectionRef = useRef<HTMLElement>(null)
  const deviceIsMobile = isViewportMobile || isMobile
  const shouldRenderBlackHole =
    canUseHeavyVisuals && !shouldSkip3dEffects && !isLowPower && !hasReducedMotion

  // New loading sequence: Text → Stars/Background → Shooting Stars (performance-friendly)
  useEffect(() => {
    if (!canUseHeavyVisuals) {
      setShowStars(false)
      setShowShootingStars(false)
      return
    }

    let starsTimer: number | undefined
    let shootingTimer: number | undefined

    // Load stars and background effects
    const loadStarsAndEffects = async () => {
      try {
        const [{ StarTwinklingField }, { default: HeroBackground }, { default: ShootingStars }] =
          await Promise.all([
            import('../animations/StarTwinklingField'),
            import('../hero/HeroBackground'),
            import('../hero/ShootingStars'),
          ])
        const StarFieldLazy = () => <StarTwinklingField className="z-1" count={40} />
        StarFieldLazy.displayName = 'StarFieldLazy'
        const HeroBgLazy = () => <HeroBackground />
        HeroBgLazy.displayName = 'HeroBackgroundLazy'
        const ShootingStarsLazy = () => <ShootingStars count={3} />
        ShootingStarsLazy.displayName = 'ShootingStarsLazy'

        setStarFieldComp(() => StarFieldLazy)
        setHeroBgComp(() => HeroBgLazy)
        setShootingStarsComp(() => ShootingStarsLazy)
      } catch {
        // ignore load errors
      }
    }

    // Sequence: Text (0-1500ms) → Stars & Background (1900ms) → Shooting Stars (2300ms)
    // Slightly longer delay prevents smeared star/ant artifacts on load.
    const effectsDelay = 1900

    starsTimer = window.setTimeout(() => {
      setShowStars(true)
      loadStarsAndEffects()
    }, effectsDelay) as unknown as number

    shootingTimer = window.setTimeout(() => {
      setShowShootingStars(true)
    }, effectsDelay + 400) as unknown as number

    return () => {
      if (starsTimer) clearTimeout(starsTimer)
      if (shootingTimer) clearTimeout(shootingTimer)
    }
  }, [canUseHeavyVisuals])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0 w-full h-full z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-black/55 to-black pointer-events-none" />
        <ClientOnly>
          {/* Stars and background - load with text for seamless transition */}
          {showStars && canUseHeavyVisuals && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {StarFieldComp && <StarFieldComp />}
              {HeroBgComp && <HeroBgComp />}
            </motion.div>
          )}
        </ClientOnly>
      </div>

      {/* Shooting Stars - Load shortly after stars */}
      <ClientOnly>
        {showShootingStars && canUseHeavyVisuals && ShootingStarsComp && (
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ShootingStarsComp />
          </motion.div>
        )}
      </ClientOnly>

      {/* Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-[80] pt-4 sm:pt-12 lg:pt-20 xl:pt-24 pb-40 sm:pb-48 lg:pb-52 xl:pb-60">
        <div className="text-center mx-auto w-full px-4 sm:px-8 md:px-12 xl:px-16 space-y-2 sm:space-y-8 lg:space-y-12 xl:space-y-16 pt-2 sm:pt-6 lg:pt-8 flex flex-col items-center justify-center -translate-y-8 sm:translate-y-0">
          {/* Hero content wrapper - Reduced vertical spacing to shift content up */}
          <div className="space-y-3 sm:space-y-6 lg:space-y-8 xl:space-y-10">
            <div
              className="hero-title mx-auto flex flex-nowrap items-center justify-center gap-x-2 sm:gap-x-3 md:gap-x-3 lg:gap-x-4 text-center text-white w-full leading-none mb-1 sm:mb-6 md:mb-8 lg:mb-10 overflow-visible whitespace-nowrap max-[467px]:whitespace-normal"
              style={{
                fontFamily: 'var(--font-playfair-display)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              <BlurText
                text="Your Vision,"
                className="inline-flex font-editorial font-thin"
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
                className="inline-flex font-editorial-semibold-italic text-[#ccff00]"
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
                  textShadow:
                    '0 0 60px rgba(204,255,0,0.5), 0 10px 24px rgba(0,0,0,0.5), 0 0 120px rgba(204,255,0,0.2)',
                }}
              />
            </div>

            <div className="text-center w-full mx-auto space-y-2 sm:space-y-8 md:space-y-10 lg:space-y-8 px-2 sm:px-4">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 1.9 }}
                className="hero-subtitle text-white/90 text-center mx-auto leading-[1.3] tracking-wide mt-1 sm:mt-2 md:mt-4 font-editorial"
                style={{
                  fontFamily: 'var(--font-playfair-display)',
                  // Large on desktop, scales down responsively. Max-width ensures 2 lines.
                  // Large on desktop, scales down responsively. Max-width ensures 2 lines.
                  fontSize: 'clamp(1.35rem, 4.5vw, 2.5rem)',
                  fontWeight: 400,
                  maxWidth: '34ch', // Forces 2 lines on all screens (desktop & mobile)
                  width: 'auto',
                }}
              >
                Elite software team shipping polished products at startup speed.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                className="relative mx-auto w-full flex justify-center pt-1 sm:pt-4"
              >
                <div className="relative flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:gap-5">
                  <Link
                    href="/services"
                    className="uppercase tracking-[0.15em] subtitle-sm font-semibold opacity-80 hover:opacity-100 transition-all duration-300 hover:tracking-[0.2em] text-amber-100/90 hover:text-amber-50"
                  >
                    <ShinyText text="Fast Services" speed={deviceIsMobile ? 5 : 3} delay={0} />
                  </Link>
                  <span className="hidden sm:inline text-amber-200/30 subtitle-sm">•</span>
                  <Link
                    href="/portfolio"
                    className="uppercase tracking-[0.15em] subtitle-sm font-semibold opacity-80 hover:opacity-100 transition-all duration-300 hover:tracking-[0.2em] text-amber-100/90 hover:text-amber-50"
                  >
                    <ShinyText text="Proven Record" speed={deviceIsMobile ? 7 : 5} delay={0.2} />
                  </Link>
                  <span className="hidden md:inline text-amber-200/30 subtitle-sm">•</span>
                  <Link
                    href="/pricing"
                    className="uppercase tracking-[0.15em] subtitle-sm font-semibold opacity-80 hover:opacity-100 transition-all duration-300 hover:tracking-[0.2em] text-amber-100/90 hover:text-amber-50"
                  >
                    <ShinyText
                      text="Transparent Pricing"
                      speed={deviceIsMobile ? 9 : 7}
                      delay={0.4}
                    />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="mt-6 sm:mt-8 mb-12 sm:mb-16 md:mb-20 lg:mb-24 flex justify-center items-center w-full px-2"
            style={{
              minHeight: '5rem',
              height: 'auto',
              overflow: 'hidden',
            }}
          >
            <TextType
              text={subheaders}
              as="p"
              typingSpeed={shouldReduceMotion ? 40 : deviceIsMobile ? 60 : 80}
              deletingSpeed={shouldReduceMotion ? 25 : deviceIsMobile ? 35 : 50}
              pauseDuration={shouldReduceMotion ? 800 : deviceIsMobile ? 2500 : 2000}
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
        </div>
      </div>

      {/* Black Hole Animation - Replacing Planet Divider */}
      <div
        className="absolute bottom-[-100px] sm:bottom-[-150px] md:bottom-[-200px] left-0 w-full h-[500px] sm:h-[600px] md:h-[700px] z-[5] flex justify-center items-end pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-full h-full">
          <BlackHole3D enabled={shouldRenderBlackHole} />
        </div>
      </div>

      {/* Centered CTA Buttons - Positioned at BlackHole center */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.8, ease: 'easeOut' }}
        style={{
          bottom: 'clamp(80px, 10vh, 140px)',
          pointerEvents: 'auto',
        }}
      >
        <div className="flex flex-col items-center gap-4 sm:gap-5 relative z-[100]">
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="w-auto pointer-events-auto cursor-pointer"
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            <StarBorder
              href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
              target="_blank"
              rel="noopener noreferrer"
              color="#E2E8F0"
              speed="2s"
              className={ctaButtonClasses}
              aria-label="Schedule a free call with DevX Group"
            >
              Schedule Free Consultation
            </StarBorder>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className="w-auto pointer-events-auto cursor-pointer"
            style={{ cursor: 'pointer', pointerEvents: 'auto' }}
          >
            <StarBorder
              href="/portfolio"
              color="#E2E8F0"
              speed="3s"
              className={ctaButtonClasses}
              aria-label="View DevX Group portfolio"
            >
              See Our Work
            </StarBorder>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
