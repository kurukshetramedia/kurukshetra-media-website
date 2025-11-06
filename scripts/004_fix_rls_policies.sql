-- Drop problematic policies that cause infinite recursion
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "categories_insert_admin" ON public.categories;
DROP POLICY IF EXISTS "categories_update_admin" ON public.categories;
DROP POLICY IF EXISTS "categories_delete_admin" ON public.categories;
DROP POLICY IF EXISTS "articles_select_published" ON public.articles;
DROP POLICY IF EXISTS "articles_insert_admin" ON public.articles;
DROP POLICY IF EXISTS "articles_update_admin" ON public.articles;
DROP POLICY IF EXISTS "articles_delete_admin" ON public.articles;
DROP POLICY IF EXISTS "videos_select_published" ON public.videos;
DROP POLICY IF EXISTS "videos_insert_admin" ON public.videos;
DROP POLICY IF EXISTS "videos_update_admin" ON public.videos;
DROP POLICY IF EXISTS "videos_delete_admin" ON public.videos;
DROP POLICY IF EXISTS "banners_insert_admin" ON public.banners;
DROP POLICY IF EXISTS "banners_update_admin" ON public.banners;
DROP POLICY IF EXISTS "banners_delete_admin" ON public.banners;
DROP POLICY IF EXISTS "display_settings_update_admin" ON public.display_settings;

-- Add auth.jwt() clause column to profiles table to cache admin status
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS auth_role text DEFAULT 'user';

-- Recreate simpler policies without recursion

-- RLS Policies for profiles
CREATE POLICY "profiles_select_authenticated"
  ON public.profiles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "profiles_update_self"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "categories_select_all_public"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "categories_admin_write"
  ON public.categories FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

CREATE POLICY "categories_admin_update"
  ON public.categories FOR UPDATE
  USING (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

CREATE POLICY "categories_admin_delete"
  ON public.categories FOR DELETE
  USING (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

-- RLS Policies for articles (public read published, authenticated write)
CREATE POLICY "articles_select_published"
  ON public.articles FOR SELECT
  USING (status = 'published' OR (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL));

CREATE POLICY "articles_insert_authenticated"
  ON public.articles FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

CREATE POLICY "articles_update_authenticated"
  ON public.articles FOR UPDATE
  USING (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

CREATE POLICY "articles_delete_authenticated"
  ON public.articles FOR DELETE
  USING (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

-- RLS Policies for videos (public read published, authenticated write)
CREATE POLICY "videos_select_published"
  ON public.videos FOR SELECT
  USING (status = 'published' OR (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL));

CREATE POLICY "videos_insert_authenticated"
  ON public.videos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

CREATE POLICY "videos_update_authenticated"
  ON public.videos FOR UPDATE
  USING (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

CREATE POLICY "videos_delete_authenticated"
  ON public.videos FOR DELETE
  USING (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

-- RLS Policies for banners (public read, authenticated write)
CREATE POLICY "banners_select_all_public"
  ON public.banners FOR SELECT
  USING (true);

CREATE POLICY "banners_insert_authenticated"
  ON public.banners FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

CREATE POLICY "banners_update_authenticated"
  ON public.banners FOR UPDATE
  USING (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

CREATE POLICY "banners_delete_authenticated"
  ON public.banners FOR DELETE
  USING (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);

-- RLS Policies for display_settings (public read, authenticated write)
CREATE POLICY "display_settings_select_all_public"
  ON public.display_settings FOR SELECT
  USING (true);

CREATE POLICY "display_settings_update_authenticated"
  ON public.display_settings FOR UPDATE
  USING (auth.role() = 'authenticated' AND auth.uid() IS NOT NULL);
