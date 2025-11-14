'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Points, Group, Mesh } from 'three'

// Performance-based configuration
const getPerformanceConfig = () => {
  if (typeof window === 'undefined') return { updateFrequency: 1 }

  // Simple performance detection
  const isLowPerformance = window.navigator.hardwareConcurrency <= 4

  return {
    updateFrequency: isLowPerformance ? 3 : 1, // Update every 3rd frame on low-end devices
  }
}

// Enhanced starfield with magical twinkling stars
export default function EnhancedStarfield({
  viewport,
}: {
  viewport: { width: number; height: number }
}) {
  // Reduce star count on mobile for better performance
  const isMobile = viewport.width < 768
  const isTablet = viewport.width >= 768 && viewport.width < 1024

  return (
    <>
      {/* Enhanced twinkling background stars - more density for hero */}
      <SimpleStarLayer count={isMobile ? 300 : isTablet ? 500 : 700} viewport={viewport} />
      {/* Bright stars with diffraction spikes - more for hero */}
      <BrightStarsLayer count={isMobile ? 10 : isTablet ? 18 : 25} viewport={viewport} />
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
  const mesh = useRef<Points>(null!)
  const performanceConfig = useMemo(() => getPerformanceConfig(), [])
  const frameCounter = useRef(0)

  const positions = useRef(() => {
    const pos = new Float32Array(count * 3)
    const gaussian = () => {
      let u = 0
      let v = 0
      while (u === 0) u = Math.random()
      while (v === 0) v = Math.random()
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    }

    const isWide = viewport.width > 768
    const spreadX = isWide ? 40 : 25
    const spreadY = isWide ? 25 : 20

    const clusterCount = Math.max(3, Math.floor(count * 0.04))
    const clusters = Array.from({ length: clusterCount }, () => ({
      x: (Math.random() - 0.5) * spreadX * 0.6,
      y: (Math.random() - 0.5) * spreadY * 0.6,
      radiusX: 2 + Math.random() * 4,
      radiusY: 1.5 + Math.random() * 3,
    }))

    const assignDiffusePosition = (index: number) => {
      const distance = Math.abs(gaussian()) * (isWide ? 18 : 14)
      const angle = Math.random() * Math.PI * 2
      pos[index * 3] = Math.cos(angle) * distance * 1.1
      pos[index * 3 + 1] = Math.sin(angle) * distance * 0.7
    }

    for (let i = 0; i < count; i++) {
      const useCluster = Math.random() < 0.35 && clusters.length > 0

      if (useCluster) {
        const targetCluster = clusters[Math.floor(Math.random() * clusters.length)]
        if (targetCluster) {
          pos[i * 3] = targetCluster.x + gaussian() * targetCluster.radiusX
          pos[i * 3 + 1] = targetCluster.y + gaussian() * targetCluster.radiusY
        } else {
          assignDiffusePosition(i)
        }
      } else {
        assignDiffusePosition(i)
      }

      pos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 15
    }
    return pos
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
      if (sizeRandom < 0.75) {
        // Small stars (75%)
        sizes[i] = 0.008 + Math.random() * 0.012
      } else if (sizeRandom < 0.92) {
        // Medium stars (17%)
        sizes[i] = 0.03 + Math.random() * 0.03
      } else {
        // Large bright stars (8%)
        sizes[i] = 0.08 + Math.random() * 0.06
      }
    }
    return sizes
  }).current()

  const twinkleProfiles = useRef(() => {
    const base = new Float32Array(count)
    const amplitude = new Float32Array(count)
    const slowSpeed = new Float32Array(count)
    const fastSpeed = new Float32Array(count)
    const slowPhase = new Float32Array(count)
    const fastPhase = new Float32Array(count)
    const noiseOffsets = new Float32Array(count)
    const sparkleBias = new Float32Array(count)
    const alpha = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const baseSize = starSizes[i] ?? 0
      const sizeFactor = Math.min(1, baseSize / 0.12)
      base[i] = 0.18 + sizeFactor * 0.25 + Math.random() * 0.25
      amplitude[i] = 0.25 + (1 - sizeFactor) * 0.35
      slowSpeed[i] = 0.02 + Math.random() * 0.06
      fastSpeed[i] = 0.4 + Math.random() * 1.1
      slowPhase[i] = Math.random() * Math.PI * 2
      fastPhase[i] = Math.random() * Math.PI * 2
      noiseOffsets[i] = Math.random() * Math.PI * 2
      sparkleBias[i] = 0.78 + Math.random() * 0.18
      alpha[i] = base[i] ?? 0
    }

    return {
      base,
      amplitude,
      slowSpeed,
      fastSpeed,
      slowPhase,
      fastPhase,
      noiseOffsets,
      sparkleBias,
      alpha,
    }
  }).current()

  useFrame((state) => {
    frameCounter.current++

    // Skip frames based on performance config
    if (frameCounter.current % performanceConfig.updateFrequency !== 0) return

    if (mesh.current) {
      const alphaAttribute = mesh.current.geometry.getAttribute('alpha')
      const alphaArray = alphaAttribute.array as Float32Array
      const time = state.clock.getElapsedTime()

      for (let i = 0; i < count; i++) {
        const slowSpeed = twinkleProfiles.slowSpeed[i] ?? 0
        const slowPhase = twinkleProfiles.slowPhase[i] ?? 0
        const fastSpeed = twinkleProfiles.fastSpeed[i] ?? 0
        const fastPhase = twinkleProfiles.fastPhase[i] ?? 0
        const noiseOffset = twinkleProfiles.noiseOffsets[i] ?? 0

        const slow = (Math.sin(time * slowSpeed + slowPhase) + 1) * 0.5
        const fast = (Math.sin(time * fastSpeed + fastPhase) + 1) * 0.5
        const drift = (Math.sin(time * 0.15 + noiseOffset) + 1) * 0.5

        let intensity = slow * 0.45 + fast * 0.4 + drift * 0.15

        const sparkleBias = twinkleProfiles.sparkleBias[i] ?? 1
        const sparkleTrigger = fast > sparkleBias ? fast - sparkleBias : 0
        const sparkle = sparkleTrigger * 0.6

        const baseValue = twinkleProfiles.base[i] ?? 0
        const amplitudeValue = twinkleProfiles.amplitude[i] ?? 0

        const finalAlpha = Math.min(
          1,
          Math.max(0.08, baseValue + amplitudeValue * intensity + sparkle * amplitudeValue)
        )

        twinkleProfiles.alpha[i] = finalAlpha
        alphaArray[i] = finalAlpha
      }

      alphaAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
        <bufferAttribute attach="attributes-alpha" args={[twinkleProfiles.alpha, 1]} />
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
            vec2 centered = uv - center;
            float dist = length(centered);
            
            float airyDisc = pow(max(0.0, 1.0 - dist * dist), 3.0);
            float glow = smoothstep(0.45, 0.0, dist) * 0.45;
            float core = smoothstep(0.18, 0.0, dist) * 0.35;
            
            float angle = atan(centered.y, centered.x);
            float sparkle = smoothstep(0.92, 1.0, sin(dist * 45.0 + angle * 6.0)) * 0.12;
            
            float finalStar = clamp(airyDisc + glow + core + sparkle, 0.0, 1.0);
            
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
  const groupRef = useRef<Group>(null!)

  const starData = useRef(() => {
    const data = []
    for (let i = 0; i < count; i++) {
      const spreadX = viewport.width > 768 ? 45 : 30
      const spreadY = viewport.width > 768 ? 30 : 25
      const brightness = 0.4 + Math.random() * 0.6 // Vary brightness
      const size = 0.12 + Math.random() * 0.18 // Larger sizes for bright stars

      // More concentrated distribution for bright stars
      const xBias = (Math.random() - 0.5) * 0.4
      const yBias = (Math.random() - 0.5) * 0.3

      data.push({
        position: [
          (Math.random() - 0.5 + xBias) * spreadX,
          (Math.random() - 0.5 + yBias) * spreadY,
          (Math.random() - 0.5) * 30 - 15,
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
  const starRef = useRef<Points>(null!)
  const spikesRef = useRef<Mesh>(null!)

  useFrame((state) => {
    if (starRef.current && spikesRef.current) {
      const time = state.clock.elapsedTime * twinkleSpeed + twinklePhase

      // Simplified twinkling calculation
      const primaryTwinkle = (Math.sin(time) + 1) / 2
      const finalBrightness = brightness * (0.7 + primaryTwinkle * 0.3)

      // Update star core brightness
      starRef.current.material.uniforms.uOpacity.value = finalBrightness

      // Animate diffraction spikes with reduced frequency
      const spikeIntensity = finalBrightness * 0.8
      spikesRef.current.material.uniforms.uOpacity.value = spikeIntensity

      // Slower rotation update
      if (Math.floor(time * 2) % 3 === 0) {
        spikesRef.current.rotation.z =
          spikeRotation + state.clock.elapsedTime * spikeRotationSpeed * 0.05
      }

      // Reduced scale variation
      const scaleVariation = 1 + primaryTwinkle * 0.1
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
