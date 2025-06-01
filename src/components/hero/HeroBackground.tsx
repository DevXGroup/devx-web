"use client"

import { useRef, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import dynamic from "next/dynamic"

// Dynamically import components that use browser APIs
const EnhancedStarfield = dynamic(() => import("./StarField"), { ssr: false })
const AnimatedBlob = dynamic(() => import("./AnimatedBlob"), { ssr: false })

function Scene() {
  const { viewport } = useThree()
  const scrollRef = useRef(0)

  // Set up scroll listener
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY
    }

    // Set initial scroll position
    scrollRef.current = window.scrollY

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight position={[10, 10, 10]} intensity={1.0} />
      <pointLight position={[-8, -5, 8]} intensity={0.6} color="#4cd787" />
      {/* Enhanced starfield background (contains twinkling and shooting stars) */}
      <EnhancedStarfield viewport={viewport} />
      {/* Environment map for realistic reflections */}
      <Environment preset="night" />
      {/* Render AnimatedBlob once, it will handle generating multiple smaller blobs */}
      <AnimatedBlob scrollY={scrollRef.current} viewport={viewport} />
    </>
  )
}

export default function HeroBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
      <Scene />
    </Canvas>
  )
}
