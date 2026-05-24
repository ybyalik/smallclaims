// Imports the legacy blog CSS so the blog post body renders with its full
// styling (typography, prose, embeds) inside the firm route group.
import "../../(site)/blog/blog.css";

export default function Blog2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
