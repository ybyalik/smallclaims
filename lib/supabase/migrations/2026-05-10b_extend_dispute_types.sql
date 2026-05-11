-- Extend the dispute_type enum with 4 new categories that match the new
-- 11+other taxonomy:
--
--   property_damage    — mover/dry-cleaner/storage/kennel/hotel/airline/parking
--   medical_billing    — surprise bills, balance billing, double-charge
--   insurance          — denied/underpaid claims (auto, renters, homeowners)
--   pet_injury         — dog bite, kennel injury, dog walker, vet malpractice
--
-- The existing canonical 9 (landlord, auto, contractor, employer, refund,
-- online_seller, personal_loan, neighbor, roommate, other) plus all legacy
-- values stay in the enum. New code emits the 11 surfaced in the picker:
--   landlord, auto, personal_loan, contractor, refund, online_seller,
--   employer, property_damage, medical_billing, insurance, pet_injury, other.
-- neighbor + roommate are dropped from the picker but kept in the enum so
-- existing rows still typecheck.
--
-- Idempotent: ADD VALUE IF NOT EXISTS.

ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'property_damage';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'medical_billing';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'insurance';
ALTER TYPE dispute_type ADD VALUE IF NOT EXISTS 'pet_injury';
