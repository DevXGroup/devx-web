"use client"

import { useState, useEffect } from "react"

export function useBackdropFilterSupport() {
  const [isSupported, setIsSupported] = useState(() => {
    if (typeof window === "undefined") return true
    
    const prefixes = ["", "-webkit-", "-moz-", "-o-", "-ms-"]
    const element = document.createElement("div")

    return prefixes.some((prefix) => {
      element.style.cssText = `${prefix}backdrop-filter: blur(1px)`
      return element.style.length > 0
    })
  })

  return isSupported
}
