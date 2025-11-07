import { Metadata } from 'next'
import PricingPage from './PricingPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()
const pagePath = '/pricing'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Pricing',
    title: 'Flexible Engagements for High-Velocity Teams',
    subtitle: 'Rapid MVP • Growth Accelerator • Enterprise Delivery',
    focus: ['Dedicated Squads', 'Fractional Leadership', 'Support Retainers'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Pricing',
    title: 'Flexible Engagements for High-Velocity Teams',
    subtitle: 'Rapid MVP • Growth Accelerator • Enterprise Delivery',
    focus: ['Dedicated Squads', 'Fractional Leadership', 'Support Retainers'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Software Development Pricing | Custom Solutions & Enterprise Packages | DevX Group',
  description:
    'Transparent pricing for professional software development services. Choose from Rapid MVP, Growth Accelerator, or Enterprise packages. Custom quotes available for complex projects.',
  keywords: [
    'software development pricing',
    'custom solutions pricing',
    'enterprise packages',
    'mvp development cost',
    'transparent pricing',
    'software development rates',
  ],
  openGraph: {
    title: 'Software Development Pricing | Custom Solutions & Enterprise Packages | DevX Group',
    description:
      'Transparent pricing for professional software development services. Choose from Rapid MVP, Growth Accelerator, or Enterprise packages.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Software Development Pricing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Development Pricing | DevX Group',
    description:
      'Transparent pricing for professional software development services. Rapid MVP, Growth Accelerator, and Enterprise packages.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Pricing() {
  return <PricingPage />
}
