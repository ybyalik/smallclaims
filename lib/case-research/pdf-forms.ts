// Parse fillable PDF forms surfaced by the research pipeline.
// We use pdf-lib to read the AcroForm field tree (works for most US court
// PDFs which are AcroForm-based, not XFA). For XFA-only PDFs we fall back
// to a flag indicating "must print and handwrite" without parsed fields.

import { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup, PDFDropdown } from "pdf-lib";

export interface PdfFormField {
  name: string;
  type: "text" | "checkbox" | "radio" | "dropdown" | "unknown";
  required: boolean;
  default_value: string | null;
  options?: string[]; // for radio / dropdown
  page?: number;
}

export interface ParsedPdfForm {
  url: string;
  byteSize: number;
  page_count: number;
  is_fillable: boolean;
  is_xfa_only: boolean;
  field_count: number;
  fields: PdfFormField[];
  textPreview: string;
  warning: string | null;
}

const MAX_BYTES = 25 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 30_000;

export async function parseFormPdf(url: string): Promise<ParsedPdfForm> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  let buffer: ArrayBuffer;
  try {
    const res = await fetch(url, { signal: ctrl.signal, redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ct = res.headers.get("content-type") || "";
    // Some sites serve PDFs without proper content-type; sniff by URL too
    if (!ct.includes("pdf") && !url.toLowerCase().endsWith(".pdf")) {
      throw new Error(`Not a PDF (content-type: ${ct})`);
    }
    buffer = await res.arrayBuffer();
    if (buffer.byteLength > MAX_BYTES) {
      throw new Error(`PDF too large (${buffer.byteLength} bytes)`);
    }
  } finally {
    clearTimeout(timer);
  }

  let doc: PDFDocument;
  try {
    doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
  } catch (e) {
    throw new Error(`pdf-lib load failed: ${e instanceof Error ? e.message : String(e)}`);
  }

  const pageCount = doc.getPageCount();
  const textPreview = "(text extraction not implemented; use Firecrawl for HTML preview)";

  // Detect XFA. AcroForm with /XFA entry is XFA. pdf-lib doesn't expose it
  // directly, so we sniff by reading the catalog dict.
  let isXfa = false;
  try {
    const catalog = doc.catalog;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const acroForm = (catalog as any).get?.((catalog as any).context?.obj?.("AcroForm"));
    if (acroForm) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const xfa = (acroForm as any).get?.((catalog as any).context?.obj?.("XFA"));
      if (xfa) isXfa = true;
    }
  } catch {
    // ignore
  }

  let form: ReturnType<typeof doc.getForm>;
  try {
    form = doc.getForm();
  } catch {
    return {
      url,
      byteSize: buffer.byteLength,
      page_count: pageCount,
      is_fillable: false,
      is_xfa_only: isXfa,
      field_count: 0,
      fields: [],
      textPreview,
      warning: "No AcroForm found",
    };
  }

  const rawFields = form.getFields();
  const fields: PdfFormField[] = rawFields.map((f) => {
    const name = f.getName();
    if (f instanceof PDFTextField) {
      return {
        name,
        type: "text",
        required: f.isRequired(),
        default_value: f.getText() ?? null,
      };
    }
    if (f instanceof PDFCheckBox) {
      return {
        name,
        type: "checkbox",
        required: f.isRequired(),
        default_value: f.isChecked() ? "true" : "false",
      };
    }
    if (f instanceof PDFRadioGroup) {
      return {
        name,
        type: "radio",
        required: f.isRequired(),
        default_value: f.getSelected() ?? null,
        options: f.getOptions(),
      };
    }
    if (f instanceof PDFDropdown) {
      return {
        name,
        type: "dropdown",
        required: f.isRequired(),
        default_value: (f.getSelected()?.[0]) ?? null,
        options: f.getOptions(),
      };
    }
    return {
      name,
      type: "unknown",
      required: false,
      default_value: null,
    };
  });

  return {
    url,
    byteSize: buffer.byteLength,
    page_count: pageCount,
    is_fillable: fields.length > 0 && !isXfa,
    is_xfa_only: isXfa,
    field_count: fields.length,
    fields,
    textPreview,
    warning: isXfa ? "XFA-only form: fields cannot be parsed; print and handwrite" : null,
  };
}

export async function parseAllForms(
  formUrls: string[],
): Promise<{ specs: Array<ParsedPdfForm & { error?: string }>; errors: number }> {
  const specs: Array<ParsedPdfForm & { error?: string }> = [];
  let errors = 0;
  await Promise.all(
    formUrls.map(async (url) => {
      try {
        const spec = await parseFormPdf(url);
        specs.push(spec);
      } catch (e) {
        errors += 1;
        specs.push({
          url,
          byteSize: 0,
          page_count: 0,
          is_fillable: false,
          is_xfa_only: false,
          field_count: 0,
          fields: [],
          textPreview: "",
          warning: null,
          error: e instanceof Error ? e.message : String(e),
        });
      }
    }),
  );
  return { specs, errors };
}
