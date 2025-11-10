'use client'

import type React from 'react'
import { motion } from 'framer-motion'

export default function AnimatedGradient({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0 z-0 safari-fix"
      style={{
        background:
          'radial-gradient(circle at center, rgba(76, 215, 135, 0.05) 0%, transparent 70%)',
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 15,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
