import { Metadata } from 'next'
import ContactPage from './ContactPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/contact'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: "Let's talk",
    title: 'Schedule a Free Consultation',
    subtitle: 'Custom Software • Agentic AI • Cloud Modernization',
    focus: ['Discovery Workshops', 'Product Roadmaps', 'Build & Scale'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: "Let's talk",
    title: 'Schedule a Free Consultation',
    subtitle: 'Custom Software • Agentic AI • Cloud Modernization',
    focus: ['Discovery Workshops', 'Product Roadmaps', 'Build & Scale'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Software Development Consultation',
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
    title: 'Contact Us | Get a Free Software Development Consultation',
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
    title: 'Contact Us | Free Software Development Consultation',
    description:
      'Contact DevX Group for your software development needs. Schedule a free consultation or get a custom quote.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is your typical response time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We typically respond to all inquiries within 24 hours during business days. For urgent matters, we prioritize faster response times.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we work with clients worldwide. Our team is experienced in remote collaboration and can accommodate different time zones.',
      },
    },
    {
      '@type': 'Question',
      name: 'What information should I provide for a quote?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To provide an accurate quote, we need details about your project scope, timeline, technical requirements, and any specific features you need.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you handle project revisions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We include revision rounds in our project plans. The number of revisions depends on your package, but we're always flexible to ensure your satisfaction.",
      },
    },
  ],
}

export default function Contact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactPage />
    </>
  )
}
