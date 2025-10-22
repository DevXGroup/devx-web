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
const DEFAULT_SUBTITLE = 'AI Platforms • Custom Apps • Cloud Modernization'
const DEFAULT_EYEBROW = 'Trusted by founders & enterprise teams'
const DEFAULT_FOCUS = ['Agentic AI', 'Product Engineering', 'Experience Design', 'Cloud Ops']
const LOGO_FILE = ['devx', 'logo', 'og'].join('-') + '.png'

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
    (
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
            'radial-gradient(circle at 15% 15%, rgba(6, 182, 212, 0.3), transparent 50%), radial-gradient(circle at 85% 35%, rgba(157, 78, 221, 0.24), transparent 45%), linear-gradient(135deg, #04020f 0%, #0b0a2f 45%, #041823 100%)',
          position: 'relative',
          color: '#FFFFFF',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
            backgroundSize: '58px 58px',
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
              background: 'rgba(15, 23, 42, 0.74)',
              border: '1px solid rgba(148, 163, 184, 0.22)',
              fontSize: 22,
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
                boxShadow: '0 0 12px rgba(76, 215, 135, 0.45)',
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
              fontSize: 24,
              lineHeight: 1.5,
            }}
          >
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: '26px',
                background:
                  'linear-gradient(145deg, rgba(6, 182, 212, 0.28), rgba(157, 78, 221, 0.22))',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 35px 90px rgba(2, 8, 35, 0.55)',
              }}
            >
              <img
                width="170"
                height="120"
                src={logoSrc}
                alt="DevX Group logo"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div>Full-stack teams · AI automation · Cloud deployment</div>
            <div style={{ opacity: 0.75, fontSize: 20 }}>
              We design, build, and scale resilient software products for growing companies.
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
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: '-0.015em',
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
              fontSize: 30,
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
                  border: '1px solid rgba(226, 232, 240, 0.24)',
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
      </div>
    ),
    {
      ...size,
    }
  )
}
