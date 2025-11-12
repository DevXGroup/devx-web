# DevX Group Documentation

Welcome to the DevX Group documentation hub. This directory contains all project documentation organized by category for easy navigation.

---

## 📚 Quick Navigation

### 🚀 Getting Started

New to the project? Start here:

1. **[../README.md](../README.md)** - Project overview and setup instructions
2. **[guides/code-submission-workflow.md](guides/code-submission-workflow.md)** - How to submit code changes

### 👨‍💻 For Contributors

- **[guides/code-submission-workflow.md](guides/code-submission-workflow.md)** - Complete workflow for submitting PRs
- **[guides/accessibility-testing.md](guides/accessibility-testing.md)** - Accessibility testing and compliance

### ⚙️ For DevOps/Maintainers

- **[operations/ci-cd-setup.md](operations/ci-cd-setup.md)** - GitHub Actions and semantic-release setup
- **[operations/deployment-commands.md](operations/deployment-commands.md)** - Skip CI/Vercel deployment tags
- **[operations/deployment-guardrails.md](operations/deployment-guardrails.md)** - Deployment protection rules

### 📖 Reference

- **[reference/nextjs-supabase-boilerplate-prd.md](reference/nextjs-supabase-boilerplate-prd.md)** - Product requirements document

---

## 📂 Directory Structure

```
docs/
├── README.md                           # This file
├── guides/                             # Workflow guides and how-tos
│   ├── code-submission-workflow.md    # PR submission process
│   └── accessibility-testing.md       # Accessibility compliance
├── operations/                         # CI/CD, deployment, infrastructure
│   ├── ci-cd-setup.md                 # GitHub Actions configuration
│   ├── deployment-commands.md         # Skip CI/Vercel commands
│   └── deployment-guardrails.md       # Deployment protection
└── reference/                          # Specifications, PRDs, architecture
    └── nextjs-supabase-boilerplate-prd.md
```

---

## 📋 Documentation by Topic

### Code Submission & Workflow

Learn how to contribute code to the project:

| Document | Description | Audience |
|----------|-------------|----------|
| [Code Submission Workflow](guides/code-submission-workflow.md) | Complete guide for creating PRs with proper semantic commits | All contributors |

**Key Topics:**
- Creating feature branches
- Writing conventional commits (`feat:`, `fix:`, etc.)
- Pull request process
- Automatic versioning and releases
- Direct push workflow for maintainers

---

### CI/CD & Deployment

Understand the automated deployment pipeline:

| Document | Description | Audience |
|----------|-------------|----------|
| [CI/CD Setup](operations/ci-cd-setup.md) | GitHub Actions pipeline configuration | DevOps, maintainers |
| [Deployment Commands](operations/deployment-commands.md) | How to skip CI/Vercel with commit tags | All contributors |
| [Deployment Guardrails](operations/deployment-guardrails.md) | Production deployment protection rules | DevOps, maintainers |

**Key Topics:**
- Quality gate jobs (lint, test, build)
- Semantic-release automation
- Vercel integration
- Skip commands (`[skip ci]`, `[skip vercel]`)
- Deployment checks

---

### Accessibility & Testing

Ensure the site meets accessibility standards:

| Document | Description | Audience |
|----------|-------------|----------|
| [Accessibility Testing](guides/accessibility-testing.md) | WCAG compliance testing results | Developers, designers |

**Key Topics:**
- Contrast ratio testing
- WCAG AA/AAA compliance
- Before/after comparison

---

### Reference & Specifications

Technical specifications and architecture:

| Document | Description | Audience |
|----------|-------------|----------|
| [Next.js Supabase Boilerplate PRD](reference/nextjs-supabase-boilerplate-prd.md) | Product requirements document | Product, developers |

---

## 🔍 Common Tasks

### I want to...

#### Submit a new feature
→ Read [Code Submission Workflow](guides/code-submission-workflow.md)

#### Fix a bug
→ Read [Code Submission Workflow](guides/code-submission-workflow.md) (same process)

#### Update documentation without triggering deployments
→ Read [Deployment Commands](operations/deployment-commands.md)
→ Use: `git commit -m "docs: update README [skip ci][skip vercel]"`

#### Add tests without deploying
→ Read [Deployment Commands](operations/deployment-commands.md)
→ Use: `git commit -m "test: add unit tests [skip vercel]"`

#### Understand the CI/CD pipeline
→ Read [CI/CD Setup](operations/ci-cd-setup.md)

#### Set up deployment checks in Vercel
→ Read [CI/CD Setup](operations/ci-cd-setup.md#vercel-configuration)

#### Check accessibility compliance
→ Read [Accessibility Testing](guides/accessibility-testing.md)

---

## 📝 Documentation Standards

When creating or updating documentation:

### Commit Messages

Use conventional commits for documentation changes:

```bash
# Documentation updates
git commit -m "docs: add deployment guide"
git commit -m "docs: update workflow instructions"
git commit -m "docs: fix typos in README"
```

### Skip Tags

For documentation-only changes, use skip tags to save CI/CD resources:

```bash
# Skip both CI and deployment
git commit -m "docs: update guide [skip ci][skip vercel]"
```

See [Deployment Commands](operations/deployment-commands.md) for full details.

### Markdown Style

- Use clear, concise headings
- Include code examples where applicable
- Add tables for comparisons or quick reference
- Use emoji sparingly for visual navigation (✅ ❌ 🚀)
- Link to related documents

---

## 🤝 Contributing to Documentation

Documentation improvements are always welcome! To contribute:

1. Create a branch: `git checkout -b docs/improve-workflow-guide`
2. Make your changes
3. Commit with `docs:` prefix: `git commit -m "docs: improve workflow examples"`
4. Push and create a PR
5. Add `[skip ci][skip vercel]` if it's pure documentation

---

## 📞 Getting Help

- **General questions**: Check [../README.md](../README.md)
- **Code submission**: See [guides/code-submission-workflow.md](guides/code-submission-workflow.md)
- **CI/CD issues**: See [operations/ci-cd-setup.md](operations/ci-cd-setup.md)

---

## 🔄 Changelog

Project version history and changes are tracked in **[../CHANGELOG.md](../CHANGELOG.md)**.

---

**Last Updated**: 2025-11-12
**Maintained By**: DevX Group Team
