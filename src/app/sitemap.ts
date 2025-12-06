import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/og'

const routes = [
  { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/home', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/services/creative-animation', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const lastModified = new Date()

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
