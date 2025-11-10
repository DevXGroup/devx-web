import { Metadata } from 'next'
import ContactPage from './ContactPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()
const pagePath = '/contact'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: "Let's talk",
    title: 'Book a Strategy Session with DevX Group',
    subtitle: 'Custom Software • Agentic AI • Cloud Modernization',
    focus: ['Discovery Workshops', 'Product Roadmaps', 'Build & Scale'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: "Let's talk",
    title: 'Book a Strategy Session with DevX Group',
    subtitle: 'Custom Software • Agentic AI • Cloud Modernization',
    focus: ['Discovery Workshops', 'Product Roadmaps', 'Build & Scale'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Contact DevX Group | Get a Free Software Development Consultation',
  description:
    'Contact DevX Group for your software development needs. Schedule a free consultation, get a custom quote, or discuss your project requirements. Phone: +1 (442) 544-0591',
  keywords: [
    'contact devx group',
    'software development consultation',
    'free consultation',
    'custom quote',
    'san diego software developers',
    'project requirements',
  ],
  openGraph: {
    title: 'Contact DevX Group | Get a Free Software Development Consultation',
    description:
      'Contact DevX Group for your software development needs. Schedule a free consultation, get a custom quote, or discuss your project requirements.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Contact DevX Group - Free Software Development Consultation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact DevX Group | Free Software Development Consultation',
    description:
      'Contact DevX Group for your software development needs. Schedule a free consultation or get a custom quote.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Contact() {
  return <ContactPage />
}
