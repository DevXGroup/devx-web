'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Calendar, ArrowDown, ChevronRight } from 'lucide-react'

// --- Types ---
interface TeamMember {
  id: string
  name: string
  title: string
  image?: string
  icon?: any
  roleColor: string
  bio?: string
  linkedIn?: string
  stats?: { label: string; value: string }[]
}

interface OrgChartProps {
  className?: string
}

// --- Data ---
const teamData: TeamMember[] = [
  {
    id: 'max',
    name: 'Max Sheikhizadeh',
    title: 'CTO & Founder',
    image: '/images/about/max-headshot.jpg',
    roleColor: '#4CD787', // Green
    bio: '15+ years of experience at Amazon, Viasat, Qualcomm, and high-growth startups. Led core teams delivering innovative features for Amazon e-commerce platforms. Combines deep engineering expertise with collaborative leadership.',
    linkedIn: 'https://www.linkedin.com/in/max-sheikhizadeh-7847a68/',
    stats: [
      { label: 'Yrs Exp', value: '15+' },
      { label: 'Projects', value: '40+' },
    ],
  },
  {
    id: 'milaad',
    name: 'Milaad Sheikhizadeh',
    title: 'General Manager',
    image: '/images/about/milaad-headshot.jpg',
    roleColor: '#FFD700', // Gold
    bio: 'General Manager at DevX Group, Milaad is developing a strong business path through his International Business studies at the University of San Diego and his growing involvement across company operations. He brings an entrepreneurial drive, early leadership instincts, and a focus on elevating client experience as he supports the growth and direction of the company.',
    linkedIn: 'https://www.linkedin.com/in/milaad-sheikhizadeh-b086392a8/',
    stats: [
      { label: 'Leadership', value: 'GM' },
      { label: 'Focus', value: 'Growth' },
    ],
  },
]

const managementData: TeamMember[] = [
  {
    id: 'logistic',
    name: 'Logistics',
    title: 'Overseas',
    image: '/images/about/avatar-logistic.png',
    roleColor: '#4CD787',
    bio: 'Managing global logistics and ensuring seamless operations across borders.',
  },
  {
    id: 'tech-lead',
    name: 'Engineering',
    title: 'Technical Lead',
    image: '/images/about/avatar-tech-lead.png',
    roleColor: '#4834D4', // Purple
    bio: 'Driving technical excellence and architectural decisions for scalable solutions.',
  },
  {
    id: 'pm',
    name: 'Management',
    title: 'Project Managers',
    icon: Calendar,
    roleColor: '#FFD700',
    bio: 'Orchestrating workflows, timelines, and ensuring delivery on schedule.',
  },
  {
    id: 'designer',
    name: 'Creative',
    title: 'Lead Designer',
    image: '/images/about/avatar-tech-lead.png', // Reusing with hue rotate
    roleColor: '#9d4edd', // Pink/Purple
    bio: 'Crafting intuitive and beautiful user experiences that delight customers.',
  },
]

// --- Components ---

const CardBase = ({
  children,
  className = '',
  onClick,
  accentColor = '#ffffff',
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  accentColor?: string
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`group relative overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/15 rounded-3xl p-1 transition-all duration-500 cursor-pointer ${className}`}
      whileHover={{ y: -4, boxShadow: `0 10px 40px -10px ${accentColor}20` }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      style={{
        boxShadow: '0 4px 20px -5px rgba(0,0,0,0.5)',
      }}
    >
      {/* Inner glow border */}
      <div
        className={`absolute inset-0 rounded-3xl border border-white/0 group-hover:border-[${accentColor}]/30 transition-colors duration-500`}
      />

      {/* Top gradient spotlight */}
      <div
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor}80, transparent)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(to right, transparent, ${accentColor}40, transparent)`,
        }}
      />

      <div className="relative h-full w-full bg-[#111]/50 rounded-[20px] p-5 flex flex-col items-center justify-between overflow-hidden">
        {children}
      </div>
    </motion.div>
  )
}

const Avatar = ({
  src,
  icon: Icon,
  alt,
  color,
  className = '',
}: {
  src?: string | undefined
  icon?: any
  alt: string
  color: string
  className?: string
}) => {
  return (
    <div
      className={`relative w-24 h-24 rounded-2xl mb-4 overflow-hidden shadow-2xl ring-1 ring-white/10 group-hover:ring-[${color}]/50 transition-all duration-500 ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="96px"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center">
          {Icon && <Icon className="w-8 h-8 text-white/50" />}
        </div>
      )}

      {/* Inner Glint */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  )
}

const ConnectingLine = ({
  startX,
  startY,
  endX,
  endY,
  color = '#333',
}: {
  startX: string
  startY: string
  endX: string
  endY: string
  color?: string
}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-0">
      <svg width="100%" height="100%" className="overflow-visible">
        <path
          d={`M${startX} ${startY} C ${startX} ${startY} ${endX} ${startY} ${endX} ${endY}`}
          stroke={color}
          strokeWidth="1"
          fill="none"
          className="opacity-30"
        />
      </svg>
    </div>
  )
}

const OrgChartV2 = ({ className = '' }: OrgChartProps) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  // Ref for intersection observer
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '0px 0px -200px 0px' })

  return (
    <>
      <div ref={containerRef} className={`relative w-full ${className}`}>
        {/* Background Grid - subtle Attio style */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 px-4">
          {/* --- Level 1: Founders --- */}
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-24 mb-16 relative">
            {/* Decorative Line Connecting Founders */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 1 }}
              className="hidden md:block absolute top-[50%] left-[25%] right-[25%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10"
            />

            {teamData.map((member, idx) => (
              <div key={member.id} className="relative">
                <CardBase
                  accentColor={member.roleColor}
                  onClick={() => setSelectedMember(member)}
                  className="w-full md:w-[320px] min-h-[380px]"
                >
                  <div className="flex flex-col items-center text-center w-full h-full">
                    {/* Header / Badge */}
                    <div className="w-full flex justify-between items-center mb-6 opacity-60">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-medium border border-white/10 px-2 py-1 rounded-full">
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: member.roleColor }}
                        />
                        Leadership
                      </div>
                      <ArrowDown className="w-3 h-3 text-white/50" />
                    </div>

                    <Avatar
                      src={member.image}
                      alt={member.name}
                      color={member.roleColor}
                      className="w-32 h-32 md:w-40 md:h-40 mb-6"
                    />

                    <h3 className="text-2xl font-bold text-white mb-1 font-editorial tracking-wide">
                      {member.name}
                    </h3>
                    <p className="text-sm font-light text-zinc-400 mb-6 uppercase tracking-wider">
                      {member.title}
                    </p>

                    {/* Mini Stats */}
                    <div className="grid grid-cols-2 gap-2 w-full mt-auto">
                      {member.stats?.map((stat, i) => (
                        <div key={i} className="bg-white/5 rounded-lg p-2 border border-white/5">
                          <div className="text-[10px] text-zinc-500 uppercase">{stat.label}</div>
                          <div className="text-sm font-mono text-white/90">{stat.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Learn More indicator */}
                    <div className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 mt-4 group-hover:text-white/70 transition-colors">
                      <span>Learn more</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </CardBase>
                {/* Connecting Line Down */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={isInView ? { height: 60 } : {}}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full w-px bg-gradient-to-b from-white/20 to-transparent"
                />
              </div>
            ))}
          </div>

          {/* --- Connecting Central Hub --- */}
          <div className="relative h-20 w-full overflow-hidden pointer-events-none mb-4 -mt-10 hidden md:block">
            {/* Fancy curved lines connecting top to bottom */}
            <svg className="w-full h-full opacity-30">
              <path
                d="M 50% 0 L 50% 100%"
                stroke="url(#line-gradient)"
                strokeWidth="1"
                fill="none"
              />
              <defs>
                <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="white" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* --- Level 2: Management & Leads --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Horizontal Line connecting them all */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="hidden lg:block absolute -top-8 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            {managementData.map((manager, idx) => (
              <div key={manager.id} className="relative pt-8">
                {/* Vertical connector from top horizontal line */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={isInView ? { height: 32 } : {}}
                  transition={{ delay: 1.4 + idx * 0.1, duration: 0.4 }}
                  className="hidden lg:block absolute left-1/2 -translate-x-1/2 -top-8 w-px bg-gradient-to-b from-white/10 to-white/5"
                  style={{ backgroundColor: manager.roleColor, opacity: 0.3 }}
                />

                <CardBase
                  accentColor={manager.roleColor}
                  className="min-h-[260px] hover:!bg-[#0D0D12]"
                >
                  <div className="w-full flex justify-end mb-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full shadow-[0_0_10px_currentColor]"
                      style={{ color: manager.roleColor, backgroundColor: manager.roleColor }}
                    />
                  </div>

                  <div
                    className={`relative w-20 h-20 rounded-xl mb-4 overflow-hidden border border-white/10 group-hover:border-[${manager.roleColor}] transition-colors duration-500`}
                  >
                    {manager.image ? (
                      <Image
                        src={manager.image}
                        alt={manager.name}
                        fill
                        className={`object-cover ${manager.id === 'designer' ? 'hue-rotate-60' : ''}`}
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                        {manager.icon && <manager.icon className="w-8 h-8 text-white/40" />}
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-2">
                    <h4 className="text-lg font-bold text-white mb-0.5 font-editorial">
                      {manager.name}
                    </h4>
                    <p
                      className="text-xs font-mono uppercase tracking-wider opacity-70"
                      style={{ color: manager.roleColor }}
                    >
                      {manager.title}
                    </p>

                    <p className="text-xs text-zinc-500 mt-4 leading-relaxed line-clamp-2">
                      {manager.bio}
                    </p>
                  </div>
                </CardBase>
              </div>
            ))}
          </div>

          {/* --- Level 3: The Engine --- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#4CD787]/10 to-transparent opacity-20 blur-3xl rounded-full" />

            <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto overflow-hidden">
              {/* Animated border gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4CD787]/10 to-transparent animate-pulse" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h4 className="text-2xl text-white font-editorial mb-2">
                    Engineering & Delivery Engine
                  </h4>
                  <p className="text-zinc-400 text-sm max-w-md">
                    Our powerhouse of 17+ Senior Developers specializing in Full-Stack, AI/ML, and
                    Cloud Architecture.
                  </p>
                </div>

                <div className="flex items-center gap-12">
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-white">23</div>
                    <div className="text-[10px] uppercase tracking-widest text-[#4CD787] mt-1">
                      Total Members
                    </div>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-white">100%</div>
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">
                      Senior Level
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bio Modal - Clean and Minimal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto min-h-[100dvh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            style={{
              paddingTop: 'calc(1.25rem + env(safe-area-inset-top, 0px))',
              paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
            }}
          >
            <motion.div
              className="bg-[#0B0B0B] border border-white/10 rounded-[28px] sm:rounded-[32px] overflow-hidden w-full max-w-[520px] sm:max-w-[620px] md:max-w-2xl relative shadow-2xl max-h-[90vh] sm:max-h-[92vh] md:max-h-[calc(100dvh-3rem)] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 relative h-24 sm:h-28 bg-zinc-900/50">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at top right, ${selectedMember.roleColor}, transparent 70%)`,
                  }}
                />
              </div>

              <div className="px-5 sm:px-8 pb-8 -mt-12 sm:-mt-16 relative space-y-6">
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-4 border-[#0B0B0B] shadow-xl`}
                >
                  <Image
                    src={selectedMember.image!}
                    alt={selectedMember.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-editorial text-white mb-1">
                      {selectedMember.name}
                    </h3>
                    <p
                      className="text-base sm:text-lg font-light"
                      style={{ color: selectedMember.roleColor }}
                    >
                      {selectedMember.title}
                    </p>
                  </div>
                  {selectedMember.linkedIn && (
                    <a
                      href={selectedMember.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-sm font-medium text-white group"
                    >
                      LinkedIn{' '}
                      <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                    </a>
                  )}
                </div>

                <p className="text-zinc-400 leading-relaxed text-base sm:text-lg font-light">
                  {selectedMember.bio}
                </p>

                {/* Close button anchored at bottom right */}
                <div className="pt-2 sm:pt-4 flex justify-end sticky bottom-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/90 to-transparent">
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="px-4 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default OrgChartV2
