import Link from "next/link";
import Breadcrumbs from "../Breadcrumbs";
import FeaturedUsMap from "../widgets/FeaturedUsMap";
import CountUp from "../widgets/CountUp";
import { availableStateSlugs } from "../../lib/state-data";
import { getDepositStateTable } from "../../lib/deposit-state-table";
import type { LandlordIssue, EvidenceCell } from "../../lib/landlord-issues/types";
import type { CategoryMeta } from "../../lib/issues/categories";

const FEATURED_STATE_SLUGS = [
  "california", "texas", "florida", "new-york", "pennsylvania",
  "illinois", "ohio", "georgia", "north-carolina", "michigan",
];

interface Props {
  issue: LandlordIssue;
  category: CategoryMeta;
  siblings: LandlordIssue[];
}

export default function IssueTemplate({ issue, category, siblings }: Props) {
  const ready = new Set(availableStateSlugs());
  const depositRows = issue.stateSection?.kind === "us-map" ? getDepositStateTable() : [];
  const featuredDepositRows = FEATURED_STATE_SLUGS
    .map((slug) => depositRows.find((r) => r.slug === slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${issue.hero.h1.pre}${issue.hero.h1.em}${issue.hero.h1.post ?? ""}`,
        description: issue.meta.description,
        author: { "@type": "Organization", name: "CivilCase Editorial" },
        publisher: { "@type": "Organization", name: "CivilCase" },
        datePublished: "2026-04-29",
        dateModified: "2026-04-30",
      },
      {
        "@type": "HowTo",
        name: `${issue.hero.h1.pre}${issue.hero.h1.em}${issue.hero.h1.post ?? ""}`,
        step: issue.fileSteps.steps.map((s) => ({
          "@type": "HowToStep",
          name: s.title,
          text: s.body,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: issue.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="cat-page cv2-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CountUp />

      <aside className="cv2-floating-toc" aria-label="On this page">
        <span className="cv2-floating-toc-label">On this page</span>
        <ol>
          <li><a href="#what-counts">What counts</a></li>
          <li><a href="#claim">What you can claim for</a></li>
          <li><a href="#before">Before you sue</a></li>
          <li><a href="#how">How to file</a></li>
          <li><a href="#evidence">Evidence checklist</a></li>
          <li><a href="#defenses">{category.defensesTocLabel}</a></li>
          <li><a href="#outcomes">Realistic outcomes</a></li>
          {issue.stateSection ? <li><a href="#state">State rules</a></li> : null}
          <li><a href="#alternatives">Alternatives</a></li>
          <li><a href="#cta">Take the next step</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#related">Related claims</a></li>
        </ol>
      </aside>

      <div className="wrap">
        <Breadcrumbs
          items={[
            { href: "/small-claims", label: "Small Claims" },
            { href: category.hubHref, label: category.hubLabel },
            { label: issue.breadcrumbLabel },
          ]}
        />

        {/* HERO */}
        <header className="cv2-hero">
          <div className="cv2-hero-main">
            <span className="eyebrow">{category.hubLabel} · {issue.hero.eyebrowSuffix}</span>
            <h1>
              {issue.hero.h1.pre}<em>{issue.hero.h1.em}</em>{issue.hero.h1.post ?? ""}
            </h1>
            <p className="cat-lede">
              <strong>{issue.hero.leadStrong}</strong>{issue.hero.leadBody}
            </p>
            <div className="hero-ctas">
              <Link href="/demand-letter" className="btn btn-dark">Generate a demand letter</Link>
              <Link href="/case-score" className="btn btn-cream">Check my case strength</Link>
            </div>
          </div>
          <div className="cv2-hero-visual" aria-hidden="true">
            <div className="cv2-counter-card">
              <div className="cv2-counter-head">
                <span className="cv2-counter-tag">If you win</span>
                <span className="cv2-counter-state">{issue.counter.meta}</span>
              </div>
              <div className="cv2-counter-amount">
                <span className="cv2-counter-currency">$</span>
                <span className="cv2-counter-num" data-target={issue.counter.amount}>0</span>
              </div>
              <div className="cv2-counter-rows">
                {issue.counter.rows.map((row, i) => (
                  <div key={row.label} className="cv2-counter-row">
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                    <div className={`cv2-counter-bar${row.emphasis === "accent" ? " accent" : ""}`}>
                      <span style={{
                        animationDelay: `${0.2 + i * 0.7}s`,
                        ...(row.emphasis === "muted" ? { width: "0%" } : {}),
                      }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="cv2-counter-foot">
                <span className="cv2-counter-pulse" />
                {issue.counter.footer}
              </div>
            </div>
          </div>
        </header>

        {/* WHAT COUNTS */}
        <section id="what-counts" className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Definitions</span>
            <H2 parts={issue.whatCounts.h2} />
            <p>{issue.whatCounts.lede}</p>
          </div>
          <div className="cv2-defs">
            {issue.whatCounts.cards.map((c) => (
              <div key={c.num} className="cv2-def">
                <div className="cv2-def-num">{c.num}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
          {issue.whatCounts.note ? (
            <div className="cv2-clock-note">
              <div className="cv2-clock-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <strong>{issue.whatCounts.note.strongIntro}</strong>{issue.whatCounts.note.rest}
              </div>
            </div>
          ) : null}
        </section>

        {/* CLAIM */}
        <section id="claim" className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">What you can claim for</span>
              <H2 parts={issue.claim.h2} />
              <p>{issue.claim.lede}</p>
            </div>
            <div className="cv2-claim-stack">
              {issue.claim.layers.map((layer) => (
                <div key={layer.tag} className={`cv2-claim-row${layer.accent ? " accent" : ""}`}>
                  <div className={`cv2-claim-tag${layer.accent ? " accent" : ""}`}>{layer.tag}</div>
                  <div className="cv2-claim-body">
                    <h3>{layer.title}</h3>
                    <p>{layer.body}</p>
                  </div>
                  <div className={`cv2-claim-amt${layer.accent ? " accent" : ""}`}>{layer.amount}</div>
                </div>
              ))}
              <div className="cv2-claim-total">
                <div>
                  <span className="cv2-claim-total-label">{issue.claim.total.label}</span>
                  <p>{issue.claim.total.body}</p>
                </div>
                <div className="cv2-claim-total-num">
                  <em>{issue.claim.total.amount}</em>
                  <span>{issue.claim.total.sublabel}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEFORE YOU SUE */}
        <section id="before" className="cv2-bento-section">
          <div className="cv2-bento09">
            <div className="cv2-bento09-left">
              <div className="cv2-bento09-copy">
                <span className="eyebrow">Before you sue</span>
                <H2 parts={issue.demand.h2} />
                <p>{issue.demand.lede}</p>
                <ul className="cv2-before-list">
                  {issue.demand.checklist.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
            </div>
            <div className="cv2-bento09-right">
              <div className="cv2-letter">
                <div className="cv2-letter-stamp">
                  <span className="cv2-letter-stamp-label">Certified Mail</span>
                  <span className="cv2-letter-stamp-num">{issue.demand.letter.certifiedNum}</span>
                </div>
                <div className="cv2-letter-date">{issue.demand.letter.date}</div>
                <div className="cv2-letter-to">
                  <strong>{issue.demand.letter.recipientName}</strong>
                  <span>{issue.demand.letter.recipientAddress}</span>
                </div>
                <div className="cv2-letter-re">
                  <strong>Re:</strong> {issue.demand.letter.reLine}
                </div>
                <div className="cv2-letter-body">
                  {issue.demand.letter.bodyParagraphs.map((p, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                  <ol>
                    {issue.demand.letter.demandList.map((d, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: d }} />
                    ))}
                  </ol>
                  <p dangerouslySetInnerHTML={{ __html: issue.demand.letter.closingLine }} />
                </div>
                <div className="cv2-letter-sign">
                  <span className="cv2-letter-signature">{issue.demand.letter.signatory}</span>
                </div>
              </div>
              <div className="cv2-bento09-right-actions">
                <Link href="/demand-letter" className="btn btn-dark">Generate one in 90 seconds</Link>
              </div>
            </div>
          </div>
        </section>

        {/* HOW */}
        <section id="how" className="cat-section cv2-how-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Process</span>
            <H2 parts={issue.fileSteps.h2} />
            <p>{issue.fileSteps.lede}</p>
          </div>
          <div className="cv2-alt3-flow">
            <div className="cv2-alt3-line"><span className="cv2-alt3-traveler" /></div>
            <div className="cv2-alt3-steps">
              {issue.fileSteps.steps.map((s, i) => (
                <div key={s.title} className="cv2-alt3-step" style={{ animationDelay: `${i * 2.25}s` }}>
                  <div className="cv2-alt3-num">{i + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="cv2-aftermath">
            <div className="cv2-aftermath-tag">{issue.fileSteps.aftermath.tag}</div>
            <div className="cv2-aftermath-body">
              <h3>{issue.fileSteps.aftermath.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: issue.fileSteps.aftermath.bodyHtml }} />
            </div>
          </div>
        </section>

        {/* EVIDENCE */}
        <section id="evidence" className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">What you&rsquo;ll need</span>
            <H2 parts={issue.evidence.h2} />
            <p>{issue.evidence.lede}</p>
          </div>
          <div className="sv-bento cv2-evidence-bento cv2-evidence-flex">
            {issue.evidence.cells.slice(0, 4).map((cell, i) => (
              <div key={i} className={`sv-bento-cell evidence-slot-${i + 1}`}>
                <EvidenceCellView cell={cell} category={category} />
              </div>
            ))}
          </div>
        </section>

        {/* DEFENSES */}
        <section id="defenses" className="cat-section cv2-defenses-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Be ready</span>
            <H2 parts={issue.defenses.h2} />
            <p>{issue.defenses.lede}</p>
          </div>
          <div className="cv2-defenses">
            {issue.defenses.items.map((d) => (
              <div key={d.quote} className="cv2-defense">
                <div className="cv2-defense-head">
                  <span className="cv2-defense-quote">&ldquo;{d.quote}&rdquo;</span>
                  <span className="cv2-defense-pill">{d.pill}</span>
                </div>
                <div
                  className="cv2-defense-rebut"
                  dangerouslySetInnerHTML={{ __html: d.rebuttal }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* OUTCOMES */}
        <section id="outcomes" className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Realistic outcomes</span>
            <H2 parts={issue.outcomes.h2} />
            <p>{issue.outcomes.lede}</p>
          </div>
          <div className="cv2-outcomes">
            {issue.outcomes.bands.map((b) => (
              <div key={b.label} className="cv2-outcome">
                <div className={`cv2-outcome-band ${b.tier}`}>{b.label}</div>
                <div className="cv2-outcome-num">{b.range}</div>
                <p dangerouslySetInnerHTML={{ __html: b.body }} />
              </div>
            ))}
          </div>
        </section>

        {/* STATE */}
        {issue.stateSection ? (
          <section id="state" className="cat-section">
            <div className="cat-stack-head">
              <span className="eyebrow">State-specific rules</span>
              <H2 parts={issue.stateSection.h2} />
              <p>{issue.stateSection.lede}</p>
            </div>
            {issue.stateSection.kind === "us-map" ? (
              <>
                <FeaturedUsMap highlightedSlugs={FEATURED_STATE_SLUGS} />
                <div className="cv2-alt6-list" style={{ marginTop: 32 }}>
                  {featuredDepositRows.map((row) => (
                    <div key={row.slug} className="cv2-alt6-row">
                      <strong>
                        {ready.has(row.slug) ? (
                          <Link href={`/small-claims/${row.slug}`} className="cat-text-link">{row.state}</Link>
                        ) : row.state}
                      </strong>
                      <span className="cv2-alt6-deadline">{row.deadline}</span>
                      <span className="cv2-alt6-penalty">{row.penalty}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="cv2-alt6-list">
                {issue.stateSection.rows.map((r) => (
                  <div key={r.slug} className="cv2-alt6-row">
                    <strong>
                      {ready.has(r.slug) ? (
                        <Link href={`/small-claims/${r.slug}`} className="cat-text-link">{r.state}</Link>
                      ) : r.state}
                    </strong>
                    <span className="cv2-alt6-deadline">{r.col2}</span>
                    <span className="cv2-alt6-penalty">{r.col3}</span>
                  </div>
                ))}
              </div>
            )}
            <p style={{ marginTop: 18, fontSize: 14, color: "var(--muted)" }}>
              <Link href="/small-claims" className="cat-text-link">See all 50 state guides →</Link>
            </p>
          </section>
        ) : null}

        {/* ALTERNATIVES */}
        <section id="alternatives" className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Alternatives to suing</span>
            <H2 parts={issue.alternatives.h2} />
            <p>{issue.alternatives.lede}</p>
          </div>
          <div className="cv2-alts">
            {issue.alternatives.cards.map((a) => (
              <div key={a.title} className="cv2-alt">
                <div className="cv2-alt-head">
                  <h3>{a.title}</h3>
                  <span className={`cv2-alt-pill ${a.pillTier}`}>{a.pillLabel}</span>
                </div>
                <p><strong>When it fits:</strong> {a.whenItFits}</p>
                <p><strong>Tradeoff:</strong> {a.tradeoff}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="cat-section">
          <div className="cv2-cta">
            <div className="cv2-cta-copy">
              <span className="eyebrow" style={{ color: "rgba(254,249,241,0.65)" }}>Move forward</span>
              <H2 parts={issue.cta.h2} />
              <p>{issue.cta.body}</p>
              <div className="cv2-cta-actions">
                <Link href="/demand-letter" className="cv2-cta-primary">Generate a demand letter →</Link>
                <Link href="/case-score" className="cv2-cta-secondary">Check my case strength first</Link>
              </div>
            </div>
            <div className="cv2-cta-receipt">
              <div className="cv2-cta-receipt-head">
                <span>Estimated recovery</span>
                <em>{issue.cta.receipt.label}</em>
              </div>
              {issue.cta.receipt.items.map((it) => (
                <div key={it.label} className="cv2-cta-receipt-row">
                  <span>{it.label}</span>
                  <strong>{it.amount}</strong>
                </div>
              ))}
              <div className="cv2-cta-receipt-divider" />
              <div className="cv2-cta-receipt-total">
                <span>{issue.cta.receipt.totalLabel}</span>
                <strong>{issue.cta.receipt.total}</strong>
              </div>
              <p className="cv2-cta-receipt-note">{issue.cta.receipt.note}</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="cat-section">
          <div className="cat-split">
            <div className="cat-split-intro">
              <span className="eyebrow">FAQ</span>
              <h2>Frequently <em>asked</em>.</h2>
              <p>
                The questions {category.audienceLabel} actually ask before filing.{" "}
                <Link href="/contact" className="cat-text-link">Email support</Link>{" "}
                if yours isn&rsquo;t here.
              </p>
            </div>
            <div className="cat-faq">
              {issue.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div><p>{f.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        <section id="related" className="cat-section">
          <div className="cat-stack-head">
            <span className="eyebrow">Related claims</span>
            <h2>Other ways to <em>{category.relatedH2Em}</em>.</h2>
            <p>If your dispute is not about {issue.short.toLowerCase()}, one of these guides probably fits.</p>
          </div>
          <div className="cv2-related">
            {siblings.map((sib) => (
              <Link key={sib.slug} href={`/small-claims/${category.urlPrefix}${sib.slug}`} className="cv2-related-card">
                <span className="cv2-related-label">{sib.short}</span>
                <strong>
                  {sib.hero.h1.pre}{sib.hero.h1.em}{sib.hero.h1.post ?? ""}
                </strong>
                <span className="cv2-related-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function H2({ parts }: { parts: { pre: string; em: string; post?: string } }) {
  return (
    <h2>
      {parts.pre}<em>{parts.em}</em>{parts.post ?? ""}
    </h2>
  );
}

function EvidenceCellView({ cell, category }: { cell: EvidenceCell; category: CategoryMeta }) {
  switch (cell.kind) {
    case "photos":
      return (
        <>
          <div className="sv-bento-tag">{cell.tag ?? "Photos"}</div>
          <div className="sv-bento-grid">
            {cell.photos.map((p) => (
              <div
                key={p.id}
                className="sv-bento-thumb"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-${p.id}?w=400&h=400&fit=crop)` }}
                title={p.cap}
              />
            ))}
          </div>
        </>
      );
    case "texts":
      return (
        <>
          <div className="sv-bento-tag">{cell.tag ?? "Texts"}</div>
          {cell.texts.map((t, i) => (
            <div key={i} className={`sv-bento-bubble ${t.dir}`}>{t.text}</div>
          ))}
        </>
      );
    case "document":
      return (
        <>
          <div className="sv-bento-tag">{cell.tag ?? "Document"}</div>
          <div className="sv-bento-doc">
            <div className="sv-bento-doc-line" />
            <div className="sv-bento-doc-line short" />
            <div className="sv-bento-doc-line" />
            <div className="sv-bento-doc-line short" />
            <div className="sv-bento-doc-sig">/s/ {category.signatoryLabel} signature</div>
          </div>
        </>
      );
    case "receipt":
      return (
        <>
          <div className="sv-bento-tag">{cell.tag ?? "Receipt"}</div>
          <div className="cv2-receipt">
            <div className="cv2-receipt-top">
              <strong>{cell.vendor}</strong>
              <span>{cell.vendorAddr}</span>
            </div>
            <div className="cv2-receipt-meta">
              <span>{cell.receiptNum}</span>
              <span>{cell.date}</span>
            </div>
            <div className="cv2-receipt-rule" />
            {cell.lineItems.map((li) => (
              <div key={li.label} className="cv2-receipt-row">
                <span>{li.label}</span>
                <span>{li.amount}</span>
              </div>
            ))}
            <div className="cv2-receipt-rule dashed" />
            <div className="cv2-receipt-row">
              <span>Subtotal</span>
              <span>{cell.subtotal}</span>
            </div>
            <div className="cv2-receipt-rule" />
            <div className="cv2-receipt-row total">
              <span>TOTAL</span>
              <span>{cell.total}</span>
            </div>
            <div className="cv2-receipt-stamp">{cell.stamp ?? "PAID"}</div>
            <div className="cv2-receipt-footer">{cell.footer}</div>
          </div>
        </>
      );
    case "paystub":
      return (
        <>
          <div className="sv-bento-tag">{cell.tag ?? "Paystub"}</div>
          <div className="cv2-paystub">
            <div className="cv2-paystub-head">
              <strong>{cell.employer}</strong>
              <span>{cell.employerAddr}</span>
            </div>
            <div className="cv2-paystub-meta">
              <span>{cell.payPeriod}</span>
              <span>{cell.payDate}</span>
            </div>
            <div className="cv2-paystub-rule" />
            <div className="cv2-paystub-section-label">Earnings</div>
            {cell.earnings.map((e) => (
              <div key={e.label} className="cv2-paystub-row">
                <span>{e.label}</span>
                <span>{e.amount}</span>
              </div>
            ))}
            <div className="cv2-paystub-row total">
              <span>Gross</span>
              <span>{cell.gross}</span>
            </div>
            {cell.deductions && cell.deductions.length > 0 ? (
              <>
                <div className="cv2-paystub-rule dashed" />
                <div className="cv2-paystub-section-label">Deductions</div>
                {cell.deductions.map((d) => (
                  <div key={d.label} className="cv2-paystub-row muted">
                    <span>{d.label}</span>
                    <span>{d.amount}</span>
                  </div>
                ))}
              </>
            ) : null}
            <div className="cv2-paystub-rule" />
            <div className="cv2-paystub-row net">
              <span>Net pay</span>
              <span>{cell.net}</span>
            </div>
            {cell.footer ? <div className="cv2-paystub-footer">{cell.footer}</div> : null}
          </div>
        </>
      );
    case "letter":
      return (
        <>
          <div className="sv-bento-tag">{cell.tag ?? "Letter"}</div>
          <div className="cv2-evidence-letter">
            <div className="cv2-evidence-letter-head">{cell.letterhead}</div>
            <div className="cv2-evidence-letter-date">{cell.date}</div>
            <div className="cv2-evidence-letter-to">
              <strong>{cell.recipientName}</strong>
              {cell.recipientAddress ? <span>{cell.recipientAddress}</span> : null}
            </div>
            {cell.reLine ? (
              <div className="cv2-evidence-letter-re">
                <strong>Re:</strong> {cell.reLine}
              </div>
            ) : null}
            <div className="cv2-evidence-letter-body">
              {cell.bodyParagraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
            <div className="cv2-evidence-letter-sign">
              <span className="cv2-evidence-letter-signature">{cell.signatory}</span>
              {cell.signatoryTitle ? (
                <span className="cv2-evidence-letter-title">{cell.signatoryTitle}</span>
              ) : null}
            </div>
          </div>
        </>
      );
    case "timeLog":
      return (
        <>
          <div className="sv-bento-tag">{cell.tag ?? "Time log"}</div>
          <div className="cv2-timelog">
            <div className="cv2-timelog-head">Week of {cell.weekOf}</div>
            <div className="cv2-timelog-rowhead">
              <span>Date</span>
              <span>In</span>
              <span>Out</span>
              <span>Hours</span>
            </div>
            {cell.rows.map((r) => (
              <div key={r.date} className="cv2-timelog-row">
                <span>{r.date}</span>
                <span>{r.in}</span>
                <span>{r.out}</span>
                <span>{r.hours}</span>
              </div>
            ))}
            <div className="cv2-timelog-rule" />
            <div className="cv2-timelog-row total">
              <span>{cell.totalLabel}</span>
              <span></span>
              <span></span>
              <span>{cell.totalHours}</span>
            </div>
            {cell.footer ? <div className="cv2-timelog-footer">{cell.footer}</div> : null}
          </div>
        </>
      );
    case "handbook":
      return (
        <>
          <div className="sv-bento-tag">{cell.tag ?? "Handbook"}</div>
          <div className="cv2-handbook">
            <div className="cv2-handbook-head">{cell.documentTitle}</div>
            <h4 className="cv2-handbook-section">{cell.sectionTitle}</h4>
            <div className="cv2-handbook-body">
              {cell.bodyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {cell.highlight ? (
                <p className="cv2-handbook-highlight">{cell.highlight}</p>
              ) : null}
            </div>
            {cell.footer ? <div className="cv2-handbook-footer">{cell.footer}</div> : null}
          </div>
        </>
      );
  }
}
