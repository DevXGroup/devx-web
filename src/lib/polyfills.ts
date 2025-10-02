// Ensure the Node.js runtime exposes a `self` reference for packages that expect
// a web-worker style global. This prevents build-time crashes when server bundles
// from third-party dependencies access `self`.
if (typeof globalThis !== 'undefined' && typeof (globalThis as any).self === 'undefined') {
  ;(globalThis as any).self = globalThis
}

export {}
