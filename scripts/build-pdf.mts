/**
 * Renders the built CV page to public/cv.pdf so the downloadable CV and the
 * web page can never drift apart — both come from content/index.md.
 *
 * Run after `npm run build`; the print styling lives in quartz/styles/custom.scss.
 */
import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"
import puppeteer from "puppeteer"

const source = path.resolve("public/index.html")
const target = path.resolve("public/cv.pdf")

if (!fs.existsSync(source)) {
  console.error("public/index.html not found — run `npm run build` first.")
  process.exit(1)
}

const browser = await puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
})

try {
  const page = await browser.newPage()
  await page.goto(pathToFileURL(source).href, { waitUntil: "networkidle0" })
  // Web fonts are fetched from Google Fonts; without this the PDF can be laid
  // out with fallback metrics and reflow after the fonts land.
  await page.evaluateHandle("document.fonts.ready")
  await page.emulateMediaType("print")
  await page.pdf({
    path: target,
    format: "A4",
    printBackground: false,
    margin: { top: "16mm", bottom: "16mm", left: "16mm", right: "16mm" },
  })
  const size = (fs.statSync(target).size / 1024).toFixed(0)
  console.log(`Wrote public/cv.pdf (${size} KB)`)
} finally {
  await browser.close()
}
