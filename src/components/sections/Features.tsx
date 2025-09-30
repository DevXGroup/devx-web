'use client'

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import type { CSSProperties } from 'react'
import { Rocket, User, Layers, Search, Flag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import RotatingText from '@animations/RotatingText'
import InfinityLogo from '@3d/InfinityLogo'

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

// Enhanced animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
}

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

// Parallax black falling stars background effect
type StarConfig = {
  id: string
  x: number
  y: number
  size: number
  floatDistance: number
  duration: number
  phase: number
  startOffset: number
  drift: number
  colorAlpha: number
}

function StarDot({
  star,
  speedMultiplier,
}: {
  star: StarConfig
  speedMultiplier: MotionValue<number>
}) {
  const elementRef = useRef<HTMLSpanElement | null>(null)

  const applySpeed = useCallback(
    (value: number) => {
      const node = elementRef.current
      if (!node) return
      const clamped = Math.max(0.75, Math.min(value, 1.25))
      const adjusted = star.duration / clamped
      const durationValue = `${adjusted.toFixed(2)}s`
      node.style.animationDuration = durationValue
      node.style.webkitAnimationDuration = durationValue
      node.style.setProperty('--star-duration', durationValue)
      const delayValue = `-${(star.phase * adjusted).toFixed(2)}s`
      node.style.animationDelay = delayValue
      node.style.webkitAnimationDelay = delayValue
    },
    [star.duration, star.phase]
  )

  useEffect(() => {
    applySpeed(speedMultiplier.get())
  }, [applySpeed, speedMultiplier])

  useMotionValueEvent(speedMultiplier, 'change', (value) => {
    applySpeed(value)
  })

  // Check if this is a dark dot by looking at the star ID
  const isDark = star.id.startsWith('dark-')

  const [opacityStart, opacityEnd] = isDark
    ? [0.7, 0.95]  // Dark dots are more visible
    : star.size >= 4
      ? [0.55, 0.8]   // large dots (4-5px)
      : star.size >= 3
        ? [0.5, 0.75]  // medium dots (3-4px)
        : star.size >= 2
          ? [0.45, 0.7] // small dots (2-3px)
          : [0.4, 0.65]  // tiny dots (1-2px)

  const style = {
    left: `${star.x.toFixed(3)}%`,
    top: `${star.y.toFixed(3)}%`,
    width: `${star.size}px`,
    height: `${star.size}px`,
    opacity: opacityEnd.toString(),
    animationDuration: `${star.duration.toFixed(2)}s`,
    animationDelay: `-${(star.phase * star.duration).toFixed(2)}s`,
    '--star-duration': `${star.duration.toFixed(2)}s`,
    '--star-start': `${star.startOffset}px`,
    '--star-end': `${(star.startOffset + star.floatDistance).toFixed(1)}px`,
    '--star-drift': `${star.drift}px`,
    '--star-opacity-start': opacityStart.toString(),
    '--star-opacity-end': opacityEnd.toString(),
    '--star-alpha': star.colorAlpha.toFixed(2),
  } as CSSProperties & Record<string, string>

  return <span ref={elementRef} className="black-star-dot" style={style} />
}

function BlackFallingStars({
  scrollProgress,
}: {
  scrollProgress?: MotionValue<number> | null
}) {
  const fallbackProgress = useMotionValue(0)
  const progress = scrollProgress ?? fallbackProgress

  const tinyLayerY = useTransform(progress, [0, 1], [0, 100])
  const smallLayerY = useTransform(progress, [0, 1], [0, 140])
  const mediumLayerY = useTransform(progress, [0, 1], [0, 200])
  const largeLayerY = useTransform(progress, [0, 1], [0, 260])
  const darkLayerY = useTransform(progress, [0, 1], [0, 180])

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const starLayers = useMemo(() => {
    if (!isClient) {
      // Return empty arrays on server to prevent hydration mismatch
      return {
        tiny: [],
        small: [],
        medium: [],
        large: [],
        dark: [],
      }
    }
    const toPercent = (value: number) => 0 + value * 100

    const createStars = (
      layerKey: string,
      count: number,
      sizeRange: [number, number],
      floatRange: [number, number]
    ): StarConfig[] => {
      const positions: { x: number; y: number }[] = []
      const minDistance = 6 // Minimum distance between dots (in percentage) - reduced for denser effect

      // Generate well-distributed positions
      const generatePosition = (attempt = 0): { x: number; y: number } => {
        if (attempt > 50) {
          // Fallback: use grid-based positioning
          const gridX = positions.length % 10
          const gridY = Math.floor(positions.length / 10)
          return {
            x: (gridX * 10 + (Math.random() * 8 + 1)) / 100,
            y: (gridY * 10 + (Math.random() * 8 + 1)) / 100
          }
        }

        const x = Math.random()
        const y = Math.random()

        // Check if this position is too close to existing ones
        const tooClose = positions.some(pos => {
          const distance = Math.sqrt(Math.pow((x - pos.x) * 100, 2) + Math.pow((y - pos.y) * 100, 2))
          return distance < minDistance
        })

        if (tooClose) {
          return generatePosition(attempt + 1)
        }

        return { x, y }
      }

      return Array.from({ length: count }, (_, index) => {
        const position = generatePosition()
        positions.push(position)

        const [minSize, maxSize] = sizeRange
        // Subtle size variation
        const size = minSize + (index % (maxSize - minSize + 1))

        const [minFloat, maxFloat] = floatRange
        const baseDrop = minFloat + ((index * 19) % (maxFloat - minFloat + 1))
        const startOffset = -(40 + ((index * 17) % 100)) // More subtle starting positions
        const floatDistance = baseDrop + 360

        // Varied speeds based on size - more subtle differences
        const sizeSpeedFactor = size <= 2 ? 1.2 : size <= 3 ? 1.0 : 0.8
        const baseDuration = (20 + ((index * 5) % 8)) * sizeSpeedFactor
        const speedVariance = 0.8 + ((index * 13) % 40) / 100 // More controlled speed variation
        const duration = baseDuration / speedVariance

        const phase = ((index * 137) % 100) / 100
        // Subtle horizontal drift
        const drift = ((index * 23) % 30) - 15
        // Make dark layer dots significantly darker
        const colorAlpha = layerKey === 'dark'
          ? 0.7 + ((index * 31) % 30) / 100  // Dark dots: 70-100% alpha
          : 0.5 + ((index * 31) % 30) / 100  // Regular dots: 50-80% alpha

        return {
          id: `${layerKey}-${index}`,
          x: toPercent(position.x),
          y: toPercent(position.y),
          size,
          floatDistance,
          duration,
          phase,
          startOffset,
          drift,
          colorAlpha,
        }
      })
    }

    return {
      tiny: createStars('tiny', 45, [1, 2], [480, 680]),
      small: createStars('small', 55, [2, 3], [520, 720]),
      medium: createStars('medium', 35, [3, 4], [620, 820]),
      large: createStars('large', 25, [4, 5], [700, 940]),
      dark: createStars('dark', 30, [2, 4], [550, 750]), // New darker layer
    }
  }, [isClient])

  const speedMultiplier = useTransform(scrollProgress ?? fallbackProgress, (value) => 0.9 + value * 0.35)

  return (
    <div className="black-stars-container black-stars-from-hero" aria-hidden="true">
      <motion.div className="black-stars-layer" style={{ y: tinyLayerY }}>
        {starLayers.tiny.map((star) => (
          <StarDot
            key={star.id}
            star={star}
            speedMultiplier={speedMultiplier}
          />
        ))}
      </motion.div>
      <motion.div className="black-stars-layer" style={{ y: smallLayerY }}>
        {starLayers.small.map((star) => (
          <StarDot
            key={star.id}
            star={star}
            speedMultiplier={speedMultiplier}
          />
        ))}
      </motion.div>
      <motion.div className="black-stars-layer" style={{ y: mediumLayerY }}>
        {starLayers.medium.map((star) => (
          <StarDot
            key={star.id}
            star={star}
            speedMultiplier={speedMultiplier}
          />
        ))}
      </motion.div>
      <motion.div className="black-stars-layer" style={{ y: largeLayerY }}>
        {starLayers.large.map((star) => (
          <StarDot
            key={star.id}
            star={star}
            speedMultiplier={speedMultiplier}
          />
        ))}
      </motion.div>
      <motion.div className="black-stars-layer" style={{ y: darkLayerY }}>
        {starLayers.dark.map((star) => (
          <StarDot
            key={star.id}
            star={star}
            speedMultiplier={speedMultiplier}
          />
        ))}
      </motion.div>
    </div>
  )
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

  return (
    <motion.div
      key={`step-${step}`}
      className={`flex flex-col items-center space-y-4 transition-all duration-700 ease-in-out ${
        isActive ? 'text-black' : 'text-black/40'
      }`}
    >
      {/* Step Circle - Enhanced hover effects with bright borders */}
      <motion.div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-lg md:text-xl font-bold font-['IBM_Plex_Mono'] transition-all duration-300 ease-in-out cursor-pointer group relative ${
          isActive
            ? 'bg-black text-white shadow-lg shadow-black/30 border-2 border-[#ccff00]'
            : 'bg-black/20 text-black/60 border-2 border-black/30 hover:border-[#ccff00] hover:bg-black/30 hover:text-black hover:shadow-lg hover:shadow-[#ccff00]/20'
        }`}
        whileHover={
          shouldReduceMotion ? {} : { scale: 1.08, boxShadow: '0 8px 32px rgba(204, 255, 0, 0.3)' }
        }
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      >
        {step}
      </motion.div>

      {/* Step Text */}
      <p
        className={`text-sm md:text-base font-['IBM_Plex_Mono'] text-center transition-all duration-700 ${
          isActive ? 'font-bold' : 'font-normal'
        }`}
      >
        {text}
      </p>
    </motion.div>
  )
}

function Card({
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
      variants={cardVariants}
      className="bg-[#1a2e00]/90 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl flex flex-col items-start text-left shadow-lg w-full h-full hover:bg-[#1a2e00]/95 transition-colors duration-300 group border border-transparent hover:border-[#ccff00]/20 mx-auto max-w-full overflow-hidden"
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -5,
              boxShadow: '0 20px 40px rgba(204, 255, 0, 0.1)',
            }
      }
    >
      <div className="flex items-start gap-4 md:gap-6 w-full">
        <motion.div
          className="bg-[#ccff00]/90 rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center aspect-square shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300"
          whileHover={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <Icon className="w-6 h-6 md:w-8 md:h-8 text-black pointer-events-none" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#ccff00] font-['IBM_Plex_Mono'] mb-3 md:mb-4 group-hover:text-white transition-colors duration-300 leading-tight break-words">
            {title}
          </h3>
          <p className="text-white/80 font-['IBM_Plex_Sans'] text-sm md:text-base group-hover:text-white/90 transition-colors duration-300 leading-relaxed break-words">
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
}: {
  icon: any
  title: string
  description: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={cardVariants}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.02,
              y: -8,
            }
      }
      whileTap={{ scale: 0.98 }}
      className="group relative bg-black/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-white/10 flex flex-col items-center text-center overflow-hidden cursor-pointer hover:bg-black/90 transition-all duration-300 min-h-[280px] sm:min-h-[300px] w-full max-w-full"
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-6 relative overflow-hidden aspect-square shrink-0"
          whileHover={{
            boxShadow: `0 0 25px rgba(204, 255, 0, 0.6)`,
          }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: '#ccff00',
            border: `2px solid #ccff00`,
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
            <Icon className="w-6 h-6 transition-all duration-300 relative z-10 text-black pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-base sm:text-lg md:text-xl font-bold font-['IBM_Plex_Mono'] text-[#ccff00] group-hover:text-white transition-colors duration-300 mb-4 break-words text-center px-2"
          whileHover={{
            scale: 1.05,
            textShadow: `0 0 15px rgba(204, 255, 0, 0.8)`,
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-white/85 font-['IBM_Plex_Sans'] text-sm sm:text-base leading-relaxed group-hover:text-white/95 transition-colors duration-500 text-center max-w-full break-words px-2"
          style={{ lineHeight: '1.7' }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Always call useScroll to maintain hooks order
  const { scrollYProgress } = useScroll(
    isClient && containerRef.current
      ? {
          target: containerRef,
          offset: ['start end', 'end start'],
        }
      : {}
  )

  useEffect(() => {
    setIsClient(true)
  }, [])

  const opacity = useTransform(scrollYProgress || 0, [0, 0.05], [0, 1])
  const y = useTransform(scrollYProgress || 0, [0, 0.05], [100, 0])

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
        rootMargin: '100px 0px 100px 0px'
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
      className="relative py-16 md:py-20 overflow-hidden bg-robinhood w-full"
    >
      {/* Black falling stars */}
      <BlackFallingStars scrollProgress={scrollYProgress} />

      {/* Main Content */}
      <motion.div
        style={{
          opacity: isMounted ? opacity : 1,
          y: isMounted ? y : 0,
        }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative container mx-auto px-4 z-10 max-w-6xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          {/* Fixed title visibility with inline styles */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-['IBM_Plex_Mono'] text-black pb-3"
            style={{
              textShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)',
            }}
          >
            Hire Elite Developers
            <br />
            effortlessly.
          </h2>
        </div>

        {/* Cards Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20 max-w-5xl mx-auto px-4 sm:px-6"
          variants={containerVariants}
        >
          <Card
            icon={Rocket}
            title="Are you launching a startup or new product?"
            description="Let our expert team build it — fast, reliable, and scalable"
          />
          <Card
            icon={User}
            title="Need a top-tier dev team you can count on?"
            description="We're your plug-and-play solution — no onboarding hassle"
          />
        </motion.div>

        {/* Creative Rotating Text Section */}
        <div className="text-center my-20 md:my-24">
          <motion.div
            variants={cardVariants}
            className="h-12 sm:h-16 flex items-center justify-center"
          >
            <span
              className="text-2xl sm:text-4xl md:text-5xl font-black text-black"
              style={{
                marginRight: '13px',
                fontWeight: 'bolder',
              }}
            >
              Creative
            </span>
            <RotatingText
              texts={subheaders}
              rotationInterval={shouldReduceMotion ? 2000 : 2500}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
              initial={{ y: '150%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-150%', opacity: 0 }}
              splitBy="characters"
              staggerDuration={0.02}
              staggerFrom="last"
              mainClassName="px-2 py-1 bg-black text-white rounded-lg font-bold text-lg sm:text-2xl md:text-3xl font-mono overflow-hidden shadow-inner"
              splitLevelClassName="overflow-hidden"
              elementLevelClassName="inline-block drop-shadow-sm"
              loop={true}
              auto={true}
            />
          </motion.div>
        </div>

        {/* Clean Step Animation - Lamp Effect */}
        <div className="relative mb-24 md:mb-28 max-w-4xl mx-auto">
          {/* Steps Container */}
          <div className="relative bg-gradient-to-br from-black/15 to-black/5 backdrop-blur-sm py-12 px-6 md:px-12 rounded-2xl border border-black/20 shadow-lg">
            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <div key={index} className="flex justify-center">
                  <StepAnimation step={index + 1} text={step} isActive={currentStep === index} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Us Section */}
        <div id="why-devx-section" className="text-center mb-16 md:mb-20">
          {/* Fixed title visibility with inline styles */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-['IBM_Plex_Mono'] text-black pb-3"
            style={{
              textShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)',
            }}
          >
            Why Choose Us?
          </h2>
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-black/80 text-lg md:text-xl mb-4 font-['IBM_Plex_Mono']">
              Trusted U.S. company with worldwide senior developers, proven track record, and
              full-stack expertise across industries.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto px-4 sm:px-6"
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
          <div className="mt-16 text-center">
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
                className="group relative inline-flex items-center gap-3 bg-black/90 hover:bg-black text-[#ccff00] hover:text-white px-8 py-4 rounded-xl text-base font-semibold font-['IBM_Plex_Mono'] transition-all duration-300 backdrop-blur-sm border border-[#ccff00]/20 hover:border-[#ccff00]/40 hover:shadow-lg hover:shadow-[#ccff00]/20 z-10"
              >
                Explore more reasons to choose us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mb-16">
          <p className="text-black text-2xl md:text-3xl font-bold mb-4 font-['IBM_Plex_Mono']">
            We&apos;re ready to transform your vision into reality.
          </p>
          <p className="text-black text-xl md:text-2xl font-['IBM_Plex_Mono']">
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
