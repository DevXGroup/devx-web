'use client'

// NOTE: Next.js 16 has a known issue where global-error is pre-rendered
// despite being a client component, causing React context errors with Framer Motion.
// This simplified implementation avoids context dependencies.
// See: https://github.com/vercel/next.js/issues/...

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return null
}
