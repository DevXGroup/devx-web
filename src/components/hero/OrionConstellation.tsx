'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, AdditiveBlending, Group } from 'three'
import type * as THREE from 'three'

// Orion constellation star data
// Based on the real Orion constellation with relative positions
const ORION_STARS = [
  // Belt stars (3 main stars)
  { name: 'Alnitak', position: [-8, 2, -10], brightness: 0.95, size: 0.18 },
  { name: 'Alnilam', position: [-6, 2, -10], brightness: 0.93, size: 0.16 },
  { name: 'Mintaka', position: [-4, 2, -10], brightness: 0.92, size: 0.15 },

  // Shoulders
  { name: 'Betelgeuse', position: [-9, 6, -10], brightness: 0.96, size: 0.22 },
  { name: 'Bellatrix', position: [-3, 6, -10], brightness: 0.89, size: 0.14 },

  // Feet
  { name: 'Rigel', position: [-3, -4, -10], brightness: 0.98, size: 0.25 },
  { name: 'Saiph', position: [-9, -4, -10], brightness: 0.87, size: 0.12 },

  // Head/Sword area stars
  { name: 'Head1', position: [-6, 9, -10], brightness: 0.85, size: 0.11 },

  // Sword stars (forming sword below belt)
  { name: 'Sword1', position: [-6, -1, -10], brightness: 0.82, size: 0.1 },
  { name: 'Sword2', position: [-5.8, -2.5, -10], brightness: 0.8, size: 0.09 },
  { name: 'Sword3', position: [-6.2, -2.5, -10], brightness: 0.81, size: 0.09 },

  // Faint stars to complete the constellation outline
  { name: 'Faint1', position: [-7, 4, -10], brightness: 0.75, size: 0.08 },
  { name: 'Faint2', position: [-5, 4, -10], brightness: 0.75, size: 0.08 },
  { name: 'Faint3', position: [-7.5, -1, -10], brightness: 0.73, size: 0.07 },
  { name: 'Faint4', position: [-4.5, -1, -10], brightness: 0.73, size: 0.07 },
]

export default function OrionConstellation() {
  return (
    <group position={[15, 0, 0]}>
      {/* Main constellation stars - more visible */}
      <OrionStars />
      {/* Connecting lines (visual guide) */}
      <ConstellationLines />
    </group>
  )
}

function OrionStars() {
  const groupRef = useRef<Group>(null!)

  const starData = useMemo(() => {
    return ORION_STARS.map((star) => ({
      position: star.position as [number, number, number],
      brightness: star.brightness,
      size: star.size,
      twinkleSpeed: 0.3 + Math.random() * 0.4,
      twinklePhase: Math.random() * Math.PI * 2,
      color: [1, 1, 1] as [number, number, number],
    }))
  }, [])

  return (
    <group ref={groupRef}>
      {starData.map((star, index) => (
        <OrionStar
          key={index}
          position={star.position}
          brightness={star.brightness}
          size={star.size}
          twinkleSpeed={star.twinkleSpeed}
          twinklePhase={star.twinklePhase}
          color={star.color}
        />
      ))}
    </group>
  )
}

function OrionStar({
  position,
  brightness,
  size,
  twinkleSpeed,
  twinklePhase,
  color,
}: {
  position: [number, number, number]
  brightness: number
  size: number
  twinkleSpeed: number
  twinklePhase: number
  color: [number, number, number]
}) {
  const starRef = useRef<Points>(null!)

  useFrame((state) => {
    if (starRef.current?.material) {
      const time = state.clock.elapsedTime * twinkleSpeed + twinklePhase
      // Subtle twinkling - stars don't vary too much in brightness
      const primaryTwinkle = (Math.sin(time) + 1) * 0.5
      const finalBrightness = brightness * (0.85 + primaryTwinkle * 0.15)

      const material = starRef.current.material as any
      if (material.uniforms?.uOpacity) {
        material.uniforms.uOpacity.value = finalBrightness
      }
    }
  })

  return (
    <group position={position}>
      <points ref={starRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0]), 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array([size * 25]), 1]} />
        </bufferGeometry>
        <shaderMaterial
          transparent
          blending={AdditiveBlending}
          depthWrite={false}
          vertexShader={`
            attribute float size;
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = size;
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            uniform vec3 uColor;
            uniform float uOpacity;

            void main() {
              vec2 center = vec2(0.5, 0.5);
              vec2 uv = gl_PointCoord.xy;
              float dist = distance(uv, center);

              // Create a bright star core with soft glow
              float starCore = smoothstep(0.5, 0.15, dist);
              float glow = smoothstep(0.6, 0.1, dist) * 0.6;
              float finalStar = max(starCore, glow);

              gl_FragColor = vec4(uColor, finalStar * uOpacity);
            }
          `}
          uniforms={{
            uColor: { value: color },
            uOpacity: { value: brightness },
          }}
        />
      </points>
    </group>
  )
}

// Draw constellation connection lines
function ConstellationLines() {
  const lineRef = useRef<any>(null!)

  const connections = useMemo(
    () => [
      // Belt (horizontal line)
      [0, 1],
      [1, 2],

      // Left shoulder to belt
      [3, 0],

      // Right shoulder to belt
      [4, 2],

      // Shoulders to head
      [3, 7],
      [4, 7],

      // Belt to feet
      [0, 6],
      [2, 5],

      // Feet connection
      [5, 6],

      // Sword from belt
      [1, 8],
      [8, 9],
      [8, 10],
    ],
    []
  )

  const positions = useMemo(() => {
    const pos: number[] = []
    connections.forEach(([start, end]) => {
      if (start !== undefined && end !== undefined) {
        const startStar = ORION_STARS[start]
        const endStar = ORION_STARS[end]
        if (startStar && endStar) {
          pos.push(...startStar.position, ...endStar.position)
        }
      }
    })
    return new Float32Array(pos)
  }, [connections])

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={0xffffff} transparent opacity={0.15} linewidth={1} fog={false} />
    </lineSegments>
  )
}
