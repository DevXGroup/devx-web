"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"
import * as THREE from "three"

// The actual 3D planet component
function Planet({ scrollY }: { scrollY: number }) {
  const planetRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  // Calculate how much of the planet should be revealed based on scroll
  const calculateReveal = () => {
    const scrollProgress = Math.max(0, Math.min(1, scrollY / 500))
    return scrollProgress * 0.5 // Controls how much the planet rises
  }

  useFrame((state) => {
    if (planetRef.current && glowRef.current) {
      // Move the planet up based on scroll
      const revealAmount = calculateReveal()
      planetRef.current.position.y = -1.5 + revealAmount
      glowRef.current.position.y = -1.5 + revealAmount

      // Add subtle rotation for more dynamic effect
      planetRef.current.rotation.y += 0.001
      glowRef.current.rotation.y += 0.001
    }
  })

  return (
    <>
      {/* The main planet sphere */}
      <Sphere ref={planetRef} args={[2, 64, 64]} position={[0, -1.5, 0]} scale={[1, 0.3, 1]}>
        <meshStandardMaterial color="#000000" roughness={0.7} metalness={0.2} />
      </Sphere>

      {/* The glow effect */}
      <Sphere ref={glowRef} args={[2.05, 32, 32]} position={[0, -1.5, 0]} scale={[1, 0.3, 1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0.1} side={THREE.BackSide} />
      </Sphere>

      {/* Additional outer glow */}
      <Sphere args={[2.2, 32, 32]} position={[0, -1.5, 0]} scale={[1, 0.3, 1]}>
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0.05} side={THREE.BackSide} />
      </Sphere>

      {/* Subtle stars on the planet */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 3.8, -1.5 + Math.random() * 0.2, (Math.random() - 0.5) * 3.8]}>
          <sphereGeometry args={[0.005 + Math.random() * 0.005, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={Math.random() * 0.5 + 0.3} />
        </mesh>
      ))}
    </>
  )
}

export default function PlanetDivider() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="w-full overflow-hidden pointer-events-none z-10"
      style={{
        position: "absolute",
        bottom: "-10vh", // Only show the tip initially
        left: 0,
        width: "100%",
        height: "40vh",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />
        <Planet scrollY={scrollY} />
      </Canvas>
    </div>
  )
}
