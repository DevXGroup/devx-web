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

Use `[skip ci]` in commit message (only for metadata-only changes):
```bash
git commit -m "chore: update README [skip ci]"
```

This is automatically done by semantic-release, don't do it manually.

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

## Summary

The workflow is simple:

1. **Create branch** → Make commits with conventional format
2. **Push → Create PR** → Wait for CI checks
3. **Merge to main** → Automatic release happens
4. **Vercel deploys** → Code in production

The semantic-release pipeline handles everything automatically once CI passes!

**Key rule:** Use proper commit messages (`feat:`, `fix:`, etc.) and everything else happens automatically.
