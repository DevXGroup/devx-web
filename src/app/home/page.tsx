import { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'DevX Group - Elite Software Development Team | Custom Applications & AI Solutions',
  description: 'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation. Build, launch, and scale your vision with our expert team.',
  keywords: ['software development', 'custom applications', 'AI solutions', 'ML', 'IoT', 'digital transformation', 'web development', 'mobile apps', 'San Diego', 'elite developers'],
  openGraph: {
    title: 'DevX Group - Elite Software Development Team | Custom Applications & AI Solutions',
    description: 'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation.',
    url: 'https://devxgroup.io/home',
    siteName: 'DevX Group',
    images: [
      {
        url: 'https://devxgroup.io/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'DevX Group - Elite Software Development Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevX Group - Elite Software Development Team',
    description: 'Elite software development services including custom applications, AI/ML solutions, and digital transformation.',
    images: ['https://devxgroup.io/twitter-image-home.jpg'],
  },
  alternates: {
    canonical: 'https://devxgroup.io',
  },
}

export default function Home() {
  return <HomePageClient />
}
