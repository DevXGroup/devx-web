'use client'

import { LayoutGroup, motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import Image from 'next/image'
import seedrandom from 'seedrandom'
import LogoLoop from '@animations/LogoLoop'

const buildIconPath = (file: string) => `/images/tech/${file}`

const tools = [
  {
    name: 'Laravel',
    description: "Quickly build secure web apps with Laravel's powerful features",
    icon: buildIconPath('laravel.svg'),
  },
  {
    name: 'Figma',
    description: "Design & prototype collaboratively with Figma's robust toolset",
    icon: buildIconPath('figma.svg'),
  },
  {
    name: 'Angular',
    description: "Innovative enterprise solutions with Angular's robust framework",
    icon: buildIconPath('angular.svg'),
  },
  {
    name: 'React',
    description: 'Fast & dynamic user interfaces seamlessly built with React',
    icon: buildIconPath('react.svg'),
  },
  {
    name: 'Flutter',
    description: 'Multi-platform apps for mobile, web, & desktop using Flutter',
    icon: buildIconPath('flutter-icon.svg'),
  },
  {
    name: '.NET',
    description: "Develop robust, scalable solutions with Microsoft's .NET platform",
    icon: buildIconPath('dotnet.svg'),
  },
  {
    name: 'Adobe XD',
    description: 'Prototype and design beautiful UX with Adobe XD',
    icon: buildIconPath('adobe-xd.svg'),
  },
  {
    name: 'Magento',
    description: 'Build scalable e-commerce solutions with Magento ecosystem',
    icon: buildIconPath('magento-icon.svg'),
  },
]

// Updated AI tools with better logos and descriptions
type AITool = {
  name: string
  description: string
  icon: string
  wrapperClassName?: string
  imageClassName?: string
  grayscale?: boolean
  loopWrapperClassName?: string
  loopImageClassName?: string
}

const aiTools: AITool[] = [
  {
    name: 'OpenAI',
    description: "Integrate powerful AI models with OpenAI's cutting-edge APIs",
    icon: buildIconPath('openai.svg'),
    wrapperClassName: 'p-2 bg-[#071b16] border border-[#10A37F]/60 shadow-[0_0_12px_rgba(16,163,127,0.25)]',
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'Anthropic',
    description: 'Build trustworthy AI agents with Claude and the Anthropic API',
    icon: buildIconPath('anthropic.svg'),
    wrapperClassName: 'p-2 bg-[#2a0c05] border border-[#ff4218]/60 shadow-[0_0_12px_rgba(255,66,24,0.2)]',
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'Hugging Face',
    description: 'Launch community and enterprise AI models through Hugging Face',
    icon: buildIconPath('huggingface.svg'),
    wrapperClassName: 'p-2 bg-black/60 border border-[#ffb23c]/60 shadow-[0_0_12px_rgba(255,178,60,0.16)]',
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'Ollama',
    description: 'Run open-source LLMs locally with Ollama for rapid prototyping',
    icon: buildIconPath('ollama.svg'),
    wrapperClassName: 'p-2 bg-[#0f1b24] border border-[#4cd787]/50 shadow-[0_0_12px_rgba(76,215,135,0.2)]',
    imageClassName: 'invert brightness-[1.25] contrast-[0.9]',
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
    loopImageClassName: 'invert brightness-[1.25] contrast-[0.9]',
  },
  {
    name: 'Google AI Studio',
    description: 'Ship Gemini-powered experiences using Google AI Studio tooling',
    icon: buildIconPath('google-ai-studio.svg'),
    wrapperClassName:
      'p-2 bg-[#0b0d21]/80 border border-[#5f6bff]/50 shadow-[0_0_14px_rgba(95,107,255,0.28)]',
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'TensorFlow',
    description: "Build and deploy ML models with Google's TensorFlow platform",
    icon: buildIconPath('tensorflow.svg'),
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'PyTorch',
    description: 'Dynamic neural networks and deep learning with PyTorch',
    icon: buildIconPath('pytorch.svg'),
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'LangChain',
    description: 'Orchestrate multi-modal AI workflows with LangChain frameworks',
    icon: buildIconPath('langchain.svg'),
    wrapperClassName:
      'p-2 bg-[#0d2b24] border border-[#00c897]/60 backdrop-blur-sm shadow-[0_0_12px_rgba(0,200,151,0.22)]',
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'Python',
    description: 'Versatile programming language for AI, web, and data science',
    icon: buildIconPath('python.svg'),
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'Docker',
    description: 'Containerize applications for consistent deployment environments',
    icon: buildIconPath('docker.svg'),
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'AWS',
    description: 'Cloud computing services for scalable infrastructure solutions',
    icon: buildIconPath('aws.svg'),
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'MongoDB',
    description: 'NoSQL database for modern application development',
    icon: buildIconPath('mongodb.svg'),
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
]

type OrbitMetrics = {
  radius: number
  offset: number
}

const getInnerOrbitMetrics = (width: number): OrbitMetrics => {
  if (width < 640) return { radius: 150, offset: -110 }
  if (width < 768) return { radius: 180, offset: -120 }
  if (width < 1024) return { radius: 210, offset: -130 }
  return { radius: 230, offset: -140 }
}

const getOuterOrbitMetrics = (width: number, inner: OrbitMetrics): OrbitMetrics => {
  const offsetAdjustment = -32
  if (width < 640) return { radius: inner.radius + 70, offset: inner.offset + offsetAdjustment }
  if (width < 768) return { radius: inner.radius + 85, offset: inner.offset + offsetAdjustment }
  if (width < 1024) return { radius: inner.radius + 100, offset: inner.offset + offsetAdjustment }
  return { radius: inner.radius + 120, offset: inner.offset + offsetAdjustment }
}

// Duration each tool remains in center
const DISPLAY_DURATION = 3500

export default function DevelopmentTools() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isManual, setIsManual] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [transitionData, setTransitionData] = useState<{
    from: { x: number; y: number }
    to: { x: number; y: number }
    tool: any
  } | null>(null)
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  )

  const cycleRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const innerMetrics = useMemo(() => getInnerOrbitMetrics(viewportWidth), [viewportWidth])
  const outerMetrics = useMemo(() => getOuterOrbitMetrics(viewportWidth, innerMetrics), [viewportWidth, innerMetrics])

  // Handle mounting for hydration safety
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => setViewportWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Move stars generation to component level
  const stars = useMemo(() => {
    const rng = seedrandom('devx-stars') // seed to ensure deterministic output
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      width: rng() * 2 + 1,
      height: rng() * 2 + 1,
      left: rng() * 100,
      top: rng() * 100,
      boxShadow: `0 0 ${rng() * 3 + 2}px rgba(255, 255, 255, ${rng() * 0.3 + 0.2})`,
      duration: 3 + rng() * 4,
      delay: rng() * 2,
    }))
  }, [])

  // IntersectionObserver to detect when section is visible
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '200px 0px 200px 0px', // Start animation well before fully visible
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [mounted])

  // Automatic cycle with black hole transition animation - only when visible
  useEffect(() => {
    // Clear any existing cycle timer first
    if (cycleRef.current) {
      clearTimeout(cycleRef.current)
      cycleRef.current = null
    }

    // Don't start cycle if not visible
    if (!isVisible) {
      return
    }

    const runCycle = () => {
      if (isManual || transitioning || !isVisible) {
        // Keep the cycle alive while user interaction/transition is in progress or when not visible
        if (isVisible) {
          cycleRef.current = setTimeout(runCycle, 250)
        }
        return
      }

      // Calculate next tool and its orbit position
      const nextIndex = (activeIndex + 1) % tools.length
      const nextTool = tools[nextIndex]
      const angle = (nextIndex * 360) / tools.length
      const radian = (angle * Math.PI) / 180

      const { radius } = innerMetrics

      const fromX = Math.cos(radian) * radius
      const fromY = Math.sin(radian) * radius

      // Start transition animation
      setTransitionData({
        from: { x: fromX, y: fromY },
        to: { x: 0, y: 0 },
        tool: nextTool,
      })
      setTransitioning(true)

      // After transition, update active index
      setTimeout(() => {
        setActiveIndex(nextIndex)
        setTransitioning(false)
        setTransitionData(null)

        // Schedule next cycle
        cycleRef.current = setTimeout(runCycle, DISPLAY_DURATION)
      }, 1200)
    }

    // Start the cycle
    cycleRef.current = setTimeout(runCycle, DISPLAY_DURATION)

    return () => {
      if (cycleRef.current) clearTimeout(cycleRef.current)
      // Do not clear timerRef here, it controls resuming after manual clicks
    }
  }, [isManual, activeIndex, transitioning, isVisible, innerMetrics])

  // User click => trigger transition animation
  const handleIconClick = useCallback(
    (index: number) => {
      if (transitioning || index === activeIndex) return

      setIsManual(true)

      // Pause any pending auto-cycle tick during manual interaction
      if (cycleRef.current) {
        clearTimeout(cycleRef.current)
        cycleRef.current = null
      }

      // Calculate clicked tool's position
      const clickedTool = tools[index]
      const angle = (index * 360) / tools.length
      const radian = (angle * Math.PI) / 180

      const { radius } = innerMetrics

      const fromX = Math.cos(radian) * radius
      const fromY = Math.sin(radian) * radius

      // Start transition animation
      setTransitionData({
        from: { x: fromX, y: fromY },
        to: { x: 0, y: 0 },
        tool: clickedTool,
      })
      setTransitioning(true)

      // After transition, update active index
      setTimeout(() => {
        setActiveIndex(index)
        setTransitioning(false)
        setTransitionData(null)
      }, 800)

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      // Set new timer to resume auto-cycle
      timerRef.current = setTimeout(() => {
        setIsManual(false)
      }, 3000) // Resume after 3 seconds
    },
    [activeIndex, transitioning, innerMetrics]
  )

  // Handle AI tool clicks (for now just log, later can be expanded)
  const handleAIToolClick = useCallback((index: number) => {
    const tool = aiTools[index]
    if (!tool) return
    if (process.env.NODE_ENV !== 'production') {
      console.log(`AI Tool clicked: ${tool.name}`)
    }
    // Future: Could show AI tool info or integrate into main cycle
  }, [])

  const activeTool = tools[activeIndex] ?? null

  // Prevent hydration issues by showing loading state
  if (!mounted) {
    return (
      <div className="relative w-full h-[140vh] bg-black overflow-hidden pb-32 sm:pb-48 md:pb-64 lg:pb-72 xl:pb-80 z-[150] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!activeTool) {
    return <div className="text-red-500">No tools found.</div>
  }

  const lineVariants = {
    initial: {
      pathLength: 0,
      opacity: 0,
      rotate: 0,
    },
    animate: (i: number) => ({
      pathLength: 1,
      opacity: [0, 1, 1, 0],
      rotate: [0, 360, 720, 1080],
      transition: {
        duration: 4 + i * 0.5,
        ease: 'easeInOut',
        repeat: Number.POSITIVE_INFINITY,
        delay: i * 0.2,
      },
    }),
  }

  return (
    <LayoutGroup>
      {/* Optimized height for better spacing with extra bottom padding for tablets */}
      <div ref={sectionRef} className="relative w-full bg-black z-[150]">
        {/* Reduced number of stars and added glow effect */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              boxShadow: star.boxShadow,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }}
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              delay: star.delay,
            }}
          />
        ))}
        {/* Title section */}
        <div className="py-30 md:py-0 mt-24 md:mt-36 mb-16 md:mb-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-['IBM_Plex_Mono'] text-center animate-gradient-text mb-4">
                DevX Development Tools
              </h3>
              <p className="text-slate-400 text-lg md:text-xl font-['IBM_Plex_Sans'] text-center max-w-2xl mb-10 md:mb-12">
                Cutting-edge technologies powering innovative solutions across web, mobile, and
                cloud platforms
              </p>
            </div>
          </div>
        </div>
        {/* Animation container with proper sizing */}
        <div className="relative w-full h-[72vh] sm:h-[92vh] lg:h-[105vh] flex items-center justify-center mt-12 md:mt-20 pt-16 md:pt-24">
          {/* ============ Center black circle with glowing border ============ */}
          {/* Responsive center position with decreased circumference */}
          <div
            className="absolute z-[100] left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] md:w-[45vw] md:h-[45vw]
            max-w-[220px] max-h-[220px] sm:max-w-[240px] sm:max-h-[240px] md:max-w-[260px] md:max-h-[260px]
            rounded-full bg-black text-white flex items-center justify-center text-center p-3 sm:p-4 md:p-5 shadow-md"
            style={{ top: `calc(50% + ${innerMetrics.offset}px)` }}
          >
            {/* 
            Pulsing outer border - enhanced for tablet visibility
          */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full border"
              style={{ borderColor: 'rgba(255, 255, 255, 0.7)' }}
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 10px rgba(255,255,255,0.4), inset 0 0 8px rgba(255,255,255,0.2)',
                  '0 0 30px rgba(255,255,255,0.8), inset 0 0 15px rgba(255,255,255,0.4)',
                  '0 0 10px rgba(255,255,255,0.4), inset 0 0 8px rgba(255,255,255,0.2)',
                ],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />

            {/* 
            "Black hole lines" inside => rotating arcs with motion blur trails
          */}
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'linear',
              }}
              style={{
                filter: 'blur(0.5px)', // Add subtle motion blur
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 200 200"
                fill="none"
                className="opacity-70"
              >
                <defs>
                  {/* Enhanced motion blur filter for more blur effect */}
                  <filter id="motionBlur" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5 1.5" result="blur" />
                    <feOffset dx="1.5" dy="0" result="offset" in="SourceGraphic" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="offset" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Enhanced glowing trail effect with more blur */}
                  <filter id="glowTrail" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Inner ring with subtle trail - increased intensity by 5% */}
                <circle
                  cx="100"
                  cy="100"
                  r="45"
                  stroke="rgba(255,255,255,0.126)"
                  strokeWidth="1"
                  strokeDasharray="20 15"
                  fill="none"
                  filter="url(#glowTrail)"
                />

                {/* Middle ring with medium trail - increased intensity by 5% */}
                <circle
                  cx="100"
                  cy="100"
                  r="65"
                  stroke="rgba(255,255,255,0.189)"
                  strokeWidth="1.5"
                  strokeDasharray="30 20"
                  fill="none"
                  filter="url(#glowTrail)"
                />

                {/* Outer ring with subtle trail - increased intensity by 5% */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="rgba(255,255,255,0.1575)"
                  strokeWidth="1"
                  strokeDasharray="25 25"
                  fill="none"
                  filter="url(#glowTrail)"
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
                    type: 'spring',
                    stiffness: 250,
                    damping: 30,
                    layout: { duration: 0.6 },
                  }}
                  className="mb-3"
                >
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                    <Image
                      src={activeTool.icon || '/placeholder.svg'}
                      alt={activeTool.name}
                      fill
                      sizes="(min-width: 1024px) 3rem, (min-width: 768px) 2.5rem, (min-width: 640px) 2.25rem, 2rem"
                      className={`object-contain ${
                        activeTool.name === 'Laravel' ? 'brightness-150 saturate-150' : ''
                      }`}
                      style={
                        activeTool.name === 'Laravel'
                          ? {
                              filter:
                                'brightness(1.5) saturate(1.5) hue-rotate(300deg) contrast(1.2)',
                            }
                          : undefined
                      }
                    />
                  </div>
                </motion.div>

                <h2
                  className="text-base sm:text-lg md:text-xl font-bold mb-2 text-white drop-shadow-lg"
                  style={{
                    textShadow:
                      '0 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(255,255,255,0.6), 0 0 25px rgba(255,255,255,0.3)',
                  }}
                >
                  {activeTool.name}
                </h2>
                <p
                  className="text-xs sm:text-sm md:text-base text-white font-light leading-relaxed px-2"
                  style={{
                    textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.3)',
                  }}
                >
                  {activeTool.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* ============ Transition Animation ============ */}
          {transitioning && transitionData && (
            <TransitionPlanet
              from={transitionData.from}
              to={transitionData.to}
              tool={transitionData.tool}
              duration={1200}
              offset={innerMetrics.offset}
            />
          )}

          {/* ============ Orbiting Icons ============ */}
          {/* z-[85] - Below center but above AI tools */}
          <StaticIconsOrbit
            toolList={tools}
            activeIndex={activeIndex}
            onIconClick={handleIconClick}
            transitioning={transitioning}
            transitionData={transitionData}
            metrics={innerMetrics}
          />
          {/* ============ Outer AI Tools Orbit ============ */}
          {/* z-[90] - Below inner orbit but visible - Hidden on mobile */}
          <div className="hidden lg:block relative z-[120]">
            <AIToolsOrbit
              activeIndex={activeIndex}
              onIconClick={handleAIToolClick}
              metrics={outerMetrics}
            />
          </div>
        </div>

        {/* Logo Loop Section - Mobile Replacement for Outer Orbit */}
        <div className="w-full mt-8 md:mt-24 lg:mt-32 xl:mt-40 py-8 md:py-12 lg:py-16 mb-6">
          <div className="w-full max-w-full">
            <h4 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-['IBM_Plex_Mono'] text-center text-white mb-12 md:mb-16 lg:mb-20 px-4">
              AI & Cloud Technologies
            </h4>
            <LogoLoop logos={aiTools} speed={12} />
          </div>
        </div>
        {/* Bottom spacing with gradient fade to black */}
        <div className="pb-32 relative">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none z-0" />
        </div>
      </div>
    </LayoutGroup>
  )
}

/**
 * Transition component for "planet being sucked into black hole" effect
 */
function TransitionPlanet({
  from,
  to,
  tool,
  duration,
  offset,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  tool: any
  duration: number
  offset: number
}) {
  return (
    <motion.div
      className="absolute z-[105] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ top: `calc(50% + ${offset}px)`, filter: 'blur(0px)' }}
      initial={{
        x: from.x,
        y: from.y,
        scale: 0.8,
        opacity: 1,
      }}
      animate={{
        x: [from.x, from.x * 0.7, from.x * 0.4, from.x * 0.1, 0, 0],
        y: [from.y, from.y * 0.7, from.y * 0.4, from.y * 0.1, 0, 0],
        scale: [0.8, 0.6, 0.4, 0.2, 1.2, 1],
        opacity: [1, 0.9, 0.7, 0.3, 0.8, 1],
      }}
      transition={{
        duration: duration / 1000,
        ease: [0.25, 0.8, 0.25, 1], // Custom easing for gravitational pull feel
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }}
    >
      {/* White trailing light effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse 80px 40px, rgba(255,255,255,0) 0%, transparent 100%)',
            'radial-gradient(ellipse 120px 60px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            'radial-gradient(ellipse 160px 80px, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 100%)',
            'radial-gradient(ellipse 200px 100px, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 30%, transparent 100%)',
            'radial-gradient(ellipse 100px 50px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
            'radial-gradient(ellipse 40px 20px, rgba(255,255,255,0) 0%, transparent 100%)',
          ],
          filter: ['blur(2px)', 'blur(4px)', 'blur(6px)', 'blur(8px)', 'blur(4px)', 'blur(1px)'],
        }}
        transition={{
          duration: duration / 1000,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      />

      {/* Motion blur trail effect during transition */}
      <motion.div
        className="relative"
        animate={{
          filter: [
            'blur(0px) brightness(1) drop-shadow(0 0 5px rgba(255,255,255,0.3))',
            'blur(2px) brightness(1.3) drop-shadow(0 0 15px rgba(255,255,255,0.6))',
            'blur(4px) brightness(1.6) drop-shadow(0 0 25px rgba(255,255,255,0.8))',
            'blur(6px) brightness(2.2) drop-shadow(0 0 35px rgba(255,255,255,1))',
            'blur(2px) brightness(1.4) drop-shadow(0 0 20px rgba(255,255,255,0.7))',
            'blur(0px) brightness(1) drop-shadow(0 0 5px rgba(255,255,255,0.3))',
          ],
        }}
        transition={{
          duration: duration / 1000,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      >
        {/* Gravitational distortion effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 5px rgba(255,255,255,0.3)',
              '0 0 15px rgba(255,255,255,0.6)',
              '0 0 25px rgba(255,255,255,0.9)',
              '0 0 35px rgba(255,255,255,1)',
              '0 0 20px rgba(255,255,255,0.8)',
              '0 0 10px rgba(255,255,255,0.5)',
            ],
            background: [
              'radial-gradient(circle, transparent 60%, rgba(255,255,255,0.1) 100%)',
              'radial-gradient(circle, transparent 50%, rgba(255,255,255,0.2) 100%)',
              'radial-gradient(circle, transparent 40%, rgba(255,255,255,0.3) 100%)',
              'radial-gradient(circle, transparent 20%, rgba(255,255,255,0.5) 100%)',
              'radial-gradient(circle, transparent 30%, rgba(255,255,255,0.3) 100%)',
              'radial-gradient(circle, transparent 60%, rgba(255,255,255,0.1) 100%)',
            ],
          }}
          transition={{
            duration: duration / 1000,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
        />

        {/* The actual tool icon */}
        <motion.div
            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full shadow border border-purple-500/30 flex items-center justify-center relative overflow-hidden"
          animate={{
            rotateY: [0, 180, 360, 540, 720],
            rotateX: [0, 45, 90, 45, 0],
          }}
          transition={{
            duration: duration / 1000,
            ease: 'easeInOut',
          }}
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 scale-110">
            <Image
              src={tool.icon || '/placeholder.svg'}
              alt={tool.name}
              fill
              sizes="(min-width: 1024px) 2.25rem, (min-width: 768px) 2rem, (min-width: 640px) 1.75rem, 1.5rem"
              className={`object-contain ${
                tool.name === 'Laravel' ? 'brightness-150 saturate-150' : ''
              }`}
              style={
                tool.name === 'Laravel'
                  ? {
                      filter: 'brightness(1.5) saturate(1.5) hue-rotate(300deg) contrast(1.2)',
                    }
                  : undefined
              }
            />
          </div>
        </motion.div>

        {/* Flash of light when reaching destination */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0, 0, 0, 0, 1, 0.8, 0.6, 0.3, 0],
            scale: [0.5, 0.5, 0.5, 0.5, 0.5, 2, 3, 4, 5, 6],
            background: [
              'radial-gradient(circle, transparent 0%, transparent 100%)',
              'radial-gradient(circle, transparent 0%, transparent 100%)',
              'radial-gradient(circle, transparent 0%, transparent 100%)',
              'radial-gradient(circle, transparent 0%, transparent 100%)',
              'radial-gradient(circle, transparent 0%, transparent 100%)',
              'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 30%, transparent 60%)',
              'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)',
              'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 80%)',
              'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 60%, transparent 90%)',
              'radial-gradient(circle, transparent 0%, transparent 100%)',
            ],
          }}
          transition={{
            duration: duration / 1000,
            times: [0, 0.1, 0.2, 0.3, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
            ease: 'easeOut',
          }}
        />
      </motion.div>
    </motion.div>
  )
}

/**
 * Static Icons orbit - no rotation animation
 */
function StaticIconsOrbit({
  toolList,
  activeIndex,
  onIconClick,
  transitioning,
  transitionData,
  metrics,
}: {
  toolList: typeof tools
  activeIndex: number
  onIconClick: (index: number) => void
  transitioning?: boolean
  transitionData?: {
    from: { x: number; y: number }
    to: { x: number; y: number }
    tool: any
  } | null
  metrics: OrbitMetrics
}) {
  return (
    <div
      className="absolute z-[85] left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ top: `calc(50% + ${metrics.offset}px)` }}
    >
      {toolList.map((tool, i) => {
        if (i === activeIndex) return null

        // Hide the orbiting circle if it's currently transitioning
        if (transitioning && transitionData?.tool.name === tool.name) return null

        const angle = (i * 360) / toolList.length
        const radian = (angle * Math.PI) / 180

        // Calculate position using trigonometry for precise placement
        const x = Math.cos(radian) * metrics.radius
        const y = Math.sin(radian) * metrics.radius

        return (
          <motion.div
            key={tool.name}
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              layoutId={`icon-${tool.name}`}
              onClick={() => onIconClick(i)}
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full shadow border border-purple-500/30 hover:border-purple-400/50 flex items-center justify-center cursor-pointer transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 24,
                layout: { duration: 0.6 },
              }}
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9">
                <Image
                  src={tool.icon || '/placeholder.svg'}
                  alt={tool.name}
                  fill
                  sizes="(min-width: 1024px) 2.25rem, (min-width: 768px) 2rem, (min-width: 640px) 1.75rem, 1.5rem"
                  className={`object-contain ${
                    tool.name === 'Laravel' ? 'brightness-150 saturate-150' : ''
                  }`}
                  style={
                    tool.name === 'Laravel'
                      ? {
                          filter: 'brightness(1.5) saturate(1.5) hue-rotate(300deg) contrast(1.2)',
                        }
                      : undefined
                  }
                />
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
function AIToolsOrbit({
  activeIndex,
  onIconClick,
  metrics,
}: {
  activeIndex: number
  onIconClick: (index: number) => void
  metrics: OrbitMetrics
}) {
  const [rotation, setRotation] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // Handle mounting for hydration safety
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setHoveredIndex(null)
  }, [activeIndex])

  // IntersectionObserver to detect when component is visible
  useEffect(() => {
    if (!orbitRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px 100px 0px', // Start animation slightly before fully visible
      }
    )

    observer.observe(orbitRef.current)
    return () => observer.disconnect()
  }, [mounted])

  // Use useEffect to animate the rotation with motion blur - only when visible
  useEffect(() => {
    if (!isVisible || !mounted) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      return
    }

    let lastTime = performance.now()
    const rotationSpeed = 0.008 // slightly faster for more visible trail effect

    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      setRotation((prev) => (prev + rotationSpeed * deltaTime) % 360)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [mounted, isVisible])

  const handlePointerEnter = useCallback((index: number) => {
    setHoveredIndex(index)
  }, [])

  const handlePointerLeave = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  const handleTouchStart = useCallback((index: number) => {
    setHoveredIndex(index)
  }, [])

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null
  }

  return (
    <div
      ref={orbitRef}
      className="absolute z-[90] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: '100%',
        height: '100%',
        top: `calc(50% + ${metrics.offset}px)`,
      }}
    >
      {aiTools.map((tool, i) => {
    const angle = (i * 360) / aiTools.length + rotation
    const angleRad = (angle * Math.PI) / 180
        const x = Math.cos(angleRad) * metrics.radius
        const y = Math.sin(angleRad) * metrics.radius
        const isActive = activeIndex === i
        const isHovered = hoveredIndex === i
        const showLabel = isActive || isHovered

        return (
          <div
            key={tool.name}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
              pointerEvents: 'auto',
            }}
          >
            <motion.button
              type="button"
              aria-label={tool.name}
              aria-pressed={isActive}
              className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full backdrop-blur-sm shadow border border-purple-500/40 flex items-center justify-center cursor-pointer group/icon focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CD787] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${tool.wrapperClassName ?? ''}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onIconClick(i)}
              onPointerEnter={() => handlePointerEnter(i)}
              onPointerLeave={handlePointerLeave}
              onFocus={() => handlePointerEnter(i)}
              onBlur={handlePointerLeave}
              onTouchStart={() => handleTouchStart(i)}
              style={{
                filter: 'drop-shadow(0 0 4px rgba(76, 215, 135, 0.3))',
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 8px rgba(76, 215, 135, 0.4), 0 0 2px rgba(76, 215, 135, 0.6)',
                    '0 0 20px rgba(76, 215, 135, 0.6), 0 0 6px rgba(76, 215, 135, 0.8)',
                    '0 0 8px rgba(76, 215, 135, 0.4), 0 0 2px rgba(76, 215, 135, 0.6)',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                }}
              />

              <div className="relative w-8 h-8 sm:w-9 sm:h-9 pointer-events-none">
                <Image
                  src={tool.icon || '/placeholder.svg'}
                  alt={tool.name}
                  fill
                  sizes="(min-width: 1024px) 2.25rem, (min-width: 768px) 2rem, (min-width: 640px) 1.75rem, 1.5rem"
                  className={`object-contain ${tool.imageClassName ?? ''}`}
                />
              </div>

              <motion.div
                initial={false}
                animate={{
                  opacity: showLabel ? 1 : 0,
                  y: showLabel ? 0 : 8,
                  scale: showLabel ? 1 : 0.95,
                }}
                transition={{ duration: 0.25 }}
                className="absolute whitespace-nowrap top-11 sm:top-12 left-1/2 -translate-x-1/2 z-[999] pointer-events-none"
              >
                <span
                  className="text-sm sm:text-base text-white font-medium bg-black/95 backdrop-blur-md px-4 py-2 rounded-lg border border-[#4CD787]/50 shadow-lg shadow-[#4CD787]/20 font-['IBM_Plex_Mono']"
                  style={{
                    textShadow: '0 0 8px rgba(76, 215, 135, 0.5)',
                  }}
                >
                  {tool.name}
                </span>
              </motion.div>
            </motion.button>
          </div>
        )
      })}
    </div>
  )
}
