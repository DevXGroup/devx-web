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
        return event;
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
