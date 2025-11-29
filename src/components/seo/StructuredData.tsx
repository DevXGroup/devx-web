import Script from 'next/script'

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
    name: 'DevX Group LLC',
    alternateName: 'DevX Group',
    url: 'https://devxgroup.io',
    logo: 'https://devxgroup.io/logo.png',
    image: 'https://devxgroup.io/og-image.jpg',
    description:
      'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation.',
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
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-442-544-0591',
      contactType: 'customer service',
      email: 'support@devxgroup.io',
      availableLanguage: 'English',
    },
    sameAs: ['https://linkedin.com/company/devx-group', 'https://github.com/devx-group'],
    serviceArea: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    knowsAbout: [
      'Software Development',
      'Custom Applications',
      'AI Solutions',
      'Machine Learning',
      'IoT Integration',
      'Digital Transformation',
      'Web Development',
      'Mobile Applications',
    ],
  }

  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://devxgroup.io/#organization',
    name: 'DevX Group LLC',
    image: 'https://devxgroup.io/og-image.jpg',
    url: 'https://devxgroup.io',
    telephone: '+1-442-544-0591',
    email: 'support@devxgroup.io',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: 'San Diego',
      addressRegion: 'CA',
      postalCode: '',
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
    '@id': 'https://devxgroup.io/#website',
    url: 'https://devxgroup.io',
    name: 'DevX Group - Elite Software Development Team',
    description:
      'DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation.',
    publisher: {
      '@type': 'Organization',
      name: 'DevX Group LLC',
      '@id': 'https://devxgroup.io/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://devxgroup.io/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://devxgroup.io/#organization',
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
