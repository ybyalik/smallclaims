-- Saved default phone for the plaintiff's filer identity. Added so the
-- plaintiff step's "Use saved" button can prefill the phone in addition
-- to name, address, and county.

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS default_phone TEXT;
