'use client'

import { useEffect } from 'react'

export function BrowserCompatibilityDetector() {
  useEffect(() => {
    // Add a small delay to ensure this runs after hydration
    const timer = setTimeout(() => {
      try {
        // Check for backdrop-filter support
        const testBackdropFilter = () => {
          const el = document.createElement('div')
          el.style.cssText = 'backdrop-filter: blur(1px)'
          return !!el.style.backdropFilter
        }

        // Add classes to html element based on feature detection
        if (testBackdropFilter()) {
          document.documentElement.classList.add('supports-backdrop-filter')
        } else {
          document.documentElement.classList.add('no-backdrop-filter')
        }

        // Check for touch device
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
          document.documentElement.classList.add('is-touch-device')
        }

        // Check for Safari
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        if (isSafari) {
          document.documentElement.classList.add('is-safari')
        }

        // Check for Firefox
        const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
        if (isFirefox) {
          document.documentElement.classList.add('is-firefox')
        }
      } catch (error) {
        console.warn('Browser compatibility detection failed:', error)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return null
}
