'use client'

import { motion, useReducedMotion, useInView, useMotionValue, animate } from 'framer-motion'
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
} from 'lucide-react'
import TextPressure from '@/components/animations/TextPressure'
import ShapeBlur from '@/components/animations/ShapeBlur'
import CardSwap, { Card } from '@/components/animations/CardSwap'
import OrgChart from '@/components/sections/OrgChart'
import DarkVeil from '@/components/animations/DarkVeil'
import ScrollStack, { ScrollStackItem } from '@/components/animations/ScrollStack'
import { useIsMobile } from '@/hooks/use-mobile'

// Enhanced animation variants for better performance
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0, margin: '50px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : delay }}
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.01,
              y: -4,
            }
      }
      whileTap={{ scale: 0.98 }}
      className="group relative bg-slate-800 p-8 md:p-10 rounded-xl border border-purple-500/20 hover:border-purple-400/40 flex flex-col items-start text-left overflow-hidden cursor-pointer min-h-[220px] transition-all duration-300"
      role="article"
      aria-label={`${title}: ${description}`}
    >
      {/* Morphing background blob */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        initial={{
          background: 'radial-gradient(circle at 50% 50%, #4CD78700 0%, transparent 100%)',
        }}
        whileHover={{
          background: [
            'radial-gradient(circle at 20% 80%, #4CD78715 0%, transparent 60%)',
            'radial-gradient(circle at 80% 20%, #4CD78720 0%, transparent 50%)',
            'radial-gradient(circle at 30% 70%, #4CD78715 0%, transparent 60%)',
            'radial-gradient(circle at 70% 30%, #4CD78720 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="flex items-center mb-6">
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center mr-4 relative overflow-hidden shrink-0"
            whileHover={{
              boxShadow: '0 0 30px #4CD78760',
            }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundColor: '#4CD78720',
              border: '2px solid #4CD78740',
            }}
          >
            {/* Icon pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              style={{ backgroundColor: '#4CD78730' }}
            />

            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-none"
            >
              <Icon
                className="w-6 h-6 transition-all duration-300 relative z-10 pointer-events-none"
                style={{
                  color: '#4CD787',
                  filter: 'drop-shadow(0 0 4px #4CD78780)',
                }}
              />
            </motion.div>
          </motion.div>
          <motion.h3
            className="heading-component text-white"
            whileHover={{
              scale: 1.05,
              textShadow: '0 0 15px #4CD78780',
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.p className="subtitle group-hover:text-white transition-colors duration-500">
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}

type DeliveryItem = {
  text: string
  color: string
  icon: React.ComponentType<{ className?: string }>
}

type ContextMcpHighlight = {
  label: string
  title: string
  description: string
  accent: string
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

const contextMcpHighlights: ContextMcpHighlight[] = [
  {
    label: 'Context 7 MCP',
    title: 'Shared Knowledge Backbone',
    description:
      'Our Context 7 MCP workspace packages discovery notes, QA heuristics, and escalation paths so every designer and engineer pulls the same high-signal context on day one.',
    accent: '#4CD787',
  },
  {
    label: 'UI Practice Kits',
    title: 'Best-Practice Snapshots',
    description:
      'MCP bundles updated typography scales, tap-target guidance, and component specs so mobile and desktop builds automatically inherit AA+ readability defaults.',
    accent: '#8A4FFF',
  },
  {
    label: 'Ops Signal Loop',
    title: 'Live Accessibility Guardrails',
    description:
      'Proactive MCP policies trigger checks for contrast, touch spacing, and copy tone, feeding issues back into delivery reviews before code ships.',
    accent: '#FFD700',
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
    <div
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
    </div>
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
      <div className="flex items-center gap-3 mb-3 md:mb-4">
        <motion.h3
          className="heading-component text-[#4CD787] whitespace-nowrap"
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
      <p className="subtitle">
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
      <div className="flex items-center gap-3 mb-3 md:mb-4">
        <motion.h3
          className="heading-component text-[#06B6D4] whitespace-nowrap"
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
      <p className="subtitle">
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
  const ref = useRef(null)
  const isInViewForFadeIn = useInView(ref, { once: true })
  const isInViewForHover = useInView(ref, { once: false, margin: '-40% 0px -40% 0px' })

  void accentColor
  void isHovered

  useEffect(() => {
    if (isMobile) {
      onHoverChange?.(isInViewForHover)
    }
  }, [isMobile, isInViewForHover, onHoverChange])

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInViewForFadeIn ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : delay }}
      className="group relative bg-black/60 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/20 hover:border-[#4CD787]/40 active:border-[#4CD787]/60 transition-colors duration-300 shadow-2xl overflow-visible cursor-pointer touch-manipulation"
      onMouseEnter={() => !isMobile && onHoverChange?.(true)}
      onMouseLeave={() => !isMobile && onHoverChange?.(false)}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.div>
  )
}

// Enhanced stat counter with animation
const StatCounter = ({ number, label }: { number: string | number; label: string }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(containerRef, {
    once: false,
    margin: '-150px',
    amount: 0.35,
  })

  const numericTarget = useMemo(() => {
    const numericPortion = Number.parseFloat(String(number).replace(/[^0-9.]/g, ''))
    return Number.isFinite(numericPortion) ? numericPortion : 0
  }, [number])

  const decimalPlaces = useMemo(() => {
    const match = String(number).match(/\.(\d+)/)
    return match && match[1] ? match[1].length : 0
  }, [number])

  const suffix = useMemo(() => {
    if (typeof number !== 'string') return ''
    return number.replace(/[-+]?[\d.,\s]+/g, '')
  }, [number])

  const countValue = useMotionValue(numericTarget)
  const [displayValue, setDisplayValue] = useState(() =>
    decimalPlaces > 0 ? numericTarget.toFixed(decimalPlaces) : Math.round(numericTarget).toString()
  )

  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const prevInView = useRef(false)
  const hoverSequenceRef = useRef(0)

  const formatValue = useCallback(
    (value: number) => {
      if (decimalPlaces > 0) {
        return value.toFixed(decimalPlaces)
      }
      return Math.round(value).toString()
    },
    [decimalPlaces]
  )

  const stopActiveAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.stop()
      animationRef.current = null
    }
  }, [])

  const animateTo = useCallback(
    async (value: number, options: { duration?: number; ease?: any } = {}) => {
      if (shouldReduceMotion) {
        stopActiveAnimation()
        countValue.set(value)
        setDisplayValue(formatValue(value))
        return
      }

      stopActiveAnimation()
      const controls = animate(countValue, value, {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        ...options,
      })
      animationRef.current = controls
      await controls.finished
    },
    [countValue, formatValue, shouldReduceMotion, stopActiveAnimation]
  )

  const runCountUp = useCallback(async () => {
    if (shouldReduceMotion) {
      countValue.set(numericTarget)
      setDisplayValue(formatValue(numericTarget))
      return
    }

    stopActiveAnimation()
    countValue.set(0)
    setDisplayValue(formatValue(0))
    await animateTo(numericTarget, { duration: 1.4 })
  }, [animateTo, countValue, formatValue, numericTarget, shouldReduceMotion, stopActiveAnimation])

  useEffect(() => {
    const unsubscribe = countValue.on('change', (latest) => {
      setDisplayValue(formatValue(latest))
    })
    return () => unsubscribe()
  }, [countValue, formatValue])

  useEffect(() => {
    countValue.set(numericTarget)
    setDisplayValue(formatValue(numericTarget))
  }, [countValue, formatValue, numericTarget])

  useEffect(() => {
    if (isInView && !prevInView.current) {
      runCountUp()
    }
    prevInView.current = isInView
  }, [isInView, runCountUp])

  useEffect(
    () => () => {
      stopActiveAnimation()
    },
    [stopActiveAnimation]
  )

  const handleMouseEnter = useCallback(() => {
    if (shouldReduceMotion) return
    const currentSequence = hoverSequenceRef.current + 1
    hoverSequenceRef.current = currentSequence
    ;(async () => {
      await animateTo(0, { duration: 0.45, ease: 'easeInOut' })
      if (hoverSequenceRef.current !== currentSequence) return
      await animateTo(numericTarget, { duration: 0.75 })
    })().catch(() => {
      // No-op; animation was likely interrupted
    })
  }, [animateTo, numericTarget, shouldReduceMotion])

  const handleMouseLeave = useCallback(() => {
    hoverSequenceRef.current += 1
    if (shouldReduceMotion) return
    void animateTo(numericTarget, { duration: 0.6 })
  }, [animateTo, numericTarget, shouldReduceMotion])

  const formattedDisplay = `${displayValue}${suffix}`

  return (
    <motion.div
      ref={containerRef}
      className="relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CD787]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000B14]/80 rounded-3xl h-[200px] sm:h-[210px] md:h-[220px] lg:h-[230px]"
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
    >
      {/* Background shimmer */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Main content */}
      <div className="relative bg-white/[0.02] backdrop-blur-sm p-6 rounded-3xl border border-white/10 text-center h-full transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-white/20 group-hover:shadow-[0_12px_32px_-24px_rgba(76,215,135,0.35)] flex flex-col items-center justify-between gap-6">
        {/* Accent ring */}
        <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-[#4CD787]/30"></div>

        {/* Counter number */}
        <motion.div
          className="text-4xl md:text-5xl font-bold text-white font-mono group-hover:text-[#4CD787] transition-colors duration-300 relative"
          whileHover={shouldReduceMotion ? {} : { y: -3 }}
        >
          {/* Glowing text effect */}
          <span className="relative">
            {formattedDisplay}
            <span className="absolute inset-0 text-[#4CD787] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm">
              {formattedDisplay}
            </span>
          </span>
        </motion.div>

        {/* Separator line */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#4CD787]/50 to-transparent group-hover:from-[#4CD787]/30 group-hover:via-[#4CD787] group-hover:to-[#4CD787]/30 transition-all duration-300"></div>

          {/* Label */}
          <div className="subtitle-sm font-mono font-medium group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
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
    <div className="min-h-screen bg-[#000B14] pt-24">
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

        <div className="container mx-auto px-[21px] relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Title and content - Left side */}
              <AnimatedSection className="lg:order-1">
                <h1 className="mb-6">
                  <div
                    style={{
                      position: 'relative',
                      height: '100px',
                      width: '400px',
                      padding: '0 0px',
                    }}
                  >
                    <TextPressure
                      text="  About&nbsp;Us&nbsp; "
                      flex={false}
                      alpha={false}
                      stroke={false}
                      width={false}
                      weight={true}
                      italic={false}
                      textColor="#FFD700"
                      strokeColor="#FFFFFF"
                      minFontSize={66}
                    />
                    <span className="sr-only">About Us</span>
                  </div>
                </h1>
                <p className="subtitle-lg mb-6 md:mb-8 font-semibold">
                  We are a senior engineering team trusted by growth‑stage companies for complex and
                  time‑sensitive projects. We ship production‑ready software with clear milestones,
                  ownership, and post‑launch support.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-robinhood text-black hover:bg-white hover:text-black px-6 py-3 rounded-lg transition-colors font-medium border-2 border-robinhood shadow-lg"
                    onClick={(e) => {
                      window.open(
                        'https://calendly.com/a-sheikhizadeh/devx-group-llc-representative',
                        '_blank'
                      )
                      e.preventDefault()
                    }}
                  >
                    Schedule a Strategy Call
                  </a>
                  <Link
                    href="/portfolio"
                    className="bg-transparent text-white hover:bg-white/10 px-6 py-3 rounded-lg transition-colors font-medium border border-white/30"
                  >
                    See Our Work
                  </Link>
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
      <section className="pt-8 pb-16 relative mt-19">
        <div className="container mx-auto px-[21px]">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-section text-white mb-4 md:mb-6">Our Impact</h2>
              <p className="subtitle-lg max-w-2xl mx-auto mt-2 md:mt-4 px-4">
                Numbers that reflect our commitment to excellence and the trust our clients place in
                us.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
              <StatCounter number="30+" label="Happy Clients" />
              <StatCounter number="15+" label="Technical Experience" />
              <StatCounter number="40+" label="Projects Completed" />
              <StatCounter number="23" label="Team Members" />
            </div>
            <p className="subtitle-sm text-center mt-4">
              DevX Group LLC has been in business for 2+ years with a seasoned senior engineering
              team.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="pt-20 pb-16 relative">
        <div className="container mx-auto px-[21px]">
          <AnimatedSection className="max-w-5xl mx-auto text-center mb-14 md:mb-16">
            <h2 className="heading-section text-white mb-4 md:mb-6">How We Work</h2>
            <p className="subtitle-lg max-w-3xl mx-auto mt-3 md:mt-4 px-4">
              A simple, reliable process that keeps you in control
              <br />
              and delivers outcomes on time.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 sm:gap-y-16 lg:gap-y-0 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-16 items-center ml-[13px]">
            {/* Left side - Text content */}

            <AnimatedSection className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4CD787]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#4CD787] font-semibold text-base">1</span>
                  </div>
                  <div>
                    <h3 className="heading-component text-white mb-2">Discovery & Planning</h3>
                    <p className="text-body text-muted">
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
                    <h3 className="heading-component text-white mb-2">Solution Proposal</h3>
                    <p className="text-body text-muted">
                      Clear milestones, scope, and ownership, with timeline and dependencies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4834D4]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#4834D4] font-semibold text-base">3</span>
                  </div>
                  <div>
                    <h3 className="heading-component text-white mb-2">Build & Reviews</h3>
                    <p className="text-body text-muted">
                      Weekly demos, no surprises. We optimize for reliability and maintainability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9d4edd]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#9d4edd] font-semibold text-base">4</span>
                  </div>
                  <div>
                    <h3 className="heading-component text-white mb-2">Delivery & Support</h3>
                    <p className="text-body text-muted">
                      Handover, documentation, and stabilization support after launch.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right side - CardSwap */}
            <AnimatedSection
              delay={0.2}
              className="relative mt-6 sm:mt-8 h-[360px] sm:h-[420px] md:h-[480px] lg:h-[560px] xl:h-[600px]"
            >
              <CardSwap
                width={490}
                height={290}
                cardDistance={66}
                verticalDistance={60}
                delay={3000}
                pauseOnHover={false}
                easing="elastic"
                onCardClick={handleProcessCardClick}
              >
                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#4CD787]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-[#4CD787]" />
                    <h3 className="heading-component text-white">Discovery</h3>
                  </div>
                  <p className="text-body text-secondary">
                    We align on goals, constraints, and success metrics in a focused call.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#4CD787] to-[#4CD787]/50 rounded-full"></div>
                </Card>

                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#FFD700]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-[#FFD700]" />
                    <h3 className="heading-component text-white">Solution Proposal</h3>
                  </div>
                  <p className="text-body text-secondary">
                    Clear milestones, scope, and ownership, with timeline and dependencies.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFD700]/50 rounded-full"></div>
                </Card>

                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#4834D4]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-[#4834D4]" />
                    <h3 className="heading-component text-white">Build & Reviews</h3>
                  </div>
                  <p className="text-body text-secondary">
                    Weekly demos, no surprises. We optimize for reliability and maintainability.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#21cf3e] to-[#4834D4]/50 rounded-full"></div>
                </Card>

                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#9d4edd]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Check className="w-6 h-6 text-[#9d4edd]" />
                    <h3 className="heading-component text-white">Delivery & Support</h3>
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
        className="pt-20 pb-16 relative bg-gradient-to-b from-transparent via-[#0a0a1a] to-transparent"
      >
        <div className="container mx-auto px-[21px]">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-section text-white mb-4 md:mb-6">Our Values</h2>
            <p className="subtitle-lg mt-2 md:mt-4 px-4">
              Our core values guide everything we do and define how we work with our clients and
              each other.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <ValueCard
              icon={Heart}
              title="Client-Centered Focus"
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
      <section className="pt-16 pb-12 relative mt-30">
        <div className="max-w-screen-lg mx-auto px-[21px]">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 className="heading-section text-white mb-6">Delivery Ownership</h2>
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
              itemDistance={200}
              itemScale={0.038}
              itemStackDistance={40}
              stackPosition="20%"
              scaleEndPosition="15%"
              baseScale={0.85}
              rotationAmount={0}
              blurAmount={0}
              useWindowScroll
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

      {/* Context 7 MCP Section */}
      <section className="pt-16 pb-14 relative">
        <div className="container mx-auto px-[21px]">
          <AnimatedSection className="text-center max-w-4xl mx-auto mb-14 md:mb-16">
            <h2 className="heading-section text-white mb-4 md:mb-6">Context 7 MCP</h2>
            <p className="subtitle-lg px-4">
              We maintain a dedicated Model Context Protocol (MCP) workspace so Context&nbsp;7 stays
              in sync with the UI guardrails our teams follow on every device size.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contextMcpHighlights.map((item) => (
              <div
                key={item.title}
                className="relative rounded-2xl border border-white/10 p-6 md:p-8 bg-black/40 backdrop-blur"
                style={{
                  background: `linear-gradient(145deg, ${withAlpha(item.accent, 0.18)} 0%, rgba(5,8,16,0.9) 70%)`,
                  boxShadow: `0 20px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 ${withAlpha(
                    item.accent,
                    0.2
                  )}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="subtitle-xs tracking-[0.2em] uppercase font-semibold text-muted rounded-full px-3 py-1"
                    style={{
                      backgroundColor: withAlpha(item.accent, 0.15),
                      border: `1px solid ${withAlpha(item.accent, 0.3)}`,
                    }}
                  >
                    {item.label}
                  </span>
                  <Check
                    className="w-5 h-5"
                    style={{ color: item.accent, filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))' }}
                    aria-hidden
                  />
                </div>
                <h3 className="heading-component text-white mt-5">{item.title}</h3>
                <p className="text-body text-muted mt-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="pt-16 pb-14 relative overflow-hidden">
        <div className="container mx-auto px-[21px] relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="heading-section text-white mb-4 md:mb-6">Our Purpose</h2>
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
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-[21px] relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-section text-white mb-4 md:mb-6">Our Team Structure</h2>
            <p className="subtitle-lg mt-2 md:mt-4 px-4">
              Meet our leadership team and discover how our 23-member organization delivers
              exceptional results.
            </p>
          </AnimatedSection>

          <OrgChart className="mb-12" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050810] to-black"></div>
        <div className="absolute -top-32 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-full bg-[#4CD787]/10 blur-3xl opacity-40"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-black/40 via-black/80 to-black"></div>

        <div className="container mx-auto px-[21px] relative z-10">
          <AnimatedSection className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <a
              href="#our-values"
              className="inline-block mb-8 bg-[#8A4FFF]/20 hover:bg-[#8A4FFF]/30 text-white border border-[#8A4FFF]/50 px-6 py-2 rounded-full text-base font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('our-values')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              Discover why clients choose us
            </a>
            <h2 className="heading-section text-white mb-4 md:mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="subtitle-lg mb-6 md:mb-8 max-w-2xl mx-auto mt-4 px-4">
              Let&apos;s discuss how we can help you achieve your goals with our expert software
              development services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-robinhood text-black hover:bg-white hover:text-black px-8 py-3 rounded-lg transition-colors font-medium border-2 border-robinhood shadow-lg"
                onClick={(e) => {
                  window.open(
                    'https://calendly.com/a-sheikhizadeh/devx-group-llc-representative',
                    '_blank'
                  )
                  e.preventDefault()
                }}
              >
                Schedule a Strategy Call
              </a>
              <Link
                href="/portfolio"
                className="bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg transition-colors font-medium border border-white/30"
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
