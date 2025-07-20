"use client"

import { LayoutGroup, motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useCallback, useRef, useMemo } from "react"
import Image from "next/image"
import { AnimatedGradientText } from "./AnimatedGradientText"
import seedrandom from "seedrandom"

const tools = [
  {
    name: "Laravel",
    description: "Quickly build secure web apps with Laravel's powerful features",
    icon: "https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg",
  },
  {
    name: "Figma",
    description: "Design & prototype collaboratively with Figma's robust toolset",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Angular",
    description: "Innovative enterprise solutions with Angular's robust framework",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "React",
    description: "Fast & dynamic user interfaces seamlessly built with React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Flutter",
    description: "Multi-platform apps for mobile, web, & desktop using Flutter",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: ".NET",
    description: "Develop robust, scalable solutions with Microsoft's .NET platform",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  },
  {
    name: "Adobe XD",
    description: "Prototype and design beautiful UX with Adobe XD",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
  },
  {
    name: "Magento",
    description: "Build scalable e-commerce solutions with Magento ecosystem",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/magento/magento-original.svg",
  },
]

// Updated AI tools with proper placeholder SVGs for missing icons
const aiTools = [
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "PyTorch",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "Hugging Face",
    icon: "https://huggingface.co/favicon.ico",
  },
  {
    name: "LangChain",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MiIgaGVpZ2h0PSI3MiIgdmlld0JveD0iMCA0IDcyIDcyIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMzYgNTkuODVMMTIuMTUgNDYuOTJWMjEuMDhMMzYgOC4xNUw1OS44NSAyMS4wOFY0Ni45MkwzNiA1OS44NVoiIGZpbGw9IiMxMEI5ODEiLz48L3N2Zz4=",
  },
  {
    name: "OpenAI",
    icon: "/openai-logo-inspired-abstract.png",
  },
  {
    name: "AutoGPT",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy5wMy5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MiIgaGVpZ2h0PSI3MiIgdmlld0JveD0iMCA0IDcyIDcyIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIGZpbGw9IiMzNDM1NDEiLz48cGF0aCBkPSJNMTggMThIMzZWMzZIMThWMThaIiBmaWxsPSIjMTBCOTgxIi8+PHBhdGggZD0iTTM2IDE4SDU0VjM2SDM2VjE4WiIgZmlsbD0iIzEwQjk4MSIvPjxwYXRoIGQ9Ik0xOCAzNkgzNlY1NEgxOFYzNloiIGZpbGw9IiMxMEI5ODEiLz48cGF0aCBkPSJNMzYgMzZINTRWNTRIMzZWMzZaIiBmaWxsPSIjMTBCOTgxIi8+PC9zdmc+",
  },
  {
    name: "LlamaIndex",
    icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MiIgaGVpZ2h0PSI3MiIgdmlld0JveD0iMCA0IDcyIDcyIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTIgMTJINjBWNjBIMTJWMTJaIiBmaWxsPSIjRkZDQ0RDIi8+PHBhdGggZD0iTTI0IDI0SDQ4VjQ4SDI0VjI0WiIgZmlsbD0iI0ZGRkZGRiIvPjwvc3ZnPg==",
  },
  {
    name: "Anthropic",
    icon: "/anthropic-logo-abstract.png",
  },
  {
    name: "Mistral AI",
    icon: "/mistral-ai-logo-inspired.png",
  },
]

// Duration each tool remains in center
const DISPLAY_DURATION = 6000

export default function DevelopmentTools() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isManual, setIsManual] = useState(false)
  const [safariReady, setSafariReady] = useState(false)

  const cycleRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Memoize star positions and styles to ensure hydration consistency
  const stars = useMemo(() => {
    const rng = seedrandom("devx-stars")
    return Array.from({ length: 60 }).map(() => {
      const size = Math.round((rng() * 2 + 1) * 1000) / 1000
      return {
        width: size,
        height: size,
        left: rng() * 100,
        top: rng() * 100,
        boxShadowSize: Math.round((rng() * 3 + 2) * 1000) / 1000,
        opacity: Math.round((rng() * 0.3 + 0.2) * 1000) / 1000,
        delay: Math.round((rng() * 2) * 1000) / 1000,
        duration: Math.round((3 + rng() * 4) * 1000) / 1000,
      }
    })
  }, [])

  // Initialize safariReady to false
  useEffect(() => {
    const timer = setTimeout(() => {
      setSafariReady(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Automatic cycle
  useEffect(() => {
    const runCycle = () => {
      if (isManual) return
      setActiveIndex((prev) => (prev + 1) % tools.length)
      cycleRef.current = setTimeout(runCycle, DISPLAY_DURATION)
    }
    cycleRef.current = setTimeout(runCycle, DISPLAY_DURATION)
    return () => {
      if (cycleRef.current) clearTimeout(cycleRef.current)
      const timer = timerRef.current
      if (timer) clearTimeout(timer)
    }
  }, [isManual])

  // User click => override
  const handleIconClick = useCallback((index: number) => {
    setIsManual(true)
    setActiveIndex(index)
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    
    // Set new timer
    timerRef.current = setTimeout(() => {
      setIsManual(false)
      timerRef.current = null
    }, DISPLAY_DURATION)
  }, [])

  const activeTool = tools[activeIndex] ?? null
  if (!activeTool) {
    return <div className="text-red-500">No tools found.</div>
  }

  return (
    <LayoutGroup>
      {/* Increased height and added padding for cleaner spacing */}
      <div className="relative w-full min-h-screen bg-black overflow-hidden">
        {" "}
        {/* Changed h-[150vh] to min-h-screen and removed pb-48 */}
        {/* Reduced number of stars and added glow effect */}
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              boxShadow: `0 0 ${star.boxShadowSize}px rgba(255, 255, 255, ${star.opacity})`,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: star.delay,
            }}
          />
        ))}
        {/* Increased top padding from py-9 to pt-16 pb-9 to push title down */}
        <div className="pt-16 pb-8">
          {" "}
          {/* Reduced pt-24 to pt-16 */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold mb-4 font-['IBM_Plex_Mono'] text-center relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-[#CFB53B]/30 after:bottom-[-20px] after:left-1/2 after:-translate-x-1/2"
          >
            <AnimatedGradientText>DevX Development Tools</AnimatedGradientText>
          </motion.h3>
        </div>
        {/* ============ Center black circle with glowing border ============ */}
        {/* Moved center position from top-1/2 to top-[55%] to push it down */}
        <div
          className="
            absolute z-30
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[55vw] h-[55vw] max-w-[300px] max-h-[300px]
            rounded-full bg-black text-white
            flex items-center justify-center text-center p-6 shadow-md
          "
        >
          {/* 
            Pulsing outer border - enhanced for tablet visibility
          */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full border-4"
            style={{ borderColor: "rgba(255, 255, 255, 0.7)" }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 10px rgba(255,255,255,0.4)",
                "0 0 30px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.4)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          {/* 
            "Black hole lines" inside => rotating arcs, 
            now at slightly bigger radii, faster spin, higher opacity for tablet visibility
          */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{
              duration: 6, // faster spin
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" className="opacity-70">
              {" "}
              {/* Increased from 0.5 to 0.7 */}
              {/* 
                Larger arcs => r=50,70,90. 
                Higher opacities for tablet visibility
              */}
              <circle
                cx="100"
                cy="100"
                r="50"
                stroke="rgba(255,255,255,0.25)" // Increased from 0.15 to 0.25
                strokeWidth="2"
                strokeDasharray="30 10"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                stroke="rgba(255,255,255,0.25)" // Increased from 0.15 to 0.25
                strokeWidth="2"
                strokeDasharray="50 20"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="rgba(255,255,255,0.25)" // Increased from 0.15 to 0.25
                strokeWidth="2"
                strokeDasharray="40 30"
                fill="none"
              />
            </svg>
          </motion.div>

          {/* 
            AnimatePresence for the tool's name/desc in center 
          */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="px-4 flex flex-col items-center"
            >
              {/* The icon above title (shared layout => ring->center) */}
              <motion.div
                layoutId={`icon-${activeTool.name}`}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 30,
                  layout: { duration: 0.6 },
                }}
                className="mb-3"
              >
                <div className="relative w-12 h-12">
                  <Image
                    src={activeTool.icon || "/placeholder.svg"}
                    alt={activeTool.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              <h2 className="text-lg sm:text-xl font-semibold mb-2">{activeTool.name}</h2>
              <p className="text-xs sm:text-sm text-gray-100/90 leading-snug">{activeTool.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* ============ Orbiting Icons ============ */}
        {/* Moved center position from top-1/2 to top-[55%] to push it down */}
        <StaticIconsOrbit tools={tools} activeIndex={activeIndex} onIconClick={handleIconClick} />
        {/* ============ Outer AI Tools Orbit ============ */}
        {/* Moved center position from top-1/2 to top-[55%] to push it down */}
        <AIToolsOrbit />
      </div>
    </LayoutGroup>
  )
}

/**
 * Static Icons orbit - no rotation animation
 */
function StaticIconsOrbit({
  tools,
  activeIndex,
  onIconClick,
}: {
  tools: typeof tools
  activeIndex: number
  onIconClick: (index: number) => void
}) {
  const radius = 230

  return (
    <div className="absolute z-20 top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2">
      {tools.map((tool, i) => {
        if (i === activeIndex) return null
        const angle = (i * 360) / tools.length
        const radian = (angle * Math.PI) / 180

        // Calculate position using trigonometry for precise placement
        const x = Math.cos(radian) * radius
        const y = Math.sin(radian) * radius

        return (
          <motion.div
            key={tool.name}
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              layoutId={`icon-${tool.name}`}
              onClick={() => onIconClick(i)}
              className="w-16 h-16 rounded-full bg-gray-800 shadow border border-gray-500 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 24,
                layout: { duration: 0.6 },
              }}
            >
              <div className="relative w-8 h-8">
                <Image src={tool.icon || "/placeholder.svg"} alt={tool.name} fill className="object-contain" />
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

/**
 * AI Tools in an outer orbit
 * Slower rotation, larger radius, with labels that move with their icons
 */
function AIToolsOrbit() {
  // Larger radius for the outer orbit
  const radius = 380 // Increased from 230 for the inner orbit
  const [rotation, setRotation] = useState(0)
  const orbitRef = useRef<HTMLDivElement>(null)

  // Use useEffect to animate the rotation with a fixed time step
  useEffect(() => {
    let lastTime = performance.now()
    const rotationSpeed = 0.005 // degrees per millisecond (slower than inner orbit)

    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      // Use a fixed rotation increment for stability
      setRotation((prev) => (prev + rotationSpeed * deltaTime) % 360)
      requestAnimationFrame(animate)
    }

    const animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div
      ref={orbitRef}
      className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: 0,
        height: 0,
        transform: `rotate(${rotation}deg)`,
        willChange: "transform", // Optimize for animation performance
      }}
    >
      {aiTools.map((tool, i) => {
        const angle = (i * 360) / aiTools.length
        return (
          <div
            key={tool.name}
            className="absolute"
            style={{
              top: 0,
              left: 0,
              width: 0,
              height: 0,
              transform: `rotate(${angle}deg) translateX(${radius}px)`,
            }}
          >
            {/* Container that counter-rotates to keep both icon and label upright */}
            <div
              className="absolute"
              style={{
                transform: `rotate(-${angle + rotation}deg)`,
                width: 0,
                height: 0,
              }}
            >
              {/* Main icon container */}
              <motion.div
                className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full bg-gray-900/80 backdrop-blur-sm shadow border border-[#4CD787]/30 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                {/* Glowing effect - enhanced for tablet visibility */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(76, 215, 135, 0.4)",
                      "0 0 15px rgba(76, 215, 135, 0.6)",
                      "0 0 5px rgba(76, 215, 135, 0.4)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />

                {/* Icon */}
                <div className="relative w-7 h-7">
                  <Image src={tool.icon || "/placeholder.svg"} alt={tool.name} fill className="object-contain" />
                </div>
              </motion.div>

              {/* Tool name label - moves with the icon but stays below it */}
              <div className="absolute whitespace-nowrap top-12 left-0 -translate-x-1/2 mt-1">
                <span className="text-xs text-white/80 bg-black/70 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {tool.name}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
