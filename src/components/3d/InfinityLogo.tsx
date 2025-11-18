'use client'

import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, MeshTransmissionMaterial } from '@react-three/drei'
import { Vector3, Curve, TubeGeometry, type Mesh, SphereGeometry } from 'three'
import DevXEnvironment from './DevXEnvironment'
import { useInView } from 'framer-motion'

export default function InfinityLogo() {
  const [isInteracting, setIsInteracting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { margin: '300px', once: false, amount: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Detect mobile for performance optimization and mark as ready
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        typeof window !== 'undefined' &&
          (window.innerWidth < 768 ||
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ))
      )
    }
    checkMobile()
    // Mark as ready immediately to prevent delayed rendering
    setIsReady(true)
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Only prevent scrolling when actively interacting with the 3D object
  useEffect(() => {
    if (!containerRef.current) return

    const preventDefault = (e: Event) => {
      if (isInteracting) {
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
  }, [isInteracting])

  return (
    <div className="w-full h-[40vh] flex justify-center items-center overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{
          cursor: 'grab',
        }}
      >
        {isReady && (
          <Canvas
            shadows={!isMobile} // Disable shadows on mobile for better performance
            style={{ width: '100%', height: '100%' }}
            onContextMenu={(e) => e.preventDefault()}
            gl={{
              preserveDrawingBuffer: false, // Disable for better performance
              antialias: !isMobile, // Disable antialiasing on mobile
              powerPreference: 'high-performance',
              alpha: true, // Enable transparency to show grid underneath
              stencil: false, // Disable stencil buffer for better performance
            }}
            dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
            frameloop={isInView ? 'always' : 'demand'}
            performance={{ min: 0.5 }} // Allow frame rate to drop if needed
          >
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <DevXEnvironment variant="studio" intensity={isMobile ? 0.8 : 1.2} />
          <ambientLight intensity={0.5} />
          {/* Reduced lighting complexity for better performance */}
          {!isMobile && (
            <>
              <directionalLight
                castShadow
                position={[5, 10, 5]}
                intensity={1.5}
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
              />
              <spotLight
                position={[10, 10, 10]}
                angle={0.25}
                penumbra={1}
                intensity={1}
                color="#CCFF00"
              />
            </>
          )}
          <pointLight position={[3, 2, 3]} intensity={2} color="#CCFF00" distance={15} decay={2} />
          <pointLight
            position={[-3, -2, 4]}
            intensity={1.5}
            color="#4CD787"
            distance={12}
            decay={2}
          />

          <InfinityMesh setIsInteracting={setIsInteracting} isMobile={isMobile} />
        </Canvas>
        )}
      </div>
    </div>
  )
}

class InfinityCurve extends Curve<Vector3> {
  constructor(
    public width = 3.5,
    public height = 3.5,
    public zOffset = 0.2
  ) {
    super()
  }

  getPoint(t: number, optionalTarget = new Vector3()) {
    const angle = 2 * Math.PI * t
    const x = (Math.sin(angle) * this.width) / (1 + Math.cos(angle) * Math.cos(angle))
    const y =
      (Math.cos(angle) * Math.sin(angle) * this.height) / (1 + Math.cos(angle) * Math.cos(angle))
    const z = Math.sin(2 * angle) * this.zOffset
    return optionalTarget.set(x, y, z)
  }
}

function InfinityMesh({
  setIsInteracting,
  isMobile,
}: {
  setIsInteracting: (value: boolean) => void
  isMobile: boolean
}) {
  const meshRef = useRef<Mesh>(null!)
  const hitAreaRef = useRef<Mesh>(null!)
  const mouseDown = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const velocity = useRef({ x: 0, y: 0 })
  const autoRotateSpeed = useRef({ x: 0, y: 0.02 })
  const momentumActive = useRef(false)

  // Optimized geometry with lower resolution on mobile
  const tubeGeometry = useMemo(() => {
    const tubeCurve = new InfinityCurve(3.5, 3.5, 0.2)
    const tubeTubeRadius = 0.4
    // Reduced segments for better performance - 50% reduction on mobile
    const tubeRadialSegments = isMobile ? 32 : 48 // Was 64
    const tubeTubularSegments = isMobile ? 128 : 192 // Was 256

    return new TubeGeometry(
      tubeCurve,
      tubeTubularSegments,
      tubeTubeRadius,
      tubeRadialSegments,
      false
    )
  }, [isMobile])

  const hitAreaGeometry = useMemo(() => {
    // Lower poly hit area - only needs to capture clicks
    return new SphereGeometry(5, 8, 8) // Was 16, 16
  }, [])

  const onPointerDown = (e: any) => {
    e.stopPropagation()
    mouseDown.current = true
    setIsInteracting(true)
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
    lastUpdateTime.current = performance.now()
    momentumActive.current = false

    // Ensure we capture the pointer for reliable dragging
    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId)
    }

    // Change cursor style
    document.body.style.cursor = 'grabbing'
  }

  const onPointerUp = (e: any) => {
    e.stopPropagation()
    mouseDown.current = false
    setIsInteracting(false)

    // Activate momentum based on final velocity
    if (Math.abs(velocity.current.x) > 0.001 || Math.abs(velocity.current.y) > 0.001) {
      momentumActive.current = true

      // Store the current velocity direction for auto-rotation
      if (Math.abs(velocity.current.y) > 0.01) {
        autoRotateSpeed.current.y = Math.sign(velocity.current.y) * 0.02
      }
    }

    // Release pointer capture
    if (e.target.releasePointerCapture) {
      e.target.releasePointerCapture(e.pointerId)
    }

    // Restore cursor style
    document.body.style.cursor = 'grab'
  }

  const onPointerMove = (e: any) => {
    e.stopPropagation()

    if (!mouseDown.current) return

    const currentTime = performance.now()
    const deltaTime = currentTime - lastUpdateTime.current

    // Calculate current position and movement
    const currentPosition = { x: e.clientX, y: e.clientY }
    const deltaX = currentPosition.x - lastMousePosition.current.x
    const deltaY = currentPosition.y - lastMousePosition.current.y

    // Apply direct rotation based on mouse movement
    meshRef.current.rotation.y += deltaX * 0.01
    meshRef.current.rotation.x += deltaY * 0.01

    // Calculate velocity (movement per millisecond)
    if (deltaTime > 0) {
      velocity.current.x = (deltaX / deltaTime) * 0.5 // Scale for better feel
      velocity.current.y = (deltaY / deltaTime) * 0.5
    }

    // Update last position and time
    lastMousePosition.current = currentPosition
    lastUpdateTime.current = currentTime
  }

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Removed redundant hit area syncing - hit area is now parented to mesh

    // Apply momentum after release (natural flick effect)
    if (momentumActive.current) {
      meshRef.current.rotation.y += velocity.current.x
      meshRef.current.rotation.x += velocity.current.y

      // Apply damping to gradually slow down
      velocity.current.x *= 0.95
      velocity.current.y *= 0.95

      // If velocity becomes very small, stop momentum but continue rotation in same direction
      if (Math.abs(velocity.current.x) < 0.001 && Math.abs(velocity.current.y) < 0.001) {
        momentumActive.current = false
      }
    }
    // Apply auto-rotation when not being dragged
    else if (!mouseDown.current) {
      // Continue rotating in the direction it was going
      meshRef.current.rotation.y += autoRotateSpeed.current.y

      // Very subtle x-axis movement
      meshRef.current.rotation.x += autoRotateSpeed.current.x
    }

    // Add subtle breathing animation
    const breathScale = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.03
    meshRef.current.scale.set(breathScale, breathScale, breathScale)
  })

  return (
    <>
      {/* Actual infinity mesh - main visual element */}
      <mesh
        ref={meshRef}
        geometry={tubeGeometry}
        castShadow={!isMobile}
        receiveShadow={!isMobile}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <MeshTransmissionMaterial
          backside
          // Reduced samples for better performance - 8 on mobile, 12 on desktop (was 16)
          samples={isMobile ? 6 : 10}
          thickness={0.5}
          chromaticAberration={isMobile ? 0.05 : 0.1}
          anisotropy={0.5}
          distortion={isMobile ? 0.1 : 0.2}
          distortionScale={0.1}
          temporalDistortion={isMobile ? 0.05 : 0.1}
          metalness={0.9}
          roughness={0.1}
          color="#CCFF00"
          attenuationDistance={0.5}
          attenuationColor="#4CD787"
          envMapIntensity={isMobile ? 1.5 : 2}
          iridescence={isMobile ? 0.2 : 0.3}
          iridescenceIOR={1}
          iridescenceThicknessRange={[100, 700]}
        />

        {/* Invisible hit area parented to mesh - no need to sync transforms */}
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
      </mesh>
    </>
  )
}
