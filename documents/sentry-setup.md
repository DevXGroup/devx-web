# Sentry Integration Checklist

Follow these steps to finish wiring Sentry for the DevX web app.

## 1. Install / Update the integration

Run the official wizard (idempotent) from the repo root. It adds missing config files and verifies versions.

```bash
npx @sentry/wizard@latest -i nextjs --saas --org devx-group-llc --project devx-group-web-app
```

The command can be re-run safely; it detects existing files and only patches when needed.

## 2. Provide environment variables

Create/update `.env.local` for local development and mirror the values in your Vercel project settings.

```bash
# Sentry DSN (public) – copy from project settings → Client Keys (DSN)
# Example: https://PUBLIC_KEY@o4510107764195328.ingest.sentry.io/4510107766751232
NEXT_PUBLIC_SENTRY_DSN=your_public_dsn_here

# Optional server-side DSN override (not required if you use the public value)
# SENTRY_DSN=your_private_dsn_here

# Required for source-map uploads during builds (do NOT commit)
SENTRY_ORG=devx-group-llc
SENTRY_PROJECT=devx-group-web-app
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

> The auth token needs `project:releases`, `org:read`, and `project:write` scopes. Store it in Vercel as an encrypted environment variable and never commit it.

## 3. Deploy or rebuild

Run a fresh local build to confirm configuration:

```bash
pnpm run build
```

On Vercel, trigger a new deployment after setting the environment variables so source maps upload correctly.

## 4. Trigger a test event

Locally (or in preview/production) visit [`/sentry-example-page`](http://localhost:3002/sentry-example-page) and click **Trigger Test Error**. This throws a deliberate exception which should appear under Issues in Sentry within a few seconds.

Alternatively, anywhere in the app you can temporarily call:

```ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
myUndefinedFunction();
```

Remove the call once you confirm the event appears in Sentry.

## 5. Monitor ongoing health

- Check Sentry for new issues after each deploy.
- Keep an eye on the “Release Health” tab; it gives crash-free session metrics.
- Adjust `tracesSampleRate`/`replaysSessionSampleRate` in `instrumentation-client.ts` if volume is too high once real traffic arrives.

With the environment values in place you should no longer see the “Waiting to receive first event” prompt.
