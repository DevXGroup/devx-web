"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Code2, Rocket, Database, Cloud, Brain, Cog, Smartphone, Globe, Cpu, X } from "lucide-react"
import Link from "next/link"
import React, { useState, useMemo, useEffect } from "react"
import ScrollVelocity from "@/components/ScrollVelocity"

// Define services array here, as it's specific to this banner
const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "We create tailored software solutions that perfectly align with your business needs. From web applications to enterprise systems, we deliver scalable and efficient solutions.",
    features: [
      "Full-stack Development",
      "API Development & Integration",
      "Legacy System Modernization",
      "Custom CRM & ERP Solutions",
    ],
    color: "#4CD787",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Harness the power of artificial intelligence to transform your business. We develop intelligent solutions that automate processes and provide valuable insights.",
    features: [
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision Solutions",
      "Machine Learning Models",
    ],
    color: "#9d4edd",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Leverage cloud technology to scale your business efficiently. We provide comprehensive cloud services to optimize your operations and reduce costs.",
    features: [
      "Cloud Migration",
      "Cloud-Native Development",
      "Serverless Architecture",
      "Cloud Infrastructure Management",
    ],
    color: "#4834D4",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Create engaging mobile experiences for your users. We develop native and cross-platform mobile applications that deliver exceptional performance.",
    features: ["iOS Development", "Android Development", "Cross-platform Solutions", "Mobile App Strategy"],
    color: "#CFB53B",
  },
  {
    icon: Database,
    title: "Database Solutions",
    description:
      "Design and implement robust database solutions that ensure data integrity and optimal performance. We help you manage and analyze your data effectively.",
    features: ["Database Design", "Data Migration", "Performance Optimization", "Data Security Implementation"],
    color: "#ff6b6b",
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Build powerful web applications that drive your business forward. We create responsive, user-friendly websites that engage your audience.",
    features: ["Frontend Development", "Backend Development", "E-commerce Solutions", "Progressive Web Apps"],
    color: "#4CD787",
  },
  {
    icon: Cog,
    title: "DevOps Services",
    description:
      "Streamline your development and operations with our DevOps expertise. We implement efficient workflows and automation to enhance your delivery pipeline.",
    features: ["CI/CD Implementation", "Infrastructure as Code", "Container Orchestration", "Monitoring & Logging"],
    color: "#4834D4",
  },
  {
    icon: Rocket,
    title: "Digital Transformation",
    description:
      "Transform your business with modern digital solutions. We help you embrace new technologies and optimize your digital presence.",
    features: ["Digital Strategy Consulting", "Process Automation", "Technology Migration", "Digital Innovation"],
    color: "#CFB53B",
  },
  {
    icon: Cpu,
    title: "Hardware IoT Design",
    description:
      "Bridge the physical and digital worlds with our IoT hardware design expertise. We create custom connected devices and systems that collect, analyze, and act on real-world data.",
    features: [
      "Custom IoT Device Development",
      "Sensor Integration & Networking",
      "Embedded Systems Design",
      "Edge Computing Solutions",
    ],
    color: "#9d4edd",
  },
]

// Service Modal Component (moved here)
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
              {/* Add a blob-like background that animates */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-xl overflow-hidden"
                initial={{ borderRadius: "100%" }}
                animate={{
                  borderRadius: [
                    "100%",
                    "60% 40% 70% 30% / 40% 50% 60% 50%",
                    "35% 65% 65% 35% / 50% 50% 50% 50%",
                    "35% 65% 35% 65% / 50% 50% 50% 50%",
                    "12px",
                  ],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center, ${service.color}30 0%, transparent 70%)`,
                  }}
                />
              </motion.div>

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
                  {service.title}
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

// Shiny Apple Component with enhanced hover effects and title display (moved here)
const ShinyApple = ({ service, onClick }) => {
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        onClick(service, e)
      }}
      className="relative group service-icon-container"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: service.color }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute w-24 h-24 bg-white/40 blur-md"
          animate={{
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

        <service.icon className="w-8 h-8 text-black relative z-10" />

        {/* Enhanced reflection with gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
          style={{
            background: `linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)`,
          }}
        />
      </motion.div>

      {/* Title below icon - always visible now */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap opacity-100 transition-opacity">
        {service.title.split(" ")[0]}
      </div>
    </motion.button>
  )
}

export default function ServicesBanner() {
  const [selectedService, setSelectedService] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 })

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

  // Add CSS for auto-scrolling to the document (moved here)
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes scrollX {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100%); }
      }
      
      @keyframes scrollXReverse {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0); }
      }
      
      .auto-scroll-x {
        animation: scrollX 25s linear infinite;
      }
      
      .auto-scroll-x-reverse {
        animation: scrollXReverse 40s linear infinite;
      }
      
      .is-scrolling .auto-scroll-x,
      .is-scrolling .auto-scroll-x-reverse {
        animation-play-state: paused;
      }

      .service-icon-container:hover .service-icon-title {
        opacity: 1;
        transform: translateY(0);
      }

      .service-icon-title {
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%) translateY(10px);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        font-size: 0.7rem;
        white-space: nowrap;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Prepare service elements for ScrollVelocity with tight spacing
  const firstRowElements = useMemo(
    () => (
      <div className="inline-flex items-center gap-0 whitespace-nowrap">
        {services.map((service, index) => (
          <React.Fragment key={service.title}>
            <div
              className="w-1.5 h-1.5 rounded-full mx-2 opacity-60 flex-shrink-0"
              style={{ backgroundColor: service.color }}
            />
            <motion.span
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold transition-all duration-500 pointer-events-none select-none"
              style={{
                color: service.color,
                textShadow: `0 0 20px ${service.color}40, 0 2px 4px rgba(0,0,0,0.8)`,
                letterSpacing: "0.02em",
              }}
            >
              {service.title.replace(/&/g, "+")}
            </motion.span>
          </React.Fragment>
        ))}
      </div>
    ),
    [],
  )

  const secondRowElements = useMemo(
    () => (
      <div className="inline-flex items-center gap-0 whitespace-nowrap">
        {services
          .slice()
          .reverse()
          .map((service, index) => (
            <React.Fragment key={service.title}>
              <div
                className="w-1.5 h-1.5 rounded-full mx-2 opacity-60 flex-shrink-0"
                style={{ backgroundColor: service.color }}
              />
              <motion.span
                className="text-3xl md:text-5xl lg:text-6xl font-normal transition-all duration-500 pointer-events-none select-none" // Thinner font
                style={{
                  color: service.color,
                  textShadow: `0 0 20px ${service.color}40, 0 2px 4px rgba(0,0,0,0.8)`,
                  letterSpacing: "0.02em",
                }}
              >
                {service.title.replace(/&/g, "+")}
              </motion.span>
            </React.Fragment>
          ))}
      </div>
    ),
    [],
  )

  return (
    <section className="py-12 relative bg-black/40">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-purple-900/5 to-black/80" />
      {/* Light beams */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, rotate: -30, x: "-30%", y: "100%" }}
          animate={{
            opacity: [0, 0.1, 0],
            y: ["100%", "-100%"],
          }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
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
            delay: 3,
          }}
          className="absolute right-1/3 w-[35px] h-[700px] bg-gradient-to-t from-[#9d4edd]/0 via-[#9d4edd]/18 to-[#9d4edd]/0"
          style={{ transform: "rotate(30deg)" }}
        />
      </div>
      <div className="relative">
        <h2 className="sr-only">Explore Our Services</h2>

        {/* ScrollVelocity component for both rows with tight spacing */}
        <ScrollVelocity
          texts={[firstRowElements, secondRowElements]}
          velocity={110}
          damping={50}
          stiffness={400}
          numCopies={9}
          velocityMapping={{ input: [0, 1000], output: [0, 5] }} // Matches your reference
          parallaxClassName="py-1" // Reduced vertical spacing
          scrollerClassName="items-center"
        />

        {/* Shiny Apples service menu */}
        <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-10">
          {services.map((service) => (
            <ShinyApple key={service.title} service={service} onClick={(e) => handleServiceClick(service, e)} />
          ))}
        </div>

        {/* Service Modal */}
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          clickPosition={clickPosition}
        />
      </div>
    </section>
  )
}
