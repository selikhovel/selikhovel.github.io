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
is fetched and the download is invisible by default. The link in
`content/index.md` therefore carries `data-goatcounter-click="cv-pdf"`, which
GoatCounter's script binds on click. It is inert while analytics are off, and
it is the one provider-specific thing in the content, so switching provider
means changing that attribute too.

Outbound clicks to LinkedIn and GitHub could be counted the same way, which
would show whether visitors leave for LinkedIn rather than reading. Those are
plain markdown links today and would have to become HTML, so it was left alone
until there is a reason.

## Unverified: whether the PDF click is actually bound

Quartz emits `window.goatcounter = { no_onload: true }` before loading
`count.js`, then counts the pageview itself and recounts on the `nav` event so
that SPA navigation registers. Page views are therefore certain to work.

The click tracking is not certain. GoatCounter binds `data-goatcounter-click`
inside the routine it runs on page load, and `no_onload` exists precisely to
suppress that routine. If binding lives there, the attribute on the PDF link
never gets bound and downloads silently count as zero, which is worse than not
measuring them, because zero looks like an answer.

This could not be checked from the machine that set it up: the agent proxy
denies both `gc.zgo.at` and `goatcounter.com`, so neither the script nor the
documentation could be read.

Check it empirically instead. Download the PDF from the live site, then look for
a `cv-pdf` path in the GoatCounter dashboard. If it never appears while page
views do, the binding is the reason, and the fix is one line: call
`goatcounter.bind_events()` after the script loads, and again on `nav`, since
Quartz replaces the DOM on navigation. Doing that means either a small local
plugin or an upstream edit, since the snippet lives in
`quartz/plugins/emitters/componentResources.ts`.

## Still open

Worth deciding alongside the domain question in `notes/contact-address.md`.
Statistics are tied to `selikhovel.github.io` and start again from zero if the
site later moves to its own domain.
