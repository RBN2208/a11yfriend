-- ============================================
-- Migration: Simplify Manual Audit Findings Structure
-- Date: 2025-12-02
-- Description: Reduce AuditResult fields in findings array to only id, status, and findings
-- Previous structure: {id, name, conformance, referenceLink, status, findings}
-- New structure: {id, status, findings}
-- ============================================

-- 1. Create a function to transform existing findings
CREATE OR REPLACE FUNCTION public.migrate_manual_audit_findings()
RETURNS void AS $$
DECLARE
    audit_record RECORD;
    old_findings JSONB;
    new_findings JSONB;
    finding JSONB;
    transformed_finding JSONB;
BEGIN
    -- Loop through all manual audits
    FOR audit_record IN SELECT id, findings FROM public.manual_audits LOOP
        old_findings := audit_record.findings;
        new_findings := '[]'::jsonb;

        -- Transform each finding in the array
        IF old_findings IS NOT NULL AND jsonb_array_length(old_findings) > 0 THEN
            FOR finding IN SELECT * FROM jsonb_array_elements(old_findings) LOOP
                -- Create new finding with only id, status, and findings keys
                transformed_finding := jsonb_build_object(
                    'id', finding->'id',
                    'status', finding->'status',
                    'findings', COALESCE(finding->'findings', 'null'::jsonb)
                );

                -- Append to new findings array
                new_findings := new_findings || jsonb_build_array(transformed_finding);
            END LOOP;
        END IF;

        -- Update the record with transformed findings
        UPDATE public.manual_audits
        SET findings = new_findings
        WHERE id = audit_record.id;
    END LOOP;

    RAISE NOTICE 'Successfully migrated % manual audit records', (SELECT COUNT(*) FROM public.manual_audits);
END;
$$ LANGUAGE plpgsql;

-- 2. Execute the migration function
SELECT public.migrate_manual_audit_findings();

-- 3. Drop the migration function (cleanup)
DROP FUNCTION IF EXISTS public.migrate_manual_audit_findings();

-- 4. Update comment to document the new structure
COMMENT ON COLUMN public.manual_audits.findings IS 'Array of audit results. Each result contains: id (string), status (checked|not_checked|not_applicable|failed), findings (TipTap content or null)';

-- 5. Log completion
DO $$
BEGIN
    RAISE NOTICE 'Migration completed: manual_audits.findings now contains only id, status, and findings keys per AuditResult';
    RAISE NOTICE 'Removed keys: name, conformance, referenceLink (now fetched from WCAGCriterias via id)';
END $$;

