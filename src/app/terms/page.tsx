import { Metadata } from 'next'
import TermsPageClient from './TermsPageClient'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/terms'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Terms of Service',
    title: 'Strategic Partnership Terms',
    subtitle: 'Transparent Execution · Security First',
    focus: ['Clear Agreements', 'IP Protection', 'Delivery Standards', 'Enterprise Ready'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Terms of Service',
    title: 'Strategic Partnership Terms',
    subtitle: 'Transparent Execution · Security First',
    focus: ['Clear Agreements', 'IP Protection', 'Delivery Standards', 'Enterprise Ready'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Terms of Service | DevX Group | Software Development Agreements',
  description:
    'DevX Group Terms of Service - Clear partnership terms for custom software development, AI solutions, and digital product engineering. Transparent execution with enterprise-grade security.',
  keywords: [
    'terms of service',
    'software development agreement',
    'service terms',
    'IP protection',
    'development contract',
    'devx group terms',
    'enterprise software terms',
  ],
  openGraph: {
    title: 'Terms of Service | DevX Group | Software Development Agreements',
    description:
      'Clear partnership terms for custom software development, AI solutions, and digital product engineering with DevX Group.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Terms of Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | DevX Group',
    description:
      'Clear partnership terms for custom software development and AI solutions with DevX Group.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Terms() {
  return <TermsPageClient />
}
