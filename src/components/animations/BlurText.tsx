import { motion } from 'framer-motion'
import { useEffect, useRef, useState, useMemo } from 'react'

interface BlurTextProps {
  text?: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom' | 'left' | 'right'
  threshold?: number
  rootMargin?: string
  animationFrom?: Record<string, any>
  animationTo?: Record<string, any>[]
  easing?: (t: number) => number
  onAnimationComplete?: () => void
  stepDuration?: number
  once?: boolean
}

const buildKeyframes = (
  from: Record<string, any>,
  steps: Record<string, any>[]
): Record<string, any[]> => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))])

  const keyframes: Record<string, any[]> = {}
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])]
  })
  return keyframes
}

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  once = true,
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting && ref.current) {
          setInView(true)
          if (once) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin, once])

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  )

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  )

  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots)

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        }

        const motionProps: any = {
          className: 'inline-block will-change-[transform,filter,opacity]',
          initial: fromSnapshot,
          animate: inView ? animateKeyframes : fromSnapshot,
          transition: spanTransition,
        }

        if (index === elements.length - 1 && onAnimationComplete) {
          motionProps.onAnimationComplete = onAnimationComplete
        }

        return (
          <motion.span key={index} {...motionProps}>
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        )
      })}
    </p>
  )
}

export default BlurText
