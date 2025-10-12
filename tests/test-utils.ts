import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReactElement } from 'react'

interface ProviderProps {
  providerProps?: Record<string, unknown>
  [key: string]: unknown
}

export const renderWithProviders = (
  ui: ReactElement,
  { providerProps = {}, ...renderOptions }: ProviderProps = {}
) => {
  return render(ui, { ...renderOptions, ...providerProps })
}

export const mockNextRouter = () => {
  return {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }
}

export const waitForElementToBeRemoved = (element: HTMLElement) => {
  return waitFor(() => {
    expect(element).not.toBeInTheDocument()
  })
}

export const mockFetchResponse = (data: unknown, status = 200) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
  }
}

export const setupIntersectionObserverMock = () => {
  const mockIntersectionObserver = jest.fn()
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  })
  window.IntersectionObserver = mockIntersectionObserver
}

