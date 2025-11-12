'use client'

import { useEffect, useState } from 'react'
import FooterClient from './FooterClient'

/**
 * Client Component wrapper for Footer
 * Fetches version dynamically from API
 */
export default function Footer() {
  const [version, setVersion] = useState<string>('1.0.0')

  useEffect(() => {
    // Fetch version from API on mount
    fetch('/api/version')
      .then((res) => res.json())
      .then((data) => setVersion(data.version))
      .catch(() => setVersion('1.0.0'))
  }, [])

  return <FooterClient version={version} />
}
