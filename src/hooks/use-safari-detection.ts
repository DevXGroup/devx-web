"use client"

import { useState, useEffect } from "react"

export function useSafariDetection() {
  const [isSafari, setIsSafari] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // More comprehensive Safari detection
    const userAgent = navigator.userAgent.toLowerCase()
    const isSafariBrowser = 
      /safari/.test(userAgent) && 
      !/chrome/.test(userAgent) && 
      !/chromium/.test(userAgent) && 
      !/edg/.test(userAgent) ||
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)

    setIsSafari(isSafariBrowser)
  }, [])

  return { isSafari, isClient }
}