"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Rocket, User, Layers, Search, Flag, ArrowRight } from "lucide-react"
import Link from "next/link"
import InfinityLogo from "./InfinityLogo"

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
  return (
    <motion.div
      key={`step-${step}`}
      initial={{ opacity: 1, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center space-y-3 ${
        isActive ? "text-black scale-110" : "text-black/60"
      } transition-all duration-300`}
    >
      <div
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${
          isActive ? "bg-black text-white text-xl" : "bg-white/20 text-robinhood text-lg"
        } flex items-center justify-center transition-all duration-300`}
      >
        {step}
      </div>
      <p
        className={`text-sm md:text-base font-['IBM_Plex_Mono'] transition-colors duration-300 ${isActive ? "font-bold" : ""}`}
      >
        {text}
      </p>
    </motion.div>
  )
}

function Card({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-[#1a2e00]/90 p-8 md:p-10 rounded-2xl flex flex-col items-start text-left shadow-lg w-full h-full"
    >
      <div className="flex items-start mb-6">
        <div className="bg-[#ccff00]/90 rounded-full w-16 h-16 flex items-center justify-center mr-4 aspect-square shrink-0">
          <Icon className="w-8 h-8 text-black" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-[#ccff00] font-['IBM_Plex_Mono'] mb-2">{title}</h3>
          <p className="text-white/80 font-['IBM_Plex_Mono'] text-base">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function WhyUsCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-black/80 p-8 md:p-10 rounded-2xl flex flex-col items-start text-left shadow-lg w-full h-full"
    >
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 mr-4 flex items-center justify-center bg-robinhood rounded-full group-hover:scale-110 transition-transform aspect-square shrink-0">
          <Icon className="w-8 h-8 text-black" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-robinhood font-['IBM_Plex_Mono']">{title}</h3>
      </div>
      <p className="text-white/80 font-['IBM_Plex_Mono'] text-base">{description}</p>
    </motion.div>
  )
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  const [currentStep, setCurrentStep] = useState(0)
  const steps = ["Talk to us", "Plan together", "Build something great"]

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
    }, 2000)

    return () => clearInterval(timer)
  }, [])

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
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-24 md:mb-28 max-w-5xl mx-auto">
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
        </div>

        {/* Improved Step Animation */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12 mb-24 md:mb-28 bg-black/20 py-10 px-4 md:px-8 rounded-xl max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex justify-center">
              <StepAnimation step={index + 1} text={step} isActive={currentStep === index} />
            </div>
          ))}
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

          <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto px-4">
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
          </div>

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
            We're ready to transform your vision into reality.
          </p>
          <p className="text-black text-xl md:text-2xl font-['IBM_Plex_Mono']">
            Let's embark on this journey together!
          </p>
        </div>
      </motion.div>
      <div className="mt-20">
        <InfinityLogo />
      </div>
    </section>
  )
}
