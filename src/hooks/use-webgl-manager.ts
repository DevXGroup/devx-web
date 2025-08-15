/**
 * WebGL Context Manager Hook
 * Prevents too many WebGL contexts from being created simultaneously
 * which can cause "WebGL context lost" errors
 */

let activeContexts = 0
const MAX_CONTEXTS = 4 // Limit concurrent WebGL contexts

export function useWebGLManager() {
  const canCreateContext = activeContexts < MAX_CONTEXTS
  
  const registerContext = () => {
    if (canCreateContext) {
      activeContexts++
      return true
    }
    return false
  }
  
  const unregisterContext = () => {
    if (activeContexts > 0) {
      activeContexts--
    }
  }
  
  return {
    canCreateContext,
    registerContext,
    unregisterContext,
    activeContexts
  }
}

export function getActiveWebGLContexts() {
  return activeContexts
}