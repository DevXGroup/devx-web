# Clean Commits & PRs Guide

This document outlines how to use the clean-commit and clean-pr skills to maintain a clean git history and professional pull requests with zero Claude signatures.

## Skills Available

### 1. `/clean-commit` - Clean Commit Skill
Creates git commits with zero Claude signatures, emojis, or co-author footers.

**Usage:**
```bash
/clean-commit "feat: add feature description"
/clean-commit "fix: resolve bug description"
/clean-commit "chore: update dependencies"
```

**What it does:**
- Stages all untracked and modified files
- Creates commit with ONLY your message (no footers)
- Validates NO Claude signatures exist
- Rejects commit if violations found

### 2. `/clean-pr` - Clean PR Skill
Creates GitHub pull requests with zero Claude signatures and automatic reviewer/task assignment.

**Usage:**
```bash
/clean-pr "feat: add feature" "## Summary
Description here...

## Changes
- Item 1

## Test Plan
1. Verify feature works"
```

**What it does:**
- Validates PR description for Claude signatures
- Creates PR with clean description
- Assigns PR to reviewer: DesignbyMax
- Creates GitHub task assigned to: Max Shekizadeh
- Handles errors gracefully (continues if task/reviewer assignment fails)

## Conventional Commit Format

Always use: `<type>(<scope>): <description>`

**Valid Types:**
- feat - New feature
- fix - Bug fix
- chore - Maintenance
- docs - Documentation
- perf - Performance
- refactor - Code refactoring
- style - Code formatting
- test - Tests
- build - Build system
- ci - CI/CD

**Examples:**
```
feat: add user authentication
fix(portfolio): correct image carousel timing
perf(animations): reduce entry page CPU usage
chore: update dependencies
```

## Workflow

1. Make code changes
2. Run `/clean-commit "conventional message"`
3. Push to feature branch
4. Run `/clean-pr "title" "description"`
5. GitHub automatically:
   - Creates PR with clean description
   - Assigns reviewer (DesignbyMax)
   - Creates task (assigned to Max Shekizadeh)

## Rules

✅ **Always Include:**
- Conventional commit format
- Clear, professional language
- Test plan in PRs
- Related issues (Closes #123)

❌ **Never Include:**
- Claude signatures or emojis
- "Generated with Claude Code" text
- Co-author footers
- Anthropic references

## See Also

- `/clean-commit` - Full clean commit skill guide
- `/clean-pr` - Full clean PR skill guide
