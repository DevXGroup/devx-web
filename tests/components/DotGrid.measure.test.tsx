import React from 'react'
import { waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../tests/test-utils'
import DotGrid from '@sections/DotGrid'

// Helper to mock wrapper size via getBoundingClientRect/clientWidth/Height
function mockElementSize(el: HTMLElement, { width, height }: { width: number; height: number }) {
  Object.defineProperty(el, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      x: 0,
      y: 0,
      toJSON: () => {},
    }),
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

    // Find the internal wrapper section - DotGrid renders as <section><div ref={wrapperRef}><canvas /></div></section>
    const section = container.querySelector('section') as HTMLElement
    expect(section).toBeInTheDocument()

    // The wrapperRef in DotGrid points to the inner div, not the section
    const wrapperDiv = section.querySelector('div') as HTMLElement
    expect(wrapperDiv).toBeInTheDocument()

    // Mock the wrapper div's size (this is what buildGrid() measures)
    mockElementSize(wrapperDiv, { width: 300, height: 200 })

    const canvas = section.querySelector('canvas') as HTMLCanvasElement
    expect(canvas).toBeInTheDocument()

    await waitFor(() => {
      expect(canvas.style.width).toBe('300px')
      expect(canvas.style.height).toBe('200px')
    })
  })

  test('uses minimum 100x100 when wrapper reports 0', async () => {
    const { container } = renderWithProviders(
      <div>
        <DotGrid />
      </div>
    )

    // Query the section and inner wrapper div - DotGrid renders as <section><div ref={wrapperRef}><canvas /></div></section>
    const section = container.querySelector('section') as HTMLElement
    const wrapperDiv = section.querySelector('div') as HTMLElement
    mockElementSize(wrapperDiv, { width: 0, height: 0 })
    const canvas = container.querySelector('canvas') as HTMLCanvasElement

    await waitFor(() => {
      expect(canvas.style.width).toBe('100px')
      expect(canvas.style.height).toBe('100px')
    })
  })
})
