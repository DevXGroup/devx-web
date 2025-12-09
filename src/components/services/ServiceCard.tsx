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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  // Only animate border when hovered and mounted
  const shouldAnimateBorder = isMounted && isHovered

  const cardColor = service.color || '#4CD787'

  return (
    <motion.div
      ref={ref}
      className="group relative bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {showParticles && (
        <ParticleAnimation color={cardColor} density={isHovered ? 25 : 15} speed={0.2} />
      )}

      {/* Morphing background blob - Attio style */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{
          background: `radial-gradient(circle at 50% 50%, ${cardColor}00 0%, transparent 100%)`,
        }}
        whileHover={{
          background: [
            `radial-gradient(circle at 20% 80%, ${cardColor}15 0%, transparent 60%)`,
            `radial-gradient(circle at 80% 20%, ${cardColor}20 0%, transparent 50%)`,
            `radial-gradient(circle at 30% 70%, ${cardColor}15 0%, transparent 60%)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="flex items-start mb-6 relative z-10 gap-4">
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl shrink-0 border transition-all duration-300 relative overflow-hidden"
          style={{
            backgroundColor: isHovered ? `${cardColor}20` : 'rgba(255,255,255,0.05)',
            borderColor: isHovered ? `${cardColor}40` : 'rgba(255,255,255,0.1)',
          }}
          whileHover={{
            boxShadow: `0 0 30px ${cardColor}60`,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Icon pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{ backgroundColor: `${cardColor}30` }}
          />
          <Icon
            className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300 relative z-10"
            style={{
              color: isHovered ? cardColor : 'white',
              filter: isHovered ? `drop-shadow(0 0 4px ${cardColor}80)` : 'none',
            }}
            strokeWidth={1.5}
          />
        </motion.div>
        <motion.h3
          className="card-title text-white mt-1"
          whileHover={{
            scale: 1.02,
            textShadow: `0 0 15px ${cardColor}80`,
          }}
          transition={{ duration: 0.3 }}
        >
          {service.title}
        </motion.h3>
      </div>

      <p className="card-description-normal text-zinc-400 mb-6 relative z-10 flex-grow group-hover:text-zinc-300 transition-colors duration-500">
        {service.description}
      </p>

      {service.outcome && (
        <div className="mb-6 relative z-10 p-4 rounded-xl border border-white/5 bg-white/[0.02] group-hover:border-white/10 transition-all duration-300">
          <p className="card-eyebrow mb-2" style={{ color: cardColor }}>
            What you get:
          </p>
          <p className="card-body text-zinc-300">{service.outcome}</p>
        </div>
      )}

      {/* Divider */}
      <div className="h-px w-full bg-white/5 mb-6 relative z-10 group-hover:bg-white/10 transition-colors duration-300" />

      <ul className="space-y-3 relative z-10">
        {service.features.map((feature, i) => (
          <motion.li
            key={feature}
            className="flex items-start gap-3 group/item"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 transition-all duration-300"
              style={{
                backgroundColor: cardColor,
                transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                boxShadow: isHovered ? `0 0 8px ${cardColor}80` : 'none',
              }}
            />
            <span className="card-feature group-hover/item:text-white transition-colors duration-300 leading-relaxed">
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Interaction overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

      {/* Running shining line effect on hover - optimized to prevent flashing */}
      {shouldAnimateBorder && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Top border */}
          <motion.div
            className="absolute w-full h-[2px] top-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${cardColor}, transparent)`,
            }}
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {/* Right border */}
          <motion.div
            className="absolute w-[2px] h-full right-0"
            style={{
              background: `linear-gradient(180deg, transparent, ${cardColor}, transparent)`,
            }}
            initial={{ y: '-100%' }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.5,
            }}
          />
          {/* Bottom border */}
          <motion.div
            className="absolute w-full h-[2px] bottom-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${cardColor}, transparent)`,
            }}
            initial={{ x: '100%' }}
            animate={{ x: ['100%', '-100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 1,
            }}
          />
          {/* Left border */}
          <motion.div
            className="absolute w-[2px] h-full left-0"
            style={{
              background: `linear-gradient(180deg, transparent, ${cardColor}, transparent)`,
            }}
            initial={{ y: '100%' }}
            animate={{ y: ['100%', '-100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.5,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}
