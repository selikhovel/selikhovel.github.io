/**
 * Generates the site avatar from a source photo.
 *
 * Run manually when the photo changes:
 *   npx tsx ./scripts/make-avatar.mts <path-to-photo>
 *
 * Output lands in content/ so the Assets emitter copies it next to the page
 * that references it, and so the photo lives in the vault like any other
 * attachment.
 */
import path from "path"
import sharp from "sharp"

const source = process.argv[2]
if (!source) {
  console.error("usage: npx tsx ./scripts/make-avatar.mts <path-to-photo>")
  process.exit(1)
}

const target = path.resolve("content/avatar.webp")

// 480px covers a 240px display size on a 2x screen, which is well beyond what
// the layout uses — the page never needs more, and the file stays small.
await sharp(source).resize(480, 480, { fit: "cover" }).webp({ quality: 82 }).toFile(target)

const { size } = await import("fs").then((fs) => fs.statSync(target))
console.log(`Wrote content/avatar.webp (${(size / 1024).toFixed(0)} KB)`)
