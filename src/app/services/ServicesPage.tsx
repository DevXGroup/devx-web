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
import { Code2, Cloud, Brain, Smartphone, Cpu, Bot, Monitor } from 'lucide-react'
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

import HyperSpeed from '@/components/animations/HyperSpeed'
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
    color: '#FFD700',
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
    proofPoint: 'Average MVP delivery in 6-8 weeks, 40% faster than industry standard'
  },
  {
    title: 'Reliable Results',
    description:
      "We deliver what we promise on time. You'll see real improvements in your business.",
    proofPoint: '98% on-time delivery rate across 50+ projects completed'
  },
  {
    title: 'Clear Pricing',
    description: "No hidden costs or surprises. You'll know exactly what you pay before we start.",
    proofPoint: 'Fixed-price projects with 0% cost overruns in the last 2 years'
  },
  {
    title: 'Long-term Support',
    description: 'We stick around after launch. Get ongoing help and advice when you need it.',
    proofPoint: '90% client retention rate with ongoing support relationships'
  },
  {
    title: 'Experienced Team',
    description:
      "Work with skilled developers, designers, and project managers who know what they're doing.",
    proofPoint: '15+ years combined experience with 100+ successful deployments'
  },
  {
    title: 'Modern AI Tools',
    description:
      'Use the latest AI technology to automate work and improve your business processes.',
    proofPoint: 'AI implementations reducing operational costs by 60% on average'
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
                      textColor="#FFD700"
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
                  letterSpacing: '0.025em',
                }}
              >
                Comprehensive software solutions to drive your business forward. We combine
                expertise with innovation to deliver exceptional results.
              </motion.p>
            </motion.div>
          </div>

          {/* Value Propositions with Apple-style reveal */}
          <div
            ref={valuePropsRef}
            className="w-full max-w-5xl mb-8 relative z-20 pointer-events-auto"
          >
            <div className="flex justify-center items-center mb-16 text-center mt-24">
              <div
                style={{
                  fontFamily: 'Georgia, "Times New Roman", Times, serif',
                  fontStyle: 'italic',
                  fontWeight: '300',
                  textShadow: '0 4px 8px rgba(207, 181, 59, 0.3), 0 2px 4px rgba(0, 0, 0, 0.5)',
                  letterSpacing: '0.02em',
                }}
              >
                <BlurText
                  text="The DevX Edge"
                  className="text-2xl md:text-3xl lg:text-3xl font-light text-center text-[#FFD700] mt-10 tracking-wide italic"
                  delay={120}
                  animateBy="words"
                  direction="top"
                  animationFrom={{ opacity: 0, y: 70 }}
                  animationTo={[{ opacity: 1, y: 0 }]}
                  onAnimationComplete={() => {}}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-6 md:px-8 lg:px-16 relative z-20">
              {valueProps.map((prop, index) => (
                <motion.div
                  key={prop.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-black/60 md:bg-black/30 backdrop-blur-md md:backdrop-blur-sm p-6 rounded-xl border border-white/20 md:border-white/10 hover:border-white/30 transition-all duration-300 group cursor-pointer pointer-events-auto relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => {}} // Required for hover effects
                  onMouseLeave={() => {}} // Required for hover effects
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-[#FFD700] mb-2 transition-colors duration-300 relative z-10">
                    {prop.title}
                  </h3>
                  <p
                    className="text-white/90 text-base md:text-lg transition-colors duration-300 font-['IBM_Plex_Sans'] font-medium relative z-10 mb-3"
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)', letterSpacing: '0.025em' }}
                  >
                    {prop.description}
                  </p>
                  {prop.proofPoint && (
                    <p className="text-[#4CD787] text-sm md:text-base font-semibold transition-colors duration-300 relative z-10">
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
                        boxShadow: '0 0 6px #FFD700, 0 0 12px rgba(207, 181, 59, 0.4)',
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
                        boxShadow: '0 0 6px #FFD700, 0 0 12px rgba(207, 181, 59, 0.4)',
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
                        boxShadow: '0 0 6px #FFD700, 0 0 12px rgba(207, 181, 59, 0.4)',
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
                        boxShadow: '0 0 6px #FFD700, 0 0 12px rgba(207, 181, 59, 0.4)',
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
                        'radial-gradient(circle at center, #FFD70020 0%, transparent 70%)',
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
                className="text-7xl font-extrabold text-[#383e7b71] leading-tight h-[87px]"
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
                className="text-3xl font-extralight text-[#cd97cd] leading-tight h-[100px]"
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
        <section className="section-padding relative services-section case-studies-section mt-10">
          {' '}
          {/* Responsive top margin for better spacing */}
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              className="title-margin text-center"
            >
              <TrueFocus sentence="Case Studies" />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-lg md:text-xl text-white/90 font-light mt-10 max-w-2xl mx-auto font-['IBM_Plex_Sans'] leading-relaxed"
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                  letterSpacing: '0.025em',
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

      {/* Services Grid with Apple-style reveal */}
      <AppleScrollSection>
        <section className="section-padding relative services-section pt-8 md:pt-12">
          <div className="container mx-auto px-4 ">
            <div className="w-full flex justify-center mb-28">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
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
                  textColor="#FFD700"
                  strokeColor="#FFFFFF"
                  minFontSize={32}
                />
              </motion.div>
            </div>

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

      {/* Testimonials with Parallax - Consistent spacing */}
      <AppleScrollSection delay={0.5} className="section-margin">
        <ClientOnly>
          <ParallaxTestimonials />
        </ClientOnly>
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
                className="text-3xl md:text-4xl font-bold mb-6 text-[#FFD700]"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  WebkitTextStroke: '1px rgba(0,0,0,0.3)',
                }}
              >
                Ready to Transform Your Business?
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl text-white font-light font-['IBM_Plex_Sans'] leading-relaxed mb-8 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.6 },
                }}
                viewport={{ once: true, amount: 0.5 }}
                style={{
                  textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                  letterSpacing: '0.025em',
                  fontWeight: '400',
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
                  <a
                    href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-robinhood text-black hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium border-2 border-robinhood shadow-lg transition-all duration-300"
                  >
                    <span className="relative z-10">Schedule a Strategy Call</span>
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%', opacity: 0 }}
                      whileHover={{ x: '130%', opacity: 0.3 }}
                      transition={{ duration: 0.6 }}
                    />
                  </a>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </AppleScrollSection>
    </div>
  )
}
