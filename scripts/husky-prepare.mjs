#!/usr/bin/env node
import { existsSync } from 'fs'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.resolve(__dirname, '..')
const gitDir = path.join(repoRoot, '.git')

if (!existsSync(gitDir)) {
  console.log('Skipping Husky install: .git directory not found.')
  process.exit(0)
}

const result = spawnSync('pnpm', ['husky'], {
  cwd: repoRoot,
  stdio: 'inherit',
  shell: false,
})

if (result.error) {
  console.error(result.error)
  process.exit(1)
}

process.exit(result.status ?? 0)
