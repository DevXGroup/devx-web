'use client'

const ENTRY_TRANSITION_KEY = 'fromEntry'
export const ENTRY_TRANSITION_ATTR = 'data-entry-transition'
const ENTRY_TRANSITION_VALUE = 'true'

type EntryTransitionListener = (active: boolean) => void

const listeners = new Set<EntryTransitionListener>()

const notifyListeners = (active: boolean) => {
  listeners.forEach((listener) => {
    try {
      listener(active)
    } catch {
      // Ignore listener errors to avoid breaking other subscribers
    }
  })
}

export const subscribeToEntryTransition = (listener: EntryTransitionListener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const canUseDom = () => typeof window !== 'undefined'

const getSessionStorage = (): Storage | null => {
  if (!canUseDom()) return null
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

const setDocumentFlag = () => {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute(ENTRY_TRANSITION_ATTR, ENTRY_TRANSITION_VALUE)
}

const clearDocumentFlag = () => {
  if (typeof document === 'undefined') return
  document.documentElement.removeAttribute(ENTRY_TRANSITION_ATTR)
}

export const activateEntryTransition = () => {
  if (isEntryTransitionActive()) {
    notifyListeners(true)
    return
  }

  const storage = getSessionStorage()
  storage?.setItem(ENTRY_TRANSITION_KEY, ENTRY_TRANSITION_VALUE)
  setDocumentFlag()
  notifyListeners(true)
}

export const clearEntryTransition = () => {
  if (!isEntryTransitionActive()) {
    notifyListeners(false)
    return
  }

  const storage = getSessionStorage()
  storage?.removeItem(ENTRY_TRANSITION_KEY)
  clearDocumentFlag()
  notifyListeners(false)
}

export const isEntryTransitionActive = (): boolean => {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute(ENTRY_TRANSITION_ATTR)
    if (attr === ENTRY_TRANSITION_VALUE) {
      return true
    }
  }

  const storage = getSessionStorage()
  if (!storage) return false

  try {
    return storage.getItem(ENTRY_TRANSITION_KEY) === ENTRY_TRANSITION_VALUE
  } catch {
    return false
  }
}
