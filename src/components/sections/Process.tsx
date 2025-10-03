'use client'

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { Code2, Rocket, Users, Zap, Pencil, Settings } from 'lucide-react'
import SDLCProcess from './SDLCProcess'
import { AnimatedGradientText } from '@animations/AnimatedGradientText'
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

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call to set the initial state

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="relative py-20 w-full overflow-hidden" ref={containerRef}>
      {/* Speed lines background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/speed-lines.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability - increased opacity */}
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <motion.div style={{ opacity, y }} className="relative container mx-auto px-4">
        <div className="relative flex items-center justify-center text-center mb-16 py-12">
          <div className="relative z-10">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center font-['IBM_Plex_Mono'] text-white">
                How It Works
              </h2>
              <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto font-['IBM_Plex_Mono'] font-light px-4">
                Simple steps to bring your software vision to life
                <br />
                from idea to launch in record time.
              </p>
            </div>
          </div>
        </div>

        {/* Add SDLCProcess component above the cards - hidden on mobile for better UX */}
        <div className="mb-24 hidden min-[650px]:block">
          <SDLCProcess />
        </div>

        {/* Process cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24 px-4 sm:px-0">
          {processes.map((process, index) => (
            <motion.div
              key={process.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                scale: 1.02,
                y: -8,
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-slate-800 p-8 sm:p-8 md:p-10 rounded-xl border border-purple-500/20 hover:border-purple-400/40 flex flex-col items-start text-left overflow-hidden cursor-pointer min-h-[180px] transition-all duration-300"
              role="article"
              aria-label={`${process.title}: ${process.description}`}
            >
              {/* Morphing background blob */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                initial={{
                  background: `radial-gradient(circle at 50% 50%, ${process.color}00 0%, transparent 100%)`,
                }}
                whileHover={{
                  background: [
                    `radial-gradient(circle at 20% 80%, ${process.color}15 0%, transparent 60%)`,
                    `radial-gradient(circle at 80% 20%, ${process.color}20 0%, transparent 50%)`,
                    `radial-gradient(circle at 30% 70%, ${process.color}15 0%, transparent 60%)`,
                    `radial-gradient(circle at 70% 30%, ${process.color}20 0%, transparent 50%)`,
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Scanning line effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={{ x: '-100%' }}
                whileHover={{
                  x: '100%',
                  transition: {
                    duration: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 1,
                  },
                }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${process.color}40, transparent)`,
                  width: '50%',
                  height: '100%',
                }}
              />

              {/* Matrix-style code rain */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                {Array.from({ length: 6 }).map((_, i) => {
                  const codeChars = ['01', '10', 'fx', 'js', 'ts', 'py'][i] || '01'
                  return (
                    <motion.div
                      key={i}
                      className="absolute font-mono text-xs"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: '0%',
                        color: process.color,
                        fontSize: '8px',
                      }}
                      initial={{ y: -20, opacity: 0 }}
                      whileHover={{
                        y: [0, 300],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      {codeChars}
                    </motion.div>
                  )
                })}
              </div>

              {/* Holographic edge effect */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                initial={{ scale: 1 }}
                whileHover={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  border: `1px solid ${process.color}60`,
                  boxShadow: `
                    0 0 20px ${process.color}30,
                    inset 0 0 20px ${process.color}10
                  `,
                }}
              />

              {/* Glitch effect overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                initial={{ clipPath: 'polygon(0 0, 0 0, 0 0, 0 0)' }}
                whileHover={{
                  clipPath: [
                    'polygon(0 20%, 100% 20%, 100% 30%, 0 30%)',
                    'polygon(0 60%, 100% 60%, 100% 70%, 0 70%)',
                    'polygon(0 40%, 100% 40%, 100% 45%, 0 45%)',
                    'polygon(0 0, 0 0, 0 0, 0 0)',
                  ],
                }}
                transition={{
                  duration: 0.6,
                  times: [0, 0.3, 0.6, 1],
                  ease: 'easeInOut',
                  delay: index * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${process.color}60, transparent)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 relative overflow-hidden"
                    whileHover={{
                      boxShadow: `0 0 30px ${process.color}60`,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      backgroundColor: process.color + '20',
                      border: `2px solid ${process.color}40`,
                    }}
                  >
                    {/* Icon pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                      style={{ backgroundColor: process.color + '30' }}
                    />

                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotateY: 180,
                      }}
                      transition={{ duration: 0.6, ease: 'backOut' }}
                      className="pointer-events-none"
                    >
                      <process.icon
                        className="w-6 h-6 transition-all duration-300 relative z-10 pointer-events-none"
                        style={{
                          color: process.color,
                          filter: `drop-shadow(0 0 4px ${process.color}80)`,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    className="text-lg sm:text-xl font-semibold font-['IBM_Plex_Mono'] text-white"
                    whileHover={{
                      scale: 1.05,
                      textShadow: `0 0 15px ${process.color}80`,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {process.title}
                  </motion.h3>
                </div>
                <motion.p className="text-foreground/80 font-['IBM_Plex_Mono'] font-light text-sm sm:text-base leading-relaxed group-hover:text-foreground/95 transition-colors duration-500">
                  {process.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
