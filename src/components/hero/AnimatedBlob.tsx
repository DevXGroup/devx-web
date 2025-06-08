"use client"

import { useRef, Suspense, useMemo, memo } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Sparkles } from "@react-three/drei"
import { AdditiveBlending, Color, Vector3 } from "three"


// Refined blob material with enhanced effects


// RefinedBlob component (now internal to AnimatedBlob)
const RefinedBlob = memo(function RefinedBlob({
  position,
  viewport,
  index,
  size,
  blobCount, 
}: {
  position: [number, number, number]
  viewport: { width: number; height: number }
  index: number
  size: number
  blobCount: number
}) {
  const particlesRef = useRef<any>(null)
  const groupRef = useRef<any>(null)

  // Movement parameters
  const speedFactor = useRef(0.7 + Math.random() * 0.3).current 
  const phaseOffset = useRef(Math.random() * Math.PI * 2).current

  // Circular movement parameters
  const circleCenter = useRef(new Vector3(position[0], position[1], position[2])).current
  const circleRadius = useRef(1.0 + Math.random() * 1.0).current 
  const circleSpeed = useRef(0.3 + Math.random() * 0.2).current

  // Keep reduced particle count for performance
  const particleCount = 50
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 0.8 // Restored aura radius

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = radius * (0.7 + Math.random() * 0.3)

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return positions
  }, [particleCount])

  const particleOpacities = useMemo(() => {
    return new Float32Array(particleCount).fill(0.08);
  }, [particleCount]);

  useFrame((state) => {
    if (groupRef.current) { 
      const time = state.clock.elapsedTime * speedFactor + phaseOffset

      // Convergence animation for group position
      const convergenceTime = state.clock.elapsedTime * 0.15 + index * 0.5
      const convergenceStrength = Math.sin(convergenceTime) * 0.5 + 0.5
      const separationDistance = 3.0 * (1 - convergenceStrength)

      // Calculate effective center towards which blobs converge (origin in this case)
      const effectiveCircleCenter = circleCenter.clone().multiplyScalar(1 - convergenceStrength);

      const separationAngle = (index / blobCount) * Math.PI * 2;
      const separationX = Math.cos(separationAngle) * separationDistance;
      const separationY = Math.sin(separationAngle) * separationDistance;

      // Circular movement for group position (orbits around effectiveCircleCenter)
      const angle = time * circleSpeed;
      const baseXOffset = Math.sin(angle) * circleRadius;
      const baseYOffset = Math.cos(angle * 0.7) * circleRadius * 0.7;
      const baseZOffset = Math.sin(angle * 1.3) * circleRadius * 0.5;
      
      const responsiveXOffset = viewport.width < 768 ? viewport.width * 0.1 : 0;
      // Position is now relative to the effectiveCircleCenter, which moves towards origin during convergence
      groupRef.current.position.x = effectiveCircleCenter.x + baseXOffset + separationX + responsiveXOffset;
      groupRef.current.position.y = effectiveCircleCenter.y + baseYOffset + separationY;
      groupRef.current.position.z = effectiveCircleCenter.z + baseZOffset; // Z also converges towards origin's Z

      // Slow Y-axis rotation for the entire blob group
      groupRef.current.rotation.y += 0.002;

      // Particle system update (rotation, pulsing scale, shader time)
      if (particlesRef.current) {
        particlesRef.current.rotation.x = -time * 0.035
        particlesRef.current.rotation.y = -time * 0.045

        // Automatic converge and expand (pulsing scale) for particles
        const pulseFrequency = 0.6 // Controls speed of pulsing
        const pulseAmplitude = 0.25 // Controls how much it expands/contracts from base
        const baseParticleScale = size * 1.2; // Original base scale for particles
        // Use a different time component for pulse to vary it from group movement
        const particleTime = state.clock.elapsedTime * 0.8 + phaseOffset; 
        const currentPulse = Math.sin(particleTime * pulseFrequency) * pulseAmplitude;
        const newScale = baseParticleScale * (1 + currentPulse);
        particlesRef.current.scale.set(newScale, newScale, newScale);
        
        // Update shader uTime if shaderMaterial is used directly on particlesRef
        if (particlesRef.current.material && particlesRef.current.material.uniforms && particlesRef.current.material.uniforms.uTime) {
          particlesRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
        }
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Y-axis rotation will be applied in useFrame */}
      {/* Sphere removed */}
      <points ref={particlesRef} scale={size * 1.2} /* Initial scale restored, useFrame will animate it */ >
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3} args={[particlePositions, 3]}            /* args prop removed */
          />
          <bufferAttribute
            attach="attributes-opacity"
            count={particleCount}
            array={particleOpacities} /* Use memoized array */
            itemSize={1} args={[particleOpacities, 1]}            /* args prop removed */
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
          vertexShader={`
            attribute float opacity;
            varying float vOpacity;
            uniform float uTime;
            
            void main() {
              vOpacity = opacity;
              vec3 pos = position;
              pos.x += sin(uTime * 0.12 + position.z * 1.2) * 0.03;
              pos.y += cos(uTime * 0.09 + position.x * 1.2) * 0.03;
              pos.z += sin(uTime * 0.07 + position.y * 1.2) * 0.03;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = 1.5 * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
          fragmentShader={`
            varying float vOpacity;
            uniform float uTime;
            
            void main() {
              float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
              float strength = 1.0 - smoothstep(0.0, 0.5, distanceFromCenter);
              
              vec3 color = mix(
                vec3(0.6, 0.8, 0.7),
                mix(vec3(0.6, 0.4, 0.8), vec3(0.8, 0.4, 0.6), sin(uTime * 0.03) * 0.5 + 0.5),
                distanceFromCenter
              );
              
              gl_FragColor = vec4(color, vOpacity * strength * 0.8);
            }
          `}
          uniforms={{
            uTime: { value: 0 },
          }}
        />
      </points>
      <Sparkles count={10} scale={size * 1.0} size={4} speed={0.15} opacity={0.08} color="#4cd787" />
    </group>
  )
});

// Define Props type for AnimatedBlobComponent
type AnimatedBlobProps = {
  viewport: { width: number, height: number };
};

// Main AnimatedBlob component
const AnimatedBlobComponent = (props: AnimatedBlobProps) => {
  const { viewport } = props;
  const blobCount = 33
  const blobData = useRef(
    Array.from({ length: blobCount }, (_, index) => {
      const size = 0.3 + Math.random() * 1.2
      const xPos = -20 + Math.random() * 15
      const yPos = -10 + Math.random() * 20
      const zPos = -5 + Math.random() * 10

      return {
        position: [xPos, yPos, zPos] as [number, number, number],
        // originalPosition removed
        size,
        index,
        // convergencePhase removed
      }
    }),
  ).current

  return (
    <Suspense fallback={null}>
      {blobData.map((blob) => (
        <RefinedBlob
          key={blob.index}
          position={blob.position}
          viewport={viewport}
          index={blob.index}
          size={blob.size}
          blobCount={blobCount} // Pass blobCount
          // originalPosition prop removed
        />
      ))}
    </Suspense>
  )
}

export default memo(AnimatedBlobComponent);
