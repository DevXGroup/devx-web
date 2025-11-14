'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import Image from 'next/image'

const originalCaseStudies = [
  {
    image: '/images/services/analytics-dashboard.png',
    title: 'Enterprise Analytics Platform',
    description:
      'Developed a scalable analytics dashboard for a Fortune 500 company, improving data insights and decision-making by 30%.',
    tags: ['AI/ML', 'React', 'Python', 'AWS'],
    results: '40% increase in data processing efficiency',
    link: '/portfolio/analytics-platform',
  },
  {
    image: '/images/services/fleet-management-tracking.png',
    title: 'Real-time Fleet Management',
    description:
      'Built a real-time GPS tracking and management system for a logistics firm, reducing operational costs by 15% and improving delivery efficiency.',
    tags: ['IoT', 'React Native', 'Node.js', 'MongoDB'],
    results: '60% reduction in operational costs',
    link: '/portfolio/fleet-management',
  },
  {
    image: '/images/services/modern-ecommerce-interface.png',
    title: 'E-commerce Platform Revamp',
    description:
      'Redesigned and re-platformed an existing e-commerce site, leading to a 25% increase in conversion rates and a smoother user experience.',
    tags: ['E-commerce', 'Next.js', 'Stripe', 'PostgreSQL'],
    results: '150% increase in conversion rates',
    link: '/portfolio/ecommerce-revamp',
  },
  {
    image: '/images/services/ai-chatbot.png',
    title: 'AI-Powered Customer Support',
    description:
      'Implemented an AI chatbot solution for a SaaS company, automating 60% of customer inquiries and enhancing support team productivity.',
    tags: ['AI/ML', 'NLP', 'Python', 'OpenAI'],
    results: '80% reduction in response time',
    link: '/portfolio/ai-chatbot',
  },
  {
    image: '/images/services/telemedicine-app.png',
    title: 'Telemedicine Mobile App',
    description:
      'A secure telemedicine application enabling remote consultations, prescription management, and health monitoring with HIPAA compliance.',
    tags: ['Healthcare', 'React Native', 'WebRTC', 'FHIR'],
    results: '300% increase in patient engagement',
    link: '/portfolio/telemedicine',
  },
  {
    image: '/images/portfolio/previews/chatfly-preview.webp',
    title: 'ChatFly AI Platform',
    description:
      'Built a comprehensive AI-powered communication platform combining GPT and DALL-E technologies for chatbots, text processing, and creative content generation.',
    tags: ['AI/ML', 'GPT', 'DALL-E', 'No-Code'],
    results:
      'Reduced customer service costs by 60% for enterprise clients while improving response time by 75%',
    link: '/portfolio/chatfly',
  },
  {
    image: '/images/portfolio/previews/joyful-preview.webp',
    title: 'Joyful - Smart Confectionery Platform',
    description:
      'AI-powered e-commerce platform for custom cakes and confectionery with advanced product customization features and same-day delivery across Qatar.',
    tags: ['E-commerce', 'AI', 'AR/VR', 'Customization'],
    results:
      'Transformed traditional bakery into digital-first business, increasing revenue by 200% in first year',
    link: '/portfolio/joyful',
  },
  {
    image: '/images/portfolio/previews/lawazm-preview.webp',
    title: 'Lawazm - Enterprise E-commerce Platform',
    description:
      'Large-scale e-commerce platform with 5,000+ products, serving Kuwait and Middle East markets with 25+ years of trading experience digitized.',
    tags: ['E-commerce', 'Enterprise', 'Multi-vendor', 'Logistics'],
    results:
      'Increased client revenue by 300% and expanded market reach across 6 Middle Eastern countries',
    link: '/portfolio/lawazm',
  },
  {
    image: '/images/portfolio/previews/joyjoy-preview.webp',
    title: 'JoyJoy - AI-Powered Wellness App',
    description:
      'Daily motivation app with AI companion, transforming mental wellness for thousands of users globally with personalized affirmations and progress tracking.',
    tags: ['Wellness', 'AI', 'Mobile App', 'Health'],
    results:
      'Helped users achieve 40% improvement in daily mood scores and 60% increase in positive habit formation',
    link: '/portfolio/joyjoy',
  },
  {
    image: '/images/portfolio/previews/letspass-preview.webp',
    title: 'LetsPass - Advanced EdTech Platform',
    description:
      'Comprehensive online education platform with AI-powered learning paths, interactive assessments, and digital certification systems.',
    tags: ['EdTech', 'AI', 'Learning Analytics', 'Certification'],
    results:
      'Improved learning outcomes by 45% and reduced training costs by 60% for corporate clients',
    link: '/portfolio/letspass',
  },
  {
    image: '/images/portfolio/previews/lazurd-preview.webp',
    title: 'Lazurd - Luxury Brand Digital Experience',
    description:
      'Premium luxury platform for home-cooked meals and chocolates, achieving top charts in Kuwait through exceptional design and user experience.',
    tags: ['Luxury', 'Premium UI', 'Brand Experience', 'Kuwait'],
    results:
      'Established luxury digital presence, increased brand value by 400% and premium sales by 250%',
    link: '/portfolio/lazurd',
  },
  {
    image: '/images/portfolio/previews/zahra-farm-preview.webp',
    title: 'Zahra Farm - AgriTech Innovation Platform',
    description:
      'Revolutionary agricultural platform combining IoT sensors, organic farming, and eco-tourism experiences with smart irrigation and crop monitoring.',
    tags: ['AgriTech', 'IoT', 'Smart Farming', 'Sustainability'],
    results:
      'Transformed traditional farming into smart agriculture, reducing water usage by 35% while increasing yields',
    link: '/portfolio/zahrafarm',
  },
  {
    image: '/images/portfolio/previews/i-love-food-ilf-preview.webp',
    title: 'I Love Food - AI Nutrition Platform',
    description:
      'Intelligent health and fitness app with AI meal planning, computer vision food recognition, and personalized nutrition recommendations.',
    tags: ['Health', 'AI', 'Computer Vision', 'Nutrition'],
    results:
      'Helped users achieve 65% better nutrition adherence and 50% more effective weight management',
    link: '/portfolio/i-love-food',
  },
]

// Duplicate content for seamless looping
const caseStudies = [...originalCaseStudies, ...originalCaseStudies]

export default function HorizontalScroll() {
  const containerRef = useRef(null)
  const scrollContentRef = useRef(null)
  const x = useMotionValue(0)
  const [singleSetWidth, setSingleSetWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const animationRef = useRef<number | null>(null)

  const normalizeX = (value: number) => {
    let v = value
    while (v <= -singleSetWidth) v += singleSetWidth
    while (v > 0) v -= singleSetWidth
    return v
  }

  useEffect(() => {
    const calculateWidth = () => {
      const cardWidth = window.innerWidth >= 768 ? 320 : 280
      const gap = 32
      const calculatedWidth =
        originalCaseStudies.length * cardWidth + (originalCaseStudies.length - 1) * gap
      setSingleSetWidth(calculatedWidth)
    }

    calculateWidth()
    window.addEventListener('resize', calculateWidth)
    return () => window.removeEventListener('resize', calculateWidth)
  }, [])

  const startAutoScroll = useCallback(() => {
    if (singleSetWidth === 0) return

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const scrollSpeed = 2 // pixels per frame (increased for visibility)

    const animateScroll = () => {
      const currentX = x.get()
      const newX = currentX - scrollSpeed

      // Wrap seamlessly instead of snapping back to 0
      if (newX <= -singleSetWidth) {
        x.set(newX + singleSetWidth)
      } else {
        x.set(newX)
      }

      animationRef.current = requestAnimationFrame(animateScroll)
    }

    animationRef.current = requestAnimationFrame(animateScroll)
  }, [singleSetWidth, x])

  useEffect(() => {
    if (singleSetWidth > 0) {
      startAutoScroll()
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [singleSetWidth, startAutoScroll])

  const handleDragStart = () => {
    setIsDragging(true)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    const currentX = x.get()

    let normalizedX = normalizeX(currentX)
    x.set(normalizedX)
    startAutoScroll()
  }

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const absX = Math.abs(e.deltaX)
    const absY = Math.abs(e.deltaY)

    // Let vertical scroll bubble to page
    if (absY >= absX) return

    e.preventDefault()
    const dx = absX > 0 ? e.deltaX : e.shiftKey ? e.deltaY : 0
    if (containerRef.current) {
      ;(containerRef.current as HTMLDivElement).scrollBy({ left: dx, behavior: 'auto' })
    }
  }, [])

  return (
    <section className="py-20 relative w-full overflow-hidden">
      <div className="w-full">
        <div
          ref={containerRef}
          onWheel={handleWheel}
          className="relative w-full overflow-x-hidden overscroll-x-contain scroll-smooth"
          style={{ touchAction: 'pan-y', position: 'relative' }}
          role="region"
          aria-label="Case studies carousel"
        >
          <motion.div
            ref={scrollContentRef}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            drag="x"
            dragMomentum={true}
            whileTap={{ cursor: 'grabbing' }}
            dragConstraints={singleSetWidth > 0 ? { left: -singleSetWidth, right: 0 } : false}
            dragElastic={0.4}
            dragTransition={{
              bounceStiffness: 1000,
              bounceDamping: 50,
              power: 0.8,
              timeConstant: 200,
              min: 0,
              max: 2000,
            }}
            className="relative flex flex-nowrap gap-8 py-8 cursor-grab active:cursor-grabbing"
            style={{
              x,
              willChange: 'transform',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              touchAction: isDragging ? 'pan-x' : 'auto',
              WebkitTouchCallout: 'none',
              pointerEvents: 'auto',
              zIndex: 10,
            }}
          >
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[320px] h-[500px] bg-black/40 backdrop-blur-md rounded-xl border border-white/20 hover:border-[#4CD787]/40 flex flex-col transition-all duration-300 hover:shadow-[0_8px_32px_rgba(76,215,135,0.15)] cursor-grab active:cursor-grabbing select-none"
                style={{
                  pointerEvents: 'auto',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  touchAction: 'manipulation',
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.03 }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="relative w-full h-[140px] rounded-lg mb-3 overflow-hidden border border-white/10 bg-gray-900/50">
                    <Image
                      src={study.image || '/placeholder.svg'}
                      alt={study.title}
                      fill
                      className="object-cover object-center pointer-events-none select-none"
                      sizes="(max-width: 768px) 280px, 320px"
                      quality={90}
                      priority={index < 6}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        imageRendering: 'crisp-edges',
                      }}
                      draggable={false}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight font-mono">
                    {study.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base mb-3 leading-relaxed font-sans min-h-[96px]">
                    {study.description}
                  </p>

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
