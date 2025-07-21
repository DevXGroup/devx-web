"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import { Vector3, Curve, TubeGeometry, type Mesh, SphereGeometry } from "three"

interface BraidedRopeAnimationProps {
  className?: string
}

export default function BraidedRopeAnimation({ className = "" }: BraidedRopeAnimationProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 })
  const containerRef = useRef<HTMLDivElement>(null)

  // No interaction needed - removed event listeners for performance

  useEffect(() => {
    setIsMounted(true)
    
    const updateScreenSize = () => {
      setScreenSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      })
    }
    
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  if (!isMounted) return null

  return (
    <div className={`absolute w-full overflow-hidden ${className}`} style={{ top: '-100px', height: '80vh' }}>
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{
          minHeight: 'calc(80vh + 100px)', // Extended above screen
          backgroundColor: 'transparent',
          pointerEvents: 'none', // No interaction needed
        }}
      >
        <Canvas 
          shadows 
          style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          camera={{ 
            position: [0, 0, screenSize.width < 768 ? 7 : 6], // Unified positioning
            fov: screenSize.width < 768 ? 75 : 65 // Optimized FOV for DNA helix viewing
          }}
        >
          <PerspectiveCamera 
            makeDefault 
            position={[0, 0, screenSize.width < 768 ? 7 : 6]} // Unified positioning
            fov={screenSize.width < 768 ? 75 : 65} // Optimized FOV for DNA helix viewing
          />
          <Environment preset="studio" />
          <ambientLight intensity={0.3} />
          
          {/* Softer lighting for double helix */}
          <directionalLight
            castShadow
            position={[20, 15, 15]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            color="#F5F5F5"
          />
          
          {/* Softer key lights for double helix */}
          <spotLight position={[15, 12, 15]} angle={0.25} penumbra={1} intensity={1.2} castShadow color="#FFFFFF" />
          <spotLight position={[-15, 15, 20]} angle={0.25} penumbra={1} intensity={1.0} castShadow color="#E6E6FA" />
          
          {/* Gentler fill lights */}
          <pointLight position={[8, 6, 12]} intensity={1.2} color="#9C27B0" distance={20} decay={2} />
          <pointLight position={[-8, -6, 12]} intensity={1.0} color="#6A1B9A" distance={18} decay={2} />
          <pointLight position={[0, 10, 8]} intensity={0.8} color="#BA68C8" distance={15} decay={2} />
          
          {/* White and purple metallic shininess accent lights */}
          <pointLight position={[24, 6, -10]} intensity={2.8} color="#FFFFFF" distance={42} decay={3} />
          <pointLight position={[-24, 6, -10]} intensity={2.8} color="#E1BEE7" distance={42} decay={3} />
          
          {/* Additional highlights for metallic effect */}
          <pointLight position={[0, -12, 28]} intensity={1.8} color="#CE93D8" distance={22} decay={2} />
          <pointLight position={[16, 28, 6]} intensity={1.6} color="#F3E5F5" distance={34} decay={2} />
          
          {/* Enhanced rim lighting for purple edges */}
          <pointLight position={[-10, 2, -16]} intensity={2.0} color="#AB47BC" distance={38} decay={3} />
          <pointLight position={[10, 2, -16]} intensity={2.0} color="#F8BBD9" distance={38} decay={3} />

          {/* Animated moving lights for white highlights */}
          <AnimatedHighlights screenSize={screenSize} />

          <BraidedRopeMesh screenSize={screenSize} />
        </Canvas>
      </div>
      
      {/* Enhanced fade overlays for seamless blending - responsive */}
      <div className={`absolute inset-0 pointer-events-none z-10 ${
        screenSize.width < 768 
          ? 'bg-gradient-to-b from-black/60 via-transparent to-black/60' // Enhanced fade on mobile
          : 'bg-gradient-to-b from-black/80 via-transparent to-black/80'
      }`} />
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent pointer-events-none z-10 ${
        screenSize.width < 768 ? 'h-16' : 'h-48' // Larger fade areas
      }`} />
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pointer-events-none z-10 ${
        screenSize.width < 768 ? 'h-16' : 'h-48' // Bottom fade as well
      }`} />
    </div>
  )
}

function AnimatedHighlights({ screenSize }: { screenSize: { width: number; height: number } }) {
  const light1Ref = useRef<any>(null)
  const light2Ref = useRef<any>(null)
  const light3Ref = useRef<any>(null)
  const light4Ref = useRef<any>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Follow the unified DNA double helix motion
    const baseRadius = screenSize.width < 768 ? 0.5 : 0.7 // Match rope scale
    const helixSpeed = time * 1.8 // Match rope animation speed
    const helixRadius = baseRadius * 0.7 // Match rope helix radius - wider spacing
    
    // Lights follow first helix strand
    if (light1Ref.current) {
      const helixAngle = helixSpeed
      const spiralX = Math.cos(helixAngle) * helixRadius
      const spiralY = Math.sin(helixAngle * 0.5) * 0.15
      const spiralZ = Math.sin(helixAngle) * helixRadius
      
      light1Ref.current.position.set(
        spiralX,
        4 + spiralY,
        spiralZ
      )
    }
    
    if (light2Ref.current) {
      const helixAngle = helixSpeed + Math.PI/3
      const spiralX = Math.cos(helixAngle) * helixRadius
      const spiralY = Math.sin(helixAngle * 0.5) * 0.15
      const spiralZ = Math.sin(helixAngle) * helixRadius
      
      light2Ref.current.position.set(
        spiralX,
        2 + spiralY,
        spiralZ
      )
    }
    
    // Lights follow second helix strand (opposite phase)
    if (light3Ref.current) {
      const helixAngle = helixSpeed + Math.PI
      const spiralX = Math.cos(helixAngle) * helixRadius
      const spiralY = Math.sin(helixAngle * 0.5) * 0.15
      const spiralZ = Math.sin(helixAngle) * helixRadius
      
      light3Ref.current.position.set(
        spiralX,
        3 + spiralY,
        spiralZ
      )
    }
    
    if (light4Ref.current) {
      const helixAngle = helixSpeed + Math.PI + Math.PI/3
      const spiralX = Math.cos(helixAngle) * helixRadius
      const spiralY = Math.sin(helixAngle * 0.5) * 0.15
      const spiralZ = Math.sin(helixAngle) * helixRadius
      
      light4Ref.current.position.set(
        spiralX,
        1 + spiralY,
        spiralZ
      )
    }
  })

  return (
    <>
      {/* Shorter moving highlights for first strand */}
      <pointLight 
        ref={light1Ref}
        intensity={2.0}
        color="#FFFFFF"
        distance={4}
        decay={3}
      />
      <pointLight 
        ref={light2Ref}
        intensity={1.6}
        color="#F8F8FF"
        distance={4}
        decay={3}
      />
      
      {/* Shorter moving highlights for second strand */}
      <pointLight 
        ref={light3Ref}
        intensity={1.8}
        color="#E1BEE7"
        distance={4}
        decay={3}
      />
      <pointLight 
        ref={light4Ref}
        intensity={1.4}
        color="#CE93D8"
        distance={3.5}
        decay={3}
      />
    </>
  )
}

function BraidedRopeMesh({ screenSize }: { screenSize: { width: number; height: number } }) {
  const meshRef1 = useRef<Mesh>(null!)
  const meshRef2 = useRef<Mesh>(null!)

  // Braided Rope Curve - Two ropes wrapping around each other in opposite directions
  class BraidedRopeCurve extends Curve<Vector3> {
    constructor(
      public radius = 2.0,
      public height = 16,
      public twists = 3.0,
      public offset = 0,
      public direction = 1, // 1 for clockwise, -1 for counterclockwise
      public time = 0 // Animation time for continuous winding
    ) {
      super()
    }

    getPoint(t: number, optionalTarget = new Vector3()) {
      // Unified double helix DNA animation - works for all screen sizes
      
      // Vertical progression from top to bottom
      const verticalProgress = (this.height / 2) - (t * this.height) // Top to bottom
      
      // Double helix twisting around Y-axis - beautiful spiral motion
      const helixTurns = 5 // Slightly fewer turns for cleaner twisting motion
      const helixAngle = this.time * 1.8 + t * Math.PI * helixTurns + this.offset // Smooth Y-axis twisting
      
      // Helix parameters - wider spacing for beautiful double helix
      const helixRadius = this.radius * 0.7 // More separation between ropes
      
      // Pure spiral coordinates - no straight sections
      const x = Math.cos(helixAngle) * helixRadius
      const y = verticalProgress + Math.sin(helixAngle * 0.5) * 0.15 // Gentle vertical wave
      const z = Math.sin(helixAngle) * helixRadius
      
      // Smooth fade at rope ends
      const fadeStart = 0.12
      const fadeEnd = 0.88
      let fadeMultiplier = 1
      
      if (t < fadeStart) {
        const normalized = t / fadeStart
        fadeMultiplier = normalized * normalized * (3 - 2 * normalized) // Smoothstep function
      } else if (t > fadeEnd) {
        const normalized = (1 - t) / (1 - fadeEnd)
        fadeMultiplier = normalized * normalized * (3 - 2 * normalized) // Smoothstep function
      }
      
      return optionalTarget.set(
        x * fadeMultiplier,
        y,
        z * fadeMultiplier
      )
    }

    // Method to update animation time
    updateTime(time: number) {
      this.time = time
    }
  }

  // Create rope strands - smaller scale for top section only
  const getRopeScale = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return { radius: 0.5, height: 8 } // Mobile - small scale
      if (window.innerWidth < 1024) return { radius: 0.6, height: 10 } // Tablet - small scale
    }
    return { radius: 0.7, height: 12 } // Desktop - small scale
  }
  
  const ropeScale = getRopeScale()
  const curve1 = useRef(new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 4.0, 0, 1, 0)) // First rope
  const curve2 = useRef(new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 4.0, Math.PI, 1, 0)) // Second rope, 180° offset
  
  const tubeRadius = 0.35 // Thicker ropes for better visibility
  const radialSegments = 32 // More segments for ultra-smooth edges
  const tubularSegments = 200 // Higher detail for smooth double helix

  // Create refs for geometries that will be updated
  const geometry1 = useRef(new TubeGeometry(curve1.current, tubularSegments, tubeRadius, radialSegments, false))
  const geometry2 = useRef(new TubeGeometry(curve2.current, tubularSegments, tubeRadius, radialSegments, false))

  // Remove hit detection - no drag interaction needed

  // Removed all pointer/drag interaction code for performance

  useFrame((state, delta) => {
    if (!meshRef1.current || !meshRef2.current) return

    const time = state.clock.getElapsedTime()

    // Update curve animations - smooth and performance optimized
    const animationSpeed = time * 0.45 // Faster constant animation
    curve1.current.updateTime(animationSpeed) // First rope continuous spiral
    curve2.current.updateTime(animationSpeed) // Second rope same motion (180° phase offset creates intertwining)

    // Recreate geometries with updated curves for smooth animation
    const newGeometry1 = new TubeGeometry(curve1.current, tubularSegments, tubeRadius, radialSegments, false)
    const newGeometry2 = new TubeGeometry(curve2.current, tubularSegments, tubeRadius, radialSegments, false)

    // Update mesh geometries
    meshRef1.current.geometry.dispose()
    meshRef2.current.geometry.dispose()
    meshRef1.current.geometry = newGeometry1
    meshRef2.current.geometry = newGeometry2

    // Simple continuous animation - no interaction needed
    
    // Elastic stretching motion - less springy, more natural stretch
    const stretchY = Math.sin(time * 0.18) * 0.25 + Math.sin(time * 0.35) * 0.1 // Slower, more elastic
    const elasticScaleY = 1 + Math.sin(time * 0.22) * 0.08 + Math.cos(time * 0.15) * 0.04 // Vertical stretch
    const elasticScaleXZ = 1 - Math.sin(time * 0.22) * 0.02 // Slight horizontal compression when stretching vertically
    
    // Apply elastic movement - stretch up and down naturally
    meshRef1.current.position.y = stretchY
    meshRef2.current.position.y = stretchY
    meshRef1.current.scale.set(elasticScaleXZ, elasticScaleY, elasticScaleXZ)
    meshRef2.current.scale.set(elasticScaleXZ, elasticScaleY, elasticScaleXZ)
    
    // Add individual rope twisting - each rope rotates around its own axis
    const twistSpeed = time * 0.8 // Slower twisting for realistic rope effect
    meshRef1.current.rotation.y = twistSpeed // First rope twists clockwise
    meshRef2.current.rotation.y = -twistSpeed // Second rope twists counter-clockwise
  })

  return (
    <>
      {/* First Rope Strand - Purple with animated highlights */}
      <mesh
        ref={meshRef1}
        geometry={geometry1.current}
        castShadow
        receiveShadow
        rotation={[0, 0, Math.PI / 6]} // 30 degree slant to match rope direction
        position={[
          screenSize.width < 768 ? -1 : -1,
          screenSize.width < 768 ? 1 : 2,
          0
        ]}
      >
        <meshStandardMaterial
          color="#6A1B9A"
          metalness={screenSize.width < 768 ? 0.85 : 0.95}
          roughness={screenSize.width < 768 ? 0.15 : 0.05}
          emissive="#4A148C"
          emissiveIntensity={screenSize.width < 768 ? 0.5 : 0.25}
          transparent={true}
          opacity={screenSize.width < 768 ? 0.9 : 0.75}
          alphaTest={0.05}
          blending={screenSize.width < 768 ? 1 : 2}
          depthWrite={screenSize.width < 768 ? true : false}
        />
      </mesh>

      {/* Second Rope Strand - Purple with subtle hints and animated highlights */}
      <mesh
        ref={meshRef2}
        geometry={geometry2.current}
        castShadow
        receiveShadow
        rotation={[0, 0, Math.PI / 6]} // 30 degree slant to match rope direction
        position={[
          screenSize.width < 768 ? -1 : -1,
          screenSize.width < 768 ? 1 : 2,
          0
        ]}
      >
        <meshStandardMaterial
          color="#2E0A3E"
          metalness={screenSize.width < 768 ? 0.85 : 0.92}
          roughness={screenSize.width < 768 ? 0.15 : 0.08}
          emissive="#1A0624"
          emissiveIntensity={screenSize.width < 768 ? 0.5 : 0.22}
          transparent={true}
          opacity={screenSize.width < 768 ? 0.85 : 0.70}
          alphaTest={0.05}
          blending={screenSize.width < 768 ? 1 : 2}
          depthWrite={screenSize.width < 768 ? true : false}
        />
      </mesh>
    </>
  )
}