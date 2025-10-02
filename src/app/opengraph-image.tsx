import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DevX Group - Elite Software Development Team'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
          <svg width="140" height="56" viewBox="0 0 250 100">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#E0BBE4', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#FFF', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#E0BBE4', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              d="M 40 30 Q 10 30, 10 50 Q 10 70, 40 70 Q 60 70, 70 50 Q 80 30, 100 30 Q 110 30, 115 35 Q 120 40, 125 50 Q 130 40, 135 35 Q 140 30, 150 30 Q 180 30, 210 50 Q 240 70, 240 50 Q 240 30, 210 30 Q 190 30, 180 50 Q 170 70, 150 70 Q 140 70, 135 65 Q 130 60, 125 50 Q 120 60, 115 65 Q 110 70, 100 70 Q 70 70, 40 50 Q 10 30, 40 30 Z"
              fill="url(#logoGradient)"
            />
          </svg>
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
