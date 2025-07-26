'use client'

import { useState } from 'react'

interface ShapeBlurProps {
  className?: string
  variation?: number
  pixelRatioProp?: number
  shapeSize?: number
  roundness?: number
  borderSize?: number
  circleSize?: number
  circleEdge?: number
}

const ShapeBlur = ({
  className = '',
  variation = 0,
  pixelRatioProp = 2,
  shapeSize = 1.2,
  roundness = 0.4,
  borderSize = 0.05,
  circleSize = 0.3,
  circleEdge = 0.5,
}: ShapeBlurProps) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })
  }

  // Simple CSS-based blur effect as fallback
  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, 
      rgba(255, 255, 255, 0.05) 0%, 
      rgba(255, 255, 255, 0.02) 30%, 
      rgba(255, 255, 255, 0.01) 60%, 
      transparent 80%)`,
    borderRadius: `${roundness * 20}px`,
    border: `${borderSize * 10}px solid rgba(255, 255, 255, 0.2)`,
    filter: 'blur(1px)',
    transition: 'all 0.1s ease-out',
    maskImage:
      variation === 0
        ? 'none'
        : variation === 1
        ? 'radial-gradient(circle, black 60%, transparent 80%)'
        : variation === 2
        ? 'radial-gradient(circle, transparent 55%, black 58%, black 62%, transparent 65%)'
        : 'polygon(50% 0%, 0% 100%, 100% 100%)',
  }

  return (
    <div
      className={`w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      style={gradientStyle}
    />
  )
}

export default ShapeBlur
