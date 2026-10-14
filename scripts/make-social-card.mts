/**
 * Generates quartz/static/cv-card.png — the link preview for the CV and the
 * About page, referenced from their `socialImage` frontmatter.
 *
 * The og-image plugin's generated cards are WebP, which LinkedIn does not
 * accept for previews, and they describe the page as an article: a date and a
 * reading time, no face and no role. This is the card a recruiter sees when the
 * link is pasted into LinkedIn, so it is a PNG with the portrait and the title.
 *
 * Rendered through a headless browser for the same reason as make-icon.mts:
 * the site's own header font, not whatever the SVG rasteriser finds installed.
 * Re-run after changing the avatar or the job title.
 *
 *   npx tsx ./scripts/make-social-card.mts
 */
import fs from "fs"
import puppeteer from "puppeteer"

const WIDTH = 1200
const HEIGHT = 630
const BACKGROUND = "#faf8f8" // light
const ACCENT = "#284b63" // secondary, light mode
const TEXT = "#2b2b2b" // dark
const MUTED = "#4e4e4e" // darkgray

const avatar = fs.readFileSync("content/avatar.webp").toString("base64")

const html = `<!doctype html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@700&family=Source+Sans+3:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        display: flex;
        align-items: center;
        gap: 72px;
        padding: 0 88px;
        background: ${BACKGROUND};
        border-top: 16px solid ${ACCENT};
        font-family: "Source Sans 3", sans-serif;
        color: ${TEXT};
      }
      img {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
      }
      h1 {
        font-family: "Schibsted Grotesk", sans-serif;
        font-size: 76px;
        line-height: 1.05;
        letter-spacing: -1px;
      }
      .role {
        margin-top: 20px;
        font-size: 44px;
        font-weight: 600;
        color: ${ACCENT};
      }
      .detail {
        margin-top: 14px;
        font-size: 32px;
        color: ${MUTED};
      }
      .site {
        margin-top: 44px;
        font-size: 26px;
        color: ${MUTED};
      }
    </style>
  </head>
  <body>
    <img src="data:image/webp;base64,${avatar}" alt="" />
    <div>
      <h1>Eugene Selikhov</h1>
      <p class="role">Senior .NET Backend Engineer</p>
      <p class="detail">Berlin · 10+ years · Domain-driven design</p>
      <p class="site">selikhovel.github.io</p>
    </div>
  </body>
</html>`

const browser = await puppeteer.launch()
try {
  const page = await browser.newPage()
  await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 })
  await page.setContent(html, { waitUntil: "networkidle0" })
  await page.evaluateHandle("document.fonts.ready")
  await page.screenshot({ path: "quartz/static/cv-card.png" })
  console.log("Wrote quartz/static/cv-card.png")
} finally {
  await browser.close()
}
