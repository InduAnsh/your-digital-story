-- Drop all existing restrictive policies and add permissive ones for testing
DO $$
DECLARE
  tbl text;
  pol record;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'profile', 'hero_section', 'projects', 'project_media', 'experiences',
    'skills', 'education', 'certifications', 'testimonials', 'social_links',
    'nav_items', 'footer_content', 'site_settings', 'page_sections',
    'seo_metadata', 'contact_messages', 'contact_settings', 'media_assets'
  ])
  LOOP
    FOR pol IN SELECT policyname FROM pg_policies WHERE tablename = tbl AND schemaname = 'public'
    LOOP
      EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, tbl);
    END LOOP;
  END LOOP;
END $$;

CREATE POLICY "Allow all select" ON public.profile FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.profile FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.profile FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.profile FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.hero_section FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.hero_section FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.hero_section FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.hero_section FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.projects FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.projects FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.projects FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.project_media FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.project_media FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.project_media FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.project_media FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.experiences FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.experiences FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.experiences FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.experiences FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.skills FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.skills FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.skills FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.skills FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.education FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.education FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.education FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.education FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.certifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.certifications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.certifications FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.certifications FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.testimonials FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.testimonials FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.testimonials FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.testimonials FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.social_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.social_links FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.social_links FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.social_links FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.nav_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.nav_items FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.nav_items FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.nav_items FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.footer_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.footer_content FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.footer_content FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.footer_content FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.site_settings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.site_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.site_settings FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.page_sections FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.page_sections FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.page_sections FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.page_sections FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.seo_metadata FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.seo_metadata FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.seo_metadata FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.seo_metadata FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.contact_messages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.contact_messages FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.contact_messages FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.contact_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.contact_settings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.contact_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.contact_settings FOR DELETE TO anon, authenticated USING (true);

CREATE POLICY "Allow all select" ON public.media_assets FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow all insert" ON public.media_assets FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Allow all update" ON public.media_assets FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow all delete" ON public.media_assets FOR DELETE TO anon, authenticated USING (true);