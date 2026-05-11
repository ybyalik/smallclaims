// State-level deep-research prompts. Four parallel calls, each focused on a
// different topic cluster. Output is a markdown findings dossier with inline
// citations; a downstream extraction pass turns it into structured JSON.
//
// Why four calls: a single-call prompt covering all 37 sections ran out of
// token budget mid-output (reasoning + many web searches consumed the cap
// before the model finished writing). Splitting into four focused calls
// gives each call its own ~100k output budget and lets the model do deep
// research on a bounded topic.
//
// Bounded open-ended sweeps: five sections allow the model to enumerate
// state-specific items beyond the standard categories, capped at 15 items
// per sweep with explicit word limits. This captures long-tail state quirks
// without producing runaway output.

export type StateCallId = 1 | 2 | 3 | 4;

const SHARED_HEADER = (stateName: string) => `You are conducting deep state-level procedural research on small claims court for ${stateName}, USA. The output will be reused across thousands of cases in this state — once researched, it does NOT get re-run per customer. Your output is procedural and informational research only — never legal advice.

DO NOT personalize. There is no specific plaintiff, defendant, county, or claim amount. Cover the STATE as a whole. County-level variation should be noted ("varies by county") and summarized at a statewide level, but not enumerated per county.

OUTPUT CONTRACT (mandatory)

Output is a FINDINGS DOSSIER, not a narrative. Use compact markdown:
- H2 (##) for each numbered section, in the order given below, exact heading text.
- Under each H2, use bullets. One fact per bullet. Each fact ends with an inline markdown citation: [source title](URL).
- Use H3 sub-headings inside a section only when bullets group naturally.
- Tables are allowed where they convey information faster (fee schedules, statute of limitations by claim type, exemption amounts, evidence categories).
- Do NOT write paragraphs of prose. Do NOT include an introduction, executive summary, or sign-off.
- Do NOT restart, retry, or revise. Each section appears exactly once.
- Length budget: 3,000 to 5,000 words total. If you can't fit a low-value detail, drop it; never restart.

BOUNDED OPEN-ENDED SWEEPS

Some sections instruct you to do a "bounded open-ended sweep." When you see that instruction:
- List up to 15 additional items not covered by the standard categories above.
- One bullet per item, each ≤ 40 words (or ≤ 50 if the section specifies that limit).
- Stop at 15 even if more exist. If you stop at the cap, add a final bullet: "Cap reached — more may exist."
- Do NOT skip these sections to save tokens. Their purpose is to capture state-specific items the standard categories miss.

SOURCES — official only:
- Statewide judiciary self-help portals (njcourts.gov, courts.ca.gov, txcourts.gov, mass.gov/courts, etc.)
- State statutes and rules of court (cite the specific section/rule number)
- Statewide e-filing portals and official form pages (prefer direct PDF links)
- State agency pages relevant to specific claim types (DOL for wage, AG for consumer protection, Human Rights Commission, etc.)
- Secretary of State business-entity search portals (when researching defendant identification)
- County clerk pages only when statewide source confirms the county-level variation matters

Federal sources (.uscourts.gov, sba.gov, ftc.gov) only when federal law overlays state procedure (Servicemembers Civil Relief Act, federal wage garnishment cap, UEFJA model).

CITATION RULES
- Every concrete fact (court name, fee, deadline, form code, statute, percent, dollar amount) carries an inline markdown link to the source URL.
- If sources contradict, surface the contradiction in-place. Do not restart.
- Prefer current pages; flag any page that looks stale ("page last updated YYYY" if you see it).

CONTENT RULES
- Procedural information only. Never strategic advice.
- State rules and cite them. Do not compute or apply.
- If you cannot find authoritative information for a section, write one bullet describing what's missing and move on. Do NOT omit the section heading.`;

const PROMPT_1 = (stateName: string) => `${SHARED_HEADER(stateName)}

REPORT STRUCTURE — CALL 1 (COURT STRUCTURE, VENUE, JURISDICTION, AND SCOPE)

Produce exactly these 9 sections in this order, with these exact H2 headings.

# Filing research — Call 1: Court Structure, Venue, and Scope

## 1. Court name and divisions
- Official name of the small claims division in this state (e.g., "Justice of the Peace Court" in TX, "Special Civil Part – Small Claims Section" in NJ).
- Parent court system.
- How it differs from adjacent divisions in the same court system (regular civil docket, housing court, landlord-tenant division).

## 2. Jurisdictional dollar caps
- Cap for individuals.
- Cap for businesses (if different).
- Any tiered limits (e.g., consumer credit transactions, security deposits, landlord-tenant rent claims, eviction-attached money claims).
- Statute citation for the cap.
- Recent changes to the cap (last 5 years).

## 3. Decision tree between divisions
- When a case at $X belongs in small claims vs. the regular civil docket vs. housing court vs. another division.
- What happens if you file in the wrong division (dismissal, transfer, fee forfeiture).

## 4. Venue and county selection
The geographic county a plaintiff may properly file in. Cover:
- The default venue rule (where defendant resides; where contract was signed; where services performed; where damages occurred — list the options the state recognizes and their priority order).
- Venue rule for LLCs, corporations, and partnerships (registered office, principal place of business, where the business has agents).
- Venue rule for out-of-state defendants (long-arm scope and where they can be sued in this state).
- Venue rule for landlord-tenant disputes (usually where the rental property is located — confirm).
- Venue rule for vehicle accident / property damage (usually where the incident occurred — confirm).
- Multiple defendants in different counties — which county wins.
- Transfer-of-venue procedure: form code (if any), deadline to move, who decides.
- Consequences of filing in the wrong venue (dismissal, transfer, fee shifting).
- Whether improper venue is waived if the defendant doesn't raise it in time.
- Statute and rule citations.

## 5. What this division CAN hear
Standard categories (cover each in 2–4 bullets):
- Contract disputes (written, oral, debt, unpaid invoices, IOUs, promissory notes).
- Property damage (personal property, real property, vehicle).
- Landlord-tenant money disputes (security deposits, unpaid rent for money only).
- Consumer disputes (defective products, services not rendered, refunds).
- Wage and employment money claims.
- Personal injury (state whether and at what cap).
- Other named state-specific categories.

### Bounded open-ended sweep — state-specific claim types
List up to 15 additional claim types that consumers can realistically bring in this state's small claims division but don't fit the standard categories above. Examples: automatic-renewal cancellation refunds, towing-without-authorization claims, ride-share/gig disputes, HOA disputes, niche statutory causes of action under state-specific consumer-protection laws. One bullet each, ≤ 40 words. Cap at 15.

## 6. What this division CANNOT hear
Standard exclusions:
- Evictions (recovering possession of real property).
- Defamation, libel, slander (if excluded).
- Family law, divorce, custody.
- Real estate title.
- Class actions.
- Equitable relief (injunctions, specific performance, declaratory judgment).
- Federal claims belonging in federal court.

### Bounded open-ended sweep — state-specific exclusions
List up to 15 additional carve-outs unique to this state. Examples: matters subject to mandatory pre-suit arbitration under state statute, claims with exclusive jurisdiction elsewhere (admiralty, probate, juvenile, tax court, PUC), administrative-exhaustion requirements before suit, specific statutes that route a claim type to a different forum. One bullet each, ≤ 40 words. Cap at 15.

## 7. Forum-selection and arbitration clauses
- Whether arbitration clauses in consumer contracts can knock the case out of small claims.
- Whether small claims is a typical carve-out from consumer arbitration agreements.
- Cite the controlling state case law or statute.

## 8. Filing-frequency caps and claim-splitting
- Per-plaintiff annual filing limits if the state has them, and the threshold.
- Rules against splitting one larger claim into multiple smaller suits.

## 9. Who can sue and who can be sued
- Age requirements (minor representation by guardian / next friend).
- Whether LLCs, corporations, and partnerships can appear without an attorney (and if so, by whom — officer, employee, registered agent).
- Restrictions on assignees and debt buyers (some states bar or limit them).
- Business licensing requirements (e.g., unlicensed contractors barred from collecting).
- Out-of-state plaintiffs.
- Government defendants (with reference to Call 2 for notice-of-claim rules).
- Incarcerated parties and parties under legal disability.

After "## 9. Who can sue and who can be sued", output NOTHING further. The next character after the last bullet is end-of-output.

Begin output now with "# Filing research — Call 1: Court Structure, Venue, and Scope".`;

const PROMPT_2 = (stateName: string) => `${SHARED_HEADER(stateName)}

REPORT STRUCTURE — CALL 2 (DEADLINES AND PRE-FILING)

Produce exactly these 6 sections in this order, with these exact H2 headings.

# Filing research — Call 2: Deadlines and Pre-filing

## 1. Statute of limitations — master table
Produce a markdown table covering every common claim type with the state's deadline and the controlling statute. At minimum include rows for:
- Written contract
- Oral contract
- Open account / book debt
- Promissory note
- Property damage
- Personal injury
- Fraud
- Wage and hour claims
- Unpaid wages — final paycheck
- Security deposit (landlord-tenant)
- Conversion / civil theft
- Defamation (libel, slander) — if cognizable
- Negligence (general)
- Breach of warranty (sale of goods)
- Bad check / NSF
- Consumer-protection statute violations
- Trespass to chattels
- Quasi-contract / unjust enrichment

Each row: claim type | years | statute citation | when the clock starts.

## 2. Tolling, discovery rule, and clock resets
- Tolling rules (defendant out of state, plaintiff under disability, fraudulent concealment).
- Discovery rule (when does the clock start in fraud / latent defect cases).
- Partial-payment restart (does a partial payment or written acknowledgment of debt restart the clock).

## 3. Demand letter rules
- Required by statute for any claim type? List which.
- Strongly recommended for which categories.
- Minimum days a plaintiff must wait after sending the demand before filing.
- Certified mail required? Return receipt required?
- What MUST the demand letter contain (exact dollar amount, response deadline, itemized damages, mailing address for response, specific statutory language).

## 4. Agency exhaustion requirements
- DOL or state labor commissioner for wage claims (when filing with the agency is a prerequisite to suit).
- AG / consumer protection bureau for consumer claims.
- Human Rights Commission / EEOC for discrimination (where applicable to small claims at all).
- Insurance commissioner for insurance disputes.
- PUC for utility disputes.
- Any other category-specific exhaustion requirement.

## 5. Tort Claims Act notice (government defendants)
- Whether notice of claim is required before suing a government entity.
- Deadline in days from the incident.
- What form to use (code + URL if available).
- Where notice is sent.
- Statute citation.
- Consequences of missing the notice deadline.

## 6. Pre-suit notice quirks by claim type
### Bounded open-ended sweep — claim-specific pre-suit notice
List up to 15 specific pre-suit notice or pre-filing requirements unique to particular claim types in this state. Examples: 30-day certified-mail demand for bad check before triple damages, 14-day right-to-cure notice for some landlord-tenant claims, written demand requirement for wage liquidated damages, automatic-renewal cancellation notice rules. One bullet each, ≤ 40 words. Cap at 15.

After "## 6. Pre-suit notice quirks by claim type", output NOTHING further.

Begin output now with "# Filing research — Call 2: Deadlines and Pre-filing".`;

const PROMPT_3 = (stateName: string) => `${SHARED_HEADER(stateName)}

REPORT STRUCTURE — CALL 3 (DEFENDANT IDENTIFICATION, FORMS, FEES, FILING, AND SERVICE)

Produce exactly these 10 sections in this order, with these exact H2 headings.

# Filing research — Call 3: Defendant ID, Forms, Fees, Filing, and Service

## 1. Business defendant identification
- Secretary of State business-entity search portal name and URL.
- What information the lookup returns (entity name, status, principal office, registered agent name and address, formation date).
- Required legal naming convention on filings (e.g., "Acme Plumbing LLC" must be sued by full legal name including "LLC"; not "Acme Plumbing").
- DBA / fictitious name rules: whether a trade name may be sued directly, whether the underlying entity must be named, whether a DBA registration certificate must be attached.
- Registered agent service requirements (whether service must go through the registered agent for LLCs/corporations).
- Foreign (out-of-state) entity rules: whether they must register to do business in the state, where to find their in-state registered agent.
- Sole proprietor naming rules (individual name vs. business name; whether the individual must be named).
- Consequences of misnaming the defendant (judgment unenforceable, dismissal, amendment required).
- Procedure to amend the defendant's name after filing (form code if any, deadline, whether leave of court is required).

## 2. State-issued forms — complete list
For every state-level form a self-represented plaintiff might need from filing through judgment, list:
- Form code (e.g., SC-100, DC-DEM, JP Civil Form 7).
- Full name.
- Direct PDF URL on the official judiciary site.
- Purpose (one short bullet).
- Whether fillable online.
- Filing channel (mail / in-person / e-file / all).
- Who files it (plaintiff / defendant / either / court).

Cover at minimum: complaint or statement of claim, summons, civil cover sheet (if state-level), proof of service, answer, counterclaim, fee waiver application, default judgment request, motion to vacate, subpoena, satisfaction of judgment, abstract of judgment, writ of execution, garnishment forms, notice of appeal.

## 3. Filing fee schedule
- Brackets by claim amount with the exact dollar fee for each.
- Statutory authority for the schedule.
- Whether any portion is a recoverable cost if the plaintiff wins.
- County-level surcharges (note whether they exist and that they vary; do not enumerate per county).

## 4. Fee waiver
- Eligibility criteria (income thresholds, accepted public-benefits programs like SNAP, TANF, Medicaid, SSI).
- Form code, name, and PDF URL.
- What the waiver covers (filing fee only? service fees? appeal fees?).
- Processing timeline.

## 5. Service-of-process fees
- Sheriff fee range (note county variation).
- Certified mail through the clerk vs. plaintiff-arranged.
- Private process server typical cost range.
- Publication cost for alternate service.

## 6. Filing methods — statewide policy
- Methods authorized by statewide rule: in-person, mail, drop-box, e-file, fax.
- E-filing portal name (Odyssey Guide & File, eFileTexas, eCourts NJ, etc.) and URL.
- Account required? Accepted file types and size limits.
- Whether e-filing is mandatory, optional, or unavailable for self-represented plaintiffs at the state level.

## 7. Filing timing and processing
- Daily filing cutoff time for in-person, mail, and e-file (when is a same-day filing considered "filed today" vs. next business day).
- Whether the filing date is the submission date or the clerk-acceptance date.
- Weekend and holiday handling.
- Electronic timestamp rules for e-file (submitted vs. accepted; rejection workflow).
- Correction window if a filing is rejected (how many days the plaintiff has to fix and resubmit while preserving the original filing date).

## 8. Statewide summary of county operational variance
- E-filing prevalence statewide (rough percentage of counties on the statewide portal, percentage on local systems, percentage paper-only).
- Portal vendor mix (Tyler/Odyssey vs. Journal Technologies vs. in-house vs. paper-only).
- Whether mediation prevalence is statewide-mandated, county-mandated, or optional.
- Whether the clerk arranges service or the plaintiff arranges service (which is the statewide default).
- Whether counties commonly require local supplemental forms (cover sheets, fee sheets, local civil information statements) beyond the state forms.
- Whether remote (Zoom/phone) appearances are statewide policy, county-by-county, or banned.
Note: this is a statewide-level summary of where variance lives. Do NOT enumerate per county.

## 9. Service of process — methods and rules
For each method the state authorizes for small claims (sheriff, certified mail, personal service by non-party adult, private process server, alternate service, publication):
- Allowed for this division? Yes / no / conditional.
- Cost basis.
- Deadline relative to the hearing date (in days, separately for in-county and out-of-county defendants).
- Proof-of-service form code.
- Special rules for business defendants (registered agent service rules from Section 1).
- Special rules for out-of-state defendants (long-arm statute citation).

### Service edge cases (cover each in 1–3 bullets)
- Substitute service / "nail-and-mail" (when allowed; procedure).
- Service on apartments, gated communities, and addresses with no individual mailbox.
- Military defendants (Servicemembers Civil Relief Act affidavit requirement, automatic stay risks).
- Incarcerated defendants.
- Certified mail refusal (does refusal count as service; remedies).
- Evading service (motion for alternate service; affidavit of diligent search).

## 10. Defendant's response requirements
- Must the defendant file a written answer? Or is appearance at the hearing sufficient?
- Deadline to file the answer (in days from service).
- Answer form code if any.
- Consequences of no answer (default judgment process, prove-up requirements, Servicemembers Civil Relief Act affidavit).
- Motion to vacate default: deadline (in days from judgment notice), longer window if no notice was received, form code.

After "## 10. Defendant's response requirements", output NOTHING further.

Begin output now with "# Filing research — Call 3: Defendant ID, Forms, Fees, Filing, and Service".`;

const PROMPT_4 = (stateName: string) => `${SHARED_HEADER(stateName)}

REPORT STRUCTURE — CALL 4 (HEARING THROUGH COLLECTION)

Produce exactly these 12 sections in this order, with these exact H2 headings.

# Filing research — Call 4: Hearing Through Collection

## 1. Hearing process and logistics
- Typical days from filing to first hearing (statewide range; note county variation).
- What to bring (exhibits, copies count — typically 3, original + 2).
- Exhibit format requirements.
- Evidence rules and hearsay treatment (relaxed in this division?).
- Recording rules (court records the proceeding? Parties may record?).
- Continuance rules (deadline to request, fee, who can object).
- Witness subpoena process (form code, fee, service method, deadline).
- Phone or video appearance availability and how to request.

### Admissible evidence categories
For each category, state whether it's admissible in this division and any state-specific rule:
- Screenshots and emails.
- Text messages and chat logs (and how to authenticate).
- Electronic signatures (e.g., DocuSign).
- Repair estimates (one estimate vs. multiple; written vs. verbal).
- Invoices and receipts.
- Business records affidavits (form code if any).
- Audio and video recordings (and whether this is a one-party or two-party consent state for recording, with statute citation).
- Photographs (chain-of-custody requirements, if any).
- Expert opinions (whether allowed without formal qualification in small claims).

## 2. Settlement and consent procedures
- Stipulated dismissals (form code if any, who signs, with or without prejudice).
- Consent judgments (court-recorded settlement turned into an enforceable judgment).
- Court-recorded payment plans (whether the court enforces installment agreements between parties).
- Satisfaction-of-judgment filings after settlement.
- Confidentiality of settlements.
- Effect of settlement on a pending hearing date.

## 3. Default judgment process
- When the plaintiff can move for default.
- Whether the judge can enter default without a hearing (fixed-dollar claims) or requires a prove-up hearing (claims with no fixed amount).
- Prove-up evidence required.
- Servicemembers Civil Relief Act affidavit requirement.
- Plaintiff no-show consequences (dismissal with or without prejudice).

## 4. Counterclaims and removal to higher court
- Whether defendants can file counterclaims in this division.
- What happens if the counterclaim exceeds the small claims cap (transfer / removal).
- Form code for counterclaim filing.
- Jury demand triggers.

## 5. Court-annexed mediation
- Whether the court offers free same-day mediation.
- When in the timeline it's offered (before hearing? day of?).
- How to opt in.
- Whether mediation is mandatory for any claim type at the state level.

## 6. Court interpreter and ADA accommodations
- Interpreter request process (statewide policy).
- Lead time in days.
- Languages the state provides interpreters for.
- Interpreter request form code if statewide.
- ADA accommodations request process and statewide ADA coordinator contact (if centralized; otherwise note "per courthouse").
- ADA request form code if statewide.
- Multilingual forms availability (which languages the state publishes its forms in).

## 7. Recoverable amounts and interest
- Costs the prevailing party can recover (filing fee, service fee, witness fees, others — itemize).
- Costs explicitly NOT recoverable (lost wages, travel, attorney's time when self-represented).
- Pre-judgment interest rate (with statute citation, simple vs. compound, when it begins running).
- Post-judgment interest rate (with statute citation, how it's calculated — fixed, indexed to T-bill, etc.).
- Attorney's fees: when authorized (specific statutes, contract clauses), and whether self-represented parties can recover them.

## 8. Appeal mechanics
- Days to appeal from the judgment notice.
- Who can appeal (both parties? prevailing party limited?).
- Type of appeal: trial de novo (brand-new trial) vs. on the record (appellate review).
- Filing fee for the appeal.
- Bond / supersedeas requirement (amount, who posts, exemptions, whether a cash deposit substitutes).
- Whether the appeal automatically pauses collection (automatic stay).
- Rules for enforcement pending appeal if no automatic stay.
- Whether defendants who lost by default can appeal directly or must first move to vacate.
- Frivolous appeal penalties (cap and statute if any).

## 9. Post-judgment collection — methods
For each method, give a 2–4 bullet description:
- Writ of execution (court order to seize non-exempt assets).
- Wage garnishment (continuing or one-time).
- Bank levy (one-time freeze on funds in the account at moment of service).
- Debtor's examination (post-judgment discovery; form code, fee).
- Abstract of judgment / judgment lien on real property (recording procedure, county recorder fee).
- Satisfaction of judgment (required after payment? consequences of failing to file).
- Judgment renewal deadline and process (judgment lifespan years, renewal form).
- UEFJA domestication (registering an out-of-state judgment).
- Bankruptcy automatic stay effects.

### Practical enforcement limitations
- Whether wage garnishment is available for consumer-debt judgments (some states heavily restrict).
- Bank-levy procedural barriers (notice requirements, exemption claims, lookback periods).
- Sheriff involvement requirements (which methods require the sheriff vs. the plaintiff acting directly).
- States that effectively make collection difficult (high exemptions, restrictive garnishment).

## 10. Wage garnishment cap and exemption schedule
- State cap on wage garnishment as a percent of disposable earnings (and whether the state restricts below the federal 25% cap).
- Whether the debtor elects federal or state exemptions, and the deadline / form for the election.

### Exemption schedule — exhaustive
Produce a markdown table of every income or asset category the state exempts from collection. Include at minimum: homestead, motor vehicle, tools of trade, household goods, jewelry, retirement accounts (state-specific carve-outs), federal benefits (Social Security, SSI, VA, unemployment, workers' comp), child support, life insurance proceeds, wildcard exemption. Each row: category | dollar amount cap (if any) | statute citation | notes.

## 11. Statutory damages multipliers
### Bounded open-ended sweep — statutory multipliers
Every state-specific statute that authorizes more than compensatory damages for a specific claim type. List up to 15. Examples: NJSA 46:8-21.1 → 2x wrongful retention of security deposit; MA G.L. c. 149 §150 → 3x unpaid wages; TX Prop. Code §92.109 → 3x + $100 bad-faith security deposit; consumer-protection treble damages statutes. Each bullet: statute citation | multiplier (2x, 3x, etc.) | what claim type and conditions | mandatory or discretionary. ≤ 50 words per bullet. Cap at 15.

## 12. State-specific quirks and pitfalls
### Bounded open-ended sweep — quirks
Catch-all for state-specific facts that don't fit the standard categories. List up to 15. Examples: unique pre-suit notice rules, special evidence rules, weird local statutes, judiciary-published common filing errors, special programs (lemon-law diversion, debt-buyer documentation requirements, mandatory consumer-credit mediation). ≤ 50 words per bullet. Cap at 15.

After "## 12. State-specific quirks and pitfalls", output NOTHING further.

Begin output now with "# Filing research — Call 4: Hearing Through Collection".`;

export const CALL_TITLES: Record<StateCallId, string> = {
  1: "Court Structure, Venue, and Scope",
  2: "Deadlines and Pre-filing",
  3: "Defendant ID, Forms, Fees, Filing, and Service",
  4: "Hearing Through Collection",
};

export function getStatePrompt(call: StateCallId, stateName: string): string {
  switch (call) {
    case 1:
      return PROMPT_1(stateName);
    case 2:
      return PROMPT_2(stateName);
    case 3:
      return PROMPT_3(stateName);
    case 4:
      return PROMPT_4(stateName);
  }
}
