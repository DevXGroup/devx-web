"use client"

import { motion, useScroll, useTransform, useReducedMotion, useInView, useMotionValue } from "framer-motion"
import { useRef, useEffect, useState, useMemo } from "react"
import { Rocket, User, Layers, Search, Flag, ArrowRight } from "lucide-react"
import Link from "next/link"
import InfinityLogo from "./InfinityLogo"
import RotatingText from "./RotatingText"

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
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

// Black falling stars component - pure CSS implementation
function BlackFallingStars() {
  return (
    <div className="black-stars-container">
      <div className="black-stars-layer black-stars-small"></div>
      <div className="black-stars-layer black-stars-medium"></div>
      <div className="black-stars-layer black-stars-large"></div>
    </div>
  )
}

function StepAnimation({ step, text, isActive }: { step: number; text: string; isActive: boolean }) {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      key={`step-${step}`}
      className={`flex flex-col items-center space-y-4 transition-all duration-700 ease-in-out ${
        isActive ? "text-black" : "text-black/40"
      }`}
    >
      {/* Step Circle - Simple lamp effect */}
      <motion.div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-lg md:text-xl font-bold font-['IBM_Plex_Mono'] transition-all duration-700 ease-in-out ${
          isActive 
            ? "bg-black text-white shadow-lg shadow-black/30" 
            : "bg-black/20 text-black/50 border-2 border-black/30"
        }`}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      >
        {step}
      </motion.div>
      
      {/* Step Text */}
      <p
        className={`text-sm md:text-base font-['IBM_Plex_Mono'] text-center transition-all duration-700 ${
          isActive ? "font-bold" : "font-normal"
        }`}
      >
        {text}
      </p>
    </motion.div>
  )
}

function Card({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      variants={cardVariants}
      className="bg-[#1a2e00]/90 p-8 md:p-10 rounded-2xl flex flex-col items-start text-left shadow-lg w-full h-full hover:bg-[#1a2e00]/95 transition-colors duration-300 group"
      whileHover={shouldReduceMotion ? {} : { 
        y: -5,
        boxShadow: "0 20px 40px rgba(204, 255, 0, 0.1)"
      }}
    >
      <div className="flex items-start mb-6">
        <motion.div 
          className="bg-[#ccff00]/90 rounded-full w-16 h-16 flex items-center justify-center mr-4 aspect-square shrink-0 group-hover:bg-[#ccff00] transition-colors duration-300"
          whileHover={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Icon className="w-8 h-8 text-black" />
        </motion.div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#ccff00] font-['IBM_Plex_Mono'] mb-2 group-hover:text-white transition-colors duration-300">{title}</h3>
          <p className="text-white/80 font-['IBM_Plex_Mono'] text-base group-hover:text-white/90 transition-colors duration-300">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function WhyUsCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.div
      variants={cardVariants}
      className="bg-black/80 p-8 md:p-10 rounded-2xl flex flex-col items-start text-left shadow-lg w-full h-full hover:bg-black/90 transition-colors duration-300 group backdrop-blur-sm"
      whileHover={shouldReduceMotion ? {} : { 
        y: -8,
        boxShadow: "0 25px 50px rgba(204, 255, 0, 0.15)"
      }}
    >
      <div className="flex items-center mb-6">
        <motion.div 
          className="w-16 h-16 mr-4 flex items-center justify-center bg-robinhood rounded-full aspect-square shrink-0 group-hover:bg-robinhood/90 transition-colors duration-300"
          whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Icon className="w-8 h-8 text-black" />
        </motion.div>
        <h3 className="text-xl md:text-2xl font-bold text-robinhood font-['IBM_Plex_Mono'] group-hover:text-white transition-colors duration-300">{title}</h3>
      </div>
      <p className="text-white/80 font-['IBM_Plex_Mono'] text-base group-hover:text-white/90 transition-colors duration-300">{description}</p>
    </motion.div>
  )
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  
  // Always call useScroll to maintain hooks order
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  const [currentStep, setCurrentStep] = useState(0)
  const steps = ["Talk to us", "Plan together", "Build something great"]

  const [isMounted, setIsMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Memoize animation timing based on reduced motion preference
  const animationTiming = useMemo(() => ({
    stepInterval: shouldReduceMotion ? 5000 : 3500, // Longer intervals for better UX
    cardDelay: shouldReduceMotion ? 0 : 0.1
  }), [shouldReduceMotion])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
    }, animationTiming.stepInterval)

    return () => clearInterval(timer)
  }, [animationTiming.stepInterval, steps.length])

  return (
    <section ref={containerRef} className="relative py-28 md:py-32 overflow-hidden bg-robinhood w-full">
      {/* Black falling stars */}
      <BlackFallingStars />

      {/* Main Content */}
      <motion.div
        style={{
          opacity: isMounted ? opacity : 1,
          y: isMounted ? y : 0,
        }}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative container mx-auto px-4 z-10 max-w-6xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-24 md:mb-28">
          {/* Fixed title visibility with inline styles */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 font-['IBM_Plex_Mono'] text-black"
            style={{
              textShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              WebkitTextStroke: "1px rgba(0, 0, 0, 0.3)",
            }}
          >
            Hire elite developers, effortlessly.
          </h2>
        </div>

        {/* Cards Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20 max-w-5xl mx-auto"
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
            <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-black text-black" style={{
              marginRight: '5px'
            }}>
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
                  <StepAnimation 
                    step={index + 1} 
                    text={step} 
                    isActive={currentStep === index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Us Section */}
        <div id="why-devx-section" className="text-center mb-24 md:mb-28">
          {/* Fixed title visibility with inline styles */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-['IBM_Plex_Mono'] text-black pb-3"
            style={{
              textShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              WebkitTextStroke: "1px rgba(0, 0, 0, 0.3)",
            }}
          >
            Why choose DevX?
          </h2>
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-black/80 text-lg md:text-xl mb-4 font-['IBM_Plex_Mono']">
              Finding a dependable long-term tech team is hard.
            </p>
            <p className="text-black text-lg md:text-xl font-['IBM_Plex_Mono']">
              We made it simple — and built to scale with you.
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto px-4"
            variants={containerVariants}
          >
            <WhyUsCard
              icon={Flag}
              title="USA Based"
              description="Based in San Diego, USA — operating with top-tier industry standards"
            />
            <WhyUsCard
              icon={Search}
              title="Hand-Picked Team"
              description="Vetted experts, hand-picked for precision, speed, and trust"
            />
            <WhyUsCard
              icon={Layers}
              title="Full Stack Expertise"
              description="Experts in modern and legacy stacks — from MVP to enterprise-scale systems"
            />
          </motion.div>

          {/* Added link to About page */}
          <div className="mt-12 text-center">
            <Link
              href="/about#our-values"
              className="inline-flex items-center gap-2 bg-[#8A4FFF]/20 hover:bg-[#8A4FFF]/30 hover:border-[#1a2e00] hover:border-2 text-[#1a2e00] border border-[#8A4FFF]/50 px-6 py-3 rounded-lg text-sm font-medium transition-all"
            >
              Explore more reasons to choose us
              <ArrowRight className="w-4 h-4" />
            </Link>
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
