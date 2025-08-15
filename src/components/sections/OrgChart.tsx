'use client'

import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Users, Calendar, Cpu, X, User } from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  title: string
  image: string
  bio: string
  linkedIn?: string
}

interface OrgChartProps {
  className?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 'max',
    name: 'Max Sheikhizadeh',
    title: 'CEO/CTO & Founder',
    image: '/images/about/max-headshot.jpg',
    bio: '15+ years of experience at Amazon, Viasat, Qualcomm, and high-growth startups. Led core teams delivering innovative features for Amazon e-commerce platforms. Combines deep engineering expertise with collaborative leadership to drive team growth and consistent success.',
    linkedIn: 'https://www.linkedin.com/in/max-sheikhizadeh-7847a68/'
  },
  {
    id: 'milaad',
    name: 'Milaad Sheikhizadeh',
    title: 'General Manager',
    image: '/images/about/milaad-headshot.jpg',
    bio: 'General Manager with a background in business studies at USD and sales experience at Sunrun. Known for brilliance in sales and marketing, and a bright, effective approach to management.',
    linkedIn: 'https://www.linkedin.com/in/milaad-sheikhizadeh-b086392a8/'
  }
]

const OrgChart = ({ className = '' }: OrgChartProps) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }

  return (
    <>
      <div ref={ref} className={`relative ${className}`}>
        <div className="max-w-5xl mx-auto">
          {/* Leadership Level - Top Row */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mb-8 relative z-10"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2, delayChildren: 0.3 }
              }
            }}
          >
            {/* Max Sheikhizadeh */}
            <motion.div 
              variants={fadeInUp}
              className="text-center group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 cursor-pointer hover:border-[#4CD787]/50 transition-colors w-full max-w-[240px] mx-auto min-h-[260px] flex flex-col justify-between"
              onClick={() => setSelectedMember(teamMembers[0])}
            >
              <div className="relative mb-3">
                <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden border-2 border-[#4CD787] shadow-lg">
                  <Image
                    src="/images/about/max-headshot.jpg"
                    alt="Max Sheikhizadeh"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1 leading-tight">Max Sheikhizadeh</h3>
                <p className="text-[#4CD787] text-xs font-medium mb-2">CEO/CTO & Founder</p>
                <button className="bg-[#4CD787]/20 hover:bg-[#4CD787]/30 text-[#4CD787] px-3 py-1.5 rounded-md text-xs font-medium transition-colors border border-[#4CD787]/30">
                  <User className="w-3 h-3 inline mr-1" />
                  Bio
                </button>
              </div>
            </motion.div>

            {/* Milaad Sheikhizadeh */}
            <motion.div 
              variants={fadeInUp}
              className="text-center group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 cursor-pointer hover:border-[#FFD700]/50 transition-colors w-full max-w-[240px] mx-auto min-h-[260px] flex flex-col justify-between"
              onClick={() => setSelectedMember(teamMembers[1])}
            >
              <div className="relative mb-3">
                <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden border-2 border-[#FFD700] shadow-lg">
                  <Image
                    src="/images/about/milaad-headshot.jpg"
                    alt="Milaad Sheikhizadeh"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1 leading-tight">Milaad Sheikhizadeh</h3>
                <p className="text-[#FFD700] text-xs font-medium mb-2">General Manager</p>
                <button className="bg-[#FFD700]/20 hover:bg-[#FFD700]/30 text-[#FFD700] px-3 py-1.5 rounded-md text-xs font-medium transition-colors border border-[#FFD700]/30">
                  <User className="w-3 h-3 inline mr-1" />
                  Bio
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Connecting Lines Structure */}
          {/* Step 1: Connect Max and Milaad together with horizontal line - positioned to connect to bottom of cards */}
          <div className="flex justify-center -mb-2 relative -mt-2">
            <motion.div 
              className="h-0.5 w-60 bg-gradient-to-r from-[#4CD787]/40 via-[#4CD787]/60 to-[#FFD700]/40"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
          </div>

          {/* Step 2: Single vertical line down from center */}
          <div className="flex justify-center mb-4">
            <motion.div 
              className="w-0.5 h-16 bg-gradient-to-b from-[#4CD787]/60 to-[#4CD787]/40"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            />
          </div>

          {/* Step 3: Horizontal line spanning to departments */}
          <div className="flex justify-center mb-4">
            <motion.div 
              className="h-0.5 w-96 bg-gradient-to-r from-transparent via-[#4CD787]/50 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            />
          </div>

          {/* Step 4: Three vertical lines to departments - positioned to connect to top of management cards */}
          <div className="flex justify-center -mb-2">
            <div className="grid grid-cols-3 gap-12 w-96">
              {[0, 1, 2].map((index) => (
                <motion.div 
                  key={index}
                  className="flex justify-center"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                >
                  <div className="w-0.5 h-12 bg-gradient-to-b from-[#4CD787]/50 to-[#4CD787]/20" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Management Level */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 relative z-10 -mt-2"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 1.5 }
              }
            }}
          >
            {/* Overseas Logistic Manager */}
            {/* TODO: Add photo placeholder - replace icon with Image component when photos are available */}
            <motion.div 
              variants={fadeInUp}
              className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#4CD787]/30 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#4CD787]/20 to-[#4CD787]/40 rounded-lg flex items-center justify-center border border-[#4CD787]/30">
                <Users className="w-4 h-4 text-[#4CD787]" />
              </div>
              <h4 className="text-white text-sm font-semibold mb-1">Overseas</h4>
              <h4 className="text-white text-sm font-semibold">Logistic Manager</h4>
            </motion.div>

            {/* Project Managers (Consolidated) */}
            {/* TODO: Add photo placeholder - replace icon with Image component when photos are available */}
            <motion.div 
              variants={fadeInUp}
              className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#FFD700]/30 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/40 rounded-lg flex items-center justify-center border border-[#FFD700]/30">
                <Calendar className="w-4 h-4 text-[#FFD700]" />
              </div>
              <h4 className="text-white text-sm font-semibold mb-1">Project</h4>
              <h4 className="text-white text-sm font-semibold">Managers</h4>
            </motion.div>

            {/* Designer */}
            {/* TODO: Add photo placeholder - replace icon with Image component when photos are available */}
            <motion.div 
              variants={fadeInUp}
              className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#9d4edd]/30 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#9d4edd]/20 to-[#9d4edd]/40 rounded-lg flex items-center justify-center border border-[#9d4edd]/30">
                <Cpu className="w-4 h-4 text-[#9d4edd]" />
              </div>
              <h4 className="text-white text-sm font-semibold">Designer</h4>
            </motion.div>
          </motion.div>

          {/* Connecting lines from departments to developers */}
          {/* Step 5: Three vertical lines down from departments - connect to bottom of management cards */}
          <div className="flex justify-center -mb-2 relative -mt-2">
            <div className="grid grid-cols-3 gap-12 w-96">
              {[0, 1, 2].map((index) => (
                <motion.div 
                  key={index}
                  className="flex justify-center"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.4 }}
                >
                  <div className="w-0.5 h-8 bg-gradient-to-b from-[#4CD787]/40 to-[#4CD787]/20" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Step 6: Horizontal line converging to center */}
          <div className="flex justify-center mb-4">
            <motion.div 
              className="h-0.5 w-96 bg-gradient-to-r from-transparent via-[#4CD787]/40 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            />
          </div>

          {/* Step 7: Final vertical line to developers - connect to top of developers card */}
          <div className="flex justify-center -mb-2">
            <motion.div 
              className="w-0.5 h-12 bg-gradient-to-b from-[#4CD787]/40 to-[#4CD787]/20"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ delay: 2.4, duration: 0.5 }}
            />
          </div>

          {/* Developers Team Level */}
          <motion.div 
            className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto relative -mt-2"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 2.6 }}
          >
            <motion.h4 
              className="text-white text-2xl font-bold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 2.8 }}
            >
              15+ Senior Developers
            </motion.h4>
            
            <motion.p 
              className="text-white/80 text-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 3.0 }}
            >
              Specialized in Full-Stack, AI/ML, IoT, and Mobile Development
            </motion.p>
          </motion.div>

          {/* Team Stats */}
          <motion.div 
            className="text-center mt-8 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 3.2, duration: 0.6 }}
          >
            <div className="flex justify-center items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4CD787] mb-1">23</div>
                <div className="text-white/80 font-medium text-xs">Total Team</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700] mb-1">2</div>
                <div className="text-white/80 font-medium text-xs">Leadership</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4834D4] mb-1">18</div>
                <div className="text-white/80 font-medium text-xs">Specialists</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bio Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              className="bg-[#0B1426] border border-white/20 rounded-2xl p-8 max-w-2xl w-full mx-4 relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal content */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-32 h-32 rounded-2xl overflow-hidden border-3 shadow-2xl ${
                    selectedMember.id === 'max' ? 'border-[#4CD787]' : 'border-[#FFD700]'
                  }`}>
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedMember.name}</h3>
                  <p className={`text-lg font-medium mb-4 ${
                    selectedMember.id === 'max' ? 'text-[#4CD787]' : 'text-[#FFD700]'
                  }`}>
                    {selectedMember.title}
                  </p>
                  <p className="text-white/80 leading-relaxed mb-6">
                    {selectedMember.bio}
                  </p>
                  
                  {selectedMember.linkedIn && (
                    <a
                      href={selectedMember.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedMember.id === 'max' 
                          ? 'bg-[#4CD787]/20 hover:bg-[#4CD787]/30 text-[#4CD787] border border-[#4CD787]/30'
                          : 'bg-[#FFD700]/20 hover:bg-[#FFD700]/30 text-[#FFD700] border border-[#FFD700]/30'
                      }`}
                    >
                      LinkedIn ›
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default OrgChart