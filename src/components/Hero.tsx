"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import ClientOnly from "./ClientOnly"
import dynamic from "next/dynamic"

// Dynamically import components that use browser APIs
const DynamicHeroBackground = dynamic(() => import("./hero/HeroBackground"), { ssr: false })
const DynamicPlanetDivider = dynamic(() => import("./planet/PlanetDivider"), { ssr: false })
const DynamicShootingStars = dynamic(() => import("./hero/ShootingStars"), { ssr: false })

const subheaders = [
  "rapid delivery",
  "workflow automation",
  "ai adoption",
  "stunning design",
  "IoT hardware development",
]

export default function Hero() {
  const [currentSubheader, setCurrentSubheader] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const router = useRouter()

  // Handle typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isTyping) {
      if (displayText.length < subheaders[currentSubheader].length) {
        timer = setTimeout(() => {
          setDisplayText(subheaders[currentSubheader].slice(0, displayText.length + 1))
        }, 150)
      } else {
        setIsTyping(false)
        timer = setTimeout(() => setIsTyping(true), 3000)
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 100)
      } else {
        setCurrentSubheader((prev) => (prev + 1) % subheaders.length)
        setIsTyping(true)
      }
    }
    return () => clearTimeout(timer)
  }, [displayText, currentSubheader, isTyping])

  // Function to navigate to the "Our Values" section in the About page
  const navigateToOurValues = () => {
    router.push("/about#our-values")
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0"></div>

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 pt-20 w-full">
        <div className="text-center mx-auto max-w-4xl">
          {/* Hero content wrapper - this div prevents movement on button hover */}
          <div className="mb-12">
            <motion.h1
              key="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-extralight tracking-wide text-white mb-6 leading-tight whitespace-nowrap text-glow-hero drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hire <span className="crossed-a">a</span> Software Team
            </motion.h1>

            <motion.p
              key="hero-description"
              className="text-xl md:text-2xl text-white font-mono font-light mb-8"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              accelerate your software projects with our expert team.
            </motion.p>

            <motion.div
              key="hero-typewriter"
              className="h-16"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.6 }}
            >
              <p className="text-2xl md:text-3xl font-mono text-robinhood typewriter-text">{displayText}</p>
            </motion.div>
          </div>

          <motion.div
            key="hero-buttons"
            className="flex flex-wrap justify-center gap-4 relative z-30"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={navigateToOurValues}
              className="hero-button bg-blue-500 text-white hover:bg-blue-600 px-8 py-3 rounded-lg font-mono transition-all duration-300 font-medium border border-white/30 hover:border-white hover:shadow-[0_0_15px_rgba(76,215,135,0.5)]"
            >
              learn more
            </button>
            <a
              href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-button bg-robinhood text-black hover:bg-robinhood-90 px-8 py-3 rounded-lg font-mono transition-all duration-300 font-medium border border-black/30 hover:border-black hover:shadow-[0_0_15px_rgba(207,181,59,0.5)]"
            >
              quick start
            </a>
          </motion.div>
        </div>
      </div>

      {/* Planet Divider at the bottom of hero - Only rendered on client */}
      <ClientOnly>
        <div className="absolute bottom-0 left-0 w-full">
          <DynamicPlanetDivider />
        </div>
      </ClientOnly>
    </section>
  )
}
