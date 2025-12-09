import { Metadata } from 'next'
import HomePageClient from './HomePageClient'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/home'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Elite Software Partners',
    title: 'Build Products Faster',
    subtitle: 'Custom Applications • Agentic AI • Cloud & IoT Platforms',
    focus: ['Product Engineering', 'Agentic AI', 'Cloud Modernization'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Elite Software Partners',
    title: 'Build Products Faster',
    subtitle: 'Custom Applications • Agentic AI • Cloud & IoT Platforms',
    focus: ['Product Engineering', 'Agentic AI', 'Cloud Modernization'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Elite Software Development Team | Custom Applications & AI Solutions',
  description:
    'Elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation. Build, launch, and scale your vision with our expert team.',
  keywords: [
    'software development',
    'custom applications',
    'AI solutions',
    'ML',
    'IoT',
    'digital transformation',
    'web development',
    'mobile apps',
    'San Diego',
    'elite developers',
  ],
  openGraph: {
    title: 'Elite Software Development Team | Custom Applications & AI Solutions',
    description:
      'Elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
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
    title: 'Elite Software Development Team',
    description:
      'Elite software development services including custom applications, AI/ML solutions, and digital transformation.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Home() {
  return <HomePageClient />
}
