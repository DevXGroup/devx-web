import { useState, useEffect, useRef } from 'react'

interface UseOnScreenOptions {
  rootMargin?: string
  threshold?: number | number[]
}

const useOnScreen = (options?: UseOnScreenOptions) => {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Destructure options to use primitives in dependency array
  const rootMargin = options?.rootMargin
  const threshold = options?.threshold

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observerOptions: IntersectionObserverInit = {}
    if (rootMargin !== undefined) observerOptions.rootMargin = rootMargin
    if (threshold !== undefined) observerOptions.threshold = threshold

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry?.isIntersecting ?? false)
    }, observerOptions)

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [rootMargin, threshold])

  return [ref, isIntersecting] as const
}

export default useOnScreen
