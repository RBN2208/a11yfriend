-- ============================================
-- A11yFriend Database Initialization Script
-- Create Manual and Automatic Audit Tables
-- ============================================

-- 1. Create manual_audits table
CREATE TABLE IF NOT EXISTS public.manual_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'done', 'error')),
    conformance TEXT NOT NULL DEFAULT 'AA' CHECK (conformance IN ('A', 'AA', 'AAA')),
    findings JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create automatic_audits table
CREATE TABLE IF NOT EXISTS public.automatic_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'done', 'error')),
    findings JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Add comments for documentation
COMMENT ON TABLE public.manual_audits IS 'Stores manual accessibility audits performed by users';
COMMENT ON COLUMN public.manual_audits.findings IS 'Array of audit results with status, id, and TipTap editor content';
COMMENT ON COLUMN public.manual_audits.conformance IS 'WCAG conformance level (A, AA, or AAA)';

COMMENT ON TABLE public.automatic_audits IS 'Stores automated accessibility audits (Axe, Lighthouse)';
COMMENT ON COLUMN public.automatic_audits.findings IS 'Object containing axe_results, lighthouse_results, and summary';

-- 4. Create indexes for manual_audits
CREATE INDEX IF NOT EXISTS idx_manual_audits_user_id ON public.manual_audits(user_id);
CREATE INDEX IF NOT EXISTS idx_manual_audits_status ON public.manual_audits(status);
CREATE INDEX IF NOT EXISTS idx_manual_audits_created_at ON public.manual_audits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_manual_audits_updated_at ON public.manual_audits(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_manual_audits_findings ON public.manual_audits USING GIN (findings);
CREATE INDEX IF NOT EXISTS idx_manual_audits_user_status ON public.manual_audits(user_id, status);
CREATE INDEX IF NOT EXISTS idx_manual_audits_user_created ON public.manual_audits(user_id, created_at DESC);

-- 5. Create indexes for automatic_audits
CREATE INDEX IF NOT EXISTS idx_automatic_audits_user_id ON public.automatic_audits(user_id);
CREATE INDEX IF NOT EXISTS idx_automatic_audits_status ON public.automatic_audits(status);
CREATE INDEX IF NOT EXISTS idx_automatic_audits_created_at ON public.automatic_audits(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_automatic_audits_updated_at ON public.automatic_audits(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_automatic_audits_findings ON public.automatic_audits USING GIN (findings);
CREATE INDEX IF NOT EXISTS idx_automatic_audits_user_status ON public.automatic_audits(user_id, status);
CREATE INDEX IF NOT EXISTS idx_automatic_audits_user_created ON public.automatic_audits(user_id, created_at DESC);

-- 6. Create trigger function for automatic updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create triggers for both tables
DROP TRIGGER IF EXISTS set_updated_at_manual_audits ON public.manual_audits;
CREATE TRIGGER set_updated_at_manual_audits
    BEFORE UPDATE ON public.manual_audits
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_automatic_audits ON public.automatic_audits;
CREATE TRIGGER set_updated_at_automatic_audits
    BEFORE UPDATE ON public.automatic_audits
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 8. Enable Row Level Security
ALTER TABLE public.manual_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automatic_audits ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies for manual_audits
CREATE POLICY "Users can view own manual audits"
    ON public.manual_audits FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own manual audits"
    ON public.manual_audits FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own manual audits"
    ON public.manual_audits FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own manual audits"
    ON public.manual_audits FOR DELETE
    USING (auth.uid() = user_id);

-- 10. Create RLS policies for automatic_audits
CREATE POLICY "Users can view own automatic audits"
    ON public.automatic_audits FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own automatic audits"
    ON public.automatic_audits FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own automatic audits"
    ON public.automatic_audits FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own automatic audits"
    ON public.automatic_audits FOR DELETE
    USING (auth.uid() = user_id);

-- 11. Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.manual_audits TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.automatic_audits TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

