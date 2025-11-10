'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const faces = [
  { text: 'Custom Software', color: '#8A2BE2' },
  { text: 'Expert Solutions', color: '#9932CC' },
  { text: 'Fast Results', color: '#9370DB' },
  { text: 'Competitive Rates', color: '#BA55D3' },
  { text: 'Bring Your Vision', color: '#DA70D6' },
  { text: 'To Life', color: '#EE82EE' },
]

export default function CubeFallback() {
  const [currentFace, setCurrentFace] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentFace((prev) => (prev + 1) % faces.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div
        className="relative w-72 h-72 cursor-pointer safari-fix"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-purple-500/30 blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        />

        {/* Card faces */}
        <div className="relative w-full h-full">
          {faces.map((face, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center rounded-xl border-2 border-white/20 backdrop-blur-sm safari-fix"
              style={{
                backgroundColor: face.color,
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: currentFace === index ? 1 : 0,
                scale: currentFace === index ? 1 : 0.8,
                rotateY: currentFace === index ? 0 : 90,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <div className="text-center p-6">
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.2)', // Safari text enhancement
                  }}
                >
                  {face.text}
                </h3>
                <div className="w-12 h-1 bg-white/50 mx-auto rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-yellow-300"
          animate={{
            y: [0, -10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-green-300"
          animate={{
            y: [0, 10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            delay: 0.5,
          }}
        />

        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
