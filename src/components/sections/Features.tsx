'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Rocket, User, Layers, Search, Flag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import RotatingText from '@animations/RotatingText'
import BlurText from '@animations/BlurText'
import StarBorder from '@/components/animations/StarBorder'
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
  'Legacy\u00A0System\u00A0Modernization',
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
      backgroundColor: '#ffffff',
      color: '#000000',
      scale: 1.05,
      borderColor: '#ffffff',
      boxShadow: '0 0 18px rgba(255, 255, 255, 0.45)',
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
      fontWeight: 500,
      color: '#ffffff',
      fontFamily: 'var(--font-ibm-plex-sans)',
      letterSpacing: '0.02em',
    },
    inactive: {
      fontWeight: 400,
      color: 'rgb(203 213 225)', // slate-200
      fontFamily: 'var(--font-ibm-plex-sans)',
      letterSpacing: '0.02em',
    },
  }

  return (
    <motion.div
      key={`step-${step}`}
      className={`flex flex-col items-center space-y-2 sm:space-y-4`}
    >
      <motion.div
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-base sm:text-lg font-medium relative border-2 sm:border-3 md:border-4"
        style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace' }}
        variants={stepCircleVariants}
        animate={isActive ? 'active' : 'inactive'}
        transition={{ duration: 0.25 }}
      >
        {step}
      </motion.div>

      <motion.p
        className="text-xs sm:text-sm md:text-base text-center max-w-[100px] sm:max-w-none leading-tight"
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
      className="relative bg-zinc-900/40 border border-white/10 p-8 sm:p-10 md:p-12 lg:p-14 rounded-3xl backdrop-blur-md hover:border-white/20 hover:bg-zinc-900/60 transition-all duration-500 group cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: '50px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative flex flex-col gap-6 z-10">
        <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:border-white transition-all duration-300">
          <Icon
            className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-black transition-colors duration-300 [&>*]:stroke-white [&>*]:group-hover:stroke-black [&>*]:transition-colors [&>*]:duration-300"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-1 space-y-3">
          <h3 className="card-title text-white">{title}</h3>
          <p className="card-text-body group-hover:text-zinc-300 transition-colors duration-300">
            {description}
          </p>
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
      className="relative bg-zinc-900/30 border border-white/5 p-6 sm:p-8 rounded-3xl backdrop-blur-sm flex flex-col items-center text-center min-h-[260px] sm:min-h-[280px] w-full cursor-pointer hover:border-white/15 hover:bg-zinc-900/50 transition-all duration-500 group overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0, margin: '50px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center h-full space-y-5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-[#ccff00]/50 group-hover:bg-[#ccff00]/10 transition-all duration-300">
          <Icon
            className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:text-black transition-colors duration-300"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="card-title text-center text-white">{title}</h3>
        <p className="card-text-body text-center max-w-[22rem]">{description}</p>
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
      className="relative pt-32 sm:pt-40 md:pt-48 lg:pt-56 pb-16 sm:pb-20 md:pb-24 lg:pb-28 overflow-hidden bg-black w-full"
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

      {/* Full-screen Grid Background for entire section - softened for subtlety */}
      <div className="absolute inset-0 w-full h-full opacity-45 md:opacity-40 z-[0] pointer-events-none">
        <GridAnimation
          direction="diagonal"
          speed={0.3}
          squareSize={36}
          showRadialGradient={false}
          hoverFillColor="rgba(78, 78, 78, 0.6)" // Slightly more visible fills
          borderColor="rgba(102, 102, 102, 0.45)" // Slightly more visible lines
          flickerColor="rgba(88, 88, 88, 0.5)" // Slightly stronger gray flicker
          randomFlicker={true}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative w-full max-w-none px-4 sm:px-6 lg:px-12 z-[3] select-text overflow-visible"
        transition={{
          duration: shouldOptimizeAnimations ? 0.3 : 0.5,
          ease: 'easeOut',
        }}
      >
        {/* Hire Developers Section */}
        <div ref={hireDevelopersRef} className="relative">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 relative z-[3]">
            {/* Fixed title visibility with inline styles */}
            <BlurText
              text="Hire Elite Developers Effortlessly."
              className="justify-center text-center text-white mb-6 section-title-hero font-editorial"
              delay={50}
              startDelay={150}
              stepDuration={0.4}
              once={true}
            />
          </div>

          {/* Redesigned Cards Section - Attio/Linear Style with better icon contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full max-w-6xl mx-auto px-0 sm:px-2 lg:px-4 relative z-[3]">
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

          {/* Creative animated label moved here */}
          <div className="my-20 sm:my-28 md:my-32 flex justify-center px-0 sm:px-2 lg:px-4 relative z-[3]">
            <div className="relative inline-flex flex-col lg:flex-row items-center lg:items-baseline gap-3 sm:gap-4">
              <span className="font-creative blur-text-gradient text-5xl sm:text-6xl md:text-7xl leading-tight">
                Creative
              </span>
              <div className="relative inline-flex justify-center items-center md:whitespace-nowrap">
                <RotatingText
                  texts={subheaders}
                  rotationInterval={
                    shouldOptimizeAnimations ? 4000 : shouldReduceMotion ? 2500 : 3000
                  }
                  transition={{
                    type: shouldOptimizeAnimations ? 'tween' : 'spring',
                    ...(shouldOptimizeAnimations ? {} : { stiffness: 200, damping: 20 }),
                  }}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  splitBy="characters"
                  staggerDuration={shouldOptimizeAnimations ? 0.05 : 0.03}
                  staggerFrom="first"
                  mainClassName="relative text-lg sm:text-xl md:text-2xl lg:text-3xl font-['IBM_Plex_Sans'] tracking-[0.05em] text-white/90 leading-tight whitespace-nowrap text-center"
                  splitLevelClassName="overflow-visible whitespace-nowrap"
                  elementLevelClassName="inline-block whitespace-nowrap"
                  loop={true}
                  auto={true}
                />
              </div>
            </div>
          </div>
        </div>
        {/* End of Hire Developers Section with Grid */}

        {/* Engagement Models Section */}
        <div className="relative py-12 sm:py-16 md:py-20 my-12 sm:my-16 md:my-20 px-0 sm:px-2 lg:px-4">
          <div className="text-center mb-12 sm:mb-16 relative z-[3]">
            <BlurText
              text="How We Work With You"
              className="justify-center text-center text-white mb-6 section-title-hero font-editorial"
              delay={50}
              startDelay={150}
              stepDuration={0.4}
              once={true}
            />
            <p className="section-subtitle max-w-3xl mx-auto px-4 text-zinc-400 font-light">
              From small businesses to large enterprises—flexible engagement models that fit your
              needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-none px-0 sm:px-2 lg:px-4 relative z-[3]">
            <motion.div
              className="relative bg-[#0A0A0B]/80 border border-white/[0.08] p-8 rounded-3xl backdrop-blur-sm group hover:border-[#4CD787]/40 hover:bg-[#0A0A0B] transition-all duration-300 shadow-lg hover:shadow-[#4CD787]/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '50px' }}
              transition={{ duration: 0.3, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:bg-[#4CD787]/10 group-hover:border-[#4CD787]/30 transition-all duration-300">
                  <Rocket
                    className="w-6 h-6 text-zinc-400 group-hover:text-[#4CD787] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="card-title text-white mb-3">Project Delivery</h3>
                  <p className="card-text-body">
                    Fixed-scope projects with clear timelines and deliverables. Perfect for defined
                    features, MVPs, or specific initiatives.
                  </p>
                </div>
                <div className="h-px w-full bg-white/[0.06] my-2" />
                <ul className="space-y-3 text-sm text-zinc-400 font-light">
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4CD787] group-hover/item:scale-125 transition-transform" />
                    <span className="group-hover/item:text-zinc-300 transition-colors">
                      Fixed pricing & timeline
                    </span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4CD787] group-hover/item:scale-125 transition-transform" />
                    <span className="group-hover/item:text-zinc-300 transition-colors">
                      Well-defined scope
                    </span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4CD787] group-hover/item:scale-125 transition-transform" />
                    <span className="group-hover/item:text-zinc-300 transition-colors">
                      End-to-end delivery
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="relative bg-[#0A0A0B]/80 border border-white/[0.08] p-8 rounded-3xl backdrop-blur-sm group hover:border-[#9d4edd]/40 hover:bg-[#0A0A0B] transition-all duration-300 shadow-lg hover:shadow-[#9d4edd]/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '50px' }}
              transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:bg-[#9d4edd]/10 group-hover:border-[#9d4edd]/30 transition-all duration-300">
                  <User
                    className="w-6 h-6 text-zinc-400 group-hover:text-[#9d4edd] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="card-title text-white mb-3">Team Augmentation</h3>
                  <p className="card-text-body">
                    Dedicated engineers who integrate with your team. Scale up or down as needed
                    with seamless collaboration.
                  </p>
                </div>
                <div className="h-px w-full bg-white/[0.06] my-2" />
                <ul className="space-y-3 text-sm text-zinc-400 font-light">
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9d4edd] group-hover/item:scale-125 transition-transform" />
                    <span className="group-hover/item:text-zinc-300 transition-colors">
                      Flexible team size
                    </span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9d4edd] group-hover/item:scale-125 transition-transform" />
                    <span className="group-hover/item:text-zinc-300 transition-colors">
                      Your process & tools
                    </span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9d4edd] group-hover/item:scale-125 transition-transform" />
                    <span className="group-hover/item:text-zinc-300 transition-colors">
                      Monthly engagement
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="relative bg-[#0A0A0B]/80 border border-white/[0.08] p-8 rounded-3xl backdrop-blur-sm group hover:border-[#ccff00]/40 hover:bg-[#0A0A0B] transition-all duration-300 shadow-lg hover:shadow-[#ccff00]/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '50px' }}
              transition={{ duration: 0.3, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex flex-col gap-6">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:bg-[#ccff00]/10 group-hover:border-[#ccff00]/30 transition-all duration-300">
                  <Layers
                    className="w-6 h-6 text-zinc-400 group-hover:text-[#ccff00] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="card-title text-white mb-3">Long-Term Partnership</h3>
                  <p className="card-text-body">
                    Full engineering team ownership for startups and software companies. We become
                    your execution arm.
                  </p>
                </div>
                <div className="h-px w-full bg-white/[0.06] my-2" />
                <ul className="space-y-3 text-sm text-zinc-400 font-light">
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] group-hover/item:scale-125 transition-transform" />
                    <span className="group-hover/item:text-zinc-300 transition-colors">
                      Ongoing development
                    </span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] group-hover/item:scale-125 transition-transform" />
                    <span className="group-hover/item:text-zinc-300 transition-colors">
                      Strategic planning
                    </span>
                  </li>
                  <li className="flex items-center gap-3 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] group-hover/item:scale-125 transition-transform" />
                    <span className="group-hover/item:text-zinc-300 transition-colors">
                      Complete ownership
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
        {/* End of Engagement Models Section */}

        {/* Why Us Section */}
        <div id="why-devx-section" className="text-center mb-16 sm:mb-20">
          {/* Fixed title visibility with inline styles */}
          <BlurText
            text="Why Choose Us?"
            className="justify-center text-center text-white mb-6 section-title-hero font-editorial"
            delay={50}
            startDelay={150}
            stepDuration={0.4}
            once={true}
          />
          <div className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto mb-12 sm:mb-16 px-4">
            <BlurText
              text="Trusted U.S. company with worldwide senior developers, proven track record, and full-stack expertise across industries."
              className="justify-center mb-4 section-subtitle text-zinc-400"
              delay={20}
              startDelay={200}
              stepDuration={0.4}
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
            className="group relative flex sm:inline-flex items-center justify-center gap-2 text-white px-4 sm:px-5 md:px-5 lg:px-4 xl:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium font-sans backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 z-10 w-full sm:w-auto overflow-hidden max-w-full lg:max-w-[360px] xl:max-w-[320px]"
            style={{
              transition:
                'background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
              transform: 'translateZ(0)',
            }}
          >
            <span className="relative z-10 text-white group-hover:text-white transition-colors">
              Explore more reasons to choose us
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
            {/* White sweep effect */}
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            text="Ready to Transform Your Vision Into Reality?"
            className="justify-center text-center text-white mb-3 sm:mb-4 section-title-compact font-editorial"
            delay={30}
            startDelay={150}
            stepDuration={0.4}
            once={true}
          />
          <p className="section-subtitle-compact text-zinc-300 mb-8 text-center mx-auto">
            Let&apos;s Automate Your Growth In No Time
          </p>

          <StarBorder
            href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-bold text-lg rounded-xl transition-all duration-300"
            color="#FFFFFF"
            speed="3s"
          >
            Book Free Consultation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </StarBorder>
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
