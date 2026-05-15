"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { PostalAddress } from "../../../../../../lib/supabase/types";
import type { CaseValidationIssue } from "../../../../../../lib/cases/validate-case";
import {
  disputeTypeOtherFrom,
  formatDisputeTypeShort,
} from "../../../../../../lib/cases/dispute-type-label";
import {
  useFormErrors,
  ErrorSummary,
} from "../../../../../../components/wizard/form-errors";

interface PartyProps {
  name: string | null;
  address: PostalAddress | null;
  email: string | null;
  phone: string | null;
}

interface Props {
  caseId: string;
  isAuthenticated: boolean;
  state: string;
  county: string | null;
  disputeType: string;
  amountCents: number;
  plaintiff: PartyProps;
  defendant: PartyProps;
  factsNarrative: string | null;
  intakeAnswers: Record<string, unknown>;
  // Pre-fill the sig fields if the user has already partially completed.
  existingSignatureTypedName: string | null;
  existingSignatureImage: string | null;
}

type SigMode = "draw" | "type";

function fmtMoney(cents: number): string {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

// Replaced by formatDisputeTypeShort from lib/cases/dispute-type-label.

function fmtAddress(a: PostalAddress | null): string {
  if (!a) return "—";
  const lines: string[] = [];
  if (a.line1) lines.push(String(a.line1));
  if (a.line2) lines.push(String(a.line2));
  const cityLine = [a.city, a.state, a.zip].filter(Boolean).join(", ");
  if (cityLine) lines.push(cityLine);
  return lines.join("\n") || "—";
}

// Keys we render prominently elsewhere on the page (or that are just
// internal UI state). They don't show up in the generic intake-extras
// section because they'd duplicate or be noise.
const SKIP_INTAKE_KEYS = new Set([
  "incident_date",          // shown in Case panel
  "recovery_notes",         // own panel
  "evidence",               // own panel
  "evidence_files",         // own panel
  "evidence_skipped",       // UI state
  "recovery_seen",          // UI state
  "eligibility_passed",     // UI state, redundant with eligibility object
  "preselected_addons",     // checkout state, not wizard answer
  "truth_acknowledged_at",  // legacy field from old review step
  "signature_type",         // legacy
  "signature_value",        // legacy
  "selected_tier",          // legacy
  "selected_addons",        // legacy
  "ready_for_checkout",     // legacy
  "defendant_skip_trace_needed", // shown via Defendant panel
  "demand_response",        // post-letter state
  "dispute_type_other",     // shown via Case category panel
  "lawsuit_threat_consent", // shown via checkout
  // Internal score-quiz fields. They came from /case-score and live on
  // the case row for analytics/auditing only; never user-facing here.
  "score_incident_date",
  "score_prior_contact",
  "score_defendant_kind",
  "score_dispute_type_raw",
  "score_evidence_strength",
  "score_result",
  "they_are",
  "you_are",
  // Internal classifier output (not for the user)
  "case_classification",
  "collection_plan_intake",
  // Closed-case metadata
  "closed_at",
  "closed_reason",
  "closed_by",
]);

// Human labels for known intake keys. Anything not in the map falls back
// to "snake_case_to_title_case".
const INTAKE_LABELS: Record<string, string> = {
  incident_county: "Incident county",
  incident_location: "Where it happened",
  recipient_state: "Recipient state",
  plaintiff_entity_type: "You are",
  defendant_entity_type: "They are",
  amount_calculation: "How the amount was calculated",
  eligibility: "Eligibility",
  adult: "You are an adult",
  within_sol: "Within statute of limitations",
  private_party: "Defendant is a private party (not government)",
};

function humanizeKey(key: string): string {
  if (INTAKE_LABELS[key]) return INTAKE_LABELS[key];
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function fmtIntakeValue(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "string") return v || "—";
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return "—";
    if (v.every((x) => typeof x === "string")) return (v as string[]).join(", ");
    return JSON.stringify(v);
  }
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

interface IntakeExtra {
  key: string;
  label: string;
  value: string;
  // Sub-rows for object-valued entries (e.g., eligibility => {adult, ...})
  subRows?: Array<{ label: string; value: string }>;
}

function collectIntakeExtras(answers: Record<string, unknown>): IntakeExtra[] {
  const out: IntakeExtra[] = [];
  for (const [key, raw] of Object.entries(answers)) {
    if (key.startsWith("_")) continue;       // internal / test
    if (SKIP_INTAKE_KEYS.has(key)) continue; // shown elsewhere
    const label = humanizeKey(key);
    if (
      raw !== null &&
      typeof raw === "object" &&
      !Array.isArray(raw)
    ) {
      // Render object's keys as sub-rows
      const inner = raw as Record<string, unknown>;
      const subRows = Object.entries(inner)
        .filter(([, v]) => v !== null && v !== undefined && v !== "")
        .map(([k, v]) => ({
          label: humanizeKey(k),
          value: fmtIntakeValue(v),
        }));
      if (subRows.length === 0) continue;
      out.push({ key, label, value: "", subRows });
    } else {
      const value = fmtIntakeValue(raw);
      if (value === "—") continue;
      out.push({ key, label, value });
    }
  }
  return out;
}

export default function ReviewStep({
  caseId,
  isAuthenticated,
  state,
  county,
  disputeType,
  amountCents,
  plaintiff,
  defendant,
  factsNarrative,
  intakeAnswers,
  existingSignatureTypedName,
  existingSignatureImage,
}: Props) {
  const router = useRouter();
  const [truth, setTruth] = useState(false);

  const [sigMode, setSigMode] = useState<SigMode>(
    existingSignatureImage ? "draw" : "type",
  );
  const [typedName, setTypedName] = useState(existingSignatureTypedName ?? "");
  const [drawnSig, setDrawnSig] = useState<string | null>(
    existingSignatureImage ?? null,
  );
  const sigRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef<boolean>(false);

  const [submitting, setSubmitting] = useState(false);
  // When the server's finish-intake validation rejects with a structured
  // issues array, we surface each item with a "Fix it" link to the right
  // wizard step.
  const [caseIssues, setCaseIssues] = useState<CaseValidationIssue[]>([]);
  const { errors, showErrors, clear, setErrors } = useFormErrors();

  // Setup canvas for drawing
  useEffect(() => {
    if (sigMode !== "draw") return;
    const canvas = sigRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0e0e0e";
    ctx.lineCap = "round";
  }, [sigMode]);

  function startDraw(e: React.PointerEvent) {
    drawing.current = true;
    const canvas = sigRef.current!;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }
  function moveDraw(e: React.PointerEvent) {
    if (!drawing.current) return;
    const canvas = sigRef.current!;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d")!;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  }
  function endDraw() {
    if (!drawing.current) return;
    drawing.current = false;
    const canvas = sigRef.current!;
    setDrawnSig(canvas.toDataURL("image/png"));
  }
  function clearSig() {
    const canvas = sigRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawnSig(null);
  }

  // Either mode must have produced a valid signature for the submit button
  // to enable. In "type" mode the typed name carries the attestation; in
  // "draw" mode the drawn image does, and the typed name is hidden.
  const hasSignature =
    sigMode === "type"
      ? typedName.trim().length >= 2
      : !!drawnSig;

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!truth) {
      errs.truth = "Please confirm everything is accurate before finishing.";
    }
    if (sigMode === "type" && typedName.trim().length < 2) {
      errs.signature = "Please type your full name to attest accuracy.";
    }
    if (sigMode === "draw" && !drawnSig) {
      errs.signature = "Please draw your signature in the box.";
    }
    return errs;
  }

  async function submit() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      showErrors(errs);
      return;
    }
    clear();
    if (!isAuthenticated) {
      // Send anon users to signup with a return to this step.
      router.push(
        `/signup?next=${encodeURIComponent(`/case/${caseId}/build/review`)}`,
      );
      return;
    }
    setSubmitting(true);
    setCaseIssues([]);
    try {
      const res = await fetch(`/api/cases/${caseId}/finish-intake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Send the typed name when in type mode, empty string when drawn
          // (the server falls back to the drawn image as the attestation).
          signature_typed_name:
            sigMode === "type" ? typedName.trim() : "",
          signature_image: sigMode === "draw" ? drawnSig : null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Server-side validation rejected the case for missing fields.
        // Surface the issues with deep-links to the right wizard step.
        if (
          data.error === "case_incomplete" &&
          Array.isArray(data.issues) &&
          data.issues.length > 0
        ) {
          setCaseIssues(data.issues as CaseValidationIssue[]);
          setSubmitting(false);
          // Scroll the issues into view.
          requestAnimationFrame(() => {
            document
              .querySelector(".dlw-case-issues")
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          });
          return;
        }
        throw new Error(data.error || "Could not save signature");
      }
      router.push(data.redirectUrl || `/case/${caseId}`);
    } catch (e) {
      setErrors({ _save: e instanceof Error ? e.message : "Could not save signature" });
      setSubmitting(false);
    }
  }

  // Pull a few key fields out of intake_answers for prominent placement
  // in the recap. Everything else gets rendered below by walkIntakeAnswers.
  const incidentDate =
    typeof intakeAnswers.incident_date === "string"
      ? (intakeAnswers.incident_date as string)
      : null;
  const evidenceItems = Array.isArray(intakeAnswers.evidence_files)
    ? (intakeAnswers.evidence_files as Array<{
        kind?: string;
        filename?: string;
        mime?: string;
        size?: number;
        uploadedAt?: string;
      }>)
    : Array.isArray(intakeAnswers.evidence)
      ? (intakeAnswers.evidence as Array<{ name?: string; url?: string }>)
      : [];
  const recoveryNotes =
    typeof intakeAnswers.recovery_notes === "string"
      ? (intakeAnswers.recovery_notes as string)
      : null;
  const skipTraceNeeded = !!intakeAnswers.defendant_skip_trace_needed;

  // Render everything else from intake_answers. Internal flags / test
  // scenario keys / already-rendered fields are filtered out.
  const intakeExtras = collectIntakeExtras(intakeAnswers);

  return (
    <div className="dlw-step">
      <div className="dlw-step-eyebrow">Final step</div>
      <h1>Review and sign</h1>
      <p className="dlw-sub">
        Check that everything below is accurate. Once you sign and finish, your
        case is locked in and you can choose what to buy next.
      </p>

      {/* RECAP */}
      <div className="dlw-status-panel" style={{ marginTop: 14 }}>
        <h4>Case</h4>
        <div className="dlw-status-row">
          <span>State</span>
          <span>{state || "—"}</span>
        </div>
        <div className="dlw-status-row">
          <span>County</span>
          <span>{county || "—"}</span>
        </div>
        <div className="dlw-status-row">
          <span>Dispute type</span>
          <span>{formatDisputeTypeShort(disputeType, disputeTypeOtherFrom(intakeAnswers))}</span>
        </div>
        <div className="dlw-status-row total">
          <span>Amount in dispute</span>
          <span>{fmtMoney(amountCents)}</span>
        </div>
        {incidentDate ? (
          <div className="dlw-status-row">
            <span>Incident date</span>
            <span>{new Date(incidentDate).toLocaleDateString()}</span>
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
          marginTop: 14,
        }}
      >
        <div className="dlw-status-panel">
          <h4>You (Plaintiff)</h4>
          <div style={{ fontSize: 14 }}>
            <strong>{plaintiff.name || "—"}</strong>
          </div>
          <pre
            style={{
              fontSize: 13,
              color: "#6b6b6b",
              margin: "4px 0 0",
              fontFamily: "inherit",
              whiteSpace: "pre-wrap",
            }}
          >
            {fmtAddress(plaintiff.address)}
          </pre>
          {plaintiff.email ? (
            <div style={{ fontSize: 13, color: "#6b6b6b", marginTop: 4 }}>
              {plaintiff.email}
            </div>
          ) : null}
          {plaintiff.phone ? (
            <div style={{ fontSize: 13, color: "#6b6b6b" }}>{plaintiff.phone}</div>
          ) : null}
        </div>

        <div className="dlw-status-panel">
          <h4>Defendant</h4>
          <div style={{ fontSize: 14 }}>
            <strong>{defendant.name || "—"}</strong>
          </div>
          {skipTraceNeeded ? (
            <div style={{ fontSize: 13, color: "#8a6b00", marginTop: 4 }}>
              Skip-trace required (address unknown)
            </div>
          ) : (
            <pre
              style={{
                fontSize: 13,
                color: "#6b6b6b",
                margin: "4px 0 0",
                fontFamily: "inherit",
                whiteSpace: "pre-wrap",
              }}
            >
              {fmtAddress(defendant.address)}
            </pre>
          )}
          {defendant.email ? (
            <div style={{ fontSize: 13, color: "#6b6b6b", marginTop: 4 }}>
              {defendant.email}
            </div>
          ) : null}
          {defendant.phone ? (
            <div style={{ fontSize: 13, color: "#6b6b6b" }}>{defendant.phone}</div>
          ) : null}
        </div>
      </div>

      {factsNarrative ? (
        <div className="dlw-status-panel" style={{ marginTop: 14 }}>
          <h4>What happened</h4>
          <p style={{ fontSize: 14, whiteSpace: "pre-wrap", margin: "4px 0 0" }}>
            {factsNarrative}
          </p>
        </div>
      ) : null}

      {recoveryNotes ? (
        <div className="dlw-status-panel" style={{ marginTop: 14 }}>
          <h4>What you want</h4>
          <p style={{ fontSize: 14, whiteSpace: "pre-wrap", margin: "4px 0 0" }}>
            {recoveryNotes}
          </p>
        </div>
      ) : null}

      {evidenceItems.length > 0 ? (
        <div className="dlw-status-panel" style={{ marginTop: 14 }}>
          <h4>Evidence ({evidenceItems.length})</h4>
          <ul style={{ margin: "4px 0 0", paddingLeft: 20, fontSize: 14 }}>
            {evidenceItems.slice(0, 12).map((e, i) => {
              const ev = e as {
                kind?: string;
                filename?: string;
                name?: string;
                url?: string;
              };
              const label = ev.filename || ev.name || ev.url || "(unnamed file)";
              return (
                <li key={i} style={{ marginBottom: 2 }}>
                  {ev.kind ? (
                    <span style={{ color: "#6b6b6b" }}>{ev.kind}: </span>
                  ) : null}
                  {label}
                </li>
              );
            })}
            {evidenceItems.length > 12 ? (
              <li style={{ color: "#6b6b6b" }}>
                …and {evidenceItems.length - 12} more
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}

      {intakeExtras.length > 0 ? (
        <div className="dlw-status-panel" style={{ marginTop: 14 }}>
          <h4>Other details</h4>
          {intakeExtras.map((row) => (
            <div key={row.key} style={{ marginTop: 4 }}>
              {row.subRows ? (
                <>
                  <div style={{ fontSize: 13, color: "#6b6b6b", marginTop: 4 }}>
                    {row.label}
                  </div>
                  <ul
                    style={{
                      margin: "2px 0 4px",
                      paddingLeft: 18,
                      fontSize: 14,
                    }}
                  >
                    {row.subRows.map((sub, i) => (
                      <li key={i}>
                        <span style={{ color: "#6b6b6b" }}>{sub.label}:</span>{" "}
                        {sub.value}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="dlw-status-row">
                  <span>{row.label}</span>
                  <span style={{ whiteSpace: "pre-wrap", textAlign: "right" }}>
                    {row.value}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}

      <div style={{ fontSize: 13, color: "#6b6b6b", margin: "12px 4px 0" }}>
        Need to change anything?{" "}
        <Link
          href={`/case/${caseId}/build/state`}
          style={{ textDecoration: "underline" }}
        >
          Go back to edit
        </Link>
        .
      </div>

      {/* TRUTH + SIGNATURE */}
      <div className="dlw-truth-card" style={{ marginTop: 18 }}>
        <h3>Sign to finish</h3>
        <label
          style={{
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <input
            type="checkbox"
            checked={truth}
            onChange={(e) => setTruth(e.target.checked)}
            style={{ marginTop: 3, accentColor: "var(--accent, #d9402e)" }}
            aria-invalid={!!errors.truth}
          />
          <span>
            I confirm everything above is true and accurate to the best of my
            knowledge. I understand my signature will be applied to any documents
            I purchase later (demand letter, court filings).
          </span>
        </label>

        <div style={{ marginTop: 18 }}>
          <div className="dlw-sig-tabs" role="tablist" aria-label="Signature method">
            <button
              type="button"
              role="tab"
              aria-selected={sigMode === "type"}
              className={`dlw-sig-tab${sigMode === "type" ? " is-on" : ""}`}
              onClick={() => setSigMode("type")}
            >
              Typed signature
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={sigMode === "draw"}
              className={`dlw-sig-tab${sigMode === "draw" ? " is-on" : ""}`}
              onClick={() => setSigMode("draw")}
            >
              Draw signature
            </button>
          </div>

          {sigMode === "type" ? (
            <div style={{ marginTop: 10 }}>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                placeholder="Type your full name to attest"
                className="dlw-input"
                style={{ fontSize: 15 }}
                autoComplete="name"
                aria-invalid={!!errors.signature}
              />
              {typedName.trim().length >= 2 ? (
                <div className="dlw-sig-typed-preview">
                  <span className="dlw-sig-typed-label">Your typed signature</span>
                  <span className="dlw-sig-typed-name">{typedName}</span>
                </div>
              ) : (
                <p style={{ fontSize: 12.5, color: "#8b8779", margin: "8px 0 0" }}>
                  Your typed name acts as your legal attestation that the
                  information is accurate.
                </p>
              )}
            </div>
          ) : (
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 13, color: "#6b6b6b", margin: 0 }}>
                Use your mouse or finger to sign in the box. This image is
                applied to the demand letter PDF when you purchase one.
              </p>
              <canvas
                ref={sigRef}
                className="dlw-sig-pad"
                onPointerDown={startDraw}
                onPointerMove={moveDraw}
                onPointerUp={endDraw}
                onPointerLeave={endDraw}
                style={{ width: "100%" }}
              />
              <button
                type="button"
                className="dlw-sig-clear"
                onClick={clearSig}
              >
                Clear signature
              </button>
            </div>
          )}
        </div>
      </div>

      <ErrorSummary errors={errors} order={["truth", "signature", "_save"]} />

      {caseIssues.length > 0 ? (
        <div className="dlw-case-issues" role="alert" aria-live="polite">
          <p className="dlw-case-issues-h">
            Before you can finish and sign, please complete these:
          </p>
          <ul>
            {caseIssues.map((iss) => (
              <li key={iss.field}>
                <span className="dlw-case-issues-msg">{iss.message}</span>
                <Link
                  href={`/case/${caseId}/build/${iss.step}`}
                  className="dlw-case-issues-link"
                >
                  Fix it →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="dlw-actions">
        <Link
          href={`/case/${caseId}/build/evidence`}
          className="dlw-actions-back"
        >
          ← Back
        </Link>
        <button
          type="button"
          className="dlw-cta"
          onClick={submit}
          disabled={submitting || !truth || !hasSignature}
        >
          {submitting
            ? "Finishing…"
            : !isAuthenticated
              ? "Create account & finish"
              : "Finish & sign ▶"}
        </button>
      </div>
    </div>
  );
}
