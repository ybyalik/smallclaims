-- Add 'active' value to the case_status enum.
--
-- We're collapsing the granular statuses (demand_drafted, demand_paid,
-- demand_sent, demand_delivered, demand_responded, filing_prepared, filed,
-- service_arranged, served, hearing_scheduled) down to a single 'active'
-- value. The display label is now derived from payments + demand_letters
-- mail_status + intake_answers.demand_response, not from case.status.
--
-- This migration is additive: old values stay in the enum so existing rows
-- still resolve. New writes use 'active' going forward.

ALTER TYPE case_status ADD VALUE IF NOT EXISTS 'active';
