'use client'

import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import {
  Code2,
  Rocket,
  Database,
  Cloud,
  Brain,
  Cog,
  Smartphone,
  Globe,
  Cpu,
  Bot,
} from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import HorizontalScroll from '@/components/HorizontalScroll'
import ParallaxTestimonials from '@/components/ParallaxTestimonials'
import EnhancedInfinityLoader from '@/components/EnhancedInfinityLoader'
import dynamic from 'next/dynamic'
import ServicesBanner from '@/components/ServicesBanner'
import TrueFocus from '@/components/TrueFocus'
import BlurText from '@/components/BlurText'

// Import the newly separated components
import ParticleAnimation from '@/components/services/ParticleAnimation'
import ServiceCard from '@/components/services/ServiceCard'
import AnimatedGradient from '@/components/services/AnimatedGradient'
import FloatingElement from '@/components/services/FloatingElement'
import AppleScrollSection from '@/components/services/AppleScrollSection'
import ScrollVelocityText from '@/components/ScrollVelocityText'
import SafariCompatibleWrapper from '@/components/SafariCompatibleWrapper'

// Import BraidedRopeAnimation dynamically to prevent hydration issues
const BraidedRopeAnimation = dynamic(() => import('@/components/BraidedRopeAnimation'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-transparent">
      <div className="absolute inset-0 w-full h-full bg-transparent" />
    </div>
  ),
})

// Define services array here, as it's specific to this page's cards
const services = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'We build custom software that fits your exact needs. Get web apps, mobile apps, and systems that grow with your business.',
    features: [
      'Full-stack Web Applications',
      'Enterprise System Integration',
      'Legacy System Modernization',
      'Custom CRM & ERP Platforms',
    ],
    color: '#4CD787',
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description:
      'Use AI to automate tasks and make better decisions. We build smart systems that learn from your data and help you work faster.',
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
    features: [
      'Intelligent Process Automation',
      'Custom AI Assistant Development',
      'Workflow Orchestration',
      'Decision Engine Integration',
    ],
    color: '#00D2FF',
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description:
      'Move your apps to the cloud for better reliability and lower costs. We set up secure systems that handle more users without slowing down.',
    features: [
      'Multi-Cloud Architecture',
      'Serverless & Microservices',
      'DevOps & CI/CD Pipelines',
      'Cloud Security & Compliance',
    ],
    color: '#4834D4',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Build mobile apps your users will love. We create fast, easy-to-use apps for iPhone and Android that keep people coming back.',
    features: [
      'Native iOS & Android Development',
      'React Native & Flutter',
      'App Store Optimization',
      'Mobile-First UI/UX Design',
    ],
    color: '#CFB53B',
  },
  {
    icon: Cpu,
    title: 'IoT Hardware & Edge Computing',
    description:
      'Connect devices and sensors to collect data automatically. We build IoT systems that monitor your business and send alerts when needed.',
    features: [
      'Custom IoT Device Development',
      'Edge AI & Real-time Processing',
      'Sensor Integration & Networking',
      'Industrial IoT Solutions',
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
  },
  {
    title: 'Reliable Results',
    description:
      "We deliver what we promise on time. You'll see real improvements in your business.",
  },
  {
    title: 'Clear Pricing',
    description: "No hidden costs or surprises. You'll know exactly what you pay before we start.",
  },
  {
    title: 'Long-term Support',
    description: 'We stick around after launch. Get ongoing help and advice when you need it.',
  },
  {
    title: 'Experienced Team',
    description:
      "Work with skilled developers, designers, and project managers who know what they're doing.",
  },
  {
    title: 'Modern AI Tools',
    description:
      'Use the latest AI technology to automate work and improve your business processes.',
  },
]

// Dynamically import ServiceShowcase3D to ensure it loads properly
const ServiceShowcase3D = dynamic(() => import('@/components/ServiceShowcase3D'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] md:h-[700px] w-full bg-black/20 rounded-xl">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#4CD787] mx-auto mb-4"></div>
        <p className="text-lg">Loading 3D Experience...</p>
      </div>
    </div>
  ),
})

export default function ServicesPage() {
  // Existing state variables
  const [activeSection, setActiveSection] = useState(null)
  const heroRef = useRef(null)
  const valuePropsRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: false })
  const heroControls = useAnimation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isSafari, setIsSafari] = useState(false)
  const [activeService, setActiveService] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Simplified scroll progress tracking - only for hero section
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Force a re-render after component mounts to ensure visibility
  useEffect(() => {
    setIsClient(true)
  }, [])

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

  // Simplified transform values - removed complex scroll-based transforms
  const titleY = useTransform(heroScrollProgress, [0, 1], [0, -30])
  const titleScale = useTransform(heroScrollProgress, [0, 1], [1, 0.95])

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

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Floating animation for background elements
  const floatingAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  const activeServiceData = services.find((s, i) => i === activeService) || services[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Enhanced Metallic Helix */}
      <section
        ref={heroRef}
        className="relative min-h-screen hero-padding flex flex-col items-center justify-center services-section"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black z-0" />

        {/* Enhanced background animations */}
        <div className="absolute inset-0 z-0">
          <AnimatedGradient />

          {/* Floating background elements */}
          <FloatingElement
            delay={0}
            size={400}
            color="rgba(76, 215, 135, 0.2)"
            left="10%"
            top="-10%"
          />
          <FloatingElement
            delay={3}
            size={350}
            color="rgba(72, 52, 212, 0.2)"
            left="70%"
            top="60%"
          />
          <FloatingElement
            delay={7}
            size={300}
            duration={15}
            color="rgba(207, 181, 59, 0.15)"
            left="30%"
            top="40%"
          />

          {/* Subtle parallax effect based on mouse position */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              x: mousePosition.x * -10,
              y: mousePosition.y * -10,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            {/* Static floating particles - fixes hydration */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/30"
                initial={{
                  x: [100, 300, 500, 700, 900, 1100, 200, 800][i] || 400,
                  y: [150, 350, 250, 450, 180, 380, 280, 320][i] || 300,
                  opacity: [0.1, 0.15, 0.2, 0.25, 0.12, 0.18, 0.22, 0.16][i] || 0.15,
                  scale: [0.7, 1.0, 0.8, 1.2, 0.9, 0.6, 1.1, 0.5][i] || 0.8,
                }}
                animate={{
                  y: [0, -15, 0, 15, 0],
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: [3, 4, 5, 6, 3.5, 4.5, 5.5, 7][i] || 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                  delay: [0, 1, 2, 3, 0.5, 1.5, 2.5, 4][i] || 0,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Subtle light beams */}
        <div className="absolute inset-0 w-full z-0">
          <motion.div
            initial={{ opacity: 0, rotate: -45, x: '-50%', y: '100%' }}
            animate={{
              opacity: [0, 0.15, 0],
              y: ['100%', '-100%'],
              transition: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                ease: 'linear',
              },
            }}
            className="absolute left-1/4 w-[40px] h-[600px] bg-gradient-to-t from-[#4CD787]/0 via-[#4CD787]/20 to-[#4CD787]/0"
            style={{ transform: 'rotate(-45deg)' }}
          />

          <motion.div
            initial={{ opacity: 0, rotate: 45, x: '50%', y: '100%' }}
            animate={{
              opacity: [0, 0.15, 0],
              y: ['100%', '-100%'],
              transition: {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                ease: 'linear',
                delay: 4,
              },
            }}
            className="absolute right-1/4 w-[40px] h-[600px] bg-gradient-to-t from-[#4834D4]/0 via-[#4834D4]/20 to-[#4834D4]/0"
            style={{ transform: 'rotate(45deg)' }}
          />

          {/* Additional light beams */}
          <motion.div
            initial={{ opacity: 0, rotate: -30, x: '-30%', y: '100%' }}
            animate={{
              opacity: [0, 0.1, 0],
              y: ['100%', '-100%'],
              transition: {
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'loop',
                ease: 'linear',
                delay: 2,
              },
            }}
            className="absolute left-1/3 w-[30px] h-[800px] bg-gradient-to-t from-[#CFB53B]/0 via-[#CFB53B]/15 to-[#CFB53B]/0"
            style={{ transform: 'rotate(-30deg)' }}
          />

          <motion.div
            initial={{ opacity: 0, rotate: 30, x: '30%', y: '100%' }}
            animate={{
              opacity: [0, 0.12, 0],
              y: ['100%', '-100%'],
            }}
            transition={{
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'loop',
              ease: 'linear',
              delay: 6,
            }}
            className="absolute right-1/3 w-[35px] h-[700px] bg-gradient-to-t from-[#9d4edd]/0 via-[#9d4edd]/18 to-[#9d4edd]/0"
            style={{ transform: 'rotate(30deg)' }}
          />
        </div>

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
              <div className="flex flex-col items-center pt-4 md:pt-8 ">
                <BlurText
                  text="Services"
                  className="heading-hero text-accent-gold title-margin text-center relative z-40 services-title"
                  delay={133}
                  animateBy="words"
                  direction="top"
                  animationFrom={undefined}
                  animationTo={undefined}
                  onAnimationComplete={() => {}}
                />
              </div>

              <motion.p
                variants={floatingAnimation}
                className="text-body-large text-white/95 max-w-3xl mx-auto relative z-40"
              >
                We build software that helps your business work better. Our experienced team creates
                reliable solutions that save you time and help you serve your customers better.
              </motion.p>
            </motion.div>
          </div>

          {/* Two rope strands animation - extends from top of page */}
          <SafariCompatibleWrapper 
            delay={200}
            className="absolute w-full z-0 overflow-hidden" 
            style={{ top: '0px', height: '100vh' }}
            fallback={
              <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
            }
          >
            <BraidedRopeAnimation className="w-full h-full" />
          </SafariCompatibleWrapper>

          {/* Interactive rope indicator */}
          <SafariCompatibleWrapper delay={400}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 text-white/60 text-xs font-mono tracking-wider cursor-pointer select-none"
            >
              → drag/interact ←
            </motion.div>
          </SafariCompatibleWrapper>
        </div>
      </section>

      {/* Value Propositions Section */}
      <AppleScrollSection>
        <section className="section-padding relative services-section">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="heading-section text-accent-gold text-center title-margin mt-0 font-['IBM_Plex_Mono'] services-title"
            >
              The DevX edge
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-16 relative z-20">
              {valueProps.map((prop, index) => (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#4CD787]/30 hover:bg-black/50 transition-all duration-300 group cursor-pointer"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 8px 20px -8px rgba(207, 181, 59, 0.3)',
                    transition: { duration: 0.2 },
                  }}
                >
                  <h3 className="text-xl font-semibold text-[#CFB53B] mb-2 group-hover:text-white transition-colors duration-300">
                    {prop.title}
                  </h3>
                  <p className="text-foreground/70 text-sm group-hover:text-white/80 transition-colors duration-300">
                    {prop.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AppleScrollSection>

      {/* Services Grid with Apple-style reveal */}
      <AppleScrollSection>
        <section className="section-padding relative services-section">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="heading-section text-accent-gold text-center title-margin mt-0 font-['IBM_Plex_Mono'] services-title"
            >
              Our Expertise
            </motion.h2>

            {/* Interactive background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <ParticleAnimation density={15} speed={0.2} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-16 relative z-10">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.05,
                      ease: 'easeOut',
                    },
                  }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <ServiceCard service={service} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AppleScrollSection>

      {/* CTA Section with Apple-style reveal */}
      <AppleScrollSection delay={0.2}>
        <section className="section-padding relative services-section">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/10 to-black" />

          {/* Subtle light beams */}
          <div className="absolute inset-0">
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

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center max-w-3xl mx-auto px-4"
            >
              <motion.h2
                className="heading-section text-accent-gold text-center mb-12"
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                Ready to Accelerate Your Success?
              </motion.h2>

              <motion.p
                className="text-body text-white/85 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.6 },
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                Don&apos;t let outdated technology hold you back. Schedule a strategic consultation
                and discover how our proven solutions can drive measurable growth for your
                business—starting today.
              </motion.p>

              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4, duration: 0.6 },
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <Link
                    href="/contact"
                    className="inline-block bg-robinhood text-black hover:bg-robinhood-90 px-8 py-3 rounded-lg font-medium border border-black/30 hover:border-black/60 hover:shadow-[0_5px_15px_rgba(204,255,0,0.3)] relative overflow-hidden group transition-all duration-300"
                  >
                    <span className="relative z-10">Start Your Transformation</span>
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%', opacity: 0 }}
                      whileHover={{ x: '100%', opacity: 0.2 }}
                      transition={{ duration: 0.6 }}
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Scroll Velocity Animation */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.6, duration: 0.8 },
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="mt-16 w-full max-w-none overflow-hidden"
              >
                {isClient && (
                  <div suppressHydrationWarning={true}>
                    <ScrollVelocityText
                      baseVelocity={50}
                      className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/20 mb-4"
                    >
                      {[
                        'Custom Software • AI Solutions • Mobile Apps • Cloud Infrastructure • ',
                        'IoT Development • Workflow Automation • Digital Transformation • ',
                      ]}
                    </ScrollVelocityText>
                    <ScrollVelocityText
                      baseVelocity={-30}
                      className="text-xl md:text-2xl lg:text-3xl font-light text-white/15"
                    >
                      {[
                        'Fast Delivery • Expert Team • Modern Technology • Reliable Results • ',
                        'Long-term Support • Clear Pricing • Proven Success • Your Vision • ',
                      ]}
                    </ScrollVelocityText>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AppleScrollSection>

      {/* Case Studies with Horizontal Scroll */}
      <AppleScrollSection delay={0.4}>
        <section className="section-padding relative services-section case-studies-section">
          {' '}
          {/* Responsive top margin for better spacing */}
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="title-margin text-center"
            >
              <TrueFocus sentence="Case Studies" />
            </motion.div>
          </div>
          {isClient && <HorizontalScroll />}
        </section>
      </AppleScrollSection>

      {/* Testimonials with Parallax - Consistent spacing */}
      <AppleScrollSection delay={0.5} className="section-margin">
        {isClient && <ParallaxTestimonials />}
      </AppleScrollSection>
    </div>
  )
}
