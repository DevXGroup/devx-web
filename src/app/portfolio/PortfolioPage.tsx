'use client'
/**
 * Simplified, reliable PortfolioPage
 * - Removes heavy/hidden background effects (particles, ASCII, extra squares)
 * - Fixes bouncing ball so it works on client navigation and resize
 * - Keeps DotGrid interactive square working on hover
 * - Preserves projects grid, services, and modals
 */

import { motion, useReducedMotion, AnimatePresence, useInView } from 'framer-motion'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
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
} from 'lucide-react'
import DotGrid from '@sections/DotGrid'
import TextPressure from '@animations/TextPressure'
import LetterGlitch from '@animations/LetterGlitch'
import GridAnimation from '@animations/GridAnimation'
import Waves from '@animations/Waves'
import BlurText from '@animations/BlurText'
import EnhancedProjectCard from '@/components/portfolio/EnhancedProjectCard'
import ProjectDetailModal from '@/components/portfolio/ProjectDetailModal'
import { portfolioProjects, ProjectData } from '@/data/portfolioProjects'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import StarBorder from '@/components/animations/StarBorder'

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Lazy load AsciiEffect3D only when hero section is in viewport for better LCP
const AsciiEffect3D = dynamic(() => import('@/components/effects/AsciiEffect3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
  ),
})

// Animation variants kept minimal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
}

const cardRevealVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: easeOutExpo,
      delay: Math.min(index * 0.05, 0.25),
    },
  }),
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
      'Agentic AI Solutions',
      'RAG Implementation',
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
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-white/5 border border-white/10">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="heading-component text-white">{service.fullTitle}</h2>
                </div>

                <div className="mb-6">
                  <p className="text-body mb-4">{service.description}</p>
                  <h3 className="heading-component mb-3 text-white">Key Benefits</h3>
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
                    className="px-5 py-2 rounded-lg text-white/70 hover:text-white font-medium transition-all cursor-pointer hover:bg-white/10"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <StarBorder
                    href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-lg text-white font-medium transition-all"
                    color="#FFFFFF"
                    speed="3s"
                  >
                    Schedule Consultation
                  </StarBorder>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

const currentProjects = portfolioProjects.filter((project) => project.isCurrentProject)
const projects = portfolioProjects.filter((project) => !project.isCurrentProject)

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
      className="relative group service-icon-container cursor-pointer p-2 sm:p-4 md:p-5"
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
    >
      <motion.div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-zinc-900 border border-white/10 group-hover:bg-white">
        <service.icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white relative z-10 group-hover:!text-black transition-colors duration-300" />
      </motion.div>
      <motion.div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-medium whitespace-nowrap text-center text-zinc-400 group-hover:text-white transition-colors duration-300">
        {service.title}
      </motion.div>
    </motion.button>
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
  const [portfolioTitle, setPortfolioTitle] = useState('  \u00a0Portfolio\u00a0  ')
  const [asciiSettings, setAsciiSettings] = useState({
    containerHeight: 330,
    asciiHeight: 620,
    sphereRadius: 240,
    charSize: 6,
  })

  // Track if hero section is in view to control animations
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { amount: 0.2 })

  useEffect(() => {
    const updateTitle = () => {
      const mobileText = '   \u00a0Portfolio\u00a0   '
      const defaultText = '  \u00a0Portfolio\u00a0  '
      setPortfolioTitle(window.innerWidth < 640 ? mobileText : defaultText)
    }

    const computeAsciiSettings = () => {
      const width = window.innerWidth
      if (width < 400) {
        return { containerHeight: 300, asciiHeight: 380, sphereRadius: 150, charSize: 5 }
      }
      if (width < 640) {
        return { containerHeight: 320, asciiHeight: 420, sphereRadius: 170, charSize: 5 }
      }
      if (width < 900) {
        return { containerHeight: 340, asciiHeight: 520, sphereRadius: 200, charSize: 6 }
      }
      return { containerHeight: 360, asciiHeight: 620, sphereRadius: 240, charSize: 6 }
    }

    const handleResize = () => {
      updateTitle()
      setAsciiSettings(computeAsciiSettings())
    }

    updateTitle()
    setAsciiSettings(computeAsciiSettings())
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      <section ref={heroRef} className="relative isolate py-9 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-black/40 to-black pointer-events-none" />

        <div className="relative z-[60] container mx-auto px-3 sm:px-4">
          {/* Main Content Area */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <div className="flex flex-col items-center">
              {/* Small decorative elements above title */}
              <div className="relative mb-4">
                {/* Bouncing orange ball */}
                <motion.div
                  className="absolute -top-2 w-3 h-3 rounded-full"
                  style={{
                    left: 'clamp(5rem, 32vw, 8rem)',
                    background: '#ff6b35',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    zIndex: 1,
                  }}
                  animate={
                    shouldReduceMotion || !isHeroInView
                      ? {}
                      : {
                          y: [0, -15, 0],
                          scale: [1, 1.1, 1],
                        }
                  }
                  transition={
                    shouldReduceMotion || !isHeroInView
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
                  className="absolute -top-6 w-6 h-6 rotate-45 cursor-pointer"
                  style={{
                    left: 'clamp(6.25rem, 36vw, 9rem)',
                    background:
                      'linear-gradient(45deg, rgba(255, 255, 0, 0.7) 0%, rgba(255, 255, 0, 0.3) 50%, transparent 100%)',
                    border: '1px solid rgba(255, 255, 0, 0.5)',
                    borderRadius: '2px',
                    boxShadow: '0 0 12px rgba(255, 255, 0, 0.3)',
                    zIndex: 1,
                  }}
                  animate={
                    shouldReduceMotion || !isHeroInView
                      ? {}
                      : {
                          rotate: [45, 225, 45],
                          scale: [1, 0.8, 1],
                          opacity: [0.7, 1, 0.7],
                        }
                  }
                  transition={
                    shouldReduceMotion || !isHeroInView
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

              <div className="flex items-center justify-center w-full mb-4 sm:mb-8 px-2 sm:px-4">
                <div
                  className="relative flex items-center justify-center w-full max-w-md mx-auto"
                  style={{
                    height: 'clamp(72px, 22vw, 90px)',
                    minWidth: '0',
                    fontFamily: 'var(--font-playfair-display)',
                    marginLeft: '6px',
                    marginRight: '6px',
                  }}
                >
                  <TextPressure
                    text={portfolioTitle}
                    fontFamily="var(--font-playfair-display)"
                    flex={false}
                    alpha={false}
                    stroke={false}
                    width={false}
                    weight={true}
                    italic={false}
                    textColor="#4506ccff"
                    strokeColor="#FFFFFF"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <BlurText
                text="Explore shipped products that increased revenue, retention, and efficiency across web, mobile, AI, and cloud experiences."
                className="relative z-20 section-subtitle text-zinc-400 max-w-3xl lg:max-w-4xl mx-auto mb-10 -mt-8 justify-center text-center"
                delay={30}
                startDelay={200}
                stepDuration={0.4}
                once={true}
                animateBy="words"
                style={{ whiteSpace: 'normal', textWrap: 'balance' }}
              />

              {/* Decorative squares row under subtitle */}
              <div
                className="relative mt-1 mb-49 w-full"
                style={{ height: `${asciiSettings.containerHeight}px` }}
              >
                <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center h-full">
                  <AsciiEffect3D
                    key={`hero-ascii-ball-${pathname}`}
                    height={asciiSettings.asciiHeight}
                    backgroundHeight={asciiSettings.asciiHeight}
                    className="rounded-xl"
                    color="#9ca3af"
                    charSize={asciiSettings.charSize}
                    opacity={0.75}
                    showBase={false}
                    sphereRadius={asciiSettings.sphereRadius}
                    lighting="bottomLeft"
                    lightScale={1.3}
                    ambient={0.08}
                    charSet={' ..*%$#@a,-/| '}
                  />
                </div>

                {/* Mobile-friendly animated squares */}
                <div className="hidden sm:hidden absolute inset-x-0 bottom-0 px-5 pt-5">
                  <div className="grid grid-cols-2 gap-3 max-w-[220px] mx-auto">
                    <motion.div
                      className="relative rounded-2xl border border-[#4CD787]/50 bg-gradient-to-br from-white/5 via-[#4CD787]/10 to-transparent backdrop-blur-sm overflow-hidden aspect-square shadow-[0_12px_50px_-28px_rgba(76,215,135,0.5)]"
                      style={{ transform: 'rotate(-6deg)' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <LetterGlitch
                        glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
                        glitchSpeed={28}
                        centerVignette={true}
                        outerVignette={false}
                        smooth={true}
                      />
                    </motion.div>

                    <motion.div
                      className="relative rounded-2xl border border-[#4834D4]/50 bg-gradient-to-br from-[#0b1221]/80 via-[#1a1f35]/80 to-[#0b1221]/60 backdrop-blur-sm overflow-hidden aspect-square -ml-5 rotate-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
                    >
                      <DotGrid
                        dotSize={3}
                        gap={10}
                        baseColor="#4CD787"
                        activeColor="#9d4edd"
                        proximity={42}
                        shockRadius={52}
                        shockStrength={2}
                        style={{ width: '100%', height: '100%' }}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                    </motion.div>
                    {/* Only show two squares on extra-small screens */}
                  </div>
                </div>

                {/* Left Outer Square - LetterGlitch (110x110px) - Tablet and up */}
                <motion.div
                  className="hidden sm:block absolute
                    top-1/2 -translate-y-1/2 left-[8%]
                    backdrop-blur-md overflow-hidden
                    w-[110px] h-[110px] cursor-default"
                  style={{
                    transform: 'rotate(-8deg)',
                    border: '2px solid rgba(76, 215, 135, 0.6)',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 11,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
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

                {/* Left Middle Square - DotGrid (132x132px) - Tablet and up */}
                <motion.div
                  className="hidden sm:block absolute
                    top-1/2 -translate-y-1/2 left-[25%]
                    backdrop-blur-md overflow-hidden
                    w-[132px] h-[132px] cursor-pointer"
                  style={{
                    border: '2px solid rgba(72, 52, 212, 0.6)',
                    borderRadius: '12px',
                    backgroundColor: 'transparent',
                    zIndex: 10,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
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

                {/* Right Middle Square - GridAnimation (132x132px) - Tablet and up */}
                <motion.div
                  className="hidden sm:block absolute
                    top-1/2 -translate-y-1/2 right-[25%]
                    backdrop-blur-md overflow-hidden
                    w-[132px] h-[132px] cursor-pointer"
                  style={{
                    border: '2px solid rgba(255, 215, 0, 0.5)',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    zIndex: 10,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="w-full h-full">
                    <GridAnimation
                      direction="diagonal"
                      speed={0.16}
                      borderColor="rgba(255, 215, 0, 0.5)"
                      squareSize={20}
                      hoverFillColor="rgba(255, 215, 0, 0.2)"
                      showRadialGradient={false}
                    />
                  </div>
                </motion.div>

                {/* Right Outer Square - Waves (110x110px) - Tablet and up */}
                <motion.div
                  className="hidden sm:block absolute
                    top-1/2 -translate-y-1/2 right-[8%]
                    backdrop-blur-md overflow-hidden
                    w-[110px] h-[110px] cursor-pointer group"
                  initial={{ opacity: 0, rotate: 8 }}
                  animate={{ opacity: 1, rotate: 8 }}
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                  style={{
                    borderRadius: '12px',
                    zIndex: 11,
                  }}
                >
                  <div className="absolute inset-0 border-2 border-[rgba(76,215,135,0.6)] rounded-xl group-hover:border-[rgba(76,215,135,1)] group-hover:shadow-[0_0_20px_rgba(76,215,135,0.4)] transition-all duration-300" />
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] group-hover:bg-[rgba(0,0,0,0.3)] transition-all duration-300" />

                  {/* Hover dot indicator */}
                  <motion.div
                    className="absolute w-2 h-2 bg-[#4CD787] rounded-full pointer-events-none"
                    style={{
                      top: '50%',
                      left: '50%',
                      x: '-50%',
                      y: '-50%',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />

                  <div className="w-full h-full relative z-10 overflow-hidden">
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

      {currentProjects.length > 0 && (
        <section className="pt-6 pb-16 relative">
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-8xl">
            <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: 'var(--font-playfair-display)' }}
              >
                Current Project
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/70 text-base sm:text-lg leading-relaxed px-4"
              >
                A live, in-progress engagement showcasing our latest delivery work.
              </motion.p>
            </div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 relative z-10 justify-items-stretch items-stretch max-w-6xl xl:max-w-7xl mx-auto"
              initial="visible"
              animate="visible"
            >
              {currentProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="w-full max-w-full h-full"
                  variants={cardRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={index}
                >
                  <EnhancedProjectCard
                    project={project}
                    index={index}
                    onViewDetails={handleViewProjectDetails}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Projects */}
      <section className="pt-[5px] pb-28 relative">
        <div className="pointer-events-none absolute inset-0 flex items-stretch justify-center">
          <div className="w-full max-w-6xl xl:max-w-7xl mx-auto flex gap-12 px-6 md:px-10">
            <div className="flex-1 bg-gradient-to-b from-white/5 via-transparent to-white/5 opacity-10 rounded-full" />
            <div className="flex-1 bg-gradient-to-b from-[#4CD787]/20 via-transparent to-[#4CD787]/20 opacity-10 rounded-full" />
            <div className="flex-1 bg-gradient-to-b from-[#D8B4FE]/20 via-transparent to-[#D8B4FE]/20 opacity-10 rounded-full hidden md:block" />
          </div>
        </div>
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 max-w-8xl">
          {/* Section Title and Subtitle */}
          <div className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'var(--font-playfair-display)' }}
            >
              Review Selected Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-base sm:text-lg leading-relaxed px-4"
            >
              Our portfolio includes select projects from our international development
              partnerships. Full case studies, client references, and detailed project documentation
              are available upon request.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 relative z-10 justify-items-stretch items-stretch max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto"
            initial="visible"
            animate="visible"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="w-full max-w-full h-full"
                variants={cardRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
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

      {/* Services */}
      <section className="py-12 sm:py-16 relative z-[5000]">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-purple-900/10 to-black pointer-events-none" />
        <div className="container mx-auto px-3 sm:px-4 relative">
          <div className="text-center mb-8">
            <BlurText
              text="Services we deliver"
              className="section-title text-white justify-center mb-4 font-editorial"
              animateBy="words"
              once={true}
            />
            <BlurText
              text="We can build and ship across these areas"
              className="subtitle text-white/80 justify-center mt-2 subtitle-lg"
              animateBy="words"
              once={true}
            />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-12 justify-items-center relative z-10 px-2 sm:px-4">
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

      <div className="mt-28 flex items-center justify-center relative">
        <div className="h-px bg-gradient-to-r from-transparent via-[#4CD787]/30 to-transparent w-64" />
        <div className="mx-4 w-2 h-2 bg-[#4CD787] rounded-full opacity-60" />
        <div className="h-px bg-gradient-to-r from-transparent via-[#4CD787]/30 to-transparent w-64" />
      </div>
      <br />
      <br />

      {/* CTA */}
      <section className="relative z-[30] py-20 pb-24 overflow-hidden mb-33">
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-20 text-center max-w-4xl mx-auto"
          >
            <h2 className="section-title text-[#06B6D4] mb-6 font-editorial text-center mx-auto">
              Ready to Build Your Next Project?
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl font-light text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Partner with a team that has shipped complex <br className="hidden sm:block" />
              products across industries and platforms.
            </p>
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <StarBorder
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?background_color=000000&text_color=ffffff&primary_color=4CD787&hide_gdpr_banner=1"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative z-40 inline-flex items-center gap-2 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300"
                color="#FFFFFF"
                speed="3s"
              >
                <span>Schedule a Free Consultation</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </StarBorder>

              <StarBorder
                href="/contact"
                className="group relative z-40 inline-flex items-center gap-2 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 border border-white/10 hover:bg-white/10"
                color="#FFFFFF"
                speed="3s"
              >
                <span>Contact Our Team</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </StarBorder>
            </motion.div>
          </motion.div>
        </div>
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
