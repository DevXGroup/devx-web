'use client'

import { useEffect } from 'react'

export function useFontEnforcer() {
  useEffect(() => {
    // This ensures the font is applied to all elements
    document.documentElement.style.setProperty(
      '--font-family-base',
      'var(--font-ibm-plex-mono), monospace'
    )

    // Apply to body and all elements
    const style = document.createElement('style')
    style.textContent = `
      body, body * {
        font-family: var(--font-ibm-plex-mono), monospace !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])
}
