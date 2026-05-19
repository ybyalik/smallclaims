// Right-side hero visual: a CivilCase-styled dashboard preview that
// dramatizes where the user lands after they buy. Five-step case
// timeline on the left, letter preview on the right, status footer at
// the bottom. Dark-themed for editorial weight; all colors are scoped
// here so this doesn't change the global palette.

import { ShieldCheck, MessageSquare, Mail, Send, Clock, Scale } from "lucide-react";

interface TimelineStep {
  title: string;
  body: string;
  badge: string;
  badgeKind: "ignored" | "active" | "pending" | "next";
  icon: React.ReactNode;
}

const STEPS: TimelineStep[] = [
  {
    title: "Attempts Made",
    body: "Messages, calls, and follow-ups",
    badge: "Ignored",
    badgeKind: "ignored",
    icon: <MessageSquare size={14} strokeWidth={2} />,
  },
  {
    title: "Formal Demand Letter",
    body: "Professionally written and prepared",
    badge: "Ready to Send",
    badgeKind: "active",
    icon: <Mail size={14} strokeWidth={2} />,
  },
  {
    title: "Certified Delivery",
    body: "Sent via USPS with tracking",
    badge: "Pending",
    badgeKind: "pending",
    icon: <Send size={14} strokeWidth={2} />,
  },
  {
    title: "Response Deadline",
    body: "14 days to respond or resolve",
    badge: "Pending",
    badgeKind: "pending",
    icon: <Clock size={14} strokeWidth={2} />,
  },
  {
    title: "Court Escalation",
    body: "We guide you if they continue to ignore",
    badge: "Next Step",
    badgeKind: "next",
    icon: <Scale size={14} strokeWidth={2} />,
  },
];

export default function HeroDashboard() {
  return (
    <div className="dl-dash" aria-hidden>
      {/* Header */}
      <div className="dl-dash-header">
        <div>
          <span className="dl-dash-eyebrow">Case status</span>
          <div className="dl-dash-headline">Unresolved</div>
          <div className="dl-dash-sub">You&rsquo;re taking the next step.</div>
        </div>
        <div className="dl-dash-control">
          <span className="dl-dash-control-icon">
            <ShieldCheck size={16} strokeWidth={1.8} />
          </span>
          <div>
            <strong>You&rsquo;re in control</strong>
            <span>We handle the pressure.</span>
          </div>
        </div>
      </div>

      {/* Body — two columns: timeline + letter preview */}
      <div className="dl-dash-body">
        <ol className="dl-dash-timeline">
          {STEPS.map((s, i) => (
            <li key={s.title} className={`dl-dash-step dl-dash-step-${s.badgeKind}`}>
              <span className="dl-dash-step-dot" aria-hidden>
                {s.icon}
              </span>
              <div className="dl-dash-step-body">
                <strong>{s.title}</strong>
                <span className="dl-dash-step-desc">{s.body}</span>
                <span className={`dl-dash-step-badge dl-dash-badge-${s.badgeKind}`}>
                  {s.badge}
                </span>
              </div>
              {i < STEPS.length - 1 ? <span className="dl-dash-step-line" aria-hidden /> : null}
            </li>
          ))}
        </ol>

        <div className="dl-dash-letter">
          <div className="dl-dash-letter-head">
            <span>Letter Preview</span>
            <span className="dl-dash-letter-state">State: California</span>
          </div>
          <div className="dl-dash-letter-paper">
            <div className="dl-dash-letter-seal" aria-hidden>
              <span>CivilCase</span>
              <span>Demand Letter</span>
            </div>
            <p className="dl-dash-letter-to">
              <strong>TO:</strong>
              <br />
              ABC Construction LLC
              <br />
              123 Business Way
              <br />
              Los Angeles, CA 90001
            </p>
            <p className="dl-dash-letter-re">
              <strong>RE:</strong>
              <br />
              Formal Demand for Payment
            </p>
            <p>
              This letter serves as formal notice that payment in the amount of <strong>$4,800</strong> is
              due for services provided under our agreement dated March 3, 2024.
            </p>
            <p>
              <strong>Payment must be received within 14 days of delivery of this letter.</strong>
            </p>
            <p>
              If this matter is not resolved, I intend to pursue all available legal remedies,
              including filing a claim in small claims court.
            </p>
          </div>
        </div>
      </div>

      {/* Footer info chips */}
      <div className="dl-dash-footer">
        <div className="dl-dash-info">
          <Mail size={14} strokeWidth={1.8} />
          <div>
            <span>Delivery method</span>
            <strong>USPS Certified Mail</strong>
          </div>
        </div>
        <div className="dl-dash-info">
          <Clock size={14} strokeWidth={1.8} />
          <div>
            <span>Response deadline</span>
            <strong>14 days</strong>
          </div>
        </div>
        <div className="dl-dash-info">
          <Send size={14} strokeWidth={1.8} />
          <div>
            <span>Est. delivery</span>
            <strong>2-4 business days</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
