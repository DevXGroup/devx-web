"use client"

import { useState } from "react"
import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PerspectiveCamera, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"
import DevXEnvironment from "./DevXEnvironment"

// Create an infinity curve using a parametric formula
class InfinityCurve extends THREE.Curve<THREE.Vector3> {
  constructor(
    public width = 3.0,
    public height = 2.5, // Increased height to make the infinity sign wider vertically
    public zOffset = 0.2,
  ) {
    super()
  }

  getPoint(t: number, optionalTarget = new THREE.Vector3()) {
    const angle = 2 * Math.PI * t
    const x = (Math.sin(angle) * this.width) / (1 + Math.cos(angle) * Math.cos(angle))
    const y = (Math.cos(angle) * Math.sin(angle) * this.height) / (1 + Math.cos(angle) * Math.cos(angle))
    const z = Math.sin(2 * angle) * this.zOffset
    return optionalTarget.set(x, y, z)
  }
}

// Create a custom shader material for light beams with faded edges
const LightBeamMaterial = ({ color, opacity = 0.07 }: { color: string; opacity?: number }) => {
  // Create a custom shader material that fades from center to edges
  const uniforms = {
    color: { value: new THREE.Color(color) },
    opacity: { value: opacity },
  }

  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `}
      fragmentShader={`
        uniform vec3 color;
        uniform float opacity;
        varying vec2 vUv;
        void main() {
          // Calculate distance from center line (horizontal center)
          float distance = abs(vUv.y - 0.5) * 2.0;
          
          // Create a gradient that fades out toward the edges
          float alpha = opacity * (1.0 - pow(distance, 1.5));
          
          // Fade out at the ends too (horizontal fade)
          float horizontalFade = 1.0 - pow(abs(vUv.x - 0.5) * 2.0, 0.5);
          alpha *= horizontalFade;
          
          gl_FragColor = vec4(color, alpha);
        }
      `}
      transparent={true}
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  )
}

function InfinityMesh() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<any>(null!)
  const ray1Ref = useRef<THREE.Mesh>(null!)
  const ray2Ref = useRef<THREE.Mesh>(null!)
  const ray3Ref = useRef<THREE.Mesh>(null!)
  const ray4Ref = useRef<THREE.Mesh>(null!)
  const ray5Ref = useRef<THREE.Mesh>(null!)
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  // Parameters for a refined infinity shape
  const curve = new InfinityCurve(2.2, 2.0, 0.2) // Increased height for wider vertical appearance
  const tubeRadius = isMobile ? 0.15 : 0.2
  const radialSegments = 64
  const tubularSegments = 128

  const tubeGeometry = new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, false)

  // Color transition values
  const colorA = new THREE.Color("#CCFF00") // Logo color (robinhood)
  const colorB = new THREE.Color("#4CD787") // Secondary color
  const colorC = new THREE.Color("#4834D4") // Third color for transition

  // Rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      // Faster spinning animation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.08

      // Apply scale with enhanced effect
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.05)

      // Update material opacity
      if (meshRef.current.material) {
        // Color transition animation
        const t = (Math.sin(state.clock.elapsedTime * 0.3) + 1) / 2 // Value between 0-1

        // Create smooth color transitions
        let currentColor: THREE.Color
        if (t < 0.33) {
          // Transition from colorA to colorB
          const normalizedT = t / 0.33
          currentColor = new THREE.Color().lerpColors(colorA, colorB, normalizedT)
        } else if (t < 0.66) {
          // Transition from colorB to colorC
          const normalizedT = (t - 0.33) / 0.33
          currentColor = new THREE.Color().lerpColors(colorB, colorC, normalizedT)
        } else {
          // Transition from colorC to colorA
          const normalizedT = (t - 0.66) / 0.34
          currentColor = new THREE.Color().lerpColors(colorC, colorA, normalizedT)
        }
        // Apply the color
        ;(meshRef.current.material as any).color = currentColor
        ;(meshRef.current.material as any).attenuationColor = currentColor
      }
    }

    // Animate rays
    if (ray1Ref.current) {
      ray1Ref.current.rotation.z = state.clock.elapsedTime * 0.15
    }

    if (ray2Ref.current) {
      ray2Ref.current.rotation.z = -state.clock.elapsedTime * 0.2
    }

    if (ray3Ref.current) {
      ray3Ref.current.rotation.z = state.clock.elapsedTime * 0.25
    }

    if (ray4Ref.current) {
      ray4Ref.current.rotation.z = -state.clock.elapsedTime * 0.17
    }

    if (ray5Ref.current) {
      ray5Ref.current.rotation.z = state.clock.elapsedTime * 0.22
    }
  })

  return (
    <group>
      <mesh ref={meshRef} geometry={tubeGeometry} castShadow receiveShadow>
        <MeshTransmissionMaterial
          ref={materialRef}
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
          color="#CCFF00" // Start with logo color
          attenuationDistance={0.5}
          attenuationColor="#CCFF00"
          envMapIntensity={2}
          transparent
        />
      </mesh>

      {/* Light rays with custom shader material for better edge fading */}
      <mesh ref={ray1Ref} position={[0, 0, -2]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[50, 0.7]} /> {/* Thinner width */}
        <LightBeamMaterial color="#CCFF00" opacity={0.07} />
      </mesh>

      <mesh ref={ray2Ref} position={[0, 0, -2]} rotation={[0, 0, -Math.PI / 4]}>
        <planeGeometry args={[50, 0.6]} /> {/* Thinner width */}
        <LightBeamMaterial color="#4CD787" opacity={0.05} />
      </mesh>

      <mesh ref={ray3Ref} position={[0, 0, -2]} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[50, 0.5]} /> {/* Thinner width */}
        <LightBeamMaterial color="#9d4edd" opacity={0.06} />
      </mesh>

      {/* Additional rays for more coverage */}
      <mesh ref={ray4Ref} position={[0, 0, -2]} rotation={[0, 0, Math.PI / 6]}>
        <planeGeometry args={[50, 0.4]} /> {/* Thinner width */}
        <LightBeamMaterial color="#4834D4" opacity={0.08} />
      </mesh>

      <mesh ref={ray5Ref} position={[0, 0, -2]} rotation={[0, 0, -Math.PI / 6]}>
        <planeGeometry args={[50, 0.5]} /> {/* Thinner width */}
        <LightBeamMaterial color="#FFD700" opacity={0.07} />
      </mesh>
    </group>
  )
}

export default function InfinityLoader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? (
    <div className="w-full h-[30vh] lg:h-[40vh] flex items-center justify-center overflow-hidden">
      <div className="w-full absolute left-0 right-0">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
          <DevXEnvironment variant="studio" intensity={1.2} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow color="#CCFF00" />
          <InfinityMesh />
        </Canvas>
      </div>
    </div>
  ) : null
}
