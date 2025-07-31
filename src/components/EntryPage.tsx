"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

// Enhanced star field component with more realistic distribution
function StarField() {
  const stars = Array.from({ length: 300 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.5)`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, star.opacity, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Epic Big Bang sequence with Boldonse font - 5 seconds total
function AnimatedInfinity({ onComplete }: { onComplete: () => void }) {
  const [animationPhase, setAnimationPhase] = useState<'drawing' | 'text' | 'zoomD' | 'bigBang'>('drawing')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDrawingComplete = () => {
    setTimeout(() => setAnimationPhase('text'), 200)
  }

  const handleTextComplete = () => {
    setTimeout(() => setAnimationPhase('zoomD'), 400)
  }

  const handleZoomDComplete = () => {
    setTimeout(() => setAnimationPhase('bigBang'), 300)
  }

  const handleBigBangComplete = () => {
    setTimeout(() => onComplete(), 200)
  }

  if (!mounted) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Drawing Phase - Infinity Symbol */}
      {animationPhase === 'drawing' && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <svg
            width="200"
            height="100"
            viewBox="0 0 200 100"
            className="relative z-10"
          >
            <defs>
              {/* White glow effect */}
              <filter id="infinityGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <motion.path
              d="M50 50 C50 25, 75 25, 100 50 C125 75, 150 75, 150 50 C150 25, 125 25, 100 50 C75 75, 50 75, 50 50"
              fill="none"
              stroke="#ffffff"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#infinityGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                duration: 2,
                ease: "easeInOut",
                onComplete: handleDrawingComplete
              }}
            />
          </svg>
        </motion.div>
      )}

      {/* Text Phase - DevX Group with Boldonse Font */}
      {animationPhase === 'text' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
          onAnimationComplete={handleTextComplete}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-['IBM_Plex_Mono'] font-bold text-white text-glow-hero drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] tracking-wide"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            DevX Group
          </motion.h1>
        </motion.div>
      )}

      {/* Zoom D Phase - Focus on D letter and scale up */}
      {animationPhase === 'zoomD' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="text-6xl md:text-9xl font-['IBM_Plex_Mono'] font-bold text-white text-glow-hero drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
            initial={{ scale: 1 }}
            animate={{ scale: 50, opacity: 0.3 }}
            transition={{ 
              duration: 1, 
              ease: "easeIn",
              onComplete: handleZoomDComplete
            }}
          >
            D
          </motion.span>
        </motion.div>
      )}

      {/* Big Bang Phase - NASA-Style Cosmic Explosion */}
      {animationPhase === 'bigBang' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* Central Bright Core */}
          <motion.div
            className="absolute rounded-full"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, #ffffff 0%, #e0c3fc 20%, #9d4edd 40%, #4834D4 60%, transparent 100%)",
              boxShadow: "0 0 100px #ffffff, 0 0 200px #e0c3fc, 0 0 300px #9d4edd"
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 20, opacity: 0.8 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          />

          {/* Horizontal Energy Beam */}
          <motion.div
            className="absolute h-8"
            style={{
              left: "0%",
              top: "50%",
              width: "100%",
              transform: "translateY(-50%)",
              background: "linear-gradient(90deg, transparent 0%, #ffffff 20%, #e0c3fc 50%, #ffffff 80%, transparent 100%)",
              boxShadow: "0 0 50px #ffffff, 0 0 100px #e0c3fc"
            }}
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0.9 }}
            transition={{ 
              duration: 0.6,
              ease: "easeOut"
            }}
          />

          {/* Energy Bursts */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`burst-${i}`}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "4px",
                height: "100px",
                background: "linear-gradient(0deg, transparent 0%, #ffffff 30%, #e0c3fc 70%, transparent 100%)",
                boxShadow: "0 0 20px #ffffff",
                transformOrigin: "center bottom",
                rotate: `${i * 30}deg`
              }}
              initial={{ scaleY: 0, opacity: 1 }}
              animate={{ 
                scaleY: [0, 3, 0],
                opacity: [1, 0.8, 0]
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.1,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Expanding Energy Rings */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute rounded-full border-2"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                borderColor: i % 2 === 0 ? "#e0c3fc" : "#9d4edd",
                boxShadow: `0 0 20px ${i % 2 === 0 ? "#e0c3fc" : "#9d4edd"}`
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ 
                scale: 30 + (i * 10), 
                opacity: 0,
                borderWidth: 0 
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Particle Shards */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`shard-${i}`}
              className="absolute w-1 h-8 bg-white"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 10px #ffffff",
                borderRadius: "50%"
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{ 
                scale: [0, 1, 0],
                x: Math.cos((i * 18) * Math.PI / 180) * 400,
                y: Math.sin((i * 18) * Math.PI / 180) * 400,
                opacity: [1, 0.8, 0]
              }}
              transition={{ 
                duration: 0.9,
                delay: 0.2,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Final White Flash */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ 
              duration: 1,
              times: [0, 0.7, 1],
              ease: "easeOut",
              onComplete: handleBigBangComplete
            }}
          />
        </motion.div>
      )}
    </div>
  )
}

export default function EntryPage() {
  const [mounted, setMounted] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const router = useRouter()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (animationComplete) {
      // Small delay before transitioning to main page
      const timer = setTimeout(() => {
        router.push('/home')
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [animationComplete, router])

  // Skip animation if user prefers reduced motion
  useEffect(() => {
    if (reduceMotion && mounted) {
      const timer = setTimeout(() => {
        router.push('/home')
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [reduceMotion, mounted, router])

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (reduceMotion) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <StarField />
      <AnimatedInfinity onComplete={() => setAnimationComplete(true)} />
    </div>
  )
}