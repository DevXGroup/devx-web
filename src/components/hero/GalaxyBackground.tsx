'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Lightweight galaxy with fewer stars and subtle spiral
function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null)
  const highlightRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 3200 // Lightweight base layer
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    // Palette closer to reference: warm white core to magenta edge
    const colorInside = new THREE.Color('#f5ebe7')
    const colorMiddle = new THREE.Color('#f7d5e6')
    const colorOutside = new THREE.Color('#eb0ecf')

    const branches = 2 // Minimal spiral to keep a disc silhouette
    const radius = 13
    const randomness = 1.2
    const randomnessPower = 3

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Position on spiral arm
      const armRadius = Math.random() * radius
      const branchAngle = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = armRadius * 0.05 // Nearly flat spiral for side-on readability

      // Randomness
      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        armRadius *
        0.5
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        0.03
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        armRadius *
        0.5

      positions[i3] = Math.cos(branchAngle + spinAngle) * armRadius + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * armRadius + randomZ

      // Color based on distance from center
      const colorMix = armRadius / radius
      const mixedColor = new THREE.Color()

      if (colorMix < 0.4) {
        mixedColor.lerpColors(colorInside, colorMiddle, colorMix * 2.5)
      } else {
        mixedColor.lerpColors(colorMiddle, colorOutside, (colorMix - 0.4) * 1.67)
      }

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [])

  const highlights = useMemo(() => {
    const count = 140 // Sparse bright stars
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const coreColor = new THREE.Color('#ffffff')
    const edgeColor = new THREE.Color('#f38dd8')
    const radius = 13

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const armRadius = Math.random() * radius
      const branchAngle = ((i % 2) / 2) * Math.PI * 2
      const spinAngle = armRadius * 0.03

      positions[i3] = Math.cos(branchAngle + spinAngle) * armRadius
      positions[i3 + 1] = (Math.random() - 0.5) * 0.2
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * armRadius

      const colorMix = armRadius / radius
      const mixedColor = new THREE.Color().lerpColors(coreColor, edgeColor, colorMix)
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const time = state.clock.getElapsedTime()
    // Slightly faster slow rotation to keep motion noticeable
    pointsRef.current.rotation.y = time * 0.05
    if (highlightRef.current) {
      highlightRef.current.rotation.y = time * 0.05
    }
  })

  return (
    <>
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
          size={0.048}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>

      <points ref={highlightRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={highlights.positions.length / 3}
            array={highlights.positions}
            itemSize={3}
            args={[highlights.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={highlights.colors.length / 3}
            array={highlights.colors}
            itemSize={3}
            args={[highlights.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </>
  )
}

function Scene() {
  return (
    <>
      {/* Side view tilt to show the disc silhouette */}
      <group rotation={[1.45, 0, 0]}>
        <Galaxy />
      </group>
      {/* Orbit controls for drag interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={false}
      />
    </>
  )
}

export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0">
      <Canvas
        camera={{ position: [0, 2.5, 18], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
