import { notFound } from "next/navigation";
import { createClient } from "../../../../lib/supabase/server";
import PostEditor from "../../../../components/admin/PostEditor";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .single();
  if (error || !data) notFound();
  return <PostEditor initial={data} />;
}
