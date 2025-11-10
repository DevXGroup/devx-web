# Google Analytics & Tag Manager Setup

## Overview

This project uses both **Google Tag Manager (GTM)** and **Google Analytics 4 (GA4)** for comprehensive tracking.

### Configuration

Environment variables in `.env.local`:

- `NEXT_PUBLIC_GTM_ID=GTM-TBDBXQWX` - Google Tag Manager ID
- `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-GXG9QQLB7C` - GA4 Measurement ID

## Implementation Details

### 1. Core Setup (Automatic)

Both GTM and GA4 scripts are loaded automatically in `src/app/layout.tsx`:

- GTM for advanced tag management and marketing pixels
- GA4 for direct analytics tracking
- Uses Next.js `<Script>` component with `strategy="afterInteractive"` for optimal performance

### 2. Available Tracking Functions

Located in `src/components/analytics/GoogleTagManager.tsx`:

#### Basic Event Tracking

```typescript
import { trackEvent } from '@/components/analytics/GoogleTagManager'

trackEvent('button_click', {
  button_name: 'signup_cta',
  button_location: 'hero_section',
})
```

#### Page View Tracking

```typescript
import { trackPageView } from '@/components/analytics/GoogleTagManager'

trackPageView('/about', 'About Us Page')
```

#### Form Submission Tracking

```typescript
import { trackFormSubmission } from '@/components/analytics/GoogleTagManager'

trackFormSubmission('contact_form', {
  form_location: 'contact_page',
  form_type: 'inquiry',
})
```

#### Conversion Tracking

```typescript
import { trackConversion } from '@/components/analytics/GoogleTagManager'

trackConversion('AW-XXXXXXX', 'contact_form_conversion', 100)
```

#### Calendly Booking Tracking

```typescript
import { trackCalendlyBooking } from '@/components/analytics/GoogleTagManager'

trackCalendlyBooking()
```

### 3. Using Analytics Hooks

For easier usage, use the custom hooks in `src/hooks/use-analytics.ts`:

#### Automatic Page Tracking

```typescript
'use client'
import { usePageTracking } from '@/hooks/use-analytics'

export default function MyPage() {
  usePageTracking() // Automatically tracks page views on route change

  return <div>My Page</div>
}
```

#### Manual Event Tracking

```typescript
'use client'
import { useAnalytics } from '@/hooks/use-analytics'

export default function MyComponent() {
  const analytics = useAnalytics()

  const handleClick = () => {
    analytics.trackButtonClick('cta_button', {
      section: 'hero',
      variant: 'primary'
    })
  }

  return <button onClick={handleClick}>Click Me</button>
}
```

#### Available Hook Methods

```typescript
const analytics = useAnalytics()

analytics.trackEvent('custom_event', { key: 'value' })
analytics.trackButtonClick('button_name')
analytics.trackLinkClick('/destination', 'Link Text')
analytics.trackScrollDepth(75) // 75% scroll depth
analytics.trackVideoPlay('Intro Video')
analytics.trackDownload('whitepaper.pdf')
analytics.trackFormSubmission('newsletter_signup')
analytics.trackCalendlyBooking()
```

## Best Practices

### 1. Track Important User Actions

- Button clicks (CTA buttons, navigation)
- Form submissions
- Video plays
- File downloads
- Scroll depth
- Link clicks to external sites

### 2. Use Consistent Naming

- Use snake_case for event names: `button_click`, `form_submit`
- Use descriptive names: `pricing_page_cta_click` vs `click1`
- Include context in parameters: `{ button_location: 'hero_section' }`

### 3. Don't Over-Track

- Avoid tracking every single interaction
- Focus on business-critical events
- Consider performance impact

### 4. Test Your Tracking

#### Local Testing

1. Install Google Tag Assistant browser extension
2. Run your dev server: `pnpm run dev`
3. Open browser console and check for:
   - `dataLayer` array
   - `gtag` function
   - Network requests to `google-analytics.com` and `googletagmanager.com`

#### Production Testing

1. Deploy to production
2. Use Google Analytics Realtime view
3. Trigger events and verify they appear in GA4
4. Check GTM Preview mode for tag firing

## Common Patterns

### Track CTA Button Clicks

```typescript
<button onClick={() => analytics.trackButtonClick('get_started', {
  location: 'hero',
  page: 'homepage'
})}>
  Get Started
</button>
```

### Track Form Submissions

```typescript
const handleSubmit = async (data) => {
  // Submit form
  await submitForm(data)

  // Track success
  analytics.trackFormSubmission('contact_form', {
    form_location: 'contact_page',
    has_message: !!data.message,
  })
}
```

### Track External Link Clicks

```typescript
<a
  href="https://external-site.com"
  onClick={() => analytics.trackLinkClick('https://external-site.com', 'Partner Site')}
  target="_blank"
>
  Visit Partner
</a>
```

### Track Calendly Widget Events

```typescript
useEffect(() => {
  const handleCalendlyEvent = (e) => {
    if (e.data.event === 'calendly.event_scheduled') {
      analytics.trackCalendlyBooking()
    }
  }

  window.addEventListener('message', handleCalendlyEvent)
  return () => window.removeEventListener('message', handleCalendlyEvent)
}, [])
```

## Debugging

### Check if Analytics is Loaded

```javascript
// In browser console
console.log(window.dataLayer) // Should show array
console.log(window.gtag) // Should show function
```

### View DataLayer Events

```javascript
// In browser console
window.dataLayer.forEach((event, index) => {
  console.log(`Event ${index}:`, event)
})
```

### Common Issues

1. **Events not showing in GA4**
   - Wait 24-48 hours for data to appear in standard reports
   - Use Realtime view for immediate verification
   - Check that GA4 measurement ID is correct

2. **GTM not loading**
   - Verify GTM ID is correct in `.env.local`
   - Check browser console for errors
   - Ensure no ad blockers are interfering

3. **Duplicate events**
   - Make sure you're not tracking the same event multiple times
   - Check if both GTM and direct GA4 tracking are firing same events

## Privacy & Compliance

- Analytics respects user privacy settings
- No personally identifiable information (PII) is sent
- IP addresses are anonymized by default in GA4
- Compliant with GDPR and CCPA when configured properly

## Support

For questions about analytics setup, contact the development team or refer to:

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/10089681)
- [Google Tag Manager Documentation](https://support.google.com/tagmanager)
