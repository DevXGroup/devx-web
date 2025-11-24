import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/og'

const routes = [
  '/',
  '/home',
  '/about',
  '/services',
  '/portfolio',
  '/pricing',
  '/contact',
  '/privacy',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const lastModified = new Date()

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1.0 : 0.8,
  }))
}
