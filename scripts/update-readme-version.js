#!/usr/bin/env node

/**
 * Script: Update README version from package.json
 * Purpose: Automatically sync version in README badges from package.json
 * Run: node scripts/update-readme-version.js or pnpm update-readme
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get package.json
const packageJsonPath = path.join(__dirname, '../package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

// Get README
const readmePath = path.join(__dirname, '../README.md')
let readmeContent = fs.readFileSync(readmePath, 'utf-8')

// Extract versions from package.json
const appVersion = packageJson.version
const nextVersion = packageJson.dependencies.next.replace('^', '').split('-')[0]
const reactVersion = packageJson.dependencies.react
const tailwindVersion = packageJson.devDependencies.tailwindcss

// Build the badges line
const techStackBadge = `![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%20${nextVersion}%20%7C%20React%20${reactVersion}%20%7C%20Tailwind%20${tailwindVersion}-blueviolet?style=flat&logo=next.js)`
const versionBadge = `![Version](https://img.shields.io/badge/version-${appVersion}-blue?style=flat)`

// Replace the tech stack badge line
const techStackRegex = /!\[Tech Stack\]\(.*?\)/
if (techStackRegex.test(readmeContent)) {
  readmeContent = readmeContent.replace(techStackRegex, techStackBadge)
  console.log(
    `✓ Updated Tech Stack badge to: Next.js ${nextVersion} | React ${reactVersion} | Tailwind ${tailwindVersion}`
  )
} else {
  console.warn('⚠ Tech Stack badge pattern not found in README')
}

// Replace or add version badge
const versionBadgeRegex = /!\[Version\]\(.*?\)/
if (versionBadgeRegex.test(readmeContent)) {
  readmeContent = readmeContent.replace(versionBadgeRegex, versionBadge)
  console.log(`✓ Updated Version badge to: ${appVersion}`)
} else {
  // Add version badge after tech stack
  readmeContent = readmeContent.replace(/(!\[Tech Stack\]\(.*?\))/, `$1\n${versionBadge}`)
  console.log(`✓ Added Version badge: ${appVersion}`)
}

// Update Core section version numbers
const coreVersionRegex =
  /- Framework: Next\.js [\d.]+(-canary\.\d+)? \(App Router\) on React [\d.]+/
const newCoreVersion = `- Framework: Next.js ${nextVersion} (App Router) on React ${reactVersion}`
if (coreVersionRegex.test(readmeContent)) {
  readmeContent = readmeContent.replace(coreVersionRegex, newCoreVersion)
  console.log(`✓ Updated Core section: ${newCoreVersion}`)
}

// Update Styling section
const tailwindRegex = /- Styling: Tailwind CSS [\d.]+/
const newTailwindVersion = `- Styling: Tailwind CSS ${tailwindVersion}`
if (tailwindRegex.test(readmeContent)) {
  readmeContent = readmeContent.replace(tailwindRegex, newTailwindVersion)
  console.log(`✓ Updated Tailwind version: ${tailwindVersion}`)
}

// Write updated README
fs.writeFileSync(readmePath, readmeContent, 'utf-8')

console.log('\n✅ README.md updated successfully with latest versions from package.json')
console.log(`\n📦 Summary:
  • App Version: ${appVersion}
  • Next.js: ${nextVersion}
  • React: ${reactVersion}
  • Tailwind: ${tailwindVersion}
`)
