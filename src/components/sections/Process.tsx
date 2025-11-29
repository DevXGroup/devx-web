'use client'

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code2, Rocket, Users, Zap, Pencil, Settings } from 'lucide-react'
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
      {/* Lightweight CSS background instead of heavy image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0b0b12] to-[#050505]" />
        <div className="absolute inset-0 opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_20%_30%,rgba(204,255,0,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(147,197,253,0.12),transparent_38%),radial-gradient(circle_at_50%_80%,rgba(139,92,246,0.1),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(60deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:180px_180px]" />
        <div className="absolute inset-0 bg-black/82" />
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
                className="justify-center text-white mb-4 sm:mb-6 section-title-hero"
                delay={150}
                once={false}
              />
              <p className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto px-4 section-subtitle">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 sm:mb-24 px-4 sm:px-0">
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
                y: -10,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
              className="relative group rounded-xl p-[2px] cursor-pointer"
              role="article"
              aria-label={`${process.title}: ${process.description}`}
              style={{
                willChange: 'opacity, transform',
                transform: 'translateZ(0)',
              }}
            >
              <div
                className="absolute inset-0 rounded-xl transition-opacity duration-700"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                }}
              />

              <div
                className="absolute inset-0 rounded-xl opacity-40 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(135deg, ${process.color}, ${process.color}99, ${process.color}66, transparent)`,
                }}
              />
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(135deg, ${process.color}, ${process.color}99, ${process.color}66, transparent)`,
                }}
              />

              <div className="relative bg-slate-900/70 p-6 sm:p-8 md:p-10 rounded-[10px] shadow-xl shadow-black/40 flex flex-col gap-5 h-full">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: `${process.color}1a`,
                      borderColor: `${process.color}4d`,
                      boxShadow: `0 0 18px ${process.color}33`,
                      transition: `transform 0.5s ease, box-shadow 0.3s ease`,
                    }}
                  >
                    <process.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="heading-component text-white">{process.title}</h3>
                </div>
                <p className="subtitle-sm">{process.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
