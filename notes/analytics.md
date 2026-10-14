# Choosing analytics

The site has a goal it can fail at quietly. It exists to convince a recruiter,
and until something counts visits there is no way to tell whether anyone arrives,
which page they read, or whether the long About essay is worth its length.

## The constraint that decides it

Most of the audience is in the EU, and under GDPR and the ePrivacy rules any
analytics that sets a cookie or builds a profile needs consent before it runs.
Consent means a banner.

A banner is unusually expensive here. The first thing a recruiter meets would be
a dialogue asking permission to track them, on a page whose whole job is to make
a good impression in thirty seconds. It also has to be honoured properly, which
means the analytics only fire for the minority who accept, and the numbers stop
being trustworthy anyway.

So the requirement is analytics that need no consent: no cookies, no persistent
identifier, no personal data retained.

## What that rules out

Google Analytics, Clarity and PostHog in its default configuration all either
set identifiers or process data in a way that wants consent. Google Analytics
also carries a separate history of adequacy rulings in the EU that a personal
site should simply stay out of.

Quartz supports eleven providers, so the shortlist was the cookieless ones:
GoatCounter, Plausible, Umami, Cabin, Tinylytics.

## Decision: GoatCounter

Free for a personal site, hosted, open source, and explicitly designed so that
no consent banner is required: it keeps no cookies, no identifiers and no raw
addresses. The script is small and loaded from `gc.zgo.at`.

Plausible is the better product and costs around ten euros a month, which is not
worth it for a site with four pages. Umami means either a cloud account or
hosting a database. Both stay open if the traffic ever justifies them.

What is given up is depth. GoatCounter answers what was visited and where the
visitor came from, and little else. No funnels, no retention, no sessions. For
the questions this site actually has, that is enough.

## The questions it has to answer

1. Does anyone arrive at all, and from where. Referrers matter more than totals,
   because they say whether the site has any life outside people who already
   know the name.
2. Does the CV or the About page get read. The essay is six times the length of
   the CV, and that ratio is either the site's strength or its mistake.
3. Is the PDF taken instead of the site being read. If downloads dominate, the
   pages are a wrapper around a document and should be treated as one.

Question three needs help. `cv.pdf` is a static file, so no script runs when it
is fetched and the download is invisible by default. The local plugin
`plugins/click-events` counts it as an event, together with the email address,
LinkedIn and GitHub, so the dashboard also says whether a visitor wrote or left
for LinkedIn rather than reading.

## Why not `data-goatcounter-click`

The first version put `data-goatcounter-click="cv-pdf"` on the PDF link. It was
never certain to fire. Quartz emits `window.goatcounter = { no_onload: true }`
before loading `count.js`, and GoatCounter binds that attribute in the routine
`no_onload` suppresses, so downloads could silently count as zero, which looks
like an answer. The attribute also cannot go on the CV's email link: a raw
`<a>` around an address is split apart by the auto-linker.

The plugin instead adds one delegated click listener to the document and calls
`goatcounter.count({ event: true })` itself. It needs no markup, and it survives
SPA navigation because the document is never replaced. Events appear in the
dashboard as `email`, `cv-pdf`, `linkedin` and `github`, titled with the page
they were clicked on. A click made before `count.js` has loaded is not counted.

Still to confirm on the live site: click each of the four once and look for the
events in the dashboard.

## Still open

Worth deciding alongside the domain question in `notes/contact-address.md`.
Statistics are tied to `selikhovel.github.io` and start again from zero if the
site later moves to its own domain.
