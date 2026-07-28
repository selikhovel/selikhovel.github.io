/**
 * Links the Quartz plugins listed in quartz.config.yaml into .quartz/plugins
 * and regenerates the barrel module that quartz/components/Head.tsx imports.
 *
 * Quartz v5 ships `npm run install-plugins`, but that script imports the full
 * config through tsx, which cannot load the `.scss` files the core styles pull
 * in, so it crashes before writing the barrel. It also installs plugins by
 * cloning their repositories, and those repositories keep `dist/` untracked —
 * so a clone never contains the build output the loader needs. Installing the
 * plugins from npm instead gives pre-built packages pinned by
 * package-lock.json, and this script points Quartz at them.
 */
import { execFileSync } from "child_process"
import fs from "fs"
import path from "path"
import yaml from "yaml"
import { regeneratePluginIndex } from "../quartz/plugins/loader/gitLoader.ts"

const cfg = yaml.parse(fs.readFileSync("./quartz.config.yaml", "utf-8"))
const sources: string[] = (cfg.plugins ?? [])
  .filter((p: { enabled?: boolean }) => p.enabled !== false)
  .map((p: { source: string }) => p.source)

const cacheDir = path.resolve(".quartz/plugins")
fs.mkdirSync(cacheDir, { recursive: true })

let linked = 0
for (const source of sources) {
  const from = path.resolve(source)
  const to = path.join(cacheDir, path.basename(source))
  if (!fs.existsSync(from)) {
    console.error(`missing plugin: ${source} — run npm ci`)
    process.exitCode = 1
    continue
  }
  fs.rmSync(to, { recursive: true, force: true })
  if (process.platform === "win32") {
    // Junctions need no elevation, unlike symlinks, and Node still reports them
    // as symbolic links — so Quartz's loader leaves them in place instead of
    // deleting and re-creating them mid-build.
    execFileSync("cmd", ["/c", "mklink", "/J", to, from], { stdio: "ignore" })
  } else {
    fs.symlinkSync(from, to, "dir")
  }
  linked++
}

await regeneratePluginIndex({ verbose: false })
console.log(`Linked ${linked} plugins into .quartz/plugins`)
