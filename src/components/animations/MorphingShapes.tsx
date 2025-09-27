"use client"

import { motion, useReducedMotion } from "framer-motion"

interface MorphingShapesProps {
  className?: string
}

export default function MorphingShapes({ className = "" }: MorphingShapesProps) {
  const shouldReduceMotion = useReducedMotion()

  const shapes = [
    {
      id: 1,
      initial: { x: "20%", y: "10%", scale: 1, rotate: 0 },
      animate: shouldReduceMotion ? {} : {
        x: ["20%", "80%", "20%"],
        y: ["10%", "60%", "10%"],
        scale: [1, 1.2, 0.8, 1],
        rotate: [0, 180, 360]
      },
      transition: {
        duration: 20,
        repeat: Infinity
      },
      color: "#4CD787",
      size: "w-16 h-16"
    },
    {
      id: 2,
      initial: { x: "70%", y: "20%", scale: 1, rotate: 0 },
      animate: shouldReduceMotion ? {} : {
        x: ["70%", "30%", "70%"],
        y: ["20%", "80%", "20%"],
        scale: [1, 0.6, 1.4, 1],
        rotate: [0, -180, -360]
      },
      transition: {
        duration: 25,
        repeat: Infinity,
        delay: 2
      },
      color: "#4834D4",
      size: "w-12 h-12"
    },
    {
      id: 3,
      initial: { x: "10%", y: "70%", scale: 1, rotate: 0 },
      animate: shouldReduceMotion ? {} : {
        x: ["10%", "90%", "10%"],
        y: ["70%", "30%", "70%"],
        scale: [1, 1.5, 0.5, 1],
        rotate: [0, 90, 270, 360]
      },
      transition: {
        duration: 30,
        repeat: Infinity,
        delay: 5
      },
      color: "#FFD700",
      size: "w-20 h-20"
    },
    {
      id: 4,
      initial: { x: "85%", y: "75%", scale: 1, rotate: 0 },
      animate: shouldReduceMotion ? {} : {
        x: ["85%", "15%", "85%"],
        y: ["75%", "25%", "75%"],
        scale: [1, 0.8, 1.3, 1],
        rotate: [0, -90, -270, -360]
      },
      transition: {
        duration: 18,
        repeat: Infinity,
        delay: 7
      },
      color: "#9d4edd",
      size: "w-14 h-14"
    }
  ]

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute ${shape.size} rounded-full opacity-20 blur-sm`}
          style={{
            background: `radial-gradient(circle, ${shape.color}80 0%, ${shape.color}20 70%, transparent 100%)`
          }}
          initial={shape.initial}
          animate={shape.animate}
          transition={shape.transition}
        />
      ))}
      
      {/* Additional morphing blob */}
      <motion.div
        className="absolute w-32 h-32 rounded-full opacity-10"
        style={{
          background: "conic-gradient(from 0deg, #4CD787, #4834D4, #FFD700, #9d4edd, #4CD787)",
          filter: "blur(20px)"
        }}
        initial={{ x: "50%", y: "50%", scale: 1 }}
        animate={shouldReduceMotion ? {} : {
          x: ["50%", "30%", "70%", "50%"],
          y: ["50%", "20%", "80%", "50%"],
          scale: [1, 1.5, 0.8, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          }}
      />
    </div>
  )
}