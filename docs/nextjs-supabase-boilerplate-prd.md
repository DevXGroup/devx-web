# Next.js + Supabase Boilerplate PRD for DevX-Class Marketing Apps

## 1. Purpose & Context
- **Objective**: Provide AI agents with a reusable blueprint to create high-end marketing/web apps mirroring the DevX Group production experience while allowing rapid content, font, and color swaps.
- **Source of Truth**: Current DevX Group website built with Next.js App Router, React 19, Tailwind CSS 4, extensive motion/3D layers, and analytics instrumentation.
- **Scope**: Full-stack boilerplate including polished marketing site, animated hero and section transitions, contact and scheduling flows, and Supabase-backed authentication/profile storage (extendable to future product features).
- **Out of Scope**: Payments, complex dashboards, or CMS authoring. Agents may stub these as future enhancements.

## 2. Target Users & Jobs-To-Be-Done
| Persona | Goals | Critical Needs |
| --- | --- | --- |
| Prospective clients / leads | Discover services, view work, book intro call | Fast first paint, wow-factor hero, proof of work, frictionless scheduling |
| Returning collaborators | Validate credibility, locate resources | Consistent navigation, up-to-date portfolio, legal docs |
| Authenticated beta testers (future) | Access gated demos/resources | Supabase login, role-based routing, secure API surface |

## 3. Experience Pillars
1. **Instant credibility** via high-contrast dark theme, glitch hero, and 3D/motion micro-interactions.
2. **Guided storytelling** across Home, About, Services, Portfolio, Pricing, and Contact pages with reusable section primitives.
3. **Performance-first**: optimized fonts, lazy hydration of heavy effects, Lenis smooth scrolling, analytics instrumentation.
4. **Auth-ready foundation**: Supabase email/password + magic link login, persistent session helpers, profile table ready for gated features.

## 4. Technology Stack Requirements
- **Framework**: Next.js 15 App Router, React 19, TypeScript strict.
- **Styling**: Tailwind CSS 4 with custom `globals.css` typography and theme tokens. Permit theme overrides through Tailwind config + CSS variables.
- **Motion & Effects**:
  - Framer Motion for hero reveals, section transitions, counters.
  - GSAP + ScrollTrigger (optional) for marquee and scroll-driven effects.
  - Lenis for smooth scrolling.
  - React Three Fiber, Drei, OGL, and `postprocessing` for 3D hero elements and holo cards.
  - Custom canvas glitch background similar to `EntryPage` implementation.
- **UI Components**: Radix UI primitives (dropdowns, dialogs, accordions, tabs, navigation menu, toast) styled via Tailwind + class-variance-authority.
- **Forms**: React Hook Form with Zod validators, Sonner for toasts.
- **Data Layer**:
  - Static marketing content via structured TS exports in `src/data/**`.
  - Supabase for auth (`auth.users`), profiles, and future feature data.
- **Observability**: Vercel Analytics, Speed Insights, Sentry, Google Tag Manager, Google Analytics 4. Structured data injection via dedicated component.
- **Tooling**: pnpm, ESLint (`next/core-web-vitals`), Jest + Testing Library, Playwright suites.

## 5. Information Architecture & Page Contracts
| Route | Purpose | Key Modules |
| --- | --- | --- |
| `/` (Home) | High-impact hero, service highlights, marquee of capabilities, proof/social proof, CTA to contact | `EntryPage`, glitch canvas, metrics counters, Lenis smoothing, call-to-action components |
| `/about` | Company story, leadership spotlight, values timeline | Animated timelines, image reveals, testimonial sliders |
| `/portfolio` | Case studies grid with hover motion and modal details | Portfolio cards with 3D tilt, lightbox or modal using Radix Dialog |
| `/pricing` | Tiered pricing with toggles, FAQ accordion, CTA | Radix Tabs, Accordion, callout banners |
| `/services/creative-animation` | Deep dive service microsite with segmented sections | Section layout primitives, GSAP scroll scrubbing, sticky navigation |
| `/contact` | Contact form (React Hook Form + Zod), embedded Calendly iframe, location/map | Form validation, Sonner toasts, fallback email handler |
| `/privacy`, `/terms` | Legal copy with typographic rhythm | Markdown/MDX renderer using shared typography classes |
| `/dev-features` | Playground for future experiments; optional in production |
| `/auth/*` (to add) | Supabase-powered sign in/up, magic link confirmation, account settings | Supabase auth UI components, server actions for session handling |

### Shared Layout & Chrome
- `src/app/layout.tsx` wraps pages with fonts (`IBM Plex Sans/Mono` via `next/font`), analytics scripts, structured data, and `ConditionalLayout` for Nav/Footer.
- Global components: `Navbar`, `Footer`, `GlobalTransition`, `ScrollToTop`, `BrowserCompatibilityDetector`, `DevToolsErrorSuppressor`.
- Maintain dark background, highlight gradients, and 3D accent objects consistent across routes.

## 6. Supabase Authentication & Data Model
1. **Dependencies**: add `@supabase/supabase-js`, `@supabase/auth-helpers-nextjs`, `@supabase/ssr`.
2. **Environment Variables** (stored in `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_JWT_SECRET`
3. **Client Helpers**:
   - Server: create `src/lib/supabase/server.ts` using `createServerClient` for route handlers and Server Components.
   - Client: `src/lib/supabase/client.ts` using `createBrowserClient` for login UI, with SSR safe caches.
   - Wrap `app/layout.tsx` with Supabase listener (`SessionContextProvider`) inside `ConditionalLayout`.
4. **Authentication Flows**:
   - Email/password and magic-link sign in.
   - Passwordless email link triggered from `/auth/magic-link`.
   - OAuth provider stubs (Google, GitHub) included but optional.
   - Protect private routes via middleware (`middleware.ts`) using `createServerClient` to check session; redirect unauthenticated users to `/auth/login`.
5. **Database Schema** (SQL migration example):
   ```sql
   create table public.profiles (
     id uuid primary key references auth.users(id) on delete cascade,
     full_name text,
     avatar_url text,
     role text default 'member',
     company text,
     metadata jsonb default '{}'::jsonb,
     created_at timestamptz default timezone('utc', now()),
     updated_at timestamptz default timezone('utc', now())
   );

   create table public.audit_logs (
     id uuid primary key default gen_random_uuid(),
     user_id uuid references auth.users(id),
     action text not null,
     payload jsonb,
     created_at timestamptz default timezone('utc', now())
   );

   alter table public.profiles enable row level security;
   create policy "Users can manage own profile" on public.profiles
     using (auth.uid() = id) with check (auth.uid() = id);

   alter table public.audit_logs enable row level security;
   create policy "Users can read own audit logs" on public.audit_logs
     for select using (auth.uid() = user_id);
   ```
6. **UI Requirements**:
   - `/auth/login`: card with brand visuals, email/password form, SSO buttons, link to sign-up and magic link.
   - `/auth/register`: capture name + email + password; on success create `profiles` row via server action.
   - `/auth/account`: gated page to edit profile, update password, view login history (from `audit_logs`).
   - Provide toast feedback (Sonner), loading indicators, and error messaging consistent with design system.
7. **Server Actions & APIs**:
   - Use Next.js App Router server actions for login/register wrappers; fall back to route handlers (`app/api/auth/*/route.ts`) when needed for Supabase webhooks.
   - Provide `/api/contact` route using Supabase service role (optional) to persist lead submissions.
8. **Testing**:
   - Add Jest unit tests for auth helpers (mock Supabase client).
   - Extend Playwright flows to cover login, logout, gated page access.

## 7. Content & Theming Controls
- **Fonts**: default IBM Plex Sans/Mono. Allow overrides by updating `next/font` config in `app/layout.tsx`. Document alternative pairings (e.g., Geist, Inter) and ensure fallback stacks specified.
- **Color System**: centralize tokens in `tailwind.config.js` (`colors`, `gradients`, `shadows`). Provide JSON-like export for AI agents to swap brand palette quickly.
- **Copy**: maintain structured data files (e.g., `src/data/hero.ts`, `src/data/portfolioProjects.ts`). Agents update text by editing these exports instead of components.
- **Images & Media**: store hero videos and textures in `public/`. Document required resolutions (e.g., hero background video 1920×1080 webm/mp4, portfolio images 1440×900 webp).
- **SEO Metadata**: All pages define `metadata` exports using helper functions from `src/lib/og`. Agents update `eyebrow`, `title`, `subtitle`, `focus` arrays to generate OG/Twitter images.

## 8. Motion, 3D, and Interaction Guidelines
- Keep hero glitch canvas and decrypted text reveal as signature elements. Provide configuration props for glitch speed, colors, vignette toggles.
- Use Framer Motion variants for staggered section reveals; prefer reduced-motion checks (`useReducedMotion`) to disable heavy effects.
- 3D scenes (React Three Fiber) should lazy load on viewport entry and offer fallback poster images for SSR.
- GSAP/ScrollTrigger limited to client components; ensure wrappers guard `window` usage.
- Lenis initialization happens once in layout; expose config options for damping and duration for agents.
- Provide accessible alternatives: ensure focus states visible, animations do not block interaction, and motion respects prefers-reduced-motion.

## 9. Analytics, Observability & Compliance
- Maintain GA4 + GTM script injection (lazy load) and noscript iframe as in production layout.
- Keep Vercel Analytics + Speed Insights components mounted.
- Sentry instrumentation remains active; include DSN env var placeholder.
- Structured data types: organization, localBusiness, website; update JSON-LD payloads for new brand details.
- Cookie banner optional; document stub in `src/components/layout/CookieConsent.tsx` if compliance needed.
- Ensure legal pages (`/privacy`, `/terms`) use accessible typography and anchor linking for subsections.

## 10. Accessibility & Performance Criteria
- LCP < 2.5s on desktop/mobile; fonts preloaded via `next/font`.
- CLS near zero: avoid layout shifts by reserving space for async assets.
- Use Next.js `Image` for responsive imagery.
- Provide keyboard navigation support for all interactive components.
- Write Playwright accessibility audit (`tests/audit/`) to validate `aria` attributes and color contrast.

## 11. Implementation Blueprint for Agents
1. **Bootstrap**: `pnpm dlx create-next-app@latest` with App Router + TypeScript, install dependencies list above plus Supabase packages.
2. **Project Setup**:
   - Configure Tailwind CSS 4, copy `globals.css`, typography, and `tailwind.config.js` tokens.
   - Add path aliases in `tsconfig.json` (`@/*`, `@animations/*`, etc.).
3. **Layout & Providers**:
   - Reproduce `layout.tsx` with fonts, analytics scripts, `ConditionalLayout`, `GlobalTransition`, Supabase providers.
   - Implement `Navbar`, `Footer`, `ScrollToTop`, `BrowserCompatibilityDetector`.
4. **Sections & Components**:
   - Port hero glitch canvas (`EntryPage`) with configurable props.
   - Create section library (stats grid, marquee, testimonials, CTA banners, FAQ accordions, pricing cards, portfolio cards, 3D showcases).
   - Build form primitives using Radix + React Hook Form.
5. **Routing**: Implement page structure from Section 5 with server metadata definitions and static data imports.
6. **Supabase Auth**:
   - Set up client/server helpers, create auth pages, middleware, and account management.
   - Connect contact form + optional lead capture table using service role function.
7. **Data & SEO**: Populate `src/data` modules, `StructuredData` component, OG image helpers.
8. **Testing**: Configure Jest + RTL, replicate Playwright specs for nav, contact form, auth flows.
9. **Deployment**: Document Vercel deployment steps, env variables, and Supabase project linking.

## 12. Customization Guidelines
- **Theme Switch**: Provide `ThemeProvider` using `next-themes`; allow toggling between dark/light while keeping dark as default.
- **Brand Swap Checklist**:
  1. Update colors in Tailwind config + CSS variables.
  2. Swap fonts via `next/font` imports and adjust weights.
  3. Replace content in `src/data/**` modules and legal markdown.
  4. Update OG image metadata seeds.
  5. Replace logos and favicons in `public/`.
  6. Adjust Supabase email templates to match brand.
- **Plugin Hooks**: Document GSAP plugin registration, R3F postprocessing pipeline, and how to disable features for lighter builds.

## 13. Deliverables & Acceptance Criteria
- ✅ Repository containing Next.js project with described architecture, Supabase auth, and content modules ready for customization.
- ✅ Documentation for environment setup, theming overrides, and motion controls.
- ✅ Test coverage for critical flows (nav, contact, auth) with green CI (`pnpm lint`, `pnpm test`, `pnpm build`).
- ✅ Deployment instructions validated on Vercel + Supabase.

## 14. Future Extensions (Optional Backlog)
- Multi-tenant workspace dashboards using Supabase Row Level Security.
- Stripe billing integration for pricing tiers.
- CMS bridge (e.g., Sanity) syncing to `src/data` via build-time fetch.
- AI-powered content generator leveraging Supabase Edge Functions.
