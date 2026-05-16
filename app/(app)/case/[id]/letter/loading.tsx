// Shown by Next.js while the /letter server component is computing —
// most often while ensureDemandLetterForCase is waiting on the LLM
// (5-15s on a first visit). Replaces the blank-page feeling with a
// clear "your letter is being drafted" status.

import PageHead from "../../../../../components/layout/PageHead";
import EmptyState from "../../../../../components/ui/EmptyState";

export default function LetterLoading() {
  return (
    <div>
      <PageHead title="Demand Letter" />
      <EmptyState title="Drafting your demand letter">
        <p>
          We&rsquo;re putting your letter together right now. This usually
          takes about 10 to 20 seconds. Hang tight, the page will refresh on
          its own when it&rsquo;s ready.
        </p>
        <div className="letter-loading-spinner" aria-hidden="true" />
      </EmptyState>
    </div>
  );
}
