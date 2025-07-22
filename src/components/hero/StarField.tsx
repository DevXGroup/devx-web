"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { AdditiveBlending } from "three"

// Enhanced starfield with magical twinkling stars
export default function EnhancedStarfield({ viewport }: { viewport: { width: number; height: number } }) {
  return (
    <>
      {/* Enhanced twinkling background stars */}
      <SimpleStarLayer count={2000} viewport={viewport} />
    </>
  )
}

// Enhanced star layer with realistic twinkling effect
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
      speeds[i] = 0.1 + Math.random() * 0.5 // More varied, faster twinkling
    }
    return speeds
  }).current()

  const starColors = useRef(() => {
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Slight color variation for realism - mostly white with subtle blue/yellow tints
      const colorVariation = Math.random()
      if (colorVariation < 0.7) {
        // Pure white stars (70%)
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 1.0
        colors[i * 3 + 2] = 1.0
      } else if (colorVariation < 0.85) {
        // Slightly blue-white stars (15%)
        colors[i * 3] = 0.9 + Math.random() * 0.1
        colors[i * 3 + 1] = 0.95 + Math.random() * 0.05
        colors[i * 3 + 2] = 1.0
      } else {
        // Slightly yellow-white stars (15%)
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.95 + Math.random() * 0.05
        colors[i * 3 + 2] = 0.85 + Math.random() * 0.1
      }
    }
    return colors
  }).current()

  const starSizes = useRef(() => {
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // More varied star sizes with some larger bright stars
      const sizeRandom = Math.random()
      if (sizeRandom < 0.8) {
        // Small stars (80%)
        sizes[i] = 0.015 + Math.random() * 0.025
      } else if (sizeRandom < 0.95) {
        // Medium stars (15%)
        sizes[i] = 0.04 + Math.random() * 0.03
      } else {
        // Large bright stars (5%)
        sizes[i] = 0.07 + Math.random() * 0.04
      }
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
        
        // Enhanced twinkling with multiple wave patterns for more realistic effect
        const primaryTwinkle = (Math.sin(time) + 1) / 2
        const secondaryTwinkle = (Math.sin(time * 1.7 + phase * 0.5) + 1) / 2
        const tertiaryTwinkle = (Math.sin(time * 0.3 + phase * 1.2) + 1) / 2
        
        // Combine waves for complex twinkling pattern
        const combinedTwinkle = (primaryTwinkle * 0.5 + secondaryTwinkle * 0.3 + tertiaryTwinkle * 0.2)
        
        // More dramatic alpha variation with occasional bright flashes
        const baseAlpha = 0.4 + combinedTwinkle * 0.6
        const flashChance = Math.random()
        const finalAlpha = flashChance < 0.001 ? Math.min(1.0, baseAlpha + 0.4) : baseAlpha
        
        alphaAttribute.setX(i, finalAlpha)
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
          array={new Float32Array(count).fill(0.7)}
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
            // Dynamic point size with better scaling
            gl_PointSize = max(1.0, size * (300.0 / -mvPosition.z));
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
            
            // Create a more star-like shape with cross pattern
            vec2 centered = uv - center;
            float cross1 = abs(centered.x) < 0.05 ? 1.0 : 0.0;
            float cross2 = abs(centered.y) < 0.05 ? 1.0 : 0.0;
            float crossPattern = max(cross1, cross2);
            
            // Main star body with soft falloff
            float starCore = smoothstep(0.5, 0.1, dist);
            
            // Outer glow
            float glow = smoothstep(0.5, 0.0, dist) * 0.3;
            
            // Combine core, cross pattern, and glow
            float finalStar = max(starCore + crossPattern * starCore, glow);
            
            // Add subtle sparkle effect
            float sparkle = step(0.98, sin(dist * 50.0)) * 0.2;
            finalStar += sparkle * starCore;
            
            gl_FragColor = vec4(vColor, finalStar * vAlpha);
          }
        `}
      />
    </points>
  )
}
