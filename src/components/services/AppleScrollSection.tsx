'use client'

import type React from 'react'
import { motion } from 'framer-motion'

interface AppleScrollSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function AppleScrollSection({
  children,
  delay = 0,
  className = '',
}: AppleScrollSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: delay }}
      viewport={{ once: true, amount: 0.1 }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  )
}
