'use client'

import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { 
  ExternalLink, 
  Star, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  Globe,
  Calendar,
  Target
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
  const cardRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

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
      transition: { duration: 0.3, ease: 'easeOut' }
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    controls.start({
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
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
        h-[600px] sm:h-[660px] lg:h-[700px]"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: index * 0.1,
          duration: 0.6,
          ease: 'easeOut'
        }
      }}
      initial={{ opacity: 0, y: 60 }}
    >
      {/* Subtle Glow Effect */}
      {isHovered && (
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
        <div className="relative overflow-hidden h-64 sm:h-72 lg:h-80">
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.08 }}
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

            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border"
                style={{
                  backgroundColor: `${categoryColor}20`,
                  borderColor: `${categoryColor}60`,
                  color: categoryColor
                }}
                whileHover={{ scale: 1.05 }}
              >
                {project.category}
              </motion.div>
            </div>

            {/* Metrics Badge */}
            {project.metrics && (
              <div className="absolute top-4 right-4 z-10">
                <motion.div
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/40 backdrop-blur-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp size={12} className="text-green-400" />
                  <span className="text-xs font-semibold text-green-400">
                    {project.metrics.marketPosition?.includes('#1') ? '#1' : 'Top'}
                  </span>
                </motion.div>
              </div>
            )}

            {/* Project Highlights Floating Elements */}
            {project.highlights && isHovered && (
              <div className="absolute inset-0 overflow-hidden">
                {project.highlights.slice(0, 2).map((highlight, i) => (
                  <motion.div
                    key={i}
                    className={`absolute text-xs font-medium text-white/80 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/20 ${
                      i === 0 
                        ? 'top-16 right-6' 
                        : 'bottom-16 left-6'
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
        <div className="relative flex-1 p-6 flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <motion.h3 
                  className="font-bold text-white leading-tight text-lg sm:text-xl"
                  whileHover={{ color: categoryColor }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                
                <p className="text-white/70 mt-2 leading-relaxed text-sm">
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
                    color: categoryColor
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
            <div className="grid grid-cols-2 gap-4 my-6">
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
                  className="flex items-center gap-2 text-sm"
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
              className="mb-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-2">
                <Target size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white/80 leading-relaxed">
                  {project.businessImpact}
                </p>
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
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => onViewDetails?.(project)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white transition-all duration-300"
                whileHover={{ 
                  backgroundColor: `${categoryColor}20`,
                  borderColor: `${categoryColor}60`,
                  color: categoryColor,
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium">View Details</span>
                <ExternalLink size={14} />
              </motion.button>

              {/* Services Icons */}
              <div className="flex items-center gap-2">
                {project.awards && project.awards.length > 0 && (
                  <motion.div
                    className="flex items-center gap-1 text-yellow-400"
                    whileHover={{ scale: 1.1 }}
                    title="Award Winner"
                  >
                    <Award size={16} />
                  </motion.div>
                )}
                <div className="flex items-center gap-1">
                  {project.platforms.slice(0, 3).map((platform, i) => (
                    <motion.div
                      key={platform}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: categoryColor }}
                      whileHover={{ scale: 1.2 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.7, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Border Highlight */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none border-2"
        style={{
          borderColor: isHovered ? `${categoryColor}30` : 'transparent',
          transition: 'border-color 0.3s ease'
        }}
      />
    </motion.div>
  )
}

export default EnhancedProjectCard