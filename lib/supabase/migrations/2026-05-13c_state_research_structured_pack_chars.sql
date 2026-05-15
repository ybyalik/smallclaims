-- Record how many characters of the combined four-call dossier were fed
-- into the gpt-5-mini extraction. Lets the admin verify at a glance that
-- the entire dossier was read (vs. truncated at the input budget cap).

ALTER TABLE state_research
  ADD COLUMN IF NOT EXISTS structured_pack_source_chars INTEGER;
