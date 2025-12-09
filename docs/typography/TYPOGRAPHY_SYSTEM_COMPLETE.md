# Typography System - Complete Guide

## Overview

DevX uses a **centralized typography system** where changing fonts in ONE place updates your entire website.

---

## 🎯 The Three Key Files

### 1. **Font Variables** (Change fonts globally)
- **File**: `src/app/globals.css` (lines 39-43)
- **What to change**: Edit `--font-ibm-plex-sans` variable

```css
:root {
  --font-ibm-plex-sans: 'IBM Plex Sans', fallbacks...;  /* Headings, body, subtitles */
  --font-ibm-plex-mono: 'IBM Plex Mono', fallbacks...;  /* Special use cases */
}
```

**To change all fonts**: Replace `'IBM Plex Sans'` with your font name.

### 2. **Typography Classes** (Predefined styles)
- **File**: `src/styles/typography.css`
- **What's defined**: All typography classes in one place

**Available Classes:**
- Headings (Serif): `.heading-hero`, `.heading-section`, `.heading-subsection`, `.heading-component`
- Body (Sans): `.text-body-large`, `.text-body`, `.text-body-small`
- Subtitles (Sans): `.subtitle`, `.subtitle-lg`, `.subtitle-sm`, `.subtitle-xs`

### 3. **Tailwind Config**
- **File**: `tailwind.config.js` (lines 22-25)
- **Purpose**: Maps Tailwind utilities to CSS variables
- **You rarely need to edit this**

---

## 📋 Available Classes

### Headings (Playfair Display - Serif)
```tsx
<h1 className="heading-hero">Hero Title</h1>                    // 4xl → 8xl
<h2 className="heading-section">Section Title</h2>              // 3xl → 5xl
<h3 className="heading-subsection">Subsection Title</h3>        // 2xl → 4xl
<h4 className="heading-component">Component Title</h4>          // xl → 2xl
```

### Body Text (IBM Plex Sans)
```tsx
<p className="text-body-large">Large paragraph</p>              // lg → 2xl
<p className="text-body">Regular paragraph</p>                  // 16px → lg
<p className="text-body-small">Small paragraph</p>              // sm → base
```

### Subtitles (IBM Plex Sans - Pure White)
```tsx
<p className="subtitle">Standard subtitle</p>                   // base → lg
<p className="subtitle-lg">Large subtitle</p>                   // lg → xl
<p className="subtitle-sm">Small subtitle</p>                   // sm → base
<p className="subtitle-xs">Extra small subtitle</p>             // xs → sm
```

All classes are **mobile-first** and automatically scale for tablets and desktops.

---

## 🔧 How to Make Changes

### Change Font Family Globally
1. Open `src/app/globals.css` (line 39)
2. Replace font name:
   ```css
   --font-ibm-plex-sans: 'Your New Font', sans-serif;
   ```
3. Done! All text updates automatically

### Change Subtitle Color Globally
1. Open `src/styles/typography.css` (line 85)
2. Change `.subtitle` class:
   ```css
   .subtitle {
     @apply text-gray-300;  /* Change from text-white */
     font-family: var(--font-ibm-plex-sans);
     font-weight: 300;
     line-height: 1.6;
   }
   ```
3. All subtitle variants update automatically

### Change Heading Size Globally
1. Open `src/styles/typography.css` (line 17)
2. Change `.heading-section` class:
   ```css
   .heading-section {
     @apply text-4xl md:text-5xl lg:text-6xl font-bold;  /* Adjust sizes */
     font-family: var(--font-ibm-plex-sans);
     ...
   }
   ```
3. Done!

---

## ✅ Best Practices

1. **Always use typography classes** - Don't use inline `font-['IBM_Plex_Sans']`
2. **Change fonts in globals.css** - Don't edit individual components
3. **Use semantic classes** - `.heading-section` not `.text-3xl`
4. **Test mobile** - All classes scale automatically

---

## 📱 Mobile Responsive

All typography classes use mobile-first design:

- **Mobile**: Smaller base size (16px minimum)
- **Tablet (md)**: Medium size
- **Desktop (lg)**: Larger size

No manual breakpoints needed!

---

## 🎓 Examples

### Card Component
```tsx
// Good - Uses typography classes
<h3 className="heading-component">{title}</h3>
<p className="subtitle-sm">{description}</p>

// Bad - Inline font styling
<h3 className="text-xl font-bold font-['IBM_Plex_Sans']">{title}</h3>
<p className="text-white/80 font-['IBM_Plex_Sans'] text-base">{description}</p>
```

### Section Header
```tsx
// Good
<h2 className="heading-section">Our Services</h2>
<p className="subtitle-lg">What we offer</p>

// Bad
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-['IBM_Plex_Sans']">Our Services</h2>
<p className="text-white/90 text-lg font-['IBM_Plex_Sans']">What we offer</p>
```

---

## ❓ FAQ

**Q: How do I change fonts for the entire site?**
A: Edit `src/app/globals.css` line 39. Change `--font-ibm-plex-sans` value.

**Q: Can I use different fonts for headings vs body text?**
A: Yes! Headings, body, and subtitles all use `--font-ibm-plex-sans`. To separate them, edit `src/styles/typography.css` and change individual class font families.

**Q: What about IBM Plex Mono?**
A: Currently reserved for special use cases. All headings now use IBM Plex Sans for a sleeker look.

**Q: Do I need to update existing pages?**
A: Only if they use inline font styling like `font-['IBM_Plex_Sans']`. Replace with typography classes.

---

## 📍 Quick Summary

| What You Want | Where to Go | What to Change |
|---------------|-------------|----------------|
| Change font globally | `globals.css` line 39 | `--font-ibm-plex-sans` |
| Change subtitle color | `typography.css` line 85 | `.subtitle { @apply text-... }` |
| Change heading size | `typography.css` line 17 | `.heading-section { @apply text-... }` |
| Add new typography class | `typography.css` | Add new class with `var(--font-ibm-plex-sans)` |

---

For quick copy-paste examples, see [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
