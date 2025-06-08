import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import Navbar from "@/common/Navbar"
import Footer from "@/common/Footer"
import ScrollToTop from "@/components/ScrollToTop"
import { BrowserCompatibilityDetector } from "@/components/BrowserCompatibilityDetector"

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "DevX - Modern Software Development",
  description: "Professional software development services for modern businesses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} dark`}>
      <body suppressHydrationWarning className="bg-black text-white font-sans">
        <BrowserCompatibilityDetector />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}
