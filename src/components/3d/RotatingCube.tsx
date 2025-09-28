"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshStandardMaterial, Vector3, MathUtils, AdditiveBlending, Mesh } from "three"
import { Edges, OrbitControls, Text, Float, Sparkles, RoundedBox } from "@react-three/drei"
import CubeFallback from "./CubeFallback"
import DevXEnvironment from "./DevXEnvironment"

interface CubeFaceProps {
  position: [number, number, number]
  rotation: [number, number, number]
  text: string
  color: string
  onClick: (index: number) => void
  isActive: boolean
  index: number
}

// Interactive cube face component
function CubeFace({ position, rotation, text, color, onClick, isActive, index }: CubeFaceProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Pulsing animation for the active face
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.03)
    }
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick(index)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = "auto"
        }}
      >
        <planeGeometry args={[2.8, 2.8]} />
        <meshStandardMaterial
          color={hovered || isActive ? color : "#222"}
          transparent
          opacity={0.1}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.3}
        color={hovered || isActive ? "#ffffff" : "#aaaaaa"}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
        font="/fonts/Inter-Bold.ttf"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </group>
  )
}

// Particle trail effect
function ParticleTrail({ count = 200, color = "#4CD787" }) {
  return <Sparkles count={count} scale={[6, 6, 6]} size={0.4} speed={0.3} opacity={0.5} color={color} />
}

// Glowing edges effect
function GlowingEdges({ color = "#4CD787", thickness = 0.02, glow = 0.5 }) {
  return (
    <mesh>
      <boxGeometry args={[3.05, 3.05, 3.05]} />
      <meshBasicMaterial color={color} transparent opacity={glow} blending={AdditiveBlending} wireframe />
    </mesh>
  )
}

function ModernCube() {
  const mesh = useRef<Mesh>(null)
  const [hovered, setHover] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [activeFace, setActiveFace] = useState<number | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  // Modern material with gradient and reflections
  const cubeMaterial = useMemo(() => {
    const material = new MeshStandardMaterial({
      color: "#1a1a2e",
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1,
      transparent: true,
      opacity: 0.9,
    })

    // Advanced shader modification for gradient effect
    material.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <dithering_fragment>`,
        `
        #include <dithering_fragment>
        // Modern gradient effect
        vec3 topColor = vec3(0.8, 0.7, 0.2); // Gold
        vec3 midColor = vec3(0.5, 0.0, 0.5); // Purple
        vec3 bottomColor = vec3(0.0, 0.5, 0.8); // Blue
        
        float topMask = smoothstep(0.4, 0.6, vNormal.y);
        float bottomMask = smoothstep(0.4, 0.6, -vNormal.y);
        
        // Apply the gradient
        gl_FragColor.rgb = mix(gl_FragColor.rgb, topColor, topMask);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, bottomColor, bottomMask);
        
        // Add subtle rim lighting
        float rimLight = 1.0 - max(0.0, dot(normalize(vViewPosition), vNormal));
        rimLight = pow(rimLight, 3.0);
        gl_FragColor.rgb += vec3(0.5, 0.7, 1.0) * rimLight * 0.3;
        `,
      )
    }
    return material
  }, [])

  // Cube face data
  const faces = [
    { position: [0, 0, 1.51], rotation: [0, 0, 0], text: "Custom Software", color: "#4CD787" },
    { position: [0, 0, -1.51], rotation: [0, Math.PI, 0], text: "Expert Solutions", color: "#FFD700" },
    { position: [1.51, 0, 0], rotation: [0, Math.PI / 2, 0], text: "Fast Results", color: "#9d4edd" },
    { position: [-1.51, 0, 0], rotation: [0, -Math.PI / 2, 0], text: "Competitive Rates", color: "#4834D4" },
    { position: [0, 1.51, 0], rotation: [-Math.PI / 2, 0, 0], text: "Bring Your Vision", color: "#ff6b6b" },
    { position: [0, -1.51, 0], rotation: [Math.PI / 2, 0, 0], text: "To Life", color: "#48bfe3" },
  ]

  // Handle face click
  const handleFaceClick = (index: number) => {
    setActiveFace(index === activeFace ? null : index)
    setAutoRotate(index === activeFace)
    setClicked(true)

    // If a face is activated, rotate to face it
    if (index !== activeFace && mesh.current && faces[index]) {
      const targetPosition = new Vector3(...faces[index].position).normalize().multiplyScalar(5)
      // We'll use this position in the animation frame
    }
  }

  // Interactive rotation and animation
  useFrame((state, delta) => {
    if (!mesh.current) return

    // Wobble effect
    mesh.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.05

    // Auto-rotation when not interacting
    if (autoRotate && !hovered) {
      mesh.current.rotation.x += delta * 0.1
      mesh.current.rotation.y += delta * 0.15
    }

    // If a face is active, smoothly rotate to face it
    if (activeFace !== null && !hovered && faces[activeFace]) {
      const targetPosition = new Vector3(...faces[activeFace].position).normalize().multiplyScalar(0.1)
      mesh.current.rotation.x = MathUtils.lerp(
        mesh.current.rotation.x,
        Math.atan2(targetPosition.y, targetPosition.z),
        0.05,
      )
      mesh.current.rotation.y = MathUtils.lerp(
        mesh.current.rotation.y,
        Math.atan2(targetPosition.x, targetPosition.z),
        0.05,
      )
    }
  })

  return (
    <group>
      {/* Main cube */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5} enabled={!clicked && autoRotate}>
        <mesh
          ref={mesh}
          scale={clicked ? 1.1 : hovered ? 1.05 : 1}
          onClick={() => setClicked(!clicked)}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHover(true)
          }}
          onPointerOut={() => setHover(false)}
        >
          <RoundedBox args={[3, 3, 3]} radius={0.1} smoothness={4}>
            <primitive object={cubeMaterial} attach="material" />
          </RoundedBox>

          {/* Glowing edges */}
          <Edges
            scale={1.01}
            threshold={15}
            color={hovered ? "#ffffff" : activeFace !== null && faces[activeFace] ? faces[activeFace].color : "#FFD700"}
          />

          {/* Interactive faces */}
          {faces.map((face, index) => (
            <CubeFace
              key={index}
              index={index}
              position={face.position as [number, number, number]}
              rotation={face.rotation as [number, number, number]}
              text={face.text}
              color={face.color}
              onClick={handleFaceClick}
              isActive={activeFace === index}
            />
          ))}
        </mesh>
      </Float>

      {/* Particle effects */}
      <ParticleTrail count={isMobile ? 100 : 200} color={activeFace !== null && faces[activeFace] ? faces[activeFace].color : "#4CD787"} />

      {/* Glowing edges effect */}
      <GlowingEdges color={activeFace !== null && faces[activeFace] ? faces[activeFace].color : "#4CD787"} glow={hovered ? 0.7 : 0.3} />
    </group>
  )
}

export default function RotatingCube() {
  const [mounted, setMounted] = useState(false)
  const [isSafari, setIsSafari] = useState(false)
  const [webGLFailed, setWebGLFailed] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Detect Safari
    const isSafariBrowser =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent)

    setIsSafari(isSafariBrowser)

    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      setWebGLFailed(!gl)
    } catch (e) {
      setWebGLFailed(true)
    }
  }, [])

  if (!mounted) return null

  // Use fallback for Safari or if WebGL fails
  if (isSafari || webGLFailed) {
    return <CubeFallback />
  }

  return (
    <div
      ref={canvasRef}
      className="w-full h-[500px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]} // Optimize for high-DPI displays
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#000000"]} />

        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4CD787" />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={0.5} color="#FFD700" />

        {/* Environment map for reflections */}
        <DevXEnvironment variant="night" intensity={1} />

        {/* Main cube component */}
        <ModernCube />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
    </div>
  )
}
