'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface FloatingElement {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  mass: number
  attraction: number
}

const FloatingElementsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const controls = useAnimation()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [elements, setElements] = useState<FloatingElement[]>([])
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 })

  // Update container size on resize
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setContainerSize({ width: rect.width, height: rect.height })
      }
    }

    updateContainerSize()
    window.addEventListener('resize', updateContainerSize)
    return () => window.removeEventListener('resize', updateContainerSize)
  }, [])

  // Initialize floating elements
  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return

    const initialElements: FloatingElement[] = []
    const colors = ['#4CD787', '#9d4edd', '#4834D4', '#FFD700', '#ff6b6b', '#4ecdc4']
    
    for (let i = 0; i < 12; i++) {
      initialElements.push({
        id: i,
        x: Math.random() * containerSize.width,
        y: Math.random() * containerSize.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 40 + 20,
        color: colors[Math.floor(Math.random() * colors.length)] || '#4CD787',
        mass: Math.random() * 5 + 1,
        attraction: Math.random() * 0.0001 + 0.00005
      })
    }
    
    setElements(initialElements)
  }, [containerSize])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const currentContainer = containerRef.current
    if (currentContainer) {
      currentContainer.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  // Physics simulation with performance optimization
  useEffect(() => {
    if (!isInView || elements.length === 0 || containerSize.width === 0) return

    let animationId: number
    let lastTime = 0
    const targetFPS = 60
    const frameTime = 1000 / targetFPS

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameTime) {
        setElements(prevElements => 
          prevElements.map(element => {
            let { x, y, vx, vy } = element
            
            // Mouse attraction
            const dx = mousePos.x - x
            const dy = mousePos.y - y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance > 0) {
              const force = element.attraction * element.mass / (distance * distance)
              const angle = Math.atan2(dy, dx)
              vx += Math.cos(angle) * force * 100
              vy += Math.sin(angle) * force * 100
            }

            // Apply velocity
            x += vx
            y += vy

            // Friction
            vx *= 0.99
            vy *= 0.99

            // Boundary collision with bounce (using dynamic container size)
            if (x <= element.size / 2) {
              x = element.size / 2
              vx = Math.abs(vx) * 0.8
            }
            if (x >= containerSize.width - element.size / 2) {
              x = containerSize.width - element.size / 2
              vx = -Math.abs(vx) * 0.8
            }
            if (y <= element.size / 2) {
              y = element.size / 2
              vy = Math.abs(vy) * 0.8
            }
            if (y >= containerSize.height - element.size / 2) {
              y = containerSize.height - element.size / 2
              vy = -Math.abs(vy) * 0.8
            }

            return { ...element, x, y, vx, vy }
          })
        )
        lastTime = currentTime
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isInView, mousePos, elements.length, containerSize])

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen bg-gradient-to-br from-black via-indigo-900/20 to-black relative overflow-hidden flex items-center justify-center"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Content */}
          <motion.div variants={itemVariants} className="space-y-8 order-2 lg:order-1">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono"
            >
              Physics-Based
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Interactions
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/70 text-lg leading-relaxed"
            >
              Elements that respond to natural physics create intuitive and delightful user experiences. 
              Watch as objects attract, repel, and bounce with realistic movement.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              {[
                {
                  title: 'Gravitational Pull',
                  description: 'Elements attracted to mouse cursor with realistic physics',
                  value: '✨ Interactive'
                },
                {
                  title: 'Collision Detection',
                  description: 'Bouncing and collision effects with momentum preservation',
                  value: '🎯 Precise'
                },
                {
                  title: 'Fluid Dynamics',
                  description: 'Smooth, natural movement that feels alive',
                  value: '🌊 Organic'
                },
                {
                  title: 'Performance',
                  description: '60fps animations with optimized rendering',
                  value: '⚡ Fast'
                }
              ].map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="flex justify-between items-center bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10"
                  whileHover={{ scale: 1.02, x: 10 }}
                >
                  <div>
                    <h3 className="text-white font-semibold">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                  <div className="text-indigo-400 font-mono text-sm">
                    {feature.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30 rounded-lg p-4"
            >
              <p className="text-indigo-300 text-sm font-mono">
                💡 Move your mouse over the animation to see the gravitational effect!
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Physics Animation */}
          <motion.div
            variants={itemVariants}
            className="relative order-1 lg:order-2"
          >
            <div 
              ref={containerRef}
              className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-2xl border border-white/20 overflow-hidden cursor-crosshair"
              style={{ 
                background: 'radial-gradient(circle at center, rgba(67, 56, 202, 0.2) 0%, rgba(0, 0, 0, 0.3) 70%)',
              }}
            >
              {/* Floating elements */}
              {elements.map((element) => (
                <motion.div
                  key={element.id}
                  className="absolute rounded-full"
                  style={{
                    width: element.size,
                    height: element.size,
                    backgroundColor: element.color,
                    left: element.x - element.size / 2,
                    top: element.y - element.size / 2,
                    boxShadow: `0 0 ${element.size}px ${element.color}40`,
                    filter: 'blur(0.5px)',
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: {
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 10 + Math.random() * 10,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                />
              ))}

              {/* Mouse cursor effect */}
              <motion.div
                className="absolute w-6 h-6 border-2 border-white/50 rounded-full pointer-events-none"
                style={{
                  left: mousePos.x - 12,
                  top: mousePos.y - 12,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Grid overlay for visual reference */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Info overlay */}
              <div className="absolute bottom-4 left-4 text-white/60 text-xs font-mono">
                Elements: {elements.length} | Physics: Active
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background particle trails */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default FloatingElementsSection