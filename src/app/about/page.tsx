import { Metadata } from 'next'
import AboutPage from "./AboutPage"

export const metadata: Metadata = {
  title: 'About DevX Group | Elite Software Development Team | San Diego, California',
  description: 'Learn about DevX Group LLC - an elite software development team based in San Diego, California. Meet our experienced developers and discover our mission to build, launch, and scale innovative software solutions.',
  keywords: ['about devx group', 'software development team', 'san diego developers', 'elite programmers', 'custom software company', 'ai ml experts'],
  openGraph: {
    title: 'About DevX Group | Elite Software Development Team | San Diego, California',
    description: 'Learn about DevX Group LLC - an elite software development team based in San Diego, California. Meet our experienced developers and discover our mission.',
    url: 'https://devxgroup.io/about',
    siteName: 'DevX Group',
    images: [
      {
        url: 'https://devxgroup.io/og-image-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About DevX Group - Elite Development Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About DevX Group | Elite Software Development Team',
    description: 'Learn about DevX Group LLC - elite software development team based in San Diego, California.',
    images: ['https://devxgroup.io/twitter-image-about.jpg'],
  },
  alternates: {
    canonical: 'https://devxgroup.io/about',
  },
}

export default function About() {
  return <AboutPage />
}
