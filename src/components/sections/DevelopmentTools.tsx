'use client'

import { LayoutGroup, motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react'
import Image from 'next/image'
import seedrandom from 'seedrandom'
import LogoLoop from '@animations/LogoLoop'
import { StarTwinklingField } from '../animations/StarTwinklingField'

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
    wrapperClassName:
      'p-2 bg-[#071b16] border border-[#10A37F]/60 shadow-[0_0_12px_rgba(16,163,127,0.25)]',
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'Anthropic',
    description: 'Build trustworthy AI agents with Claude and the Anthropic API',
    icon: buildIconPath('anthropic.svg'),
    wrapperClassName:
      'p-2 bg-[#2a0c05] border border-[#ff4218]/60 shadow-[0_0_12px_rgba(255,66,24,0.2)]',
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'Hugging Face',
    description: 'Launch community and enterprise AI models through Hugging Face',
    icon: buildIconPath('huggingface.svg'),
    wrapperClassName:
      'p-2 bg-black/60 border border-[#ffb23c]/60 shadow-[0_0_12px_rgba(255,178,60,0.16)]',
    loopWrapperClassName: 'bg-transparent rounded-none p-0',
  },
  {
    name: 'Ollama',
    description: 'Run open-source LLMs locally with Ollama for rapid prototyping',
    icon: buildIconPath('ollama.svg'),
    wrapperClassName:
      'p-2 bg-[#0f1b24] border border-[#4cd787]/50 shadow-[0_0_12px_rgba(76,215,135,0.2)]',
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
  const offsetAdjustment = -13
  if (width < 640) return { radius: inner.radius + 90, offset: inner.offset + offsetAdjustment }
  if (width < 768) return { radius: inner.radius + 105, offset: inner.offset + offsetAdjustment }
  if (width < 1024) return { radius: inner.radius + 120, offset: inner.offset + offsetAdjustment }
  return { radius: inner.radius + 140, offset: inner.offset + offsetAdjustment }
}

// Abstracted ToolIcon component for reusability
const ToolIcon = memo(
  ({
    icon,
    name,
    size = 'md',
    className = '',
  }: {
    icon: string
    name: string
    size?: 'sm' | 'md' | 'lg'
    className?: string
  }) => {
    const sizeClasses = {
      sm: 'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9',
      md: 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12',
      lg: 'w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20',
    }

    return (
      <div className={`relative ${sizeClasses[size]}`}>
        <Image
          src={icon || '/placeholder.svg'}
          alt={name}
          fill
          sizes="(min-width: 1024px) 3rem, (min-width: 768px) 2.5rem, (min-width: 640px) 2.25rem, 2rem"
          className={`object-contain ${name === 'Laravel' ? 'brightness-150 saturate-150' : ''} ${className}`}
          style={
            name === 'Laravel'
              ? {
                  filter: 'brightness(1.5) saturate(1.5) hue-rotate(300deg) contrast(1.2)',
                }
              : undefined
          }
        />
      </div>
    )
  }
)

ToolIcon.displayName = 'ToolIcon'

// Duration each tool remains in center
const DISPLAY_DURATION = 4000

export default function DevelopmentTools() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isManual, setIsManual] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [resumeImmediately, setResumeImmediately] = useState(false)
  const [transitionData, setTransitionData] = useState<{
    from: { x: number; y: number }
    to: { x: number; y: number }
    tool: (typeof tools)[0]
  } | null>(null)
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1440
  )
  const [isMobile, setIsMobile] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const cycleRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const innerMetrics = useMemo(() => getInnerOrbitMetrics(viewportWidth), [viewportWidth])
  const outerMetrics = useMemo(
    () => getOuterOrbitMetrics(viewportWidth, innerMetrics),
    [viewportWidth, innerMetrics]
  )

  // Handle mounting for hydration safety
  useEffect(() => {
    setMounted(true)
    setIsMobile(
      typeof window !== 'undefined' &&
        (window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ))
    )
  }, [])

  // Debounced resize handler for better performance
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      resizeTimeoutRef.current = setTimeout(() => {
        setViewportWidth(window.innerWidth)
        setIsMobile(
          window.innerWidth < 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            )
        )
      }, 150) // Debounce resize events
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [])

  // Optimized stars generation with reduced count
  const stars = useMemo(() => {
    const rng = seedrandom('devx-stars')
    const starCount = isMobile ? 30 : viewportWidth < 768 ? 45 : 70
    return Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      width: isMobile ? rng() * 1.5 + 0.3 : rng() * 2.5 + 0.5,
      height: isMobile ? rng() * 1.5 + 0.3 : rng() * 2.5 + 0.5,
      left: rng() * 100,
      top: rng() * 100,
      boxShadow: `0 0 ${isMobile ? rng() * 2 + 0.8 : rng() * 4 + 1.5}px rgba(255, 255, 255, ${rng() * 0.2 + 0.15})`,
      duration: isMobile ? 1.5 + rng() * 3 : 2 + rng() * 5,
      delay: rng() * 2,
      twinkleIntensity: rng() * 0.5 + 0.2,
      isBrightStar: isMobile ? rng() < 0.05 : rng() < 0.1,
    }))
  }, [viewportWidth, isMobile])

  // IntersectionObserver with optimized margins
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.05,
        rootMargin: isMobile ? '50px 0px' : '100px 0px',
      }
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [mounted, isMobile])

  // Automatic cycle - optimized with proper cleanup
  useEffect(() => {
    if (!isVisible || isManual || transitioning || prefersReducedMotion) {
      if (cycleRef.current) {
        clearTimeout(cycleRef.current)
        cycleRef.current = null
      }
      return
    }

    const runCycle = () => {
      if (isManual || transitioning || !isVisible) return

      const nextIndex = (activeIndex + 1) % tools.length
      const nextTool = tools[nextIndex]
      if (!nextTool) return

      const angle = (nextIndex * 360) / tools.length
      const radian = (angle * Math.PI) / 180

      const fromX = Math.cos(radian) * innerMetrics.radius
      const fromY = Math.sin(radian) * innerMetrics.radius

      setTransitionData({
        from: { x: fromX, y: fromY },
        to: { x: 0, y: 0 },
        tool: nextTool,
      })
      setTransitioning(true)

      setTimeout(
        () => {
          setActiveIndex(nextIndex)
          setTransitioning(false)
          setTransitionData(null)

          if (!isManual && isVisible) {
            const cycleDelay = isMobile ? DISPLAY_DURATION * 1.5 : DISPLAY_DURATION
            cycleRef.current = setTimeout(runCycle, cycleDelay)
          }
        },
        isMobile ? 1600 : 1300
      )
    }

    const initialDelay = resumeImmediately
      ? 0
      : isMobile
        ? DISPLAY_DURATION * 1.5
        : DISPLAY_DURATION

    if (cycleRef.current) {
      clearTimeout(cycleRef.current)
    }

    cycleRef.current = setTimeout(runCycle, initialDelay)

    if (resumeImmediately) {
      setResumeImmediately(false)
    }

    return () => {
      if (cycleRef.current) {
        clearTimeout(cycleRef.current)
        cycleRef.current = null
      }
    }
  }, [
    isManual,
    activeIndex,
    transitioning,
    isVisible,
    innerMetrics,
    resumeImmediately,
    isMobile,
    prefersReducedMotion,
  ])

  // User click handler - optimized
  const handleIconClick = useCallback(
    (index: number) => {
      if (index === activeIndex) return

      if (transitioning) {
        setTransitioning(false)
        setTransitionData(null)
      }

      setIsManual(true)

      if (cycleRef.current) {
        clearTimeout(cycleRef.current)
        cycleRef.current = null
      }

      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }

      const clickedTool = tools[index]
      if (!clickedTool) return

      const angle = (index * 360) / tools.length
      const radian = (angle * Math.PI) / 180

      const fromX = Math.cos(radian) * innerMetrics.radius
      const fromY = Math.sin(radian) * innerMetrics.radius

      setTransitionData({
        from: { x: fromX, y: fromY },
        to: { x: 0, y: 0 },
        tool: clickedTool,
      })
      setTransitioning(true)

      setTimeout(
        () => {
          setActiveIndex(index)
          setTransitioning(false)
          setTransitionData(null)

          const displayDuration = isMobile ? DISPLAY_DURATION * 1.2 : DISPLAY_DURATION
          timerRef.current = setTimeout(() => {
            setIsManual(false)
            setResumeImmediately(true)
          }, displayDuration)
        },
        isMobile ? 1600 : 1300
      )
    },
    [activeIndex, transitioning, innerMetrics, isMobile]
  )

  const handleAIToolClick = useCallback((index: number) => {
    const tool = aiTools[index]
    if (!tool) return
    if (process.env.NODE_ENV !== 'production') {
      console.log(`AI Tool clicked: ${tool.name}`)
    }
  }, [])

  const activeTool = tools[activeIndex] ?? null

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

  return (
    <LayoutGroup>
      <div ref={sectionRef} className="relative w-full bg-black z-[1]">
        <StarTwinklingField className="-z-1" />

        {/* Title section */}
        <div className="py-30 md:py-0 mt-24 md:mt-36 mb-24 md:mb-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center">
              <h3 className="heading-section text-center animate-gradient-text mb-4">
                DevX Development Tools
              </h3>
              <p className="subtitle-lg text-slate-400 text-center max-w-2xl mb-0">
                Cutting-edge technologies powering innovative solutions across web, mobile, and
                cloud platforms
              </p>
            </div>
          </div>
        </div>

        {/* Animation container */}
        <div className="relative w-full h-[75vh] sm:h-[95vh] lg:h-[110vh] flex items-center justify-center mt-16 md:mt-24 lg:mt-32 pt-16 md:pt-24">
          {/* Center black circle with optimized animations */}
          <CenterCircle
            activeTool={activeTool}
            transitioning={transitioning}
            offset={outerMetrics.offset + 70}
            isMobile={isMobile}
          />

          {/* Transition Animation */}
          {transitioning && transitionData && (
            <TransitionPlanet
              from={transitionData.from}
              to={transitionData.to}
              tool={transitionData.tool}
              duration={1300}
              offset={outerMetrics.offset + 70}
              isMobile={isMobile}
            />
          )}

          {/* Orbiting Icons */}
          <StaticIconsOrbit
            toolList={tools}
            activeIndex={activeIndex}
            onIconClick={handleIconClick}
            transitioning={transitioning}
            transitionData={transitionData}
            metrics={{ ...innerMetrics, offset: outerMetrics.offset + 70 }}
          />

          {/* Outer AI Tools Orbit - Hidden on mobile */}
          <div className="hidden lg:block relative z-[120]">
            <AIToolsOrbit
              activeIndex={activeIndex}
              onIconClick={handleAIToolClick}
              metrics={outerMetrics}
              isVisible={isVisible}
            />
          </div>
        </div>

        {/* Logo Loop Section */}
        <div className="w-full mt-8 md:mt-24 lg:mt-32 xl:mt-40 py-8 md:py-12 lg:py-16 mb-6">
          <div className="w-full max-w-full">
            <h4 className="heading-section text-center text-white mb-12 md:mb-16 lg:mb-20 px-4">
              Other Tools & Tech Stacks We Use
            </h4>
            <LogoLoop logos={aiTools} speed={18} />
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="pb-32 relative">
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none z-0" />
        </div>
      </div>
    </LayoutGroup>
  )
}

// Optimized Center Circle Component
const CenterCircle = memo(
  ({
    activeTool,
    transitioning,
    offset,
    isMobile,
  }: {
    activeTool: (typeof tools)[0]
    transitioning: boolean
    offset: number
    isMobile: boolean
  }) => {
    const prefersReducedMotion = useReducedMotion()

    return (
      <div
        className="absolute z-[100] left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[60vw] h-[60vw] sm:w-[50vw] sm:h-[50vw] md:w-[45vw] md:h-[45vw]
          max-w-[220px] max-h-[220px] sm:max-w-[240px] sm:max-h-[240px] md:max-w-[260px] md:max-h-[260px]
          rounded-full bg-black text-white flex items-center justify-center text-center p-3 sm:p-4 md:p-5 shadow-md"
        style={{ top: `calc(50% + ${offset}px)` }}
      >
        {/* Pulsing outer border */}
        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full border"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.7)',
              boxShadow: '0 0 15px rgba(255,255,255,0.5), inset 0 0 10px rgba(255,255,255,0.25)',
            }}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Rotating inner rings - simplified for performance */}
        {!prefersReducedMotion && !isMobile && (
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
              willChange: 'transform',
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              fill="none"
              className="opacity-70"
            >
              <circle
                cx="100"
                cy="100"
                r="45"
                stroke="rgba(255,255,255,0.126)"
                strokeWidth="1"
                strokeDasharray="20 15"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="65"
                stroke="rgba(255,255,255,0.189)"
                strokeWidth="1.5"
                strokeDasharray="30 20"
                fill="none"
              />
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="rgba(255,255,255,0.1575)"
                strokeWidth="1"
                strokeDasharray="25 25"
                fill="none"
              />
            </svg>
          </motion.div>
        )}

        {/* Tool content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool.name}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{
              opacity: transitioning ? 0 : 1,
              scale: transitioning ? 0.8 : 1,
              y: transitioning ? 20 : 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              duration: transitioning ? 0.2 : 0.6,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="px-4 flex flex-col items-center"
          >
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
              <ToolIcon icon={activeTool.icon} name={activeTool.name} size="md" />
            </motion.div>

            <h2
              className="heading-component text-white mb-2 drop-shadow-lg"
              style={{
                textShadow:
                  '0 2px 4px rgba(0,0,0,0.9), 0 0 15px rgba(255,255,255,0.6), 0 0 25px rgba(255,255,255,0.3)',
              }}
            >
              {activeTool.name}
            </h2>
            <p
              className="subtitle-xs text-white px-2"
              style={{
                textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 0 10px rgba(255,255,255,0.3)',
              }}
            >
              {activeTool.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }
)

CenterCircle.displayName = 'CenterCircle'

/**
 * Transition component - optimized
 */
function TransitionPlanet({
  from,
  to,
  tool,
  duration,
  offset,
  isMobile,
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  tool: (typeof tools)[0]
  duration: number
  offset: number
  isMobile: boolean
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className="absolute z-[105] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ top: `calc(50% + ${offset}px)`, willChange: 'transform' }}
      initial={{
        x: from.x,
        y: from.y,
        scale: 0.8,
        opacity: 1,
      }}
      animate={{
        x: [from.x, 0, 0],
        y: [from.y, 0, -60],
        scale: [0.8, 1.2, 0.6],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: duration / 1000,
        ease: [0.4, 0, 0.2, 1],
        times: [0, 0.55, 1],
      }}
    >
      {/* Simplified effects for mobile */}
      {!isMobile && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 2px rgba(255,255,255,0.15)',
              '0 0 10px rgba(255,255,255,0.3)',
              '0 0 0px rgba(255,255,255,0)',
            ],
          }}
          transition={{
            duration: duration / 1000,
            times: [0, 0.55, 1],
          }}
        />
      )}

      {/* Tool icon */}
      <motion.div
        className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full shadow border border-purple-500/30 flex items-center justify-center relative overflow-hidden"
        animate={
          !prefersReducedMotion
            ? {
                rotateY: [0, 540],
                rotateX: [0, 180],
              }
            : {}
        }
        transition={{
          duration: duration / 1000,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <ToolIcon icon={tool.icon} name={tool.name} size="sm" />
      </motion.div>
    </motion.div>
  )
}

/**
 * Static Icons orbit - optimized with memo
 */
const StaticIconsOrbit = memo(
  ({
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
    metrics: OrbitMetrics & { offset: number }
  }) => {
    return (
      <div
        className="absolute z-[85] left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ top: `calc(50% + ${metrics.offset}px)` }}
      >
        {toolList.map((tool, i) => {
          if (i === activeIndex) return null
          if (transitioning && transitionData?.tool.name === tool.name) return null

          const angle = (i * 360) / toolList.length
          const radian = (angle * Math.PI) / 180
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
                <ToolIcon icon={tool.icon} name={tool.name} size="sm" />
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    )
  }
)

StaticIconsOrbit.displayName = 'StaticIconsOrbit'

/**
 * AI Tools orbit - heavily optimized
 */
const AIToolsOrbit = memo(
  ({
    activeIndex,
    onIconClick,
    metrics,
    isVisible,
  }: {
    activeIndex: number
    onIconClick: (index: number) => void
    metrics: OrbitMetrics
    isVisible: boolean
  }) => {
    const [rotation, setRotation] = useState(0)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const animationRef = useRef<number | null>(null)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
      setHoveredIndex(null)
    }, [activeIndex])

    // Optimized rotation with RAF throttling
    useEffect(() => {
      if (!isVisible || prefersReducedMotion) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
        return
      }

      let lastTime = performance.now()
      let lastUpdateTime = performance.now()
      const rotationSpeed = 0.008
      const targetFPS = 24 // Reduced from 30 for better performance
      const frameInterval = 1000 / targetFPS

      const animate = (time: number) => {
        const deltaTime = time - lastTime
        lastTime = time

        if (time - lastUpdateTime >= frameInterval) {
          setRotation((prev) => (prev + rotationSpeed * deltaTime) % 360)
          lastUpdateTime = time
        }

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
      }
    }, [isVisible, prefersReducedMotion])

    const handlePointerEnter = useCallback((index: number) => {
      setHoveredIndex(index)
    }, [])

    const handlePointerLeave = useCallback(() => {
      setHoveredIndex(null)
    }, [])

    return (
      <div
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
                willChange: 'transform',
              }}
            >
              <motion.button
                type="button"
                aria-label={tool.name}
                aria-pressed={isActive}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full backdrop-blur-sm shadow border border-purple-500/40 flex items-center justify-center cursor-pointer group/icon ${
                  tool.wrapperClassName ?? ''
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onIconClick(i)}
                onPointerEnter={() => handlePointerEnter(i)}
                onPointerLeave={handlePointerLeave}
                onFocus={() => handlePointerEnter(i)}
                onBlur={handlePointerLeave}
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 pointer-events-none">
                  <Image
                    src={tool.icon || '/placeholder.svg'}
                    alt={tool.name}
                    fill
                    sizes="2.25rem"
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
                  <span className="text-sm sm:text-base text-white font-medium bg-black/95 backdrop-blur-md px-4 py-2 rounded-lg border border-[#4CD787]/50 shadow-lg shadow-[#4CD787]/20 font-['IBM_Plex_Mono']">
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
)

AIToolsOrbit.displayName = 'AIToolsOrbit'
