# Phase 1 Sync Setup

## 1. Apply the database schema

Open your Supabase project SQL editor and run:

- [`supabase/schema.sql`](/Users/shufanxyzr/codebase/ainenglishnamegen/openclaw-skills-authors/supabase/schema.sql)

This adds the phase-1 ingestion tables:

- `daily_sync_runs`
- `raw_skills`
- `skill_versions`
- `skill_evaluations`

It also extends `skills` with:

- `source_type`
- `source_key`
- `source_repository`
- `review_status`
- `last_synced_at`
- `updated_at`

## 2. Fill local environment variables

Update `.env.local` with real values for:

- `SUPABASE_SERVICE_ROLE_KEY`
- `CLAWHUB_SEED_URLS`
- `GITHUB_SKILL_REPOS`
- `GITHUB_TOKEN` if you expect higher GitHub API usage

## 3. Run the first sync locally

```bash
npm run sync:skills
```

After a successful run, check these tables in Supabase:

- `daily_sync_runs`
- `raw_skills`
- `skill_versions`
- `skill_evaluations`
- `skills`

## 4. Enable daily automation

This repo includes:

- [`.github/workflows/daily-skill-sync.yml`](/Users/shufanxyzr/codebase/ainenglishnamegen/openclaw-skills-authors/.github/workflows/daily-skill-sync.yml)

The workflow runs every day at `01:00 UTC`, which is `09:00` China Standard Time (`UTC+8`).

Add these GitHub Actions secrets in the repository settings:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SKILL_SYNC_SOURCES`
- `CLAWHUB_SEED_URLS`
- `GITHUB_SKILL_REPOS`
- `GITHUB_TOKEN`

Recommended values:

- `SKILL_SYNC_SOURCES=clawhub,github`
- `CLAWHUB_SEED_URLS=https://www.clawauthor.com,https://clawhub.ai/mvanhorn/last30days-official`
- `GITHUB_SKILL_REPOS=vercel-labs/skills,numman-ali/n-skills`

## Current blocker

This workspace does not currently contain a real `SUPABASE_SERVICE_ROLE_KEY`, so schema apply and the first write-enabled sync still need that credential before they can be executed.
