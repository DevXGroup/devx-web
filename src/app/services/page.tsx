import { Metadata } from 'next'
import ServicesPage from "./ServicesPage"

export const metadata: Metadata = {
  title: 'Software Development Services | Web Apps, Mobile Apps, AI & IoT Solutions',
  description: 'Comprehensive software development services including web applications, mobile apps, AI/ML solutions, Agentic AI, RAG implementation, IoT hardware integration, and digital transformation. Expert developers delivering scalable solutions.',
  keywords: ['software development services', 'web applications', 'mobile apps', 'AI solutions', 'ML development', 'IoT integration', 'digital transformation', 'custom software', 'agentic AI', 'RAG', 'retrieval augmented generation', 'AI agents', 'workflow automation', 'n8n', 'make', 'zapier'],
  openGraph: {
    title: 'Software Development Services | Web Apps, Mobile Apps, AI & IoT Solutions',
    description: 'Comprehensive software development services including web applications, mobile apps, AI/ML solutions, IoT hardware integration, and digital transformation.',
    url: 'https://devxgroup.io/services',
    siteName: 'DevX Group',
    images: [
      {
        url: 'https://devxgroup.io/og-image-services.jpg',
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
    title: 'Software Development Services | DevX Group',
    description: 'Comprehensive software development services including web apps, mobile apps, AI/ML solutions, and IoT integration.',
    images: ['https://devxgroup.io/twitter-image-services.jpg'],
  },
  alternates: {
    canonical: 'https://devxgroup.io/services',
  },
}

export default function Services() {
  return <ServicesPage />
}
