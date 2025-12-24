'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  Users,
  Zap,
  Globe,
  Shield,
  Heart,
  UserCheck,
  Lightbulb,
  Star,
  Lock,
  FileText,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import TextPressure from '@/components/animations/TextPressure'
import ShapeBlur from '@/components/animations/ShapeBlur'
import CardSwap, { Card } from '@/components/animations/CardSwap'
import ScrollStack, { ScrollStackItem } from '@/components/animations/ScrollStack'
import OrgChart from '@/components/sections/OrgChartV2'
import DarkVeil from '@/components/animations/DarkVeil'
import BlurText from '@/components/animations/BlurText'
import StarBorder from '@/components/animations/StarBorder'
import ParallaxTestimonials from '@/components/ParallaxTestimonials'
import { useIsMobile } from '@/hooks/use-mobile'

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Enhanced animation variants for better performance
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const cardRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: { index?: number; delay?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: easeOutExpo,
      delay:
        typeof custom.delay === 'number' ? custom.delay : Math.min((custom.index ?? 0) * 0.08, 0.4),
    },
  }),
}

// Enhanced animated section component for reuse
const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0, margin: '0px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : delay }}
      className={className}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  )
}

// Enhanced value card component matching home page process cards quality
const ValueCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: any
  title: string
  description: string
  delay?: number
}) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      custom={{ delay }}
      transition={{
        duration: 0.65,
        ease: easeOutExpo,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
      className="relative bg-zinc-900/40 border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-md hover:border-white/20 hover:bg-zinc-900/60 transition-all duration-500 group cursor-pointer overflow-hidden flex flex-col gap-4 sm:gap-6"
      role="article"
      aria-label={`${title}: ${description}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col gap-6 h-full">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white/0 shadow-[0_10px_35px_-20px_rgba(255,255,255,0.5)]">
          <Icon
            className="w-6 h-6 transition-colors duration-300 text-current group-hover:text-black group-hover:stroke-black"
            strokeWidth={1.5}
            color="currentColor"
          />
        </div>

        <div className="flex-1 space-y-3">
          <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
          <p className="text-base font-light text-white/80 leading-relaxed font-sans group-hover:text-zinc-300 transition-colors duration-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

type DeliveryItem = {
  text: string
  color: string
  icon: React.ComponentType<{ className?: string }>
}

const deliveryHighlights: DeliveryItem[] = [
  {
    text: 'Weekly demos with milestone reviews keep delivery transparent.',
    color: '#4CD787',
    icon: Check,
  },
  {
    text: 'Security hardening modeled after DoD Impact Level 5 controls for cloud delivery.',
    color: '#FFD700',
    icon: Shield,
  },
  {
    text: 'NDA-first engagement and U.S.-based contracting safeguard your IP.',
    color: '#8A4FFF',
    icon: Lock,
  },
  {
    text: 'Complete code transfer, environment configs, and runbooks at acceptance.',
    color: '#2a9df4',
    icon: FileText,
  },
  {
    text: '30-day stabilization support with on-call fixes and optimization guidance.',
    color: '#ff6b35',
    icon: Heart,
  },
]

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max)

const normalizeHex = (hex: string) => {
  const sanitized = hex.replace('#', '')
  if (sanitized.length === 3) {
    return sanitized
      .split('')
      .map((char) => char + char)
      .join('')
  }
  return sanitized.padStart(6, '0').slice(0, 6)
}

const withAlpha = (hex: string, alpha: number) => {
  const normalized = normalizeHex(hex)
  const clampedAlpha = clamp(alpha)
  const alphaValue = Math.round(clampedAlpha * 255)
  return `#${normalized}${alphaValue.toString(16).padStart(2, '0')}`
}

const DeliveryCard = ({ text, color, icon: Icon, index }: DeliveryItem & { index: number }) => {
  const accent = color
  const isEven = index % 2 === 0

  // Map accent colors to deeper, richer backgrounds with subtle tints
  const colorMapping: Record<string, string> = {
    '#4CD787': 'linear-gradient(135deg, #0d1714 0%, #121a1e 100%)', // Deep green-black
    '#FFD700': 'linear-gradient(135deg, #1a180f 0%, #1c1a12 100%)', // Deep yellow-black
    '#8A4FFF': 'linear-gradient(135deg, #12101a 0%, #151318 100%)', // Deep purple-black
    '#2a9df4': 'linear-gradient(135deg, #0f161a 0%, #12181c 100%)', // Deep blue-black
    '#ff6b35': 'linear-gradient(135deg, #1a130f 0%, #1c1512 100%)', // Deep orange-black
  }

  const cardBg = colorMapping[accent] || 'linear-gradient(135deg, #0a0a0f 0%, #12121a 100%)'

  return (
    <motion.div
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={{ index }}
      className={`flex flex-col md:flex-row min-h-[320px] items-center gap-8 md:gap-12 rounded-2xl px-8 py-10 md:px-12 md:py-12 relative overflow-hidden ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      style={{
        background: cardBg,
        border: `2px solid ${withAlpha(accent, 0.35)}`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 ${withAlpha(accent, 0.1)}`,
      }}
    >
      {/* Large decorative icon on the side */}
      <div className="relative flex-shrink-0 z-10">
        <div
          className="w-24 h-24 md:w-40 md:h-40 rounded-2xl flex items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, ${withAlpha(accent, 0.18)} 0%, ${withAlpha(
              accent,
              0.08
            )} 100%)`,
            border: `2px solid ${withAlpha(accent, 0.45)}`,
          }}
        >
          {/* Icon glow effect */}
          <div
            className="absolute inset-0 rounded-2xl opacity-40 blur-xl"
            style={{ backgroundColor: accent }}
          />
          <div style={{ color: accent, filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.6))' }}>
            <Icon className="w-12 h-12 md:w-20 md:h-20 relative z-10" />
          </div>
        </div>{' '}
      </div>

      {/* Text content on opposite side */}
      <div
        className={`relative z-10 flex-1 text-center ${isEven ? 'md:text-left md:pr-6' : 'md:text-right md:pl-6'}`}
      >
        <p className="subtitle-lg inline-block">{text}</p>
      </div>
    </motion.div>
  )
}

// Vision Card Component
const VisionCard = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <VisionMissionCard
      delay={0}
      accentColor="#4CD787"
      isHovered={isHovered}
      onHoverChange={setIsHovered}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.h3
          className="card-title text-[#4CD787] whitespace-nowrap font-editorial"
          animate={
            isHovered
              ? { textShadow: '0 0 12px rgba(76, 215, 135, 0.4), 0 0 24px rgba(76, 215, 135, 0.2)' }
              : { textShadow: '0 0 0px rgba(76, 215, 135, 0)' }
          }
          transition={{ duration: 0.3 }}
        >
          Our Vision
        </motion.h3>
        {/* Animated line that fills up on hover/tap - RIGHT side */}
        <motion.div
          className="h-0.5 bg-[#4CD787] rounded-full flex-1"
          animate={
            isHovered
              ? {
                  scaleX: 1,
                  opacity: 1,
                }
              : { scaleX: 0, opacity: 0 }
          }
          style={{
            originX: 0,
            boxShadow: isHovered
              ? '0 0 6px rgba(76, 215, 135, 0.6), 0 0 12px rgba(76, 215, 135, 0.3)'
              : '0 0 0px rgba(76, 215, 135, 0)',
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        />
      </div>
      <p className="card-description max-w-2xl">
        To revolutionize software development by delivering innovative, efficient, and scalable
        solutions that empower businesses worldwide to thrive in a digital-first future.
      </p>
    </VisionMissionCard>
  )
}

// Mission Card Component
const MissionCard = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <VisionMissionCard
      delay={0.2}
      accentColor="#06B6D4"
      isHovered={isHovered}
      onHoverChange={setIsHovered}
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.h3
          className="card-title text-[#06B6D4] whitespace-nowrap font-editorial"
          animate={
            isHovered
              ? { textShadow: '0 0 12px rgba(6, 182, 212, 0.4), 0 0 24px rgba(6, 182, 212, 0.2)' }
              : { textShadow: '0 0 0px rgba(6, 182, 212, 0)' }
          }
          transition={{ duration: 0.3 }}
        >
          Our Mission
        </motion.h3>
        {/* Animated line that fills up on hover/tap - RIGHT side */}
        <motion.div
          className="h-0.5 bg-[#06B6D4] rounded-full flex-1"
          animate={
            isHovered
              ? {
                  scaleX: 1,
                  opacity: 1,
                }
              : { scaleX: 0, opacity: 0 }
          }
          style={{
            originX: 0,
            boxShadow: isHovered
              ? '0 0 6px rgba(6, 182, 212, 0.6), 0 0 12px rgba(6, 182, 212, 0.3)'
              : '0 0 0px rgba(6, 182, 212, 0)',
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
        />
      </div>
      <p className="card-description max-w-2xl">
        To simplify the software development journey through a streamlined, results-first process,
        ensuring exceptional quality, adaptability, and long-term success for every client.
      </p>
    </VisionMissionCard>
  )
}

// Vision/Mission Card with animated line (touch and hover enabled)
const VisionMissionCard = ({
  children,
  delay = 0,
  accentColor = '#4CD787',
  isHovered,
  onHoverChange,
}: {
  children: React.ReactNode
  delay?: number
  accentColor?: string
  isHovered?: boolean
  onHoverChange?: (hovered: boolean) => void
}) => {
  const shouldReduceMotion = useReducedMotion()
  const isMobile = useIsMobile()

  void accentColor
  void isHovered

  return (
    <motion.div
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      custom={{ delay }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        delay: shouldReduceMotion ? 0 : delay,
      }}
      className="group relative bg-[#0B0B10]/90 p-8 rounded-2xl border border-white/10 hover:border-[#4CD787]/50 active:border-[#4CD787]/60 transition-all duration-300 shadow-lg hover:shadow-[#4CD787]/30 overflow-visible cursor-pointer touch-manipulation text-left"
      onMouseEnter={() => !isMobile && onHoverChange?.(true)}
      onMouseLeave={() => !isMobile && onHoverChange?.(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// Simple stat counter with clean animation - plain React, no Framer Motion
const StatCounter = ({ number, label }: { number: string | number; label: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [displayValue, setDisplayValue] = useState<string>('0')
  const [isVisible, setIsVisible] = useState(false)

  // Extract numeric value and suffix
  const numericTarget = useMemo(() => {
    const numericPortion = Number.parseFloat(String(number).replace(/[^0-9.]/g, ''))
    return Number.isFinite(numericPortion) ? numericPortion : 0
  }, [number])

  const suffix = useMemo(() => {
    if (typeof number !== 'string') return ''
    return number.replace(/[-+]?[\d.,\s]+/g, '')
  }, [number])

  // Simple intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Animation logic
  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep += 1
      const progress = currentStep / steps
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4)

      const currentVal = Math.round(numericTarget * ease)

      // Format with suffix
      if (currentStep >= steps) {
        setDisplayValue(String(numericTarget))
        clearInterval(timer)
      } else {
        setDisplayValue(String(currentVal))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible, numericTarget])

  const formattedDisplay = `${displayValue}${suffix}`

  return (
    <div
      ref={containerRef}
      className="bg-zinc-900/40 border border-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl hover:border-white/20 hover:bg-zinc-900/60 transition-all duration-500 group flex flex-col items-center justify-center text-center h-full min-h-[120px] sm:min-h-[160px] md:min-h-[180px] cursor-pointer"
    >
      <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-500">
        {formattedDisplay}
        {/* SEO: Actual value for crawlers that don't execute JS */}
        <span className="sr-only">{number}</span>
      </div>
      <div className="text-xs sm:text-base md:text-lg text-zinc-400 font-light group-hover:text-white transition-colors duration-300">
        {label}
      </div>
    </div>
  )
}

export default function AboutPage() {
  const isMobile = useIsMobile()
  const [isSafari, setIsSafari] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    if (typeof navigator === 'undefined') return
    const ua = navigator.userAgent
    const safariMatch = /safari/i.test(ua) && !/chrome|crios|android|fxios|edg/i.test(ua)
    setIsSafari(safariMatch)
  }, [])
  const handleProcessCardClick = useCallback((idx: number) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Process step ${idx + 1} clicked`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#000B14] pt-4 overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-2 pb-8 relative overflow-visible">
        {/* DarkVeil background animation */}
        <div className="absolute inset-x-0 -top-20 bottom-0 z-0 pointer-events-none opacity-55">
          <DarkVeil
            speed={1.1}
            warpAmount={0.35}
            noiseIntensity={0.02}
            scanlineIntensity={0}
            scanlineFrequency={0}
          />
        </div>

        <div className="container px-3 sm:px-[21px] relative z-10 mt-6 sm:mt-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {/* Title and content - Left side */}
              <AnimatedSection className="lg:order-0 flex flex-col justify-center text-left items-start">
                <h1 className="-mb-4 sm:-mb-6 w-full">
                  <div
                    style={{
                      position: 'relative',
                      height: '80px',
                      width: '100%',
                      maxWidth: '370px',
                      padding: '0',
                      margin: '0',
                    }}
                    className="sm:!h-[100px]"
                  >
                    <TextPressure
                      text="About&nbsp;Us  "
                      fontFamily="var(--font-playfair-display)"
                      flex={false}
                      alpha={false}
                      stroke={false}
                      width={false}
                      weight={true}
                      italic={false}
                      textColor="#ffffffff"
                      strokeColor="#FFFFFF"
                      minFontSize={44}
                    />
                    <span className="sr-only">About Us</span>
                  </div>
                </h1>
                <p className="subtitle-lg mb-4 sm:mb-6 md:mb-8 mt-4 sm:mt-6 text-left text-sm sm:text-base">
                  We are a senior engineering team trusted by growth‑stage companies for complex and
                  time‑sensitive projects. We ship production‑ready software with clear milestones,
                  ownership, and post‑launch support.
                </p>
                <div className="flex flex-row items-center justify-start gap-4 flex-wrap sm:flex-nowrap">
                  <StarBorder
                    href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer font-sans font-bold text-sm px-6 py-3 flex-1 sm:flex-none min-w-[140px] sm:min-w-[200px] flex items-center justify-center gap-2 text-white whitespace-nowrap"
                    color="#E2E8F0"
                    speed="3s"
                  >
                    Schedule Free Consultation
                  </StarBorder>
                  <StarBorder
                    href="/portfolio"
                    className="cursor-pointer font-sans font-bold text-sm px-6 py-3 flex-1 sm:flex-none min-w-[140px] sm:min-w-[200px] flex items-center justify-center gap-2 text-white whitespace-nowrap"
                    color="#E2E8F0"
                    speed="3s"
                  >
                    See Our Work
                  </StarBorder>
                </div>
              </AnimatedSection>

              {/* Image - Right side */}
              <AnimatedSection delay={0.2} className="relative lg:order-2">
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
                  {/* Background image with ShapeBlur effect applied as mask */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/about/devx-office.jpg"
                      alt="DevX Office"
                      fill
                      className="object-cover will-change-transform"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={true}
                      loading="eager"
                      style={{ transform: 'translateZ(0)', WebkitTransform: 'translateZ(0)' }}
                    />
                    {/* ShapeBlur effect that creates animated mask on the image */}
                    {hasMounted && !isSafari && (
                      <div className="absolute inset-0 mix-blend-multiply pointer-events-none">
                        <ShapeBlur
                          className="w-full h-full"
                          variation={0}
                          shapeSize={1.2}
                          roundness={0.4}
                          borderSize={0.05}
                          circleSize={0.3}
                          circleEdge={0.5}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 relative mt-12 sm:mt-19">
        <div className="container mx-auto px-3 sm:px-[21px]">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <BlurText
                text="Our Impact"
                className="justify-center heading-section about-section-heading text-white mb-4 md:mb-6 font-editorial"
                delay={150}
                once={true}
              />
              <p className="subtitle-lg max-w-2xl mx-auto mt-2 md:mt-4 px-4">
                Numbers that reflect our commitment to excellence and the trust our clients place in
                us.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 items-stretch">
              <StatCounter number="30+" label="Happy Clients" />
              <StatCounter number="15+" label="Technical Experience" />
              <StatCounter number="40+" label="Projects Completed" />
              <StatCounter number="23" label="Team Members" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 relative">
        <div className="container mx-auto px-3 sm:px-[21px]">
          <AnimatedSection className="max-w-5xl mx-auto text-center mb-14 md:mb-16">
            <BlurText
              text="How We Work"
              className="justify-center heading-section about-section-heading text-white mb-4 md:mb-6 font-editorial"
              delay={150}
              once={true}
            />
            <p className="subtitle-lg max-w-3xl mx-auto mt-3 md:mt-4 px-4">
              A simple, reliable process that keeps you in control
              <br />
              and delivers outcomes on time.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 sm:gap-y-16 lg:gap-y-0 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-16 items-center">
            {/* Left side - Text content */}

            <AnimatedSection className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4CD787]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#4CD787] font-semibold text-base">1</span>
                  </div>
                  <div>
                    <h3 className="heading-component text-white mb-2 font-editorial">
                      Discovery & Planning
                    </h3>
                    <p className="text-body text-zinc-400">
                      We align on goals, constraints, and success metrics in a focused strategy
                      call.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#FFD700] font-semibold text-base">2</span>
                  </div>
                  <div>
                    <h3 className="heading-component text-white mb-2 font-editorial">
                      Solution Proposal
                    </h3>
                    <p className="text-body text-zinc-400">
                      Clear milestones, scope, and ownership, with timeline and dependencies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4834D4]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#4834D4] font-semibold text-base">3</span>
                  </div>
                  <div>
                    <h3 className="heading-component text-white mb-2 font-editorial">
                      Build & Reviews
                    </h3>
                    <p className="text-body text-zinc-400">
                      Weekly demos, no surprises. We optimize for reliability and maintainability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9d4edd]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#9d4edd] font-semibold text-base">4</span>
                  </div>
                  <div>
                    <h3 className="heading-component text-white mb-2 font-editorial">
                      Delivery & Support
                    </h3>
                    <p className="text-body text-zinc-400">
                      Handover, documentation, and stabilization support after launch.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right side - CardSwap */}
            <AnimatedSection
              delay={0.2}
              className="relative mt-6 sm:mt-8 h-[360px] sm:h-[420px] md:h-[480px] lg:h-[560px] xl:h-[600px] hidden sm:block"
            >
              <CardSwap
                width={490}
                height={290}
                cardDistance={66}
                verticalDistance={60}
                delay={6000}
                pauseOnHover={false}
                easing="linear"
                onCardClick={handleProcessCardClick}
              >
                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#4CD787]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-[#4CD787]" />
                    <h3 className="heading-component text-white font-editorial">Discovery</h3>
                  </div>
                  <p className="text-body text-secondary">
                    We align on goals, constraints, and success metrics in a focused call.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#4CD787] to-[#4CD787]/50 rounded-full"></div>
                </Card>

                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#FFD700]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-[#FFD700]" />
                    <h3 className="heading-component text-white font-editorial">
                      Solution Proposal
                    </h3>
                  </div>
                  <p className="text-body text-secondary">
                    Clear milestones, scope, and ownership, with timeline and dependencies.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFD700]/50 rounded-full"></div>
                </Card>

                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#4834D4]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-[#4834D4]" />
                    <h3 className="heading-component text-white font-editorial">Build & Reviews</h3>
                  </div>
                  <p className="text-body text-secondary">
                    Weekly demos, no surprises. We optimize for reliability and maintainability.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#21cf3e] to-[#4834D4]/50 rounded-full"></div>
                </Card>

                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#9d4edd]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Check className="w-6 h-6 text-[#9d4edd]" />
                    <h3 className="heading-component text-white font-editorial">
                      Delivery & Support
                    </h3>
                  </div>
                  <p className="text-body text-secondary">
                    Handover, documentation, and stabilization support after launch.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#9d4edd] to-[#9d4edd]/50 rounded-full"></div>
                </Card>
              </CardSwap>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section
        id="our-values"
        className="pt-12 sm:pt-20 pb-12 sm:pb-16 relative bg-gradient-to-b from-transparent via-[#0a0a1a] to-transparent"
      >
        <div className="container mx-auto px-3 sm:px-[21px]">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <BlurText
              text="Our Values"
              className="justify-center heading-section about-section-heading text-white mb-4 md:mb-6 font-editorial"
              delay={150}
              once={true}
            />
            <p className="subtitle-lg mt-2 md:mt-4 px-4">
              Our core values guide everything we do and define how we work with our clients and
              each other.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <ValueCard
              icon={Heart}
              title="Customer Centric"
              description="Our customers are always first in everything we do. We provide support after delivery and build long-term relationships."
              delay={0.1}
            />
            <ValueCard
              icon={Shield}
              title="Security First"
              description="We build with enterprise-grade security: protecting against XSS, phishing, SQL injection, CSRF, and data breaches. Every line follows OWASP, secure coding practices, and U.S. compliance standards."
              delay={0.2}
            />
            <ValueCard
              icon={UserCheck}
              title="Vetted Professionals"
              description="Our team is a handpicked group of vetted software development experts, chosen for their skill and efficiency."
              delay={0.3}
            />
            <ValueCard
              icon={Globe}
              title="Adaptability"
              description="We embrace remote work to enable rapid execution and provide seamless, global services ensuring flexibility."
              delay={0.4}
            />
            <ValueCard
              icon={Lightbulb}
              title="Inventors & Simplifiers"
              description="We prioritize streamlined solutions that ensure rapid delivery while supporting long-term maintainability."
              delay={0.5}
            />
            <ValueCard
              icon={Star}
              title="Highest Standards"
              description="We leverage cutting-edge technology and adhere to the best practices to deliver exceptional customer satisfaction."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Delivery Ownership Section */}
      <section className="pt-12 sm:pt-16 pb-10 sm:pb-12 relative mt-16 sm:mt-30">
        <div className="max-w-screen-lg mx-auto px-3 sm:px-[21px]">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <BlurText
              text="Delivery Ownership"
              className="justify-center heading-section about-section-heading text-white mb-6 font-editorial"
              delay={150}
              once={true}
            />
            <p className="subtitle-lg px-4">
              Your project success is our responsibility. <br /> We stand behind our commitments.
            </p>
          </AnimatedSection>

          {isMobile ? (
            <div className="space-y-8 mt-12">
              {deliveryHighlights.map((item, index) => (
                <DeliveryCard {...item} index={index} key={item.text} />
              ))}
            </div>
          ) : (
            <ScrollStack
              className="mt-1"
              itemDistance={180}
              itemScale={0.025}
              itemStackDistance={35}
              stackPosition="35%"
              scaleEndPosition="25%"
              baseScale={0.88}
              rotationAmount={0}
              blurAmount={0}
              useWindowScroll
              smoothing={0.2}
            >
              {deliveryHighlights.map((item, index) => (
                <ScrollStackItem
                  key={item.text}
                  itemClassName="p-0 bg-transparent border-none shadow-none"
                >
                  <DeliveryCard {...item} index={index} />
                </ScrollStackItem>
              ))}
            </ScrollStack>
          )}
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="pt-16 sm:pt-36 pb-10 sm:pb-14 relative overflow-hidden">
        <div className="container mx-auto px-3 sm:px-[21px] relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-8">
            <BlurText
              text="Our Purpose"
              className="justify-center heading-section about-section-heading text-white mb-4 md:mb-6 font-editorial"
              delay={150}
              once={true}
            />
            <p className="subtitle-lg px-4">
              Driven by vision, guided by mission, committed to excellence.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <VisionCard />
            <MissionCard />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="container mx-auto px-3 sm:px-[21px] relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <BlurText
              text="Our Team Structure"
              className="justify-center heading-section about-section-heading text-white mb-4 md:mb-6 font-editorial"
              delay={150}
              once={true}
            />
            <p className="subtitle-lg mt-2 md:mt-4 px-4">
              Meet our leadership team and discover how our 23-member organization delivers
              exceptional results.
            </p>
          </AnimatedSection>

          <OrgChart className="mb-12" />
        </div>
      </section>

      {/* Testimonials Section - Full Width */}
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 w-full bg-gradient-to-b from-black via-[#0a0a1a] to-black overflow-hidden">
        <div className="container mx-auto px-3 sm:px-[21px] mb-8 sm:mb-12">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <BlurText
              text="What Our Clients Say"
              className="justify-center heading-section about-section-heading text-white mb-4 md:mb-6 font-editorial"
              delay={150}
              once={true}
            />
            <p className="subtitle-lg px-4 text-white relative z-100 mb-30">
              Don&apos;t just take our word for it. Hear from the clients we&apos;ve partnered with.
            </p>
          </AnimatedSection>
        </div>
        <ParallaxTestimonials />
      </section>

      {/* CTA Section */}
      <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050810] to-black"></div>
        <div className="absolute -top-32 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-full bg-[#4CD787]/10 blur-3xl opacity-40"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-black/40 via-black/80 to-black"></div>

        <div className="container mx-auto px-3 sm:px-[21px] relative z-10">
          <AnimatedSection className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-4 sm:p-8 md:p-12 w-full mx-auto text-center space-y-4 sm:space-y-6 md:space-y-8">
            <BlurText
              text="Ready to Start Your Project?"
              className="hero-title font-editorial-semibold-italic text-white leading-none text-center text-2xl sm:text-4xl md:text-5xl justify-center mx-auto"
              style={{ letterSpacing: '-0.02em', marginBottom: 0 }}
              delay={150}
              once={true}
            />
            <p className="subtitle-lg text-white/80 max-w-2xl mx-auto px-4 leading-relaxed mt-2">
              Let&apos;s discuss how we can help you achieve your goals with our expert software
              development services.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-2">
              <a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-white hover:bg-white hover:!text-black px-8 py-3 rounded-lg transition-all duration-300 font-medium border border-white/20 hover:border-white shadow-lg backdrop-blur-sm"
                onClick={(e) => {
                  window.open(
                    'https://calendly.com/a-sheikhizadeh/devx-group-llc-representative',
                    '_blank'
                  )
                  e.preventDefault()
                }}
              >
                Schedule a Free Consultation
              </a>
              <Link
                href="/portfolio"
                className="bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg transition-colors font-medium border border-white/20 backdrop-blur-sm"
              >
                See Our Work
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Gradient transition to footer */}
      <div className="h-24 bg-gradient-to-b from-black to-[#000000]"></div>
    </div>
  )
}
