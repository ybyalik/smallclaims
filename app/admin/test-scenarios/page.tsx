import ScenarioRunner from "./ScenarioRunner";

export const dynamic = "force-dynamic";

export default function TestScenariosPage() {
  return (
    <div style={{ padding: "32px 40px" }}>
      <h1 style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 32, margin: 0 }}>
        Test scenarios
      </h1>
      <p style={{ color: "var(--muted)", marginTop: 8, marginBottom: 28, maxWidth: "62ch" }}>
        Spawn a randomly-generated fake case in either pre-purchase (draft) or
        post-purchase (paid) mode. Each spawn picks a random state, dispute type
        from the canonical 11, and parties. Research is NOT auto-enqueued; open
        the admin view of a paid case and click &ldquo;Run research&rdquo; to
        start the pipeline.
      </p>
      <ScenarioRunner />
    </div>
  );
}
