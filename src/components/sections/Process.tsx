'use client'

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code2, Rocket, Users, Zap, Pencil, Settings } from 'lucide-react'
import Image from 'next/image'
import SDLCProcess from './SDLCProcess'
import { AnimatedGradientText } from '@animations/AnimatedGradientText'
import BlurText from '@animations/BlurText'
import GridAnimation from '@animations/GridAnimation'

const processes = [
  {
    icon: Users,
    title: 'Discovery',
    description:
      "Share your vision. We'll understand your goals and map the perfect solution path.",
    shapeVariation: 0,
    color: '#4CD787',
    useFullCard: true,
  },
  {
    icon: Pencil,
    title: 'Design',
    description: 'Get beautiful, user-friendly designs that perfectly match your brand and goals.',
    shapeVariation: 0,
    color: '#9d4edd',
    useFullCard: true,
  },
  {
    icon: Code2,
    title: 'Build',
    description: 'Watch your idea come to life with clean, fast, and scalable code.',
    shapeVariation: 0,
    color: '#8B5CF6',
    useFullCard: true,
  },
  {
    icon: Zap,
    title: 'Test',
    description: 'Relax while we ensure everything works flawlessly across all devices.',
    shapeVariation: 0,
    color: '#FFD700',
    useFullCard: true,
  },
  {
    icon: Rocket,
    title: 'Launch',
    description: 'Go live with confidence. We handle the technical details so you can celebrate.',
    shapeVariation: 0,
    color: '#ff6b6b',
    useFullCard: true,
  },
  {
    icon: Settings,
    title: 'Grow',
    description: 'Keep thriving with ongoing updates, monitoring, and new features as you scale.',
    shapeVariation: 0,
    color: '#4CD787',
    useFullCard: true,
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Always call useScroll to maintain hooks order
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInViewport, setIsInViewport] = useState(false)

  // IntersectionObserver to only track scroll when section is visible
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting)
        })
      },
      {
        threshold: 0,
        rootMargin: '100px 0px',
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    // Only add scroll listener when section is in viewport
    if (!isInViewport) return

    let rafId: number | null = null
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = window.scrollY
        const containerTop = containerRef.current.offsetTop
        const containerHeight = containerRef.current.offsetHeight
        const windowHeight = window.innerHeight

        const scrollPercentage =
          (scrollPosition - containerTop + windowHeight) / (containerHeight + windowHeight)
        setScrollProgress(Math.min(Math.max(scrollPercentage, 0), 1))
      }
    }

    const handleScrollOptimized = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      rafId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', handleScrollOptimized, { passive: true })
    handleScroll() // Initial call to set the initial state

    return () => {
      window.removeEventListener('scroll', handleScrollOptimized)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [isInViewport])

  return (
    <section className="relative py-20 w-full overflow-hidden" ref={containerRef}>
      {/* Speed lines background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/speed-lines.webp"
          alt=""
          fill
          className="object-cover"
          loading="lazy"
          quality={75}
        />
        {/* Dark overlay for text readability - increased opacity */}
        <div className="absolute inset-0 bg-black/85" />
      </div>

      {/* Top fade-in gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-40 bg-gradient-to-b from-black to-transparent z-[1] pointer-events-none" />

      <motion.div
        style={{
          opacity,
          y,
          willChange: 'opacity, transform',
        }}
        className="relative container mx-auto px-4 sm:px-6"
      >
        <div className="relative flex items-center justify-center text-center mb-12 sm:mb-16 py-8 sm:py-12">
          <div className="relative z-10">
            <div className="flex flex-col items-center">
              <BlurText
                text="How It Works"
                className="justify-center text-white mb-6 section-title-hero font-editorial"
                delay={150}
                once={false}
              />
              <p className="section-subtitle max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto px-4 text-zinc-400 font-light leading-relaxed">
                Simple steps to bring your software vision to life from idea to launch in record
                time.
              </p>
            </div>
          </div>
        </div>

        {/* Add SDLCProcess component above the cards */}
        <div className="mb-24">
          <SDLCProcess />
        </div>

        {/* Process cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 sm:mb-24 px-4 sm:px-0 max-w-5xl mx-auto">
          {processes.map((process, index) => (
            <motion.div
              key={process.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0, margin: '50px' }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                y: -5,
              }}
              className="relative group cursor-pointer h-full"
              role="article"
              aria-label={`${process.title}: ${process.description}`}
              style={{
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
              }}
            >
              <div className="relative h-full bg-[#0A0A0B]/80 backdrop-blur-md border border-white/[0.08] p-6 sm:p-8 rounded-3xl group-hover:bg-[#0A0A0B] group-hover:border-white/[0.15] transition-all duration-300 flex flex-col gap-5 overflow-hidden">
                {/* Subtle top gradient on hover */}
                <div
                  className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, ${process.color}15, transparent)`,
                  }}
                />

                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.08] transition-all duration-300 group-hover:scale-105"
                    style={{
                      borderColor: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <process.icon
                      className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300"
                      style={{ color: '#a1a1aa' /* zinc-400 */ }}
                    />
                    {/* Hover icon (colored) - absolute to fade in */}
                    <process.icon
                      className="w-6 h-6 sm:w-7 sm:h-7 absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{ color: process.color }}
                    />
                  </div>

                  {/* Step number watermark */}
                  <span className="text-4xl font-bold text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-300 font-sans">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2 group-hover:text-white transition-colors duration-300">
                    {process.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                    {process.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
