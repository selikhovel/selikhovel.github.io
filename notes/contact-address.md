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

An earlier version of this note argued that the cost of moving rises over time,
and used that to make the purchase urgent. That looks wrong. GitHub Pages
redirects `username.github.io` to the custom domain once one is configured for a
user site, so the accumulated links and ranking follow the move rather than
being stranded. Deferring the decision is cheap. What a move does cost is the
GoatCounter history, which is tied to the hostname and starts again from zero.

Treat that correction as unverified: it could not be checked from the machine
that wrote it, because the proxy there refused `docs.github.com`. Confirm it at
the point of moving, not now.

## Decision

Stay on `selikhovel.github.io`. No domain.

The reasoning is that a domain buys very little for the goal this site actually
has. For a backend engineer applying to companies, a `github.io` address reads
as normal rather than cheap, and recruiters judge the page rather than its
hostname. The place a domain would genuinely pay is cold outreach to small
businesses, which is a direction rather than a present activity, and any product
built for that would need its own name anyway rather than a surname.

`selikhov.dev`, `selikhov.com` and `selikhov.xyz` are already taken, checked by
DNS resolution. `.de` at around €6 a year was the option to take if one were
being taken, both because German registrations do not inflate at renewal and
because a `.de` reads well to a Berlin employer.

Revisit only on a concrete trigger: outreach to small businesses under a
personal name, or enough traffic to be worth protecting.

## No contact form

Asked for and declined. The reasons are worth keeping, because the idea is an
obvious one to have again.

Recruiters do not use forms. They copy an address into their mail client or
their tracking system, because they need to attach a job description, copy a
colleague, and keep the exchange in one thread. A form takes all of that away
from the one visitor the site is built for.

GitHub Pages is static, so a form means a third-party processor holding the
sender's details. For an audience in the EU that wants disclosure at minimum,
which reintroduces from another direction exactly the friction the cookieless
analytics decision was avoiding. A public form also collects bot spam within
weeks, and the usual answer to that is a captcha, which is third-party tracking
again.

A form also gives the sender no copy of what they wrote and no evidence it
arrived. Email gives both by default, and `mailto` plus a visible address covers
the two cases that matter: a phone opens the mail app, and a desktop without a
mail client can still select the address.

Revisit if the small-business direction starts and non-technical visitors turn
up, since a form genuinely is easier for someone who does not live in a mail
client. That is a different audience and probably a different page.

## What this leaves

Email is now the only part still open, and it is the blocking one: the site has
no contact address at all, so the page cannot do the job it exists for.

With no domain, the option is a dedicated free mailbox, kept separate from the
personal address for the disposability reasons above. It needs to be created and
then put on the CV, and it is the one real address that belongs in `content/`.
