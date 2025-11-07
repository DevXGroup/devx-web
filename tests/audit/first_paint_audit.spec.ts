import { test, expect, Page } from '@playwright/test'

// Pages to test and human-readable names
const pages = [
  { path: '/portfolio', name: 'Portfolio' },
  { path: '/about', name: 'About' },
]

// Breakpoints to simulate
const viewports = [
  { width: 360, height: 740, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1280, height: 800, name: 'desktop' },
]

// Utility injected into the page to gather first-paint measurements
async function injectFirstPaintLogger(page: Page) {
  await page.addInitScript(() => {
    // Mark as hard refresh via cache busting
    ;(window as any).__AUDIT__ = { started: Date.now() }

    // Monkey-patch getBoundingClientRect to catch 0-size during early measure
    const origGetBCR = Element.prototype.getBoundingClientRect
    ;(window as any).__AUDIT_LOGS__ = [] as any[]

    function hasScaleZero(el: Element | null): boolean {
      while (el && (el as HTMLElement).style) {
        const cs = getComputedStyle(el as HTMLElement)
        const transform = cs.transform || (cs as any).webkitTransform || ''
        if (/matrix\([^)]*\)/.test(transform)) {
          // matrix(a, b, c, d, tx, ty) => scaleX=a, scaleY=d
          const m = transform.match(/matrix\(([^)]*)\)/)
          if (m) {
            const parts = m[1].split(',').map((s: string) => parseFloat(s.trim()))
            if (parts.length >= 4) {
              const scaleX = parts[0]
              const scaleY = parts[3]
              if (scaleX === 0 || scaleY === 0) return true
            }
          }
        }
        el = el.parentElement
      }
      return false
    }

    function logFirstPaintSizes() {
      try {
        const entries = [] as any[]
        const candidates = [
          // common wrappers and canvases
          '#__next',
          'main',
          'section',
          'canvas',
          '[data-testid="ripple-grid"]',
          '.service-icon-container',
          '.container',
          '.w-full.h-full',
        ]
        const seen = new Set<Element>()
        for (const sel of candidates) {
          document.querySelectorAll(sel).forEach((el) => {
            if (seen.has(el)) return
            seen.add(el)
            const bcr = (el as Element).getBoundingClientRect()
            const scaleZero = hasScaleZero(el)
            entries.push({ sel, width: bcr.width, height: bcr.height, scaleZero })
          })
        }
        ;(window as any).__AUDIT_LOGS__.push({
          t: 'first-paint-sizes',
          ts: Date.now(),
          entries,
          viewport: { w: window.innerWidth, h: window.innerHeight },
          url: location.href,
        })
      } catch (e) {
        ;(window as any).__AUDIT_LOGS__.push({ t: 'error', e: String(e) })
      }
    }

    // Run ASAP after first paint
    if ('requestAnimationFrame' in window) {
      requestAnimationFrame(() => {
        logFirstPaintSizes()
      })
    } else {
      setTimeout(logFirstPaintSizes, 0)
    }

    // Expose getter for logs
    Object.defineProperty(window, '__AUDIT_GET__', {
      value: () => (window as any).__AUDIT_LOGS__,
      configurable: false,
      writable: false,
      enumerable: false,
    })
  })
}

// Ensure local dev server is running externally (port 3002)
const BASE = process.env.AUDIT_BASE || 'http://localhost:3002'

for (const vp of viewports) {
  test.describe(`viewport:${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } })

    for (const p of pages) {
      test(`${p.name} first paint audit`, async ({ page, browserName }) => {
        await injectFirstPaintLogger(page)
        const url = `${BASE}${p.path}?cache_bust=${Date.now()}&bn=${browserName}&vp=${vp.name}`
        await page.goto(url, { waitUntil: 'load' })

        // Wait briefly for first frame of animations to apply
        await page.waitForTimeout(250)

        // Collect logs
        const logs = await page.evaluate(() => (window as any).__AUDIT_GET__?.())
        test.info().attach('audit.json', {
          body: Buffer.from(JSON.stringify(logs, null, 2)),
          contentType: 'application/json',
        })

        // Save to file system as well (via console for CI logs)
        console.log(`[AUDIT] ${url} ->`, JSON.stringify(logs))

        // Screenshot
        await page.screenshot({
          path: `tests/audit/artifacts/${p.name}-${vp.name}-${browserName}.png`,
          fullPage: true,
        })

        // Basic sanity: ensure root has size
        const rootSize = await page.evaluate(() => {
          const el = document.getElementById('__next') || document.body
          const r = el.getBoundingClientRect()
          return { w: r.width, h: r.height }
        })
        expect(rootSize.w).toBeGreaterThan(0)
        expect(rootSize.h).toBeGreaterThan(0)
      })
    }
  })
}
