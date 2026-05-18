# Content brief: state small-claims guide

This is the master spec for every state page in /small-claims/[state]. It is fed verbatim to Claude on every generation run alongside the state's research Pack. To change the spec, edit this file and re-run the generator.

The guide is one long page per state. Every section below lives on that one page. There are no sub-pages.

## Part 1: Writing rules that apply to every section

### 1.1 The four reader sub-intents

Every state page must serve four sub-intents in this order:

1. **Can I sue?** (eligibility, cap, claim types, statute of limitations)
2. **How do I file?** (forms, fees, where, how, deadlines)
3. **What happens next?** (service, answer, hearing, evidence)
4. **How do I collect?** (judgment enforcement, garnishment, liens, appeal)

The reader is usually a pro-se plaintiff or defendant in the middle of a real dispute. Write to them, not to a casual researcher.

### 1.2 The five GEO writing principles

These rules govern how every paragraph and section is written. They are what gets the page cited by AI engines.

**Answer-first.** Every H2 and every H3 leads with a direct answer. Then context. Then nuance. The first 150 to 300 words of a section are what AI engines extract. Bury the answer and lose the citation.

**Heading echo.** When an H2 or H3 is phrased as a question, the answer's opening clause echoes the heading's noun phrase or verb phrase. Examples:

- H3 "How do I serve the defendant?" → answer opens "To serve the defendant in [State], you can..."
- H3 "Which courts hear small claims cases?" → answer opens "The courts that hear small claims cases in [State] are..."
- H3 "How small claims differs from the regular civil docket" → answer opens "Small claims differs from the regular civil docket in three ways..."

LLMs match user prompts against passages whose opening tokens echo the prompt's tokens. Answer-first plus heading-echo outperforms answer-first alone.

**Fact-density.** Every paragraph contains at least one concrete fact: a number, a statute citation, a deadline, a form code, a percentage, a named court, a named portal. Soft hedged prose gets skipped by retrieval.

**Named-entity grounding.** Use the specific proper nouns the page needs to be identified as authoritative: state court system name, statute codes, form codes, named e-filing portals, real dollar amounts, real day-counts. LLMs use entity-grounding as a hallucination check.

**Sourcing discipline.** Every fact, dollar amount, day count, statute citation, form code, and procedural rule on the page must trace to the state's research Pack. If the Pack says "varies by county" or "not specified," the page says the same. No invented figures. When the Pack hedges, the page hedges. This is the YMYL rule for legal content.

### 1.3 Voice and style

The page reads as written by a person, not a model. The reader is not a lawyer. They are figuring this out for the first time, often in the middle of a real money problem. Write to them the way you'd write to a friend who asked. Aim for a 7th-grade reading level. Short sentences, plain words, named documents and named courts, no Latin, no euphemisms.

**Banned LLM-isms (never use, in any context):** delve, navigate (as a verb), leverage (as a verb), tapestry, robust, seamless, unlock, landscape, in today's, it's worth noting, in the realm of, moreover, furthermore, nonetheless, elevate, empower, cutting-edge, holistic, streamline, game-changer, paradigm, foster (as a verb), ecosystem, dive into, embark on, journey (as a verb or metaphor), treasure trove, plethora.

**Banned legalese (replace with plain language).** These phrases are everywhere in legal writing and nowhere in normal speech. Never let them appear in your prose.

| Don't write | Write instead |
|---|---|
| amount in controversy | what you're suing for / the amount you're asking for |
| exclusive of interest and costs | not counting interest and court costs |
| in controversy | at stake / on the line |
| legal capacity | be old enough and mentally competent to bring the case yourself |
| has capacity to sue | can sue (must be 18 or older, mentally competent, and not a debt buyer) |
| commence an action | start a lawsuit / file a case |
| civil action | lawsuit / case |
| respondent | the other side / the defendant |
| petitioner | the person filing the case |
| affiant | the person signing the sworn statement |
| prior to | before |
| subsequent to | after |
| in lieu of | instead of |
| with respect to | about / for |
| pursuant to | under |
| shall | must |
| constitutes | is / counts as |
| hereinafter | from now on (or omit) |
| thereto, thereof, wherein | rewrite the sentence without it |
| treble damages | three times your damages |
| liquidated damages | a penalty written into the law / contract |
| unliquidated | a claim without a fixed dollar amount |
| quasi-contract | unjust enrichment (someone benefiting at your expense) |
| res judicata | already decided |
| in rem | against the property itself |
| in personam | against the person |
| prima facie | on its face / at first glance |
| ex parte | without the other side present |
| de novo | a brand-new trial (gloss on first use, then "de novo" is fine since it's a real term of art) |
| detinue | a lawsuit to get a specific item back |

When you need a real document name or statute citation, use it (e.g., "file the SM-01 Statement of Claim", "Ala. Code § 6-2-34"). When you EXPLAIN a concept, use words a 7th grader knows.

**Acronyms.** Expand on first use, then use the acronym after that: "Servicemembers Civil Relief Act (SCRA)", "Americans with Disabilities Act (ADA)", "Temporary Assistance for Needy Families (TANF)", "Supplemental Nutrition Assistance Program (SNAP)", "Social Security Disability Insurance (SSDI)". Common ones (LLC, DBA, UCC, FAQ) don't need expansion.

**No em-dashes** in prose. Em-dashes are allowed only inside fixed proper nouns (official form names, statute spans) where they appear in the source. Use periods, colons, or commas instead.

**No throat-clearing transitions.** Cut "It's important to note that..." Cut "When it comes to..." Cut "In conclusion..."

**Short sentences.** Lead with the fact. Add qualifiers in a separate sentence if needed. Average sentence length should be around 12-14 words. Sentences over 30 words almost always benefit from being split into two.

**No section dividers.** Do not emit horizontal rules (`---`) between sections. The page template handles visual separation. Just go heading → content → next heading.

### 1.4 Sourcing rules (non-negotiable)

Before writing any state page, the writer has the state Pack open. Every figure on the page comes from the Pack. Specifically:

- If the Pack gives a range (e.g., "6 to 8 weeks to hearing"), the page gives the range. Do not collapse a range to a single number.
- If the Pack gives an approximation (e.g., "approximately $20 to $30 sheriff fee, varies by county"), the page gives the approximation and the variance note.
- If the Pack flags a field as "varies by county," "not specified," or in the "Unknowns / gaps" section, the page mirrors that hedge. Do not invent a figure.
- If the Pack flags a customary practice as not codified (e.g., "6% pre-judgment interest is commonly cited but not uniformly statutory"), the page mirrors that hedge.
- External services, organizations, or programs mentioned on the page (legal aid, lawyer referral services, law school clinics) must either come from the Pack or be verified against a primary source before publication. No plausible-sounding additions from general knowledge.

## Part 2: The master section outline

Every state page contains the following sections in this order. Each section spec gives: the heading formula, the answer block template, what goes in the section, the Pack fields that hydrate it, suggested H3 subsections (with heading-echo openers), FAQ candidates, and a word count target.

### Section 0: Page opener

**H1.** Small Claims Court in [State]: How to File, Limits, Fees, and Collection

The H1 contains "Small Claims Court in [State]" verbatim because it is the highest-volume head term.

**Standfirst.** One sentence in italic right under the H1, around 20 words, telling the reader who this guide is for and what they'll get out of it. Example: *A practical filing-to-collection guide for [State] consumers and small businesses.*

**Key facts block.** An 8-cell summary table of the most-asked figures. Render this as a 2-column markdown table with "Fact" and "Detail" as the headers. Each row is one fact, populated from the Pack.

| Fact | Detail |
|---|---|
| Maximum claim | (Court and venue → Dollar cap) |
| Filing fee | (Fees and payment → Starting filing fee, range if tiered) |
| Court | (Classification → Court division name) |
| Time to hearing | (Hearing → Filing to hearing range as "6 to 8 weeks" or "42 to 56 days", never a single number unless the Pack states one) |
| Attorneys allowed? | (Classification → Yes / No / Yes at appeal only) |
| Deadline to sue on a written contract | (Statute of limitations table → written contract row, e.g., "6 years from breach") |
| Service methods | (Service of process → method list as plain English: e.g., "Court clerk certified mail, sheriff, private process server") |
| Appeal window | (Appeal → Appeal window in days) |

After the key facts table, go straight into Section 1. **Do NOT include a byline (no attorney name, no "Last updated", no "Reading time").** **Do NOT include a table of contents.** The page template renders both of those separately. Just: H1 → standfirst → key facts table → "## 1. What is small claims court in [State]?"

### Section 1: What is small claims court in [State]?

**Answer block (40 to 60 words).** Small claims court in [State] is the [court division name] of the [parent court]. It hears civil money disputes and actions to recover specific personal property up to $[dollar cap]. [Attorneys allowed/not allowed]. Procedure is informal and designed for self-represented parties. Cases typically reach hearing in about [N to M weeks] from filing.

**What to include.**
- Plain-English definition: who hears it, what it's for, why it exists
- How [State]'s small claims fits in the broader civil court structure (small claims vs. limited civil vs. general civil)
- Decision tree: when small claims is the right forum vs. when to file in a higher court
- Whether attorneys are allowed at initial hearing, on appeal, or not at all
- Whether the judgment is binding, whether the case is reported, jury availability

**H3 subsections (heading echo applies to each).**
- "Which court hears small claims cases in [State]?" → answer opens "The court that hears small claims cases in [State] is..."
- "How small claims differs from the regular civil docket" → answer opens "Small claims differs from the regular civil docket in [N] ways..."
- "Is small claims court the right forum for your case?" → answer opens "Small claims is the right forum if..."

**Pack fields used.** Classification → Court division name, Attorneys allowed, Jury trial available. Court and venue → Small claims court name, Dollar cap, Claim types excluded. Hearing → Filing to hearing range.

**Word count target.** 400 to 600 words.

### Section 2: Should you file in [State] small claims?

**Answer block.** You can file in [State] small claims if (1) your claim is for money or specific personal property, (2) the amount is at or below $[dollar cap], (3) the claim type isn't excluded (eviction, family law, real estate title, equitable relief, federal-exclusive matters), (4) [State] has venue, and (5) you have capacity to sue (no minor or assignee restrictions).

**What to include.**
- Five-step eligibility checklist as a numbered list
- What claims belong here: unpaid invoices, security deposit, property damage, breach of small contract, consumer disputes, bad checks, etc.
- What claims do NOT belong here: eviction, family law, real estate title, libel and slander where excluded, workers' comp, federal-exclusive
- Capacity rules: minors, assignees and debt buyers, suspended attorneys, businesses (and proof of entity), government defendants
- Forum-selection and arbitration clauses, including the consumer-contract small-claims carve-out
- Annual filing caps and claim-splitting prohibitions

**H3 subsections.**
- "Cases small claims can hear in [State]" → answer opens "Cases small claims can hear in [State] include..."
- "Cases small claims cannot hear in [State]" → answer opens "Cases small claims cannot hear in [State] include..."
- "Who can sue and who can be sued?" → answer opens "Anyone who sues or is sued in [State] small claims must..."
- "What if you signed a contract with an arbitration clause?" → answer opens "If you signed a contract with an arbitration clause..."

**Word count target.** 500 to 700 words.

### Section 3: How long do you have to sue? Statute of limitations in [State]

**Answer block.** In [State], you generally have [N] years to sue on a written contract, [N] years on an oral contract, [N] years for property damage, and [N] years for personal injury. The clock starts on the date of breach or injury, or the date you discovered the harm for fraud and concealed defects. Miss the deadline and the case is dismissed.

**Required table: Statute of limitations for common claims in [State].**

| Claim type | Limit | Statute | When the clock starts |
|---|---|---|---|

Populate every row from the Pack's SoL table. At minimum: written contract, oral contract, open account, promissory note, property damage, personal injury, conversion, fraud, defamation, breach of warranty, bad check, unpaid wages, security deposit, consumer protection statute, quasi-contract.

**H3 subsections.**
- "When the clock pauses or resets in [State]" → answer opens "The [State] limitations clock pauses or resets..."
- "What happens if you miss the deadline" → answer opens "If you miss the [State] statute of limitations..."

**Word count target.** 500 to 700 words.

### Section 4: Before you file: demand letter and required notices

**Answer block.** In [State], a demand letter is [required / not required / required only for these claim types]. Even when optional, judges expect to see one. Send by certified mail with return receipt, give the defendant [N] days to respond, and keep proof. Government defendants additionally require a tort claim notice within [N] days of the incident, and missing it bars the case.

**What to include.**
- Demand letter rules: required vs. recommended, required content, minimum wait, certified mail requirements
- Pre-suit notice quirks by claim type: bad check, consumer protection (ADTPA / DTPA / CLRA equivalents), landlord notice-to-cure
- Government tort claim notice: deadline, where to send, form code if any, consequence of missing
- Administrative exhaustion if applicable (licensing boards, professional discipline)
- For repeat filers: vary the language of templated demand letters

**H3 subsections.**
- "Do you need a demand letter in [State]?" → answer opens "A demand letter in [State] is..."
- "What to include in a [State] demand letter" → answer opens "A [State] demand letter should include..."
- "Pre-suit notice for special claim types" → answer opens "Pre-suit notice in [State] is required for..."
- "How to sue a city or county in [State]" → answer opens "To sue a city or county in [State], you must..."

**Word count target.** 500 to 700 words.

### Section 5: Identifying and naming the defendant correctly

**Answer block.** Name the defendant exactly as they exist legally: a person by full legal name, a sole proprietor by the owner's name plus DBA, a corporation or LLC by its registered name. Misnaming a corporate defendant is the most common reason small claims judgments can't be collected. Look up business entities in [State]'s Secretary of State business search before filing.

**What to include.**
- How to name each entity type: individual, sole proprietor, partnership, LLC, corporation, foreign company, government
- Where to look up registered agent and exact legal name (name and link the [State] SoS search)
- DBAs and "a/k/a" framing so the judgment is enforceable against all aliases
- Pitfalls: nicknames, juniors and seniors, missing middle initials
- Naming a landlord: the entity on the lease and the property-manager agent
- Online sellers and marketplaces: counterparty vs. platform

**H3 subsections.**
- "How to find a business's legal name in [State]" → answer opens "To find a business's legal name in [State], use..."
- "How to name an LLC or corporation" → answer opens "An LLC or corporation in [State] is named by..."
- "How to name a sole proprietor or DBA" → answer opens "A sole proprietor in [State] is named by..."
- "How to amend if you discover the wrong name after filing" → answer opens "If you discover the wrong name after filing, you can..."

**Word count target.** 400 to 600 words.

### Section 6: The forms you need to file in [State]

**Answer block.** [State] requires [N] forms to start a small claims case: the [primary claim form code and name] to open the case, the [summons form] (issued by the clerk), and optionally the [fee waiver form] if you can't afford the filing fee. All are available free at [state forms URL] as fillable PDFs.

**Required table: [State] small claims forms.**

| Form code | Name | Purpose | Filed by | Link |
|---|---|---|---|---|

Populate from the Pack's forms array.

**H3 subsections.**
- "Which forms open the case?" → answer opens "The forms that open a [State] small claims case are..."
- "Which forms does the defendant file?" → answer opens "The forms the defendant files in [State] are..."
- "How to fill out the [State] claim form" → answer opens "To fill out the [State] claim form, you..."
- "What if you can't afford the filing fee?" → answer opens "If you can't afford the [State] filing fee, you file..."

**Word count target.** 500 to 800 words.

### Section 7: Where to file, and how (in person, mail, e-file)

**Answer block.** File in the [county-court / justice court / district court] where the defendant lives, where the contract was signed or performed, or where the events occurred. [State] accepts filings in person, by mail, and through the [e-file portal] at [URL]. Most counties process filings within [N] business days and issue a hearing date about [N to M weeks] out.

**H3 subsections.**
- "Which county do you file in?" → answer opens "The county you file in is..."
- "How to file in [State] small claims" → answer opens "To file in [State] small claims you can..."
- "How to e-file in [State]" → answer opens "To e-file in [State], create an account at..."
- "What happens if you file in the wrong county?" → answer opens "If you file in the wrong county in [State]..."

**Word count target.** 500 to 700 words.

### Section 8: Filing fees, service fees, and fee waivers in [State]

**Answer block.** Filing fees in [State] small claims start at $[X] for claims up to $[Y] and rise to $[Z] for the maximum. Service of process adds $[X] (sheriff) or $[Y] (certified mail). If you can't afford the fees, file the [fee waiver form]. [State] courts grant waivers for filers showing inability to pay without depriving themselves of necessities. Filing fees are recoverable as court costs if you win.

**Required tables.**

| Claim amount | Filing fee | Notes |
|---|---|---|

| Service method | Cost | When to use |
|---|---|---|

**H3 subsections.**
- "How much does it cost to file in [State]?" → answer opens "Filing a [State] small claims case costs..."
- "How much does service cost?" → answer opens "Service in [State] costs..."
- "Can you get the filing fee waived?" → answer opens "You can get the [State] filing fee waived by filing..."
- "Are filing fees recoverable if you win?" → answer opens "Filing fees in [State] are recoverable if..."

**Word count target.** 400 to 600 words.

### Section 9: Serving the defendant in [State]

**Answer block.** [State] allows [N] methods to serve a small claims defendant: [sheriff / constable], certified mail with return receipt, a private process server, court-ordered alternate service, and publication (last resort). The clerk typically arranges service for you. The defendant has [N] days to answer after in-state service ([N] days if out of state), and proof of service must be filed before the case can proceed.

**Required table: Service methods in [State].**

| Method | Allowed | Cost | When to use |
|---|---|---|---|

**H3 subsections (one per method, plus edge cases).**
- "Service by sheriff or constable" → answer opens "Service by sheriff in [State] is..."
- "Service by certified mail" → answer opens "Service by certified mail in [State] is..."
- "Service by private process server" → answer opens "Service by a private process server in [State] requires..."
- "Court-ordered alternate or substituted service" → answer opens "Court-ordered alternate service in [State] is allowed when..."
- "Service by publication" → answer opens "Service by publication in [State] is a last resort that..."
- "What if the defendant refuses or evades service?" → answer opens "If the defendant refuses or evades service in [State]..."
- "Serving a military defendant" → answer opens "To serve a military defendant in [State], you must..."

**Word count target.** 600 to 900 words.

### Section 10: The defendant's response

**Answer block.** After service, the defendant in [State] has [N] days to file an Answer (admitting, denying, or asserting defenses) and may file a counterclaim up to $[dollar cap]. If the counterclaim exceeds the cap, the case is transferred out of small claims to [higher court]. If the defendant files nothing, the plaintiff can apply for a default judgment after [N] days.

**H3 subsections.**
- "How long does the defendant have to respond?" → answer opens "The defendant in [State] has..."
- "What goes in the answer?" → answer opens "A [State] Answer must include..."
- "Can the defendant counterclaim?" → answer opens "The defendant can counterclaim in [State] by..."
- "What if the counterclaim exceeds the small claims cap?" → answer opens "If the counterclaim exceeds the [State] cap..."

**Word count target.** 400 to 500 words.

### Section 11: Preparing for and attending the hearing

**Answer block.** [State] small claims hearings happen about [N to M weeks] after filing. They're informal bench trials before a judge with no jury. Bring [N] copies of every exhibit, all your witnesses, and a 2 to 3 minute summary of your case. The judge usually rules from the bench or mails the judgment within a few days.

**What to include.**
- Time from filing to hearing (Pack's filing-to-hearing range, displayed as a range)
- How to prepare: 2 to 3 minute case summary, chronological exhibit list, witness brief, expected defense arguments
- What to bring: copies of every exhibit, originals, witness contact info, damages calculation
- Evidence: hearsay rules (technically apply, relaxed in practice), authentication of documents, photos, texts (timestamps, sender info), recordings (state's one-party vs. two-party consent rule), electronic signatures (state UETA equivalency)
- Expert testimony treatment (informal in small claims, no formal qualification procedure)
- Witnesses: how to subpoena, cost, lead time, subpoena form code
- Continuance rules: written motion, judge's discretion, good cause standard
- Phone or video appearance: allowed in [State]? How to request? Lead time? Reflect whatever the Pack says. If the Pack says "not provided for by statewide rule," reflect that without overclaiming availability.
- No-show consequences: plaintiff no-show = dismissal (often with prejudice), defendant no-show = default, both no-show = dismissal
- Courtroom etiquette: dress, arrival time, addressing the judge as "Your Honor"

**H3 subsections.**
- "When does your hearing happen?" → answer opens "Your [State] small claims hearing happens..."
- "How to prepare your case" → answer opens "To prepare your [State] small claims case..."
- "What evidence is admissible in [State]?" → answer opens "Evidence admissible in [State] small claims includes..."
- "How to subpoena a witness" → answer opens "To subpoena a witness in [State], you..."
- "Can you appear by phone or video?" → answer opens "Phone or video appearance in [State] small claims is..."
- "Continuances and what happens if you can't attend" → answer opens "A continuance in [State] small claims is..."

**Word count target.** 700 to 1,000 words. This is the most queried section.

### Section 12: Mediation, interpreters, and ADA accommodations

**Answer block.** [State] offers [free / paid] court-annexed mediation, usually [when offered]. Interpreters are available in [languages]. Request one from the clerk in writing as early as possible. ADA accommodations (wheelchair access, sign-language interpreter, document accessibility) are requested through the clerk's office.

**H3 subsections.**
- "Is mediation available in [State] small claims?" → answer opens "Mediation in [State] small claims is..."
- "How to request a court interpreter" → answer opens "To request a court interpreter in [State], you..."
- "How to request an ADA accommodation" → answer opens "To request an ADA accommodation in [State], contact..."

**Sourcing note.** Where the Pack gives a specific interpreter lead time, use it. Where the Pack is silent, say "as early as possible" rather than inventing a number.

**Word count target.** 300 to 450 words.

### Section 13: What you can recover (and statutory damages multipliers)

**Answer block.** If you win in [State] small claims, you can recover the underlying damages, court costs (filing fee, service fee, subpoena fees), and post-judgment interest at [N]% per year. Pre-judgment interest is [N]% where authorized. Attorney's fees are recoverable only when a contract or statute authorizes them and you actually had a lawyer. Certain claims trigger statutory multipliers, for example security deposit (up to [N]x damages).

**Required table: Statutory damages multipliers in [State].**

| Claim type | Multiplier or formula | Conditions | Statute |
|---|---|---|---|

**Sourcing note for pre-judgment interest.** If the Pack flags pre-judgment interest as customary practice rather than codified, the page mirrors that hedge.

**H3 subsections.**
- "What costs are recoverable in [State]?" → answer opens "Costs recoverable in [State] include..."
- "How does interest work on [State] judgments?" → answer opens "Interest on [State] judgments runs at..."
- "When can you recover attorney's fees?" → answer opens "Attorney's fees in [State] small claims are recoverable when..."
- "Statutory damages multipliers in [State]" → answer opens "[State] statutes that multiply damages in small claims include..."

**Word count target.** 500 to 700 words.

### Section 14: Getting a default judgment when the defendant doesn't respond

**Answer block.** If the defendant in [State] doesn't file an answer within the deadline, you can apply for a default judgment. File the default application or affidavit, attach proof of service and an SCRA (military status) affidavit, and if damages aren't liquidated, attend a brief prove-up hearing. The court enters judgment and you can begin collection.

**H3 subsections.**
- "When can you ask for a default judgment in [State]?" → answer opens "You can ask for a default judgment in [State] after..."
- "What you file to get a default" → answer opens "To get a default in [State], you file..."
- "Can the defendant vacate a default in [State]?" → answer opens "A defendant can vacate a [State] default by..."

**Word count target.** 300 to 450 words.

### Section 15: Appealing a small claims judgment in [State]

**Answer block.** In [State], either party can appeal a small claims judgment to [higher court] within [N] days. The appeal is a [trial de novo / on-the-record review], meaning the case is heard [fresh / only on the existing record]. An appeal bond may be required to stay collection. Filing fees and procedural rules in the appellate court are stricter, and attorneys are typically allowed.

**H3 subsections.**
- "Who can appeal and when?" → answer opens "Either party in [State] small claims can appeal within..."
- "What kind of appeal is it?" → answer opens "An appeal in [State] small claims is..."
- "What does an appeal cost?" → answer opens "An appeal in [State] costs..."
- "Does an appeal stop collection?" → answer opens "An appeal stops collection in [State] when..."

**Word count target.** 300 to 450 words.

### Section 16: Collecting your judgment in [State]

**Answer block.** Winning is half the battle, and [State] doesn't collect for you. After the [N]-day appeal window, you can record an abstract of judgment to create a lien on the debtor's real property, apply for a writ of execution to levy non-exempt assets, garnish wages [up to N% / where allowed], levy bank accounts, and order the debtor to appear for a debtor's exam. The judgment is good for [N] years and renewable.

This is the longest section. Structure as numbered subsections.

**Numbered subsections (each is its own H3, heading-echo rule applies).**
- 16.1 Wait for the appeal window to close → answer opens "The appeal window in [State] is..."
- 16.2 Get an abstract or certificate of judgment → answer opens "An abstract of judgment in [State] is..."
- 16.3 Writ of execution → answer opens "A writ of execution in [State] authorizes..."
- 16.4 Wage garnishment → answer opens "Wage garnishment in [State] is allowed up to..." [or, where prohibited: "Wage garnishment for consumer debts in [State] is prohibited under..."]
- 16.5 Bank levy or account garnishment → answer opens "A bank levy in [State] works by..."
- 16.6 Debtor's examination → answer opens "A debtor's examination in [State] is..."
- 16.7 Satisfaction of judgment → answer opens "A satisfaction of judgment in [State] is filed when..."
- 16.8 Judgment renewal → answer opens "A [State] judgment is valid for [N] years and renewable by..."
- 16.9 Collecting from an out-of-state debtor (UEFJA) → answer opens "To collect from an out-of-state debtor, you domesticate the judgment by..."
- 16.10 What's exempt from collection in [State] → answer opens "[State] protects the following property from collection..."

**Sourcing note for 16.4.** Wage garnishment availability and caps vary significantly by state. Several states (including Texas, Pennsylvania, North Carolina, and South Carolina) have meaningful restrictions on garnishment of consumer wages, but the exact rule must come from the state's own Pack.

**Required table for 16.10: [State] exemptions from collection.**

| Category | Amount exempt | Statute | Notes |
|---|---|---|---|

**Word count target.** 1,000 to 1,500 words.

### Section 17: State-specific quirks and pitfalls in [State]

**Answer block.** [State] has several rules that surprise filers: [top 2 to 3 quirks in one sentence each]. Knowing them up front prevents wasted filings and lost cases. The most consequential is [single most important quirk].

5 to 10 quirks pulled directly from the Pack's State-specific quirks section. Each quirk is around 2 sentences: the rule plus why it matters.

**Word count target.** 400 to 700 words.

### Section 18: Sources and citations

A visible numbered list of every primary source the page cites.

**Format per source.**

1. [Statute or page title]. [Jurisdiction or domain]. [Link]. Cited for: [what the page is cited for].

**Word count target.** 200 to 400 words.

### Section 19: Frequently asked questions

12 to 18 questions. Each answer is 40 to 80 words. The answer's first clause echoes the question (heading-echo rule).

**Recommended FAQ inventory (mix per state).**
- What is the maximum amount you can sue for in [State] small claims court?
- How much does it cost to file a small claims case in [State]?
- How long do I have to sue in [State] small claims?
- Do I need a lawyer for [State] small claims court?
- Can a business sue or be sued in [State] small claims?
- How do I serve the defendant in [State]?
- How long does it take to get a hearing in [State] small claims?
- What happens at a [State] small claims hearing?
- What if the defendant doesn't show up in [State]?
- What if I miss my [State] small claims hearing?
- Can I appeal a [State] small claims judgment?
- How do I collect a [State] small claims judgment?
- Can I garnish wages in [State]?
- How long is a [State] small claims judgment valid?
- Can I sue a city or government agency in [State] small claims?
- Do I have to send a demand letter before filing in [State]?
- What forms do I need to file in [State] small claims?
- Can I file [State] small claims online?
- Does [State] small claims have a jury?
- What's the [State] security deposit penalty?

**Word count target.** 800 to 1,200 words.

### Section 20: When to call a lawyer (and disclaimer)

**What to include.**
- When this guide is enough (routine consumer dispute, simple invoice, security deposit return)
- When to hire a lawyer (claim near the cap, ambiguous statute of limitations, ongoing relationship with defendant, complex business contract, government defendant, collection that will be hard)
- Where to find low-cost legal help in [State]: state bar lawyer referral, state legal aid, law school clinics. **Only mention these if they appear in the Pack or are verified primary-source links.**
- Standard disclaimer: general legal information, not advice, no attorney-client relationship.

**Word count target.** 150 to 250 words.

## Part 3: Closing principles

**Sourcing discipline is non-negotiable.** Every fact traces to the Pack. No invented figures, no ranges collapsed to single numbers, no plausible-sounding additions from general knowledge. When the Pack hedges, the page hedges.

**Answer-first plus heading-echo is the GEO unlock.** Every section opens with a direct answer whose first clause echoes the heading. This is what gets the page cited.

**Don't fight Nolo on head terms. Beat them on procedural depth.** The wedge is collection mechanics, exemption schedules, state-specific quirks, and statute-of-limitations granularity. The Pack already has this depth. Surface it.
