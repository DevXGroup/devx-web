'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Rocket, User, Layers, Search, Flag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import RotatingText from '@animations/RotatingText'
import BlurText from '@animations/BlurText'
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
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-base sm:text-lg font-bold relative border-2 sm:border-3 md:border-4"
        style={{ fontFamily: 'var(--font-ibm-plex-sans)' }}
        variants={stepCircleVariants}
        animate={isActive ? 'active' : 'inactive'}
        transition={{ duration: 0.25 }}
      >
        {step}
      </motion.div>

      <motion.p
        className="subtitle-xs sm:subtitle-sm md:subtitle text-center max-w-[80px] sm:max-w-none"
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
  return (
    <motion.div
      data-card-index={index}
      className="relative bg-slate-800/90 border border-slate-600/50 p-8 sm:p-10 md:p-12 lg:p-14 rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-sm hover:border-slate-500/60 transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: '50px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="relative flex flex-col gap-6">
        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-[#ccff00] flex items-center justify-center shadow-[0_0_24px_rgba(204,255,0,0.35)] group-hover:shadow-[0_0_32px_rgba(204,255,0,0.5)] transition-all duration-300">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
        </div>
        <div className="flex-1 space-y-4">
          <h3 className="heading-subsection text-white leading-tight">{title}</h3>
          <p className="card-description-normal text-slate-300">{description}</p>
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
  return (
    <motion.div
      data-card-index={index}
      className="relative bg-slate-800/90 border border-slate-600/50 p-6 sm:p-7 md:p-8 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-sm flex flex-col items-center text-center overflow-hidden min-h-[260px] sm:min-h-[280px] md:min-h-[300px] w-full cursor-pointer hover:border-slate-500/60 transition-all duration-300"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: '50px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="relative z-10 flex flex-col items-center h-full space-y-5">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#ccff00] to-yellow-300 border border-[#ccff00]/70 shadow-[0_0_18px_rgba(204,255,0,0.25)]">
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
        </div>
        <h3 className="card-title text-white">{title}</h3>
        <p className="card-description-normal max-w-[22rem]">{description}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hireDevelopersRef = useRef<HTMLDivElement>(null)
  const infinityContainerRef = useRef<HTMLDivElement>(null)

  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Talk to us', 'Plan together', 'Build something great']

  const [isMounted, setIsMounted] = useState(false)
  const [isStepAnimationActive, setIsStepAnimationActive] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, margin: '0px' })
  const { isMobile, shouldOptimizeAnimations } = usePerformanceOptimizedAnimation()

  // Viewport-based lazy loading: Start loading when user scrolls near the 3D section
  // Large margin (800px) ensures it loads before coming into view for smooth UX
  const is3DInViewport = useInView(infinityContainerRef, {
    once: true, // Only trigger once - never unload
    margin: '800px', // Start loading well before it's visible
    amount: 0,
  })

  // Render 3D when in viewport and not on low-power devices
  const shouldRender3D = is3DInViewport && !shouldOptimizeAnimations

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Memoize animation timing based on reduced motion preference and screen size
  const stepInterval = useMemo(() => {
    const baseInterval = isMobile ? 2500 : 3000 // Faster intervals
    return shouldOptimizeAnimations ? 4000 : baseInterval // Faster even when optimized
  }, [shouldOptimizeAnimations, isMobile])

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
      className="relative pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-16 sm:pb-20 md:pb-24 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 w-full"
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
      <div className="absolute inset-0 w-full h-full opacity-50 md:opacity-40 z-[0] pointer-events-none">
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
        className="relative container mx-auto px-6 sm:px-8 lg:px-12 z-[3] max-w-7xl select-text"
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
            <BlurText
              text="Hire Elite Developers Effortlessly."
              className="justify-center text-white mb-4 sm:mb-6 pb-2 sm:pb-3 px-4 section-title-hero"
              delay={150}
              once={true}
            />
          </div>

          {/* Redesigned Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-16 sm:mb-20 md:mb-24 lg:mb-28 max-w-6xl mx-auto px-4 sm:px-6 relative z-[3]">
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

        {/* Engagement Models Section */}
        <div className="relative py-12 sm:py-16 md:py-20 my-12 sm:my-16 md:my-20">
          <div className="text-center mb-8 sm:mb-12 relative z-[3]">
            <BlurText
              text="How We Work With You"
              className="justify-center heading-section text-white mb-4 sm:mb-6 pb-2 sm:pb-3 px-4"
              delay={150}
              once={true}
            />
            <p className="subtitle-lg max-w-3xl mx-auto px-4 text-slate-300">
              From small businesses to large enterprises—flexible engagement models that fit your
              needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-6 relative z-[3]">
            <motion.div
              className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-[#4CD787]/30 p-6 sm:p-8 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-sm group hover:border-[#4CD787]/60 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '50px' }}
              transition={{ duration: 0.3, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4CD787]/20 flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-[#4CD787]" />
                </div>
                <h3 className="card-title text-white">Project Delivery</h3>
                <p className="card-description-normal">
                  Fixed-scope projects with clear timelines and deliverables. Perfect for defined
                  features, MVPs, or specific initiatives.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#4CD787] mt-1">•</span>
                    <span>Fixed pricing & timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4CD787] mt-1">•</span>
                    <span>Well-defined scope</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#4CD787] mt-1">•</span>
                    <span>End-to-end delivery</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-[#9d4edd]/30 p-6 sm:p-8 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-sm group hover:border-[#9d4edd]/60 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '50px' }}
              transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#9d4edd]/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#9d4edd]" />
                </div>
                <h3 className="card-title text-white">Team Augmentation</h3>
                <p className="card-description-normal">
                  Dedicated engineers who integrate with your team. Scale up or down as needed with
                  seamless collaboration.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9d4edd] mt-1">•</span>
                    <span>Flexible team size</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9d4edd] mt-1">•</span>
                    <span>Your process & tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9d4edd] mt-1">•</span>
                    <span>Monthly engagement</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-[#ccff00]/30 p-6 sm:p-8 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-sm group hover:border-[#ccff00]/60 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '50px' }}
              transition={{ duration: 0.3, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ccff00]/20 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-[#ccff00]" />
                </div>
                <h3 className="card-title text-white">Long-Term Partnership</h3>
                <p className="card-description-normal">
                  Full engineering team ownership for startups and software companies. We become
                  your execution arm.
                </p>
                <ul className="space-y-2 text-sm text-slate-300 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ccff00] mt-1">•</span>
                    <span>Ongoing development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ccff00] mt-1">•</span>
                    <span>Strategic planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ccff00] mt-1">•</span>
                    <span>Complete ownership</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        {/* End of Engagement Models Section */}

        {/* Creative Rotating Text Section - Enhanced Size & Visibility */}
        <div className="relative w-full py-14 sm:py-16 md:py-20 my-12 sm:my-16 md:my-20 bg-transparent px-[2%]">
          <div className="relative z-10 text-center w-full flex justify-center">
            <div className="inline-flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6">
              <span className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-[3.5rem] 2xl:text-[4rem] font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400 drop-shadow-[0_0_35px_rgba(147,51,234,0.8)] filter-none whitespace-nowrap">
                Creative
              </span>
              <div className="relative inline-flex justify-center items-center whitespace-nowrap">
                <RotatingText
                  texts={subheaders}
                  rotationInterval={
                    shouldOptimizeAnimations ? 4000 : shouldReduceMotion ? 2500 : 3000
                  }
                  transition={{
                    type: shouldOptimizeAnimations ? 'tween' : 'spring',
                    ...(shouldOptimizeAnimations ? {} : { stiffness: 200, damping: 20 }),
                  }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  splitBy="characters"
                  staggerDuration={shouldOptimizeAnimations ? 0.05 : 0.03}
                  staggerFrom="first"
                  mainClassName="relative text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-[3rem] 2xl:text-[3.5rem] font-bold font-mono text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] leading-tight whitespace-nowrap !flex-nowrap"
                  splitLevelClassName="overflow-visible whitespace-nowrap"
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
          <BlurText
            text="Why Choose Us?"
            className="justify-center text-white mb-4 sm:mb-6 pb-2 sm:pb-3 px-4 section-title-hero"
            delay={150}
            once={true}
          />
          <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto mb-12 sm:mb-16 px-4">
            <BlurText
              text="Trusted U.S. company with worldwide senior developers, proven track record, and full-stack expertise across industries."
              className="justify-center mb-4 section-subtitle"
              delay={100}
              once={true}
            />
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
            {/* Static glow border effect - better performance */}
            {/* <div className="absolute inset-0 rounded-xl -z-10 pointer-events-none blur-sm opacity-60"> */}
          </div>
          <Link
            href="/about#our-values"
            className="group relative flex sm:inline-flex items-center justify-center gap-2 text-black px-4 sm:px-5 md:px-5 lg:px-4 xl:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-bold font-sans backdrop-blur-sm border border-[#4CD787]/35 hover:border-[#4CD787]/50 hover:shadow-xl hover:shadow-[#4CD787]/25 z-10 w-full sm:w-auto overflow-hidden max-w-full lg:max-w-[360px] xl:max-w-[320px]"
            style={{
              transition:
                'background-position 500ms ease, background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
              transform: 'translateZ(0)',
            }}
          >
            <span className="relative z-10">Explore more reasons to choose us</span>
            <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
            {/* Animated green sweep */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#4CD787] via-[#64d184] to-[#3bbb6f] bg-[length:200%_100%] bg-[position:0%_0] group-hover:bg-[position:100%_0] opacity-90 transition-[background-position] duration-500" />
          </Link>
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
          <BlurText
            text="We're ready to transform your vision into reality."
            className="justify-center text-[#ccff00] mb-3 sm:mb-4 section-title-compact font-semibold"
            delay={150}
            once={true}
          />
          <p className="text-slate-100 section-subtitle">
            Let&apos;s embark on this journey together!
          </p>
        </div>
      </motion.div>
      <div
        ref={infinityContainerRef}
        className="mt-20"
        style={{
          willChange: 'transform',
          contain: 'layout style paint',
          transform: 'translateZ(0)',
        }}
      >
        {/* Loading skeleton while 3D component is being loaded */}
        {!shouldRender3D && !shouldOptimizeAnimations && (
          <div className="w-full h-[40vh] flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Animated infinity symbol skeleton */}
              <div className="absolute inset-0 animate-pulse">
                <svg
                  viewBox="0 0 100 50"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 25 25 Q 35 10, 50 25 Q 65 40, 75 25 Q 85 10, 75 25 Q 65 40, 50 25 Q 35 10, 25 25"
                    fill="none"
                    stroke="rgba(204, 255, 0, 0.3)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-400 text-sm whitespace-nowrap">
                Loading 3D experience...
              </p>
            </div>
          </div>
        )}

        {/* Show message for low-power devices */}
        {shouldOptimizeAnimations && (
          <div className="w-full max-w-3xl mx-auto text-center py-12 px-4">
            <p className="text-slate-400 text-base">
              3D visualization disabled to optimize performance for your device.
            </p>
          </div>
        )}

        {/* Render 3D when in viewport and device supports it */}
        {shouldRender3D && <InfinityLogo />}
      </div>

      {/* Smooth fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-b from-transparent to-black z-[1] pointer-events-none" />
    </motion.section>
  )
}
