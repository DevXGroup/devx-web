import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Error Testing | DevX Group Development Tools',
  description: 'Internal error testing page for DevX Group development and debugging purposes.',
  robots: {
    index: false,
    follow: false,
  },
}

import TestErrorClient from './TestErrorClient'

export default function TestErrorPage() {
  return <TestErrorClient />
}
