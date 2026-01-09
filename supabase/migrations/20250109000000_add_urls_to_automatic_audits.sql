-- ============================================
-- Add urls column to automatic_audits table
-- ============================================

-- Add urls column as JSONB array with default empty array
ALTER TABLE public.automatic_audits
ADD COLUMN urls JSONB NOT NULL DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN public.automatic_audits.urls IS 'Array of URLs to be audited';

-- Create GIN index for efficient querying of urls array
CREATE INDEX IF NOT EXISTS idx_automatic_audits_urls ON public.automatic_audits USING GIN (urls);
