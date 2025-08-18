'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending } from 'three'

// Enhanced starfield with magical twinkling stars
export default function EnhancedStarfield({
  viewport,
}: {
  viewport: { width: number; height: number }
}) {
  return (
    <>
      {/* Enhanced twinkling background stars */}
      <SimpleStarLayer count={1800} viewport={viewport} />
      {/* Bright stars with diffraction spikes */}
      <BrightStarsLayer count={50} viewport={viewport} />
    </>
  )
}

// Enhanced star layer with realistic twinkling effect
function SimpleStarLayer({
  count,
  viewport,
}: {
  count: number
  viewport: { width: number; height: number }
}) {
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
      const alphaAttribute = mesh.current.geometry.getAttribute('alpha')

      for (let i = 0; i < count; i++) {
        const phase = twinklePhases[i] ?? 0
        const speed = twinkleSpeeds[i] ?? 0
        const time = state.clock.getElapsedTime() * speed + phase

        // Enhanced twinkling with multiple wave patterns for more realistic effect
        const primaryTwinkle = (Math.sin(time) + 1) / 2
        const secondaryTwinkle = (Math.sin(time * 1.7 + phase * 0.5) + 1) / 2
        const tertiaryTwinkle = (Math.sin(time * 0.3 + phase * 1.2) + 1) / 2

        // Combine waves for complex twinkling pattern
        const combinedTwinkle =
          primaryTwinkle * 0.5 + secondaryTwinkle * 0.3 + tertiaryTwinkle * 0.2

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
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        <bufferAttribute attach="attributes-alpha" args={[new Float32Array(count).fill(0.7), 1]} />
        <bufferAttribute attach="attributes-size" args={[starSizes, 1]} />
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

// Bright stars with realistic diffraction spikes
function BrightStarsLayer({
  count,
  viewport,
}: {
  count: number
  viewport: { width: number; height: number }
}) {
  const groupRef = useRef<any>(null)

  const starData = useRef(() => {
    const data = []
    for (let i = 0; i < count; i++) {
      const spread = viewport.width > 768 ? 35 : 25
      const brightness = 0.3 + Math.random() * 0.7 // Vary brightness
      const size = 0.1 + Math.random() * 0.15 // Larger sizes for bright stars

      data.push({
        position: [
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * 25 - 12,
        ] as [number, number, number],
        brightness,
        size,
        twinkleSpeed: 0.2 + Math.random() * 0.8,
        twinklePhase: Math.random() * Math.PI * 2,
        spikeRotation: Math.random() * Math.PI * 2,
        spikeRotationSpeed: 0.1 + Math.random() * 0.3,
        color: (Math.random() < 0.8
          ? [1, 1, 1]
          : Math.random() < 0.5
          ? [0.9, 0.95, 1]
          : [1, 0.95, 0.85]) as [number, number, number], // White, blue-white, or yellow-white
      })
    }
    return data
  }).current()

  // Remove scroll-connected effects - stars should be independent

  return (
    <group ref={groupRef}>
      {starData.map((star, index) => (
        <BrightStar
          key={index}
          position={star.position}
          brightness={star.brightness}
          size={star.size}
          twinkleSpeed={star.twinkleSpeed}
          twinklePhase={star.twinklePhase}
          spikeRotation={star.spikeRotation}
          spikeRotationSpeed={star.spikeRotationSpeed}
          color={star.color}
        />
      ))}
    </group>
  )
}

// Individual bright star with animated diffraction spikes
function BrightStar({
  position,
  brightness,
  size,
  twinkleSpeed,
  twinklePhase,
  spikeRotation,
  spikeRotationSpeed,
  color,
}: {
  position: [number, number, number]
  brightness: number
  size: number
  twinkleSpeed: number
  twinklePhase: number
  spikeRotation: number
  spikeRotationSpeed: number
  color: [number, number, number]
}) {
  const starRef = useRef<any>(null)
  const spikesRef = useRef<any>(null)

  useFrame((state) => {
    if (starRef.current && spikesRef.current) {
      const time = state.clock.elapsedTime * twinkleSpeed + twinklePhase

      // Realistic atmospheric twinkling
      const primaryTwinkle = (Math.sin(time) + 1) / 2
      const secondaryTwinkle = (Math.sin(time * 1.3 + twinklePhase) + 1) / 2
      const atmosphericTwinkle = (Math.sin(time * 0.7 + twinklePhase * 1.5) + 1) / 2

      // Combine multiple twinkling frequencies like real atmospheric turbulence
      const combinedTwinkle =
        primaryTwinkle * 0.4 + secondaryTwinkle * 0.35 + atmosphericTwinkle * 0.25
      const finalBrightness = brightness * (0.6 + combinedTwinkle * 0.4)

      // Update star core brightness
      starRef.current.material.uniforms.uOpacity.value = finalBrightness

      // Animate diffraction spikes
      const spikeIntensity = finalBrightness * 0.8
      spikesRef.current.material.uniforms.uOpacity.value = spikeIntensity

      // Slow rotation of spikes for realism (like atmospheric distortion)
      spikesRef.current.rotation.z =
        spikeRotation + state.clock.elapsedTime * spikeRotationSpeed * 0.1

      // Scale variation with twinkling for spikes only
      const scaleVariation = 1 + combinedTwinkle * 0.15
      spikesRef.current.scale.setScalar(size * scaleVariation * 1.2)
    }
  })

  return (
    <group position={position}>
      {/* Star core - circular using points */}
      <points ref={starRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([0, 0, 0]), 3]} />
          <bufferAttribute attach="attributes-size" args={[new Float32Array([size * 20]), 1]} />
        </bufferGeometry>
        <shaderMaterial
          transparent
          blending={AdditiveBlending}
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
              
              // Create a smooth circular star with soft glow
              float starCore = smoothstep(0.5, 0.2, dist);
              float glow = smoothstep(0.5, 0.0, dist) * 0.4;
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

      {/* Diffraction spikes */}
      <mesh ref={spikesRef} rotation={[0, 0, spikeRotation]}>
        <planeGeometry args={[size * 8, size * 8]} />
        <shaderMaterial
          transparent
          blending={AdditiveBlending}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform vec3 uColor;
            uniform float uOpacity;
            
            void main() {
              vec2 center = vec2(0.5, 0.5);
              vec2 uv = vUv;
              vec2 centered = uv - center;
              
              // Create 4 main diffraction spikes (like Hubble telescope)
              float spike1 = abs(centered.x) < 0.005 ? 1.0 : 0.0; // Vertical spike
              float spike2 = abs(centered.y) < 0.005 ? 1.0 : 0.0; // Horizontal spike
              
              // Create diagonal spikes at 45 degrees
              float diagonal1 = abs(centered.x - centered.y) < 0.003 ? 1.0 : 0.0;
              float diagonal2 = abs(centered.x + centered.y) < 0.003 ? 1.0 : 0.0;
              
              // Combine all spikes
              float spikes = max(max(spike1, spike2), max(diagonal1, diagonal2));
              
              // Add distance falloff for realistic light ray effect
              float distFromCenter = length(centered);
              float falloff = 1.0 - smoothstep(0.0, 0.4, distFromCenter);
              
              // Final spike intensity
              float finalSpike = spikes * falloff * 0.8;
              
              gl_FragColor = vec4(uColor, finalSpike * uOpacity);
            }
          `}
          uniforms={{
            uColor: { value: color },
            uOpacity: { value: brightness * 0.6 },
          }}
        />
      </mesh>
    </group>
  )
}
