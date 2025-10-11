"use client"

import { useEffect } from "react"

/**
 * Suppresses known React DevTools extension errors that occur with React 19
 * These errors are from the browser extension itself, not from the application code
 */
export function DevToolsErrorSuppressor() {
  useEffect(() => {
    // Only run in development and in browser
    if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') {
      return
    }

    const originalError = console.error
    console.error = (...args: any[]) => {
      const errorMessage = args[0]?.toString() || ''

      // Suppress React DevTools semver validation errors
      if (
        errorMessage.includes('Invalid argument not valid semver') ||
        errorMessage.includes('chrome-extension://') ||
        errorMessage.includes('react_devtools_backend') ||
        errorMessage.includes('registerRendererInterface')
      ) {
        // Silently ignore React DevTools extension errors
        return
      }

      // Pass through all other errors
      originalError.apply(console, args)
    }

    return () => {
      // Restore original console.error on cleanup
      console.error = originalError
    }
  }, [])

  return null
}
