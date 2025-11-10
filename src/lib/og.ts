const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://devxgroup.io'

const normalizeUrl = (url: string) => url.replace(/\/+$/, '')

export interface OgImageOptions {
  title?: string
  subtitle?: string
  eyebrow?: string
  focus?: string[]
}

const createAbsoluteUrl = (
  pathname: string,
  baseUrl = DEFAULT_SITE_URL,
  options?: OgImageOptions
) => {
  const url = new URL(pathname, baseUrl)

  if (options) {
    const { title, subtitle, eyebrow, focus } = options
    if (title) url.searchParams.set('title', title)
    if (subtitle) url.searchParams.set('subtitle', subtitle)
    if (eyebrow) url.searchParams.set('eyebrow', eyebrow)
    const focusItems = focus?.map((item) => item.trim()).filter(Boolean)
    if (focusItems && focusItems.length > 0) {
      url.searchParams.set('focus', focusItems.join('|'))
    }
  }

  return url.toString()
}

export const createOgImageUrl = (options?: OgImageOptions, baseUrl?: string) =>
  createAbsoluteUrl('/opengraph-image', normalizeUrl(baseUrl ?? DEFAULT_SITE_URL), options)

export const createTwitterImageUrl = (options?: OgImageOptions, baseUrl?: string) =>
  createAbsoluteUrl('/twitter-image', normalizeUrl(baseUrl ?? DEFAULT_SITE_URL), options)

export const getSiteUrl = (override?: string) => normalizeUrl(override ?? DEFAULT_SITE_URL)
