-- Distinguish "you need to do something" notifications from purely
-- informational ones. The dashboard sidebar bell + per-case bell icons key
-- off these so the indicator doesn't clear just because the user opened the
-- notifications page — it only clears when they actually do the thing the
-- notification was about.

ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS action_required BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMPTZ;

-- Index for the bell counter query (unresolved + action-required for a user).
CREATE INDEX IF NOT EXISTS notifications_user_actionable_idx
  ON notifications (user_id, created_at DESC)
  WHERE action_required = TRUE AND resolved_at IS NULL;

-- Index for the per-case bell on /dashboard + /dashboard/cases lists.
CREATE INDEX IF NOT EXISTS notifications_case_actionable_idx
  ON notifications (case_id, created_at DESC)
  WHERE action_required = TRUE AND resolved_at IS NULL;

-- Backfill: existing letter_ready_for_review notifications need user action,
-- so flag them. Other types stay informational (the default false).
UPDATE notifications
SET action_required = TRUE
WHERE type = 'letter_ready_for_review'
  AND action_required = FALSE;
