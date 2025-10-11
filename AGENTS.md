# DevX WebApp Agent Guide

## Project Snapshot
- Next.js App Router app under `src/` with shared chrome in `src/common/`.
- React 19 + TypeScript strict + Tailwind 4; formatting via Prettier (2 spaces, singles, no semicolons).
- Package manager: `pnpm` (10.x). Local dev runs on port 3002.
- Tests use Jest (`tests/components/**`) and Playwright specs in `tests/integration/`, `tests/qa/`, `tests/audit/`.

## Codebase Layout
- Routes live in `src/app/**/page.tsx`; shared layout in `src/app/layout.tsx`. Active routes include `home/`, `about/`, `portfolio/`, `pricing/`, `services/creative-animation/sections`, `contact/`, `privacy/`, and `terms/`.
- UI and effects components live under `src/components/` (notable dirs: `3d/`, `animations/`, `layout/`, `sections/`, `services/`, `ui/`, `effects/`, `portfolio/`, `planet/`, `transitions/`).
- Supporting modules: `src/hooks/`, `src/lib/`, `src/data/`, `src/styles/`, `src/types/`, `src/dev-features/`.
- Extras: top-level `hooks/` for shared hooks (`use-mobile.tsx`, `use-toast.ts`), helpers in `helper/`, scripts in `scripts/`, static assets in `public/`.
- Path aliases in `tsconfig.json`: `@/*`, `@animations/*`, `@layout/*`, `@sections/*`, `@3d/*`. Prefer them over long relatives.

## Day-To-Day Commands
- `pnpm dev` to run the app locally (port 3002).
- `pnpm lint` for ESLint (`next/core-web-vitals` preset).
- `pnpm test`, `pnpm test:watch`, `pnpm test:coverage` for Jest.
- `pnpm build` then `pnpm start` to verify production bundles.

## Coding Standards
- Components in `PascalCase.tsx`; hooks as `use-*.ts` or `use*.ts`; App Router folders stay lowercase/kebab-case.
- Keep public APIs typed explicitly; lean on inference for internals when clear.
- Import styling: Tailwind + module CSS where needed; co-locate component styles.
- When adding complex behaviour, include a brief comment to help reviewers; avoid redundant narration.

## Testing Expectations
- Cover new UI pieces with Testing Library where practical; mount via `tests/test-utils.ts`.
- Browser-only effects should guard the DOM (e.g., use `dynamic`/`ClientOnly`) to keep Jest green.
- Keep Playwright specs updated when UX flows shift; screenshots land in `tests/audit/artifacts/`.
- Run `pnpm test:coverage` for major features to watch regressions.

## Git & Review Flow
- Follow commit prefix convention: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`.
- PRs include: intent summary, linked issues, UI before/after if visuals change, and local test notes.
- Ensure `pnpm lint` and relevant tests pass before handing off; mention any skipped suites with rationale.

## Security & Performance
- Never commit secrets; rely on `.env.local` and `NEXT_PUBLIC_*` when exposing vars to the client.
- Keep bundles lean: prefer dynamic imports for heavy or browser-only modules; tree-shakeable imports only.
- Validate 3D/animation heavy features in dev and prod builds to avoid regressions in `three`/`gsap`.

## Agent Workflow Tips
- Start by scanning this guide plus `README.md` for context; check open instructions in the task thread.
- Before editing, inspect existing files to align with styling and directory conventions.
- Use `apply_patch` for targeted edits; keep diffs focused and avoid disturbing unrelated user changes.
- Document outstanding questions or risks back to the user; propose next actions when handing off.
