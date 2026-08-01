# Impressum, privacy, and what a German resident owes a personal site

Written after working through this once. None of it is legal advice, and the
texts of the laws could not be read from the machine that wrote this note,
because the proxy there refused `gesetze-im-internet.de`. Confirm with a
Fachanwalt für IT-Recht before relying on any of it.

## Two obligations that get confused

**Impressum** comes from § 5 DDG, the Digitale-Dienste-Gesetz that replaced § 5
TMG in May 2024. It is about who stands behind the site.

**Datenschutzerklärung** comes from Article 13 GDPR. It is about what happens to
the visitor's data. Neither substitutes for the other, and in this case the
answers differ.

## Decision: privacy notice yes, Impressum no

The Impressum duty attaches to `geschäftsmäßige` digital services. That word
does not mean profitable, and it does not require money to change hands. It
means sustained activity with an economic character, which is a lower bar than
it sounds and is where the grey zone lives.

As the site stands it is a CV, an essay and a blog, written by someone looking
for employment. That reads as private. It would stop reading as private the
moment it offers services: a line saying work is taken on, a rate, a booking
link, advertising, affiliate links or donations. The About page describes an
interest in building things for small businesses, which is a direction rather
than an offer, so the line is not crossed yet. It will be crossed the first time
that direction becomes an offer, and this decision has to be revisited then.

The reason for not adding one anyway is not effort. An Impressum needs a
ladungsfähige Anschrift, an address where court documents can be served. A post
box does not qualify and address services cost more per month than this site
costs per year. In practice it means publishing a home address on a page built
to be found by search engines, permanently, on a site whose author has a family.
That was declined, and the decline is the reason there is no Impressum rather
than any confidence about the law.

A second duty worth remembering: § 18 MStV asks for a named responsible person
on `journalistisch-redaktionell` offerings. One blog post is not that. A regular
publication schedule might be.

The privacy notice was the easier call. It applies more clearly, since the host
logs addresses and the analytics process them, and it needs no home address.
`content/privacy.md` carries it, linked from the footer on every page, which is
what "leicht erkennbar, unmittelbar erreichbar und ständig verfügbar" asks for.

## The finding that mattered more than the question

Looking at what the site actually sent, rather than at the law, turned up
something worse than a missing Impressum. Quartz shipped with `cdnCaching: true`,
which loads the theme fonts from `fonts.googleapis.com` on every page view and
hands each visitor's address to Google.

That is the fact pattern of LG München I, 20 January 2022, which awarded damages
against a site owner for embedding Google Fonts without consent, and which set
off a wave of German warning letters. Setting `cdnCaching: false` moves the
fonts into the build and serves them from this domain, so nothing goes to
Google. It is recorded in the Traps section of `CLAUDE.md` because the setting
looks like performance tuning and its real consequence is legal.

## Left alone deliberately

Quartz emits a `preconnect` hint for `cdnjs.cloudflare.com`, left over from the
maths support this site does not use. No file is loaded from it, but a browser
may still open a connection, which discloses an address to Cloudflare. Removing
it means editing `quartz/components/Head.tsx`, and the rule in `CLAUDE.md` is
that the fork stays clean apart from `custom.scss`, so upstream merges remain
trivial. The privacy notice discloses it instead. Worth revisiting if the fork
is ever patched for another reason.

The notice is in English, matching the site. German would be the safer choice
for a German-resident author, and is worth asking a lawyer about rather than
guessing.
