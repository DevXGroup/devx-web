import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Process from '@/components/Process'
import DevelopmentTools from '@/components/DevelopmentTools'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-black">
      <Hero />
      <Features />
      <Process />
      <DevelopmentTools />
    </main>
  )
}