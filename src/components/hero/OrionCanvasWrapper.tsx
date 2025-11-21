'use client'

import { Canvas } from '@react-three/fiber'
import OrionConstellation from './OrionConstellation'

export default function OrionCanvasWrapper() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <OrionConstellation />
    </Canvas>
  )
}
