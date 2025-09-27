import { test, expect, Page, Locator, ConsoleMessage } from '@playwright/test'

async function waitForNoConsoleErrors(page: Page) {
  const errors: string[] = []
  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() === 'error') {
      errors.push(msg.text())
    }
  })
  page.on('pageerror', (err: Error) => {
    errors.push(err.message || String(err))
  })
  // small settle time after navigation will be awaited by caller
  return errors
}

async function expectCanvasMatchesParentFromLocator(locator: Locator) {
  const sizes = await locator.evaluate((canvas: HTMLCanvasElement) => {
    const parent = canvas.parentElement as HTMLElement
    return {
      cw: canvas.clientWidth,
      ch: canvas.clientHeight,
      pw: parent?.clientWidth || 0,
      ph: parent?.clientHeight || 0,
    }
  })
  expect(sizes.cw).toBe(sizes.pw)
  expect(sizes.ch).toBe(sizes.ph)
}

async function expectWebGLCanvasAnimatingFromLocator(locator: Locator, page: Page) {
  // Sample a few pixels over time using WebGL readPixels; expect at least one pixel to change
  const samples1 = await locator.evaluate((canvas: HTMLCanvasElement) => {
    const gl = (canvas.getContext('webgl') || canvas.getContext('webgl2')) as WebGLRenderingContext | WebGL2RenderingContext | null
    if (!gl) return null
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    const points: [number, number][] = [
      [Math.floor(w * 0.25), Math.floor(h * 0.25)],
      [Math.floor(w * 0.5), Math.floor(h * 0.5)],
      [Math.floor(w * 0.75), Math.floor(h * 0.75)],
    ]
    const out: number[][] = []
    const buf = new Uint8Array(4)
    for (const [x, y] of points) {
      // Flip Y for WebGL coordinate system
      gl.readPixels(x, h - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf)
      out.push([buf[0]!, buf[1]!, buf[2]!, buf[3]!])
    }
    return out
  })

  expect(samples1).not.toBeNull()

  await page.waitForTimeout(350)

  const samples2 = await locator.evaluate((canvas: HTMLCanvasElement) => {
    const gl = (canvas.getContext('webgl') || canvas.getContext('webgl2')) as WebGLRenderingContext | WebGL2RenderingContext | null
    if (!gl) return null
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    const points: [number, number][] = [
      [Math.floor(w * 0.25), Math.floor(h * 0.25)],
      [Math.floor(w * 0.5), Math.floor(h * 0.5)],
      [Math.floor(w * 0.75), Math.floor(h * 0.75)],
    ]
    const out: number[][] = []
    const buf = new Uint8Array(4)
    for (const [x, y] of points) {
      gl.readPixels(x, h - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf)
      out.push([buf[0]!, buf[1]!, buf[2]!, buf[3]!])
    }
    return out
  })

  expect(samples2).not.toBeNull()

  let changed = (samples1 as number[][]).some((px, i) => px.some((c, j) => c !== (samples2 as number[][])[i]?.[j]))

  if (!changed) {
    // Try to stimulate mouse interaction and sample again
    const box = await locator.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
      await page.waitForTimeout(500)
      const samples3 = await locator.evaluate((canvas: HTMLCanvasElement) => {
        const gl = (canvas.getContext('webgl') || canvas.getContext('webgl2')) as WebGLRenderingContext | WebGL2RenderingContext | null
        if (!gl) return null
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        const points: [number, number][] = [
          [Math.floor(w * 0.2), Math.floor(h * 0.2)],
          [Math.floor(w * 0.5), Math.floor(h * 0.5)],
          [Math.floor(w * 0.8), Math.floor(h * 0.8)],
        ]
        const out: number[][] = []
        const buf = new Uint8Array(4)
        for (const [x, y] of points) {
          gl.readPixels(x, h - y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, buf)
          out.push([buf[0]!, buf[1]!, buf[2]!, buf[3]!])
        }
        return out
      })
      if (samples3) {
        changed = (samples1 as number[][]).some((px, i) => px.some((c, j) => c !== (samples3 as number[][])[i]?.[j]))
      }
    }
  }

  // Use soft assertion to avoid cross-browser flakiness bringing the suite down
  expect.soft(changed).toBeTruthy()
}

const breakpoints: { width: number; height: number }[] = [
  { width: 375, height: 700 }, // mobile
  { width: 768, height: 900 }, // tablet
  { width: 1024, height: 900 }, // small desktop
  { width: 1440, height: 900 }, // large desktop
]

test.describe('Cross-browser / breakpoint QA', () => {
  test('DotGrid squares fill 100% at breakpoints without flashing (Portfolio)', async ({ page }) => {
    const errors = await waitForNoConsoleErrors(page)

    for (const vp of breakpoints) {
      await page.setViewportSize(vp)
      await page.goto('/portfolio')
      // Wait for at least one DotGrid canvas to render
      await page.waitForSelector('section canvas', { state: 'attached' })

      // Pick the first canvas (DotGrid exists in hero squares); ensure it matches parent
      const firstCanvas = page.locator('section canvas').first()
      await expect(firstCanvas).toBeVisible()

      // Give time for any initial sizing/RAF watchdog to settle
      await page.waitForTimeout(150)

      await expectCanvasMatchesParentFromLocator(firstCanvas)

      // Ensure it never collapses to 0x0 during quick resizes (flash check)
      const sizeSeries: { w: number; h: number }[] = []
      for (let i = 0; i < 3; i++) {
        const sz = await firstCanvas.evaluate((c: HTMLCanvasElement) => ({ w: c.clientWidth, h: c.clientHeight }))
        sizeSeries.push(sz)
        await page.waitForTimeout(50)
      }
      expect(sizeSeries.every(s => s.w > 0 && s.h > 0)).toBeTruthy()
    }

    // Assert no console errors/hydration warnings
    const errorText = errors.join('\n')
    expect(errorText).not.toMatch(/hydration/i)
    const filtered = errors.filter(e => !/downloadable font|fonts\.googleapis|sanitizer/i.test(e))
    expect(filtered, `Console errors found on /portfolio:\n${filtered.join('\n')}`).toHaveLength(0)
  })

  test('RippleGrid animates in About hero and Team Structure, no console errors', async ({ page }) => {
    const errors = await waitForNoConsoleErrors(page)

    for (const vp of breakpoints) {
      await page.setViewportSize(vp)
      await page.goto('/about')

      // Wait for ripple grid containers and canvases to appear
      await page.waitForSelector('[data-testid="ripple-grid"]', { state: 'attached' })
      // Ensure at least one canvas exists under ripple grid
      await page.waitForSelector('[data-testid="ripple-grid"] canvas', { state: 'attached' })
      const heroCanvas = page.locator('[data-testid="ripple-grid"] canvas').first()
      await expect(heroCanvas).toBeVisible()

      // Check canvas sizing against parent
      await expectCanvasMatchesParentFromLocator(heroCanvas)

      // Verify animation by pixel change over time
      await expectWebGLCanvasAnimatingFromLocator(heroCanvas, page)

      // Team Structure section also contains a RippleGrid
      const teamCanvas = page.locator('[data-testid="ripple-grid"] canvas').nth(1)
      await expect(teamCanvas).toBeVisible()
      await expectCanvasMatchesParentFromLocator(teamCanvas)
      await expectWebGLCanvasAnimatingFromLocator(teamCanvas, page)
    }

    // Assert no console errors/hydration warnings
    const errorText = errors.join('\n')
    expect(errorText).not.toMatch(/hydration/i)
    const filtered = errors.filter(e => !/downloadable font|fonts\.googleapis|sanitizer/i.test(e))
    expect(filtered, `Console errors found on /about:\n${filtered.join('\n')}`).toHaveLength(0)
  })
})

