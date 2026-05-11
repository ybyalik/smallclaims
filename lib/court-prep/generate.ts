// Court-prep generation. One LLM call → structured JSON pack.
// The user's case data drives every section so the output is personalized.

import { complete } from "../openrouter";
import type { CourtPrepPack } from "./types";

interface GenerateInput {
  state: string; // 2-letter
  state_name: string;
  dispute_type: string;
  dispute_label: string;
  amount_cents: number;
  plaintiff_name: string;
  defendant_name: string;
  facts_narrative: string;
  intake_answers: Record<string, unknown>;
}

const SYSTEM_PROMPT = `You are a small-claims court coach helping a self-represented plaintiff prepare for their hearing. The plaintiff is not a lawyer and will be speaking for themselves in front of a judge.

You produce a structured prep pack. Output ONLY a valid JSON object matching the schema. No prose outside the JSON. No code fences.

Schema:
{
  "opening_statement": string,              // 3 to 5 paragraphs, written as if the plaintiff is reading it aloud. Plain English. Roughly 250-400 words. First-person ("I"). Calm and factual, never aggressive. Includes: who the plaintiff is, what the defendant did, what the plaintiff is asking for, what evidence supports it.
  "judge_questions": [                       // 5 to 8 of the most likely questions a small-claims judge asks plaintiffs in this kind of case
    { "question": string, "why_asked": string, "suggested_answer_outline": string }
  ],
  "key_facts": [string],                     // 4 to 7 short bullets the plaintiff should know cold (dates, dollar amounts, key communications, statute references when verified)
  "things_not_to_say": [string],             // 3 to 5 mistakes self-represented plaintiffs commonly make in this case category (e.g., "Don't argue with the judge if interrupted")
  "what_to_bring": [string]                  // 3 to 6 specific evidence items relevant to THIS case (not generic — reference what the plaintiff actually has)
}

Hard rules:
- Never give legal advice in the form of "you should plead X" or "you have a valid claim for Y." Frame as "courts in this category often look for..." or "evidence that helps..."
- Never invent statute citations. If you mention a statute, only do so when widely documented.
- Suggested answer outlines must NOT be canned scripts. Use 1-3 short bullets per question describing WHAT to address, not WORD-FOR-WORD what to say.
- Adjust tone, evidence list, and questions to the specific dispute_type. A landlord case is not a contractor case is not an auto case.
- If facts_narrative is short or vague, the opening_statement should call out the strongest 1-2 facts in it and avoid inventing details.`;

export async function generateCourtPrepPack(input: GenerateInput): Promise<CourtPrepPack> {
  const dollars = (input.amount_cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const userPrompt = `Generate a court-prep pack for this small-claims hearing.

STATE: ${input.state_name} (${input.state})
DISPUTE TYPE: ${input.dispute_label} (${input.dispute_type})
AMOUNT IN DISPUTE: ${dollars}
PLAINTIFF: ${input.plaintiff_name}
DEFENDANT: ${input.defendant_name}

FACTS (in the plaintiff's own words):
${input.facts_narrative || "(no narrative provided)"}

ADDITIONAL CASE DETAILS (from the intake):
${JSON.stringify(input.intake_answers, null, 2)}

Return the JSON pack now.`;

  const result = await complete({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.5,
    max_tokens: 3000,
  });

  // Defensive parse — strip code fences if the model included them despite
  // the system prompt forbidding it.
  const cleaned = result.text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  let parsed: Omit<CourtPrepPack, "version" | "generated_at" | "generated_by">;
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    throw new Error(
      `court-prep: model returned non-JSON output: ${e instanceof Error ? e.message : "parse error"}. First 200 chars: ${cleaned.slice(0, 200)}`,
    );
  }

  // Light validation — the page will crash visibly if fields are missing.
  if (
    typeof parsed.opening_statement !== "string" ||
    !Array.isArray(parsed.judge_questions) ||
    !Array.isArray(parsed.key_facts) ||
    !Array.isArray(parsed.things_not_to_say) ||
    !Array.isArray(parsed.what_to_bring)
  ) {
    throw new Error("court-prep: model output missing required fields");
  }

  return {
    version: 1,
    generated_at: new Date().toISOString(),
    generated_by: result.model,
    ...parsed,
  };
}
