'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { Vector3, Curve, TubeGeometry, type Mesh, SphereGeometry } from 'three'

interface BraidedRopeAnimationProps {
  className?: string
}

export default function BraidedRopeAnimation({ className = '' }: BraidedRopeAnimationProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Screen size detection
  const isMobile = screenSize.width < 768
  const isTablet = screenSize.width >= 768 && screenSize.width < 1024

  // Prevent scrolling when interacting with the canvas
  useEffect(() => {
    if (!containerRef.current) return

    const preventDefault = (e: Event) => {
      // Only prevent if we're actually dragging
      if (e.target && (e.target as HTMLElement).closest('canvas')) {
        e.preventDefault()
      }
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

    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)

    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  if (!isMounted) return null

  return (
    <div className={`w-full h-full overflow-hidden ${className}`} suppressHydrationWarning={true}>
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
        style={{
          cursor: 'grab',
          touchAction: 'pan-y',
          backgroundColor: 'transparent',
          pointerEvents: 'auto',
        }}
      >
        <Canvas
          shadows
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
          onContextMenu={(e) => e.preventDefault()}
          camera={{
            position: [0, isMobile ? -0.5 : 0, isMobile ? 8 : isTablet ? 7 : 6],
            fov: isMobile ? 65 : isTablet ? 70 : 65,
          }}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, isMobile ? 8 : isTablet ? 7 : 6]}
            fov={isMobile ? 75 : isTablet ? 70 : 65}
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

          <spotLight
            position={[15, 12, 15]}
            angle={0.25}
            penumbra={1}
            intensity={1.2}
            castShadow
            color="#FFFFFF"
          />
          <spotLight
            position={[-15, 15, 20]}
            angle={0.25}
            penumbra={1}
            intensity={1.0}
            castShadow
            color="#E6E6FA"
          />

          <pointLight
            position={[8, 6, 12]}
            intensity={1.2}
            color="#9C27B0"
            distance={20}
            decay={2}
          />
          <pointLight
            position={[-8, -6, 12]}
            intensity={1.0}
            color="#6A1B9A"
            distance={18}
            decay={2}
          />
          <pointLight
            position={[0, 10, 8]}
            intensity={0.8}
            color="#BA68C8"
            distance={15}
            decay={2}
          />

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
            color="#E1BEE7"
            distance={42}
            decay={3}
          />

          <pointLight
            position={[0, -12, 28]}
            intensity={1.8}
            color="#CE93D8"
            distance={22}
            decay={2}
          />
          <pointLight
            position={[16, 28, 6]}
            intensity={1.6}
            color="#F3E5F5"
            distance={34}
            decay={2}
          />

          <pointLight
            position={[-10, 2, -16]}
            intensity={2.0}
            color="#AB47BC"
            distance={38}
            decay={3}
          />
          <pointLight
            position={[10, 2, -16]}
            intensity={2.0}
            color="#F8BBD9"
            distance={38}
            decay={3}
          />

          <AnimatedHighlights screenSize={screenSize} />

          <BraidedRopeMesh containerRef={containerRef} isMobile={isMobile} isTablet={isTablet} />
        </Canvas>
      </div>

      {/* Simplified overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent pointer-events-none z-10 h-48" />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pointer-events-none z-10 h-48" />
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

    const baseRadius = 0.7
    const helixSpeed = time * 1.6
    const helixRadius = baseRadius * 1.1

    if (light1Ref.current) {
      const helixAngle = helixSpeed
      const spiralX = Math.cos(helixAngle) * helixRadius
      const spiralY = Math.sin(helixAngle * 0.5) * 0.15
      const spiralZ = Math.sin(helixAngle) * helixRadius

      light1Ref.current.position.set(spiralX, 4 + spiralY, spiralZ)
    }

    if (light2Ref.current) {
      const helixAngle = helixSpeed + Math.PI / 3
      const spiralX = Math.cos(helixAngle) * helixRadius
      const spiralY = Math.sin(helixAngle * 0.5) * 0.15
      const spiralZ = Math.sin(helixAngle) * helixRadius

      light2Ref.current.position.set(spiralX, 2 + spiralY, spiralZ)
    }

    if (light3Ref.current) {
      const helixAngle = helixSpeed + Math.PI
      const spiralX = Math.cos(helixAngle) * helixRadius
      const spiralY = Math.sin(helixAngle * 0.5) * 0.15
      const spiralZ = Math.sin(helixAngle) * helixRadius

      light3Ref.current.position.set(spiralX, 3 + spiralY, spiralZ)
    }

    if (light4Ref.current) {
      const helixAngle = helixSpeed + Math.PI + Math.PI / 3
      const spiralX = Math.cos(helixAngle) * helixRadius
      const spiralY = Math.sin(helixAngle * 0.5) * 0.15
      const spiralZ = Math.sin(helixAngle) * helixRadius

      light4Ref.current.position.set(spiralX, 1 + spiralY, spiralZ)
    }
  })

  return (
    <>
      <pointLight ref={light1Ref} intensity={2.0} color="#FFFFFF" distance={4} decay={3} />
      <pointLight ref={light2Ref} intensity={1.6} color="#F8F8FF" distance={4} decay={3} />

      <pointLight ref={light3Ref} intensity={1.8} color="#E1BEE7" distance={4} decay={3} />
      <pointLight ref={light4Ref} intensity={1.4} color="#CE93D8" distance={3.5} decay={3} />
    </>
  )
}

function BraidedRopeMesh({
  containerRef,
  isMobile,
  isTablet,
}: {
  containerRef: React.RefObject<HTMLDivElement>
  isMobile: boolean
  isTablet: boolean
}) {
  const meshRef1 = useRef<Mesh>(null!)
  const meshRef2 = useRef<Mesh>(null!)
  const hitAreaRef = useRef<Mesh>(null!)
  const mouseDown = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const velocity = useRef({ x: 0, y: 0 })
  const autoRotateSpeed = useRef({ x: 0, y: 10.15 })
  const momentumActive = useRef(false)

  class BraidedRopeCurve extends Curve<Vector3> {
    constructor(
      public radius = 2.0,
      public height = 16,
      public twists = 3.0,
      public offset = 0,
      public direction = 1,
      public time = 0,
      public isMoving = true
    ) {
      super()
    }

    getPoint(t: number, optionalTarget = new Vector3()) {
      const verticalProgress = this.height / 2 - t * this.height

      // Enhanced braiding effect with better helix parameters
      const helixTurns = 4.5
      const timeMultiplier = this.direction > 0 ? 8 : -10 // More distinct counter-rotation
      const helixAngle =
        this.time * timeMultiplier + t * Math.PI * helixTurns * this.direction + this.offset
      const helixRadius = this.radius * 1.4

      const x = Math.cos(helixAngle) * helixRadius
      const z = Math.sin(helixAngle) * helixRadius

      // Simple fading at ends
      let fadeMultiplier = 1
      const fadeStart = 0.1
      const fadeEnd = 0.9
      if (t < fadeStart) {
        fadeMultiplier = t / fadeStart
      } else if (t > fadeEnd) {
        fadeMultiplier = (1 - t) / (1 - fadeEnd)
      }

      return optionalTarget.set(x * fadeMultiplier, verticalProgress, z * fadeMultiplier)
    }

    updateTime(time: number) {
      this.time = time
    }
  }

  // Responsive scaling based on screen size

  const ropeScale = {
    radius: 0.4,
    height: 8,
  }

  // Create two helical threads rotating in opposite directions with enhanced braiding
  const curve1 = useRef(
    new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 8.0, 0, 1, 0, true)
  ) // Clockwise
  const curve2 = useRef(
    new BraidedRopeCurve(ropeScale.radius, ropeScale.height, 6.0, Math.PI, -1, 0, true) // Counter-clockwise
  )

  const tubeRadius = 0.19
  const radialSegments = 24
  const tubularSegments = 49

  // Update curves with new scale and enhanced braiding parameters
  curve1.current.radius = ropeScale.radius
  curve1.current.height = ropeScale.height
  curve1.current.direction = 1
  curve1.current.offset = 0
  curve2.current.radius = ropeScale.radius
  curve2.current.height = ropeScale.height
  curve2.current.direction = -1
  curve2.current.offset = Math.PI / 2

  const geometry1 = useRef(
    new TubeGeometry(curve1.current, tubularSegments, tubeRadius, radialSegments, false)
  )
  const geometry2 = useRef(
    new TubeGeometry(curve2.current, tubularSegments, tubeRadius, radialSegments, false)
  )

  const hitAreaRadius = 5
  const hitAreaGeometry = new SphereGeometry(hitAreaRadius, 16, 16)

  const onPointerDown = (e: any) => {
    e.stopPropagation()
    mouseDown.current = true
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
    lastUpdateTime.current = performance.now()
    momentumActive.current = false

    if (e.target && e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId)
    }

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing'
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

    if (e.target && e.target.releasePointerCapture) {
      e.target.releasePointerCapture(e.pointerId)
    }

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab'
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

  useFrame((state) => {
    if (!meshRef1.current || !meshRef2.current || !hitAreaRef.current) return

    hitAreaRef.current.position.copy(meshRef1.current.position)
    hitAreaRef.current.rotation.copy(meshRef1.current.rotation)

    const time = state.clock.getElapsedTime()

    // Update geometry for better braiding animation
    if (Math.floor(time * 60) % 3 === 0) {
      const animationSpeed = time * 0.3
      curve1.current.updateTime(animationSpeed)
      curve2.current.updateTime(animationSpeed)

      const newGeometry1 = new TubeGeometry(
        curve1.current,
        tubularSegments,
        tubeRadius,
        radialSegments,
        false
      )
      const newGeometry2 = new TubeGeometry(
        curve2.current,
        tubularSegments,
        tubeRadius,
        radialSegments,
        false
      )

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
    const stretchY = Math.sin(time * 0.18) * 0.2 + Math.sin(time * 0.35) * 0.08
    const elasticScaleY = 1 + Math.sin(time * 0.22) * 0.06 + Math.cos(time * 0.15) * 0.03
    const elasticScaleXZ = 1 - Math.sin(time * 0.22) * 0.015 * 3

    const baseY1 = isMobile ? 2 : 3
    const baseY2 = isMobile ? 2.2 : 3.2
    meshRef1.current.position.y = baseY1 + stretchY
    meshRef2.current.position.y = baseY2 + stretchY
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
        rotation={[0, 0, Math.PI / 4]}
        position={[0, isMobile ? 2 : 3, 0]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <meshStandardMaterial
          color="#8E24AA"
          metalness={0.95}
          roughness={0.05}
          emissive="#6A1B9A"
          emissiveIntensity={0.3}
          transparent={true}
          opacity={0.7}
          alphaTest={0.05}
          blending={2}
          depthWrite={false}
        />
      </mesh>

      <mesh
        ref={meshRef2}
        geometry={geometry2.current}
        castShadow
        receiveShadow
        rotation={[0, 0, Math.PI / 4]}
        position={[0, isMobile ? 2.2 : 3.2, 0]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <meshStandardMaterial
          color="#4A148C"
          metalness={0.92}
          roughness={0.08}
          emissive="#2E0A3E"
          emissiveIntensity={0.28}
          transparent={true}
          opacity={0.6}
          alphaTest={0.05}
          blending={2}
          depthWrite={false}
        />
      </mesh>
    </>
  )
}
