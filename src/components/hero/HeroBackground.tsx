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
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    setIsClient(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.18} />
      <pointLight position={[10, 10, 10]} intensity={1.0} />
      <pointLight position={[-8, -5, 8]} intensity={0.6} color="#4cd787" />
      {isClient && (
        <>
          <EnhancedStarfield viewport={viewport} />
          <AnimatedBlob viewport={viewport} />
        </>
      )}
    </>
  )
}

export default function HeroBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="absolute inset-0 w-full h-full bg-black">
        <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.18} />
          <pointLight position={[10, 10, 10]} intensity={1.0} />
          <pointLight position={[-8, -5, 8]} intensity={0.6} color="#4cd787" />
        </Canvas>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
