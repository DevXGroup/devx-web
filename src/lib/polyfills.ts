// Ensure the Node.js runtime exposes a `self` reference for packages that expect
// a web-worker style global. This prevents build-time crashes when server bundles
// from third-party dependencies access `self`.
if (typeof globalThis !== 'undefined' && typeof (globalThis as any).self === 'undefined') {
  ;(globalThis as any).self = globalThis
}

// Polyfill for requestIdleCallback (Safari and older browsers)
// This runs immediately during module load to ensure it's available before React renders
if (typeof window !== 'undefined' && !('requestIdleCallback' in window)) {
  // Safari doesn't support requestIdleCallback - provide polyfill
  ;(window as any).requestIdleCallback = function (
    callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
    options?: { timeout?: number }
  ) {
    const start = Date.now()
    return setTimeout(function () {
      callback({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start))
        },
      })
    }, 1) as unknown as number
  }
}

if (typeof window !== 'undefined' && !('cancelIdleCallback' in window)) {
  ;(window as any).cancelIdleCallback = function (id: number) {
    clearTimeout(id)
  }
}

// Also add to global scope for immediate availability
if (typeof globalThis !== 'undefined') {
  if (!('requestIdleCallback' in globalThis)) {
    ;(globalThis as any).requestIdleCallback = function (
      callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
      options?: { timeout?: number }
    ) {
      const start = Date.now()
      return setTimeout(function () {
        callback({
          didTimeout: false,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - start))
          },
        })
      }, 1) as unknown as number
    }
  }

  if (!('cancelIdleCallback' in globalThis)) {
    ;(globalThis as any).cancelIdleCallback = function (id: number) {
      clearTimeout(id)
    }
  }
}

export {}
