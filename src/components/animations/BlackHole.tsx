'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function BlackHole() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
        {/* Outer Glow / Gravitational Lensing effect */}
        <motion.div
          className="absolute inset-[-20%] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Accretion Disk - Main Rotating Gradients */}
        <motion.div
          className="absolute inset-0 rounded-full mix-blend-screen"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0%, #a855f7 10%, #6366f1 30%, #ec4899 50%, #6366f1 70%, #a855f7 90%, transparent 100%)', // Purple/Pink/Blue themes
            filter: 'blur(30px)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {/* Inner Accretion Disk - Sharper */}
        <motion.div
          className="absolute inset-[10%] rounded-full mix-blend-screen"
          style={{
            background:
              'conic-gradient(from 180deg, transparent 0%, #fbbf24 10%, #f59e0b 25%, transparent 50%, #fbbf24 60%, #f59e0b 75%, transparent 100%)', // Orange/Gold for inner heat
            filter: 'blur(10px)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />

        {/* Event Horizon (The Black Hole) */}
        <div className="absolute inset-[25%] bg-black rounded-full z-10 shadow-[0_0_60px_rgba(0,0,0,1)]" />

        {/* Photon Ring (Thin bright ring around event horizon) */}
        <div className="absolute inset-[25%] rounded-full border border-white/40 blur-[1px] z-20 box-border" />

        {/* Particle Stream / Jets */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[140%] h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent -translate-x-1/2 -translate-y-1/2 blur-sm opacity-50"
          style={{ rotate: 45 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[140%] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent -translate-x-1/2 -translate-y-1/2 blur-sm opacity-50"
          style={{ rotate: -45 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />

        {/* Dark core depth */}
        <div className="absolute inset-[26%] bg-black rounded-full z-20" />
      </div>
    </div>
  )
}
