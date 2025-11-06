-- Create profiles table for user management
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create news categories table
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  color text default '#000000',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create articles table
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  featured_image_url text,
  category_id uuid references public.categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean default false,
  view_count integer default 0,
  published_at timestamp,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create videos table
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  video_url text not null,
  thumbnail_url text,
  category_id uuid references public.categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean default false,
  view_count integer default 0,
  published_at timestamp,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create banners table
create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  link_url text,
  banner_type text default 'featured' check (banner_type in ('featured', 'top-stories', 'trending')),
  position integer,
  active boolean default true,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Create display settings for homepage layouts
create table if not exists public.display_settings (
  id uuid primary key default gen_random_uuid(),
  setting_key text not null unique,
  setting_value jsonb,
  updated_at timestamp default now()
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.articles enable row level security;
alter table public.videos enable row level security;
alter table public.banners enable row level security;
alter table public.display_settings enable row level security;

-- RLS Policies for profiles (only admins can view all, users view own)
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id or (select is_admin from public.profiles where id = auth.uid()));

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- RLS Policies for categories (public read, admin write)
create policy "categories_select_all"
  on public.categories for select
  using (true);

create policy "categories_insert_admin"
  on public.categories for insert
  with check ((select is_admin from public.profiles where id = auth.uid()));

create policy "categories_update_admin"
  on public.categories for update
  using ((select is_admin from public.profiles where id = auth.uid()));

create policy "categories_delete_admin"
  on public.categories for delete
  using ((select is_admin from public.profiles where id = auth.uid()));

-- RLS Policies for articles (public read published, admin crud)
create policy "articles_select_published"
  on public.articles for select
  using (status = 'published' or (select is_admin from public.profiles where id = auth.uid()));

create policy "articles_insert_admin"
  on public.articles for insert
  with check ((select is_admin from public.profiles where id = auth.uid()));

create policy "articles_update_admin"
  on public.articles for update
  using ((select is_admin from public.profiles where id = auth.uid()));

create policy "articles_delete_admin"
  on public.articles for delete
  using ((select is_admin from public.profiles where id = auth.uid()));

-- RLS Policies for videos (public read published, admin crud)
create policy "videos_select_published"
  on public.videos for select
  using (status = 'published' or (select is_admin from public.profiles where id = auth.uid()));

create policy "videos_insert_admin"
  on public.videos for insert
  with check ((select is_admin from public.profiles where id = auth.uid()));

create policy "videos_update_admin"
  on public.videos for update
  using ((select is_admin from public.profiles where id = auth.uid()));

create policy "videos_delete_admin"
  on public.videos for delete
  using ((select is_admin from public.profiles where id = auth.uid()));

-- RLS Policies for banners (public read, admin write)
create policy "banners_select_all"
  on public.banners for select
  using (true);

create policy "banners_insert_admin"
  on public.banners for insert
  with check ((select is_admin from public.profiles where id = auth.uid()));

create policy "banners_update_admin"
  on public.banners for update
  using ((select is_admin from public.profiles where id = auth.uid()));

create policy "banners_delete_admin"
  on public.banners for delete
  using ((select is_admin from public.profiles where id = auth.uid()));

-- RLS Policies for display_settings (public read, admin write)
create policy "display_settings_select_all"
  on public.display_settings for select
  using (true);

create policy "display_settings_update_admin"
  on public.display_settings for update
  using ((select is_admin from public.profiles where id = auth.uid()));
