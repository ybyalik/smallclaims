-- Remove SMS-consent fields from cases.intake_answers JSONB.
-- The SMS opt-in UI was removed from the demand-letter wizard; this drops the
-- legacy keys from any existing rows so the JSON shape stays clean.
--
-- Safe to re-run: jsonb-minus is a no-op when keys are absent.

UPDATE public.cases
SET intake_answers = (intake_answers - 'plaintiff_sms_consent') - 'plaintiff_sms_consent_at'
WHERE intake_answers ? 'plaintiff_sms_consent'
   OR intake_answers ? 'plaintiff_sms_consent_at';
