// v2 state guide template. Renders the 11 AI-explained peer sections from
// structured_pack + state_page_content. Field names below mirror the
// actual pack shape (verified against new-york). Sections / cards that
// have no usable data hide themselves so the page never shows "—" rows.

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Breadcrumbs from "../../../../components/Breadcrumbs";
import type { StateContent } from "../../../../lib/state-page-content/load";
import { humanize, humanizeList } from "../../../../lib/state-page-content/humanize";

interface Props {
  state: { slug: string; name: string };
  data: StateContent;
}

const fmtMoney = (n: number | undefined | null): string | null => {
  if (n === undefined || n === null || Number.isNaN(n)) return null;
  return "$" + Math.round(n).toLocaleString("en-US");
};
const cents = (c: number | undefined | null): number | undefined =>
  typeof c === "number" ? c / 100 : undefined;
const moneyFromCents = (c: number | undefined | null): string | null =>
  fmtMoney(cents(c) ?? null);

// Render a section frame. The header always renders so the page anchor is
// stable; the children render conditionally.
function Section({
  id,
  eyebrow,
  title,
  body,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="v2-section">
      <div className="v2-section-head">
        <span className="v2-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {body ? (
        <div className="v2-prose">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      ) : null}
      {children}
    </section>
  );
}

export default function NewStateGuide({ state, data }: Props) {
  const { pack, content } = data;

  // Hero numbers
  const cap = typeof pack.claim_limit_dollars === "number" ? pack.claim_limit_dollars : undefined;
  const feeTiers = (pack.filing_fee_tiers ?? []) as Array<{
    fee_cents?: number;
    amount_band?: string;
    applies_to?: string;
  }>;
  const feeCentsValues = feeTiers
    .map((t) => t.fee_cents)
    .filter((v): v is number => typeof v === "number" && v > 0);
  const feeLow = feeCentsValues.length ? Math.min(...feeCentsValues) / 100 : undefined;
  const feeHigh = feeCentsValues.length ? Math.max(...feeCentsValues) / 100 : undefined;
  const daysToHearing =
    typeof pack.hearing_logistics?.typical_days_filing_to_hearing === "number"
      ? pack.hearing_logistics.typical_days_filing_to_hearing
      : undefined;

  // Claim cap tiers
  const capTiers = (pack.claim_cap_tiers ?? []) as Array<{
    cap_cents?: number;
    court_level?: string;
    applies_when?: string;
  }>;

  // Excluded claims (array of strings)
  const excluded = (pack.excluded_claim_types ?? []) as string[];

  // SOL entries
  const sols = (pack.statute_of_limitations_by_claim_type ?? []) as Array<{
    years?: number;
    citation?: string;
    claim_type?: string;
    when_clock_starts?: string;
  }>;

  // Fees
  const serviceFeeCents =
    typeof pack.fee_schedule?.service_fee_cents === "number"
      ? pack.fee_schedule.service_fee_cents
      : undefined;
  const motionFeeCents =
    typeof pack.fee_schedule?.motion_fee_cents === "number"
      ? pack.fee_schedule.motion_fee_cents
      : undefined;
  const juryFeeCents =
    typeof pack.fee_schedule?.jury_demand_fee_cents === "number"
      ? pack.fee_schedule.jury_demand_fee_cents
      : undefined;

  // Fee waiver. eligibility_criteria can be string OR string[].
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawWaiver = pack.fee_schedule?.fee_waiver as any;
  const feeWaiver = rawWaiver
    ? {
        available: rawWaiver.available !== false,
        eligibility_text:
          typeof rawWaiver.eligibility_criteria === "string"
            ? rawWaiver.eligibility_criteria
            : Array.isArray(rawWaiver.eligibility_criteria)
              ? rawWaiver.eligibility_criteria.filter(Boolean).join(" ")
              : "",
        form_code: typeof rawWaiver.form_code === "string" ? rawWaiver.form_code : "",
        form_url: typeof rawWaiver.form_url === "string" ? rawWaiver.form_url : "",
      }
    : null;

  // Filing
  const govTort = pack.government_tort_claim_notice as
    | {
        required_for_government_defendants?: boolean;
        deadline_days?: number;
        statute?: string;
        recipient_address?: string;
        form_code?: string;
      }
    | undefined;
  const efile = pack.efile_portal as
    | {
        name?: string;
        url?: string;
        account_required?: boolean | null;
        accepted_file_types?: string[];
      }
    | undefined;
  const efileHasContent = !!(
    efile &&
    (efile.name?.trim() ||
      efile.url?.trim() ||
      typeof efile.account_required === "boolean" ||
      efile.accepted_file_types?.length)
  );

  // Damages
  const multipliers = (pack.statutory_multipliers ?? []) as Array<{
    multiplier?: number | string;
    claim_types?: string[];
    statute?: string;
    conditions?: string;
  }>;
  const prejudgmentInterest = (pack.prejudgment_interest_by_claim_type ?? []) as Array<{
    claim_type?: string;
    rate_percent?: number;
    citation?: string;
    statute?: string;
  }>;
  const postJudgmentInterest =
    typeof pack.collection_details?.post_judgment_interest_rate_percent === "number"
      ? pack.collection_details.post_judgment_interest_rate_percent
      : undefined;

  // Service
  const serviceMethods = (pack.service_methods ?? []) as Array<{
    method?: string;
    allowed?: boolean;
    cost_cents?: number;
    notes?: string;
    deadline_days_before_hearing?: number;
    proof_of_service_form_code?: string;
  }>;
  const allowedServiceMethods = serviceMethods.filter((m) => m.allowed !== false);

  // Hearing
  const hearing = pack.hearing_logistics as
    | {
        copies_required?: number;
        typical_days_filing_to_hearing?: number;
        phone_video_appearance_allowed?: boolean;
        exhibit_format?: string;
        hearsay_rules?: string;
        recording_rules?: string;
        continuance_rules?: string;
        witness_subpoena_process?: string;
        default_proveup_required?: boolean;
        plaintiff_no_show_consequence?: string;
      }
    | undefined;

  // Mediation
  const mediation = pack.court_mediation as
    | { available?: boolean; when?: string; process?: string; free?: boolean | null }
    | undefined;

  // Accommodations
  const accommodations = pack.accommodations as
    | {
        available_languages?: string[];
        interpreter_lead_time_days?: number;
        interpreter_request_process?: string;
        ada_request_process?: string;
        ada_request_form_code?: string;
      }
    | undefined;
  const langs = (accommodations?.available_languages ?? []).filter(
    (l) => l && !l.toLowerCase().includes("others arranged"),
  );
  const accommodationsHasContent = !!(
    langs.length ||
    accommodations?.interpreter_lead_time_days ||
    accommodations?.ada_request_process ||
    accommodations?.interpreter_request_process
  );

  // Appeals
  const appeals = pack.appeal_details as
    | {
        type?: string;
        window_days?: number;
        who_can_appeal?: string;
        motion_to_vacate_default_window_days?: number;
      }
    | undefined;

  // Collection: post_judgment_steps is an array of strings; methods come from
  // collection_details (free-text process descriptions per channel).
  const postJudgmentSteps = (pack.post_judgment_steps ?? []) as string[];
  const collectionDetails = pack.collection_details as
    | {
        wage_garnishment_cap_pct?: number;
        bank_levy_process?: string;
        debtors_exam_process?: string;
        abstract_of_judgment_process?: string;
        judgment_renewal_years?: number;
        exemption_details?: Array<{
          category?: string;
          dollar_amount_cents?: number | null;
          statute?: string;
          notes?: string;
        }>;
      }
    | undefined;
  const exemptions = collectionDetails?.exemption_details ?? [];

  // Fine print
  const quirks = (pack.state_specific_quirks ?? []) as string[];
  const tax = pack.tax_implications as
    | { recovery_taxability?: string; form_1099_c_consideration?: string }
    | undefined;
  const taxHasContent = !!(tax?.recovery_taxability || tax?.form_1099_c_consideration);

  // Sources
  const sources = (pack.sources ?? []) as Array<{
    title?: string;
    url?: string;
    citation?: string;
  }>;

  return (
    <main className="v2-guide" data-state={state.slug}>
      <div className="wrap v2-wrap">
        <Breadcrumbs
          items={[
            { href: "/small-claims", label: "Small Claims" },
            { label: state.name },
          ]}
        />

        <div className="v2-layout">
          <nav className="v2-toc" aria-label="On this page">
            <p className="v2-toc-label">On this page</p>
            <ol>
              <li><a href="#tldr">Quick answer</a></li>
              <li><a href="#can-i-sue">Can I sue here?</a></li>
              <li><a href="#how-long">How long do I have?</a></li>
              <li><a href="#cost">What will it cost?</a></li>
              <li><a href="#how-to-file">How do I file?</a></li>
              <li><a href="#damages">What I can recover</a></li>
              <li><a href="#serving">Serving the defendant</a></li>
              <li><a href="#hearing">The hearing</a></li>
              <li><a href="#appeals">If you lose</a></li>
              <li><a href="#collecting">If you win, collecting</a></li>
              <li><a href="#fine-print">Things to watch out for</a></li>
            </ol>
            <Link href="/case-score" className="btn btn-dark v2-toc-cta">
              Start your case
            </Link>
          </nav>

          <div className="v2-body">
            {/* HERO */}
            <header className="v2-hero">
              <span className="eyebrow">Small Claims Guide</span>
              <h1>
                Small claims in <em>{state.name}.</em>
              </h1>
              <div className="v2-hero-stats">
                <div>
                  <span className="stat-num">{fmtMoney(cap) ?? "—"}</span>
                  <span className="stat-lbl">Most you can sue for</span>
                </div>
                <div>
                  <span className="stat-num">
                    {feeLow !== undefined && feeHigh !== undefined
                      ? feeLow === feeHigh
                        ? `$${feeLow}`
                        : `$${feeLow}-$${feeHigh}`
                      : "—"}
                  </span>
                  <span className="stat-lbl">Filing fee</span>
                </div>
                <div>
                  <span className="stat-num">
                    {daysToHearing ? `~${daysToHearing} days` : "—"}
                  </span>
                  <span className="stat-lbl">Filing to hearing</span>
                </div>
              </div>
            </header>

            {/* 1. TL;DR */}
            <Section id="tldr" eyebrow="The short version" title="Quick answer" body={content.tldr} />

            {/* 2. CAN I SUE HERE */}
            <Section id="can-i-sue" eyebrow="Section 1" title="Can I sue here?" body={content.can_i_sue}>
              {capTiers.length > 1 ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">Claim limit by court</h3>
                  <p className="v2-card-sub">
                    {state.name} has more than one court that hears small claims. The most you can sue
                    for depends on which court you file in.
                  </p>
                  <table className="v2-table">
                    <thead>
                      <tr>
                        <th>Court</th>
                        <th>Max you can sue for</th>
                        <th>When this applies</th>
                      </tr>
                    </thead>
                    <tbody>
                      {capTiers.map((t, i) => (
                        <tr key={i}>
                          <td><strong>{t.court_level ?? "—"}</strong></td>
                          <td>{moneyFromCents(t.cap_cents) ?? "—"}</td>
                          <td className="v2-muted">{t.applies_when ?? ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {excluded.length > 0 ? (
                <details className="v2-details">
                  <summary>
                    What you <strong>can&rsquo;t</strong> bring to small claims
                    {" "}({excluded.length})
                  </summary>
                  <ul className="v2-excluded">
                    {excluded.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </Section>

            {/* 3. HOW LONG */}
            <Section id="how-long" eyebrow="Section 2" title="How long do I have?" body={content.how_long}>
              {sols.length > 0 ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">
                    Deadlines by type of dispute ({sols.length})
                  </h3>
                  <table className="v2-table">
                    <thead>
                      <tr>
                        <th>Type of dispute</th>
                        <th>Deadline</th>
                        <th>Clock starts</th>
                        <th>Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sols.map((s, i) => (
                        <tr key={i}>
                          <td>{humanize(s.claim_type) || "—"}</td>
                          <td>
                            <strong>{s.years ? `${s.years} year${s.years === 1 ? "" : "s"}` : "—"}</strong>
                          </td>
                          <td className="v2-muted">{s.when_clock_starts ?? ""}</td>
                          <td className="v2-cite">{s.citation ?? ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </Section>

            {/* 4. COST */}
            <Section id="cost" eyebrow="Section 3" title="What will it cost?" body={content.cost}>
              {feeTiers.length > 0 ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">Filing fee</h3>
                  <table className="v2-table">
                    <thead>
                      <tr>
                        <th>Court</th>
                        <th>Claim size</th>
                        <th>Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeTiers.map((t, i) => (
                        <tr key={i}>
                          <td>{t.applies_to ?? "—"}</td>
                          <td>{t.amount_band ?? "—"}</td>
                          <td><strong>{moneyFromCents(t.fee_cents) ?? "—"}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {(serviceFeeCents || motionFeeCents || juryFeeCents) ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">Other costs you might run into</h3>
                  <ul className="v2-keyfacts">
                    {serviceFeeCents ? (
                      <li>
                        <span>Court-served (clerk mails the papers)</span>
                        <strong>{moneyFromCents(serviceFeeCents) ?? "—"}</strong>
                      </li>
                    ) : null}
                    {motionFeeCents ? (
                      <li>
                        <span>Motion fee (e.g. to cancel a default)</span>
                        <strong>{moneyFromCents(motionFeeCents) ?? "—"}</strong>
                      </li>
                    ) : null}
                    {juryFeeCents ? (
                      <li>
                        <span>Asking for a jury (rare in small claims)</span>
                        <strong>{moneyFromCents(juryFeeCents) ?? "—"}</strong>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}

              {feeWaiver?.available && (feeWaiver.eligibility_text || feeWaiver.form_code) ? (
                <div className="v2-callout v2-callout-info">
                  <strong>Can&rsquo;t afford the fee?</strong>{" "}
                  {feeWaiver.eligibility_text ? <span>{feeWaiver.eligibility_text}</span> : null}
                  {feeWaiver.form_code ? (
                    <p className="v2-callout-foot">
                      Form:{" "}
                      {feeWaiver.form_url ? (
                        <a href={feeWaiver.form_url} target="_blank" rel="noreferrer">
                          {feeWaiver.form_code}
                        </a>
                      ) : (
                        feeWaiver.form_code
                      )}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </Section>

            {/* 5. HOW TO FILE */}
            <Section id="how-to-file" eyebrow="Section 4" title="How do I file?" body={content.how_to_file}>
              {govTort?.required_for_government_defendants ? (
                <div className="v2-callout v2-callout-warn">
                  <strong>Suing a city, county, or state agency?</strong> You usually have to file a
                  separate &ldquo;notice of claim&rdquo;
                  {govTort.deadline_days
                    ? <> within <strong>{govTort.deadline_days} days</strong> of the incident</>
                    : null}
                  {govTort.recipient_address
                    ? <> ({govTort.recipient_address})</>
                    : null}
                  {" "}
                  BEFORE filing the lawsuit. Missing this deadline can permanently kill the case
                  even if you&rsquo;re still inside the regular statute of limitations.
                  {govTort.statute ? (
                    <p className="v2-callout-foot v2-cite">{govTort.statute}</p>
                  ) : null}
                </div>
              ) : null}

              {efileHasContent ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">E-filing</h3>
                  <ul className="v2-keyfacts">
                    {efile?.name?.trim() ? (
                      <li>
                        <span>Portal</span>
                        <strong>
                          {efile.url?.trim() ? (
                            <a href={efile.url} target="_blank" rel="noreferrer">{efile.name}</a>
                          ) : (
                            efile.name
                          )}
                        </strong>
                      </li>
                    ) : null}
                    {typeof efile?.account_required === "boolean" ? (
                      <li>
                        <span>Account required?</span>
                        <strong>{efile.account_required ? "Yes" : "No"}</strong>
                      </li>
                    ) : null}
                    {efile?.accepted_file_types?.length ? (
                      <li>
                        <span>Accepted file types</span>
                        <strong>{efile.accepted_file_types.join(", ")}</strong>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}
            </Section>

            {/* 6. DAMAGES */}
            <Section id="damages" eyebrow="Section 5" title="What I can recover" body={content.damages}>
              {multipliers.length > 0 ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">When the law lets you ask for more</h3>
                  <p className="v2-card-sub">
                    For certain claim types, the law lets you recover more than your direct loss.
                  </p>
                  <ul className="v2-multipliers">
                    {multipliers.map((m, i) => {
                      const label =
                        typeof m.multiplier === "number"
                          ? `${m.multiplier}× damages`
                          : typeof m.multiplier === "string"
                            ? m.multiplier
                            : "Bonus damages";
                      const claimLabel = humanizeList(m.claim_types ?? []) || "Specific claim types";
                      return (
                        <li key={i}>
                          <div className="v2-mult-head">
                            <span className="v2-mult-badge">{label}</span>
                            <span>{claimLabel}</span>
                          </div>
                          {m.conditions ? <p className="v2-mult-body">{m.conditions}</p> : null}
                          {m.statute ? <p className="v2-cite">{m.statute}</p> : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              {prejudgmentInterest.length > 0 ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">Interest before you win (pre-judgment)</h3>
                  <p className="v2-card-sub">
                    Interest that adds up from when the harm happened until the judge rules.
                  </p>
                  <table className="v2-table">
                    <thead>
                      <tr>
                        <th>Type of claim</th>
                        <th>Rate per year</th>
                        <th>Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prejudgmentInterest.map((p, i) => (
                        <tr key={i}>
                          <td>{humanize(p.claim_type) || "—"}</td>
                          <td>
                            <strong>{p.rate_percent !== undefined ? `${p.rate_percent}%` : "—"}</strong>
                          </td>
                          <td className="v2-cite">{p.statute ?? p.citation ?? ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </Section>

            {/* 7. SERVING */}
            <Section id="serving" eyebrow="Section 6" title="Serving the defendant" body={content.serving}>
              {allowedServiceMethods.length > 0 ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">Allowed ways to serve</h3>
                  <table className="v2-table">
                    <thead>
                      <tr>
                        <th>Method</th>
                        <th>Cost</th>
                        <th>Deadline before hearing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allowedServiceMethods.map((m, i) => (
                        <tr key={i}>
                          <td>
                            <strong>{humanize(m.method) || "—"}</strong>
                            {m.notes ? (
                              <p className="v2-muted v2-mt-4">{m.notes}</p>
                            ) : null}
                          </td>
                          <td>
                            {m.cost_cents === 0
                              ? "Free"
                              : moneyFromCents(m.cost_cents) ?? "—"}
                          </td>
                          <td>
                            {m.deadline_days_before_hearing
                              ? `${m.deadline_days_before_hearing} days`
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </Section>

            {/* 8. HEARING */}
            <Section id="hearing" eyebrow="Section 7" title="The hearing" body={content.hearing}>
              {hearing ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">What to expect on hearing day</h3>
                  <ul className="v2-keyfacts">
                    {typeof hearing.copies_required === "number" ? (
                      <li>
                        <span>Copies of evidence to bring</span>
                        <strong>{hearing.copies_required}</strong>
                      </li>
                    ) : null}
                    {typeof hearing.phone_video_appearance_allowed === "boolean" ? (
                      <li>
                        <span>Phone / video appearance allowed</span>
                        <strong>{hearing.phone_video_appearance_allowed ? "Yes" : "No, in person"}</strong>
                      </li>
                    ) : null}
                    {hearing.exhibit_format ? (
                      <li>
                        <span>Exhibit format</span>
                        <strong>{hearing.exhibit_format}</strong>
                      </li>
                    ) : null}
                    {hearing.plaintiff_no_show_consequence ? (
                      <li>
                        <span>If you don&rsquo;t show up</span>
                        <strong>{hearing.plaintiff_no_show_consequence}</strong>
                      </li>
                    ) : null}
                  </ul>
                  {hearing.hearsay_rules ? (
                    <>
                      <h4 className="v2-card-subhead">What evidence the judge will accept</h4>
                      <p className="v2-muted">{hearing.hearsay_rules}</p>
                    </>
                  ) : null}
                </div>
              ) : null}

              {mediation?.available ? (
                <div className="v2-callout v2-callout-info">
                  <strong>Try mediation first.</strong>{" "}
                  {mediation.when ?? mediation.process ?? ""}
                </div>
              ) : null}

              {accommodationsHasContent ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">
                    Need an interpreter or accommodation?
                  </h3>
                  <ul className="v2-keyfacts">
                    {langs.length ? (
                      <li>
                        <span>Languages</span>
                        <strong>{langs.join(", ")}</strong>
                      </li>
                    ) : null}
                    {accommodations?.interpreter_lead_time_days ? (
                      <li>
                        <span>How early to ask</span>
                        <strong>
                          At least {accommodations.interpreter_lead_time_days} days before the hearing
                        </strong>
                      </li>
                    ) : null}
                    {accommodations?.ada_request_form_code ? (
                      <li>
                        <span>ADA request form</span>
                        <strong>{accommodations.ada_request_form_code}</strong>
                      </li>
                    ) : null}
                  </ul>
                  {accommodations?.interpreter_request_process ? (
                    <p className="v2-muted v2-mt-12">
                      <strong>Interpreters:</strong> {accommodations.interpreter_request_process}
                    </p>
                  ) : null}
                  {accommodations?.ada_request_process ? (
                    <p className="v2-muted v2-mt-4">
                      <strong>ADA:</strong> {accommodations.ada_request_process}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </Section>

            {/* 9. APPEALS */}
            <Section id="appeals" eyebrow="Section 8" title="If you lose" body={content.appeals}>
              {appeals ? (
                <div className="v2-card">
                  <ul className="v2-keyfacts">
                    {appeals.window_days ? (
                      <li>
                        <span>Deadline to file the appeal</span>
                        <strong>{appeals.window_days} days</strong>
                      </li>
                    ) : null}
                    {appeals.type ? (
                      <li>
                        <span>Type of appeal</span>
                        <strong>{humanize(appeals.type)}</strong>
                      </li>
                    ) : null}
                    {appeals.who_can_appeal ? (
                      <li>
                        <span>Who can appeal</span>
                        <strong>{appeals.who_can_appeal}</strong>
                      </li>
                    ) : null}
                    {appeals.motion_to_vacate_default_window_days ? (
                      <li>
                        <span>To cancel a default judgment</span>
                        <strong>
                          Within {appeals.motion_to_vacate_default_window_days} days
                        </strong>
                      </li>
                    ) : null}
                  </ul>
                </div>
              ) : null}
            </Section>

            {/* 10. COLLECTING */}
            <Section id="collecting" eyebrow="Section 9" title="If you win, collecting" body={content.collecting}>
              {postJudgmentInterest !== undefined ? (
                <div className="v2-callout v2-callout-info">
                  Unpaid judgments earn{" "}
                  <strong>{postJudgmentInterest}% interest per year</strong> until paid.
                </div>
              ) : null}

              {postJudgmentSteps.length > 0 ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">After the judge rules in your favor</h3>
                  <ol className="v2-steps">
                    {postJudgmentSteps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {(collectionDetails?.wage_garnishment_cap_pct ||
                collectionDetails?.bank_levy_process ||
                collectionDetails?.debtors_exam_process ||
                collectionDetails?.judgment_renewal_years) ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">Collection rules</h3>
                  <ul className="v2-keyfacts">
                    {collectionDetails?.wage_garnishment_cap_pct ? (
                      <li>
                        <span>Most of paycheck you can garnish</span>
                        <strong>{collectionDetails.wage_garnishment_cap_pct}%</strong>
                      </li>
                    ) : null}
                    {collectionDetails?.judgment_renewal_years ? (
                      <li>
                        <span>Judgment good for</span>
                        <strong>{collectionDetails.judgment_renewal_years} years</strong>
                      </li>
                    ) : null}
                  </ul>
                  {collectionDetails?.bank_levy_process ? (
                    <>
                      <h4 className="v2-card-subhead">Bank levy</h4>
                      <p className="v2-muted">{collectionDetails.bank_levy_process}</p>
                    </>
                  ) : null}
                  {collectionDetails?.debtors_exam_process ? (
                    <>
                      <h4 className="v2-card-subhead">Tracking down their assets</h4>
                      <p className="v2-muted">{collectionDetails.debtors_exam_process}</p>
                    </>
                  ) : null}
                </div>
              ) : null}

              {exemptions.length > 0 ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">
                    What the loser can keep (protected from collection)
                  </h3>
                  <p className="v2-card-sub">
                    Assets the law protects from being seized to pay a judgment. A defendant whose
                    income and assets all fall within these categories may be{" "}
                    <strong>&ldquo;judgment-proof&rdquo;</strong> in practice (the judgment is real
                    but uncollectable).
                  </p>
                  <table className="v2-table">
                    <thead>
                      <tr>
                        <th>What&rsquo;s protected</th>
                        <th>How much</th>
                        <th>Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exemptions.map((ex, i) => (
                        <tr key={i}>
                          <td>
                            <strong>{ex.category ?? "—"}</strong>
                            {ex.notes ? (
                              <p className="v2-muted v2-mt-4">{ex.notes}</p>
                            ) : null}
                          </td>
                          <td>
                            <strong>
                              {ex.dollar_amount_cents
                                ? moneyFromCents(ex.dollar_amount_cents)
                                : "100%"}
                            </strong>
                          </td>
                          <td className="v2-cite">{ex.statute ?? ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </Section>

            {/* 11. FINE PRINT */}
            <Section id="fine-print" eyebrow="Section 10" title="Things to watch out for" body={content.fine_print}>
              {quirks.length > 0 ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">
                    {quirks.length} thing{quirks.length === 1 ? "" : "s"} people miss
                  </h3>
                  <ul className="v2-quirks">
                    {quirks.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {taxHasContent ? (
                <div className="v2-card">
                  <h3 className="v2-card-title">Tax stuff (the short version)</h3>
                  {tax?.recovery_taxability ? (
                    <p>
                      <strong>If you win money: </strong>{tax.recovery_taxability}
                    </p>
                  ) : null}
                  {tax?.form_1099_c_consideration ? (
                    <p>
                      <strong>If a debt gets forgiven: </strong>{tax.form_1099_c_consideration}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </Section>

            {/* SOURCES */}
            {sources.length > 0 ? (
              <section className="v2-section v2-sources">
                <div className="v2-section-head">
                  <span className="v2-eyebrow">Sources</span>
                  <h2>Where this came from</h2>
                </div>
                <ul className="v2-source-list">
                  {sources.map((s, i) => (
                    <li key={i}>
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noreferrer">
                          {s.title ?? s.url}
                        </a>
                      ) : (
                        <span>{s.title}</span>
                      )}
                      {s.citation ? (
                        <span className="v2-cite"> {s.citation}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
                {data.generatedAt ? (
                  <p className="v2-muted v2-mt-12">
                    Last updated{" "}
                    {new Date(data.generatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                ) : null}
              </section>
            ) : null}

            <footer className="v2-footer">
              <p>
                We are not a law firm and do not provide legal advice. This guide explains how small
                claims works in {state.name} based on publicly available statutes and court rules. It
                is not a substitute for the advice of an attorney.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
