// Canonical S3 key builders. ALL paths go through here so the structure
// stays consistent and we can refactor in one place if needed.
//
// Layout:
//   cases/{caseId}/evidence/{uuid}.{ext}            User-uploaded evidence
//   cases/{caseId}/demand-letter/v{N}.pdf           Generated demand letter
//   cases/{caseId}/filing-guide/v{N}.pdf            Filing Guide PDF
//   cases/{caseId}/court-prep/v{N}.pdf              Court Prep Pack PDF
//   cases/{caseId}/court-forms/{formCode}.pdf       Filled court forms
//   cases/{caseId}/proof-of-service/{uuid}.pdf      Service proofs
//   cases/{caseId}/correspondence/{uuid}.{ext}      Defendant responses, etc.
//   blog/{postId}/cover.{ext}                       Blog post cover images
//   admin-uploads/{year}/{uuid}.{ext}               General admin uploads
//   temp/{uuid}.{ext}                               Lifecycle-deleted after 24h

import { randomUUID } from "node:crypto";

const CASE_ID_RE = /^[a-z0-9-]{4,64}$/i;

function safeCaseId(caseId: string): string {
  if (!CASE_ID_RE.test(caseId)) throw new Error(`Unsafe case id: ${caseId}`);
  return caseId;
}

function safeExt(ext: string): string {
  // Allow only alphanumeric extensions, lowercase, 1-8 chars. Strip dots.
  const e = ext.replace(/^\.+/, "").toLowerCase();
  if (!/^[a-z0-9]{1,8}$/.test(e)) throw new Error(`Unsafe extension: ${ext}`);
  return e;
}

function safeFormCode(formCode: string): string {
  // Court form codes like "SC-100" or "DC-DEM" — letters, digits, dashes.
  if (!/^[A-Za-z0-9-]{1,16}$/.test(formCode)) throw new Error(`Unsafe form code: ${formCode}`);
  return formCode.toUpperCase();
}

// ---------------------------------------------------------------------------
// Case-scoped paths
// ---------------------------------------------------------------------------

export function evidencePath(caseId: string, ext: string): string {
  return `cases/${safeCaseId(caseId)}/evidence/${randomUUID()}.${safeExt(ext)}`;
}

export function demandLetterPath(caseId: string, version: number): string {
  if (!Number.isInteger(version) || version < 1) throw new Error(`Bad version: ${version}`);
  return `cases/${safeCaseId(caseId)}/demand-letter/v${version}.pdf`;
}

export function filingGuidePath(caseId: string, version: number): string {
  if (!Number.isInteger(version) || version < 1) throw new Error(`Bad version: ${version}`);
  return `cases/${safeCaseId(caseId)}/filing-guide/v${version}.pdf`;
}

export function courtPrepPath(caseId: string, version: number): string {
  if (!Number.isInteger(version) || version < 1) throw new Error(`Bad version: ${version}`);
  return `cases/${safeCaseId(caseId)}/court-prep/v${version}.pdf`;
}

export function courtFormPath(caseId: string, formCode: string): string {
  return `cases/${safeCaseId(caseId)}/court-forms/${safeFormCode(formCode)}.pdf`;
}

export function proofOfServicePath(caseId: string, ext: string = "pdf"): string {
  return `cases/${safeCaseId(caseId)}/proof-of-service/${randomUUID()}.${safeExt(ext)}`;
}

export function correspondencePath(caseId: string, ext: string): string {
  return `cases/${safeCaseId(caseId)}/correspondence/${randomUUID()}.${safeExt(ext)}`;
}

// ---------------------------------------------------------------------------
// Non-case paths
// ---------------------------------------------------------------------------

export function blogCoverPath(postId: string, ext: string): string {
  if (!/^[a-z0-9-]{4,64}$/i.test(postId)) throw new Error(`Unsafe post id: ${postId}`);
  return `blog/${postId}/cover.${safeExt(ext)}`;
}

export function adminUploadPath(ext: string): string {
  const year = new Date().getFullYear();
  return `admin-uploads/${year}/${randomUUID()}.${safeExt(ext)}`;
}

export function tempPath(ext: string): string {
  return `temp/${randomUUID()}.${safeExt(ext)}`;
}

// ---------------------------------------------------------------------------
// Validation: does this key belong to a case the caller is allowed to access?
// ---------------------------------------------------------------------------

/**
 * If the key is case-scoped (starts with cases/{caseId}/), return the caseId.
 * Returns null otherwise. Used by signed-URL endpoints to authorize access.
 */
export function caseIdFromKey(key: string): string | null {
  const m = /^cases\/([a-z0-9-]{4,64})\//i.exec(key);
  return m ? m[1] : null;
}
