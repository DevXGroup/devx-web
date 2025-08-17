'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

interface GalleryItem {
  id: number
  title: string
  category: string
  description: string
  color: string
  preview: string
  tech: string[]
}

const CreativeGallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'Brand Logo Reveal',
      category: 'Logo Animation',
      description: 'Dynamic logo reveal with particle effects and smooth transitions',
      color: '#4CD787',
      preview: 'LOGO',
      tech: ['After Effects', 'Lottie', 'WebGL']
    },
    {
      id: 2,
      title: 'Liquid Typography',
      category: 'Text Animation',
      description: 'Morphing text effects with fluid dynamics and color transitions',
      color: '#9d4edd',
      preview: 'TEXT',
      tech: ['Three.js', 'GSAP', 'Canvas']
    },
    {
      id: 3,
      title: 'UI Micro-interactions',
      category: 'Interface',
      description: 'Subtle animations that enhance user experience and engagement',
      color: '#4834D4',
      preview: 'UI/UX',
      tech: ['Framer Motion', 'React', 'CSS']
    },
    {
      id: 4,
      title: 'Product Showcase',
      category: '3D Animation',
      description: '360° product visualization with interactive controls',
      color: '#FFD700',
      preview: '3D',
      tech: ['Three.js', 'Blender', 'WebGL']
    },
    {
      id: 5,
      title: 'Data Visualization',
      category: 'Infographics',
      description: 'Animated charts and graphs that tell compelling stories',
      color: '#ff6b6b',
      preview: 'DATA',
      tech: ['D3.js', 'SVG', 'Animation']
    },
    {
      id: 6,
      title: 'Loading Sequences',
      category: 'UI Elements',
      description: 'Creative loading animations that keep users engaged',
      color: '#4ecdc4',
      preview: 'LOAD',
      tech: ['CSS', 'SVG', 'JavaScript']
    }
  ]

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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="bg-gradient-to-br from-black via-gray-900/50 to-black relative overflow-hidden py-16"
    >
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-7xl font-['IBM_Plex_Mono'] font-bold text-center mb-8">
              <span className="text-white block">Creative</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 block">
                Showcase
              </span>
            </h2>
            
            <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed font-['IBM_Plex_Sans'] text-center">
              Explore our portfolio of animation work across different categories. 
              Each piece demonstrates our expertise in creating memorable visual experiences.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="group relative cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-72 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden group-hover:border-white/30 transition-all duration-300">
                  {/* Preview area */}
                  <div 
                    className="h-full flex items-center justify-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}05 100%)`
                    }}
                  >
                    {/* Static preview text with subtle hover effect */}
                    <motion.div
                      className="text-4xl font-bold font-mono text-white/90 text-center"
                      whileHover={{
                        scale: 1.05,
                        color: item.color
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.preview}
                    </motion.div>

                    {/* Simple hover effect overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`
                      }}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="mb-3">
                        <h3 className="text-white font-['IBM_Plex_Mono'] font-semibold text-lg mb-2">{item.title}</h3>
                        <span 
                          className="text-xs px-3 py-1 rounded-full font-['IBM_Plex_Mono'] inline-block"
                          style={{ backgroundColor: `${item.color}30`, color: item.color }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mb-3 leading-relaxed font-['IBM_Plex_Sans']">{item.description}</p>
                      
                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1">
                        {item.tech.map((tech) => (
                          <span 
                            key={tech}
                            className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded font-['IBM_Plex_Mono']"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Simple hover border */}
                  <div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-opacity-50 transition-all duration-300"
                    style={{
                      borderColor: `${item.color}50`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '15+', label: 'Animation Types' },
              { number: '99%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Creative Support' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-['IBM_Plex_Mono'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm font-['IBM_Plex_Sans']">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>


      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400/40 rounded-full" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400/40 rounded-full" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400/40 rounded-full" />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-blue-400/40 rounded-full" />
      </div>
    </section>
  )
}

export default CreativeGallerySection