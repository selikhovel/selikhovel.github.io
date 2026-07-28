---
name: publish-check
description: Audit what is about to become public before committing, pushing, or deploying this site — personal data in tracked files, private notes that lost their gitignore cover, and anything unintended in the built output. Use when the user is about to push or deploy, asks to check for leaks, or asks what will be published.
---

# Publish check

This repository is public and part of it is served at
`https://selikhovel.github.io/`. The per-write hook
(`.claude/hooks/publish-zone-check.mjs`) catches one file at a time. This skill
checks the whole change before it leaves the machine.

Report findings; do not silently fix them. Which address or note is meant to be
public is the user's call, not yours.

## 1. What is actually about to be published

```bash
git status --short
git diff --cached --stat
git diff origin/main..HEAD --stat
```

Anything under `content/` becomes a public web page. Anything else is still
public — it is a public repository — but is not served as a page.

## 2. Personal data in tracked files

Search the changed files, not the whole history:

```bash
git diff origin/main..HEAD -U0 | grep -nE "^\+" | grep -nEi "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|ghp_|github_pat_|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|BEGIN [A-Z ]*PRIVATE KEY"
```

For each hit, decide with the user:

- An email deliberately on the CV is fine — that is its job.
- An email in `notes/`, a commit message, or a config comment is usually a
  mistake. `notes/README.md` states the rule: no real addresses there.
- Any credential is never fine. It belongs in a password manager, and if it has
  already been pushed it must be rotated — deleting the line does not unpublish
  it, the commit keeps it.

## 3. Private notes still covered

`content/private/` is protected by `.gitignore` and by `ignorePatterns` in
`quartz.config.yaml`. Both must hold — the first keeps it out of git, the second
keeps it out of the build.

```bash
git check-ignore -v content/private/probe.md
grep -A4 ignorePatterns quartz.config.yaml
git ls-files content/private/
```

The last command must print nothing. If it prints anything, that file is
tracked despite the ignore rule (`.gitignore` does not apply to files already
added) and the user needs to know before it is pushed.

## 4. The built output

The build is the ground truth for what the site exposes:

```bash
npm run build
grep -ril "private\|confidential" public/ | head
ls public/
```

Confirm that notes marked `draft: true` produced no HTML file, and that nothing
from `content/private/` appears.

## 5. Report

State plainly what will be published, what looks unintended and why, and what
needs the user's decision. If nothing is wrong, say so in one line rather than
listing every check that passed.
