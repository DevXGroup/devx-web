import * as Sentry from "@sentry/nextjs";

// Export navigation instrumentation hook
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

// Only initialize Sentry if DSN is provided
if (dsn) {
  Sentry.init({
    dsn,

    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // Adjust this value in production to reduce data volume
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/devxgroup\.io/],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps

    // Enable debug mode in development
    debug: process.env.NODE_ENV === "development",

    // Filter out common noise
    ignoreErrors: [
      // Browser extensions
      "top.GLOBALS",
      "chrome-extension://",
      "moz-extension://",
      // Network errors
      "Network request failed",
      "NetworkError",
      "Failed to fetch",
      // Common user-initiated cancellations
      "AbortError",
      "cancelled",
    ],

    beforeSend(event, _hint) {
      // Filter out errors from browser extensions
      if (event.exception?.values?.[0]?.stacktrace?.frames?.some(
        (frame) => frame.filename?.includes("chrome-extension://") || frame.filename?.includes("moz-extension://")
      )) {
        return null;
      }
      return event;
    },
  });
}
