import { Metadata } from 'next'
import TestErrorClient from './TestErrorClient'

// Force dynamic rendering to avoid context issues during static generation
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Error Testing | DevX Group Development Tools',
  description: 'Internal error testing page for DevX Group development and debugging purposes.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TestErrorPage() {
  return <TestErrorClient />
}
