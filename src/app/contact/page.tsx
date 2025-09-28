import { Metadata } from 'next'
import ContactPage from "./ContactPage"

export const metadata: Metadata = {
  title: 'Contact DevX Group | Get a Free Software Development Consultation',
  description: 'Contact DevX Group for your software development needs. Schedule a free consultation, get a custom quote, or discuss your project requirements. Phone: +1 (442) 544-0591',
  keywords: ['contact devx group', 'software development consultation', 'free consultation', 'custom quote', 'san diego software developers', 'project requirements'],
  openGraph: {
    title: 'Contact DevX Group | Get a Free Software Development Consultation',
    description: 'Contact DevX Group for your software development needs. Schedule a free consultation, get a custom quote, or discuss your project requirements.',
    url: 'https://devxgroup.io/contact',
    siteName: 'DevX Group',
    images: [
      {
        url: 'https://devxgroup.io/og-image-contact.jpg',
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
    description: 'Contact DevX Group for your software development needs. Schedule a free consultation or get a custom quote.',
    images: ['https://devxgroup.io/twitter-image-contact.jpg'],
  },
  alternates: {
    canonical: 'https://devxgroup.io/contact',
  },
}

export default function Contact() {
  return <ContactPage />
}
