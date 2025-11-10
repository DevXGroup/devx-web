'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TestErrorClient() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('This is a test error to demonstrate the error page with FuzzyText!')
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-white text-3xl font-['IBM_Plex_Mono'] font-bold">Error Page Test</h1>

        <p className="text-white/70 font-['IBM_Plex_Sans']">
          Use these buttons to test the different error pages with FuzzyText effects:
        </p>

        <div className="space-y-4">
          <button
            onClick={() => setShouldError(true)}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-all duration-200 font-['IBM_Plex_Mono'] font-medium"
          >
            Trigger Error Page
          </button>

          <Link
            href="/this-page-does-not-exist"
            className="block w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition-all duration-200 font-['IBM_Plex_Mono'] font-medium text-center"
          >
            Go to 404 Page
          </Link>

          <Link
            href="/home"
            className="block w-full border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-lg transition-all duration-200 font-['IBM_Plex_Mono'] font-medium text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
