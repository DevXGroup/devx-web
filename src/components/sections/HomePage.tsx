'use client'

import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Technologies from '@/components/sections/Technologies'
import Process from '@/components/sections/Process'

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen min-h-[100vh] overflow-x-hidden">
      <Hero />
      <Features />
      <Technologies />
      <Process />
      {/* Footer is now handled by the layout */}
    </div>
  )
}
