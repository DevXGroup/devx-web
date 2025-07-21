"use client"

import { motion, useReducedMotion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useMemo, useState } from "react"
import { ExternalLink, Github, ArrowRight, Code2, Rocket, Database, Cloud, Brain, Cog, Smartphone, Globe, Cpu, X, Quote } from "lucide-react"
import BlurText from "@/components/BlurText"
import ParticleField from "@/components/ParticleField"
import MorphingShapes from "@/components/MorphingShapes"
import MagneticCard from "@/components/MagneticCard"

// Enhanced animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

// Complete services data for circular icons with modal functionality
const services = [
  {
    icon: Code2,
    title: "Custom",
    fullTitle: "Custom Software Development",
    description: "We create tailored software solutions that perfectly align with your business needs. From web applications to enterprise systems, we deliver scalable and efficient solutions.",
    features: ["Full-stack Development", "API Development & Integration", "Legacy System Modernization", "Custom CRM & ERP Solutions"],
    color: "#4CD787"
  },
  {
    icon: Brain,
    title: "AI",
    fullTitle: "AI & Machine Learning", 
    description: "Harness the power of artificial intelligence to transform your business. We develop intelligent solutions that automate processes and provide valuable insights.",
    features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision Solutions", "Machine Learning Models"],
    color: "#9d4edd"
  },
  {
    icon: Cloud,
    title: "Cloud",
    fullTitle: "Cloud Solutions",
    description: "Leverage cloud technology to scale your business efficiently. We provide comprehensive cloud services to optimize your operations and reduce costs.",
    features: ["Cloud Migration", "Cloud-Native Development", "Serverless Architecture", "Cloud Infrastructure Management"],
    color: "#4834D4"
  },
  {
    icon: Smartphone,
    title: "Mobile",
    fullTitle: "Mobile App Development",
    description: "Create engaging mobile experiences for your users. We develop native and cross-platform mobile applications that deliver exceptional performance.",
    features: ["iOS Development", "Android Development", "Cross-platform Solutions", "Mobile App Strategy"],
    color: "#CFB53B"
  },
  {
    icon: Database,
    title: "Database",
    fullTitle: "Database Solutions",
    description: "Design and implement robust database solutions that ensure data integrity and optimal performance. We help you manage and analyze your data effectively.",
    features: ["Database Design", "Data Migration", "Performance Optimization", "Data Security Implementation"],
    color: "#ff6b6b"
  },
  {
    icon: Globe,
    title: "Web",
    fullTitle: "Web Development",
    description: "Build powerful web applications that drive your business forward. We create responsive, user-friendly websites that engage your audience.",
    features: ["Frontend Development", "Backend Development", "E-commerce Solutions", "Progressive Web Apps"],
    color: "#4CD787"
  },
  {
    icon: Cog,
    title: "DevOps",
    fullTitle: "DevOps Services",
    description: "Streamline your development and operations with our DevOps expertise. We implement efficient workflows and automation to enhance your delivery pipeline.",
    features: ["CI/CD Implementation", "Infrastructure as Code", "Container Orchestration", "Monitoring & Logging"],
    color: "#4834D4"
  },
  {
    icon: Rocket,
    title: "Digital",
    fullTitle: "Digital Transformation",
    description: "Transform your business with modern digital solutions. We help you embrace new technologies and optimize your digital presence.",
    features: ["Digital Strategy Consulting", "Process Automation", "Technology Migration", "Digital Innovation"],
    color: "#CFB53B"
  },
  {
    icon: Cpu,
    title: "Hardware",
    fullTitle: "Hardware IoT Design",
    description: "Bridge the physical and digital worlds with our IoT hardware design expertise. We create custom connected devices and systems that collect, analyze, and act on real-world data.",
    features: ["Custom IoT Device Development", "Sensor Integration & Networking", "Embedded Systems Design", "Edge Computing Solutions"],
    color: "#9d4edd"
  },
]

// Service Modal Component
const ServiceModal = ({ service, isOpen, onClose, clickPosition }) => {
  if (!service) return null

  const Icon = service.icon

  return (
    <AnimatePresence>
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: clickPosition ? clickPosition.x - window.innerWidth / 2 : 0,
                y: clickPosition ? clickPosition.y - window.innerHeight / 2 : 0,
                borderRadius: "100%",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                borderRadius: "12px",
              }}
              exit={{
                opacity: 0,
                scale: 0,
                x: clickPosition ? clickPosition.x - window.innerWidth / 2 : 0,
                y: clickPosition ? clickPosition.y - window.innerHeight / 2 : 0,
                borderRadius: "100%",
              }}
              transition={{
                type: "spring",
                damping: 25,
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 },
                borderRadius: { duration: 0.4 },
              }}
              className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto p-6 relative"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

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
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: service.color }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
                <button
                  className="px-5 py-2 rounded-lg text-black font-medium transition-all"
                  style={{ backgroundColor: service.color }}
                  onClick={onClose}
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  className="px-5 py-2 rounded-lg bg-robinhood text-black font-medium transition-all hover:bg-robinhood/90"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

const projects = [
  {
    title: "E-commerce Platform",
    description: "A fully responsive e-commerce platform with advanced search and filtering capabilities.",
    image: "/modern-ecommerce-interface.png",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Web Development",
    link: "#",
    github: "#"
  },
  {
    title: "AI-Powered Chatbot",
    description: "An intelligent chatbot using natural language processing to provide customer support.",
    image: "/ai-chatbot.png",
    tags: ["Python", "TensorFlow", "Flask", "React"],
    category: "AI/ML",
    link: "#",
    github: "#"
  },
  {
    title: "IoT Dashboard",
    description: "Real-time dashboard for monitoring and controlling IoT devices in smart homes.",
    image: "/analytics-dashboard.png",
    tags: ["Vue.js", "Node.js", "MQTT", "InfluxDB"],
    category: "IoT",
    link: "#",
    github: "#"
  },
  {
    title: "Mobile Fitness App",
    description: "A cross-platform mobile app for tracking workouts and nutrition with social features.",
    image: "/mobile-app-multiple-devices.png",
    tags: ["React Native", "Firebase", "Redux", "GraphQL"],
    category: "Mobile Development",
    link: "#",
    github: "#"
  },
  {
    title: "Telemedicine Platform",
    description: "A secure telemedicine platform connecting patients with healthcare providers.",
    image: "/telemedicine-app.png",
    tags: ["React", "Node.js", "WebRTC", "HIPAA"],
    category: "Healthcare",
    link: "#",
    github: "#"
  },
  {
    title: "Fleet Management System",
    description: "Real-time tracking and management system for vehicle fleets with GPS integration.",
    image: "/fleet-management-tracking.png",
    tags: ["Angular", "AWS", "PostgreSQL", "GPS"],
    category: "Enterprise",
    link: "#",
    github: "#"
  },
]

// Circular Service Icon Component
function ServiceIcon({ service, index, onClick }) {
  const shouldReduceMotion = useReducedMotion()
  
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        onClick(service, e)
      }}
      className="relative group service-icon-container"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        damping: 20
      }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
    >
      <motion.div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: service.color }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute w-24 h-24 bg-white/40 blur-md"
          animate={shouldReduceMotion ? {} : {
            x: [30, -30],
            y: [30, -30],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            duration: 2,
            ease: "linear",
          }}
        />

        <service.icon className="w-8 h-8 md:w-10 md:h-10 text-black relative z-10" />

        {/* Enhanced reflection with gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
          style={{
            background: `linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)`,
          }}
        />
      </motion.div>

      {/* Title below icon */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap text-center">
        {service.title}
      </div>
    </motion.button>
  )
}

function ProjectCard({ project, index }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <MagneticCard
      intensity={0.15}
      className="h-full"
    >
      <motion.div
        ref={ref}
        variants={cardHoverVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 group hover:border-[#4CD787]/50 transition-all duration-300 cursor-pointer h-full relative"
        whileHover={shouldReduceMotion ? {} : {
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(76, 215, 135, 0.25)"
        }}
      >
      <div className="relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-[#4CD787]/90 text-black px-2 py-1 rounded-full text-xs font-medium">
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <motion.a
              href={project.link}
              className="flex items-center gap-1 bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-3 h-3" />
              View
            </motion.a>
            <motion.a
              href={project.github}
              className="flex items-center gap-1 bg-[#4CD787]/90 text-black px-3 py-1 rounded-full text-sm font-medium hover:bg-[#4CD787] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-3 h-3" />
              Code
            </motion.a>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#4CD787] mb-2 group-hover:text-white transition-colors duration-300">{project.title}</h3>
        <p className="text-foreground/80 font-light mb-4 group-hover:text-white/90 transition-colors duration-300">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-[#4CD787]/20 text-[#4CD787] text-xs rounded-full group-hover:bg-[#4CD787]/30 transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
      </motion.div>
    </MagneticCard>
  )
}

export default function PortfolioPage() {
  const shouldReduceMotion = useReducedMotion()
  const [selectedService, setSelectedService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })
  
  // Memoize animation timing based on reduced motion preference
  const animationTiming = useMemo(() => ({
    duration: shouldReduceMotion ? 0.3 : 0.8,
    stagger: shouldReduceMotion ? 0.05 : 0.1
  }), [shouldReduceMotion])

  // Function to open modal with service details
  const handleServiceClick = (service, event) => {
    if (event) {
      const x = event.clientX
      const y = event.clientY
      setClickPosition({ x, y })
    } else {
      setClickPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    }
    setSelectedService(service)
    setIsModalOpen(true)
  }

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedService(null)
    setTimeout(() => {
      setClickPosition({ x: 0, y: 0 })
    }, 100)
  }
  
  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

        {/* Particle Field Background */}
        <ParticleField className="opacity-60" />
        
        {/* Morphing Shapes */}
        <MorphingShapes />

        <div className="relative container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center">
              <BlurText 
                text="Portfolio"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-[#4834D4]"
                delay={120}
                animateBy="words"
                direction="top"
              />
              
              {/* Dynamic Grid Pattern */}
              <motion.div
                variants={fadeInUpVariants}
                className="mb-8 flex justify-center relative"
              >
                <div className="relative w-full max-w-2xl h-32">
                  {/* Animated grid lines */}
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                      <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4CD787" stopOpacity="0" />
                        <stop offset="50%" stopColor="#4CD787" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#4CD787" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 32 + 16}
                        x2="100%"
                        y2={i * 32 + 16}
                        stroke="url(#gridGradient)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          repeatDelay: 1
                        }}
                      />
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.line
                        key={`v-${i}`}
                        x1={`${(i + 1) * 12.5}%`}
                        y1="0"
                        x2={`${(i + 1) * 12.5}%`}
                        y2="100%"
                        stroke="#4834D4"
                        strokeWidth="0.5"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.15,
                          repeat: Infinity,
                          repeatType: "reverse",
                          repeatDelay: 2
                        }}
                      />
                    ))}
                  </svg>
                  
                  {/* Floating geometric elements */}
                  <motion.div
                    className="absolute top-4 left-1/4 w-3 h-3 bg-[#CFB53B] rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 right-1/3 w-4 h-4 border-2 border-[#9d4edd] rotate-45"
                    animate={{
                      rotate: [45, 225, 45],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </div>
              </motion.div>
              
              <motion.p 
                variants={fadeInUpVariants}
                className="text-xl text-foreground/80 font-light max-w-2xl"
              >
                Explore our diverse range of projects showcasing our expertise in software development and innovation.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Holographic Grid Background */}
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 79px, rgba(76, 215, 135, 0.1) 79px, rgba(76, 215, 135, 0.1) 81px, transparent 81px),
                linear-gradient(0deg, transparent 79px, rgba(72, 52, 212, 0.1) 79px, rgba(72, 52, 212, 0.1) 81px, transparent 81px)
              `,
              backgroundSize: '80px 80px',
              animation: shouldReduceMotion ? 'none' : 'float 20s ease-in-out infinite'
            }} />
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-900/20 to-black" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Ready to Build Your Next Project?</h2>
            <p className="text-lg text-foreground/80 font-light mb-8">
              Let&apos;s collaborate to bring your ideas to life with our expertise in cutting-edge technologies.
            </p>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-robinhood text-black hover:bg-robinhood-90 px-8 py-3 rounded-lg font-medium border-robinhood hover:shadow-[0_5px_15px_rgba(204,255,0,0.3)] transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Icons Section - moved from ServicesPage */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
        
        <div className="container mx-auto px-4">
          {/* Circular Service Icons */}
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

        {/* Service Modal */}
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          clickPosition={clickPosition}
        />
      </section>

      {/* Remove Footer component at the bottom */}
      {/* Remove: <Footer /> */}
    </div>
  )
}
