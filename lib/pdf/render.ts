// Render HTML to PDF using a headless Chromium running on Vercel's Node
// runtime. The chromium binary comes from @sparticuz/chromium which is built
// for AWS Lambda / Vercel-compatible serverless containers.
//
// In local dev (Mac), @sparticuz/chromium can't launch its bundled binary —
// we fall back to looking for system Chrome at the standard macOS path.

import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer-core";

const LOCAL_CHROME_PATHS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];

export async function renderHtmlToPdf(html: string, opts?: { title?: string }): Promise<Buffer> {
  const browser = await launchBrowser();
  try {
    const page = await browser.newPage();
    const wrapped = wrapDocument(html, opts?.title ?? "Report");
    await page.setContent(wrapped, { waitUntil: "networkidle0", timeout: 30_000 });
    const pdf = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: { top: "0.6in", bottom: "0.6in", left: "0.6in", right: "0.6in" },
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: footerTemplate(opts?.title ?? ""),
    });
    return Buffer.from(pdf);
  } finally {
    await browser.close().catch(() => {});
  }
}

async function launchBrowser(): Promise<Browser> {
  // On Vercel: use the bundled Chromium binary from @sparticuz/chromium.
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = chromium as any;
    return puppeteer.launch({
      args: c.args,
      defaultViewport: c.defaultViewport,
      executablePath: await c.executablePath(),
      headless: c.headless,
    }) as unknown as Browser;
  }
  // Local: find a system Chrome.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("node:fs");
  const local = LOCAL_CHROME_PATHS.find((p) => fs.existsSync(p));
  if (!local) {
    throw new Error(
      "No local Chrome/Chromium found. Install Google Chrome or run on Vercel.",
    );
  }
  return puppeteer.launch({
    executablePath: local,
    headless: true,
  }) as unknown as Browser;
}

// Read the brand logo once at module load and embed it as a data URI.
// Puppeteer's setContent doesn't carry a base URL so relative <img> srcs
// won't resolve; data URIs sidestep that.
function readLogoDataUri(): string {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const fs = require("node:fs");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const path = require("node:path");
  try {
    const p = path.join(process.cwd(), "public", "civilcase-logo.webp");
    const buf = fs.readFileSync(p);
    return `data:image/webp;base64,${buf.toString("base64")}`;
  } catch {
    return "";
  }
}

function wrapDocument(bodyHtml: string, title: string): string {
  const logo = readLogoDataUri();
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet" />
    <style>
      @page { size: Letter; margin: 0.7in 0.6in 0.7in 0.6in; }
      :root {
        --ink: #1A1714;
        --ink-2: #4A4135;
        --muted: #8B8470;
        --accent: #D9402E;
        --accent-2: #C63824;
        --cream: #FEF9F1;
        --cream-2: #F5EFE3;
        --hairline: #E0D9C8;
        --serif: "Newsreader", Georgia, serif;
        --sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }
      * { box-sizing: border-box; }
      html, body { background: #fff; color: var(--ink); }
      body {
        font-family: var(--sans);
        font-size: 11pt;
        line-height: 1.6;
        margin: 0;
        padding: 0;
      }
      a { color: var(--accent); text-decoration: underline; word-break: break-word; }
      em { font-style: italic; color: var(--accent-2); }
      strong { font-weight: 700; color: var(--ink); }

      /* Cover header — printed once at the top of the document */
      .pdf-cover {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18pt;
        padding-bottom: 14pt;
        margin-bottom: 18pt;
        border-bottom: 2pt solid var(--ink);
      }
      .pdf-cover-brand {
        display: flex;
        align-items: center;
        gap: 12pt;
      }
      .pdf-cover-logo {
        height: 36pt;
        width: auto;
      }
      .pdf-cover-title {
        text-align: right;
      }
      .pdf-cover-eyebrow {
        font-family: var(--sans);
        font-size: 8.5pt;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--muted);
        font-weight: 600;
      }
      .pdf-cover-h1 {
        font-family: var(--serif);
        font-size: 20pt;
        font-weight: 700;
        line-height: 1.05;
        margin: 4pt 0 0;
        color: var(--ink);
      }
      .pdf-cover-h1 em {
        font-style: italic;
        color: var(--accent);
        font-weight: 700;
      }

      /* Body typography */
      h1 {
        font-family: var(--serif);
        font-size: 20pt;
        font-weight: 700;
        line-height: 1.1;
        margin: 0 0 8pt;
        color: var(--ink);
        letter-spacing: -0.01em;
      }
      h1 em { font-style: italic; color: var(--accent); }
      h2 {
        font-family: var(--serif);
        font-size: 15pt;
        font-weight: 700;
        margin: 22pt 0 6pt;
        color: var(--ink);
        letter-spacing: -0.005em;
      }
      h2 em { font-style: italic; color: var(--accent); }
      h3 {
        font-family: var(--serif);
        font-size: 12.5pt;
        font-weight: 700;
        margin: 14pt 0 4pt;
        color: var(--ink);
      }
      h4 {
        font-family: var(--sans);
        font-size: 11pt;
        font-weight: 700;
        margin: 12pt 0 3pt;
        color: var(--ink-2);
      }
      p { margin: 0 0 9pt; color: var(--ink-2); }
      ul, ol { padding-left: 20pt; margin: 0 0 10pt; color: var(--ink-2); }
      li { margin-bottom: 4pt; }

      /* Tables — used for forms list and other tabular data */
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 10pt 0 14pt;
        font-size: 10.5pt;
      }
      th, td {
        text-align: left;
        padding: 7pt 9pt;
        border: 1px solid var(--hairline);
        vertical-align: top;
      }
      th {
        background: var(--cream-2);
        font-weight: 700;
        color: var(--ink);
        font-size: 9.5pt;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      tbody tr:nth-child(even) td { background: #FAF6EC; }

      /* Code / inline citations */
      code {
        font-family: ui-monospace, "SF Mono", Menlo, monospace;
        font-size: 9.5pt;
        background: var(--cream-2);
        padding: 1pt 4pt;
        border-radius: 3pt;
        color: var(--ink);
      }
      pre {
        font-family: ui-monospace, "SF Mono", Menlo, monospace;
        font-size: 9.5pt;
        background: var(--cream);
        padding: 8pt 10pt;
        border: 1px solid var(--hairline);
        border-radius: 4pt;
        overflow: auto;
      }

      /* Definition-list style for the case-memo header block (the writer
         opens the body with bold key:value lines like "**Court:** ..."). */
      blockquote {
        background: var(--cream);
        border-left: 3pt solid var(--accent);
        padding: 10pt 14pt;
        margin: 0 0 12pt;
        color: var(--ink-2);
        border-radius: 2pt;
      }

      /* Disclaimer footer (the prose ends with a divider line then an italic
         disclaimer paragraph). The hr stays on this one block; section
         dividers in the body have already been stripped upstream. */
      hr {
        border: 0;
        border-top: 1px solid var(--hairline);
        margin: 18pt 0 10pt;
      }
      hr + p, hr + p em { font-size: 9.5pt; color: var(--muted); line-height: 1.5; }
    </style>
  </head>
  <body>
    <div class="pdf-cover">
      <div class="pdf-cover-brand">
        ${logo ? `<img class="pdf-cover-logo" src="${logo}" alt="CivilCase" />` : `<span style="font-family: var(--serif); font-size: 18pt; font-weight: 700;">CivilCase</span>`}
      </div>
      <div class="pdf-cover-title">
        <div class="pdf-cover-eyebrow">Filing Guide</div>
        <div class="pdf-cover-h1">${escapeHtml(title)}</div>
      </div>
    </div>
    ${bodyHtml}
  </body>
</html>`;
}

function footerTemplate(title: string): string {
  // Puppeteer's header/footer needs inline-styled HTML.
  return `<div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 8pt; color: #8B8470; width: 100%; padding: 0 0.6in; display: flex; justify-content: space-between; border-top: 1px solid #E0D9C8; padding-top: 6pt;">
    <span style="font-weight: 600; color: #1A1714;">CivilCase</span>
    <span>${escapeHtml(title)}</span>
    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
  </div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
