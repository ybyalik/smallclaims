# Drafting Pass — Cluster Specifications

You will receive an `evidence` JSON object (the Pass 1 research pack for one state) and a `cluster_id` (one of A, B, C, D, E). Produce ONLY the markdown for that cluster's sections, in the exact format below. Do not draft sections from other clusters. Do not write a preamble or trailing summary.

## Universal rules (apply to every cluster)

- Use ONLY facts that appear in the evidence pack. Do NOT introduce new facts. If a field in the pack is `null` or empty, write "Not specified by statute" or omit the bullet — never invent a number.
- Cite each numeric or statutory claim using the source IDs from the pack: `[S3]`. Multiple sources: `[S3, S7]`. The citation goes immediately after the fact.
- One sentence per fact. No throat-clearing ("It is worth noting...", "Importantly...", "As discussed above...").
- Plain English. No legalese unless cited.
- Use tables for any list with 3+ rows of comparable structure (fee tiers, SOL by claim, forms).
- Audience: non-lawyers (individuals and small businesses) trying to recover money owed. Currency: 2026.

## Cluster A — Sections 1, 2, 3

```
## 1. Jurisdictional limits

- **Most you can sue for:** {evidence.limits.individual_max_dollars} for individuals; {evidence.limits.business_max_dollars} for businesses [{statute citation}].
- **Limit on number of cases per plaintiff per year:** {from evidence.limits.annual_filing_cap}.
- **Splitting a claim into multiple filings:** {evidence.limits.split_claims_allowed} — {evidence.limits.split_claims_notes}.
- **What's excluded from the cap:** {interest_excluded_from_cap, court_costs_excluded_from_cap as one-line summary}.

## 2. What you can sue for

Group the bullets under the category headings below, in this order. For each entry in `evidence.claims_eligibility`, output ONE bullet:

`- **<slug>** — <eligibility>. <notes_one_line>. Statute: <statute>. [<source_ids>]`

If `notes_one_line` or `statute` is empty, omit that piece. If the slug isn't in the pack, skip it.

### Contracts and money owed
written-contract, oral-contract, personal-loan, promissory-note, unpaid-invoice, unpaid-rent, bad-check, co-signer

### Consumer disputes
defective-product, bad-service, auto-repair, contractor, subscription-cancellation, used-car, false-advertising

### Property damage
vehicle-collision, neighbor-property, damage-to-rental, pet-damage

### Landlord-tenant (money only)
security-deposit, unpaid-rent-by-tenant, repair-and-deduct

### Employment and wages
unpaid-wages, unpaid-commission

### Personal claims
minor-injury

### Vehicle-specific
mechanic-dispute, wrongful-tow

### State-specific extras
Include only if the pack has an extra eligible claim slug not in the list above.

## 3. What you CANNOT sue for

For each entry in `evidence.exclusions`, output ONE bullet:

`- **<category>** — <explanation_one_line>. Where to go instead: <where_to_go_instead>. [<source_ids>]`
```

## Cluster B — Sections 4, 5, 6, 7

```
## 4. Damages

- **Compensatory damages:** yes/no.
- **Punitive damages:** yes/no — <punitive_notes>.
- **Statutory multipliers:** if `evidence.damages.statutory_multipliers` is non-empty, render as a table with columns `Claim | Multiplier | Statute`.
- **Attorney's fees recoverable:** <attorney_fees_recoverable> — <attorney_fees_notes>.
- **Pre-judgment interest:** <prejudgment_interest_rate_pct>% — <prejudgment_interest_statute>.
- **Post-judgment interest:** <postjudgment_interest_rate_pct>% — <postjudgment_interest_statute>.
- **Filing/service fees recoverable from defendant if you win:** yes/no.

## 5. Where to file

- **Court name:** <evidence.court.small_claims_court_name>.
- **Parent court:** <evidence.court.parent_court_system>.
- **Venue rules:** render `evidence.venue.rules` as a table with columns `Scenario | Where you can file`.
- **What happens if you file in the wrong venue:** <evidence.venue.wrong_venue_consequence>.
- **E-filing available:** <evidence.venue.e_filing_available> — <e_filing_notes>; portal: <e_filing_portal_url> if any.

## 6. Filing fees

- **Filing fee tiers:** render `evidence.fees.filing_fee_tiers` as a table with columns `Range | Fee`. Use `${range_min}-${range_max} | $${fee}` per row.
- **Service of process fees:** render `evidence.fees.service_fees` as a table with columns `Method | Cost | Notes`.
- **Fee waiver:** form <evidence.fees.waiver_forms[*].number> (<name>) — <waiver_eligibility_one_line>. Coverage: <waiver_coverage_notes>.
- **Are filing fees recoverable from the defendant if you win?** <evidence.fees.filing_fees_recoverable_from_loser>.

## 7. Statute of limitations

Render `evidence.statute_of_limitations` as a single table: `Claim type | Years | Clock starts | Statute`.

After the table, add a short paragraph (one or two sentences) on tolling exceptions from `evidence.tolling_notes_one_line`.
```

## Cluster C — Sections 8, 9, 10

```
## 8. Pre-filing requirements

- **Demand letter required?** <evidence.pre_filing.demand_letter_required> — <demand_letter_notes>.
- **Bad-check 30-day notice rule:** <bad_check_30_day_notice> (omit bullet entirely if empty).
- **Wage-claim demand rule:** <wage_claim_demand_rule> (omit if empty).
- **Government claim notice:** <government_claim_notice_required> — deadline <government_claim_deadline_days> days; <government_claim_notes>.
- **Mandatory mediation or ADR before filing:** <mandatory_mediation_before_filing>.
- **Arbitration clauses in contracts:** courts will enforce — <arbitration_clauses_enforced>.

## 9. Forms required

Render `evidence.forms` as a table: `Form number | Form name | Filed by | Required | Purpose`. List the 8-12 most-used forms in the pack only.

## 10. Service of process

- **Who can serve:** bullet list from `evidence.service.who_can_serve`.
- **Methods accepted:** render `evidence.service.methods` as a table `Method | When valid | Pros | Cons`.
- **Timing rule:** <in_county_days_before_hearing> days (in county); <out_of_county_days_before_hearing> days (out of county).
- **Proof of service form:** <proof_of_service_form.number> (<proof_of_service_form.name>); file at least <proof_filing_deadline_days_before_hearing> days before the hearing.
- **Business service rule:** <business_service_rule>.
- **Out-of-state defendant:** <out_of_state_defendant_notes>.
- **What to do if you can't locate the defendant:** <cant_find_defendant>.
```

## Cluster D — Sections 11, 12, 13, 14

```
## 11. Defendant's response and default

- **Must file written answer?** <must_file_written_answer>.
- **Response deadline:** <response_deadline_days> days from service.
- **Default process:** <default_process>.
- **Prove-up required for default?** <prove_up_required> — <prove_up_notes>.
- **Motion to vacate default:** form <motion_to_vacate_form.number> (<name>); deadline <motion_to_vacate_deadline_days> days; <motion_to_vacate_lack_of_notice_days> days if you never received notice.
- **Counterclaim:** allowed <counterclaim_allowed>; same monetary cap: <counterclaim_same_cap>; deadlines <counterclaim_deadline_in_county_days>/<counterclaim_deadline_out_of_county_days> days; if it exceeds the cap: <counterclaim_exceeds_cap>.

## 12. Hearing procedure

- **Lawyers allowed at trial?** <lawyers_allowed> — <lawyers_allowed_notes>.
- **Format:** <format>; typical length <typical_length_minutes> minutes.
- **Burden of proof:** <burden_of_proof>.
- **What to bring:** bullet list from `evidence.hearing.what_to_bring`.
- **Subpoenas:** form <subpoena_form.number> (<name>); witness fee $<witness_fee_per_day> per day.
- **Free interpreters:** <free_interpreters> — <interpreter_request_process>.
- **Jury option:** <jury_option>.
- **Decision timing:** <decision_timing>.
- **On-site mediation:** <on_site_mediation>.

## 13. Appeals

- **Who can appeal:** <who_can_appeal>.
- **Deadline:** <deadline_days> days.
- **Fee:** $<fee_dollars>.
- **Type:** <type>.
- **Bond required:** <bond_required> — <bond_amount_notes>.
- **Stay of enforcement automatic on appeal?** <automatic_stay_on_appeal>.
- **Default judgment appealable?** <default_judgment_appealable> — <default_judgment_notes>.
- **Notice of appeal form name:** <notice_of_appeal_form_name>.

## 14. Post-judgment collection

- **Payment deadline expectation:** <payment_deadline_typical_days> days.
- **Post-judgment interest rate:** <post_judgment_interest_rate_pct>% — <post_judgment_interest_statute>.
- **Collection methods:** for each entry in `evidence.collection.methods`, write a sub-section starting with `### <name>` followed by `<blurb>` and `<description>`. If `estimated_cost` is set, add a `**Cost:**` line. If `effectiveness_notes` is set, add an `**Effectiveness:**` line. If `exemptions` is non-empty, list as bullets under `**What's protected:**`.
- **Wage garnishment cap:** <wage_garnishment_max_pct_of_disposable>% of disposable earnings.
- **Judgment lifespan:** <judgment_lifespan_years> years; renewal: <judgment_renewal_process>.
- **Exempt assets:** bullet list from `evidence.collection.exempt_assets`.
- **Bankruptcy effect:** <bankruptcy_effect_notes>.
- **Multiple creditors priority:** <priority_notes_one_line>.
```

## Cluster E — Sections 15, 16, 17, 18, 19, Sources

```
## 15. Special rules for businesses

- **Can a business represent itself or must it use an attorney?** <self_representation_allowed> — <self_representation_threshold_notes>.
- **Form required for non-attorney representation:** <non_attorney_representation_form.number> (<name>) (omit bullet if empty).
- **Sole-proprietor exception:** <sole_proprietor_exception>.
- **Out-of-state business plaintiffs:** must register with Secretary of State first: <out_of_state_business_must_register>; statute: <out_of_state_business_statute>.
- **Trade-name (DBA) rule:** <trade_name_rule>.

## 16. County-level differences

If `evidence.county_variations_material` is `false`, write exactly: "No material county-level differences; small claims procedure is uniform statewide."

Otherwise, list each entry from `evidence.county_variations` as: `- **<county>** — <summary_one_line>. [<source_ids>]`.

## 17. Common pitfalls and dismissal reasons

For each entry in `evidence.pitfalls`, write a bullet: `- **<pitfall>** — <one-sentence what happens>. How to avoid: <one sentence>.`

If the pack supplied only the title (no detail), use your judgment based on universal small-claims procedure to provide a brief two-sentence treatment per pitfall — but do NOT cite a statute unless the pack provides one.

## 18. Recent changes

For each entry in `evidence.recent_changes`, write a bullet: `- **<date>** — <summary_one_line>. <bill_or_rule_citation>. [<source_ids>]`. If the array is empty, write: "No material changes in the last three years."

## 19. FAQs

5-8 questions. Use `evidence.faq_topics_to_cover` as the topic list. For each topic, write:

```
**Q: <question phrased naturally>**
A: <2-3 sentence answer drawn from the rest of the evidence pack>.
```

## Sources

Numbered list of every source from `evidence.sources`. Each entry:
`[Sn] <label> — <url>`
```

## Self-check before returning

- The output starts with the first `## N.` heading of your cluster and ends with the last section of your cluster (or `## Sources` if you're cluster E).
- No leading/trailing prose, no preamble.
- Every numeric or statutory claim has a source citation.
- Tables use proper markdown syntax with `|` separators and a `|---|---|` header row.
- No invented facts — only what's in the evidence pack.
