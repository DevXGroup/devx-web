"use client"

import { motion, useAnimation, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Code2, Rocket, Database, Cloud, Brain, Cog, Smartphone, Globe, Cpu, Bot } from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import HorizontalScroll from "@/components/HorizontalScroll"
import ParallaxTestimonials from "@/components/ParallaxTestimonials"
import EnhancedInfinityLoader from "@/components/EnhancedInfinityLoader"
import BraidedRopeAnimation from "@/components/BraidedRopeAnimation"
import dynamic from "next/dynamic"
import ServicesBanner from "@/components/ServicesBanner"
import TrueFocus from "@/components/TrueFocus"
import BlurText from "@/components/BlurText"

// Import the newly separated components
import ParticleAnimation from "@/components/services/ParticleAnimation"
import ServiceCard from "@/components/services/ServiceCard"
import AnimatedGradient from "@/components/services/AnimatedGradient"
import FloatingElement from "@/components/services/FloatingElement"
import AppleScrollSection from "@/components/services/AppleScrollSection"


// Define services array here, as it's specific to this page's cards
const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Transform your vision into reality with bespoke software solutions that perfectly match your unique business requirements. We craft scalable, robust applications that grow with your success.",
    features: [
      "Full-stack Web Applications",
      "Enterprise System Integration",
      "Legacy System Modernization",
      "Custom CRM & ERP Platforms",
    ],
    color: "#4CD787",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Unlock the future of business intelligence with cutting-edge AI solutions. We create smart systems that learn, adapt, and provide actionable insights to drive your competitive advantage.",
    features: [
      "Predictive Analytics & Forecasting",
      "Natural Language Processing",
      "Computer Vision & Image Recognition",
      "Custom Machine Learning Models",
    ],
    color: "#9d4edd",
  },
  {
    icon: Bot,
    title: "AI Agents & Workflow Automation",
    description:
      "Revolutionize your operations with intelligent AI agents that work 24/7. We design sophisticated automation systems that eliminate repetitive tasks and optimize your entire workflow.",
    features: [
      "Intelligent Process Automation",
      "Custom AI Assistant Development",
      "Workflow Orchestration",
      "Decision Engine Integration",
    ],
    color: "#00D2FF",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Elevate your business with enterprise-grade cloud infrastructure that scales seamlessly. We architect secure, high-performance cloud environments that reduce costs and maximize efficiency.",
    features: [
      "Multi-Cloud Architecture",
      "Serverless & Microservices",
      "DevOps & CI/CD Pipelines",
      "Cloud Security & Compliance",
    ],
    color: "#4834D4",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Captivate your audience with stunning mobile experiences that users love. We build high-performance native and cross-platform apps that deliver exceptional user engagement and business results.",
    features: [
      "Native iOS & Android Development",
      "React Native & Flutter",
      "App Store Optimization",
      "Mobile-First UI/UX Design",
    ],
    color: "#CFB53B",
  },
  {
    icon: Cpu,
    title: "IoT Hardware & Edge Computing",
    description:
      "Bridge the physical and digital worlds with innovative IoT solutions. We design and develop connected devices and edge computing systems that collect, process, and act on real-time data.",
    features: [
      "Custom IoT Device Development",
      "Edge AI & Real-time Processing",
      "Sensor Integration & Networking",
      "Industrial IoT Solutions",
    ],
    color: "#ff6b6b",
  },
]

// Value proposition items
const valueProps = [
  {
    title: "Expert Solutions",
    description: "Start today and be up and running with onboarding us in a matter of a few days.",
  },
  {
    title: "Fast Results Guaranteed",
    description: "Achieve your goals quickly with our flexible subscription model.",
  },
  {
    title: "Competitive Hourly Rates",
    description: "Get results efficiently with our competitive hourly based rate.",
  },
  {
    title: "Long-term Partnership",
    description: "We'd like to help you achieve your goals fast and effortlessly.",
  },
  {
    title: "Seasoned Software Team",
    description: "Our team of engineers, designers, and managers ready to deliver outstanding job.",
  },
  {
    title: "AI-Powered Automation",
    description: "Leverage cutting-edge AI agents and workflow automation to transform your operations.",
  },
]

// Dynamically import ServiceShowcase3D to ensure it loads properly
const ServiceShowcase3D = dynamic(() => import("@/components/ServiceShowcase3D"), {
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
    offset: ["start start", "end start"],
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
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
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
      heroControls.start("visible")
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
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
        ease: "easeOut",
      },
    },
  }

  const activeServiceData = services.find((s, i) => i === activeService) || services[0]

  return (
    <div className="min-h-screen bg-background mt-0 pt-0 z-30">
      {/* Hero Section with Enhanced Metallic Helix */}
      <section ref={heroRef} className="relative min-h-screen py-20 flex flex-col items-center justify-center pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black z-0" />
        

        {/* Enhanced background animations */}
        <div className="absolute inset-0">
          <AnimatedGradient />

          {/* Floating background elements */}
          <FloatingElement delay={0} size={400} color="rgba(76, 215, 135, 0.2)" left="10%" top="-10%" />
          <FloatingElement delay={3} size={350} color="rgba(72, 52, 212, 0.2)" left="70%" top="60%" />
          <FloatingElement delay={7} size={300} duration={15} color="rgba(207, 181, 59, 0.15)" left="30%" top="40%" />

          {/* Subtle parallax effect based on mouse position */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              x: mousePosition.x * -10,
              y: mousePosition.y * -10,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
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
                  repeatType: "reverse",
                  delay: [0, 1, 2, 3, 0.5, 1.5, 2.5, 4][i] || 0,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Subtle light beams */}
        <div className="absolute inset-0 w-full">
          <motion.div
            initial={{ opacity: 0, rotate: -45, x: "-50%", y: "100%" }}
            animate={{
              opacity: [0, 0.15, 0],
              y: ["100%", "-100%"],
              transition: {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              },
            }}
            className="absolute left-1/4 w-[40px] h-[600px] bg-gradient-to-t from-[#4CD787]/0 via-[#4CD787]/20 to-[#4CD787]/0"
            style={{ transform: "rotate(-45deg)" }}
          />

          <motion.div
            initial={{ opacity: 0, rotate: 45, x: "50%", y: "100%" }}
            animate={{
              opacity: [0, 0.15, 0],
              y: ["100%", "-100%"],
              transition: {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
                delay: 4,
              },
            }}
            className="absolute right-1/4 w-[40px] h-[600px] bg-gradient-to-t from-[#4834D4]/0 via-[#4834D4]/20 to-[#4834D4]/0"
            style={{ transform: "rotate(45deg)" }}
          />

          {/* Additional light beams */}
          <motion.div
            initial={{ opacity: 0, rotate: -30, x: "-30%", y: "100%" }}
            animate={{
              opacity: [0, 0.1, 0],
              y: ["100%", "-100%"],
              transition: {
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
                delay: 2,
              },
            }}
            className="absolute left-1/3 w-[30px] h-[800px] bg-gradient-to-t from-[#CFB53B]/0 via-[#CFB53B]/15 to-[#CFB53B]/0"
            style={{ transform: "rotate(-30deg)" }}
          />

          <motion.div
            initial={{ opacity: 0, rotate: 30, x: "30%", y: "100%" }}
            animate={{
              opacity: [0, 0.12, 0],
              y: ["100%", "-100%"],
            }}
            transition={{
              duration: 9,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: 6,
            }}
            className="absolute right-1/3 w-[35px] h-[700px] bg-gradient-to-t from-[#9d4edd]/0 via-[#9d4edd]/18 to-[#9d4edd]/0"
            style={{ transform: "rotate(30deg)" }}
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
              className="text-center max-w-4xl mx-auto mb-12"
            >
              <div className="flex flex-col items-center">
                <BlurText 
                  text="Services"
                  className="heading-hero text-accent-gold mb-8 text-center relative z-40"
                  delay={133}
                  animateBy="words"
                  direction="top"
                />
              </div>

              <motion.p
                variants={floatingAnimation}
                className="text-body-large text-white/95 max-w-3xl mx-auto relative z-40"
              >
                Comprehensive software solutions to drive your business forward. We combine expertise with innovation to
                deliver exceptional results.
              </motion.p>
            </motion.div>
          </div>

          {/* Two rope strands animation - extends above screen */}
          {isClient && (
            <div className="absolute w-full z-0 overflow-hidden" style={{ top: '-100px', height: '80vh' }}>
              <BraidedRopeAnimation className="w-full h-full" />
            </div>
          )}

          {/* Content spacing */}
          <div className="w-full mx-auto mb-12 h-20"></div>

          {/* Value Propositions with Apple-style reveal */}
          <div ref={valuePropsRef} className="w-full max-w-5xl mt-0 mb-8 relative z-20 -translate-y-12 md:translate-y-0">
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
                    boxShadow: "0 8px 20px -8px rgba(207, 181, 59, 0.3)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <h3 className="text-xl font-semibold text-[#CFB53B] mb-2 group-hover:text-white transition-colors duration-300">{prop.title}</h3>
                  <p className="text-foreground/70 text-sm group-hover:text-white/80 transition-colors duration-300">{prop.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Services Grid with Apple-style reveal */}
      <AppleScrollSection>
        <section className="py-0 relative">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="heading-section text-accent-gold text-center mb-12 mt-0"
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
                      ease: "easeOut",
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
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/10 to-black" />

          {/* Subtle light beams */}
          <div className="absolute inset-0">
            <motion.div
              initial={{ opacity: 0, rotate: -45, x: "-50%", y: "100%" }}
              animate={{
                opacity: [0, 0.1, 0],
                y: ["100%", "-100%"],
                transition: {
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                },
              }}
              className="absolute left-1/4 w-[80px] h-[400px] bg-gradient-to-t from-[#4CD787]/0 via-[#4CD787]/20 to-[#4CD787]/0"
              style={{ transform: "rotate(-45deg)" }}
            />

            <motion.div
              initial={{ opacity: 0, rotate: 45, x: "50%", y: "100%" }}
              animate={{
                opacity: [0, 0.1, 0],
                y: ["100%", "-100%"],
                transition: {
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                  delay: 4,
                },
              }}
              className="absolute right-1/4 w-[80px] h-[400px] bg-gradient-to-t from-[#4834D4]/0 via-[#4834D4]/20 to-[#4834D4]/0"
              style={{ transform: "rotate(45deg)" }}
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
                className="heading-section text-accent-gold mb-6"
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                Ready to Transform Your Business?
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
                Let&apos;s discuss how we can help you achieve your goals with our expert software development services.
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
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: "100%", opacity: 0.2 }}
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
        <section className="py-20 relative pt-32">
          {" "}
          {/* Increased pt-20 to pt-32 for more top margin */}
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-12 text-center"
            >
              <TrueFocus sentence="Case Studies" />
            </motion.div>
          </div>
          {isClient && <HorizontalScroll />}
        </section>
      </AppleScrollSection>

      {/* Testimonials with Parallax - Reduced spacing above */}
      <AppleScrollSection delay={0.5} className="py-0">
        {isClient && <ParallaxTestimonials />}
      </AppleScrollSection>
    </div>
  )
}
