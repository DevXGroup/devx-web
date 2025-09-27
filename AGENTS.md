# Repository Guidelines

## Project Structure & Module Organization

- Source lives in `src/` using Next.js App Router.
  - `src/app/**/page.tsx` routes; `src/app/layout.tsx` wraps pages. Present routes include `about/`, `contact/`, `home/`, `portfolio/`, `pricing/`, `privacy/`, `terms/`, and `services/creative-animation/` (with `sections/`).
  - `src/components/`: UI and effects organized under `3d/`, `animations/`, `sections/`, `services/`, `ui/`, `layout/`, `effects/`, `portfolio/`, `planet/`, `transitions/`, plus shared components.
  - `src/common/`: Layout chrome (`Navbar.tsx`, `Footer.tsx`).
  - `src/hooks/`, `src/lib/`, `src/data/`, `src/styles/`, `src/types/`, and `src/dev-features/` for hooks, utils, data, CSS, type decls, and dev-only pages.
- Top-level utilities: `helper/` and `scripts/` contain dev helpers (e.g., `find-unused-files.js`).
- Additional root `hooks/` directory exists for shared hooks (`use-mobile.tsx`, `use-toast.ts`).
- Static assets in `public/` (e.g., `images/about/*`, `images/portfolio/*`, `robots.txt`, `sitemap.xml`).
- Tests in `tests/`:
  - React unit tests under `tests/components/*` (Jest + Testing Library).
  - Playwright specs under `tests/integration/`, `tests/qa/`, and `tests/audit/` with screenshot artifacts in `tests/audit/artifacts/`.
- Useful aliases (see `tsconfig.json`): `@/*`, `@animations/*`, `@layout/*`, `@sections/*`, `@3d/*`.
  - Example: `import { Button } from '@/components/ui/button'`.

## Build, Test, and Development Commands

- `pnpm dev` — Run local dev server on port 3002.
- `pnpm build` — Production build (Next.js).
- `pnpm start` — Serve the built app.
- `pnpm lint` — ESLint (Next core-web-vitals rules).
- `pnpm test` | `pnpm test:watch` | `pnpm test:coverage` — Jest suite.

## Coding Style & Naming Conventions

- TypeScript strict mode enabled; prefer explicit types for public APIs.
- Prettier: 2 spaces, single quotes, no semicolons, width 100, trailing commas (es5).
- Components: `PascalCase.tsx`; hooks: `use-*.ts` or `use*.ts`; routes/folders under `src/app/` use lowercase/kebab-case.
- Use path aliases over long relative imports.

## Testing Guidelines

- Unit tests: Jest + `@testing-library/react` with `jest-environment-jsdom`.
- Locations: React unit tests in `tests/components/**.test.tsx` (or `*.spec.tsx`).
- Playwright: Integration/QA/audit specs live in `tests/integration/`, `tests/qa/`, and `tests/audit/` (artifacts in `tests/audit/artifacts/`). These run with Playwright if configured separately from Jest.
- Utilities: use `tests/test-utils.ts` and rely on global mocks from `jest.setup.js` (e.g., `IntersectionObserver`).
- Coverage: run `pnpm test:coverage`; avoid regressions and add focused tests for new components and hooks.

## Commit & Pull Request Guidelines

- Commit style: concise, imperative subject with a type prefix (e.g., `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`). Example: `feat: add Services 3D showcase`.
- PRs include: clear description, linked issues, before/after screenshots for UI, and notes on testing.
- Require green CI, `pnpm lint` and `pnpm test` passing; note any follow-ups.

## Security & Configuration Tips

- Never commit secrets. Use `.env.local`; expose only client-safe vars with `NEXT_PUBLIC_*`.
- Gate browser-only features via dynamic import or `ClientOnly`; avoid server-only modules in client components.
- Keep imports tree-shaken and assets in `public/` with stable paths.
