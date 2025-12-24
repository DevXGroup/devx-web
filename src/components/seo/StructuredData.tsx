import Script from 'next/script'
import { getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()

interface BreadcrumbItem {
  name: string
  url: string
}

interface FAQItem {
  question: string
  answer: string
}

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'localBusiness' | 'breadcrumb' | 'faq'
  breadcrumbs?: BreadcrumbItem[]
  faqs?: FAQItem[]
}

export default function StructuredData({
  type = 'organization',
  breadcrumbs,
  faqs,
}: StructuredDataProps) {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'DevX Group LLC',
    legalName: 'DevX Group LLC',
    alternateName: ['DevX Group', 'DevX'],
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/logos/devx-logo.png`,
      width: 500,
      height: 99,
      caption: 'DevX Group Logo',
    },
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    description:
      'Senior software team shipping high-impact web, mobile, and AI projects fast. AI automation, agentic AI solutions, rapid MVP launches, and stunning UI/UX with proven results and transparent pricing.',
    slogan: 'Your Vision, Engineered',
    foundingDate: '2023',
    founder: {
      '@type': 'Person',
      name: 'Max Sheikhizadeh',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-442-544-0591',
        contactType: 'customer service',
        email: 'support@devxgroup.io',
        availableLanguage: ['English'],
        areaServed: 'US',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'support@devxgroup.io',
        availableLanguage: ['English'],
      },
    ],
    sameAs: [
      'https://linkedin.com/company/devx-group',
      'https://github.com/DevXGroup',
      'https://twitter.com/devxgroup',
    ],
    knowsAbout: [
      'AI Automation',
      'Agentic AI Solutions',
      'Rapid MVP Launches',
      'UI/UX Design',
      'RAG Systems',
      'Intelligent Workflows',
      'Web Development',
      'Mobile Applications',
      'Machine Learning',
      'Cloud Computing',
      'DevOps',
      'Product Engineering',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Automation & Agentic AI Solutions',
          description: 'Intelligent AI automation, agentic AI platforms, and RAG systems',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Rapid MVP Development',
          description: 'Fast MVP launches for web and mobile applications',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'UI/UX Design & Development',
          description: 'Stunning UI/UX design with intelligent workflows',
        },
      },
    ],
  }

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: 'DevX Group LLC',
    image: `${siteUrl}/opengraph-image`,
    url: siteUrl,
    telephone: '+1-442-544-0591',
    email: 'support@devxgroup.io',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.7157,
      longitude: -117.1611,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    priceRange: '$$$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Credit Card, Bank Transfer, Cryptocurrency',
  }

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'DevX Group - Your Vision, Engineered',
    description:
      'Senior software team shipping high-impact web, mobile, and AI projects fast. AI automation, agentic AI solutions, rapid MVP launches, and stunning UI/UX.',
    publisher: {
      '@type': 'Organization',
      name: 'DevX Group LLC',
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
    },
  }

  const breadcrumbData = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }
    : null

  const faqData = faqs
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null

  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return websiteData
      case 'localBusiness':
        return localBusinessData
      case 'breadcrumb':
        return breadcrumbData
      case 'faq':
        return faqData
      default:
        return organizationData
    }
  }

  const structuredData = getStructuredData()
  if (!structuredData) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
