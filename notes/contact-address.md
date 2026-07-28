# Choosing a public contact address

The CV needs an email a recruiter can click. The main personal address should
not be the one on the page.

## Why not obfuscate

Obfuscation — assembling the address in JavaScript, writing "name at domain",
rendering it as an image — is close to worthless now. Scrapers execute JS, and
the techniques that do defeat them also defeat the recruiter who just wants to
click. It also has to be total to mean anything: an address hidden on the page
but present in the JSON-LD block is not hidden at all. This is why
`plugins/seo` deliberately omits `email` from the `Person` graph.

What actually works is a **separate address that can be abandoned**. Spam then
costs a filter rule or a new alias, not a change of personal mailbox.

## Options considered

**A dedicated mailbox** (a second free mail account, forwarding to the main
one). Free, about five minutes, and a `@gmail.com` address raises no eyebrows
on a CV. The main address never appears anywhere. Fastest route to "good
enough".

**Plus-addressing** (`name+cv@…`). Rejected. It is instant and free, but the
main address is recovered by deleting `+cv`, which defeats the entire point.

**An alias service** (SimpleLogin, addy.io — free tiers). Best disposability:
an alias that misbehaves is switched off in one click. The alias provider's
domain reads oddly on a CV unless a custom domain is attached, which brings
back the cost of the next option.

**A own domain with email forwarding.** Around €12/year, plus free email
routing at the DNS provider, forwarding `hi@<domain>` to the existing mailbox —
no second inbox to run. Strongest option: it looks the most credible on a CV,
and the address survives changing mail providers.

## The domain question is bigger than email

The site currently lives at `selikhovel.github.io`, chosen to avoid buying a
domain. If a domain gets bought for email anyway, it should carry the site too —
running the CV on `github.io` while the email is on a personal domain is the
worst of both.

The cost of moving rises over time. Right now the site has no indexed pages and
no inbound links, so a move costs nothing but a config change. Once the site
ranks, moving means redirects and a ranking dip.

## Decision

Not settled yet — see the open question in the site's task list. The fallback,
if a decision is needed quickly and without spending, is a dedicated mailbox.
