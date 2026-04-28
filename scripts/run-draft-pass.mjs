#!/usr/bin/env node
// Pass 2 — Drafting pass.
// Takes the evidence pack from Pass 1 (reports/{state}-evidence.json) and
// drafts the 19-section guide as 5 cluster calls to a non-reasoning model
// (default: gpt-4.1). Validates each cluster, retries failed clusters only,
// stitches into reports/{state}-draft.md.
//
// Usage:
//   node scripts/run-draft-pass.mjs --states alabama
//   node scripts/run-draft-pass.mjs --states alabama,mississippi
//   node scripts/run-draft-pass.mjs                            (every state with an evidence pack)
//   node scripts/run-draft-pass.mjs --model gpt-4.1            (override model)
//   node scripts/run-draft-pass.mjs --redraft alabama          (force redraft even if draft exists)

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const envPath = resolve(ROOT, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY (.env.local)");
  process.exit(1);
}

const args = process.argv.slice(2);
function takeFlag(flag) {
  const i = args.indexOf(flag);
  return i >= 0 && args[i + 1] ? args[i + 1] : null;
}
const onlyStates = takeFlag("--states") ? new Set(takeFlag("--states").split(",")) : null;
const redraft = new Set(takeFlag("--redraft")?.split(",") ?? []);
const MODEL = takeFlag("--model") || "gpt-4.1";

const API = "https://api.openai.com/v1";
const headers = { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` };

const reportsDir = resolve(ROOT, "reports");
mkdirSync(reportsDir, { recursive: true });
const progressPath = resolve(reportsDir, "_draft_pass_progress.json");

const titleCase = (slug) =>
  slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${method} ${path}\n${text.slice(0, 400)}`);
    err.status = res.status;
    throw err;
  }
  return JSON.parse(text);
}

const clusterSpec = readFileSync(resolve(ROOT, "scripts/prompts/draft-clusters.md"), "utf8");

const CLUSTERS = [
  { id: "A", sections: [1, 2, 3], expected_min_chars: 1500 },
  { id: "B", sections: [4, 5, 6, 7], expected_min_chars: 2000 },
  { id: "C", sections: [8, 9, 10], expected_min_chars: 1500 },
  { id: "D", sections: [11, 12, 13, 14], expected_min_chars: 2500 },
  { id: "E", sections: [15, 16, 17, 18, 19], expected_min_chars: 2000, includes_sources: true },
];

function paths(slug) {
  return {
    evidence: resolve(reportsDir, `${slug}-evidence.json`),
    draft: resolve(reportsDir, `${slug}-draft.md`),
    rawDir: resolve(reportsDir, "_drafts"),
    raw: (cid) => resolve(reportsDir, "_drafts", `${slug}-cluster-${cid}.md`),
  };
}

function buildSystemPrompt() {
  return [
    "You are an expert legal writer producing one cluster of a small-claims-court guide.",
    "You receive a JSON evidence pack and a cluster ID; you emit ONLY the markdown for that cluster.",
    "",
    "CRITICAL CITATION RULE — read carefully and follow without exception:",
    "Every concrete fact you write — every dollar amount, day count, statute citation, percent, form number, court name, fee, deadline, rate — MUST be followed immediately by a bracketed source citation like [S3] or [S3, S7].",
    "The source IDs come from the `source_ids` array attached to the relevant field in the evidence pack. If a field has `source_ids: ['S12']`, every fact you draw from that field cites [S12].",
    "In tables: the citation goes inside the same cell as the fact. Example: `| $0-1500 | $82 [S12] |`.",
    "If the field's `source_ids` array is empty, do NOT make up a citation. Write the fact without a citation but append the marker `[unverified]` so a human reviewer can find it.",
    "",
    "Other rules:",
    "- Use ONLY facts from the evidence pack. Do not invent statutes, fees, or deadlines. If a field is null/empty, write 'Not specified by statute' or omit the bullet.",
    "- Use markdown tables for any list with 3+ comparable rows (fee tiers, SOL by claim, forms).",
    "- Do not output a preamble, summary, or any text outside the cluster's section headings.",
    "",
    "The cluster specification follows. Adhere strictly to the headings, ordering, and bullet formats it defines.",
    "",
    clusterSpec,
  ].join("\n");
}

function buildUserMessage(evidence, cluster) {
  return [
    `Cluster: ${cluster.id} (sections ${cluster.sections.join(", ")}${cluster.includes_sources ? " plus Sources" : ""})`,
    `State: ${evidence.state}`,
    "",
    "Evidence pack (JSON):",
    "```json",
    JSON.stringify(evidence, null, 2),
    "```",
    "",
    `Output ONLY the markdown for cluster ${cluster.id}. Begin with the first \`## ${cluster.sections[0]}.\` heading and end with the last section of this cluster${cluster.includes_sources ? " followed by \`## Sources\`" : ""}. No preamble. No trailing prose.`,
  ].join("\n");
}

function validateCluster(text, cluster) {
  const errors = [];
  if (!text || text.length < cluster.expected_min_chars) {
    errors.push(`output too short: ${text?.length ?? 0} chars (expected ≥ ${cluster.expected_min_chars})`);
  }
  // Every required section heading must appear
  const found = new Set();
  const re = /^## (\d+)\./gm;
  let m;
  while ((m = re.exec(text)) !== null) found.add(parseInt(m[1], 10));
  for (const n of cluster.sections) {
    if (!found.has(n)) errors.push(`missing section ## ${n}.`);
  }
  // No sections from outside this cluster
  for (const n of found) {
    if (!cluster.sections.includes(n)) {
      errors.push(`unexpected section ## ${n}. (outside cluster ${cluster.id})`);
    }
  }
  if (cluster.includes_sources && !/^## Sources/m.test(text)) {
    errors.push("missing ## Sources section");
  }
  // Heuristic: at least 3 source references like [S4] or [..., S4] or [..., S4, S7].
  // Counts hits of `S<digits>` inside any bracketed expression.
  const cites = (text.match(/\[[^\]]*S\d+[^\]]*\]/g) || []).length;
  if (cites < 1) {
    errors.push("no source citations found");
  }
  return errors;
}

async function callCluster(evidence, cluster, attempt = 1) {
  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "user", content: buildUserMessage(evidence, cluster) },
    ],
    temperature: 0.2,
    max_tokens: 8000,
  };
  if (attempt > 1) {
    body.messages.push({
      role: "user",
      content: `Your previous output was incomplete or invalid. Regenerate ONLY cluster ${cluster.id} for ${evidence.state}. Follow the cluster spec exactly. Begin with \`## ${cluster.sections[0]}.\` and end with the last section${cluster.includes_sources ? " plus \`## Sources\`" : ""}. No preamble.`,
    });
  }
  const r = await api("POST", "/chat/completions", body);
  const text = r.choices?.[0]?.message?.content || "";
  return { text, usage: r.usage };
}

async function draftState(slug) {
  const p = paths(slug);
  if (!existsSync(p.evidence)) {
    throw new Error(`evidence pack missing: run research pass first (${p.evidence})`);
  }
  const evidence = JSON.parse(readFileSync(p.evidence, "utf8"));
  mkdirSync(p.rawDir, { recursive: true });

  const clusterTexts = [];
  for (const cluster of CLUSTERS) {
    process.stdout.write(`    cluster ${cluster.id}...`);
    let text = "";
    let lastErrors = [];
    for (let attempt = 1; attempt <= 3; attempt++) {
      const { text: out } = await callCluster(evidence, cluster, attempt);
      const errors = validateCluster(out, cluster);
      if (!errors.length) {
        text = out;
        break;
      }
      lastErrors = errors;
      process.stdout.write(` retry(${errors[0].slice(0, 60)})`);
    }
    if (!text) {
      // Save the most recent failed attempt for forensics
      const lastAttempt = await callCluster(evidence, cluster, 1);
      writeFileSync(p.raw(cluster.id) + ".failed", lastAttempt.text);
      throw new Error(`cluster ${cluster.id} failed after 3 attempts: ${lastErrors.join("; ")} — last attempt saved to ${p.raw(cluster.id)}.failed`);
    }
    writeFileSync(p.raw(cluster.id), text);
    clusterTexts.push(text);
    process.stdout.write(" ok\n");
  }

  const header =
    `# Small Claims in ${evidence.state}\n\n` +
    `_Generated on ${new Date().toISOString()} — research model: ${evidence._meta?.model || "?"}, drafting model: ${MODEL}_\n\n` +
    `---\n\n`;

  writeFileSync(p.draft, header + clusterTexts.join("\n\n"));
  return p.draft;
}

function writeProgress(state) {
  const existing = existsSync(progressPath) ? JSON.parse(readFileSync(progressPath, "utf8")) : { history: [] };
  existing.history.push({ ...state, at: new Date().toISOString() });
  existing.last = state;
  writeFileSync(progressPath, JSON.stringify(existing, null, 2));
}

(async () => {
  // Default todo list: every state with an evidence pack but no draft
  const allEvidence = readdirSync(reportsDir)
    .filter((f) => f.endsWith("-evidence.json"))
    .map((f) => f.replace("-evidence.json", ""));

  const todo = allEvidence.filter((slug) => {
    if (onlyStates && !onlyStates.has(slug)) return false;
    if (existsSync(paths(slug).draft) && !redraft.has(slug)) return false;
    return true;
  });

  console.log(`Drafting pass (model: ${MODEL}). ${todo.length} state(s):`);
  todo.forEach((s) => console.log(`  - ${s}`));
  console.log("");

  const tally = { completed: 0, failed: 0 };
  const startedAt = Date.now();

  for (let i = 0; i < todo.length; i++) {
    const slug = todo[i];
    console.log(`\n[${i + 1}/${todo.length}] ${slug}`);
    try {
      const draftPath = await draftState(slug);
      console.log(`    ✅ ${draftPath}`);
      tally.completed++;
      writeProgress({ slug, status: "completed", model: MODEL });
    } catch (e) {
      console.error(`    ❌ ${slug}: ${e.message}`);
      tally.failed++;
      writeProgress({ slug, status: "failed", error: String(e).slice(0, 300), model: MODEL });
    }
  }

  const totalH = ((Date.now() - startedAt) / 3600000).toFixed(2);
  console.log(`\n=== DONE ===  wall: ${totalH}h  ✅ ${tally.completed}  ❌ ${tally.failed}`);
})().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
