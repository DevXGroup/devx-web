'use client'

import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { Code2, Cloud, Brain, Smartphone, Cpu, Bot } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import HorizontalScroll from '@/components/HorizontalScroll'
import ParallaxTestimonials from '@/components/ParallaxTestimonials'
import dynamic from 'next/dynamic'
import TrueFocus from '@/components/TrueFocus'
import BlurText from '@/components/BlurText'

// Import the newly separated components
import ServiceCard from '@/components/services/ServiceCard'
import AppleScrollSection from '@/components/services/AppleScrollSection'
import ScrollVelocityText from '@/components/ScrollVelocityText'

import BraidedRopeAnimation from '@/components/BraidedRopeAnimation'

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
    <div className="min-h-screen bg-background mt-0 pt-0">
      {/* Hero Section with Enhanced Metallic Helix */}
      <section
        ref={heroRef}
        className="relative min-h-screen py-20 flex flex-col items-center justify-center pt-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />

        {/* Full-screen 3D Braided Rope Animation - Background under Our Services title */}
        {isClient && (
          <div className="absolute inset-0 w-full h-full z-10 overflow-hidden pointer-events-auto">
            <BraidedRopeAnimation className="absolute inset-0 w-full h-full" />
          </div>
        )}

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
              className="text-center max-w-4xl mx-auto title-margin pointer-events-none"
            >
              <div className="flex flex-col items-center">
                <BlurText
                  text="Services"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-[#CFB53B] font-['IBM_Plex_Mono'] relative z-30"
                  delay={120}
                  animateBy="words"
                  direction="top"
                  animationFrom={{ opacity: 0, y: 20 }}
                  animationTo={[{ opacity: 1, y: 0 }]}
                  onAnimationComplete={() => {}}
                />
              </div>

              <motion.p
                variants={floatingAnimation}
                className="text-xl text-foreground/80 font-light max-w-2xl mx-auto relative z-30"
                style={{
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  WebkitTextStroke: '0.5px rgba(0,0,0,0.3)',
                }}
              >
                Comprehensive software solutions to drive your business forward. We combine
                expertise with innovation to deliver exceptional results.
              </motion.p>
            </motion.div>
          </div>

          {/* Drag indicator for rope animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="relative z-30 text-center mb-8"
          >
            <motion.p
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-sm text-white/60 font-light tracking-wide"
              style={{
                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
              }}
            >
              → drag/interact ←
            </motion.p>
          </motion.div>

          {/* Content spacing for braided rope animation */}
          <div className="w-full mx-auto mb-12 h-8"></div>

          {/* Value Propositions with Apple-style reveal */}
          <div
            ref={valuePropsRef}
            className="w-full max-w-5xl mt-8 mb-8 relative z-20 pointer-events-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#CFB53B] mt-0"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                WebkitTextStroke: '1px rgba(0,0,0,0.3)',
              }}
            >
              The DevX Edge
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-8 lg:px-16 relative z-20">
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
                    boxShadow: '0 8px 20px -8px rgba(207,181,59,0.3)',
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
        </div>
      </section>

      {/* Scroll Velocity Animation */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { delay: 0.3, duration: 0.8 },
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-full overflow-hidden"
        >
          {isClient && (
            <div suppressHydrationWarning={true} className="w-full">
              <ScrollVelocityText
                baseVelocity={75}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4CD787]/30 mb-6"
                damping={30}
                stiffness={600}
                velocityMapping={{ input: [0, 1000], output: [0, 3] }}
              >
                {[
                  'Custom Software • AI Solutions • Mobile Apps • Cloud Infrastructure • ',
                  'IoT Development • Workflow Automation • Digital Transformation • ',
                ]}
              </ScrollVelocityText>
              <ScrollVelocityText
                baseVelocity={-50}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-[#CFB53B]/25"
                damping={30}
                stiffness={600}
                velocityMapping={{ input: [0, 1000], output: [0, 3] }}
              >
                {[
                  'Fast Delivery • Expert Team • Modern Technology • Reliable Results • ',
                  'Long-term Support • Clear Pricing • Proven Success • Your Vision • ',
                ]}
              </ScrollVelocityText>
            </div>
          )}
        </motion.div>
      </section>

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
              className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#CFB53B] mt-0"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                WebkitTextStroke: '1px rgba(0,0,0,0.3)',
              }}
            >
              Our Expertise
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-8 lg:px-16 relative z-10">
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
                className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]"
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  WebkitTextStroke: '1px rgba(0,0,0,0.3)',
                }}
              >
                Ready to Transform Your Business?
              </motion.h2>

              <motion.p
                className="text-lg text-foreground/80 font-light mb-8"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.6 },
                }}
                viewport={{ once: true, amount: 0.5 }}
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  WebkitTextStroke: '0.5px rgba(0,0,0,0.2)',
                }}
              >
                Let&apos;s discuss how we can help you achieve your goals with our expert software
                development services.
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
                    <span className="relative z-10">Get Started</span>
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%', opacity: 0 }}
                      whileHover={{ x: '100%', opacity: 0.2 }}
                      transition={{ duration: 0.6 }}
                    />
                  </Link>
                </motion.div>
              </AnimatePresence>
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
