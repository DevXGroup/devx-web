import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Creative Animation Services | Advanced UI/UX Animations | DevX Group',
  description: 'Immersive creative animation services including 3D interactions, morphing text, liquid motion effects, and scroll-triggered animations. Enhance your web applications with cutting-edge visual experiences.',
  keywords: ['creative animations', '3D web animations', 'UI UX animations', 'morphing text', 'liquid motion', 'scroll animations', 'interactive design', 'web experiences'],
  openGraph: {
    title: 'Creative Animation Services | Advanced UI/UX Animations | DevX Group',
    description: 'Immersive creative animation services including 3D interactions, morphing text, liquid motion effects, and scroll-triggered animations.',
    url: 'https://devxgroup.io/services/creative-animation',
    siteName: 'DevX Group',
    images: [
      {
        url: 'https://devxgroup.io/og-image-creative-animation.jpg',
        width: 1200,
        height: 630,
        alt: 'DevX Group Creative Animation Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Animation Services | DevX Group',
    description: 'Immersive creative animation services including 3D interactions, morphing text, and liquid motion effects.',
    images: ['https://devxgroup.io/twitter-image-creative-animation.jpg'],
  },
  alternates: {
    canonical: 'https://devxgroup.io/services/creative-animation',
  },
}

import CreativeAnimationClient from './CreativeAnimationClient'

export default function CreativeAnimationPage() {
  return <CreativeAnimationClient />
}