# DevX Internal Content, A11y, and CRO Guide

Purpose
- Condense writing standards, accessibility, SEO, and conversion patterns for internal use.
- Keep this internal; do not link publicly. Use as a checklist when shipping pages.

Writing Principles
- Clarity at ~8th grade reading level; short sentences; active voice.
- Lead with the user’s outcome; then how it works; then specifics.
- Avoid marketing buzzwords. Prefer concrete, plain language.
- Words to avoid → alternatives: revolutionize → improve; dominate your market → help you compete; bulletproof → reliable; unstoppable → effective; supercharge → speed up; cutting-edge → modern; game-changing → useful; unleash/harness → use; boldest ideas → your ideas; strategic edge → advantage; exponentially → significantly (or omit).

UX & Accessibility Checklist
- Landmarks and structure: header (role=banner), main#main, footer (role=contentinfo); add a skip link to #main.
- Focus: visible :focus-visible outline; ensure keyboard reachability for interactive components.
- Reduced motion: respect prefers-reduced-motion; disable non-essential animation/transition.
- Forms: label each input; use aria-invalid and aria-describedby for error messages; provide confirmation states; include brief privacy microcopy.
- Modals/dialogs: role="dialog", aria-modal, aria-labelledby; trap focus; restore focus on close; Esc to close.

Media & Performance
- Images: use next/image; set width, height, sizes; priority for hero/LCP; descriptive alt that reflects purpose.
- Preload critical hero/OG images as needed; avoid layout shift by reserving space.
- Dynamic imports: use for heavy components; gate browser-only features behind client checks.

SEO & Metadata (Next.js App Router)
- On each page export metadata with title, description, alternates.canonical.
- Provide openGraph and twitter cards where relevant.
- Add Organization/Service JSON-LD via a small client Script component when appropriate.
- Add robots.ts and sitemap.ts in src/app for crawlability.

CRO Patterns (what to ship on core pages)
- Home: outcome-led H1; subhead with quantified results if available; primary CTA (book/demo); secondary CTA (case studies). Add logo band and 2–3 short case tiles (problem→solution→result).
- Services: bullets tied to measurable outcomes; internal links to pricing/contact.
- Portfolio: per-card problem/solution/result; meaningful alt text for images; dialog a11y if using modals.
- Contact: promise response time; labels and errors; analytics event on submit; inline Calendly iframe with reserved height + descriptive title.

Analytics Events (minimum map)
- button_click { button_name }
- link_click { link_url, link_text }
- form_submit { form_name, status }
- calendly_booking { event_label }

Layout/Animation Note (from console audits)
- Avoid measuring elements while an ancestor is transform: scale(0). This yields 0x0 DOMRects on first paint and causes mis-sizing.
- Prefer opacity:0/visibility:hidden to stage entrance without breaking layout. If scale(0) is desired visually, delay layout-dependent measurements until after scale > 0 (e.g., via requestAnimationFrame or transitionend).

Release Checklist (per page)
- Metadata set (title/description/canonical + OG/Twitter).
- Landmarks and skip link present.
- Focus outlines visible; keyboard flows verified.
- next/image props (width/height/sizes/priority) set for above-the-fold.
- Copy adheres to writing principles; CTAs are clear and consistent.
- Analytics events wired (where applicable).
- No console errors, and INP/LCP within targets on test hardware.
