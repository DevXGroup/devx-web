import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // Read package.json from the root directory
    const packageJsonPath = join(process.cwd(), 'package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'))

    return NextResponse.json(
      { version: packageJson.version },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    )
  } catch (error) {
    console.error('Failed to read package.json version:', error)
    // Fallback version if unable to read package.json
    return NextResponse.json(
      { version: '1.0.0' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-cache',
        },
      }
    )
  }
}
