'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useSafariDetection } from '@/hooks/use-safari-detection'

interface SafariCompatibleWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  delay?: number
  className?: string
}

export default function SafariCompatibleWrapper({
  children,
  fallback = null,
  delay = 0,
  className = '',
}: SafariCompatibleWrapperProps) {
  const { isSafari, isClient } = useSafariDetection()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isClient) return

    const safariDelay = isSafari ? Math.max(delay, 800) : delay

    const timer = setTimeout(() => {
      setIsReady(true)
    }, safariDelay)

    return () => clearTimeout(timer)
  }, [isClient, isSafari, delay])

  if (!isClient || !isReady) {
    return (
      <div className={className} suppressHydrationWarning={true}>
        {fallback}
      </div>
    )
  }

  return (
    <div className={className} suppressHydrationWarning={true}>
      {children}
    </div>
  )
}
