'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export default function HeroBeams() {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) return null

  return (
    <div className="relative w-full h-full flex items-center justify-center opacity-70 mix-blend-screen pointer-events-none">
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-[60px]" />

      {/* Rotating Beams Container */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Generate multiple beams */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-[2px] h-[60%] origin-bottom bg-gradient-to-t from-transparent via-white/10 to-transparent"
            style={{
              x: '-50%',
              y: '-50%',
              rotate: i * 30, // 360 / 12 = 30 deg separation
            }}
            animate={{
              height: ['60%', '70%', '60%'],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + (i % 3), // varied duration
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2, // varied start time
            }}
          />
        ))}

        {/* Cross Beams for complexity */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`cross-${i}`}
            className="absolute top-1/2 left-1/2 w-[1px] h-[80%] origin-bottom bg-gradient-to-t from-transparent via-white/5 to-transparent"
            style={{
              x: '-50%',
              y: '-50%',
              rotate: i * 45 + 15,
            }}
            animate={{
              opacity: [0.05, 0.2, 0.05],
            }}
            transition={{
              duration: 5 + (i % 2),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>

      {/* Accretion Disk / Ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-white/5"
        animate={{ rotate: -360, scale: [1, 1.05, 1] }}
        transition={{
          rotate: { duration: 90, repeat: Infinity, ease: 'linear' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />

      {/* Secondary Ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full border border-white/5 blur-[1px]"
        animate={{ rotate: 180 }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}
