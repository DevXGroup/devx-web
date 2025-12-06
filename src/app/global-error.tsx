'use client'

// NOTE: Next.js 16 has a known issue where global-error is pre-rendered
// despite being a client component, causing React context errors with Framer Motion.
// This simplified implementation avoids context dependencies.
// See: https://github.com/vercel/next.js/issues/...

// Force dynamic rendering to avoid prerendering issues with React context
export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default function GlobalError() {
  return (
    <html>
      <body>
        <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
          <h2>Something went wrong!</h2>
          <p>Please refresh the page to continue.</p>
        </div>
      </body>
    </html>
  )
}
