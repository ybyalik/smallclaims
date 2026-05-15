-- New wizard flow: the final step is a review-and-sign page that marks the
-- case as info-complete BEFORE any product is purchased. Product selection
-- (demand letter / court prep / file in court) then happens on a separate
-- timeline page where each product is independently buyable in any order.
--
-- This migration adds the new status and the four columns needed to store
-- the signature captured at the end of the wizard. The signature is also
-- intended for overlay on demand-letter PDFs (separate work — column ready).

ALTER TYPE case_status ADD VALUE IF NOT EXISTS 'intake_complete';

ALTER TABLE cases
  ADD COLUMN IF NOT EXISTS signature_image TEXT,           -- data URL (PNG, base64)
  ADD COLUMN IF NOT EXISTS signature_typed_name TEXT,
  ADD COLUMN IF NOT EXISTS signature_signed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS signature_ip TEXT;
