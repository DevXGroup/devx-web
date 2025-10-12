'use client'

import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from 'framer-motion'
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
  loading: () => <div className="w-full h-[390px]" />,
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
  const [activeSection, setActiveSection] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const heroRef = useRef(null)
  const valuePropsRef = useRef(null)
  const velocityRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: false })
  const heroControls = useAnimation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSafari, setIsSafari] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

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

  const activeServiceData = services.find((s, i) => i === activeService) || services[0]

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero Section with Enhanced Metallic Helix */}
      <section
        ref={heroRef}
        className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />

        {/* HyperSpeed Animation - Positioned above DevX Edge title */}
        <ClientOnly>
          <div
            className="absolute left-0 right-0 w-full h-[390px] overflow-hidden pointer-events-none select-none"
            aria-hidden="true"
            style={{
              top: '36px',
              zIndex: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              touchAction: 'none',
              isolation: 'isolate',
              background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, black 100%)',
              maskImage: 'linear-gradient(to bottom, white 0%, white 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, white 0%, white 70%, transparent 100%)',
            }}
          >
            <HyperSpeed />
          </div>
        </ClientOnly>

        <div className="relative z-20 w-full flex flex-col items-center pointer-events-none">
          <div className="container mx-auto px-4 relative z-20 pointer-events-none">
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
              className="text-center max-w-4xl mx-auto title-margin pointer-events-none  -mt-8"
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
                className="text-lg md:text-xl font-light max-w-2xl mx-auto relative z-30 font-['IBM_Plex_Sans'] leading-relaxed mt-2"
                style={{
                  textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  fontWeight: '400',
                }}
              >
                Comprehensive software solutions to drive your business forward. We combine
                expertise with innovation to deliver exceptional results.
              </motion.p>
            </motion.div>
          </div>

          {/* Value Propositions with Apple-style reveal */}
          <div ref={valuePropsRef} className="w-full mb-8 relative z-20 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 px-4 mx-auto relative z-20 max-w-screen-xl mt-38">
              {valueProps.map((prop, index) => (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-black/40 backdrop-blur-lg p-8 rounded-xl border border-white/10 transition-all duration-300 group cursor-pointer pointer-events-auto relative overflow-hidden shadow-xl group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] before:absolute before:inset-0 before:border before:border-transparent before:rounded-xl before:transition-all before:duration-300 group-hover:before:border-white/20"
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-xl md:text-2xl lg:text-2xl font-semibold text-[#06B6D4] mb-3 lg:mb-4 transition-colors duration-300 relative z-10">
                    {prop.title}
                  </h3>
                  <p
                    className="text-white/90 text-base md:text-lg lg:text-xl transition-colors duration-300 font-['IBM_Plex_Sans'] font-medium relative z-10 mb-3 lg:mb-4 leading-relaxed"
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
                  >
                    {prop.description}
                  </p>
                  {prop.proofPoint && (
                    <p className="text-[#4CD787] text-xs md:text-sm font-semibold transition-colors duration-300 relative z-10">
                      ✓ {prop.proofPoint}
                    </p>
                  )}

                  {/* Running shining line effect on hover - matching ServiceCard style */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none z-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent top-0"
                      style={{
                        boxShadow: '0 0 6px #06B6D4, 0 0 12px rgba(6, 182, 212, 0.4)',
                      }}
                      initial={{ x: '-100%' }}
                      whileHover={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <motion.div
                      className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent right-0"
                      style={{
                        boxShadow: '0 0 6px #06B6D4, 0 0 12px rgba(6, 182, 212, 0.4)',
                      }}
                      initial={{ y: '-100%' }}
                      whileHover={{
                        y: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: 0.375,
                      }}
                    />
                    <motion.div
                      className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent bottom-0"
                      style={{
                        boxShadow: '0 0 6px #06B6D4, 0 0 12px rgba(6, 182, 212, 0.4)',
                      }}
                      initial={{ x: '100%' }}
                      whileHover={{
                        x: ['100%', '-100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: 0.75,
                      }}
                    />
                    <motion.div
                      className="absolute w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent left-0"
                      style={{
                        boxShadow: '0 0 6px #06B6D4, 0 0 12px rgba(6, 182, 212, 0.4)',
                      }}
                      initial={{ y: '100%' }}
                      whileHover={{
                        y: ['100%', '-100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: 1.125,
                      }}
                    />
                  </motion.div>

                  {/* Enhanced background effect on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr rounded-xl z-0"
                    style={{
                      background:
                        'radial-gradient(circle at center, #06B6D420 0%, transparent 70%)',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Velocity Animation */}
      <section
        ref={velocityRef}
        className="relative overflow-hidden pt-0 pb-0 md:pt-0 md:pb-1 lg:pt-0 lg:pb-0"
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
                gap: '-10px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '50px',
              }}
            >
              <ScrollVelocityText
                baseVelocity={70}
                className="text-8xl font-extrabold text-[#383e7b71] leading-tight h-[107px]"
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
                className="text-2xl font-extralight text-[#cd97cd] leading-tight h-[100px]"
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

      {/* Case Studies with Horizontal Scroll */}
      <AppleScrollSection delay={0.4}>
        <section className="section-padding relative services-section case-studies-section mt-20">
          {' '}
          {/* Responsive top margin for better spacing */}
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
                Proven results backed by analytics data from 6 months to 1 year implementations
              </motion.p>
            </motion.div>
          </div>
          <HorizontalScroll />
        </section>
      </AppleScrollSection>

      {/* Agentic AI & RAG Section */}
      <AppleScrollSection delay={0.3}>
        <section className="section-padding relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#1a0b2e]/45 to-black/90" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center gap-8 mb-12">
              {/* Section Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-[#4CD787] via-[#9d4edd] to-[#CFB53B] bg-clip-text text-transparent">
                    Agentic AI & RAG Solutions
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-white/80 font-['IBM_Plex_Sans'] leading-relaxed mx-auto">
                  Transform your business with intelligent AI agents that think, learn, and act
                  autonomously. Powered by cutting-edge retrieval-augmented generation technology.
                </p>
              </motion.div>
            </div>

            {/* Video and Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start justify-items-center max-w-7xl mx-auto">
              {/* Video Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="order-1 lg:order-1 lg:col-span-2 flex flex-col items-center w-full"
              >
                <div className="relative group rounded-2xl overflow-hidden shadow-2xl shadow-[#4CD787]/10 w-full">
                  <div className="relative w-full h-full bg-black">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      poster="/videos/agentic-ai-grid-poster.jpg"
                    >
                      <source src="/videos/agentic-ai-grid.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#4CD787]/30 via-[#9d4edd]/30 to-[#CFB53B]/30 blur-xl" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-6 text-center"
                >
                  <p className="text-sm md:text-base text-white/60 font-['IBM_Plex_Mono']">
                    Real-time AI Agent Orchestration
                  </p>
                </motion.div>
              </motion.div>

              {/* Cards Section */}
              <div className="order-2 space-y-6 w-full flex flex-col items-center lg:col-span-2">
                {/* Card 1: Agentic AI */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative group w-full max-w-3xl"
                >
                  <div className="bg-[#0B0B10]/90 p-8 rounded-2xl border border-[#4CD787]/30 hover:border-[#4CD787]/50 transition-all duration-300 shadow-lg hover:shadow-[#4CD787]/30 text-left">
                    <div className="flex flex-col gap-4">
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
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
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
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
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
              className="mt-16 text-center"
            >
              <p className="text-lg md:text-xl text-white/70 mb-6 font-['IBM_Plex_Sans']">
                Ready to automate your business with intelligent AI agents?
              </p>
              <motion.a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#4CD787] to-[#9d4edd] hover:from-[#9d4edd] hover:to-[#CFB53B] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
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

      {/* Services Grid with Apple-style reveal */}
      <AppleScrollSection>
        <section className="section-padding relative services-section pt-8 md:pt-12">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 px-2 md:px-8 lg:px-12 xl:px-16 relative z-10">
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

      {/* Testimonials with Parallax - Consistent spacing */}
      <AppleScrollSection delay={0.5} className="section-margin">
        <ClientOnly>
          <ParallaxTestimonials />
        </ClientOnly>
      </AppleScrollSection>

      <section className="relative py-20 overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
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
                className="inline-flex items-center gap-3 bg-robinhood text-black hover:bg-white hover:text-black px-8 py-4 rounded-xl font-semibold text-lg border-2 border-robinhood shadow-lg hover:shadow-[0_8px_30px_rgba(76,215,135,0.3)] transition-all duration-300"
              >
                Schedule a Strategy Call
                <ArrowRight className="w-5 h-5" />
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
