"use client";

interface EvidencePackLike {
  classification?: {
    claim_category?: string;
    proper_court_type?: string;
    proper_court_type_notes?: string;
    amount_within_limit?: boolean;
    amount_limit_dollars?: number | null;
    venue_rule?: string;
    statute_of_limitations?: { deadline?: string | null; citation?: string; notes?: string };
    pre_filing_requirements?: string[];
    eligibility_concerns?: string[];
    jury_trial_available?: boolean | null;
    attorneys_allowed?: boolean | null;
    counterclaim_implications?: string;
    notes?: string;
  };
  court_name?: string;
  filing_location?: string;
  claim_limit_dollars?: number | null;
  excluded_claim_types?: string[];
  arbitration_clause_considerations?: string;
  frequency_caps?: string;
  claim_splitting_prohibited?: boolean | null;
  forms_required?: Array<{
    code?: string | null;
    name?: string;
    url?: string | null;
    purpose?: string;
    fillable_online?: boolean;
    completion_methods?: string[];
  }>;
  filing_fee_cents?: number | null;
  filing_fee_notes?: string;
  filing_methods?: string[];
  efile_portal?: {
    name?: string;
    url?: string;
    account_required?: boolean | null;
    accepted_file_types?: string[];
  };
  fee_schedule?: {
    service_fee_cents?: number | null;
    motion_fee_cents?: number | null;
    jury_demand_fee_cents?: number | null;
    accepted_payment_methods?: string[];
    check_payee?: string;
    fee_waiver?: {
      available?: boolean | null;
      eligibility_criteria?: string;
      form_code?: string;
      form_url?: string;
    };
  };
  demand_letter?: {
    required?: boolean | null;
    recommended?: boolean | null;
    minimum_days_before_filing?: number | null;
    certified_mail_required?: boolean | null;
    return_receipt_required?: boolean | null;
    required_content_elements?: string[];
    notes?: string;
  };
  government_tort_claim_notice?: {
    required_for_government_defendants?: boolean | null;
    deadline_days?: number | null;
    form_code?: string;
    recipient_address?: string;
    statute?: string;
  };
  service_requirements?: string[];
  service_methods?: Array<{
    method?: string;
    allowed?: boolean | null;
    cost_cents?: number | null;
    deadline_days_before_hearing?: number | null;
    proof_of_service_form_code?: string;
    notes?: string;
  }>;
  hearing_process?: string[];
  hearing_logistics?: {
    copies_required?: number | null;
    exhibit_format?: string;
    recording_rules?: string;
    hearsay_rules?: string;
    default_proveup_required?: boolean | null;
    plaintiff_no_show_consequence?: string;
    typical_days_filing_to_hearing?: number | null;
    continuance_rules?: string;
    witness_subpoena_process?: string;
    phone_video_appearance_allowed?: boolean | null;
  };
  counterclaim_transfer_threshold?: string;
  recoverable_amounts?: {
    costs_recoverable?: string[];
    prejudgment_interest_rate_pct?: number | null;
    post_judgment_interest_rate_pct?: number | null;
    attorney_fees?: {
      available?: boolean | null;
      conditions?: string;
      statute?: string;
    };
  };
  court_mediation?: {
    available?: boolean | null;
    when?: string;
    free?: boolean | null;
    process?: string;
  };
  accommodations?: {
    interpreter_request_process?: string;
    interpreter_lead_time_days?: number | null;
    available_languages?: string[];
    interpreter_request_form_code?: string;
    ada_request_process?: string;
    ada_coordinator_name?: string;
    ada_coordinator_contact?: string;
    ada_request_form_code?: string;
  };
  appeal_details?: {
    window_days?: number | null;
    who_can_appeal?: string;
    type?: string;
    motion_to_vacate_default_window_days?: number | null;
  };
  post_judgment_steps?: string[];
  collection_details?: {
    judgment_renewal_years?: number | null;
    abstract_of_judgment_process?: string;
    wage_garnishment_cap_pct?: number | null;
    bank_levy_process?: string;
    debtors_exam_process?: string;
    exemptions?: string[];
    exemption_details?: Array<{
      category?: string;
      dollar_amount_cents?: number | null;
      statute?: string;
      notes?: string;
    }>;
    federal_vs_state_exemption_rule?: string;
    satisfaction_required?: boolean | null;
    bankruptcy_stay_effects?: string;
    domestication_of_out_of_state_judgment?: string;
  };
  defendant_collectability_signals?: string[];
  evidence_required_for_this_claim_type?: string[];
  state_specific_quirks?: string[];
  statutory_multipliers?: Array<{
    statute?: string;
    multiplier?: number | null;
    conditions?: string;
    claim_types?: string[];
  }>;
  tax_implications?: {
    recovery_taxability?: string;
    form_1099_c_consideration?: string;
  };
  sources?: Array<{ n?: number; url: string; title?: string; domain?: string; cited_for?: string[] }>;
  unknowns?: string[];
}

export default function EvidencePackView({
  pack,
  emptyLabel,
}: {
  pack: EvidencePackLike | null;
  emptyLabel: string;
}) {
  if (!pack) {
    return <p style={{ color: "var(--muted)" }}>{emptyLabel}</p>;
  }
  const fee = pack.filing_fee_cents != null ? `$${(pack.filing_fee_cents / 100).toFixed(2)}` : "—";
  const limit =
    pack.claim_limit_dollars != null ? `$${pack.claim_limit_dollars.toLocaleString("en-US")}` : "—";

  return (
    <div className="ev-pack">
      <Section title="Court & venue">
        <Field label="Court">{annotated(pack.court_name)}</Field>
        <Field label="Filing location">{annotated(pack.filing_location)}</Field>
        <Field label="Small-claims limit">{limit}</Field>
        <Field label="Filing fee">
          {fee}
          {pack.filing_fee_notes ? (
            <span style={{ color: "var(--muted)", fontSize: 13, marginLeft: 8 }}>
              {annotated(pack.filing_fee_notes)}
            </span>
          ) : null}
        </Field>
      </Section>

      {pack.classification ? (
        <Section title="Classification & prerequisites">
          <Field label="Claim category">{pack.classification.claim_category || "—"}</Field>
          <Field label="Court division">
            {pack.classification.proper_court_type || "—"}
            {pack.classification.proper_court_type_notes ? (
              <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
                {pack.classification.proper_court_type_notes}
              </div>
            ) : null}
          </Field>
          <Field label="Venue rule">{pack.classification.venue_rule || "—"}</Field>
          <Field label="Statute of limitations">
            {pack.classification.statute_of_limitations?.deadline || "—"}
            {pack.classification.statute_of_limitations?.citation ? (
              <div style={{ fontSize: 12, marginTop: 2 }}>
                <code style={{ fontSize: 11.5, color: "var(--ink)" }}>
                  {pack.classification.statute_of_limitations.citation}
                </code>
              </div>
            ) : null}
            {pack.classification.statute_of_limitations?.notes ? (
              <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
                {pack.classification.statute_of_limitations.notes}
              </div>
            ) : null}
          </Field>
          <Field label="Pre-filing requirements">
            {(pack.classification.pre_filing_requirements ?? []).length === 0 ? (
              <span style={{ color: "var(--muted)" }}>None identified</span>
            ) : (
              <ul className="ev-list" style={{ paddingLeft: 18, margin: 0 }}>
                {(pack.classification.pre_filing_requirements ?? []).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            )}
          </Field>
          <Field label="Eligibility concerns">
            {(pack.classification.eligibility_concerns ?? []).length === 0 ? (
              <span style={{ color: "var(--muted)" }}>None flagged</span>
            ) : (
              <ul className="ev-list" style={{ paddingLeft: 18, margin: 0 }}>
                {(pack.classification.eligibility_concerns ?? []).map((s, i) => (
                  <li key={i} style={{ color: "var(--accent)" }}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </Field>
          <Field label="Jury trial">
            {pack.classification.jury_trial_available === true
              ? "Available"
              : pack.classification.jury_trial_available === false
                ? "Not available"
                : "Unknown"}
          </Field>
          <Field label="Attorneys allowed">
            {pack.classification.attorneys_allowed === true
              ? "Yes"
              : pack.classification.attorneys_allowed === false
                ? "No"
                : "Unknown"}
          </Field>
          {pack.classification.counterclaim_implications ? (
            <Field label="Counterclaims">{pack.classification.counterclaim_implications}</Field>
          ) : null}
          {pack.classification.notes ? (
            <Field label="Classifier notes">
              <span style={{ color: "var(--muted)" }}>{pack.classification.notes}</span>
            </Field>
          ) : null}
        </Section>
      ) : null}

      {hasScopeData(pack) ? (
        <Section title="Scope and gating issues">
          {pack.excluded_claim_types && pack.excluded_claim_types.length > 0 ? (
            <Field label="Excluded claim types">
              <ul className="ev-list" style={{ paddingLeft: 18, margin: 0 }}>
                {pack.excluded_claim_types.map((s, i) => (
                  <li key={i}>{annotated(s)}</li>
                ))}
              </ul>
            </Field>
          ) : null}
          {pack.arbitration_clause_considerations ? (
            <Field label="Arbitration clauses">
              {annotated(pack.arbitration_clause_considerations)}
            </Field>
          ) : null}
          {pack.frequency_caps ? (
            <Field label="Filing frequency caps">{annotated(pack.frequency_caps)}</Field>
          ) : null}
          {pack.claim_splitting_prohibited != null ? (
            <Field label="Claim splitting">
              {pack.claim_splitting_prohibited ? "Prohibited" : "Allowed"}
            </Field>
          ) : null}
        </Section>
      ) : null}

      <Section title={`Forms required (${pack.forms_required?.length ?? 0})`}>
        {!pack.forms_required || pack.forms_required.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No forms identified.</p>
        ) : (
          <ul className="ev-list">
            {pack.forms_required.map((f, i) => (
              <li key={i} className="ev-form">
                <div>
                  <strong>{f.code ? `${f.code} — ` : ""}{f.name ?? "(unnamed)"}</strong>
                  {f.url ? (
                    <>
                      {" "}
                      <a href={f.url} target="_blank" rel="noopener noreferrer" className="admin-link">
                        download
                      </a>
                    </>
                  ) : null}
                </div>
                {f.purpose ? (
                  <div style={{ color: "var(--muted)", fontSize: 13 }}>{annotated(f.purpose)}</div>
                ) : null}
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  {f.fillable_online ? "fillable online · " : ""}
                  {(f.completion_methods ?? []).join(", ")}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {hasDemandLetter(pack.demand_letter) ? (
        <Section title="Pre-filing demand letter">
          {pack.demand_letter?.required != null ? (
            <Field label="Required by statute">
              {pack.demand_letter.required ? "Yes" : "No"}
            </Field>
          ) : null}
          {pack.demand_letter?.recommended != null ? (
            <Field label="Recommended">
              {pack.demand_letter.recommended ? "Yes" : "No"}
            </Field>
          ) : null}
          {pack.demand_letter?.minimum_days_before_filing != null ? (
            <Field label="Minimum days before filing">
              {pack.demand_letter.minimum_days_before_filing}
            </Field>
          ) : null}
          {pack.demand_letter?.certified_mail_required != null ? (
            <Field label="Certified mail required">
              {pack.demand_letter.certified_mail_required ? "Yes" : "No"}
            </Field>
          ) : null}
          {pack.demand_letter?.return_receipt_required != null ? (
            <Field label="Return receipt required">
              {pack.demand_letter.return_receipt_required ? "Yes" : "No"}
            </Field>
          ) : null}
          {(pack.demand_letter?.required_content_elements ?? []).length > 0 ? (
            <Field label="Required content">
              <BulletList items={pack.demand_letter!.required_content_elements!} />
            </Field>
          ) : null}
          {pack.demand_letter?.notes ? (
            <Field label="Notes">{annotated(pack.demand_letter.notes)}</Field>
          ) : null}
        </Section>
      ) : null}

      {hasGovTortNotice(pack.government_tort_claim_notice) ? (
        <Section title="Government tort claim notice">
          {pack.government_tort_claim_notice?.required_for_government_defendants != null ? (
            <Field label="Required for government defendants">
              {pack.government_tort_claim_notice.required_for_government_defendants
                ? "Yes"
                : "No"}
            </Field>
          ) : null}
          {pack.government_tort_claim_notice?.deadline_days != null ? (
            <Field label="Deadline (days from incident)">
              {pack.government_tort_claim_notice.deadline_days}
            </Field>
          ) : null}
          {pack.government_tort_claim_notice?.form_code ? (
            <Field label="Form code">
              <code style={{ fontSize: 12 }}>{pack.government_tort_claim_notice.form_code}</code>
            </Field>
          ) : null}
          {pack.government_tort_claim_notice?.recipient_address ? (
            <Field label="Send notice to">
              {annotated(pack.government_tort_claim_notice.recipient_address)}
            </Field>
          ) : null}
          {pack.government_tort_claim_notice?.statute ? (
            <Field label="Statute">
              <code style={{ fontSize: 11.5 }}>{pack.government_tort_claim_notice.statute}</code>
            </Field>
          ) : null}
        </Section>
      ) : null}

      <Section title="Filing methods">
        {(pack.filing_methods ?? []).length === 0 ? (
          <p style={{ color: "var(--muted)" }}>—</p>
        ) : (
          <div className="ev-chips">
            {(pack.filing_methods ?? []).map((m) => (
              <span key={m} className="admin-pill admin-pill-neutral">
                {m.replace(/_/g, " ")}
              </span>
            ))}
          </div>
        )}
      </Section>

      {hasEfilePortal(pack.efile_portal) ? (
        <Section title="E-file portal">
          {pack.efile_portal?.name ? (
            <Field label="Portal name">{pack.efile_portal.name}</Field>
          ) : null}
          {pack.efile_portal?.url ? (
            <Field label="Portal URL">
              <a
                href={pack.efile_portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-link"
              >
                {pack.efile_portal.url}
              </a>
            </Field>
          ) : null}
          {pack.efile_portal?.account_required != null ? (
            <Field label="Account required">
              {pack.efile_portal.account_required ? "Yes" : "No"}
            </Field>
          ) : null}
          {(pack.efile_portal?.accepted_file_types ?? []).length > 0 ? (
            <Field label="Accepted file types">
              {pack.efile_portal!.accepted_file_types!.join(", ")}
            </Field>
          ) : null}
        </Section>
      ) : null}

      {hasFeeSchedule(pack.fee_schedule) ? (
        <Section title="Fee schedule">
          {pack.fee_schedule?.service_fee_cents != null ? (
            <Field label="Service of process fee">
              ${(pack.fee_schedule.service_fee_cents / 100).toFixed(2)}
            </Field>
          ) : null}
          {pack.fee_schedule?.motion_fee_cents != null ? (
            <Field label="Motion fee">
              ${(pack.fee_schedule.motion_fee_cents / 100).toFixed(2)}
            </Field>
          ) : null}
          {pack.fee_schedule?.jury_demand_fee_cents != null ? (
            <Field label="Jury demand fee">
              ${(pack.fee_schedule.jury_demand_fee_cents / 100).toFixed(2)}
            </Field>
          ) : null}
          {(pack.fee_schedule?.accepted_payment_methods ?? []).length > 0 ? (
            <Field label="Accepted payment methods">
              {pack.fee_schedule!.accepted_payment_methods!
                .map((m) => m.replace(/_/g, " "))
                .join(", ")}
            </Field>
          ) : null}
          {pack.fee_schedule?.check_payee ? (
            <Field label="Check payee">{pack.fee_schedule.check_payee}</Field>
          ) : null}
          {pack.fee_schedule?.fee_waiver?.available != null ? (
            <Field label="Fee waiver available">
              {pack.fee_schedule.fee_waiver.available ? "Yes" : "No"}
              {pack.fee_schedule.fee_waiver.eligibility_criteria ? (
                <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
                  {pack.fee_schedule.fee_waiver.eligibility_criteria}
                </div>
              ) : null}
              {pack.fee_schedule.fee_waiver.form_code || pack.fee_schedule.fee_waiver.form_url ? (
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  {pack.fee_schedule.fee_waiver.form_code ? (
                    <code style={{ fontSize: 11.5 }}>
                      {pack.fee_schedule.fee_waiver.form_code}
                    </code>
                  ) : null}
                  {pack.fee_schedule.fee_waiver.form_url ? (
                    <>
                      {" "}
                      <a
                        href={pack.fee_schedule.fee_waiver.form_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-link"
                      >
                        download
                      </a>
                    </>
                  ) : null}
                </div>
              ) : null}
            </Field>
          ) : null}
        </Section>
      ) : null}

      <Section title="How to serve the defendant">
        {(pack.service_methods ?? []).length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 13,
              marginBottom: pack.service_requirements && pack.service_requirements.length > 0 ? 12 : 0,
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--hairline)" }}>
                <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--muted)", fontWeight: 600 }}>Method</th>
                <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--muted)", fontWeight: 600 }}>Allowed</th>
                <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--muted)", fontWeight: 600 }}>Cost</th>
                <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--muted)", fontWeight: 600 }}>Deadline</th>
                <th style={{ textAlign: "left", padding: "6px 8px", color: "var(--muted)", fontWeight: 600 }}>Proof form</th>
              </tr>
            </thead>
            <tbody>
              {(pack.service_methods ?? []).map((m, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <td style={{ padding: "6px 8px", textTransform: "capitalize" }}>
                    {(m.method ?? "").replace(/_/g, " ")}
                  </td>
                  <td style={{ padding: "6px 8px" }}>
                    {m.allowed === true ? "Yes" : m.allowed === false ? "No" : "—"}
                  </td>
                  <td style={{ padding: "6px 8px" }}>
                    {m.cost_cents != null ? `$${(m.cost_cents / 100).toFixed(2)}` : "—"}
                  </td>
                  <td style={{ padding: "6px 8px" }}>
                    {m.deadline_days_before_hearing != null
                      ? `${m.deadline_days_before_hearing} days before hearing`
                      : "—"}
                  </td>
                  <td style={{ padding: "6px 8px" }}>
                    {m.proof_of_service_form_code ? (
                      <code style={{ fontSize: 11.5 }}>{m.proof_of_service_form_code}</code>
                    ) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
        {(pack.service_requirements ?? []).length > 0 ? (
          <BulletList items={pack.service_requirements ?? []} />
        ) : null}
        {!(pack.service_methods ?? []).length && !(pack.service_requirements ?? []).length ? (
          <p style={{ color: "var(--muted)" }}>—</p>
        ) : null}
      </Section>

      <Section title="What happens after filing">
        <BulletList items={pack.hearing_process ?? []} />
      </Section>

      {hasHearingLogistics(pack.hearing_logistics) || pack.counterclaim_transfer_threshold ? (
        <Section title="Hearing logistics">
          {pack.hearing_logistics?.copies_required != null ? (
            <Field label="Copies of exhibits to bring">
              {pack.hearing_logistics.copies_required}
            </Field>
          ) : null}
          {pack.hearing_logistics?.exhibit_format ? (
            <Field label="Exhibit format">
              {annotated(pack.hearing_logistics.exhibit_format)}
            </Field>
          ) : null}
          {pack.hearing_logistics?.recording_rules ? (
            <Field label="Recording rules">
              {annotated(pack.hearing_logistics.recording_rules)}
            </Field>
          ) : null}
          {pack.hearing_logistics?.hearsay_rules ? (
            <Field label="Hearsay / evidence rules">
              {annotated(pack.hearing_logistics.hearsay_rules)}
            </Field>
          ) : null}
          {pack.hearing_logistics?.default_proveup_required != null ? (
            <Field label="Default judgment requires prove-up">
              {pack.hearing_logistics.default_proveup_required ? "Yes" : "No"}
            </Field>
          ) : null}
          {pack.hearing_logistics?.plaintiff_no_show_consequence ? (
            <Field label="If plaintiff doesn't appear">
              {annotated(pack.hearing_logistics.plaintiff_no_show_consequence)}
            </Field>
          ) : null}
          {pack.hearing_logistics?.typical_days_filing_to_hearing != null ? (
            <Field label="Typical days from filing to hearing">
              {pack.hearing_logistics.typical_days_filing_to_hearing}
            </Field>
          ) : null}
          {pack.hearing_logistics?.continuance_rules ? (
            <Field label="Continuance rules">
              {annotated(pack.hearing_logistics.continuance_rules)}
            </Field>
          ) : null}
          {pack.hearing_logistics?.witness_subpoena_process ? (
            <Field label="Witness subpoena process">
              {annotated(pack.hearing_logistics.witness_subpoena_process)}
            </Field>
          ) : null}
          {pack.hearing_logistics?.phone_video_appearance_allowed != null ? (
            <Field label="Phone or video appearance allowed">
              {pack.hearing_logistics.phone_video_appearance_allowed ? "Yes" : "No"}
            </Field>
          ) : null}
          {pack.counterclaim_transfer_threshold ? (
            <Field label="Counterclaim over cap">
              {annotated(pack.counterclaim_transfer_threshold)}
            </Field>
          ) : null}
        </Section>
      ) : null}

      {hasRecoverable(pack.recoverable_amounts) ? (
        <Section title="Recoverable amounts">
          {pack.recoverable_amounts?.costs_recoverable && pack.recoverable_amounts.costs_recoverable.length > 0 ? (
            <Field label="Costs recoverable">
              <ul className="ev-list" style={{ paddingLeft: 18, margin: 0 }}>
                {pack.recoverable_amounts.costs_recoverable.map((s, i) => (
                  <li key={i}>{annotated(s)}</li>
                ))}
              </ul>
            </Field>
          ) : null}
          {pack.recoverable_amounts?.prejudgment_interest_rate_pct != null ? (
            <Field label="Prejudgment interest">
              {pack.recoverable_amounts.prejudgment_interest_rate_pct}% per year
            </Field>
          ) : null}
          {pack.recoverable_amounts?.post_judgment_interest_rate_pct != null ? (
            <Field label="Post-judgment interest">
              {pack.recoverable_amounts.post_judgment_interest_rate_pct}% per year
            </Field>
          ) : null}
          {pack.recoverable_amounts?.attorney_fees ? (
            <Field label="Attorney's fees">
              {pack.recoverable_amounts.attorney_fees.available === true
                ? "Available"
                : pack.recoverable_amounts.attorney_fees.available === false
                  ? "Not available"
                  : "Unknown"}
              {pack.recoverable_amounts.attorney_fees.conditions ? (
                <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
                  {annotated(pack.recoverable_amounts.attorney_fees.conditions)}
                </div>
              ) : null}
              {pack.recoverable_amounts.attorney_fees.statute ? (
                <div style={{ fontSize: 12, marginTop: 2 }}>
                  <code style={{ fontSize: 11.5 }}>
                    {pack.recoverable_amounts.attorney_fees.statute}
                  </code>
                </div>
              ) : null}
            </Field>
          ) : null}
        </Section>
      ) : null}

      {hasAppealDetails(pack.appeal_details) ? (
        <Section title="Appeal mechanics">
          {pack.appeal_details?.window_days != null ? (
            <Field label="Appeal window">{pack.appeal_details.window_days} days from judgment</Field>
          ) : null}
          {pack.appeal_details?.who_can_appeal ? (
            <Field label="Who can appeal">{annotated(pack.appeal_details.who_can_appeal)}</Field>
          ) : null}
          {pack.appeal_details?.type ? (
            <Field label="Appeal type">
              {pack.appeal_details.type === "de_novo"
                ? "Trial de novo (full new trial in higher court)"
                : pack.appeal_details.type === "appellate"
                  ? "Appellate review (record review only)"
                  : pack.appeal_details.type === "none"
                    ? "No appeal available"
                    : pack.appeal_details.type}
            </Field>
          ) : null}
          {pack.appeal_details?.motion_to_vacate_default_window_days != null ? (
            <Field label="Motion to vacate default window">
              {pack.appeal_details.motion_to_vacate_default_window_days} days
            </Field>
          ) : null}
        </Section>
      ) : null}

      {hasMediation(pack.court_mediation) ? (
        <Section title="Court-annexed mediation">
          <Field label="Available">
            {pack.court_mediation?.available === true
              ? "Yes"
              : pack.court_mediation?.available === false
                ? "No"
                : "Unknown"}
          </Field>
          {pack.court_mediation?.when ? (
            <Field label="When">{annotated(pack.court_mediation.when)}</Field>
          ) : null}
          {pack.court_mediation?.free != null ? (
            <Field label="Cost">{pack.court_mediation.free ? "Free" : "Paid"}</Field>
          ) : null}
          {pack.court_mediation?.process ? (
            <Field label="How to opt in">{annotated(pack.court_mediation.process)}</Field>
          ) : null}
        </Section>
      ) : null}

      {hasAccommodations(pack.accommodations) ? (
        <Section title="Accommodations">
          {pack.accommodations?.interpreter_request_process ? (
            <Field label="Interpreter request process">
              {annotated(pack.accommodations.interpreter_request_process)}
            </Field>
          ) : null}
          {pack.accommodations?.interpreter_lead_time_days != null ? (
            <Field label="Interpreter lead time (days)">
              {pack.accommodations.interpreter_lead_time_days}
            </Field>
          ) : null}
          {(pack.accommodations?.available_languages ?? []).length > 0 ? (
            <Field label="Available languages">
              {pack.accommodations!.available_languages!.join(", ")}
            </Field>
          ) : null}
          {pack.accommodations?.interpreter_request_form_code ? (
            <Field label="Interpreter request form">
              <code style={{ fontSize: 11.5 }}>
                {pack.accommodations.interpreter_request_form_code}
              </code>
            </Field>
          ) : null}
          {pack.accommodations?.ada_request_process ? (
            <Field label="ADA request process">
              {annotated(pack.accommodations.ada_request_process)}
            </Field>
          ) : null}
          {pack.accommodations?.ada_coordinator_name ? (
            <Field label="ADA coordinator">
              {pack.accommodations.ada_coordinator_name}
              {pack.accommodations.ada_coordinator_contact ? (
                <span style={{ color: "var(--muted)", marginLeft: 8 }}>
                  {pack.accommodations.ada_coordinator_contact}
                </span>
              ) : null}
            </Field>
          ) : pack.accommodations?.ada_coordinator_contact ? (
            <Field label="ADA coordinator contact">
              {pack.accommodations.ada_coordinator_contact}
            </Field>
          ) : null}
          {pack.accommodations?.ada_request_form_code ? (
            <Field label="ADA request form">
              <code style={{ fontSize: 11.5 }}>
                {pack.accommodations.ada_request_form_code}
              </code>
            </Field>
          ) : null}
        </Section>
      ) : null}

      <Section title="Judgment collection options">
        <BulletList items={pack.post_judgment_steps ?? []} />
      </Section>

      {hasCollectionDetails(pack.collection_details) ? (
        <Section title="Collection details">
          {pack.collection_details?.judgment_renewal_years != null ? (
            <Field label="Judgment good for">
              {pack.collection_details.judgment_renewal_years} years (renew before expiry)
            </Field>
          ) : null}
          {pack.collection_details?.satisfaction_required != null ? (
            <Field label="Satisfaction of judgment">
              {pack.collection_details.satisfaction_required
                ? "Required after payment"
                : "Not required"}
            </Field>
          ) : null}
          {pack.collection_details?.wage_garnishment_cap_pct != null ? (
            <Field label="Wage garnishment cap">
              {pack.collection_details.wage_garnishment_cap_pct}% of disposable earnings
            </Field>
          ) : null}
          {pack.collection_details?.abstract_of_judgment_process ? (
            <Field label="Abstract of judgment">
              {annotated(pack.collection_details.abstract_of_judgment_process)}
            </Field>
          ) : null}
          {pack.collection_details?.bank_levy_process ? (
            <Field label="Bank levy">
              {annotated(pack.collection_details.bank_levy_process)}
            </Field>
          ) : null}
          {pack.collection_details?.debtors_exam_process ? (
            <Field label="Debtor's exam">
              {annotated(pack.collection_details.debtors_exam_process)}
            </Field>
          ) : null}
          {(pack.collection_details?.exemption_details ?? []).length > 0 ? (
            <Field label="Exemptions (with amounts)">
              <ul className="ev-list" style={{ paddingLeft: 18, margin: 0 }}>
                {pack.collection_details!.exemption_details!.map((e, i) => (
                  <li key={i}>
                    <strong style={{ textTransform: "capitalize" }}>
                      {(e.category ?? "").replace(/_/g, " ")}
                    </strong>
                    {e.dollar_amount_cents != null
                      ? ` — $${(e.dollar_amount_cents / 100).toLocaleString("en-US")}`
                      : ""}
                    {e.statute ? (
                      <>
                        {" "}
                        <code style={{ fontSize: 11, color: "var(--muted)" }}>{e.statute}</code>
                      </>
                    ) : null}
                    {e.notes ? (
                      <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
                        {e.notes}
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Field>
          ) : pack.collection_details?.exemptions && pack.collection_details.exemptions.length > 0 ? (
            <Field label="Exemptions from collection">
              <ul className="ev-list" style={{ paddingLeft: 18, margin: 0 }}>
                {pack.collection_details.exemptions.map((s, i) => (
                  <li key={i}>{annotated(s)}</li>
                ))}
              </ul>
            </Field>
          ) : null}
          {pack.collection_details?.federal_vs_state_exemption_rule ? (
            <Field label="Federal vs state exemption rule">
              {annotated(pack.collection_details.federal_vs_state_exemption_rule)}
            </Field>
          ) : null}
          {pack.collection_details?.bankruptcy_stay_effects ? (
            <Field label="If defendant files bankruptcy">
              {annotated(pack.collection_details.bankruptcy_stay_effects)}
            </Field>
          ) : null}
          {pack.collection_details?.domestication_of_out_of_state_judgment ? (
            <Field label="Out-of-state judgment domestication">
              {annotated(pack.collection_details.domestication_of_out_of_state_judgment)}
            </Field>
          ) : null}
        </Section>
      ) : null}

      {(pack.evidence_required_for_this_claim_type ?? []).length > 0 ? (
        <Section title="Evidence checklist for this claim type">
          <BulletList items={pack.evidence_required_for_this_claim_type ?? []} />
        </Section>
      ) : null}

      {(pack.defendant_collectability_signals ?? []).length > 0 ? (
        <Section title="Defendant collectability signals">
          <BulletList items={pack.defendant_collectability_signals ?? []} />
        </Section>
      ) : null}

      {(pack.statutory_multipliers ?? []).length > 0 ? (
        <Section title="Statutory damages multipliers">
          <ul className="ev-list" style={{ paddingLeft: 18, margin: 0 }}>
            {pack.statutory_multipliers!.map((m, i) => (
              <li key={i}>
                <strong>
                  {m.multiplier != null ? `${m.multiplier}x damages` : "Statutory multiplier"}
                </strong>
                {m.statute ? (
                  <>
                    {" "}under{" "}
                    <code style={{ fontSize: 11.5 }}>{m.statute}</code>
                  </>
                ) : null}
                {m.conditions ? (
                  <div style={{ color: "var(--muted)", fontSize: 12.5, marginTop: 2 }}>
                    {m.conditions}
                  </div>
                ) : null}
                {(m.claim_types ?? []).length > 0 ? (
                  <div style={{ color: "var(--muted)", fontSize: 11.5, marginTop: 2 }}>
                    Applies to: {m.claim_types!.join(", ")}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {(pack.state_specific_quirks ?? []).length > 0 ? (
        <Section title="State-specific quirks for this claim type">
          <BulletList items={pack.state_specific_quirks ?? []} />
        </Section>
      ) : null}

      {hasTaxImplications(pack.tax_implications) ? (
        <Section title="Tax implications">
          {pack.tax_implications?.recovery_taxability ? (
            <Field label="Recovery taxability">
              {annotated(pack.tax_implications.recovery_taxability)}
            </Field>
          ) : null}
          {pack.tax_implications?.form_1099_c_consideration ? (
            <Field label="1099-C consideration">
              {annotated(pack.tax_implications.form_1099_c_consideration)}
            </Field>
          ) : null}
        </Section>
      ) : null}

      <Section title="Items to verify / unknowns">
        {(pack.unknowns ?? []).length === 0 ? (
          <p style={{ color: "var(--muted)" }}>None flagged.</p>
        ) : (
          <BulletList items={pack.unknowns ?? []} muted />
        )}
      </Section>

      <Section title={`Sources cited (${pack.sources?.length ?? 0})`}>
        {!pack.sources || pack.sources.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>None.</p>
        ) : (
          <ol className="ev-sources">
            {pack.sources.map((s, i) => {
              const n = s.n ?? i + 1;
              return (
                <li key={i} value={n}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-link"
                  >
                    {s.title || s.url}
                  </a>{" "}
                  <span style={{ color: "var(--muted)", fontSize: 12 }}>
                    ({s.domain || hostOf(s.url)})
                  </span>
                  {s.cited_for && s.cited_for.length > 0 ? (
                    <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>
                      cited for: {s.cited_for.join("; ")}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        )}
      </Section>
    </div>
  );
}

// Replace [#N] markers with clickable superscripts
function annotated(text: string | undefined): React.ReactNode {
  if (!text) return "—";
  const parts = text.split(/(\[#\d+\])/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[#(\d+)\]$/);
    if (m) {
      return (
        <sup key={i} className="ev-cite">
          {m[1]}
        </sup>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="ev-section">
      <h4 className="ev-section-title">{title}</h4>
      <div>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ev-field">
      <span className="ev-field-label">{label}</span>
      <span className="ev-field-value">{children}</span>
    </div>
  );
}

function BulletList({ items, muted }: { items: string[]; muted?: boolean }) {
  if (items.length === 0) return <p style={{ color: "var(--muted)" }}>—</p>;
  return (
    <ul className="ev-list">
      {items.map((s, i) => (
        <li key={i} style={{ color: muted ? "var(--muted)" : undefined }}>
          {annotated(s)}
        </li>
      ))}
    </ul>
  );
}

function hostOf(rawUrl: string): string {
  try {
    return new URL(rawUrl).hostname.toLowerCase();
  } catch {
    return "";
  }
}

// Conditional-render helpers — show a section only when at least one field has data.
function hasScopeData(p: EvidencePackLike): boolean {
  return Boolean(
    (p.excluded_claim_types && p.excluded_claim_types.length > 0) ||
      p.arbitration_clause_considerations ||
      p.frequency_caps ||
      p.claim_splitting_prohibited != null,
  );
}

function hasHearingLogistics(h: EvidencePackLike["hearing_logistics"]): boolean {
  if (!h) return false;
  return Boolean(
    h.copies_required != null ||
      h.exhibit_format ||
      h.recording_rules ||
      h.hearsay_rules ||
      h.default_proveup_required != null ||
      h.plaintiff_no_show_consequence ||
      h.typical_days_filing_to_hearing != null ||
      h.continuance_rules ||
      h.witness_subpoena_process ||
      h.phone_video_appearance_allowed != null,
  );
}

function hasRecoverable(r: EvidencePackLike["recoverable_amounts"]): boolean {
  if (!r) return false;
  return Boolean(
    (r.costs_recoverable && r.costs_recoverable.length > 0) ||
      r.prejudgment_interest_rate_pct != null ||
      r.post_judgment_interest_rate_pct != null ||
      (r.attorney_fees &&
        (r.attorney_fees.available != null ||
          r.attorney_fees.conditions ||
          r.attorney_fees.statute)),
  );
}

function hasMediation(m: EvidencePackLike["court_mediation"]): boolean {
  if (!m) return false;
  return Boolean(m.available != null || m.when || m.free != null || m.process);
}

function hasAccommodations(a: EvidencePackLike["accommodations"]): boolean {
  if (!a) return false;
  return Boolean(
    a.interpreter_request_process ||
      a.interpreter_lead_time_days != null ||
      (a.available_languages && a.available_languages.length > 0) ||
      a.interpreter_request_form_code ||
      a.ada_request_process ||
      a.ada_coordinator_name ||
      a.ada_coordinator_contact ||
      a.ada_request_form_code,
  );
}

function hasDemandLetter(d: EvidencePackLike["demand_letter"]): boolean {
  if (!d) return false;
  return Boolean(
    d.required != null ||
      d.recommended != null ||
      d.minimum_days_before_filing != null ||
      d.certified_mail_required != null ||
      d.return_receipt_required != null ||
      (d.required_content_elements && d.required_content_elements.length > 0) ||
      d.notes,
  );
}

function hasGovTortNotice(n: EvidencePackLike["government_tort_claim_notice"]): boolean {
  if (!n) return false;
  return Boolean(
    n.required_for_government_defendants != null ||
      n.deadline_days != null ||
      n.form_code ||
      n.recipient_address ||
      n.statute,
  );
}

function hasEfilePortal(p: EvidencePackLike["efile_portal"]): boolean {
  if (!p) return false;
  return Boolean(
    p.name ||
      p.url ||
      p.account_required != null ||
      (p.accepted_file_types && p.accepted_file_types.length > 0),
  );
}

function hasFeeSchedule(s: EvidencePackLike["fee_schedule"]): boolean {
  if (!s) return false;
  return Boolean(
    s.service_fee_cents != null ||
      s.motion_fee_cents != null ||
      s.jury_demand_fee_cents != null ||
      (s.accepted_payment_methods && s.accepted_payment_methods.length > 0) ||
      s.check_payee ||
      (s.fee_waiver &&
        (s.fee_waiver.available != null ||
          s.fee_waiver.eligibility_criteria ||
          s.fee_waiver.form_code ||
          s.fee_waiver.form_url)),
  );
}

function hasAppealDetails(a: EvidencePackLike["appeal_details"]): boolean {
  if (!a) return false;
  return Boolean(
    a.window_days != null ||
      a.who_can_appeal ||
      a.type ||
      a.motion_to_vacate_default_window_days != null,
  );
}

function hasCollectionDetails(c: EvidencePackLike["collection_details"]): boolean {
  if (!c) return false;
  return Boolean(
    c.judgment_renewal_years != null ||
      c.abstract_of_judgment_process ||
      c.wage_garnishment_cap_pct != null ||
      c.bank_levy_process ||
      c.debtors_exam_process ||
      (c.exemptions && c.exemptions.length > 0) ||
      (c.exemption_details && c.exemption_details.length > 0) ||
      c.federal_vs_state_exemption_rule ||
      c.satisfaction_required != null ||
      c.bankruptcy_stay_effects ||
      c.domestication_of_out_of_state_judgment,
  );
}

function hasTaxImplications(t: EvidencePackLike["tax_implications"]): boolean {
  if (!t) return false;
  return Boolean(t.recovery_taxability || t.form_1099_c_consideration);
}
