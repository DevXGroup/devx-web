'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FuzzyText from '@/components/FuzzyText'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-x-hidden overflow-y-auto">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.3, 1.2, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10 max-w-4xl mx-auto px-4">
        {/* Fuzzy Error Code */}
        <div className="w-full flex justify-center px-4 sm:px-8 md:px-12 overflow-visible">
          <div className="w-full max-w-full flex justify-center overflow-visible">
            <FuzzyText
              fontSize="clamp(3rem, 10vw, 10rem)"
              fontWeight={900}
              fontFamily="'IBM Plex Mono', monospace"
              color="#ef4444"
              baseIntensity={0.4}
              hoverIntensity={0.9}
            >
              ERROR
            </FuzzyText>
          </div>
        </div>

        {/* Fuzzy Error Message */}
        <div className="flex justify-center">
          <FuzzyText
            fontSize="clamp(1.2rem, 3vw, 2.5rem)"
            fontWeight={600}
            fontFamily="'IBM Plex Sans', sans-serif"
            color="#f97316"
            baseIntensity={0.2}
            hoverIntensity={0.5}
          >
            Something went wrong
          </FuzzyText>
        </div>

        {/* Description */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto font-['IBM_Plex_Sans'] leading-relaxed">
            An unexpected error occurred while processing your request.
          </p>
          
          {error.digest && (
            <p className="text-white/50 text-sm font-['IBM_Plex_Mono'] bg-white/5 px-4 py-2 rounded-lg inline-block">
              Error ID: {error.digest}
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <button
            onClick={reset}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-['IBM_Plex_Mono'] font-medium shadow-lg hover:shadow-red-500/25"
          >
            Try Again
          </button>
          
          <Link
            href="/home"
            className="border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-black px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-['IBM_Plex_Mono'] font-medium"
          >
            ← Back to Home
          </Link>
          
          <Link
            href="/contact"
            className="text-white/60 hover:text-white px-6 py-3 rounded-lg transition-all duration-200 font-['IBM_Plex_Sans'] underline underline-offset-4"
          >
            Report This Issue
          </Link>
        </motion.div>

        {/* Static effect overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0, 0.15, 0],
            scaleY: [1, 1.01, 1],
          }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            repeatDelay: 2 + Math.random() * 4,
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent via-red-500/5 to-transparent" />
        </motion.div>
      </div>
    </div>
  )
}