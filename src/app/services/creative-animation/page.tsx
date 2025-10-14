import { Metadata } from 'next'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()
const pagePath = '/services/creative-animation'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Creative Animation',
    title: 'Immersive UI Animation & Interactive 3D',
    subtitle: 'Motion systems that elevate product storytelling',
    focus: ['3D Experiences', 'Scroll Narratives', 'Liquid Motion', 'Microinteractions'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Creative Animation',
    title: 'Immersive UI Animation & Interactive 3D',
    subtitle: 'Motion systems that elevate product storytelling',
    focus: ['3D Experiences', 'Scroll Narratives', 'Liquid Motion', 'Microinteractions'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Creative Animation Services | Advanced UI/UX Animations | DevX Group',
  description: 'Immersive creative animation services including 3D interactions, morphing text, liquid motion effects, and scroll-triggered animations. Enhance your web applications with cutting-edge visual experiences.',
  keywords: ['creative animations', '3D web animations', 'UI UX animations', 'morphing text', 'liquid motion', 'scroll animations', 'interactive design', 'web experiences'],
  openGraph: {
    title: 'Creative Animation Services | Advanced UI/UX Animations | DevX Group',
    description: 'Immersive creative animation services including 3D interactions, morphing text, liquid motion effects, and scroll-triggered animations.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
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
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

import CreativeAnimationClient from './CreativeAnimationClient'

export default function CreativeAnimationPage() {
  return <CreativeAnimationClient />
}
