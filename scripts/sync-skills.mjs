import { discoverClawHubSkills } from "./sync-clawhub.mjs";
import { discoverGitHubSkills } from "./sync-github-skills.mjs";
import {
  buildRawSkillPayload,
  createSupabaseAdminClient,
  evaluateSkillWithSignals,
  normalizeSkillRecord,
  persistEvaluation,
  publishSkill,
  refineSkillWithAI,
  upsertLatestSkillVersion,
} from "./skill-sync-lib.mjs";

const supportedSources = {
  clawhub: discoverClawHubSkills,
  github: discoverGitHubSkills,
};

function formatError(error) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object") {
    try {
      return JSON.stringify(error);
    } catch {
      return "Unknown sync failure";
    }
  }

  return String(error || "Unknown sync failure");
}

function getSelectedSources() {
  const raw = process.env.SKILL_SYNC_SOURCES?.trim() || "clawhub,github";
  return raw
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter((value) => supportedSources[value]);
}

async function createSyncRun(supabase, sourceType) {
  const { data, error } = await supabase
    .from("daily_sync_runs")
    .insert({
      source_type: sourceType,
      status: "running",
      metadata: {
        trigger: "manual_or_cron",
      },
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}

async function finishSyncRun(supabase, syncRunId, payload) {
  const { error } = await supabase
    .from("daily_sync_runs")
    .update({
      ...payload,
      finished_at: new Date().toISOString(),
    })
    .eq("id", syncRunId);

  if (error) {
    throw error;
  }
}

async function persistRawSkill(supabase, sourceType, item, syncRunId) {
  const { data, error } = await supabase
    .from("raw_skills")
    .upsert(buildRawSkillPayload(sourceType, item, syncRunId), { onConflict: "source_type,source_key" })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data.id;
}

async function processSource(supabase, sourceType) {
  const syncRunId = await createSyncRun(supabase, sourceType);
  const summary = {
    fetched_count: 0,
    normalized_count: 0,
    published_count: 0,
    review_count: 0,
  };

  try {
    const discovered = await supportedSources[sourceType]();
    summary.fetched_count = discovered.length;

    for (const item of discovered) {
      const rawSkillId = await persistRawSkill(supabase, sourceType, item, syncRunId);
      const baseNormalized = normalizeSkillRecord(item);
      const { normalizedRecord: normalized, aiAssessment } = await refineSkillWithAI(item, baseNormalized);
      summary.normalized_count += 1;

      const versionId = await upsertLatestSkillVersion(supabase, rawSkillId, normalized);
      const evaluation = evaluateSkillWithSignals(normalized, aiAssessment);
      await persistEvaluation(supabase, versionId, evaluation, normalized);

      if (evaluation.needsReview) {
        summary.review_count += 1;
      }

      const publishedSkillId = await publishSkill(supabase, normalized, evaluation);
      if (publishedSkillId) {
        summary.published_count += 1;
      }
    }

    await finishSyncRun(supabase, syncRunId, {
      ...summary,
      status: "completed",
    });

    return { sourceType, ...summary };
  } catch (error) {
    await finishSyncRun(supabase, syncRunId, {
      ...summary,
      status: "failed",
      error_summary: formatError(error),
    });
    throw error;
  }
}

async function main() {
  const supabase = createSupabaseAdminClient();
  const sources = getSelectedSources();
  const results = [];
  const errors = [];

  for (const sourceType of sources) {
    try {
      const result = await processSource(supabase, sourceType);
      results.push(result);
    } catch (error) {
      errors.push({
        sourceType,
        error: formatError(error),
      });
    }
  }

  console.log(JSON.stringify({ ok: errors.length === 0, results, errors }, null, 2));

  if (!results.length && errors.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
