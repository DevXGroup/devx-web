'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, extend, useThree } from '@react-three/fiber'
import { AnimatedBlob } from './AnimatedBlob'
import dynamic from 'next/dynamic'

// extend({ Canvas })

// Dynamically import components that use browser APIs
const EnhancedStarfield = dynamic(() => import('./StarField'), {
  ssr: false,
  loading: () => null,
})

function Scene() {
  return <>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.18} />
        <pointLight position={[10, 10, 10]} intensity={1.0} />
        <pointLight position={[-8, -5, 8]} intensity={0.6} color="#4cd787" />

        {/*<EnhancedStarfield />*/}
        <AnimatedBlob />
      </>
}

export default function HeroBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const mounted = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    // Check for reduced motion preference or low-end device
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isLowPerformance = window.navigator.hardwareConcurrency <= 4

    setShouldRender(!prefersReducedMotion && !isLowPerformance)
    setIsMounted(true)
  }, [])

  // IntersectionObserver to detect when hero is visible
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px 100px 0px',
      }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isMounted])

  // if (!isMounted || !shouldRender) {
  //   return (
  //     <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black">
  //       <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />
  //     </div>
  //   )
  // }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
