import { Metadata } from 'next'
import EntryPage from '@sections/EntryPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

// Remove forced dynamic rendering to improve performance, let Next.js handle it automatically
// export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pageUrl = siteUrl
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Elite Software Partners',
    title: 'Build Products Faster with DevX Group',
    subtitle: 'Custom Applications • Agentic AI • Cloud & IoT Platforms',
    focus: ['Product Engineering', 'Agentic AI', 'Cloud Modernization'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Elite Software Partners',
    title: 'Build Products Faster with DevX Group',
    subtitle: 'Custom Applications • Agentic AI • Cloud & IoT Platforms',
    focus: ['Product Engineering', 'Agentic AI', 'Cloud Modernization'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'DevX Group - Elite Software Development Team | Custom Applications & AI Solutions',
  description:
    'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation. Build, launch, and scale your vision with our expert team.',
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
    title: 'DevX Group - Elite Software Development Team | Custom Applications & AI Solutions',
    description:
      'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation.',
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
    title: 'DevX Group - Elite Software Development Team',
    description:
      'Elite software development services including custom applications, AI/ML solutions, and digital transformation.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Home() {
  return <EntryPage />
}
