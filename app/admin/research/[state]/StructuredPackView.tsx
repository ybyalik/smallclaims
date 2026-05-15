"use client";

// Read-only viewer for state_research.structured_pack. Two modes:
//   - "Plain": semantic rendering with labels, lists, money / yes-no, etc.
//   - "JSON": raw pretty-printed JSON for debugging / verification.

import { useState } from "react";

interface PackLike {
  [key: string]: unknown;
}

interface Props {
  pack: PackLike | null;
}

// Friendly labels keyed by EvidencePack field name.
const FIELD_LABEL: Record<string, string> = {
  // classification
  claim_category: "Claim category",
  proper_court_type: "Court division name",
  proper_court_type_notes: "Why this division",
  amount_within_limit: "Amount fits the cap",
  amount_limit_dollars: "Claim cap (dollars)",
  venue_rule: "Venue rule",
  statute_of_limitations: "Statute of limitations",
  deadline: "Deadline",
  citation: "Statute citation",
  pre_filing_requirements: "Pre-filing requirements",
  eligibility_concerns: "Eligibility concerns",
  jury_trial_available: "Jury trial available",
  attorneys_allowed: "Attorneys allowed",
  counterclaim_implications: "If defendant counterclaims",
  notes: "Notes",
  // court
  court_name: "Small claims court name",
  filing_location: "Filing location",
  claim_limit_dollars: "Dollar cap",
  excluded_claim_types: "Claim types excluded",
  arbitration_clause_considerations: "Arbitration clause notes",
  frequency_caps: "Annual filing limits",
  claim_splitting_prohibited: "Claim splitting prohibited",
  // pre-filing
  demand_letter: "Demand letter",
  required: "Required",
  recommended: "Recommended",
  minimum_days_before_filing: "Minimum wait (days)",
  certified_mail_required: "Certified mail required",
  return_receipt_required: "Return receipt required",
  required_content_elements: "Required content",
  government_tort_claim_notice: "Government tort claim notice",
  required_for_government_defendants: "Required for government defendants",
  deadline_days: "Deadline (days)",
  form_code: "Form code",
  recipient_address: "Send to",
  statute: "Statute",
  // forms
  forms_required: "Court forms",
  code: "Form code",
  name: "Name",
  url: "Link",
  purpose: "Purpose",
  fillable_online: "Fillable online",
  completion_methods: "How to complete",
  // fees
  filing_fee_cents: "Starting filing fee",
  filing_fee_notes: "Fee notes",
  fee_schedule: "Fee schedule",
  service_fee_cents: "Service fee",
  motion_fee_cents: "Motion fee",
  jury_demand_fee_cents: "Jury demand fee",
  accepted_payment_methods: "Accepted payment methods",
  check_payee: "Check payee",
  fee_waiver: "Fee waiver",
  available: "Available",
  eligibility_criteria: "Eligibility",
  form_url: "Form link",
  // filing
  filing_methods: "Filing methods",
  efile_portal: "E-file portal",
  account_required: "Account required",
  accepted_file_types: "Accepted file types",
  // service
  service_requirements: "Service notes",
  service_methods: "Service methods",
  method: "Method",
  allowed: "Allowed",
  cost_cents: "Cost",
  deadline_days_before_hearing: "Deadline (days before hearing)",
  proof_of_service_form_code: "Proof-of-service form",
  // hearing
  hearing_process: "Hearing process",
  hearing_logistics: "Hearing logistics",
  copies_required: "Copies required",
  exhibit_format: "Exhibit format",
  recording_rules: "Recording rules",
  hearsay_rules: "Hearsay rules",
  default_proveup_required: "Default prove-up required",
  plaintiff_no_show_consequence: "If plaintiff no-shows",
  typical_days_filing_to_hearing: "Filing to hearing (days)",
  continuance_rules: "Continuance rules",
  witness_subpoena_process: "Witness subpoena process",
  phone_video_appearance_allowed: "Phone / video appearance allowed",
  counterclaim_transfer_threshold: "Counterclaim transfer threshold",
  // recoverable
  recoverable_amounts: "Recoverable amounts",
  costs_recoverable: "Costs recoverable",
  prejudgment_interest_rate_pct: "Pre-judgment interest %",
  post_judgment_interest_rate_pct: "Post-judgment interest %",
  attorney_fees: "Attorney's fees",
  conditions: "Conditions",
  // mediation
  court_mediation: "Court-annexed mediation",
  when: "When offered",
  free: "Free",
  process: "How to opt in",
  // accommodations
  accommodations: "Interpreter + ADA",
  interpreter_request_process: "Interpreter request",
  interpreter_lead_time_days: "Interpreter lead time (days)",
  available_languages: "Languages",
  interpreter_request_form_code: "Interpreter form code",
  ada_request_process: "ADA request",
  ada_coordinator_name: "ADA coordinator",
  ada_coordinator_contact: "ADA coordinator contact",
  ada_request_form_code: "ADA form code",
  // appeal
  appeal_details: "Appeal",
  window_days: "Appeal window (days)",
  who_can_appeal: "Who can appeal",
  type: "Type of appeal",
  motion_to_vacate_default_window_days: "Motion to vacate default (days)",
  // collection
  post_judgment_steps: "Post-judgment steps",
  collection_details: "Collection details",
  judgment_renewal_years: "Judgment renewal (years)",
  abstract_of_judgment_process: "Abstract of judgment",
  wage_garnishment_cap_pct: "Wage garnishment cap %",
  bank_levy_process: "Bank levy",
  debtors_exam_process: "Debtor's exam",
  exemptions: "Exemptions",
  exemption_details: "Exemption details",
  category: "Category",
  dollar_amount_cents: "Amount",
  federal_vs_state_exemption_rule: "Federal vs state election",
  satisfaction_required: "Satisfaction filing required",
  bankruptcy_stay_effects: "Bankruptcy stay",
  domestication_of_out_of_state_judgment: "Out-of-state judgment domestication",
  // practical
  defendant_collectability_signals: "Defendant collectability signals",
  evidence_required_for_this_claim_type: "Evidence usually needed",
  state_specific_quirks: "State-specific quirks",
  statutory_multipliers: "Statutory damages multipliers",
  multiplier: "Multiplier",
  claim_types: "Claim types",
  tax_implications: "Tax considerations",
  recovery_taxability: "Taxability of recovery",
  form_1099_c_consideration: "Form 1099-C considerations",
  sources: "Sources cited",
  unknowns: "Unknowns / gaps",
  title: "Title",
  domain: "Domain",
  cited_for: "Cited for",
};

// Top-level sections rendered in this order. Each entry's value is either
// a single key on the pack, or a group of keys gathered into one section.
const SECTIONS: Array<{ title: string; keys: string[] }> = [
  { title: "Classification", keys: ["classification"] },
  { title: "Court and venue", keys: ["court_name", "filing_location", "claim_limit_dollars", "excluded_claim_types"] },
  {
    title: "Scope and gating",
    keys: [
      "arbitration_clause_considerations",
      "frequency_caps",
      "claim_splitting_prohibited",
    ],
  },
  { title: "Pre-filing", keys: ["demand_letter", "government_tort_claim_notice"] },
  { title: "Forms", keys: ["forms_required"] },
  {
    title: "Fees and payment",
    keys: ["filing_fee_cents", "filing_fee_notes", "fee_schedule"],
  },
  { title: "Filing methods", keys: ["filing_methods", "efile_portal"] },
  { title: "Service of process", keys: ["service_requirements", "service_methods"] },
  {
    title: "Hearing",
    keys: ["hearing_process", "hearing_logistics", "counterclaim_transfer_threshold"],
  },
  { title: "Recoverable amounts", keys: ["recoverable_amounts"] },
  { title: "Court-annexed mediation", keys: ["court_mediation"] },
  { title: "Interpreter + ADA accommodations", keys: ["accommodations"] },
  { title: "Appeal", keys: ["appeal_details"] },
  {
    title: "Post-judgment + collection",
    keys: ["post_judgment_steps", "collection_details"],
  },
  { title: "Statutory damages multipliers", keys: ["statutory_multipliers"] },
  { title: "State-specific quirks", keys: ["state_specific_quirks"] },
  { title: "Tax considerations", keys: ["tax_implications"] },
  { title: "Sources cited", keys: ["sources"] },
  { title: "Unknowns / gaps", keys: ["unknowns"] },
];

// Fields whose number values represent cents and should render as currency.
const CENTS_FIELDS = new Set([
  "filing_fee_cents",
  "service_fee_cents",
  "motion_fee_cents",
  "jury_demand_fee_cents",
  "cost_cents",
  "dollar_amount_cents",
]);

// Fields whose number values represent percentages already (e.g., 25 = 25%).
const PERCENT_FIELDS = new Set([
  "wage_garnishment_cap_pct",
  "prejudgment_interest_rate_pct",
  "post_judgment_interest_rate_pct",
]);

// Overrides for specific enum values where naive title-casing reads badly
// (acronyms, legal terms, etc.). Anything not in this map falls back to
// the generic snake_case → "Title case" transformation.
const ENUM_VALUE_OVERRIDES: Record<string, string> = {
  // appeal type
  de_novo: "De novo (new trial in higher court)",
  trial_de_novo: "Trial de novo (new trial)",
  appellate: "Appellate review (record only, no new trial)",
  // service methods
  certified_mail: "Certified mail",
  personal_service: "Personal service",
  alternate_service: "Alternate service",
  private_process_server: "Private process server",
  // forms completion
  online_form: "Online form",
  fillable_pdf: "Fillable PDF",
  print_and_handwrite: "Print and handwrite",
  guided_filing: "Guided filing",
  // filing methods
  in_person: "In person",
  drop_box: "Drop box",
  efile: "E-file",
  // misc
  commissioner_decision: "Commissioner decision",
};

// Heuristic: is this string an enum-style identifier we should humanize?
// True for lowercase + underscores + no spaces, of reasonable length.
function looksLikeEnumValue(s: string): boolean {
  if (s.length === 0 || s.length > 60) return false;
  if (/\s/.test(s)) return false;
  if (!/^[a-z][a-z0-9_]*$/.test(s)) return false;
  return s.includes("_");
}

function humanizeEnumValue(raw: string): string {
  if (ENUM_VALUE_OVERRIDES[raw]) return ENUM_VALUE_OVERRIDES[raw];
  return raw
    .split("_")
    .filter(Boolean)
    .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function labelFor(key: string): string {
  return FIELD_LABEL[key] ?? key.replace(/_/g, " ").replace(/^./, (s) => s.toUpperCase());
}

function isEmpty(v: unknown): boolean {
  if (v == null) return true;
  if (typeof v === "string") return v.trim() === "";
  if (Array.isArray(v)) return v.length === 0;
  if (typeof v === "object") return Object.keys(v as object).length === 0;
  return false;
}

function isAllEmpty(v: unknown): boolean {
  if (isEmpty(v)) return true;
  if (Array.isArray(v)) return v.every(isAllEmpty);
  if (typeof v === "object" && v !== null) {
    return Object.values(v as Record<string, unknown>).every(isAllEmpty);
  }
  return false;
}

function fmtCurrency(n: number): string {
  return "$" + (n / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtBool(b: boolean): string {
  return b ? "Yes" : "No";
}

function Value({ name, value }: { name: string; value: unknown }) {
  if (value == null) return <span style={{ color: "var(--muted)" }}>(not specified)</span>;
  if (typeof value === "string") {
    if (value.trim() === "") return <span style={{ color: "var(--muted)" }}>(empty)</span>;
    // URLs render as links
    if (/^https?:\/\//.test(value)) {
      return (
        <a href={value} target="_blank" rel="noreferrer">
          {value}
        </a>
      );
    }
    if (looksLikeEnumValue(value)) {
      return <span>{humanizeEnumValue(value)}</span>;
    }
    return <span style={{ whiteSpace: "pre-wrap" }}>{value}</span>;
  }
  if (typeof value === "number") {
    if (CENTS_FIELDS.has(name)) return <>{fmtCurrency(value)}</>;
    if (PERCENT_FIELDS.has(name)) return <>{value}%</>;
    return <>{value.toLocaleString()}</>;
  }
  if (typeof value === "boolean") return <>{fmtBool(value)}</>;
  if (Array.isArray(value)) {
    if (value.length === 0) return <span style={{ color: "var(--muted)" }}>(none)</span>;
    // String array → bulleted list
    if (value.every((v) => typeof v === "string")) {
      return (
        <ul style={{ margin: "4px 0 0 0", paddingLeft: 20 }}>
          {value.map((v, i) => {
            const s = v as string;
            return <li key={i}>{looksLikeEnumValue(s) ? humanizeEnumValue(s) : s}</li>;
          })}
        </ul>
      );
    }
    // Number array → comma list
    if (value.every((v) => typeof v === "number")) {
      return <>{value.join(", ")}</>;
    }
    // Object array → cards
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
        {(value as Record<string, unknown>[]).map((item, i) => (
          <div
            key={i}
            style={{
              border: "1px solid var(--rule)",
              borderRadius: 4,
              padding: "8px 12px",
              background: "var(--bg)",
            }}
          >
            <ObjectGrid obj={item} />
          </div>
        ))}
      </div>
    );
  }
  if (typeof value === "object") {
    return <ObjectGrid obj={value as Record<string, unknown>} />;
  }
  return <>{String(value)}</>;
}

function ObjectGrid({ obj }: { obj: Record<string, unknown> }) {
  const entries = Object.entries(obj);
  // If the entire object has no data, show a single placeholder rather
  // than a grid of "—" rows.
  if (entries.length === 0 || entries.every(([, v]) => isAllEmpty(v))) {
    return <span style={{ color: "var(--muted)" }}>(no data)</span>;
  }
  // Otherwise render EVERY sub-field, including empty ones. Empty values
  // get rendered as "(not specified)" by the Value component so the admin
  // can see what the extraction missed instead of having the missing
  // fields silently hidden.
  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, max-content) 1fr",
        columnGap: 16,
        rowGap: 6,
        margin: 0,
        fontSize: 13,
      }}
    >
      {entries.map(([k, v]) => (
        <FragmentRow key={k} k={k} v={v} />
      ))}
    </dl>
  );
}

function FragmentRow({ k, v }: { k: string; v: unknown }) {
  return (
    <>
      <dt style={{ color: "var(--muted)", fontWeight: 500 }}>{labelFor(k)}</dt>
      <dd style={{ margin: 0 }}>
        <Value name={k} value={v} />
      </dd>
    </>
  );
}

function PlainView({ pack }: { pack: PackLike }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
      {SECTIONS.map(({ title, keys }) => {
        // Gather present keys
        const slice: Record<string, unknown> = {};
        for (const k of keys) {
          if (pack[k] !== undefined) slice[k] = pack[k];
        }
        if (Object.keys(slice).length === 0) return null;
        if (Object.values(slice).every(isAllEmpty)) return null;

        // If the section is exactly one key and that key holds an object,
        // unwrap so we don't show "{ classification }" → render its inner
        // fields directly under the section title.
        const singleKeyObj =
          keys.length === 1 &&
          slice[keys[0]] &&
          typeof slice[keys[0]] === "object" &&
          !Array.isArray(slice[keys[0]]);

        return (
          <details
            key={title}
            open
            style={{
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: "10px 14px",
              background: "var(--card)",
            }}
          >
            <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              {title}
            </summary>
            <div style={{ marginTop: 8 }}>
              {singleKeyObj ? (
                <ObjectGrid obj={slice[keys[0]] as Record<string, unknown>} />
              ) : keys.length === 1 ? (
                <Value name={keys[0]} value={slice[keys[0]]} />
              ) : (
                <ObjectGrid obj={slice} />
              )}
            </div>
          </details>
        );
      })}
    </div>
  );
}

export default function StructuredPackView({ pack }: Props) {
  const [mode, setMode] = useState<"plain" | "json">("plain");
  if (!pack) return null;

  return (
    <section
      style={{
        marginTop: 16,
        padding: "14px 18px",
        border: "1px solid var(--rule)",
        borderRadius: 8,
        background: "var(--card)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 16 }}>Extracted structured pack</h2>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            What gpt-5-mini pulled out of the four call markdowns.
          </p>
        </div>
        <div style={{ display: "inline-flex", gap: 6 }}>
          <button
            type="button"
            onClick={() => setMode("plain")}
            className={mode === "plain" ? "btn btn-dark btn-sm" : "btn btn-cream btn-sm"}
          >
            Plain view
          </button>
          <button
            type="button"
            onClick={() => setMode("json")}
            className={mode === "json" ? "btn btn-dark btn-sm" : "btn btn-cream btn-sm"}
          >
            Raw JSON
          </button>
        </div>
      </div>

      {mode === "plain" ? (
        <PlainView pack={pack} />
      ) : (
        <pre
          style={{
            fontSize: 11,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            background: "var(--bg)",
            padding: 10,
            borderRadius: 4,
            marginTop: 12,
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {JSON.stringify(pack, null, 2)}
        </pre>
      )}
    </section>
  );
}
