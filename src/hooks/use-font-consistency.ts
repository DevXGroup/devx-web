'use client'

import { useEffect } from 'react'

/**
 * Hook to ensure font consistency across the application
 * This addresses potential issues with font loading and application
 */
export function useFontConsistency() {
  useEffect(() => {
    // Force font consistency by applying the font to all elements
    const applyFontConsistency = () => {
      const fontFamily =
        'var(--font-ibm-plex-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

      // Apply to document body
      document.body.style.fontFamily = fontFamily

      // Apply to all text elements to ensure consistency
      const textElements = document.querySelectorAll(
        'h1, h2, h3, h4, h5, h6, p, span, div, a, button, input, textarea, select, li'
      )
      textElements.forEach((el) => {
        ;(el as HTMLElement).style.fontFamily = fontFamily
      })
    }

    // Apply immediately
    applyFontConsistency()

    // Apply after a short delay to catch any dynamically loaded content
    const timeout = setTimeout(applyFontConsistency, 500)

    // Apply whenever fonts load
    document.fonts.ready.then(applyFontConsistency)

    // Apply on window load to catch any late-loading elements
    window.addEventListener('load', applyFontConsistency)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('load', applyFontConsistency)
    }
  }, [])
}
