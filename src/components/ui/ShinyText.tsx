import React, { useState, useEffect, useRef } from 'react'

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  delay?: number
  className?: string
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  delay = 0,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const animationDuration = `${speed}s`
  const animationDelay = `${delay}s`

  // Use IntersectionObserver to only animate when visible
  useEffect(() => {
    if (disabled) return

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [disabled])

  // Delay the animation start to reduce initial load impact
  useEffect(() => {
    if (!isVisible || disabled) {
      setShouldAnimate(false)
      return
    }

    // Add a small delay before starting animation to reduce initial load lag
    const timer = setTimeout(() => {
      setShouldAnimate(true)
    }, 500) // Wait 500ms after element is visible

    return () => clearTimeout(timer)
  }, [isVisible, disabled])

  return (
    <div
      ref={elementRef}
      className={`text-[#b5b5b5a4] bg-clip-text inline-block transition-colors duration-300 hover:text-[#ccff00] ${shouldAnimate ? 'animate-shine' : ''} ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
        animationDelay: animationDelay,
        // Use will-change only when animating
        willChange: shouldAnimate ? 'background-position' : 'auto',
      }}
    >
      {text}
    </div>
  )
}

export default ShinyText
