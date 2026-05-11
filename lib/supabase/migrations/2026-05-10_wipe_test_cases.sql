-- Wipe all test cases ahead of the case-builder restructure.
-- The site has never been live; existing rows are dev/test data only.
-- All FKs to cases.id are ON DELETE CASCADE except audit_log (SET NULL),
-- so a single delete cleans demand_letters, documents, payments,
-- court_forms, service_attempts, attorney_review_requests,
-- case_research_jobs, and case_research_reports.

DELETE FROM public.cases;
