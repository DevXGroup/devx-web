"use client"

import { useRef, useEffect, useState } from "react"
import { useInView, useAnimation } from "framer-motion"
import ParticleAnimation from "./ParticleAnimation"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  service: {
    icon: LucideIcon
    title: string
    description: string
    features: string[]
    color: string
  }
  index: number
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = service.icon
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const controls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  
  const handleCardClick = () => {
    window.location.href = '/portfolio'
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  // Delayed particle effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isHovered) {
      timer = setTimeout(() => {
        setShowParticles(true)
      }, 100)
    } else {
      setShowParticles(false)
    }

    return () => clearTimeout(timer)
  }, [isHovered])

  const cardColor = service.color || "#4CD787"

  return (
    <div
      ref={ref}
      className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-white/10 group hover:border-white/30 transition-all duration-300 relative overflow-hidden h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      style={{
        opacity: isInView ? 1 : 0,
        transform: `translateY(${isInView ? 0 : 20}px)`,
        transition: `opacity 0.4s ease, transform 0.4s ease`,
      }}
    >
      {showParticles && <ParticleAnimation color={cardColor} density={15} speed={0.2} />}

      <div className="flex items-center mb-6 relative z-10">
        <div className="relative">
          <div
            className="w-16 h-16 mr-4 flex items-center justify-center rounded-full aspect-square shrink-0 group-hover:shadow-[0_0_15px_rgba(76,215,135,0.5)]"
            style={{
              backgroundColor: cardColor,
              boxShadow: isHovered ? `0 0 15px ${cardColor}80` : "none",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <Icon className="w-8 h-8 text-black" />
          </div>
        </div>
        <h3
          className="text-xl font-semibold"
          style={{
            color: cardColor,
            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            WebkitTextStroke: "0.5px rgba(0,0,0,0.2)",
          }}
        >
          {service.title}
        </h3>
      </div>

      <p
        className="text-foreground/80 font-light mb-6 relative z-10 flex-grow"
        style={{
          textShadow: "0 1px 1px rgba(0,0,0,0.3)",
        }}
      >
        {service.description}
      </p>

      <ul className="space-y-3 relative z-10">
        {service.features.map((feature, i) => (
          <li
            key={feature}
            className="flex items-center text-sm text-foreground/70 font-light group"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateX(0)" : "translateX(-5px)",
              transition: `opacity 0.3s ease ${i * 0.1}s, transform 0.3s ease ${i * 0.1}s`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full mr-3 group-hover:w-2 group-hover:h-2 transition-all duration-300"
              style={{
                backgroundColor: cardColor,
                transform: isHovered ? "scale(1.3)" : "scale(1)",
                transition: "transform 0.3s ease, background-color 0.3s ease",
              }}
            />
            <span
              style={{ textShadow: "0 1px 1px rgba(0,0,0,0.3)" }}
              className="group-hover:text-foreground/90 transition-colors duration-300"
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Subtle reveal effect on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-tr rounded-xl z-0"
        style={{
          background: `radial-gradient(circle at center, ${cardColor}10 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />
    </div>
  )
}
