"use client"

import { useEffect } from "react"

/**
 * Suppresses known React DevTools extension errors that occur with React 19
 * and Chrome extension runtime errors that occur on non-Chrome browsers
 * These errors are from browser extensions, not from the application code
 */
export function DevToolsErrorSuppressor() {
  useEffect(() => {
    // Only run in browser (both development and production)
    if (typeof window === 'undefined') {
      return
    }

    const originalError = console.error
    const originalOnError = window.onerror
    const originalOnUnhandledRejection = window.onunhandledrejection

    // Suppress console errors
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

    // Suppress window errors (including Chrome extension runtime errors)
    window.onerror = function (msg, url, line, col, error) {
      // Check for Chrome extension runtime errors on non-Chrome browsers
      const errorMessage = typeof msg === 'string' ? msg : (error && error.message) || ''
      
      if (
        errorMessage.includes('runtime.sendMessage') &&
        errorMessage.includes('Tab not found')
      ) {
        return true // Suppress the error
      }

      // Call original handler if it existed
      if (originalOnError) {
        return originalOnError(msg, url, line, col, error)
      }

      return false
    }

    // Suppress unhandled promise rejections related to Chrome extensions
    window.onunhandledrejection = function (event) {
      if (
        event.reason &&
        typeof event.reason === 'object' &&
        'message' in event.reason &&
        typeof event.reason.message === 'string' &&
        event.reason.message.includes('runtime.sendMessage') &&
        event.reason.message.includes('Tab not found')
      ) {
        event.preventDefault() // Suppress the error
        return
      }

      if (originalOnUnhandledRejection) {
        originalOnUnhandledRejection.call(window, event)
      }
    }

    return () => {
      // Restore original console.error on cleanup
      console.error = originalError
      window.onerror = originalOnError
      window.onunhandledrejection = originalOnUnhandledRejection
    }
  }, [])

  return null
}
