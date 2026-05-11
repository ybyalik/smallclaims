import type { Case } from "../../../../../lib/supabase/types";
import type { StateGuide } from "../../../../../lib/types/state-guide";

interface Props {
  guide: StateGuide;
  caseRow: Case;
}

function formatDollars(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function FilingGuideContent({ guide, caseRow }: Props) {
  const userCounty = caseRow.county;
  const claimAmount = (caseRow.amount_cents || 0) / 100;
  const cap = guide.limits?.individual ?? null;
  const overCap = cap !== null && claimAmount > cap;

  // Match a county-difference note if the user's county is documented.
  const countyMatch = userCounty
    ? guide.countyDifferences?.find(
        (cd) => cd.county.toLowerCase() === userCounty.toLowerCase(),
      )
    : null;

  return (
    <div className="filing-guide">
      {/* 1. Where to file */}
      <section className="filing-section">
        <h2>1. Where to file</h2>
        <p className="filing-lede">
          You file in <strong>{guide.whereToFile.courtName}</strong>
          {guide.whereToFile.parentCourt ? ` (${guide.whereToFile.parentCourt})` : ""}.
        </p>

        {guide.whereToFile.venueRules?.length ? (
          <>
            <h4>Venue rules — pick the county that matches your situation:</h4>
            <ul>
              {guide.whereToFile.venueRules.map((v, i) => (
                <li key={i}>
                  <strong>{v.scenario}:</strong> file{" "}
                  {v.filingOptions?.length === 1
                    ? v.filingOptions[0]
                    : v.filingOptions?.join(" or ") || "in the appropriate county"}
                  .
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {guide.whereToFile.consequencesOfWrongVenue ? (
          <p className="filing-warn">
            <strong>If you file in the wrong county:</strong>{" "}
            {guide.whereToFile.consequencesOfWrongVenue}
          </p>
        ) : null}

        <p>
          <strong>E-filing:</strong>{" "}
          {guide.whereToFile.eFilingAvailable === "yes"
            ? "Available statewide. "
            : guide.whereToFile.eFilingAvailable === "varies"
            ? "Varies by county. "
            : "Not available — file in person or by mail. "}
          {guide.whereToFile.eFilingNotes}
          {guide.whereToFile.eFilingPortal ? (
            <>
              {" "}
              <a href={guide.whereToFile.eFilingPortal} target="_blank" rel="noreferrer">
                Open the e-filing portal
              </a>
              .
            </>
          ) : null}
        </p>

        {countyMatch && countyMatch.differences?.length ? (
          <div className="filing-county-note">
            <h4>{countyMatch.county} County notes</h4>
            <ul>
              {countyMatch.differences.map((d, i) => (
                <li key={i}>
                  <strong>{d.topic}:</strong> {d.detail}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      {/* 2. Fees */}
      <section className="filing-section">
        <h2>2. Filing fees</h2>
        {guide.fees.tiers?.length ? (
          <>
            <p>
              Your fee depends on how much you&rsquo;re claiming. Your case demands{" "}
              <strong>{formatDollars(claimAmount)}</strong>:
            </p>
            <table className="filing-fee-table">
              <thead>
                <tr>
                  <th>Claim amount</th>
                  <th>Filing fee</th>
                </tr>
              </thead>
              <tbody>
                {guide.fees.tiers.map((t, i) => (
                  <tr key={i}>
                    <td>{t.range}</td>
                    <td>{formatDollars(t.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}

        {overCap && cap !== null ? (
          <p className="filing-warn">
            <strong>Heads up:</strong> Your demand of {formatDollars(claimAmount)} is above the{" "}
            {guide.state} small-claims cap of {formatDollars(cap)}. Either waive the excess or
            file in civil court (different process). Edit your case to choose.
          </p>
        ) : null}

        {guide.fees.serviceFees?.length ? (
          <>
            <h4>Service fees (not paid to the court)</h4>
            <ul>
              {guide.fees.serviceFees.map((sf, i) => (
                <li key={i}>
                  <strong>{sf.method}:</strong> {sf.amount}
                  {sf.notes ? ` — ${sf.notes}` : ""}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {guide.fees.waiver?.forms?.length ? (
          <>
            <h4>Fee waiver</h4>
            <p>
              If you can&rsquo;t afford the filing fee, you may qualify for a waiver. File:{" "}
              {guide.fees.waiver.forms.map((f, i) => (
                <span key={i}>
                  {i > 0 ? ", " : ""}
                  {f.url ? (
                    <a href={f.url} target="_blank" rel="noreferrer">
                      <strong>{f.number}</strong> — {f.name}
                    </a>
                  ) : (
                    <>
                      <strong>{f.number}</strong> — {f.name}
                    </>
                  )}
                </span>
              ))}
              .
            </p>
            {guide.fees.waiver.eligibility?.length ? (
              <ul>
                {guide.fees.waiver.eligibility.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            ) : null}
            {guide.fees.waiver.coverageNotes ? (
              <p className="filing-meta">{guide.fees.waiver.coverageNotes}</p>
            ) : null}
          </>
        ) : null}
      </section>

      {/* 3. Forms */}
      {guide.forms?.length ? (
        <section className="filing-section">
          <h2>3. The forms you need</h2>
          <p>
            Pick up these forms from the clerk&rsquo;s office or download from your state&rsquo;s
            Judicial Council site. Fill them out before you go in — most clerks won&rsquo;t help
            you fill them out.
          </p>
          <ul className="filing-forms-list">
            {guide.forms
              .filter((f) => f.required && f.whoFiles !== "defendant" && f.whoFiles !== "court")
              .map((f, i) => (
                <li key={i}>
                  <strong>{f.number}</strong> — {f.name}
                  {f.description ? <span className="filing-form-purpose">{f.description}</span> : null}
                </li>
              ))}
          </ul>
        </section>
      ) : null}

      {/* 4. Pre-filing requirements */}
      {(guide.preFiling.demandLetterRequired ||
        guide.preFiling.governmentClaimRequired ||
        guide.preFiling.demandLetterNotes) && (
        <section className="filing-section">
          <h2>4. Before you file — pre-suit requirements</h2>
          {guide.preFiling.demandLetterRequired ? (
            <p>
              <strong>{guide.state} requires a pre-suit demand letter</strong> before you can
              file. {guide.preFiling.demandLetterNotes}
            </p>
          ) : guide.preFiling.demandLetterRecommended ? (
            <p>
              A demand letter isn&rsquo;t legally required, but it&rsquo;s strongly
              recommended. {guide.preFiling.demandLetterNotes}
            </p>
          ) : null}
          {guide.preFiling.governmentClaimRequired ? (
            <p className="filing-warn">
              <strong>Government defendant:</strong>{" "}
              {guide.preFiling.governmentClaimNotes ||
                "Special pre-suit notice required. Most states impose tight 90-180 day deadlines for filing a government claim before you can sue."}
            </p>
          ) : null}
        </section>
      )}

      {/* 5. Service of process */}
      <section className="filing-section">
        <h2>5. Serving the defendant</h2>
        <p>
          After you file, the defendant has to be officially notified — that&rsquo;s &ldquo;service
          of process.&rdquo; You cannot serve the papers yourself.
        </p>

        {guide.service.whoCanServe?.length ? (
          <>
            <h4>Who can serve:</h4>
            <ul>
              {guide.service.whoCanServe.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </>
        ) : null}

        {guide.service.methods?.length ? (
          <>
            <h4>Methods allowed:</h4>
            <ul>
              {guide.service.methods.map((m, i) => (
                <li key={i}>
                  <strong>{m.name}.</strong> {m.description}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <p>
          <strong>Timing:</strong> Service must be completed at least{" "}
          {guide.service.timing.inCountyDays} days before the hearing if the defendant is in the
          same county, {guide.service.timing.outOfCountyDays} days if out of county.
        </p>

        <p>
          <strong>Proof of service:</strong> File <strong>{guide.service.proofForm.number}</strong>{" "}
          — {guide.service.proofForm.name} at least{" "}
          {guide.service.proofFilingDeadlineDays} days before your hearing.
        </p>

        {guide.service.businessServiceRules ? (
          <p>
            <strong>Business defendants:</strong> {guide.service.businessServiceRules}
          </p>
        ) : null}

        {guide.service.cantFindDefendant ? (
          <p>
            <strong>If you can&rsquo;t find the defendant:</strong>{" "}
            {guide.service.cantFindDefendant}
          </p>
        ) : null}
      </section>

      {/* 6. Hearing day */}
      <section className="filing-section">
        <h2>6. What to expect at the hearing</h2>
        <p>
          <strong>Format:</strong> {guide.hearing.format}. Presided over by a{" "}
          {guide.hearing.presider}.
        </p>

        {guide.hearing.attorneysAllowed ? (
          <p>Attorneys are allowed. {guide.hearing.attorneysAllowedNotes}</p>
        ) : (
          <p>
            <strong>Attorneys are not allowed at the hearing.</strong>{" "}
            {guide.hearing.attorneysAllowedNotes}
          </p>
        )}

        {guide.hearing.whatToBring?.length ? (
          <>
            <h4>What to bring:</h4>
            <ul>
              {guide.hearing.whatToBring.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </>
        ) : null}

        <p>
          <strong>Burden of proof:</strong> {guide.hearing.burdenOfProof}
        </p>

        <p>
          <strong>Decision:</strong> {guide.hearing.decisionTiming}
        </p>
      </section>

      {/* 7. After the hearing */}
      <section className="filing-section">
        <h2>7. After the hearing</h2>
        <p>
          <strong>If they don&rsquo;t pay:</strong> A judgment isn&rsquo;t a check.{" "}
          {guide.collection?.paymentDeadline
            ? `You typically have to wait ${guide.collection.paymentDeadline} before you can act on collection.`
            : ""}{" "}
          Collection methods include{" "}
          {guide.collection?.methods
            ?.slice(0, 4)
            .map((m) => m.name)
            .join(", ") || "wage garnishment, bank levy, and judgment liens"}
          . The judgment is good for {guide.collection?.judgmentLifespanYears ?? "10"} years.
        </p>
      </section>

      {guide.pitfalls?.length ? (
        <section className="filing-section">
          <h2>Common pitfalls — don&rsquo;t fall into these</h2>
          <ul>
            {guide.pitfalls.slice(0, 6).map((p, i) => (
              <li key={i}>
                <strong>{p.title}:</strong> {p.whatHappens} <em>How to avoid:</em> {p.howToAvoid}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="filing-disclaimer">
        We are not a law firm and do not provide legal advice. The information above describes
        general procedures in {guide.state} as of {new Date(guide.lastUpdated).toLocaleDateString()}.
        Laws and forms change — verify with the court before filing. For complex cases, consult a
        licensed attorney.
      </p>
    </div>
  );
}
