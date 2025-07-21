"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Quote } from "lucide-react"
import EnhancedInfinityLoader from "./EnhancedInfinityLoader"

const testimonials = [
  {
    quote:
      "DevX Group transformed our business with their innovative software solutions. Their team's expertise and dedication exceeded our expectations.",
    author: "Sarah Johnson",
    position: "CTO, TechVision Inc.",
    image: "/professional-woman-headshot.png",
    logo: "/abstract-tech-logo.png",
  },
  {
    quote:
      "Working with DevX Group has been a game-changer for our company. Their AI solutions have increased our efficiency by 40% and reduced costs significantly.",
    author: "Michael Chen",
    position: "CEO, Innovate Solutions",
    image: "/professional-man-headshot.png",
    logo: "/innovative-company-logo.png",
  },
  {
    quote:
      "The mobile app DevX Group built for us has received outstanding feedback from our users. Their attention to detail and user experience expertise is unmatched.",
    author: "Emily Rodriguez",
    position: "Product Manager, MobileFirst",
    image: "/professional-latina-woman-headshot.png",
    logo: "/generic-mobile-logo.png",
  },
]

export default function ParallaxTestimonials() {
  const containerRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-black via-purple-900/10 to-black">
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
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#CFB53B]/10 blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Infinity Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center mb-16 -mt-24"
        >
          <EnhancedInfinityLoader scrollThreshold={0.25} baseScale={0.5} maxScale={4.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#CFB53B]">What Our Clients Say</h2>
          <p className="text-lg text-foreground/80 font-light">
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about working with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pb-16" ref={containerRef}>
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
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index, containerRef, isHovered, onHover, onLeave, allHovered, isMobile }) {
  const cardRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Create parallax effect based on index - disabled on mobile
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : (index % 2 === 0 ? -50 : 50)])

  // Calculate the position adjustments for non-hovered cards - mobile optimized
  const getPositionStyles = () => {
    if (!allHovered || isMobile) return {} // Disable all hover effects on mobile

    if (isHovered) {
      return {
        zIndex: 20,
        scale: 1.05,
        y: -15,
        boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
      }
    } else {
      const xShift = index < 1 ? -5 : index > 1 ? 5 : 0
      return {
        scale: 0.98,
        opacity: 0.8,
        x: xShift,
        y: 5,
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
      className="bg-black/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 flex flex-col h-full min-h-[320px] md:min-h-[360px] relative group shadow-lg mb-6 md:mb-0"
      onMouseEnter={isMobile ? undefined : onHover}
      onMouseLeave={isMobile ? undefined : onLeave}
      animate={getPositionStyles()}
      transition={{
        // Combined transition for all animations
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.5,
        // Specific transitions for properties that might change
        x: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
        y: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
        scale: { type: "spring", stiffness: 200, damping: 20, mass: 0.5 },
        opacity: { duration: 0.2, ease: "easeOut" },
        boxShadow: { duration: 0.2, ease: "easeOut" },
      }}
    >
      {/* Quote icon - reduced opacity */}
      <Quote className="w-10 h-10 text-[#4CD787]/20 absolute top-6 right-6" />

      {/* Company logo */}
      <div className="mb-6 h-8 relative z-10">
        <Image
          src={testimonial.logo || "/placeholder.svg"}
          alt="Company logo"
          width={120}
          height={40}
          className="object-contain h-full"
        />
      </div>

      {/* Quote */}
      <p className="text-white/90 italic mb-8 flex-grow relative z-10 text-base leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center mt-auto relative z-10">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-[#4CD787]/50 shadow-md">
          {" "}
          {/* Softened border */}
          <Image
            src={testimonial.image || "/placeholder.svg"}
            alt={testimonial.author}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-white">{testimonial.author}</h4>
          <p className="text-sm text-white/60">{testimonial.position}</p>
        </div>
      </div>

      {/* Card background gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl z-0"
        style={{
          background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)`,
          boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1)`,
        }}
        animate={
          isHovered
            ? {
                background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 100%)`,
              }
            : {}
        }
      />

      {/* Accent color */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl"
        style={{
          background: index % 3 === 0 ? "#4CD787" : index % 3 === 1 ? "#CFB53B" : "#9d4edd",
        }}
        animate={isHovered ? { height: "2px" } : { height: "1px" }}
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
              boxShadow: `0 0 20px ${index % 3 === 0 ? "rgba(76, 215, 135, 0.3)" : index % 3 === 1 ? "rgba(207, 181, 59, 0.3)" : "rgba(157, 78, 221, 0.3)"}`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}


