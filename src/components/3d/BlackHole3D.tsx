'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AccretionDisk() {
  const pointsRef = useRef<THREE.Points>(null)

  // Create particles for the accretion disk
  const particles = useMemo(() => {
    const count = 4000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Colors from user's preferred previous version
    const colorInside = new THREE.Color('#ffffff')
    const colorMiddle = new THREE.Color('#c0c0cb')
    const colorOutside = new THREE.Color('#4a4a55')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = 1.5 + Math.random() * 3.5 + Math.random() * 1.5
      const angle = Math.random() * Math.PI * 2

      positions[i3] = Math.cos(angle) * r
      positions[i3 + 1] = (Math.random() - 0.5) * 0.15 * (r * 0.5) // Slightly thicker for volume
      positions[i3 + 2] = Math.sin(angle) * r

      const mixedColor = new THREE.Color()
      if (r < 2.5) {
        mixedColor.lerpColors(colorInside, colorMiddle, r - 1.5)
      } else {
        mixedColor.lerpColors(colorMiddle, colorOutside, (r - 2.5) / 2.5)
      }

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    // Slow consistent rotation
    pointsRef.current.rotation.y = time * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07} // Large particles as requested
        vertexColors
        transparent
        opacity={0.64}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const time = state.clock.getElapsedTime()
    // Gentle tipping animation (rotation X) and slight floating (position Y)
    // "Tip goes down" = increasing X rotation slightly
    groupRef.current.rotation.x = 0.4 + Math.sin(time * 0.5) * 0.1
    // "Laterally down" / "Comes back out" - slight Y oscillation
    groupRef.current.position.y = Math.sin(time * 0.3) * 0.2
  })

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      <AccretionDisk />
    </group>
  )
}

export default function BlackHole3D() {
  return (
    <div className="w-full h-full relative pointer-events-none" style={{ minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
