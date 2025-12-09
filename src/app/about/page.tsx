import { Metadata } from 'next'
import AboutPage from './AboutPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/about'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'About DevX Group',
    title: 'Product Engineers with Enterprise DNA',
    subtitle: 'San Diego HQ · Global Delivery · Founder Friendly',
    focus: ['AI Leadership', 'Design Systems', 'Cloud Architecture', 'Dedicated Teams'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'About DevX Group',
    title: 'Product Engineers with Enterprise DNA',
    subtitle: 'San Diego HQ · Global Delivery · Founder Friendly',
    focus: ['AI Leadership', 'Design Systems', 'Cloud Architecture', 'Dedicated Teams'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'About DevX Group | Elite Software Development Team | San Diego, California',
  description:
    'Learn about DevX Group LLC - an elite software development team based in San Diego, California. Meet our experienced developers and discover our mission to build, launch, and scale innovative software solutions.',
  keywords: [
    'about devx group',
    'software development team',
    'san diego developers',
    'elite programmers',
    'custom software company',
    'ai ml experts',
  ],
  openGraph: {
    title: 'About DevX Group | Elite Software Development Team | San Diego, California',
    description:
      'Learn about DevX Group LLC - an elite software development team based in San Diego, California. Meet our experienced developers and discover our mission.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'About DevX Group - Elite Development Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About DevX Group | Elite Software Development Team',
    description:
      'Learn about DevX Group LLC - elite software development team based in San Diego, California.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function About() {
  return <AboutPage />
}
