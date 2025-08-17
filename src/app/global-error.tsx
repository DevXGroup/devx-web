'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import FuzzyText from '@/components/FuzzyText'

export default function GlobalError({
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
    <html>
      <body className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Critical background particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-red-600/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        <div className="text-center space-y-8 relative z-10 max-w-4xl mx-auto px-4">
          {/* Fuzzy Critical Error */}
          <div className="flex justify-center">
            <FuzzyText
              fontSize="clamp(2.5rem, 8vw, 8rem)"
              fontWeight={900}
              fontFamily="'IBM Plex Mono', monospace"
              color="#dc2626"
              baseIntensity={0.5}
              hoverIntensity={1.0}
            >
              CRITICAL ERROR
            </FuzzyText>
          </div>

          {/* Fuzzy System Message */}
          <div className="flex justify-center">
            <FuzzyText
              fontSize="clamp(1rem, 2.5vw, 2rem)"
              fontWeight={600}
              fontFamily="'IBM Plex Sans', sans-serif"
              color="#facc15"
              baseIntensity={0.3}
              hoverIntensity={0.7}
            >
              System Failure
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
              A critical system error has occurred. The application encountered an unrecoverable error.
            </p>
            
            {error.digest && (
              <p className="text-white/50 text-sm font-['IBM_Plex_Mono'] bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg inline-block">
                Critical Error ID: {error.digest}
              </p>
            )}
          </motion.div>

          {/* Emergency Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <button
              onClick={reset}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-['IBM_Plex_Mono'] font-medium shadow-lg hover:shadow-red-600/25 border border-red-500"
            >
              Force Restart
            </button>
            
            <button
              onClick={() => window.location.href = '/home'}
              className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 font-['IBM_Plex_Mono'] font-medium"
            >
              Emergency Exit
            </button>
          </motion.div>

          {/* Danger warning */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-red-400/60 text-sm font-['IBM_Plex_Mono'] max-w-md mx-auto">
              If this error persists, please contact our support team with the error ID above.
            </p>
          </motion.div>

          {/* Critical glitch effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: [0, 0.2, 0],
              scaleX: [1, 1.03, 1],
              skewX: [0, 2, 0],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 1 + Math.random() * 3,
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-red-600/10 to-transparent transform" />
          </motion.div>
        </div>
      </body>
    </html>
  )
}