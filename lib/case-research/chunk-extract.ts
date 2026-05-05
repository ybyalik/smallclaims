// Chunked extraction of structured fields from a long deep-research narrative.
//
// Why: gpt-5-mini's 400k-token context window comfortably fits the deep
// narrative (~60-100k tokens) but recall on dense multi-field extraction
// degrades past ~70k tokens. The OpenAI cookbook recommends chunk-and-merge
// even when the document fits, because each chunk gets the model's full
// attention and citations stay anchored to the right region.
//
// Pattern:
//   1. Split the narrative at H2 boundaries — the deep research prompt
//      enforces 21 numbered sections, so this is reliable.
//   2. Run the same extraction schema on each chunk.
//   3. Merge: pick the most-populated value per field, concatenate arrays
//      with dedup, union the sources list.

import { MODEL, structuredJson } from "./openai";
import {
  EVIDENCE_PACK_NO_CLASSIFICATION_SCHEMA,
  type EvidencePack,
  type IntakeSnapshot,
  type Classification,
} from "./agents";

type ExtractedPack = Omit<EvidencePack, "classification">;

interface ChunkExtractResult {
  data: EvidencePack;
  costCents: number;
  model: string;
  meta: {
    chunks: number;
    chars_total: number;
    chars_per_chunk: number[];
    fields_filled: number;
    sources_total: number;
  };
}

const MAX_CHARS_PER_CHUNK = 60_000; // ~15k tokens — under the 70k recall cliff

export async function extractStructuredPackChunked(
  narrative: string,
  intake: IntakeSnapshot,
  classification: Classification,
): Promise<ChunkExtractResult> {
  const chunks = splitNarrativeIntoChunks(narrative, MAX_CHARS_PER_CHUNK);

  // Edge case: narrative is small enough to extract in one pass anyway.
  if (chunks.length <= 1) {
    const single = await extractFromChunk(chunks[0] ?? narrative, intake, classification, {
      isWhole: true,
    });
    return {
      data: assembleFinal(single.data, classification),
      costCents: single.costCents,
      model: single.model,
      meta: {
        chunks: 1,
        chars_total: narrative.length,
        chars_per_chunk: [narrative.length],
        fields_filled: countFilled(single.data),
        sources_total: single.data.sources.length,
      },
    };
  }

  // Map: extract from each chunk in parallel
  const results = await Promise.all(
    chunks.map((c) =>
      extractFromChunk(c, intake, classification, { isWhole: false }),
    ),
  );

  const totalCost = results.reduce((s, r) => s + r.costCents, 0);
  const partials = results.map((r) => r.data);

  // Reduce: merge partials field-by-field
  const merged = mergePartialPacks(partials);

  return {
    data: assembleFinal(merged, classification),
    costCents: totalCost,
    model: MODEL.FAST,
    meta: {
      chunks: chunks.length,
      chars_total: narrative.length,
      chars_per_chunk: chunks.map((c) => c.length),
      fields_filled: countFilled(merged),
      sources_total: merged.sources.length,
    },
  };
}

// Split the narrative at H2 boundaries, batching consecutive small sections
// up to MAX_CHARS_PER_CHUNK each.
function splitNarrativeIntoChunks(narrative: string, maxChars: number): string[] {
  const sections = splitByH2(narrative);
  if (sections.length === 0) return [narrative];

  const chunks: string[] = [];
  let buf = "";
  for (const sec of sections) {
    if (buf.length + sec.length <= maxChars) {
      buf += sec;
    } else {
      if (buf.length > 0) chunks.push(buf);
      // If a single section exceeds the budget, hard-split it.
      if (sec.length > maxChars) {
        for (let i = 0; i < sec.length; i += maxChars) {
          chunks.push(sec.slice(i, i + maxChars));
        }
        buf = "";
      } else {
        buf = sec;
      }
    }
  }
  if (buf.length > 0) chunks.push(buf);
  return chunks;
}

function splitByH2(narrative: string): string[] {
  const lines = narrative.split("\n");
  const out: string[] = [];
  let current = "";
  for (const line of lines) {
    if (/^##\s/.test(line) && current.length > 0) {
      out.push(current);
      current = `${line}\n`;
    } else {
      current += `${line}\n`;
    }
  }
  if (current.length > 0) out.push(current);
  return out;
}

async function extractFromChunk(
  chunk: string,
  intake: IntakeSnapshot,
  classification: Classification,
  opts: { isWhole: boolean },
): Promise<{ data: ExtractedPack; costCents: number; model: string }> {
  const wholeOrChunk = opts.isWhole
    ? "the entire research narrative"
    : "ONE SECTION of a longer research narrative — other sections are extracted separately";

  const prompt = `You are extracting structured fields from ${wholeOrChunk}.

CASE CONTEXT (orientation only)
- State: ${intake.state}
- Plaintiff's county: ${intake.plaintiffCounty ?? "(unknown)"}
- Defendant's county: ${intake.defendantCounty ?? "(unknown)"}
- Incident county: ${intake.incidentCounty ?? "(unknown)"}
- Claim category: ${classification.claim_category}
- Amount: $${(intake.amountCents / 100).toFixed(2)}

CHUNK TO EXTRACT FROM
${chunk}

EXTRACTION RULES
- Pull every field defined in the schema.
- If this chunk does not address a field, leave the field as a sensible empty default (empty string, empty array, null) — do not fabricate values from outside this chunk.
- Strings: return "" if the chunk doesn't say.
- Numbers: return null if the chunk doesn't say.
- Arrays: return [] if the chunk doesn't say.
- Sources: include ONLY sources actually cited in this chunk. Fields: url, title, domain (extracted from URL), and a 1-3 word "cited_for" tag.
- Unknowns: list things the chunk explicitly flags as unknown.

The downstream system merges your output with extractions from other chunks. Returning empty defaults for fields not addressed here is correct and expected.

Return ONLY the JSON.`;

  const res = await structuredJson<ExtractedPack>({
    model: MODEL.FAST,
    input: prompt,
    jsonSchema: EVIDENCE_PACK_NO_CLASSIFICATION_SCHEMA,
    temperature: 0,
    maxOutputTokens: 8000,
  });
  return { data: res.data, costCents: res.costCents, model: res.model };
}

// Merge partial packs into one. Strategy per field type:
//   - String: take the longest non-empty value (more specific tends to be longer)
//   - Number/null: take the first non-null value
//   - Boolean/null: take the first non-null value
//   - Array of strings: concatenate, dedupe (case-insensitive)
//   - Array of objects: concatenate, dedupe by canonical key (url for sources,
//     code+name for forms)
//   - Nested objects (recoverable_amounts, hearing_logistics, etc.): recursively merge
function mergePartialPacks(partials: ExtractedPack[]): ExtractedPack {
  if (partials.length === 0) {
    throw new Error("mergePartialPacks: no partials");
  }
  if (partials.length === 1) return partials[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};

  // Top-level scalars
  result.court_name = pickLongest(partials.map((p) => p.court_name));
  result.filing_location = pickLongest(partials.map((p) => p.filing_location));
  result.claim_limit_dollars = pickFirstNonNull(partials.map((p) => p.claim_limit_dollars));
  result.arbitration_clause_considerations = pickLongest(
    partials.map((p) => p.arbitration_clause_considerations),
  );
  result.frequency_caps = pickLongest(partials.map((p) => p.frequency_caps));
  result.claim_splitting_prohibited = pickFirstNonNull(
    partials.map((p) => p.claim_splitting_prohibited),
  );
  result.filing_fee_cents = pickFirstNonNull(partials.map((p) => p.filing_fee_cents));
  result.filing_fee_notes = pickLongest(partials.map((p) => p.filing_fee_notes));
  result.counterclaim_transfer_threshold = pickLongest(
    partials.map((p) => p.counterclaim_transfer_threshold),
  );

  // String arrays (dedup case-insensitive)
  result.excluded_claim_types = unionStrings(partials.map((p) => p.excluded_claim_types));
  result.filing_methods = unionStrings(partials.map((p) => p.filing_methods));
  result.service_requirements = unionStrings(partials.map((p) => p.service_requirements));
  result.hearing_process = unionStrings(partials.map((p) => p.hearing_process));
  result.post_judgment_steps = unionStrings(partials.map((p) => p.post_judgment_steps));
  result.defendant_collectability_signals = unionStrings(
    partials.map((p) => p.defendant_collectability_signals),
  );
  result.evidence_required_for_this_claim_type = unionStrings(
    partials.map((p) => p.evidence_required_for_this_claim_type),
  );
  result.state_specific_quirks = unionStrings(partials.map((p) => p.state_specific_quirks));
  result.unknowns = unionStrings(partials.map((p) => p.unknowns));

  // Forms: dedup by code or normalized name
  result.forms_required = unionForms(partials.map((p) => p.forms_required));

  // Sources: dedup by URL
  result.sources = unionSources(partials.map((p) => p.sources));

  // Nested objects: merge field-by-field
  result.hearing_logistics = mergeHearingLogistics(partials.map((p) => p.hearing_logistics));
  result.recoverable_amounts = mergeRecoverableAmounts(
    partials.map((p) => p.recoverable_amounts),
  );
  result.court_mediation = mergeCourtMediation(partials.map((p) => p.court_mediation));
  result.accommodations = mergeAccommodations(partials.map((p) => p.accommodations));
  result.appeal_details = mergeAppealDetails(partials.map((p) => p.appeal_details));
  result.collection_details = mergeCollectionDetails(partials.map((p) => p.collection_details));
  result.tax_implications = mergeTaxImplications(partials.map((p) => p.tax_implications));

  return result as ExtractedPack;
}

function pickLongest(values: string[]): string {
  let best = "";
  for (const v of values) {
    if (v && v.length > best.length) best = v;
  }
  return best;
}

function pickFirstNonNull<T>(values: (T | null | undefined)[]): T | null {
  for (const v of values) {
    if (v !== null && v !== undefined) return v;
  }
  return null;
}

function unionStrings(arrays: (string[] | undefined)[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const arr of arrays) {
    if (!arr) continue;
    for (const s of arr) {
      const norm = s.trim();
      const key = norm.toLowerCase();
      if (norm && !seen.has(key)) {
        seen.add(key);
        out.push(norm);
      }
    }
  }
  return out;
}

interface FormItem {
  code: string | null;
  name: string;
  url: string | null;
  purpose: string;
  fillable_online: boolean;
  completion_methods: string[];
}

function unionForms(arrays: (FormItem[] | undefined)[]): FormItem[] {
  const byKey = new Map<string, FormItem>();
  for (const arr of arrays) {
    if (!arr) continue;
    for (const f of arr) {
      const key = ((f.code || "") + "|" + (f.name || "")).toLowerCase().trim();
      const existing = byKey.get(key);
      if (!existing) {
        byKey.set(key, { ...f });
      } else {
        // Merge: prefer non-null URL, longer purpose, union completion_methods
        existing.code = existing.code || f.code;
        existing.url = existing.url || f.url;
        existing.purpose = (f.purpose && f.purpose.length > existing.purpose.length)
          ? f.purpose
          : existing.purpose;
        existing.fillable_online = existing.fillable_online || f.fillable_online;
        existing.completion_methods = unionStrings([
          existing.completion_methods,
          f.completion_methods,
        ]);
      }
    }
  }
  return Array.from(byKey.values());
}

interface SourceItem {
  n?: number;
  url: string;
  title: string;
  domain: string;
  cited_for: string[];
}

function unionSources(arrays: (SourceItem[] | undefined)[]): SourceItem[] {
  const byUrl = new Map<string, SourceItem>();
  for (const arr of arrays) {
    if (!arr) continue;
    for (const s of arr) {
      if (!s.url) continue;
      const existing = byUrl.get(s.url);
      if (!existing) {
        byUrl.set(s.url, { ...s });
      } else {
        existing.title = existing.title || s.title;
        existing.domain = existing.domain || s.domain;
        existing.cited_for = unionStrings([existing.cited_for, s.cited_for]);
      }
    }
  }
  return Array.from(byUrl.values());
}

function mergeHearingLogistics(parts: (EvidencePack["hearing_logistics"] | undefined)[]) {
  return {
    copies_required: pickFirstNonNull(parts.map((p) => p?.copies_required ?? null)),
    exhibit_format: pickLongest(parts.map((p) => p?.exhibit_format ?? "")),
    recording_rules: pickLongest(parts.map((p) => p?.recording_rules ?? "")),
    hearsay_rules: pickLongest(parts.map((p) => p?.hearsay_rules ?? "")),
    default_proveup_required: pickFirstNonNull(
      parts.map((p) => p?.default_proveup_required ?? null),
    ),
    plaintiff_no_show_consequence: pickLongest(
      parts.map((p) => p?.plaintiff_no_show_consequence ?? ""),
    ),
  };
}

function mergeRecoverableAmounts(parts: (EvidencePack["recoverable_amounts"] | undefined)[]) {
  return {
    costs_recoverable: unionStrings(parts.map((p) => p?.costs_recoverable)),
    prejudgment_interest_rate_pct: pickFirstNonNull(
      parts.map((p) => p?.prejudgment_interest_rate_pct ?? null),
    ),
    post_judgment_interest_rate_pct: pickFirstNonNull(
      parts.map((p) => p?.post_judgment_interest_rate_pct ?? null),
    ),
    attorney_fees: {
      available: pickFirstNonNull(parts.map((p) => p?.attorney_fees?.available ?? null)),
      conditions: pickLongest(parts.map((p) => p?.attorney_fees?.conditions ?? "")),
      statute: pickLongest(parts.map((p) => p?.attorney_fees?.statute ?? "")),
    },
  };
}

function mergeCourtMediation(parts: (EvidencePack["court_mediation"] | undefined)[]) {
  return {
    available: pickFirstNonNull(parts.map((p) => p?.available ?? null)),
    when: pickLongest(parts.map((p) => p?.when ?? "")),
    free: pickFirstNonNull(parts.map((p) => p?.free ?? null)),
    process: pickLongest(parts.map((p) => p?.process ?? "")),
  };
}

function mergeAccommodations(parts: (EvidencePack["accommodations"] | undefined)[]) {
  return {
    interpreter_request_process: pickLongest(
      parts.map((p) => p?.interpreter_request_process ?? ""),
    ),
    ada_request_process: pickLongest(parts.map((p) => p?.ada_request_process ?? "")),
  };
}

function mergeAppealDetails(parts: (EvidencePack["appeal_details"] | undefined)[]) {
  return {
    window_days: pickFirstNonNull(parts.map((p) => p?.window_days ?? null)),
    who_can_appeal: pickLongest(parts.map((p) => p?.who_can_appeal ?? "")),
    type: pickLongest(parts.map((p) => p?.type ?? "")),
    motion_to_vacate_default_window_days: pickFirstNonNull(
      parts.map((p) => p?.motion_to_vacate_default_window_days ?? null),
    ),
  };
}

function mergeCollectionDetails(parts: (EvidencePack["collection_details"] | undefined)[]) {
  return {
    judgment_renewal_years: pickFirstNonNull(
      parts.map((p) => p?.judgment_renewal_years ?? null),
    ),
    abstract_of_judgment_process: pickLongest(
      parts.map((p) => p?.abstract_of_judgment_process ?? ""),
    ),
    wage_garnishment_cap_pct: pickFirstNonNull(
      parts.map((p) => p?.wage_garnishment_cap_pct ?? null),
    ),
    bank_levy_process: pickLongest(parts.map((p) => p?.bank_levy_process ?? "")),
    debtors_exam_process: pickLongest(parts.map((p) => p?.debtors_exam_process ?? "")),
    exemptions: unionStrings(parts.map((p) => p?.exemptions)),
    satisfaction_required: pickFirstNonNull(
      parts.map((p) => p?.satisfaction_required ?? null),
    ),
    bankruptcy_stay_effects: pickLongest(parts.map((p) => p?.bankruptcy_stay_effects ?? "")),
    domestication_of_out_of_state_judgment: pickLongest(
      parts.map((p) => p?.domestication_of_out_of_state_judgment ?? ""),
    ),
  };
}

function mergeTaxImplications(parts: (EvidencePack["tax_implications"] | undefined)[]) {
  return {
    recovery_taxability: pickLongest(parts.map((p) => p?.recovery_taxability ?? "")),
    form_1099_c_consideration: pickLongest(
      parts.map((p) => p?.form_1099_c_consideration ?? ""),
    ),
  };
}

function assembleFinal(extracted: ExtractedPack, classification: Classification): EvidencePack {
  return {
    classification: { ...classification },
    ...extracted,
  };
}

function countFilled(pack: ExtractedPack): number {
  let count = 0;
  for (const [, v] of Object.entries(pack)) {
    if (v === null || v === undefined) continue;
    if (typeof v === "string" && v.length === 0) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    count += 1;
  }
  return count;
}
