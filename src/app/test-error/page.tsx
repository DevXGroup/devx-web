import { Metadata } from 'next'
import TestErrorClient from './TestErrorClient'

export const dynamic = 'force-static'

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
