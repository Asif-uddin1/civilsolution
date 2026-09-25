create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  job_title text not null default 'Administrator',
  phone text not null default '',
  avatar_url text not null default '',
  updated_at timestamptz not null default timezone('utc'::text, now())
);

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references auth.users(id) on delete cascade,
  actor_email text not null default '',
  action text not null check (action = any (array[
    'login'::text,
    'logout'::text,
    'profile_updated'::text,
    'inquiry_status_updated'::text,
    'career_created'::text,
    'career_updated'::text,
    'career_deleted'::text,
    'inquiries_exported'::text
  ])),
  entity_type text not null default 'system',
  entity_id text,
  summary text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.admin_profiles enable row level security;
alter table public.admin_audit_logs enable row level security;

drop policy if exists admin_profiles_select_own on public.admin_profiles;
create policy admin_profiles_select_own on public.admin_profiles
  for select to authenticated
  using (auth.uid() = id and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists admin_profiles_insert_own on public.admin_profiles;
create policy admin_profiles_insert_own on public.admin_profiles
  for insert to authenticated
  with check (auth.uid() = id and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists admin_profiles_update_own on public.admin_profiles;
create policy admin_profiles_update_own on public.admin_profiles
  for update to authenticated
  using (auth.uid() = id and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check (auth.uid() = id and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists admin_audit_logs_select_admin on public.admin_audit_logs;
create policy admin_audit_logs_select_admin on public.admin_audit_logs
  for select to authenticated
  using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists admin_audit_logs_insert_admin on public.admin_audit_logs;
create policy admin_audit_logs_insert_admin on public.admin_audit_logs
  for insert to authenticated
  with check (actor_id = auth.uid() and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create index if not exists admin_audit_logs_created_at_idx on public.admin_audit_logs (created_at desc);
create index if not exists admin_audit_logs_actor_id_idx on public.admin_audit_logs (actor_id);
