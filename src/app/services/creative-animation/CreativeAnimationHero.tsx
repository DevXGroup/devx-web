'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial, 
  Stars, 
  Float,
  Text3D,
  Center,
  Environment
} from '@react-three/drei'
import * as THREE from 'three'
import { motion, useScroll, useTransform } from 'framer-motion'

// Igloo-style animated planet component
function AnimatedPlanet() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const { viewport } = useThree()
  const [scroll, setScroll] = useState(0)

  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setScroll(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current && materialRef.current) {
      // Igloo-style morphing based on scroll
      const time = state.clock.getElapsedTime()
      
      // Base rotation
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
      meshRef.current.rotation.y += delta * 0.2
      meshRef.current.rotation.z = Math.cos(time * 0.2) * 0.05
      
      // Scroll-reactive morphing (igloo style)
      const morphIntensity = 0.3 + scroll * 0.7
      materialRef.current.distort = morphIntensity
      materialRef.current.speed = 1 + scroll * 2
      
      // Scale changes with scroll
      const scale = 1 + scroll * 0.5
      meshRef.current.scale.setScalar(scale)
      
      // Color shifts based on scroll (igloo-style palette)
      const hue = (time * 0.1 + scroll * 2) % 1
      materialRef.current.color.setHSL(hue, 0.8, 0.6)
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#4CD787"
          attach="material"
          distort={0.3}
          speed={1}
          roughness={0.1}
          metalness={0.8}
          envMapIntensity={1}
        />
      </Sphere>
    </Float>
  )
}

// Simplified particle system that reacts to scroll
function ReactiveParticles() {
  const groupRef = useRef<THREE.Group>(null)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setScroll(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      
      // Rotate particle system
      groupRef.current.rotation.y = time * 0.05 + scroll * Math.PI
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      
      // Scale based on scroll
      const scale = 1 + scroll * 0.5
      groupRef.current.scale.setScalar(scale)
    }
  })

  // Create individual particle meshes
  const particles = useMemo(() => {
    const particleArray = []
    for (let i = 0; i < 200; i++) {
      particleArray.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ] as [number, number, number]
      })
    }
    return particleArray
  }, [])

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

// Geometric shapes floating around (igloo style)
function FloatingGeometry() {
  const groupRef = useRef<THREE.Group>(null)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      setScroll(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime()
      groupRef.current.rotation.y = time * 0.1 + scroll * Math.PI * 0.5
      groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1
    }
  })

  const shapes = [
    { type: 'box', position: [4, 2, -2], color: '#CFB53B' },
    { type: 'octahedron', position: [-4, -1, 3], color: '#9d4edd' },
    { type: 'tetrahedron', position: [3, -3, 1], color: '#4834D4' },
    { type: 'icosahedron', position: [-2, 3, -4], color: '#ccff00' },
  ]

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => {
        const Component = shape.type === 'box' ? 'boxGeometry' : 
                         shape.type === 'octahedron' ? 'octahedronGeometry' :
                         shape.type === 'tetrahedron' ? 'tetrahedronGeometry' : 'icosahedronGeometry'
        
        return (
          <Float key={index} speed={1 + index * 0.5} rotationIntensity={1} floatIntensity={0.5}>
            <mesh position={shape.position as [number, number, number]}>
              {shape.type === 'box' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
              {shape.type === 'octahedron' && <octahedronGeometry args={[0.3]} />}
              {shape.type === 'tetrahedron' && <tetrahedronGeometry args={[0.4]} />}
              {shape.type === 'icosahedron' && <icosahedronGeometry args={[0.3]} />}
              <meshStandardMaterial 
                color={shape.color} 
                transparent 
                opacity={0.8}
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ccff00" />
      
      {/* Main animated planet */}
      <AnimatedPlanet />
      
      {/* Floating geometric shapes */}
      <FloatingGeometry />
      
      {/* Reactive particle system */}
      <ReactiveParticles />
      
      {/* Background stars */}
      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade />
      
      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  )
}

// Main component
export default function CreativeAnimationHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform scroll into various animation values
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <>
      {/* Main hero section */}
      <motion.div 
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* 3D Canvas */}
        <div className="absolute inset-0 z-10">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            gl={{ antialias: true, alpha: true }}
            dpr={[1, 2]}
          >
            <Scene />
          </Canvas>
        </div>

        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-96 h-96 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </div>

        {/* Minimal text overlay */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-['IBM_Plex_Mono'] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-300 to-pink-300 mb-6"
              style={{
                textShadow: '0 0 40px rgba(255,255,255,0.3)',
                WebkitTextStroke: '1px rgba(255,255,255,0.1)'
              }}
            >
              Creative
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl font-['IBM_Plex_Sans'] font-light text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              scroll to explore
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Content section with better spacing */}
      <div className="bg-gradient-to-b from-black via-gray-900 to-black relative z-40 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-['IBM_Plex_Mono'] font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
              Motion Design & Animation
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-['IBM_Plex_Sans'] mb-12">
              Professional animation services for brands, featuring fluid motion graphics, 
              interactive elements, and engaging visual storytelling that captivates audiences.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { title: 'Logo Animations', desc: 'Dynamic brand reveals' },
                { title: 'UI Micro-interactions', desc: 'Smooth user experiences' },
                { title: '3D Visualizations', desc: 'Immersive storytelling' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-['IBM_Plex_Mono'] font-semibold text-orange-400 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 font-['IBM_Plex_Sans']">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-gradient-to-r from-orange-400 to-pink-400 text-black px-8 py-4 rounded-lg font-['IBM_Plex_Mono'] font-semibold hover:scale-105 transition-transform duration-300 inline-flex items-center justify-center"
              >
                Start Your Project
              </a>
              <a 
                href="/portfolio"
                className="border-2 border-orange-400 text-orange-400 px-8 py-4 rounded-lg font-['IBM_Plex_Mono'] font-semibold hover:bg-orange-400 hover:text-black transition-all duration-300 inline-flex items-center justify-center"
              >
                View Portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}