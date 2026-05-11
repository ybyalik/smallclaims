// Shape of generated court-prep content. Cached on cases.court_prep_content
// after first generation. Versioned so we can evolve the schema later
// without breaking older saved packs.

export interface JudgeQuestion {
  question: string;
  why_asked: string;
  suggested_answer_outline: string;
}

export interface CourtPrepPack {
  version: 1;
  generated_at: string; // ISO timestamp
  generated_by: string; // model identifier (e.g., "openrouter/claude-sonnet")
  opening_statement: string; // 3-5 paragraphs, plain prose
  judge_questions: JudgeQuestion[]; // 5 to 8
  key_facts: string[]; // 4 to 7 short bullets the user should have memorized
  things_not_to_say: string[]; // 3 to 5
  what_to_bring: string[]; // 3 to 6 — case-specific evidence list
}
