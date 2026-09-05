import { readdir, readFile, writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

// Cloudflare supports these HTML comments as an opt-out from email obfuscation.
// Add them after export because JSX does not render HTML comments.
// https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/
const exportDir = fileURLToPath(new URL("../out/", import.meta.url))
let protectedLinks = 0

async function protectDirectory(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await protectDirectory(file)
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const html = await readFile(file, "utf8")
      const updated = html.replace(
        /(?<!<!--email_off-->)<a\b[^>]*\bhref="mailto:[^"]*"[^>]*>[\s\S]*?<\/a>/gi,
        (link) => {
          protectedLinks += 1
          return `<!--email_off-->${link}<!--/email_off-->`
        },
      )
      if (updated !== html) await writeFile(file, updated)
    }
  }
}

await protectDirectory(exportDir)
console.log(`Protected ${protectedLinks} email links from Cloudflare rewriting.`)
