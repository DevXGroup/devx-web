'use client'

import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import {
  ExternalLink,
  Star,
  TrendingUp,
  Users,
  Award,
  Zap,
  Globe,
  Calendar,
  Target,
  Smartphone,
  Monitor,
} from 'lucide-react'
import { ProjectData, categoryColors } from '@/data/portfolioProjects'

interface EnhancedProjectCardProps {
  project: ProjectData
  index: number
  onViewDetails?: (project: ProjectData) => void
}

const EnhancedProjectCard = ({ project, index, onViewDetails }: EnhancedProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    controls.start({
      scale: 1.01,
      transition: { duration: 0.3, ease: 'easeOut' },
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    controls.start({
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    })
  }

  const categoryColor = categoryColors[project.category as keyof typeof categoryColors] || '#4CD787'

  return (
    <motion.div
      ref={cardRef}
      animate={controls}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer overflow-hidden
        bg-black/40 backdrop-blur-md border border-white/10
        rounded-2xl hover:border-white/20 transition-all duration-500
        h-[680px] 2xl:h-[800px] 2xl:w-[calc(100%+40px)] 2xl:ml-[-20px]"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileInView={{
        opacity: 1,
        transition: {
          delay: index * 0.08,
          duration: 0.7,
          ease: 'easeOut',
        },
      }}
      initial={{ opacity: 0 }}
    >
      {/* Subtle Glow Effect */}
      {isHovered && isMounted && (
        <motion.div
          className="absolute pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(400px circle at center, ${categoryColor}10, transparent 60%)`,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Main Content Container */}
      <div className="relative h-full flex flex-col">
        {/* Image Section */}
        <div className="relative overflow-hidden h-72 2xl:h-96">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src={project.images.banner}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

            {/* Category Badge - Enhanced Visibility */}
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                className="px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border-2 shadow-lg text-white"
                style={{
                  backgroundColor: `${categoryColor}40`,
                  borderColor: `${categoryColor}80`,
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                }}
                whileHover={{ scale: 1.05, backgroundColor: `${categoryColor}50` }}
              >
                {project.category}
              </motion.div>
            </div>

            {/* Project Highlights Floating Elements */}
            {project.highlights && isHovered && isMounted && (
              <div className="absolute inset-0 overflow-hidden">
                {project.highlights.slice(0, 2).map((highlight, i) => (
                  <motion.div
                    key={i}
                    className={`absolute text-xs font-medium text-white/80 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/20 ${
                      i === 0 ? 'top-16 right-6' : 'bottom-16 left-6'
                    }`}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                  >
                    <div className="flex items-center gap-1">
                      <Zap size={10} className="text-yellow-400" />
                      {highlight}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative flex-1 p-6 2xl:p-8 flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <motion.h3
                  className="font-bold text-white leading-tight text-lg sm:text-xl 2xl:text-2xl"
                  whileHover={{ color: categoryColor }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>

                <p className="text-white/70 mt-2 leading-relaxed text-sm 2xl:text-base 2xl:mt-3">
                  {project.shortDescription}
                </p>
              </div>
            </div>

            {/* Tech Stack Preview */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-white/80"
                  whileHover={{
                    backgroundColor: `${categoryColor}20`,
                    borderColor: `${categoryColor}40`,
                    color: categoryColor,
                  }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-white/60">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          {project.metrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 2xl:my-8">
              {project.metrics.users && (
                <motion.div
                  className="flex items-center gap-2 text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <Users size={16} className="text-blue-400" />
                  <span className="text-white/80">{project.metrics.users}</span>
                </motion.div>
              )}
              {project.metrics.performance && (
                <motion.div
                  className="flex items-center gap-2 text-sm md:justify-end"
                  whileHover={{ scale: 1.05 }}
                >
                  <Star size={16} className="text-yellow-400" />
                  <span className="text-white/80">{project.metrics.performance}</span>
                </motion.div>
              )}
            </div>
          )}

          {/* Business Impact */}
          {project.businessImpact && (
            <motion.div
              className="mb-6 2xl:mb-8 p-4 2xl:p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-2">
                <Target size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white/80 leading-relaxed">{project.businessImpact}</p>
              </div>
            </motion.div>
          )}

          {/* Bottom Section */}
          <div className="space-y-4 mt-auto">
            {/* Project Details */}
            <div className="flex items-center gap-4 text-xs text-white/60">
              {project.completionYear && (
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  {project.completionYear}
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  {project.teamSize}
                </div>
              )}
              {project.projectDuration && (
                <div className="flex items-center gap-1">
                  <Globe size={12} />
                  {project.projectDuration}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-end justify-between pt-4">
              <motion.button
                onClick={() => onViewDetails?.(project)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-white/10 to-white/5 hover:from-white/20 hover:to-white/10 border-2 border-white/30 hover:border-white/50 text-white transition-all duration-300 font-semibold shadow-lg h-10"
                whileHover={{
                  backgroundColor: `${categoryColor}25`,
                  borderColor: `${categoryColor}70`,
                  color: categoryColor,
                  scale: 1.05,
                  boxShadow: `0 4px 12px ${categoryColor}30`,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-bold whitespace-nowrap">View Details</span>
                <ExternalLink size={14} />
              </motion.button>

              {/* Platform Support Section - Right Aligned */}
              <div className="flex flex-col gap-3 items-end">
                {/* Awards Row */}
                {project.awards && project.awards.length > 0 && (
                  <motion.div
                    className="flex items-center gap-1 text-yellow-400"
                    whileHover={{ scale: 1.1 }}
                    title="Award Winner"
                  >
                    <Award size={16} />
                  </motion.div>
                )}

                {/* Platform Support */}
                <div className="flex flex-col gap-2 items-end">
                  <span className="text-xs font-medium text-white/70 uppercase tracking-wide">
                    Supported Platforms
                  </span>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    {/* iOS */}
                    {project.platforms.some((p) => p.toLowerCase().includes('ios')) && (
                      <motion.div
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/8 border border-white/15"
                        title="Available on iOS"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-white">iOS</span>
                      </motion.div>
                    )}

                    {/* Android */}
                    {project.platforms.some((p) => p.toLowerCase().includes('android')) && (
                      <motion.div
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-500/12 border border-green-500/25"
                        title="Available on Android"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 197, 94, 0.18)' }}
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-green-400">
                            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
                          </svg>
                        </div>
                        <span className="text-xs font-medium text-green-400">Android</span>
                      </motion.div>
                    )}

                    {/* Web */}
                    {project.platforms.some(
                      (p) => p.toLowerCase().includes('web') || p.toLowerCase().includes('website')
                    ) && (
                      <motion.div
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-blue-500/12 border border-blue-500/25"
                        title="Available on Web"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.18)' }}
                      >
                        <Globe size={12} className="text-blue-400" />
                        <span className="text-xs font-medium text-blue-400">Web</span>
                      </motion.div>
                    )}

                    {/* Desktop App */}
                    {project.platforms.some(
                      (p) =>
                        p.toLowerCase().includes('admin') || p.toLowerCase().includes('dashboard')
                    ) && (
                      <motion.div
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-yellow-500/12 border border-yellow-500/25"
                        title="Desktop App"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(234, 179, 8, 0.18)' }}
                      >
                        <Monitor size={12} className="text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-400">Desktop App</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Running shining line effect on hover */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent top-0"
          style={{
            boxShadow: `0 0 6px ${categoryColor}, 0 0 12px ${categoryColor}40`,
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
            boxShadow: `0 0 6px ${categoryColor}, 0 0 12px ${categoryColor}40`,
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
            boxShadow: `0 0 6px ${categoryColor}, 0 0 12px ${categoryColor}40`,
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
            boxShadow: `0 0 6px ${categoryColor}, 0 0 12px ${categoryColor}40`,
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

      {/* Simple Border Highlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none border-2"
        style={{
          borderColor: isHovered ? `${categoryColor}30` : 'transparent',
          transition: 'border-color 0.3s ease',
        }}
      />
    </motion.div>
  )
}

export default EnhancedProjectCard
