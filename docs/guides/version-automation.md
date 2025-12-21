# Version Automation Guide

## Overview

The README version badges are automatically synced from `package.json` using a Node.js script. This ensures your documentation is always up-to-date with your latest dependency versions and app version.

## What Gets Updated

The `pnpm update-readme` script automatically updates:

1. **Version Badge** - App version from `package.json` version field
2. **Tech Stack Badge** - Next.js, React, and Tailwind CSS versions
3. **Core Section** - Framework and runtime versions
4. **UI & Interactions Section** - Tailwind CSS version

Example output in README:
```markdown
![Version](https://img.shields.io/badge/version-1.7.1-blue?style=flat)
![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%2016.1.0%20%7C%20React%2019.2.1%20%7C%20Tailwind%204.1.13-blueviolet?style=flat&logo=next.js)
```

## Usage

### Manual Update

Run whenever you update dependencies or the app version:

```bash
pnpm update-readme
```

This will:
- Extract current versions from `package.json`
- Update all version references in README.md
- Display a summary of changes

### Automated Workflow (Recommended)

You can integrate this into your release process. For semantic-release users:

**Option 1: Add to `release` script (via npm hook)**

The script will be called automatically during semantic-release's version bumping phase.

**Option 2: Add to pre-commit hook**

Add this to `.husky/pre-commit`:

```bash
pnpm update-readme
git add README.md
```

This ensures README is always synced before commits.

**Option 3: GitHub Actions**

Create `.github/workflows/sync-readme.yml`:

```yaml
name: Sync README Versions

on:
  push:
    paths:
      - 'package.json'
    branches:
      - main

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm update-readme
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: 'chore: update README version badges'
          file_pattern: 'README.md'
```

## Script Details

**Location:** `scripts/update-readme-version.js`

**What it does:**

1. Reads `package.json`
2. Extracts versions:
   - App version: `package.json.version`
   - Next.js: `dependencies.next`
   - React: `dependencies.react`
   - Tailwind: `devDependencies.tailwindcss`
3. Updates README.md patterns:
   - `![Version](...)`
   - `![Tech Stack](...)`
   - Framework version in Core section
   - Tailwind version in UI & Interactions section
4. Outputs success message with summary

**Error handling:**

- Warns if badge patterns not found in README
- Gracefully skips missing patterns
- Doesn't fail on partial updates

## When to Run

1. **After `pnpm upgrade`** - When you update dependencies
2. **After version bump** - When semantic-release updates `package.json` version
3. **Before pushing to main** - To ensure README reflects current stack
4. **In CI/CD pipelines** - Automated after dependency updates

## Example Workflow

```bash
# Update dependencies
pnpm upgrade

# Sync README automatically
pnpm update-readme

# Verify changes
git diff README.md

# Commit and push
git add README.md
git commit -m "chore: update dependencies and README versions"
git push
```

## Customization

To modify what gets updated, edit `scripts/update-readme-version.js`:

### Add a New Badge

```javascript
// Add after version badge update
const newBadge = `![MyLib](https://img.shields.io/badge/MyLib%20${myVersion}-green?style=flat)`
readmeContent = readmeContent.replace(/(existing_pattern)/, `$1\n${newBadge}`)
```

### Change Version Format

Update the regex patterns in the script. For example, to include patch versions:

```javascript
// Current: "Next.js 16.1.0"
// New: "Next.js 16.1.0-canary.19"
const nextVersion = packageJson.dependencies.next.replace('^', '')
```

### Add Support for Other Dependencies

Add new extraction blocks:

```javascript
const gsapVersion = packageJson.dependencies.gsap

// Then use in replacements
const gsapRegex = /- Motion: GSAP [\d.]+/
const newGsapVersion = `- Motion: GSAP ${gsapVersion}`
if (gsapRegex.test(readmeContent)) {
  readmeContent = readmeContent.replace(gsapRegex, newGsapVersion)
}
```

## Troubleshooting

### Script not found
```bash
# Make sure you're in the project root
cd /path/to/devx-web
node scripts/update-readme-version.js
```

### Pattern not matching
- Check README.md has the expected badge/version format
- Run `git diff` to see what changed
- Manually update README if script missed something

### Permissions error
```bash
# Make script executable
chmod +x scripts/update-readme-version.js

# Or run with explicit node
node scripts/update-readme-version.js
```

## Integration with Semantic Release

If using semantic-release, you can run this script as part of the release:

In `.releaserc.json` or `package.json`:

```json
{
  "release": {
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      ["@semantic-release/exec", {
        "verifyReleaseCmd": "node scripts/update-readme-version.js"
      }],
      "@semantic-release/changelog",
      "@semantic-release/npm",
      "@semantic-release/git",
      "@semantic-release/github"
    ]
  }
}
```

## Benefits

✅ **Always accurate** - README versions always match package.json
✅ **No manual updates** - Automation prevents version mismatches
✅ **CI-friendly** - Can be integrated into release pipelines
✅ **Transparent** - Script output shows exactly what changed
✅ **Safe** - Only updates known patterns, warns on failures

## See Also

- [README.md](../../README.md) - Main documentation
- [Deployment Commands](deployment-commands.md) - Release workflow
- [Code Submission Workflow](code-submission-workflow.md) - Commit conventions

