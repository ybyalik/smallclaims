import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { listResearch, loadResearch } from "../../../../lib/research";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return listResearch().map((r) => ({ state: r.slug }));
}

export default async function ResearchView({ params }: { params: { state: string } }) {
  const data = await loadResearch(params.state);
  if (!data) notFound();

  return (
    <div className="admin-page admin-research-view">
      <header className="admin-page-head">
        <div>
          <Link href="/admin/research" className="admin-back">← All research</Link>
          <h1>
            {data.state} research
            {data.source === "override" ? (
              <span className="admin-pill admin-pill-good" style={{ marginLeft: 12, fontSize: 11, verticalAlign: "middle" }}>
                edited
              </span>
            ) : null}
          </h1>
        </div>
        <div>
          <Link
            href={`/admin/research/${params.state}/edit`}
            className="btn btn-dark btn-sm"
          >
            Edit
          </Link>
        </div>
      </header>
      <article className="admin-research-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.markdown}</ReactMarkdown>
      </article>
    </div>
  );
}
