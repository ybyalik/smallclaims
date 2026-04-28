// Generate a formatted PDF from the demand-letter markdown body.
// Uses pdf-lib (no headless browser, runs on Vercel Node runtime).

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

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
const LINE_HEIGHT = 14;
const FONT_SIZE = 11;

// Wrap a single paragraph into lines that fit the content width.
function wrapText(
  text: string,
  font: { widthOfTextAtSize: (s: string, size: number) => number },
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(trial, fontSize) <= maxWidth) {
      current = trial;
    } else {
      if (current) lines.push(current);
      // Word longer than maxWidth — hard break
      if (font.widthOfTextAtSize(word, fontSize) > maxWidth) {
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
    .replace(/^#{1,6}\s+/gm, "") // strip heading markers
    .replace(/\*\*(.+?)\*\*/g, "$1") // bold
    .replace(/\*(.+?)\*/g, "$1") // italic
    .replace(/`(.+?)`/g, "$1") // inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // links → just the label
}

export async function renderLetterPdf({ body_md }: LetterPdfInput): Promise<Uint8Array> {
  const cleaned = stripMarkdown(body_md);
  const paragraphs = cleaned.split(/\n{2,}/).map((p) => p.replace(/\n/g, " ").trim()).filter(Boolean);

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.TimesRoman);
  const contentWidth = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let cursor = PAGE_HEIGHT - MARGIN_TOP;

  function newPage() {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    cursor = PAGE_HEIGHT - MARGIN_TOP;
  }

  for (const para of paragraphs) {
    // For lines that look like list bullets, keep the leading marker.
    const isBullet = /^([-*]|\d+\.)\s/.test(para);
    const textForRender = isBullet ? para : para;
    const lines = wrapText(textForRender, font, FONT_SIZE, contentWidth);
    const blockHeight = lines.length * LINE_HEIGHT + LINE_HEIGHT * 0.5;
    if (cursor - blockHeight < MARGIN_BOTTOM) newPage();
    for (const line of lines) {
      page.drawText(line, {
        x: MARGIN_LEFT,
        y: cursor,
        size: FONT_SIZE,
        font,
        color: rgb(0, 0, 0),
      });
      cursor -= LINE_HEIGHT;
      if (cursor < MARGIN_BOTTOM) newPage();
    }
    cursor -= LINE_HEIGHT * 0.5;
  }

  return await pdf.save();
}
