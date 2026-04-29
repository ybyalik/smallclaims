// Pure scoring logic for the free case-score quiz.
// No side effects, no fetches — takes answers + state facts, returns a structured result.
// Lives next to the client component so it can be unit-tested if we ever want.

export type DisputeType =
  | "unpaid_debt"
  | "security_deposit"
  | "services_not_rendered"
  | "goods_not_delivered"
  | "property_damage"
  | "unpaid_wages"
  | "contractor"
  | "other";

export type PriorContact = "formal" | "casual" | "none";
export type Evidence = "strong" | "some" | "limited";
export type DefendantKind =
  | "business"
  | "individual_stable"
  | "individual_unknown"
  | "government";

export interface QuizAnswers {
  dispute_type: DisputeType;
  amount_dollars: number;
  state_slug: string;
  incident_date: string; // ISO YYYY-MM-DD
  prior_contact: PriorContact;
  evidence: Evidence;
  defendant: DefendantKind;
}

// Per-state facts the scorer needs. Built server-side from state guides.
export interface StateFacts {
  name: string;
  cap_individual: number;
  cap_business: number;
  sol_years: {
    written_contract?: number;
    oral_contract?: number;
    sale_of_goods?: number;
    property_damage?: number;
    personal_injury?: number;
    wages?: number;
    bad_check?: number;
    fraud?: number;
  };
}

export interface ScoreFactor {
  label: string;
  impact: "positive" | "negative" | "neutral";
  detail: string;
}

export type Verdict = "strong" | "decent" | "weak" | "very_weak";
export type Path =
  | "demand_letter_strong"
  | "demand_then_file"
  | "borderline_consider_costs"
  | "consult_attorney_high_value"
  | "consult_attorney_complex"
  | "likely_time_barred";

export interface ScoreResult {
  score: number; // 0-100
  verdict: Verdict;
  path: Path;
  factors: ScoreFactor[];
  sol_summary: string;
  sol_warning: boolean;
  cap_warning?: string;
}

// Map dispute type → which SOL bucket to read from state facts
function solKey(type: DisputeType): keyof StateFacts["sol_years"] {
  switch (type) {
    case "unpaid_debt":
    case "contractor":
      return "written_contract";
    case "services_not_rendered":
      return "written_contract";
    case "goods_not_delivered":
      return "sale_of_goods";
    case "property_damage":
      return "property_damage";
    case "unpaid_wages":
      return "wages";
    case "security_deposit":
      return "written_contract"; // most states bucket deposit claims here
    case "other":
      return "written_contract";
  }
}

function yearsSince(iso: string): number {
  const incident = new Date(iso);
  const now = new Date();
  const ms = now.getTime() - incident.getTime();
  return ms / (1000 * 60 * 60 * 24 * 365.25);
}

export function scoreCase(a: QuizAnswers, facts: StateFacts | null): ScoreResult {
  const factors: ScoreFactor[] = [];
  let score = 0;

  // ── Dispute type (max 15) ───────────────────────────────────────
  const typeScores: Record<DisputeType, number> = {
    unpaid_debt: 15,
    security_deposit: 15,
    unpaid_wages: 14,
    contractor: 12,
    services_not_rendered: 12,
    goods_not_delivered: 12,
    property_damage: 10,
    other: 8,
  };
  score += typeScores[a.dispute_type];
  if (typeScores[a.dispute_type] >= 14) {
    factors.push({
      label: "Common, well-defined claim type",
      impact: "positive",
      detail:
        "These disputes have a clear damages number and a clear duty (a written agreement, a statute, or both).",
    });
  } else if (typeScores[a.dispute_type] <= 8) {
    factors.push({
      label: "Less-common claim type",
      impact: "neutral",
      detail:
        "Your dispute doesn't fit the most-common small-claims templates. The case can still work, but the framing matters.",
    });
  }

  // ── Amount (max 20) ────────────────────────────────────────────
  let capWarning: string | undefined;
  const amount = a.amount_dollars;
  if (amount < 250) {
    score += 5;
    factors.push({
      label: "Low dollar amount",
      impact: "negative",
      detail: `At $${amount.toLocaleString()}, the time and filing fees may approach the recovery itself. Consider whether it's worth pursuing.`,
    });
  } else if (amount < 500) {
    score += 12;
    factors.push({
      label: "Modest dollar amount",
      impact: "neutral",
      detail: "Recoverable, but factor in your filing fee and your time.",
    });
  } else if (amount <= 5000) {
    score += 20;
    factors.push({
      label: "Squarely in the small-claims sweet spot",
      impact: "positive",
      detail:
        "Most small-claims courts handle this range routinely and you can self-represent.",
    });
  } else if (facts && amount > facts.cap_individual) {
    score += 6;
    capWarning = `Your $${amount.toLocaleString()} claim exceeds ${facts.name}'s individual small-claims cap of $${facts.cap_individual.toLocaleString()}. You'd either waive the excess or file in a higher court.`;
    factors.push({
      label: "Exceeds your state's small-claims cap",
      impact: "negative",
      detail: capWarning,
    });
  } else {
    score += 17;
    factors.push({
      label: "Within your state's cap",
      impact: "positive",
      detail: facts
        ? `${facts.name} allows individual claims up to $${facts.cap_individual.toLocaleString()}.`
        : "Within typical small-claims caps.",
    });
  }

  // ── Statute of limitations (max 25) ────────────────────────────
  const elapsedYears = yearsSince(a.incident_date);
  const solBucket = solKey(a.dispute_type);
  const solYears = facts?.sol_years[solBucket];

  let solSummary = "";
  let solWarning = false;

  if (solYears && elapsedYears >= 0) {
    const remaining = solYears - elapsedYears;
    if (remaining > solYears * 0.6) {
      score += 25;
      solSummary = `In ${facts!.name}, the statute of limitations on this kind of claim is roughly ${solYears} years. You have about ${remaining.toFixed(1)} years left to file.`;
      factors.push({
        label: "Plenty of time on your statute of limitations",
        impact: "positive",
        detail: solSummary,
      });
    } else if (remaining > 1) {
      score += 18;
      solSummary = `${facts!.name}'s statute of limitations on this claim is roughly ${solYears} years. You have about ${remaining.toFixed(1)} years left — workable, but don't sit on it.`;
      factors.push({
        label: "Enough time, but the clock is meaningful",
        impact: "neutral",
        detail: solSummary,
      });
    } else if (remaining > 0) {
      score += 8;
      solWarning = true;
      solSummary = `URGENT — your statute of limitations expires in less than a year. ${facts!.name} typically allows ${solYears} years for this kind of claim, and you're nearly out of time.`;
      factors.push({
        label: "Statute of limitations is almost up",
        impact: "negative",
        detail: solSummary,
      });
    } else {
      score += 0;
      solWarning = true;
      solSummary = `Your incident date is roughly ${elapsedYears.toFixed(1)} years ago. ${facts!.name}'s statute of limitations on this kind of claim is approximately ${solYears} years — you're likely past the deadline.`;
      factors.push({
        label: "Statute of limitations likely expired",
        impact: "negative",
        detail: solSummary,
      });
    }
  } else {
    // We don't have specific SOL data for this state/type combo
    score += 15;
    solSummary =
      "We don't have a specific statute-of-limitations match for your claim type in this state. Most contract and property-damage claims allow 2–6 years.";
  }

  // ── Documentation / evidence (max 20) ──────────────────────────
  if (a.evidence === "strong") {
    score += 20;
    factors.push({
      label: "Strong written evidence",
      impact: "positive",
      detail:
        "A signed agreement, invoices, and payment records make the judge's job easy and dramatically increase your odds at the hearing.",
    });
  } else if (a.evidence === "some") {
    score += 12;
    factors.push({
      label: "Partial documentation",
      impact: "neutral",
      detail:
        "Texts, emails, and screenshots referencing the agreement help. Pull together everything you can before filing.",
    });
  } else {
    score += 5;
    factors.push({
      label: "Limited documentation",
      impact: "negative",
      detail:
        "Without paper trail, your case becomes word-against-word. Witnesses, photos, and any scrap of writing get more important.",
    });
  }

  // ── Prior contact (max 10) ────────────────────────────────────
  if (a.prior_contact === "formal") {
    score += 10;
    factors.push({
      label: "You've already made a formal demand",
      impact: "positive",
      detail:
        "Many small-claims judges expect to see that you tried to resolve this before filing. You're ahead of most plaintiffs.",
    });
  } else if (a.prior_contact === "casual") {
    score += 6;
  } else {
    score += 3;
    factors.push({
      label: "No formal demand yet",
      impact: "neutral",
      detail:
        "Sending a written demand letter first often resolves the dispute without filing — and strengthens your case if it doesn't.",
    });
  }

  // ── Defendant collectibility (max 10) ─────────────────────────
  switch (a.defendant) {
    case "business":
      score += 10;
      factors.push({
        label: "Defendant is a business",
        impact: "positive",
        detail:
          "Businesses have bank accounts and payment processors that judgments can attach to. Collection is more straightforward.",
      });
      break;
    case "individual_stable":
      score += 8;
      factors.push({
        label: "Defendant has known income",
        impact: "positive",
        detail:
          "Wage garnishment becomes a real lever after winning. Most states cap it at 25% of disposable earnings.",
      });
      break;
    case "individual_unknown":
      score += 5;
      factors.push({
        label: "Defendant's finances are unclear",
        impact: "neutral",
        detail:
          "Winning is one thing — collecting is another. A debtor's exam after judgment can surface assets you didn't know existed.",
      });
      break;
    case "government":
      score += 3;
      factors.push({
        label: "Defendant is a government agency",
        impact: "negative",
        detail:
          "Sovereign immunity often limits suits against the government. Special pre-suit notice deadlines (often 90–180 days) usually apply.",
      });
      break;
  }

  // Clamp
  score = Math.max(0, Math.min(100, Math.round(score)));

  // ── Verdict + path ────────────────────────────────────────────
  let verdict: Verdict;
  let path: Path;

  // Path is determined by knockouts first, then by score.
  if (solWarning && (solYears && elapsedYears > solYears)) {
    path = "likely_time_barred";
  } else if (capWarning) {
    path = "consult_attorney_high_value";
  } else if (a.defendant === "government") {
    path = "consult_attorney_complex";
  } else if (score >= 75) {
    path = "demand_letter_strong";
  } else if (score >= 55) {
    path = "demand_then_file";
  } else {
    path = "borderline_consider_costs";
  }

  if (score >= 75) verdict = "strong";
  else if (score >= 55) verdict = "decent";
  else if (score >= 35) verdict = "weak";
  else verdict = "very_weak";

  return {
    score,
    verdict,
    path,
    factors,
    sol_summary: solSummary,
    sol_warning: solWarning,
    cap_warning: capWarning,
  };
}
