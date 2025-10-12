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
    linkedIn: 'https://www.linkedin.com/in/max-sheikhizadeh-7847a68/',
  },
  {
    id: 'milaad',
    name: 'Milaad Sheikhizadeh',
    title: 'General Manager',
    image: '/images/about/milaad-headshot.jpg',
    bio: 'General Manager with a background in business studies at USD and sales experience at Sunrun. Known for brilliance in sales and marketing, and a bright, effective approach to management.',
    linkedIn: 'https://www.linkedin.com/in/milaad-sheikhizadeh-b086392a8/',
  },
]

const OrgChart = ({ className = '' }: OrgChartProps) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-50px', amount: 0.4 })
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  }

  return (
    <>
      <div ref={ref} className={`relative ${className}`}>
        <div className="max-w-5xl mx-auto">
          {/* Leadership Level - Top Row */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mb-8 relative z-10"
            initial={false}
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.2, delayChildren: 0.1 },
              },
            }}
            id="leadership-row"
          >
            {/* Max Sheikhizadeh */}
            <motion.div
              variants={fadeInUp}
              initial={false}
              animate="visible"
              className="text-center group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 cursor-pointer hover:border-[#4CD787]/50 transition-colors w-full max-w-[240px] mx-auto min-h-[260px] flex flex-col justify-between"
              onClick={() => teamMembers[0] && setSelectedMember(teamMembers[0])}
            >
              <div className="relative mb-4">
                <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border-2 border-[#4CD787] shadow-lg">
                  <Image
                    src="/images/about/max-headshot.jpg"
                    alt="Max Sheikhizadeh"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1 leading-tight">
                  Max Sheikhizadeh
                </h3>
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
              initial={false}
              animate="visible"
              className="text-center group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 cursor-pointer hover:border-[#FFD700]/50 transition-colors w-full max-w-[240px] mx-auto min-h-[260px] flex flex-col justify-between"
              onClick={() => teamMembers[1] && setSelectedMember(teamMembers[1])}
            >
              <div className="relative mb-4">
                <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border-2 border-[#FFD700] shadow-lg">
                  <Image
                    src="/images/about/milaad-headshot.jpg"
                    alt="Milaad Sheikhizadeh"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1 leading-tight">
                  Milaad Sheikhizadeh
                </h3>
                <p className="text-[#FFD700] text-xs font-medium mb-2">General Manager</p>
                <button className="bg-[#FFD700]/20 hover:bg-[#FFD700]/30 text-[#FFD700] px-3 py-1.5 rounded-md text-xs font-medium transition-colors border border-[#FFD700]/30">
                  <User className="w-3 h-3 inline mr-1" />
                  Bio
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Centered Connecting Lines Structure */}
          {/* Step 1: Vertical lines positioned exactly under center of leadership cards */}
          <div className="relative -mt-2 mb-4 hidden md:block">
            {/* Use exact same layout as leadership cards to ensure perfect alignment */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12">
              {/* Max's line - positioned to match his card center exactly */}
              <div className="flex justify-center w-full max-w-[240px] mx-auto">
                <motion.div
                  className="w-0.5 h-16 bg-gradient-to-b from-[#4CD787]/60 to-[#4CD787]/40"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />
              </div>
              {/* Milaad's line - positioned to match his card center exactly */}
              <div className="flex justify-center w-full max-w-[240px] mx-auto">
                <motion.div
                  className="w-0.5 h-16 bg-gradient-to-b from-[#FFD700]/60 to-[#FFD700]/40"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Step 2: Extended horizontal line connecting leadership */}
          <div className="hidden md:flex justify-center mb-6">
            <motion.div
              className="h-0.5 w-48 sm:w-64 md:w-80 lg:w-96 bg-gradient-to-r from-transparent via-[#4CD787]/60 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </div>

          {/* Step 3: Single vertical line down to management */}
          <div className="hidden md:flex justify-center mb-6">
            <motion.div
              className="w-0.5 h-20 bg-gradient-to-b from-[#4CD787]/60 to-[#4CD787]/40"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
            />
          </div>

          {/* Step 4: Extended horizontal line to management positions */}
          <div className="hidden md:flex justify-center mb-4">
            <motion.div
              className="h-0.5 w-80 sm:w-96 lg:w-[28rem] xl:w-[32rem] bg-gradient-to-r from-transparent via-[#4CD787]/50 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            />
          </div>

          {/* Step 5: Four vertical lines to management cards - centered under each card */}
          <div className="hidden md:flex justify-center -mb-2">
            <div className="w-full max-w-5xl px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    className="flex justify-center"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                    transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="w-0.5 h-14 bg-gradient-to-b from-[#4CD787]/50 to-[#4CD787]/20" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Management Level */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 relative z-10 mt-6 md:-mt-2"
            initial={false}
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
          >
            {/* Overseas Logistic Manager */}
            {/* TODO: Add photo placeholder - replace icon with Image component when photos are available */}
            <motion.div
              variants={fadeInUp}
              initial={false}
              animate="visible"
              className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#4CD787]/30 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#4CD787]/20 to-[#4CD787]/40 rounded-lg flex items-center justify-center border border-[#4CD787]/30">
                <Users className="w-4 h-4 text-[#4CD787]" />
              </div>
              <h4 className="text-white text-sm font-semibold mb-1">Overseas</h4>
              <h4 className="text-white text-sm font-semibold">Logistic Manager</h4>
            </motion.div>

            {/* Technical Lead */}
            {/* TODO: Add photo placeholder - replace icon with Image component when photos are available */}
            <motion.div
              variants={fadeInUp}
              initial={false}
              animate="visible"
              className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#4834D4]/30 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#4834D4]/20 to-[#4834D4]/40 rounded-lg flex items-center justify-center border border-[#4834D4]/30">
                <Cpu className="w-4 h-4 text-[#4834D4]" />
              </div>
              <h4 className="text-white text-sm font-semibold">Technical Lead</h4>
            </motion.div>

            {/* Project Managers (Consolidated) */}
            {/* TODO: Add photo placeholder - replace icon with Image component when photos are available */}
            <motion.div
              variants={fadeInUp}
              initial={false}
              animate="visible"
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
              initial={false}
              animate="visible"
              className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-[#9d4edd]/30 transition-colors"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-[#9d4edd]/20 to-[#9d4edd]/40 rounded-lg flex items-center justify-center border border-[#9d4edd]/30">
                <Cpu className="w-4 h-4 text-[#9d4edd]" />
              </div>
              <h4 className="text-white text-sm font-semibold">Designer</h4>
            </motion.div>
          </motion.div>

          {/* Connecting lines from management to developers */}
          {/* Step 6: Four vertical lines down from center of management cards */}
          <div className="hidden md:flex justify-center -mb-2 relative -mt-2">
            <div className="w-full max-w-5xl px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    className="flex justify-center"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                    transition={{ delay: 1.8 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="w-0.5 h-12 bg-gradient-to-b from-[#4CD787]/40 to-[#4CD787]/20" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 7: Horizontal line converging to center - shorter to avoid crossing */}
          <div className="hidden md:flex justify-center mb-6">
            <motion.div
              className="h-0.5 w-64 sm:w-80 lg:w-96 bg-gradient-to-r from-transparent via-[#4CD787]/40 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
            />
          </div>

          {/* Step 8: Final vertical line to developers */}
          <div className="hidden md:flex justify-center -mb-2">
            <motion.div
              className="w-0.5 h-16 bg-gradient-to-b from-[#4CD787]/40 to-[#4CD787]/20"
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
              transition={{ delay: 2.4, duration: 0.5 }}
            />
          </div>

          {/* Developers Team Level */}
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto relative mt-6 md:-mt-2">
            <h4 className="text-white text-2xl font-bold mb-2">15+ Senior Developers</h4>
            <p className="text-white/80 text-sm">
              Specialized in Full-Stack, AI/ML, IoT, and Mobile Development
            </p>
          </div>

          {/* Team Stats */}
          <div className="text-center mt-6 md:mt-8 p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4CD787] mb-1">23</div>
                <div className="text-white/80 font-medium text-xs">
                  <span className="block sm:inline">Total Team</span>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#FFD700] mb-1">2</div>
                <div className="text-white/80 font-medium text-xs">Leadership</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4834D4] mb-1">4</div>
                <div className="text-white/80 font-medium text-xs">Management</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#9d4edd] mb-1">17</div>
                <div className="text-white/80 font-medium text-xs">Developers</div>
              </div>
            </div>
          </div>
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
                className="absolute top-3 right-3 md:top-4 md:right-4 p-2 text-white/80 hover:text-white transition-all bg-black/70 rounded-full hover:bg-black/90 hover:scale-110 shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
                aria-label="Close bio modal"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal content */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div
                    className={`w-32 h-32 rounded-2xl overflow-hidden border-3 shadow-2xl ${
                      selectedMember.id === 'max' ? 'border-[#4CD787]' : 'border-[#FFD700]'
                    }`}
                  >
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
                  <p
                    className={`text-lg font-medium mb-4 ${
                      selectedMember.id === 'max' ? 'text-[#4CD787]' : 'text-[#FFD700]'
                    }`}
                  >
                    {selectedMember.title}
                  </p>
                  <p className="text-white/80 leading-relaxed mb-6">{selectedMember.bio}</p>

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
