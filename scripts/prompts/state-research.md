## OUTPUT REQUIREMENTS — READ FIRST

Produce a structured small-claims-court guide for **{STATE}** that maps directly to a published data file. Output is markdown with EXACTLY the section headings shown below and the EXACT sub-structure described under each. The goal is structured data, not a long-form essay.

This report has 16 numbered sections plus a final `## Sources` section. **Do not stop until all 17 are present.** Each section has a target token budget shown in [brackets]; staying within budget is more important than completeness within a section.

**Concision rules — apply throughout:**
- One sentence per fact. No throat-clearing ("It is worth noting...", "Importantly...", "As discussed above...").
- Cite each statute inline ONCE; do not re-explain it.
- Use tables for any fact that appears 3+ times (fee tiers, SOL by claim type, forms, county differences).
- Keep examples to one short sentence. No multi-paragraph hypotheticals.
- Do NOT include any analysis of "common pain points" or "why this matters." Stick to procedural facts.

**Citation rules:**
- Cite official `.gov` sources (state courts, statutes, judicial council) wherever possible.
- For every concrete number, deadline, fee, or form, cite the specific statute, court rule, or local rule (e.g., "Cal. Code Civ. Proc. § 116.220").
- All citations collected in `## Sources` at the end. Inline citations use `[¹]`-style numeric anchors that match.
- If something is genuinely uncertain, ambiguous, or recently changed, flag it explicitly with a "⚠️ Verify" note rather than guessing.

**Audience:** non-lawyers (individuals and small-business owners) who want to recover money owed to them. Plain English. No legalese unless cited.

**Currency:** all facts current as of 2026.

---

## 1. Jurisdictional limits [target: 1,500 tokens]

Required sub-fields (use bold labels):
- **Most you can sue for:** dollar cap with statute citation
- **Same cap for individuals and businesses?** yes/no plus any per-type variation
- **Limit on number of cases per plaintiff per year:** yes/no, conditions if yes
- **Splitting a claim into multiple filings:** allowed/not allowed plus statute
- **What's excluded from the cap:** typically interest and court costs

## 2. What you can sue for [target: 5,000 tokens]

Cover EXACTLY the claim slugs listed below. For each one, output a single bullet in this format:

```
- **<claim slug>** — <eligible | conditional | not eligible>. <One-sentence example.> Statute: <citation if material, else omit>. <One-line state-specific note ONLY if eligibility or damages turn on it; otherwise omit>.
```

**Group the bullets under these category headings (in order):**

### Contracts and money owed
Cover these slugs only:
- written-contract
- oral-contract
- personal-loan
- promissory-note
- unpaid-invoice
- unpaid-rent
- bad-check (note any state statutory penalty multiplier)
- co-signer

### Consumer disputes
- defective-product
- bad-service
- auto-repair
- contractor (home repair / abandonment)
- subscription-cancellation
- used-car (note state lemon law if relevant)
- false-advertising (note state UDAP statute and damage multiplier)

### Property damage
- vehicle-collision
- neighbor-property
- damage-to-rental (tenant damages landlord property)
- pet-damage

### Landlord-tenant (money only — eviction is separate)
- security-deposit (state any per-state penalty for bad-faith withholding, like 2x or 3x damages, and the deadline rule)
- unpaid-rent-by-tenant
- repair-and-deduct (state remedy if applicable)

### Employment and wages
- unpaid-wages (note any state penalty wages, e.g., waiting-time penalty)
- unpaid-commission

### Personal claims
- minor-injury (under the cap; note when state defamation or PI is excluded entirely)

### Vehicle-specific
- mechanic-dispute
- wrongful-tow

**Do NOT cover:** any claim slug not in the list above. If a claim type that's distinctive to {STATE} would be a real-world dispute (e.g., a state-specific statutory cause of action), add at most ONE extra bullet under a final sub-heading "### State-specific extras" — but only if the cause of action is genuinely material in this state.

## 3. What you CANNOT sue for [target: 1,500 tokens]

List the top 10-12 exclusions for {STATE}, each as a bullet:
```
- **<exclusion category>** — <one-sentence explanation>. Where to go instead: <court or process>.
```

Cover at minimum: eviction/unlawful detainer, family law, defamation (if state-excluded from small claims), title to real estate, malpractice, federal claims (bankruptcy / patents / trademarks), class actions, injunctions/specific performance, claims against the federal government, workers' compensation, mandatory-arbitration disputes.

Add up to 2 state-specific exclusions if {STATE} carves out something unusual (e.g., personal injury entirely barred from JP court).

## 4. Damages [target: 1,200 tokens]

Output as a bullet list of bold labels:
- **Compensatory damages:** yes/no
- **Punitive damages:** yes/no plus brief reason
- **Statutory multipliers in this state:** list as a sub-bullet table, one per claim — `claim | multiplier | statute`
- **Attorney's fees recoverable:** yes/no/sometimes plus brief explanation
- **Pre-judgment interest:** yes/no, rate, statute
- **Post-judgment interest:** rate, statute
- **Filing/service fees recoverable from defendant if you win:** yes/no

## 5. Where to file [target: 1,500 tokens]

- **Court name:** (e.g., Justice Court, District Court, Conciliation Court)
- **Parent court:** (e.g., Justice of the Peace Court System)
- **Venue rules** as a table — `Scenario | Where you can file`. Cover at minimum: defendant residence, where contract was performed, where injury/damage occurred, multiple defendants, out-of-state defendant.
- **What happens if you file in the wrong venue:** dismiss vs. transfer
- **E-filing available:** yes/no/varies; portal URL if any

## 6. Filing fees [target: 1,200 tokens]

- **Filing fee tiers** as a table: `Range | Fee` (e.g., "$0 to $1,500 | $30")
- **Service of process fees** as a table: `Method | Cost | Notes`. Cover sheriff, certified mail by clerk, private process server.
- **Fee waiver process:** form name and number, brief eligibility, scope of waiver
- **Are filing fees recoverable from the defendant if you win?** yes/no

## 7. Statute of limitations [target: 1,500 tokens]

A single table: `Claim type | Years | Clock starts | Statute`. Cover at minimum:
written contract, oral contract, sale-of-goods (UCC), promissory note, open account, personal injury, property damage, fraud (note discovery rule), bad check, unpaid wages, security deposit, judgment enforcement.

Brief paragraph after the table on tolling exceptions specific to this state.

## 8. Pre-filing requirements [target: 800 tokens]

- **Demand letter required?** yes/no, by claim type if mixed
- **Bad-check 30-day notice rule:** if applicable, summarize
- **Wage-claim demand rule:** if applicable, summarize
- **Government claim notice:** required for tort claims against state/city/county? deadline?
- **Mandatory mediation or ADR before filing:** none / by court / by claim type
- **Arbitration clauses in contracts:** courts will enforce yes/no

## 9. Forms required [target: 1,200 tokens]

A table: `Form number | Form name | Filed by | Required | Purpose`. List the 8-12 most-used forms only (complaint, summons, answer, default judgment motion, witness subpoena, IFP affidavit, satisfaction of judgment, garnishment writs, transcript of judgment). Skip rarely-used forms.

## 10. Service of process [target: 1,500 tokens]

- **Who can serve** as a bullet list (sheriff, certified mail by clerk, private process server, adult non-party)
- **Methods accepted** as a table: `Method | When valid | Pros | Cons`
- **Timing rule:** how many days before hearing service must be completed
- **Proof of service form:** form number and name
- **Business service rule:** how to serve a corporation/LLC (registered agent, etc.)
- **Out-of-state defendant:** brief
- **What to do if you can't locate the defendant:** brief

## 11. Defendant's response and default [target: 1,200 tokens]

- **Must file written answer?** yes/no
- **Response deadline:** number of days from service
- **Default process:** what happens if defendant doesn't appear
- **Prove-up required for default?** yes/no
- **Motion to vacate default:** form name, deadline, grounds
- **Counterclaim:** allowed yes/no, same monetary cap?, deadline rule, what happens if counterclaim exceeds the cap

## 12. Hearing procedure [target: 1,500 tokens]

- **Lawyers allowed at trial?** yes/no/restricted
- **Format:** bench trial / referee / judge / panel; typical length per case
- **Burden of proof:** preponderance / clear and convincing
- **What to bring:** bullet checklist of evidence types
- **Subpoenas:** form number, witness fee per day
- **Free interpreters:** yes/no; how to request
- **Jury option:** yes/no
- **Decision timing:** on the spot vs. mailed
- **On-site mediation:** offered yes/no/by county

## 13. Appeals [target: 1,000 tokens]

- **Who can appeal:** plaintiff / defendant / either
- **Deadline:** number of days
- **Fee:** dollar amount
- **Type:** trial de novo / on the record / questions of law only
- **Bond required:** yes/no; amount
- **Stay of enforcement automatic on appeal?** yes/no
- **Default judgment appealable?** yes/no
- **Notice of appeal form name**

## 14. Post-judgment collection [target: 2,000 tokens]

- **Payment deadline expectation:** typical number of days
- **Post-judgment interest rate:** percent and statute
- **Collection methods** as a sub-section list, each with a brief description: voluntary payment / wage garnishment / bank levy / property lien / writ of execution / debtor's exam / driver's license suspension (if state allows for vehicle judgments)
- **Wage garnishment cap:** percent of disposable earnings, plus state-specific exemption thresholds
- **Judgment lifespan:** years; renewal process and form
- **Exempt assets** as a bullet list (homestead value, vehicle exemption value, retirement, federal benefits, etc.)
- **Bankruptcy effect:** automatic stay; which judgments survive

## 15. Special rules for businesses [target: 800 tokens]

- **Can a business represent itself or must it use an attorney?** yes/no plus any threshold (revenue/asset based)
- **Form required for non-attorney representation:** form number/name if any (e.g., Power of Attorney, Certificate of Representation)
- **Sole-proprietor exception:** brief
- **Out-of-state business plaintiffs:** must register with Secretary of State first? yes/no; statute
- **Trade-name (DBA) rule:** must use legal entity name, not trade name

## 16. County-level differences [target: 800 tokens]

ONLY include if {STATE} has materially different small-claims procedures by county or judicial district. Otherwise write "No material county-level differences; small claims procedure is uniform statewide."

If material, list the top 3-5 most populous counties with a single bullet each in this format:
```
- **<county name>** — <1-2 sentence summary of what's different (court location, mediation availability, e-filing variation, schedule)>.
```

## 17. Common pitfalls and dismissal reasons [target: 1,200 tokens]

List the top 8-10 most common reasons cases get dismissed or fail in {STATE}, each as a bullet in this format:
```
- **<pitfall title>** — <one-sentence what happens>. How to avoid: <one sentence>.
```

Cover at minimum: wrong defendant naming, wrong venue, statute of limitations expired, bad service, asking for non-monetary relief in small claims, no-show by plaintiff, defaulting and trying to appeal, judgment-proof debtor.

## 18. Recent changes [target: 600 tokens]

Output ONLY material changes in the last 3 years (2023-2026). For each, one bullet:
```
- **<YYYY-MM-DD or "YYYY">** — <change summary>. <Bill or rule citation if applicable>.
```

If no material changes, write "No material changes in the last three years."

## 19. FAQs [target: 800 tokens]

5-8 questions only. Pick the highest-traffic questions a non-lawyer would actually ask:
```
**Q: <question>**
A: <2-3 sentence answer>.
```

Cover at minimum: do I need a lawyer, how long does it take, what's the maximum, what happens if defendant doesn't show, can I appeal, how long is a judgment good for.

## Sources

Numbered list of every cited source. Each entry:
```
[N] <Label> — <URL> (<short citation, e.g., "Cal. Code Civ. Proc. § 116.220">)
```

Aim for 12-20 sources, all primary (official statutes, court websites, judicial council) wherever possible. No blog posts or law-firm marketing pages unless they cite a primary source we can't find directly.

---

## SELF-CHECK BEFORE YOU FINISH (do not skip)

Scan your output and verify:
- Sections 1 through 19 are all present, each with the correct numbered heading (`## N. <name>`)
- A `## Sources` section follows section 19
- Each section's target token budget is roughly respected (do not exceed 5,000 tokens on any one section)
- Every dollar amount, deadline, and form number has a citation

If anything is missing, write the missing sections now under the correct heading. Do not output a summary or sign-off. The report is INCOMPLETE until all 19 numbered sections plus Sources appear.
