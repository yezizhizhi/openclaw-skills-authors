create table if not exists public.categories (
  slug text primary key,
  label text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.scenarios (
  id text primary key,
  category_slug text not null references public.categories (slug) on delete cascade,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  unique (category_slug, name)
);

create table if not exists public.scenario_aliases (
  id bigint generated always as identity primary key,
  scenario_id text not null references public.scenarios (id) on delete cascade,
  alias text not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (scenario_id, alias)
);

create table if not exists public.skills (
  id text primary key,
  category_slug text not null references public.categories (slug) on delete cascade,
  name text not null,
  workflow text not null,
  description text not null,
  source_url text,
  install_mode text not null default 'copy_config',
  primary_action text not null default '查看详情',
  badge text,
  models jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  input_preview text not null default '',
  output_preview text not null default '',
  config_snippet text not null default '',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.skill_scenarios (
  id bigint generated always as identity primary key,
  skill_id text not null references public.skills (id) on delete cascade,
  scenario_id text not null references public.scenarios (id) on delete cascade,
  sort_order integer not null default 0,
  relevance_score integer not null default 100,
  created_at timestamptz not null default timezone('utc', now()),
  unique (skill_id, scenario_id)
);

create index if not exists scenarios_category_slug_sort_order_idx
  on public.scenarios (category_slug, sort_order);

create index if not exists skills_category_slug_sort_order_idx
  on public.skills (category_slug, sort_order);

create index if not exists skill_scenarios_scenario_id_idx
  on public.skill_scenarios (scenario_id, sort_order);

alter table public.categories enable row level security;
alter table public.scenarios enable row level security;
alter table public.scenario_aliases enable row level security;
alter table public.skills enable row level security;
alter table public.skill_scenarios enable row level security;

drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories"
  on public.categories
  for select
  using (true);

drop policy if exists "Public read scenarios" on public.scenarios;
create policy "Public read scenarios"
  on public.scenarios
  for select
  using (true);

drop policy if exists "Public read scenario aliases" on public.scenario_aliases;
create policy "Public read scenario aliases"
  on public.scenario_aliases
  for select
  using (true);

drop policy if exists "Public read skills" on public.skills;
create policy "Public read skills"
  on public.skills
  for select
  using (true);

drop policy if exists "Public read skill scenarios" on public.skill_scenarios;
create policy "Public read skill scenarios"
  on public.skill_scenarios
  for select
  using (true);
