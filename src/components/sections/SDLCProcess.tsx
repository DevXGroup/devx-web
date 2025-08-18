"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useState } from "react"
import { FileSearch, Pencil, Code, TestTube, Rocket, Settings } from "lucide-react"

const sdlcSteps = [
  { name: "Discovery", icon: FileSearch },
  { name: "Design", icon: Pencil },
  { name: "Development", icon: Code },
  { name: "Testing", icon: TestTube },
  { name: "Launch", icon: Rocket },
  { name: "Maintenance", icon: Settings },
]

const AnimatedIcon = ({ Icon, isActive, isComplete, progress }: { Icon: any, isActive: boolean, isComplete: boolean, progress: number }) => {
  return (
    <div className="relative">
      <svg className="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          stroke="#4CD787"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: isComplete || progress === 1 ? 1 : 0 }}
          animate={{ pathLength: isComplete || progress === 1 ? 1 : progress }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ visibility: "visible" }}
        />
      </svg>
      <motion.div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          isComplete || progress === 1 ? "bg-[#4CD787]" : "bg-yellow-400"
        }`}
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        style={{ visibility: "visible" }}
      >
        <Icon className={`w-6 h-6 ${isComplete || progress === 1 ? "text-white" : "text-black"}`} />
      </motion.div>
    </div>
  )
}

const ConnectingLine = ({ currentStep, progress, totalSteps }: { currentStep: number, progress: number, totalSteps: number }) => {
  const lineProgress = (currentStep + progress) / (totalSteps - 1)
  return (
    <div className="absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-[14px] overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
        style={{
          originX: 0,
          scaleX: lineProgress,
          visibility: "visible",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
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
          duration: 3,
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
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const controls = useAnimation()

  useEffect(() => {
    const animateProcess = async () => {
      while (true) {
        // Reset completed steps at start of cycle
        setCompletedSteps(new Set())
        
        for (let i = 0; i < sdlcSteps.length; i++) {
          setCurrentStep(i)
          for (let p = 0; p <= 1; p += 0.01) {
            setProgress(p)
            await new Promise((resolve) => setTimeout(resolve, 30))
          }
          
          // Mark step as completed when progress reaches 1
          setCompletedSteps(prev => new Set([...prev, i]))
          
          // Special case for maintenance (last step) - hold green state longer
          if (i === sdlcSteps.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 2000)) // Hold green state for 2 seconds
          } else {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 1000)) // 1 sec delay before restart
        setCurrentStep(0)
        setProgress(0)
      }
    }

    animateProcess()
  }, [])

  return (
    <>
      <div className="relative mb-12 w-full px-4 md:px-16 py-8">
        <ConnectingLine currentStep={currentStep} progress={progress} totalSteps={sdlcSteps.length} />
        <div className="flex justify-between items-center relative z-10">
          {sdlcSteps.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <AnimatedIcon
                Icon={step.icon}
                isActive={currentStep === index}
                isComplete={completedSteps.has(index)}
                progress={currentStep === index ? progress : 0}
              />
              <p
                className={`text-sm font-['IBM_Plex_Mono'] text-center mt-4 ${
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
