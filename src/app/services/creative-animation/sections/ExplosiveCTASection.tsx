'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

const ExplosiveCTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const controls = useAnimation()
  const [particles, setParticles] = useState<Particle[]>([])
  const [isExploding, setIsExploding] = useState(false)

  // Create explosion effect
  const createExplosion = (x: number, y: number) => {
    const newParticles: Particle[] = []
    const colors = ['#4CD787', '#9d4edd', '#4834D4', '#FFD700', '#ff6b6b', '#4ecdc4']
    
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50
      const velocity = Math.random() * 8 + 2
      
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 0,
        maxLife: Math.random() * 60 + 40,
        color: colors[Math.floor(Math.random() * colors.length)] || '#4CD787',
        size: Math.random() * 4 + 2
      })
    }
    
    setParticles(prev => [...prev, ...newParticles])
    setIsExploding(true)
    
    setTimeout(() => setIsExploding(false), 1000)
  }

  // Canvas particle animation
  useEffect(() => {
    if (!canvasRef.current || !isInView) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      
      setParticles(prevParticles => 
        prevParticles
          .map(particle => {
            // Update particle physics
            const newParticle = {
              ...particle,
              x: particle.x + particle.vx,
              y: particle.y + particle.vy,
              life: particle.life + 1,
              vy: particle.vy + 0.1, // gravity
              vx: particle.vx * 0.99 // friction
            }
            
            // Draw particle
            const opacity = 1 - (newParticle.life / newParticle.maxLife)
            ctx.save()
            ctx.globalAlpha = opacity
            ctx.fillStyle = newParticle.color
            ctx.shadowBlur = 10
            ctx.shadowColor = newParticle.color
            ctx.beginPath()
            ctx.arc(newParticle.x, newParticle.y, newParticle.size, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
            
            return newParticle
          })
          .filter(particle => particle.life < particle.maxLife)
      )
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [isInView])

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const explosiveVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-black relative overflow-hidden flex items-center justify-center"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main heading */}
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-8 font-mono"
          >
            Ready to
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Explode
            </motion.span>
            <br />
            Your Brand?
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-white/70 text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Transform your vision into explosive visual experiences that captivate, 
            engage, and convert. Let&apos;s create something extraordinary together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            {/* Primary explosive button */}
            <motion.button
              variants={explosiveVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="relative px-12 py-4 bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 text-black font-bold text-lg rounded-full overflow-hidden group"
              onClick={(e) => {
                if (!canvasRef.current) return
                const rect = e.currentTarget.getBoundingClientRect()
                const canvasRect = canvasRef.current.getBoundingClientRect()
                const x = rect.left + rect.width / 2 - canvasRect.left
                const y = rect.top + rect.height / 2 - canvasRect.top
                createExplosion(x, y)
              }}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-400"
                animate={{
                  scale: isExploding ? [1, 1.5, 1] : 1,
                  opacity: isExploding ? [1, 0.5, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/30"
                animate={{
                  scale: [1, 2],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              
              <span className="relative z-10 flex items-center gap-2">
                🚀 Start Your Project
              </span>
            </motion.button>

            {/* Secondary button */}
            <motion.button
              variants={explosiveVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-white/60 hover:bg-white/10 transition-all duration-300"
            >
              View Portfolio
            </motion.button>
          </motion.div>

          {/* Features grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: '24-48 hour turnaround for most projects'
              },
              {
                icon: '🎨',
                title: 'Creative Excellence',
                description: 'Award-winning designs that stand out'
              },
              {
                icon: '🔥',
                title: 'Explosive Results',
                description: 'Proven to increase engagement by 300%'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="text-4xl mb-4"
                    animate={{
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact info */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-xl p-6"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Ready to Get Started?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white/70">
              <span>📧 creative@devxgroup.io</span>
              <span className="hidden sm:block">|</span>
              <span>📞 +1 (442) 544-0591</span>
              <span className="hidden sm:block">|</span>
              <span>📅 Book a free consultation</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background explosive elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 360],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none opacity-50" />
    </section>
  )
}

export default ExplosiveCTASection