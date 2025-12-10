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
  return (
    <>
      {/* SEO Content - Server-rendered for crawlers */}
      <div className="sr-only">
        <h1>DevX Group - Elite Software Development Team</h1>
        <p>
          Elite software team shipping polished products at startup speed. We deliver custom
          applications, AI/ML solutions, IoT hardware integration, and digital transformation
          services. Build, launch, and scale your vision with our expert team in San Diego.
        </p>
        <h2>Our Services</h2>
        <ul>
          <li>Custom Application Development</li>
          <li>AI and Machine Learning Solutions</li>
          <li>Agentic AI Implementation</li>
          <li>Cloud Platform Modernization</li>
          <li>IoT Hardware Integration</li>
          <li>Digital Transformation Consulting</li>
          <li>Mobile App Development</li>
          <li>Web Development</li>
        </ul>
        <h2>Why Choose DevX Group</h2>
        <p>
          With 15+ years of experience at companies like Amazon, Qualcomm, and Viasat, our elite
          team delivers polished products with the speed of a startup. We combine deep engineering
          expertise with collaborative leadership to turn your vision into reality.
        </p>
      </div>

      <HomePageClient />
    </>
  )
}
