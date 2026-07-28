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
the garden chrome (explorer, graph, backlinks) via `condition: not-index`, and
why SEO details — canonical URLs, structured data, titles — are treated as
functionality rather than polish.

## Commands

```bash
npm ci
npm run build        # links plugins, then builds into public/
npm run build:pdf    # renders public/index.html to public/cv.pdf
npm run check        # tsc + prettier, same as CI
npx quartz build --serve
```

`npm run check` fails on a fresh checkout unless plugins are linked first —
`quartz/components/Head.tsx` imports the generated `.quartz/plugins` barrel.

## Layout

- `content/` — the Obsidian vault. `index.md` is the CV and the homepage.
- `quartz.config.yaml` — configuration, plugin list, layout.
- `plugins/seo/` — local plugin: `rel=canonical` and the schema.org `Person`
  graph. Email is deliberately excluded from that graph.
- `scripts/` — plugin linking and PDF rendering.
- `notes/` — decisions and their reasoning. Public, not published.
- `quartz/` — upstream Quartz. Do not edit except `styles/custom.scss`; the
  fork is otherwise clean so upstream merges stay trivial.

## Quartz v5 traps

Two failure modes here look like configuration mistakes and are not:

1. **Plugins come from npm, not Git.** Quartz's documented
   `github:quartz-community/*` flow cannot work: those repositories keep
   `dist/` untracked and the loader only clones them. Add a plugin with
   `npm install --save-dev @quartz-community/<name>` and reference it as
   `./node_modules/@quartz-community/<name>`.
2. **`note-properties` is the frontmatter parser.** Despite the name, disabling
   it does not just hide a properties panel — every page silently becomes
   "Untitled" and `draft: true` stops being honoured.

## Content workflow

One branch, `main`; pushing deploys. Unfinished notes carry `draft: true` in
frontmatter and are dropped from the build, so nothing has to live on a
separate branch. `content/` is excluded from Prettier — notes come from
Obsidian and should not have to satisfy the repo's code formatting.
