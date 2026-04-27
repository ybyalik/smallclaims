#!/usr/bin/env node
// OpenAI Deep Research runner — uses o3-deep-research-2025-06-26 in background mode.
// Mirrors run-deep-research.mjs (Gemini) so the two outputs can be compared.
//
// Usage:
//   node scripts/run-openai-deep-research.mjs <state>
//   node scripts/run-openai-deep-research.mjs california --resume

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// .env.local
const envPath = resolve(ROOT, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY (set in .env.local)");
  process.exit(1);
}

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const state = positional[0];
const resume = args.includes("--resume");
const modelArg = args.find((a) => a.startsWith("--model="));
const MODEL = modelArg ? modelArg.split("=")[1] : "o3-deep-research-2025-06-26";
if (!state) {
  console.error("Usage: node scripts/run-openai-deep-research.mjs <state> [--model=<id>] [--resume]");
  console.error("Default model: o3-deep-research-2025-06-26");
  console.error("Faster:        --model=o4-mini-deep-research-2025-06-26");
  process.exit(1);
}

const stateTitle = state[0].toUpperCase() + state.slice(1).toLowerCase();
const reportsDir = resolve(ROOT, "reports");
mkdirSync(reportsDir, { recursive: true });

const slug = state.toLowerCase();
// Distinguish o3 vs o4-mini in filenames so multiple runs don't collide
const modelTag = MODEL.includes("o4-mini") ? "openai-o4mini" : "openai";
const reportPath = resolve(reportsDir, `${slug}-${modelTag}.md`);
const idPath = resolve(reportsDir, `${slug}-${modelTag}.id`);
const metaPath = resolve(reportsDir, `${slug}-${modelTag}.json`);
const rawPath = resolve(reportsDir, `${slug}-${modelTag}.raw.json`);

const promptTemplate = readFileSync(
  resolve(ROOT, "scripts/prompts/state-research.md"),
  "utf8"
);
const userPrompt = promptTemplate.replaceAll("{STATE}", stateTitle);

const developerPrompt = `You are a professional legal research analyst producing a comprehensive, citation-rich, plain-English guide for non-lawyers. Use the web_search_preview tool extensively to verify every dollar amount, deadline, statute citation, and form number against authoritative .gov sources (state courts, statutes, judicial council). Cite specific code sections inline. Where authoritative sources conflict or are silent, flag it explicitly. Do not summarize away detail — the goal is exhaustiveness, not brevity. Produce well-structured Markdown with H2 sections matching the requested numbered outline.`;

const API = "https://api.openai.com/v1";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${method} ${path}\n${text}`);
  }
  return JSON.parse(text);
}

async function createResponse() {
  console.log(`Submitting OpenAI Deep Research (${MODEL}) for ${stateTitle}…`);
  const body = {
    model: MODEL,
    input: [
      { role: "developer", content: [{ type: "input_text", text: developerPrompt }] },
      { role: "user", content: [{ type: "input_text", text: userPrompt }] },
    ],
    reasoning: { summary: "detailed" },
    tools: [
      { type: "web_search_preview" },
      { type: "code_interpreter", container: { type: "auto" } },
    ],
    background: true,
    store: true,
  };
  const r = await api("POST", "/responses", body);
  console.log(`  response id: ${r.id}`);
  console.log(`  status:      ${r.status}`);
  writeFileSync(idPath, r.id);
  return r.id;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function poll(id) {
  const startedAt = Date.now();
  let lastStatus = "";
  let dots = 0;
  while (true) {
    const elapsed = ((Date.now() - startedAt) / 60000).toFixed(1);
    let r;
    try {
      r = await api("GET", `/responses/${id}`);
    } catch (e) {
      console.error(`\npoll error: ${e.message}`);
      await sleep(30000);
      continue;
    }
    if (r.status !== lastStatus) {
      process.stdout.write(`\n[${elapsed}m] status=${r.status}`);
      lastStatus = r.status;
      dots = 0;
    } else {
      process.stdout.write(".");
      if (++dots % 20 === 0) process.stdout.write(` [${elapsed}m]`);
    }

    if (r.status === "completed") {
      console.log("\n— done —");
      return r;
    }
    if (r.status === "failed" || r.status === "cancelled" || r.status === "expired") {
      console.log("\n— terminated —");
      console.log(JSON.stringify(r.error || r.incomplete_details || {}, null, 2));
      process.exit(2);
    }
    if (Date.now() - startedAt > 90 * 60 * 1000) {
      console.log("\nTimed out after 90 min. Re-run with --resume to keep polling.");
      process.exit(3);
    }
    await sleep(30000);
  }
}

function extractText(result) {
  // Concat ALL message text outputs in order. Deep Research can self-continue
  // across multiple messages on long runs (model hits a per-response output
  // cap and continues itself).
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
  return parts.length ? parts.join("\n\n") : null;
}

function extractAnnotations(result) {
  for (let i = (result.output || []).length - 1; i >= 0; i--) {
    const o = result.output[i];
    if (o.type === "message" && Array.isArray(o.content)) {
      const t = o.content.find((c) => (c.type === "output_text" || c.type === "text") && Array.isArray(c.annotations));
      if (t) return t.annotations;
    }
  }
  return [];
}

(async () => {
  let id;
  if (resume && existsSync(idPath)) {
    id = readFileSync(idPath, "utf8").trim();
    console.log(`Resuming poll on ${id}`);
  } else {
    id = await createResponse();
  }

  const result = await poll(id);
  writeFileSync(rawPath, JSON.stringify(result, null, 2));
  console.log(`Raw response saved: ${rawPath}`);

  const text = extractText(result);
  if (!text) {
    console.error("No text output found.");
    process.exit(4);
  }

  const header = `# Small Claims in ${stateTitle} (${MODEL})\n\n_Generated on ${new Date().toISOString()}_\n\n---\n\n`;
  writeFileSync(reportPath, header + text);

  const annotations = extractAnnotations(result);
  writeFileSync(
    metaPath,
    JSON.stringify(
      {
        id,
        state: stateTitle,
        model: MODEL,
        usage: result.usage || null,
        annotationCount: annotations.length,
        outputSteps: (result.output || []).length,
        completedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );

  console.log(`\nReport saved: ${reportPath}`);
  console.log(`Meta saved:   ${metaPath}`);
  console.log(`Citations:    ${annotations.length}`);
  if (result.usage) console.log(`Usage:        ${JSON.stringify(result.usage)}`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
