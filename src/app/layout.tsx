import type React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import ConditionalLayout from '@/components/ConditionalLayout'
import { BrowserCompatibilityDetector } from '@/components/BrowserCompatibilityDetector'

// Configure IBM Plex Mono with only available weights (300-700)
const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'monospace'],
  preload: true,
})

// Configure IBM Plex Sans with available weights
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  preload: true,
})

export const metadata: Metadata = {
  title: 'DevX - Modern Software Development',
  description: 'Professional software development services for modern businesses',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} dark`}>
      <body className="bg-black text-white font-sans">
        <BrowserCompatibilityDetector />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
