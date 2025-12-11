'use client'

import { motion, useAnimation, useInView, useMotionValue } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  Cloud,
  Brain,
  Smartphone,
  Cpu,
  Bot,
  Monitor,
  Zap,
  CheckCircle,
  DollarSign,
  Users,
  Sparkles,
  LifeBuoy,
} from 'lucide-react'
// import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import TrueFocus from '@/components/animations/TrueFocus'
import BlurText from '@/components/animations/BlurText'
import TextPressure from '@/components/animations/TextPressure'
import TextType from '@/components/animations/TextType'

// Import the newly separated components
import ServiceCard from '@/components/services/ServiceCard'
import AppleScrollSection from '@/components/services/AppleScrollSection'
import ScrollVelocityText from '@/components/animations/ScrollVelocityText'
import HorizontalScroll from '@/components/HorizontalScroll'
import AttioButton from '@/components/ui/AttioButton'
import StarBorder from '@/components/animations/StarBorder'
// ParallaxTestimonials moved to About page for consolidated testimonials

import dynamic from 'next/dynamic'

// Deterministic motion paths to keep hydration stable
const agentMotionConfigs = [
  {
    initial: { left: '10%', top: '20%', opacity: 0, scale: 0.5 }, // Starts at input source
    animate: {
      left: ['10%', '10%', '50%', '50%'], // Down then Right to center
      top: ['20%', '50%', '50%', '50%'],
      opacity: [1, 1, 1, 0], // Fades out at center
      scale: [1, 1, 1, 0.4], // Shrinks at center
    },
    duration: 5,
    delay: 0,
  },
  {
    initial: { left: '10%', top: '20%', opacity: 0, scale: 0.5 },
    animate: {
      left: ['10%', '10%', '50%', '50%'],
      top: ['20%', '50%', '50%', '50%'],
      opacity: [1, 1, 1, 0],
      scale: [1, 1, 1, 0.4],
    },
    duration: 5,
    delay: 1.6,
  },
  {
    initial: { left: '10%', top: '20%', opacity: 0, scale: 0.5 },
    animate: {
      left: ['10%', '10%', '50%', '50%'],
      top: ['20%', '50%', '50%', '50%'],
      opacity: [1, 1, 1, 0],
      scale: [1, 1, 1, 0.4],
    },
    duration: 5,
    delay: 3.2,
  },
]

const HyperSpeed = dynamic(() => import('@/components/animations/HyperSpeed'), {
  ssr: false,
  loading: () => <div className="w-full h-[450px] bg-black" />,
})
import ClientOnly from '@/components/layout/ClientOnly'

// Define services array here, as it's specific to this page's cards
const services = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'We build custom software that fits your exact needs. Get web applications, mobile applications, and systems that grow with your business.',
    outcome: 'Custom software that scales with your business and automates manual processes',
    features: [
      'Full-stack Web Applications',
      'Enterprise System Integration',
      'Legacy System Modernization',
      'Custom CRM & ERP Platforms',
    ],
    color: '#4CD787',
  },
  {
    icon: Smartphone,
    title: 'Mobile Application Development',
    description:
      'Build mobile applications your users will love. We create fast, easy-to-use applications for iPhone and Android that keep people coming back.',
    outcome: 'High-performing mobile applications that increase user engagement and revenue',
    features: [
      'Native iOS & Android Development',
      'React Native & Flutter',
      'Application Store Optimization',
      'Mobile-First UI/UX Design',
    ],
    color: '#F472B6',
  },
  {
    icon: Monitor,
    title: 'Desktop Application Development',
    description:
      'Write code once and deploy everywhere. Build native desktop applications for Windows, macOS, and Linux using modern cross-platform technologies.',
    outcome: 'Cross-platform desktop solutions that work seamlessly across all operating systems',
    features: [
      'Cross-Platform Desktop Applications (Electron)',
      'Progressive Web Applications (PWA)',
      'Browser Extensions & Add-ons',
      'Native Performance Optimization',
    ],
    color: '#00D2FF',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Use AI to automate tasks and make better decisions. We build smart systems that learn from your data and help you work faster.',
    outcome: 'AI-powered systems that make intelligent decisions and predict future trends',
    features: [
      'Predictive Analytics & Forecasting',
      'Natural Language Processing',
      'Computer Vision & Image Recognition',
      'Custom Machine Learning Models',
    ],
    color: '#9d4edd',
  },
  {
    icon: Bot,
    title: 'AI Agents & Workflow Automation',
    description:
      'Let AI handle repetitive work so your team can focus on what matters. We create automation that works 24/7 and gets smarter over time.',
    outcome:
      'Automated workflows that reduce manual work by 70% in client deployments and eliminate human error',
    features: [
      'Intelligent Process Automation',
      'Custom AI Assistant Development',
      'Workflow Orchestration',
      'Decision Engine Integration',
    ],
    color: '#CFB53B',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Move your applications to the cloud for better reliability and lower costs. We set up secure systems that handle more users without slowing down.',
    outcome:
      'Scalable cloud infrastructure that reduces costs by 50% on average across recent projects and improves reliability',
    features: [
      'Multi-Cloud Architecture',
      'Serverless & Microservices',
      'DevOps & CI/CD Pipelines',
      'Cloud Security & Compliance',
    ],
    color: '#4834D4',
  },
  {
    icon: Cpu,
    title: 'IoT & Smart Automation',
    description:
      'Complete home and office automation solutions. From smart lighting to voice-controlled environments using Google Assistant and Alexa integration.',
    outcome: 'Smart automation systems that enhance comfort and reduce energy costs by 30%',
    features: [
      'Smart Home Automation Systems',
      'Raspberry Pi & Arduino Solutions',
      'Voice Control (Google/Alexa)',
      'Custom Electronic Installations',
    ],
    color: '#ff6b6b',
  },
]

// Value proposition items
const valueProps = [
  {
    title: 'Fast Delivery',
    description:
      'Start your project today and see results in days, not months. We get you up and running quickly.',
    proofPoint: 'Average MVP delivery in 6-8 weeks, 40% faster than industry standard',
    icon: Zap,
    iconColor: '#FFD700',
  },
  {
    title: 'Reliable Results',
    description:
      "We deliver what we promise on time. You'll see real improvements in your business.",
    proofPoint: '98% on-time delivery rate across 50+ projects completed',
    icon: CheckCircle,
    iconColor: '#4CD787',
  },
  {
    title: 'Clear Pricing',
    description: "No hidden costs or surprises. You'll know exactly what you pay before we start.",
    proofPoint: 'Fixed-price projects with 0% cost overruns in the last 2 years',
    icon: DollarSign,
    iconColor: '#06B6D4',
  },
  {
    title: 'Long-term Support',
    description: 'We stick around after launch. Get ongoing help and advice when you need it.',
    proofPoint: '90% client retention rate with ongoing support relationships',
    icon: LifeBuoy,
    iconColor: '#9d4edd',
  },
  {
    title: 'Experienced Team',
    description:
      "Work with skilled developers, designers, and project managers who know what they're doing.",
    proofPoint: '15+ years combined experience with 100+ successful deployments',
    icon: Users,
    iconColor: '#F472B6',
  },
  {
    title: 'Modern AI Tools',
    description:
      'Use the latest AI technology to automate work and improve your business processes.',
    proofPoint: 'AI implementations reducing operational costs by 60% on average',
    icon: Sparkles,
    iconColor: '#ff6b6b',
  },
]

export default function ServicesPage() {
  // Existing state variables
  const [, setActiveSection] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const valuePropsRef = useRef<HTMLDivElement | null>(null)
  const velocityRef = useRef<HTMLDivElement | null>(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const heroControls = useAnimation()
  const orchestrationTextControls = useAnimation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSafari, setIsSafari] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isAgentCardHovered, setIsAgentCardHovered] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const isAgentLabelActive = isAgentCardHovered && isLargeScreen

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Disable scroll-linked animations until after hydration
  const heroScrollProgress = useMotionValue(0)
  const velocityScrollProgress = useMotionValue(0)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  // Static values for transforms to avoid hydration issues
  const titleY = 0
  const titleScale = 1
  const velocityScale = 1
  const velocityOpacity = 1

  useEffect(() => {
    // Detect Safari
    const isSafariBrowser =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      /iPad|iPhone|iPod/.test(navigator.userAgent)

    setIsSafari(isSafariBrowser)
  }, [])

  useEffect(() => {
    if (isHeroInView) {
      heroControls.start('visible')
    }
  }, [heroControls, isHeroInView])

  // Simplified mouse tracking - reduced frequency
  useEffect(() => {
    let ticking = false
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({
            x: e.clientX / window.innerWidth - 0.5,
            y: e.clientY / window.innerHeight - 0.5,
          })
          ticking = false
        })
        ticking = true
      }
    }
  }, [])

  // Floating animation for background elements
  const floatingAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const agentGroupVariants = {
    hidden: { opacity: 0 },
    hover: {
      opacity: 1,
      scaleX: [1, 1.04, 1.08, 1],
      transition: {
        duration: 0.35,
        ease: 'easeOut',
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const agentLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    hover: (index: number = 0) => ({
      pathLength: 1,
      opacity: 0.9,
      transition: {
        duration: 0.7,
        delay: 0.2 + index * 0.08,
        ease: 'easeInOut',
      },
    }),
  }

  const agentNodeVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    hover: (index: number = 0) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.35,
        delay: 0.28 + index * 0.07,
        ease: 'easeOut',
      },
    }),
  }

  const agentCoreVariants = {
    hidden: { scale: 0.6, opacity: 0 },
    hover: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.45, delay: 0.32, ease: [0.16, 1, 0.3, 1] },
    },
  }

  const agentPulseVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    hover: {
      opacity: [0, 0.6, 0],
      scale: [0.92, 1.18, 1.32],
      transition: {
        duration: 1.6,
        delay: 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const leftAgentNodes = [
    { cx: 232, cy: 132 },
    { cx: 190, cy: 78 },
    { cx: 148, cy: 186 },
    { cx: 96, cy: 102 },
    { cx: 58, cy: 168 },
  ]

  const rightAgentNodes = [
    { cx: 28, cy: 134 },
    { cx: 72, cy: 78 },
    { cx: 118, cy: 188 },
    { cx: 166, cy: 108 },
    { cx: 206, cy: 170 },
  ]

  const activeServiceData = services.find((s, i) => i === activeService) || services[0]

  return (
    <div className="min-h-screen bg-black pt-19">
      <section
        ref={heroRef}
        className="relative pt-20 md:pt-24 pb-0 flex flex-col items-center justify-start overflow-hidden bg-black"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black z-0" />

        <div className="relative z-20 w-full flex flex-col items-center">
          <div className="container mx-auto px-4 relative z-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              className="text-center max-w-4xl mx-auto title-margin"
            >
              <div className="flex items-center justify-center w-full">
                <div
                  className="flex items-center justify-center"
                  style={{
                    position: 'relative',
                    height: '100px',
                    width: '100%',
                    maxWidth: '320px',
                    padding: '0',
                    margin: '0 auto',
                  }}
                >
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <TextPressure
                      text="Services  "
                      fontFamily="var(--font-playfair-display)"
                      flex={false}
                      alpha={false}
                      stroke={false}
                      width={false}
                      weight={true}
                      italic={false}
                      textColor="#F472B6"
                      strokeColor="#FFFFFF"
                      minFontSize={64}
                    />
                  </div>
                </div>
              </div>

              <motion.p
                variants={floatingAnimation}
                className="text-lg md:text-xl font-light max-w-3xl mx-auto relative z-30 leading-relaxed mt-2 mb-0"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  fontWeight: '400',
                }}
              >
                We build web, mobile, AI, and automation products that grow your revenue, partnering
                with you from one-off projects to dedicated engineering teams
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="relative w-full h-[450px] overflow-hidden -mt-16 md:-mt-24 lg:-mt-32">
        <HyperSpeed
          effectOptions={{
            lightPairsPerRoadWay: 25,
            totalSideLightSticks: 12,
            fov: 90,
            length: 300,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10" />
      </div>

      {/* Scroll Velocity Animation */}
      <section
        ref={velocityRef}
        className="relative overflow-hidden pt-4 pb-4 md:pt-6 md:pb-6 bg-black"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { delay: 0.3, duration: 0.8 },
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full overflow-hidden"
          style={{
            scale: velocityScale,
            opacity: velocityOpacity,
          }}
        >
          <ClientOnly>
            <div
              suppressHydrationWarning={true}
              className="w-full"
              style={{
                gap: '1px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
              }}
            >
              <ScrollVelocityText
                baseVelocity={70}
                className="text-6xl font-extrabold text-[#333333] leading-tight"
                damping={30}
                stiffness={600}
                velocityMapping={{ input: [0, 1000], output: [0, 6] }}
              >
                {[
                  ' Custom Software  •  Mobile Applications  •  Desktop Applications  •  AI Solutions  •  Cloud Infrastructure  • ',
                  ' Smart Automation  •  IoT Development  •  Workflow Automation  •  Digital Transformation  • ',
                ]}
              </ScrollVelocityText>
              <ScrollVelocityText
                baseVelocity={-80}
                className="text-3xl font-extralight text-[#9CA3AF] leading-tight h-[100px]"
                damping={30}
                stiffness={600}
                velocityMapping={{ input: [0, 1000], output: [0, 7] }}
              >
                {[
                  'Fast Delivery • Expert Team • Modern Technology • Reliable Results •',
                  'Long-term Support • Clear Pricing • Proven Success • Your Vision •',
                ]}
              </ScrollVelocityText>
            </div>
          </ClientOnly>
        </motion.div>
      </section>

      {/* Services Grid with Apple-style reveal */}
      <AppleScrollSection>
        <section className="section-padding relative services-section pt-8 md:pt-12 bg-black">
          <div className="container mx-auto px-4 ">
            <div className="w-full flex justify-center mb-28">
              <BlurText
                text="Our Expertise"
                className="justify-center blur-section text-[#06B6D4] font-editorial"
                delay={250}
                once={false}
              />
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] justify-center gap-6 md:gap-8 px-2 md:px-8 lg:px-12 xl:px-16 relative z-10">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>
      </AppleScrollSection>

      {/* Agentic AI & RAG Section */}
      <AppleScrollSection delay={0.2}>
        <section className="section-padding relative py-20 overflow-hidden bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#1a0b2e]/45 to-black/90" />

          <div className="container mx-auto px-0 lg:px-4 relative z-10">
            {/* Video and Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start justify-items-center max-w-7xl mx-auto">
              {/* Video Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-1 lg:col-span-2 flex flex-col items-stretch w-full"
              >
                <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-[#4CD787]/10 transition-[box-shadow] duration-500">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-start text-center px-4 py-6 sm:px-6 sm:py-10 lg:py-16"
                  >
                    <h2 className="section-title-hero gradient-gold font-editorial">
                      Agentic AI & RAG Solutions
                    </h2>
                    <p className="section-subtitle mt-3 sm:mt-4 max-w-3xl px-2 sm:px-0">
                      Transform your business with intelligent AI agents that think, learn, and act
                      autonomously.
                    </p>
                  </motion.div>
                  <div className="relative w-full aspect-[16/9] bg-black">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    >
                      <source src="/videos/agentic-ai-grid.webm" type="video/webm" />
                      <source src="/videos/agentic-ai-grid.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* AI Log Typewriter */}
                    <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-80 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 z-30 font-mono text-xs shadow-2xl">
                      <div className="flex items-center gap-2 mb-2 opacity-70 border-b border-white/10 pb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4CD787] animate-pulse" />
                        <span className="uppercase tracking-widest text-white/80 text-[10px]">
                          AI System Log
                        </span>
                      </div>
                      <div className="flex gap-2 text-[#4CD787]">
                        <span className="text-[#4CD787]/50">{'>'}</span>
                        <TextType
                          text={[
                            'Analyzing workflow patterns...',
                            'Identifying bottlenecks...',
                            'Orchestrating agents...',
                            'Optimizing resources...',
                            'Executing tasks...',
                          ]}
                          typingSpeed={50}
                          deletingSpeed={25}
                          pauseDuration={1500}
                          loop={true}
                          cursorCharacter="█"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 text-center transition-all duration-300 lg:-translate-y-[60px]"
                >
                  <motion.p
                    className={`transition-all duration-300 ${
                      isAgentLabelActive
                        ? 'subtitle-lg lg:text-3xl lg:font-extrabold'
                        : 'subtitle-sm lg:text-lg lg:font-semibold'
                    }`}
                    animate={{
                      letterSpacing: isAgentLabelActive ? '0.04em' : '0.01em',
                      color: isAgentLabelActive ? '#e0b85a' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    Real-time AI Agent Orchestration
                  </motion.p>

                  <div className="flex justify-center flex-wrap gap-4 mt-4 opacity-60">
                    <span className="text-xs tracking-wider uppercase flex items-center gap-2 text-white/70">
                      <div className="w-1 h-1 bg-[#4CD787] rounded-full" />
                      Free Feasibility Check
                    </span>
                    <span className="text-xs tracking-wider uppercase flex items-center gap-2 text-white/70">
                      <div className="w-1 h-1 bg-[#4CD787] rounded-full" />
                      24h Turnaround
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Cards Section */}
              <div className="order-2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-0 lg:col-span-2 justify-items-center">
                {/* Card 1: Agentic AI */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="relative group w-full max-w-3xl"
                >
                  <div className="relative h-full bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg text-left flex flex-col">
                    <motion.div
                      className="absolute left-1/2 -top-23 hidden h-20 w-[3px] -translate-x-1/2 origin-bottom rounded-full bg-gradient-to-t from-amber-400/0 via-amber-300/70 to-amber-500/90 lg:block pointer-events-none"
                      initial={{ opacity: 0, scaleY: 0.6 }}
                      animate={
                        isAgentCardHovered ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0.6 }
                      }
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                    >
                      <motion.span
                        className="absolute -top-17 left-1/2 block h-3 w-3 -translate-x-1/2 rounded-full bg-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.7)]"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={
                          isAgentCardHovered
                            ? { scale: [0.8, 1, 0.85], opacity: [0, 1, 0.8] }
                            : { scale: 0.6, opacity: 0 }
                        }
                        transition={{
                          duration: 1.4,
                          repeat: isAgentCardHovered ? Infinity : 0,
                          repeatType: 'mirror',
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.span
                        className="absolute -top-1 left-1/2 block h-[3px] w-2xl -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                        initial={{ opacity: 0, scaleX: 0.6 }}
                        animate={
                          isAgentCardHovered
                            ? { opacity: 1, scaleX: [0.6, 1, 0.8, 1] }
                            : { opacity: 0, scaleX: 0.6 }
                        }
                        transition={{
                          duration: 0.8,
                          ease: 'easeInOut',
                          repeat: isAgentCardHovered ? Infinity : 0,
                          repeatType: 'mirror',
                        }}
                      />
                    </motion.div>

                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#4CD787]/10 border border-[#4CD787]/20 flex items-center justify-center">
                          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-[#4CD787]" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Agentic AI Development</h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                        Build autonomous AI agents that execute complex workflows end-to-end.
                        Powered by OpenAI AgentKit, n8n, Make, and Zapier for seamless automation.
                      </p>

                      <div className="h-px w-full bg-white/5 my-2" />

                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4CD787] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            Multi-agent orchestration & collaboration
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4CD787] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            Browser automation with computer use tools
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4CD787] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            24/7 autonomous task execution
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4CD787] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            Up to 70% reduction in manual workflows
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: RAG Implementation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="relative group w-full max-w-3xl"
                >
                  <div className="relative h-full bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg text-left flex flex-col">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#9d4edd]/10 border border-[#9d4edd]/20 flex items-center justify-center">
                          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-[#9d4edd]" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">RAG Implementation</h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                        Enhance AI accuracy with retrieval-augmented generation. Connect LLMs to
                        your knowledge base for contextually relevant, up-to-date responses.
                      </p>

                      <div className="h-px w-full bg-white/5 my-2" />

                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#9d4edd] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            Real-time knowledge retrieval & integration
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#9d4edd] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            99% accuracy with GraphRAG technology
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#9d4edd] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            Multimodal RAG (text, audio, video, images)
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#9d4edd] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">Eliminate AI hallucinations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3: Workflow Automation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="relative group w-full max-w-3xl"
                >
                  <div className="relative h-full bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg text-left flex flex-col">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#CFB53B]/10 border border-[#CFB53B]/20 flex items-center justify-center">
                          <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#CFB53B]" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">
                          Intelligent Workflow Automation
                        </h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                        Automate repetitive tasks with AI-powered workflows. Integrate with 8,000+
                        apps using n8n, Make, and Zapier platforms.
                      </p>

                      <div className="h-px w-full bg-white/5 my-2" />

                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#CFB53B] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            Visual workflow builder with drag-and-drop
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#CFB53B] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            Self-hosted & cloud deployment options
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#CFB53B] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            Advanced AI node integrations
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#CFB53B] mt-2 shrink-0" />
                          <span className="text-sm text-zinc-400">
                            60% operational cost reduction
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Closing the previous Agentic AI section containers */}
          </div>
        </section>
      </AppleScrollSection>

      {/* Separator Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

      {/* Call to Action - Separated Section */}
      <section className="relative py-24 bg-black overflow-hidden">
        {/* Side fade effects */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="container mx-auto px-6 sm:px-8 md:px-10 lg:px-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-left"
            >
              <p
                className="hero-title font-editorial-semibold-italic text-white leading-none"
                style={{ letterSpacing: '-0.02em', marginBottom: '1.5rem' }}
              >
                Ready to automate your business?
              </p>
              <p className="subtitle-sm text-white/50 mb-8 max-w-xl text-lg font-light leading-relaxed">
                Deploy intelligent AI agents that think, learn, and execute complex workflows 24/7.
                Zero downtime. Measurable ROI from day one.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <StarBorder
                  href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base md:text-lg px-8 py-4"
                  color="#E2E8F0"
                  speed="2.5s"
                >
                  <span className="inline-flex items-center gap-3">
                    Schedule a Free Consultation
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </StarBorder>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
              className="relative rounded-3xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden px-1 sm:px-2"
            >
              {/* Card Background Effects */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(76,215,135,0.08),transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_40%)]" />

              <div className="relative p-6 sm:p-8 md:p-9 z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#4CD787] animate-pulse shadow-[0_0_8px_#4CD787]" />
                    <span className="text-white/90 font-mono text-xs tracking-widest uppercase">
                      DevX Agent Mesh
                    </span>
                  </div>
                  <span className="px-2 py-1 rounded border border-white/10 bg-white/5 text-[10px] text-white/50 font-mono">
                    v2.4.0
                  </span>
                </div>

                <div className="relative h-64 w-full rounded-xl bg-black/50 border border-white/10 overflow-hidden mb-6 group">
                  {/* Grid Background */}
                  <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Active Agents Animation */}
                  <div className="absolute inset-0 z-10">
                    {/* Pipeline & Result Visuals */}
                    <div className="absolute inset-0 z-0">
                      {/* Input Source Node */}
                      <div className="absolute left-[10%] top-[20%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-lg border border-[#4CD787]/30 bg-[#4CD787]/5 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-lg bg-[#4CD787]/10 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-[#4CD787]/50" />
                        </div>
                      </div>

                      {/* Pipeline Node */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[#4CD787]/20 bg-[#4CD787]/5 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-t-[#4CD787]/40 border-r-transparent border-b-[#4CD787]/40 border-l-transparent animate-[spin_3s_linear_infinite]" />
                        <div className="w-16 h-16 rounded-full bg-[#4CD787]/10 flex items-center justify-center backdrop-blur-sm border border-[#4CD787]/20">
                          <Bot className="w-6 h-6 text-[#4CD787]/80" />
                        </div>
                      </div>

                      {/* Result Output */}
                      <div className="absolute right-[12%] top-1/2 -translate-y-1/2 w-14 h-14 rounded-lg border border-[#4CD787]/30 bg-[#4CD787]/10 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-[#4CD787]" />
                      </div>

                      {/* Path Lines & Beam Animation */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* Passive Track Network (Dotted) */}
                        <g className="opacity-20">
                          {/* Input to Down */}
                          <line
                            x1="10%"
                            y1="20%"
                            x2="10%"
                            y2="50%"
                            stroke="#4CD787"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                          {/* Down to Center */}
                          <line
                            x1="10%"
                            y1="50%"
                            x2="50%"
                            y2="50%"
                            stroke="#4CD787"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                          {/* Center to Result */}
                          <line
                            x1="50%"
                            y1="50%"
                            x2="88%"
                            y2="50%"
                            stroke="#4CD787"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                          />
                        </g>

                        {/* Active Beam: Center to Result - Dimmed */}
                        <motion.line
                          x1="50%"
                          y1="50%"
                          x2="88%"
                          y2="50%"
                          stroke="#4CD787"
                          strokeWidth="2"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{
                            pathLength: [0, 1],
                            opacity: [0, 0.4, 0], // Reduced max opacity
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'circOut',
                            repeatDelay: 0.5,
                          }}
                        />

                        {/* Energy Packet Particle */}
                        <motion.circle
                          r="3"
                          fill="#ABF5D1" // Lighter green
                          initial={{ cx: '50%', cy: '50%', opacity: 0 }}
                          animate={{
                            cx: ['50%', '88%'],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'circOut',
                            repeatDelay: 0.5,
                          }}
                        />
                      </svg>
                    </div>

                    {agentMotionConfigs.map((config, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-10 h-10 rounded-lg border border-[#4CD787]/40 bg-[#000000]/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(76,215,135,0.2)] z-10"
                        style={{ x: '-50%', y: '-50%' }}
                        initial={config.initial}
                        animate={config.animate}
                        transition={{
                          duration: config.duration,
                          repeat: Infinity,
                          repeatType: 'loop',
                          ease: 'easeInOut',
                          delay: config.delay,
                          times: [0, 0.3, 0.8, 1], // Timing control
                        }}
                      >
                        <Bot className="w-5 h-5 text-[#4CD787]" />
                      </motion.div>
                    ))}

                    {/* Connecting Lines (Simulated) */}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[#4CD787] text-lg font-semibold mb-1">99.9%</div>
                    <div className="text-white/40 text-[10px] uppercase tracking-wider">
                      Uptime Reliability
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-[#4CD787] text-lg font-semibold mb-1">24/7</div>
                    <div className="text-white/40 text-[10px] uppercase tracking-wider">
                      Autonomous Operation
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Separator Line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

      {/* Proof of delivery */}
      <AppleScrollSection delay={0.3}>
        <section className="section-padding relative bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <BlurText
                text="Why teams choose DevX"
                className="justify-center blur-section text-white font-editorial"
                delay={200}
                once={false}
              />
              <BlurText
                text="Every engagement is anchored on speed, predictability, and the confidence that your product will delight customers from day one."
                className="justify-center blur-subtitle mt-4"
                delay={250}
                once={false}
              />
            </div>
            <div
              ref={valuePropsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
            >
              {valueProps.map((prop, index) => {
                const Icon = prop.icon
                return (
                  <motion.div
                    key={prop.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                      delay: Math.min(index * 0.08, 0.4),
                    }}
                    className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 border border-white/15 p-6 sm:p-7 md:p-8 rounded-2xl shadow-xl shadow-black/30 backdrop-blur-sm group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300"
                    style={{
                      boxShadow: `0 20px 30px -10px rgba(0, 0, 0, 0.35), 0 10px 15px -5px rgba(0, 0, 0, 0.2)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 22px 32px -12px rgba(0, 0, 0, 0.4), 0 12px 18px -6px rgba(0, 0, 0, 0.25), 0 0 30px ${prop.iconColor}35`
                      const title = e.currentTarget.querySelector('h3')
                      if (title) {
                        ;(title as HTMLElement).style.color = prop.iconColor
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
                      const title = e.currentTarget.querySelector('h3')
                      if (title) {
                        ;(title as HTMLElement).style.color = 'white'
                      }
                    }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon */}
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border mb-5 sm:mb-6 transition-all duration-300 bg-gradient-to-br from-white/20 via-white/10 to-transparent"
                      style={{
                        borderColor: `${prop.iconColor}50`,
                        boxShadow: `0 0 24px ${prop.iconColor}25`,
                      }}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: prop.iconColor }} />
                    </div>

                    {/* Title */}
                    <h3 className="heading-component text-white mb-3 sm:mb-4 leading-tight transition-colors duration-300 relative z-10">
                      {prop.title}
                    </h3>

                    {/* Description */}
                    <p className="text-body text-slate-100 mb-4 sm:mb-5 relative z-10">
                      {prop.description}
                    </p>

                    {/* Proof Point */}
                    {prop.proofPoint && (
                      <p className="text-body-small text-[#4CD787] font-semibold relative z-10 flex items-start gap-2">
                        <span className="text-[#4CD787] mt-0.5">✓</span>
                        <span>{prop.proofPoint}</span>
                      </p>
                    )}

                    {/* Animated border effect on hover */}
                    <motion.div
                      className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Top border */}
                      <motion.div
                        className="absolute w-full h-[2px] top-0"
                        style={{
                          background: `linear-gradient(to right, transparent, ${prop.iconColor}, transparent)`,
                        }}
                        initial={{ x: '-100%' }}
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      {/* Right border */}
                      <motion.div
                        className="absolute w-[2px] h-full right-0"
                        style={{
                          background: `linear-gradient(to bottom, transparent, ${prop.iconColor}, transparent)`,
                        }}
                        initial={{ y: '-100%' }}
                        animate={{ y: ['100%', '-100%'] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: 0.5,
                        }}
                      />
                      {/* Bottom border */}
                      <motion.div
                        className="absolute w-full h-[2px] bottom-0"
                        style={{
                          background: `linear-gradient(to right, transparent, ${prop.iconColor}, transparent)`,
                        }}
                        initial={{ x: '100%' }}
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: 1,
                        }}
                      />
                      {/* Left border */}
                      <motion.div
                        className="absolute w-[2px] h-full left-0"
                        style={{
                          background: `linear-gradient(to bottom, transparent, ${prop.iconColor}, transparent)`,
                        }}
                        initial={{ y: '100%' }}
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: 1.5,
                        }}
                      />
                    </motion.div>

                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${prop.iconColor}15, transparent 70%)`,
                      }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </AppleScrollSection>

      {/* Case Studies with Horizontal Scroll */}
      <AppleScrollSection delay={0.4}>
        <section className="section-padding relative services-section case-studies-section mt-20 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="title-margin text-center font-editorial"
            >
              <TrueFocus sentence="Case Studies" />
              <BlurText
                text="Explore shipped products and the business impact we continue to deliver for founders and enterprise teams."
                className="justify-center blur-subtitle mt-10 max-w-2xl mx-auto"
                delay={200}
                once={true}
              />
            </motion.div>
          </div>
          <HorizontalScroll />
        </section>
      </AppleScrollSection>

      {/* Testimonials moved to About page */}

      <section className="relative py-20 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-purple-900/20 to-black pointer-events-none" />

        {/* Subtle light beams */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, rotate: -45, x: '-50%', y: '100%' }}
            animate={{
              opacity: [0, 0.1, 0],
              y: ['100%', '-100%'],
              transition: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                ease: 'linear',
              },
            }}
            className="absolute left-1/4 w-[80px] h-[400px] bg-gradient-to-t from-[#4CD787]/0 via-[#4CD787]/20 to-[#4CD787]/0"
            style={{ transform: 'rotate(-45deg)' }}
          />

          <motion.div
            initial={{ opacity: 0, rotate: 45, x: '50%', y: '100%' }}
            animate={{
              opacity: [0, 0.1, 0],
              y: ['100%', '-100%'],
              transition: {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                ease: 'linear',
                delay: 4,
              },
            }}
            className="absolute right-1/4 w-[80px] h-[400px] bg-gradient-to-t from-[#4834D4]/0 via-[#4834D4]/20 to-[#4834D4]/0"
            style={{ transform: 'rotate(45deg)' }}
          />
        </div>

        <div className="relative container mx-auto px-4 z-[5000]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center max-w-4xl mx-auto"
          >
            <BlurText
              text="Ready to Transform Your Business?"
              className="justify-center blur-section text-white mb-6 font-editorial"
              delay={100}
              once={false}
            />
            <BlurText
              text="Partner with our senior engineers to launch resilient, scalable products and unlock new growth faster than you thought possible."
              className="justify-center blur-subtitle mt-6"
              delay={150}
              once={false}
            />

            <motion.div className="mt-10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <StarBorder
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base md:text-lg px-8 py-4"
                color="#E2E8F0"
                speed="2.5s"
              >
                <span className="inline-flex items-center gap-3">
                  Schedule a Free Consultation
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </StarBorder>
            </motion.div>

            <motion.p
              className="subtitle-sm mt-6 text-white/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Free consultation • Response within 24 hours • No commitment required
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
