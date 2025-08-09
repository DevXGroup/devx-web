'use client'
/**
 * PortfolioPage component displays the main portfolio landing page with animated backgrounds,
 * interactive decorative elements, a grid of project cards, and a section for services with modal details.
 *
 * Features:
 * - Animated decorative squares and shapes using Framer Motion.
 * - Particle field and waves background effects.
 * - Responsive grid layout for showcasing projects.
 * - Interactive service icons that open a modal with more information.
 * - Accessibility support for reduced motion preferences.
 * - Call-to-action section for scheduling a strategy call.
 *
 * State:
 * - `selectedService`: Currently selected service for modal display.
 * - `isModalOpen`: Controls visibility of the service modal.
 * - `clickPosition`: Tracks the position of the user's click for modal animation.
 *
 * Hooks:
 * - `useReducedMotion`: Detects user preference for reduced motion.
 * - `useMemo`: Memoizes animation timing based on motion preference.
 *
 * @component
 * @returns {JSX.Element} The rendered portfolio page.
 */
import { motion, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRef, useMemo, useState } from 'react'
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
import TextPressure from '@/components/TextPressure'
import ParticleField from '@/components/ParticleField'
import MagneticCard from '@/components/MagneticCard'
import LetterGlitch from '@/components/LetterGlitch'
import DotGrid from '@/components/DotGrid'
import Squares from '@/components/Squares'
import Waves from '@/components/Waves'
import WavesNew from '@/components/WavesNew'
import GridAnimation from '@/components/GridAnimation'

// Enhanced animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -8,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
}

// Complete services data for circular icons with modal functionality
const services = [
  {
    icon: Code2,
    title: 'Custom',
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
    title: 'AI',
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
    color: '#CFB53B',
  },
  {
    icon: Database,
    title: 'Database',
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
    color: '#CFB53B',
  },
  {
    icon: Cpu,
    title: 'Hardware',
    fullTitle: 'Hardware IoT Design',
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
                borderRadius: '100%',
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                borderRadius: '12px',
              }}
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
                  className="px-5 py-2 rounded-lg text-black font-medium transition-all"
                  style={{ backgroundColor: service.color }}
                  onClick={onClose}
                >
                  Close
                </button>
                <a
                  href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-lg bg-robinhood text-black font-medium transition-all hover:bg-robinhood/90"
                >
                  Schedule a Strategy Call
                </a>
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
    title: 'E-commerce Platform',
    description:
      'A fully responsive e-commerce platform with advanced search and filtering capabilities.',
    image: '/modern-ecommerce-interface.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Web Development',
    link: '#',
    github: '#',
  },
  {
    title: 'AI-Powered Chatbot',
    description:
      'An intelligent chatbot using natural language processing to provide customer support.',
    image: '/ai-chatbot.png',
    tags: ['Python', 'TensorFlow', 'Flask', 'React'],
    category: 'AI/ML',
    link: '#',
    github: '#',
  },
  {
    title: 'IoT Dashboard',
    description: 'Real-time dashboard for monitoring and controlling IoT devices in smart homes.',
    image: '/analytics-dashboard.png',
    tags: ['Vue.js', 'Node.js', 'MQTT', 'InfluxDB'],
    category: 'IoT',
    link: '#',
    github: '#',
  },
  {
    title: 'Mobile Fitness App',
    description:
      'A cross-platform mobile app for tracking workouts and nutrition with social features.',
    image: '/mobile-app-multiple-devices.png',
    tags: ['React Native', 'Firebase', 'Redux', 'GraphQL'],
    category: 'Mobile Development',
    link: '#',
    github: '#',
  },
  {
    title: 'Telemedicine Platform',
    description: 'A secure telemedicine platform connecting patients with healthcare providers.',
    image: '/telemedicine-app.png',
    tags: ['React', 'Node.js', 'WebRTC', 'HIPAA'],
    category: 'Healthcare',
    link: '#',
    github: '#',
  },
  {
    title: 'Fleet Management System',
    description:
      'Real-time tracking and management system for vehicle fleets with GPS integration.',
    image: '/fleet-management-tracking.png',
    tags: ['Angular', 'AWS', 'PostgreSQL', 'GPS'],
    category: 'Enterprise',
    link: '#',
    github: '#',
  },
  {
    title: 'Joyful',
    description:
      'Joyful is a Qatari confectionery store whose job is to sell flowers, snacks, chocolates and cakes.',
    image: '/images/portfolio/previews/joyful-preview.webp',
    tags: ['E-commerce', 'React', 'Node.js', 'Stripe'],
    category: 'E-commerce/Confectionery',
    link: '#',
    github: '#',
  },
  {
    title: 'Lazurd',
    description:
      "The word 'Lazurd' is derived from the semi-precious stone called 'Lapis Lazuli'. This stone's beauty, and unique deep blue colour, distinguishes it from all other stones- including precious ones.",
    image: '/images/portfolio/previews/lazurd-preview.webp',
    tags: ['E-commerce', 'Vue.js', 'Payment', 'Luxury'],
    category: 'Luxury/Jewelry',
    link: '#',
    github: '#',
  },
  {
    title: 'JoyJoy',
    description:
      'Begin your journey of inspiration and daily affirmations, tailored just for you, with our mobile application JoyJoy.',
    image: '/images/portfolio/previews/joyjoy-preview.webp',
    tags: ['React Native', 'Wellness', 'iOS', 'Android'],
    category: 'Mobile App/Wellness',
    link: '#',
    github: '#',
  },
  {
    title: 'ChatFly',
    description:
      'ChatFly combines powerful AI with a user-friendly interface. The simplicity and power of AI communication provide a pleasant user experience with features such as auto-response reading.',
    image: '/images/portfolio/previews/chatfly-preview.webp',
    tags: ['AI', 'Chat', 'React', 'Machine Learning'],
    category: 'AI/Communication',
    link: '#',
    github: '#',
  },
  {
    title: 'Lawazm',
    description:
      'A distinguished electronic platform in Kuwait and The Middle East for household products, baby & children needs.',
    image: '/images/portfolio/previews/lawazm-preview.webp',
    tags: ['E-commerce', 'Next.js', 'MongoDB', 'Kuwait'],
    category: 'E-commerce/Household',
    link: '#',
    github: '#',
  },
  {
    title: 'I Love Food (ILF)',
    description:
      'I love food app is the simplest and most effective healthy eating & weight loss app',
    image: '/images/portfolio/previews/i-love-food-ilf-preview.webp',
    tags: ['React Native', 'Health', 'Fitness', 'Nutrition'],
    category: 'Health/Fitness',
    link: '#',
    github: '#',
  },
  {
    title: 'Chayyel',
    description:
      'Chayyel is a start-up Co. about gaming that wants to expand the company all over the world.',
    image: '/images/portfolio/previews/chayyel-preview.webp',
    tags: ['Gaming', 'Unity', 'React', 'WebGL'],
    category: 'Gaming/Startup',
    link: '#',
    github: '#',
  },
  {
    title: 'LetsPass',
    description: 'LetsPass is a platform founded for online education.',
    image: '/images/portfolio/previews/letspass-preview.webp',
    tags: ['Education', 'React', 'LMS', 'E-learning'],
    category: 'Education/E-learning',
    link: '#',
    github: '#',
  },
  {
    title: 'Zahra Farm',
    description: 'Buy organic products Rent plots for planting Visit greenhouses and rent huts',
    image: '/images/portfolio/previews/zahra-farm-preview.webp',
    tags: ['Agriculture', 'E-commerce', 'Organic', 'React'],
    category: 'Agriculture/Organic',
    link: '#',
    github: '#',
  },
  {
    title: 'Kanii',
    description:
      'Kanii is a Company for the mobile vans that provide some services for the customers.',
    image: '/images/portfolio/previews/kanii-preview.webp',
    tags: ['Service', 'Mobile', 'GPS', 'React Native'],
    category: 'Service/Mobile',
    link: '#',
    github: '#',
  },
  {
    title: 'Aljawda',
    description:
      'Aljawda Provide a wide variety and the finest quality with affordable prices that wanted to empower their business through mobile applications and website',
    image: '/images/portfolio/previews/aljawda-preview.webp',
    tags: ['E-commerce', 'Quality', 'React', 'Mobile'],
    category: 'E-commerce/Quality Products',
    link: '#',
    github: '#',
  },
  {
    title: 'Jawaherji',
    description:
      'Are you looking for stunning jewelry that will catch the eye of any viewer? Then, this is the right place for you.',
    image: '/images/portfolio/previews/jawaherji-preview.webp',
    tags: ['Jewelry', 'Luxury', 'E-commerce', 'Vue.js'],
    category: 'Jewelry/Luxury',
    link: '#',
    github: '#',
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
        type: 'spring',
        damping: 20,
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
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [30, -30],
                  y: [30, -30],
                }
          }
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'mirror',
            duration: 2,
            ease: 'linear',
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
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <MagneticCard intensity={0.2} className="h-full">
      <motion.div
        ref={ref}
        variants={cardHoverVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="bg-black/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 group hover:border-[#4CD787]/60 transition-all duration-500 cursor-pointer h-full relative shadow-2xl"
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                scale: 1.03,
                y: -8,
                boxShadow: '0 30px 60px -12px rgba(76, 215, 135, 0.3)',
              }
        }
      >
        {/* Enhanced Image Section */}
        <div className="relative overflow-hidden h-64 md:h-72">
          <Image
            src={project.image || '/placeholder.svg'}
            alt={project.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 6}
          />

          {/* Sophisticated overlay gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Animated category badge */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <span className="bg-gradient-to-r from-[#4CD787] to-[#CFB53B] text-black px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
              {project.category}
            </span>
          </motion.div>
        </div>

        {/* Enhanced Content Section */}
        <div className="p-6 md:p-8 relative">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-gradient-to-br from-[#4CD787] to-[#4834D4]" />
          </div>

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

            {/* Enhanced tags section */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#4CD787]/20 to-[#CFB53B]/20 text-[#4CD787] border border-[#4CD787]/30 text-xs font-medium rounded-full group-hover:bg-gradient-to-r group-hover:from-[#4CD787]/30 group-hover:to-[#CFB53B]/30 group-hover:border-[#4CD787]/50 transition-all duration-300 backdrop-blur-sm"
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
  const animationTiming = useMemo(
    () => ({
      duration: shouldReduceMotion ? 0.3 : 0.8,
      stagger: shouldReduceMotion ? 0.05 : 0.1,
    }),
    [shouldReduceMotion]
  )

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

        <div className="relative container mx-auto px-4">
          {/* Interactive Animation Squares - Widely Spaced Layout */}

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
            initial={{ opacity: 0, scale: 0, rotate: -23 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          >
            <div className="w-full h-full">
              <LetterGlitch
                glitchColors={['#4CD787', '#61dca3', '#2b4539']}
                glitchSpeed={100}
                centerVignette={false}
                outerVignette={false}
                smooth={true}
              />
            </div>
          </motion.div>

          {/* Left Middle Square - DotGrid (130x130px) - Large screens only */}
          <motion.div
            className="hidden lg:block absolute 
              top-1/2 -translate-y-1/2 left-[25%]
              backdrop-blur-md overflow-hidden
              w-[130px] h-[130px]"
            style={{
              transform: 'rotate(12deg)',
              border: '2px solid rgba(72, 52, 212, 0.6)',
              borderRadius: '12px',
              boxShadow: '0 0 20px rgba(72, 52, 212, 0.4)',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 10,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 27 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
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
                style={{}}
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
              border: '2px solid rgba(207, 181, 59, 0.6)',
              borderRadius: '12px',
              boxShadow: '0 0 20px rgba(207, 181, 59, 0.4)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              zIndex: 20,
            }}
            initial={{ opacity: 0, scale: 0, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
          >
            <div className="w-full h-full">
              <GridAnimation
                direction="diagonal"
                speed={0.16}
                borderColor="#CFB53B"
                squareSize={20}
                hoverFillColor="rgba(207, 181, 59, 0.3)"
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
              zIndex: 2,
            }}
            initial={{ opacity: 0, scale: 0, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
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
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Small animated yellow square - positioned under the orange circle */}
                <motion.div
                  className="absolute -top-12 left-6 w-6 h-6 rotate-45 cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(45deg, rgba(207,181,59,0.7) 0%, rgba(207,181,59,0.3) 50%, transparent 100%)',
                    border: '1px solid rgba(207,181,59,0.5)',
                    borderRadius: '2px',
                    boxShadow: '0 0 12px rgba(207,181,59,0.3)',
                    zIndex: 1,
                  }}
                  animate={{
                    rotate: [45, 225, 45],
                    scale: [1, 0.8, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                  }}
                  whileHover={{
                    scale: 1.8,
                    rotate: 180,
                    boxShadow: '0 0 30px rgba(207,181,59,0.8)',
                    background:
                      'linear-gradient(45deg, rgba(207,181,59,1) 0%, rgba(207,181,59,0.8) 50%, rgba(207,181,59,0.4) 100%)',
                    border: '2px solid rgba(207,181,59,0.9)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                  whileTap={{
                    scale: 1.4,
                    rotate: 360,
                    transition: { duration: 0.2 },
                  }}
                />
              </div>

              <div className="flex items-center justify-center w-full mb-4 sm:mb-8 px-4">
                <div
                  className="relative flex items-center justify-center w-full max-w-md mx-auto"
                  style={{
                    height: '120px',
                    minWidth: '280px',
                  }}
                >
                  <TextPressure
                    text="Portfolio  "
                    flex={true}
                    alpha={false}
                    stroke={false}
                    width={true}
                    weight={true}
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
                className="text-xl text-foreground/80 font-light max-w-2xl mb-4 sm:mb-8 lg:-mt-12"
              >
                Explore our diverse range of projects showcasing our expertise in software
                development and innovation.
              </motion.p>

              {/* New Waves Animation */}
              <motion.div variants={fadeInUpVariants} className="mb-8 flex justify-center relative">
                <div className="relative w-full max-w-2xl h-32">
                  <WavesNew
                    lineColor="#4CD787"
                    backgroundColor="transparent"
                    waveSpeedX={0.008}
                    waveSpeedY={0.005}
                    waveAmpX={20}
                    waveAmpY={10}
                    xGap={15}
                    yGap={25}
                    friction={0.92}
                    tension={0.006}
                    maxCursorMove={60}
                  />
                </div>
              </motion.div>

              {/* Mobile Squares Grid - Only visible on small screens */}
              <motion.div 
                variants={fadeInUpVariants}
                className="lg:hidden flex flex-wrap justify-center gap-6 -mt-20 mb-8"
              >
                {/* Top Row */}
                <div className="flex gap-6">
                  <motion.div
                    className="backdrop-blur-md overflow-hidden
                      w-[70px] h-[70px]
                      sm:w-[80px] sm:h-[80px]"
                    style={{
                      transform: 'rotate(-8deg)',
                      border: '2px solid rgba(76, 215, 135, 0.6)',
                      borderRadius: '12px',
                      boxShadow: '0 0 20px rgba(76, 215, 135, 0.4)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 2,
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: -23 }}
                    animate={{ opacity: 1, scale: 1, rotate: -8 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
                  >
                    <div className="w-full h-full">
                      <LetterGlitch
                        glitchColors={['#4CD787', '#61dca3', '#2b4539']}
                        glitchSpeed={100}
                        centerVignette={false}
                        outerVignette={false}
                        smooth={true}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="backdrop-blur-md overflow-hidden
                      w-[80px] h-[80px]
                      sm:w-[100px] sm:h-[100px]"
                    style={{
                      transform: 'rotate(12deg)',
                      border: '2px solid rgba(72, 52, 212, 0.6)',
                      borderRadius: '12px',
                      boxShadow: '0 0 20px rgba(72, 52, 212, 0.4)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 10,
                    }}
                    initial={{ opacity: 0, scale: 0, rotate: 27 }}
                    animate={{ opacity: 1, scale: 1, rotate: 12 }}
                    transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
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
                        style={{}}
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Row */}
                <div className="flex gap-6">
                  <motion.div
                    className="backdrop-blur-md overflow-hidden
                      w-[80px] h-[80px]
                      sm:w-[100px] sm:h-[100px]"
                    style={{
                      transform: 'rotate(-15deg)',
                      border: '2px solid rgba(207, 181, 59, 0.6)',
                      borderRadius: '12px',
                      boxShadow: '0 0 20px rgba(207, 181, 59, 0.4)',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      zIndex: 20,
                    }}
                    initial={{ opacity: 0, scale: 0, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
                  >
                    <div className="w-full h-full">
                      <GridAnimation
                        direction="diagonal"
                        speed={0.16}
                        borderColor="#CFB53B"
                        squareSize={20}
                        hoverFillColor="rgba(207, 181, 59, 0.3)"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className="backdrop-blur-md overflow-hidden
                      w-[70px] h-[70px]
                      sm:w-[80px] sm:h-[80px]"
                    style={{
                      transform: 'rotate(-30deg)',
                      border: '2px solid rgba(76, 215, 135, 0.6)',
                      borderRadius: '12px',
                      boxShadow: '0 0 20px rgba(76, 215, 135, 0.4)',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      zIndex: 2,
                    }}
                    initial={{ opacity: 0, scale: 0, x: 30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 opacity-10 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(76, 215, 135, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(72, 52, 212, 0.15) 0%, transparent 50%),
                linear-gradient(90deg, transparent 79px, rgba(76, 215, 135, 0.08) 79px, rgba(76, 215, 135, 0.08) 81px, transparent 81px),
                linear-gradient(0deg, transparent 79px, rgba(72, 52, 212, 0.08) 79px, rgba(72, 52, 212, 0.08) 81px, transparent 81px)
              `,
                backgroundSize: '400px 400px, 400px 400px, 80px 80px, 80px 80px',
                animation: shouldReduceMotion ? 'none' : 'float 30s ease-in-out infinite',
              }}
            />
          </div>

          {/* Premium Portfolio Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* Elegant section divider */}
          <div className="mt-20 flex items-center justify-center relative">
            <div className="h-px bg-gradient-to-r from-transparent via-[#4CD787]/30 to-transparent w-64"></div>
            <div className="mx-4 w-2 h-2 bg-[#4CD787] rounded-full opacity-60"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#4CD787]/30 to-transparent w-64"></div>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">
              Ready to Build Your Next Project?
            </h2>
            <p className="text-lg text-foreground/80 font-light mb-8">
              Let&apos;s collaborate to bring your ideas to life with our expertise in cutting-edge
              technologies.
            </p>
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?month=2025-05"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-robinhood text-black hover:bg-robinhood-90 px-8 py-3 rounded-lg font-medium border-robinhood hover:shadow-[0_5px_15px_rgba(204,255,0,0.3)] transition-all duration-300"
              >
                Schedule a Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Icons Section - moved from ServicesPage */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />

        <div className="container mx-auto px-4 relative">
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
