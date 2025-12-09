import { Metadata } from 'next'
import ServicesPage from './ServicesPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'
import StructuredData from '@/components/seo/StructuredData'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/services'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Services',
    title: 'Software Development & Agentic AI Services',
    subtitle: 'Custom Apps • Mobile • IoT • Automation',
    focus: ['Product Engineering', 'Agentic AI', 'RAG Systems', 'IoT & Cloud'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Services',
    title: 'Software Development & Agentic AI Services',
    subtitle: 'Custom Apps • Mobile • IoT • Automation',
    focus: ['Product Engineering', 'Agentic AI', 'RAG Systems', 'IoT & Cloud'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Software Development Services | Web Apps, Mobile Apps, AI & IoT Solutions',
  description:
    'Comprehensive software development services including web applications, mobile apps, AI/ML solutions, Agentic AI, RAG implementation, IoT hardware integration, and digital transformation. Expert developers delivering scalable solutions.',
  keywords: [
    'software development services',
    'web applications',
    'mobile apps',
    'AI solutions',
    'ML development',
    'IoT integration',
    'digital transformation',
    'custom software',
    'agentic AI',
    'RAG',
    'retrieval augmented generation',
    'AI agents',
    'workflow automation',
    'n8n',
    'make',
    'zapier',
  ],
  openGraph: {
    title: 'Software Development Services | Web Apps, Mobile Apps, AI & IoT Solutions',
    description:
      'Comprehensive software development services including web applications, mobile apps, AI/ML solutions, IoT hardware integration, and digital transformation.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Software Development Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Software Development Services',
    description:
      'Comprehensive software development services including web apps, mobile apps, AI/ML solutions, and IoT integration.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Services() {
  return (
    <>
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: siteUrl },
          { name: 'Services', url: pageUrl },
        ]}
      />
      <ServicesPage />
    </>
  )
}
