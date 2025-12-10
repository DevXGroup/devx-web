'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePerformanceOptimizedAnimation } from '@/hooks/use-performance-optimized-animation'

type BlackHole3DProps = {
  enabled?: boolean
}

function AccretionDisk() {
  const pointsRef = useRef<THREE.Points>(null)

  // Restored dense ring from previous version for a brighter hero focal point
  const particles = useMemo(() => {
    const count = 3200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorInside = new THREE.Color('#ffffff')
    const colorMiddle = new THREE.Color('#c0c0cb')
    const colorOutside = new THREE.Color('#4a4a55')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = 1.5 + Math.random() * 3.5 + Math.random() * 1.5
      const angle = Math.random() * Math.PI * 2

      positions[i3] = Math.cos(angle) * r
      positions[i3 + 1] = (Math.random() - 0.5) * 0.15 * (r * 0.5)
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
    pointsRef.current.rotation.y = time * 0.02
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
        size={0.056}
        vertexColors
        transparent
        opacity={0.64}
        sizeAttenuation
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

    groupRef.current.rotation.x = 0.4 + Math.sin(time * 0.18) * 0.04
    groupRef.current.rotation.y = 0
    groupRef.current.position.y = -0.5 + Math.sin(time * 0.12) * 0.1
  })

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      <AccretionDisk />
    </group>
  )
}

export default function BlackHole3D({ enabled = true }: BlackHole3DProps) {
  const { shouldSkip3dEffects, isSlowCpu, isLowPower } = usePerformanceOptimizedAnimation()

  if (!enabled || shouldSkip3dEffects) {
    return (
      <div className="w-full h-full relative pointer-events-none" style={{ minHeight: '240px' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_60%)]" />
        <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-amber-200/20 via-emerald-200/10 to-purple-300/15 blur-3xl" />
        <div className="absolute inset-[30%] rounded-full bg-black/80 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.6)]" />
      </div>
    )
  }

  const dpr: [number, number] = isSlowCpu || isLowPower ? [1, 1.1] : [1, 1.35]

  return (
    <div className="w-full h-full relative pointer-events-none" style={{ minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 3]} intensity={1.4} color="#fef3c7" />
        <Scene />
      </Canvas>
    </div>
  )
}
