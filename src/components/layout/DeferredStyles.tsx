'use client'

import { useEffect } from 'react'

export function DeferredStyles() {
  useEffect(() => {
    if (typeof document === 'undefined') return
    const existing = document.getElementById('deferred-styles') as HTMLLinkElement | null
    if (existing) return

    const link = document.createElement('link')
    link.id = 'deferred-styles'
    link.rel = 'preload'
    link.as = 'style'
    link.href = '/deferred-styles.css'
    link.onload = () => {
      link.rel = 'stylesheet'
    }
    document.head.appendChild(link)
  }, [])

  return null
}
