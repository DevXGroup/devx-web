"use client"

import { animate, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { FileSearch, Pencil, Code, TestTube, Rocket, Settings } from "lucide-react"

const sdlcSteps = [
  { name: "Discovery", icon: FileSearch },
  { name: "Design", icon: Pencil },
  { name: "Development", icon: Code },
  { name: "Testing", icon: TestTube },
  { name: "Launch", icon: Rocket },
  { name: "Maintenance", icon: Settings },
]

const AnimatedIcon = ({ Icon, isActive, isComplete, progress, index }: { Icon: any, isActive: boolean, isComplete: boolean, progress: number, index: number }) => {
  return (
    <div className="relative">
      <svg className="w-12 h-12 sm:w-16 sm:h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.circle
          cx="24"
          cy="24"
          r="22"
          stroke={isComplete || progress === 1 ? "#4CD787" : "yellow"}
          strokeWidth="3"
          fill="none"
          className="sm:hidden"
          initial={{ pathLength: isComplete || progress === 1 ? 1 : 0 }}
          animate={{ pathLength: isComplete || progress === 1 ? 1 : progress }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ visibility: "visible" }}
        />
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          stroke={isComplete || progress === 1 ? "#4CD787" : "yellow"}
          strokeWidth="4"
          fill="none"
          className="hidden sm:block"
          initial={{ pathLength: isComplete || progress === 1 ? 1 : 0 }}
          animate={{ pathLength: isComplete || progress === 1 ? 1 : progress }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ visibility: "visible" }}
        />
      </svg>
      <motion.div
        className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
          isComplete || progress === 1 ? "bg-[#4CD787]" : "bg-yellow-400"
        }`}
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ visibility: "visible" }}
      >
        <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${isComplete || progress === 1 ? "text-white" : "text-black"}`} />
      </motion.div>
    </div>
  )
}

const ConnectingLine = ({
  currentStep,
  progress,
  totalSteps,
  metrics,
}: {
  currentStep: number
  progress: number
  totalSteps: number
  metrics: { left: number; width: number; top: number }
}) => {
  const lineProgress = (currentStep + progress) / (totalSteps - 1)
  return (
    <div
      className="absolute h-0.5 overflow-hidden"
      style={{ left: `${metrics.left}px`, width: `${Math.max(metrics.width, 0)}px`, top: `${metrics.top}px` }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
        style={{
          originX: 0,
          scaleX: lineProgress,
          visibility: "visible",
        }}
        transition={{ duration: 1.0, ease: "easeInOut" }}  // Slower animation (0.5 -> 1.0)
      />
      <motion.div
        className="absolute top-0 left-0 right-0 h-full"
        style={{
          background: "linear-gradient(90deg, transparent, white, transparent)",
          backgroundSize: "200% 100%",
          opacity: 0.3,
          visibility: "visible",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 5,  // Slower animation (3 -> 5)
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

export default function SDLCProcess() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisibleRef = useRef(false)
  const activeAnimationRef = useRef<ReturnType<typeof animate> | null>(null)
  const cancelledRef = useRef(false)
  const timeoutsRef = useRef<number[]>([])
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const [lineMetrics, setLineMetrics] = useState({ left: 56, width: 0, top: 0 })

  const clearScheduledTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutsRef.current = []
  }

  useEffect(() => {
    isVisibleRef.current = isVisible
  }, [isVisible])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateMetrics = () => {
      const container = containerRef.current
      const icons = iconRefs.current
      if (!container || !icons.length) return

      const containerRect = container.getBoundingClientRect()
      const firstRect = icons[0]?.getBoundingClientRect()
      const lastRect = icons[icons.length - 1]?.getBoundingClientRect()

      if (!firstRect || !lastRect) return

      const leftCenter = firstRect.left + firstRect.width / 2 - containerRect.left
      const rightCenter = lastRect.left + lastRect.width / 2 - containerRect.left
      const width = Math.max(rightCenter - leftCenter, 0)
      const topCenter = firstRect.height / 2 + 15  // Moved down 5px from 10 to 15

      setLineMetrics({ left: leftCenter, width, top: topCenter })
    }

    const handleResize = () => updateMetrics()

    updateMetrics()
    window.addEventListener('resize', handleResize)

    const resizeObserver = new ResizeObserver(() => updateMetrics())
    if (containerRef.current) resizeObserver.observe(containerRef.current)
    iconRefs.current.forEach((icon) => {
      if (icon) resizeObserver.observe(icon)
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
    }
  }, [])

  // IntersectionObserver to detect when component is visible
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.3,
        rootMargin: '50px 0px 50px 0px'
      }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) {
      cancelledRef.current = true
      activeAnimationRef.current?.stop()
      activeAnimationRef.current = null
      clearScheduledTimeouts()
      return
    }

    cancelledRef.current = false

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms)
        timeoutsRef.current.push(id)
      })

    const animateProgress = (targetStep: number) =>
      new Promise<void>((resolve) => {
        // Stop any running animation before starting a fresh one
        activeAnimationRef.current?.stop()

        setCurrentStep(targetStep)
        setProgress(0)

        const controls = animate(0, 1, {
          duration: 0.8, // Consistent timing for all steps
          ease: "easeInOut",
          onUpdate: (value) => {
            if (!cancelledRef.current) setProgress(value)
          },
          onComplete: () => {
            if (!cancelledRef.current) {
              setProgress(1)
            }
            resolve()
          },
        })

        activeAnimationRef.current = controls
      })

    const runCycle = async () => {
      while (isVisibleRef.current && !cancelledRef.current) {
        setCompletedSteps(new Set())

        for (let i = 0; i < sdlcSteps.length; i++) {
          if (cancelledRef.current) return
          await animateProgress(i)

          if (cancelledRef.current) return
          setCompletedSteps((prev) => {
            const next = new Set(prev)
            next.add(i)
            return next
          })

          const holdDuration = i === sdlcSteps.length - 1 ? 800 : 400
          await wait(holdDuration)
        }

        if (cancelledRef.current) return
        await wait(400)
      }
    }

    runCycle()

    return () => {
      cancelledRef.current = true
      activeAnimationRef.current?.stop()
      activeAnimationRef.current = null
      clearScheduledTimeouts()
    }
  }, [isVisible])

  return (
    <>
      {/* Responsive SDLC animation - visible on all screen sizes */}
      <div ref={containerRef} className="relative mb-12 w-full px-2 sm:px-4 md:px-16 py-8">
        <ConnectingLine
          currentStep={currentStep}
          progress={progress}
          totalSteps={sdlcSteps.length}
          metrics={lineMetrics}
        />
        <div
          className="relative z-10 grid items-center justify-items-center gap-2 sm:gap-4 md:gap-6"
          style={{ gridTemplateColumns: `repeat(${sdlcSteps.length}, minmax(0, 1fr))` }}
        >
          {sdlcSteps.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
              ref={(el) => {
                iconRefs.current[index] = el
              }}
            >
              <AnimatedIcon
                Icon={step.icon}
                isActive={currentStep === index}
                isComplete={completedSteps.has(index)}
                progress={currentStep === index ? progress : 0}
                index={index}
              />
              <p
                className={`text-[10px] sm:text-xs md:text-sm font-['IBM_Plex_Mono'] text-center mt-2 sm:mt-3 md:mt-4 ${
                  completedSteps.has(index)
                    ? "font-bold text-[#4CD787] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                    : "font-light text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                }`}
              >
                {step.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
