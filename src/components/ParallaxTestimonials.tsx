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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16 mt-28"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-3 mb-6">
            <BlurText
              text="What Our Clients Say"
              className="justify-center section-title-compact text-purple-400 lg:mb-0"
              delay={150}
              once={false}
            />
            <span className="hidden lg:inline text-purple-400/50 section-title-compact">—</span>
            <p className="subtitle mt-2 lg:mt-0">Don&apos;t just take our word for it.</p>
          </div>
          <p className="subtitle-sm">
            Here&apos;s what our clients have to say about working with us.
          </p>
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
      className="bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-xl border border-white/10 flex flex-col h-full min-h-[420px] relative group shadow-lg overflow-hidden"
      onMouseEnter={isMobile ? undefined : onHover}
      onMouseLeave={isMobile ? undefined : onLeave}
      animate={isMobile ? {} : getPositionStyles()}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      {/* Quote icon - reduced opacity */}
      <Quote className="w-10 h-10 text-purple-400/40 absolute top-6 right-6" />

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
          <button onClick={onExpand} className="link-primary mt-4">
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center mt-auto relative z-10">
        <div className="w-12 h-12 rounded-full mr-4 shadow-md flex items-center justify-center relative">
          {/* Gradient background based on index */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                index % 3 === 0
                  ? 'linear-gradient(135deg, #a855f7, #c084fc)'
                  : index % 3 === 1
                    ? 'linear-gradient(135deg, #9333ea, #a855f7)'
                    : 'linear-gradient(135deg, #7e22ce, #9333ea)',
            }}
          />
          {/* Initial letter */}
          <span className="text-black font-bold text-lg relative z-10">
            {testimonial.author.charAt(0)}
          </span>
          {/* Subtle glow effect */}
          <div
            className="absolute inset-0 rounded-full opacity-30 blur-sm"
            style={{
              background: index % 3 === 0 ? '#a855f7' : index % 3 === 1 ? '#9333ea' : '#7e22ce',
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="testimonial-author break-words">{testimonial.author}</h4>
          <p className="testimonial-role break-words">{testimonial.position}</p>
        </div>
      </div>

      {/* Card background gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl z-0"
        style={{
          background: `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`,
          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1)`,
        }}
        animate={
          isHovered
            ? {
                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%)`,
              }
            : {}
        }
      />

      {/* Accent color */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl"
        style={{
          background: index % 3 === 0 ? '#a855f7' : index % 3 === 1 ? '#9333ea' : '#7e22ce',
        }}
        animate={isHovered ? { height: '2px' } : { height: '1px' }}
      />

      {/* Glow effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-xl z-0"
            style={{
              boxShadow: `0 0 20px ${
                index % 3 === 0
                  ? 'rgba(168, 85, 247, 0.3)'
                  : index % 3 === 1
                    ? 'rgba(147, 51, 234, 0.3)'
                    : 'rgba(126, 34, 206, 0.3)'
              }`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
