# Choosing the dark palette

The stock Quartz dark theme was uncomfortable to read, and on a page whose only
job is to be read closely by a recruiter that is a functional problem rather
than a matter of taste.

## What was wrong

Two numbers, both measured rather than judged by eye.

The background was `#161618`, a near-black at 0.8% relative luminance, with body
text at `#ebebec`. That is a contrast ratio of **15:1**. AA asks for 4.5, and on
a dark background a ratio that far past it glares: the letters appear to burn
into the page and long prose becomes tiring.

Less obviously, the muted grey `#646464` used for metadata sat at **3.05**,
which only just clears the 3.0 floor for secondary text. The theme was
simultaneously too harsh where it mattered least and too weak where it mattered
most.

## What was chosen

A blue slate, roughly twice as light as the old background.

| role           | old       | new       | new ratio |
| -------------- | --------- | --------- | --------- |
| background     | `#161618` | `#1b212b` | 1.5% lum  |
| body text      | `#ebebec` | `#e8edf4` | 13.7      |
| secondary text | `#d4d4d4` | `#c4cedb` | 10.2      |
| muted text     | `#646464` | `#8996a8` | 5.4       |
| links          | `#7b97aa` | `#93b8e0` | 7.8       |
| rules, borders | `#393639` | `#2f3947` |           |

Light mode was left alone. It was already liked and already contrasty, and the
complaint was only ever about dark mode.

## The option not taken

A neutral graphite variant on `#252a31` was rendered alongside it: lighter
again, and almost without blue. It reads softly and is the better choice for
anyone who still finds the slate dark.

The slate won because the blue tone reads as deliberate. The site already uses
a blue `secondary` in both themes, so a blue-grey background makes the accent
look like part of a scheme, while on neutral graphite the same blue looks
arbitrary.

## Method worth repeating

Compute the contrast ratios first, then render the candidates and look at them.
Neither step replaces the other. The 3.05 on the muted grey was invisible in the
screenshots, and the glare of a 15:1 pairing does not show up in the numbers at
all, because by every standard 15:1 is excellent.

Render a page with code blocks as well as a page of prose. The code block
background and the syntax highlighting come from elsewhere in the theme and can
disagree with a new palette.

Check `cv.pdf` after any palette change. Print styles override the theme through
`:root:root:root` in `custom.scss`, and the Traps section of `CLAUDE.md` records
what it looks like when that override fails.

## One thing still unresolved

Dark mode carries two accent colours that do not belong together: links are blue
`#93b8e0` and the active Explorer entry is green `#8fbcae`, inherited from stock
Quartz. Collapsing them into one blue family would be tidier.
