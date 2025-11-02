import { useState, useEffect } from 'react';

// Custom hook to determine if animations should be optimized based on device performance
export const usePerformanceOptimizedAnimation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      return (
        typeof window !== 'undefined' && 
        (window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      );
    };

    setIsMobile(checkMobile());

    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setHasReducedMotion(mediaQuery.matches);

      const handleReducedMotionChange = (e: MediaQueryListEvent) => {
        setHasReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleReducedMotionChange);

      // Check for low power mode
      // Note: navigator.connection is not always available or accurate, but it's the best we can do
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          // If the user is on a slow connection, consider it low power
          setIsLowPower(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
        }
      }

      // Also use a simple heuristic based on device memory if available
      if ('deviceMemory' in navigator) {
        const deviceMemory = (navigator as any).deviceMemory as number;
        if (deviceMemory && deviceMemory < 4) { // Less than 4GB is considered low memory
          setIsLowPower(true);
        }
      }

      return () => {
        mediaQuery.removeEventListener('change', handleReducedMotionChange);
      };
    } else {
      // Return undefined when window is not available
      return undefined;
    }
  }, []);

  const shouldOptimizeAnimations = isMobile || isLowPower || hasReducedMotion;

  return {
    shouldOptimizeAnimations,
    isMobile,
    isLowPower,
    hasReducedMotion
  };
};