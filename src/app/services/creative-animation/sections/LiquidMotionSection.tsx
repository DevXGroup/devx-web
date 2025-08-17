'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const LiquidMotionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const controls = useAnimation()
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  // Mouse tracking for liquid interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  // Generate liquid blob path
  const generateBlobPath = (time: number, mouseInfluence: number = 0) => {
    const points = 8
    const radius = 150 + Math.sin(time * 0.001) * 30
    const centerX = 300 + mousePos.x * mouseInfluence
    const centerY = 300 + mousePos.y * mouseInfluence
    
    let path = `M`
    
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2
      const noise = Math.sin(time * 0.002 + i * 0.5) * 20
      const mouseNoise = Math.sin(time * 0.003 + i + mousePos.x * 10) * mouseInfluence * 0.3
      
      const x = centerX + Math.cos(angle) * (radius + noise + mouseNoise)
      const y = centerY + Math.sin(angle) * (radius + noise + mouseNoise)
      
      if (i === 0) {
        path += `${x},${y}`
      } else {
        const prevAngle = ((i - 1) / points) * Math.PI * 2
        const prevNoise = Math.sin(time * 0.002 + (i - 1) * 0.5) * 20
        const prevMouseNoise = Math.sin(time * 0.003 + (i - 1) + mousePos.x * 10) * mouseInfluence * 0.3
        const prevX = centerX + Math.cos(prevAngle) * (radius + prevNoise + prevMouseNoise)
        const prevY = centerY + Math.sin(prevAngle) * (radius + prevNoise + prevMouseNoise)
        
        const cpX1 = prevX + Math.cos(prevAngle + Math.PI / 2) * 30
        const cpY1 = prevY + Math.sin(prevAngle + Math.PI / 2) * 30
        const cpX2 = x - Math.cos(angle + Math.PI / 2) * 30
        const cpY2 = y - Math.sin(angle + Math.PI / 2) * 30
        
        path += ` C${cpX1},${cpY1} ${cpX2},${cpY2} ${x},${y}`
      }
    }
    
    return path + ' Z'
  }

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-black relative overflow-hidden flex items-center justify-center"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Liquid SVG Animation */}
          <motion.div
            variants={itemVariants}
            className="relative order-2 lg:order-1"
          >
            <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
              <svg
                ref={svgRef}
                width="600"
                height="600"
                viewBox="0 0 600 600"
                className="w-full h-full max-w-lg"
              >
                <defs>
                  <linearGradient id="liquidGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4CD787" />
                    <stop offset="50%" stopColor="#2196F3" />
                    <stop offset="100%" stopColor="#9C27B0" />
                  </linearGradient>
                  
                  <linearGradient id="liquidGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF6B6B" />
                    <stop offset="50%" stopColor="#4ECDC4" />
                    <stop offset="100%" stopColor="#45B7D1" />
                  </linearGradient>

                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Main liquid blob */}
                <motion.path
                  d={generateBlobPath(0, 50)}
                  fill="url(#liquidGradient1)"
                  filter="url(#glow)"
                  animate={{
                    d: [
                      generateBlobPath(0, 50),
                      generateBlobPath(1000, 50),
                      generateBlobPath(2000, 50),
                      generateBlobPath(3000, 50),
                      generateBlobPath(0, 50),
                    ]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Secondary liquid blob */}
                <motion.path
                  d={generateBlobPath(500, 30)}
                  fill="url(#liquidGradient2)"
                  opacity={0.7}
                  filter="url(#glow)"
                  animate={{
                    d: [
                      generateBlobPath(500, 30),
                      generateBlobPath(1500, 30),
                      generateBlobPath(2500, 30),
                      generateBlobPath(3500, 30),
                      generateBlobPath(500, 30),
                    ]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Smaller floating blobs */}
                {[...Array(5)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={100 + i * 100}
                    cy={100 + Math.sin(i) * 100}
                    r={10 + i * 5}
                    fill={`url(#liquidGradient${(i % 2) + 1})`}
                    opacity={0.6}
                    animate={{
                      cy: [
                        100 + Math.sin(i) * 100,
                        500 + Math.sin(i) * 50,
                        100 + Math.sin(i) * 100
                      ],
                      r: [
                        10 + i * 5,
                        20 + i * 3,
                        10 + i * 5
                      ]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                  />
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div variants={itemVariants} className="space-y-8 order-1 lg:order-2">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono"
            >
              Liquid
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Motion Graphics
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-white/70 text-lg leading-relaxed"
            >
              Organic, fluid animations that mimic natural movement. 
              Perfect for brand reveals, transitions, and creating emotional connections 
              through beautiful motion design.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              {[
                {
                  title: 'Organic Movement',
                  description: 'Natural fluid dynamics that feel alive and responsive',
                  progress: 95
                },
                {
                  title: 'Brand Integration',
                  description: 'Custom liquid effects that match your brand colors',
                  progress: 88
                },
                {
                  title: 'Performance',
                  description: 'Optimized SVG animations for smooth 60fps experience',
                  progress: 92
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <span className="text-green-400 font-mono text-sm">{item.progress}%</span>
                  </div>
                  <p className="text-white/60 text-sm mb-3">{item.description}</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ delay: 1 + index * 0.3, duration: 1.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              variants={itemVariants}
              className="bg-gradient-to-r from-green-400 to-blue-400 text-black px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Live Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Background liquid drops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
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

export default LiquidMotionSection