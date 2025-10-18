'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const MorphingTextSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const morphingWords = useMemo(
    () => ['TRANSFORM', 'INNOVATE', 'CAPTIVATE', 'INSPIRE', 'CREATE'],
    []
  )

  // Canvas text morphing effect
  useEffect(() => {
    if (!canvasRef.current || !isInView) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = 300
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient text effect
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, '#ff6b6b')
      gradient.addColorStop(0.3, '#4ecdc4')
      gradient.addColorStop(0.6, '#45b7d1')
      gradient.addColorStop(1, '#96ceb4')

      ctx.fillStyle = gradient
      ctx.font = 'bold 60px IBM Plex Mono'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      const currentWord = morphingWords[currentWordIndex]
      if (!currentWord) return

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Add wave distortion effect
      const waveOffset = Math.sin(time * 0.02) * 20

      // Draw each letter with individual animation
      currentWord.split('').forEach((letter, index) => {
        const letterX = centerX + (index - currentWord.length / 2) * 45
        const letterY = centerY + Math.sin(time * 0.03 + index * 0.5) * waveOffset

        ctx.save()
        ctx.translate(letterX, letterY)
        ctx.rotate(Math.sin(time * 0.02 + index * 0.3) * 0.1)
        ctx.scale(1 + Math.sin(time * 0.025 + index * 0.2) * 0.1, 1)
        ctx.fillText(letter, 0, 0)
        ctx.restore()
      })

      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Word cycling
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % morphingWords.length)
    }, 2500)

    return () => {
      cancelAnimationFrame(animationId)
      clearInterval(wordInterval)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [isInView, currentWordIndex, morphingWords])

  // Trigger animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black relative overflow-hidden flex items-center justify-center"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center"
        >
          {/* Section title */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-bold text-white/80 mb-8 font-mono tracking-wider"
          >
            MORPHING TYPOGRAPHY
          </motion.h2>

          {/* Canvas for morphing text */}
          <motion.div variants={itemVariants} className="relative mb-12">
            <canvas
              ref={canvasRef}
              className="w-full max-w-4xl mx-auto"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))' }}
            />
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
            <p className="text-white/70 text-lg leading-relaxed mb-8 font-light">
              Experience the power of dynamic typography that responds to user interaction, creating
              memorable brand moments through liquid text transformations and real-time visual
              effects.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: 'Liquid Morphing',
                  description: 'Smooth transitions between different text states',
                  icon: '🌊',
                },
                {
                  title: 'Interactive Response',
                  description: 'Text that reacts to mouse movement and scroll',
                  icon: '⚡',
                },
                {
                  title: 'Brand Integration',
                  description: 'Custom animations that reflect your brand identity',
                  icon: '🎨',
                },
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none" />
    </section>
  )
}

export default MorphingTextSection
