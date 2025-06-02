"use client"

import { useRef, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Sparkles } from "@react-three/drei"
import { AdditiveBlending, Color, Vector3 } from "three"

// Refined blob material with enhanced effects
function RefinedBlobMaterial({ scrollY }: { scrollY: number }) {
  const uniforms = useRef({
    uTime: { value: 0 },
    uColor: { value: new Color(0x4cd787).multiplyScalar(0.35) }, // Increased base brightness
    uScrollY: { value: 0 },
    uNoiseFreq: { value: 0.2 },
    uNoiseAmp: { value: 0.08 },
    uHueShift: { value: 0.0 },
    uBrightness: { value: 0.25 }, // Increased brightness
    uOpacityFactor: { value: 0.35 }, // Increased opacity
    uScrollFactor: { value: 0.0 },
    uEdgeGlow: { value: 0.45 }, // Increased edge glow
    uEdgeThickness: { value: 0.3 }, // Increased edge thickness
    uPulseFrequency: { value: 0.02 },
    // Adjusted cosmic colors with more white/gray tones
    uCosmicColor1: { value: new Color(0xffffff) }, // White
    uCosmicColor2: { value: new Color(0x9d4edd) }, // Deep purple
    uCosmicColor3: { value: new Color(0x00b4d8) }, // Cosmic blue
    uCosmicMix: { value: 0.0 },
    uCosmicMix2: { value: 0.0 },
    uBreathingFactor: { value: 0.0 },
  }).current

  useFrame((state) => {
    const time = state.clock.elapsedTime
    uniforms.uTime.value = time
    uniforms.uScrollY.value = scrollY * 0.0008
    uniforms.uScrollFactor.value = Math.min(1.0, scrollY * 0.0008)

    // Very slow breathing effect
    uniforms.uBreathingFactor.value = Math.sin(time * 0.15) * 0.5 + 0.5

    // Extremely smooth noise variation
    uniforms.uNoiseFreq.value = 0.2 + Math.sin(time * 0.01) * 0.02
    uniforms.uNoiseAmp.value = 0.08 + Math.sin(time * 0.015) * 0.005

    // Very slow hue shift
    uniforms.uHueShift.value = (Math.sin(time * 0.008) * 0.5 + 0.5) * 0.04

    // Very slow brightness pulsing
    uniforms.uBrightness.value = 0.25 + Math.sin(time * 0.01) * 0.01

    // Very slow edge glow
    uniforms.uEdgeGlow.value = 0.45 + Math.sin(time * uniforms.uPulseFrequency.value) * 0.05

    // Very slow edge thickness
    uniforms.uEdgeThickness.value = 0.3 + Math.sin(time * 0.015) * 0.005

    // Enhanced cosmic color cycling with multiple phases
    uniforms.uCosmicMix.value = (Math.sin(time * 0.005) * 0.5 + 0.5) * 0.2 // Increased mix intensity
    uniforms.uCosmicMix2.value = (Math.sin(time * 0.003) * 0.5 + 0.5) * 0.15 // Increased mix intensity
  })

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    uniform float uTime;
    uniform float uScrollY;
    uniform float uNoiseFreq;
    uniform float uNoiseAmp;
    uniform float uBreathingFactor;
    
    // Improved Perlin noise function
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      
      // First corner
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      
      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      
      // Permutations
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
              
      // Gradients: 7x7 points over a square, mapped onto an octahedron.
      float n_ = 0.142857142857; // 1.0/7.0
      vec3 ns = n_ * D.wyz - D.xzx;
      
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      
      // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      
      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      vUv = uv;
      vNormal = normal;
      vPosition = position;
      
      // Create very smooth distortion
      float scrollFactor = uScrollY * 0.8;
      float timeFactor = uTime * 0.1;
      
      // Create multiple layers of noise for organic movement
      float noise1 = snoise(vec3(position.x * uNoiseFreq + timeFactor, 
                                position.y * uNoiseFreq + timeFactor, 
                                position.z * uNoiseFreq + timeFactor)) * uNoiseAmp;
                                
      float noise2 = snoise(vec3(position.x * uNoiseFreq * 1.2 + timeFactor * 0.5,
                                position.y * uNoiseFreq * 1.2 - timeFactor * 0.4,
                                position.z * uNoiseFreq * 1.2 + timeFactor * 0.5)) * uNoiseAmp * 0.1;
                                
      // Add very subtle scroll-based distortion
      float scrollNoise = snoise(vec3(position.x * 0.1, position.y * 0.1, scrollFactor)) * 0.02;
      
      // Combine noise layers for final displacement
      vec3 newPosition = position + normal * (noise1 + noise2 + scrollNoise) * 0.5;
      
      // Add very gentle breathing effect
      float breathingEffect = sin(uTime * 0.15) * 0.01 + 1.0;
      newPosition *= breathingEffect;
      
      // Add very subtle pulsing
      newPosition += normal * sin(uTime * 0.2) * 0.003;
      
      // Add very subtle scroll-reactive scaling
      float scrollScale = 1.0 + sin(scrollFactor * 0.3) * 0.01;
      newPosition *= scrollScale;
      
      vWorldPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uScrollY;
    uniform float uHueShift;
    uniform float uBrightness;
    uniform float uOpacityFactor;
    uniform float uScrollFactor;
    uniform float uEdgeGlow;
    uniform float uEdgeThickness;
    uniform vec3 uCosmicColor1;
    uniform vec3 uCosmicColor2;
    uniform vec3 uCosmicColor3;
    uniform float uCosmicMix;
    uniform float uCosmicMix2;
    uniform float uBreathingFactor;
    
    // HSL to RGB conversion
    vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
      return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
    }
    
    // RGB to HSL conversion
    vec3 rgb2hsl(vec3 c) {
      float h = 0.0;
      float s = 0.0;
      float l = 0.0;
      float r = c.r;
      float g = c.g;
      float b = c.b;
      float cMin = min(r, min(g, b));
      float cMax = max(r, max(g, b));

      l = (cMax + cMin) / 2.0;
      if (cMax > cMin) {
        float cDelta = cMax - cMin;
        s = l < 0.5 ? cDelta / (cMax + cMin) : cDelta / (2.0 - (cMax + cMin));
        
        if (r == cMax) {
          h = (g - b) / cDelta + (g < b ? 6.0 : 0.0);
        } else if (g == cMax) {
          h = (b - r) / cDelta + 2.0;
        } else {
          h = (r - g) / cDelta + 4.0;
        }
        h /= 6.0;
      }
      return vec3(h, s, l);
    }
    
    void main() {
      // Enhanced lighting model with very smooth transitions
      vec3 light1 = normalize(vec3(0.5, 0.8, 0.3));
      vec3 light2 = normalize(vec3(-0.3, 0.4, 0.7));
      
      float dProd1 = max(0.0, dot(vNormal, light1));
      float dProd2 = max(0.0, dot(vNormal, light2));
      float dProdCombined = dProd1 * 0.7 + dProd2 * 0.3;
      
      // Very smooth color transitions
      vec3 hslColor = rgb2hsl(uColor);
      hslColor.x = mod(hslColor.x + uHueShift, 1.0);
      vec3 baseColor = hsl2rgb(hslColor) * uBrightness;

      // Enhanced cosmic color mixing with white/gray base
      vec3 cosmicColor1 = mix(uCosmicColor1, uCosmicColor2, sin(uTime * 0.008) * 0.5 + 0.5);
      vec3 cosmicColor2 = mix(cosmicColor1, uCosmicColor3, sin(uTime * 0.006) * 0.5 + 0.5);
      
      // Start with white/gray base and transition to cosmic colors
      vec3 whiteBase = vec3(0.95, 0.95, 0.95); // Slightly off-white
      baseColor = mix(whiteBase, baseColor, 0.3); // Blend with white base
      baseColor = mix(baseColor, cosmicColor2 * 0.35, uCosmicMix);
      baseColor = mix(baseColor, cosmicColor1 * 0.25, uCosmicMix2);
      
      vec3 highlightColor = vec3(1.0, 1.0, 1.0) * 0.2; // Increased highlight
      
      // Very smooth color blending
      vec3 color = mix(baseColor, highlightColor, dProdCombined * 0.15);
      
      // Enhanced cosmic glow effect
      float cosmicGlow = sin(uTime * 0.15 + vUv.x * 4.0) * 0.5 + 0.5;
      vec3 cosmicGlowColor = mix(
        vec3(0.95, 0.95, 0.95), // White
        vec3(0.4, 0.6, 1.0), // Cosmic blue
        cosmicGlow
      );
      color += cosmicGlowColor * 0.03; // Increased glow intensity
      
      // Enhanced fresnel effect with very smooth transitions
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - max(0.0, dot(vNormal, viewDirection)), 2.0);
      
      float enhancedFresnel = pow(1.0 - max(0.0, dot(vNormal, viewDirection)), 1.0);
      float edgeMask = smoothstep(1.0 - uEdgeThickness, 1.0, enhancedFresnel);
      vec3 edgeColor = mix(
        vec3(0.95, 0.95, 0.95), // White
        vec3(0.4, 0.6, 1.0), // Cosmic blue
        sin(uTime * 0.1) * 0.5 + 0.5
      ) * uEdgeGlow;
      
      // Very smooth edge glow
      color = mix(color, edgeColor, edgeMask * 0.15); // Increased edge blend
      
      // Enhanced cosmic iridescence
      float iridescence = sin(fresnel * 4.0 + uTime * 0.1) * 0.5 + 0.5;
      vec3 iridescenceColor = mix(
        vec3(0.95, 0.95, 0.95), // White
        vec3(0.4, 0.6, 1.0), // Cosmic blue
        iridescence
      ) * 0.03; // Increased iridescence
      color += iridescenceColor;
      
      // Very smooth scroll-reactive glow
      float scrollGlow = sin(uScrollY * 0.8 + uTime * 0.15) * 0.5 + 0.5;
      color += baseColor * scrollGlow * 0.03; // Increased scroll glow
      
      // Very smooth pulsing glow
      float glow = sin(uTime * 0.15) * 0.5 + 0.5;
      color += glow * 0.02 * baseColor; // Increased pulse glow
      
      // Very smooth opacity transitions
      float opacity = (0.02 + fresnel * 0.025 + scrollGlow * 0.003) * uOpacityFactor * (1.0 - uScrollFactor * 0.08);
      opacity = mix(opacity, opacity * 1.08, edgeMask); // Increased edge opacity
      
      gl_FragColor = vec4(color, opacity);
    }
  `

  return (
    <shaderMaterial
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent
      depthWrite={false}
    />
  )
}

// RefinedBlob component (now internal to AnimatedBlob)
function RefinedBlob({
  position,
  scrollY,
  viewport,
  index,
  size,
  originalPosition,
  convergencePhase,
}: {
  position: [number, number, number]
  scrollY: number
  viewport: { width: number; height: number }
  index: number
  size: number
  originalPosition: [number, number, number]
  convergencePhase: number
}) {
  const mesh = useRef<any>(null)
  const particlesRef = useRef<any>(null)
  const groupRef = useRef<any>(null)

  // Restored original movement parameters
  const speedFactor = useRef(0.7 + Math.random() * 0.3).current // Faster for more dynamic effect
  const amplitudeFactor = useRef(0.7 + Math.random() * 0.4).current // More individual movement
  const rotationFactor = useRef(0.5 + Math.random() * 0.25).current // Faster rotation
  const phaseOffset = useRef(Math.random() * Math.PI * 2).current

  // Restored circular movement parameters
  const circleCenter = useRef(new Vector3(position[0], position[1], position[2])).current
  const circleRadius = useRef(1.0 + Math.random() * 1.0).current // Increased radius for wider circular movement
  const originalPositionVector = useRef(
    new Vector3(originalPosition[0], originalPosition[1], originalPosition[2]),
  ).current
  const circleSpeed = useRef(0.3 + Math.random() * 0.2).current // Increased speed of circular movement

  // Keep reduced particle count for performance
  const particleCount = 50
  const particlePositions = useRef(() => {
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
  }).current()

  useFrame((state) => {
    if (mesh.current && groupRef.current) {
      const time = state.clock.elapsedTime * speedFactor + phaseOffset
      const scrollFactor = scrollY * 0.001 // Restored scroll influence
      const normalizedScrollFactor = Math.min(1.0, scrollY * 0.001)

      // Restored convergence animation
      const convergenceTime = state.clock.elapsedTime * 0.15 + index * 0.5
      const convergenceStrength = Math.sin(convergenceTime) * 0.5 + 0.5
      const separationDistance = 3.0 * (1 - convergenceStrength)

      // Restored separation calculation
      const separationAngle = (index / 12) * Math.PI * 2
      const separationX = Math.cos(separationAngle) * separationDistance
      const separationY = Math.sin(separationAngle) * separationDistance

      // Restored circular movement
      const angle = time * circleSpeed
      const baseXOffset = Math.sin(angle) * circleRadius
      const baseYOffset = Math.cos(angle * 0.7) * circleRadius * 0.7
      const baseZOffset = Math.sin(angle * 1.3) * circleRadius * 0.5

      // Restored position calculation
      const responsiveXOffset = viewport.width < 768 ? viewport.width * 0.1 : 0
      groupRef.current.position.x = circleCenter.x + baseXOffset + separationX + responsiveXOffset
      groupRef.current.position.y = circleCenter.y + baseYOffset + separationY
      groupRef.current.position.z = circleCenter.z + baseZOffset

      // Restored vertical movement
      const verticalMovement = ((Math.sin(time * 0.25) * 1.5 * viewport.height) / 10) * amplitudeFactor
      const scrollInfluence = -scrollY * 0.006 * (1 + index * 0.15)

      groupRef.current.position.y += verticalMovement + scrollInfluence

      // Restored rotation
      mesh.current.rotation.x = time * 0.15 * rotationFactor
      mesh.current.rotation.y = time * 0.1 * rotationFactor
      mesh.current.rotation.z = time * 0.05 * rotationFactor

      // Restored scale calculation
      const scalePulse = 1 + Math.sin(time * 0.4) * 0.05
      const convergenceScale = 0.8 + convergenceStrength * 0.4
      const scrollZoom = 1 + normalizedScrollFactor * 1.0
      const combinedScale = scalePulse * scrollZoom * size * convergenceScale

      mesh.current.scale.set(combinedScale, combinedScale, combinedScale)

      // Restored scroll-reactive scale
      const scrollScale = 1 + Math.sin(scrollFactor * 1.2) * 0.03
      groupRef.current.scale.set(scrollScale, scrollScale, scrollScale)

      // Restored particle system update
      if (particlesRef.current) {
        particlesRef.current.rotation.x = -time * 0.035
        particlesRef.current.rotation.y = -time * 0.045

        const opacityAttribute = particlesRef.current.geometry.getAttribute("opacity")
        for (let i = 0; i < particleCount; i++) {
          const noise = Math.sin(time + i * 0.1) * 0.5 + 0.5
          const opacityFactor = 1 + Math.sin(time * 0.15) * 0.2
          opacityAttribute.setX(i, noise * 0.15 * opacityFactor * (1 - normalizedScrollFactor * 0.1))
        }
        opacityAttribute.needsUpdate = true
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Sphere ref={mesh} args={[1, 32, 32]} scale={size}>
        <RefinedBlobMaterial scrollY={scrollY} />
      </Sphere>
      <points ref={particlesRef} scale={size * 1.2}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            count={particleCount} 
            array={particlePositions} 
            itemSize={3}
            args={[particlePositions, 3]} 
          />
          <bufferAttribute
            attach="attributes-opacity"
            count={particleCount}
            array={new Float32Array(particleCount).fill(0.08)}
            itemSize={1}
            args={[new Float32Array(particleCount).fill(0.08), 1]}
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
}

// Main AnimatedBlob component
export default function AnimatedBlob({
  scrollY,
  viewport,
}: {
  scrollY: number
  viewport: { width: number; height: number }
}) {
  const blobCount = 30
  const blobData = useRef(
    Array.from({ length: blobCount }, (_, index) => {
      const size = 0.5 + Math.random() * 1.5
      const xPos = -15 + Math.random() * 10
      const yPos = -10 + Math.random() * 20
      const zPos = -5 + Math.random() * 10

      return {
        position: [xPos, yPos, zPos] as [number, number, number],
        originalPosition: [xPos, yPos, zPos] as [number, number, number],
        size,
        index,
        convergencePhase: Math.random() * Math.PI * 2,
      }
    }),
  ).current

  return (
    <Suspense fallback={null}>
      {blobData.map((blob) => (
        <RefinedBlob
          key={blob.index}
          position={blob.position}
          scrollY={scrollY}
          viewport={viewport}
          index={blob.index}
          size={blob.size}
          originalPosition={blob.originalPosition}
          convergencePhase={blob.convergencePhase}
        />
      ))}
    </Suspense>
  )
}
