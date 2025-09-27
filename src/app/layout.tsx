import type React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import ConditionalLayout from '@layout/ConditionalLayout'
import { BrowserCompatibilityDetector } from '@layout/BrowserCompatibilityDetector'
import ErrorBoundary from '@layout/ErrorBoundary'
import GlobalTransition from '@/components/transitions/GlobalTransition'
import ScrollToTop from '@layout/ScrollToTop'

// Configure IBM Plex Sans as primary body font
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
  preload: true,
})

// Configure IBM Plex Mono for headings and code
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'DevX - Modern Software Development',
  description: 'Professional software development services for modern businesses',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} dark`} style={{ backgroundColor: '#000000' }}>
      <body className="bg-black text-white font-sans antialiased" style={{ backgroundColor: '#000000', transition: 'none' }}>
        <BrowserCompatibilityDetector />
        <ErrorBoundary>
          <div style={{ backgroundColor: '#000000' }}>
            <ConditionalLayout>{children}</ConditionalLayout>
            <ScrollToTop />
            <GlobalTransition />
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
}
