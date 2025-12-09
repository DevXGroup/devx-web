# Typography System - Quick Reference Card

## 🎯 Change Fonts in ONE Place

```css
/* FILE: src/app/globals.css (lines 39-43) */
:root {
  --font-ibm-plex-sans: 'YOUR NEW FONT', fallbacks...;    /* Body, Subtitles & Headings */
  --font-ibm-plex-mono: 'YOUR NEW FONT', fallbacks...;    /* Reserved for special use */
}
/* That's it! Everything updates automatically */
```

## 📝 Use These Classes

### Headings (Playfair Display - Serif)
| Class | Size | Usage |
|-------|------|-------|
| `.heading-hero` | 4xl→8xl | Page hero title |
| `.heading-section` | 3xl→5xl | Main section title |
| `.heading-subsection` | 2xl→4xl | Subsection title |
| `.heading-component` | xl→2xl | Card/component title |

### Subtitles (Sans - Light, Pure White) ⭐
| Class | Size | Usage |
|-------|------|-------|
| `.subtitle` | base→lg | Standard subtitle |
| `.subtitle-lg` | lg→xl | Large/prominent subtitle |
| `.subtitle-sm` | sm→base | Small subtitle |
| `.subtitle-xs` | xs→sm | Extra small (captions) |

### Body (Sans)
| Class | Size | Weight | Usage |
|-------|------|--------|-------|
| `.text-body-large` | lg→2xl | 300 | Prominent paragraph |
| `.text-body` | 16px→lg | 400 | Regular paragraph |
| `.text-body-small` | sm→base | 300 | Small text |

---

## 🃏 CARD TYPOGRAPHY SYSTEM

### Card Components (Consistent across entire site)
| Class | Size | Style | Usage |
|-------|------|-------|-------|
| `.card-title` | xl→2xl | Bold | Card heading |
| `.card-description` | base→xl | **Italic**, light | Main card description (elegant) |
| `.card-description-normal` | base→lg | Normal, regular | Card description (standard) |
| `.card-body` | sm→base | Light | Additional card content |
| `.card-feature` | sm→base | Light | Feature list items |
| `.card-outcome` | sm | Regular | Result/outcome highlights |

### Section Title Variants
| Class | Size | Usage |
|-------|------|-------|
| `.section-title-hero` | 4xl→7xl | Large, dramatic section titles |
| `.section-title` | 3xl→5xl | Standard section titles |
| `.section-title-compact` | 2xl→4xl | Smaller section titles |
| `.section-subtitle` | lg→2xl | Pairs with section titles |
| `.section-subtitle-compact` | base→xl | Compact subtitle variant |

### Button Typography
| Class | Size | Usage |
|-------|------|-------|
| `.btn-text-primary` | base→xl | Large CTA buttons |
| `.btn-text-secondary` | sm→lg | Standard buttons |
| `.btn-text-small` | xs→sm | Compact action buttons |

### UI Element Typography
| Class | Size | Usage |
|-------|------|-------|
| `.ui-label` | sm→base | Form labels, UI labels |
| `.ui-badge` | xs→sm | Status badges, tags (UPPERCASE) |
| `.ui-caption` | xs→sm | Image captions, footnotes |
| `.ui-code` | xs→sm | Technical/code text (Mono font) |

### BlurText Compatible
| Class | Size | Usage |
|-------|------|-------|
| `.blur-hero` | 4xl→8xl | For BlurText hero titles |
| `.blur-section` | 3xl→5xl | For BlurText section titles |
| `.blur-subtitle` | lg→2xl | For BlurText subtitles |

---

## 🎨 EXTENDED TYPOGRAPHY SYSTEM

### Gradient Text Utilities (Pastel Theme)
| Class | Colors | Usage |
|-------|--------|-------|
| `.gradient-gold` | Soft Gold→Yellow→Gold | Primary brand gradient |
| `.gradient-green` | Soft Mint→Pale Green→Mint | Success/growth gradient |
| `.gradient-purple` | Soft Lavender→Lilac→Lavender | Premium/luxury gradient |
| `.gradient-blue` | Soft Sky→Pale Blue→Sky | Trust/technology gradient |
| `.gradient-cyan` | Soft Aqua→Pale Cyan→Aqua | Modern/fresh gradient |

### Extended Card Variants
| Class | Size | Style | Usage |
|-------|------|-------|-------|
| `.card-description-compact` | sm→base | Italic, compact | Smaller elegant descriptions |
| `.card-subtitle` | lg→xl | Semibold | Secondary card headings |
| `.card-eyebrow` | xs→sm | UPPERCASE | Small label above title |
| `.card-price` | 4xl→6xl | Bold | Pricing card prices |
| `.card-price-unit` | lg→xl | Regular | "/month", "/year" text |

### Testimonial Typography
| Class | Size | Style | Usage |
|-------|------|-------|-------|
| `.testimonial-quote` | lg→2xl | Italic, light | Testimonial text |
| `.testimonial-author` | base→lg | Semibold | Author name |
| `.testimonial-role` | sm→base | Regular | Author position/role |

### Form Typography
| Class | Size | Usage |
|-------|------|-------|
| `.form-label` | sm→base | Input labels |
| `.form-input` | base→lg | Input field text |
| `.form-placeholder` | base→lg | Placeholder text |
| `.form-helper` | xs→sm | Helper/hint text |
| `.form-error` | xs→sm | Error messages (red) |

### Stats & Numbers
| Class | Size | Usage |
|-------|------|-------|
| `.stat-number` | 5xl→7xl | Large display numbers |
| `.stat-label` | sm→lg | Stat description |
| `.stat-change` | xs→sm | Percentage/delta (semibold) |

### Footer Typography
| Class | Size | Usage |
|-------|------|-------|
| `.footer-heading` | base→lg | Footer section headings |
| `.footer-link` | sm→base | Footer navigation links |
| `.footer-copyright` | xs→sm | Copyright text |

### Link Typography
| Class | Size | Color | Usage |
|-------|------|-------|-------|
| `.link-primary` | base→lg | Pastel Green (#86EFAC) | Standard links |
| `.link-secondary` | sm→base | White/70 | Subtle links |
| `.link-underline` | - | - | Animated underline on hover |

### Spacing Utilities
| Class | Padding/Margin | Usage |
|-------|----------------|-------|
| `.section-padding` | py-12→20 | Standard section spacing |
| `.section-padding-large` | py-16→32 | Large section spacing |
| `.section-padding-small` | py-8→16 | Compact section spacing |
| `.title-margin` | mb-8→16 | Standard title margin |
| `.title-margin-small` | mb-4→8 | Small title margin |
| `.content-spacing` | space-y-4→6 | Standard content gaps |
| `.content-spacing-large` | space-y-6→10 | Large content gaps |

## 💻 Copy-Paste Examples

### Card Component (Elegant with Italic)
```tsx
<div className="card">
  <h3 className="card-title text-[#86EFAC]">Agentic AI Development</h3>
  <p className="card-description">
    Build autonomous AI agents that execute complex workflows end-to-end.
  </p>
  <ul>
    <li className="card-feature">Multi-agent orchestration</li>
    <li className="card-feature">Browser automation tools</li>
  </ul>
</div>
```

### Card Component (Standard)
```tsx
<div className="card">
  <h3 className="card-title">Custom Software Development</h3>
  <p className="card-description-normal">
    We build custom software that fits your exact needs.
  </p>
  <div className="outcome-box">
    <p className="ui-label text-[#86EFAC]">What you get:</p>
    <p className="card-outcome">Custom software that scales with your business</p>
  </div>
  <ul>
    <li className="card-feature">Full-stack Web Applications</li>
    <li className="card-feature">Enterprise System Integration</li>
  </ul>
</div>
```

### Section with Title & Subtitle
```tsx
<section>
  <h2 className="section-title text-[#67E8F9]">Our Services</h2>
  <p className="section-subtitle">
    Launch revenue-driving products your customers rely on.
  </p>
</section>
```

### Large Hero Section
```tsx
<section>
  <h1 className="section-title-hero">
    <span className="bg-gradient-to-r from-[#FDE047] to-[#FEF08A] bg-clip-text text-transparent">
      Agentic AI & RAG Solutions
    </span>
  </h1>
  <p className="section-subtitle">
    Transform your business with intelligent AI agents.
  </p>
</section>
```

### Button with Typography
```tsx
<button className="btn-text-primary bg-gradient-to-r from-[#86EFAC] to-[#BBF7D0]">
  Schedule a Strategy Call
</button>

<button className="btn-text-secondary">
  Learn More
</button>
```

### With BlurText Animation
```tsx
<BlurText
  text="Why Choose Us?"
  className="blur-section text-[#67E8F9]"
  delay={150}
  once={true}
/>
<p className="section-subtitle">
  Trusted by founders and enterprise teams worldwide.
</p>
```

## 🔄 Migration (Old → New)

```tsx
/* BEFORE: Scattered classes */
<p className="text-white/80 font-sans text-lg">Text</p>

/* AFTER: Clean and centralized */
<p className="subtitle">Text</p>
```

That's it! One class replaces multiple utilities.

## 📱 Mobile Responsive

All classes automatically scale:
- **Mobile first**: Smaller size on mobile
- **Auto-scale**: Larger on tablets (md:) and desktop (lg:)
- **No manual breakpoints needed**

## ⚠️ What NOT to Use Anymore

❌ `text-white/80` (use `.card-description-normal` or `.card-body` instead)
❌ `text-white/70` (use `.card-feature` or `.ui-caption` instead)
❌ `text-white/90` (use `.card-description` or `.section-subtitle` instead)
❌ `font-['IBM_Plex_Sans']` (use typography classes instead)
❌ Inline font specifications (always use centralized classes)
❌ Manual font-weight and line-height (included in classes)

## ✅ What to Use

✅ **Cards**: Use `.card-title`, `.card-description`, `.card-feature` classes
✅ **Sections**: Use `.section-title`, `.section-subtitle` variants
✅ **Buttons**: Use `.btn-text-primary`, `.btn-text-secondary` classes
✅ **UI Elements**: Use `.ui-label`, `.ui-badge`, `.ui-caption` classes
✅ **BlurText**: Use `.blur-hero`, `.blur-section`, `.blur-subtitle` classes
✅ Edit `globals.css` to change fonts globally

## 📍 Key Files

| File | Purpose | Change |
|------|---------|--------|
| `src/app/globals.css` | Font variables | 1-line edit |
| `src/styles/typography.css` | All classes | Edit class definition |
| `tailwind.config.js` | Font mapping | Usually don't need to |

## 🎓 Example: Change All Subtitles to Gray

1. Open `src/styles/typography.css` (line 85)
2. Find: `.subtitle { @apply text-white; ... }`
3. Change: `@apply text-white;` → `@apply text-gray-400;`
4. Done! All subtitle classes now gray

## 🎓 Example: Make Headings Larger

1. Open `src/styles/typography.css` (line 5)
2. Find: `.heading-hero { @apply text-4xl sm:text-5xl md:text-6xl lg:text-8xl; ... }`
3. Change: `text-8xl` → `text-9xl` (or any size)
4. Done! All hero headings are larger

## 🚀 Tips

- **Responsive sizing is automatic** - don't add md:, lg: modifiers
- **Pick the class that matches semantically** - don't just use size
- **Check mobile** - all sizes scale appropriately
- **Keep it simple** - if it doesn't fit a class, create a new one

---

**System Ready**: ✅ Use `.subtitle`, `.heading-*`, `.text-body*`
**Change Fonts**: Edit `src/app/globals.css` lines 39-43
**Questions**: See `TYPOGRAPHY_SYSTEM_COMPLETE.md`
