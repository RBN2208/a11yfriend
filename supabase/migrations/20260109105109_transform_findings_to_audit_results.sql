-- ============================================
-- Transform findings structure in automatic_audits table
-- ============================================
-- This migration transforms the findings column from a single JSONB object
-- to an array of AuditResult objects, each with a created_at timestamp

-- Step 1: Transform existing data
-- Wrap existing findings in an array and add created_at timestamp
UPDATE public.automatic_audits
SET findings = CASE
  -- If findings is null or empty object, set to empty array
  WHEN findings IS NULL OR findings::text = '{}' THEN '[]'::jsonb
  -- If findings already looks like an array, keep it
  WHEN jsonb_typeof(findings) = 'array' THEN findings
  -- Otherwise, wrap the existing object in an array with created_at
  ELSE jsonb_build_array(
    findings || jsonb_build_object('created_at', COALESCE(updated_at, created_at, NOW())::text)
  )
END;

-- Step 2: Update column comment for documentation
COMMENT ON COLUMN public.automatic_audits.findings IS 'Array of audit results with summary, axe_results, lighthouse_results, and created_at timestamp';

-- Step 3: Ensure findings column defaults to empty array for new records
ALTER TABLE public.automatic_audits
ALTER COLUMN findings SET DEFAULT '[]'::jsonb;
