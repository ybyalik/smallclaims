// Shared viewer for a finished product (demand letter, collection plan).
// Embeds the product's PDF in an iframe and offers a Download button.
// One template for every product — switching from inconsistent text/textarea
// renderings to a single canonical "this is the document" view.

"use client";

interface Props {
  // PDF endpoint without query string. Component adds ?disposition=inline
  // for the iframe and uses the bare URL for the download link.
  pdfUrl: string;
  // Tab/window title for the iframe (accessibility).
  title: string;
  // Optional download filename hint (browser uses Content-Disposition by default).
  downloadName?: string;
}

export default function ProductDocumentView({ pdfUrl, title, downloadName }: Props) {
  const sep = pdfUrl.includes("?") ? "&" : "?";
  // PDF Open Parameters: hide the thumbnail/outline side panel (navpanes=0).
  // Keep the top toolbar so users still get zoom and page controls.
  const inlineUrl = `${pdfUrl}${sep}disposition=inline#navpanes=0&view=FitH`;

  return (
    <div className="product-doc-view">
      <div className="product-doc-actions">
        <a
          href={pdfUrl}
          className="btn btn-cream btn-sm"
          download={downloadName}
        >
          Download PDF
        </a>
      </div>
      <iframe
        src={inlineUrl}
        title={title}
        className="product-doc-frame"
      />
    </div>
  );
}
