---
title: Senior backend engineer moving into product
description: Eugene Selikhov is a senior backend engineer in Berlin, ten years into hard domains from nuclear plant construction to global real estate, and moving towards product engineering.
---

I am a senior backend engineer in Berlin, ten years in, and increasingly a
product engineer as well. Right now I am the founding engineer of a new global
technology hub at Colliers, where the work is the domain model, the team and the
hiring bar rather than only the services behind them.

For the last decade I have built systems for industries that are difficult to
model: plant construction and radioactive waste control, trading platforms,
vehicle catalogues for Daimler, and now global real estate. The list looks
scattered until you notice what those domains have in common. None of them are
hard because of the code.

Which is why the direction I am moving in is not a change of field. Sitting with
a business, working out what should exist, and being answerable for whether it
was worth building is the part of this job I have always been drawn to. I first
did it in 2016, with the owners of a trading company in Singapore, several years
before I had a name for it.

What I want next is a role where the domain is mine to own and the product
responsibility comes with it. That can be an enterprise product or a small team
building something from nothing, and the pull towards the smaller end of that
range has been getting stronger.

What follows is the long version: how I got from a technical university in
Kaliningrad to here, and what each of those places taught me. The short version
is on [my CV](/).

## Where this started

I wanted to write software before I had much idea what the job actually
involved. What settled it was the people around me. Several of them worked in
IT, and watching them made it obvious that this was both interesting and going
somewhere. There was no dramatic moment. The choice was made early and never
seriously revisited.

What I did revisit was which kind of IT. I read applied information technology
in economics rather than computer science, and that was deliberate. Technology
on its own has never held my attention for long; what holds it is technology
applied to a business, at the point where a company's real problem meets
something you can build. I have spent my whole career on that boundary, and it
started with choosing the degree.

The course that mattered most was systems analysis, and it was a large one. It
was the first time anyone showed me that a complicated system is not simply
difficult, that it has a structure, and that the structure can be taken apart,
modelled and reasoned about. That turned out to be the most durable thing I
learned. When something is too large to hold in your head, decompose it and find
where the boundaries actually are. Nothing about it was specific to software,
which is probably why it has never stopped being useful.

I stayed on afterwards for postgraduate research on e-learning and assessment
tools, and took a job as a developer at the same time. For a year the two ran in
parallel, which is the most useful thing that could have happened: I was not
choosing between a career and an idea of one, I was choosing between two things
I was already doing. Applied work, the kind with a business and a product and a
deadline, held me in a way the research never quite did. I left the postgraduate
work unfinished and went into the industry on purpose, rather than drifting out
of academia by default.

What the research left me with was the method rather than the title: how to work
on a problem nobody has already solved for you, how to read deeply into
unfamiliar material before having an opinion about it, how to keep a project
moving over months. I have used that more than I would have used the degree.

The university gave me the rest of it sideways: the people I met, small student
projects and startups, the first paid work. Mostly it showed me how wide the
field is, and that there was no single track I was supposed to be on.

## The first system I could not see the whole of

My first paid work was small and ordinary: a manufacturing execution system, a
governmental appraisal tool, desktop software. Useful, but the kind of thing one
person can hold entirely in their head.

Neolant was not that. It was the large IT integrator in my home city, working on
nuclear power and on oil and gas, running projects that lasted years. For a
backend developer there it was the place you wanted to end up: a young team, an
unreasonable concentration of good people, and the only work in the city at that
scale. I aimed at it deliberately, and getting in still counts as one of the
better things that has happened to my career.

What I found there was size, and I had not worked at that size before.
Enterprise systems for power plant construction, and for decommissioning
facilities and tracking radioactive waste. Planning measured in years, a domain
model far too large for any one person to carry, developers everywhere. Until
then I had always been able to see the whole of what I was building. Here I
could not, and learning to work well anyway, on your own part, against a model
somebody else owns, without breaking things you cannot see, is a skill I have
used on every large system since.

It was also the first tightly regulated domain I worked in, and the first where
the details were not up for negotiation. When rules arrive from outside the
company and the cost of getting them wrong is measured in something other than
money, you cannot simplify the domain to suit the software. You have to go and
learn it, properly, from people who have spent their careers on it. That is
where the habit started, the one this entire page is really about. The
interesting part of the problem was never the C#.

I owe that period a good deal more than the line it takes up on a CV. It is
where I stopped being only an implementer and started doing analysis and
integration work as well, and where I first saw how far a strong team raises
everyone inside it. I am still in touch with people from there; a great many of
them have gone on to build serious careers, which tells you something about the
place.

I left earlier than I would have chosen. 2015 brought a structural crisis to the
industry and to the economy around it, and it was clear enough where that was
going. It also brought forward something I wanted anyway. I had always intended
to work on international projects rather than domestic ones, in English, and
remote work for a foreign company, still unusual at the time, looked like the
obvious way to get there. So I went after exactly that.

## Four years on the other side of the clock

What I found was a company selling trading technology to brokers on the Asian
forex market: its own platforms, and white-label solutions built on MetaTrader 4
and 5. The headquarters was in Singapore. I worked remotely from Europe in a
distributed team, with trips out to the office there.

In 2015 that arrangement was still unusual, and nobody I knew had a playbook for
it. What it teaches is unglamorous. Self-discipline, mostly: being answerable
for your own output when there is no one in the room to notice either way, and
learning to work through a problem alone for as long as it takes rather than
turning to the desk next to you. Four years of it left habits I have never lost,
and it meant that when the rest of the industry discovered remote work in 2020 I
had already made all the obvious mistakes.

The pace was the other change, and it was sharper than I expected. Working hours
were not really fixed, because trading does not stop and neither does the
support for it. Everything ran twenty-four hours a day and was expected to keep
running.

That is where uptime stopped being a number in a report for me. When a trading
platform is down, somebody is losing money for every minute of it, and the
amount is known. There is no negotiating with that and no explaining it away
afterwards. It meant constant observability, being reachable, and getting things
back up quickly rather than elegantly. It is the origin of the 99.99% on my CV,
which was never an engineering ambition. It was the business requirement, stated
plainly.

Sitting in a European timezone turned out to be worth more than any of my
technical arguments. My working day covered Asia's night, so I became the person
on the other side of the clock, the one who could hold the system while the rest
of the team slept and hand it back in the morning. It was the first time I was
valuable to a company for a reason that had nothing to do with how I wrote code,
and it was a useful thing to learn early.

What I did not expect from that job was a seat at the table. We sat with the
owners of the company and worked out what to build next: which plugins, which
products, what brokers would actually pay for. That meant reading the market,
looking hard at what competitors were doing, arguing about it, and then going
away and building whatever we had agreed on. Nobody had told me that engineers
were not supposed to be in that conversation, so I stayed in it. Everything I
would now call product engineering I first did there, several years before I had
a name for it.

The responsibility came with it. I owned the codebase and the delivery cycle end
to end, which is a great deal to carry, but it was never bare responsibility.
The same conversation that handed me the work gave me a say in what the work
was: what we needed, what we did not, and how it ought to be built. I did not
realise at the time how unusual that combination is. I have been looking for it
in every job since.

The team was spread across India, China, Malaysia, the Philippines and
Singapore, and that taught me something I now consider basic. Most friction in a
distributed team is not disagreement. It is two people who understood the same
sentence differently and did not find out for three days. You write things down,
you say the obvious part out loud, and you check that what you meant is what
arrived.

It was also where I led a project technically for the first time. What surprised
me was how little of it was technical: the work turned out to be explaining a
decision clearly enough that other people could act on it without me, keeping
the shape of the thing visible to everyone, and noticing early when someone was
quietly stuck.

The hardest engineering I have done was probably there too. It meant attaching
our own code to MetaTrader as plugins, across a C++/CLI boundary, on a platform
that was never designed to be extended in the direction we were pushing it.
Narrow constraints, tight performance requirements, and it had to stay up. It
took a fair number of unorthodox solutions. I mention it because it is the
exception that proves the rest of this page: that was a problem where the
difficulty really was technical, and in ten years I have not met many others
like it.

I left for reasons that had nothing to do with the work. My family and I wanted
to move to Europe, and there was no version of that job which allowed it. So the
decision was forced in one sense and entirely deliberate in another. It was a
step I wanted for my career, taken on a timetable set by my life rather than by
my career. We parted on good terms; I am still in touch with people there,
including the owners. That is how I came to Germany.

## A domain that starts on a factory floor

The move was a genuine jump. We went as a family to a country none of us knew,
without the language. The work itself was in English, in an English-speaking
company, so the job was never the problem. Everything around the job was.

German working culture was the third one I had to learn, and it resembles
neither of the others. The planning horizon is long, longer than I initially
thought was useful. There is much less improvisation and a great deal more
commitment: what was agreed is what happens, and processes involving clients
move slowly and through a lot of formality. After the Asian pace this took
adjusting to, and my first months were harder than I expected. Once I stopped
measuring it against what I was used to, I could see what it buys: decisions
that hold, and plans that survive people leaving.

The work was enterprise B2B for the automotive industry: event-driven backend
services for a fleet management platform used by more than a hundred thousand
customers across Europe and the US, and R&D on a data-intensive parts inventory
system. Technically this was new ground for me. Microservices, messaging you can
genuinely rely on, delivery guarantees that hold under load. I had to go and
become properly expert in all of it.

But what held me was the domain, and automotive is not an abstract one. It
touches the physical world at every point: real vehicles, real equipment, real
parts, real factories. More importantly, most of its logic predates software
entirely. How parts are catalogued, how a repair kit is composed, which variants
fit which vehicle configuration. All of that was worked out on factory floors
decades before anyone thought to digitise it, and all of it still runs the
business today.

So the task is never "build a parts catalogue". The task is: this has worked at
Mercedes for decades, in its own infrastructure, in its own vocabulary, and
largely in the heads of people who have done it their entire careers. Move it
into a digital system without breaking anything. And while you are there, work
out which of those rules are the business and which were only ever artefacts of
how the work used to be done by hand. Answering that means modelling the domain
and building an ontology for it, and it is considerably harder than any code
that comes out the other end.

This is where the sentence at the top of this page comes from. I do not want to
overstate it, though: organising that logic in code took genuinely unorthodox
approaches as well. My claim is narrower than that. The code sat downstream of a
much harder question, and getting the harder question wrong could not be fixed
by writing the code better.

I stayed five and a half years, which is longer than I have stayed anywhere.
Three projects in that time, and I carried each of them the whole distance:
proof of concept, delivery, release, and then living with the thing afterwards.
That last part is the one engineers skip when they can, and it is where you find
out which of your decisions were actually good. Doing it three times over taught
me more than any single project could have. Some of that work sat next to the
property domain rather than inside automotive, which is how I first met the
industry I work in now.

I left when German automotive turned down. What began with the pandemic became
structural, projects narrowed, and the direction of travel was not ambiguous.
That makes twice in my career that I have left a company because the industry
underneath it contracted. It has left me with a habit of watching the business
around my work, not only the work. I would rather read that early and move
deliberately than wait to be told.

## Starting from nothing

Real estate was a deliberate choice and I had a head start on it. The reasoning
was not complicated: European automotive was contracting, while property is
stable, conservative, and still largely waiting to be automated. That last part
is what interested me. There is an enormous amount of work in it that nobody has
got to yet, particularly in Europe. Conservative industries are where an
engineer can still make a difference big enough to see.

The first thing I was handed was a fifteen-year-old system. It had been built
with real originality: unconventional decisions, made by people solving a real
problem with the tools available to them at the time. And it worked, which is
the thing worth saying about legacy systems before anything else. It had run the
business for fifteen years, which is more than most software ever achieves. What
it was not was maintainable, or analysable. Working out why it did what it did
meant reading the code as a historical document and then going back to the
business to ask whether the rule I had found was still a rule.

That project was never about moving code. It was about deciding what should
survive: what stays as it is, what gets rewritten, what should be reconsidered
entirely, and what quietly stopped being true years ago and has been executing
ever since. Around that sat everything else: new cloud infrastructure inside an
enterprise environment, and a different way of working to go with it.

Then the work changed shape again, and I became the founding engineer of a new
global technology hub. That meant hiring the first engineers into my own team,
standing the project up, and starting a new core domain from nothing.

It is worth being precise about what that involves, because the title undersells
it. Colliers is a real estate agency. It is not a software company. What we are
building is, in effect, a software organisation inside one that has never needed
to be one, with the engineering culture, standards and delivery practices that
implies, in a place where none of that existed and none of it can be assumed.

Almost nothing was decided, which sounds daunting and is actually the appeal. At
that stage decisions have leverage they never have again: how the team works,
what we consider finished, how we review, who we hire and what we hire them for.
All of it is set in the first months and then inherited for years. I run the
technical interviews, which has taught me more about what I value in engineers
than any amount of reading.

Day to day I work on the domain model: driving domain discovery with the
business, defining bounded contexts, and working with product owners and
business analysts to turn what the business says into something precise enough
to build from. Less writing code than deciding what should be written.

That period taught me the thing I had been circling for a decade. Being good at
building systems and being good at building the conditions in which systems get
built are different skills. The second is a separate craft rather than a
promotion out of the first, and I had to learn it the way I learned the first:
badly, and in public.

## The code is the easy part

Everything above is why I am confident about the claim at the top of this page.

Enterprise code is rarely where the difficulty is. Most of it is
straightforward, and these days a good deal of it writes itself. What no model
can do for you is sit with the business and turn what they want into something a
system can hold. That still takes domain-driven design, ontologies and patient
business analysis, because the knowledge is not written down anywhere.

Every project I have joined has had the same gap. There is no documentation, and
everything that matters lives in the heads of a few people who are too busy to
write it down, were never asked to, or have no particular interest in sharing
it. The bus factor is enormous. Most of the work is drawing that knowledge out
of them.

In companies with a long history there is a second layer. Decisions taken
fifteen or twenty years ago, when software was built quite differently, are
still the core business logic of systems running today. The business has moved
on; the system has not. My working belief is that software should reflect the
current state of the business and change as it changes. Once the gap grows wide
enough, rewriting stops being optional.

But rewriting badly means carrying the same logic across to newer technology.
The point is to go back to the business and ask again: what changed, what is no
longer relevant, which rules are still doing real work, and which survive only
because everyone is used to them and nobody has noticed they stopped making
sense. Some of them should not be rebuilt at all. Sometimes the right answer is
to propose something different.

That last part is where the job stops being purely technical. If you have seen
how modern products work, you are often the person in the room best placed to
say what will and will not hold up. Saying so is part of the work, not
overstepping it. It makes an engineer answerable for the product, not only for
the service behind it.

## Convincing people is harder than rewriting anything

Software goes stale faster than anyone plans for. A large system can take two
years to build and another two to settle, by which point it is already behind
the business it was meant to serve. Give it fifteen more and the gap is
structural. It is worse when the system arrived as a boxed product or from an
outside contractor: it never fitted exactly, and bending it further costs more
than anyone wants to spend. Sometimes there is no active development at all. The
thing was built once and has been maintained ever since.

None of this is unusual. It is the ordinary condition of enterprise software,
and I have met some version of it on every project I have worked on.

Diagnosing it is not the difficult part. Convincing the people who live with it
is. Raising the subject is usually met with defensiveness: everything is fine,
this is simply how it works. That is not because anyone is being unreasonable.
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
SDLC. None of this is settled practice yet. Every company is feeling its way,
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
DevOps becoming its own discipline, or the move to cloud and Kubernetes. It is
the largest shift in how software gets built in fifteen years, and arriving late
to it costs something.

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
open question, but in some places, startups especially, it is already the
present rather than the future.

Two directions interest me, and they are further apart than they look.

One is what I do now. Enterprise products, in domains conservative enough that a
great deal is still worth fixing. Real estate has turned out to be exactly that:
old, careful, and full of things nobody has got to yet.

The other is much smaller, and it is the one I keep coming back to. I think one
person can now cover the entire cycle for a small business or a narrow niche:
work out what they actually need, decide what is worth building, and ship it.
Most of the mechanical work can be automated, and what remains is the product
judgement.

The work I have in mind is deliberately unglamorous. Integrations and process
automation for small firms and sole traders, the sort of thing nobody has got
round to because it was never worth a team's time and a licence. It is worth one
person's time now, which is a genuinely new fact about this trade and one I
expect to become unremarkable rather than impressive.

I have not shipped anything of my own yet, and I would rather say so than imply
otherwise. What exists is a direction, some experiments, and one idea I keep
returning to, which is at the end of this page.

Neither of them feels like a change of direction. It is closer to the thing I
picked when I chose a degree that put economics next to software, and to what I
was doing in a room in Singapore with the owners of a company, working out what
to build. The intervening decade taught me how to actually do it.

## Outside the screen

I am a father, and my family comes first. Berlin has been home for years now.

Away from work I read a great deal of psychology. It began as a personal
interest and stayed one, though the distance between it and the rest of this
page is smaller than it looks. Most of what I have written above is about people
and the knowledge they carry without ever writing it down.

This is the idea I keep returning to. Tools for therapists, and for the people
who go to see them: a small, careful niche that needs somebody who understands
both halves of it, and one where a single person can still build the whole
thing. It is the direction described further up this page, pointed at the field
I would most want to spend my own time on. Nothing is built yet.

The rest of my attention goes to the shift this page describes. Moving from
writing code towards business analysis and product work means learning a
different craft: event storming, requirement elicitation, the methods for
turning what a business says into something precise enough to build. That is
what I am reading and practising at the moment.
