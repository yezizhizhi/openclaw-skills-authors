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
  source_type text not null default 'manual',
  source_key text,
  source_repository text,
  review_status text not null default 'approved',
  last_synced_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.skills add column if not exists source_type text not null default 'manual';
alter table public.skills add column if not exists source_key text;
alter table public.skills add column if not exists source_repository text;
alter table public.skills add column if not exists review_status text not null default 'approved';
alter table public.skills add column if not exists last_synced_at timestamptz;
alter table public.skills add column if not exists updated_at timestamptz not null default timezone('utc', now());

create table if not exists public.daily_sync_runs (
  id bigint generated always as identity primary key,
  source_type text not null,
  status text not null default 'running',
  started_at timestamptz not null default timezone('utc', now()),
  finished_at timestamptz,
  fetched_count integer not null default 0,
  normalized_count integer not null default 0,
  published_count integer not null default 0,
  review_count integer not null default 0,
  error_summary text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.raw_skills (
  id bigint generated always as identity primary key,
  source_type text not null,
  source_key text not null,
  source_url text,
  repository_url text,
  detected_name text,
  payload jsonb not null default '{}'::jsonb,
  fetch_status text not null default 'fetched',
  sync_run_id bigint references public.daily_sync_runs (id) on delete set null,
  fetched_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  unique (source_type, source_key)
);

create table if not exists public.skill_versions (
  id text primary key,
  raw_skill_id bigint not null references public.raw_skills (id) on delete cascade,
  source_type text not null,
  source_key text not null,
  canonical_slug text not null,
  name text not null,
  description text not null default '',
  author_name text,
  category_slug text references public.categories (slug) on delete set null,
  workflow text not null default '',
  source_url text,
  repository_url text,
  install_mode text not null default 'copy_config',
  primary_action text not null default '查看详情',
  models jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  input_preview text not null default '',
  output_preview text not null default '',
  config_snippet text not null default '',
  version_digest text not null,
  last_seen_at timestamptz not null default timezone('utc', now()),
  is_latest boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.skill_evaluations (
  id bigint generated always as identity primary key,
  skill_version_id text not null references public.skill_versions (id) on delete cascade,
  accessibility_score integer not null default 0,
  installability_score integer not null default 0,
  maintenance_score integer not null default 0,
  workflow_fit_score integer not null default 0,
  compatibility_score integer not null default 0,
  quality_score integer not null default 0,
  final_score integer not null default 0,
  status text not null default 'pending_review',
  publish_decision text not null default 'review',
  needs_review boolean not null default true,
  suggested_category_slug text references public.categories (slug) on delete set null,
  suggested_workflow text,
  evaluation_reason text not null default '',
  reasons jsonb not null default '[]'::jsonb,
  evaluated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workflow_templates (
  id text primary key,
  slug text not null unique,
  name text not null,
  category_slug text not null references public.categories (slug) on delete cascade,
  audience text not null default '',
  goal text not null default '',
  description text not null default '',
  status text not null default 'draft',
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workflow_template_steps (
  id text primary key,
  template_id text not null references public.workflow_templates (id) on delete cascade,
  step_key text not null,
  step_name text not null,
  step_description text not null default '',
  sort_order integer not null default 0,
  is_required boolean not null default true,
  input_contract jsonb not null default '{}'::jsonb,
  output_contract jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  unique (template_id, step_key)
);

create table if not exists public.workflow_step_skill_rules (
  id bigint generated always as identity primary key,
  template_step_id text not null references public.workflow_template_steps (id) on delete cascade,
  required_tags jsonb not null default '[]'::jsonb,
  preferred_tags jsonb not null default '[]'::jsonb,
  blocked_tags jsonb not null default '[]'::jsonb,
  required_install_modes jsonb not null default '[]'::jsonb,
  min_final_score integer not null default 70,
  allowed_source_types jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workflow_packages (
  id text primary key,
  template_id text not null references public.workflow_templates (id) on delete cascade,
  slug text not null unique,
  name text not null,
  version text not null,
  description text not null default '',
  status text not null default 'draft',
  build_source text not null default 'manual',
  manifest_json jsonb not null default '{}'::jsonb,
  zip_path text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  published_at timestamptz
);

create table if not exists public.workflow_package_skills (
  id bigint generated always as identity primary key,
  package_id text not null references public.workflow_packages (id) on delete cascade,
  template_step_id text not null references public.workflow_template_steps (id) on delete cascade,
  skill_id text references public.skills (id) on delete set null,
  skill_version_id text references public.skill_versions (id) on delete set null,
  selection_reason text not null default '',
  is_primary boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  unique (package_id, template_step_id, sort_order)
);

create table if not exists public.skill_events (
  id bigint generated always as identity primary key,
  skill_id text references public.skills (id) on delete set null,
  skill_version_id text references public.skill_versions (id) on delete set null,
  event_type text not null,
  source_type text,
  source_key text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.workflow_package_events (
  id bigint generated always as identity primary key,
  package_id text references public.workflow_packages (id) on delete set null,
  package_slug text,
  event_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.digest_runs (
  id bigint generated always as identity primary key,
  digest_type text not null,
  status text not null default 'running',
  summary jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default timezone('utc', now()),
  completed_at timestamptz
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

create table if not exists public.skill_submissions (
  id bigint generated always as identity primary key,
  skill_link text,
  skill_package text,
  recommendation_reason text not null,
  submitter_email text,
  submitter_user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  check (
    coalesce(nullif(trim(skill_link), ''), nullif(trim(skill_package), '')) is not null
  )
);

create index if not exists scenarios_category_slug_sort_order_idx
  on public.scenarios (category_slug, sort_order);

create index if not exists skills_category_slug_sort_order_idx
  on public.skills (category_slug, sort_order);

create unique index if not exists skills_source_type_source_key_idx
  on public.skills (source_type, source_key)
  where source_key is not null;

create index if not exists skills_review_status_idx
  on public.skills (review_status, category_slug);

create index if not exists raw_skills_sync_run_id_idx
  on public.raw_skills (sync_run_id, fetched_at desc);

create index if not exists skill_versions_source_idx
  on public.skill_versions (source_type, source_key, is_latest);

create index if not exists skill_versions_category_slug_idx
  on public.skill_versions (category_slug, workflow);

create index if not exists skill_evaluations_status_idx
  on public.skill_evaluations (status, needs_review, evaluated_at desc);

create index if not exists skill_evaluations_skill_version_id_idx
  on public.skill_evaluations (skill_version_id, evaluated_at desc);

create index if not exists daily_sync_runs_source_status_idx
  on public.daily_sync_runs (source_type, status, started_at desc);

create index if not exists workflow_templates_category_status_idx
  on public.workflow_templates (category_slug, status, sort_order);

create index if not exists workflow_template_steps_template_sort_idx
  on public.workflow_template_steps (template_id, sort_order);

create index if not exists workflow_packages_template_status_idx
  on public.workflow_packages (template_id, status, updated_at desc);

create index if not exists workflow_package_skills_package_sort_idx
  on public.workflow_package_skills (package_id, sort_order);

create index if not exists skill_events_event_type_created_at_idx
  on public.skill_events (event_type, created_at desc);

create index if not exists workflow_package_events_event_type_created_at_idx
  on public.workflow_package_events (event_type, created_at desc);

create index if not exists digest_runs_digest_type_created_at_idx
  on public.digest_runs (digest_type, created_at desc);

create index if not exists skill_scenarios_scenario_id_idx
  on public.skill_scenarios (scenario_id, sort_order);

create index if not exists skill_submissions_created_at_idx
  on public.skill_submissions (created_at desc);

create index if not exists skill_submissions_submitter_user_id_idx
  on public.skill_submissions (submitter_user_id);

alter table public.categories enable row level security;
alter table public.scenarios enable row level security;
alter table public.scenario_aliases enable row level security;
alter table public.skills enable row level security;
alter table public.skill_scenarios enable row level security;
alter table public.skill_submissions enable row level security;
alter table public.daily_sync_runs enable row level security;
alter table public.raw_skills enable row level security;
alter table public.skill_versions enable row level security;
alter table public.skill_evaluations enable row level security;
alter table public.workflow_templates enable row level security;
alter table public.workflow_template_steps enable row level security;
alter table public.workflow_step_skill_rules enable row level security;
alter table public.workflow_packages enable row level security;
alter table public.workflow_package_skills enable row level security;
alter table public.skill_events enable row level security;
alter table public.workflow_package_events enable row level security;
alter table public.digest_runs enable row level security;

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

drop policy if exists "Users insert own skill submissions" on public.skill_submissions;
create policy "Users insert own skill submissions"
  on public.skill_submissions
  for insert
  to authenticated
  with check (auth.uid() = submitter_user_id);

drop policy if exists "Users read own skill submissions" on public.skill_submissions;
create policy "Users read own skill submissions"
  on public.skill_submissions
  for select
  to authenticated
  using (auth.uid() = submitter_user_id);

drop policy if exists "Public read workflow templates" on public.workflow_templates;
create policy "Public read workflow templates"
  on public.workflow_templates
  for select
  using (true);

drop policy if exists "Public read workflow template steps" on public.workflow_template_steps;
create policy "Public read workflow template steps"
  on public.workflow_template_steps
  for select
  using (true);

drop policy if exists "Public read workflow step skill rules" on public.workflow_step_skill_rules;
create policy "Public read workflow step skill rules"
  on public.workflow_step_skill_rules
  for select
  using (true);

drop policy if exists "Public read workflow packages" on public.workflow_packages;
create policy "Public read workflow packages"
  on public.workflow_packages
  for select
  using (true);

drop policy if exists "Public read workflow package skills" on public.workflow_package_skills;
create policy "Public read workflow package skills"
  on public.workflow_package_skills
  for select
  using (true);

drop policy if exists "Public insert skill events" on public.skill_events;
create policy "Public insert skill events"
  on public.skill_events
  for insert
  with check (true);

drop policy if exists "Public insert workflow package events" on public.workflow_package_events;
create policy "Public insert workflow package events"
  on public.workflow_package_events
  for insert
  with check (true);
