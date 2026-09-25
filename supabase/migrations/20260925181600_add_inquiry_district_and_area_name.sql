alter table public.inquiries
  add column if not exists district text,
  add column if not exists area_name text;

alter table public.inquiries
  drop constraint if exists inquiries_district_length_check;

alter table public.inquiries
  add constraint inquiries_district_length_check
  check (district is null or char_length(trim(district)) between 1 and 80);

alter table public.inquiries
  drop constraint if exists inquiries_area_name_length_check;

alter table public.inquiries
  add constraint inquiries_area_name_length_check
  check (area_name is null or char_length(trim(area_name)) between 1 and 160);

update public.inquiries
set area_name = coalesce(area_name, project_location)
where area_name is null
  and project_location is not null;

update public.inquiries
set district = 'Chattogram',
    area_name = 'Kazirdewy'
where id in (
  select id
  from public.inquiries
  where project_location = 'kazirdewry chittagong'
    and district is null
  limit 1
);

create index if not exists inquiries_district_idx
  on public.inquiries (district);
