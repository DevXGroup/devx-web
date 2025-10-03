'use client'
/**
 * Simplified, reliable PortfolioPage
 * - Removes heavy/hidden background effects (particles, ASCII, extra squares)
 * - Fixes bouncing ball so it works on client navigation and resize
 * - Keeps DotGrid interactive square working on hover
 * - Preserves projects grid, services, and modals
 */

import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  ArrowRight,
  Code2,
  Rocket,
  Database,
  Cloud,
  Brain,
  Cog,
  Smartphone,
  Globe,
  Cpu,
  X,
} from 'lucide-react'
import DotGrid from '@sections/DotGrid'
import TextPressure from '@animations/TextPressure'
import LetterGlitch from '@animations/LetterGlitch'
import GridAnimation from '@animations/GridAnimation'
import Waves from '@animations/Waves'
import EnhancedProjectCard from '@/components/portfolio/EnhancedProjectCard'
import ProjectDetailModal from '@/components/portfolio/ProjectDetailModal'
import { portfolioProjects, ProjectData } from '@/data/portfolioProjects'
import AsciiEffect3D from '@/components/effects/AsciiEffect3D'

// Animation variants kept minimal
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
}

// Services data (unchanged)
const services = [
  {
    icon: Code2,
    title: 'Apps',
    fullTitle: 'Custom Software Development',
    description:
      'We create tailored software solutions that perfectly align with your business needs. From web applications to enterprise systems, we deliver scalable and efficient solutions.',
    features: [
      'Full-stack Development',
      'API Development & Integration',
      'Legacy System Modernization',
      'Custom CRM & ERP Solutions',
    ],
    color: '#4CD787',
  },
  {
    icon: Brain,
    title: 'AI/ML',
    fullTitle: 'AI & Machine Learning',
    description:
      'Harness the power of artificial intelligence to transform your business. We develop intelligent solutions that automate processes and provide valuable insights.',
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision Solutions',
      'Machine Learning Models',
    ],
    color: '#9d4edd',
  },
  {
    icon: Cloud,
    title: 'Cloud',
    fullTitle: 'Cloud Solutions',
    description:
      'Leverage cloud technology to scale your business efficiently. We provide comprehensive cloud services to optimize your operations and reduce costs.',
    features: [
      'Cloud Migration',
      'Cloud-Native Development',
      'Serverless Architecture',
      'Cloud Infrastructure Management',
    ],
    color: '#4834D4',
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    fullTitle: 'Mobile App Development',
    description:
      'Create engaging mobile experiences for your users. We develop native and cross-platform mobile applications that deliver exceptional performance.',
    features: [
      'iOS Development',
      'Android Development',
      'Cross-platform Solutions',
      'Mobile App Strategy',
    ],
    color: '#06B6D4',
  },
  {
    icon: Database,
    title: 'Data',
    fullTitle: 'Database Solutions',
    description:
      'Design and implement robust database solutions that ensure data integrity and optimal performance. We help you manage and analyze your data effectively.',
    features: [
      'Database Design',
      'Data Migration',
      'Performance Optimization',
      'Data Security Implementation',
    ],
    color: '#ff6b6b',
  },
  {
    icon: Globe,
    title: 'Web',
    fullTitle: 'Web Development',
    description:
      'Build powerful web applications that drive your business forward. We create responsive, user-friendly websites that engage your audience.',
    features: [
      'Frontend Development',
      'Backend Development',
      'E-commerce Solutions',
      'Progressive Web Apps',
    ],
    color: '#4CD787',
  },
  {
    icon: Cog,
    title: 'DevOps',
    fullTitle: 'DevOps Services',
    description:
      'Streamline your development and operations with our DevOps expertise. We implement efficient workflows and automation to enhance your delivery pipeline.',
    features: [
      'CI/CD Implementation',
      'Infrastructure as Code',
      'Container Orchestration',
      'Monitoring & Logging',
    ],
    color: '#4834D4',
  },
  {
    icon: Rocket,
    title: 'Digital',
    fullTitle: 'Digital Transformation',
    description:
      'Transform your business with modern digital solutions. We help you embrace new technologies and optimize your digital presence.',
    features: [
      'Digital Strategy Consulting',
      'Process Automation',
      'Technology Migration',
      'Digital Innovation',
    ],
    color: '#06B6D4',
  },
  {
    icon: Cpu,
    title: 'IoT',
    fullTitle: 'IoT & Embedded Systems',
    description:
      'Bridge the physical and digital worlds with our IoT hardware design expertise. We create custom connected devices and systems that collect, analyze, and act on real-world data.',
    features: [
      'Custom IoT Device Development',
      'Sensor Integration & Networking',
      'Embedded Systems Design',
      'Edge Computing Solutions',
    ],
    color: '#9d4edd',
  },
]

// Service Modal (unchanged logic)
const ServiceModal = ({
  service,
  isOpen,
  onClose,
  clickPosition,
}: {
  service: any
  isOpen: boolean
  onClose: () => void
  clickPosition: any
}) => {
  if (!service) return null
  const Icon = service.icon
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <div className="pointer-events-auto">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: clickPosition ? clickPosition.x - window.innerWidth / 2 : 0,
                  y: clickPosition ? clickPosition.y - window.innerHeight / 2 : 0,
                  borderRadius: '100%',
                }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0, borderRadius: '12px' }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  x: clickPosition ? clickPosition.x - window.innerWidth / 2 : 0,
                  y: clickPosition ? clickPosition.y - window.innerHeight / 2 : 0,
                  borderRadius: '100%',
                }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 },
                  borderRadius: { duration: 0.4 },
                }}
                className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto p-6 relative"
              >
                <div className="flex items-center mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: service.color }}
                  >
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: service.color }}>
                    {service.fullTitle}
                  </h2>
                </div>

                <div className="mb-6">
                  <p className="text-white/90 mb-4">{service.description}</p>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: service.color }}>
                    Key Benefits
                  </h3>
                  <ul className="space-y-2">
                    {service.features.map((feature: any) => (
                      <li key={feature} className="flex items-center">
                        <div
                          className="w-2 h-2 rounded-full mr-3"
                          style={{ backgroundColor: service.color }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
                  <button
                    className="px-5 py-2 rounded-lg text-black font-medium transition-all cursor-pointer"
                    style={{ backgroundColor: service.color }}
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <a
                    href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-lg bg-robinhood text-black font-medium transition-all hover:bg-white hover:text-black border-2 border-robinhood shadow-lg"
                  >
                    Schedule a Strategy Call
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Projects (unchanged source)
const projects = portfolioProjects

function ServiceIcon({
  service,
  index,
  onClick,
}: {
  service: any
  index: number
  onClick: (service: any, position: any) => void
}) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        onClick(service, e)
      }}
      className="relative group service-icon-container cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', damping: 20 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.15, y: -8 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
    >
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:shadow-lg"
        style={{ backgroundColor: service.color }}
      >
        <service.icon className="w-8 h-8 md:w-10 md:h-10 text-black relative z-10" />
      </motion.div>
      <motion.div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-center text-white/70 group-hover:text-white transition-colors duration-300">
        {service.title}
      </motion.div>
    </motion.button>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="h-full">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 group hover:border-[#4CD787] hover:shadow-[0_0_30px_rgba(76,215,135,0.4),0_0_60px_rgba(76,215,135,0.2)] transition-all duration-500 cursor-pointer h-full relative shadow-2xl"
        whileHover={
          shouldReduceMotion
            ? {}
            : { scale: 1.03, y: -8, boxShadow: '0 30px 60px -12px rgba(76, 215, 135, 0.3)' }
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden h-64 md:h-72 lg:h-80 xl:h-96">
          <Image
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 6}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <span className="bg-gradient-to-r from-[#4CD787] to-[#06B6D4] text-black px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
              {project.category}
            </span>
          </motion.div>
        </div>
        <div className="p-6 md:p-8 relative">
          <div className="relative z-10">
            <motion.h3
              className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#4CD787] transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-white/80 font-light mb-6 leading-relaxed group-hover:text-white/95 transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {project.description}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              {project.tags.map((tag: any, tagIndex: number) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#4CD787]/20 to-[#06B6D4]/20 text-[#4CD787] border border-[#4CD787]/30 text-xs font-medium rounded-full backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 + 0.7 + tagIndex * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
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
              boxShadow: `0 0 6px #4CD787, 0 0 12px #4CD78740`,
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
              boxShadow: `0 0 6px #4CD787, 0 0 12px #4CD78740`,
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
              boxShadow: `0 0 6px #4CD787, 0 0 12px #4CD78740`,
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
              boxShadow: `0 0 6px #4CD787, 0 0 12px #4CD78740`,
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
      </motion.div>
    </div>
  )
}

export default function PortfolioPage() {
  const shouldReduceMotion = useReducedMotion()
  const pathname = usePathname()
  const [selectedService, setSelectedService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)

  const handleServiceClick = (service: any, event: any) => {
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      setClickPosition({ x, y })
    } else {
      setClickPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    }
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
    setTimeout(() => setClickPosition({ x: 0, y: 0 }), 100)
  }

  const handleViewProjectDetails = (project: ProjectData) => {
    setSelectedProject(project)
    setIsProjectModalOpen(true)
  }

  const handleCloseProjectModal = () => {
    setIsProjectModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Top hero, simplified backgrounds */}
      <section className="relative isolate py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />

        <div className="relative z-[150] container mx-auto px-4">
          {/* Main Content Area */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="flex flex-col items-center">
              {/* Small decorative elements above title */}
              <div className="relative mb-8">
                {/* Bouncing orange ball */}
                <motion.div
                  className="absolute -top-6 left-2 w-3 h-3 rounded-full"
                  style={{
                    background: '#ff6b35',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                  }}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: [0, -15, 0],
                          scale: [1, 1.1, 1],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 1.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }
                  }
                />

                {/* Small animated yellow square - positioned under the orange circle */}
                <motion.div
                  className="absolute -top-12 left-6 w-6 h-6 rotate-45 cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(45deg, rgba(6, 182, 212, 0.7) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.5)',
                    borderRadius: '2px',
                    boxShadow: '0 0 12px rgba(6, 182, 212, 0.3)',
                    zIndex: 1,
                  }}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          rotate: [45, 225, 45],
                          scale: [1, 0.8, 1],
                          opacity: [0.7, 1, 0.7],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 1,
                        }
                  }
                />
              </div>

              <div className="flex items-center justify-center w-full mb-4 sm:mb-8 px-4">
                <div
                  className="relative flex items-center justify-center w-full max-w-md mx-auto"
                  style={{ height: '120px', minWidth: '280px' }}
                >
                  <TextPressure
                    text="Portfolio  "
                    flex
                    alpha={false}
                    stroke={false}
                    width
                    weight
                    italic={false}
                    textColor="#4834D4"
                    strokeColor="#FFFFFF"
                    minFontSize={32}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <motion.p
                variants={fadeInUpVariants}
                className="text-lg md:text-xl text-foreground/90 font-light max-w-2xl mb-8 leading-relaxed"
              >
                Selected work across web, mobile, AI, and cloud.
                <br />
                Real products, real outcomes.
              </motion.p>

              {/* Decorative squares row under subtitle */}
              <div className="relative mt-12 mb-8 h-[280px] sm:h-[300px] md:h-[320px] w-full">
                <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center h-full">
                  <AsciiEffect3D
                    key={`hero-ascii-ball-${pathname}`}
                    height={480}
                    className="rounded-xl"
                    color="#A382C3"
                    charSize={6}
                    opacity={0.5}
                    showBase={true}
                    sphereRadius={240}
                    lighting="bottomLeft" // key at top-right, shadow bottom-left
                    lightScale={1} // slightly dimmer
                    ambient={0.01} // soften jagged edges subtly
                    charSet={' .*%$#@'}
                  />
                </div>

                {/* Left Outer Square - LetterGlitch (110x110px) - Large screens only */}
                <motion.div
                  className="hidden lg:block absolute 
                    top-1/2 -translate-y-1/2 left-[8%]
                    backdrop-blur-md overflow-hidden
                    w-[110px] h-[110px]"
                  style={{
                    transform: 'rotate(-8deg)',
                    border: '2px solid rgba(76, 215, 135, 0.6)',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(76, 215, 135, 0.4)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 2,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="w-full h-full">
                    <LetterGlitch
                      glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
                      glitchSpeed={33}
                      centerVignette={true}
                      outerVignette={true}
                      smooth={true}
                    />
                  </div>
                </motion.div>

                {/* Left Middle Square - DotGrid (132x132px) - Large screens only */}
                <motion.div
                  className="hidden lg:block absolute 
                    top-1/2 -translate-y-1/2 left-[25%]
                    backdrop-blur-md overflow-hidden
                    w-[132px] h-[132px]"
                  style={{
                    transform: 'rotate(12deg)',
                    border: '2px solid rgba(72, 52, 212, 0.6)',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(72, 52, 212, 0.4)',
                    backgroundColor: 'transparent',
                    zIndex: 10,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="w-full h-full">
                    <DotGrid
                      dotSize={3}
                      gap={12}
                      baseColor="#4834D4"
                      activeColor="#9d4edd"
                      proximity={50}
                      shockRadius={60}
                      shockStrength={2}
                      returnDuration={1.0}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>
                </motion.div>

                {/* Right Middle Square - GridAnimation (130x130px) - Large screens only */}
                <motion.div
                  className="hidden lg:block absolute 
                    top-1/2 -translate-y-1/2 right-[25%]
                    backdrop-blur-md overflow-hidden
                    w-[130px] h-[130px]"
                  style={{
                    transform: 'rotate(-15deg)',
                    border: '2px solid rgba(6, 182, 212, 0.6)',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    zIndex: 5,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="w-full h-full">
                    <GridAnimation
                      direction="diagonal"
                      speed={0.16}
                      borderColor="#06B6D4"
                      squareSize={20}
                      hoverFillColor="rgba(6, 182, 212, 0.3)"
                    />
                  </div>
                </motion.div>

                {/* Right Outer Square - Waves (110x110px) - Large screens only */}
                <motion.div
                  className="hidden lg:block absolute 
                    top-1/2 -translate-y-1/2 right-[8%]
                    backdrop-blur-md overflow-hidden
                    w-[110px] h-[110px]"
                  style={{
                    transform: 'rotate(-30deg)',
                    border: '2px solid rgba(76, 215, 135, 0.6)',
                    borderRadius: '12px',
                    boxShadow: '0 0 20px rgba(76, 215, 135, 0.4)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 3,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="w-full h-full">
                    <Waves
                      lineColor="#4CD787"
                      backgroundColor="transparent"
                      waveSpeedX={0.008}
                      waveSpeedY={0.004}
                      waveAmpX={15}
                      waveAmpY={8}
                      xGap={6}
                      yGap={10}
                      friction={0.95}
                      tension={0.005}
                      maxCursorMove={40}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="pt-[5px] pb-24 relative">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-8 max-w-8xl">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
              >
                <EnhancedProjectCard
                  project={project}
                  index={index}
                  onViewDetails={handleViewProjectDetails}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-28 flex items-center justify-center relative">
            <div className="h-px bg-gradient-to-r from-transparent via-[#4CD787]/30 to-transparent w-64" />
            <div className="mx-4 w-2 h-2 bg-[#4CD787] rounded-full opacity-60" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#4CD787]/30 to-transparent w-64" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-purple-900/20 to-black pointer-events-none" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#06B6D4]">
              Ready to Build Your Next Project?
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 font-light mb-8 leading-relaxed">
              Let&apos;s collaborate to bring your ideas to life with our expertise in cutting-edge
              technologies.
            </p>
            <motion.div>
              <a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-robinhood text-black hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium border-2 border-robinhood hover:shadow-[0_5px_15px_rgba(204,255,0,0.3)] transition-all duration-300 shadow-lg"
              >
                Schedule a Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 relative z-50">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-purple-900/10 to-black pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#06B6D4]">
              Services we deliver
            </h3>
            <p className="text-white/70 mt-2">
              We can build and ship across these areas. See the Services page for details.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16 relative z-10">
            {services.map((service, index) => (
              <ServiceIcon
                key={service.title}
                service={service}
                index={index}
                onClick={handleServiceClick}
              />
            ))}
          </div>
        </div>
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          clickPosition={clickPosition}
        />
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={handleCloseProjectModal}
      />
    </div>
  )
}