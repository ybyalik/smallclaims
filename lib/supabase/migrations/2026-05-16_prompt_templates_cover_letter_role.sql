-- Allow `cover_letter` as a third role under prompt_templates so the
-- CivilCase cover-letter template can be saved and edited from the admin
-- prompts UI (alongside `system` and `user_template`).

ALTER TABLE prompt_templates DROP CONSTRAINT IF EXISTS prompt_templates_role_check;

ALTER TABLE prompt_templates
  ADD CONSTRAINT prompt_templates_role_check
  CHECK (role IN ('system', 'user_template', 'cover_letter'));
