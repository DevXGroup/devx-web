import { useState, useEffect, useRef } from 'react'

// This one, is used in order to prevent re-renders during scrolling. (uses UseRef instead of UseState)
export const useScrollRef = () => {
  const scrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollYRef
}
