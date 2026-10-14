/**
 * Counts the clicks that are this site's conversions: writing, downloading the
 * PDF, and leaving for LinkedIn or GitHub. A page view says a recruiter
 * arrived; only these say whether they acted.
 *
 * GoatCounter's own `data-goatcounter-click` was not used. It is bound by the
 * routine that Quartz suppresses with `no_onload`, so it may never fire, and it
 * needs the attribute on the anchor, which the CV's email link cannot carry: a
 * raw `<a>` around an address is split apart by the auto-linker (see the traps
 * in CLAUDE.md). One delegated listener on the document needs neither, and it
 * survives SPA navigation because the document itself is never replaced.
 *
 * Clicks made before count.js has loaded are not counted.
 */
const script = `
if (!window.__clickEventsBound) {
  window.__clickEventsBound = true
  const events = [
    [(a) => a.protocol === "mailto:", "email"],
    [(a) => a.pathname.endsWith("/cv.pdf"), "cv-pdf"],
    [(a) => a.hostname.endsWith("linkedin.com"), "linkedin"],
    [(a) => a.hostname === "github.com", "github"],
  ]
  document.addEventListener("click", (e) => {
    const a = e.target instanceof Element ? e.target.closest("a[href]") : null
    if (!a || !window.goatcounter || !window.goatcounter.count) return
    const match = events.find(([test]) => test(a))
    if (!match) return
    window.goatcounter.count({ path: match[1], title: location.pathname, event: true })
  })
}
`

export const ClickEvents = () => ({
  name: "ClickEvents",
  // Quartz classifies a plugin as a transformer by the presence of one of the
  // AST hooks. This plugin only contributes a script, so the hook is empty.
  htmlPlugins() {
    return []
  },
  externalResources(ctx) {
    if (ctx.cfg.configuration.analytics?.provider !== "goatcounter") return {}
    return {
      js: [{ script, loadTime: "afterDOMReady", contentType: "inline" }],
    }
  },
})

export default ClickEvents
