import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

interface OgSearchParams {
  title?: string
  subtitle?: string
  eyebrow?: string
  focus?: string
}

export const runtime = 'nodejs'
export const alt = 'DevX Group - Elite Software Development Team'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const DEFAULT_TITLE = 'DevX Group'
const DEFAULT_SUBTITLE = 'Custom Software • Agentic AI • Cloud Modernization'
const DEFAULT_EYEBROW = 'Elite Product Engineers'
const DEFAULT_FOCUS = ['AI Platforms', 'Agentic Automation', 'Product Design', 'Cloud Ops']
// Use the main logo which has better transparency
const LOGO_FILE = 'devx-logo.png'

const parseSearchParams = (params: OgSearchParams | undefined) => {
  const valueOf = (value: string | undefined) =>
    value && typeof value === 'string' ? value : undefined

  const title = valueOf(params?.title) ?? DEFAULT_TITLE
  const subtitle = valueOf(params?.subtitle) ?? DEFAULT_SUBTITLE
  const eyebrow = valueOf(params?.eyebrow) ?? DEFAULT_EYEBROW
  const focusValue = valueOf(params?.focus)

  const focus =
    focusValue
      ?.split('|')
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 4) ?? DEFAULT_FOCUS

  return { title, subtitle, eyebrow, focus }
}

export default async function Image({ searchParams }: { searchParams?: OgSearchParams }) {
  const logoPath = join(process.cwd(), 'public', 'images', 'logos', LOGO_FILE)
  const logoBytes = await readFile(logoPath)
  const logoSrc = `data:image/png;base64,${logoBytes.toString('base64')}`

  const { title, subtitle, eyebrow, focus } = parseSearchParams(searchParams)

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '72px 96px',
        background:
          'radial-gradient(circle at 20% 20%, rgba(157, 78, 221, 0.28), transparent 55%), radial-gradient(circle at 80% 30%, rgba(76, 215, 135, 0.25), transparent 45%), linear-gradient(135deg, #05020f 0%, #0f0a2f 45%, #031321 100%)',
        position: 'relative',
        color: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
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
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '18px 28px',
            borderRadius: 999,
            background: 'rgba(15, 23, 42, 0.72)',
            border: '1px solid rgba(148, 163, 184, 0.22)',
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4CD787 0%, #9d4edd 100%)',
              boxShadow: '0 0 12px rgba(157, 78, 221, 0.45)',
            }}
          />
          {eyebrow}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            color: 'rgba(226, 232, 240, 0.95)',
            maxWidth: 460,
            fontSize: 26,
            lineHeight: 1.5,
          }}
        >
          <div
            style={{
              width: 240,
              height: 240,
              borderRadius: '28px',
              backgroundImage:
                'radial-gradient(circle at 30% 30%, rgba(157, 78, 221, 0.15), transparent 70%), radial-gradient(circle at 70% 70%, rgba(76, 215, 135, 0.12), transparent 65%)',
              backgroundColor: 'rgba(15, 23, 42, 0.25)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow:
                '0 35px 100px rgba(18, 0, 60, 0.35), inset 0 0 40px rgba(157, 78, 221, 0.08)',
            }}
          >
            <img
              width="178"
              height="130"
              src={logoSrc}
              alt="DevX Group logo"
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25))',
              }}
            />
          </div>
          <div>San Diego · Toronto · Global Delivery</div>
          <div style={{ opacity: 0.75, fontSize: 22 }}>
            Custom product teams for founders and enterprises ready to move fast.
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 26,
          maxWidth: 560,
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            background: 'linear-gradient(90deg, #f8fafc 0%, #e9d5ff 55%, #bae6fd 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 32,
            color: 'rgba(226, 232, 240, 0.92)',
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
          {focus.map((item) => (
            <div
              key={item}
              style={{
                padding: '12px 20px',
                borderRadius: 999,
                border: '1px solid rgba(226, 232, 240, 0.25)',
                background: 'rgba(15, 23, 42, 0.45)',
                fontSize: 20,
                color: 'rgba(226, 232, 240, 0.92)',
                letterSpacing: '0.01em',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4CD787 0%, #9d4edd 100%)',
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  )
}
