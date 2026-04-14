import { createSupabaseAdminClient } from "./skill-sync-lib.mjs";

async function main() {
  const supabase = createSupabaseAdminClient();
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    newSkillVersions,
    updatedPackages,
    skillEvents,
    packageEvents,
  ] = await Promise.all([
    supabase.from("skill_versions").select("id, name, source_type, created_at").gte("created_at", weekAgo),
    supabase.from("workflow_packages").select("slug, name, updated_at").gte("updated_at", weekAgo),
    supabase.from("skill_events").select("source_key, event_type").eq("event_type", "source_click").gte("created_at", weekAgo),
    supabase.from("workflow_package_events").select("package_slug, event_type").eq("event_type", "download").gte("created_at", weekAgo),
  ]);

  const summary = {
    generated_at: new Date().toISOString(),
    new_skill_versions: (newSkillVersions.data ?? []).length,
    updated_workflow_packages: (updatedPackages.data ?? []).length,
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
