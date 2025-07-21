"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Code2, Rocket, Users, Zap, Pencil, Settings } from "lucide-react"
import SDLCProcess from "./SDLCProcess"
import { AnimatedGradientText } from "./AnimatedGradientText"
import BlurText from "./BlurText"
import ShapeBlur from "./ShapeBlur"

const processes = [
  {
    icon: Users,
    title: "Discovery",
    description: "We begin by exploring your goals, challenges, and vision through deep consultation.",
    shapeVariation: 0,
    color: "#4CD787",
    useFullCard: true,
  },
  {
    icon: Pencil,
    title: "Design",
    description: "Our designers craft intuitive interfaces and robust architectures tailored to your needs.",
    shapeVariation: 0,
    color: "#9d4edd",
    useFullCard: true,
  },
  {
    icon: Code2,
    title: "Development",
    description: "Our engineers bring your vision to life — fast, scalable, and future-ready.",
    shapeVariation: 0,
    color: "#4834D4",
    useFullCard: true,
  },
  {
    icon: Zap,
    title: "Testing",
    description: "We test rigorously to ensure flawless performance and quality across all devices.",
    shapeVariation: 0,
    color: "#CFB53B",
    useFullCard: true,
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "We launch your product and stay by your side with ongoing support and optimization.",
    shapeVariation: 0,
    color: "#ff6b6b",
    useFullCard: true,
  },
  {
    icon: Settings,
    title: "Maintenance",
    description:
      "We provide continuous updates, monitoring, and improvements to keep your software at peak performance.",
    shapeVariation: 0,
    color: "#4CD787",
    useFullCard: true,
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

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

        const scrollPercentage = (scrollPosition - containerTop + windowHeight) / (containerHeight + windowHeight)
        setScrollProgress(Math.min(Math.max(scrollPercentage, 0), 1))
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call to set the initial state

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <section className="relative py-20 w-full" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-x-0 bottom-0 top-[1px] bg-gradient-to-b from-black via-[#4CD787]/20 to-black"></div>

      <motion.div style={{ opacity, y }} className="relative container mx-auto px-4">
        <div className="text-center">
          <div className="flex flex-col items-center">
            <BlurText 
              text="Our Process"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center text-[#9d4edd] font-['IBM_Plex_Mono']"
              delay={120}
              animateBy="words"
              direction="top"
            />
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-['IBM_Plex_Mono'] font-light mb-16">
              From first spark to post-launch support — our process is built for long-term success.
            </p>
          </div>
        </div>

        {/* Add SDLCProcess component above the cards */}
        <div className="mb-24">
          <SDLCProcess />
        </div>

        {/* Process cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {processes.map((process, index) => (
            <motion.div
              key={process.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-black/50 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-white/10 flex flex-col items-start text-left overflow-hidden cursor-pointer"
            >
              {/* Full-Card ShapeBlur Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700">
                <ShapeBlur
                  variation={0}
                  shapeSize={2.8}
                  roundness={0.35}
                  borderSize={0.04}
                  circleSize={0.15}
                  circleEdge={1.2}
                  className="w-full h-full"
                />
              </div>
              
              {/* Gradient overlay that matches the process color */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${process.color}40 0%, transparent 70%)`
                }}
              />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-colors duration-300"
                    style={{ 
                      backgroundColor: process.color + '20',
                      border: `2px solid ${process.color}40`
                    }}
                  >
                    <process.icon 
                      className="w-6 h-6 transition-colors duration-300" 
                      style={{ color: process.color }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold font-['IBM_Plex_Mono'] group-hover:text-white transition-colors duration-300">
                    {process.title}
                  </h3>
                </div>
                <p className="text-foreground/70 font-['IBM_Plex_Mono'] font-light text-base leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                  {process.description}
                </p>
              </div>
              
              {/* Subtle border glow on hover */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `0 0 20px ${process.color}30`
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
