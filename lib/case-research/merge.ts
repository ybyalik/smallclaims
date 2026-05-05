// Merge agent. Reconciles the shallow EvidencePack with the single combined
// deep research pack (extracted from concatenated call A + call B findings),
// plus the two raw findings dossiers as backup, into one best-of-both
// EvidencePack. Records every conflict, scores per-section confidence, and
// flags critical jurisdictional disagreements.
//
// The merge agent is deliberate about trust:
//   - Specific addresses, courthouse names, courthouse contacts → deep wins
//     (deep browses; finds buried county pages shallow's top-20 hits miss)
//   - Statute citations → whichever has one (a verifiable cite beats a
//     description without one)
//   - Numeric mismatches on claim limits / fees → never silently arbitrate;
//     pick the higher-confidence value AND flag the conflict
//   - Practical tips, evidence checklists → deep findings win
//   - State-level law text → shallow wins (domain allow-list keeps it on
//     official sites; deep may quote third-party summaries)
//
// On a critical conflict (e.g., shallow says small claims, deep says housing
// court): we still produce the merged pack but set critical_conflict_detected
// so downstream surfaces the warning.

import { MODEL, structuredJson } from "./openai";
import type { EvidencePack, IntakeSnapshot } from "./agents";

// Per-half findings budget. The two halves combined fit comfortably in the
// merger's input window.
const FINDINGS_BUDGET_PER_HALF = 35_000;

export type ConfidenceLevel = "low" | "medium" | "high";

export interface MergeConflict {
  field: string; // human-readable field path, e.g. "claim_limit_dollars"
  shallow_value: string; // stringified for transport
  deep_value: string;
  resolution: "shallow_wins" | "deep_wins" | "kept_both" | "neither";
  rationale: string;
  is_critical: boolean; // jurisdictional or premise-level disagreement
}

export interface SectionConfidence {
  section: string; // e.g., "court_name", "filing_fee", "service", "collection"
  level: ConfidenceLevel;
  rationale: string;
}

export interface MergeSummary {
  conflicts: MergeConflict[];
  section_confidence: SectionConfidence[];
  overall_confidence: ConfidenceLevel;
  critical_conflict_detected: boolean;
  critical_conflict_notes: string;
  // Provenance map: one entry per top-level merged field describing where the
  // value came from. Encoded as an array (not a free-form object) because
  // OpenAI's structured-output strict mode rejects dictionary-style schemas
  // (additionalProperties: <schema>).
  provenance: Array<{
    field: string;
    source: "shallow" | "deep" | "both" | "intake" | "stale";
  }>;
}

export interface MergeResult {
  data: {
    merged: EvidencePack;
    summary: MergeSummary;
  };
  costCents: number;
  model: string;
}

// We reuse the EvidencePack-no-classification schema from agents.ts for the
// merged pack, plus a top-level summary block. Keep this in sync with
// EVIDENCE_PACK_NO_CLASSIFICATION_SCHEMA when fields change.
import { EVIDENCE_PACK_NO_CLASSIFICATION_SCHEMA, CLASSIFY_SCHEMA } from "./agents";

const MERGE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    merged: {
      type: "object",
      additionalProperties: false,
      properties: {
        classification: CLASSIFY_SCHEMA,
        ...EVIDENCE_PACK_NO_CLASSIFICATION_SCHEMA.properties,
      },
      required: ["classification", ...EVIDENCE_PACK_NO_CLASSIFICATION_SCHEMA.required],
    },
    summary: {
      type: "object",
      additionalProperties: false,
      properties: {
        conflicts: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              field: { type: "string" },
              shallow_value: { type: "string" },
              deep_value: { type: "string" },
              resolution: {
                type: "string",
                enum: ["shallow_wins", "deep_wins", "kept_both", "neither"],
              },
              rationale: { type: "string" },
              is_critical: { type: "boolean" },
            },
            required: [
              "field",
              "shallow_value",
              "deep_value",
              "resolution",
              "rationale",
              "is_critical",
            ],
          },
        },
        section_confidence: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              section: { type: "string" },
              level: { type: "string", enum: ["low", "medium", "high"] },
              rationale: { type: "string" },
            },
            required: ["section", "level", "rationale"],
          },
        },
        overall_confidence: { type: "string", enum: ["low", "medium", "high"] },
        critical_conflict_detected: { type: "boolean" },
        critical_conflict_notes: { type: "string" },
        provenance: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              field: { type: "string" },
              source: {
                type: "string",
                enum: ["shallow", "deep", "both", "intake", "stale"],
              },
            },
            required: ["field", "source"],
          },
        },
      },
      required: [
        "conflicts",
        "section_confidence",
        "overall_confidence",
        "critical_conflict_detected",
        "critical_conflict_notes",
        "provenance",
      ],
    },
  },
  required: ["merged", "summary"],
};

export interface MergeInputs {
  intake: IntakeSnapshot;
  shallowPack: EvidencePack;
  // Single deep pack extracted from the concatenated A+B findings dossiers.
  // May be null if extraction failed; in that case the merger leans on the
  // raw findings text.
  deepPack: EvidencePack | null;
  // Raw findings markdown from each deep research call (kept split because
  // each is a separate dossier with its own citations). The dossiers are
  // backup material the merger reads when the structured deep pack misses
  // something.
  findingsA: string;
  findingsB: string;
}

export async function mergeResearchPacks(inputs: MergeInputs): Promise<MergeResult> {
  const { intake, shallowPack, deepPack, findingsA, findingsB } = inputs;
  const findingsASlice = (findingsA || "").slice(0, FINDINGS_BUDGET_PER_HALF);
  const findingsBSlice = (findingsB || "").slice(0, FINDINGS_BUDGET_PER_HALF);

  const prompt = `You are reconciling two procedural-research inputs about one US court filing into a single, best-of-both EvidencePack. You MUST also record every conflict, score confidence per section, and flag any critical jurisdictional disagreement.

CASE
- State: ${intake.state}
- Plaintiff's county: ${intake.plaintiffCounty ?? "(unknown)"}
- Defendant's county: ${intake.defendantCounty ?? "(unknown)"}
- Incident / property county: ${intake.incidentCounty ?? "(unknown)"}
- Claim category: ${shallowPack.classification.claim_category}
- Amount: $${(intake.amountCents / 100).toFixed(2)}
- Defendant: ${intake.defendantName}

INPUT 1 — SHALLOW PACK (built mechanically from ~20 fetched official pages; structured)
${JSON.stringify(shallowPack, null, 2)}

INPUT 2 — DEEP PACK (single extracted pack covering all 21 research sections; built from concatenated call A + B findings)
${deepPack ? JSON.stringify(deepPack, null, 2) : "(structured extraction failed; rely on the raw findings dossiers below)"}

INPUT 3 — RAW FINDINGS A (raw markdown bullet dossier from deep research call A — pre-filing and filing topics, up to ${FINDINGS_BUDGET_PER_HALF} chars)
${findingsASlice}

INPUT 4 — RAW FINDINGS B (raw markdown bullet dossier from deep research call B — hearing through collection, up to ${FINDINGS_BUDGET_PER_HALF} chars)
${findingsBSlice}

HOW TO COMBINE
- Use the deep pack as your primary structured source.
- Use the raw findings markdown (A + B) when the deep pack is empty or thin for a field — the dossiers often have a precise statute citation or detail that didn't make it into the structured extraction.
- Reconcile against the shallow pack using the credibility rules below.

CREDIBILITY RULES (field by field)
1. Specific addresses, courthouse names, clerk contacts: prefer DEEP. The deep agent browses official county pages shallow's top-20 hits miss.
2. Statute citations (e.g., NJSA, Cal. Code Civ. Proc.): prefer whichever has a specific cite. A description without a cite loses to one with a cite.
3. Numeric mismatches (claim limit, filing fee, garnishment cap): NEVER silently arbitrate. Pick the higher-confidence value, ALWAYS log the conflict, and add a note in critical_conflict_notes if both are plausible.
4. Forms (code + URL): prefer the source that has BOTH code and URL. If only one source has either, take what each contributes (combine).
5. Practical tips, evidence checklists, common pitfalls, state-specific quirks: prefer DEEP findings.
6. State-level law text and rules of court: prefer SHALLOW (its domain allow-list keeps it on official sites).
7. When both sources give the same value, mark provenance as "both".
8. When neither source covers a field, leave a sensible empty default and add a note to unknowns.

CRITICAL CONFLICT DETECTION
A conflict is CRITICAL if it changes the basic premise of the case:
- Different court division named (small claims vs housing court vs district)
- One says case fits under cap, the other says it exceeds
- Different state named
- Different fundamental venue rule
Set critical_conflict_detected=true if any such disagreement exists. Add a clear plain-English explanation in critical_conflict_notes that an admin can act on.

CONFIDENCE SCORING
For each of these sections, score confidence as low | medium | high based on agreement, citation quality, and source officialness:
- court_and_venue
- forms_and_filing
- filing_fee
- service
- hearing
- collection
- statute_of_limitations
- pre_filing_requirements
- state_specific_quirks

PROVENANCE MAP
For each top-level field of the merged pack, add ONE entry to the provenance array as { "field": "<field_name>", "source": "<source>" }, where source is one of:
- "shallow" — value taken from shallow pack
- "deep" — value taken from a deep pack or findings (either half)
- "both" — both shallow and deep agreed
- "intake" — passed through from the case input (e.g. classification.claim_category)
- "stale" — value present but the source page looks outdated

OUTPUT
Return JSON matching the schema. The merged pack must be complete and usable on its own. Conflicts array must include EVERY substantive disagreement (don't pad with cosmetic ones, but don't omit real ones either).`;

  const res = await structuredJson<MergeResult["data"]>({
    model: MODEL.REASONING,
    input: prompt,
    jsonSchema: MERGE_SCHEMA,
    temperature: 0,
    maxOutputTokens: 16000,
  });
  return { data: res.data, costCents: res.costCents, model: res.model };
}
