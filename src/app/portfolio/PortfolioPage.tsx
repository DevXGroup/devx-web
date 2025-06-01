"use client"

import { motion } from "framer-motion"
import Image from "next/image"
// Remove Footer import
// Remove: import Footer from "@/common/Footer"

const projects = [
  {
    title: "E-commerce Platform",
    description: "A fully responsive e-commerce platform with advanced search and filtering capabilities.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    title: "AI-Powered Chatbot",
    description: "An intelligent chatbot using natural language processing to provide customer support.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Python", "TensorFlow", "Flask", "React"],
  },
  {
    title: "IoT Dashboard",
    description: "Real-time dashboard for monitoring and controlling IoT devices in smart homes.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Vue.js", "Node.js", "MQTT", "InfluxDB"],
  },
  {
    title: "Mobile Fitness App",
    description: "A cross-platform mobile app for tracking workouts and nutrition with social features.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["React Native", "Firebase", "Redux", "GraphQL"],
  },
  {
    title: "Cloud-based CRM",
    description: "A scalable customer relationship management system with advanced analytics.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Angular", "AWS", "PostgreSQL", "Kubernetes"],
  },
  {
    title: "Blockchain Supply Chain",
    description: "A decentralized supply chain management system using blockchain technology.",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["Solidity", "Ethereum", "Web3.js", "React"],
  },
]

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 group hover:border-[#4CD787]/50 transition-colors"
    >
      <Image
        src={project.image || "/placeholder.svg"}
        alt={project.title}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#4CD787] mb-2">{project.title}</h3>
        <p className="text-foreground/80 font-light mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-[#4CD787]/20 text-[#4CD787] text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-[#4CD787]/20 rounded-full blur-3xl -top-48 -left-24 animate-pulse" />
          <div className="absolute w-[400px] h-[400px] bg-[#4834D4]/20 rounded-full blur-3xl top-96 -right-24 animate-pulse" />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#CFB53B]">Portfolio</h1>
            <p className="text-xl text-foreground/80 font-light">
              Explore our diverse range of projects showcasing our expertise in software development and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">Ready to Build Your Next Project?</h2>
            <p className="text-lg text-foreground/80 font-light mb-8">
              Let's collaborate to bring your ideas to life with our expertise in cutting-edge technologies.
            </p>
            <a
              href="/contact"
              className="inline-block bg-robinhood text-black hover:bg-robinhood-90 px-8 py-3 rounded-lg font-light border-robinhood"
            >
              Start Your Project
            </a>
          </motion.div>
        </div>
      </section>
      {/* Remove Footer component at the bottom */}
      {/* Remove: <Footer /> */}
    </div>
  )
}
