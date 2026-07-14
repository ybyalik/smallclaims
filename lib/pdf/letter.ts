// Generate a formatted PDF from the demand-letter markdown body.
// Uses pdf-lib (no headless browser, runs on Vercel Node runtime).

import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import { readFileSync } from "node:fs";
import { join } from "node:path";

interface LetterPdfInput {
  body_md: string;
  filename?: string;
}

const PAGE_WIDTH = 612; // 8.5"
const PAGE_HEIGHT = 792; // 11"
const MARGIN_LEFT = 72; // 1"
const MARGIN_RIGHT = 72;
const MARGIN_TOP = 72;
const MARGIN_BOTTOM = 72;
const FONT_SIZE = 11;
const LINE_HEIGHT = 15;            // tighter leading inside a paragraph
const PARAGRAPH_GAP = 10;          // vertical space between paragraphs
const SECTION_GAP_EXTRA = 6;       // a touch more after blank-line breaks
const LOGO_WIDTH = 110;            // letterhead logo width in points
const LOGO_GAP = 12;               // gap below the logo before the address

// Wrap a single text line into multiple lines that fit the content width.
function wrapText(
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number,
): string[] {
  if (!text) return [""];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(trial, fontSize) <= maxWidth) {
      current = trial;
    } else {
      if (current) lines.push(current);
      if (font.widthOfTextAtSize(word, fontSize) > maxWidth) {
        // Word itself is wider than the page — hard-break on characters.
        let chunk = "";
        for (const ch of word) {
          if (font.widthOfTextAtSize(chunk + ch, fontSize) <= maxWidth) chunk += ch;
          else {
            lines.push(chunk);
            chunk = ch;
          }
        }
        current = chunk;
      } else {
        current = word;
      }
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Strip the most common markdown decorations so the PDF is plain prose.
function stripMarkdown(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

// pdf-lib's StandardFonts.TimesRoman is the base-14 Times font, which can only
// encode WinAnsi (CP-1252) characters. drawText / widthOfTextAtSize THROW on
// anything else, so a customer named "Michał", a Turkish "ş", an emoji, or an
// arrow in the story would crash the whole PDF (500 on download, and the
// mailing job exhausts its retries). We must guarantee every character is
// encodable, never throw.
//
// Strategy: map the common typographic offenders to ASCII, transliterate a few
// non-decomposing Latin letters, strip diacritics via Unicode decomposition
// (so "ş" -> "s", "é" -> "e"), then replace anything still outside the WinAnsi
// range with "?" as a last resort. Whitespace (newlines/tabs) is preserved.
function normalizeForBaseFont(text: string): string {
  const mapped = text
    .replace(/‑/g, "-")        // NON-BREAKING HYPHEN
    .replace(/‐/g, "-")        // HYPHEN (non-minus)
    .replace(/−/g, "-")        // MINUS SIGN
    .replace(/­/g, "")         // SOFT HYPHEN (invisible)
    .replace(/‒|–|—/g, "-")   // FIGURE/EN/EM DASH → -
    .replace(/'|'/g, "'")      // smart single quotes
    .replace(/"|"/g, '"')      // smart double quotes
    .replace(/…/g, "...")      // ellipsis
    .replace(/ /g, " ")       // narrow no-break space
    .replace(/ /g, " ")        // thin space
    // Non-decomposing Latin letters (NFD won't split these).
    .replace(/Ł/g, "L").replace(/ł/g, "l")
    .replace(/Ø/g, "O").replace(/ø/g, "o")
    .replace(/Æ/g, "AE").replace(/æ/g, "ae")
    .replace(/Œ/g, "OE").replace(/œ/g, "oe")
    .replace(/Đ/g, "D").replace(/đ/g, "d")
    .replace(/Ð/g, "D").replace(/ð/g, "d")
    .replace(/Þ/g, "Th").replace(/þ/g, "th")
    .replace(/ß/g, "ss");

  // Strip combining diacritical marks (é -> e, ş -> s, ñ -> n, ü -> u, …).
  const stripped = mapped.normalize("NFD").replace(/[̀-ͯ]/g, "");

  // Final safety net: keep printable ASCII, the Latin-1 supplement (which
  // WinAnsi covers), and whitespace; replace anything else (emoji, CJK,
  // arrows, math symbols) with "?" so drawText can never throw.
  // eslint-disable-next-line no-control-regex
  return stripped.replace(/[^\x20-\x7E\xA0-\xFF\n\r\t]/g, "?");
}

// Reserved marker the generator inserts between the CivilCase cover letter
// and the demand letter so each lands on its own page.
const PAGE_BREAK_MARKER = "<!-- PAGEBREAK -->";

// Load the CivilCase letterhead logo from /public. Cached after first call
// because PDF generation runs many times per request batch in dev. Returns
// null if the file is missing so we degrade to text-only letterhead instead
// of failing the entire render.
let cachedLogoBytes: Uint8Array | null | undefined;
function loadLogoBytes(): Uint8Array | null {
  if (cachedLogoBytes !== undefined) return cachedLogoBytes;
  try {
    const buf = readFileSync(join(process.cwd(), "public", "civilcase-logo.png"));
    cachedLogoBytes = new Uint8Array(buf);
  } catch {
    cachedLogoBytes = null;
  }
  return cachedLogoBytes;
}

// Looks like a "Re: …" subject line. We render those bold to mimic the
// convention real legal correspondence follows.
function isSubjectLine(line: string): boolean {
  return /^Re:\s/i.test(line.trim());
}

// First non-blank line of the section is "CivilCase" — that's our cue to
// place the letterhead logo at the top of the page.
function sectionStartsWithCivilCase(section: string): boolean {
  const lines = section.split("\n");
  for (const ln of lines) {
    const t = ln.trim();
    if (!t) continue;
    return t.toLowerCase() === "civilcase";
  }
  return false;
}

export async function renderLetterPdf({ body_md }: LetterPdfInput): Promise<Uint8Array> {
  const cleaned = normalizeForBaseFont(stripMarkdown(body_md));
  const sections = cleaned.split(PAGE_BREAK_MARKER);

  const pdf = await PDFDocument.create();
  const fontReg = await pdf.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const contentWidth = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

  // Try to embed the logo once; reused on every CivilCase letterhead page.
  let logoImage: PDFImage | null = null;
  const logoBytes = loadLogoBytes();
  if (logoBytes) {
    try {
      logoImage = await pdf.embedPng(logoBytes);
    } catch {
      logoImage = null;
    }
  }

  let page: PDFPage = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let cursor = PAGE_HEIGHT - MARGIN_TOP;

  function newPage() {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    cursor = PAGE_HEIGHT - MARGIN_TOP;
  }

  function ensureSpace(needed: number) {
    if (cursor - needed < MARGIN_BOTTOM) newPage();
  }

  function drawLine(line: string, opts: { bold?: boolean } = {}) {
    const font = opts.bold ? fontBold : fontReg;
    const wrapped = wrapText(line, font, FONT_SIZE, contentWidth);
    for (const w of wrapped) {
      ensureSpace(LINE_HEIGHT);
      page.drawText(w, {
        x: MARGIN_LEFT,
        y: cursor,
        size: FONT_SIZE,
        font,
        color: rgb(0, 0, 0),
      });
      cursor -= LINE_HEIGHT;
    }
  }

  for (let sectionIdx = 0; sectionIdx < sections.length; sectionIdx += 1) {
    if (sectionIdx > 0) newPage();
    const section = sections[sectionIdx];

    // Draw the logo at the very top if this section begins with the
    // CivilCase letterhead block.
    const lines = section.split("\n");
    let lineIdx = 0;
    if (logoImage && sectionStartsWithCivilCase(section)) {
      const scale = LOGO_WIDTH / logoImage.width;
      const drawWidth = LOGO_WIDTH;
      const drawHeight = logoImage.height * scale;
      page.drawImage(logoImage, {
        x: MARGIN_LEFT,
        y: cursor - drawHeight,
        width: drawWidth,
        height: drawHeight,
      });
      cursor -= drawHeight + LOGO_GAP;

      // Skip the literal "CivilCase" text line — the logo replaces it.
      while (lineIdx < lines.length && !lines[lineIdx].trim()) lineIdx += 1;
      if (
        lineIdx < lines.length &&
        lines[lineIdx].trim().toLowerCase() === "civilcase"
      ) {
        lineIdx += 1;
      }
    }

    // Walk every line: blank = paragraph break; "Re:" prefix = bold.
    let lastWasBlank = false;
    for (; lineIdx < lines.length; lineIdx += 1) {
      const raw = lines[lineIdx];
      if (raw.trim() === "") {
        if (!lastWasBlank) {
          cursor -= PARAGRAPH_GAP + SECTION_GAP_EXTRA;
          if (cursor < MARGIN_BOTTOM) newPage();
        }
        lastWasBlank = true;
        continue;
      }
      lastWasBlank = false;
      drawLine(raw, { bold: isSubjectLine(raw) });
    }
  }

  return await pdf.save();
}
