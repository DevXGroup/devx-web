'use client'

import { Canvas } from '@react-three/fiber'
import OrionConstellation from './OrionConstellation'

export default function OrionCanvasWrapper() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{
          preserveDrawingBuffer: true,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{ width: '100%', height: '100%' }}
        frameloop="demand"
      >
        <OrionConstellation />
      </Canvas>
    </div>
  )
}
