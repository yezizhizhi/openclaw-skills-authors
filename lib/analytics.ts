import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function getWeeklyDigestSummary() {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return null;
  }

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [skillsCount, packagesCount, skillClicks, packageDownloads] = await Promise.all([
    supabase.from("skill_versions").select("*", { count: "exact", head: true }).gte("created_at", weekAgo),
    supabase.from("workflow_packages").select("*", { count: "exact", head: true }).gte("updated_at", weekAgo),
    supabase
      .from("skill_events")
      .select("source_key, event_type", { count: "exact" })
      .eq("event_type", "source_click")
      .gte("created_at", weekAgo),
    supabase
      .from("workflow_package_events")
      .select("package_slug, event_type", { count: "exact" })
      .eq("event_type", "download")
      .gte("created_at", weekAgo),
  ]);

  const clickSummary = new Map<string, number>();
  for (const row of skillClicks.data ?? []) {
    const key = row.source_key || "unknown";
    clickSummary.set(key, (clickSummary.get(key) ?? 0) + 1);
  }

  const downloadSummary = new Map<string, number>();
  for (const row of packageDownloads.data ?? []) {
    const key = row.package_slug || "unknown";
    downloadSummary.set(key, (downloadSummary.get(key) ?? 0) + 1);
  }

  return {
    generated_at: new Date().toISOString(),
    new_skill_versions: skillsCount.count ?? 0,
    updated_workflow_packages: packagesCount.count ?? 0,
    top_skill_clicks: Array.from(clickSummary.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, count]) => ({ key, count })),
    top_package_downloads: Array.from(downloadSummary.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([slug, count]) => ({ slug, count })),
  };
}
