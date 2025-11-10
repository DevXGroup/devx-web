'use client'

import type { ReactNode } from 'react'
import { useFontConsistency } from '@/hooks/use-font-consistency'

interface FontConsistencyProviderProps {
  children: ReactNode
}

export function FontConsistencyProvider({ children }: FontConsistencyProviderProps) {
  useFontConsistency()

  return <>{children}</>
}
