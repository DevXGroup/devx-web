# DevX Group LLC – CRO, Content, and A11y Upgrade Plan
Target: **Score 5/5 on Content** across all pages, with aligned UX, A11y (WCAG 2.2 AA), Performance, SEO, and Credibility.  
Repo: Next.js ^15, App Router in `src/app`.

---

## TL;DR: High-Impact Changes
1) **Single home**: Redirect `/home` → `/`, add outcome-led H1, strong subhead, CTA, social proof, and 3 mini case tiles.
2) **Metadata + JSON-LD**: Add `export const metadata` on every page, Organization + WebSite schema, and page-level OG/Twitter.
3) **Images**: Set `width`, `height`, `sizes`, and `priority` for hero/LCP; descriptive `alt`; convert any `<img>` to `<Image>`.
4) **A11y baseline**: Skip link, visible `:focus-visible`, landmarks (`header`, `main#main`, `footer`), semantic H1.
5) **Forms**: Labels, validation messages with `aria-describedby`, privacy microcopy; clear success state.
6) **Proof**: Add logo band (6), testimonials with names/roles, and quant results on case tiles.
7) **Analytics**: Track hero CTA click, contact submission, and scheduler clicks with consistent event names.

---

## Global Changes (apply once)
### 1) Layout landmarks, skip link, page chrome
```diff
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@
 import './globals.css'
 import type { Metadata } from 'next'
@@
 export const metadata: Metadata = {
-  title: 'DevX Group LLC',
+  title: { default: 'DevX Group LLC', template: '%s | DevX Group LLC' },
   description: 'Full‑stack software and hardware IoT development, CRO, and accessibility.',
+  metadataBase: new URL('https://www.devxgroup.io'),
+  openGraph: { siteName: 'DevX Group LLC', type: 'website', url: 'https://www.devxgroup.io' },
+  twitter: { card: 'summary_large_image' },
 }
@@
 export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
     <html lang="en">
-      <body className={ibmPlexSans.variable + ' ' + ibmPlexMono.variable}>
-        {children}
-      </body>
+      <body className={ibmPlexSans.variable + ' ' + ibmPlexMono.variable}>
+        <a href="#main" className="skip-link">Skip to main content</a>
+        <header role="banner">{/* <Navbar /> */}</header>
+        <main id="main">{children}</main>
+        <footer role="contentinfo">{/* <Footer /> */}</footer>
+      </body>
     </html>
   )
 }
```

### 2) Focus styles, skip-link, reduced motion
```diff
--- a/src/app/globals.css
+++ b/src/app/globals.css
@@
+:root { --focus: 2px; }
+.skip-link { position:absolute; left:-9999px; top:auto; width:1px; height:1px; overflow:hidden; }
+.skip-link:focus { position:static; width:auto; height:auto; padding:.5rem 1rem; }
+*:focus-visible { outline: var(--focus) solid #2563eb; outline-offset: 3px; }
+@media (prefers-reduced-motion: reduce) {
+  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
+}
```

### 3) Consolidate `/home` into `/`
```diff
--- a/src/app/home/page.tsx
+++ b/src/app/home/page.tsx
@@
+import { redirect } from 'next/navigation'
+export default function HomeRedirect(){ redirect('/') }
```

### 4) Sitemap and robots
```ts
// src/app/robots.ts
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return { rules:{ userAgent:'*', allow:'/' }, sitemap:'https://www.devxgroup.io/sitemap.xml' }
}

// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url:'https://www.devxgroup.io/', changeFrequency:'weekly', priority:1 },
    { url:'https://www.devxgroup.io/services', changeFrequency:'monthly', priority:0.8 },
    { url:'https://www.devxgroup.io/portfolio', changeFrequency:'monthly', priority:0.8 },
    { url:'https://www.devxgroup.io/about', changeFrequency:'yearly', priority:0.5 },
    { url:'https://www.devxgroup.io/contact', changeFrequency:'monthly', priority:0.7 },
    { url:'https://www.devxgroup.io/pricing', changeFrequency:'monthly', priority:0.7 },
  ]
}
```

### 5) Security headers (`next.config.mjs`)
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Strict-Transport-Security', value:'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Frame-Options', value:'DENY' },
        { key: 'X-Content-Type-Options', value:'nosniff' },
        { key: 'Referrer-Policy', value:'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value:'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value:"default-src 'self'; img-src 'self' https: data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; frame-ancestors 'none'" },
      ],
    }]
  },
}
export default nextConfig
```

### 6) Structured data helper
```tsx
// src/components/seo/StructuredData.tsx
'use client'
import Script from 'next/script'
export default function StructuredData({ data }: { data: object }) {
  return <Script id="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
```

---

## Page-by-Page Copy and Changes (to reach 5/5 Content)

### Home `/`
**Proposed metadata**
```ts
export const metadata = {
  title: 'Software & Hardware IoT Solutions | DevX Group LLC',
  description: 'Design, engineering, IoT solutions, and CRO to lift signups and revenue. Book a 15-minute consult.',
  alternates: { canonical: 'https://www.devxgroup.io/' },
  openGraph: { title:'DevX Group LLC — Web apps that convert', description:'Design, engineering, CRO. See our case studies.', url:'https://www.devxgroup.io/' },
  twitter: { card: 'summary_large_image' },
}
```

**Hero copy**
- **H1**: Web apps that convert visitors into customers
- **Subhead**: Design, engineering, IoT solutions, and CRO in one team. Median project lifts, **+28% demo requests**, **-35% time-to-first-action**.
- **Primary CTA**: Book a 15‑minute consult
- **Secondary CTA**: See case studies

**Section blocks**
- **Logo band**: 6 recognizable logos
- **Case tiles (3)**: Problem → Solution → Result (numbered)
- **How we work**: Strategy, Design, Build, Optimize, each with outcomes
- **Testimonials**: Quote, name, role

**Code changes**
```diff
--- a/src/app/page.tsx
+++ b/src/app/page.tsx
@@
-export default function Pricing() {
-  return <PricingPage />
-}
+export const metadata = { /* as above */ }
+export default function Home() {
+  return (
+    <main id="main">
+      <h1 className="sr-only">Web apps that convert visitors into customers</h1>
+      {/* Existing hero + add social proof + case tiles */}
+    </main>
+  )
+}
```
```diff
--- a/src/components/DynamicHero.tsx
+++ b/src/components/DynamicHero.tsx
@@
-<Image src="/hero.png" alt="Dashboard preview" />
+<Image
+  src="/hero.png"
+  alt="Dashboard preview increasing signups"
+  width={1600} height={900}
+  sizes="(max-width:768px) 100vw, (max-width:1200px) 90vw, 1200px"
+  priority
+/>
```

**JSON-LD**
```tsx
<StructuredData data={{
  "@context":"https://schema.org",
  "@type":"Organization",
  "name":"DevX Group LLC",
  "url":"https://www.devxgroup.io",
  "logo":"https://www.devxgroup.io/logo.png",
  "sameAs":["https://www.linkedin.com/company/devx"]
}}/>
```

---

### Services `/services`
**H1**: Full‑stack product delivery, optimized for conversion  
**Lead**: We design, build, and improve your Next.js app with measurable outcomes.

**Value bullets**
- Conversion-first UX prototypes and tests
- Next.js apps with fast LCP and low INP
- AI features with measurable impact
- Ongoing CRO sprints

**CTA**: See pricing

**Changes**
```diff
--- a/src/app/services/page.tsx
+++ b/src/app/services/page.tsx
@@
+export const metadata = {
+  title: 'Services | DevX Group LLC',
+  description: 'Full‑stack product delivery, CRO, and AI features.',
+}
```
- Ensure each section ends with a CTA and internal link to `/contact` or `/pricing`.

**FAQ schema (optional)**  
Add an FAQ at bottom with JSON-LD for common objections.

---

### Portfolio `/portfolio`
**H1**: Selected work  
**Intro**: Briefly describe domains and outcomes.

**Card schema** per project
- **Title**
- **Problem**: Short sentence
- **Solution**: What we did
- **Result**: A number (e.g., +32% activation rate)
- CTA: View details or Contact

**Code fixes**
```diff
--- a/src/app/portfolio/PortfolioPage.tsx
+++ b/src/app/portfolio/PortfolioPage.tsx
@@
-<Image src={p.image} alt={p.title} />
+<Image src={p.image} alt={`${p.title} dashboard after redesign`} width={1200} height={800} sizes="(max-width:768px) 100vw, 50vw" />
```
**Modal A11y (focus trap, Esc, close button with label)**  
Ensure role="dialog", `aria-modal`, `aria-labelledby`, and focus restoration.

---

### About `/about`
**H1**: Practical builders who own outcomes  
**Sections**
- **Mission & approach**: 3 bullets tied to impact
- **Team**: Headshots with titles, short bios
- **Values**: 4 concise points
- **Light CTA**: Talk to us

**Image fix**
```diff
--- a/src/app/about/AboutPage.tsx
+++ b/src/app/about/AboutPage.tsx
@@
-<Image src="/team.jpg" alt="Team" />
+<Image src="/team.jpg" alt="DevX Group LLC team at work" width={1400} height={933} sizes="100vw" />
```

---

### Contact `/contact`
**H1**: Tell us your goal, we’ll map the fastest path  
**Microcopy**: We respond within 1 business day. We never share your info.

**Form code improvements**
```diff
--- a/src/app/contact/page.tsx
+++ b/src/app/contact/page.tsx
@@
-<form>
+<form aria-describedby="contact-privacy">
+  <label htmlFor="name">Your name</label>
+  <input id="name" name="name" required aria-invalid={errors.name ? 'true' : 'false'} aria-describedby={errors.name ? 'name-error' : undefined} />
+  {errors.name && <p id="name-error" role="alert">Enter your name</p>}
+  {/* email, message with similar patterns */}
+  <p id="contact-privacy" className="text-sm mt-2">We respond within 1 business day. We never share your info.</p>
 </form>
```

**Event tracking**  
- `contact_submit` with `{ method:'native' }`  
- `scheduler_click` with `{ provider:'calcom' }`

---

### Pricing `/pricing`
**H1**: Simple plans that scale with you  
**Plans**
- **Starter**: Essentials to ship v1, includes X. Ideal for …
- **Growth**: CRO + features, includes Y. Ideal for …
- **Partner**: Embedded team, includes Z. Ideal for …

**Risk reversal**: “No long-term lock-in. Cancel anytime.”  
**FAQ**: 4–6 Q&A addressing time, cost, IP, security.

**Code**
```diff
--- a/src/app/pricing/page.tsx
+++ b/src/app/pricing/page.tsx
@@
+export const metadata = { title: 'Pricing | DevX Group LLC', description: 'Transparent packages, from discovery to launch.' }
```

---

## Images and LCP/CLS Checklist
- Hero and above-the-fold images: set `width`, `height`, `sizes`, `priority`.
- Descriptive `alt` focused on purpose, not “image of …”.
- Use `next/image`; convert any raw `<img>`.
- Preload OG image if used in hero.

---

## SEO and Schema
- **Organization** JSON-LD on Home.
- **WebSite + SearchAction** JSON-LD on Home (optional if site search exists).
- **Service** JSON-LD on Services.
- **Breadcrumb** JSON-LD on deep pages (if added).

Example `Service` schema (Services page):
```tsx
<StructuredData data={{
  "@context":"https://schema.org",
  "@type":"Service",
  "name":"Next.js product delivery and CRO",
  "provider":{ "@type":"Organization", "name":"DevX Group LLC" },
  "areaServed":"US",
  "serviceType":"Software development"
}}/>
```

---

## Analytics Event Map (minimum)
- `hero_cta_click` { location:'home_hero' }
- `case_tile_click` { case:'enterprise_analytics' }
- `contact_submit` { method:'native' }
- `scheduler_click` { provider:'calcom' }

Implement with your analytics lib or `window.gtag`/`posthog`/`plausible` equivalents.

---

## Tailwind Tokens (minimal, optional)
```js
// tailwind.config.js (excerpt)
module.exports = {
  theme: {
    extend: {
      colors: { brand: { DEFAULT:'#111827', blue:'#2563eb', lime:'#a3e635' } },
      fontSize: { xs:['0.75rem',1.2], sm:['0.875rem',1.4], base:['1rem',1.6], lg:['1.125rem',1.6], xl:['1.25rem',1.6], '2xl':['1.5rem',1.2], '3xl':['1.875rem',1.2], '4xl':['2.25rem',1.1] },
      spacing: { 13:'3.25rem', 15:'3.75rem' },
    },
  },
}
```

---

## Order of Operations (apply in this sequence)
1) Layout landmarks, skip link, focus styles.
2) Redirect `/home` → `/` and update nav.
3) Metadata on all pages + OG/Twitter.
4) Fix all `Image` props (width/height/sizes/priority + alt).
5) Add Home social proof band and 3 case tiles.
6) Contact form a11y and microcopy; add event tracking.
7) Add sitemap/robots and security headers.
8) Optional: FAQ + pricing comparison + additional schema.

---

## Acceptance Criteria for 5/5 Content
- Each page has an outcome-led H1, clear subhead, and action-oriented CTAs.
- Social proof and results are visible on Home and Portfolio.
- Copy is concise, concrete, and customer-outcome oriented.
- Forms have clear labels, messages, and privacy reassurance.
- Page has complete metadata and schema; links crawlable; internal links present.

