"use client"

import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Process from "@/components/Process"
import Technologies from "@/components/Technologies"
import DevelopmentTools from "@/components/DevelopmentTools"
import ScrollToTop from "@/components/ScrollToTop"
import Footer from "@/common/Footer"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Process />
      <Technologies />
      <DevelopmentTools />
      <Footer />
      <ScrollToTop />
    </>
  )
}
