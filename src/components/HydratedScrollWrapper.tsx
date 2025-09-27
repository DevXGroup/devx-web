'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface HydratedScrollWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function HydratedScrollWrapper({ children, className }: HydratedScrollWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  return <div className={className}>{children}</div>
}