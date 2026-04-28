# Evidence Pack Schema for {STATE}

Return ONE JSON object with all the fields below. Capture more than we'll render — downstream code picks what to publish.

Every numeric, deadline, fee, statute, form name, dollar figure, and rate MUST have a non-empty `source_ids` array citing the URL list provided in this conversation. If a field is genuinely not findable in the URL list, set the value to `null` and leave `source_ids: []` — never guess.

Every claim entry must have `name`, `example`, and `notes` populated (not just `slug` + `eligibility`). The drafting step depends on these. If a claim is `not eligible` or `conditional`, the example illustrates WHY.

Currency: facts current as of 2026.

## Schema

```json
{
  "state": "{STATE}",
  "slug": "lower-kebab-case",
  "abbr": "AL",
  "as_of": "YYYY-MM-DD",

  "hero": {
    "individual_limit_dollars": 0,
    "business_limit_dollars": 0,
    "filing_fee_low_dollars": 0,
    "filing_fee_high_dollars": 0,
    "typical_timeline_min_days": 30,
    "typical_timeline_max_days": 90,
    "tagline": "One sentence summary of what makes this state's small-claims procedure distinctive (e.g., a recent cap raise, an unusual special rule, or simply 'standard $X cap and Y-day appeal window').",
    "source_ids": []
  },

  "at_a_glance": [
    { "label": "Most you can sue for", "value": "$6,000", "detail": "Same cap for individuals and businesses", "source_ids": [] },
    { "label": "Filing fee", "value": "$82-$210", "detail": "Tiered by claim amount", "source_ids": [] },
    { "label": "Court", "value": "District Court (small claims docket)", "detail": "", "source_ids": [] },
    { "label": "Lawyers at trial", "value": "Allowed", "detail": "Permitted but not required", "source_ids": [] },
    { "label": "Appeal window", "value": "14 days", "detail": "Trial de novo in circuit court", "source_ids": [] },
    { "label": "Recent change", "value": "—", "detail": "If a major change happened in the last 3 years, summarize here; otherwise '—'", "source_ids": [] }
  ],

  "limits": {
    "individual_dollars": 0,
    "business_dollars": 0,
    "guarantor_with_fee_max": null,
    "guarantor_without_fee_max": null,
    "annual_filing_cap": { "count": null, "threshold_dollars": null, "notes": "" },
    "split_claims_allowed": false,
    "split_claims_explanation": "Plain-English 2-3 sentence explanation of what happens if a claim exceeds the cap (waive the excess vs. file in higher court) and whether splitting one dispute is allowed.",
    "interest_excluded_from_cap": true,
    "court_costs_excluded_from_cap": true,
    "statute": "Ala. Code § 12-12-31",
    "source_ids": []
  },

  "claim_categories": [
    {
      "id": "contracts",
      "title": "Contracts and money owed",
      "blurb": "1-2 sentence intro to this category. State the SOL and any standout state-specific rules (e.g., 'Alabama gives you 6 years on written contracts and 6 on oral. Same clock for both.').",
      "claims": [
        {
          "slug": "written-contract",
          "name": "Breach of a written contract",
          "example": "A contractor signed a $4,000 contract to remodel your kitchen, took the deposit, and never finished.",
          "eligibility": "eligible | conditional | not eligible",
          "claim_statute": "Ala. Code § 6-2-34",
          "notes": "6-year deadline from breach. Bring the signed contract, payment proof, and any correspondence showing the breach.",
          "damage_boost": "",
          "source_ids": []
        }
      ]
    }
  ],

  "exclusions": [
    {
      "category": "Eviction (unlawful detainer)",
      "explanation": "1-2 sentence explanation of why this is excluded and what the practical consequence is.",
      "where_to_go_instead": "District Court ejectment process",
      "source_ids": []
    }
  ],

  "damages": {
    "compensatory_allowed": true,
    "punitive_allowed": false,
    "punitive_explanation": "Plain-English explanation. Note whether statutory penalties are still available even if common-law punitives are not.",
    "statutory_multipliers": [
      {
        "claim": "Bad check (after 30-day notice)",
        "multiplier": "2x or 3x of check amount",
        "explanation": "Full formula: e.g., 'Check amount + service charge up to $X + civil penalty up to $Y, OR 2x check amount, whichever is greater'",
        "statute": "Ala. Code § 6-5-285",
        "source_ids": []
      }
    ],
    "attorney_fees_recoverable": "yes | no | sometimes",
    "attorney_fees_explanation": "When and why fees can be shifted; cite the specific fee-shift statutes for the most common claims.",
    "prejudgment_interest_rate_pct": null,
    "prejudgment_interest_statute": "",
    "postjudgment_interest_rate_pct": null,
    "postjudgment_interest_type": "simple | compound",
    "postjudgment_interest_statute": "",
    "postjudgment_interest_notes": "",
    "filing_and_service_fees_recoverable_from_loser": true,
    "source_ids": []
  },

  "where_to_file": {
    "court_name": "Small Claims Division of the District Court",
    "parent_court": "Alabama Unified Judicial System — District Court",
    "venue_rules": [
      { "scenario": "Most cases (the default)", "filing_options": ["County where the defendant lives"], "source_ids": [] },
      { "scenario": "Where contract was performed", "filing_options": ["County where performance was due"], "source_ids": [] },
      { "scenario": "Where injury or damage occurred", "filing_options": ["County where the event occurred"], "source_ids": [] },
      { "scenario": "Multiple defendants", "filing_options": ["Any county where ONE defendant resides"], "source_ids": [] },
      { "scenario": "Out-of-state defendant", "filing_options": ["Where the cause of action arose"], "source_ids": [] }
    ],
    "consequences_of_wrong_venue": "1-2 sentences on what happens (transfer vs dismissal, refile cost, etc.).",
    "e_filing_available": "yes | no | varies",
    "e_filing_notes": "",
    "e_filing_portal": null,
    "source_ids": []
  },

  "fees": {
    "filing_fee_tiers": [
      { "range_label": "$0 to $1,500", "range_min": 0, "range_max": 1500, "fee_dollars": 82, "source_ids": [] }
    ],
    "frequent_filer": { "threshold_per_year": null, "fee_dollars": null, "notes": "" },
    "service_fees": [
      { "method": "Sheriff (personal service)", "amount_label": "$25-50", "notes": "Required for most cases.", "source_ids": [] }
    ],
    "waiver": {
      "forms": [{ "number": "AOC-IFP", "name": "Affidavit of Substantial Hardship", "url": "", "source_ids": [] }],
      "eligibility_bullets": ["Receiving need-based public assistance (SNAP, TANF, SSI)", "Household income below 125% federal poverty line"],
      "coverage_notes": "What the waiver covers (filing fee only? service fees too?).",
      "if_you_win_notes": "Whether the waived fee is added to the judgment against the loser."
    },
    "other_fees": [
      { "name": "Subpoena issuance", "amount_label": "$10", "notes": "Plus witness fee per day.", "source_ids": [] },
      { "name": "Appeal filing", "amount_label": "$200", "notes": "", "source_ids": [] },
      { "name": "Writ of execution", "amount_label": "varies", "notes": "Post-judgment.", "source_ids": [] }
    ],
    "fees_recoverable_from_loser_notes": "If you win, filing fee and reasonable service costs are added to the judgment.",
    "source_ids": []
  },

  "statute_of_limitations": {
    "entries": [
      "REQUIRED: at minimum 12 entries covering these claims, in this order:",
      "1. Written contract",
      "2. Oral contract",
      "3. Sale of goods (UCC)",
      "4. Promissory note",
      "5. Open account / credit card debt",
      "6. Personal injury",
      "7. Property damage",
      "8. Fraud (note discovery rule)",
      "9. Bad check",
      "10. Unpaid wages",
      "11. Security deposit",
      "12. Judgment enforcement",
      "Each as a full object: { id, claim, years, clock_starts, statute, notes, source_ids }. Do NOT collapse or skip any of these. Add additional claim types if material to the state."
    ],
    "discovery_rule_notes": "Which claim types use the discovery rule (fraud is the most common).",
    "tolling_notes": "What pauses the clock: defendant out-of-state, plaintiff a minor, bankruptcy stay, partial payment restart, etc."
  },

  "pre_filing": {
    "demand_letter_required": false,
    "demand_letter_recommended": true,
    "demand_letter_notes": "When required vs recommended; reference the bad-check 30-day notice and any wage-claim demand rule.",
    "bad_check_notice_rule": "Specific text/days of the bad-check notice rule for this state.",
    "wage_claim_demand_rule": "Specific wage-claim written demand rule and its penalty trigger.",
    "government_claim_required": false,
    "government_claim_deadline_days": null,
    "government_claim_notes": "",
    "landlord_tenant_pre_filing_notes": "Security deposit forwarding-address rule, repair-and-deduct notice rules.",
    "consumer_protection_notes": "UDAP / Consumer Fraud Act demand or notice rules.",
    "mandatory_mediation_before_filing": "none | by court | by claim type",
    "arbitration_clauses_enforced": true,
    "source_ids": []
  },

  "forms": [
    {
      "number": "C-31",
      "name": "Statement of Claim",
      "description": "Plain-English: what this form does and why it matters.",
      "filed_by": "plaintiff | defendant | either | court",
      "required": true,
      "group": "starting | service | hearing | counterclaim | after-judgment | fee-waiver | appeal",
      "url": "",
      "source_ids": []
    }
  ],

  "service": {
    "who_can_serve": ["Sheriff", "Certified mail by clerk", "Private process server"],
    "methods": [
      {
        "name": "Sheriff personal service",
        "description": "Sheriff or constable personally hands the papers to the defendant.",
        "pros": ["Most reliable", "Cheap"],
        "cons": ["Slow"],
        "source_ids": []
      }
    ],
    "in_county_days_before_hearing": 0,
    "out_of_county_days_before_hearing": 0,
    "proof_of_service_form": { "number": "", "name": "" },
    "proof_filing_deadline_days_before_hearing": 0,
    "business_service_rule": "How to serve a corporation/LLC (registered agent, etc.) and a sole proprietor.",
    "out_of_state_defendant_notes": "Long-arm rules.",
    "cant_find_defendant_notes": "Substitute service / publication rules where applicable.",
    "avoiding_service_notes": "What you can do if the defendant is dodging service.",
    "source_ids": []
  },

  "response_and_default": {
    "must_file_written_answer": false,
    "response_deadline_days": 0,
    "response_notes": "Plain-English on whether and how the defendant must respond before the hearing.",
    "default_process": "What happens if defendant doesn't appear.",
    "prove_up_required": false,
    "prove_up_notes": "Whether plaintiff still must prove damages even on default.",
    "motion_to_vacate_form": { "number": "", "name": "" },
    "motion_to_vacate_deadline_days": 0,
    "motion_to_vacate_lack_of_notice_days": 0,
    "motion_to_vacate_appeal_deadline_days": 0,
    "motion_to_vacate_appeal_notes": "",
    "source_ids": []
  },

  "counterclaim": {
    "allowed": true,
    "form": { "number": "", "name": "" },
    "same_monetary_limit": true,
    "service_deadline_in_county_days": 0,
    "service_deadline_out_of_county_days": 0,
    "transfer_to_higher_court_available": false,
    "transfer_to_higher_court_statute": "",
    "transfer_to_higher_court_notes": "",
    "source_ids": []
  },

  "hearing": {
    "lawyers_allowed": "yes | no | restricted",
    "lawyers_allowed_notes": "",
    "format": "Plain-English: bench trial, ~10-15 min per case, etc.",
    "presider": "judge | magistrate | referee | judge or commissioner",
    "burden_of_proof": "preponderance | clear and convincing",
    "what_to_bring": ["Originals of any contracts", "Receipts and bank records", "Photos and videos", "Names and contact info for witnesses"],
    "subpoena_form": { "number": "", "name": "" },
    "witness_fee_per_day_dollars": null,
    "free_interpreters": false,
    "interpreter_request_process": "",
    "jury_option": false,
    "decision_timing": "On the spot | mailed within X weeks | both",
    "on_site_mediation": "yes | no | by county",
    "on_site_mediation_notes": "",
    "source_ids": []
  },

  "appeals": {
    "who_can_appeal": "plaintiff | defendant | either",
    "deadline_days": 0,
    "fee_dollars": 0,
    "type": "trial de novo | on the record | questions of law only",
    "type_notes": "",
    "attorneys_allowed_on_appeal": true,
    "bond_required": false,
    "bond_amount_notes": "",
    "automatic_stay_on_appeal": true,
    "default_judgment_appealable": false,
    "default_judgment_notes": "If a default judgment cannot be appealed directly, what's the procedure (motion to vacate, then appeal denial, etc.)?",
    "notice_of_appeal_form": { "number": "", "name": "" },
    "frivolous_appeal_penalty_dollars": null,
    "frivolous_appeal_statute": "",
    "frivolous_appeal_notes": "",
    "source_ids": []
  },

  "collection": {
    "payment_deadline_typical_days": 0,
    "post_judgment_interest_rate_pct": 0,
    "post_judgment_interest_statute": "",
    "post_judgment_interest_notes": "",
    "methods": [
      {
        "id": "wage-garnishment",
        "name": "Wage garnishment",
        "blurb": "One-line: have a portion of debtor's wages withheld until the judgment is paid.",
        "description": "Plain-English walkthrough: file a writ of garnishment, serve the employer, employer withholds and remits to court...",
        "forms": [{ "number": "", "name": "" }],
        "estimated_cost": "$30-50 plus sheriff fees",
        "effectiveness_notes": "Most effective when debtor is W-2 employed at a stable job.",
        "exemptions": ["75% of disposable earnings (federal CCPA floor)"],
        "source_ids": []
      }
    ],
    "wage_garnishment_max_pct_of_disposable": 0,
    "judgment_lifespan_years": 0,
    "judgment_renewal_process": "Form name, deadline before expiration, fee.",
    "debtor_exam_form": { "number": "", "name": "" },
    "exempt_assets": [
      "Homestead — $X",
      "Vehicle — $X",
      "Retirement accounts (federally and/or state-protected)",
      "Social Security and federal benefits"
    ],
    "bankruptcy_effect_notes": "Automatic stay; which judgments survive Chapter 7.",
    "satisfaction_of_judgment_form": { "number": "", "name": "" },
    "priority_notes": "How priority works among multiple judgment creditors (first to record, race-notice, etc.).",
    "source_ids": []
  },

  "businesses": {
    "self_representation_allowed": true,
    "self_representation_notes": "Whether a business can appear without an attorney; any threshold (revenue/asset) that triggers attorney requirement.",
    "can_send_employee": false,
    "can_send_attorney": true,
    "non_attorney_representation_form": { "number": "", "name": "" },
    "insurance_adjuster_allowed": false,
    "fictitious_name_form": { "number": "", "name": "" },
    "fictitious_name_notes": "DBA/trade-name rule: must use legal entity name, not trade name.",
    "sole_proprietor_employee_exception": "Whether sole proprietor can send a designated employee.",
    "out_of_state_business_must_register": false,
    "out_of_state_business_statute": "",
    "licensing_notes": "Whether unlicensed contractors/professionals can sue to recover fees.",
    "source_ids": []
  },

  "county_variations_material": false,
  "county_variations": [
    {
      "county": "Jefferson",
      "topic": "E-filing availability",
      "detail": "Jefferson County offers online filing through eAlafile.",
      "source_ids": []
    }
  ],

  "pitfalls": [
    {
      "title": "Wrong defendant naming",
      "what_happens": "If you sue 'John's Garage' but the legal entity is 'JG Auto Repair LLC', the judgment may be unenforceable against the LLC's assets.",
      "how_to_avoid": "Search the Secretary of State business records before filing and use the exact registered name; for sole proprietors use the individual's full legal name.",
      "source_ids": []
    },
    {
      "title": "Missed statute of limitations",
      "what_happens": "Filing one day after the deadline gets the case dismissed with prejudice.",
      "how_to_avoid": "Check the SOL for your specific claim type before filing; for fraud, the discovery rule applies but be prepared to prove when you reasonably could have discovered it.",
      "source_ids": []
    }
  ],

  "recent_changes": [
    {
      "date": "YYYY-MM-DD",
      "title": "Brief title of the change",
      "description": "1-2 sentences on what changed and why it matters.",
      "bill_or_rule_citation": "",
      "source_ids": []
    }
  ],

  "faqs": [
    {
      "question": "Do I need a lawyer?",
      "answer": "2-4 sentence answer drawn from the rest of the evidence pack.",
      "source_ids": []
    },
    {
      "question": "How long does it take?",
      "answer": "",
      "source_ids": []
    },
    {
      "question": "What's the maximum I can sue for?",
      "answer": "",
      "source_ids": []
    },
    {
      "question": "What happens if the defendant doesn't show up?",
      "answer": "",
      "source_ids": []
    },
    {
      "question": "Can I appeal?",
      "answer": "",
      "source_ids": []
    },
    {
      "question": "How long is a judgment good for?",
      "answer": "",
      "source_ids": []
    }
  ],

  "state_specific_notes": [
    "Each item: one short sentence per quirk that doesn't fit the structured fields above. Aim for 5-15 entries — these are the things a non-lawyer would benefit from knowing that aren't covered by the procedural skeleton.",
    "Examples: '{STATE} allows driver's license suspension as a collection tool for unpaid vehicle judgments.' or '{STATE} treats engagement rings as conditional gifts.'"
  ],

  "_extras": {
    "interesting_findings": [
      "Free-form bucket for anything notable that didn't fit elsewhere. Be liberal — better to capture more than less."
    ]
  },

  "sources": [
    { "id": "S1", "label": "Ala. Code § 12-12-31 — Small Claims jurisdiction", "url": "https://...", "primary": true, "citation": "Ala. Code § 12-12-31" }
  ]
}
```

## Required claim slugs (in `claim_categories[*].claims[*].slug`)

The drafting step expects coverage of these slugs across the categories. Use these exact slugs (the categories below are guidance; group sensibly for the state):

**Contracts and money owed:**
written-contract, oral-contract, personal-loan, promissory-note, unpaid-invoice, open-account, unpaid-rent, bad-check, co-signer

**Consumer disputes:**
defective-product, bad-service, auto-repair, contractor, no-show-vendor, subscription-cancellation, used-car, false-advertising

**Property damage:**
vehicle-collision, neighbor-property, damage-to-rental, pet-damage, property-in-custody

**Landlord-tenant (money only — eviction is excluded):**
security-deposit, deposit-not-itemized, uninhabitable-rental, wrongful-retention-property, illegal-eviction, unreturned-prepaid-rent, unpaid-rent-by-tenant, repair-and-deduct

**Employment and wages:**
unpaid-wages, final-paycheck, unpaid-commissions, unpaid-overtime

**Personal claims:**
minor-injury, loaned-property, civil-theft

**Vehicle-specific:**
mechanic-dispute, wrongful-tow

**State-specific extras:**
Add any extra claim slugs your state has that are genuinely material (e.g., DWI vehicle forfeiture challenges in MN). Use a new descriptive slug.

If a slug doesn't apply (e.g., the state excludes personal injury entirely from small claims), include it with `eligibility: "not eligible"` and explain in `notes`.

## Required exclusions

Cover at minimum: title to real estate, eviction/unlawful detainer, defamation (if state-excluded), malpractice, federal claims (bankruptcy / patents / trademarks), class actions, injunctions/specific performance, family law and probate, claims against the federal government, workers' compensation, mandatory-arbitration disputes, suing a deceased person.

Add up to 3 state-specific exclusions if {STATE} carves out something unusual.

## Sources

Aim for 15-30 sources. Prioritize primary URLs (statutes, court rules, judicial-branch pages). Use sequential IDs `S1`, `S2`, ... and reference them in every `source_ids` array.

## Self-check before returning

- Output is one valid JSON object, no markdown fences, no commentary.
- Every required claim slug appears in `claim_categories[*].claims[*].slug`.
- Every claim has `name`, `example`, `notes` populated (not just slug).
- Every numeric field has a `source_ids` reference somewhere in its parent object.
- Every `source_ids` array references an ID that exists in `sources`.
- `at_a_glance` has 5-7 entries.
- `pitfalls` has at least 6 entries with `what_happens` and `how_to_avoid`.
- `faqs` has at least 6 entries with full answers.
- `state_specific_notes` has at least 5 entries.
