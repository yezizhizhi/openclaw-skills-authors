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

create index if not exists skill_submissions_created_at_idx
  on public.skill_submissions (created_at desc);

create index if not exists skill_submissions_submitter_user_id_idx
  on public.skill_submissions (submitter_user_id);

alter table public.skill_submissions enable row level security;

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
