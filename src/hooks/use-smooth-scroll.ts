"use client"

import { useEffect } from "react"

export function useSmoothScroll() {
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
          if (window.smoothScrollTimeout) {
            clearTimeout(window.smoothScrollTimeout)
          }

          // Set a timeout to remove the scrolling class
          window.smoothScrollTimeout = setTimeout(() => {
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
      if (window.smoothScrollTimeout) {
        clearTimeout(window.smoothScrollTimeout)
      }
    }
  }, [])
}
