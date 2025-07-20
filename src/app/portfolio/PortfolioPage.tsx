"use client"

import { motion, useReducedMotion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef, useMemo } from "react"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import IntertwineAnimation from "@/components/IntertwineAnimation"
import BlurText from "@/components/BlurText"

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

function ProjectCard({ project, index }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  return (
    <motion.div
      ref={ref}
      variants={cardHoverVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 group hover:border-[#4CD787]/50 transition-all duration-300 cursor-pointer"
      whileHover={shouldReduceMotion ? {} : cardHoverVariants.hover}
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
  )
}

export default function PortfolioPage() {
  const shouldReduceMotion = useReducedMotion()
  
  // Memoize animation timing based on reduced motion preference
  const animationTiming = useMemo(() => ({
    duration: shouldReduceMotion ? 0.3 : 0.8,
    stagger: shouldReduceMotion ? 0.05 : 0.1
  }), [shouldReduceMotion])
  
  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-[500px] h-[500px] bg-[#4CD787]/20 rounded-full blur-3xl -top-48 -left-24"
            animate={shouldReduceMotion ? {} : {
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute w-[400px] h-[400px] bg-[#4834D4]/20 rounded-full blur-3xl top-96 -right-24"
            animate={shouldReduceMotion ? {} : {
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1],
              x: [0, -30, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

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
              
              {/* Intertwined Animation - centered */}
              <motion.div
                variants={fadeInUpVariants}
                className="mb-8 flex justify-center"
              >
                <IntertwineAnimation className="" width={500} height={120} />
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
      {/* Remove Footer component at the bottom */}
      {/* Remove: <Footer /> */}
    </div>
  )
}
