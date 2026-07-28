import { h, Fragment } from "preact"

/**
 * Builds the absolute URL for a page. Quartz emits `index.html` for the slug
 * `index`, so the canonical for the CV must be the bare origin rather than
 * `/index`, otherwise the homepage competes with itself in search results.
 */
function canonicalUrl(baseUrl, slug) {
  const origin = `https://${baseUrl.replace(/\/+$/, "")}`
  if (!slug || slug === "index") return `${origin}/`
  const path = slug.replace(/(^|\/)index$/, "$1")
  return `${origin}/${path}`
}

export const Seo = (opts = {}) => {
  const { person } = opts

  return {
    name: "Seo",
    // Quartz classifies a plugin as a transformer by the presence of one of
    // the AST hooks. This plugin only contributes <head> tags, so the hook is
    // deliberately empty.
    htmlPlugins() {
      return []
    },
    externalResources(ctx) {
      const baseUrl = ctx.cfg.configuration.baseUrl
      if (!baseUrl) return {}

      return {
        additionalHead: [
          (pageData) => {
            const url = canonicalUrl(baseUrl, pageData.slug)
            const tags = [h("link", { key: "canonical", rel: "canonical", href: url })]

            // The Person graph only belongs on the CV itself. Repeating it on
            // every note would give search engines several competing entities.
            if (person && pageData.slug === "index") {
              const graph = {
                "@context": "https://schema.org",
                "@type": "ProfilePage",
                mainEntity: {
                  "@type": "Person",
                  name: person.name,
                  jobTitle: person.jobTitle,
                  url,
                  ...(person.email ? { email: person.email } : {}),
                  ...(person.locality
                    ? {
                        address: {
                          "@type": "PostalAddress",
                          addressLocality: person.locality,
                          addressCountry: person.country,
                        },
                      }
                    : {}),
                  ...(person.sameAs ? { sameAs: person.sameAs } : {}),
                  ...(person.knowsAbout ? { knowsAbout: person.knowsAbout } : {}),
                  ...(person.alumniOf
                    ? {
                        alumniOf: person.alumniOf.map((name) => ({
                          "@type": "CollegeOrUniversity",
                          name,
                        })),
                      }
                    : {}),
                  ...(person.worksFor
                    ? { worksFor: { "@type": "Organization", name: person.worksFor } }
                    : {}),
                },
              }

              tags.push(
                h("script", {
                  key: "ld-person",
                  type: "application/ld+json",
                  dangerouslySetInnerHTML: { __html: JSON.stringify(graph) },
                }),
              )
            }

            return h(Fragment, null, ...tags)
          },
        ],
      }
    },
  }
}

export default Seo
