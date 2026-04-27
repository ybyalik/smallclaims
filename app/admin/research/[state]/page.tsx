import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { listResearch, loadResearch } from "../../../../lib/research";

export const dynamic = "force-static";

export function generateStaticParams() {
  return listResearch().map((r) => ({ state: r.slug }));
}

export const dynamicParams = false;

export default function ResearchView({ params }: { params: { state: string } }) {
  const data = loadResearch(params.state);
  if (!data) notFound();

  return (
    <div className="admin-page admin-research-view">
      <header className="admin-page-head">
        <div>
          <Link href="/admin/research" className="admin-back">← All research</Link>
          <h1>{data.state} research</h1>
        </div>
      </header>
      <article className="admin-research-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.markdown}</ReactMarkdown>
      </article>
    </div>
  );
}
