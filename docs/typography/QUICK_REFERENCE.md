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

### Headings (Sans - Bold/Semibold)
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

## 💻 Copy-Paste Examples

### Pricing Card
```tsx
<h3 className="heading-component">Plan Name</h3>
<p className="subtitle">Plan description</p>
<p className="heading-component">$99/mo</p>
<ul>
  <li className="subtitle-sm">Feature 1</li>
  <li className="subtitle-sm">Feature 2</li>
</ul>
```

### Service Card
```tsx
<h3 className="heading-component">Service Name</h3>
<p className="subtitle">Service description</p>
```

### About Section
```tsx
<h2 className="heading-section">Section Title</h2>
<p className="subtitle-lg">Main description</p>
<p className="text-body">Detailed paragraph</p>
```

### Error Message
```tsx
<h2 className="heading-subsection">Error</h2>
<p className="subtitle">Something went wrong</p>
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

❌ `text-white/80` (use `.subtitle` instead)
❌ `text-white/70` (use `.subtitle-sm` instead)
❌ `text-white/90` (use `.subtitle-lg` instead)
❌ Inline font specifications (use classes instead)

## ✅ What to Use

✅ `.subtitle` variants for all descriptions
✅ `.heading-*` classes for all headings
✅ `.text-body*` classes for body text
✅ Edit `globals.css` to change fonts

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
