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

  // Prevent scrolling when interacting with the canvas
  useEffect(() => {
    if (!containerRef.current) return

    const preventDefault = (e: Event) => {
      e.preventDefault()
    }

    const container = containerRef.current
    container.addEventListener("wheel", preventDefault, { passive: false })
    container.addEventListener("touchmove", preventDefault, { passive: false })

    return () => {
      container.removeEventListener("wheel", preventDefault)
      container.removeEventListener("touchmove", preventDefault)
    }
  }, [])

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
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{
          cursor: "grab",
          touchAction: "none",
          minHeight: screenSize.width < 768 
            ? `${Math.max(400, screenSize.height * 0.6)}px` // Responsive minimum height for mobile
            : `${Math.max(500, screenSize.height * 0.7)}px`, // Responsive minimum height for desktop
          backgroundColor: 'transparent',
        }}
      >
        <Canvas 
          shadows 
          style={{ width: "100%", height: "100%" }} 
          onContextMenu={(e) => e.preventDefault()}
          camera={{ 
            position: screenSize.width < 768 
              ? [0, 0, 8] // Centered view under title for mobile
              : screenSize.width < 1024 
                ? [0, 2, 10] // Slightly elevated for tablet
                : [0, 4, 12], // Elevated view for desktop
            fov: screenSize.width < 768 ? 60 : 45
          }}
        >
          <PerspectiveCamera 
            makeDefault 
            position={screenSize.width < 768 
              ? [0, 0, 8] // Centered under title
              : screenSize.width < 1024 
                ? [0, 2, 10] // Tablet view
                : [0, 4, 12] // Desktop view
            } 
            fov={screenSize.width < 768 ? 60 : 45}
          />
          <Environment preset="studio" />
          <ambientLight intensity={0.3} />
          
          {/* Enhanced lighting for horizontal braided ropes */}
          <directionalLight
            castShadow
            position={[0, 20, 25]} // Positioned above for horizontal layout
            intensity={3.2}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={100}
            shadow-camera-left={-25}
            shadow-camera-right={25}
            shadow-camera-top={20}
            shadow-camera-bottom={-5}
            color="#FFFFFF" // Pure white for metallic sheen
          />
          
          {/* Key lights for horizontal rope highlights */}
          <spotLight position={[15, 15, 20]} angle={0.20} penumbra={1} intensity={3.0} castShadow color="#FFFFFF" />
          <spotLight position={[-15, 15, 20]} angle={0.20} penumbra={1} intensity={2.8} castShadow color="#F0E6FF" />
          
          {/* Fill lights for purple enhancement */}
          <pointLight position={[14, 10, 22]} intensity={2.4} color="#9C27B0" distance={32} decay={2} />
          <pointLight position={[-14, -10, 22]} intensity={2.2} color="#6A1B9A" distance={30} decay={2} />
          <pointLight position={[0, 18, 14]} intensity={2.0} color="#BA68C8" distance={26} decay={2} />
          
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
      
      {/* Fade overlays for seamless blending - responsive */}
      <div className={`absolute inset-0 pointer-events-none z-10 ${
        screenSize.width < 768 
          ? 'bg-gradient-to-b from-black/30 via-transparent to-black/30' // Much lighter on mobile
          : 'bg-gradient-to-b from-black via-transparent to-black/70'
      }`} />
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent pointer-events-none z-10 ${
        screenSize.width < 768 ? 'h-10' : 'h-40' // Much smaller fade on mobile
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
    
    // Moving metallic highlights with different speeds for realistic intertwining
    const highlightSpeed1 = time * 1.0 // First rope speed
    const highlightSpeed2 = time * 1.4 // Second rope faster speed for intertwining effect
    const highlightAngle1 = highlightSpeed1 // First rope highlights
    const highlightAngle2 = highlightSpeed2 + Math.PI * 0.5 // 90° offset with different speed
    
    const radius = screenSize.width < 768 ? 1.2 : 1.5 // Adjusted radius to match new rope spacing
    const height = Math.sin(time * 0.4) * (screenSize.width < 768 ? 1.5 : 2) // Dynamic height for winding motion
    
    // Simple lighting that follows the animated rope positions
    const intertwineSpeed = time * 0.8
    
    // Follow first rope's animated position
    const rope1Angle = intertwineSpeed
    const rope1Radius = 1.5
    const rope1X = Math.cos(rope1Angle) * rope1Radius
    const rope1Z = Math.sin(rope1Angle) * rope1Radius * 0.5
    
    // Follow second rope's animated position
    const rope2Angle = -intertwineSpeed + Math.PI
    const rope2X = Math.cos(rope2Angle) * rope1Radius
    const rope2Z = Math.sin(rope2Angle) * rope1Radius * 0.5
    
    // Lights follow the animated rope positions
    if (light1Ref.current) {
      light1Ref.current.position.set(
        rope1X, // Follow first rope X
        2, // Above the rope
        rope1Z + 1 // Slightly offset Z
      )
    }
    
    if (light2Ref.current) {
      light2Ref.current.position.set(
        rope1X + 2, // Offset along rope
        1,
        rope1Z - 1
      )
    }
    
    if (light3Ref.current) {
      light3Ref.current.position.set(
        rope2X, // Follow second rope X
        2, // Above the rope
        rope2Z + 1
      )
    }
    
    if (light4Ref.current) {
      light4Ref.current.position.set(
        rope2X - 2, // Offset along rope
        1,
        rope2Z - 1
      )
    }
  })

  return (
    <>
      {/* White metallic highlights for deep purple rope */}
      <pointLight 
        ref={light1Ref}
        intensity={5.0}
        color="#FFFFFF" // Pure white metallic highlight
        distance={12}
        decay={2}
      />
      <pointLight 
        ref={light2Ref}
        intensity={4.5}
        color="#F8F8FF" // Ghost white with purple hint
        distance={11}
        decay={2}
      />
      
      {/* Purple-gold highlights for pinkish-purple rope */}
      <pointLight 
        ref={light3Ref}
        intensity={4.2}
        color="#DDA0DD" // Plum purple highlight
        distance={12}
        decay={2}
      />
      <pointLight 
        ref={light4Ref}
        intensity={3.8}
        color="#FFD700" // Gold accent highlight
        distance={10}
        decay={2}
      />
    </>
  )
}

function BraidedRopeMesh({ screenSize }: { screenSize: { width: number; height: number } }) {
  const meshRef1 = useRef<Mesh>(null!)
  const meshRef2 = useRef<Mesh>(null!)
  const hitAreaRef = useRef<Mesh>(null!)
  const mouseDown = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const velocity = useRef({ x: 0, y: 0 })
  const autoRotateSpeed = useRef({ x: 0, y: 0.015 })
  const momentumActive = useRef(false)

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
      // Create unified rope with one thread wrapping around the other
      
      if (this.offset === 0) {
        // First rope: Core rope (straight with slight wave)
        const waveAmplitude = 0.1
        const x = (t - 0.5) * this.height // Horizontal progression
        const y = Math.sin(t * Math.PI * 4 + this.time) * waveAmplitude // Gentle wave
        const z = 0 // Core stays centered
        
        return optionalTarget.set(x, y, z)
      } else {
        // Second rope: Wrapping thread around the core
        const coreX = (t - 0.5) * this.height // Follow core rope position
        const coreY = Math.sin(t * Math.PI * 4 + this.time) * 0.1
        
        // Wrapping motion around the core
        const wrapAngle = this.time * 2 + t * Math.PI * 12 // Continuous wrapping
        const wrapRadius = this.radius * 0.3 // Small radius around core
        
        const x = coreX + Math.cos(wrapAngle) * wrapRadius * 0.5 // X offset from core
        const y = coreY + Math.sin(wrapAngle) * wrapRadius // Y offset from core
        const z = Math.sin(wrapAngle + Math.PI * 0.5) * wrapRadius * 0.8 // Z wrapping around core
        
        // Fade at ends
        const startFadeLength = 0.15
        const endFadeLength = 0.20
        
        let fadeMultiplier = 1
        if (t < startFadeLength) {
          fadeMultiplier = t / startFadeLength
        } else if (t > (1 - endFadeLength)) {
          fadeMultiplier = (1 - t) / endFadeLength
        }
        
        return optionalTarget.set(
          x * fadeMultiplier,
          y * fadeMultiplier, 
          z * fadeMultiplier
        )
      }
    }

    // Method to update animation time
    updateTime(time: number) {
      this.time = time
    }
  }

  // Create two rope strands - close braided ropes like before
  const getRopeScale = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        return { 
          radius: 0.8, // Restore close braiding radius
          height: 18 // Restore original height
        }
      }
      if (window.innerWidth < 1024) {
        return { 
          radius: 0.7,
          height: 22 // Restore tablet dimensions
        }
      }
    }
    return { 
      radius: 0.8, 
      height: 26 // Restore desktop dimensions
    }
  }
  
  const ropeScale = getRopeScale()
  const curve1 = useRef(new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 4.0, 0, 1, 0)) // Core rope
  const curve2 = useRef(new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 4.0, Math.PI, 1, 0)) // Wrapping thread (offset for wrapping)
  
  const tubeRadius = 0.30 // Reduced thickness by 5px equivalent
  const radialSegments = 24 // More segments for smoother, rounded edges
  const tubularSegments = 150 // Higher detail for smooth braiding

  // Create refs for geometries that will be updated
  const geometry1 = useRef(new TubeGeometry(curve1.current, tubularSegments, tubeRadius, radialSegments, false))
  const geometry2 = useRef(new TubeGeometry(curve2.current, tubularSegments, tubeRadius, radialSegments, false))

  // Create a larger invisible sphere for hit detection
  const hitAreaGeometry = new SphereGeometry(8, 16, 16)

  const onPointerDown = (e: any) => {
    e.stopPropagation()
    mouseDown.current = true
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
    lastUpdateTime.current = performance.now()
    momentumActive.current = false

    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId)
    }

    document.body.style.cursor = "grabbing"
  }

  const onPointerUp = (e: any) => {
    e.stopPropagation()
    mouseDown.current = false

    if (Math.abs(velocity.current.x) > 0.001 || Math.abs(velocity.current.y) > 0.001) {
      momentumActive.current = true

      if (Math.abs(velocity.current.y) > 0.01) {
        autoRotateSpeed.current.y = Math.sign(velocity.current.y) * 0.015
      }
    }

    if (e.target.releasePointerCapture) {
      e.target.releasePointerCapture(e.pointerId)
    }

    document.body.style.cursor = "grab"
  }

  const onPointerMove = (e: any) => {
    e.stopPropagation()

    if (!mouseDown.current) return

    const currentTime = performance.now()
    const deltaTime = currentTime - lastUpdateTime.current

    const currentPosition = { x: e.clientX, y: e.clientY }
    const deltaX = currentPosition.x - lastMousePosition.current.x
    const deltaY = currentPosition.y - lastMousePosition.current.y

    // Apply rotation to both rope strands
    if (meshRef1.current && meshRef2.current) {
      meshRef1.current.rotation.y += deltaX * 0.01
      meshRef1.current.rotation.x += deltaY * 0.01
      meshRef2.current.rotation.y += deltaX * 0.01
      meshRef2.current.rotation.x += deltaY * 0.01
    }

    if (deltaTime > 0) {
      velocity.current.x = (deltaX / deltaTime) * 0.5
      velocity.current.y = (deltaY / deltaTime) * 0.5
    }

    lastMousePosition.current = currentPosition
    lastUpdateTime.current = currentTime
  }

  useFrame((state, delta) => {
    if (!meshRef1.current || !meshRef2.current || !hitAreaRef.current) return

    const time = state.clock.getElapsedTime()

    // Update curve animations - smooth continuous motion like canvas example
    const animationSpeed = time * 0.5 // Matches the 0.02 increment from canvas example
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

    // Sync the hit area position
    hitAreaRef.current.position.copy(meshRef1.current.position)

    // Keep ropes in fixed positions as one unified rope - no individual movement
    // The wrapping motion is built into the curve geometry itself
    meshRef1.current.position.set(0, 0, 0) // Core rope stays centered
    meshRef2.current.position.set(0, 0, 0) // Wrapping thread at same position
    
    // Reset rotations to let the curve geometry handle the wrapping
    meshRef1.current.rotation.set(0, 0, 0)
    meshRef2.current.rotation.set(0, 0, 0)

    // Apply momentum after release (only for additional rotation, not rope animation)
    if (momentumActive.current) {
      meshRef1.current.rotation.y += velocity.current.x
      meshRef1.current.rotation.x += velocity.current.y
      meshRef2.current.rotation.y += velocity.current.x
      meshRef2.current.rotation.x += velocity.current.y

      velocity.current.x *= 0.97
      velocity.current.y *= 0.97

      if (Math.abs(velocity.current.x) < 0.001 && Math.abs(velocity.current.y) < 0.001) {
        momentumActive.current = false
      }
    }
    
    // Elastic stretching motion - less springy, more natural stretch
    const stretchY = Math.sin(time * 0.18) * 0.25 + Math.sin(time * 0.35) * 0.1 // Slower, more elastic
    const elasticScaleY = 1 + Math.sin(time * 0.22) * 0.08 + Math.cos(time * 0.15) * 0.04 // Vertical stretch
    const elasticScaleXZ = 1 - Math.sin(time * 0.22) * 0.02 // Slight horizontal compression when stretching vertically
    
    // Apply elastic movement - stretch up and down naturally
    meshRef1.current.position.y = stretchY
    meshRef2.current.position.y = stretchY
    meshRef1.current.scale.set(elasticScaleXZ, elasticScaleY, elasticScaleXZ)
    meshRef2.current.scale.set(elasticScaleXZ, elasticScaleY, elasticScaleXZ)
  })

  return (
    <>
      {/* Invisible hit area for easier interaction */}
      <mesh
        ref={hitAreaRef}
        geometry={hitAreaGeometry}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
        visible={false}
      >
        <meshBasicMaterial opacity={0} transparent />
      </mesh>

      {/* First Rope Strand - Deep Purple with white metallic highlights */}
      <mesh
        ref={meshRef1}
        geometry={geometry1.current}
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
        rotation={[0, Math.PI / 4, 0]} // 45 degrees base rotation
        position={[
          -6, // Start from left side for diagonal rope
          0, // Keep same Y position under title
          0
        ]}
      >
        <meshStandardMaterial
          color="#6A1B9A" // Rich deep purple
          metalness={0.95} // High metallic for white metallic sheen
          roughness={0.02} // Very smooth for metallic finish
          emissive="#4A148C" // Purple emissive glow
          emissiveIntensity={0.15}
          transparent={true}
          opacity={0.6} // Reduced opacity to stay in background
          alphaTest={0.05}
          blending={2} // Additive blending for intersection effects
          depthWrite={false}
        />
      </mesh>

      {/* Second Rope Strand - Dark Pinkish-Purple with gold accents */}
      <mesh
        ref={meshRef2}
        geometry={geometry2.current}
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
        rotation={[0, Math.PI / 4, 0]} // 45 degrees base rotation
        position={[
          -6, // Start from left side for diagonal rope
          0, // Keep same Y position under title
          0
        ]}
      >
        <meshStandardMaterial
          color="#8E24AA" // Dark pinkish-purple
          metalness={0.90} // High metallic with slight gold influence
          roughness={0.05}
          emissive="#AD1457" // Pink-purple emissive
          emissiveIntensity={0.12}
          transparent={true}
          opacity={0.55} // Reduced opacity for background positioning
          alphaTest={0.05}
          blending={2}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}