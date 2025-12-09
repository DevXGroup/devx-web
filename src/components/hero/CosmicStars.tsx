'use client'

import { useEffect, useState } from 'react'

/**
 * Lightweight cosmic stars background using pure CSS
 * - Most stars are static (rendered once)
 * - Only ~15-20 stars twinkle with simple CSS animations with staggered delays
 * - Minimal performance impact, works great on slow devices
 * - Styles moved to globals.css to avoid styled-jsx React 19 compatibility issues
 */
export default function CosmicStars() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Medium stars with individual positions and delays
  const mediumStars = [
    { left: '15%', top: '40%', delay: '0s', duration: '8s' },
    { left: '85%', top: '20%', delay: '1.2s', duration: '7.5s' },
    { left: '35%', top: '85%', delay: '2.4s', duration: '8.2s' },
    { left: '75%', top: '45%', delay: '3.6s', duration: '7.8s' },
    { left: '50%', top: '15%', delay: '0.8s', duration: '8.5s' },
    { left: '25%', top: '70%', delay: '4.2s', duration: '7.2s' },
    { left: '95%', top: '65%', delay: '1.8s', duration: '8.3s' },
    { left: '42%', top: '32%', delay: '3.2s', duration: '7.6s' },
  ]

  // Bright stars with individual positions and delays
  const brightStars = [
    { left: '30%', top: '30%', size: '3px', delay: '0s', duration: '6s' },
    { left: '70%', top: '60%', size: '2.5px', delay: '1.5s', duration: '5.8s' },
    { left: '50%', top: '80%', size: '3px', delay: '3s', duration: '6.2s' },
    { left: '90%', top: '40%', size: '2.5px', delay: '0.7s', duration: '5.5s' },
    { left: '10%', top: '70%', size: '3px', delay: '2.2s', duration: '6.4s' },
    { left: '65%', top: '25%', size: '2.5px', delay: '4s', duration: '5.7s' },
    { left: '40%', top: '55%', size: '3px', delay: '1.2s', duration: '6.1s' },
    { left: '80%', top: '85%', size: '2.5px', delay: '3.5s', duration: '5.9s' },
    { left: '20%', top: '50%', size: '3px', delay: '2.8s', duration: '6.3s' },
    { left: '55%', top: '10%', size: '2.5px', delay: '4.5s', duration: '5.6s' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Layer 1: Tiny distant stars (static) */}
      <div className="stars-layer stars-tiny" />

      {/* Layer 2: Small stars (static) */}
      <div className="stars-layer stars-small" />

      {/* Layer 3: Medium stars (individual with staggered delays) */}
      {mediumStars.map((star, index) => (
        <div
          key={`medium-${index}`}
          className="star-medium"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}

      {/* Layer 4: Bright stars (individual with staggered delays) */}
      {brightStars.map((star, index) => (
        <div
          key={`bright-${index}`}
          className="star-bright"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  )
}
