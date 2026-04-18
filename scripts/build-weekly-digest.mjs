import { createSupabaseAdminClient } from "./skill-sync-lib.mjs";

async function main() {
  const supabase = createSupabaseAdminClient();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    newSkillVersions,
    updatedPackages,
    skillEvents,
    packageEvents,
    syncRuns,
    pendingReviewCount,
    recentlyPublished,
  ] = await Promise.all([
    supabase.from("skill_versions").select("id, name, source_type, created_at").gte("created_at", weekAgo),
    supabase.from("workflow_packages").select("slug, name, updated_at").gte("updated_at", weekAgo),
    supabase.from("skill_events").select("source_key, event_type").eq("event_type", "source_click").gte("created_at", weekAgo),
    supabase.from("workflow_package_events").select("package_slug, event_type").eq("event_type", "download").gte("created_at", weekAgo),
    supabase
      .from("daily_sync_runs")
      .select("source_type, status, fetched_count, published_count, review_count, created_at")
      .gte("created_at", weekAgo)
      .order("created_at", { ascending: false }),
    supabase
      .from("skill_evaluations")
      .select("*", { count: "exact", head: true })
      .eq("needs_review", true)
      .gte("evaluated_at", weekAgo),
    supabase
      .from("skills")
      .select("id, name, category_slug, workflow, source_type, last_synced_at")
      .eq("is_published", true)
      .gte("last_synced_at", weekAgo)
      .order("last_synced_at", { ascending: false })
      .limit(8),
  ]);

  const summary = {
    generated_at: new Date().toISOString(),
    new_skill_versions: (newSkillVersions.data ?? []).length,
    updated_workflow_packages: (updatedPackages.data ?? []).length,
    pending_review_count: pendingReviewCount.count ?? 0,
    sync_totals: (syncRuns.data ?? []).reduce((acc, item) => {
      acc.fetched += item.fetched_count || 0;
      acc.published += item.published_count || 0;
      acc.review += item.review_count || 0;
      return acc;
    }, { fetched: 0, published: 0, review: 0 }),
    sync_by_source: Object.entries(
      (syncRuns.data ?? []).reduce((acc, item) => {
        const key = item.source_type || "unknown";
        if (!acc[key]) {
          acc[key] = { runs: 0, fetched: 0, published: 0, review: 0 };
        }
        acc[key].runs += 1;
        acc[key].fetched += item.fetched_count || 0;
        acc[key].published += item.published_count || 0;
        acc[key].review += item.review_count || 0;
        return acc;
      }, {}),
    ).map(([source, values]) => ({ source, ...values })),
    recently_published_skills: (recentlyPublished.data ?? []).map((item) => ({
      id: item.id,
      name: item.name,
      category_slug: item.category_slug,
      workflow: item.workflow,
      source_type: item.source_type,
      last_synced_at: item.last_synced_at,
    })),
    top_skill_clicks: Object.entries(
      (skillEvents.data ?? []).reduce((acc, item) => {
        const key = item.source_key || "unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    )
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .slice(0, 5)
      .map(([key, count]) => ({ key, count })),
    top_package_downloads: Object.entries(
      (packageEvents.data ?? []).reduce((acc, item) => {
        const key = item.package_slug || "unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    )
      .sort((a, b) => Number(b[1]) - Number(a[1]))
      .slice(0, 5)
      .map(([slug, count]) => ({ slug, count })),
  };

  const { error } = await supabase.from("digest_runs").insert({
    digest_type: "weekly",
    status: "completed",
    summary,
    completed_at: new Date().toISOString(),
  });

  if (error) {
    throw error;
  }

  console.log(JSON.stringify({ ok: true, summary }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
