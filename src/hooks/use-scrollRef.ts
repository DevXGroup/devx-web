import { useEffect, useRef, useCallback } from 'react'

const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// This one, is used in order to prevent re-renders during scrolling. (uses UseRef instead of UseState)
export const useScrollRef = ({ throttleDelay = 8 }) => {
  const scrollYRef = useRef(0)

  const handleScroll = useCallback(
    throttle(() => {
      scrollYRef.current = window.scrollY
    }, throttleDelay),
    []
  )

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return scrollYRef
}
