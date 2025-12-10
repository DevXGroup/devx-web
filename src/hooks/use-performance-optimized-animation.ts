import { useState, useEffect, useMemo } from 'react'

// Custom hook to determine if animations should be optimized based on device performance
export const usePerformanceOptimizedAnimation = () => {
  const [update, setUpdate] = useState(0)

  const isMobile = useMemo(() => {
    return (
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    )
  }, [])

  const hasReducedMotion = useMemo(() => {
    return (
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  const isLowPower = useMemo(() => {
    // Check for low power mode
    // Note: navigator.connection is not always available or accurate, but it's the best we can do
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection) {
        // If the user is on a slow connection, consider it low power
        return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
      }
    }

    // Also use a simple heuristic based on device memory if available
    if ('deviceMemory' in navigator) {
      const deviceMemory = (navigator as any).deviceMemory as number
      if (deviceMemory && deviceMemory < 4) {
        // Less than 4GB is considered low memory
        return true
      }
    }

    return false
  }, [])

  const isSlowCpu = useMemo(() => {
    if (typeof navigator === 'undefined') return false
    const cores = (navigator as any).hardwareConcurrency as number | undefined
    if (cores && cores <= 4) {
      return true
    }
    return false
  }, [])

  const shouldOptimizeAnimations = isLowPower || hasReducedMotion
  const shouldSkip3dEffects = shouldOptimizeAnimations || isSlowCpu || hasReducedMotion

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setUpdate((prev) => prev + 1)
    }

    mediaQuery.addEventListener('change', handleReducedMotionChange)

    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange)
    }
  }, [])

  return {
    shouldOptimizeAnimations,
    isMobile,
    isLowPower,
    hasReducedMotion,
    isSlowCpu,
    shouldSkip3dEffects,
  }
}
