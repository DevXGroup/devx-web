# DevX Group Website

![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%2015.3.3%20%7C%20React%2019%20%7C%20Tailwind%204-blueviolet?style=flat&logo=next.js)
![Status](https://img.shields.io/badge/status-active-success?style=flat)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat)

Modern, performant website for DevX Group LLC - A California-based software development company specializing in custom software solutions, AI/ML integration, IoT hardware development, and digital transformation services.

**Main Contributor:** Max Sheikhizadeh

---

## 🔥 About DevX Group LLC

**DevX Group LLC** is a San Diego, California-based software and IoT engineering company delivering high-impact solutions with precision, efficiency, and excellence. We specialize in custom software development, AI/ML solutions, IoT hardware, and digital transformation consulting.

📍 Website: [www.devxgroup.io](https://www.devxgroup.io)
📧 Contact: support@devxgroup.io
📞 Phone: +1 (442) 544-0591

---

## 🚀 Project Highlights

- **Next.js 15.3.3 App Router** with optimized SEO and metadata management
- **React 19 + TypeScript** in strict mode for type safety
- **Tailwind CSS 4** with custom design system (theme-green, theme-gold, theme-purple)
- **Advanced Animations** with Framer Motion, GSAP, and Three.js/React Three Fiber
- **Performance-First** with dynamic imports, reduced motion support, and optimized assets
- **Radix UI Components** with custom styling and accessibility features
- **React Hook Form + Zod** validation for robust form handling
- **Calendly Integration** for seamless scheduling on contact page
- **CCPA-Compliant** privacy policy and comprehensive terms of service
- **Sentry Error Tracking** and Vercel Analytics integrated
- **IBM Plex Font System** (IBM Plex Mono for headings, IBM Plex Sans for body)

---

## 📁 Repository Structure

```
DevX-WebApp/
├── src/
│   ├── app/                        # Next.js 15 App Router
│   │   ├── about/                  # About page
│   │   ├── contact/                # Contact page + Calendly integration
│   │   ├── portfolio/              # Project showcase
│   │   ├── pricing/                # Pricing tiers
│   │   ├── services/               # Services with animations
│   │   ├── privacy/                # Privacy policy (CCPA compliant)
│   │   ├── terms/                  # Terms of service
│   │   ├── layout.tsx              # Root layout with fonts, analytics
│   │   ├── page.tsx                # Homepage
│   │   └── globals.css             # Global styles
│   ├── common/                     # Shared layout components
│   │   ├── Navbar.tsx              # Main navigation
│   │   └── Footer.tsx              # Footer with legal links
│   ├── components/                 # Reusable components
│   │   ├── ui/                     # Base UI components (Radix primitives)
│   │   ├── animations/             # Motion components (Framer Motion, GSAP)
│   │   ├── 3d/                     # Three.js/React Three Fiber components
│   │   ├── sections/               # Page sections
│   │   ├── services/               # Service-specific components
│   │   ├── portfolio/              # Portfolio components
│   │   ├── seo/                    # SEO and metadata components
│   │   └── [feature]/              # Feature-specific components
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utility functions and helpers
│   ├── data/                       # Static content and data
│   ├── styles/                     # Additional CSS modules
│   └── types/                      # TypeScript type definitions
├── public/                         # Static assets
│   ├── sitemap.xml                 # SEO sitemap
│   ├── robots.txt                  # Search crawler config
│   └── [assets]/                   # Images, fonts, etc.
├── tests/                          # Test suites
│   ├── components/                 # Component tests (Jest)
│   ├── integration/                # Integration tests (Playwright)
│   └── qa/                         # QA scenarios
├── CLAUDE.md                       # Development guidelines
├── tailwind.config.js              # Tailwind configuration
├── next.config.mjs                 # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

---

## 🧠 Tech Stack

### Core
- **Framework:** Next.js 15.3.3 (App Router) + React 19
- **Language:** TypeScript (strict mode)
- **Package Manager:** pnpm (required)
- **Styling:** Tailwind CSS 4 with custom design tokens
- **Fonts:** IBM Plex Mono (headings) + IBM Plex Sans (body)

### UI & Interactions
- **Component Library:** Radix UI primitives
- **Icons:** Lucide React
- **Animations:** Framer Motion + GSAP
- **3D Graphics:** Three.js + React Three Fiber
- **Forms:** React Hook Form + Zod validation

### Integrations
- **Scheduling:** Calendly widget integration
- **Analytics:** Vercel Analytics + Speed Insights
- **Error Tracking:** Sentry
- **Email:** Nodemailer (contact form)

### Development Tools
- **Linting:** ESLint with Next.js config
- **Code Style:** 2 spaces, single quotes
- **Type Checking:** TypeScript strict mode
- **Version Control:** Git with conventional commits

---

## 🛠️ Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/DevXGroup/DevX-WebApp.git
cd DevX-WebApp

# Install dependencies (pnpm required)
pnpm install
```

### Development

```bash
# Start development server (http://localhost:3000)
pnpm run dev

# Run linter
pnpm run lint

# Build for production
pnpm run build

# Start production server
pnpm run start
```

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific values. Use the `NEXT_PUBLIC_` prefix for browser-accessible variables.

```env
# Example environment variables
NEXT_PUBLIC_SITE_URL=https://www.devxgroup.io
SENTRY_AUTH_TOKEN=your_token_here
```

---

## 🧩 Architecture & Design Principles

### Core Principles
- **Simplicity First:** Choose the simplest working solution with polished animations
- **App Router Only:** Next.js 15 App Router conventions exclusively
- **Mobile First:** Responsive design with consistent typography scaling
- **Performance:** Optimized animations, dynamic imports, reduced motion support
- **Accessibility:** WCAG 2.1 compliant with proper ARIA labels

### Routing & Layout
- **App Router Structure:** Each route maps to a directory under `src/app/` with `page.tsx`
- **Root Layout:** Shared fonts, analytics, and metadata in `src/app/layout.tsx`
- **Shared Components:** Navbar and Footer in `src/common/` for consistent chrome

### Component Organization
- **Server Components:** Default rendering strategy for better performance
- **Client Components:** Use `"use client"` sparingly at component boundaries
- **Feature Folders:** Organized by feature in `src/components/`
- **UI Primitives:** Reusable base components in `src/components/ui/`

### Styling Strategy
- **Tailwind-First:** Utility classes for rapid development
- **Responsive Pattern:** `text-3xl md:text-4xl lg:text-5xl` for consistency
- **Custom Design Tokens:** theme-green (#4CD787), theme-gold (#CFB53B), theme-purple (#9d4edd)
- **IBM Plex Typography:** Professional, readable font system

### SEO & Legal
- **Sitemap:** Auto-generated at `/sitemap.xml`
- **Robots.txt:** Search crawler configuration
- **Privacy Policy:** CCPA-compliant at `/privacy`
- **Terms of Service:** Comprehensive legal protection at `/terms`

---

## ✅ Code Quality & Standards

### Development Standards
- **TypeScript Strict Mode:** Full type safety enforcement
- **ESLint:** Code quality and consistency checks
- **Conventional Commits:** `feat:`, `fix:`, `refactor:`, `chore:`, `docs:` prefixes
- **Code Style:** 2 spaces, single quotes, consistent formatting

### Security Best Practices
- **Input Validation:** Zod schemas for all form inputs
- **OWASP Guidelines:** Protection against common vulnerabilities
- **Environment Variables:** Secure handling of sensitive data
- **CCPA Compliance:** Privacy policy and data handling

### Performance Monitoring
- **Vercel Analytics:** Real-time performance metrics
- **Speed Insights:** Core Web Vitals tracking
- **Sentry:** Error tracking and debugging
- **Lighthouse:** Regular performance audits

---

## 🔄 Development Workflow

### Git Workflow
1. **Branch Naming:** Use descriptive names (`feature/`, `fix/`, `refactor/`)
2. **Commit Messages:** Follow conventional commits format
3. **Pull Requests:** Keep focused and well-documented
4. **Code Review:** Required before merging to main

### Best Practices
- **Server Components First:** Use client components only when necessary
- **Dynamic Imports:** Lazy load heavy components for better performance
- **Responsive Testing:** Test on mobile, tablet, and desktop viewports
- **Accessibility:** Use semantic HTML and proper ARIA labels
- **SEO:** Update sitemap.xml when adding new routes

### Adding New Pages
1. Create directory under `src/app/[route-name]/`
2. Add `page.tsx` with proper metadata
3. Update `public/sitemap.xml` with new route
4. Test responsive layout and accessibility
5. Verify SEO metadata and OpenGraph tags

---

## 📚 Resources & Documentation

### Framework Documentation
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### UI & Styling
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP Documentation](https://gsap.com/docs/)

### Tools & Libraries
- [React Hook Form](https://react-hook-form.com/get-started)
- [Zod Validation](https://zod.dev/)
- [Three.js](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

### Project Files
- See `CLAUDE.md` for detailed development guidelines
- Contact DevX Group for internal documentation

---

## 📞 Contact & Support

**DevX Group LLC**
- 📍 San Diego, California
- 📧 support@devxgroup.io
- 📞 +1 (442) 544-0591
- 🌐 [www.devxgroup.io](https://www.devxgroup.io)
- 📅 [Schedule a Meeting](https://calendly.com/a-sheikhizadeh/devx-group-llc-representative)

---

## 📝 License

MIT License - Copyright (c) 2025 DevX Group LLC

**Main Contributor:** Max Sheikhizadeh
