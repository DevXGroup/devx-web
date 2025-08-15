import React from 'react'
import { renderWithProviders } from '../../tests/test-utils'
import DotGrid from '@sections/DotGrid'

// Helper to mock wrapper size via getBoundingClientRect/clientWidth/Height
function mockElementSize(el: HTMLElement, { width, height }: { width: number; height: number }) {
  Object.defineProperty(el, 'getBoundingClientRect', {
    value: () => ({ width, height, top: 0, left: 0, right: width, bottom: height, x: 0, y: 0, toJSON: () => {} }),
  })
  Object.defineProperty(el, 'clientWidth', { value: width, configurable: true })
  Object.defineProperty(el, 'clientHeight', { value: height, configurable: true })
}

describe('DotGrid measuring', () => {
  test('canvas matches wrapper size on first paint', async () => {
    const { container } = renderWithProviders(
      <div data-testid="wrap" style={{ width: 300, height: 200 }}>
        <div style={{ width: 300, height: 200 }}>
          <DotGrid />
        </div>
      </div>
    )

    // Find the internal wrapper div and canvas
    const section = container.querySelector('section') as HTMLElement
    expect(section).toBeInTheDocument()

    // The first child div is the wrapper referenced by component
    const wrapper = section.querySelector('div') as HTMLElement
    expect(wrapper).toBeInTheDocument()

    // Mock wrapper size before the component measures
    mockElementSize(wrapper, { width: 300, height: 200 })

    const canvas = section.querySelector('canvas') as HTMLCanvasElement
    expect(canvas).toBeInTheDocument()

    // Allow any rAF queued build/draw to run
    await new Promise((r) => setTimeout(r, 0))

    // In component, style width/height are set in px
    expect(canvas.style.width).toBe('300px')
    expect(canvas.style.height).toBe('200px')
  })

  test('uses minimum 100x100 when wrapper reports 0', async () => {
    const { container } = renderWithProviders(
      <div>
        <DotGrid />
      </div>
    )

    const wrapper = container.querySelector('section div') as HTMLElement
    mockElementSize(wrapper, { width: 0, height: 0 })
    const canvas = container.querySelector('canvas') as HTMLCanvasElement

    await new Promise((r) => setTimeout(r, 0))

    expect(canvas.style.width).toBe('100px')
    expect(canvas.style.height).toBe('100px')
  })
})

