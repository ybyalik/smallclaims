import Link from "next/link";
import { notFound } from "next/navigation";
import { loadAdminCase } from "../../../../lib/admin/users";
import { loadCaseResearchLatest } from "../../../../lib/admin/case-research";
import CaseResearchPanel from "./CaseResearchPanel";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Case · Admin",
};

function fmt$(cents: number | null | undefined): string {
  return ((cents ?? 0) / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function fmtDate(s: string | null): string {
  if (!s) return "—";
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

interface AddressShape {
  line1?: string;
  line2?: string | null;
  city?: string;
  state?: string;
  zip?: string;
}

// Drop fields that bloat the raw dump without adding debug value.
// signature_value is a 30+ KB base64 PNG; we keep a placeholder so it's still
// obvious whether one was captured.
function stripHeavyFields(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...obj };
  if (typeof out.signature_value === "string" && out.signature_value.length > 200) {
    out.signature_value = `[base64 image, ${(out.signature_value as string).length} chars omitted]`;
  }
  return out;
}

function fmtAddress(addr: unknown): string {
  if (!addr || typeof addr !== "object") return "—";
  const a = addr as AddressShape;
  return [a.line1, a.line2, [a.city, a.state, a.zip].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join(" · ");
}

export default async function AdminCaseDetailPage({ params }: { params: { id: string } }) {
  const detail = await loadAdminCase(params.id);
  if (!detail) notFound();
  const research = await loadCaseResearchLatest(params.id);

  const { caseRow: c, ownerEmail, ownerName, payments, documents } = detail;
  const answers = (c.intake_answers ?? {}) as Record<string, unknown>;

  return (
    <div className="admin-page">
      <Link href="/admin/cases" className="admin-back">
        ← All cases
      </Link>
      <header className="admin-page-head">
        <div>
          <h1>
            {c.defendant_name ? `vs. ${c.defendant_name}` : `Case ${c.id.slice(0, 8)}…`}
          </h1>
          <p>
            <span className={`admin-pill admin-pill-${statusTone(c.status)}`}>{c.status}</span>
            {" · "}
            {c.dispute_type.replace(/_/g, " ")} · {c.state} · {fmt$(c.amount_cents)} demand · created {fmtDate(c.created_at)}
          </p>
        </div>
      </header>

      <h2 className="admin-section-h">Owner</h2>
      <div className="admin-detail-grid">
        <Field label="Name" value={ownerName} />
        <Field label="Email">
          {ownerEmail ? (
            <Link href={`/admin/users/${c.owner_user_id}`} className="admin-link">
              {ownerEmail}
            </Link>
          ) : (
            <span style={{ color: "var(--muted)" }}>(anonymous draft)</span>
          )}
        </Field>
        <Field label="User ID" mono value={c.owner_user_id ?? "(none)"} />
        <Field label="Cookie session" mono value={c.cookie_session_id ?? "(claimed)"} />
      </div>

      <h2 className="admin-section-h" style={{ marginTop: 28 }}>Defendant</h2>
      <div className="admin-detail-grid">
        <Field label="Name" value={c.defendant_name} />
        <Field label="Email" value={c.defendant_email} />
        <Field label="Phone" value={c.defendant_phone} />
        <Field label="Address" value={fmtAddress(c.defendant_address)} />
        <Field label="County" value={(c as { defendant_county?: string | null }).defendant_county ?? null} />
        <Field label="Entity type" value={(answers.defendant_entity_type as string) ?? null} />
        <Field
          label="Skip-trace requested"
          value={answers.defendant_skip_trace_needed ? "yes" : "no"}
        />
        <Field label="Business sub-type" value={(answers.defendant_business_subtype as string) ?? null} />
        <Field label="Website" value={(answers.defendant_website as string) ?? null} />
      </div>

      <h2 className="admin-section-h" style={{ marginTop: 28 }}>Plaintiff</h2>
      <div className="admin-detail-grid">
        <Field label="Name" value={c.plaintiff_name} />
        <Field label="Email" value={c.plaintiff_email} />
        <Field label="Phone" value={c.plaintiff_phone} />
        <Field label="Address" value={fmtAddress(c.plaintiff_address)} />
        <Field label="County" value={(c as { plaintiff_county?: string | null }).plaintiff_county ?? null} />
        <Field label="Entity type" value={(answers.plaintiff_entity_type as string) ?? null} />
        <Field label="SMS consent" value={answers.plaintiff_sms_consent ? "yes" : "no"} />
      </div>

      <h2 className="admin-section-h" style={{ marginTop: 28 }}>Claim</h2>
      <div className="admin-detail-grid">
        <Field label="Demand amount" value={fmt$(c.amount_cents)} />
        <Field label="Recipient state" value={(answers.recipient_state as string) ?? c.state} />
        <Field label="Incident date" value={(answers.incident_date as string) ?? null} />
        <Field label="Incident location" value={(answers.incident_location as string) ?? null} />
        <Field label="Incident county" value={(c as { incident_county?: string | null }).incident_county ?? null} />
      </div>
      {c.facts_narrative ? (
        <div className="admin-prose">
          <strong>Narrative:</strong>
          <p>{c.facts_narrative}</p>
        </div>
      ) : null}
      {answers.amount_calculation ? (
        <div className="admin-prose">
          <strong>How calculated:</strong>
          <p>{answers.amount_calculation as string}</p>
        </div>
      ) : null}
      {Array.isArray(answers.line_items) && (answers.line_items as unknown[]).length > 0 ? (
        <div className="admin-prose">
          <strong>Additional damage categories:</strong>
          <ul>
            {(answers.line_items as Array<{ title: string; amount: number }>).map((li, i) => (
              <li key={i}>
                {li.title}: <strong>${(li.amount ?? 0).toLocaleString("en-US")}</strong>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <h2 className="admin-section-h" style={{ marginTop: 28 }}>Evidence</h2>
      {Array.isArray(answers.evidence_files) && (answers.evidence_files as unknown[]).length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Filename</th>
              <th>Type</th>
              <th>Description</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {(answers.evidence_files as Array<{ filename: string; size: number; kind: string; description?: string }>).map(
              (f, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: "ui-monospace, monospace", fontSize: 12.5 }}>{f.filename}</td>
                  <td>{f.kind}</td>
                  <td style={{ color: "var(--muted)" }}>{f.description || "—"}</td>
                  <td style={{ color: "var(--muted)" }}>{(f.size / 1024).toFixed(0)} KB</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p style={{ color: "var(--muted)" }}>
          {answers.evidence_skipped ? "User opted to continue without evidence." : "No evidence on file."}
        </p>
      )}
      {documents.length > 0 ? (
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>
          {documents.length} document(s) tracked in the documents table.
        </p>
      ) : null}

      <h2 className="admin-section-h" style={{ marginTop: 28 }}>Signature & checkout</h2>
      <div className="admin-detail-grid">
        <Field label="Tier selected" value={(answers.selected_tier as string) ?? null} />
        <Field
          label="Add-ons"
          value={
            Array.isArray(answers.selected_addons) && answers.selected_addons.length > 0
              ? (answers.selected_addons as string[]).join(", ")
              : null
          }
        />
        <Field label="Truth ack at" value={(answers.truth_acknowledged_at as string) ?? null} />
        <Field label="Signature type" value={(answers.signature_type as string) ?? null} />
        {answers.signature_type === "type" ? (
          <Field label="Typed name">
            <span style={{ fontFamily: "Caveat, cursive", fontSize: 24, color: "var(--accent)" }}>
              {answers.signature_value as string}
            </span>
          </Field>
        ) : answers.signature_type === "draw" && typeof answers.signature_value === "string" ? (
          <Field label="Drawn signature">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={answers.signature_value as string}
              alt="signature"
              style={{ maxWidth: 240, border: "1px solid var(--hairline)", borderRadius: 6 }}
            />
          </Field>
        ) : null}
      </div>

      <h2 className="admin-section-h" style={{ marginTop: 28 }}>Payments</h2>
      {payments.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No payments yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Product</th>
              <th style={{ textAlign: "right" }}>Amount</th>
              <th>Created</th>
              <th>Captured</th>
              <th>Stripe</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td><span className={`admin-pill admin-pill-${paymentTone(p.status)}`}>{p.status}</span></td>
                <td>{p.product_key}</td>
                <td style={{ textAlign: "right", fontFamily: "Newsreader, Georgia, serif", fontWeight: 600 }}>
                  {fmt$(p.amount_cents)}
                </td>
                <td style={{ color: "var(--muted)", fontSize: 13 }}>{fmtDate(p.created_at)}</td>
                <td style={{ color: "var(--muted)", fontSize: 13 }}>{fmtDate(p.paid_at)}</td>
                <td>
                  {p.stripe_payment_intent_id ? (
                    <a
                      href={`https://dashboard.stripe.com/payments/${p.stripe_payment_intent_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-link"
                      style={{ fontSize: 12 }}
                    >
                      Open in Stripe ↗
                    </a>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="admin-section-h" style={{ marginTop: 28 }}>Filing research</h2>
      <CaseResearchPanel caseId={params.id} detail={research} />

      <details style={{ marginTop: 28 }}>
        <summary
          style={{
            cursor: "pointer",
            color: "var(--muted)",
            fontSize: 13,
            padding: "6px 0",
          }}
        >
          Show raw intake_answers (debug)
        </summary>
        <pre className="admin-pre" style={{ marginTop: 8 }}>
          {JSON.stringify(stripHeavyFields(answers), null, 2)}
        </pre>
      </details>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
  children,
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="admin-field">
      <span className="admin-field-label">{label}</span>
      {children ? (
        <span className="admin-field-value">{children}</span>
      ) : (
        <span
          className="admin-field-value"
          style={{
            fontFamily: mono ? "ui-monospace, monospace" : undefined,
            fontSize: mono ? 12.5 : undefined,
            color: value ? "var(--ink)" : "var(--muted)",
          }}
        >
          {value || "—"}
        </span>
      )}
    </div>
  );
}

function statusTone(status: string): string {
  if (status === "draft") return "neutral";
  if (status.includes("paid") || status.includes("sent") || status.includes("delivered")) return "active";
  if (status === "settled" || status === "closed" || status === "judgment_entered") return "good";
  return "neutral";
}

function paymentTone(status: string): string {
  if (status === "succeeded") return "good";
  if (status === "failed" || status === "refunded") return "warn";
  return "neutral";
}
