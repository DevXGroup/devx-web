'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion'

const ScrollTriggeredShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Transform values based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])

  // Additional transforms for features and floating elements
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const backgroundGradient = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'radial-gradient(circle at 20% 20%, rgba(157, 78, 221, 0.3) 0%, transparent 50%)',
      'radial-gradient(circle at 50% 50%, rgba(139, 69, 19, 0.3) 0%, transparent 50%)',
      'radial-gradient(circle at 80% 80%, rgba(76, 215, 135, 0.3) 0%, transparent 50%)',
    ]
  )

  // Feature card transforms
  const featureY0 = useTransform(scrollYProgress, [0, 1], [0, 0])
  const featureY1 = useTransform(scrollYProgress, [0, 1], [0, -20])
  const featureY2 = useTransform(scrollYProgress, [0, 1], [0, -40])

  // Floating element transforms - create them outside of callback
  const float0Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const float0Rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const float0Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const float1Y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const float1Rotate = useTransform(scrollYProgress, [0, 1], [0, -360])
  const float1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const float2Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const float2Rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const float2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const float3Y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const float3Rotate = useTransform(scrollYProgress, [0, 1], [0, -360])
  const float3Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const float4Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const float4Rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const float4Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const float5Y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const float5Rotate = useTransform(scrollYProgress, [0, 1], [0, -360])
  const float5Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const float6Y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const float6Rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const float6Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const float7Y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const float7Rotate = useTransform(scrollYProgress, [0, 1], [0, -360])
  const float7Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  const floatingElements = [
    { y: float0Y, rotate: float0Rotate, scale: float0Scale },
    { y: float1Y, rotate: float1Rotate, scale: float1Scale },
    { y: float2Y, rotate: float2Rotate, scale: float2Scale },
    { y: float3Y, rotate: float3Rotate, scale: float3Scale },
    { y: float4Y, rotate: float4Rotate, scale: float4Scale },
    { y: float5Y, rotate: float5Rotate, scale: float5Scale },
    { y: float6Y, rotate: float6Rotate, scale: float6Scale },
    { y: float7Y, rotate: float7Rotate, scale: float7Scale },
  ]

  // Particle system
  useEffect(() => {
    if (!canvasRef.current || !isInView) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      life: number
      maxLife: number
      color: string
      opacity: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 2
        this.speedY = (Math.random() - 0.5) * 2
        this.life = 0
        this.maxLife = Math.random() * 60 + 60

        const colors = ['#4CD787', '#9d4edd', '#4834D4', '#FFD700', '#ff6b6b']
        this.color = colors[Math.floor(Math.random() * colors.length)] || '#4CD787'
        this.opacity = 1
      }

      update(scrollProgress: number) {
        this.x += this.speedX * (1 + scrollProgress * 2)
        this.y += this.speedY * (1 + scrollProgress * 2)
        this.life++

        // Fade out as particle ages
        this.opacity = 1 - this.life / this.maxLife

        // Scroll-based movement
        this.y -= scrollProgress * 3

        return this.life < this.maxLife
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.restore()
      }
    }

    let particles: Particle[] = []
    let animationId: number
    let lastScrollProgress = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      const currentScrollProgress = scrollYProgress.get()

      // Create new particles based on scroll speed
      const scrollSpeed = Math.abs(currentScrollProgress - lastScrollProgress)
      if (scrollSpeed > 0.001 && particles.length < 100) {
        for (let i = 0; i < Math.floor(scrollSpeed * 1000); i++) {
          particles.push(
            new Particle(Math.random() * canvas.offsetWidth, Math.random() * canvas.offsetHeight)
          )
        }
      }

      // Update and draw particles
      particles = particles.filter((particle) => {
        particle.update(currentScrollProgress)
        particle.draw(ctx)
        return particle.life < particle.maxLife
      })

      lastScrollProgress = currentScrollProgress
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [isInView, scrollYProgress])

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
      className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black relative overflow-hidden"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          style={{ y, opacity, scale }}
          className="w-full"
        >
          {/* Main content */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-white mb-8 font-mono"
            >
              Scroll-Triggered
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Magic
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/70 text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
            >
              Animations that respond to user scroll create engaging storytelling experiences. Every
              scroll reveals new visual surprises.
            </motion.p>

            {/* Scroll progress indicator */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="relative w-64 h-2 bg-white/20 rounded-full mx-auto">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  style={{
                    width: progressWidth,
                  }}
                />
              </div>
              <p className="text-white/50 text-sm mt-2 font-mono">Scroll Progress</p>
            </motion.div>

            {/* Feature grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {[
                {
                  title: 'Parallax Layers',
                  description: 'Multiple layers moving at different speeds',
                  icon: '🌊',
                  progress: scrollYProgress,
                },
                {
                  title: 'Particle Systems',
                  description: 'Dynamic particles responding to scroll',
                  icon: '✨',
                  progress: scrollYProgress,
                },
                {
                  title: 'Timeline Control',
                  description: 'Precise animation timing based on scroll',
                  icon: '⏱️',
                  progress: scrollYProgress,
                },
              ].map((feature, index) => {
                const featureYTransforms = [featureY0, featureY1, featureY2]
                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 relative overflow-hidden"
                    whileHover={{ scale: 1.05, y: -10 }}
                    style={{
                      y: featureYTransforms[index] || featureY0,
                    }}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{feature.description}</p>

                    {/* Dynamic progress bar */}
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                        style={{
                          width: progressWidth,
                        }}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Floating elements that react to scroll */}
            <div className="relative">
              {[...Array(8)].map((_, i) => {
                const element = floatingElements[i]
                if (!element) return null
                return (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full"
                    style={{
                      left: `${10 + i * 10}%`,
                      top: `${Math.sin(i) * 100}px`,
                      y: element.y,
                      rotate: element.rotate,
                      scale: element.scale,
                    }}
                  />
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background gradient that changes with scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: backgroundGradient,
        }}
      />
    </section>
  )
}

export default ScrollTriggeredShowcase
