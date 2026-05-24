"use client";

import { useEffect } from "react";

/**
 * After mount, copies the text of each <th> in `.admin-table` onto the
 * matching `<td>` as a `data-label` attribute. Combined with a CSS
 * `::before { content: attr(data-label) }` rule, this gives admin tables
 * inline field labels on mobile — without having to edit every page's
 * JSX to add data-labels manually.
 *
 * Re-runs on route changes via a MutationObserver on document.body, so
 * tables that mount later (lazy-loaded panels, etc.) are also tagged.
 */
export default function ResponsiveTableLabels() {
  useEffect(() => {
    const stamp = () => {
      const tables = document.querySelectorAll<HTMLTableElement>(".admin-table");
      tables.forEach((table) => {
        const headers = Array.from(
          table.querySelectorAll<HTMLTableCellElement>("thead th"),
        ).map((th) => th.textContent?.trim() ?? "");
        if (headers.length === 0) return;
        table.querySelectorAll<HTMLTableRowElement>("tbody tr").forEach((tr) => {
          Array.from(tr.children).forEach((cell, i) => {
            if (!(cell instanceof HTMLTableCellElement)) return;
            const label = headers[i];
            if (label && !cell.hasAttribute("data-label")) {
              cell.setAttribute("data-label", label);
            }
          });
        });
      });
    };

    stamp();

    // Watch for new tables / rows that appear after initial render
    // (e.g. async-loaded panels). Debounced via requestAnimationFrame.
    let raf = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(stamp);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
