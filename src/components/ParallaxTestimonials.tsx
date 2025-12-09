'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Quote } from 'lucide-react'
import EnhancedInfinityLoader from '@/components/3d/EnhancedInfinityLoader'
import BlurText from '@/components/animations/BlurText'

const testimonials = [
  {
    quote:
      'DevX Group has been assisting our company for the past three years in developing and implementing new and customized solutions utilizing cutting-edge technologies. Their dedication to precision and discipline ensures that great solutions are delivered with minimal redesign. We strongly recommend them to knowledgeable clients seeking a highly productive and solution-focused team.',
    author: 'Chamrosh Inc Founder/CEO',
    position: 'Founder/CEO, Chamrosh Inc',
    logo: '/images/testimonials/innovative-company-logo.png',
  },
  {
    quote:
      'Our partnership with DevX Group has driven our company to be a leader in online channels. We recommend them for any business looking to have an active online presence creatively.',
    author: 'Lazurd Inc CEO',
    position: 'CEO, Lazurd Inc',
    logo: '/images/testimonials/abstract-tech-logo.png',
  },
  {
    quote:
      "The DevX Group team showed high professionalism handling our project, starting with collecting all the required data to precisely understand our operations' needs, to providing a clear approach and an accurate timeline for the completion of the project, and very transparent payables (even explained the ones that might occur in the future). We had great communication with the team; they were very responsive, punctual, and on time, and they have always provided us with feedback and recommendations from a professional point of view. I'm very pleased and satisfied with our collaboration; I see it will last many years. I would HIGHLY RECOMMEND them for anyone seeking a professional partner!",
    author: 'Lawazm Inc CEO',
    position: 'CEO, Lawazm Inc',
    logo: '/images/testimonials/generic-mobile-logo.png',
  },
]

export default function ParallaxTestimonials() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const infinityRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Scroll progress tracking for infinity animation
  const { scrollYProgress: infinityScrollProgress } = useScroll(
    isClient && infinityRef.current
      ? {
          target: infinityRef,
          offset: ['start 0.8', 'end 0.2'],
        }
      : {}
  )

  // Apple-style scaling effect for infinity animation
  const infinityScale = useTransform(infinityScrollProgress || 0, [0, 0.5, 1], [1, 1.4, 2])
  const infinityOpacity = useTransform(infinityScrollProgress || 0, [0, 0.4, 1], [1, 0.8, 0.3])

  useEffect(() => {
    setIsClient(true)

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return (
    <section className="relative py-0 mt-[-103px] overflow-hidden bg-gradient-to-b from-black via-purple-900/10 to-black">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#4CD787]/10 blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#FFD700]/10 blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-28">
        {/* Infinity Animation */}
        <motion.div
          ref={infinityRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex justify-center sm:-mt-12 md:-mt-16 relative z-50"
          style={{
            scale: infinityScale,
            opacity: infinityOpacity,
          }}
        >
          <EnhancedInfinityLoader scrollThreshold={0.25} baseScale={0.3} maxScale={3} />
        </motion.div>

        <div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16 max-w-6xl mx-auto"
          ref={containerRef}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              containerRef={containerRef}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
              allHovered={hoveredIndex !== null}
              isMobile={isMobile}
              isClient={isClient}
              isExpanded={expandedIndex === index}
              onExpand={() => setExpandedIndex(expandedIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: any
  index: number
  containerRef: React.RefObject<HTMLElement | null>
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  allHovered: boolean
  isMobile: boolean
  isClient: boolean
  isExpanded: boolean
  onExpand: () => void
}

function TestimonialCard({
  testimonial,
  index,
  containerRef,
  isHovered,
  onHover,
  onLeave,
  allHovered,
  isMobile,
  isClient,
  isExpanded,
  onExpand,
}: TestimonialCardProps) {
  const cardRef = useRef(null)
  const TRUNCATE_LENGTH = 250
  const isTruncated = testimonial.quote.length > TRUNCATE_LENGTH

  // Always call useScroll to maintain hooks order
  const { scrollYProgress } = useScroll({
    target: containerRef as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  })

  // Disable parallax effect for better alignment
  const y = useTransform(scrollYProgress, [0, 1], [0, 0])

  // Calculate the position adjustments for non-hovered cards - simplified
  const getPositionStyles = () => {
    if (!allHovered || isMobile) return {} // Disable all hover effects on mobile

    if (isHovered) {
      return {
        zIndex: 20,
        scale: 1.02,
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
      }
    } else {
      return {
        scale: 0.98,
        opacity: 0.9,
      }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      className="bg-zinc-900/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col h-full min-h-[420px] relative group hover:border-white/20 hover:bg-zinc-900/60 transition-all duration-500 overflow-hidden"
      onMouseEnter={isMobile ? undefined : onHover}
      onMouseLeave={isMobile ? undefined : onLeave}
      animate={isMobile ? {} : getPositionStyles()}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {/* Quote icon - subtle white */}
      <Quote className="w-10 h-10 text-white/10 group-hover:text-white/20 transition-colors duration-500 absolute top-6 right-6" />

      {/* Quote */}
      <div className="flex-grow relative z-10 mb-8 pt-12">
        <p className="testimonial-quote break-words hyphens-auto overflow-wrap-break-word">
          &ldquo;
          {isExpanded || !isTruncated
            ? testimonial.quote
            : `${testimonial.quote.substring(0, TRUNCATE_LENGTH)}...`}
          &rdquo;
        </p>
        {isTruncated && (
          <button
            onClick={onExpand}
            className="text-white/60 hover:text-white mt-4 text-sm font-medium transition-colors"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center mt-auto relative z-10">
        <div className="w-12 h-12 rounded-full mr-4 bg-white/5 border border-white/10 flex items-center justify-center relative group-hover:bg-white group-hover:border-white transition-all duration-300">
          {/* Initial letter */}
          <span className="text-white text-lg font-medium group-hover:text-black transition-colors duration-300">
            {testimonial.author.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="testimonial-author break-words">{testimonial.author}</h4>
          <p className="testimonial-role break-words">{testimonial.position}</p>
        </div>
      </div>
    </motion.div>
  )
}
