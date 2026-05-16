-- Letter-approval gate + customer-facing notifications.
--
-- Adds a review/approval cycle between letter generation and PostGrid mailing
-- so a letter never goes out without explicit customer consent, plus a
-- general-purpose notifications table the dashboard uses to surface new
-- activity (revision ready, letter mailed, etc.) via a bell icon.

-- ---- demand_letters: approval state -------------------------------------
ALTER TABLE demand_letters
  ADD COLUMN IF NOT EXISTS approval_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (approval_status IN ('pending', 'approved', 'changes_requested'));

ALTER TABLE demand_letters
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;

ALTER TABLE demand_letters
  ADD COLUMN IF NOT EXISTS changes_requested_at TIMESTAMPTZ;

ALTER TABLE demand_letters
  ADD COLUMN IF NOT EXISTS changes_text TEXT;

-- Backfill: any letter that already has a PostGrid id is implicitly approved
-- (it's been mailed). Without this, every in-flight customer would land on the
-- new review screen after deploy and wonder why their already-mailed letter is
-- waiting for approval.
UPDATE demand_letters
SET approval_status = 'approved',
    approved_at = COALESCE(sent_at, updated_at, created_at)
WHERE mail_vendor_letter_id IS NOT NULL
  AND approval_status = 'pending';

-- ---- notifications: dashboard bell --------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  -- Optional case anchor. NULL for account-level notices.
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  -- Short machine slug so the UI can render specific icons / link targets.
  -- Examples: letter_ready_for_review, letter_mailed, letter_delivered,
  -- changes_acknowledged.
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  -- Optional in-app destination. UI navigates here on click.
  link TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS notifications_user_unread_idx
  ON notifications (user_id, created_at DESC)
  WHERE read_at IS NULL;

CREATE INDEX IF NOT EXISTS notifications_user_recent_idx
  ON notifications (user_id, created_at DESC);
