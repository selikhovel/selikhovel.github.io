#!/usr/bin/env node
/**
 * PreToolUse guard for Write/Edit.
 *
 * This repository publishes part of itself to the open internet and keeps
 * another part deliberately untracked, and the two look identical while you are
 * editing them. This hook names the zone on every write, and stops to ask when
 * a write would put a new email address or a credential into something public.
 *
 * Zones:
 *   content/private/  gitignored + excluded from the build — not committed,
 *                     not backed up, not synced anywhere
 *   content/          published at https://selikhovel.github.io/
 *   everything else   committed to a public GitHub repository
 */
import fs from "fs"
import path from "path"

const EMAIL = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g

const SECRETS = [
  [/\bghp_[A-Za-z0-9]{20,}/, "GitHub personal access token"],
  [/\bgithub_pat_[A-Za-z0-9_]{20,}/, "GitHub fine-grained token"],
  [/\bsk-[A-Za-z0-9-]{20,}/, "API secret key"],
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key id"],
  [/-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/, "private key"],
]

// Addresses that are already public by design and carry no new information.
const KNOWN_PUBLIC = [/@example\./i, /noreply@/i, /@quartz/i]

function readStdin() {
  try {
    return fs.readFileSync(0, "utf-8")
  } catch {
    return ""
  }
}

function emit(result) {
  process.stdout.write(JSON.stringify(result))
  process.exit(0)
}

const raw = readStdin()
if (!raw.trim()) emit({})

let payload
try {
  payload = JSON.parse(raw)
} catch {
  emit({})
}

const input = payload.tool_input ?? {}
const filePath = input.file_path
if (!filePath) emit({})

const repoRoot = process.cwd()
const relative = path.relative(repoRoot, filePath).split(path.sep).join("/")

// Writes outside the repository are none of this hook's business.
if (relative.startsWith("..") || path.isAbsolute(relative)) emit({})

const inPrivate = relative.startsWith("content/private/")
const inContent = relative.startsWith("content/") && !inPrivate
const isPublic = !inPrivate

// Write sends `content`; Edit sends `new_string`. Only the incoming text is
// scanned — flagging what is already in the file would fire on every edit.
const incoming = input.content ?? input.new_string ?? ""

let existing = ""
try {
  existing = fs.readFileSync(filePath, "utf-8")
} catch {
  // New file; nothing already approved.
}

const findings = []

if (isPublic && incoming) {
  const alreadyThere = new Set(existing.match(EMAIL) ?? [])
  const introduced = [...new Set(incoming.match(EMAIL) ?? [])].filter(
    (address) => !alreadyThere.has(address) && !KNOWN_PUBLIC.some((re) => re.test(address)),
  )
  for (const address of introduced) {
    findings.push(`email address "${address}"`)
  }
  for (const [pattern, label] of SECRETS) {
    if (pattern.test(incoming) && !pattern.test(existing)) {
      findings.push(label)
    }
  }
}

if (findings.length > 0) {
  const destination = inContent
    ? `${relative}, which is published at https://selikhovel.github.io/`
    : `${relative} in a public GitHub repository`
  emit({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "ask",
      permissionDecisionReason:
        `This write puts ${findings.join(" and ")} into ${destination}.\n` +
        `Confirm this is meant to be public. Personal notes belong in content/private/, ` +
        `and credentials belong in a password manager rather than any file.`,
    },
  })
}

if (inPrivate) {
  emit({
    systemMessage:
      `${relative} is in content/private/ — gitignored and excluded from the build. ` +
      `It will not be committed, pushed, backed up, or synced to any other machine. ` +
      `It exists only on this disk.`,
  })
}

if (inContent) {
  emit({
    systemMessage: `${relative} is published to the public site at https://selikhovel.github.io/.`,
  })
}

emit({})
