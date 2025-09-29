"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import dynamic from "next/dynamic"

// Dynamically import components that use browser APIs
const EnhancedStarfield = dynamic(() => import("./StarField"), { 
  ssr: false,
  loading: () => null
})
const AnimatedBlob = dynamic(() => import("./AnimatedBlob"), { 
  ssr: false,
  loading: () => null
})

function Scene() {
  const { viewport } = useThree()
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const mounted = useRef(false)
  const resizeTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    setIsClient(true)

    const handleScroll = () => {
      if (!isResizing) {
        setScrollY(window.scrollY)
      }
    }

    const handleResize = () => {
      setIsResizing(true)
      clearTimeout(resizeTimeoutRef.current)
      resizeTimeoutRef.current = setTimeout(() => {
        setIsResizing(false)
      }, 250)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeoutRef.current)
    }
  }, [isResizing])

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.18} />
      <pointLight position={[10, 10, 10]} intensity={1.0} />
      <pointLight position={[-8, -5, 8]} intensity={0.6} color="#4cd787" />
      {isClient && (
        <>
          <EnhancedStarfield viewport={viewport} />
          <AnimatedBlob scrollY={scrollY} viewport={viewport} />
        </>
      )}
    </>
  )
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
        rootMargin: '100px 0px 100px 0px'
      }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [isMounted])

  if (!isMounted || !shouldRender) {
    return (
      <div ref={containerRef} className="absolute inset-0 w-full h-full bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {isVisible ? (
        <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
          <Scene />
        </Canvas>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />
      )}
    </div>
  )
}
