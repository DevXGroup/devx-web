# Deployment Skip Commands

This guide explains how to control when GitHub Actions CI/CD and Vercel deployments run using commit message tags.

## Overview

You can skip specific parts of the deployment pipeline using special tags in your commit messages:

- **`[skip ci]`** - Skips GitHub Actions CI/CD workflow
- **`[skip vercel]`** - Skips Vercel deployment

These tags give you fine-grained control over what runs when you push code.

---

## `[skip ci]` - Skip GitHub Actions

### What It Skips

When you include `[skip ci]` in your commit message, GitHub Actions **will not run**:

- ❌ Formatting checks (Prettier)
- ❌ Linting (ESLint)
- ❌ Unit tests (Jest)
- ❌ Production build verification
- ❌ Semantic release (version bumping, changelog generation)

### What Still Runs

- ✅ **Vercel deployment** - Still deploys to production

### When to Use

Use `[skip ci]` for changes that don't affect code behavior:

- Documentation updates (README, guides)
- Comment-only changes
- Minor typo fixes in docs
- Markdown formatting changes

### Example Usage

```bash
# Documentation update
git commit -m "docs: update installation guide [skip ci]"

# Typo fix
git commit -m "docs: fix typo in README [skip ci]"

# Comment changes
git commit -m "chore: update code comments [skip ci]"
```

### ⚠️ Important Notes

- **Don't use for code changes** - Always run CI for code that affects functionality
- **Vercel still deploys** - The site will be redeployed even though CI is skipped
- **No version bump** - Semantic-release won't run, so no version change

---

## `[skip vercel]` - Skip Vercel Deployment

### What It Skips

When you include `[skip vercel]` in your commit message, Vercel **will not deploy**:

- ❌ Vercel build
- ❌ Production deployment
- ❌ Preview deployment

### What Still Runs

- ✅ **GitHub Actions CI/CD** - Formatting, linting, tests, build all run
- ✅ **Semantic release** - Version bumping and changelog generation still happen

### When to Use

Use `[skip vercel]` when you want CI checks but don't need a deployment:

- Test updates that don't affect UI
- CI/CD configuration changes
- GitHub Actions workflow updates
- Development tooling changes
- Package dependency updates (when you want to verify build works without deploying)

### Example Usage

```bash
# Test updates
git commit -m "test: add unit tests for authentication [skip vercel]"

# CI configuration
git commit -m "ci: update GitHub Actions workflow [skip vercel]"

# Tooling changes
git commit -m "chore: update ESLint configuration [skip vercel]"

# Dependency updates (verify build works)
git commit -m "chore: upgrade testing libraries [skip vercel]"
```

### ⚠️ Important Notes

- **CI still runs** - All quality checks happen, build is verified
- **Use for non-user-facing changes** - Good for backend updates that don't need immediate deployment
- **Version still bumps** - If using `feat:` or `fix:`, version will change

---

## Combining Both Tags

You can use both tags together to skip everything:

```bash
git commit -m "docs: update workflow guide [skip ci][skip vercel]"
```

### What Happens

- ❌ GitHub Actions CI/CD - Skipped
- ❌ Vercel Deployment - Skipped
- ✅ Git history updated

### When to Use Both

Use both tags for pure documentation or non-code changes:

- Documentation-only updates
- README changes
- Markdown file edits
- License file updates

---

## Decision Matrix

| Change Type | Use Tag | Why |
|-------------|---------|-----|
| Code changes (features, fixes) | None | Always run full CI/CD and deploy |
| Documentation updates | `[skip ci][skip vercel]` | No need for CI or deployment |
| Test additions/updates | `[skip vercel]` | Verify tests pass, but don't deploy |
| CI/CD configuration | `[skip vercel]` | Verify workflow works, but don't deploy |
| README typo fixes | `[skip ci][skip vercel]` | Pure documentation change |
| Comment-only changes | `[skip ci]` | No functional changes, but deploy is fine |
| Dependency updates | None or `[skip vercel]` | Always verify build; deploy optional |
| Performance improvements | None | Always run full pipeline |
| Refactoring | None | Always run full pipeline |

---

## Examples by Scenario

### Scenario 1: Update README

**Goal**: Fix typo in README, don't waste CI/CD resources

```bash
git commit -m "docs: fix typo in installation section [skip ci][skip vercel]"
```

**Result**:
- ❌ CI skipped
- ❌ Deployment skipped
- ⏱️ Saves ~3-5 minutes of CI/CD time

---

### Scenario 2: Add Unit Tests

**Goal**: Add tests, verify they pass, but don't deploy yet (waiting for feature completion)

```bash
git commit -m "test: add authentication unit tests [skip vercel]"
```

**Result**:
- ✅ CI runs (verifies tests pass)
- ❌ Deployment skipped
- 📝 Version bumped (if semantic-release configured)

---

### Scenario 3: Update GitHub Actions Workflow

**Goal**: Modify CI workflow, verify it works, but don't trigger production deployment

```bash
git commit -m "ci: add deployment check notifications [skip vercel]"
```

**Result**:
- ✅ CI runs (verifies workflow syntax)
- ❌ Deployment skipped
- 🔍 Can review workflow output without deploying

---

### Scenario 4: Production Hotfix

**Goal**: Critical bug fix, run everything immediately

```bash
git commit -m "fix: resolve authentication timeout issue"
```

**Result**:
- ✅ CI runs (verifies fix doesn't break tests)
- ✅ Deployment happens immediately
- 🚀 Users get fix ASAP

---

## Configuration Details

### GitHub Actions Configuration

The `[skip ci]` check is configured in `.github/workflows/ci.yml`:

```yaml
jobs:
  quality-gate:
    if: "!contains(github.event.head_commit.message, '[skip ci]')"
```

### Vercel Configuration

The `[skip vercel]` check is configured in `vercel.json`:

```json
{
  "ignoreCommand": "bash -c '[[ \"$VERCEL_GIT_COMMIT_MESSAGE\" =~ \\[skip.*vercel\\] ]]'"
}
```

This regex matches any of these patterns:
- `[skip vercel]`
- `[skip-vercel]`
- `[skipvercel]`

---

## Troubleshooting

### CI Still Running Despite `[skip ci]`

**Cause**: Tag might not be in the commit message, or workflow configuration is incorrect

**Solution**:
1. Check your commit message: `git log -1 --pretty=%B`
2. Verify `.github/workflows/ci.yml` has the skip condition
3. Push a new commit with the tag

### Vercel Still Deploying Despite `[skip vercel]`

**Cause**: `vercel.json` not configured or Vercel hasn't picked up the change

**Solution**:
1. Verify `vercel.json` exists with the `ignoreCommand` field
2. Check Vercel build logs for "Build skipped" message
3. Try redeploy from Vercel dashboard

### Both Tags Present But One Didn't Skip

**Cause**: Syntax error in commit message (missing brackets, typos)

**Solution**:
```bash
# ✅ Correct
git commit -m "docs: update [skip ci][skip vercel]"

# ❌ Wrong (missing brackets)
git commit -m "docs: update skip ci skip vercel"

# ❌ Wrong (typo)
git commit -m "docs: update [skip-c1][skip vercel]"
```

---

## Best Practices

### ✅ Do

- Use `[skip ci][skip vercel]` for documentation-only changes
- Use `[skip vercel]` for test additions that don't affect production
- Use `[skip ci]` sparingly - prefer running CI when possible
- Verify tags are spelled correctly before pushing

### ❌ Don't

- Don't use `[skip ci]` for code changes
- Don't use `[skip vercel]` for user-facing features
- Don't skip CI for dependency updates
- Don't skip CI for security fixes
- Don't use tags to bypass failing tests (fix the tests instead!)

---

## Summary

| Tag | GitHub Actions | Vercel | Use Case |
|-----|----------------|--------|----------|
| None | ✅ Runs | ✅ Deploys | Code changes, features, fixes |
| `[skip ci]` | ❌ Skipped | ✅ Deploys | Documentation changes |
| `[skip vercel]` | ✅ Runs | ❌ Skipped | Test additions, CI updates |
| `[skip ci][skip vercel]` | ❌ Skipped | ❌ Skipped | Pure documentation |

**Key Rule**: When in doubt, don't skip anything. Running full CI/CD ensures quality and catches issues early.
