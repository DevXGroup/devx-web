/**
 * Some third-party bundles expect a `self` global even when running on the
 * Node.js server during static rendering. This ensures that reference exists
 * before any other server bundles execute.
 */
if (typeof self === 'undefined') {
  ;(globalThis as any).self = globalThis
}
