'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Rocket, User, Layers, Search, Flag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import RotatingText from '@animations/RotatingText'
import dynamic from 'next/dynamic'

const InfinityLogo = dynamic(() => import('@3d/InfinityLogo'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[40vh] flex justify-center items-center">
      <div className="text-[#4CD787] text-lg font-['IBM_Plex_Mono']">Loading...</div>
    </div>
  ),
})
import GridAnimation from '@animations/GridAnimation'
import { containerVariants as globalContainerVariants } from '@/lib/animations'
import { usePerformanceOptimizedAnimation } from '@/hooks/use-performance-optimized-animation'

const subheaders = [
  'AI-Powered Solutions',
  'Software Engineering',
  'AI Integration',
  'Workflow Automation',
  'Cloud Solutions',
  'DevOps & Infrastructure',
  'Custom Software Solutions',
  'Legacy System Modernization',
  'Cross-Platform Development',
  'Stunning UI/UX Design',
  'Agentic AI',
]

// Use global animation variants for consistency
const containerVariants = globalContainerVariants

function StepAnimation({
  step,
  text,
  isActive,
}: {
  step: number
  text: string
  isActive: boolean
}) {
  const stepCircleVariants = {
    active: {
      backgroundColor: '#ccff00',
      color: '#0f172a',
      scale: 1.05,
      borderColor: '#d8ff4d',
      boxShadow: '0 0 18px rgba(204, 255, 0, 0.45)',
    },
    inactive: {
      backgroundColor: 'rgba(30, 41, 59, 0.85)', // slate-800/85
      color: 'rgba(203, 213, 225, 0.9)', // slate-200
      scale: 1,
      borderColor: 'rgba(148, 163, 184, 0.65)',
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    },
  }

  const stepTextVariants = {
    active: {
      fontWeight: 700,
      color: '#ffffff',
    },
    inactive: {
      fontWeight: 400,
      color: 'rgb(203 213 225)', // slate-200
    },
  }

  return (
    <motion.div
      key={`step-${step}`}
      className={`flex flex-col items-center space-y-2 sm:space-y-4`}
    >
      <motion.div
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-base sm:text-lg font-bold font-['IBM_Plex_Mono'] relative border-2 sm:border-3 md:border-4"
        variants={stepCircleVariants}
        animate={isActive ? 'active' : 'inactive'}
        transition={{ duration: 0.25 }}
      >
        {step}
      </motion.div>

      <motion.p
        className="text-xs sm:text-sm md:text-base font-['IBM_Plex_Mono'] text-center max-w-[80px] sm:max-w-none"
        variants={stepTextVariants}
        animate={isActive ? 'active' : 'inactive'}
        transition={{ duration: 0.25 }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}

type HireDevelopersCardProps = {
  icon: LucideIcon
  title: string
  description: string
  index: number
}

function HireDevelopersCard({ icon: Icon, title, description, index }: HireDevelopersCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      data-card-index={index}
      className="relative bg-slate-800/90 border border-slate-600/50 p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: '50px' }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
    >
      <div className="relative flex flex-col gap-5">
        <div className="flex-shrink-0 w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#ccff00] flex items-center justify-center shadow-[0_0_18px_rgba(204,255,0,0.25)]">
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="heading-component text-white">{title}</h3>
          <p className="subtitle-sm text-slate-100">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function WhyUsCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon
  title: string
  description: string
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      data-card-index={index}
      className="relative bg-slate-800/90 border border-slate-600/50 p-6 sm:p-7 md:p-8 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-sm flex flex-col items-center text-center overflow-hidden min-h-[260px] sm:min-h-[280px] md:min-h-[300px] w-full"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: '50px' }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
    >
      <div className="relative z-10 flex flex-col items-center h-full space-y-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#ccff00] to-yellow-300 border border-[#ccff00]/70 shadow-[0_0_18px_rgba(204,255,0,0.25)]">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
        </div>
        <h3 className="heading-component text-white">{title}</h3>
        <p className="subtitle-sm text-slate-100 max-w-[22rem]">{description}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hireDevelopersRef = useRef<HTMLDivElement>(null)
  const infinityTriggerRef = useRef<HTMLDivElement>(null)

  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Talk to us', 'Plan together', 'Build something great']

  const [isMounted, setIsMounted] = useState(false)
  const [isStepAnimationActive, setIsStepAnimationActive] = useState(false)
  const [shouldLoad3D, setShouldLoad3D] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, margin: '0px' })
  const is3DNear = useInView(infinityTriggerRef, { once: true, margin: '800px' })
  const { isMobile, shouldOptimizeAnimations } = usePerformanceOptimizedAnimation()

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth)
    }
  }, [])

  // Preload 3D component when user scrolls near it
  useEffect(() => {
    if (is3DNear && !shouldOptimizeAnimations) {
      setShouldLoad3D(true)
    }
  }, [is3DNear, shouldOptimizeAnimations])

  // Memoize animation timing based on reduced motion preference and screen size
  const stepInterval = useMemo(() => {
    const baseInterval = isMobile ? 2500 : 3000 // Faster intervals
    return shouldOptimizeAnimations ? 4000 : baseInterval // Faster even when optimized
  }, [shouldOptimizeAnimations, isMobile])

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
      // Update isMobile if needed
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }

    // Return undefined when window is not available
    return undefined
  }, [])

  // IntersectionObserver for step animation - with mobile-friendly settings
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsStepAnimationActive(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1, // Trigger earlier
        rootMargin: isMobile ? '100px 0px 100px 0px' : '50px 0px 50px 0px', // Larger margin for mobile for better UX
      }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isMounted, isMobile])

  useEffect(() => {
    if (!isStepAnimationActive || shouldOptimizeAnimations) return // Skip animation if optimization is needed

    const timer = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
    }, stepInterval)

    return () => clearInterval(timer)
  }, [stepInterval, steps.length, isStepAnimationActive, shouldOptimizeAnimations])

  return (
    <motion.section
      ref={containerRef}
      className="relative pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0, margin: '100px' }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Gradient transition from black to purple */}
      <div className="absolute top-0 left-0 right-0 h-2 md:h-40 bg-gradient-to-b from-black to-transparent z-[1] pointer-events-none" />

      {/* Full-screen Grid Background for entire section */}
      <div className="absolute inset-0 w-full h-full opacity-50 md:opacity-40 z-[0] pointer-events-auto">
        <GridAnimation
          direction="diagonal"
          speed={0.3}
          squareSize={36}
          hoverFillColor="rgba(157, 78, 221, 0.45)"
          borderColor="rgba(204, 255, 0, 1)"
          flickerColor="rgba(204, 255, 0, 0.4)"
          randomFlicker={true}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative container mx-auto px-4 z-[3] max-w-6xl select-text"
        transition={{
          duration: shouldOptimizeAnimations ? 0.3 : 0.5,
          ease: 'easeOut',
        }}
      >
        {/* Hire Developers Section */}
        <div ref={hireDevelopersRef} className="relative">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 relative z-[3]">
            {/* Fixed title visibility with inline styles */}
            <h2 className="heading-section text-white mb-4 sm:mb-6 pb-2 sm:pb-3 px-4">
              Hire Elite Developers
              <br />
              Effortlessly.
            </h2>
          </div>

          {/* Redesigned Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 max-w-5xl mx-auto px-4 sm:px-6 relative z-[3]">
            <HireDevelopersCard
              icon={Rocket}
              title="Are you launching a startup or new product?"
              description="Our expert team launches your product fast with reliability and scale built in."
              index={0}
            />
            <HireDevelopersCard
              icon={User}
              title="Need a top-tier dev team you can count on?"
              description="Partner with a proven team that plugs in instantly with zero onboarding hassle."
              index={1}
            />
          </div>
        </div>
        {/* End of Hire Developers Section with Grid */}

        {/* Creative Rotating Text Section - Enhanced Size & Visibility */}
        <div className="relative -mx-4 px-4 py-14 sm:py-16 md:py-20 my-12 sm:my-16 md:my-20 bg-transparent">
          <div className="relative z-10 text-center">
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-3 sm:gap-4 md:gap-5 px-4">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)]">
                Creative
              </span>
              <div className="relative inline-block">
                <RotatingText
                  texts={subheaders}
                  rotationInterval={
                    shouldOptimizeAnimations ? 4000 : shouldReduceMotion ? 2500 : 3000
                  } // Slower on low performance
                  transition={{
                    type: shouldOptimizeAnimations ? 'tween' : 'spring', // Simpler transition on low performance
                    ...(shouldOptimizeAnimations ? {} : { stiffness: 200, damping: 20 }),
                  }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  splitBy="characters"
                  staggerDuration={shouldOptimizeAnimations ? 0.05 : 0.03} // Slower stagger on low performance
                  staggerFrom="first"
                  mainClassName="relative font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono text-center text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  splitLevelClassName="overflow-visible"
                  elementLevelClassName="inline-block drop-shadow-lg"
                  loop={true}
                  auto={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Why Us Section */}
        <div id="why-devx-section" className="text-center mb-12 sm:mb-16 md:mb-20">
          {/* Fixed title visibility with inline styles */}
          <h2 className="heading-section text-white mb-4 sm:mb-6 pb-2 sm:pb-3 px-4">
            Why Choose Us?
          </h2>
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
            <p className="subtitle-lg text-slate-100 mb-4">
              Trusted U.S. company with worldwide senior developers, proven track record, and
              full-stack expertise across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto px-4 sm:px-6">
            <WhyUsCard
              icon={Flag}
              title="Global Excellence"
              description="Headquarters in the U.S. with senior developers worldwide, ensuring accountability with round-the-clock progress."
              index={0}
            />
            <WhyUsCard
              icon={Search}
              title="Proven Success"
              description="Hundreds of projects delivered across fintech, healthcare, retail, and SaaS — experience that reduces risk."
              index={1}
            />
            <WhyUsCard
              icon={Layers}
              title="Full-Stack Expertise"
              description="From UI/UX design to cloud deployment, our senior engineers cover the full stack with efficiency and precision."
              index={2}
            />
          </div>

          {/* Added link to About page */}
          <div className="mt-12 sm:mt-16 mb-20 sm:mb-24 md:mb-28 text-center px-4 pointer-events-auto">
            <motion.div
              whileHover={!shouldOptimizeAnimations ? { scale: 1.02 } : {}} // Skip animation if optimization is needed
              whileTap={!shouldOptimizeAnimations ? { scale: 0.98 } : {}} // Skip animation if optimization is needed
              transition={{ duration: shouldOptimizeAnimations ? 0.1 : 0.2 }} // Faster transition on low performance
              className="relative inline-block pointer-events-auto"
            >
              {/* Animated glow border effect - skip if optimizing */}
              {!shouldOptimizeAnimations && (
                <div className="absolute inset-0 rounded-xl overflow-hidden -z-10 pointer-events-none">
                  <div
                    className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-spin opacity-70"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, #4CD787, transparent, #9d4edd, transparent)`,
                      animationDuration: '3s',
                      transform: 'translateZ(0)',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                    }}
                  />
                </div>
              )}
              <Link
                href="/about#our-values"
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#4CD787] via-[#9d4edd] to-[#4CD787] bg-[length:200%_100%] bg-[position:0%_0] hover:bg-[position:100%_0] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg md:text-xl font-bold font-sans backdrop-blur-sm border-2 border-[#4CD787]/40 hover:border-[#9d4edd]/60 hover:shadow-2xl hover:shadow-[#4CD787]/50 z-10"
                style={{
                  transition:
                    'background-position 500ms ease, border-color 300ms ease, box-shadow 300ms ease',
                  willChange: 'background-position',
                  transform: 'translateZ(0)',
                }}
              >
                Explore more reasons to choose us
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Clean Step Animation - Enhanced Contrast - skip if optimizing */}
        {!shouldOptimizeAnimations && (
          <div className="relative w-full py-12 sm:py-16 md:py-20 mt-12 sm:mt-16 md:mt-20 mb-12 sm:mb-16 md:mb-20">
            {/* Steps Container */}
            <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6">
              {/* Steps Grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-12">
                {steps.map((step, index) => (
                  <div key={index} className="flex justify-center">
                    <StepAnimation step={index + 1} text={step} isActive={currentStep === index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <p className="heading-subsection text-[#ccff00] mb-3 sm:mb-4">
            We&apos;re ready to transform your vision into reality.
          </p>
          <p className="subtitle-lg text-slate-100">Let&apos;s embark on this journey together!</p>
        </div>
      </motion.div>
      {/* Trigger point for 3D loading - positioned well before the actual 3D component */}
      <div ref={infinityTriggerRef} className="absolute bottom-[60vh]" />
      <div
        className="mt-20"
        style={{
          willChange: 'transform',
          contain: 'layout style paint',
          transform: 'translateZ(0)',
        }}
      >
        {(shouldLoad3D || shouldOptimizeAnimations) && <InfinityLogo />}
      </div>

      {/* Smooth fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-transparent to-black z-[1] pointer-events-none" />
    </motion.section>
  )
}
