'use client'

import { useState, useEffect } from 'react'
import useOnScreen from '@/hooks/use-on-screen'

interface LazyComponentProps {
  component: React.ComponentType
  fallback?: React.ReactNode
  rootMargin?: string
}

export default function LazyComponent({
  component: Component,
  fallback = <div className="h-96" />,
  rootMargin = '100px',
}: LazyComponentProps) {
  const [elementRef, isOnScreen] = useOnScreen({
    rootMargin,
    threshold: 0.1,
  })
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOnScreen) {
      setShouldRender(true)
    }
  }, [isOnScreen])

  return <div ref={elementRef}>{shouldRender ? <Component /> : fallback}</div>
}
