import React from 'react'
import { waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../tests/test-utils'
import RippleGrid from '@sections/RippleGrid'

// Mock minimal ogl API to prevent WebGL creation during unit test
jest.mock('ogl', () => {
  const rendererInstances: any[] = []
  const Renderer = jest.fn().mockImplementation(() => {
    const instance = {
      gl: {
        BLEND: 0,
        SRC_ALPHA: 1,
        ONE_MINUS_SRC_ALPHA: 2,
        enable: jest.fn(),
        blendFunc: jest.fn(),
        canvas: document.createElement('canvas'),
        getExtension: jest.fn(),
      },
      setSize: jest.fn(),
      render: jest.fn(),
    }
    rendererInstances.push(instance)
    return instance
  })
  class Program {}
  class Triangle {
    constructor(_gl?: any) {}
  }
  class Mesh {
    constructor(_gl?: any, _opts?: any) {}
  }
  return { Renderer, Program, Triangle, Mesh, __rendererInstances: rendererInstances }
})

function mockElementSize(el: HTMLElement, { width, height }: { width: number; height: number }) {
  Object.defineProperty(el, 'clientWidth', { value: width, configurable: true })
  Object.defineProperty(el, 'clientHeight', { value: height, configurable: true })
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
}

describe('RippleGrid measuring', () => {
  beforeEach(() => {
    const oglMock = jest.requireMock('ogl') as { __rendererInstances: any[] }
    oglMock.__rendererInstances.length = 0
  })

  test('initializes canvas with container size on first paint', async () => {
    const { getByTestId } = renderWithProviders(
      <div style={{ width: 400, height: 250 }}>
        <div style={{ width: 400, height: 250 }}>
          <RippleGrid enableRainbow={false} />
        </div>
      </div>
    )

    const container = getByTestId('ripple-grid') as HTMLDivElement
    mockElementSize(container, { width: 400, height: 250 })

    await waitFor(() => {
      expect(container.querySelector('canvas')).toBeInTheDocument()
    })

    const oglMock = jest.requireMock('ogl') as {
      __rendererInstances: Array<{ setSize: jest.Mock }>
    }
    const rendererInstance = oglMock.__rendererInstances[0]
    expect(rendererInstance.setSize).toHaveBeenCalledWith(400, 250)
  })

  test('polls until non-zero size before initializing', async () => {
    const { getByTestId } = renderWithProviders(<RippleGrid />)
    const container = getByTestId('ripple-grid') as HTMLDivElement

    // start at 0 size
    mockElementSize(container, { width: 0, height: 0 })

    // now set a size and let it pick it up
    mockElementSize(container, { width: 320, height: 180 })

    await waitFor(() => {
      const oglMock = jest.requireMock('ogl') as {
        __rendererInstances: Array<{ setSize: jest.Mock }>
      }
      const rendererInstance = oglMock.__rendererInstances[0]
      expect(rendererInstance.setSize).toHaveBeenCalledWith(320, 180)
    })
  })
})
