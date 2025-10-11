'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, Users, Zap, Globe, Shield, Heart, UserCheck, Lightbulb, Star } from 'lucide-react'
import TextPressure from '@/components/animations/TextPressure'
import ShapeBlur from '@/components/animations/ShapeBlur'
import CardSwap, { Card } from '@/components/animations/CardSwap'
import OrgChart from '@/components/sections/OrgChart'

// Enhanced animation variants for better performance
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
}

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
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
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Enhanced team member card component
const TeamMemberCard = ({
  name,
  role,
  image,
  delay = 0,
}: {
  name: string
  role: string
  image: string
  delay?: number
}) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      variants={cardHoverVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : delay }}
      className="group cursor-pointer"
      whileHover={shouldReduceMotion ? {} : 'hover'}
    >
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4CD787]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <motion.div
        className="text-center"
        whileHover={shouldReduceMotion ? {} : { y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-white group-hover:text-[#4CD787] transition-colors duration-300">
          {name}
        </h3>
        <p className="text-[#4CD787] group-hover:text-white transition-colors duration-300">
          {role}
        </p>
      </motion.div>
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
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : delay }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.02,
              y: -8,
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

      {/* Scanning line effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%' }}
        whileHover={{
          x: '100%',
          transition: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1,
          },
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, #4CD78740, transparent)',
          width: '50%',
          height: '100%',
        }}
      />

      {/* Holographic edge effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        initial={{ scale: 1 }}
        whileHover={{
          scale: [1, 1.02, 1],
          rotate: [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          border: '1px solid #4CD78760',
          boxShadow: '0 0 20px #4CD78730, inset 0 0 20px #4CD78710',
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
              whileHover={{
                scale: 1.2,
                rotateY: 180,
              }}
              transition={{ duration: 0.6, ease: 'backOut' }}
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
            className="text-xl font-semibold font-['IBM_Plex_Sans'] text-white"
            whileHover={{
              scale: 1.05,
              textShadow: '0 0 15px #4CD78780',
            }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
        </div>
        <motion.p className="text-white/90 font-['IBM_Plex_Sans'] font-light text-base leading-relaxed group-hover:text-white transition-colors duration-500">
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}

// Vision/Mission Card with running border animation
const VisionMissionCard = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : delay }}
      className="relative bg-black/60 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/20 hover:border-[#4CD787]/40 transition-colors duration-300 shadow-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {/* Running border animation - always visible, changes color on hover */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {/* Top border */}
        <motion.div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent top-0"
          style={{
            boxShadow: isHovered
              ? `0 0 6px #4CD787, 0 0 12px #4CD78740`
              : `0 0 6px white, 0 0 12px rgba(255,255,255,0.4)`,
          }}
          animate={{
            x: ['-100%', '100%'],
            background: isHovered
              ? 'linear-gradient(to right, transparent, #4CD787, transparent)'
              : 'linear-gradient(to right, transparent, white, transparent)',
          }}
          transition={{
            x: {
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            },
            background: {
              duration: 0.3,
            },
          }}
        />
        {/* Right border */}
        <motion.div
          className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent right-0"
          style={{
            boxShadow: isHovered
              ? `0 0 6px #4CD787, 0 0 12px #4CD78740`
              : `0 0 6px white, 0 0 12px rgba(255,255,255,0.4)`,
          }}
          animate={{
            y: ['-100%', '100%'],
            background: isHovered
              ? 'linear-gradient(to bottom, transparent, #4CD787, transparent)'
              : 'linear-gradient(to bottom, transparent, white, transparent)',
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.75,
            },
            background: {
              duration: 0.3,
            },
          }}
        />
        {/* Bottom border */}
        <motion.div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent bottom-0"
          style={{
            boxShadow: isHovered
              ? `0 0 6px #4CD787, 0 0 12px #4CD78740`
              : `0 0 6px white, 0 0 12px rgba(255,255,255,0.4)`,
          }}
          animate={{
            x: ['100%', '-100%'],
            background: isHovered
              ? 'linear-gradient(to right, transparent, #4CD787, transparent)'
              : 'linear-gradient(to right, transparent, white, transparent)',
          }}
          transition={{
            x: {
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.5,
            },
            background: {
              duration: 0.3,
            },
          }}
        />
        {/* Left border */}
        <motion.div
          className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent left-0"
          style={{
            boxShadow: isHovered
              ? `0 0 6px #4CD787, 0 0 12px #4CD78740`
              : `0 0 6px white, 0 0 12px rgba(255,255,255,0.4)`,
          }}
          animate={{
            y: ['100%', '-100%'],
            background: isHovered
              ? 'linear-gradient(to bottom, transparent, #4CD787, transparent)'
              : 'linear-gradient(to bottom, transparent, white, transparent)',
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              delay: 2.25,
            },
            background: {
              duration: 0.3,
            },
          }}
        />
      </motion.div>
    </motion.div>
  )
}

// Enhanced stat counter with animation
const StatCounter = ({
  number,
  label,
  delay = 0,
}: {
  number: string | number
  label: string
  delay?: number
}) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(countRef, { once: false, margin: '-50px' })
  const targetNumber = useMemo(() => Number.parseInt(String(number).replace(/\D/g, '')), [number])

  const animateCount = useCallback(() => {
    if (shouldReduceMotion) {
      setCount(targetNumber)
      return
    }

    setCount(0) // Reset count before animation
    let start = 0
    const duration = 2500
    const step = Math.ceil(targetNumber / (duration / 16))

    const timer = setInterval(() => {
      start += step
      if (start > targetNumber) {
        setCount(targetNumber)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [targetNumber, shouldReduceMotion])

  useEffect(() => {
    if (isInView) {
      const cleanup = animateCount()
      return cleanup
    } else {
      // Reset count when not in view
      setCount(0)
      return undefined
    }
  }, [isInView, animateCount])

  return (
    <motion.div
      ref={countRef}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : delay }}
      className="relative group cursor-pointer"
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4CD787]/5 to-[#4834D4]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm scale-110"></div>

      {/* Main content */}
      <div className="relative bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10 group-hover:border-[#4CD787]/30 transition-all duration-500 text-center">
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4CD787]/20 via-[#4834D4]/20 to-[#4CD787]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

        {/* Counter number */}
        <motion.div
          className="text-5xl md:text-6xl font-bold text-white mb-3 font-['IBM_Plex_Mono'] group-hover:text-[#4CD787] transition-colors duration-300 relative"
          whileHover={shouldReduceMotion ? {} : { y: -3 }}
        >
          {/* Glowing text effect */}
          <span className="relative">
            {String(number).includes('+') ? `${count}+` : count}
            <span className="absolute inset-0 text-[#4CD787] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm">
              {String(number).includes('+') ? `${count}+` : count}
            </span>
          </span>
        </motion.div>

        {/* Separator line */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#4CD787]/50 to-transparent mx-auto mb-3 group-hover:from-[#4CD787]/30 group-hover:via-[#4CD787] group-hover:to-[#4CD787]/30 transition-all duration-300"></div>

        {/* Label */}
        <div className="text-sm md:text-base text-white/80 font-['IBM_Plex_Mono'] font-medium group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
          {label}
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion()
  const handleProcessCardClick = useCallback((idx: number) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Process step ${idx + 1} clicked`)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#000B14] pt-24">
      {/* Hero Section */}
      <section className="pt-2 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#000B14] via-[#0a0a1a] to-[#000B14]"></div>

        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.1, 1],
                    x: [0, 20, 0],
                    y: [0, -10, 0],
                  }
            }
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' }}
            className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[#4CD787]/10 to-[#4834D4]/10 rounded-full blur-3xl -top-48 -left-24"
          />
          <motion.div
            animate={
              shouldReduceMotion
                ? {}
                : {
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.2, 1],
                    x: [0, -30, 0],
                    y: [0, 15, 0],
                  }
            }
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              delay: 1,
            }}
            className="absolute w-[500px] h-[500px] bg-gradient-to-l from-[#4834D4]/10 to-[#4CD787]/10 rounded-full blur-3xl top-96 -right-24"
          />
        </div>

        <div className="container mx-auto px-[21px] relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Title and content - Left side */}
              <AnimatedSection className="lg:order-1">
                <h1 className="sr-only">About Us</h1>
                <div className="mb-6">
                  <div
                    style={{
                      position: 'relative',
                      height: '100px',
                      width: '420px',
                      padding: '0 0px',
                    }}
                  >
                    <TextPressure
                      text="About&nbsp;Us&nbsp; "
                      flex={true}
                      alpha={false}
                      stroke={false}
                      width={true}
                      weight={true}
                      italic={false}
                      textColor="#FFD700"
                      strokeColor="#FFFFFF"
                      minFontSize={32}
                    />
                  </div>
                </div>
                <p
                  className="text-base md:text-lg lg:text-xl text-foreground/90 mb-6 md:mb-8 leading-relaxed font-['IBM_Plex_Sans']"
                  style={{
                    letterSpacing: '0.025em',
                    fontWeight: '400',
                  }}
                >
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
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={true}
                    />
                    {/* ShapeBlur effect that creates animated mask on the image */}
                    <div className="absolute inset-0 mix-blend-multiply">
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
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-8 pb-16 relative">
        <div className="container mx-auto px-[21px]">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white">
                Our Impact
              </h2>
              <p
                className="text-base md:text-lg lg:text-xl text-foreground/90 font-light max-w-2xl mx-auto leading-relaxed font-['IBM_Plex_Sans'] mt-4 md:mt-6 px-4"
                style={{
                  letterSpacing: '0.025em',
                  fontWeight: '400',
                }}
              >
                Numbers that reflect our commitment to excellence and the trust our clients place in
                us.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <StatCounter number="30+" label="Happy Clients" delay={0.1} />
              <StatCounter number="2+" label="Years Experience" delay={0.2} />
              <StatCounter number="40+" label="Projects Completed" delay={0.3} />
              <StatCounter number="23" label="Team Members" delay={0.4} />
            </div>
            <p className="text-xs text-white/60 text-center mt-4">Totals verified internally.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="pt-20 pb-16 relative">
        <div className="container mx-auto px-[21px]">
          <AnimatedSection className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white">
              How We Work
            </h2>
            <p
              className="text-base md:text-lg lg:text-xl text-foreground/90 font-light max-w-3xl mx-auto leading-relaxed font-['IBM_Plex_Sans'] mt-4 md:mt-6 px-4"
              style={{ letterSpacing: '0.025em', fontWeight: '400', whiteSpace: 'wrap' }}
            >
              A simple, reliable process that keeps you in control and delivers outcomes
              on&nbsp;time.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ml-[13px]">
            {/* Left side - Text content */}

            <AnimatedSection className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4CD787]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#4CD787] font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Discovery & Planning</h3>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      We align on goals, constraints, and success metrics in a focused strategy
                      call.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#FFD700] font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Solution Proposal</h3>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      Clear milestones, scope, and ownership, with timeline and dependencies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4834D4]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#4834D4] font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Build & Reviews</h3>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      Weekly demos, no surprises. We optimize for reliability and maintainability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9d4edd]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#9d4edd] font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Delivery & Support</h3>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      Handover, documentation, and stabilization support after launch.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right side - CardSwap */}
            <AnimatedSection delay={0.2} className="relative h-[500px] lg:h-[600px]">
              <CardSwap
                width={490}
                height={290}
                cardDistance={66}
                verticalDistance={60}
                delay={3000}
                pauseOnHover={true}
                easing="elastic"
                onCardClick={handleProcessCardClick}
              >
                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#4CD787]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-[#4CD787]" />
                    <h3 className="font-semibold text-white text-lg">Discovery</h3>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    We align on goals, constraints, and success metrics in a focused call.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#4CD787] to-[#4CD787]/50 rounded-full"></div>
                </Card>

                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#FFD700]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-[#FFD700]" />
                    <h3 className="font-semibold text-white text-lg">Solution Proposal</h3>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    Clear milestones, scope, and ownership, with timeline and dependencies.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFD700]/50 rounded-full"></div>
                </Card>

                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#4834D4]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-[#4834D4]" />
                    <h3 className="font-semibold text-white text-lg">Build & Reviews</h3>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    Weekly demos, no surprises. We optimize for reliability and maintainability.
                  </p>
                  <div className="mt-4 w-12 h-1 bg-gradient-to-r from-[#4834D4] to-[#4834D4]/50 rounded-full"></div>
                </Card>

                <Card className="bg-gradient-to-br from-black/80 to-black/60 border-[#9d4edd]/30 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Check className="w-6 h-6 text-[#9d4edd]" />
                    <h3 className="font-semibold text-white text-lg">Delivery & Support</h3>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed">
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white">
              Our Values
            </h2>
            <p
              className="text-base md:text-lg lg:text-xl text-foreground/90 font-light leading-relaxed font-['IBM_Plex_Sans'] mt-4 md:mt-6 px-4"
              style={{
                letterSpacing: '0.025em',
                fontWeight: '400',
              }}
            >
              Our core values guide everything we do and define how we work with our clients and
              each other.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={Heart}
              title="Customer Obsession"
              description="Our customers are always first in everything we do. We provide support after delivery and build long-term relationships."
              delay={0.1}
            />
            <ValueCard
              icon={Shield}
              title="Security First"
              description="We implement everything with enterprise-grade security in mind, preventing XSS, phishing, SQL injection, cross-site scripting, CSRF attacks, and data breaches. OWASP compliance, secure coding practices, and U.S. standards guide every line of code."
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
      <section className="pt-20 pb-16 relative">
        <div className="container mx-auto px-[21px]">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white font-['IBM_Plex_Mono']">
              Delivery Ownership
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-foreground/90 font-light leading-relaxed font-['IBM_Plex_Sans'] px-4">
              Your project success is our responsibility. We stand behind our commitments.
            </p>
          </AnimatedSection>

          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#4CD787] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm md:text-base text-foreground/90">
                  Fixed scope with milestone reviews and progress transparency
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#06B6D4] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm md:text-base text-foreground/90">
                  NDA by default and U.S.-based contracting
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#9d4edd] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm md:text-base text-foreground/90">
                  Code ownership transfer with documentation at acceptance
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#4CD787] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm md:text-base text-foreground/90">
                  Stabilization support for 30 days post-launch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section with Background Video */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover scale-105 brightness-[1.05]"
          >
            <source src="/videos/sticky-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-[#05060d]/80" />
        </div>

        <div className="container mx-auto px-[21px] relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white font-['IBM_Plex_Mono']">
              Our Purpose
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-foreground/90 font-light leading-relaxed font-['IBM_Plex_Sans'] px-4">
              Driven by vision, guided by mission, committed to excellence.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <VisionMissionCard delay={0}>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#4CD787] font-['IBM_Plex_Mono']">
                Our Vision
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed font-['IBM_Plex_Sans']">
                To revolutionize software development by delivering innovative, efficient, and
                scalable solutions that empower businesses worldwide to thrive in a digital-first
                future.
              </p>
            </VisionMissionCard>

            <VisionMissionCard delay={0.2}>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-[#06B6D4] font-['IBM_Plex_Mono']">
                Our Mission
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-white/90 leading-relaxed font-['IBM_Plex_Sans']">
                To simplify the software development journey through a streamlined, results-first
                process, ensuring exceptional quality, adaptability, and long-term success for every
                client.
              </p>
            </VisionMissionCard>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover scale-105 brightness-[1.05]"
          >
            <source src="/videos/sticky-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#05060d]/20 via-black/60 to-[#010203]/85" />
        </div>

        <div className="container mx-auto px-[21px] relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white">
              Our Team Structure
            </h2>
            <p
              className="text-base md:text-lg lg:text-xl text-foreground/90 font-light leading-relaxed font-['IBM_Plex_Sans'] mt-4 md:mt-6 px-4"
              style={{
                letterSpacing: '0.025em',
                fontWeight: '400',
              }}
            >
              Meet our leadership team and discover how our 23-member organization delivers
              exceptional results.
            </p>
          </AnimatedSection>

          <OrgChart className="mb-12" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-8 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#4CD787]/5 to-[#0a0a1a]"></div>
        <div className="container mx-auto px-[21px] relative">
          <AnimatedSection className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <a
              href="#our-values"
              className="inline-block mb-8 bg-[#8A4FFF]/20 hover:bg-[#8A4FFF]/30 text-white border border-[#8A4FFF]/50 px-6 py-2 rounded-full text-sm font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('our-values')?.scrollIntoView({
                  behavior: 'smooth',
                })
              }}
            >
              Discover why clients choose us
            </a>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-white">
              Ready to Start Your Project?
            </h2>
            <p
              className="text-base md:text-lg lg:text-xl text-foreground/90 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed font-['IBM_Plex_Sans'] mt-4 px-4"
              style={{
                letterSpacing: '0.025em',
                fontWeight: '400',
              }}
            >
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
      <div className="h-32 bg-gradient-to-b from-[#000B14] to-black"></div>
    </div>
  )
}
