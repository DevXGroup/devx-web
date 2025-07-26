"use client"
import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import Image from "next/image"

const originalCaseStudies = [
  {
    image: "/analytics-dashboard.png",
    title: "Enterprise Analytics Platform",
    description:
      "Developed a scalable analytics dashboard for a Fortune 500 company, improving data insights and decision-making by 30%.",
    tags: ["AI/ML", "React", "Python", "AWS"],
    results: "40% increase in data processing efficiency",
    link: "/portfolio/analytics-platform",
  },
  {
    image: "/fleet-management-tracking.png",
    title: "Real-time Fleet Management",
    description:
      "Built a real-time GPS tracking and management system for a logistics firm, reducing operational costs by 15% and improving delivery efficiency.",
    tags: ["IoT", "React Native", "Node.js", "MongoDB"],
    results: "60% reduction in operational costs",
    link: "/portfolio/fleet-management",
  },
  {
    image: "/modern-ecommerce-interface.png",
    title: "E-commerce Platform Revamp",
    description:
      "Redesigned and re-platformed an existing e-commerce site, leading to a 25% increase in conversion rates and a smoother user experience.",
    tags: ["E-commerce", "Next.js", "Stripe", "PostgreSQL"],
    results: "150% increase in conversion rates",
    link: "/portfolio/ecommerce-revamp",
  },
  {
    image: "/ai-chatbot.png",
    title: "AI-Powered Customer Support",
    description:
      "Implemented an AI chatbot solution for a SaaS company, automating 60% of customer inquiries and enhancing support team productivity.",
    tags: ["AI/ML", "NLP", "Python", "OpenAI"],
    results: "80% reduction in response time",
    link: "/portfolio/ai-chatbot",
  },
  {
    image: "/telemedicine-app.png",
    title: "Telemedicine Mobile App",
    description:
      "A secure telemedicine application enabling remote consultations, prescription management, and health monitoring with HIPAA compliance.",
    tags: ["Healthcare", "React Native", "WebRTC", "FHIR"],
    results: "300% increase in patient engagement",
    link: "/portfolio/telemedicine",
  },
  {
    image: "/images/portfolio/previews/chatfly-preview.webp",
    title: "ChatFly AI Platform",
    description:
      "Built a comprehensive AI-powered communication platform combining GPT and DALL-E technologies for chatbots, text processing, and creative content generation.",
    tags: ["AI/ML", "GPT", "DALL-E", "No-Code"],
    results: "60% reduction in customer support costs",
    link: "/portfolio/chatfly",
  },
  {
    image: "/images/portfolio/previews/joyful-preview.webp",
    title: "Joyful E-commerce Platform",
    description:
      "Developed a sophisticated e-commerce platform for a Qatari confectionery store with advanced product customization and same-day delivery features.",
    tags: ["E-commerce", "Mobile App", "Payment", "Delivery"],
    results: "85% increase in order customization rates",
    link: "/portfolio/joyful",
  },
  {
    image: "/images/portfolio/previews/lawazm-preview.webp",
    title: "Lawazm Marketplace",
    description:
      "Created a comprehensive e-commerce platform for household products serving Kuwait and Middle East with 5000+ products and global brand sourcing.",
    tags: ["E-commerce", "Marketplace", "Multi-vendor", "Mobile"],
    results: "200% growth in regional market share",
    link: "/portfolio/lawazm",
  },
  {
    image: "/images/portfolio/previews/joyjoy-preview.webp",
    title: "JoyJoy Wellness App",
    description:
      "Designed a comprehensive wellness platform focused on daily motivation, affirmations, and positive mindset building with AI companion features.",
    tags: ["Wellness", "AI Companion", "Mobile App", "Psychology"],
    results: "90% user retention after 30 days",
    link: "/portfolio/joyjoy",
  },
  {
    image: "/images/portfolio/previews/letspass-preview.webp",
    title: "LetsPass Education Platform",
    description:
      "Built a complete online education platform with course management, interactive learning modules, and certification systems for digital learning.",
    tags: ["EdTech", "E-learning", "Course Management", "Certification"],
    results: "75% improvement in learning outcomes",
    link: "/portfolio/letspass",
  },
  {
    image: "/images/portfolio/previews/lazurd-preview.webp",
    title: "Lazurd Luxury Platform",
    description:
      "Developed a luxury brand platform for home-cooked meals and chocolates, achieving top chart position in Kuwait with sophisticated UI design.",
    tags: ["Luxury", "Food Delivery", "Premium UI", "Kuwait"],
    results: "300% increase in premium orders",
    link: "/portfolio/lazurd",
  },
  {
    image: "/images/portfolio/previews/zahra-farm-preview.webp",
    title: "Zahra Farm AgriTech",
    description:
      "Created an innovative agricultural platform combining organic product sales, plot rentals, greenhouse tours, and agricultural tourism services.",
    tags: ["AgriTech", "Organic", "E-commerce", "Tourism"],
    results: "50% boost in sustainable farming adoption",
    link: "/portfolio/zahrafarm",
  },
]

// Duplicate content for seamless looping
const caseStudies = [...originalCaseStudies, ...originalCaseStudies]

export default function HorizontalScroll() {
  const containerRef = useRef(null)
  const scrollContentRef = useRef(null)
  const x = useMotionValue(0)
  const [singleSetWidth, setSingleSetWidth] = useState(0)
  const animationRef = useRef<any>(null)

  useEffect(() => {
    const calculateWidth = () => {
      const cardWidth = window.innerWidth >= 768 ? 320 : 280
      const gap = 32
      const calculatedWidth = originalCaseStudies.length * cardWidth + (originalCaseStudies.length - 1) * gap
      setSingleSetWidth(calculatedWidth)
    }

    calculateWidth()
    window.addEventListener("resize", calculateWidth)
    return () => window.removeEventListener("resize", calculateWidth)
  }, [])

  const startAutoScroll = useCallback(() => {
    if (singleSetWidth === 0) return

    if (animationRef.current) {
      animationRef.current.stop()
    }

    animationRef.current = animate(x, x.get() - singleSetWidth, {
      duration: singleSetWidth / 40,
      ease: "linear",
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      onRepeat: () => {
        x.set(0)
      },
    })
  }, [singleSetWidth, x])

  useEffect(() => {
    if (singleSetWidth > 0) {
      startAutoScroll()
    }
    return () => {
      if (animationRef.current) {
        animationRef.current.stop()
      }
    }
  }, [singleSetWidth, startAutoScroll])

  const handleDragStart = () => {
    if (animationRef.current) {
      animationRef.current.stop()
    }
  }

  const handleDragEnd = () => {
    const currentX = x.get()
    const remainder = currentX % singleSetWidth
    const snappedX = remainder > 0 ? remainder - singleSetWidth : remainder
    x.set(snappedX)

    startAutoScroll()
  }

  return (
    <section className="py-20 relative w-full overflow-hidden">
      <div className="w-full">
        <div ref={containerRef} className="relative w-full overflow-x-hidden">
          <motion.div
            style={{ x }}
            ref={scrollContentRef}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            drag="x"
            dragElastic={0.4}
            dragTransition={{
              bounceStiffness: 1000,
              bounceDamping: 50,
              power: 0.8,
              timeConstant: 200,
              min: 0,
              max: 2000,
            }}
            className="flex flex-nowrap gap-8 py-8 cursor-grab active:cursor-grabbing"
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[320px] h-[500px] bg-black/40 backdrop-blur-md rounded-xl border border-white/20 hover:border-[#4CD787]/40 flex flex-col transition-all duration-300 hover:shadow-[0_8px_32px_rgba(76,215,135,0.15)]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (index % originalCaseStudies.length) * 0.05 }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="p-4 h-full flex flex-col">
                  <Image
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    width={320}
                    height={140}
                    className="rounded-lg mb-3 object-cover w-full h-[140px] border border-white/10"
                  />
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight font-mono">{study.title}</h3>
                  <p className="text-white/80 text-sm mb-3 leading-relaxed font-sans line-clamp-3">{study.description}</p>

                  {/* Tech Stack Bubbles */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#4CD787]/20 text-[#4CD787] border border-[#4CD787]/40 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results - at bottom */}
                  <div className="mt-auto pt-2 border-t border-white/10">
                    <div className="text-sm text-white/90">
                      <span className="font-semibold text-[#4CD787]">Results:</span> 
                      <span className="font-medium ml-1">{study.results}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
