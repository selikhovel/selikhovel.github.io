#!/usr/bin/env node
/**
 * Keeps CLAUDE.md honest about what this session learned.
 *
 * A hook cannot judge whether a discovery is worth writing down — that is a
 * judgement call. What it can do reliably is notice that a session changed the
 * things that bite (config, plugins, build scripts, CI, the one editable
 * stylesheet) without touching the file that records why, and refuse to let the
 * session end quietly on that combination.
 *
 * Two modes:
 *   start   record the HEAD commit, so the Stop pass knows what this session did
 *   stop    compare, and ask once if the rules were left untouched
 *
 * It asks once per session. Deciding that nothing was worth recording is a
 * legitimate answer, and repeating the question would only train everyone to
 * ignore it.
 */
import { execFileSync } from "child_process"
import fs from "fs"
import os from "os"
import path from "path"

const MODE = process.argv[2]

// Changing any of these means behaviour changed in a way a future session would
// have to rediscover from scratch.
const INFRASTRUCTURE = [
  /^quartz\.config\.yaml$/,
  /^plugins\//,
  /^scripts\//,
  /^\.github\/workflows\//,
  /^quartz\/styles\/custom\.scss$/,
  /^package\.json$/,
  /^\.claude\/hooks\//,
]

const RULES = [/^CLAUDE\.md$/, /^\.claude\/skills\//, /^notes\//]

function emit(result = {}) {
  process.stdout.write(JSON.stringify(result))
  process.exit(0)
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] })
}

let payload = {}
try {
  payload = JSON.parse(fs.readFileSync(0, "utf-8") || "{}")
} catch {
  emit()
}

const sessionId = String(payload.session_id ?? "unknown").replace(/[^A-Za-z0-9_-]/g, "")
const stateFile = path.join(os.tmpdir(), `claude-rules-${sessionId}.json`)

if (MODE === "start") {
  try {
    fs.writeFileSync(stateFile, JSON.stringify({ base: git(["rev-parse", "HEAD"]).trim() }))
  } catch {
    // Not a git repo yet, or git unavailable — nothing to compare against later.
  }
  emit()
}

let state
try {
  state = JSON.parse(fs.readFileSync(stateFile, "utf-8"))
} catch {
  emit() // No baseline: this session started before the hook existed.
}

if (state.asked) emit()

let changed = []
try {
  const committed = git(["diff", "--name-only", `${state.base}..HEAD`])
  const working = git(["status", "--porcelain"]).replace(/^.{3}/gm, "")
  changed = [...committed.split("\n"), ...working.split("\n")].map((l) => l.trim()).filter(Boolean)
} catch {
  emit()
}

if (changed.length === 0) emit()

const touchedInfrastructure = changed.filter((f) => INFRASTRUCTURE.some((re) => re.test(f)))
const touchedRules = changed.some((f) => RULES.some((re) => re.test(f)))

if (touchedInfrastructure.length === 0 || touchedRules) emit()

try {
  fs.writeFileSync(stateFile, JSON.stringify({ ...state, asked: true }))
} catch {
  // If the flag cannot be written, better to ask twice than to fail the hook.
}

emit({
  decision: "block",
  reason:
    `This session changed ${touchedInfrastructure.join(", ")} but left CLAUDE.md, ` +
    `.claude/skills/ and notes/ untouched.\n\n` +
    `If anything was discovered that a future session would otherwise have to work ` +
    `out again — a silent failure, a plugin that does not behave as its name suggests, ` +
    `an ordering or platform constraint — add it to the Traps section of CLAUDE.md, ` +
    `phrased as symptom, cause, and what to do instead. Record a decision and its ` +
    `reasoning in notes/ rather than in Traps.\n\n` +
    `If nothing durable came out of these changes, say so in one line and stop. ` +
    `This is asked once per session.`,
})
