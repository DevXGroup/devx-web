# CI/CD Pipeline Setup

This document explains the GitHub Actions CI/CD pipeline integration with Vercel and semantic-release.

## Overview

The CI/CD pipeline automates:
1. **Quality Gates** on every push and pull request
2. **Semantic Versioning** on successful merges to main
3. **Automated Releases** with changelog generation
4. **Vercel Deployments** triggered only after CI/CD success

## Pipeline Flow

```
Push to main
    ↓
GitHub Actions: quality-gate job
    ├─ Install dependencies
    ├─ Check formatting (Prettier)
    ├─ Lint code (ESLint)
    ├─ Run tests (Jest)
    └─ Build production bundle
    ↓
IF quality-gate passes:
    ↓
GitHub Actions: release job
    ├─ Analyze commits (conventional commits)
    ├─ Determine version bump (major/minor/patch)
    ├─ Update CHANGELOG.md
    ├─ Update package.json version
    ├─ Create GitHub Release
    └─ Push release commit with [skip ci] tag
    ↓
[skip ci] commit pushed
    ↓
Vercel detects main push → Deploys to production

IF quality-gate fails:
    ↓
Pipeline stops (no release, no deployment)
```

## Key Features

### 1. Quality Gate (`quality-gate` job)
- **Trigger**: Every push to `main` and all pull requests
- **Skip Logic**: Skips if commit message contains `[skip ci]`
- **Steps**:
  - Verify Prettier formatting
  - Run ESLint
  - Run Jest tests
  - Build production bundle

### 2. Semantic Release (`release` job)
- **Trigger**: Only if `quality-gate` passes AND on `main` branch
- **Skip Logic**: Skips if commit message contains `[skip ci]`
- **Behavior**:
  - Analyzes commits since last release (conventional commits)
  - Determines version bump:
    - `feat:` → Minor version (0.1.0)
    - `fix:` → Patch version (0.0.1)
    - Breaking changes → Major version (1.0.0)
  - Updates CHANGELOG.md
  - Updates package.json
  - Creates GitHub Release
  - Pushes release commit with `[skip ci]` to prevent CI re-run

### 3. Vercel Deployment
- **Trigger**: Push to `main` (automatic via Vercel GitHub integration)
- **Prevention**: `[skip ci]` commits are ignored by GitHub Actions but still trigger Vercel
- **Workflow**:
  1. CI passes → semantic-release creates release commit
  2. Release commit pushed to main (marked with `[skip ci]`)
  3. GitHub Actions sees `[skip ci]` → skips CI re-run
  4. Vercel sees push to main → deploys to production
  5. **Only production-ready code is deployed**

## Conventional Commits

The pipeline respects [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Supported Types

- `feat:` - New feature (triggers minor version bump)
- `fix:` - Bug fix (triggers patch version bump)
- `refactor:` - Code refactoring (no version bump, goes in CHANGELOG)
- `perf:` - Performance improvement (no version bump)
- `chore:` - Build, CI, dependencies (no version bump)
- `docs:` - Documentation (no version bump)
- `test:` - Test additions/updates (no version bump)
- `BREAKING CHANGE:` in footer → Major version bump

### Examples

```bash
# Feature (triggers v0.1.0 bump)
git commit -m "feat: add dark mode toggle"

# Bug fix (triggers v0.0.1 bump)
git commit -m "fix: resolve navbar visibility on home page"

# Breaking change (triggers major version bump)
git commit -m "refactor!: redesign authentication flow"
# or
git commit -m "feat: new API endpoint

BREAKING CHANGE: old endpoint removed"
```

## Configuration Files

### `.github/workflows/ci.yml`
- Defines GitHub Actions workflow
- Two jobs: `quality-gate` and `release`
- Conditional execution based on branch and commit messages

### `.releaserc.json`
- Semantic-release configuration
- Plugins:
  - `@semantic-release/commit-analyzer` - Analyzes commits
  - `@semantic-release/release-notes-generator` - Generates release notes
  - `@semantic-release/changelog` - Updates CHANGELOG.md
  - `@semantic-release/github` - Creates GitHub releases
  - `@semantic-release/git` - Commits and pushes changes

### `.vercelignore`
- Tells Vercel which files to ignore during deployment
- Prevents unnecessary redeployments for non-code changes

### `package.json` (`pnpm release` script)
- Triggers semantic-release CLI
- Automatically analyzes commits, bumps version, creates release

## Environment Variables

### Required GitHub Secrets

1. `GITHUB_TOKEN` (automatic in GitHub Actions)
   - Used by semantic-release to create GitHub releases
   - Used by semantic-release/git to push commits
   - Automatically available in Actions context

### Optional GitHub Secrets (if using npm)

- `NPM_TOKEN` - If publishing to npm registry

### Vercel Configuration

1. **Connect Vercel to GitHub**
   - Go to Vercel Dashboard → Settings → Git Integration
   - Select repository
   - Enable auto-deployments on main branch

2. **Environment Variables in Vercel**
   - Set `NEXT_PUBLIC_SITE_URL`, `SENTRY_AUTH_TOKEN`, etc.
   - In Vercel Dashboard → Settings → Environment Variables

3. **Production & Preview Deployments**
   - Production: Only from `main` branch
   - Preview: Pull requests and branches

## Troubleshooting

### CI Failing on Main
**Issue**: Quality gate is failing, blocking releases
**Solution**:
1. Check GitHub Actions logs: GitHub → Actions → CI workflow
2. Fix the failing step (formatting, linting, tests, or build)
3. Commit and push fix to main
4. CI will retry automatically

### Semantic Release Not Creating Release
**Issue**: Commits don't follow conventional format
**Solution**:
1. Use proper commit format: `feat:`, `fix:`, `refactor:`, etc.
2. Example: `git commit -m "feat: add new feature"`

### Vercel Deployment Stuck
**Issue**: Deployment not completing or showing old version
**Solution**:
1. Check Vercel deployments dashboard
2. Verify CI passed before Vercel deployment
3. Check `.vercelignore` isn't accidentally excluding src/

### Duplicate Deployments
**Issue**: Two Vercel deployments happening
**Solution**: This is the expected behavior:
1. CI passes → semantic-release pushes commit
2. `[skip ci]` prevents second CI run
3. One final Vercel deployment happens with release commit
4. This is correct and ensures production deploys only after CI passes

## Local Testing

### Test Commit Message Format
```bash
# Don't actually commit, just check if semantic-release would bump version
pnpm exec semantic-release --dry-run

# This shows what version would be bumped without making changes
```

### Manual Release (if needed)
```bash
# Dangerous! Only do this if automated release failed
pnpm release
```

## Monitoring

### Check Release Status
- GitHub → Actions tab → see CI/release workflow runs
- GitHub → Releases tab → see created releases with changelog
- Vercel Dashboard → Deployments tab → see deployment status

### Production Monitoring
- Sentry Dashboard → See errors in production
- Vercel Analytics → See performance metrics
- Vercel Speed Insights → See Core Web Vitals

## Best Practices

1. **Always use conventional commits**
   - Ensures semantic versioning works correctly
   - Auto-generates meaningful CHANGELOG

2. **Keep commits atomic**
   - One feature/fix per commit
   - Easier to identify what changed

3. **Test locally before pushing**
   - Run `pnpm lint` and `pnpm test` locally
   - Catch issues before CI

4. **Review CI logs on failure**
   - GitHub Actions provides detailed logs
   - Fix locally and re-push

5. **Don't force-push to main**
   - Breaks semantic-release tracking
   - Use normal git workflow

6. **Coordinate with team on breaking changes**
   - Breaking changes bump major version
   - Consider impact on users/integrations
