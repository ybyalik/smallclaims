// Generate a paid-receipt PDF that customers can download and submit to
// small-claims court for fee reimbursement. Uses pdf-lib so it runs in
// Vercel's Node runtime without a headless browser.

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN_X = 60;

export interface ReceiptLineItem {
  name: string;
  amountCents: number;
}

export interface ReceiptInput {
  receiptNumber: string;
  date: string;
  customerName?: string | null;
  customerEmail: string;
  caseCaption: string;
  caseId: string;
  lineItems: ReceiptLineItem[];
  totalCents: number;
  paymentIntentId: string;
}

function fmt(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export async function renderReceiptPdf(input: ReceiptInput): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  const reg = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const ink = rgb(0.05, 0.05, 0.05);
  const muted = rgb(0.35, 0.35, 0.32);
  const line = rgb(0.85, 0.84, 0.82);

  let y = PAGE_HEIGHT - 60;

  // Header band: RECEIPT (left) / CivilCase (right)
  page.drawText("RECEIPT", { x: MARGIN_X, y, size: 22, font: bold, color: ink });
  const brand = "CivilCase";
  const brandWidth = bold.widthOfTextAtSize(brand, 16);
  page.drawText(brand, {
    x: PAGE_WIDTH - MARGIN_X - brandWidth,
    y: y + 4,
    size: 16,
    font: bold,
    color: ink,
  });
  const tagline = "civilcase.com";
  const tagWidth = reg.widthOfTextAtSize(tagline, 9);
  page.drawText(tagline, {
    x: PAGE_WIDTH - MARGIN_X - tagWidth,
    y: y - 12,
    size: 9,
    font: reg,
    color: muted,
  });

  y -= 38;
  page.drawLine({
    start: { x: MARGIN_X, y },
    end: { x: PAGE_WIDTH - MARGIN_X, y },
    thickness: 0.7,
    color: line,
  });
  y -= 28;

  // Receipt # (left) / Date (right)
  page.drawText("RECEIPT NUMBER", { x: MARGIN_X, y, size: 8.5, font: bold, color: muted });
  page.drawText("DATE", {
    x: PAGE_WIDTH / 2,
    y,
    size: 8.5,
    font: bold,
    color: muted,
  });
  y -= 14;
  page.drawText(input.receiptNumber, { x: MARGIN_X, y, size: 12, font: reg, color: ink });
  page.drawText(input.date, { x: PAGE_WIDTH / 2, y, size: 12, font: reg, color: ink });
  y -= 30;

  // Billed to
  page.drawText("BILLED TO", { x: MARGIN_X, y, size: 8.5, font: bold, color: muted });
  y -= 14;
  const billedToLines: string[] = [];
  if (input.customerName) billedToLines.push(input.customerName);
  billedToLines.push(input.customerEmail);
  for (const ln of billedToLines) {
    page.drawText(ln, { x: MARGIN_X, y, size: 11, font: reg, color: ink });
    y -= 14;
  }
  y -= 14;

  // Case reference (right of Billed to area, shown below)
  page.drawText("CASE", { x: MARGIN_X, y, size: 8.5, font: bold, color: muted });
  y -= 14;
  page.drawText(input.caseCaption, { x: MARGIN_X, y, size: 11, font: reg, color: ink });
  y -= 12;
  page.drawText(`Case ID: ${input.caseId}`, { x: MARGIN_X, y, size: 9, font: reg, color: muted });
  y -= 30;

  // Description table
  page.drawText("DESCRIPTION", { x: MARGIN_X, y, size: 8.5, font: bold, color: muted });
  const amountColX = PAGE_WIDTH - MARGIN_X;
  page.drawText("AMOUNT", {
    x: amountColX - bold.widthOfTextAtSize("AMOUNT", 8.5),
    y,
    size: 8.5,
    font: bold,
    color: muted,
  });
  y -= 8;
  page.drawLine({
    start: { x: MARGIN_X, y },
    end: { x: PAGE_WIDTH - MARGIN_X, y },
    thickness: 0.5,
    color: line,
  });
  y -= 18;

  for (const item of input.lineItems) {
    page.drawText(item.name, { x: MARGIN_X, y, size: 11, font: reg, color: ink });
    const amt = fmt(item.amountCents);
    const amtWidth = reg.widthOfTextAtSize(amt, 11);
    page.drawText(amt, {
      x: amountColX - amtWidth,
      y,
      size: 11,
      font: reg,
      color: ink,
    });
    y -= 20;
  }

  y -= 4;
  page.drawLine({
    start: { x: MARGIN_X, y },
    end: { x: PAGE_WIDTH - MARGIN_X, y },
    thickness: 0.5,
    color: line,
  });
  y -= 22;

  // Total row
  page.drawText("Total Paid", { x: MARGIN_X, y, size: 13, font: bold, color: ink });
  const totalStr = fmt(input.totalCents);
  const totalWidth = bold.widthOfTextAtSize(totalStr, 14);
  page.drawText(totalStr, {
    x: amountColX - totalWidth,
    y: y - 1,
    size: 14,
    font: bold,
    color: ink,
  });
  y -= 36;

  // Payment info
  page.drawText("PAYMENT", { x: MARGIN_X, y, size: 8.5, font: bold, color: muted });
  y -= 14;
  page.drawText("Paid by credit card via Stripe.", {
    x: MARGIN_X,
    y,
    size: 11,
    font: reg,
    color: ink,
  });
  y -= 14;
  page.drawText(`Transaction ID: ${input.paymentIntentId}`, {
    x: MARGIN_X,
    y,
    size: 9,
    font: reg,
    color: muted,
  });
  y -= 36;

  // Footer note
  page.drawLine({
    start: { x: MARGIN_X, y },
    end: { x: PAGE_WIDTH - MARGIN_X, y },
    thickness: 0.5,
    color: line,
  });
  y -= 18;
  page.drawText("Receipt for services rendered.", {
    x: MARGIN_X,
    y,
    size: 9.5,
    font: bold,
    color: ink,
  });
  y -= 13;
  const note =
    "Keep this for your records. May qualify as a reimbursable cost or recoverable damage in";
  const note2 = "small-claims actions. Consult your local court rules.";
  page.drawText(note, { x: MARGIN_X, y, size: 9, font: reg, color: muted });
  y -= 12;
  page.drawText(note2, { x: MARGIN_X, y, size: 9, font: reg, color: muted });

  return await pdf.save();
}
