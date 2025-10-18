# DevX Internal Developer Guide

Purpose
- Centralize engineering conventions and commands for DevX Web (Next.js, React, Tailwind, TypeScript).
- Keep this internal; do not link from the public README.

Quick Start
- Install: pnpm install
- Dev server: pnpm dev
- Lint/format: pnpm lint
- Tests (all): pnpm test
- Tests (single): pnpm jest path/to/test.tsx
- Build: pnpm build

Code Style & Conventions
- Formatting: Prettier via ESLint; 2-space indent, single quotes, no semicolons.
- Naming: Components PascalCase; files kebab-case where applicable.
- Imports: Use @/* alias for anything under src/ (configure in tsconfig.json + next config).
- Styling: Tailwind utilities; avoid inline styles.
- Types: TypeScript strict. Type props and function signatures.
- Error handling: Use boundaries for UI; try/catch with user-visible feedback for async.
- Components: Prefer small, focused function components + hooks.
- State: useState/useReducer locally; Context for light global state when needed.
- API routes: Next.js App Router conventions under src/app/api/.

Testing & QA
- Framework: Jest + Testing Library. Tests under tests/.
- Helpers: tests/test-utils.ts provides router and observer mocks.
- Artifacts: test-results/ (ignored) holds run outputs and audit artifacts.
- Cross-browser sanity: Chromium, Firefox, WebKit as needed.

Project Structure (excerpt)
- src/app: App Router pages (home, services, portfolio, about, pricing, etc.)
- src/common: Shared layout (Navbar, Footer)
- src/components: Feature components and ui primitives
- src/hooks: Client hooks (reduced motion, safari detection, etc.)
- src/lib: Utilities (e.g., cn class merge)
- src/styles: Global CSS (typography)
- tests: Unit/integration tests
- public: Static assets

Performance & Images (quick checklist)
- Use next/image; set width, height, sizes, and priority where LCP.
- Provide descriptive alt focused on purpose.
- Avoid layout shift: specify dimensions and reserve space.

Accessibility (quick checklist)
- Landmarks: header, main#main, footer; include skip link.
- Focus: ensure visible :focus-visible styles.
- Reduced motion: honor prefers-reduced-motion.
- Forms: label every control; aria-invalid + aria-describedby for errors; clear success state.

Analytics (minimal events)
- button_click { button_name }
- link_click { link_url, link_text }
- form_submit { form_name, status }
- calendly_booking { event_label }

Notes
- Keep this document aligned with actual code. Update when conventions change.
- Remove any references to external authoring or tooling names from public docs; keep internal notes here.
