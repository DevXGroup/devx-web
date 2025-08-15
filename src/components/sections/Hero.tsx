'use client'

import { useEffect, useCallback } from 'react'
import { motion, useReducedMotion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ClientOnly from '@layout/ClientOnly'
import dynamic from 'next/dynamic'
import StarBorder from '@animations/StarBorder'
import TextType from '@animations/TextType'

// Dynamically import components that use browser APIs with better loading states
const DynamicHeroBackground = dynamic(() => import('../hero/HeroBackground'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
  ),
})
const DynamicPlanetDivider = dynamic(() => import('../planet/PlanetDivider'), {
  ssr: false,
  loading: () => (
    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
  ),
})
const DynamicShootingStars = dynamic(() => import('../hero/ShootingStars'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 opacity-50" />,
})

const subheaders = [
  'Rapid MVP Development',
  'AI-Powered Automation',
  'Scalable Cloud Solutions',
  'Engaging Mobile Apps',
  'IoT & Hardware Integration',
  'Stunning UI/UX Design',
]

// Enhanced animation variants for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smoother animation
    },
  },
}

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  tap: { scale: 0.98 },
}

export default function Hero() {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimation()

  // Function to navigate to the "Our Values" section in the About page
  const navigateToOurValues = useCallback(() => {
    router.push('/about#our-values')
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
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 pt-16 sm:pt-20 w-full"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center mx-auto max-w-full px-4">
          {/* Hero content wrapper - this div prevents movement on button hover */}
          <div className="sm:mb-12">
            <motion.h1
              variants={itemVariants}
              className="hero-title text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] xl:text-[10rem] 2xl:text-[12rem] font-mono font-normal tracking-tight text-white sm:mb-6 leading-tight md:whitespace-nowrap text-glow-hero drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] px-2 sm:px-0"
            >
              Your Vision, <span style={{ color: '#ccff00' }}>Engineered.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl text-white font-mono font-light mb-10 sm:mb-12 md:mb-16 px-2 sm:px-0 leading-relaxed mt-16"
            >
              elite software development team.
              <br />
              build, launch, and scale your vision.
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="h-12 sm:h-16 mb-6 sm:mb-8 mt-8 sm:mt-12 md:mt-16 lg:h-auto lg:mb-0 lg:mt-0 lg:flex lg:justify-center lg:items-center lg:my-16 xl:my-20"
          >
            <TextType
              text={subheaders}
              as="p"
              typingSpeed={shouldReduceMotion ? 40 : 80}
              deletingSpeed={shouldReduceMotion ? 25 : 50}
              pauseDuration={shouldReduceMotion ? 800 : 2000}
              className="text-xl sm:text-2xl md:text-3xl font-mono text-robinhood typewriter-text px-2 sm:px-0"
              showCursor={true}
              cursorCharacter="_"
              cursorClassName=""
              loop={true}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 relative z-50 mt-8 md:mt-12 lg:-mt-8 xl:-mt-12 transform lg:scale-110 xl:scale-120"
          >
            <motion.div variants={buttonVariants} initial="rest" whileHover="hover" whileTap="tap">
              <StarBorder
                as="a"
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                color="#ccff00"
                speed="3s"
                className="font-mono font-bold text-xs text-white hover:text-robinhood"
              >
                Schedule a Strategy Call
              </StarBorder>
            </motion.div>
            <motion.div variants={buttonVariants} initial="rest" whileHover="hover" whileTap="tap">
              <StarBorder
                onClick={navigateToOurValues}
                color="#9d4edd"
                speed="4s"
                className="font-mono font-bold text-xs text-white hover:text-blue-500"
              >
                See Our Work
              </StarBorder>
            </motion.div>
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
