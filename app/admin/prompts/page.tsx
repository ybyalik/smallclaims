import Link from "next/link";

export const metadata = { title: "AI Prompts · Admin" };

const PROMPTS = [
  {
    key: "demand-letter",
    name: "Demand Letter",
    description:
      "System prompt + user template used by `generateDemandLetter`. Supports placeholders for case data and state law context.",
  },
];

export default function AdminPromptsIndex() {
  return (
    <div>
      <h1>AI Prompts</h1>
      <p className="admin-page-sub">
        Edit the prompt templates that drive AI-generated content. Changes
        take effect on the next generation, no deploy needed. Each save
        creates a new version; previous versions are kept for audit.
      </p>

      <div className="admin-card-list">
        {PROMPTS.map((p) => (
          <Link key={p.key} href={`/admin/prompts/${p.key}`} className="admin-card">
            <h2>{p.name}</h2>
            <p>{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
