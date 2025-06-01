"use client"

import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Technologies from "@/components/Technologies"
import Process from "@/components/Process"

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      <Hero />
      <Features />
      <Technologies />
      <Process />
      {/* Footer is now handled by the layout */}
    </div>
  )
}
