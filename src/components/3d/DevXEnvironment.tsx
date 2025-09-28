"use client"

import { Environment, Lightformer } from "@react-three/drei"

interface DevXEnvironmentProps {
  variant?: "studio" | "night"
  intensity?: number
}

/**
 * Shared HDR-less environment lighting built with Lightformers.
 * Avoids remote HDR fetches while keeping reflective materials lively.
 */
export default function DevXEnvironment({ variant = "studio", intensity = 1 }: DevXEnvironmentProps) {
  const baseIntensity = intensity
  const isNight = variant === "night"

  return (
    <Environment resolution={256} frames={Infinity} background={false}>
      <group>
        <Lightformer
          form="ring"
          intensity={baseIntensity * (isNight ? 0.4 : 0.7)}
          rotation-x={Math.PI / 2}
          position={[0, isNight ? 6 : 4, 0]}
          scale={[12, 12, 1]}
          color={isNight ? "#221c4d" : "#f7f5ff"}
        />
        <Lightformer
          form="rect"
          intensity={baseIntensity * (isNight ? 1.2 : 1.5)}
          position={[6, 2, -4]}
          rotation={[0, Math.PI / 4, 0]}
          scale={[8, 5, 1]}
          color={isNight ? "#4CD787" : "#CCFF00"}
        />
        <Lightformer
          form="rect"
          intensity={baseIntensity * (isNight ? 0.9 : 1.2)}
          position={[-6, -2, 4]}
          rotation={[0, -Math.PI / 4, 0]}
          scale={[7, 4, 1]}
          color={isNight ? "#4834D4" : "#9d4edd"}
        />
        <Lightformer
          form="ring"
          intensity={baseIntensity * 0.5}
          rotation-y={Math.PI / 2}
          position={[0, 0, isNight ? 8 : 6]}
          scale={[10, 10, 1]}
          color={isNight ? "#CFB53B" : "#ffffff"}
        />
      </group>
    </Environment>
  )
}
