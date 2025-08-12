'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface OrgChartProps {
  className?: string
}

const OrgChart = ({ className = '' }: OrgChartProps) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

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

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Leadership Level */}
        <motion.div 
          className="flex justify-center gap-16 mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2, delayChildren: 0.3 }
            }
          }}
        >
          {/* Max */}
          <motion.div 
            variants={fadeInUp}
            className="text-center group"
          >
            <div className="relative mb-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-[#4CD787] shadow-lg">
                <Image
                  src="/images/about/max-headshot.png"
                  alt="Max Sheikhizadeh"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-[#4CD787] rounded-full flex items-center justify-center"
                animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-black text-xs font-bold">F</span>
              </motion.div>
            </div>
            <h3 className="font-semibold text-white text-sm mb-1">Max Sheikhizadeh</h3>
            <p className="text-[#4CD787] text-xs">Mission Commander & Founder</p>
          </motion.div>

          {/* Milaad */}
          <motion.div 
            variants={fadeInUp}
            className="text-center group"
          >
            <div className="relative mb-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-[#CFB53B] shadow-lg">
                <Image
                  src="/images/about/milaad-headshot.png"
                  alt="Milaad Sheikhizadeh"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-[#CFB53B] rounded-full flex items-center justify-center"
                animate={shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <span className="text-black text-xs font-bold">GM</span>
              </motion.div>
            </div>
            <h3 className="font-semibold text-white text-sm mb-1">Milaad Sheikhizadeh</h3>
            <p className="text-[#CFB53B] text-xs">General Manager</p>
          </motion.div>
        </motion.div>

        {/* Animated Connecting Lines */}
        <div className="relative mb-16">
          <svg className="w-full h-32" viewBox="0 0 800 120" fill="none">
            {/* Horizontal line connecting the leaders */}
            <motion.path
              d="M280 20 L520 20"
              stroke="url(#gradient1)"
              strokeWidth="2"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={drawLine}
              transition={{ delay: 1 }}
            />
            
            {/* Vertical line down from center */}
            <motion.path
              d="M400 20 L400 80"
              stroke="url(#gradient2)"
              strokeWidth="2"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={drawLine}
              transition={{ delay: 1.5 }}
            />
            
            {/* Horizontal line to team members */}
            <motion.path
              d="M200 80 L600 80"
              stroke="url(#gradient3)"
              strokeWidth="2"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={drawLine}
              transition={{ delay: 2 }}
            />
            
            {/* Vertical lines to individual roles */}
            <motion.path
              d="M240 80 L240 100"
              stroke="#4CD787"
              strokeWidth="2"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={drawLine}
              transition={{ delay: 2.3 }}
            />
            <motion.path
              d="M320 80 L320 100"
              stroke="#CFB53B"
              strokeWidth="2"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={drawLine}
              transition={{ delay: 2.4 }}
            />
            <motion.path
              d="M400 80 L400 100"
              stroke="#4834D4"
              strokeWidth="2"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={drawLine}
              transition={{ delay: 2.5 }}
            />
            <motion.path
              d="M480 80 L480 100"
              stroke="#9d4edd"
              strokeWidth="2"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={drawLine}
              transition={{ delay: 2.6 }}
            />
            <motion.path
              d="M560 80 L560 100"
              stroke="#4CD787"
              strokeWidth="2"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={drawLine}
              transition={{ delay: 2.7 }}
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
            </defs>
          </svg>
        </div>

        {/* Team Level */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 2.5 }
            }
          }}
        >
          {/* Graphic Designer */}
          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#4CD787]/20 to-[#4CD787]/40 rounded-full flex items-center justify-center border border-[#4CD787]/30">
              <span className="text-[#4CD787] text-xs font-bold">GD</span>
            </div>
            <h4 className="text-white text-sm font-medium mb-1">1 Graphic</h4>
            <p className="text-[#4CD787] text-xs">Designer</p>
          </motion.div>

          {/* Project Manager */}
          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#CFB53B]/20 to-[#CFB53B]/40 rounded-full flex items-center justify-center border border-[#CFB53B]/30">
              <span className="text-[#CFB53B] text-xs font-bold">PM</span>
            </div>
            <h4 className="text-white text-sm font-medium mb-1">1 Project</h4>
            <p className="text-[#CFB53B] text-xs">Manager</p>
          </motion.div>

          {/* Tech Lead */}
          <motion.div 
            variants={fadeInUp}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-[#4834D4]/20 to-[#4834D4]/40 rounded-full flex items-center justify-center border border-[#4834D4]/30">
              <span className="text-[#4834D4] text-xs font-bold">TL</span>
            </div>
            <h4 className="text-white text-sm font-medium mb-1">1 Tech</h4>
            <p className="text-[#4834D4] text-xs">Lead</p>
          </motion.div>

          {/* +15 Developers */}
          <motion.div 
            variants={fadeInUp}
            className="text-center sm:col-span-2 lg:col-span-2"
          >
            <div className="flex justify-center gap-2 mb-3">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-12 h-12 bg-gradient-to-br from-[#9d4edd]/20 to-[#9d4edd]/40 rounded-full flex items-center justify-center border border-[#9d4edd]/30"
                  animate={shouldReduceMotion ? {} : { 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.2 + 3 
                  }}
                >
                  <span className="text-[#9d4edd] text-xs font-bold">D</span>
                </motion.div>
              ))}
            </div>
            <h4 className="text-white text-sm font-medium mb-1">+15 Mid-Senior</h4>
            <p className="text-[#9d4edd] text-xs">Level Developers</p>
          </motion.div>
        </motion.div>

        {/* Team Stats */}
        <motion.div 
          className="text-center mt-8 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 3.5, duration: 0.6 }}
        >
          <div className="flex justify-center items-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#4CD787]">23</div>
              <div className="text-white/80">Total Team</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#CFB53B]">2</div>
              <div className="text-white/80">Leadership</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#4834D4]">18</div>
              <div className="text-white/80">Specialists</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrgChart