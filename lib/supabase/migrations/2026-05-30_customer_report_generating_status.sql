-- Add a 'generating' value to the customer_report_status enum.
--
-- Why: finalizeCustomerReport() now uses this status as a lightweight
-- concurrency lock. It atomically flips a report row from 'pending' ->
-- 'generating' before the expensive merge + writer LLM calls, so two
-- overlapping ensure->finalize calls (the purchase webhook and the buyer's
-- first page load) can't both run the pipeline and burn duplicate tokens.
-- On success the status moves on to 'draft' or 'published'; on failure the
-- code releases it back to 'pending' so a later attempt can retry.
--
-- Customers never see this status — readiness is keyed off the published
-- HTML, not the status column — so it is purely internal.
--
-- Safe to re-run: ADD VALUE IF NOT EXISTS is idempotent. Run this on its own
-- (ALTER TYPE ... ADD VALUE cannot be used inside the same transaction that
-- adds it). The application code is written to fall back to its previous
-- unlocked behavior if this value is absent, so deploy ordering is flexible.

ALTER TYPE customer_report_status ADD VALUE IF NOT EXISTS 'generating';
