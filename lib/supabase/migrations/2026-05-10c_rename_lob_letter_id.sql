-- Rename demand_letters.lob_letter_id → mail_vendor_letter_id.
--
-- The column was added back when Lob was the planned mailing vendor. The
-- vendor is now PostGrid; the column has been unused (no Lob integration
-- ever shipped), so the rename is a clean structural change with no data
-- migration needed.
--
-- Idempotent via DO block: runs only if the legacy column still exists.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'demand_letters'
      AND column_name = 'lob_letter_id'
  ) THEN
    ALTER TABLE demand_letters RENAME COLUMN lob_letter_id TO mail_vendor_letter_id;
  END IF;
END $$;
