import { notFound } from "next/navigation";
import { loadResearch } from "../../../../../lib/research";
import ResearchEditor from "./ResearchEditor";

export const dynamic = "force-dynamic";

export default async function ResearchEditPage({ params }: { params: { state: string } }) {
  const data = await loadResearch(params.state);
  if (!data) notFound();
  return (
    <ResearchEditor
      slug={params.state}
      stateName={data.state}
      initialMarkdown={data.markdown}
      isOverride={data.source === "override"}
    />
  );
}
