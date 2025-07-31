"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/common/Navbar"
import Footer from "@/common/Footer"
import ScrollToTop from "@/components/ScrollToTop"

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isEntryPage = pathname === "/"

  if (isEntryPage) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  )
}