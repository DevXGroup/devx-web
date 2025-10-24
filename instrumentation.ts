const redactEvent = (event: any) => {
  const stripHeaders = ['authorization', 'cookie', 'x-forwarded-for']

  if (event.request?.headers) {
    for (const header of stripHeaders) {
      if (event.request.headers[header]) {
        event.request.headers[header] = '[redacted]'
      }
    }
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
    event.extra = sanitize(event.extra)
  }

  if (event.contexts) {
    event.contexts = sanitize(event.contexts)
  }

  return event
}

export async function register() {
  const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

  // Only initialize Sentry if DSN is provided
  if (!dsn) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server-side instrumentation
    const Sentry = await import("@sentry/nextjs");

    Sentry.init({
      dsn,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === "development",

      ignoreErrors: [
        "ECONNREFUSED",
        "ENOTFOUND",
        "HMR",
      ],

      beforeSend(event, _hint) {
        if (process.env.NODE_ENV === "development" && !process.env.SENTRY_DEBUG) {
          return null;
        }
        
        // Filter out Chrome extension runtime errors that occur on non-Chrome browsers
        if (event.exception?.values?.some(exception => 
          exception.value?.includes('runtime.sendMessage') && 
          exception.value?.includes('Tab not found')
        )) {
          return null;
        }
        
        return redactEvent(event);
      },
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime instrumentation
    const Sentry = await import("@sentry/nextjs");

    Sentry.init({
      dsn,
      tracesSampleRate: 1.0,
      debug: process.env.NODE_ENV === "development",

      beforeSend(event) {
        return redactEvent(event);
      },
    });
  }
}

export async function onRequestError(
  err: Error,
  request: Request,
  context: {
    routerKind: "Pages Router" | "App Router";
    routePath: string;
    routeType: "render" | "route" | "action" | "middleware";
  }
) {
  // Only capture errors if Sentry DSN is configured
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  const Sentry = await import("@sentry/nextjs");
  // Cast request to any to avoid type issues with Sentry's RequestInfo type
  Sentry.captureRequestError(err, request as any, context);
}
