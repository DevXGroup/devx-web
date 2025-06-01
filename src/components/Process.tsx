"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Code2, Rocket, Users, Zap, Pencil, Settings } from "lucide-react"
import SDLCProcess from "./SDLCProcess"
import { AnimatedGradientText } from "./AnimatedGradientText"

const processes = [
  {
    icon: Users,
    title: "Discovery",
    description: "We begin by exploring your goals, challenges, and vision through deep consultation.",
  },
  {
    icon: Pencil,
    title: "Design",
    description: "Our designers craft intuitive interfaces and robust architectures tailored to your needs.",
  },
  {
    icon: Code2,
    title: "Development",
    description: "Our engineers bring your vision to life — fast, scalable, and future-ready.",
  },
  {
    icon: Zap,
    title: "Testing",
    description: "We test rigorously to ensure flawless performance and quality across all devices.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "We launch your product and stay by your side with ongoing support and optimization.",
  },
  {
    icon: Settings,
    title: "Maintenance",
    description:
      "We provide continuous updates, monitoring, and improvements to keep your software at peak performance.",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-8 font-['IBM_Plex_Mono']">
            <AnimatedGradientText>Process</AnimatedGradientText>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-['IBM_Plex_Mono'] font-light mb-16">
            From first spark to post-launch support — our process is built for long-term success.
          </p>
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
              className="relative bg-black/50 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-white/10 flex flex-col items-start text-left"
            >
              <div className="flex items-center mb-6">
                <process.icon className="w-10 h-10 text-[#CFB53B] mr-4" />
                <h3 className="text-xl font-semibold font-['IBM_Plex_Mono']">{process.title}</h3>
              </div>
              <p className="text-foreground/70 font-['IBM_Plex_Mono'] font-light text-base leading-relaxed">
                {process.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
