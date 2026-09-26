alter table public.inquiries replica identity full;
alter publication supabase_realtime add table public.inquiries;
