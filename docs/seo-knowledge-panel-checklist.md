# SEO & Google Knowledge Panel Checklist

> **Last Updated**: 2025-12-01
> **Status**: In Progress
> **Goal**: Achieve Google Knowledge Panel and Rich Search Results like major tech companies

---

## Progress Overview
- [ ] Phase 1: Foundation & Verification (Week 1)
- [ ] Phase 2: Entity Recognition & Authority (Weeks 2-4)
- [ ] Phase 3: Monitoring & Optimization (Ongoing)

---

## Phase 1: Foundation & Verification

### 1.1 Test Current Structured Data
- [ ] Visit [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test URL: `https://devxgroup.io`
- [ ] Verify Organization schema detected
- [ ] Verify LocalBusiness schema detected
- [ ] Verify Website schema detected
- [ ] Fix any errors reported by the tool
- [ ] Screenshot results and save in `/docs/seo/screenshots/` (create folder)

**Notes**: Our structured data is already implemented in `src/components/seo/StructuredData.tsx`

---

### 1.2 Verify Sitemap
- [x] Confirm sitemap exists at `/sitemap.xml`
- [x] Test sitemap loads: `https://devxgroup.io/sitemap.xml`
- [x] Verify all important pages included
- [x] Check sitemap format is valid (XML schema)
- [x] Enhanced with priority levels and change frequencies
- [x] Added service sub-pages

**Status**: ✅ Completed - Enhanced with better prioritization

---

### 1.3 Fix Logo & OG Images
- [x] Identified issue: Logo uses white background
- [x] Replaced with transparent background logo (`devx-logo.png`)
- [x] Updated OG image generation in `src/app/opengraph-image.tsx`
- [x] Updated Twitter card image in `src/app/twitter-image.tsx`
- [x] Enhanced logo container with radial gradient (no solid background)
- [x] Added drop shadow for better logo visibility
- [ ] Test OG images on social media platforms (manual testing needed)
- [x] Verified images meet requirements:
  - OG Image: 1200x630px ✓
  - Twitter Card: 1200x630px ✓
  - Logo: 500x99px, RGBA (transparent) ✓

**Files Updated**: `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`
**Status**: ✅ Completed - Ready for testing

---

## Phase 2: Entity Recognition & Authority

### 2.1 Google Business Profile (CRITICAL)
- [ ] Create/Claim profile at [Google Business](https://business.google.com)
- [ ] Add exact company info:
  - **Name**: DevX Group LLC
  - **Category**: Software Company / Computer Software Company
  - **Phone**: +1-442-544-0591
  - **Email**: support@devxgroup.io
  - **Address**: San Diego, CA, US (add full address if available)
  - **Hours**: Monday-Friday, 9:00 AM - 5:00 PM PST
- [ ] Upload logo (transparent PNG, min 250x250px)
- [ ] Upload cover photo (1024x576px recommended)
- [ ] Write business description (match website description)
- [ ] Add services offered
- [ ] Add website link: `https://devxgroup.io`
- [ ] Verify ownership via HTML meta tag or DNS
- [ ] Enable messaging if desired
- [ ] Add photos of team/office (if available)

**Priority**: HIGH - This is the #1 factor for Knowledge Panel

---

### 2.2 Google Search Console
- [ ] Add property at [Search Console](https://search.google.com/search-console)
- [ ] Verify ownership (DNS or HTML file)
- [ ] Submit sitemap: `https://devxgroup.io/sitemap.xml`
- [ ] Monitor "Rich Results" report
- [ ] Check "Coverage" report for indexing issues
- [ ] Check for manual actions
- [ ] Set up email alerts for critical issues

**Verification Methods**:
- DNS TXT record (recommended)
- HTML meta tag
- Google Analytics

---

### 2.3 Wikidata Entity (Free Knowledge Graph Entry)
- [ ] Create account at [Wikidata.org](https://www.wikidata.org)
- [ ] Click "Create a new item"
- [ ] Add basic info:
  - **Label**: DevX Group LLC
  - **Description**: Software development and AI solutions company
  - **Aliases**: DevX Group, DevX
- [ ] Add statements (properties):
  - **Instance of (P31)**: business (Q4830453)
  - **Industry (P452)**: software industry (Q1148893)
  - **Headquarters (P159)**: San Diego (Q16552)
  - **Country (P17)**: United States (Q30)
  - **Inception (P571)**: 2023
  - **Official website (P856)**: https://devxgroup.io
  - **Email (P968)**: support@devxgroup.io
  - **Phone (P1329)**: +1-442-544-0591
  - **Founder (P112)**: Max Sheikhizadeh (create person item if needed)
- [ ] Add social media links:
  - LinkedIn, GitHub, Twitter/X
- [ ] Link to relevant topics: AI, software development, cloud computing
- [ ] Save and publish

**Why**: Google uses Wikidata for entity recognition and Knowledge Graph

---

### 2.4 Social Media Consistency (NAP)
**NAP = Name, Address, Phone (must be IDENTICAL everywhere)**

#### LinkedIn
- [ ] Update company page: https://linkedin.com/company/devx-group
- [ ] Company name: **DevX Group LLC**
- [ ] Location: **San Diego, California, United States**
- [ ] Phone: **+1-442-544-0591**
- [ ] Website: **https://devxgroup.io**
- [ ] Industry: **Software Development**
- [ ] Company size: (current number)
- [ ] Founded: **2023**
- [ ] Specialties: Custom Applications, AI Solutions, Cloud Modernization

#### Twitter/X
- [ ] Update bio to include location: "San Diego, CA"
- [ ] Add website link
- [ ] Pin important tweet about services

#### GitHub Organization
- [ ] Update profile: https://github.com/DevXGroup (if exists)
- [ ] Add location: San Diego, CA
- [ ] Add website link
- [ ] Add company description

#### Facebook (if applicable)
- [ ] Create/update business page
- [ ] Add same NAP info
- [ ] Category: Software Company

**Critical**: All platforms must have IDENTICAL information

---

### 2.5 Business Directories & Citations

#### Tech-Specific Directories (Priority)
- [ ] [Clutch.co](https://clutch.co) - Tech company reviews (FREE listing, paid for reviews)
- [ ] [GoodFirms.co](https://goodfirms.co) - Software company directory
- [ ] [G2.com](https://g2.com) - Software reviews platform
- [ ] [Capterra](https://capterra.com) - Software listings
- [ ] [The Manifest](https://themanifest.com) - B2B directory

#### General Business Directories
- [ ] Yelp for Business
- [ ] Yellow Pages
- [ ] Manta
- [ ] BBB (Better Business Bureau)
- [ ] Bing Places

**Template Info to Use**:
```
Business Name: DevX Group LLC
Address: [Your full address], San Diego, CA [ZIP]
Phone: +1-442-544-0591
Email: support@devxgroup.io
Website: https://devxgroup.io
Description: DevX Group delivers elite software development services including custom applications, AI/ML solutions, IoT hardware integration, and digital transformation.
Categories: Software Development, AI Solutions, Web Development, Mobile Apps
```

---

### 2.6 Press & Media Mentions

#### Press Releases
- [ ] Write press release about company launch/milestone
- [ ] Publish on [PRWeb](https://prweb.com) ($99-300)
- [ ] Submit to [PR Newswire](https://prnewswire.com)
- [ ] Share on social media

#### Local Media
- [ ] Reach out to San Diego tech news sites
- [ ] Contact San Diego Business Journal
- [ ] Join San Diego tech meetups/groups

#### Tech Media
- [ ] Submit projects to [Product Hunt](https://producthunt.com)
- [ ] Write guest posts for tech blogs
- [ ] Get featured in case studies

#### Client Testimonials & Backlinks
- [ ] Request backlinks from satisfied clients
- [ ] Case studies on your site
- [ ] Guest posts on industry blogs

**Goal**: Build "entity signals" Google recognizes

---

## Phase 3: Monitoring & Optimization

### 3.1 Regular Monitoring
- [ ] Check Google Search Console weekly
- [ ] Search "DevX Group LLC" monthly to track Knowledge Panel
- [ ] Monitor Rich Results report
- [ ] Track organic traffic in Google Analytics
- [ ] Check backlink profile monthly (Ahrefs/SEMrush)

### 3.2 Claim & Verify Knowledge Panel
- [ ] Once Knowledge Panel appears, search "DevX Group LLC"
- [ ] Click "Claim this knowledge panel"
- [ ] Verify ownership
- [ ] Suggest edits if information is incorrect
- [ ] Keep information updated

### 3.3 Ongoing Optimization
- [ ] Add new services to structured data as they launch
- [ ] Update Wikidata with new information
- [ ] Keep NAP consistent across all platforms
- [ ] Respond to reviews on Google Business
- [ ] Post updates on Google Business Profile

---

## Phase 4: Advanced Enhancements (Optional)

### 4.1 Additional Schema Types
- [ ] Add Service schema to service pages
- [ ] Add Review/Rating schema for testimonials
- [ ] Add Article schema for blog posts (when launched)
- [ ] Add JobPosting schema for careers page
- [ ] Add Event schema for webinars/events

### 4.2 Video & Image SEO
- [ ] Create company intro video for YouTube
- [ ] Optimize video with schema markup
- [ ] Add VideoObject schema
- [x] Optimize images with alt text (descriptive `bannerAlt`, `previewAlt`, `screenshotAlts` added to all portfolio projects)
- [ ] Create Google My Maps for service areas

### 4.3 Local SEO (San Diego)
- [ ] Create local landing pages
- [ ] Join San Diego Chamber of Commerce
- [ ] Get listed in San Diego tech directories
- [ ] Sponsor local tech events

---

## Expected Timeline

| Timeframe | Expected Results |
|-----------|------------------|
| Week 1-2 | Foundation complete, profiles created |
| Week 2-4 | Google indexes new data, rich snippets may appear |
| Month 2-3 | Knowledge panel may appear (with enough signals) |
| Month 3-6 | Rich results stabilize, rankings improve |
| Month 6+ | Established entity, consistent Knowledge Panel |

---

## Common Issues & Troubleshooting

### No Knowledge Panel Yet?
- ✅ Ensure Google Business Profile is verified
- ✅ Check NAP consistency across all platforms
- ✅ Build more citations and backlinks
- ✅ Get press mentions
- ✅ Update Wikidata regularly

### Wrong Information in Knowledge Panel?
- ✅ Claim the panel
- ✅ Suggest edits via "Feedback" button
- ✅ Update Google Business Profile
- ✅ Ensure website structured data is correct

### Structured Data Errors?
- ✅ Use Rich Results Test tool
- ✅ Validate JSON-LD syntax
- ✅ Check for missing required fields
- ✅ Test on multiple URLs

### Duplicate Listings?
- ✅ Merge duplicates in Google Business Profile
- ✅ Mark incorrect listings as closed
- ✅ Update citations with correct info

---

## Resources & Tools

### Testing Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org)
- [Structured Data Linter](https://linter.structured-data.org)

### Monitoring Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com)
- [Google Business Profile](https://business.google.com)

### SEO Tools
- [Ahrefs](https://ahrefs.com) - Backlink analysis
- [SEMrush](https://semrush.com) - SEO suite
- [Moz](https://moz.com) - Local SEO

### Schema Generators
- [Schema Markup Generator](https://technicalseo.com/tools/schema-markup-generator/)
- [JSON-LD Generator](https://jsonld.com)

---

## Files to Reference

- **Structured Data**: `src/components/seo/StructuredData.tsx`
- **OG Images**: `src/lib/og.ts`
- **Layout Metadata**: `src/app/layout.tsx`
- **Sitemap**: Check `public/sitemap.xml` or Next.js auto-generated

---

## Notes & Updates

### 2025-12-01 - Initial Setup Complete ✅
- [x] Created comprehensive SEO & Knowledge Panel checklist
- [x] Verified and enhanced sitemap configuration
  - Added priority levels (1.0 for home, 0.9 for main pages, 0.3 for legal)
  - Added change frequencies (daily, weekly, monthly, yearly)
  - Added `/services/creative-animation` sub-page
- [x] Fixed OG image logo transparency issue
  - Switched from `devx-logo-og.png` to `devx-logo.png` (better transparency)
  - Enhanced logo container with radial gradients (no solid background)
  - Added drop shadows for better visual depth
  - Updated both OpenGraph and Twitter Card images
- [x] Enhanced structured data (Organization schema)
  - Added `@id` for entity reference
  - Added `legalName` and multiple `alternateName` values
  - Enhanced logo with ImageObject type
  - Added `slogan` field
  - Expanded `contactPoint` with multiple types (customer service, sales)
  - Added service offerings via `makesOffer` property
  - Expanded `knowsAbout` with more relevant topics
  - Enhanced social media links

**Files Modified**:
- `docs/seo-knowledge-panel-checklist.md` (created)
- `src/app/sitemap.ts` (enhanced)
- `src/app/opengraph-image.tsx` (logo fix)
- `src/app/twitter-image.tsx` (logo fix)
- `src/components/seo/StructuredData.tsx` (enhanced)

**Next Steps**:
1. Deploy changes to production
2. Test OG images with social media debug tools
3. Begin Phase 2: Create Google Business Profile (highest priority)

### 2025 - Issue #59 SEO & Content Quality Improvements (Partial)
- [x] Added `FAQPage` JSON-LD structured data on `/contact` page (4 FAQ items)
- [x] Added sr-only `<h1>` on `/services` for crawlers
- [x] Added descriptive image alt text to all 9 portfolio projects (`bannerAlt`, `previewAlt`, `screenshotAlts`)
- [x] Replaced vague portfolio metrics with specific, credible numbers (ChatFly, LetsPass, Chayyel)
- [x] Verified copyright year is already dynamic (`getFullYear()`)
- [x] GSC verification token added to `layout.tsx:257-259`
- [ ] Individual portfolio pages (`/portfolio/[project-id]`) not yet created
- [ ] Individual service pages not yet created
- [ ] Video transcript for Agentic AI demo not yet added
- [ ] Keyword variation ("AI" over-repetition) not yet addressed

**Files Modified**: `src/app/contact/page.tsx`, `src/app/services/ServicesPage.tsx`, `src/data/portfolioProjects.ts`, `src/components/portfolio/EnhancedProjectCard.tsx`, `src/components/portfolio/ImageCarousel.tsx`, `src/components/portfolio/ProjectDetailModal.tsx`, `src/components/portfolio/SingleImageDisplay.tsx`

### Future Updates
*Add notes here as you complete tasks or encounter issues*

---

## Quick Reference: NAP Info

**Use this exact information everywhere:**

```
Company Name: DevX Group LLC
Alt Name: DevX Group
Address: [Add full street address], San Diego, CA [ZIP], United States
Phone: +1-442-544-0591
Email: support@devxgroup.io
Website: https://devxgroup.io
Founded: 2023
Founder: Max Sheikhizadeh
Industry: Software Development
Services: Custom Applications, AI/ML Solutions, IoT Integration, Digital Transformation
```

---

**Next Steps**: Start with Phase 1 testing, then move to Google Business Profile creation.
