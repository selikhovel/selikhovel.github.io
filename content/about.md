---
title: About
description: Eugene Selikhov — a backend engineer in Berlin who works in complicated domains, from nuclear plant construction to global real estate, and is moving towards product engineering.
---

I am a backend engineer in Berlin. For the last decade I have built systems for
industries that are difficult to model: plant construction and radioactive waste
control, trading platforms, vehicle catalogues for Daimler, and now global real
estate data at Colliers.

The list looks scattered until you notice what those domains have in common.
None of them are hard because of the code.

## What I do now

At Colliers I am the founding engineer of a new Global Tech Hub, which in
practice means less writing code and more deciding how a team should work:
delivery processes, onboarding, where the boundaries of the domain lie, who we
hire. I run the technical interviews, which has taught me more about what I
value in engineers than any amount of reading.

## The code is the easy part

Enterprise code is rarely where the difficulty is. Most of it is
straightforward, and these days a good deal of it writes itself. What no model
can do for you is sit with the business and turn what they want into something a
system can hold. That still takes domain-driven design, ontologies and patient
business analysis — because the knowledge is not written down anywhere.

Every project I have joined has had the same gap. There is no documentation, and
everything that matters lives in the heads of a few people who are too busy to
write it down, were never asked to, or have no particular interest in sharing
it. The bus factor is enormous. Most of the work is drawing that knowledge out
of them.

In companies with a long history there is a second layer. Decisions taken
fifteen or twenty years ago, when software was built quite differently, are
still the core business logic of systems running today. The business has moved
on; the system has not. My working belief is that software should reflect the
current state of the business and change as it changes — and once the gap grows
wide enough, rewriting stops being optional.

But rewriting badly means carrying the same logic across to newer technology.
The point is to go back to the business and ask again: what changed, what is no
longer relevant, which rules are still doing real work, and which survive only
because everyone is used to them and nobody has noticed they stopped making
sense. Some of them should not be rebuilt at all. Sometimes the right answer is
to propose something different.

That last part is where the job stops being purely technical. If you have seen
how modern products work, you are often the person in the room best placed to
say what will and will not hold up — and saying so is part of the work, not
overstepping it. It makes an engineer answerable for the product, not only for
the service behind it.

## Convincing people is harder than rewriting anything

Software goes stale faster than anyone plans for. A large system can take two
years to build and another two to settle, by which point it is already behind
the business it was meant to serve. Give it fifteen more and the gap is
structural. It is worse when the system arrived as a boxed product or from an
outside contractor: it never fitted exactly, and bending it further costs more
than anyone wants to spend. Sometimes there is no active development at all —
the thing was built once and has been maintained ever since.

None of this is unusual. It is the ordinary condition of enterprise software,
and I have met some version of it on every project I have worked on.

Diagnosing it is not the difficult part. Convincing the people who live with it
is. Raising the subject is usually met with defensiveness — everything is fine,
this is simply how it works — and not because anyone is being unreasonable.
Habit is strong, and large organisations are conservative about their processes
by design. One engineer, or one team, does not change that by being right.

What does work is making the argument in the language the business already uses.
Show where the current system creates pain, with numbers rather than opinions.
Tie every proposed change to the pain it removes and to what the company gets
back. Talk about cost and efficiency before architecture. That asks something of
engineers which appears on no technical interview: being able to present, and to
make a case that survives scrutiny. The work resembles running a small startup
inside a large company more than it resembles taking tickets.

Which is the same conclusion from the other side. A team that only implements
what it is handed is doing half of its job. Questioning the decision and offering
a better one is the other half.

## Bringing AI into a place that did not ask for it

I have spent much of the last year getting agentic workflows into an enterprise
SDLC. None of this is settled practice yet — every company is feeling its way,
and in a large one it moves slowly.

The first obstacle is budget, and it is really a question of who is asking. When
somebody in senior management already believes in it, things move. When there is
no such person and the case has to be made upward by ordinary engineers, it
meets resistance that is entirely reasonable, and every proposal has to stand on
its own merits.

The second is security, and that one is not negotiable. Source code is
intellectual property and cannot leak into somebody else's model. In practice
this limits you to vendors willing to sign a corporate agreement, which tends to
mean large conservative companies rather than whoever is at the frontier this
month. Enterprise engineers end up as deliberate late adopters, working from
established practice and with far less room to experiment on real projects than
the public conversation assumes.

Engineers themselves turned out to be the easy part. Most already understand
where this is heading, and resistance from them is now the exception rather than
the rule.

What moved management was what moves any enterprise argument: demonstration,
numbers, and somebody's own experience of the thing working. The framing that
landed was competitive rather than technical. This is a change on the scale of
DevOps becoming its own discipline, or the move to cloud and Kubernetes — the
largest shift in how software gets built in fifteen years — and arriving late to
it costs something.

### What does not work

Advice written for frontier models does not transfer. If your organisation can
only use something a generation or two behind, you cannot extend it the trust
that most writing on these tools quietly assumes. Everything still goes through
conservative review: read the generated code, run it, check it, and give far
more precise instructions than any demo suggests.

Inside those limits, agents handle a great deal of ordinary enterprise work.
Most of it is not rocket science, and moving data between systems is well within
reach. But the distance between what the tools can do and what a particular
organisation is permitted to use is the part almost nobody writes about.

We move in small steps. It is slower, and it has saved us from a number of wrong
turns.

## Where I am heading

I think the centre of gravity in this work is shifting away from code and
towards specification: defining the domain, settling what a system should
actually do, and talking to the people who know. How far that goes is still an
open question, but in some places — startups especially — it is already the
present rather than the future.

Two directions interest me, and they are further apart than they look.

One is what I do now. Enterprise products, in domains conservative enough that a
great deal is still worth fixing. Real estate has turned out to be exactly that:
old, careful, and full of things nobody has got to yet.

The other is much smaller. I think one person can now cover the entire cycle for
a small business or a narrow niche — gather the requirements, decide what is
worth building, and ship it — because most of the mechanical work can be
automated and what remains is the product judgement. That is the direction I take
my own side projects in, and I expect it to become unremarkable rather than
impressive.

## Outside the screen

I am a father, and my family comes first. Berlin has been home for years now.

Away from work I read a great deal of psychology. It began as a personal
interest and stayed one, though the distance between it and the rest of this
page is smaller than it looks — most of what I have written above is about
people and the knowledge they carry without ever writing it down. In time I
would like to build something in that field: tools for therapists, and for the
people who go to see them.

The rest of my attention goes to the shift this page describes. Moving from
writing code towards business analysis and product work means learning a
different craft — event storming, requirement elicitation, the methods for
turning what a business says into something precise enough to build. That is
what I am reading and practising at the moment.
