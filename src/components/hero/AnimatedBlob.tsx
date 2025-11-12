import { useRef, Suspense, useMemo, memo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdditiveBlending } from 'three'
import * as THREE from 'three'
import { useScroll } from '@/hooks/use-scroll'

const NoiseParticleSphere = memo(
  ({
    position,
    scrollY,
    index,
    size,
    speedFactor,
    amplitudeFactor,
    rotationFactor,
    phaseOffset,
    circleSpeed,
    circleCenter,
    circleRadius,
  }: any) => {
    const groupRef = useRef<THREE.Group>(null)
    const particlesRef = useRef<THREE.Points>(null)
    const localTime = useRef(0)

    const particleCount = 60

    const { positions, opacities, sizes } = useMemo(() => {
      const positions = new Float32Array(particleCount * 3)
      const opacities = new Float32Array(particleCount)
      const sizes = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        // Distribute particles within sphere using spherical coordinates
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        const r = Math.cbrt(Math.random()) // Cube root for uniform distribution

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        positions[i * 3 + 2] = r * Math.cos(phi)

        // High contrast noise - most particles very dim, some very bright
        const noise = Math.random()
        opacities[i] = (noise > 0.7 ? Math.pow(noise, 4) : noise * 0.1) * 0.14

        sizes[i] = 1 + Math.random() * 2
      }

      return { positions, opacities, sizes }
    }, [])

    useFrame((state, delta) => {
      if (!groupRef.current || !particlesRef.current) return

      // there's a bug idk how it happens, but upon pausing the scene, delta gets so big, causes time jump. handling it like this for now.
      if (delta > 10) return
      // using custom time management to support pausing
      localTime.current += delta
      const instanceTime = localTime.current * speedFactor + phaseOffset

      // Circular motion
      const angle = instanceTime * circleSpeed
      const baseXOffset = Math.sin(angle) * circleRadius
      const baseYOffset = Math.cos(angle * 0.7) * circleRadius * 0.7
      const baseZOffset = Math.sin(angle * 1.3) * circleRadius * 0.5

      groupRef.current.position.x = circleCenter.x + baseXOffset
      groupRef.current.position.y = circleCenter.y + baseYOffset
      groupRef.current.position.z = circleCenter.z + baseZOffset

      // Vertical movement and scroll
      const viewport = state.viewport
      const verticalMovement =
        ((Math.sin(instanceTime * 0.3) * 1.8 * viewport.height) / 12) * amplitudeFactor
      const scrollInfluence = -scrollY * 0.005 * (1 + index * 0.1)
      groupRef.current.position.y += verticalMovement + scrollInfluence

      // Scale pulse and scroll zoom
      const scalePulse = 1 + Math.sin(instanceTime * 0.4) * 0.05
      const normalizedScrollFactor = Math.min(1.0, scrollY * 0.001)
      const scrollZoom = 1 + normalizedScrollFactor * 1.0
      groupRef.current.scale.setScalar(scalePulse * scrollZoom * size)

      // Gentle rotation
      groupRef.current.rotation.x = instanceTime * 0.15 * rotationFactor
      groupRef.current.rotation.y = instanceTime * 0.1 * rotationFactor
      groupRef.current.rotation.z = instanceTime * 0.05 * rotationFactor

      // Update particle material
      const material = particlesRef.current.material as THREE.ShaderMaterial
      material.uniforms.uTime!.value = instanceTime
    })

    return (
      <group ref={groupRef} position={position}>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-opacity"
              count={particleCount}
              array={opacities}
              itemSize={1}
            />
            <bufferAttribute
              attach="attributes-size"
              count={particleCount}
              array={sizes}
              itemSize={1}
            />
          </bufferGeometry>
          <shaderMaterial
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            uniforms={{
              uTime: { value: 0 },
              uColor: { value: new THREE.Color('#DBDBDB') },
            }}
            vertexShader={`
            attribute float opacity;
            attribute float size;
            varying float vOpacity;
            uniform float uTime;

            void main() {
              vOpacity = opacity;

              // Subtle particle movement
              vec3 pos = position;
              pos.x += sin(uTime * 0.2 + position.y * 2.0) * 0.02;
              pos.y += cos(uTime * 0.15 + position.z * 2.0) * 0.02;
              pos.z += sin(uTime * 0.18 + position.x * 2.0) * 0.02;

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `}
            fragmentShader={`
            varying float vOpacity;
            uniform vec3 uColor;
            uniform float uTime;

            void main() {
              // Soft circular particle
              float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
              float strength = 1.0 - smoothstep(0.0, 0.5, distanceFromCenter);

              // Slight color variation
              vec3 color = mix(
                uColor,
                vec3(1.0),
                distanceFromCenter * 0.3
              );

              gl_FragColor = vec4(color, vOpacity * strength);
            }
          `}
          />
        </points>
      </group>
    )
  }
)

export const AnimatedBlob = () => {
  const { viewport } = useThree()
  const scrollY = useScroll()
  const sphereCount = 25

  const sphereData = useMemo(() => {
    return Array.from({ length: sphereCount }, (_, index) => {
      const size = 0.4 + Math.random() * 1.2
      let viewportScale, leftBoundary, rightBoundary

      if (viewport.width < 768) {
        viewportScale = 0.6
        leftBoundary = -8 * viewportScale
        rightBoundary = -3 * viewportScale
      } else if (viewport.width < 1024) {
        viewportScale = 0.8
        leftBoundary = -10 * viewportScale
        rightBoundary = -3.5 * viewportScale
      } else {
        viewportScale = Math.max(1.0, Math.min(1.8, viewport.width / 1200))
        leftBoundary = -12 * viewportScale
        rightBoundary = -4 * viewportScale
      }

      const leftSideWidth = rightBoundary - leftBoundary
      const xPos = leftBoundary + Math.random() * leftSideWidth
      const yPos = -8 + Math.random() * 16
      const zPos = -8 + Math.random() * 12

      return {
        position: [xPos, yPos, zPos],
        size,
        index,
        speedFactor: 0.4 + Math.random() * 0.3,
        amplitudeFactor: 0.8 + Math.random() * 0.5,
        rotationFactor: 0.2 + Math.random() * 0.15,
        phaseOffset: Math.random() * Math.PI * 2,
        circleSpeed: 0.4 + Math.random() * 0.3,
        circleCenter: new THREE.Vector3(xPos, yPos, zPos),
        circleRadius:
          (0.8 + Math.random() * 1.0) * Math.max(0.5, Math.min(2.0, viewport.width / 1200)),
      }
    })
  }, [viewport.width])

  return (
    <Suspense fallback={null}>
      {sphereData.map((sphere) => (
        <NoiseParticleSphere key={sphere.index} scrollY={scrollY} {...sphere} />
      ))}
    </Suspense>
  )
}
