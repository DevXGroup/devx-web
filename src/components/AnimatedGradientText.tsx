"use client"

import type React from "react"

import { useEffect } from "react"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export const AnimatedGradientText = ({ children, className = "" }: AnimatedGradientTextProps) => {
  // Add the keyframes animation to the document if it doesn't exist
  useEffect(() => {
    if (!document.getElementById("gradient-animation-style")) {
      const style = document.createElement("style")
      style.id = "gradient-animation-style"
      style.innerHTML = `
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `
      document.head.appendChild(style)
    }

    return () => {
      // Clean up only if component is unmounted and no other instances exist
      if (document.querySelectorAll("[data-gradient-text]").length <= 1) {
        const style = document.getElementById("gradient-animation-style")
        if (style) {
          document.head.removeChild(style)
        }
      }
    }
  }, [])

  return (
    <span
      data-gradient-text
      className={`bg-clip-text text-transparent inline-block ${className}`}
      style={{
        backgroundImage: "linear-gradient(-45deg, #4CD787, #CFB53B, #9d4edd, #4834D4)",
        backgroundSize: "300% 300%",
        animation: "gradient-animation 6s ease infinite",
      }}
    >
      {children}
    </span>
  )
}
