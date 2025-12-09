import { Metadata } from 'next'
import FeaturesPage from '@/dev-features/FeaturesPage'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Development Features | DevX Group Internal Tools',
  description: 'Internal development features and tools for DevX Group development process.',
  robots: {
    index: false,
    follow: false,
  },
}

// Dev-only route - only accessible in development
export default function DevFeaturesRoute() {
  return <FeaturesPage />
}
