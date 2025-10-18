# DevX Group Website - Production Setup Guide

## 🚀 Production Readiness Checklist

This document outlines the steps to complete the production setup for the DevX Group website with comprehensive SEO optimization and analytics tracking.

## ✅ Completed Implementations

### 1. SEO Metadata Enhancement

- ✅ Comprehensive Open Graph and Twitter Card metadata on all pages
- ✅ Page-specific metadata for all routes including creative-animation, dev-features, etc.
- ✅ JSON-LD structured data for Organization, LocalBusiness, and WebSite schemas
- ✅ Canonical URLs to prevent duplicate content issues
- ✅ Updated sitemap.xml with current dates and all pages

### 2. Analytics & Tracking Infrastructure

- ✅ Google Tag Manager integration with proper Next.js setup
- ✅ Google Analytics 4 configuration through GTM
- ✅ Conversion tracking utilities for forms and Calendly bookings
- ✅ Event tracking functions for user interactions

### 3. PWA & Technical Enhancements

- ✅ Web app manifest for PWA capabilities
- ✅ Favicon and app icon configuration for all devices
- ✅ Security headers via next.config.mjs
- ✅ Content Security Policy with proper allowlists

## 🔧 Required Manual Steps

### 1. Create Favicon and App Icons

You need to create the following icon files and place them in the `/public` directory:

**Required Icon Files:**

```
/public/favicon.ico (32x32)
/public/favicon-16x16.png
/public/favicon-32x32.png
/public/apple-touch-icon.png (180x180)
/public/icon-192x192.png
/public/icon-256x256.png
/public/icon-384x384.png
/public/icon-512x512.png
/public/safari-pinned-tab.svg
/public/mstile-70x70.png
/public/mstile-150x150.png
/public/mstile-310x150.png
/public/mstile-310x310.png
```

**Icon Design Guidelines:**

- Use DevX Group brand colors (Primary: #4CD787, Accent: #CFB53B)
- Ensure clean, scalable design that works at small sizes
- Include "DX" monogram or full logo depending on size

### 2. Set Up Google Analytics & Tag Manager

**Step 1: Create Google Tag Manager Container**

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create a new container for `devxgroup.io`
3. Copy the GTM ID (format: GTM-XXXXXXX)

**Step 2: Create Google Analytics 4 Property**

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property for DevX Group
3. Copy the Measurement ID (format: G-XXXXXXXXXX)

**Step 3: Configure Environment Variables**
Create a `.env.local` file with:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://devxgroup.io
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

**Step 4: Configure Google Ads Conversion Tracking (Optional)**
If using Google Ads:

```env
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
NEXT_PUBLIC_CONTACT_FORM_CONVERSION_LABEL=contact_form_conversion
NEXT_PUBLIC_CALENDLY_CONVERSION_LABEL=calendly_booking_conversion
```

### 3. Set Up Social Media Images

Create and upload the following Open Graph images to `/public`:

**Required OG Images:**

```
/public/og-image.jpg (1200x630) - Default/Homepage
/public/og-image-home.jpg (1200x630) - Home page specific
/public/og-image-about.jpg (1200x630) - About page
/public/og-image-services.jpg (1200x630) - Services page
/public/og-image-portfolio.jpg (1200x630) - Portfolio page
/public/og-image-pricing.jpg (1200x630) - Pricing page
/public/og-image-contact.jpg (1200x630) - Contact page
/public/og-image-creative-animation.jpg (1200x630) - Animation services
/public/og-image-privacy.jpg (1200x630) - Privacy policy
/public/og-image-terms.jpg (1200x630) - Terms of service
```

**Twitter Card Images:**

```
/public/twitter-image.jpg (1200x630) - Default
/public/twitter-image-home.jpg (1200x630)
/public/twitter-image-about.jpg (1200x630)
/public/twitter-image-services.jpg (1200x630)
/public/twitter-image-portfolio.jpg (1200x630)
/public/twitter-image-pricing.jpg (1200x630)
/public/twitter-image-contact.jpg (1200x630)
/public/twitter-image-creative-animation.jpg (1200x630)
/public/twitter-image-privacy.jpg (1200x630)
/public/twitter-image-terms.jpg (1200x630)
```

### 4. Configure GTM Tags

In your Google Tag Manager container, create these tags:

**GA4 Configuration Tag:**

- Tag Type: Google Analytics: GA4 Configuration
- Measurement ID: {{ GA_MEASUREMENT_ID }}
- Trigger: All Pages

**GA4 Event Tags:**

- Form Submissions
- Calendly Bookings — trigger on `calendly.event_scheduled` messages from the inline iframe
- Contact Button Clicks
- Service Inquiries

### 5. Verify Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property for `devxgroup.io`
3. Upload sitemap: `https://devxgroup.io/sitemap.xml`
4. Request indexing for key pages

## 🧪 Testing & Validation

### 1. SEO Testing

- **Rich Results Test**: [Google Rich Results Test](https://search.google.com/test/rich-results)
- **Mobile-Friendly Test**: [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- **PageSpeed Insights**: [Google PageSpeed Insights](https://pagespeed.web.dev/)

### 2. Social Media Validation

- **Facebook Debugger**: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter Card Validator**: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn Post Inspector**: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 3. Analytics Testing

1. Install Google Tag Assistant browser extension
2. Visit all pages and verify GTM/GA4 firing
3. Test form submissions and event tracking
4. Check Real-Time reports in Google Analytics

### 4. Security Testing

- **Security Headers**: [Security Headers](https://securityheaders.com/)
- **SSL Test**: [SSL Labs Test](https://www.ssllabs.com/ssltest/)

## 📊 Analytics Events Configured

The following events are automatically tracked:

### Standard Events

- `page_view` - Automatic page views
- `scroll` - 90% scroll depth
- `file_download` - File downloads
- `external_link` - External link clicks

### Custom Events

- `form_submit` - Contact form submissions
- `calendly_booking` - Calendly consultation bookings emitted from the inline iframe
- `service_inquiry` - Service-specific inquiries
- `portfolio_view` - Portfolio project views

## 🚀 Deployment Notes

### Environment Variables

Ensure all required environment variables are set in your deployment platform:

**Vercel/Netlify:**

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://devxgroup.io
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### DNS Configuration

Ensure these records are configured:

- `A` record pointing to your hosting provider
- `CNAME` for www subdomain
- `TXT` record for Google Search Console verification

### SSL Certificate

- Ensure SSL certificate is properly configured
- Enable HSTS (already configured in headers)
- Consider implementing HTTP/2

## 📱 PWA Features

The website is now PWA-ready with:

- ✅ Web App Manifest
- ✅ Service Worker ready (implement as needed)
- ✅ Offline capabilities (implement as needed)
- ✅ App install prompts
- ✅ Native app-like experience

## 🔍 SEO Monitoring

Set up monitoring for:

- Google Search Console for search performance
- Google Analytics for traffic and conversions
- Core Web Vitals monitoring
- Regular SEO audits with tools like Screaming Frog

## 📞 Support

For technical issues with this setup:

- Email: support@devxgroup.io
- Phone: +1 (442) 544-0591

---

**Last Updated**: September 27, 2025
**Version**: 1.0.0

---

<h1 style="color: red;">TODO</h1>

> **TODO:** The following section was pasted and needs to be converted to match the markdown style of the rest of this document.

### Google Tag Manager & Analytics Infrastructure

- **Complete GTM integration** in `layout.tsx`
- **Analytics utility functions** (`trackEvent`, `trackConversion`, etc.)
- **Environment variable setup** (`.env.example`)
- **Conversion tracking** for forms and Calendly bookings

### What You Need To Do

1. **Create Google Tag Manager Account**

   1. Go to [Google Tag Manager](https://tagmanager.google.com)
   2. Create container for `devxgroup.io`
   3. Copy your GTM ID (format: `GTM-XXXXXXX`)

2. **Create Google Analytics 4 Property**

   1. Go to [Google Analytics](https://analytics.google.com)
   2. Create new GA4 property for DevX Group
   3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

3. **Configure GTM Tags**

   - In your GTM container, create:
     - GA4 Configuration Tag with your Measurement ID
     - GA4 Event Tags for form submissions, Calendly bookings, etc.

4. **Set Environment Variables**

   - Create `.env.local` file:
     ```env
     NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
     NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     NEXT_PUBLIC_SITE_URL=https://devxgroup.io
     NEXT_PUBLIC_ENABLE_ANALYTICS=true
     ```

5. **Optional: Google Ads Conversion Tracking**
   - If you plan to run Google Ads:
     ```env
     NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXX
     NEXT_PUBLIC_CONTACT_FORM_CONVERSION_LABEL=contact_form_conversion
     NEXT_PUBLIC_CALENDLY_CONVERSION_LABEL=calendly_booking_conversion
     ```

### Analytics Events Ready to Track

Once you add your IDs, the website will automatically track:

- Page views
- Form submissions
- Calendly bookings
- User interactions
- Conversion events

The infrastructure is ready to go — you just need to plug in your actual Google account IDs.
If you want help with the GTM tag configuration once you have the accounts set up, let me know!

## next step

<!-- can you build me a dashboard so i can login and see all the campains and records, including news letter sign up which i want to add

i also want to add  blog page where i can post articles that automatically pushed to my devx group linked in account and my website. i need a simple data base for dashboard authentication and more  -->
