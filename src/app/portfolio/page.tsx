import { Metadata } from 'next'
import PortfolioPage from './PortfolioPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'
import StructuredData from '@/components/seo/StructuredData'

const siteUrl = getSiteUrl()
const pagePath = '/portfolio'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Client Case Studies',
    title: 'High-impact Software & AI Delivery',
    subtitle: 'E-commerce • SaaS • AI Platforms • Mobile',
    focus: ['Product Engineering', 'AI Solutions', 'Experience Design', 'Cloud Ops'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Client Case Studies',
    title: 'High-impact Software & AI Delivery',
    subtitle: 'E-commerce • SaaS • AI Platforms • Mobile',
    focus: ['Product Engineering', 'AI Solutions', 'Experience Design', 'Cloud Ops'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Portfolio | Software Development Projects & Case Studies | DevX Group',
  description:
    "Explore DevX Group's portfolio of successful software development projects including e-commerce platforms, mobile apps, AI solutions, Agentic AI implementations, RAG systems, and digital transformation case studies.",
  keywords: [
    'portfolio',
    'software development projects',
    'case studies',
    'e-commerce platforms',
    'mobile applications',
    'ai solutions',
    'project showcase',
    'agentic AI projects',
    'RAG implementation',
    'AI automation case studies',
  ],
  openGraph: {
    title: 'Portfolio | Software Development Projects & Case Studies | DevX Group',
    description:
      "Explore DevX Group's portfolio of successful software development projects including e-commerce platforms, mobile apps, AI solutions, and digital transformation case studies.",
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Portfolio - Software Development Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | DevX Group Software Development Projects',
    description:
      'Explore successful software development projects including e-commerce platforms, mobile apps, and AI solutions.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Portfolio() {
  return (
    <>
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: siteUrl },
          { name: 'Portfolio', url: pageUrl },
        ]}
      />
      <PortfolioPage />
    </>
  )
}
