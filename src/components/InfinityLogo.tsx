"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, PerspectiveCamera, MeshTransmissionMaterial } from "@react-three/drei"
import { Vector3, Curve, TubeGeometry, type Mesh, SphereGeometry } from "three"

export default function InfinityLogo() {
  const [isMounted, setIsMounted] = useState(false)
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
  }, [])

  if (!isMounted) return null

  return (
    <div className="w-full h-[40vh] flex justify-center items-center overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full h-full touch-none"
        style={{
          cursor: "grab",
          touchAction: "none",
        }}
      >
        <Canvas shadows style={{ width: "100%", height: "100%" }} onContextMenu={(e) => e.preventDefault()}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[5, 10, 5]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={1} castShadow color="#CCFF00" />
          <pointLight position={[3, 2, 3]} intensity={2} color="#CCFF00" distance={15} decay={2} />
          <pointLight position={[-3, -2, 4]} intensity={1.5} color="#4CD787" distance={12} decay={2} />

          <InfinityMesh />
        </Canvas>
      </div>
    </div>
  )
}

function InfinityMesh() {
  const meshRef = useRef<Mesh>(null!)
  const hitAreaRef = useRef<Mesh>(null!)
  const mouseDown = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const velocity = useRef({ x: 0, y: 0 })
  const autoRotateSpeed = useRef({ x: 0, y: 0.02 })
  const momentumActive = useRef(false)

  class InfinityCurve extends Curve<Vector3> {
    constructor(
      public width = 3.5,
      public height = 3.5,
      public zOffset = 0.2,
    ) {
      super()
    }

    getPoint(t: number, optionalTarget = new Vector3()) {
      const angle = 2 * Math.PI * t
      const x = (Math.sin(angle) * this.width) / (1 + Math.cos(angle) * Math.cos(angle))
      const y = (Math.cos(angle) * Math.sin(angle) * this.height) / (1 + Math.cos(angle) * Math.cos(angle))
      const z = Math.sin(2 * angle) * this.zOffset
      return optionalTarget.set(x, y, z)
    }
  }

  const curve = new InfinityCurve(3.5, 3.5, 0.2)
  const tubeRadius = 0.4
  const radialSegments = 64
  const tubularSegments = 256

  const tubeGeometry = new TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, false)

  // Create a larger invisible sphere for hit detection
  const hitAreaGeometry = new SphereGeometry(5, 16, 16)

  const onPointerDown = (e: any) => {
    e.stopPropagation()
    mouseDown.current = true
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
    lastUpdateTime.current = performance.now()
    momentumActive.current = false

    // Ensure we capture the pointer for reliable dragging
    if (e.target.setPointerCapture) {
      e.target.setPointerCapture(e.pointerId)
    }

    // Change cursor style
    document.body.style.cursor = "grabbing"
  }

  const onPointerUp = (e: any) => {
    e.stopPropagation()
    mouseDown.current = false

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
    document.body.style.cursor = "grab"
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
    if (!meshRef.current || !hitAreaRef.current) return

    // Sync the hit area position with the infinity mesh
    hitAreaRef.current.position.copy(meshRef.current.position)
    hitAreaRef.current.rotation.copy(meshRef.current.rotation)

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

      {/* Actual infinity mesh */}
      <mesh
        ref={meshRef}
        geometry={tubeGeometry}
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={0.5}
          chromaticAberration={0.1}
          anisotropy={0.5}
          distortion={0.2}
          distortionScale={0.1}
          temporalDistortion={0.1}
          metalness={0.9}
          roughness={0.1}
          color="#CCFF00"
          attenuationDistance={0.5}
          attenuationColor="#4CD787"
          envMapIntensity={2}
          iridescence={0.3}
          iridescenceIOR={1}
          iridescenceThicknessRange={[100, 700]}
        />
      </mesh>
    </>
  )
}
