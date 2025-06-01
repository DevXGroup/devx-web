"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { AdditiveBlending } from "three"

// Enhanced starfield with subtle twinkling stars only
export default function EnhancedStarfield({ viewport }: { viewport: { width: number; height: number } }) {
  return (
    <>
      {/* Simple twinkling background stars */}
      <SimpleStarLayer count={2000} viewport={viewport} />
    </>
  )
}

// Very simple star layer with minimal twinkling effect
function SimpleStarLayer({ count, viewport }: { count: number; viewport: { width: number; height: number } }) {
  const mesh = useRef<any>(null)

  const positions = useRef(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const spread = viewport.width > 768 ? 30 : 20
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10
    }
    return pos
  }).current()

  const twinklePhases = useRef(() => {
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      phases[i] = Math.random() * Math.PI * 2
    }
    return phases
  }).current()

  const twinkleSpeeds = useRef(() => {
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      speeds[i] = 0.02 + Math.random() * 0.08 // Very slow twinkling
    }
    return speeds
  }).current()

  const starColors = useRef(() => {
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // All white stars
      colors[i * 3] = 1.0
      colors[i * 3 + 1] = 1.0
      colors[i * 3 + 2] = 1.0
    }
    return colors
  }).current()

  const starSizes = useRef(() => {
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      sizes[i] = 0.02 + Math.random() * 0.03 // Very small sizes
    }
    return sizes
  }).current()

  useFrame((state) => {
    if (mesh.current) {
      const alphaAttribute = mesh.current.geometry.getAttribute("alpha")

      for (let i = 0; i < count; i++) {
        const phase = twinklePhases[i]
        const speed = twinkleSpeeds[i]
        const time = state.clock.getElapsedTime() * speed + phase
        const twinkleValue = (Math.sin(time) + 1) / 2

        // Very subtle alpha change - always visible, just slight brightness variation
        alphaAttribute.setX(i, 0.7 + twinkleValue * 0.3)
      }

      alphaAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={starColors} itemSize={3} />
        <bufferAttribute
          attach="attributes-alpha"
          count={count}
          array={new Float32Array(count).fill(0.8)}
          itemSize={1}
        />
        <bufferAttribute attach="attributes-size" count={count} array={starSizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        vertexShader={`
          attribute float alpha;
          attribute float size;
          attribute vec3 color;
          varying float vAlpha;
          varying vec3 vColor;
          
          void main() {
            vAlpha = alpha;
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            // Very small point size - maximum 1 pixel
            gl_PointSize = min(1.0, size * (200.0 / -mvPosition.z));
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vAlpha;
          varying vec3 vColor;
          
          void main() {
            vec2 center = vec2(0.5, 0.5);
            vec2 uv = gl_PointCoord.xy;
            float dist = distance(uv, center);
            
            // Simple soft point
            float star = smoothstep(0.5, 0.0, dist);
            
            gl_FragColor = vec4(vColor, star * vAlpha);
          }
        `}
      />
    </points>
  )
}
