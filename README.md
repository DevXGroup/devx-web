# DevX Group Website

![Version](https://img.shields.io/badge/version-1.12.3-blue?style=flat)
![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%2016.1.0%20%7C%20React%2019.2.1%20%7C%20Tailwind%204.1.13-blueviolet?style=flat&logo=next.js)
![Status](https://img.shields.io/badge/status-active-success?style=flat)

Portfolio and capability site for DevX Group LLC, a San Diego-based software engineering company specializing in custom web applications, AI/ML integration, and IoT hardware solutions. We work with small businesses through large enterprises, and provide dedicated engineering teams for startups and software companies seeking long-term execution partners to deliver results.

## Overview

The application showcases DevX Group's software engineering capabilities, project portfolio, and engagement models—from project-based delivery to embedded team augmentation. Built with Next.js App Router, it delivers fully typed, high-performance pages with animation-rich interactions and enterprise-ready privacy and legal coverage.

- Deployable to any Next.js-compatible platform, with defaults optimized for Vercel.
- Responsive layouts backed by Tailwind CSS theme tokens and IBM Plex typography.
- Built for accessibility, analytics visibility, and measurable performance.

## Key Features

- Next.js 15 App Router with route-level metadata and granular loading states.
- React 19 + TypeScript strict mode for dependable authoring and runtime safety.
- Tailwind CSS 4 design system with theme-green, theme-gold, and theme-purple palettes.
- Framer Motion, GSAP, and React Three Fiber for high-impact animation and 3D experiences.
- Calendly integration powering contact scheduling and lead capture flows.
- Sentry, Vercel Analytics, and Speed Insights for monitoring and observability.
- CCPA-compliant privacy policy and comprehensive terms of service content.

## Tech Stack

### Core

- Framework: Next.js 16.1.0 (App Router) on React 19.2.1
- Language: TypeScript (strict mode)
- Package manager: pnpm >= 10.19
- Runtime: Node.js >= 22.14 < 23

### UI & Interactions

- Styling: Tailwind CSS 4.1.13 with IBM Plex Sans and IBM Plex Mono
- Components: Radix UI primitives, Lucide React icons
- Motion & 3D: Framer Motion, GSAP, Three.js, React Three Fiber
- Forms: React Hook Form + Zod validation

### Tooling & Integrations

- Testing: Jest + Testing Library, Playwright E2E suites
- Monitoring: Sentry, Vercel Analytics, Vercel Speed Insights
- Communications: Nodemailer transport, Calendly widget

## Architecture

Source is organized for feature discoverability and shared layout consistency.

```
src/
├─ app/                       # App Router routes, layouts, and metadata
│  ├─ page.tsx                # Homepage
│  ├─ about/                  # About DevX Group
│  ├─ portfolio/              # Case studies and showcase
│  ├─ pricing/                # Pricing tiers
│  ├─ services/               # Service verticals (e.g., creative animation sections)
│  ├─ contact/                # Contact form + Calendly integration
│  ├─ privacy/                # CCPA-compliant privacy policy
│  └─ terms/                  # Terms of service
├─ common/                    # Global chrome (navbar, footer)
├─ components/                # UI primitives, animations, 3D, sections, services, etc.
├─ hooks/                     # Reusable React hooks
├─ lib/                       # Utilities and helpers
├─ data/                      # Structured content and copy
├─ styles/                    # Supplemental styling artifacts
└─ types/                     # Shared TypeScript definitions

tests/
├─ components/                # Jest component specs
├─ integration/               # Playwright integration flows
└─ qa/                        # QA automation and regression scripts
```

Path aliases (`@/*`, `@animations/*`, `@layout/*`, `@sections/*`, `@3d/*`) keep imports concise.

## Getting Started

### Prerequisites

- Node.js >= 20.11 and < 23
- pnpm >= 10.19 (enable via `corepack enable pnpm` if needed)

### Installation

```bash
git clone https://github.com/DevXGroup/DevX-WebApp.git
cd DevX-WebApp
pnpm install
```

### Local Development

```bash
pnpm dev
```

The development server runs on http://localhost:3002 with hot-module reloading.

## Development Scripts

- `pnpm dev` – start the Next.js development server (port 3002).
- `pnpm lint` – run ESLint (Next.js `core-web-vitals` preset).
- `pnpm test` / `pnpm test:watch` / `pnpm test:coverage` – execute Jest suites.
- `pnpm build` – create an optimized production build.
- `pnpm start` – serve the production bundle.
- `pnpm size` – audit bundle size limits.
- `pnpm analyze` – generate bundle analysis visualizations.
- `pnpm update-readme` – automatically sync README version badges from `package.json` (run after version bumps).

## Environment Configuration

Create a `.env.local` file at the repository root for secrets and environment overrides. Use the `NEXT_PUBLIC_` prefix for variables that must be exposed to the browser.

```env
NEXT_PUBLIC_SITE_URL=https://www.devxgroup.io
SENTRY_AUTH_TOKEN=your_token_here
EMAIL_SMTP_USER=your_username
EMAIL_SMTP_PASSWORD=your_password
```

Keep credentials out of version control and configure hosting platforms with matching environment variables.

## Testing & Quality

- **Pre-commit hooks** automatically enforce code quality before commits using Husky and lint-staged:
  - Prettier formats all staged files
  - Next.js ESLint checks source files in `src/`
  - No manual formatting needed—hooks handle it automatically
- Run `pnpm lint` before opening pull requests to enforce code quality.
- Use `pnpm test` for component tests and `pnpm test:coverage` for coverage tracking.
- Playwright scenarios in `tests/integration/`, `tests/qa/`, and `tests/audit/` validate critical journeys—update or add specs when flows change.
- Respect server/client boundaries: default to server components and use `"use client"` only when required.
- Maintain accessibility (ARIA, focus management, reduced motion) to keep Jest and browser tests green.

## Coding Standards

- Strict TypeScript across the codebase; prefer explicit public interfaces.
- File naming: components in `PascalCase.tsx`, hooks in `use-*.ts`.
- Formatting enforced by Prettier (2 spaces, single quotes, no semicolons) via pre-commit hooks.
- Leverage shared path aliases instead of deep relative imports.
- Follow conventional commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`).
- Optimize performance with dynamic imports for heavy, browser-only modules.

### Pre-commit Quality Checks

Git hooks automatically run when you commit changes:

1. **Prettier** - Auto-formats all staged files (`.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.css`, `.scss`, `.md`)
2. **Next.js ESLint** - Lints and fixes issues in source files under `src/`

If you need to bypass hooks (not recommended), use `git commit --no-verify`.

## Documentation

Comprehensive project documentation is available in the [docs/](docs/) directory:

- **[Code Submission Workflow](docs/guides/code-submission-workflow.md)** - How to submit PRs with semantic versioning
- **[CI/CD Setup](docs/operations/ci-cd-setup.md)** - GitHub Actions and semantic-release configuration
- **[Deployment Commands](docs/operations/deployment-commands.md)** - Skip CI/Vercel deployment tags (`[skip ci]`, `[skip vercel]`)
- **[Accessibility Testing](docs/guides/accessibility-testing.md)** - WCAG compliance testing

See [docs/README.md](docs/README.md) for complete documentation index.

## Deployment

```bash
pnpm build
pnpm start
```

The project targets Vercel out of the box but remains portable to any Next.js-compatible host. Ensure production environments mirror `.env.local` secrets and review analytics/error monitoring dashboards after release.

## Support

**DevX Group LLC**  
San Diego, California  
Website: https://www.devxgroup.io  
Contact: Use the website contact form or Calendly links provided in-app for consultations

## License

Copyright (c) 2025 DEVX Group LLC. All rights reserved.

## Maintainers

- Max Sheikhizadeh (Principal Contributor)
- Ali Sheikhizadeh (Contributor)
