import * as Sentry from '@sentry/nextjs'

// Export navigation instrumentation hook
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart

const redactEvent = (event: any) => {
  if (event.request?.headers) {
    event.request.headers.authorization = '[redacted]'
    event.request.headers.cookie = '[redacted]'
  }

  if (event.request?.data) {
    event.request.data = '[redacted]'
  }

  if (event.user) {
    if ('email' in event.user) {
      event.user.email = '[redacted]'
    }
    if ('ip_address' in event.user) {
      event.user.ip_address = '[redacted]'
    }
  }

  const sanitize = (value: unknown): unknown => {
    if (typeof value === 'string') {
      return value.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted]')
    }
    if (Array.isArray(value)) {
      return value.map(sanitize)
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, val]) => [key, sanitize(val)])
      )
    }
    return value
  }

  if (event.extra) {
    event.extra = sanitize(event.extra) as typeof event.extra
  }

  if (event.contexts) {
    event.contexts = sanitize(event.contexts) as typeof event.contexts
  }

  return event
}

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN
const release =
  process.env.NEXT_PUBLIC_SENTRY_RELEASE ||
  process.env.SENTRY_RELEASE ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  (process.env.NODE_ENV === 'development' ? 'local-dev' : undefined)

const environment =
  process.env.NEXT_PUBLIC_VERCEL_ENV ||
  process.env.VERCEL_ENV ||
  process.env.NEXT_PUBLIC_APP_ENV ||
  process.env.NODE_ENV ||
  'development'

const enableDebugLogging = process.env.NEXT_PUBLIC_SENTRY_DEBUG === 'true'

// Only initialize Sentry if DSN is provided
if (dsn) {
  const sentryOptions: Sentry.BrowserOptions = {
    dsn,

    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // Adjust this value in production to reduce data volume
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
    tracePropagationTargets: ['localhost', /^https:\/\/devxgroup\.io/],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    environment,

    // Enable debug mode only when explicitly requested
    debug: enableDebugLogging,

    // Filter out common noise
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'chrome-extension://',
      'moz-extension://',
      // Network errors
      'Network request failed',
      'NetworkError',
      'Failed to fetch',
      // Common user-initiated cancellations
      'AbortError',
      'cancelled',
    ],

    beforeSend(event, _hint) {
      // Filter out errors from browser extensions
      if (
        event.exception?.values?.[0]?.stacktrace?.frames?.some(
          (frame) =>
            frame.filename?.includes('chrome-extension://') ||
            frame.filename?.includes('moz-extension://')
        )
      ) {
        return null
      }

      // Filter out Chrome extension runtime errors that occur on non-Chrome browsers
      if (
        event.exception?.values?.some(
          (exception) =>
            exception.value?.includes('runtime.sendMessage') &&
            exception.value?.includes('Tab not found')
        )
      ) {
        return null
      }

      return redactEvent(event)
    },
  }

  if (release) {
    sentryOptions.release = release
  }

  Sentry.init(sentryOptions)
}
