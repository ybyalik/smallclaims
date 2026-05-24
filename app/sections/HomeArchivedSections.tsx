// Sections originally on the home page; preserved here so we can drop them
// back into a real page later without re-deriving the markup.

import UseCases from "../../components/UseCases";
import ProcessFlow from "./ProcessFlow";

export function ArchivedDashboardSection() {
  return (
    <section>
      <div className="wrap-wide">
        <div className="sec-head" style={{ marginBottom: 36 }}>
          <span className="eyebrow">Inside the product</span>
          <h2>
            Every case, on <em>one page.</em>
          </h2>
          <p>
            Track strength, status, and next steps without rifling through a single
            email thread.
          </p>
        </div>
        <div className="dash-shell">
          <div className="dash-card">
            <div className="row">
              <span>Case #CC-2841</span>
              <span className="pill-act">Action recommended</span>
            </div>
            <div>
              <div className="score">
                <em>78</em>
                <sup>/100</sup>
              </div>
              <div className="score-label">Case strength</div>
              <div className="dash-bar"></div>
              <div className="dash-meta">
                <div>
                  <div className="lab">Claim</div>
                  <div className="val">Security deposit</div>
                </div>
                <div>
                  <div className="lab">Amount</div>
                  <div className="val">$2,450.00</div>
                </div>
                <div>
                  <div className="lab">Jurisdiction</div>
                  <div className="val">Travis County, TX</div>
                </div>
                <div>
                  <div className="lab">Filing fee</div>
                  <div className="val">$54.00</div>
                </div>
              </div>
            </div>
            <div className="dash-cta">
              <span>Send demand letter</span>
              <span>→</span>
            </div>
          </div>
          <div className="dash-plan">
            <div className="dash-plan-head">
              <h3>Your case plan</h3>
              <div className="meta">Step 2 of 4 · ~14 days</div>
            </div>
            <div className="step done">
              <div className="ico">✓</div>
              <div className="body">
                <div className="t">Case Review</div>
                <div className="s">Strength, damages, and jurisdiction confirmed</div>
              </div>
              <div className="stat">Complete</div>
            </div>
            <div className="step active">
              <div className="ico">2</div>
              <div className="body">
                <div className="t">Demand Letter</div>
                <div className="s">Draft ready, review and send certified mail</div>
              </div>
              <div className="stat">In progress</div>
            </div>
            <div className="step">
              <div className="ico">3</div>
              <div className="body">
                <div className="t">File Your Claim</div>
                <div className="s">Travis County small claims, fee $54</div>
              </div>
              <div className="stat">Up next</div>
            </div>
            <div className="step locked">
              <div className="ico">4</div>
              <div className="body">
                <div className="t">Win &amp; Collect</div>
                <div className="s">Judgment enforcement, wage garnishment</div>
              </div>
              <div className="stat">Locked</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArchivedUseCasesSection() {
  return <UseCases />;
}

export function ArchivedProcessSection() {
  return (
    <section id="how">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow" style={{ color: "#3D7A4A" }}>
            {"{ 02 } PROCESS"}
          </span>
          <h2 style={{ marginTop: 14 }}>
            From &ldquo;I&rsquo;m owed&rdquo; to <em>paid in full</em>.
          </h2>
        </div>
        <div className="pw-labels">
          <span>
            <span style={{ color: "#3D7A4A" }}>&bull;</span> Set the foundation
          </span>
          <span>Resolve without court &bull;</span>
        </div>
        <div className="pw-line">
          <span className="dot" style={{ left: 0 }}></span>
          <span className="dot travel"></span>
          <span className="dot" style={{ left: "100%", transform: "translateX(-100%)" }}></span>
        </div>
        <ProcessFlow />
      </div>
    </section>
  );
}

export function ArchivedWhySection() {
  return (
    <section
      id="why"
      style={{ background: "#F5EFE3", borderRadius: 24, marginInline: "max(24px, calc((100vw - 1440px) / 2 + 24px))" }}
    >
      <div className="wrap">
        <div className="dh-grid">
          <div className="dh-copy">
            <div className="eyebrow">Why CivilCase</div>
            <h2 style={{ marginTop: 14 }}>
              What you need, <em>before</em> you know you need it.
            </h2>
            <p>
              CivilCase evolves with your case &mdash; pulling deadlines forward, surfacing
              the next move, and keeping you a step ahead of the other side.
            </p>
            <div className="dh-feats">
              <div className="dh-feat">
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
                </svg>
                <h4>Smart Analytics</h4>
                <p>Learns your case patterns and pushes the right next step in real time. No retraining, no friction.</p>
              </div>
              <div className="dh-feat">
                <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <h4>Court-Specific Insight</h4>
                <p>No more digging through statutes. CivilCase surfaces the rule you need, the moment you need it.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="dh-photo" style={{ aspectRatio: 0.72 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=900&fit=crop"
                alt="Couple reviewing dispute"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArchivedReceiptsSection() {
  return (
    <section style={{ paddingTop: 30 }}>
      <div className="wrap">
        <div className="receipts-head">
          <h2>
            The <em>receipts.</em>
          </h2>
          <p>
            Every case below is real. Names changed where requested. Amounts are net
            of fees, recovered through CivilCase between Jan and Mar.
          </p>
        </div>

        <div className="receipts-grid-row">
          <div className="receipt r-1" style={{ transform: "rotate(-1.6deg)" }}>
            <div className="top">
              <span className="case-id">CC-1042</span>
              <span className="tag">Deposit</span>
            </div>
            <div className="amount">
              $2,800<span className="lbl">Recovered in 12 days</span>
            </div>
            <div className="quote">
              &ldquo;Landlord ghosted me for six weeks. CivilCase had a demand letter on his
              desk in 48 hours.&rdquo;
            </div>
            <div className="who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face"
                alt=""
              />
              <div>
                <div className="name">Maya Reyes</div>
                <div className="meta">Brooklyn, NY</div>
              </div>
            </div>
            <div className="footer">
              <span>Filed 2/14</span>
              <strong>Settled 2/26</strong>
            </div>
          </div>

          <div className="receipt r-2 r-mark" style={{ transform: "rotate(0.8deg)" }}>
            <div className="top">
              <span className="case-id" style={{ color: "#A8A095" }}>
                CC-0987
              </span>
              <span className="tag">Contractor</span>
            </div>
            <div className="amount">
              $4,200
              <span className="lbl" style={{ color: "#A8A095" }}>
                Recovered in 11 days
              </span>
            </div>
            <div className="quote">
              &ldquo;I&rsquo;d already paid two lawyers $1,800 to get nowhere. CivilCase
              finished it for $54 and a stamp.&rdquo;
            </div>
            <div className="who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=face"
                alt=""
              />
              <div>
                <div className="name">Daniel Park</div>
                <div className="meta" style={{ color: "#A8A095" }}>
                  Austin, TX
                </div>
              </div>
            </div>
            <div className="footer" style={{ color: "#A8A095" }}>
              <span>Filed 1/22</span>
              <strong>Settled 2/02</strong>
            </div>
          </div>

          <div className="receipt r-3 r-photo" style={{ transform: "rotate(-0.6deg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=900&fit=crop"
              alt=""
            />
            <div className="overlay">
              <div className="a">$1,150</div>
              <div className="q">
                Wedding photographer no-show. Refunded in full + filing fee.
              </div>
            </div>
          </div>
        </div>

        <div className="receipts-grid-row">
          <div className="receipt r-4 r-photo" style={{ transform: "rotate(1.2deg)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=900&fit=crop"
              alt=""
            />
            <div className="overlay">
              <div className="a">$3,400</div>
              <div className="q">Auto repair overcharge. Settled before court date.</div>
            </div>
          </div>

          <div className="receipt r-5" style={{ transform: "rotate(-0.4deg)" }}>
            <div className="top">
              <span className="case-id">CC-1188</span>
              <span className="tag">Service refund</span>
            </div>
            <div className="amount">
              $890<span className="lbl">Recovered in 6 days</span>
            </div>
            <div className="quote">
              &ldquo;It felt fair. Not &lsquo;we&rsquo;ll see you in court&rsquo; — fair. Like
              the system actually heard me.&rdquo;
            </div>
            <div className="who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=face"
                alt=""
              />
              <div>
                <div className="name">Lena Okafor</div>
                <div className="meta">Chicago, IL</div>
              </div>
            </div>
            <div className="footer">
              <span>Filed 3/02</span>
              <strong>Settled 3/08</strong>
            </div>
          </div>

          <div className="receipt r-6" style={{ transform: "rotate(0.6deg)" }}>
            <div className="top">
              <span className="case-id">CC-1311</span>
              <span className="tag">Wage dispute</span>
            </div>
            <div className="amount">
              $6,750<span className="lbl">Final paycheck + penalty</span>
            </div>
            <div className="quote">
              &ldquo;My ex-employer thought ignoring me would be cheaper than paying me.
              Turns out: not.&rdquo;
            </div>
            <div className="who">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&crop=face"
                alt=""
              />
              <div>
                <div className="name">Marcus Webb</div>
                <div className="meta">Phoenix, AZ</div>
              </div>
            </div>
            <div className="footer">
              <span>Filed 1/04</span>
              <strong>Settled 1/29</strong>
            </div>
          </div>
        </div>

        <div className="receipts-foot">
          <div>
            Cases shown are a small sample.{" "}
            <strong>$18.4M recovered to date.</strong>
          </div>
          <div>Verified by court filings · Updated weekly</div>
        </div>
      </div>
    </section>
  );
}
