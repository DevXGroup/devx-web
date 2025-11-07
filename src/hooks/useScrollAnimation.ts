'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

type UseScrollAnimationOptions = {
  margin?: string
  amount?: number | 'some' | 'all'
  animationClass?: string
  reflowDelay?: number
  resetDelay?: number
  exitDelay?: number
  disabled?: boolean
  shouldResetOnExit?: boolean
}

function isElementFullyOut(node: HTMLElement) {
  if (typeof window === 'undefined') {
    return false
  }

  const rect = node.getBoundingClientRect()
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  return rect.bottom <= 0 || rect.top >= viewportHeight
}

export function useScrollAnimation<T extends HTMLElement>(options?: UseScrollAnimationOptions) {
  const {
    margin = '-15% 0px -15% 0px',
    amount = 0.35,
    animationClass = 'slide-in-blurred-bottom',
    reflowDelay = 30,
    resetDelay = options?.exitDelay ?? 220,
    disabled = false,
    shouldResetOnExit = false,
  } = options ?? {}

  const elementRef = useRef<T | null>(null)
  const isInView = useInView(elementRef, { margin: margin as any, amount })
  const hasTriggeredRef = useRef(false)
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const node = elementRef.current
    if (!node) {
      return
    }

    if (disabled) {
      node.classList.remove(animationClass)
      hasTriggeredRef.current = false
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current)
        enterTimeoutRef.current = null
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
        resetTimeoutRef.current = null
      }
      return
    }

    if (isInView && !hasTriggeredRef.current) {
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current)
      }

      enterTimeoutRef.current = setTimeout(
        () => {
          const current = elementRef.current
          if (!current) {
            return
          }

          current.classList.remove(animationClass)
          void current.offsetWidth
          current.classList.add(animationClass)
          hasTriggeredRef.current = true
          enterTimeoutRef.current = null
        },
        Math.max(reflowDelay, 0)
      )
    }
  }, [animationClass, disabled, isInView, reflowDelay])

  useEffect(() => {
    if (disabled || !shouldResetOnExit || typeof window === 'undefined') {
      return
    }

    const handle = () => {
      const node = elementRef.current
      if (!node) {
        if (resetTimeoutRef.current) {
          clearTimeout(resetTimeoutRef.current)
          resetTimeoutRef.current = null
        }
        hasTriggeredRef.current = false
        return
      }

      if (!isInView && hasTriggeredRef.current && isElementFullyOut(node)) {
        if (resetTimeoutRef.current) {
          clearTimeout(resetTimeoutRef.current)
        }

        resetTimeoutRef.current = setTimeout(
          () => {
            const current = elementRef.current
            if (!current) {
              hasTriggeredRef.current = false
              resetTimeoutRef.current = null
              return
            }

            current.classList.remove(animationClass)
            hasTriggeredRef.current = false
            resetTimeoutRef.current = null
          },
          Math.max(resetDelay, 0)
        )
      }
    }

    handle()

    window.addEventListener('scroll', handle, { passive: true })
    window.addEventListener('resize', handle)
    return () => {
      window.removeEventListener('scroll', handle)
      window.removeEventListener('resize', handle)

      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current)
        enterTimeoutRef.current = null
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
        resetTimeoutRef.current = null
      }
    }
  }, [animationClass, disabled, isInView, resetDelay, shouldResetOnExit])

  return { elementRef, isInView }
}
