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
    image: '/images/about/max-headshot.png',
    bio: '15+ years of experience at Amazon, Viasat, Qualcomm, and high-growth startups. Led core teams delivering innovative features for Amazon e-commerce platforms. Combines deep engineering expertise with collaborative leadership to drive team growth and consistent success.',
    linkedIn: 'https://www.linkedin.com/in/max-sheikhizadeh-7847a68/'
  },
  {
    id: 'milaad',
    name: 'Milaad Sheikhizadeh',
    title: 'General Manager',
    image: '/images/about/milaad-headshot.png',
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

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  }

  const shineLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: [0, 1, 0],
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
      }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }

  return (
    <>
      <div ref={ref} className={`relative ${className}`}>
        <div className="max-w-6xl mx-auto">
          {/* Leadership Level - Top Row */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-20 mb-16"
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
              className="text-center group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-[#4CD787]/50 transition-colors"
              onClick={() => setSelectedMember(teamMembers[0])}
            >
              <div className="relative mb-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-2xl overflow-hidden border-3 border-[#4CD787] shadow-2xl">
                  <Image
                    src="/images/about/max-headshot.png"
                    alt="Max Sheikhizadeh"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-white text-xl mb-2">Max Sheikhizadeh</h3>
              <p className="text-[#4CD787] text-sm font-medium mb-3">CEO/CTO & Founder</p>
              <button className="bg-[#4CD787]/20 hover:bg-[#4CD787]/30 text-[#4CD787] px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-[#4CD787]/30">
                <User className="w-4 h-4 inline mr-2" />
                Short Bio
              </button>
            </motion.div>

            {/* Milaad Sheikhizadeh */}
            <motion.div 
              variants={fadeInUp}
              className="text-center group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 cursor-pointer hover:border-[#CFB53B]/50 transition-colors"
              onClick={() => setSelectedMember(teamMembers[1])}
            >
              <div className="relative mb-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-2xl overflow-hidden border-3 border-[#CFB53B] shadow-2xl">
                  <Image
                    src="/images/about/milaad-headshot.png"
                    alt="Milaad Sheikhizadeh"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="font-bold text-white text-xl mb-2">Milaad Sheikhizadeh</h3>
              <p className="text-[#CFB53B] text-sm font-medium mb-3">General Manager</p>
              <button className="bg-[#CFB53B]/20 hover:bg-[#CFB53B]/30 text-[#CFB53B] px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-[#CFB53B]/30">
                <User className="w-4 h-4 inline mr-2" />
                Short Bio
              </button>
            </motion.div>
          </motion.div>

          {/* Animated Connecting Lines SVG */}
          <div className="relative mb-16">
            <svg className="w-full h-48 sm:h-64 absolute top-0 left-0" viewBox="0 0 1200 240" fill="none">
              {/* Horizontal line connecting the leaders */}
              <motion.path
                d="M400 40 L800 40"
                stroke="url(#gradient1)"
                strokeWidth="4"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={drawLine}
                transition={{ delay: 1 }}
              />
              
              {/* Shining line effect on leadership connection */}
              <motion.path
                d="M400 40 L800 40"
                stroke="url(#shineGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={shineLine}
                transition={{ delay: 1.5 }}
              />
              
              {/* Vertical line down from center of leadership */}
              <motion.path
                d="M600 40 L600 120"
                stroke="url(#gradient2)"
                strokeWidth="4"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={drawLine}
                transition={{ delay: 1.8 }}
              />
              
              {/* Horizontal line connecting all managers */}
              <motion.path
                d="M300 120 L900 120"
                stroke="url(#gradient3)"
                strokeWidth="4"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={drawLine}
                transition={{ delay: 2.2 }}
              />
              
              {/* Shining line effect for managers */}
              <motion.path
                d="M300 120 L900 120"
                stroke="url(#shineGradient2)"
                strokeWidth="6"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={shineLine}
                transition={{ delay: 2.8 }}
              />
              
              {/* Vertical lines from managers level down */}
              <motion.path
                d="M375 120 L375 160"
                stroke="#4CD787"
                strokeWidth="3"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={drawLine}
                transition={{ delay: 2.5 }}
              />
              <motion.path
                d="M525 120 L525 160"
                stroke="#CFB53B"
                strokeWidth="3"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={drawLine}
                transition={{ delay: 2.6 }}
              />
              <motion.path
                d="M675 120 L675 160"
                stroke="#4834D4"
                strokeWidth="3"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={drawLine}
                transition={{ delay: 2.7 }}
              />
              <motion.path
                d="M825 120 L825 160"
                stroke="#9d4edd"
                strokeWidth="3"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={drawLine}
                transition={{ delay: 2.8 }}
              />
              
              {/* Horizontal line collecting from managers to developers */}
              <motion.path
                d="M375 160 L825 160"
                stroke="url(#gradient4)"
                strokeWidth="3"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={drawLine}
                transition={{ delay: 3.0 }}
              />
              
              {/* Final vertical line to developers */}
              <motion.path
                d="M600 160 L600 200"
                stroke="url(#gradient5)"
                strokeWidth="4"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={drawLine}
                transition={{ delay: 3.2 }}
              />
              
              {/* Shining effect on final developer connection */}
              <motion.path
                d="M600 160 L600 200"
                stroke="url(#shineGradient3)"
                strokeWidth="6"
                strokeLinecap="round"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={shineLine}
                transition={{ delay: 3.5 }}
              />

              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4CD787" />
                  <stop offset="100%" stopColor="#CFB53B" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4CD787" />
                  <stop offset="100%" stopColor="#4834D4" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4CD787" />
                  <stop offset="25%" stopColor="#CFB53B" />
                  <stop offset="50%" stopColor="#4834D4" />
                  <stop offset="75%" stopColor="#9d4edd" />
                  <stop offset="100%" stopColor="#4CD787" />
                </linearGradient>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4CD787" />
                  <stop offset="33%" stopColor="#CFB53B" />
                  <stop offset="66%" stopColor="#4834D4" />
                  <stop offset="100%" stopColor="#9d4edd" />
                </linearGradient>
                <linearGradient id="gradient5" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4834D4" />
                  <stop offset="100%" stopColor="#9d4edd" />
                </linearGradient>
                
                {/* Shining gradients */}
                <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="45%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="transparent" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="shineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="45%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="transparent" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="shineGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="45%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="transparent" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Management Level */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 mt-48"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 2.8 }
              }
            }}
          >
            {/* Overseas Logistic Manager */}
            <motion.div 
              variants={fadeInUp}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#4CD787]/20 to-[#4CD787]/40 rounded-xl flex items-center justify-center border border-[#4CD787]/30">
                <Users className="w-6 h-6 text-[#4CD787]" />
              </div>
              <h4 className="text-white text-base font-semibold mb-1">Overseas</h4>
              <h4 className="text-white text-base font-semibold mb-2">Logistic Manager</h4>
            </motion.div>

            {/* Overseas Projects Manager */}
            <motion.div 
              variants={fadeInUp}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#CFB53B]/20 to-[#CFB53B]/40 rounded-xl flex items-center justify-center border border-[#CFB53B]/30">
                <Calendar className="w-6 h-6 text-[#CFB53B]" />
              </div>
              <h4 className="text-white text-base font-semibold mb-1">Overseas</h4>
              <h4 className="text-white text-base font-semibold mb-2">Projects Manager</h4>
            </motion.div>

            {/* Project Manager */}
            <motion.div 
              variants={fadeInUp}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#4834D4]/20 to-[#4834D4]/40 rounded-xl flex items-center justify-center border border-[#4834D4]/30">
                <Calendar className="w-6 h-6 text-[#4834D4]" />
              </div>
              <h4 className="text-white text-base font-semibold mb-1">Project</h4>
              <h4 className="text-white text-base font-semibold mb-2">Manager</h4>
            </motion.div>

            {/* Designer */}
            <motion.div 
              variants={fadeInUp}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#9d4edd]/20 to-[#9d4edd]/40 rounded-xl flex items-center justify-center border border-[#9d4edd]/30">
                <Cpu className="w-6 h-6 text-[#9d4edd]" />
              </div>
              <h4 className="text-white text-base font-semibold mb-1">Designer</h4>
            </motion.div>
          </motion.div>

          {/* Developers Team Level */}
          <motion.div 
            className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 3.2 }}
          >
            <div className="flex justify-center items-center gap-3 mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-12 h-12 bg-gradient-to-br from-[#9d4edd]/30 to-[#9d4edd]/60 rounded-full flex items-center justify-center border-2 border-[#9d4edd]/50"
                  animate={shouldReduceMotion ? {} : { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 360, 0] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.3 + 3.5 
                  }}
                >
                  <Users className="w-5 h-5 text-[#9d4edd]" />
                </motion.div>
              ))}
            </div>
            <h4 className="text-white text-2xl font-bold mb-2">15+ Senior Devs</h4>
          </motion.div>

          {/* Team Stats */}
          <motion.div 
            className="text-center mt-12 p-8 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 3.8, duration: 0.6 }}
          >
            <div className="flex justify-center items-center gap-8 text-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4CD787] mb-1">23</div>
                <div className="text-white/80 font-medium">Total Team</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#CFB53B] mb-1">2</div>
                <div className="text-white/80 font-medium">Leadership</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4834D4] mb-1">18</div>
                <div className="text-white/80 font-medium">Specialists</div>
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
                    selectedMember.id === 'max' ? 'border-[#4CD787]' : 'border-[#CFB53B]'
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
                    selectedMember.id === 'max' ? 'text-[#4CD787]' : 'text-[#CFB53B]'
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
                          : 'bg-[#CFB53B]/20 hover:bg-[#CFB53B]/30 text-[#CFB53B] border border-[#CFB53B]/30'
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