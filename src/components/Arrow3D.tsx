"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, MeshTransmissionMaterial } from "@react-three/drei"
import { type Mesh, Shape, PerspectiveCamera } from "three"

function Arrow() {
  const meshRef = useRef<Mesh>(null!)
  const [rotationX, setRotationX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  useFrame((state) => {
    setRotationX(Math.PI / 2 + Math.sin(state.clock.elapsedTime * 3) * 0.15) // Increased speed and amplitude
    setPositionY(Math.sin(state.clock.elapsedTime * 3) * 0.15) // Increased speed and amplitude
  })

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.PI / 6
    }
  }, [])

  const arrowShape = new Shape()
  arrowShape.moveTo(0, 3) // Increased size
  arrowShape.lineTo(1.5, 0) // Increased size
  arrowShape.lineTo(0.75, 0) // Increased size
  arrowShape.lineTo(0.75, -3) // Increased size
  arrowShape.lineTo(-0.75, -3) // Increased size
  arrowShape.lineTo(-0.75, 0) // Increased size
  arrowShape.lineTo(-1.5, 0) // Increased size
  arrowShape.lineTo(0, 3) // Increased size

  const extrudeSettings = {
    steps: 2,
    depth: 1.5, // Increased depth
    bevelEnabled: true,
    bevelThickness: 0.25,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 16,
  }

  return (
    <mesh ref={meshRef} rotation={[rotationX, Math.PI / 6, 0]} position={[0, positionY, 0]} scale={[1.5, 1.5, 1.5]}>
      {" "}
      {/* Increased scale */}
      <extrudeGeometry args={[arrowShape, extrudeSettings]} />
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
        color="#4834D4"
        attenuationDistance={0.5}
        attenuationColor="#ffffff"
        envMapIntensity={2}
      />
    </mesh>
  )
}

export default function Arrow3D() {
  return (
    <div className="w-full h-60">
      {" "}
      {/* Increased height from h-40 to h-60 */}
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, -6, 9]} /> {/* Adjusted camera position */}
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Arrow />
      </Canvas>
    </div>
  )
}
