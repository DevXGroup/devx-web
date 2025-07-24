"use client"

import { useEffect, useCallback } from "react"
import { motion, useReducedMotion, useAnimation } from "framer-motion"
import { useRouter } from "next/navigation"
import ClientOnly from "./ClientOnly"
import dynamic from "next/dynamic"
import TextType from "./TextType"

// Dynamically import components that use browser APIs with better loading states
const DynamicHeroBackground = dynamic(() => import("./hero/HeroBackground"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
})
const DynamicPlanetDivider = dynamic(() => import("./planet/PlanetDivider"), { 
  ssr: false,
  loading: () => <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
})
const DynamicShootingStars = dynamic(() => import("./hero/ShootingStars"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 opacity-50" />
})

const subheaders = [
  "rapid delivery",
  "workflow automation",
  "ai adoption",
  "agentic ai",
  "stunning design",
  "IoT hardware development",
]

// Enhanced animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] // Custom easing for smoother animation
    }
  }
}

const buttonVariants = {
  rest: { scale: 1, boxShadow: "0 0 0px rgba(76,215,135,0)" },
  hover: { 
    scale: 1.05,
    boxShadow: "0 0 20px rgba(76,215,135,0.4)",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  tap: { scale: 0.95 }
}

export default function Hero() {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimation()

  // Function to navigate to the "Our Values" section in the About page
  const navigateToOurValues = useCallback(() => {
    router.push("/about#our-values")
  }, [router])
  
  // Trigger entrance animation
  useEffect(() => {
    controls.start('visible')
  }, [controls])

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 tech-flow"></div>

      {/* 3D Background - Only rendered on client */}
      <ClientOnly>
        <div className="absolute inset-0 w-full h-full">
          <DynamicHeroBackground />
        </div>
      </ClientOnly>

      {/* Shooting Stars - Only rendered on client */}
      <ClientOnly>
        <DynamicShootingStars />
      </ClientOnly>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 pt-20 w-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center mx-auto max-w-4xl">
          {/* Hero content wrapper - this div prevents movement on button hover */}
          <div className="mb-12">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-extralight tracking-wide text-white mb-6 leading-tight md:whitespace-nowrap text-glow-hero drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
            >
              Hire <span className="crossed-a">a</span> Software Team
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-white font-mono font-light mb-8"
            >
              accelerate your software projects with our expert team.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="h-16"
            >
              <TextType
                text={subheaders}
                as="p"
                typingSpeed={shouldReduceMotion ? 40 : 80}
                deletingSpeed={shouldReduceMotion ? 25 : 50}
                pauseDuration={shouldReduceMotion ? 800 : 2000}
                className="text-2xl md:text-3xl font-mono text-robinhood typewriter-text"
                showCursor={true}
                cursorCharacter="_"
                cursorClassName=""
                loop={true}
              />
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 relative z-30"
          >
            <motion.button
              onClick={navigateToOurValues}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="hero-button bg-blue-500 text-white hover:bg-blue-600 px-8 py-3 rounded-lg font-mono font-medium border border-white/30 hover:border-white transition-colors duration-300"
            >
              learn more
            </motion.button>
            <motion.a
              href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
              target="_blank"
              rel="noopener noreferrer"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="hero-button bg-robinhood text-black hover:bg-robinhood-90 px-8 py-3 rounded-lg font-mono font-medium border border-black/30 hover:border-black transition-colors duration-300"
            >
              quick start
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Planet Divider at the bottom of hero - Only rendered on client */}
      <ClientOnly>
        <div className="absolute bottom-0 left-0 w-full">
          <DynamicPlanetDivider />
        </div>
      </ClientOnly>
    </section>
  )
}
