"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code2, Rocket, Database, Cloud, Brain, Cog, Smartphone, Globe, Cpu } from "lucide-react"
import Link from "next/link"

// Service data
const services = [
  {
    icon: Code2,
    name: "Custom Software",
    description: "Tailored software solutions that perfectly align with your business needs.",
    color: "#4CD787",
    features: ["Full-stack Development", "API Integration", "Legacy Modernization", "Custom CRM & ERP"],
  },
  {
    icon: Brain,
    name: "AI & ML",
    description: "Harness the power of artificial intelligence to transform your business.",
    color: "#9d4edd",
    features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Machine Learning Models"],
  },
  {
    icon: Cloud,
    name: "Cloud Solutions",
    description: "Leverage cloud technology to scale your business efficiently.",
    color: "#4834D4",
    features: ["Cloud Migration", "Cloud-Native Development", "Serverless Architecture", "Infrastructure Management"],
  },
  {
    icon: Smartphone,
    name: "Mobile Apps",
    description: "Create engaging mobile experiences with native and cross-platform applications.",
    color: "#CFB53B",
    features: ["iOS Development", "Android Development", "Cross-platform Solutions", "Mobile App Strategy"],
  },
  {
    icon: Database,
    name: "Database",
    description: "Design and implement robust database solutions for optimal performance.",
    color: "#ff6b6b",
    features: ["Database Design", "Data Migration", "Performance Optimization", "Data Security"],
  },
  {
    icon: Globe,
    name: "Web Development",
    description: "Build powerful web applications that drive your business forward.",
    color: "#4CD787",
    features: ["Frontend Development", "Backend Development", "E-commerce Solutions", "Progressive Web Apps"],
  },
  {
    icon: Cog,
    name: "DevOps",
    description: "Streamline your development and operations with our DevOps expertise.",
    color: "#4834D4",
    features: ["CI/CD Implementation", "Infrastructure as Code", "Container Orchestration", "Monitoring & Logging"],
  },
  {
    icon: Rocket,
    name: "Digital Transformation",
    description: "Transform your business with modern digital solutions.",
    color: "#CFB53B",
    features: ["Digital Strategy", "Process Automation", "Technology Migration", "Digital Innovation"],
  },
  {
    icon: Cpu,
    name: "IoT Hardware",
    description: "Bridge the physical and digital worlds with our IoT hardware design expertise.",
    color: "#9d4edd",
    features: ["IoT Device Development", "Sensor Integration", "Embedded Systems", "Edge Computing"],
  },
]

export default function ServiceShowcase3D() {
  const [selectedService, setSelectedService] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full py-12 bg-gradient-to-b from-black/80 via-black/90 to-black/80 rounded-xl overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Service Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                selectedService === index ? "ring-2" : "hover:bg-white/5"
              }`}
              style={{
                boxShadow: selectedService === index ? `0 0 15px ${service.color}40` : "none",
                borderColor: selectedService === index ? service.color : "transparent",
                ringColor: service.color,
              }}
              onClick={() => setSelectedService(selectedService === index ? null : index)}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  {React.createElement(service.icon, {
                    size: 24,
                    color: service.color,
                    className: "drop-shadow-glow",
                    style: { filter: `drop-shadow(0 0 3px ${service.color}80)` },
                  })}
                </div>
                <h3 className="font-medium text-white mb-1">{service.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Service Details */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: selectedService !== null ? 1 : 0,
            height: selectedService !== null ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="mt-8 overflow-hidden"
        >
          {selectedService !== null && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: services[selectedService].color }}
                >
                  {React.createElement(services[selectedService].icon, { size: 24, color: "#000" })}
                </div>
                <h3 className="text-xl font-bold" style={{ color: services[selectedService].color }}>
                  {services[selectedService].name}
                </h3>
              </div>

              <p className="text-white/80 mb-4">{services[selectedService].description}</p>

              <div className="mb-6">
                <h4 className="text-white/90 font-medium mb-2">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {services[selectedService].features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{
                        backgroundColor: `${services[selectedService].color}20`,
                        color: services[selectedService].color,
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-robinhood text-black hover:bg-robinhood-90 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-[0_5px_15px_rgba(204,255,0,0.3)]"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
