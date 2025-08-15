import Hero from '@sections/Hero'
import Features from '@sections/Features'
import Process from '@sections/Process'
import DevelopmentTools from '@sections/DevelopmentTools'

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