// Превращает public/og-image.svg в public/og-image.png (1200×630).
// Запуск: node scripts/og.mjs
import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svg = readFileSync(join(root, 'public/og-image.svg'))

await sharp(svg, { density: 220 })
  .resize(1200, 630)
  .png()
  .toFile(join(root, 'public/og-image.png'))

console.log('public/og-image.png создан')
