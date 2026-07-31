---
name: prose-style
description: Keep writing on this site from reading as model-drafted. Use when writing or editing anything in content/, when the user asks whether text sounds like AI, or before publishing a note. Covers the house voice, the constructions that give a draft away, and an audit script that measures them.
---

# Prose style

This site exists to convince a recruiter who is reading closely. Text that reads
as generated costs more here than a typo would: it makes the claims on the page
look assembled rather than lived.

Everything below is about removing the signal that a model wrote the page. None
of it is about hiding that a model helped. The method that actually works is the
opposite of hiding. The facts come from the user, the model only arranges them.

## The rule that matters most

**Never invent a fact the user has not said.** No employer, no date, no number,
no anecdote, no motivation, no opinion attributed to them.

This is not only an honesty rule, it is the whole mechanism. A model with no
material generalises, and generalisation is what reads as machine-written. A
page full of things only this person could know reads as human because it is.

When the material runs out, interview. Ask specific questions, in the user's own
language, and wait. The About page was built this way from voice notes, and
every line in it that lands is a line the user supplied.

## Voice

- British spelling. `organisation`, `modelling`, `realise`, `analyse`.
- Plain declaratives. Say the thing, then stop.
- Understatement over emphasis. The strongest sentences on the site are flat.
- Concrete before abstract. A fifteen-year-old system, not "legacy complexity".
- Admit cost and limits. "I left earlier than I would have chosen" is worth more
  than any confident claim near it.
- Let a paragraph end without resolving. Not every point needs its conclusion
  stated.

## Three levels of tell

Level 3 is the one that decides whether the text reads as human. Levels 1 and 2
are cheap to fix and cheap to check, which is why the script only checks those.

### 1. Vocabulary

`delve, leverage, utilise, robust, seamless, crucial, pivotal, testament to,
landscape, realm, tapestry, underscore, myriad, plethora, harness, foster,
embark, unlock, elevate, game-changer, cutting-edge, state-of-the-art, navigate
the complexities, in today's fast-paced world, at the end of the day, moreover,
furthermore, in conclusion, in short, ultimately`

Banning these is necessary and nowhere near sufficient. Prose can avoid every
word on the list and still be obviously generated.

### 2. Syntax and rhythm

- **Em and en dashes.** The loudest single tell. Budget on this site is zero.
  Replace with a full stop, a comma, or a colon, and vary which. Swapping every
  dash for a colon just moves the pattern.
- **Negation reversal.** "It's not just X, it's Y." "That's not a bug. That's a
  feature." Currently the most recognisable construction in generated text.
- **Triads.** "clean, scalable and maintainable." Two items, or four.
- **Uniform sentence length.** Models cluster at 15 to 20 words. Human essays run
  4 words next to 40. Standard deviation below 7 is a failure.
- **Uniform paragraph size.** Every paragraph three or four sentences.
- **Summary sentence closing each section.** Usually deletable, and usually
  should be deleted.
- **Bold phrases mid-paragraph**, and bullet lists with bold lead-ins.
- **Rhetorical questions.** "So what does this mean?" Not in an essay.
- **Perfect parallelism.** Real symmetry breaks somewhere.

### 3. Content

No script detects these. They are what makes the difference.

- **Checkable specifics.** Names, numbers, dates, places. "MetaTrader 4",
  "fifteen years", "Kaliningrad".
- **A claim with a cost.** Something a committee would soften. If every sentence
  would survive review by everyone, a model wrote it.
- **Failure and uncertainty**, stated plainly and not converted into a lesson.
- **One detail that does not serve the argument.** Generated text is too tidy.
- **Jargon used, not explained.** People do not gloss their own field.

## Working method

1. Get raw material from the user first. Voice notes, half-sentences, anything.
2. Arrange, cut and connect. Do not add.
3. Where a fact is missing, ask rather than fill.
4. Delete the last sentence of each section and check whether anything was lost.
5. Run the audit.
6. Read the result aloud. Where you stumble is where the model smoothed it.

Never respond to "make it sound human" by adding contractions, `Look,`,
`Honestly,` or fake asides. That trades one costume for another, and the second
one is worse.

## Audit

```bash
node .claude/skills/prose-style/audit.mjs content/about.md
node .claude/skills/prose-style/audit.mjs content/**/*.md
```

Exits non-zero when a budget is exceeded, so it can gate a commit. It reports
counts per 100 words against budgets measured from this site's own pages, plus
sentence and paragraph rhythm, and prints file:line for every hit.

Two things it deliberately does not do.

**It does not flag typographic dashes.** `### Role — Company` and
`**English** — Native` on the CV are layout separators, not rhetoric. Lines that
look like separators are excluded. Dashes in running prose are not.

**It does not judge rhythm on bullet-heavy files.** The CV is a list, not an
essay; sentence statistics there are meaningless and are skipped.

Both the marker list and the negation-reversal pattern produce false positives.
`leverage` as a noun is fine. A deliberate "It is not X. It is Y." used once for
emphasis is fine. The script raises candidates; deciding is still the job.

## What to fix silently and what to raise

Fix without asking: dashes, marker words, triads, rhythm, bold runs, summary
sentences. These are mechanical and the rules above are settled.

Raise with the user: anything at level 3. Missing specifics cannot be fixed by
editing, because the fix is a fact only they have. Ask for it.
