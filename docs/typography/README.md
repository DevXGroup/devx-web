# Typography System Documentation

This folder contains the centralized typography system documentation for DevX Group website.

## Quick Start

**To change fonts globally**: Edit `src/app/globals.css` (lines 39-43)

**To use typography classes**: See [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)

## Documentation Files

### 1. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) ⭐
- Quick copy-paste examples
- All available typography classes
- Common usage patterns
- **Read this first** for immediate use

### 2. [TYPOGRAPHY_SYSTEM_COMPLETE.md](./TYPOGRAPHY_SYSTEM_COMPLETE.md)
- Complete system overview
- How to change fonts globally
- Best practices and examples
- FAQ section
- **Read this** for comprehensive understanding

## Key Concepts

### Font Hierarchy
- **IBM Plex Sans**: Headings, body text, and subtitles (bold/semibold/light/regular)
- **IBM Plex Mono**: Reserved for special use cases (code, technical elements)

### Typography Classes

**Headings** (IBM Plex Sans):
- `.heading-hero` → Hero titles (4xl-8xl)
- `.heading-section` → Section titles (3xl-5xl)
- `.heading-subsection` → Subsection titles (2xl-4xl)
- `.heading-component` → Component titles (xl-2xl)

**Body Text** (IBM Plex Sans):
- `.text-body-large` → Large paragraphs (lg-2xl)
- `.text-body` → Regular paragraphs (16px-lg)
- `.text-body-small` → Small text (sm-base)

**Subtitles** (IBM Plex Sans, Pure White):
- `.subtitle` → Standard subtitle (base-lg)
- `.subtitle-lg` → Large subtitle (lg-xl)
- `.subtitle-sm` → Small subtitle (sm-base)
- `.subtitle-xs` → Extra small subtitle (xs-sm)

## System Files

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Font CSS variables (CHANGE HERE for global updates) |
| `src/styles/typography.css` | All typography class definitions |
| `tailwind.config.js` | Tailwind font configuration |

## Mobile Responsive

All typography classes are **mobile-first** and scale automatically:
- Mobile: Base size (16px minimum for readability)
- Tablet (md): Medium size
- Desktop (lg): Large size

## Usage Examples

### Before (Old Approach)
```tsx
<p className="text-white/80 font-sans text-lg">Description</p>
```

### After (New System)
```tsx
<p className="subtitle">Description</p>
```

## When to Reference This Folder

Claude should reference this folder when:
- Working with fonts or typography
- Creating new sections/components
- Migrating existing components
- Questions about text styling
- Implementing new pages

## Last Updated
2025-11-19
