# DevX Web – Frontend Framework for DevX Group LLC

![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%2015%20%7C%20React%2019%20%7C%20Tailwind%204-blueviolet?style=flat&logo=next.js)
![Status](https://img.shields.io/badge/status-active-success?style=flat)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat)

---

## 🔥 About DevX Group LLC

**DevX Group LLC** is a California-based software and IoT engineering collective built to deliver high-impact solutions with precision, efficiency, and excellence. We combine decades of product experience with a bias for execution, helping teams move from concept to real-world impact quickly.

📍 Learn more: [www.devxgroup.io](https://www.devxgroup.io)

---

## 🚀 Project Highlights

- Next.js 15 App Router with shared chrome via `ConditionalLayout` and rich SEO metadata out of the box.
- React 19 + TypeScript strict mode, Tailwind CSS 4, and a growing component library of motion, 3D, and marketing primitives.
- Jest + Testing Library unit suite and Playwright coverage for flows, audits, and QA scenarios.
- Vercel analytics, Speed Insights, and Sentry optics wired into the root layout.
- Contact experience ships with a zero-CLS Calendly scheduling iframe and responsive form states tuned for 24-hour follow-up.
- Agent onboarding and workflow notes captured in `AGENTS.md`.

---

## 📁 Repository Structure

```
devx-web/
├── src/
│   ├── app/
│   │   ├── home/, about/, contact/, portfolio/, pricing/, privacy/, terms/
│   │   ├── services/creative-animation/ (sections/, hero, client wiring)
│   │   ├── dev-features/ (internal playground)
│   │   ├── error.tsx, global-error.tsx, not-found.tsx
│   │   └── layout.tsx, page.tsx
│   ├── common/             # Navbar, Footer, shared chrome
│   ├── components/         # 3d/, animations/, sections/, services/, ui/, layout/, effects/, portfolio/, transitions/, seo/, analytics/
│   ├── hooks/              # Client-side hooks (motion, media queries, safari detection, etc.)
│   ├── lib/                # Utilities, polyfills, animation helpers
│   ├── data/               # Static datasets (e.g., portfolioProjects.ts)
│   ├── styles/             # Global CSS (typography.css)
│   ├── types/              # Type declarations and module shims
│   └── dev-features/       # Development-only showcase components
├── hooks/                  # Shared hooks consumed across packages
├── tests/                  # Jest + Playwright suites (components/, integration/, qa/, audit/)
├── helper/, scripts/       # Node utilities and build helpers
├── public/                 # Static assets, favicons, metadata files
├── AGENTS.md               # Agent-specific workflow guide
├── tailwind.config.js      # Tailwind CSS v4 configuration
├── next.config.mjs         # Next.js runtime/build settings
├── tsconfig.json           # TypeScript config with path aliases
└── package.json            # pnpm scripts and dependency graph
```

Path aliases (see `tsconfig.json`): `@/*`, `@animations/*`, `@layout/*`, `@sections/*`, `@3d/*`. Prefer these over long relative paths.

---

## 🧠 Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4 + custom CSS modules where needed
- **Animation & 3D:** Framer Motion, GSAP, React Three Fiber, OGL, postprocessing
- **State & Forms:** React Hook Form, Zod resolvers, Radix UI primitives
- **Tooling:** pnpm, ESLint (`next/core-web-vitals`), Prettier conventions (2 spaces, single quotes, no semicolons)
- **Testing:** Jest + Testing Library, Playwright (integration, QA, audit)
- **Observability:** Vercel Analytics, Speed Insights, Sentry
- **CI Guardrails:** GitHub Actions pipeline enforces lint, coverage, build, Playwright smoke, and bundle budgets before merge.

---

## 🛠️ Getting Started

```bash
git clone https://github.com/DevXGroup/devx-web.git
cd devx-web
pnpm install

# Start local dev server (http://localhost:3002)
pnpm dev

# Lint, test, and build
pnpm lint
pnpm test          # Jest suite
pnpm test:watch
pnpm test:coverage
pnpm build         # Production build
pnpm start         # Serve .next output
pnpm size          # size-limit budgets
pnpm analyze       # Bundle analyzer (ANALYZE=true next build)
```

Environment-specific values live in `.env.local`. Expose browser-safe values with the `NEXT_PUBLIC_` prefix only.

---

## 🧩 Architectural Notes

- **App Router:** Route segments map to directories under `src/app`. Each route exports a `page.tsx`; shared font, analytics, and layout logic live in `src/app/layout.tsx`.
- **Layouts & Chrome:** `ConditionalLayout` and `BrowserCompatibilityDetector` wrap most pages, inserting `Navbar`, `Footer`, transition effects, and compatibility messaging.
- **Components:** Feature work resides under `src/components/` with dedicated folders for hero sections, animations, 3D canvases, services, and UI primitives. Browser-only features use dynamic import or `ClientOnly` guards.
- **Hooks & Utilities:** Custom hooks in `src/hooks/` and root-level `hooks/` handle environment probing (reduced motion, Safari detection), analytics wiring, smooth scrolling, and toast notifications. Shared helpers (e.g., `cn`) live in `src/lib`.
- **Styling:** Tailwind CSS drives layout and theming; global typographic rules extend via `src/styles/typography.css`.
- **Data & Content:** Structured content lives in `src/data/` for reuse across routes and components. Rich SEO metadata is provided via `src/components/seo/StructuredData`.

---

## ✅ Testing & Quality

- **Unit & Component Tests:** Jest (`pnpm test`) with Testing Library. Use `tests/test-utils.ts` for consistent providers and mocks (Next router, IntersectionObserver, etc.).
- **Playwright Suites:** Located under `tests/integration/`, `tests/qa/`, and `tests/audit/`. Audit specs generate artifacts in `tests/audit/artifacts/`.
- **CI Expectations:** Run `pnpm lint` and relevant tests before raising PRs. Track coverage with `pnpm test:coverage` when introducing major features.
- **Bundle Budgets:** `pnpm size` enforces size-limit thresholds in CI; run `pnpm analyze` locally for bundle deep dives.
- **Metrics & Error Tracking:** Sentry instrumentation is enabled in the App Router; ensure new pages/components either respect existing boundaries or are wrapped with `ErrorBoundary` where appropriate.

---

## 🔄 Workflow Tips

- Follow commit prefixes (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`) and keep messages concise.
- Keep diffs focused; use `apply_patch` or targeted edits to avoid disrupting unrelated files.
- Reference `AGENTS.md` for agent-facing conventions and quick-start guidance.
- When adding client-only behaviour, gate it behind dynamic imports or the provided `ClientOnly` utilities to keep SSR stable.

---

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Playwright](https://playwright.dev/docs/intro)
- [Deployment Guardrails](docs/operations/deployment-guardrails.md)
- Internal product and content documentation is shared privately with the DevX Group team.
