import { useState, useEffect, useMemo } from 'react'

// Custom hook to determine if animations should be optimized based on device performance
export const usePerformanceOptimizedAnimation = () => {
  const [update, setUpdate] = useState(0)

  // Detect iOS devices (iPhones/iPads have excellent GPU performance)
  const isIOS = useMemo(() => {
    if (typeof navigator === 'undefined') return false
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
  }, [])

  // Detect modern Android flagships (generally have good GPU support)
  const isModernAndroid = useMemo(() => {
    if (typeof navigator === 'undefined') return false
    const ua = navigator.userAgent
    // Android 10+ generally has good WebGL support
    const androidMatch = ua.match(/Android\s+(\d+)/)
    if (androidMatch && androidMatch[1]) {
      const version = parseInt(androidMatch[1], 10)
      return version >= 10
    }
    return false
  }, [])

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
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection
      if (connection) {
        // If the user is on a slow connection, consider it low power
        return connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
      }
    }

    // Also use a simple heuristic based on device memory if available
    // But skip this check for iOS (deviceMemory is not available and they have good GPUs)
    if (typeof navigator !== 'undefined' && !isIOS && 'deviceMemory' in navigator) {
      const deviceMemory = (navigator as any).deviceMemory as number
      if (deviceMemory && deviceMemory < 2) {
        // Less than 2GB is considered very low memory
        return true
      }
    }

    return false
  }, [isIOS])

  const isSlowCpu = useMemo(() => {
    if (typeof navigator === 'undefined') return false

    // iOS devices have excellent GPUs - never consider them slow for WebGL
    if (isIOS) return false

    // Modern Android devices generally handle WebGL well
    if (isModernAndroid) return false

    const cores = (navigator as any).hardwareConcurrency as number | undefined
    // Only flag as slow if device has 2 or fewer cores (very old devices)
    if (cores && cores <= 2) {
      return true
    }
    return false
  }, [isIOS, isModernAndroid])

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
    isIOS,
    isModernAndroid,
  }
}
