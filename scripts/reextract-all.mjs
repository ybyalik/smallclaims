#!/usr/bin/env node
// One-off fix: re-extract every <state>-openai.md from its <state>-openai.raw.json
// using a corrected extractor that concatenates ALL message text outputs in order.
// The original extractor only grabbed the last message, so reports with multi-message
// responses (caused by per-response output cap on long Deep Research runs) were truncated.

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const REPORTS = "/Users/yurybyalik/Desktop/legal/smallclaims/reports";

function extractAllText(result) {
  const parts = [];
  for (const o of result.output || []) {
    if (o.type === "message" && Array.isArray(o.content)) {
      for (const c of o.content) {
        if ((c.type === "output_text" || c.type === "text") && c.text) {
          parts.push(c.text);
        }
      }
    }
  }
  return parts.join("\n\n");
}

const files = readdirSync(REPORTS).filter((f) => f.endsWith("-openai.raw.json"));

let fixed = 0;
for (const f of files) {
  const slug = f.replace(/-openai\.raw\.json$/, "");
  const raw = JSON.parse(readFileSync(resolve(REPORTS, f), "utf8"));
  const allText = extractAllText(raw);
  if (!allText) continue;

  const mdPath = resolve(REPORTS, `${slug}-openai.md`);
  const oldText = existsSync(mdPath) ? readFileSync(mdPath, "utf8") : "";

  // Reconstruct with header
  const stateTitle = slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
  const header = `# Small Claims in ${stateTitle} (o3-deep-research-2025-06-26)\n\n_Re-extracted on ${new Date().toISOString()}_\n\n---\n\n`;
  const newText = header + allText;

  // Skip if nothing meaningful changed
  if (oldText.length >= newText.length - 200) {
    console.log(`  ${slug}: already complete (${oldText.length} chars)`);
    continue;
  }

  writeFileSync(mdPath, newText);
  console.log(
    `✅ ${slug}: ${oldText.length} → ${newText.length} chars (+${newText.length - oldText.length})`
  );
  fixed++;
}
console.log(`\nDone. Fixed ${fixed} files.`);
