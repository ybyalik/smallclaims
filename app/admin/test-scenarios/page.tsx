import { TEST_SCENARIOS } from "../../../lib/demand-letter/test-scenarios";
import ScenarioRunner from "./ScenarioRunner";

export const dynamic = "force-dynamic";

export default function TestScenariosPage() {
  return (
    <div style={{ padding: "32px 40px" }}>
      <h1 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 32, margin: 0 }}>
        Test scenarios
      </h1>
      <p style={{ color: "var(--muted)", marginTop: 8, marginBottom: 28, maxWidth: "60ch" }}>
        Pre-baked or random fake cases. Spawn one and the system creates a new
        case with all the wizard fields populated and the case status set to
        paid. Research is NOT auto-enqueued; open the case and click &ldquo;Run
        research&rdquo; to start the pipeline.
      </p>
      <ScenarioRunner
        scenarios={TEST_SCENARIOS.map((s) => ({
          slug: s.slug,
          label: s.label,
          description: s.description,
          state: s.state,
          county: s.county,
          dispute_type: s.dispute_type,
          amount_dollars: s.amount_cents / 100,
        }))}
      />
    </div>
  );
}
