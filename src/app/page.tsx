import { Metadata } from 'next'
import EntryPage from '@sections/EntryPage'

export const metadata: Metadata = {
  title: 'DevX Group - Elite Software Development Team | Custom Applications & AI Solutions',
  description: 'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation. Build, launch, and scale your vision with our expert team.',
}

export default function Home() {
  return <EntryPage />
}
