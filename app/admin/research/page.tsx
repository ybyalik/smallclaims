import Link from "next/link";
import { listResearch } from "../../../lib/research";

export const dynamic = "force-static";

const formatBytes = (n: number) => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
};

export default function ResearchList() {
  const reports = listResearch();
  return (
    <div className="admin-page">
      <header className="admin-page-head">
        <div>
          <h1>State research</h1>
          <p>OpenAI Deep Research outputs. Used to extract the public state guides.</p>
        </div>
      </header>
      {reports.length === 0 ? (
        <div className="admin-empty">
          <p>No research files found in /reports.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Words</th>
              <th>Size</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.slug}>
                <td>
                  <Link href={`/admin/research/${r.slug}`} className="admin-link">
                    {r.state}
                  </Link>
                </td>
                <td>{r.wordCount.toLocaleString()}</td>
                <td>{formatBytes(r.sizeBytes)}</td>
                <td>
                  <time>{new Date(r.updatedAt).toLocaleString()}</time>
                </td>
                <td className="admin-actions">
                  <Link href={`/admin/research/${r.slug}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
