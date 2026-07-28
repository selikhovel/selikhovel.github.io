# selikhovel.github.io

Personal site of Eugene Selikhov — CV, blog and digital garden. Built with
[Quartz v5](https://quartz.jzhao.xyz/) from an Obsidian vault and deployed to
GitHub Pages.

## Layout

| Path                 | What it is                                                        |
| -------------------- | ----------------------------------------------------------------- |
| `content/`           | The Obsidian vault. `index.md` is the CV and the site's homepage. |
| `quartz.config.yaml` | Site configuration, plugin list and layout.                       |
| `plugins/seo/`       | Local plugin: `rel=canonical` and the schema.org `Person` graph.  |
| `scripts/`           | Plugin linking and CV-to-PDF rendering.                           |
| `quartz/`            | Quartz itself, tracked from upstream. Avoid editing.              |

## Working on it

```bash
npm ci
npm run build        # links plugins, then builds into public/
npm run build:pdf    # renders public/index.html to public/cv.pdf
npm run check        # types and formatting, same as CI
npx quartz build --serve
```

Pushing to `main` builds and deploys. Notes that are not ready carry
`draft: true` in their frontmatter and are dropped from the build, so
everything can live on one branch.

`content/` is excluded from Prettier — notes come from Obsidian and should not
have to satisfy the repo's code formatting.

## Plugins

Quartz v5 keeps components and plugins outside the core. This site installs
them from npm (`@quartz-community/*`) rather than through Quartz's Git-based
installer: the plugin repositories keep `dist/` untracked and the installer
does not build them, so a clone never yields a usable plugin. `npm run build`
runs `scripts/link-plugins.mts` first, which links the installed packages into
`.quartz/plugins` and regenerates the barrel module Quartz expects.

To add a plugin: `npm install --save-dev @quartz-community/<name>`, then add
`./node_modules/@quartz-community/<name>` to `plugins:` in `quartz.config.yaml`.

## Upstream

The repository is a fork of [jackyzha0/quartz](https://github.com/jackyzha0/quartz)
with no changes to `quartz/` beyond `styles/custom.scss`, so upstream can be
merged in directly:

```bash
git fetch upstream --tags
git merge v5.x.y
```
