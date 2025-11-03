'use client'

import { motion, useAnimation, useInView, useMotionValue } from 'framer-motion'
import { ArrowRight, Code2, Cloud, Brain, Smartphone, Cpu, Bot, Monitor } from 'lucide-react'
// import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import TrueFocus from '@/components/animations/TrueFocus'
import BlurText from '@/components/animations/BlurText'
import TextPressure from '@/components/animations/TextPressure'

// Import the newly separated components
import ServiceCard from '@/components/services/ServiceCard'
import AppleScrollSection from '@/components/services/AppleScrollSection'
import ScrollVelocityText from '@/components/animations/ScrollVelocityText'
import HorizontalScroll from '@/components/HorizontalScroll'
import ParallaxTestimonials from '@/components/ParallaxTestimonials'

import dynamic from 'next/dynamic'

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
    outcome: 'Automated workflows that reduce manual work by 70% and eliminate human error',
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
    outcome: 'Scalable cloud infrastructure that reduces costs by 50% and improves reliability',
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
  },
  {
    title: 'Reliable Results',
    description:
      "We deliver what we promise on time. You'll see real improvements in your business.",
    proofPoint: '98% on-time delivery rate across 50+ projects completed',
  },
  {
    title: 'Clear Pricing',
    description: "No hidden costs or surprises. You'll know exactly what you pay before we start.",
    proofPoint: 'Fixed-price projects with 0% cost overruns in the last 2 years',
  },
  {
    title: 'Long-term Support',
    description: 'We stick around after launch. Get ongoing help and advice when you need it.',
    proofPoint: '90% client retention rate with ongoing support relationships',
  },
  {
    title: 'Experienced Team',
    description:
      "Work with skilled developers, designers, and project managers who know what they're doing.",
    proofPoint: '15+ years combined experience with 100+ successful deployments',
  },
  {
    title: 'Modern AI Tools',
    description:
      'Use the latest AI technology to automate work and improve your business processes.',
    proofPoint: 'AI implementations reducing operational costs by 60% on average',
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
                      flex={true}
                      alpha={false}
                      stroke={false}
                      width={true}
                      weight={true}
                      italic={false}
                      textColor="#F472B6"
                      strokeColor="#FFFFFF"
                      minFontSize={59}
                    />
                  </div>
                </div>
              </div>

              <motion.p
                variants={floatingAnimation}
                className="text-lg md:text-xl font-light max-w-2xl mx-auto relative z-30 font-['IBM_Plex_Sans'] leading-relaxed mt-2 mb-0"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  fontWeight: '400',
                }}
              >
                Launch revenue-driving web, mobile, AI, and automation products your customers rely
                on. Our team embeds with yours to deliver dependable software and measurable wins.
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
      <section ref={velocityRef} className="relative overflow-hidden pt-4 pb-4 md:pt-6 md:pb-6 bg-black">
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
                className="text-6xl font-extrabold text-[#0e8a1871] leading-tight"
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
                className="text-3xl font-extralight text-[#af4eaf] leading-tight h-[100px]"
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
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                style={{
                  position: 'relative',
                  height: '100px',
                  width: '420px',
                  padding: '0 0px',
                }}
              >
                <TextPressure
                  text="Expertise&nbsp; "
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={false}
                  textColor="#06B6D4"
                  strokeColor="#FFFFFF"
                  minFontSize={32}
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] justify-center gap-6 md:gap-8 px-2 md:px-8 lg:px-12 xl:px-16 relative z-10">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.05,
                      ease: 'easeOut',
                    },
                  }}
                  viewport={{ amount: 0.1 }}
                >
                  <ServiceCard service={service} index={index} />
                </motion.div>
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
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                      <span className="bg-gradient-to-r from-[#FAD961] via-[#C2892B] to-[#0B0B0B] bg-clip-text text-transparent">
                        Agentic AI & RAG Solutions
                      </span>
                    </h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-['IBM_Plex_Sans'] leading-relaxed max-w-3xl px-2 sm:px-0">
                      Transform your business with intelligent AI agents that think, learn, and act
                      autonomously. Powered by cutting-edge retrieval-augmented generation
                      technology.
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
                      <source src="/videos/agentic-ai-grid.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
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
                    className={`text-sm md:text-base font-['IBM_Plex_Mono'] transition-all duration-300 ${
                      isAgentLabelActive
                        ? 'lg:text-3xl lg:font-extrabold'
                        : 'lg:text-lg lg:font-semibold'
                    }`}
                    animate={{
                      letterSpacing: isAgentLabelActive ? '0.04em' : '0.01em',
                      color: isAgentLabelActive ? '#e0b85a' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    Real-time AI Agent Orchestration
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* Cards Section */}
              <div className="order-2 space-y-6 w-full flex flex-col items-center px-4 sm:px-6 lg:px-0 lg:col-span-2">
                {/* Card 1: Agentic AI */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="relative group w-full max-w-3xl"
                  onHoverStart={() => setIsAgentCardHovered(true)}
                  onHoverEnd={() => setIsAgentCardHovered(false)}
                >
                  <div className="relative bg-[#0B0B10]/90 p-8 rounded-2xl border border-[#4CD787]/30 hover:border-[#4CD787]/50 transition-all duration-300 shadow-lg hover:shadow-[#4CD787]/30 text-left">
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
                        <div className="w-12 h-12 rounded-xl bg-[#4CD787]/20 flex items-center justify-center">
                          <Bot className="w-6 h-6 text-[#4CD787]" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#4CD787]">
                          Agentic AI Development
                        </h3>
                      </div>
                      <p className="text-white/80 text-base md:text-lg leading-relaxed font-['IBM_Plex_Sans'] max-w-2xl">
                        Build autonomous AI agents that execute complex workflows end-to-end.
                        Powered by OpenAI AgentKit, n8n, Make, and Zapier for seamless automation.
                      </p>
                      <ul className="space-y-2 text-sm md:text-base text-white/70">
                        <li className="flex items-start gap-2">
                          <span className="text-[#4CD787]">✓</span>
                          Multi-agent orchestration & collaboration
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4CD787]">✓</span>
                          Browser automation with computer use tools
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4CD787]">✓</span>
                          24/7 autonomous task execution
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#4CD787]">✓</span>
                          70% reduction in manual workflows
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
                  <div className="bg-[#0B0B10]/90 p-8 rounded-2xl border border-[#9d4edd]/30 hover:border-[#9d4edd]/50 transition-all duration-300 shadow-lg hover:shadow-[#9d4edd]/30 text-left">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#9d4edd]/20 flex items-center justify-center">
                          <Brain className="w-6 h-6 text-[#9d4edd]" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#9d4edd]">
                          RAG Implementation
                        </h3>
                      </div>
                      <p className="text-white/80 text-base md:text-lg leading-relaxed font-['IBM_Plex_Sans'] max-w-2xl">
                        Enhance AI accuracy with retrieval-augmented generation. Connect LLMs to
                        your knowledge base for contextually relevant, up-to-date responses.
                      </p>
                      <ul className="space-y-2 text-sm md:text-base text-white/70">
                        <li className="flex items-start gap-2">
                          <span className="text-[#9d4edd]">✓</span>
                          Real-time knowledge retrieval & integration
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#9d4edd]">✓</span>
                          99% accuracy with GraphRAG technology
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#9d4edd]">✓</span>
                          Multimodal RAG (text, audio, video, images)
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#9d4edd]">✓</span>
                          Eliminate AI hallucinations
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
                  <div className="bg-[#0B0B10]/90 p-8 rounded-2xl border border-[#CFB53B]/30 hover:border-[#CFB53B]/50 transition-all duration-300 shadow-lg hover:shadow-[#CFB53B]/30 text-left">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#CFB53B]/20 flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-[#CFB53B]" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#CFB53B]">
                          Intelligent Workflow Automation
                        </h3>
                      </div>
                      <p className="text-white/80 text-base md:text-lg leading-relaxed font-['IBM_Plex_Sans'] max-w-2xl">
                        Automate repetitive tasks with AI-powered workflows. Integrate with 8,000+
                        apps using n8n, Make, and Zapier platforms.
                      </p>
                      <ul className="space-y-2 text-sm md:text-base text-white/70">
                        <li className="flex items-start gap-2">
                          <span className="text-[#CFB53B]">✓</span>
                          Visual workflow builder with drag-and-drop
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#CFB53B]">✓</span>
                          Self-hosted & cloud deployment options
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#CFB53B]">✓</span>
                          Advanced AI node integrations
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#CFB53B]">✓</span>
                          60% operational cost reduction
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 text-center px-[5px] sm:px-2"
            >
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-6 font-['IBM_Plex_Sans'] px-[5px] max-w-[18rem] sm:max-w-none mx-auto">
                Ready to automate your business with intelligent AI agents?
              </p>
              <motion.a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FAD961] via-[#C2892B] to-[#0B0B0B] hover:from-[#FAD961] hover:via-[#D19028] hover:to-[#111111] text-black px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-[0_12px_40px_rgba(194,137,43,0.35)] border-2 border-[#C2892B] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule AI Strategy Session
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>
        </section>
      </AppleScrollSection>

      {/* Proof of delivery */}
      <AppleScrollSection delay={0.3}>
        <section className="section-padding relative bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <BlurText
                text="Why teams choose DevX"
                className="justify-center text-3xl md:text-4xl font-semibold text-[#06B6D4]"
                delay={200}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-white/80 text-base md:text-lg leading-relaxed font-['IBM_Plex_Sans'] mt-4"
              >
                Every engagement is anchored on speed, predictability, and the confidence that your
                product will delight customers from day one.
              </motion.p>
            </div>
            <div
              ref={valuePropsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
            >
              {valueProps.map((prop, index) => (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                  className="relative bg-slate-800/90 border border-slate-600/50 p-6 sm:p-7 md:p-8 rounded-2xl shadow-xl shadow-black/40 backdrop-blur-sm group cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-[#06B6D4]/20 transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-[#06B6D4] to-[#0891b2] border border-[#06B6D4]/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-5 sm:mb-6 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300">
                    <span className="text-2xl sm:text-3xl">✓</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 font-['IBM_Plex_Mono'] leading-tight group-hover:text-[#06B6D4] transition-colors duration-300 relative z-10">
                    {prop.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-['IBM_Plex_Sans'] mb-4 sm:mb-5 relative z-10">
                    {prop.description}
                  </p>

                  {/* Proof Point */}
                  {prop.proofPoint && (
                    <p className="text-[#4CD787] text-sm md:text-base font-semibold relative z-10 flex items-start gap-2">
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
                      className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent top-0"
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
                      className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-[#06B6D4] to-transparent right-0"
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
                      className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent bottom-0"
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
                      className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-[#06B6D4] to-transparent left-0"
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
                      background: 'radial-gradient(circle at center, #06B6D410 0%, transparent 70%)',
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
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
              className="title-margin text-center"
            >
              <TrueFocus sentence="Case Studies" />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-lg md:text-xl text-white/90 font-light mt-10 max-w-2xl mx-auto font-['IBM_Plex_Sans'] leading-relaxed"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                  fontWeight: '400',
                }}
              >
                Explore shipped products and the business impact we continue to deliver for founders
                and enterprise teams.
              </motion.p>
            </motion.div>
          </div>
          <HorizontalScroll />
        </section>
      </AppleScrollSection>

      {/* Testimonials with Parallax - Consistent spacing */}
      <AppleScrollSection delay={0.5} className="section-margin">
        <ClientOnly>
          <ParallaxTestimonials />
        </ClientOnly>
      </AppleScrollSection>

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
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight lg:whitespace-nowrap">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
              Partner with our senior engineers to launch resilient, scalable products and unlock
              new growth faster than you thought possible.
            </p>

            <motion.div className="mt-8" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-[#FAD961] via-[#C2892B] to-[#0B0B0B] text-black hover:from-[#FAD961] hover:via-[#D19028] hover:to-[#111111] px-5 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg border-2 border-[#C2892B] shadow-lg hover:shadow-[0_8px_30px_rgba(194,137,43,0.35)] transition-all duration-300"
              >
                Schedule a Strategy Call
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </motion.div>

            <motion.p
              className="mt-5 text-sm md:text-base text-white/60"
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
