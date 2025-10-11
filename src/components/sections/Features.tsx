'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { Rocket, User, Layers, Search, Flag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import RotatingText from '@animations/RotatingText'
import InfinityLogo from '@3d/InfinityLogo'
import GridAnimation from '@animations/GridAnimation'
import { containerVariants as globalContainerVariants } from '@/lib/animations'

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
]

// Use global animation variants for consistency
const containerVariants = globalContainerVariants

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

function StepAnimation({
  step,
  text,
  isActive,
}: {
  step: number
  text: string
  isActive: boolean
}) {
  const shouldReduceMotion = useReducedMotion()

  const stepCircleVariants = {
    active: {
      backgroundColor: 'rgba(99, 102, 241, 1)',
      color: '#ffffff',
      scale: 1.1,
      boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
    },
    inactive: {
      backgroundColor: 'rgb(51 65 85)',
      color: 'rgb(203 213 225)',
      scale: 1,
      boxShadow: '0 0 0 rgba(99, 102, 241, 0)',
    },
  }

  const stepTextVariants = {
    active: {
      fontWeight: 'bold',
      color: '#ffffff',
    },
    inactive: {
      fontWeight: 'normal',
      color: 'rgb(156 163 175)',
    },
  }

  return (
    <motion.div key={`step-${step}`} className={`flex flex-col items-center space-y-4`}>
      {/* Step Circle - Enhanced hover effects with bright borders */}
      <motion.div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-lg md:text-xl font-bold font-['IBM_Plex_Mono'] cursor-pointer group relative border-2 border-slate-600`}
        variants={stepCircleVariants}
        animate={isActive ? 'active' : 'inactive'}
        transition={{ duration: 0.4 }}
        whileHover={
          shouldReduceMotion ? {} : { scale: 1.15, boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)' }
        }
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      >
        {step}
      </motion.div>

      {/* Step Text */}
      <motion.p
        className={`text-sm md:text-base font-['IBM_Plex_Mono'] text-center`}
        variants={stepTextVariants}
        animate={isActive ? 'active' : 'inactive'}
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}

function WhyUsCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any
  title: string
  description: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -5,
            }
      }
      whileTap={{ scale: 0.98 }}
      className="group relative bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-sm p-6 sm:p-7 md:p-8 rounded-2xl border border-indigo-500/20 flex flex-col items-center text-center overflow-hidden cursor-pointer transition-all duration-300 min-h-[260px] sm:min-h-[280px] md:min-h-[300px] w-full max-w-full shadow-xl group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] before:absolute before:inset-0 before:border before:border-transparent before:rounded-2xl before:transition-all before:duration-300 group-hover:before:border-indigo-400/40"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 sm:w-15 sm:h-15 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 sm:mb-5 md:mb-6 relative overflow-hidden aspect-square shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600"
          whileHover={{
            boxShadow: `0 0 25px rgba(99, 102, 241, 0.6)`,
          }}
          transition={{ duration: 0.4 }}
          style={{
            border: `2px solid rgb(99, 102, 241)`,
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.2,
              rotateY: 180,
            }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="pointer-events-none"
          >
            <Icon className="w-7 h-7 sm:w-7.5 sm:h-7.5 md:w-8 md:h-8 transition-all duration-300 relative z-10 text-white pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-base sm:text-lg md:text-xl font-bold font-['IBM_Plex_Mono'] text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300 mb-3 sm:mb-4 break-words text-center px-2"
          whileHover={{
            scale: 1.05,
            textShadow: `0 0 15px rgba(99, 102, 241, 0.8)`,
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-slate-300 font-['IBM_Plex_Sans'] text-sm sm:text-base md:text-lg leading-relaxed group-hover:text-white transition-colors duration-500 text-center max-w-full break-words px-2"
          style={{ lineHeight: '1.6' }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hireDevelopersRef = useRef<HTMLDivElement>(null)

  const [currentStep, setCurrentStep] = useState(0)
  const steps = ['Talk to us', 'Plan together', 'Build something great']

  const [isMounted, setIsMounted] = useState(false)
  const [isStepAnimationActive, setIsStepAnimationActive] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  // Memoize animation timing based on reduced motion preference
  const animationTiming = useMemo(
    () => ({
      stepInterval: shouldReduceMotion ? 5000 : 3500, // Longer intervals for better UX
      cardDelay: shouldReduceMotion ? 0 : 0.1,
    }),
    [shouldReduceMotion]
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // IntersectionObserver for step animation
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsStepAnimationActive(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3,
        rootMargin: '100px 0px 100px 0px',
      }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isMounted])

  useEffect(() => {
    if (!isStepAnimationActive) return

    const timer = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
    }, animationTiming.stepInterval)

    return () => clearInterval(timer)
  }, [animationTiming.stepInterval, steps.length, isStepAnimationActive])

  return (
    <section
      ref={containerRef}
      className="relative pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-slate-900 w-full"
    >
      {/* Gradient transition from black to purple */}
      <div className="absolute top-0 left-0 right-0 h-2 md:h-40 bg-gradient-to-b from-black to-transparent z-[1] pointer-events-none" />

      {/* Full-screen Grid Background for entire section */}
      <div className="absolute inset-0 w-full h-full opacity-60 z-[0] pointer-events-auto">
        <GridAnimation
          direction="diagonal"
          speed={0.3}
          borderColor="rgba(168, 85, 247, 0.6)"
          squareSize={50}
          hoverFillColor="rgba(168, 85, 247, 0.7)"
          randomFlicker={true}
          flickerInterval={800}
          maxFlickerSquares={4}
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative container mx-auto px-4 z-[3] max-w-6xl"
      >
        {/* Hire Developers Section */}
        <div ref={hireDevelopersRef} className="relative">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 relative z-[3]">
            {/* Fixed title visibility with inline styles */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-['IBM_Plex_Mono'] text-white pb-2 sm:pb-3 px-4">
              Hire Elite Developers
              <br />
              Effortlessly.
            </h2>
          </div>

          {/* Redesigned Cards Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 max-w-5xl mx-auto px-4 sm:px-6 relative z-[3]"
            variants={containerVariants}
          >
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative bg-[#0C1A1D] p-6 sm:p-8 md:p-10 rounded-2xl border border-transparent transition-all duration-500 overflow-hidden shadow-xl group-hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] before:absolute before:inset-0 before:border before:border-transparent before:rounded-2xl before:transition-all before:duration-300 group-hover:before:border-[#ccff00]/50"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -4,
                      boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
                    }
              }
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col gap-4 sm:gap-6">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#ccff00] flex items-center justify-center"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Rocket className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 text-black" />
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-['IBM_Plex_Sans'] mb-2 sm:mb-3 leading-tight">
                    Are you launching a startup or new product?
                  </h3>
                  <p className="text-slate-400 font-['IBM_Plex_Sans'] text-base md:text-lg leading-relaxed">
                    Our expert team launches your product fast with reliability and scale built in
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative bg-[#0C1A1D] p-6 sm:p-8 md:p-10 rounded-2xl border border-transparent transition-all duration-500 overflow-hidden shadow-xl group-hover:shadow-[0_0_20px_rgba(204,255,0,0.5)] before:absolute before:inset-0 before:border before:border-transparent before:rounded-2xl before:transition-all before:duration-300 group-hover:before:border-[#ccff00]/50"
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -4,
                      boxShadow: '0 24px 48px rgba(0, 0, 0, 0.4)',
                    }
              }
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col gap-4 sm:gap-6">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#ccff00] flex items-center justify-center"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <User className="w-6 h-6 sm:w-6.5 sm:h-6.5 md:w-7 md:h-7 text-black" />
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white font-['IBM_Plex_Sans'] mb-2 sm:mb-3 leading-tight">
                    Need a top-tier dev team you can count on?
                  </h3>
                  <p className="text-slate-400 font-['IBM_Plex_Sans'] text-base md:text-lg leading-relaxed">
                    Partner with a proven team that plugs in instantly with zero onboarding hassle
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* End of Hire Developers Section with Grid */}

        {/* Creative Rotating Text Section - Gray/Blue Background */}
        <div className="relative -mx-4 px-4 py-10 sm:py-12 md:py-16 my-10 sm:my-12 md:my-16 bg-transparent">
          <div className="relative z-10 text-center">
            <div className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center gap-2 sm:gap-3 px-4">
              <span className="text-2xl sm:text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                Creative
              </span>
              <RotatingText
                texts={subheaders}
                rotationInterval={shouldReduceMotion ? 2500 : 3000}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                splitBy="characters"
                staggerDuration={0.03}
                staggerFrom="center"
                mainClassName="relative -top-0.5 font-bold text-lg sm:text-2xl md:text-3xl font-mono text-center"
                splitLevelClassName="overflow-visible"
                elementLevelClassName="inline-block drop-shadow-lg"
                loop={true}
                auto={true}
              />
            </div>
          </div>
        </div>

        {/* Clean Step Animation - Grainy Gray Background */}
        <div className="relative -mx-4 px-4 py-4 md:py-4 mt-12 sm:mt-16 md:mt-20 mb-16 sm:mb-20 md:mb-24 bg-transparent">
          {/* Steps Container */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black backdrop-blur-md py-10 sm:py-12 px-5 sm:px-6 md:px-12 rounded-2xl border border-slate-600/50 shadow-lg max-w-4xl mx-auto">
            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="flex justify-center">
                  <StepAnimation step={index + 1} text={step} isActive={currentStep === index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Us Section */}
        <div id="why-devx-section" className="text-center mb-12 sm:mb-16 md:mb-20">
          {/* Fixed title visibility with inline styles */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-['IBM_Plex_Mono'] text-white pb-2 sm:pb-3 px-4">
            Why Choose Us?
          </h2>
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
            <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-4 font-['IBM_Plex_Mono'] leading-relaxed">
              Trusted U.S. company with worldwide senior developers, proven track record, and
              full-stack expertise across industries.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto px-4 sm:px-6"
            variants={containerVariants}
          >
            <WhyUsCard
              icon={Flag}
              title="Global Excellence"
              description="Headquarters in the U.S. with senior developers worldwide, ensuring accountability with round-the-clock progress."
            />
            <WhyUsCard
              icon={Search}
              title="Proven Success"
              description="Hundreds of projects delivered across fintech, healthcare, retail, and SaaS — experience that reduces risk."
            />
            <WhyUsCard
              icon={Layers}
              title="Full-Stack Expertise"
              description="From UI/UX design to cloud deployment, our senior engineers cover the full stack with efficiency and precision."
            />
          </motion.div>

          {/* Added link to About page */}
          <div className="mt-12 sm:mt-16 text-center px-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative inline-block"
            >
              {/* Animated star border effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div
                  className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] animate-spin opacity-60"
                  style={{
                    background: `conic-gradient(from 0deg, transparent, #ccff00, transparent, #ccff00, transparent)`,
                    animationDuration: '3s',
                  }}
                />
              </div>
              <Link
                href="/about#our-values"
                className="group relative inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold font-['IBM_Plex_Mono'] transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-indigo-500/30 z-10"
              >
                Explore more reasons to choose us
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <p className="text-[#ccff00] text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-['IBM_Plex_Mono']">
            We&apos;re ready to transform your vision into reality.
          </p>
          <p className="text-slate-300 text-lg sm:text-xl md:text-2xl font-['IBM_Plex_Mono']">
            Let&apos;s embark on this journey together!
          </p>
        </div>
      </motion.div>
      <div className="mt-20">
        <InfinityLogo />
      </div>
    </section>
  )
}
