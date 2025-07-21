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

  if (!isMounted) return null

  return (
    <div className={`absolute w-full overflow-hidden ${className}`} style={{ top: '-100px', height: '80vh' }}>
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{
          minHeight: 'calc(80vh + 100px)',
          backgroundColor: 'transparent',
          cursor: "grab",
          touchAction: "none",
        }}
      >
        <Canvas 
          shadows 
          style={{ width: "100%", height: "100%" }}
          onContextMenu={(e) => e.preventDefault()}
          camera={{ 
            position: [0, 0, 6], // Desktop camera for all sizes
            fov: 65 // Desktop FOV for all sizes
          }}
        >
          <PerspectiveCamera 
            makeDefault 
            position={[0, 0, 6]} // Desktop camera for all sizes
            fov={65} // Desktop FOV for all sizes
          />
          <Environment preset="studio" />
          <ambientLight intensity={0.3} />
          
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
          
          <spotLight position={[15, 12, 15]} angle={0.25} penumbra={1} intensity={1.2} castShadow color="#FFFFFF" />
          <spotLight position={[-15, 15, 20]} angle={0.25} penumbra={1} intensity={1.0} castShadow color="#E6E6FA" />
          
          <pointLight position={[8, 6, 12]} intensity={1.2} color="#9C27B0" distance={20} decay={2} />
          <pointLight position={[-8, -6, 12]} intensity={1.0} color="#6A1B9A" distance={18} decay={2} />
          <pointLight position={[0, 10, 8]} intensity={0.8} color="#BA68C8" distance={15} decay={2} />
          
          <pointLight position={[24, 6, -10]} intensity={2.8} color="#FFFFFF" distance={42} decay={3} />
          <pointLight position={[-24, 6, -10]} intensity={2.8} color="#E1BEE7" distance={42} decay={3} />
          
          <pointLight position={[0, -12, 28]} intensity={1.8} color="#CE93D8" distance={22} decay={2} />
          <pointLight position={[16, 28, 6]} intensity={1.6} color="#F3E5F5" distance={34} decay={2} />
          
          <pointLight position={[-10, 2, -16]} intensity={2.0} color="#AB47BC" distance={38} decay={3} />
          <pointLight position={[10, 2, -16]} intensity={2.0} color="#F8BBD9" distance={38} decay={3} />

          <AnimatedHighlights screenSize={screenSize} />

          <BraidedRopeMesh screenSize={screenSize} />
        </Canvas>
      </div>
      
      <div className={`absolute inset-0 pointer-events-none z-10 ${
        screenSize.width < 768 
          ? 'bg-gradient-to-b from-black/60 via-transparent to-black/60'
          : 'bg-gradient-to-b from-black/80 via-transparent to-black/80'
      }`} />
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent pointer-events-none z-10 ${
        screenSize.width < 768 ? 'h-16' : 'h-48'
      }`} />
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pointer-events-none z-10 ${
        screenSize.width < 768 ? 'h-16' : 'h-48'
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
    
    const baseRadius = 0.7 // Desktop base radius for all sizes
    const helixSpeed = time * 1.6 // Match updated rope speed
    const helixRadius = baseRadius * 1.1 // Match updated rope radius
    
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
  const hitAreaRef = useRef<Mesh>(null!)
  const mouseDown = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const velocity = useRef({ x: 0, y: 0 })
  const autoRotateSpeed = useRef({ x: 0, y: 0.015 })
  const momentumActive = useRef(false)

  class BraidedRopeCurve extends Curve<Vector3> {
    constructor(
      public radius = 2.0,
      public height = 16,
      public twists = 3.0,
      public offset = 0,
      public direction = 1,
      public time = 0
    ) {
      super()
    }

    getPoint(t: number, optionalTarget = new Vector3()) {
      const verticalProgress = (this.height / 2) - (t * this.height)
      
      // Cleaner helix parameters
      const helixTurns = 4.5 // Slightly fewer turns for smoother motion
      const helixAngle = this.time * 1.6 + t * Math.PI * helixTurns * this.direction + this.offset
      
      const helixRadius = this.radius * 1.1 // Slightly tighter for cleaner look
      
      const x = Math.cos(helixAngle) * helixRadius
      const y = verticalProgress + Math.sin(helixAngle * 0.3) * 0.12 // Subtler vertical wave
      const z = Math.sin(helixAngle) * helixRadius
      
      let fadeMultiplier = 1
      
      const fadeStart = 0.12
      const fadeEnd = 0.88
      if (t < fadeStart) {
        const normalized = t / fadeStart
        fadeMultiplier = normalized * normalized * (3 - 2 * normalized)
      } else if (t > fadeEnd) {
        const normalized = (1 - t) / (1 - fadeEnd)
        fadeMultiplier = normalized * normalized * (3 - 2 * normalized)
      }
      
      return optionalTarget.set(
        x * fadeMultiplier,
        y,
        z * fadeMultiplier
      )
    }

    updateTime(time: number) {
      this.time = time
    }
  }

  const getRopeScale = () => {
    // Unified rope scale - desktop version for all sizes
    return { radius: 0.7, height: 12 }
  }
  
  const ropeScale = getRopeScale()
  const curve1 = useRef(new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 4.0, 0, 1, 0))
  const curve2 = useRef(new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 4.0, Math.PI, -1, 0))
  
  const tubeRadius = 0.3
  const radialSegments = 32
  const tubularSegments = 200

  const geometry1 = useRef(new TubeGeometry(curve1.current, tubularSegments, tubeRadius, radialSegments, false))
  const geometry2 = useRef(new TubeGeometry(curve2.current, tubularSegments, tubeRadius, radialSegments, false))

  const hitAreaGeometry = new SphereGeometry(5, 16, 16)

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

    hitAreaRef.current.position.copy(meshRef1.current.position)
    hitAreaRef.current.rotation.copy(meshRef1.current.rotation)

    const time = state.clock.getElapsedTime()

    // Optimize: Only update geometry every few frames for performance
    if (Math.floor(time * 60) % 2 === 0) {
      const animationSpeed = time * 0.45
      curve1.current.updateTime(animationSpeed)
      curve2.current.updateTime(animationSpeed)

      const newGeometry1 = new TubeGeometry(curve1.current, tubularSegments, tubeRadius, radialSegments, false)
      const newGeometry2 = new TubeGeometry(curve2.current, tubularSegments, tubeRadius, radialSegments, false)

      meshRef1.current.geometry.dispose()
      meshRef2.current.geometry.dispose()
      meshRef1.current.geometry = newGeometry1
      meshRef2.current.geometry = newGeometry2
    }

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

    // Enhanced natural rope movement
    const stretchY = Math.sin(time * 0.18) * 0.2 + Math.sin(time * 0.35) * 0.08 // Slightly less movement
    const elasticScaleY = 1 + Math.sin(time * 0.22) * 0.06 + Math.cos(time * 0.15) * 0.03 // More subtle
    const elasticScaleXZ = 1 - Math.sin(time * 0.22) * 0.015 // Cleaner scaling
    
    meshRef1.current.position.y = stretchY
    meshRef2.current.position.y = stretchY + 0.5
    meshRef1.current.scale.set(elasticScaleXZ, elasticScaleY, elasticScaleXZ)
    meshRef2.current.scale.set(elasticScaleXZ, elasticScaleY, elasticScaleXZ)
  })

  return (
    <>
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

      <mesh
        ref={meshRef1}
        geometry={geometry1.current}
        castShadow
        receiveShadow
        rotation={[0, 0, Math.PI / 6]}
        position={[
          0,
          2, // Desktop position for all sizes
          0
        ]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
        style={{ cursor: 'grab' }}
      >
        <meshStandardMaterial
          color="#6A1B9A"
          metalness={0.95} // Desktop metalness for all sizes
          roughness={0.05} // Desktop roughness for all sizes
          emissive="#4A148C"
          emissiveIntensity={0.25} // Desktop emissive for all sizes
          transparent={true}
          opacity={0.6} // Desktop opacity for all sizes
          alphaTest={0.05}
          blending={2} // Desktop blending for all sizes
          depthWrite={false} // Desktop depth write for all sizes
        />
      </mesh>

      <mesh
        ref={meshRef2}
        geometry={geometry2.current}
        castShadow
        receiveShadow
        rotation={[0, 0, Math.PI / 6]}
        position={[
          0,
          2.5, // Desktop position for all sizes
          0
        ]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
        style={{ cursor: 'grab' }}
      >
        <meshStandardMaterial
          color="#2E0A3E"
          metalness={0.92} // Desktop metalness for all sizes
          roughness={0.08} // Desktop roughness for all sizes
          emissive="#1A0624"
          emissiveIntensity={0.22} // Desktop emissive for all sizes
          transparent={true}
          opacity={0.5} // Desktop opacity for all sizes
          alphaTest={0.05}
          blending={2} // Desktop blending for all sizes
          depthWrite={false} // Desktop depth write for all sizes
        />
      </mesh>
    </>
  )
}