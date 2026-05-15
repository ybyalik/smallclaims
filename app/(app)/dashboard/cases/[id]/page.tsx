import { redirect } from "next/navigation";

// Legacy URL. The canonical case detail lives at /case/[id]. This route
// stays as a permanent redirect so old bookmarks and internal links keep
// working while we migrate everything to the new URL structure.
export default function LegacyCaseDetailRedirect({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/case/${params.id}`);
}
