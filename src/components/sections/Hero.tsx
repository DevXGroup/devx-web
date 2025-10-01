'use client'

import { useEffect, useCallback } from 'react'
import { motion, useReducedMotion, useAnimation } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ClientOnly from '@layout/ClientOnly'
import dynamic from 'next/dynamic'
import StarBorder from '@animations/StarBorder'
import TextType from '@animations/TextType'
import ShinyText from '@/components/ui/ShinyText'

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

const subheaders = ['Stunning UI/UX', 'Rapid MVP Launches', 'AI Automation']

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
    },
  },
}

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.98 },
}

export default function Hero() {
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()
  const controls = useAnimation()

  // Function to navigate to the portfolio page
  const navigateToPortfolio = useCallback(() => {
    router.push('/portfolio')
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
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-[80] w-full py-20 sm:py-24 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center mx-auto w-full px-[50px] space-y-7 sm:space-y-9 pt-6 sm:pt-10 flex flex-col items-center justify-center">
          {/* Hero content wrapper - this div prevents movement on button hover */}
          <div className="space-y-5 sm:space-y-7">
            <motion.h1
              variants={itemVariants}
              className="hero-title mx-auto flex flex-nowrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-center text-white font-mono font-bold tracking-tight w-full whitespace-nowrap"
            >
              <span
                className="inline-block"
                style={{
                  textShadow:
                    '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.2), 0 0 120px rgba(255,255,255,0.1)',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))',
                }}
              >
                Your Vision,
              </span>
              <span
                className="inline-block"
                style={{
                  color: '#ccff00',
                  textShadow:
                    '0 0 40px rgba(204,255,0,0.4), 0 0 80px rgba(204,255,0,0.3), 0 0 120px rgba(204,255,0,0.2)',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))',
                }}
              >
                Engineered.
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="text-center w-full mx-auto space-y-5">
              <p className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl text-white font-sans font-light leading-relaxed text-center mx-auto max-w-4xl">
                Elite software team shipping polished software at&nbsp;startup&nbsp;speed.
              </p>
              <div className="relative mx-auto w-full mt-10 flex justify-center">
                <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-6 py-3 rounded-full">
                  <Link
                    href="/services"
                    className="uppercase tracking-[0.19em] text-base sm:text-lg md:text-lg lg:text-lg font-medium opacity-90 hover:opacity-100"
                  >
                    <ShinyText text="Elite Services" speed={3} delay={0.3} />
                  </Link>
                  <span className="hidden sm:inline text-gray-600 text-base md:text-lg lg:text-lg">
                    •
                  </span>
                  <Link
                    href="/portfolio"
                    className="uppercase tracking-[0.19em] text-base sm:text-lg md:text-lg lg:text-lg font-medium opacity-90 hover:opacity-100"
                  >
                    <ShinyText text="Proven Record" speed={5} delay={0.6} />
                  </Link>

                  <span className="hidden md:inline text-gray-600 text-base md:text-lg lg:text-lg">
                    •
                  </span>
                  <Link
                    href="/pricing"
                    className="uppercase tracking-[0.19em] text-base sm:text-lg md:text-lg lg:text-lg font-medium opacity-90 hover:opacity-100"
                  >
                    <ShinyText text="Competitive Pricing" speed={7} delay={0.9} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] mt-3 sm:mt-4 md:mt-5 flex justify-center items-center w-full"
          >
            <TextType
              text={subheaders}
              as="p"
              typingSpeed={shouldReduceMotion ? 40 : 80}
              deletingSpeed={shouldReduceMotion ? 25 : 50}
              pauseDuration={shouldReduceMotion ? 800 : 2000}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-mono text-[#ccff00] typewriter-text tracking-[0.08em] text-center mx-auto"
              showCursor={true}
              cursorCharacter="_"
              cursorClassName=""
              loop={true}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-row flex-wrap justify-center gap-4 sm:gap-5 relative z-[120] mt-6 sm:mt-7"
          >
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="relative z-[130]"
            >
              <StarBorder
                as="a"
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                color="#ccff00"
                speed="3s"
                className="font-mono font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl px-3 py-1"
              >
                Book a Free Call
              </StarBorder>
            </motion.div>
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="relative z-[130]"
            >
              <StarBorder
                onClick={navigateToPortfolio}
                color="#e534eb"
                speed="4s"
                className="font-mono font-semibold text-lg sm:text-xl md:text-xl lg:text-2xl px-3 py-1"
              >
                See Our Work
              </StarBorder>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Planet Divider at the bottom of hero - Only rendered on client */}
      <ClientOnly>
        <div className="absolute bottom-0 left-0 w-full z-50">
          <DynamicPlanetDivider />
        </div>
      </ClientOnly>
      <style jsx>{`
        .link-gradient {
          background: linear-gradient(120deg, #4cd787, #9d4edd, #ccff00, #4cd787);
          background-size: 250% 250%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: linkGradient 8s ease-in-out infinite;
        }

        @keyframes linkGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  )
}
