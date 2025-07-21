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
          minHeight: screenSize.width < 768 ? '400px' : '500px', // Ensure minimum height on mobile
          backgroundColor: 'transparent',
        }}
      >
        <Canvas 
          shadows 
          style={{ width: "100%", height: "100%" }} 
          onContextMenu={(e) => e.preventDefault()}
          camera={{ 
            position: screenSize.width < 768 
              ? [0, 0, 8] // Much closer, centered view for mobile
              : screenSize.width < 1024 
                ? [4, 0, 10] // Medium view for tablet
                : [8, 0, 12], // Default view for desktop
            fov: screenSize.width < 768 ? 70 : 45 // Much wider FOV for mobile
          }}
        >
          <PerspectiveCamera 
            makeDefault 
            position={screenSize.width < 768 
              ? [0, 0, 8] // Much closer, centered view for mobile
              : screenSize.width < 1024 
                ? [4, 0, 10] // Medium view for tablet
                : [8, 0, 12] // Default view for desktop
            } 
            fov={screenSize.width < 768 ? 70 : 45}
          />
          <Environment preset="studio" />
          <ambientLight intensity={0.3} />
          
          {/* Enhanced lighting for braided ropes - adjusted direction */}
          <directionalLight
            castShadow
            position={[35, 28, 25]}
            intensity={2.8}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={75}
            shadow-camera-left={-16}
            shadow-camera-right={16}
            shadow-camera-top={16}
            shadow-camera-bottom={-16}
            color="#F5F5F5"
          />
          
          {/* Key lights for rope highlights - rotated light sources */}
          <spotLight position={[38, 25, 28]} angle={0.18} penumbra={1} intensity={2.6} castShadow color="#FFFFFF" />
          <spotLight position={[-25, 30, 35]} angle={0.18} penumbra={1} intensity={2.4} castShadow color="#E6E6FA" />
          
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
    
    // Moving white highlights that follow rope spiral motion
    const highlightAngle1 = time * 0.5 // Matches rope animation speed
    const highlightAngle2 = time * 0.5 + Math.PI // 180° offset for second rope
    
    const radius = screenSize.width < 768 ? 1.5 : 1.8 // Much smaller radius to match tighter ropes
    const height = Math.sin(time * 0.3) * (screenSize.width < 768 ? 1.5 : 2) // Reduced height variation for mobile
    
    // First set of moving highlights for first rope
    if (light1Ref.current) {
      light1Ref.current.position.set(
        Math.cos(highlightAngle1) * radius,
        height + 2,
        Math.sin(highlightAngle1) * radius
      )
    }
    
    if (light2Ref.current) {
      light2Ref.current.position.set(
        Math.cos(highlightAngle1 + Math.PI) * radius,
        height - 2,
        Math.sin(highlightAngle1 + Math.PI) * radius
      )
    }
    
    // Second set of moving highlights for second rope (with pinkish tint)
    if (light3Ref.current) {
      light3Ref.current.position.set(
        Math.cos(highlightAngle2) * radius,
        height + 1,
        Math.sin(highlightAngle2) * radius
      )
    }
    
    if (light4Ref.current) {
      light4Ref.current.position.set(
        Math.cos(highlightAngle2 + Math.PI) * radius,
        height - 1,
        Math.sin(highlightAngle2 + Math.PI) * radius
      )
    }
  })

  return (
    <>
      {/* Moving white highlights for first rope */}
      <pointLight 
        ref={light1Ref}
        intensity={3.5}
        color="#FFFFFF"
        distance={8}
        decay={2}
      />
      <pointLight 
        ref={light2Ref}
        intensity={3.2}
        color="#F8F8FF"
        distance={8}
        decay={2}
      />
      
      {/* Moving pinkish-white highlights for second rope */}
      <pointLight 
        ref={light3Ref}
        intensity={3.0}
        color="#FFE4E6"
        distance={8}
        decay={2}
      />
      <pointLight 
        ref={light4Ref}
        intensity={2.8}
        color="#FDF2F8"
        distance={7}
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
      // Perfect helix motion like the canvas example but in 3D with elastic stretch
      // Both ropes follow same helical path but with phase offset
      const spiralAngle = this.time * 2 + this.offset + t * Math.PI * 8 // 4 full rotations like the example
      
      // Elastic height variation - rope stretches and compresses naturally
      const elasticStretch = 1 + Math.sin(this.time * 0.22) * 0.15 + Math.cos(this.time * 0.15) * 0.08
      const dynamicHeight = this.height * elasticStretch
      
      // Height progression from top to bottom with elastic stretching
      const heightPos = (dynamicHeight / 2) - (t * dynamicHeight)
      
      // Radius varies with stretch - much tighter overall
      const stretchRadius = this.radius * (1 - Math.sin(this.time * 0.22) * 0.05)
      
      // Use elliptical pattern to reduce side-to-side spread
      const ellipseFactorX = 0.6 // Compress horizontally
      const ellipseFactorZ = 1.0 // Keep full depth
      
      const x = Math.cos(spiralAngle) * stretchRadius * ellipseFactorX
      const z = Math.sin(spiralAngle) * stretchRadius * ellipseFactorZ
      
      // Subtle rope texture variation with elastic movement
      const textureVariation = Math.sin(t * Math.PI * 12 + this.time * 0.5) * 0.015
      
      // Smooth ends with elastic fade
      const endFade = Math.sin(t * Math.PI) * 0.98 + 0.02
      
      return optionalTarget.set(
        x * endFade + textureVariation,
        heightPos,
        z * endFade
      )
    }

    // Method to update animation time
    updateTime(time: number) {
      this.time = time
    }
  }

  // Create two rope strands - responsive sizing with tighter radius
  const getRopeScale = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return { radius: 1.2, height: 16 } // Mobile - much tighter
      if (window.innerWidth < 1024) return { radius: 1.0, height: 16 } // Tablet - tighter
    }
    return { radius: 1.1, height: 18 } // Desktop - tighter
  }
  
  const ropeScale = getRopeScale()
  const curve1 = useRef(new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 4.0, 0, 1, 0)) // First rope
  const curve2 = useRef(new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 4.0, Math.PI, 1, 0)) // Second rope, 180° offset
  
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

    // Remove global Y-axis rotation - let the spiral motion show naturally
    // The helix motion is built into the curves, no additional rotation needed
    meshRef1.current.rotation.y = 0
    meshRef2.current.rotation.y = 0

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

      {/* First Rope Strand - Purple with animated white highlights */}
      <mesh
        ref={meshRef1}
        geometry={geometry1.current}
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
        rotation={[Math.PI / 9, Math.PI / 9, 0]}
        position={[
          screenSize.width < 768 ? 0 : 1.5, // Centered on mobile
          0, 
          0
        ]}
      >
        <meshStandardMaterial
          color="#4A148C"
          metalness={screenSize.width < 768 ? 0.8 : 0.95}
          roughness={screenSize.width < 768 ? 0.2 : 0.05}
          emissive="#2A0845"
          emissiveIntensity={screenSize.width < 768 ? 0.4 : 0.2}
          transparent={true}
          opacity={screenSize.width < 768 ? 0.9 : 0.75} // More opaque on mobile
          alphaTest={0.05}
          blending={screenSize.width < 768 ? 1 : 2} // Normal blending on mobile
          depthWrite={screenSize.width < 768 ? true : false} // Enable depth write on mobile
        />
      </mesh>

      {/* Second Rope Strand - Purple with subtle pinkish hints and animated highlights */}
      <mesh
        ref={meshRef2}
        geometry={geometry2.current}
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
        rotation={[Math.PI / 9, Math.PI / 9, 0]}
        position={[
          screenSize.width < 768 ? 0 : 1.5, // Centered on mobile
          0, 
          0
        ]}
      >
        <meshStandardMaterial
          color="#5A1F6B"
          metalness={screenSize.width < 768 ? 0.8 : 0.92}
          roughness={screenSize.width < 768 ? 0.2 : 0.08}
          emissive="#3D1A47"
          emissiveIntensity={screenSize.width < 768 ? 0.4 : 0.18}
          transparent={true}
          opacity={screenSize.width < 768 ? 0.85 : 0.70} // More opaque on mobile
          alphaTest={0.05}
          blending={screenSize.width < 768 ? 1 : 2} // Normal blending on mobile
          depthWrite={screenSize.width < 768 ? true : false} // Enable depth write on mobile
        />
      </mesh>
    </>
  )
}