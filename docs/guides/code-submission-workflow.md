# Code Submission Workflow

Step-by-step guide for submitting code to main branch with proper semantic versioning and automated releases.

## The Proper Workflow

### Step 1: Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names that reflect the work:

- `feature/add-dark-mode`
- `fix/navbar-visibility`
- `refactor/authentication-flow`

### Step 2: Make Changes and Commit with Conventional Commits

Commit messages MUST follow the conventional commit format:

```bash
git commit -m "feat: add dark mode toggle

- Adds theme switcher component
- Persists user preference to localStorage
- Supports system preference detection"
```

**Commit Types:**

- `feat:` - New feature (triggers minor version bump: 0.1.0 → 0.2.0)
- `fix:` - Bug fix (triggers patch version bump: 0.1.0 → 0.1.1)
- `refactor:` - Code refactoring (no version bump)
- `perf:` - Performance improvement (no version bump)
- `chore:` - Build, CI, dependencies (no version bump)
- `docs:` - Documentation (no version bump)
- `test:` - Test additions (no version bump)

**Examples:**

```bash
# Feature - will bump minor version
git commit -m "feat: add authentication system"

# Bug fix - will bump patch version
git commit -m "fix: resolve navbar visibility on home page"

# No version bump - documentation
git commit -m "docs: update API documentation"

# Breaking change - will bump major version
git commit -m "feat!: redesign authentication flow

BREAKING CHANGE: Old authentication endpoints no longer supported"
```

### Step 3: Create Pull Request on GitHub

Push your branch to GitHub:

```bash
git push origin feature/your-feature-name
```

Then:

1. Go to GitHub repository
2. Click "New Pull Request"
3. Set base branch: `main`
4. Set compare branch: `feature/your-feature-name`
5. Add description and title
6. Create PR

### Step 4: Wait for CI/CD Checks

GitHub Actions will automatically:

- ✅ Check formatting (Prettier)
- ✅ Run linting (ESLint)
- ✅ Run tests (Jest)
- ✅ Build production bundle

**If any check fails:**

1. Fix the issue locally on your feature branch
2. Commit and push: `git push origin feature/your-feature-name`
3. PR automatically updates with new checks

### Step 5: Code Review

Have team members review your code on the PR before merging.

### Step 6: Merge to Main

Once CI passes and PR is approved:

1. Click "Merge pull request" on GitHub
2. Choose merge strategy:
   - **"Create a merge commit"** (recommended) - keeps history clean
   - Squash and merge - combines all commits into one
   - Rebase and merge - replays commits

**Do NOT force push to main** - it breaks semantic-release tracking.

### Step 7: Automatic Release (Happens Automatically!)

Once merged to main:

1. **GitHub Actions `quality-gate` job runs:**
   - Checks formatting, linting, tests, build
   - If any check fails → stops here (no release)

2. **GitHub Actions `release` job runs (if quality-gate passes):**
   - Analyzes all commits since last release
   - Determines version bump based on commit types
   - Updates CHANGELOG.md with new features/fixes
   - Updates package.json with new version
   - Creates GitHub Release with changelog
   - Pushes release commit with `[skip ci]` tag

3. **Vercel automatically deploys:**
   - Detects push to main
   - Deploys to production
   - Only production-ready code deployed

**That's it! No manual steps needed.**

---

## Local Development Checklist

Before pushing to GitHub, verify locally:

```bash
# 1. Check formatting
pnpm format:check

# 2. Run linting
pnpm lint

# 3. Run tests
pnpm test

# 4. Build production bundle
pnpm build
```

Or run all at once:

```bash
pnpm lint && pnpm test && pnpm build
```

If any step fails, fix it before pushing.

---

## Commit Message Examples

### Good ✅

```bash
feat: add user authentication

- Implement JWT-based auth
- Add login/logout endpoints
- Secure password hashing with bcrypt
```

```bash
fix: resolve sidebar not closing on mobile

Mobile menu was not closing when clicking outside.
Added click-outside handler to Close button.
```

```bash
docs: update installation instructions
```

### Bad ❌

```bash
git commit -m "updated stuff"
git commit -m "WIP"
git commit -m "fix bugs"
git commit -m "changes"
```

---

## Version Bumping Examples

Given current version: **1.0.0**

### Scenario 1: One `fix:` commit

```
Commits since last release:
- fix: resolve navbar issue

Result:
- Version bumped to: 1.0.1 (patch)
- CHANGELOG updated with fix
```

### Scenario 2: One `feat:` commit

```
Commits since last release:
- feat: add dark mode toggle

Result:
- Version bumped to: 1.1.0 (minor)
- CHANGELOG updated with new feature
```

### Scenario 3: Multiple commits mixed

```
Commits since last release:
- feat: add authentication
- fix: resolve homepage layout
- docs: update README
- chore: upgrade dependencies

Result:
- Version bumped to: 1.1.0 (minor - highest type is feat)
- CHANGELOG includes: authentication feature + homepage fix
- docs and chore commits not in CHANGELOG
```

### Scenario 4: Breaking change

```
Commits since last release:
- feat!: redesign API endpoints

BREAKING CHANGE: Old endpoints removed

Result:
- Version bumped to: 2.0.0 (major)
- CHANGELOG notes breaking change
```

---

## Troubleshooting

### I pushed but CI didn't run

**Solution:** Check GitHub Actions tab

1. Go to GitHub repo → Actions tab
2. Look for "CI" workflow
3. Click on failed run to see logs
4. Fix issues and push again

### I want to skip CI for a commit

Use `[skip ci]` in commit message (only for documentation-only changes):

```bash
git commit -m "docs: update README [skip ci]"
```

You can also skip Vercel deployments:

```bash
git commit -m "test: add unit tests [skip vercel]"
```

Or skip both:

```bash
git commit -m "docs: update guide [skip ci][skip vercel]"
```

**See [Deployment Commands](../operations/deployment-commands.md) for complete guide on when and how to use skip tags.**

### Version wasn't bumped as expected

Commits must start with `feat:`, `fix:`, etc.

Check your commits:

```bash
git log --oneline
```

If commits don't follow conventional format, semantic-release ignores them.

### I need to do a manual release

**Not recommended**, but if needed:

```bash
pnpm release
```

This analyzes commits and creates a release without merging through main.

---

## Maintainer Direct Push Workflow (Optional)

Maintainers and repository admins can push directly to main without creating a pull request. This is useful for:

- Hot fixes that need immediate deployment
- Critical security patches
- Emergency rollbacks
- Urgent bug fixes

**Important:** Direct pushes bypass code review, so use responsibly and only when necessary.

### How Direct Push Works

The CI/CD pipeline runs **exactly the same way** for direct pushes as for PR merges:

1. **You push directly to main:**

   ```bash
   git push origin main
   ```

2. **GitHub Actions automatically:**
   - Runs quality gate (formatting, linting, tests, build)
   - If all checks pass → runs semantic-release
   - Semantic-release bumps version, updates CHANGELOG, creates release
   - Vercel deploys to production

3. **Result:** Same release and deployment as PR workflow, but faster

### Steps for Direct Push

#### 1. Verify Changes Locally

Before pushing, ensure everything passes:

```bash
pnpm format:check    # Check formatting
pnpm lint            # Check linting
pnpm test            # Run tests
pnpm build           # Build production bundle
```

Or all at once:

```bash
pnpm lint && pnpm test && pnpm build
```

#### 2. Commit with Conventional Format

**This is critical** - the commit message determines the version bump:

```bash
# Critical security patch (patch version: 1.0.0 → 1.0.1)
git commit -m "fix: critical security vulnerability in authentication"

# Urgent hotfix (patch version)
git commit -m "fix: resolve production database connection issue"

# New feature (minor version: 1.0.0 → 1.1.0)
git commit -m "feat: add emergency shutdown endpoint"

# Performance improvement (no version bump, but in changelog)
git commit -m "perf: optimize database queries for faster response"
```

#### 3. Push Directly to Main

```bash
git push origin main
```

#### 4. Monitor GitHub Actions

Go to GitHub Actions tab to monitor:

- Quality gate job (should take 2-3 minutes)
- Release job (automatic if quality-gate passes)
- Check the logs if anything fails

#### 5. Verify Deployment

- Check GitHub Releases tab - new release should appear
- Check Vercel dashboard - production deployment should complete
- Verify changes are live on production website

### When NOT to Use Direct Push

Use PR workflow instead when:

- Code is non-critical or can wait for review
- You want code review (recommended for all non-emergency changes)
- It's a new feature (always use PR for visibility)
- Multiple commits (organize with PR for clarity)
- You want team discussion (use PR)

### Commit Message Examples for Direct Push

**Good ✅:**

```bash
fix: resolve database connection timeout in production
fix: patch XSS vulnerability in user input
feat: add emergency API endpoint
perf: optimize caching strategy
```

**Bad ❌:**

```bash
git push without committing anything
git commit -m "hotfix" (not specific enough)
git commit -m "WIP" (not following format)
git commit -m "emergency fix" (no type specified)
```

### Version Bumping with Direct Push

Same rules apply as PR workflow:

| Commit Type | Version Change        | Example         |
| ----------- | --------------------- | --------------- |
| `fix:`      | Patch (1.0.0 → 1.0.1) | Critical hotfix |
| `feat:`     | Minor (1.0.0 → 1.1.0) | New endpoint    |
| `refactor:` | No bump               | Code cleanup    |
| `perf:`     | No bump               | Optimization    |

### Rollback If Needed

If something goes wrong after direct push:

```bash
# Find the problematic commit
git log --oneline

# Revert it
git revert <commit-hash>

# Push the revert commit (triggers CI/CD again)
git push origin main
```

---

## Summary

### Contributor Workflow (Recommended)

1. **Create branch** → Make commits with conventional format
2. **Push → Create PR** → Wait for CI checks
3. **Get code review** → Merge to main
4. **Automatic release happens** → Vercel deploys

### Maintainer Direct Push (When Needed)

1. **Verify locally** → All checks pass
2. **Commit** → Conventional format
3. **Push to main** → Triggers CI/CD automatically
4. **Monitor** → Verify release and deployment

The semantic-release pipeline handles everything automatically!

**Key rule:** Use proper commit messages (`feat:`, `fix:`, etc.) and everything else happens automatically.
