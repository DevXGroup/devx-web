"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Users, Zap, Award, Globe, Shield } from "lucide-react"
import BlurText from "@/components/BlurText"
import TextTrail from "@/components/TextTrail"
import RunningLineAnimation from "@/components/RunningLineAnimation"
import ShapeBlur from "@/components/ShapeBlur"

// Enhanced animation variants for better performance
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

// Enhanced animated section component for reuse
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ ...fadeInUpVariants.visible.transition, delay: shouldReduceMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Enhanced team member card component
const TeamMemberCard = ({ name, role, image, delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      variants={cardHoverVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ ...fadeInUpVariants.visible.transition, delay: shouldReduceMotion ? 0 : delay }}
      className="group cursor-pointer"
      whileHover={shouldReduceMotion ? {} : "hover"}
    >
      <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Image
          src={image || "/placeholder.svg"}
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
        <h3 className="text-xl font-semibold text-white group-hover:text-[#4CD787] transition-colors duration-300">{name}</h3>
        <p className="text-[#4CD787] group-hover:text-white transition-colors duration-300">{role}</p>
      </motion.div>
    </motion.div>
  )
}

// Enhanced value card component with running shine animation
const ValueCard = ({ icon: Icon, title, description, delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ ...fadeInUpVariants.visible.transition, delay: shouldReduceMotion ? 0 : delay }}
      className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4CD787]/30 transition-all duration-300 group cursor-pointer relative overflow-hidden"
      whileHover={shouldReduceMotion ? {} : {
        scale: 1.02,
        boxShadow: "0 10px 30px rgba(76, 215, 135, 0.1)",
        borderColor: "rgba(76, 215, 135, 0.3)"
      }}
    >
      {/* Running shine line animation */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#4CD787] to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{
            x: "200%",
            transition: {
              duration: 1.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5
            }
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#CFB53B] to-transparent"
          initial={{ x: "100%" }}
          whileHover={{
            x: "-200%",
            transition: {
              duration: 1.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
              delay: 0.3
            }
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-transparent via-[#4834D4] to-transparent"
          initial={{ y: "-100%" }}
          whileHover={{
            y: "200%",
            transition: {
              duration: 1.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
              delay: 0.6
            }
          }}
        />
        <motion.div
          className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-transparent via-[#9d4edd] to-transparent"
          initial={{ y: "100%" }}
          whileHover={{
            y: "-200%",
            transition: {
              duration: 1.5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.5,
              delay: 0.9
            }
          }}
        />
      </div>

      <motion.div 
        className="w-12 h-12 rounded-full bg-[#4CD787]/10 flex items-center justify-center mb-4 group-hover:bg-[#4CD787]/20 transition-colors relative z-10"
        whileHover={shouldReduceMotion ? {} : { rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Icon className="w-6 h-6 text-[#4CD787]" />
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#4CD787] transition-colors duration-300 relative z-10">{title}</h3>
      <p className="text-foreground/70 text-sm group-hover:text-white/80 transition-colors duration-300 relative z-10">{description}</p>
    </motion.div>
  )
}

// Enhanced stat counter with animation
const StatCounter = ({ number, label, delay = 0 }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(countRef, { once: false, threshold: 0.5, margin: "-50px" })
  const targetNumber = useMemo(() => Number.parseInt(number.replace(/\D/g, "")), [number])

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
    }
  }, [isInView, animateCount])

  return (
    <motion.div
      ref={countRef}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
            {number.includes("+") ? `${count}+` : count}
            <span className="absolute inset-0 text-[#4CD787] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm">
              {number.includes("+") ? `${count}+` : count}
            </span>
          </span>
        </motion.div>
        
        {/* Separator line */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#4CD787]/50 to-transparent mx-auto mb-3 group-hover:from-[#4CD787]/30 group-hover:via-[#4CD787] group-hover:to-[#4CD787]/30 transition-all duration-300"></div>
        
        {/* Label */}
        <div className="text-sm md:text-base text-white/80 font-['IBM_Plex_Mono'] font-medium group-hover:text-white transition-colors duration-300 uppercase tracking-wide">
          {label}
        </div>
        
        {/* Animated particles */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-[#4CD787] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-[#4834D4] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
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
    <div className="min-h-screen bg-[#000B14]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black"></div>

        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={shouldReduceMotion ? {} : {
              opacity: [0.4, 0.6, 0.4],
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="absolute w-[600px] h-[600px] bg-gradient-to-r from-[#4CD787]/10 to-[#4834D4]/10 rounded-full blur-3xl -top-48 -left-24"
          />
          <motion.div
            animate={shouldReduceMotion ? {} : {
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              y: [0, 15, 0]
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
            className="absolute w-[500px] h-[500px] bg-gradient-to-l from-[#4834D4]/10 to-[#4CD787]/10 rounded-full blur-3xl top-96 -right-24"
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <BlurText 
                  text="About DevX Group"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#CFB53B]"
                  delay={120}
                  animateBy="words"
                  direction="top"
                />
                <p className="text-xl text-foreground/80 mb-8">
                  A California-based software and IoT development powerhouse built on decades of industry experience and
                  a passion for solving complex challenges.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="bg-[#4CD787] text-black hover:bg-[#4CD787]/90 px-6 py-3 rounded-lg transition-colors font-medium"
                  >
                    Get in Touch
                  </Link>
                  <a
                    href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent text-white hover:bg-white/10 px-6 py-3 rounded-lg transition-colors font-medium border border-white/30"
                    onClick={(e) => {
                      window.open(
                        "https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05",
                        "_blank",
                      )
                      e.preventDefault()
                    }}
                  >
                    Schedule a Call
                  </a>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="relative">
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden">
                  {/* Background image with ShapeBlur effect applied as mask */}
                  <div className="absolute inset-0">
                    <Image 
                      src="/images/about/testimonial-background.png" 
                      alt="DevX Team" 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
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
                        <svg key={i} className="w-5 h-5 text-[#CFB53B]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-white text-sm italic font-medium leading-relaxed">
                      &ldquo;Our partnership with Dev Group has driven our company to be a leader in online channels. We recommend them for any business looking to have an active online presence creatively.&rdquo;
                    </p>
                    <div className="mt-3 text-[#4CD787] text-sm font-medium">— Lazurd Inc CEO</div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#CFB53B]">Our Impact</h2>
              <p className="text-foreground/80 max-w-2xl mx-auto">
                Numbers that reflect our commitment to excellence and the trust our clients place in us.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              <StatCounter number="100+" label="Happy Clients" delay={0.1} />
              <StatCounter number="20+" label="Years Experience" delay={0.2} />
              <StatCounter number="500+" label="Projects Completed" delay={0.3} />
              <StatCounter number="15+" label="Team Members" delay={0.4} />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story Section - Stunning Redesign */}
      <section className="py-32 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2a] to-[#0a1a0a]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#4CD787] rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header with TextTrail Animation */}
          <div className="text-center mb-20 relative z-10">
            <div className="relative inline-block w-full">
              <div className="w-full h-48 md:h-56 lg:h-64 flex items-center justify-center relative z-10">
                <div className="w-full max-w-5xl h-full relative z-10">
                  <TextTrail 
                    text="Our Story"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="700"
                    textColor="#CFB53B"
                    backgroundColor="transparent"
                  />
                </div>
              </div>
            </div>
            
            <AnimatedSection delay={0.2}>
              <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                DevX Group LLC was founded with a simple mission: to deliver exceptional software solutions that drive
                real business results.
              </p>
            </AnimatedSection>
          </div>

          {/* Main Content with Enhanced Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-center">
              
              {/* Text Content */}
              <div className="order-2 xl:order-1 relative">
                <div className="relative bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10">
                  
                  {/* Animated corner decorations */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#4CD787] rounded-tl-3xl opacity-50" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#CFB53B] rounded-br-3xl opacity-50" />
                  
                  <div className="space-y-8 text-foreground/90 relative z-10">
                    <AnimatedSection delay={0.3}>
                      <div className="relative">
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#4CD787] to-[#CFB53B] rounded-full" />
                        <p className="text-lg leading-relaxed pl-8">
                          DevX Group LLC is a California-based software and IoT development powerhouse built on decades of
                          industry experience and a passion for solving complex challenges. Our team is a hand-selected group of
                          elite professionals chosen not just for their technical expertise but also for their ability to
                          operate with precision, efficiency, and excellence—much like a commando unit.
                        </p>
                      </div>
                    </AnimatedSection>
                    
                    <AnimatedSection delay={0.4}>
                      <div className="relative">
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#CFB53B] to-[#4834D4] rounded-full" />
                        <p className="text-lg leading-relaxed pl-8">
                          What sets us apart is our unique approach. We don&apos;t just work; we deliver solutions. Whether you&apos;re a
                          startup looking to bring an idea to life or an established company with lingering projects or
                          challenging problems, we step in and get the job done.
                        </p>
                      </div>
                    </AnimatedSection>
                    
                    <AnimatedSection delay={0.5}>
                      <div className="relative">
                        <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#4834D4] to-[#9d4edd] rounded-full" />
                        <p className="text-lg leading-relaxed pl-8">
                          At DevX Group LLC, flexibility is key. We can partner with you on a project basis or seamlessly
                          integrate into your team as hourly specialists to tackle your most pressing challenges. Our mission is
                          simple: to provide exceptional results that exceed expectations.
                        </p>
                      </div>
                    </AnimatedSection>
                  </div>
                </div>
              </div>

              {/* Image with Running Line Animation */}
              <div className="order-1 xl:order-2">
                <AnimatedSection delay={0.6}>
                  <div className="relative group">
                    
                    {/* Main image container */}
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                      <Image 
                        src="/images/about/devx-office.jpg" 
                        alt="DevX Group Office" 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                      />
                      
                      {/* Running line animation around image */}
                      <RunningLineAnimation color="#4CD787" duration={4} />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Floating stats cards */}
                    <motion.div
                      className="absolute -top-8 -left-8 bg-[#4CD787] text-black p-4 rounded-2xl shadow-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                      <p className="font-bold text-lg">Founded</p>
                      <p className="text-sm">2024</p>
                    </motion.div>
                    
                    <motion.div
                      className="absolute -bottom-8 -right-8 bg-[#CFB53B] text-black p-4 rounded-2xl shadow-2xl"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.6 }}
                      whileHover={{ scale: 1.05, rotate: -2 }}
                    >
                      <p className="font-bold text-lg">San Diego</p>
                      <p className="text-sm">California</p>
                    </motion.div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-[#4CD787]/20 to-[#CFB53B]/20 rounded-full blur-xl" />
                    <div className="absolute -bottom-16 -left-16 w-24 h-24 bg-gradient-to-br from-[#4834D4]/20 to-[#9d4edd]/20 rounded-full blur-xl" />
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
        className="py-20 relative bg-gradient-to-b from-transparent via-[#0a0a1a] to-transparent"
      >
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Our Values</h2>
            <p className="text-foreground/80">
              Our core values guide everything we do and define how we work with our clients and each other.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={Users}
              title="Customer Obsession"
              description="Our customers are always first in everything we do. We provide support after delivery and build long-term relationships."
              delay={0.1}
            />
            <ValueCard
              icon={Shield}
              title="Responsible & Accountable"
              description="We build long-term relationships with our customers and operate based on the USA standards."
              delay={0.2}
            />
            <ValueCard
              icon={Check}
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
              icon={Zap}
              title="Inventors & Simplifiers"
              description="We prioritize streamlined solutions that ensure rapid delivery while supporting long-term maintainability."
              delay={0.5}
            />
            <ValueCard
              icon={Award}
              title="Highest Standards"
              description="We leverage cutting-edge technology and adhere to the best practices to deliver exceptional customer satisfaction."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#4CD787]/10 rounded-full blur-3xl z-0"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-6 text-[#4CD787]">Our Vision</h3>
                <p className="text-foreground/80 leading-relaxed">
                  To revolutionize software development by delivering innovative, efficient, and scalable solutions that
                  empower businesses worldwide to thrive in a digital-first future.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection
              className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 relative overflow-hidden"
              delay={0.2}
            >
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#4834D4]/10 rounded-full blur-3xl z-0"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-6 text-[#4CD787]">Our Mission</h3>
                <p className="text-foreground/80 leading-relaxed">
                  We aim to simplify the software development journey through a streamlined, result-first process, from
                  free consultation to seamless onboarding and rapid delivery—ensuring our clients&apos; exceptional quality,
                  adaptability, and long-term success.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Our Process</h2>
            <p className="text-foreground/80">
              We follow a proven methodology to ensure successful project delivery every time.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Process timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4CD787]/0 via-[#4CD787] to-[#4CD787]/0 transform -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-16">
              {[
                {
                  number: "01",
                  title: "Discovery",
                  description: "We begin by exploring your goals, challenges, and vision through deep consultation.",
                  image: "/images/about/process-discovery.png",
                },
                {
                  number: "02",
                  title: "Planning",
                  description: "We create a detailed roadmap with timelines, milestones, and resource allocation.",
                  image: "/images/about/process-planning.png",
                },
                {
                  number: "03",
                  title: "Development",
                  description: "Our engineers bring your vision to life — fast, scalable, and future-ready.",
                  image: "/images/about/process-development.png",
                },
                {
                  number: "04",
                  title: "Testing & Launch",
                  description: "We rigorously test and deploy your solution, ensuring a smooth launch.",
                  image: "/images/about/process-testing.png",
                },
                {
                  number: "05",
                  title: "Support & Growth",
                  description: "We provide ongoing maintenance and identify opportunities for enhancement.",
                  image: "/images/about/process-support.png",
                },
              ].map((step, index) => (
                <AnimatedSection key={step.number} delay={index * 0.1}>
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className={`${index % 2 === 1 ? "md:text-right" : ""}`}>
                      <div className="inline-block bg-[#4CD787]/10 text-[#4CD787] text-xl font-bold px-4 py-2 rounded-lg mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                      <p className="text-foreground/80 leading-relaxed">{step.description}</p>
                    </div>

                    <div className="relative">
                      <div className="aspect-video rounded-xl overflow-hidden">
                        <Image 
                          src={step.image || "/placeholder.svg"} 
                          alt={step.title} 
                          fill 
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={false}
                        />
                      </div>

                      {/* Timeline dot for desktop */}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-[calc(50%+12px)] w-6 h-6 bg-[#4CD787] rounded-full border-4 border-black hidden md:block"></div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Our Leadership</h2>
            <p className="text-foreground/80">
              Meet the experienced professionals who lead our team and drive our success.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMemberCard
              name="Alex Sheikhizadeh"
              role="Founder & CEO"
              image="/images/about/ceo-headshot.png"
              delay={0.1}
            />
            <TeamMemberCard name="Sarah Johnson" role="CTO" image="/images/about/cto-headshot.png" delay={0.2} />
            <TeamMemberCard
              name="David Chen"
              role="Lead Developer"
              image="/images/about/lead-dev-headshot.png"
              delay={0.3}
            />
            <TeamMemberCard
              name="Maria Rodriguez"
              role="Project Manager"
              image="/images/about/pm-headshot.png"
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#4CD787]/5 to-[#0a0a1a]"></div>
        <div className="container mx-auto px-4 relative">
          <AnimatedSection className="bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12 max-w-4xl mx-auto text-center">
            <a
              href="#our-values"
              className="inline-block mb-8 bg-[#8A4FFF]/20 hover:bg-[#8A4FFF]/30 text-white border border-[#8A4FFF]/50 px-6 py-2 rounded-full text-sm font-medium transition-colors"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("our-values")?.scrollIntoView({
                  behavior: "smooth",
                })
              }}
            >
              Discover why clients choose us
            </a>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Start Your Project?</h2>
            <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help you achieve your goals with our expert software development services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#4CD787] text-black hover:bg-[#4CD787]/90 px-8 py-3 rounded-lg transition-colors font-medium"
              >
                Get in Touch
              </Link>
              <a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent text-white hover:bg-white/10 px-8 py-3 rounded-lg transition-colors font-medium border border-white/30"
                onClick={(e) => {
                  window.open(
                    "https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05",
                    "_blank",
                  )
                  e.preventDefault()
                }}
              >
                Schedule a Call
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
