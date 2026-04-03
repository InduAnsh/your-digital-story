
-- New tables for internship portfolio

-- 1. Coursework
CREATE TABLE public.coursework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT DEFAULT 'core',
  description TEXT DEFAULT '',
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.coursework ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all select" ON public.coursework FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.coursework FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.coursework FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.coursework FOR DELETE TO anon, authenticated USING (true);

-- 2. Leadership / Activities
CREATE TABLE public.leadership_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL DEFAULT '',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  description TEXT DEFAULT '',
  responsibilities TEXT DEFAULT '',
  accomplishments TEXT DEFAULT '',
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.leadership_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all select" ON public.leadership_activities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.leadership_activities FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.leadership_activities FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.leadership_activities FOR DELETE TO anon, authenticated USING (true);

-- 3. Achievements / Awards
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT DEFAULT '',
  date TEXT DEFAULT '',
  description TEXT DEFAULT '',
  achievement_type TEXT DEFAULT 'award',
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all select" ON public.achievements FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.achievements FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.achievements FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.achievements FOR DELETE TO anon, authenticated USING (true);

-- 4. Technical Highlights (for homepage)
CREATE TABLE public.technical_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.technical_highlights ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all select" ON public.technical_highlights FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.technical_highlights FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.technical_highlights FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.technical_highlights FOR DELETE TO anon, authenticated USING (true);

-- 5. Interests (aerospace/mechanical)
CREATE TABLE public.interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  is_visible BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all select" ON public.interests FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.interests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.interests FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.interests FOR DELETE TO anon, authenticated USING (true);

-- 6. Expand projects table with new fields
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS project_date TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS duration TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS team_size TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS project_context TEXT DEFAULT 'personal',
  ADD COLUMN IF NOT EXISTS my_role TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS engineering_analysis TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS challenges TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS key_metrics JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS is_individual BOOLEAN DEFAULT true;

-- 7. Add "seeking" fields to profile
ALTER TABLE public.profile
  ADD COLUMN IF NOT EXISTS engineering_interests TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS seeking_statement TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS preferred_roles TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS areas_of_interest TEXT[] DEFAULT '{}'::text[];

-- Triggers for updated_at on new tables
CREATE TRIGGER update_coursework_updated_at BEFORE UPDATE ON public.coursework FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leadership_updated_at BEFORE UPDATE ON public.leadership_activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON public.achievements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_highlights_updated_at BEFORE UPDATE ON public.technical_highlights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_interests_updated_at BEFORE UPDATE ON public.interests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
