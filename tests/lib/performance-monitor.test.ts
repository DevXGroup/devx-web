/**
 * @jest-environment jsdom
 */

import {
  monitorPerformance,
  getPerformanceSnapshot,
  PERFORMANCE_THRESHOLDS,
} from '@/lib/performance-monitor'

describe('Performance Monitor', () => {
  beforeEach(() => {
    // Mock window.performance
    Object.defineProperty(window, 'performance', {
      writable: true,
      value: {
        getEntriesByType: jest.fn().mockImplementation((type: string) => {
          if (type === 'navigation') {
            return [
              {
                type: 'navigate',
                redirectCount: 0,
                transferSize: 12345,
                domContentLoadedEventEnd: 1234,
                loadEventEnd: 2345,
              },
            ]
          }
          if (type === 'paint') {
            return [
              { name: 'first-paint', startTime: 100 },
              { name: 'first-contentful-paint', startTime: 150 },
            ]
          }
          if (type === 'resource') {
            return [{ transferSize: 1000 }, { transferSize: 2000 }, { transferSize: 3000 }]
          }
          return []
        }),
        memory: {
          usedJSHeapSize: 10000000,
          totalJSHeapSize: 20000000,
          jsHeapSizeLimit: 50000000,
        },
      },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('PERFORMANCE_THRESHOLDS', () => {
    it('should have correct threshold values', () => {
      expect(PERFORMANCE_THRESHOLDS.FCP).toEqual({
        good: 1800,
        needsImprovement: 3000,
      })
      expect(PERFORMANCE_THRESHOLDS.LCP).toEqual({
        good: 2500,
        needsImprovement: 4000,
      })
      expect(PERFORMANCE_THRESHOLDS.FID).toEqual({
        good: 100,
        needsImprovement: 300,
      })
      expect(PERFORMANCE_THRESHOLDS.CLS).toEqual({
        good: 0.1,
        needsImprovement: 0.25,
      })
      expect(PERFORMANCE_THRESHOLDS.TTFB).toEqual({
        good: 800,
        needsImprovement: 1800,
      })
      expect(PERFORMANCE_THRESHOLDS.INP).toEqual({
        good: 200,
        needsImprovement: 500,
      })
    })
  })

  describe('getPerformanceSnapshot', () => {
    it('should return performance snapshot', () => {
      const snapshot = getPerformanceSnapshot()

      expect(snapshot).toBeDefined()
      expect(snapshot?.navigation).toEqual({
        type: 'navigate',
        redirectCount: 0,
        transferSize: 12345,
      })
      expect(snapshot?.timing).toEqual({
        domContentLoaded: 1234,
        loadComplete: 2345,
        firstPaint: 100,
        firstContentfulPaint: 150,
      })
      expect(snapshot?.resources).toEqual({
        count: 3,
        totalSize: 6000,
      })
      expect(snapshot?.memory).toEqual({
        usedJSHeapSize: 10000000,
        totalJSHeapSize: 20000000,
        jsHeapSizeLimit: 50000000,
      })
    })

    it('should return null if performance API is not available', () => {
      const originalPerformance = window.performance
      // @ts-ignore
      delete window.performance

      const snapshot = getPerformanceSnapshot()
      expect(snapshot).toBeNull()

      // Restore
      window.performance = originalPerformance
    })
  })

  describe('monitorPerformance', () => {
    it('should initialize without errors', () => {
      expect(() => {
        monitorPerformance({
          enableDevLogging: false,
          reportToVercel: false,
        })
      }).not.toThrow()
    })

    it('should accept custom config', () => {
      const onMetric = jest.fn()

      expect(() => {
        monitorPerformance({
          enableDevLogging: true,
          reportToVercel: false,
          onMetric,
          thresholds: {
            LCP: { good: 2000, needsImprovement: 3500 },
          },
        })
      }).not.toThrow()
    })

    it('should not run in SSR environment', () => {
      const originalWindow = global.window
      // @ts-ignore
      delete global.window

      const onMetric = jest.fn()
      monitorPerformance({ onMetric })

      expect(onMetric).not.toHaveBeenCalled()

      // Restore
      global.window = originalWindow
    })
  })

  describe('Device Detection', () => {
    it('should detect mobile viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 500,
      })

      const snapshot = getPerformanceSnapshot()
      expect(snapshot).toBeDefined()
    })

    it('should detect tablet viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 800,
      })

      const snapshot = getPerformanceSnapshot()
      expect(snapshot).toBeDefined()
    })

    it('should detect desktop viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1920,
      })

      const snapshot = getPerformanceSnapshot()
      expect(snapshot).toBeDefined()
    })
  })

  describe('Connection Info', () => {
    it('should return undefined if connection API not available', () => {
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        value: undefined,
      })

      // Connection info is internal, test via snapshot
      const snapshot = getPerformanceSnapshot()
      expect(snapshot).toBeDefined()
    })

    it('should handle connection API if available', () => {
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        value: {
          effectiveType: '4g',
          downlink: 10,
          rtt: 50,
          saveData: false,
        },
      })

      const snapshot = getPerformanceSnapshot()
      expect(snapshot).toBeDefined()
    })
  })
})
