"use client"

import { useEffect, useRef } from "react"

export function useSmoothScroll() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    // Store the original scroll position
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop
    let ticking = false

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Add a class to indicate scrolling direction
          if (scrollTop > lastScrollTop) {
            document.body.classList.add("is-scrolling-down")
            document.body.classList.remove("is-scrolling-up")
          } else {
            document.body.classList.add("is-scrolling-up")
            document.body.classList.remove("is-scrolling-down")
          }

          // Add a general scrolling class
          document.body.classList.add("is-scrolling")

          // Clear any existing timeout
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }

          // Set a timeout to remove the scrolling class
          timeoutRef.current = setTimeout(() => {
            document.body.classList.remove("is-scrolling")
            document.body.classList.remove("is-scrolling-up")
            document.body.classList.remove("is-scrolling-down")
          }, 100)

          lastScrollTop = scrollTop
          ticking = false
        })

        ticking = true
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])
}
