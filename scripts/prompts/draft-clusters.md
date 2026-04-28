# Drafting Pass — Cluster Specifications

You receive an `evidence` JSON object (the Pass 2 evidence pack for one state) and a `cluster_id` (one of A, B, C, D, E). Produce ONLY the markdown for that cluster's sections, in the exact format below. Do not draft sections from other clusters. Do not write a preamble or trailing summary.

## Universal rules (apply to every cluster)

- Use ONLY facts that appear in the evidence pack. Do NOT introduce new facts. If a field in the pack is `null` or empty, write "Not specified by statute" or omit the bullet — never invent a number.
- Render claim entries with their full richness: friendly `name`, the `example` sentence verbatim or near-verbatim, the `claim_statute`, the state-specific `notes`, and the `damage_boost` if present. Do NOT collapse claims into one-line bullets.
- Render category `blurb` text under the category heading.
- Cite each numeric or statutory claim using source IDs from the pack: `[S3]`. Multiple sources: `[S3, S7]`. The citation goes immediately after the fact. In tables, the citation goes inside the same cell as the fact.
- One sentence per fact. No throat-clearing ("It is worth noting...", "Importantly...", "As discussed above...").
- Plain English. No legalese unless quoted from the source.
- Use markdown tables for any list with 3+ rows of comparable structure (fee tiers, SOL by claim, forms).
- Audience: non-lawyers (individuals and small businesses) trying to recover money owed. Currency: 2026.

## Cluster A — Sections 1, 2, 3

### Section 1 format

```
## 1. Jurisdictional limits

- **Most you can sue for:** ${individual} for individuals; ${business} for businesses [<source_ids>].
- **Annual filing cap:** if `evidence.limits.annual_filing_cap.count` is set, write the rule plus statute; otherwise omit the bullet.
- **Splitting a claim:** ${split_claims_explanation} [<source_ids>].
- **What's excluded from the cap:** interest and court costs are excluded [<source_ids>].
```

### Section 2 format

```
## 2. What you can sue for

For each entry in `evidence.claim_categories`:

### <category.title>

<category.blurb>

For each claim in `category.claims`:

- **<claim.name>** — <eligibility>.
  - **Example:** <claim.example>
  - **Statute:** <claim.claim_statute>. <claim.notes> [<claim.source_ids>]
  - **Special remedy:** <claim.damage_boost> (omit this line if damage_boost is empty)
```

Render every claim from the pack. Do not collapse the bullets — the per-claim depth is the point of this section.

### Section 3 format

```
## 3. What you CANNOT sue for

For each entry in `evidence.exclusions`:

- **<category>** — <explanation>. Where to go instead: <where_to_go_instead>. [<source_ids>]
```

## Cluster B — Sections 4, 5, 6, 7

### Section 4 format

```
## 4. Damages and recovery

- **Compensatory damages:** yes / no.
- **Punitive damages:** yes / no — <punitive_explanation>.
- **Statutory multipliers:** if `evidence.damages.statutory_multipliers` is non-empty, list each as a sub-section:
  ### <multiplier.claim>
  <multiplier.explanation> [<multiplier.source_ids>]
  Statute: <multiplier.statute>.
- **Attorney's fees recoverable:** <attorney_fees_recoverable> — <attorney_fees_explanation>.
- **Pre-judgment interest:** ${prejudgment_interest_rate_pct}% — ${prejudgment_interest_statute} (omit if null).
- **Post-judgment interest:** ${postjudgment_interest_rate_pct}% (${postjudgment_interest_type}) — ${postjudgment_interest_statute}. ${postjudgment_interest_notes}
- **Filing/service fees recoverable from defendant if you win:** yes / no.
```

### Section 5 format

```
## 5. Where to file

- **Court name:** <where_to_file.court_name> [<source_ids>].
- **Parent court:** <where_to_file.parent_court>.
- **Venue rules:** render `evidence.where_to_file.venue_rules` as a table with columns `Scenario | Where you can file`. Use bullet points within the cell if `filing_options` has multiple entries.
- **What happens if you file in the wrong venue:** <consequences_of_wrong_venue>.
- **E-filing available:** <e_filing_available> — <e_filing_notes>; portal: <e_filing_portal> if any.
```

### Section 6 format

```
## 6. Filing fees

- **Filing fee tiers:** render `evidence.fees.filing_fee_tiers` as a table `Range | Fee` with the `[Sn]` citation in the Fee cell.
- **Service of process fees:** render `evidence.fees.service_fees` as a table `Method | Cost | Notes` with the `[Sn]` citation in the Notes cell.
- **Other fees:** render `evidence.fees.other_fees` as a table `Item | Cost | Notes` (only if non-empty).
- **Fee waiver:** form <waiver.forms[*].number> (<name>) — <waiver.eligibility_bullets joined>. Coverage: <waiver.coverage_notes>. <if_you_win_notes>
- **Are filing fees recoverable from the defendant if you win?** Yes/No — <fees_recoverable_from_loser_notes>.
```

### Section 7 format

```
## 7. Statute of limitations

Render `evidence.statute_of_limitations.entries` as a single table: `Claim type | Years | Clock starts | Statute`. Add `[Sn]` citations in the Statute cell. If an entry has `notes`, add a sub-bullet beneath the table linking the `claim` to the note.

After the table:

**Discovery rule:** <discovery_rule_notes>.

**Tolling:** <tolling_notes>.
```

## Cluster C — Sections 8, 9, 10

**CRITICAL for cluster C:** every numeric, statute citation, deadline, fee, and form name in this cluster MUST be followed by a bracketed `[Sn]` source citation. The pack's `pre_filing.source_ids`, `service.source_ids`, and `forms[*].source_ids` give you the IDs to use. Cluster C has historically failed validation when the model omits citations on bullet lists — DO NOT do that.

### Section 8 format

```
## 8. Pre-filing requirements

- **Demand letter required?** <pre_filing.demand_letter_required> — <demand_letter_notes> [<source_ids>].
- **Bad-check notice rule:** <bad_check_notice_rule> [<source_ids>] (omit bullet if field empty).
- **Wage-claim demand rule:** <wage_claim_demand_rule> [<source_ids>] (omit if empty).
- **Government claim notice:** <government_claim_required> — deadline <government_claim_deadline_days> days; <government_claim_notes> [<source_ids>].
- **Landlord-tenant pre-filing:** <landlord_tenant_pre_filing_notes> [<source_ids>].
- **Consumer protection pre-filing:** <consumer_protection_notes> [<source_ids>] (omit if empty).
- **Mandatory mediation/ADR before filing:** <mandatory_mediation_before_filing> [<source_ids>].
- **Arbitration clauses in contracts:** courts will enforce — <arbitration_clauses_enforced> [<source_ids>].
```

### Section 9 format

```
## 9. Forms required

Render `evidence.forms` grouped by `group` field. For each group, write:

### <Group title — e.g., "Starting your case">

For each form in this group, write a bullet (NOT a header). Every bullet ends with `[<source_ids>]`:

- **<form.number> — <form.name>** — Filed by: <form.filed_by>. Required: <form.required>. <form.description> [<source_ids>]
```

### Section 10 format

```
## 10. Service of process

- **Who can serve:** bullet list from `evidence.service.who_can_serve`. End list with `[<service.source_ids>]`.
- **Methods accepted:** for each method in `evidence.service.methods`, render a sub-section using its name as a `### ` heading and including its description, pros, cons. End each method's body with `[<method.source_ids>]`.
- **Timing:** ${in_county_days_before_hearing} days (in county); ${out_of_county_days_before_hearing} days (out of county). [<service.source_ids>]
- **Proof of service form:** <proof_of_service_form.number> (<name>); file at least <proof_filing_deadline_days_before_hearing> days before the hearing. [<service.source_ids>]
- **Business service:** <business_service_rule> [<service.source_ids>].
- **Out-of-state defendant:** <out_of_state_defendant_notes> [<service.source_ids>].
- **If you can't locate the defendant:** <cant_find_defendant_notes> [<service.source_ids>].
- **If the defendant is dodging service:** <avoiding_service_notes> [<service.source_ids>].
```

## Cluster D — Sections 11, 12, 13, 14

### Section 11 format

```
## 11. Defendant's response, default, and counterclaims

- **Must file written answer?** <must_file_written_answer> — <response_notes>.
- **Response deadline:** <response_deadline_days> days from service.
- **Default process:** <default_process>.
- **Prove-up required for default?** <prove_up_required> — <prove_up_notes>.
- **Motion to vacate default:** form <motion_to_vacate_form.number> (<name>); standard deadline <motion_to_vacate_deadline_days> days; lack-of-notice exception <motion_to_vacate_lack_of_notice_days> days; appeal denial within <motion_to_vacate_appeal_deadline_days> days. <motion_to_vacate_appeal_notes>
- **Counterclaim:** allowed <counterclaim.allowed>; same monetary cap: <counterclaim.same_monetary_limit>; service deadlines <service_deadline_in_county_days>/<service_deadline_out_of_county_days> days. Form: <counterclaim.form.number> (<name>).
- **If counterclaim exceeds the cap:** transfer available: <counterclaim.transfer_to_higher_court_available>; <transfer_to_higher_court_notes>.
```

### Section 12 format

```
## 12. Hearing procedure

- **Lawyers allowed at trial?** <lawyers_allowed> — <lawyers_allowed_notes>.
- **Format:** <format>; presider: <presider>.
- **Burden of proof:** <burden_of_proof>.
- **What to bring:** bullet list from `evidence.hearing.what_to_bring` (verbatim).
- **Subpoenas:** form <subpoena_form.number> (<name>); witness fee $<witness_fee_per_day_dollars> per day.
- **Free interpreters:** <free_interpreters> — <interpreter_request_process>.
- **Jury option:** <jury_option>.
- **Decision timing:** <decision_timing>.
- **On-site mediation:** <on_site_mediation> — <on_site_mediation_notes>.
```

### Section 13 format

```
## 13. Appeals

- **Who can appeal:** <who_can_appeal>.
- **Deadline:** <deadline_days> days.
- **Fee:** $<fee_dollars>.
- **Type:** <type> — <type_notes>.
- **Attorneys allowed on appeal:** <attorneys_allowed_on_appeal>.
- **Bond required:** <bond_required> — <bond_amount_notes>.
- **Stay of enforcement automatic on appeal?** <automatic_stay_on_appeal>.
- **Default judgment appealable?** <default_judgment_appealable> — <default_judgment_notes>.
- **Notice of appeal form:** <notice_of_appeal_form.number> (<name>).
- **Frivolous appeal penalty:** $<frivolous_appeal_penalty_dollars> — <frivolous_appeal_statute>. <frivolous_appeal_notes>
```

### Section 14 format

```
## 14. Post-judgment collection

- **Payment deadline expectation:** <payment_deadline_typical_days> days.
- **Post-judgment interest rate:** <post_judgment_interest_rate_pct>% — <post_judgment_interest_statute>. <post_judgment_interest_notes>

For each method in `evidence.collection.methods`:

### <method.name>

<method.blurb>

<method.description>

**Estimated cost:** <method.estimated_cost>
**Effectiveness:** <method.effectiveness_notes>

**What's protected (exemptions):**
- bullet list from `method.exemptions`

(Omit empty fields rather than rendering a blank line.)

After the methods:

- **Wage garnishment cap:** <wage_garnishment_max_pct_of_disposable>% of disposable earnings.
- **Judgment lifespan:** <judgment_lifespan_years> years; renewal: <judgment_renewal_process>.
- **Debtor's exam form:** <debtor_exam_form.number> (<name>).
- **Exempt assets:** bullet list from `evidence.collection.exempt_assets`.
- **Bankruptcy effect:** <bankruptcy_effect_notes>.
- **Satisfaction of judgment form:** <satisfaction_of_judgment_form.number> (<name>).
- **Multiple creditors priority:** <priority_notes>.
```

## Cluster E — Sections 15, 16, 17, 18, 19, Sources

### Section 15 format

```
## 15. Special rules for businesses

- **Self-representation allowed?** <self_representation_allowed> — <self_representation_notes>.
- **Can a business send an employee instead of an attorney?** <can_send_employee>.
- **Can a business send an attorney?** <can_send_attorney>.
- **Form for non-attorney representation:** <non_attorney_representation_form.number> (<name>) (omit if empty).
- **Insurance adjuster representation:** <insurance_adjuster_allowed>.
- **Sole proprietor employee exception:** <sole_proprietor_employee_exception>.
- **Out-of-state business plaintiffs:** must register with Secretary of State first: <out_of_state_business_must_register> — <out_of_state_business_statute>.
- **Trade-name (DBA) rule:** <fictitious_name_notes>; form: <fictitious_name_form.number> (<name>).
- **Licensing notes:** <licensing_notes>.
```

### Section 16 format

```
## 16. County-level differences

If `evidence.county_variations_material` is `false` or `evidence.county_variations` is empty, write exactly: "No material county-level differences; small claims procedure is uniform statewide."

Otherwise, list each entry: `- **<county>** (<topic>) — <detail>. [<source_ids>]`.
```

### Section 17 format

```
## 17. Common pitfalls and dismissal reasons

For each entry in `evidence.pitfalls`:

### <pitfall.title>

**What goes wrong:** <pitfall.what_happens>

**How to avoid it:** <pitfall.how_to_avoid> [<pitfall.source_ids>]
```

### Section 18 format

```
## 18. Recent changes

For each entry in `evidence.recent_changes`:

- **<date>** — **<title>**. <description>. <bill_or_rule_citation>. [<source_ids>]

If the array is empty, write: "No material changes in the last three years."
```

### Section 19 format

```
## 19. FAQs

For each entry in `evidence.faqs`:

**Q: <question>**
A: <answer>
```

### Sources

```
## Sources

For each entry in `evidence.sources`:

- **[Sn]** <label> — [<url>](<url>) (<citation> if present)
```

## Self-check before returning

- The output starts with the first `## N.` heading of your cluster and ends with the last section of your cluster (or `## Sources` if you're cluster E).
- No leading/trailing prose, no preamble.
- Per-claim depth: every claim has its `name`, `example`, `notes`, and (where applicable) `damage_boost` rendered. No one-line slug-only bullets.
- Every numeric or statutory claim has a `[Sn]` citation.
- Tables use proper markdown syntax.
- No invented facts — only what's in the evidence pack.
