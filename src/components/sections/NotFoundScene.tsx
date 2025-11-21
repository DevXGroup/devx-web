'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import FuzzyText from '@/components/FuzzyText'

interface Particle {
  id: number
  left: number
  top: number
  duration: number
  delay: number
}

export default function NotFoundScene() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [glitchDelay, setGlitchDelay] = useState(3)

  useEffect(() => {
    const newParticles = [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))

    setParticles(newParticles)
    setGlitchDelay(3 + Math.random() * 5)
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10">
        <div className="flex justify-center">
          <FuzzyText
            fontSize="clamp(4rem, 12vw, 12rem)"
            fontWeight={900}
            fontFamily="var(--font-ibm-plex-mono)"
            color="#ec4899"
            baseIntensity={0.3}
            hoverIntensity={0.8}
          >
            404
          </FuzzyText>
        </div>

        <div className="flex justify-center">
          <FuzzyText
            fontSize="clamp(1.5rem, 4vw, 3rem)"
            fontWeight={600}
            fontFamily="var(--font-ibm-plex-sans)"
            color="#a855f7"
            baseIntensity={0.15}
            hoverIntensity={0.4}
          >
            Page Not Found
          </FuzzyText>
        </div>

        <motion.p
          className="text-white/70 text-lg md:text-xl max-w-md mx-auto font-['IBM_Plex_Sans'] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          The page you&apos;re looking for seems to have vanished into the digital void.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link
            href="/home"
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-['IBM_Plex_Mono'] font-medium shadow-lg hover:shadow-pink-500/25"
          >
            ← Back to Home
          </Link>

          <Link
            href="/contact"
            className="border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-['IBM_Plex_Mono'] font-medium"
          >
            Report Issue
          </Link>
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0, 0.1, 0],
            scaleX: [1, 1.02, 1],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: glitchDelay,
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-pink-500/10 to-transparent transform skew-x-12" />
        </motion.div>
      </div>
    </div>
  )
}
