import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "../../../../lib/supabase/server";
import { createServiceRoleClient } from "../../../../lib/supabase/service-role";
import { STATES } from "../../../../lib/states";
import type { DisputeType } from "../../../../lib/supabase/types";

/**
 * POST /api/cases/start-from-score
 *
 * Auth-required entry point that creates a case prefilled with answers
 * from the free case-score quiz, so the user doesn't redo the same
 * questions in the case builder.
 *
 * Body: the QuizAnswers shape from app/(site)/case-score/scoring.ts.
 *
 * Returns: { case_id, next_url }.
 *   next_url is the wizard step the user should land on (the first step
 *   the score didn't already answer).
 */

// Score and DB now share the canonical 11+other taxonomy. This map is
// effectively identity but kept as a single point to validate / re-route
// if a stale client posts an old value.
const SCORE_DISPUTE_TO_DB: Record<string, DisputeType> = {
  landlord: "landlord",
  auto: "auto",
  personal_loan: "personal_loan",
  contractor: "contractor",
  refund: "refund",
  online_seller: "online_seller",
  employer: "employer",
  property_damage: "property_damage",
  medical_billing: "medical_billing",
  insurance: "insurance",
  pet_injury: "pet_injury",
  other: "other",
  // Legacy values from older score-quiz clients still resolve.
  neighbor: "neighbor",
  roommate: "roommate",
};

interface ScoreAnswers {
  dispute_type: string;
  // Free-text description when dispute_type === "other".
  dispute_type_other?: string | null;
  amount_dollars: number;
  state_slug: string;
  incident_date: string; // YYYY-MM-DD
  prior_contact: "formal" | "casual" | "none";
  evidence: "strong" | "some" | "limited";
  defendant: "business" | "individual_stable" | "individual_unknown" | "government";
  // Optional fields collected on score step 7. Save into the matching
  // top-level case columns when present.
  defendant_name?: string | null;
  brief_narrative?: string | null;
}

function mapDisputeType(scoreType: string): DisputeType {
  return SCORE_DISPUTE_TO_DB[scoreType] ?? "other";
}

function slugToAbbr(slug: string): string | null {
  const s = STATES.find((x) => x.slug === slug);
  return s?.abbr ?? null;
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Sign in to save your case." },
      { status: 401 },
    );
  }

  let answers: ScoreAnswers;
  try {
    answers = (await req.json()) as ScoreAnswers;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  // Light validation. Score quiz already enforces its own client-side
  // checks; we just refuse to write nonsense.
  if (!answers.dispute_type || !answers.state_slug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const stateAbbr = slugToAbbr(answers.state_slug);
  if (!stateAbbr) {
    return NextResponse.json({ error: "Unknown state" }, { status: 400 });
  }
  const dollars = Number(answers.amount_dollars);
  if (!Number.isFinite(dollars) || dollars <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const defendantName = (answers.defendant_name || "").trim() || null;
  const briefNarrative = (answers.brief_narrative || "").trim() || null;
  const mappedDisputeType = mapDisputeType(answers.dispute_type);
  const disputeTypeOther =
    mappedDisputeType === "other"
      ? (answers.dispute_type_other || "").trim() || null
      : null;

  const db = createServiceRoleClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (db as any)
    .from("cases")
    .insert({
      owner_user_id: user.id,
      status: "draft",
      state: stateAbbr,
      dispute_type: mappedDisputeType,
      amount_cents: Math.round(dollars * 100),
      defendant_name: defendantName,
      facts_narrative: briefNarrative,
      intake_version: 2,
      intake_answers: {
        // Carry-overs from the score quiz. The wizard's existing prescreen
        // steps read recipient_state to decide whether the state step has
        // been answered.
        recipient_state: stateAbbr,
        // Score-only signals saved alongside so the case builder can show
        // them and so the score result stays auditable on the case row.
        score_incident_date: answers.incident_date || null,
        score_prior_contact: answers.prior_contact || null,
        score_evidence_strength: answers.evidence || null,
        score_defendant_kind: answers.defendant || null,
        score_dispute_type_raw: answers.dispute_type,
        ...(disputeTypeOther ? { dispute_type_other: disputeTypeOther } : {}),
      },
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[cases/start-from-score]", error);
    return NextResponse.json({ error: "Failed to create case" }, { status: 500 });
  }

  // Score answered category, amount, and state — the next step the user
  // hasn't seen is eligibility. Land them there.
  const nextUrl = `/case/${data.id}/build/eligibility`;

  return NextResponse.json({ case_id: data.id, next_url: nextUrl });
}
