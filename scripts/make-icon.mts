/**
 * Generates quartz/static/icon.png — the "ES" monogram.
 *
 * That one file is used twice: the favicon plugin downscales it to 48px, and
 * the og-image plugin puts it on every social card. It therefore has to survive
 * being shrunk to a browser tab, which is why this is a flat two-colour mark
 * with oversized letters rather than a photo or anything detailed.
 *
 * Rendered through a headless browser so the site's own header font is used
 * rather than whatever sharp's SVG rasteriser happens to find installed.
 *
 *   npx tsx ./scripts/make-icon.mts
 */
import puppeteer from "puppeteer"

const SIZE = 512
const BACKGROUND = "#284b63" // secondary, light mode
const FOREGROUND = "#faf8f8" // light

const html = `<!doctype html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@700&display=swap"
      rel="stylesheet"
    />
    <style>
      * { margin: 0; padding: 0; }
      body {
        width: ${SIZE}px;
        height: ${SIZE}px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${BACKGROUND};
        border-radius: 96px;
        overflow: hidden;
      }
      span {
        font-family: "Schibsted Grotesk", sans-serif;
        font-weight: 700;
        /* Sized so the two letters keep clear air around them once the mark is
           shrunk to a 16px browser tab, where tight tracking turns "ES" into a
           single smudge. */
        font-size: 215px;
        letter-spacing: -2px;
        color: ${FOREGROUND};
      }
    </style>
  </head>
  <body><span>ES</span></body>
</html>`

const browser = await puppeteer.launch()
try {
  const page = await browser.newPage()
  await page.setViewport({ width: SIZE, height: SIZE, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: "networkidle0" })
  await page.evaluateHandle("document.fonts.ready")
  await page.screenshot({ path: "quartz/static/icon.png", omitBackground: true })
  console.log("Wrote quartz/static/icon.png")
} finally {
  await browser.close()
}
