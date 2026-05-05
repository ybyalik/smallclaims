// Backstop for the rare case where the deep research model still produces a
// duplicate-draft narrative despite the single-pass prompt contract.
//
// We detect the duplication pattern by counting H2 headings (e.g.,
// "## 1. Court and venue", "## 2. Jurisdictional fit"). If the same canonical
// heading appears multiple times, we know the model emitted multiple drafts.
//
// Resolution policy: keep the LAST occurrence's draft. Empirically the model
// restarts because it considered the first draft inadequate, so the later
// attempt is usually the cleaner one. If the last draft is much shorter than
// an earlier one (truncated mid-write), prefer the longer earlier one
// instead.

export interface DedupResult {
  cleaned: string; // narrative with duplicate drafts removed
  draftsDetected: number; // 1 = no duplication, 2+ = had duplicates
  keptDraft: number; // which draft we kept (1-indexed)
  notes: string;
}

const H2_RE = /^##\s+/gm;

export function dedupDeepResearchNarrative(raw: string): DedupResult {
  if (!raw || raw.length === 0) {
    return { cleaned: "", draftsDetected: 1, keptDraft: 1, notes: "empty input" };
  }

  // Split the document by the section-1 heading. A duplicated narrative will
  // typically restart at "## 1. ..." — that's the most reliable boundary.
  // Match any H2 whose text starts with "1." or "1 " (numbered first section).
  const draftBoundaries = findDraftBoundaries(raw);

  if (draftBoundaries.length <= 1) {
    return {
      cleaned: raw,
      draftsDetected: 1,
      keptDraft: 1,
      notes: "single draft; no dedup needed",
    };
  }

  // Carve into draft chunks
  const chunks: string[] = [];
  for (let i = 0; i < draftBoundaries.length; i++) {
    const start = draftBoundaries[i];
    const end = draftBoundaries[i + 1] ?? raw.length;
    chunks.push(raw.slice(start, end));
  }
  // Pre-content (before first draft) — usually a top-level "# Filing research"
  const preface = raw.slice(0, draftBoundaries[0]);

  // Pick the best draft. Heuristic:
  //   - If the latest draft is at least 70% as long as the longest, keep latest
  //     (model usually restarts with a clearer plan).
  //   - Otherwise (latest is much shorter — got cut off), keep the longest.
  const lastIdx = chunks.length - 1;
  const lengths = chunks.map((c) => c.length);
  const longestIdx = lengths.indexOf(Math.max(...lengths));
  const latestLen = lengths[lastIdx];
  const longestLen = lengths[longestIdx];
  const keepIdx = latestLen >= longestLen * 0.7 ? lastIdx : longestIdx;

  const cleaned = `${preface}${chunks[keepIdx]}`.trim();
  return {
    cleaned,
    draftsDetected: chunks.length,
    keptDraft: keepIdx + 1,
    notes: `Found ${chunks.length} drafts; kept draft ${keepIdx + 1} (length ${chunks[keepIdx].length}/${longestLen})`,
  };
}

// Find the start offsets of every "## 1. ..." heading in the document.
// These mark where each draft begins.
function findDraftBoundaries(raw: string): number[] {
  const re = /^##\s+(?:\*\*)?(?:1\.|1\b)\b[^\n]*$/gm;
  const offsets: number[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    offsets.push(m.index);
  }
  // Also catch the case where the first section heading uses a different
  // wording. If we found zero matches, look for repeated H2 headings that
  // appear more than once; that's a weaker but useful signal.
  if (offsets.length <= 1) {
    return offsets;
  }
  // De-duplicate near-adjacent matches (rare but possible if the model
  // emits "## 1. Court and venue" in a list item).
  return offsets.filter(
    (off, i) => i === 0 || off - offsets[i - 1] > 200,
  );
}

// Lightweight signal for callers that just want to know "was this duplicated?"
export function detectDuplicateDrafts(raw: string): boolean {
  return findDraftBoundaries(raw).length > 1;
}
