import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DevX Group - Elite Software Development Team'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  const logoData = await fetch(
    new URL('../../public/images/logos/devx-logo-og.png', import.meta.url)
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4B0082 0%, #9d4edd 50%, #C71585 100%)',
          position: 'relative',
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Logo at top */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img width="200" src={logoData as any} alt="DevX logo" />
        </div>

        {/* Company name */}
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            fontWeight: 700,
            background: 'linear-gradient(to right, #FFFFFF, #E0BBE4)',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            marginTop: '40px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          DevX Group
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: 'rgba(255, 255, 255, 0.95)',
            fontWeight: 600,
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.3,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Elite Software Development | AI Solutions | Digital Transformation
        </div>

        {/* Location badge */}
        <div
          style={{
            display: 'flex',
            marginTop: '48px',
            padding: '12px 32px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: 24,
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          📍 San Diego, California
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
