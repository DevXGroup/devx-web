// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock IntersectionObserver
class IntersectionObserver {
  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
}) 