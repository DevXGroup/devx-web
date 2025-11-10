import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const sourceSvg = path.join(publicDir, 'favicon.svg')

async function ensureSourceExists() {
  try {
    await fs.promises.access(sourceSvg, fs.constants.R_OK)
  } catch (error) {
    throw new Error(`Cannot read favicon source SVG at ${sourceSvg}`)
  }
}

function buildTargetPath(fileName) {
  return path.join(publicDir, fileName)
}

async function generatePng(size, fileName) {
  const outputPath = buildTargetPath(fileName)
  await sharp(sourceSvg)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outputPath)
  console.log(`Generated ${fileName}`)
  return outputPath
}

function createIcoBuffer(pngBuffer, size) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // Reserved
  header.writeUInt16LE(1, 2) // ICO type
  header.writeUInt16LE(1, 4) // Image count

  const directory = Buffer.alloc(16)
  directory[0] = size === 256 ? 0 : size
  directory[1] = size === 256 ? 0 : size
  directory[2] = 0 // palette colors
  directory[3] = 0 // reserved
  directory.writeUInt16LE(1, 4) // color planes
  directory.writeUInt16LE(32, 6) // bits per pixel
  directory.writeUInt32LE(pngBuffer.length, 8) // data size
  directory.writeUInt32LE(header.length + directory.length, 12) // offset

  return Buffer.concat([header, directory, pngBuffer])
}

async function generateIco(size) {
  const pngBuffer = await sharp(sourceSvg)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const icoBuffer = createIcoBuffer(pngBuffer, size)
  const outputPath = buildTargetPath('favicon.ico')
  await fs.promises.writeFile(outputPath, icoBuffer)
  console.log(`Generated favicon.ico (${size}x${size})`)
  return outputPath
}

async function main() {
  await ensureSourceExists()

  const targets = [
    { size: 16, file: 'favicon-16x16.png' },
    { size: 32, file: 'favicon-32x32.png' },
    { size: 180, file: 'apple-touch-icon.png' },
    { size: 192, file: 'android-chrome-192x192.png' },
    { size: 512, file: 'android-chrome-512x512.png' },
  ]

  for (const { size, file } of targets) {
    await generatePng(size, file)
  }

  // Generate ICO using 64px source for good coverage
  await generateIco(64)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
