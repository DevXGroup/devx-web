import { Metadata } from 'next'
import PrivacyPageClient from './PrivacyPageClient'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/privacy'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Privacy Policy',
    title: 'Secure & Trusted Product Partnerships',
    subtitle: 'GDPR · CCPA · SOC 2 Ready',
    focus: ['Data Security', 'AI Governance', 'Enterprise Compliance', 'Privacy First'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Privacy Policy',
    title: 'Secure & Trusted Product Partnerships',
    subtitle: 'GDPR · CCPA · SOC 2 Ready',
    focus: ['Data Security', 'AI Governance', 'Enterprise Compliance', 'Privacy First'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Privacy Policy | DevX Group | Data Protection & Security',
  description:
    'DevX Group Privacy Policy - Learn how we protect your data, handle AI responsibly, and maintain enterprise-grade security for all client engagements. GDPR, CCPA, and SOC 2 compliant practices.',
  keywords: [
    'privacy policy',
    'data protection',
    'GDPR compliance',
    'CCPA compliance',
    'SOC 2',
    'data security',
    'AI governance',
    'devx group privacy',
  ],
  openGraph: {
    title: 'Privacy Policy | DevX Group | Data Protection & Security',
    description:
      'Learn how DevX Group protects your data, handles AI responsibly, and maintains enterprise-grade security for all client engagements.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Privacy Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | DevX Group',
    description: 'Learn how DevX Group protects your data and maintains enterprise-grade security.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Privacy() {
  return <PrivacyPageClient />
}
