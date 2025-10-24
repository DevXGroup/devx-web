# Deployment & Operations Guardrails

This project now bakes in the implementation details behind the guardrail plan that keeps production builds healthy. Use this checklist when configuring the infrastructure around the repo.

## GitHub Branch Protection

- Protect `main` with **Require a pull request before merging** and block direct pushes.
- Mark the following workflows as required checks:
  - `pnpm lint`
  - `pnpm test:coverage`
  - `pnpm build`
  - `pnpm exec playwright test`
  - `pnpm size`
- Require at least one approval before merge and dismiss stale reviews on new commits.
- Enable **Do not allow bypassing the above settings** for admins.

## Vercel Project

- Runtime: Node 20.x with `pnpm` (respect the lockfile).
- Set environment variable `NEXT_TELEMETRY_DISABLED=1` for Production and Preview.
- Analytics: enable **Vercel Analytics**, **Speed Insights**, and connect the project to Sentry.
- Monitors: add alerts for `5xx` rate and p95 latency with Slack or email notifications.
- Preview deployments should comment their URL back on the PR (Vercel dashboard option).
- Maintain dedicated Preview env vars—never reuse production secrets and never commit local `.env` files.

## Scheduled Maintenance

- Add nightly Cron Jobs (Vercel Scheduled Functions or an external service) for:
  - `sitemap` regeneration / cache invalidation
  - cache warmers for the marketing pages
  - third-party integration health checks
- Configure the cron monitors to ping Sentry or your incident channel on failures.

## Runtime & Caching

- Default static regeneration is set to `revalidate = 60` in `src/app/layout.tsx`. Override with `revalidate = 0` or `dynamic = 'force-dynamic'` on routes that must stay live.
- For event-driven data, wrap fetches with `unstable_cache({ tags: [...] })` and call `revalidateTag` on invalidation.
- Keep CPU-heavy handlers on the Node runtime; use `export const runtime = 'edge'` only for read-heavy, low-latency APIs.
- CDN headers now ship a long-lived TTL for static assets; HTML keeps the existing dynamic policies.

## Observability & RUM

- Sentry is wired for both server and client runtimes with aggressive PII scrubbing.
- Web vitals automatically emit to Sentry via `app/reportWebVitals.ts`.
- Wrap risky client surfaces with the existing `ErrorBoundary` and capture structured logs for key actions (CTA clicks, checkout attempts).
- Ensure `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, and release env vars are configured per environment.

## Performance Budgets

- `pnpm size` runs `size-limit` in CI and fails when bundles exceed the configured thresholds.
- Run `pnpm analyze` locally to launch Next's bundle analyzer (`ANALYZE=true` build flag).
- Continue to prefer `next/dynamic` for large, client-only modules (examples live under `src/components/3d`).

## Testing Gates

- `.github/workflows/ci.yml` runs lint, Jest (with coverage), production build, Playwright smoke specs (`tests/integration`, `tests/qa`, `tests/audit`), and bundle budgets on every PR to `main`.
- Point Playwright to Preview URLs for full end-to-end coverage when available; otherwise the config bootstraps a local `next start` server.

## Accessibility & Security Follow-ups

- ESLint (`next/core-web-vitals`) already activates `eslint-plugin-jsx-a11y`; run `@axe-core/react` locally for new interactive flows.
- Extend the existing CSP with nonces or hashed inline scripts when phasing out third-party inline requirements (GTM, Calendly).
- Use middleware or edge functions to rate-limit unauthenticated form submissions when traffic ramps up.
