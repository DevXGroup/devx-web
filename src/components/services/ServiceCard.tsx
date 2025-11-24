'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView, useAnimation, motion } from 'framer-motion'
import ParticleAnimation from './ParticleAnimation'
import type { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  service: {
    icon: LucideIcon
    title: string
    description: string
    outcome?: string
    features: string[]
    color: string
  }
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  // Delayed particle effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isHovered) {
      timer = setTimeout(() => {
        setShowParticles(true)
      }, 100)
    } else {
      setShowParticles(false)
    }

    return () => clearTimeout(timer)
  }, [isHovered])

  const cardColor = service.color || '#4CD787'

  return (
    <motion.div
      ref={ref}
      className="bg-black/60 md:bg-black/30 backdrop-blur-md md:backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-white/20 md:border-white/10 group hover:border-white/30 transition-all duration-300 relative overflow-hidden h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {showParticles && (
        <ParticleAnimation color={cardColor} density={isHovered ? 25 : 15} speed={0.2} />
      )}

      <div className="flex items-center mb-6 relative z-10">
        <div className="relative">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mr-3 sm:mr-4 flex items-center justify-center rounded-full aspect-square shrink-0 group-hover:shadow-[0_0_15px_rgba(76,215,135,0.5)]"
            style={{
              backgroundColor: cardColor,
              boxShadow: isHovered ? `0 0 15px ${cardColor}80` : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black" />
          </div>
        </div>
        <h3
          className="card-title"
          style={{
            color: cardColor,
          }}
        >
          {service.title}
        </h3>
      </div>

      <p className="card-description-normal mb-4 sm:mb-6 relative z-10 flex-grow">
        {service.description}
      </p>

      {service.outcome && (
        <div className="mb-4 sm:mb-6 relative z-10 p-3 rounded-lg border border-white/10 bg-white/5">
          <p className="ui-label text-[#4CD787] mb-1">What you get:</p>
          <p className="card-outcome">{service.outcome}</p>
        </div>
      )}

      <ul className="space-y-3 relative z-10">
        {service.features.map((feature, i) => (
          <motion.li
            key={feature}
            className="flex items-center card-feature group"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mr-3 group-hover:w-2 group-hover:h-2 transition-all duration-300"
              style={{
                backgroundColor: cardColor,
                transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
              }}
            />
            <span className="group-hover:text-white/90 transition-colors duration-300">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Running shining line effect on hover */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent top-0"
          style={{
            boxShadow: `0 0 6px ${cardColor}, 0 0 12px ${cardColor}40`,
          }}
          initial={{ x: '-100%' }}
          animate={
            isHovered
              ? {
                  x: ['-100%', '100%'],
                }
              : { x: '-100%' }
          }
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent right-0"
          style={{
            boxShadow: `0 0 6px ${cardColor}, 0 0 12px ${cardColor}40`,
          }}
          initial={{ y: '-100%' }}
          animate={
            isHovered
              ? {
                  y: ['-100%', '100%'],
                }
              : { y: '-100%' }
          }
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
            delay: 0.375,
          }}
        />
        <motion.div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent bottom-0"
          style={{
            boxShadow: `0 0 6px ${cardColor}, 0 0 12px ${cardColor}40`,
          }}
          initial={{ x: '100%' }}
          animate={
            isHovered
              ? {
                  x: ['100%', '-100%'],
                }
              : { x: '100%' }
          }
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
            delay: 0.75,
          }}
        />
        <motion.div
          className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent left-0"
          style={{
            boxShadow: `0 0 6px ${cardColor}, 0 0 12px ${cardColor}40`,
          }}
          initial={{ y: '100%' }}
          animate={
            isHovered
              ? {
                  y: ['100%', '-100%'],
                }
              : { y: '100%' }
          }
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
            delay: 1.125,
          }}
        />
      </motion.div>

      {/* Enhanced background effect on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-tr rounded-xl z-0"
        style={{
          background: `radial-gradient(circle at center, ${cardColor}20 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </motion.div>
  )
}
