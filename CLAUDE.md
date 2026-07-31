# CLAUDE.md

Eugene Selikhov's personal site: CV, blog and digital garden, built with Quartz
v5 from an Obsidian vault and deployed to GitHub Pages at
`https://selikhovel.github.io/`.

## Publishing zones — check before writing

The repository is **public**, and part of it is **served as a website**. Two
different exposures, and they are indistinguishable while editing.

| Path               | In git           | On the site            |
| ------------------ | ---------------- | ---------------------- |
| `content/private/` | no — gitignored  | no — `ignorePatterns`  |
| `content/`         | yes, public repo | **yes, a public page** |
| everything else    | yes, public repo | no                     |

Rules:

- Never put personal data, credentials, or anything the user has not chosen to
  publish into `content/` or any tracked file. `notes/` is public too.
- Real email addresses do not belong in `notes/` or commit messages. The CV's
  contact address is the deliberate exception.
- Credentials belong in a password manager, never in a file. A credential that
  reaches a commit must be rotated; deleting the line does not unpublish it.
- When writing to `content/private/`, say plainly that the file is not
  committed, not pushed, and not backed up — it exists on one disk only.

`.claude/hooks/publish-zone-check.mjs` enforces this per write, and the
`publish-check` skill audits a whole change before a push. Neither replaces
thinking about it.

## What the site is for

It exists to attract inbound recruiter interest. Judge changes by whether a
recruiter finds the page and is convinced quickly. That is why the CV page hides
the garden chrome (explorer, graph) via `condition: not-index`, and why SEO
details — canonical URLs, structured data, titles — are treated as functionality
rather than polish.

The positioning is a bridge: the title stays "Senior Backend Engineer", because
that is what recruiters search for and what ten years of history supports, while
the product-engineering direction is shown through the About page and project
write-ups rather than claimed in a job title.

## Commands

```bash
npm ci
npm run build        # links plugins, then builds into public/
npm run build:pdf    # renders public/index.html to public/cv.pdf
npm run check        # tsc + prettier, same as CI
npx quartz build --serve
npx tsx ./scripts/make-avatar.mts <photo>   # regenerates content/avatar.webp
npx tsx ./scripts/make-icon.mts             # regenerates the ES monogram
```

## Layout

- `content/` — the Obsidian vault. `index.md` is the CV and the homepage.
- `quartz.config.yaml` — configuration, plugin list, layout.
- `plugins/seo/` — local plugin: `rel=canonical` and the schema.org `Person`
  graph. Email is deliberately excluded from that graph.
- `plugins/nav/` — local component plugin: the site-wide navigation.
- `scripts/` — plugin linking, PDF rendering, image generation.
- `notes/` — decisions and their reasoning. Public, not published.
- `quartz/` — upstream Quartz. Do not edit except `styles/custom.scss`; the fork
  is otherwise clean so upstream merges stay trivial.

## Traps

Every item below cost an hour of debugging at least once. They all look like
configuration mistakes and are not.

### Content and URLs

**All content paths must be lowercase with dashes.** The link transformer
lowercases hrefs while the emitter preserves the original case, so a markdown
link into `Blog/CSharp and .Net/` resolves to a path that does not exist on a
case-sensitive host. The failure is silent — the build succeeds and the link
404s.

**A moved page cannot be redirected.** Frontmatter `aliases` are lowercased by
the same code, so an alias never reproduces the old mixed-case URL. Renaming
published content breaks its links permanently; weigh that before renaming
anything that search engines have seen.

**Every section folder needs a real `index.md`.** `content-page` refuses any
slug ending in `/index`, so a section page can only come from `folder-page`.
Left to generate a virtual page, `folder-page` renders its listing twice — the
duplicate "1 item under this folder" comes from there. A real index note removes
the duplicate and gives the section prose instead of a file count.

**Do not put an `# H1` at the top of a note.** The `article-title` plugin already
renders the frontmatter title as the page heading; a heading in the body shows up
as a second one.

### Configuration

**`baseUrl` takes no protocol and no trailing slash.** Quartz builds absolute
URLs as `https://${baseUrl}`. A protocol here corrupts every sitemap entry,
canonical link and OG image on the site, and nothing in the build warns about it.

**Plugins come from npm, not Git.** Quartz's documented
`github:quartz-community/*` flow cannot work: those repositories keep `dist/`
untracked and the loader only clones them, never builds them. Install with
`npm install --save-dev @quartz-community/<name>` and reference
`./node_modules/@quartz-community/<name>`. `scripts/link-plugins.mts` links them
into `.quartz/plugins` and writes the barrel module `Head.tsx` imports.

**`note-properties` is the frontmatter parser.** The name suggests a properties
panel. Disable it and every page silently becomes "Untitled" and `draft: true`
stops being honoured.

**Plugin layouts only accept `left`, `right`, `beforeBody`, `afterBody`.** The
default frame has a `header` slot, but it is not exposed to plugin
configuration — `position: header` is accepted and then silently ignored. The
nav sits in `beforeBody` with priority 1 for this reason.

**`@quartz-community/latex` is deliberately absent.** Its published version pins
an older `rehype-typst` than Quartz core, so installing it fails peer resolution.
Nothing here uses maths.

### Styling

**The theme palette is emitted after `custom.scss`.** Overriding a colour
variable therefore needs to outrank `:root[saved-theme="dark"]`; repeating the
selector (`:root:root:root`) is how the print styles do it. Without that, print
output is near-white text on white.

**Hiding a grid child needs the grid fixed too.** `display: none` on the listing
date left its column in place and squeezed titles into an 8em gutter.

### Build and CI

**Link plugins before type-checking.** `quartz/components/Head.tsx` imports the
generated `.quartz/plugins` barrel, so `npm run check` fails on a fresh checkout
until `npm run install-plugins` has run. CI does this in a separate step.

**Windows cannot create symlinks without elevation.** `scripts/link-plugins.mts`
uses junctions there instead; Node reports them as symbolic links, so Quartz's
loader leaves them alone rather than deleting and recreating them mid-build.

### Verifying

**Count occurrences, not lines.** Quartz emits HTML as a single line, so
`grep -c` reports 1 no matter how many times something appears. Use
`grep -o … | wc -l`. This hid a duplicated page listing until it was checked
properly.

**Screenshot before believing the page is fine.** Puppeteer is already a
dependency. Rendering the page caught a duplicated heading, an unreadable print
palette and a collapsed grid column that were all invisible in the HTML.

## Writing

Pages here have to convince a recruiter reading closely, so prose that reads as
model-drafted is a functional defect, not a matter of taste. The `prose-style`
skill holds the house voice, the constructions that give a draft away, and
`.claude/skills/prose-style/audit.mjs`, which measures them and exits non-zero
when a page is over budget. Em dashes are the loudest tell and the budget for
them in running prose is zero.

The rule that carries the most weight is the cheapest one: never write a fact
the user has not given you. Interview instead. A model with no material
generalises, and generalisation is what reads as machine-written.

## Content workflow

One branch, `main`; pushing deploys. Unfinished notes carry `draft: true` in
frontmatter and are dropped from the build, so nothing has to live on a separate
branch. `content/` is excluded from Prettier — notes come from Obsidian and
should not have to satisfy the repo's code formatting.

Deployment depends on two GitHub settings that are not in this repository:
Pages source must be "GitHub Actions", and the `github-pages` environment must
allow deployments from `main`. Both failed the first deploys after the repo was
renamed.
