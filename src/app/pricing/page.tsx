import { Metadata } from 'next'
import PricingPage from "./PricingPage"

export const metadata: Metadata = {
  title: 'Software Development Pricing | Custom Solutions & Enterprise Packages | DevX Group',
  description: 'Transparent pricing for professional software development services. Choose from Rapid MVP, Growth Accelerator, or Enterprise packages. Custom quotes available for complex projects.',
  keywords: ['software development pricing', 'custom solutions pricing', 'enterprise packages', 'mvp development cost', 'transparent pricing', 'software development rates'],
  openGraph: {
    title: 'Software Development Pricing | Custom Solutions & Enterprise Packages | DevX Group',
    description: 'Transparent pricing for professional software development services. Choose from Rapid MVP, Growth Accelerator, or Enterprise packages.',
    url: 'https://devxgroup.io/pricing',
    siteName: 'DevX Group',
    images: [
      {
        url: 'https://devxgroup.io/og-image-pricing.jpg',
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
    description: 'Transparent pricing for professional software development services. Rapid MVP, Growth Accelerator, and Enterprise packages.',
    images: ['https://devxgroup.io/twitter-image-pricing.jpg'],
  },
  alternates: {
    canonical: 'https://devxgroup.io/pricing',
  },
}

export default function Pricing() {
  return <PricingPage />
}
