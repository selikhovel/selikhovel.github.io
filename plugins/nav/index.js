import { h } from "preact"

const css = `
.site-nav {
  display: flex;
  gap: 1.4rem;
  align-items: baseline;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--lightgray);
  flex-wrap: wrap;
}
.site-nav a {
  background-color: transparent;
  color: var(--gray);
  font-family: var(--headerFont);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
}
.site-nav a:hover { color: var(--secondary); }
.site-nav a[aria-current="page"] { color: var(--dark); }
@media print { .site-nav { display: none; } }
`

/**
 * Site-wide navigation.
 *
 * Without this every section other than the CV was unreachable from the
 * homepage: the CV deliberately hides the explorer, which left the blog with no
 * inbound internal link at all.
 */
export const Nav = (opts = {}) => {
  const links = opts.links ?? {}

  const Nav = ({ fileData, displayClass }) => {
    const slug = fileData?.slug ?? ""
    // Depth of the current page decides how many levels to climb back to the
    // site root, so the same markup works on nested pages without a baseUrl.
    const depth = slug.split("/").length - 1
    const toRoot = depth === 0 ? "./" : "../".repeat(depth)

    const entries = Object.entries(links)
    if (entries.length === 0) return null

    return h(
      "nav",
      { class: `site-nav ${displayClass ?? ""}`, "aria-label": "Site sections" },
      ...entries.map(([label, target]) => {
        const isHome = target === "" || target === "/"
        const active = isHome ? slug === "index" : slug.startsWith(target.replace(/^\//, ""))
        return h(
          "a",
          {
            key: label,
            href: isHome ? toRoot : `${toRoot}${target.replace(/^\//, "")}`,
            "aria-current": active ? "page" : undefined,
          },
          label,
        )
      }),
    )
  }

  Nav.css = css
  return Nav
}

export default Nav
