# DevX Web – Frontend Framework for DevX Group LLC

![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%20%7C%20React%20%7C%20Tailwind%20CSS-blueviolet?style=flat&logo=next.js)
![Status](https://img.shields.io/badge/status-active-success?style=flat)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat)

---

## 🔥 About DevX Group LLC

**DevX Group LLC** is a California-based software and IoT development powerhouse built on decades of industry experience and a passion for solving complex challenges.

We are a hand-selected group of elite professionals chosen not just for technical expertise but for our ability to execute with **precision**, **efficiency**, and **excellence**—like a commando unit.

Whether you're a startup turning vision into product or an established firm needing high-caliber problem solvers, we step in and get it done. Seamlessly. Relentlessly. Exceptionally.

📍 Learn more: [www.devxgroup.io](https://www.devxgroup.io)

---

## 🚀 Project Overview

```
devx-web/
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── home/, about/, contact/, portfolio/, pricing/, privacy/, terms/, services/creative-animation/
│   │   ├── layout.tsx      # Global fonts, BrowserCompatibilityDetector, ConditionalLayout
│   │   └── page.tsx        # Entry point when no path is provided
│   ├── common/             # Shared layout pieces (Navbar, Footer)
│   ├── components/         # Reusable components: 3d/, animations/, sections/, services/, portfolio/, layout/, effects/, planet/, transitions/, ui/
│   ├── hooks/              # Client-side hooks (backdrop filter support, smooth scroll, etc.)
│   ├── lib/                # Utilities (cn function for class merging)
│   ├── data/               # Static data (e.g., portfolioProjects.ts)
│   ├── styles/             # Global CSS (typography.css)
│   ├── types/              # Type declarations (e.g., css.d.ts)
│   └── dev-features/       # Dev-only pages and feature playgrounds
├── tests/                  # Jest unit tests; Playwright specs (integration/, qa/, audit/) + artifacts/
├── public/                 # Static assets (images, logos, robots.txt, sitemap.xml)
├── hooks/, helper/, scripts/ # Supporting hooks/utilities outside `src/`
├── tailwind.config.js      # Tailwind theme extensions
├── tsconfig.json           # TypeScript configuration with strict mode
├── next.config.mjs         # Next.js build/runtime settings
└── README.md               # Project overview and setup
```

This repository contains the frontend for the **DevX web experience**, including:

- **Marketing site**
- **Client portal**
- **Project dashboards**
- **Responsive components powered by Tailwind**
- Seamless integration with DevX APIs and backend services

---

## 🧠 Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint & Prettier](https://eslint.org/)
- [Vercel](https://vercel.com/) or Docker (depending on deploy target)

---

## 🛠️ Local Development

```bash
git clone https://github.com/DevXGroup/devx-web.git
cd devx-web
pnpm install
pnpm dev        # launches dev server on port 3002
pnpm test       # run Jest tests
pnpm lint       # run ESLint/Prettier
```

### Key Concepts & Patterns

1. **Next.js App Router**

   - Pages live in `src/app/**/page.tsx` with optional nested directories for routes like `/home`, `/services`, etc.
   - `src/app/layout.tsx` sets up global fonts and wraps content in `ConditionalLayout`, which inserts the navigation and footer on all routes except `/`.

2. **Component Organization**

   - `src/common` holds shared layout components (Navbar, Footer).
   - `src/components` contains feature-rich components (hero animations, parallax sections, 3D elements) and a `ui` subfolder of headless UI primitives derived from Shadcn.
   - Many heavy or browser-specific components are loaded with `next/dynamic` and gated behind `ClientOnly` to avoid server/client mismatches.

3. **Styling & Utilities**

   - Tailwind CSS is the primary styling mechanism; custom colors, fonts, and animations are configured in `tailwind.config.js`.
   - The `cn` utility (in `src/lib/utils.ts`) merges Tailwind class strings.
   - Global typography rules reside in `src/styles/typography.css`.

4. **Custom Hooks**

   - `src/hooks` and root-level hooks provide reusable logic, e.g., detecting backdrop-filter support, responding to motion preferences, building a toast system, or gating rendering to the client.

5. **Testing**

   - Jest and Testing Library are configured via `jest.config.js` and `jest.setup.js`.
   - Tests live under `tests/`, with helpers in `tests/test-utils.ts` that mock Next.js router, IntersectionObserver, etc.
   - Playwright specs live in `tests/integration/`, `tests/qa/`, and `tests/audit/` (artifacts in `tests/audit/artifacts/`). Configure Playwright separately from Jest.

6. **Helper Scripts**

   - The `helper` directory contains scripts for managing assets (e.g., downloading portfolio images) and a standalone `utils.ts` for non-app code.

7. **Guidelines & Documentation**
   - Internal engineering and content guidelines are maintained privately.

### Next Steps for Deepening Understanding

- **Explore the App Router**

  - Start with `src/app/home/page.tsx` to see how major sections (Hero, Features, Process, DevelopmentTools) come together.
  - Look at `ConditionalLayout` and `BrowserCompatibilityDetector` for global app behavior.

- **Understand Components & Animations**

  - Study `src/components/sections/Hero.tsx` (Framer Motion, dynamic imports, text animations).
  - Explore `src/components/services/` and `src/components/portfolio/` for feature-specific UI.
  - Review 3D examples like `src/components/3d/ModernCube.tsx` or `src/components/3d/RotatingCube.tsx` using React Three Fiber.

- **Learn Custom Hooks**

  - `use-backdrop-filter-support.ts`, `use-reduced-motion.ts`, `use-safari-detection.ts`, etc., show how environment-specific logic is encapsulated.

- **Check Testing Practices**

  - `tests/components/ModernCube.test.tsx` and `ParallaxTestimonials.test.tsx` demonstrate component testing with mocked libraries and helpers.

- **Follow Guidelines**
  - Follow internal guidelines maintained privately for content and engineering practices.
