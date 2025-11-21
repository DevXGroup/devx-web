# Perf + Stability Follow-up Plan

Notes from a quick code-level scan aimed at memory/CPU hotspots and jank contributors. Treat this as a future task list (not exhaustive).

## Immediate fixes (prevent leaks/jank)
- `src/lib/performance.tsx`: `PerformanceObserver` + `window.load` listener are never cleaned up; add `disconnect()` + remove listeners, and gate the FPS `requestAnimationFrame` loop behind `visibilitychange` so it stops in background tabs.
- `HorizontalScroll` (`src/components/HorizontalScroll.tsx`): the autoplay `requestAnimationFrame` runs forever; pause/stop when the section is offscreen (`IntersectionObserver` or `framer-motion` `useInView`), and respect `prefers-reduced-motion`. Also ensure `dragConstraints` are recomputed when the viewport changes to avoid stuck renders.
- Global animations (Threads, parallax sections, `EnhancedInfinityLoader`, background blobs): add `prefers-reduced-motion` fallbacks and visibility-based throttling to avoid burning cycles when hidden or minimized.
- Image loading: many cards use `priority` and high `quality=90`; drop priority to the first fold-only image set and reduce quality to ~70–75 where safe to cut decoding/IO cost.
- Body scroll locks (navbar/mobile menu) rely on inline styles; ensure they are cleared on unmount and add a guard to avoid style thrash on rapid route changes.

## Measurement + profiling to guide changes
- Add a lightweight `performance.mark/measure` wrapper around top “hero + marquee + testimonials + footer” route segments to see render times during navigation.
- Use Chrome DevTools Performance and Memory panels on `/home` and `/services` to capture: 30s timeline with user interactions, a Heap Snapshot after navigating back/forth, and the Lighthouse trace for CPU idle time; save traces in `docs/profiles/`.
- Run `pnpm analyze` and `pnpm size` to check bundle bloat from animation libs and large images; note modules >150KB.

## Refactors to schedule
- Centralize R3F/3D/animation toggles: a single “motion bus” (React context) that pauses rAFs and heavy shaders when tab is hidden, the component is offscreen, or reduced-motion is requested.
- Swap perpetual `requestAnimationFrame` loops to event-driven or spring-based animations that auto-stop when velocity ~0 (Framer Motion supports `stop()` on controls).
- Lazy mount non-critical sections (case study carousel, testimonials 3D loader, footer threads) via `IntersectionObserver` and suspense boundaries to reduce initial main-thread pressure.
- Audit third-party embeds/links (Calendly, social icons with hover SVG filters) for layout thrash; prefer static assets/sprites and reduce filter usage in scrollable areas.
- Introduce image/CDN policies: enforce WebP/AVIF, define size caps per slot, and pre-generate responsive `srcset` to avoid runtime resizing.

## Validation checklist (per change)
- DevTools Performance: no long tasks >50ms during idle hover/scroll.
- Memory: no net heap growth after 3x navigate home → services → home (watch detached DOM nodes).
- Accessibility: `prefers-reduced-motion` honored; scroll/wheel handlers are passive or prevented only when necessary.
- Bundle: `pnpm analyze` shows reductions; LCP images lazy and sized.
