'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, MeshTransmissionMaterial } from '@react-three/drei'
import { Vector3, Curve, TubeGeometry, type Mesh, SphereGeometry } from 'three'
import DevXEnvironment from '@/components/3d/DevXEnvironment'

interface DNAHelixAnimationProps {
  className?: string
}

export default function DNAHelixAnimation({ className = '' }: DNAHelixAnimationProps) {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Prevent scrolling when interacting with the canvas
  useEffect(() => {
    if (!containerRef.current) return

    const preventDefault = (e: Event) => {
      e.preventDefault()
    }

    const container = containerRef.current
    container.addEventListener('wheel', preventDefault, { passive: false })
    container.addEventListener('touchmove', preventDefault, { passive: false })

    return () => {
      container.removeEventListener('wheel', preventDefault)
      container.removeEventListener('touchmove', preventDefault)
    }
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full touch-none"
        style={{
          cursor: 'grab',
          touchAction: 'none',
        }}
      >
        <Canvas
          shadows
          style={{ width: '100%', height: '100%' }}
          onContextMenu={(e) => e.preventDefault()}
          camera={{ position: [8, 0, 12], fov: 45 }}
        >
          <PerspectiveCamera makeDefault position={[8, 0, 12]} />
          <DevXEnvironment variant="studio" intensity={1.3} />
          <ambientLight intensity={0.3} />

          {/* Enhanced lighting for purple/gold metallic ropes */}
          <directionalLight
            castShadow
            position={[22, 32, 18]}
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

          {/* Key lights for purple rope highlights */}
          <spotLight
            position={[32, 22, 32]}
            angle={0.18}
            penumbra={1}
            intensity={2.6}
            castShadow
            color="#FFFFFF"
          />
          <spotLight
            position={[-32, 22, 32]}
            angle={0.18}
            penumbra={1}
            intensity={2.4}
            castShadow
            color="#E6E6FA"
          />

          {/* Fill lights for purple and gold enhancement */}
          <pointLight
            position={[14, 10, 22]}
            intensity={2.4}
            color="#9C27B0"
            distance={32}
            decay={2}
          />
          <pointLight
            position={[-14, -10, 22]}
            intensity={2.2}
            color="#4A148C"
            distance={30}
            decay={2}
          />
          <pointLight
            position={[0, 18, 14]}
            intensity={2.0}
            color="#FFD700"
            distance={26}
            decay={2}
          />

          {/* White and gold metallic shininess accent lights */}
          <pointLight
            position={[24, 6, -10]}
            intensity={2.8}
            color="#FFFFFF"
            distance={42}
            decay={3}
          />
          <pointLight
            position={[-24, 6, -10]}
            intensity={2.8}
            color="#FFFACD"
            distance={42}
            decay={3}
          />

          {/* Additional highlights for metallic effect */}
          <pointLight
            position={[0, -12, 28]}
            intensity={1.8}
            color="#DDA0DD"
            distance={22}
            decay={2}
          />
          <pointLight
            position={[16, 28, 6]}
            intensity={1.6}
            color="#F0F8FF"
            distance={34}
            decay={2}
          />

          {/* Enhanced rim lighting for purple/gold edges */}
          <pointLight
            position={[-10, 2, -16]}
            intensity={2.0}
            color="#DA70D6"
            distance={38}
            decay={3}
          />
          <pointLight
            position={[10, 2, -16]}
            intensity={2.0}
            color="#FFF8DC"
            distance={38}
            decay={3}
          />

          <DNAHelixMesh />
        </Canvas>
      </div>

      {/* Fade overlays for seamless blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/70 pointer-events-none z-10" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
    </div>
  )
}

function DNAHelixMesh() {
  const meshRef1 = useRef<Mesh>(null!)
  const meshRef2 = useRef<Mesh>(null!)
  const hitAreaRef = useRef<Mesh>(null!)
  const mouseDown = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const velocity = useRef({ x: 0, y: 0 })
  const autoRotateSpeed = useRef({ x: 0, y: 0.015 })
  const momentumActive = useRef(false)

  // Smooth Metallic Rope Helix Curve with fading ends
  class SmoothMetallicRopeHelixCurve extends Curve<Vector3> {
    constructor(
      public radius = 3.2,
      public height = 16,
      public twists = 3.2,
      public offset = 0,
      public slant = 1.0,
      public flowFactor = 0.8
    ) {
      super()
    }

    getPoint(t: number, optionalTarget = new Vector3()) {
      // Water-like fluid rope formula with meaningful intertwining
      const angle = this.twists * 2 * Math.PI * t + this.offset

      // Create graceful flowing movement
      const heightPos = (t - 0.5) * this.height
      const slantOffset = heightPos * this.slant * 0.35

      // Water-like flowing waves that strengthen through intertwining
      const waterWave1 = Math.sin(t * Math.PI * 2.5) * this.flowFactor * (0.8 + t * 0.4) // Grows stronger
      const waterWave2 = Math.cos(t * Math.PI * 1.8) * (this.flowFactor * 0.7) * (0.6 + t * 0.6) // Intensifies
      const waterWave3 = Math.sin(t * Math.PI * 4.2) * (this.flowFactor * 0.4) * (0.5 + t * 0.8) // Strengthens

      const dynamicRadius = this.radius + waterWave1 + waterWave2 + waterWave3

      // Fluid flow with strengthening effect as ropes intertwine
      const fluidFlow =
        Math.sin(t * Math.PI * 1.0) * (0.4 + t * 0.3) +
        Math.cos(t * Math.PI * 0.5) * (0.2 + t * 0.2)

      // Water-like undulation that increases with intertwining
      const fluidUndulation = Math.sin(t * Math.PI * 5.5) * (0.1 + t * 0.08)

      // Enhanced fade effect with strengthening center
      const fadeMultiplier = Math.sin(t * Math.PI) * (0.7 + Math.sin(t * Math.PI * 2) * 0.3)

      const x = (Math.cos(angle) * dynamicRadius + slantOffset + fluidUndulation) * fadeMultiplier
      const y = heightPos - fluidFlow
      const z = (Math.sin(angle) * dynamicRadius + fluidUndulation * 0.3) * fadeMultiplier

      return optionalTarget.set(x, y, z)
    }
  }

  // Create tightly wound infinity loop ropes - intertwined like DNA
  const curve1 = new SmoothMetallicRopeHelixCurve(2.2, 16, 6.0, 0, 0.4, 0.3) // Main visible rope
  const curve2 = new SmoothMetallicRopeHelixCurve(2.2, 16, 6.0, Math.PI, 0.4, 0.3) // Shadow rope - opposite phase for tight winding

  const tubeRadius = 0.18 // Thinner for rope-like appearance
  const radialSegments = 12 // Lower segments for rope texture
  const tubularSegments = 180 // Optimized for rope detail

  const tubeGeometry1 = new TubeGeometry(curve1, tubularSegments, tubeRadius, radialSegments, false)
  const tubeGeometry2 = new TubeGeometry(curve2, tubularSegments, tubeRadius, radialSegments, false)

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

    document.body.style.cursor = 'grabbing'
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

    document.body.style.cursor = 'grab'
  }

  const onPointerMove = (e: any) => {
    e.stopPropagation()

    if (!mouseDown.current) return

    const currentTime = performance.now()
    const deltaTime = currentTime - lastUpdateTime.current

    const currentPosition = { x: e.clientX, y: e.clientY }
    const deltaX = currentPosition.x - lastMousePosition.current.x
    const deltaY = currentPosition.y - lastMousePosition.current.y

    // Apply rotation to both strands
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

    // Sync the hit area position
    hitAreaRef.current.position.copy(meshRef1.current.position)
    hitAreaRef.current.rotation.copy(meshRef1.current.rotation)

    // Apply momentum after release
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
    // Apply auto-rotation when not being dragged
    else if (!mouseDown.current) {
      // Water-like fluid motion - main rope and shadow move together
      meshRef1.current.rotation.y += autoRotateSpeed.current.y * 0.4
      meshRef2.current.rotation.y += autoRotateSpeed.current.y * 0.42 // Very close sync for unity

      // Fluid flowing physics like water currents
      const time = state.clock.getElapsedTime()
      const fluidMovement1 = Math.sin(time * 0.12) * 0.004 + Math.sin(time * 0.35) * 0.002
      const fluidMovement2 = Math.sin(time * 0.13) * 0.0035 + Math.sin(time * 0.36) * 0.0018 // Slightly different for shadow

      meshRef1.current.rotation.x += fluidMovement1
      meshRef2.current.rotation.x += fluidMovement2

      // Water-like intertwining motion - strengthening effect
      meshRef1.current.rotation.z += Math.sin(time * 0.1) * 0.003 + Math.cos(time * 0.28) * 0.0015
      meshRef2.current.rotation.z += Math.sin(time * 0.11) * 0.0025 + Math.cos(time * 0.29) * 0.0012
    }

    // Water-like fluid breathing and strengthening animation
    const time = state.clock.getElapsedTime()

    // Main rope - visible and strong
    const mainRopeScale = 1 + Math.sin(time * 0.2) * 0.01 + Math.sin(time * 0.35) * 0.006
    const mainFloatY = Math.sin(time * 0.22) * 0.35 + Math.sin(time * 0.48) * 0.12
    const mainRopeFlow = 1 + Math.sin(time * 0.12) * 0.008

    // Shadow rope - subtle and supportive
    const shadowRopeScale = 1 + Math.sin(time * 0.21) * 0.008 + Math.sin(time * 0.36) * 0.004
    const shadowFloatY = Math.sin(time * 0.23) * 0.32 + Math.sin(time * 0.49) * 0.1
    const shadowRopeFlow = 1 + Math.sin(time * 0.13) * 0.006

    meshRef1.current.scale.set(mainRopeScale, mainRopeScale * mainRopeFlow, mainRopeScale)
    meshRef2.current.scale.set(shadowRopeScale, shadowRopeScale * shadowRopeFlow, shadowRopeScale)

    meshRef1.current.position.y = mainFloatY
    meshRef2.current.position.y = shadowFloatY * 0.95 // Shadow follows closely

    // Unified flowing motion - ropes move together for strength
    const unifiedFlowX = Math.sin(time * 0.25) * 0.14 + Math.cos(time * 0.16) * 0.07
    const unifiedFlowZ = Math.cos(time * 0.38) * 0.1 + Math.sin(time * 0.22) * 0.05

    // Main rope position
    meshRef1.current.position.x = unifiedFlowX
    meshRef1.current.position.z = unifiedFlowZ

    // Shadow rope position - identical for tight intertwining
    meshRef2.current.position.x = unifiedFlowX
    meshRef2.current.position.z = unifiedFlowZ
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

      {/* Rope Helix Strand 1 */}
      <mesh
        ref={meshRef1}
        geometry={tubeGeometry1}
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <meshStandardMaterial
          color="#4A148C"
          metalness={0.9}
          roughness={0.1}
          emissive="#2A0845"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Rope Helix Strand 2 */}
      <mesh
        ref={meshRef2}
        geometry={tubeGeometry2}
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <meshStandardMaterial
          color="#1A0329"
          metalness={0.8}
          roughness={0.15}
          emissive="#0F011A"
          emissiveIntensity={0.2}
          transparent={true}
          opacity={0.7}
        />
      </mesh>
    </>
  )
}
