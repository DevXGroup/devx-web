import { test, expect } from '@playwright/test'

// Helper: expect canvas/grid element to match its container's size
async function expectChildCanvasMatchesContainer(page, containerSelector: string, childSelector?: string) {
  const size = await page.$eval(containerSelector, (el: HTMLElement) => ({
    w: el.clientWidth,
    h: el.clientHeight,
  }))
  const child = childSelector || `${containerSelector} canvas, ${containerSelector} [data-testid="ripple-grid"] canvas`
  const childSize = await page.$eval(child, (el: HTMLElement) => ({
    w: (el as HTMLCanvasElement).clientWidth,
    h: (el as HTMLCanvasElement).clientHeight,
  }))
  expect(childSize.w).toBe(size.w)
  expect(childSize.h).toBe(size.h)
}

test.describe('First paint canvas/grid sizing', () => {
  test('Portfolio page DotGrid squares are sized to their containers', async ({ page }) => {
    await page.goto('/portfolio')

    // Wait for a canvas inside the page to be attached
    await page.waitForSelector('canvas')

    // Check a few canvas instances in decorative squares if present
    const sections = await page.$$('section')
    expect(sections.length).toBeGreaterThan(0)

    // Try to match the first canvas to its parent container
    const firstCanvas = await page.$('section canvas')
    expect(firstCanvas).not.toBeNull()

    const parent = await firstCanvas!.evaluateHandle((c: HTMLCanvasElement) => c.parentElement as HTMLElement)
    const parentSelector = await parent.evaluate((el) => {
      el.setAttribute('data-test-parent', '1')
      return '[data-test-parent="1"]'
    })

    await expectChildCanvasMatchesContainer(page, parentSelector as string)
  })

  test('About page RippleGrid canvas sized to container', async ({ page }) => {
    await page.goto('/about')

    // wait for ripple grid container
    await page.waitForSelector('[data-testid="ripple-grid"]')

    const selector = '[data-testid="ripple-grid"]'

    // Wait a tick for initial paint
    await page.waitForTimeout(50)

    // The ogl canvas is appended inside the ripple-grid container
    await expectChildCanvasMatchesContainer(page, selector, `${selector} canvas`)
  })
})

