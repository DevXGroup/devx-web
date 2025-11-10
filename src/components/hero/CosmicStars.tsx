'use client'

import { useEffect, useState } from 'react'

/**
 * Lightweight cosmic stars background using pure CSS
 * - Most stars are static (rendered once)
 * - Only ~15-20 stars twinkle with simple CSS animations with staggered delays
 * - Minimal performance impact, works great on slow devices
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

      <style jsx>{`
        .stars-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* Tiny distant stars - completely static, dense field */
        .stars-tiny {
          background-image:
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 90%, white, transparent),
            radial-gradient(1px 1px at 75% 20%, white, transparent),
            radial-gradient(1px 1px at 40% 40%, white, transparent),
            radial-gradient(1px 1px at 65% 15%, white, transparent),
            radial-gradient(1px 1px at 25% 65%, white, transparent),
            radial-gradient(1px 1px at 85% 85%, white, transparent),
            radial-gradient(1px 1px at 10% 45%, white, transparent),
            radial-gradient(1px 1px at 95% 35%, white, transparent),
            radial-gradient(1px 1px at 45% 10%, white, transparent),
            radial-gradient(1px 1px at 70% 90%, white, transparent),
            radial-gradient(1px 1px at 30% 20%, white, transparent),
            radial-gradient(1px 1px at 55% 60%, white, transparent);
          background-size:
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%,
            200% 200%;
          background-position:
            0% 0%,
            100% 100%,
            50% 50%,
            20% 80%,
            80% 20%,
            40% 60%,
            60% 40%,
            10% 90%,
            90% 10%,
            30% 70%,
            70% 30%,
            15% 15%,
            85% 85%,
            25% 45%,
            65% 75%,
            45% 25%,
            75% 65%,
            35% 55%;
          opacity: 0.6;
        }

        /* Small stars - mostly static with very subtle variations */
        .stars-small {
          background-image:
            radial-gradient(1.5px 1.5px at 18% 25%, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(1.5px 1.5px at 82% 55%, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1.5px 1.5px at 45% 75%, rgba(255, 255, 255, 0.85), transparent),
            radial-gradient(1.5px 1.5px at 68% 35%, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(1.5px 1.5px at 22% 88%, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1.5px 1.5px at 92% 12%, rgba(255, 255, 255, 0.85), transparent),
            radial-gradient(1.5px 1.5px at 38% 48%, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(1.5px 1.5px at 72% 68%, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1.5px 1.5px at 12% 62%, rgba(255, 255, 255, 0.85), transparent),
            radial-gradient(1.5px 1.5px at 58% 18%, rgba(255, 255, 255, 0.9), transparent),
            radial-gradient(1.5px 1.5px at 88% 78%, rgba(255, 255, 255, 0.8), transparent),
            radial-gradient(1.5px 1.5px at 28% 38%, rgba(255, 255, 255, 0.85), transparent);
          background-size:
            300% 300%,
            300% 300%,
            300% 300%,
            300% 300%,
            300% 300%,
            300% 300%,
            300% 300%,
            300% 300%,
            300% 300%,
            300% 300%,
            300% 300%,
            300% 300%;
          background-position:
            18% 25%,
            82% 55%,
            45% 75%,
            68% 35%,
            22% 88%,
            92% 12%,
            38% 48%,
            72% 68%,
            12% 62%,
            58% 18%,
            88% 78%,
            28% 38%;
          opacity: 0.7;
        }

        /* Individual medium stars - subtle twinkling with staggered delays */
        .star-medium {
          position: absolute;
          width: 2px;
          height: 2px;
          background: radial-gradient(circle, white, transparent);
          border-radius: 50%;
          animation: twinkle-subtle ease-in-out infinite;
          opacity: 0.8;
          pointer-events: none;
        }

        /* Individual bright stars - noticeable twinkling with staggered delays */
        .star-bright {
          position: absolute;
          background: radial-gradient(circle, rgba(255, 255, 255, 1), transparent);
          border-radius: 50%;
          animation: twinkle-bright ease-in-out infinite;
          opacity: 0.9;
          pointer-events: none;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
        }

        /* Subtle twinkling animation for medium stars */
        @keyframes twinkle-subtle {
          0%,
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.95);
          }
        }

        /* More pronounced twinkling for bright stars */
        @keyframes twinkle-bright {
          0%,
          100% {
            opacity: 0.9;
            transform: scale(1);
            filter: brightness(1);
          }
          25% {
            opacity: 1;
            transform: scale(1.05);
            filter: brightness(1.2);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.9);
            filter: brightness(0.8);
          }
          75% {
            opacity: 1;
            transform: scale(1.05);
            filter: brightness(1.2);
          }
        }

        /* Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .star-medium,
          .star-bright {
            animation: none;
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}
