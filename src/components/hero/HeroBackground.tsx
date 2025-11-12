'use client'

import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import AnimatedBlob from './AnimatedBlob'
import { usePerformanceOptimizedAnimation } from '@/hooks/use-performance-optimized-animation'
import { useInView } from 'framer-motion'

function Scene() {
  return (
    <>
      <AnimatedBlob />
    </>
  )
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { shouldOptimizeAnimations } = usePerformanceOptimizedAnimation()
  const isInView = useInView(containerRef, {
    margin: '0px',
  })

  if (shouldOptimizeAnimations) {
    return (
      <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{ preserveDrawingBuffer: true }}
        frameloop={isInView ? 'always' : 'never'}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
