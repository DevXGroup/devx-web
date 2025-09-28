import { Metadata } from 'next'
import PortfolioPage from "./PortfolioPage"

export const metadata: Metadata = {
  title: 'Portfolio | Software Development Projects & Case Studies | DevX Group',
  description: 'Explore DevX Group\'s portfolio of successful software development projects including e-commerce platforms, mobile apps, AI solutions, and digital transformation case studies.',
  keywords: ['portfolio', 'software development projects', 'case studies', 'e-commerce platforms', 'mobile applications', 'ai solutions', 'project showcase'],
  openGraph: {
    title: 'Portfolio | Software Development Projects & Case Studies | DevX Group',
    description: 'Explore DevX Group\'s portfolio of successful software development projects including e-commerce platforms, mobile apps, AI solutions, and digital transformation case studies.',
    url: 'https://devxgroup.io/portfolio',
    siteName: 'DevX Group',
    images: [
      {
        url: 'https://devxgroup.io/og-image-portfolio.jpg',
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
    description: 'Explore successful software development projects including e-commerce platforms, mobile apps, and AI solutions.',
    images: ['https://devxgroup.io/twitter-image-portfolio.jpg'],
  },
  alternates: {
    canonical: 'https://devxgroup.io/portfolio',
  },
}

export default function Portfolio() {
  return <PortfolioPage />
}
