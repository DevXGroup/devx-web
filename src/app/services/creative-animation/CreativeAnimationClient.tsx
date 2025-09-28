'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import for 3D components to avoid SSR issues
const CreativeAnimationHero = dynamic(() => import('./CreativeAnimationHero'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl font-mono">Loading immersive experience...</div>
    </div>
  ),
})

// Dynamic imports for performance-heavy animation sections
const MorphingTextSection = dynamic(() => import('./sections/MorphingTextSection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
})

const Interactive3DShowcase = dynamic(() => import('./sections/Interactive3DShowcase'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
})

const LiquidMotionSection = dynamic(() => import('./sections/LiquidMotionSection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
})

const ScrollTriggeredShowcase = dynamic(() => import('./sections/ScrollTriggeredShowcase'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
})

const FloatingElementsSection = dynamic(() => import('./sections/FloatingElementsSection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
})

const CreativeGallerySection = dynamic(() => import('./sections/CreativeGallerySection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
})

const ExplosiveCTASection = dynamic(() => import('./sections/ExplosiveCTASection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
})

const FluidCursorSection = dynamic(() => import('./sections/FluidCursorSection'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
})

export default function CreativeAnimationClient() {
  return (
    <main className="bg-black min-h-screen">
      <Suspense fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-xl font-mono">Initializing...</div>
        </div>
      }>
        <CreativeAnimationHero />
      </Suspense>

      {/* Mind-blowing Animation Sections */}
      <Suspense fallback={<div className="h-screen bg-black" />}>
        <MorphingTextSection />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <Interactive3DShowcase />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <LiquidMotionSection />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <ScrollTriggeredShowcase />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <FloatingElementsSection />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <CreativeGallerySection />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <FluidCursorSection />
      </Suspense>

      <Suspense fallback={<div className="h-screen bg-black" />}>
        <ExplosiveCTASection />
      </Suspense>
    </main>
  )
}