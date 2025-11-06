-- Create posts table for social media posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  image_url text,
  likes_count integer default 0,
  comments_count integer default 0,
  author_id uuid references public.profiles(id) on delete cascade,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Enable RLS on posts table
alter table public.posts enable row level security;

-- RLS Policies for posts (public read, admin write)
create policy "posts_select_all"
  on public.posts for select
  using (true);

create policy "posts_insert_admin"
  on public.posts for insert
  with check ((select is_admin from public.profiles where id = auth.uid()));

create policy "posts_update_admin"
  on public.posts for update
  using ((select is_admin from public.profiles where id = auth.uid()));

create policy "posts_delete_admin"
  on public.posts for delete
  using ((select is_admin from public.profiles where id = auth.uid()));
