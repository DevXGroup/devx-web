#!/usr/bin/env node
// Lightweight unused file detector for Next.js App Router projects.
// - Scans src/**/*.{ts,tsx,js,jsx,css}
// - Resolves tsconfig path aliases (e.g. @/*)
// - Handles static imports, dynamic imports with string literals, export ... from, and CSS @import
// - Roots: src/app/**/(page|layout|template|error|global-error|not-found|loading).tsx and src/app/globals.css
// Limitations: dynamic paths, glob imports, and runtime-only references may be missed.

import fs from 'fs'
import path from 'path'

const WORKSPACE = process.cwd()
const SRC_DIR = path.join(WORKSPACE, 'src')

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css']
const INDEX_BASENAMES = ['index.ts', 'index.tsx', 'index.js', 'index.jsx']
const ROUTE_FILENAMES = new Set([
  'page.tsx',
  'layout.tsx',
  'template.tsx',
  'error.tsx',
  'global-error.tsx',
  'not-found.tsx',
  'loading.tsx',
])

function readJSON(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'))
  } catch {
    return null
  }
}

function loadTsconfig() {
  const tsconfigPath = path.join(WORKSPACE, 'tsconfig.json')
  const json = readJSON(tsconfigPath) || {}
  const baseUrl = json?.compilerOptions?.baseUrl || '.'
  const paths = json?.compilerOptions?.paths || {}
  return { baseUrl: path.resolve(WORKSPACE, baseUrl), paths }
}

const { baseUrl, paths: aliasPaths } = loadTsconfig()

function walk(dir) {
  const out = []
  const stack = [dir]
  while (stack.length) {
    const d = stack.pop()
    let entries = []
    try {
      entries = fs.readdirSync(d, { withFileTypes: true })
    } catch {
      continue
    }
    for (const e of entries) {
      const p = path.join(d, e.name)
      if (e.isDirectory()) {
        // Skip junk directories
        if (['node_modules', '.next', 'dist', 'build', '__tests__'].includes(e.name)) continue
        stack.push(p)
      } else {
        const ext = path.extname(e.name)
        if (EXTENSIONS.includes(ext)) {
          // Skip declaration files
          if (e.name.endsWith('.d.ts')) continue
          out.push(p)
        }
      }
    }
  }
  return out
}

function toRelPosix(p) {
  const rel = path.relative(WORKSPACE, p)
  return rel.split(path.sep).join('/')
}

// Build candidate file set
if (!fs.existsSync(SRC_DIR)) {
  console.error('No src/ directory found. Exiting.')
  process.exit(1)
}

const candidates = new Set(walk(SRC_DIR).map(toRelPosix))

// Construct path alias resolver based on tsconfig paths
const aliasResolvers = []
for (const [alias, targetArr] of Object.entries(aliasPaths)) {
  // Example: alias '@/*' -> ['src/*']
  // Build a regex and a mapper
  const star = alias.endsWith('/*')
  const aliasPrefix = star ? alias.slice(0, -2) : alias
  const re = new RegExp(
    '^' + aliasPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + (star ? '\\/(.+)$' : '$')
  )
  const targets = targetArr.map((t) => ({
    star: t.endsWith('/*'),
    prefix: path.resolve(baseUrl, t.replace(/\*$|\/$/g, '')),
  }))
  aliasResolvers.push({ re, star, targets })
}

function resolveAlias(spec) {
  for (const { re, star, targets } of aliasResolvers) {
    const m = spec.match(re)
    if (m) {
      const tail = star ? m[1] || '' : ''
      for (const { star: tStar, prefix } of targets) {
        const full = tStar && tail ? `${prefix}/${tail}` : prefix
        const resolved = resolveFile(full)
        if (resolved) return resolved
      }
    }
  }
  return null
}

function tryFile(p) {
  // If path includes extension and exists
  try {
    const st = fs.statSync(p)
    if (st.isFile()) return toRelPosix(p)
  } catch {}
  return null
}

function resolveFile(base) {
  // Try exact
  const exact = tryFile(base)
  if (exact) return exact
  // Try with TS/JS/CSS extensions
  for (const ext of EXTENSIONS) {
    const withExt = tryFile(base + ext)
    if (withExt) return withExt
  }
  // Try index files in a directory
  try {
    const st = fs.statSync(base)
    if (st.isDirectory()) {
      for (const idx of INDEX_BASENAMES) {
        const p = tryFile(path.join(base, idx))
        if (p) return p
      }
    }
  } catch {}
  return null
}

function resolveImport(fromFile, spec) {
  if (!spec || typeof spec !== 'string') return null
  if (spec.startsWith('node:')) return null
  // Relative import
  if (spec.startsWith('.') || spec.startsWith('/')) {
    const absBase = path.resolve(path.dirname(fromFile), spec)
    return resolveFile(absBase)
  }
  // Alias import
  const alias = resolveAlias(spec)
  if (alias) return alias
  // External package
  return null
}

const IMPORT_RE =
  /import\s+(?:type\s+)?[^'"()]*?from\s*['\"]([^'\"]+)['\"];?|import\s*\(\s*['\"]([^'\"]+)['\"]\s*\)/g
const EXPORT_FROM_RE = /export\s+[^'"()]*?from\s*['\"]([^'\"]+)['\"]/g
const CSS_IMPORT_RE = /@import\s+['\"]([^'\"]+)['\"]/g

function extractImports(filePath, code) {
  const deps = new Set()

  if (/\.(ts|tsx|js|jsx)$/.test(filePath)) {
    let m
    while ((m = IMPORT_RE.exec(code))) {
      const spec = m[1] || m[2]
      if (spec) deps.add(spec)
    }
    while ((m = EXPORT_FROM_RE.exec(code))) {
      const spec = m[1]
      if (spec) deps.add(spec)
    }
  } else if (/\.css$/.test(filePath)) {
    let m
    while ((m = CSS_IMPORT_RE.exec(code))) {
      const spec = m[1]
      if (spec) deps.add(spec)
    }
  }
  return Array.from(deps)
}

// Build dependency graph
const graph = new Map() // file -> Set(files)

for (const file of candidates) {
  let code = ''
  try {
    code = fs.readFileSync(file, 'utf8')
  } catch {
    continue
  }
  const specs = extractImports(file, code)
  const resolved = new Set()
  for (const s of specs) {
    const r = resolveImport(file, s)
    if (r && candidates.has(r)) {
      resolved.add(r)
    }
  }
  graph.set(file, resolved)
}

// Determine roots
function isRouteFile(p) {
  const bn = path.basename(p)
  if (!ROUTE_FILENAMES.has(bn)) return false
  return toRelPosix(p).startsWith('src/app/')
}

const roots = []
for (const file of candidates) {
  if (isRouteFile(file)) roots.push(file)
  if (file === 'src/app/globals.css') roots.push(file)
}

// BFS to mark used files
const used = new Set(roots)
const queue = [...roots]
while (queue.length) {
  const f = queue.shift()
  const deps = graph.get(f)
  if (!deps) continue
  for (const d of deps) {
    if (!used.has(d)) {
      used.add(d)
      queue.push(d)
    }
  }
}

// Compute unused candidates within src, excluding certain known categories
function shouldConsider(p) {
  // Only within src
  if (!p.startsWith('src/')) return false
  // Include only extensions we track
  if (!EXTENSIONS.includes(path.extname(p))) return false
  // Exclude types-only files
  if (p.endsWith('.d.ts')) return false
  // Exclude type declarations directory
  if (p.startsWith('src/types/')) return false
  return true
}

const unused = []
for (const f of candidates) {
  if (!shouldConsider(f)) continue
  if (!used.has(f)) unused.push(f)
}

unused.sort()

const summary = {
  roots: roots.sort(),
  usedCount: used.size,
  candidateCount: candidates.size,
  unusedCount: unused.length,
  unused,
}

console.log(JSON.stringify(summary, null, 2))
