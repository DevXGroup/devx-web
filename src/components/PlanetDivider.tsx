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
      {/* The main planet sphere - now with a subtle dark glow instead of pure black */}
      <Sphere ref={planetRef} args={[2, 64, 64]} position={[0, -1.5, 0]} scale={[1, 0.3, 1]}>
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.8}
          metalness={0.1}
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Inner glow effect */}
      <Sphere ref={glowRef} args={[2.05, 32, 32]} position={[0, -1.5, 0]} scale={[1, 0.3, 1]}>
        <meshBasicMaterial
          color="#4CD787"
          transparent={true}
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Middle glow layer */}
      <Sphere args={[2.15, 32, 32]} position={[0, -1.5, 0]} scale={[1, 0.3, 1]}>
        <meshBasicMaterial
          color="#4CD787"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Outer glow layer */}
      <Sphere args={[2.3, 32, 32]} position={[0, -1.5, 0]} scale={[1, 0.3, 1]}>
        <meshBasicMaterial
          color="#4CD787"
          transparent={true}
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Subtle stars on the planet */}
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 3.8, -1.5 + Math.random() * 0.2, (Math.random() - 0.5) * 3.8]}>
          <sphereGeometry args={[0.008 + Math.random() * 0.006, 8, 8]} />
          <meshBasicMaterial
            color="#4CD787"
            transparent
            opacity={Math.random() * 0.6 + 0.4}
            emissive="#4CD787"
            emissiveIntensity={0.2}
          />
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
        background: "transparent",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[0, 5, 5]} intensity={0.7} />
        <Planet scrollY={scrollY} />
      </Canvas>
    </div>
  )
}
