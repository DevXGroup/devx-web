import { motion, HTMLMotionProps, Transition } from 'framer-motion'

// Define optimized transition settings for different contexts
export const OPTIMIZED_TRANSITIONS: Record<string, Transition> = {
  quick: {
    duration: 0.2,
    ease: 'easeOut',
  },
  standard: {
    duration: 0.3,
    ease: 'easeOut',
  },
  smooth: {
    duration: 0.4,
    ease: 'easeOut',
  },
  slow: {
    duration: 0.6,
    ease: 'easeOut',
  },
}

// Check if device is mobile for performance optimization
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return (
    window.innerWidth < 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  )
}

// Use reduced motion for better performance on low-powered devices
export const getOptimizedTransition = (
  type: keyof typeof OPTIMIZED_TRANSITIONS = 'standard',
  isLowPower?: boolean
) => {
  const transition = (
    type in OPTIMIZED_TRANSITIONS ? OPTIMIZED_TRANSITIONS[type] : OPTIMIZED_TRANSITIONS.standard
  ) as Transition
  if (isLowPower || isMobileDevice()) {
    return {
      ...transition,
      duration: (transition.duration || 0.3) * 0.7, // Faster on mobile with fallback
    }
  }
  return transition
}

// Optimized motion.div with performance considerations
export const OptimizedMotionDiv = (props: HTMLMotionProps<'div'>) => {
  const optimizedProps = {
    ...props,
    style: {
      ...props.style,
      // Add will-change for better performance
      willChange: props.style?.willChange || 'auto',
      // Use transform for better performance
      transform: props.style?.transform || 'none',
    },
    transition: props.transition || getOptimizedTransition('standard'),
  }

  return motion.div(optimizedProps)
}

// Optimized motion components for different use cases
export const FastMotionDiv = (props: HTMLMotionProps<'div'>) => {
  const optimizedProps = {
    ...props,
    transition: getOptimizedTransition('quick', isMobileDevice()),
  }
  return motion.div(optimizedProps)
}

export const SmoothMotionDiv = (props: HTMLMotionProps<'div'>) => {
  const optimizedProps = {
    ...props,
    transition: getOptimizedTransition('smooth', isMobileDevice()),
  }
  return motion.div(optimizedProps)
}
