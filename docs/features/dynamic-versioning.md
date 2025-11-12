# Dynamic Version Display

## Overview

The application displays its current version in the footer, which updates automatically when semantic-release bumps the version in `package.json`.

## Implementation

### Architecture

The version display uses a client-side fetch pattern with server-side caching for optimal performance:

```
User loads page → Footer.tsx (Client Component)
                     ↓
                useEffect hook
                     ↓
                fetch('/api/version')
                     ↓
           /api/version/route.ts (Server API)
                     ↓
           reads package.json from filesystem
                     ↓
           returns { version: "1.0.0" } with cache headers
```

### Files

1. **`src/app/api/version/route.ts`** - API endpoint that reads package.json
   - Returns version from package.json
   - Caches response for 60 seconds with stale-while-revalidate
   - Falls back to "1.0.0" on error
   - Error handling with 500 status code

2. **`src/common/Footer.tsx`** - Client wrapper component
   - Fetches version on mount via useEffect
   - Initial state: "1.0.0" (fallback)
   - Passes version to FooterClient

3. **`src/common/FooterClient.tsx`** - Presentational component
   - Receives version as prop
   - Renders footer UI with version display
   - Handles Safari-specific browser detection

### Best Practices Applied

✅ **Server-side rendering**: API route reads package.json server-side only
✅ **Caching strategy**: 60s cache with 5min stale-while-revalidate
✅ **Error handling**: Graceful fallback to "1.0.0"
✅ **Type safety**: TypeScript types for version data
✅ **Performance**: Minimal bundle impact, lazy fetch
✅ **Separation of concerns**: Server/Client component split

## How It Updates

When semantic-release runs (on merge to main):

1. semantic-release analyzes commits
2. Bumps version in package.json (e.g., 1.0.0 → 1.1.0)
3. Commits the change and creates a git tag
4. Vercel detects the push and triggers a new deployment
5. New deployment includes updated package.json
6. Next page load after deployment shows new version

### Cache Behavior

- **First request**: API reads package.json, caches for 60s
- **Within 60s**: Cached version returned (fast)
- **After 60s**: Fresh version fetched, cache updated
- **Stale-while-revalidate**: If cache expired, stale version returned while fresh version is fetched in background

## Usage

The version appears at the bottom of every page (except entry page `/`):

```
© 2025 DevX Group LLC. All rights reserved. • v1.0.0
```

- Mobile: Version on separate line
- Desktop: Version inline with bullet separator

## Testing

### Manual Testing

1. Check current version:
   ```bash
   curl http://localhost:3002/api/version
   # {"version":"1.0.0"}
   ```

2. Update version in package.json:
   ```bash
   # Edit package.json, change "version": "1.0.0" to "1.0.1"
   ```

3. Verify API returns new version:
   ```bash
   curl http://localhost:3002/api/version
   # {"version":"1.0.1"}
   ```

4. Check footer displays new version (reload page)

### Automated Testing

```bash
# API route test
curl http://localhost:3002/api/version | jq .version

# End-to-end test (Playwright)
# tests/integration/version_display.spec.ts
await page.goto('/home')
const version = await page.locator('footer p:has-text("v")').textContent()
expect(version).toMatch(/v\d+\.\d+\.\d+/)
```

## Troubleshooting

### Version shows "1.0.0" instead of actual version

**Cause**: API endpoint failing to read package.json

**Solution**:
1. Check server logs for errors
2. Verify package.json exists at project root
3. Check file permissions

### Version doesn't update after semantic-release

**Cause**: Browser cache or CDN cache

**Solution**:
1. Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
2. Wait 60s for cache to expire
3. Check Vercel deployment logs

### Build fails with "Module not found: Can't resolve 'fs'"

**Cause**: Trying to use Node.js fs module in client code

**Solution**:
- Ensure Footer.tsx is a client component ('use client')
- Ensure fs is only used in API routes (server-side)
- Current implementation uses API endpoint pattern (correct)

## Future Improvements

- [ ] Add version to <meta> tag for SEO/analytics
- [ ] Display changelog link next to version
- [ ] Add "New version available" toast notification
- [ ] Include build date/commit hash alongside version
- [ ] Add version to error reports (Sentry context)

## Related Files

- `package.json` - Source of truth for version
- `.releaserc.json` - semantic-release configuration
- `CHANGELOG.md` - Auto-generated changelog
- `src/common/Footer.tsx` - Version display wrapper
- `src/common/FooterClient.tsx` - Footer UI component
- `src/app/api/version/route.ts` - Version API endpoint
