'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Check,
  Users,
  Zap,
  Award,
  Globe,
  Shield,
  Heart,
  Lock,
  UserCheck,
  Sparkles,
  Lightbulb,
  Star,
} from 'lucide-react'
import BlurText from '@/components/animations/BlurText'
import TextPressure from '@/components/animations/TextPressure'
import RunningLineAnimation from '@/components/animations/RunningLineAnimation'
import ShapeBlur from '@/components/animations/ShapeBlur'
import OrgChart from '@/components/sections/OrgChart'

// Enhanced animation variants for better performance
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

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

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

// Enhanced animated section component for reuse
const AnimatedSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ ...fadeInUpVariants.visible.transition, delay: shouldReduceMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Enhanced team member card component
const TeamMemberCard = ({ name, role, image, delay = 0 }: { name: string; role: string; image: string; delay?: number }) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      variants={cardHoverVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ ...fadeInUpVariants.visible.transition, delay: shouldReduceMotion ? 0 : delay }}
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

// Clean value card component with simple border animation
const ValueCard = ({ icon: Icon, title, description, delay = 0 }: { icon: any; title: string; description: string; delay?: number }) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isCardHovered, setIsCardHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ ...fadeInUpVariants.visible.transition, delay: shouldReduceMotion ? 0 : delay }}
      className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4CD787] transition-all duration-300 group cursor-pointer relative"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.02,
              y: -4,
            }
      }
    >
      {/* Clean animated border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#4CD787] transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

      {/* Header with icon and title in a clean row */}
      <div className="flex items-center gap-4 mb-5">
        <motion.div
          className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center group-hover:bg-[#4CD787]/20 transition-colors relative overflow-hidden flex-shrink-0"
          animate={
            isCardHovered && !shouldReduceMotion
              ? { scale: 1.05 }
              : { scale: 1 }
          }
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Simplified background effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4CD787]/20 to-[#4834D4]/20"
            animate={isCardHovered ? { scale: 1.1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Icon with minimal animation to avoid fuzziness */}
          <Icon className="w-6 h-6 text-[#4CD787] relative z-10" />
        </motion.div>

        <h3 className="text-xl font-semibold text-white group-hover:text-[#4CD787] transition-colors duration-300 flex-1 font-['IBM_Plex_Sans']">
          {title}
        </h3>
      </div>
      <p 
        className="text-white/70 text-sm group-hover:text-white/85 transition-colors duration-300 leading-relaxed font-['IBM_Plex_Sans'] font-light"
        style={{ letterSpacing: '0.02em' }}
      >
        {description}
      </p>
    </motion.div>
  )
}

// Enhanced stat counter with animation
const StatCounter = ({ number, label, delay = 0 }: { number: string | number; label: string; delay?: number }) => {
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
      transition={{ ...fadeInUpVariants.visible.transition, delay: shouldReduceMotion ? 0 : delay }}
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
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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

        <div className="container mx-auto px-4 relative">
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
                  className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed font-['IBM_Plex_Sans']"
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
                    className="bg-robinhood text-black hover:bg-robinhood-90 px-6 py-3 rounded-lg transition-colors font-medium border border-black/30"
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
                      src="/images/about/testimonial-background.png"
                      alt="DevX Team"
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

                  {/* Enhanced testimonial overlay with better visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/60 backdrop-blur-sm">
                    <div className="flex gap-2 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-[#FFD700]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white mb-2 font-light leading-relaxed text-sm">
                      &quot;DevX Team delivered exceptional results on our complex IoT project.
                      Their expertise and attention to detail made the difference.&quot;
                    </p>
                    <p className="text-[#FFD700] text-xs font-semibold">
                      Sarah Johnson, CTO at TechCorp
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-8 pb-16 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700]">Our Impact</h2>
              <p
                className="text-lg md:text-xl text-foreground/90 font-light max-w-2xl mx-auto leading-relaxed font-['IBM_Plex_Sans'] mt-6"
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
              <StatCounter number="100+" label="Happy Clients" delay={0.1} />
              <StatCounter number="15+" label="Years Experience" delay={0.2} />
              <StatCounter number="200+" label="Projects Completed" delay={0.3} />
              <StatCounter number="23" label="Team Members" delay={0.4} />
            </div>
            <p className="text-xs text-white/60 text-center mt-4">Totals verified internally.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="pt-8 pb-16 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700]">How We Work</h2>
            <p
              className="text-lg md:text-xl text-foreground/90 font-light max-w-3xl mx-auto leading-relaxed font-['IBM_Plex_Sans'] mt-6"
              style={{ letterSpacing: '0.025em', fontWeight: '400' }}
            >
              A simple, reliable process that keeps you in control and delivers outcomes on time.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-5 h-5 text-[#4CD787]" />
                <h3 className="font-semibold text-white">Discovery</h3>
              </div>
              <p className="text-foreground/80 text-sm">
                We align on goals, constraints, and success metrics in a focused call.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-[#4CD787]" />
                <h3 className="font-semibold text-white">Solution Proposal</h3>
              </div>
              <p className="text-foreground/80 text-sm">
                Clear milestones, scope, and ownership, with timeline and dependencies.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-[#4CD787]" />
                <h3 className="font-semibold text-white">Build & Reviews</h3>
              </div>
              <p className="text-foreground/80 text-sm">
                Weekly demos, no surprises. We optimize for reliability and maintainability.
              </p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Check className="w-5 h-5 text-[#4CD787]" />
                <h3 className="font-semibold text-white">Delivery & Support</h3>
              </div>
              <p className="text-foreground/80 text-sm">
                Handover, documentation, and stabilization support after launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section - Redesigned */}
      <section className="py-20 relative overflow-hidden">
        {/* Simplified Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2a] to-[#0a1a0a]" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center w-full mb-6">
              <div
                style={{
                  position: 'relative',
                  height: '80px',
                  width: '360px',
                  padding: '0',
                }}
              >
                <TextPressure
                  text="Our&nbsp;Story&nbsp; "
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={false}
                  textColor="#FFD700"
                  strokeColor="#FFFFFF"
                  minFontSize={28}
                />
              </div>
            </div>

            <AnimatedSection delay={0.2}>
              <p className="text-lg md:text-xl text-foreground/90 font-light max-w-2xl mx-auto leading-relaxed font-['IBM_Plex_Sans']">
                Founded with a simple mission: deliver exceptional software solutions that drive
                real business results.
              </p>
            </AnimatedSection>
          </div>

          {/* Main Content with Better Layout */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <div className="order-2 xl:order-1">
                <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                  <div className="space-y-6 text-foreground/90">
                    <AnimatedSection delay={0.3}>
                      <p className="text-base md:text-lg leading-relaxed">
                        We are not a typical development agency. We are a specialized senior team
                        for complex and time-sensitive projects. Every member is hand-selected for
                        their skills, proven track record, and ability to execute under pressure.
                      </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                      <div>
                        <h4 className="text-lg font-semibold text-[#4CD787] mb-3">
                          Our Three Core Principles:
                        </h4>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <span className="text-[#4CD787] font-bold text-lg">1.</span>
                            <div>
                              <h5 className="font-semibold text-white text-sm mb-1">
                                Vetted Experts Only
                              </h5>
                              <p className="text-sm leading-relaxed">
                                No junior developers, no learning on your dime. Our team consists
                                solely of senior-level professionals with 5+ years of proven
                                experience.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-[#FFD700] font-bold text-lg">2.</span>
                            <div>
                              <h5 className="font-semibold text-white text-sm mb-1">
                                Precision & Efficiency
                              </h5>
                              <p className="text-sm leading-relaxed">
                                We move fast without breaking things. Every line of code, every
                                decision, every deliverable is executed with military precision.
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <span className="text-[#4834D4] font-bold text-lg">3.</span>
                            <div>
                              <h5 className="font-semibold text-white text-sm mb-1">
                                No Project Left Behind
                              </h5>
                              <p className="text-sm leading-relaxed">
                                When we take on your project, it gets completed. Period. We don&apos;t
                                abandon missions, and we don&apos;t leave clients hanging.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.5}>
                      <p className="text-base md:text-lg leading-relaxed">
                        Whether you need rapid MVP development, complex system integrations, or
                        rescue operations for failing projects, we deploy the right specialists for
                        your specific mission.
                      </p>
                    </AnimatedSection>
                  </div>
                </div>
              </div>

              {/* Image with Running Line Animation */}
              <div className="order-1 xl:order-2">
                <AnimatedSection delay={0.3}>
                  <div className="relative group">
                    {/* Main image container */}
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/about/devx-office.jpg"
                        alt="DevX Group LLC Headquarters - San Diego, California"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                      />

                      {/* Running line animation around image */}
                      <RunningLineAnimation color="#4CD787" duration={4} />

                      {/* Small headquarters info card */}
                      <motion.div
                        className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white p-3 rounded-lg shadow-lg border border-white/20 max-w-[200px]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-center">
                          <p className="font-semibold text-sm text-[#4CD787]">Headquarters</p>
                          <p className="text-xs opacity-90">San Diego, CA</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section
        id="our-values"
        className="pt-8 pb-16 relative bg-gradient-to-b from-transparent via-[#0a0a1a] to-transparent"
      >
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700]">Our Values</h2>
            <p
              className="text-lg md:text-xl text-foreground/90 font-light leading-relaxed font-['IBM_Plex_Sans'] mt-6"
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
              title="Security & Compliance First"
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
              title="Versatile and Adaptable"
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
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700] font-['IBM_Plex_Mono']">
              Delivery Ownership
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 font-light leading-relaxed font-['IBM_Plex_Sans']">
              Your project success is our responsibility. We stand behind our commitments.
            </p>
          </AnimatedSection>

          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#4CD787] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground/90">
                  Fixed scope with milestone reviews and progress transparency
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FFD700] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground/90">NDA by default and U.S.-based contracting</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#4834D4] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground/90">
                  Code ownership transfer with documentation at acceptance
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#9d4edd] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-foreground/90">Stabilization support for 30 days post-launch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700] font-['IBM_Plex_Mono']">
              Our Purpose
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 font-light leading-relaxed font-['IBM_Plex_Sans']">
              Driven by vision, guided by mission, committed to excellence.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimatedSection className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#4CD787]/30 transition-colors duration-300">
              <h3 className="text-2xl font-bold mb-4 text-[#4CD787] font-['IBM_Plex_Mono']">
                Our Vision
              </h3>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-['IBM_Plex_Sans']">
                To revolutionize software development by delivering innovative, efficient, and
                scalable solutions that empower businesses worldwide to thrive in a digital-first
                future.
              </p>
            </AnimatedSection>

            <AnimatedSection
              className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-[#FFD700]/30 transition-colors duration-300"
              delay={0.2}
            >
              <h3 className="text-2xl font-bold mb-4 text-[#FFD700] font-['IBM_Plex_Mono']">
                Our Mission
              </h3>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-['IBM_Plex_Sans']">
                To simplify the software development journey through a streamlined, results-first
                process, ensuring exceptional quality, adaptability, and long-term success for every
                client.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pt-8 pb-16 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700]">
              Our Team Structure
            </h2>
            <p
              className="text-lg md:text-xl text-foreground/90 font-light leading-relaxed font-['IBM_Plex_Sans'] mt-6"
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
        <div className="container mx-auto px-4 relative">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Start Your Project?
            </h2>
            <p
              className="text-lg md:text-xl text-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed font-['IBM_Plex_Sans'] mt-4"
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
                className="bg-robinhood text-black hover:bg-robinhood-90 px-8 py-3 rounded-lg transition-colors font-medium border border-black/30"
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
