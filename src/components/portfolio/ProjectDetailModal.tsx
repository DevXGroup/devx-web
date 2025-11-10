'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  X,
  ExternalLink,
  Star,
  TrendingUp,
  Users,
  Award,
  Zap,
  Globe,
  Calendar,
  Target,
  Code,
  Smartphone,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'
import { ProjectData, categoryColors } from '@/data/portfolioProjects'

interface ProjectDetailModalProps {
  project: ProjectData | null
  isOpen: boolean
  onClose: () => void
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const [isMounted, setIsMounted] = useState(false)

  // Always call all hooks first - before any conditional returns
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle ESC key dismiss - always call this hook
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen && isMounted) {
      document.addEventListener('keydown', handleEscKey)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, isMounted])

  // Now we can do conditional returns after all hooks are called
  if (!project || !isOpen || !isMounted) return null

  const categoryColor = categoryColors[project.category as keyof typeof categoryColors] || '#4CD787'

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
    },
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Enhanced Dismiss */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              // Only close if clicking the backdrop, not the modal content
              if (e.target === e.currentTarget) {
                onClose()
              }
            }}
            title="Click to close modal"
          />

          {/* Modal Container */}
          <div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20"
            onClick={(e) => {
              // Close modal when clicking outside the modal content
              if (e.target === e.currentTarget) {
                onClose()
              }
            }}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-6xl max-h-[96vh] md:max-h-[94vh] lg:max-h-[90vh] h-[calc(100vh-4rem)] bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={project.images.banner}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Sticky Close Button - Always visible at top right */}
                <motion.button
                  onClick={onClose}
                  className="sticky top-4 float-right mr-4 mt-4 p-3 rounded-full bg-black/80 backdrop-blur-md border-2 border-white/80 text-white hover:bg-red-600/80 transition-all duration-300 z-[100] shadow-2xl cursor-pointer"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: 'rgba(239, 68, 68, 0.8)',
                  }}
                  whileTap={{ scale: 0.9 }}
                  title="Close modal (ESC key or click outside)"
                >
                  <X size={22} strokeWidth={2.5} />
                </motion.button>

                {/* Category & Status */}
                <div className="absolute top-6 left-6 flex flex-wrap items-center gap-3 max-w-[60%]">
                  <motion.div
                    className="px-4 py-2 rounded-full backdrop-blur-md border"
                    style={{
                      backgroundColor: `${categoryColor}20`,
                      borderColor: `${categoryColor}60`,
                      color: categoryColor,
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="font-semibold">{project.category}</span>
                  </motion.div>

                  {project.metrics?.performance && (
                    <motion.div
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-white/30 backdrop-blur-md shadow-lg"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                    >
                      <TrendingUp size={16} className="text-gray-800" />
                      <span className="text-sm font-bold text-gray-800">
                        {project.metrics.performance}
                      </span>
                    </motion.div>
                  )}

                  {project.metrics?.marketPosition && (
                    <motion.div
                      className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-500/20 border border-blue-500/40 backdrop-blur-md"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Award size={16} className="text-blue-400" />
                      <span className="text-sm font-semibold text-blue-400">
                        {project.metrics.marketPosition}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Project Title */}
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.h2
                    className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    variants={itemVariants}
                  >
                    {project.title}
                  </motion.h2>
                </div>
              </div>

              {/* Content */}
              <div>
                <motion.div
                  className="p-6 lg:p-8 space-y-8"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Description */}
                  <motion.div variants={itemVariants} className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-3">Project Overview</h3>
                    <p className="text-white/80 leading-relaxed text-lg">
                      {project.detailedDescription}
                    </p>
                  </motion.div>

                  {/* Business Impact */}
                  {project.businessImpact && (
                    <motion.div
                      variants={itemVariants}
                      className="p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20"
                    >
                      <div className="flex items-start gap-3">
                        <Target size={24} className="text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Business Impact</h3>
                          <p className="text-white/80 leading-relaxed">{project.businessImpact}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Key Metrics Grid */}
                  {project.metrics && (
                    <motion.div variants={itemVariants} className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Key Metrics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {project.metrics.users && (
                          <motion.div
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                            whileHover={{
                              backgroundColor: `${categoryColor}10`,
                              borderColor: `${categoryColor}30`,
                            }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Users size={20} className="text-blue-400" />
                              <span className="text-sm text-white/60 uppercase font-medium">
                                Users
                              </span>
                            </div>
                            <p className="text-xl font-bold text-white">{project.metrics.users}</p>
                          </motion.div>
                        )}

                        {project.metrics.performance && (
                          <motion.div
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                            whileHover={{
                              backgroundColor: `${categoryColor}10`,
                              borderColor: `${categoryColor}30`,
                            }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Star size={20} className="text-yellow-400" />
                              <span className="text-sm text-white/60 uppercase font-medium">
                                Performance
                              </span>
                            </div>
                            <p className="text-xl font-bold text-white">
                              {project.metrics.performance}
                            </p>
                          </motion.div>
                        )}

                        {project.metrics.marketPosition && (
                          <motion.div
                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                            whileHover={{
                              backgroundColor: `${categoryColor}10`,
                              borderColor: `${categoryColor}30`,
                            }}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <TrendingUp size={20} className="text-green-400" />
                              <span className="text-sm text-white/60 uppercase font-medium">
                                Market
                              </span>
                            </div>
                            <p className="text-xl font-bold text-white">
                              {project.metrics.marketPosition}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Key Features */}
                      <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <CheckCircle size={20} style={{ color: categoryColor }} />
                          Key Features
                        </h3>
                        <div className="space-y-3">
                          {project.keyFeatures.map((feature, index) => (
                            <motion.div
                              key={feature}
                              className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                              variants={itemVariants}
                              whileHover={{ x: 5 }}
                            >
                              <Zap size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                              <span className="text-white/80">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Highlights */}
                      {project.highlights && (
                        <motion.div variants={itemVariants}>
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Star size={20} className="text-yellow-400" />
                            Project Highlights
                          </h3>
                          <div className="space-y-3">
                            {project.highlights.map((highlight, index) => (
                              <motion.div
                                key={highlight}
                                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                              >
                                <ArrowRight size={16} className="text-yellow-400" />
                                <span className="text-white/80">{highlight}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Technologies */}
                      <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Code size={20} style={{ color: categoryColor }} />
                          Technologies Used
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <motion.span
                              key={tech}
                              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
                              whileHover={{
                                backgroundColor: `${categoryColor}20`,
                                borderColor: `${categoryColor}40`,
                                color: categoryColor,
                              }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Platforms */}
                      <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Smartphone size={20} style={{ color: categoryColor }} />
                          Platforms
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.platforms.map((platform) => (
                            <motion.span
                              key={platform}
                              className="px-3 py-2 rounded-lg border text-white/80"
                              style={{
                                backgroundColor: `${categoryColor}10`,
                                borderColor: `${categoryColor}30`,
                              }}
                              whileHover={{ scale: 1.05 }}
                            >
                              {platform}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Project Details */}
                      <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Globe size={20} style={{ color: categoryColor }} />
                          Project Details
                        </h3>
                        <div className="space-y-3">
                          {project.completionYear && (
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-blue-400" />
                                <span className="text-white/60">Completion Year</span>
                              </div>
                              <span className="font-semibold text-white">
                                {project.completionYear}
                              </span>
                            </div>
                          )}
                          {project.projectDuration && (
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="flex items-center gap-2">
                                <Globe size={16} className="text-green-400" />
                                <span className="text-white/60">Duration</span>
                              </div>
                              <span className="font-semibold text-white">
                                {project.projectDuration}
                              </span>
                            </div>
                          )}
                          {project.teamSize && (
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="flex items-center gap-2">
                                <Users size={16} className="text-purple-400" />
                                <span className="text-white/60">Team Size</span>
                              </div>
                              <span className="font-semibold text-white">{project.teamSize}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Services Used */}
                  <motion.div variants={itemVariants} className="pt-6 border-t border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Services Provided</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.services.map((service) => (
                        <motion.div
                          key={service}
                          className="px-4 py-2 rounded-full border text-sm font-medium"
                          style={{
                            backgroundColor: `${categoryColor}15`,
                            borderColor: `${categoryColor}40`,
                            color: categoryColor,
                          }}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {service}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Call to Action */}
                  <motion.div variants={itemVariants} className="pt-6 border-t border-white/10">
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold text-white">
                        Ready to Start Your Project?
                      </h3>
                      <p className="text-white/70">
                        Let&apos;s discuss how we can bring your vision to life with cutting-edge
                        solutions.
                      </p>
                      <motion.a
                        href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-black"
                        style={{
                          backgroundColor: categoryColor,
                        }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: `0 10px 30px ${categoryColor}40`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Schedule a Consultation
                        <ExternalLink size={16} />
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectDetailModal
