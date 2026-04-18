import { createSupabaseAdminClient } from "./skill-sync-lib.mjs";

function requireEnv(name) {
  const value = process.env[name]?.trim() || "";

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function renderList(items, renderItem) {
  if (!items?.length) {
    return "<li>None this week.</li>";
  }

  return items.map((item) => `<li>${renderItem(item)}</li>`).join("");
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml(summary) {
  const syncTotals = summary.sync_totals || { fetched: 0, published: 0, review: 0 };

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h1 style="margin-bottom: 8px;">OpenClaw Weekly Skill Digest</h1>
      <p style="margin-top: 0; color: #6b7280;">Generated at ${escapeHtml(summary.generated_at)}</p>

      <h2>Topline</h2>
      <ul>
        <li>New skill versions: ${summary.new_skill_versions ?? 0}</li>
        <li>Updated workflow packages: ${summary.updated_workflow_packages ?? 0}</li>
        <li>Pending review this week: ${summary.pending_review_count ?? 0}</li>
        <li>Fetched / Published / Review queued: ${syncTotals.fetched} / ${syncTotals.published} / ${syncTotals.review}</li>
      </ul>

      <h2>Sync by Source</h2>
      <ul>
        ${renderList(summary.sync_by_source, (item) =>
          `${escapeHtml(item.source)}: ${item.runs} run(s), fetched ${item.fetched}, published ${item.published}, queued ${item.review}`)}
      </ul>

      <h2>Recently Published Skills</h2>
      <ul>
        ${renderList(summary.recently_published_skills, (item) =>
          `${escapeHtml(item.name)} (${escapeHtml(item.category_slug)} / ${escapeHtml(item.workflow)} / ${escapeHtml(item.source_type)})`)}
      </ul>

      <h2>Most Clicked Skills</h2>
      <ul>
        ${renderList(summary.top_skill_clicks, (item) => `${escapeHtml(item.key)}: ${item.count}`)}
      </ul>

      <h2>Most Downloaded Workflow Packs</h2>
      <ul>
        ${renderList(summary.top_package_downloads, (item) => `${escapeHtml(item.slug)}: ${item.count}`)}
      </ul>
    </div>
  `;
}

function buildEmailText(summary) {
  const syncTotals = summary.sync_totals || { fetched: 0, published: 0, review: 0 };
  const lines = [
    "OpenClaw Weekly Skill Digest",
    `Generated at: ${summary.generated_at}`,
    "",
    `New skill versions: ${summary.new_skill_versions ?? 0}`,
    `Updated workflow packages: ${summary.updated_workflow_packages ?? 0}`,
    `Pending review this week: ${summary.pending_review_count ?? 0}`,
    `Fetched / Published / Review queued: ${syncTotals.fetched} / ${syncTotals.published} / ${syncTotals.review}`,
    "",
    "Sync by source:",
    ...(summary.sync_by_source?.length
      ? summary.sync_by_source.map(
          (item) =>
            `- ${item.source}: ${item.runs} run(s), fetched ${item.fetched}, published ${item.published}, queued ${item.review}`,
        )
      : ["- None this week."]),
    "",
    "Recently published skills:",
    ...(summary.recently_published_skills?.length
      ? summary.recently_published_skills.map(
          (item) => `- ${item.name} (${item.category_slug} / ${item.workflow} / ${item.source_type})`,
        )
      : ["- None this week."]),
    "",
    "Most clicked skills:",
    ...(summary.top_skill_clicks?.length
      ? summary.top_skill_clicks.map((item) => `- ${item.key}: ${item.count}`)
      : ["- None this week."]),
    "",
    "Most downloaded workflow packs:",
    ...(summary.top_package_downloads?.length
      ? summary.top_package_downloads.map((item) => `- ${item.slug}: ${item.count}`)
      : ["- None this week."]),
  ];

  return lines.join("\n");
}

async function loadLatestWeeklyDigest(supabase) {
  const { data, error } = await supabase
    .from("digest_runs")
    .select("id, summary, created_at, completed_at")
    .eq("digest_type", "weekly")
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data?.summary) {
    throw new Error("No completed weekly digest found.");
  }

  return data.summary;
}

async function sendWithResend({ apiKey, from, to, summary }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((item) => item.trim()).filter(Boolean),
      subject: `OpenClaw Weekly Digest · ${new Date(summary.generated_at || Date.now()).toISOString().slice(0, 10)}`,
      html: buildEmailHtml(summary),
      text: buildEmailText(summary),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend email failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function main() {
  const resendApiKey = requireEnv("RESEND_API_KEY");
  const digestEmailTo = requireEnv("DIGEST_EMAIL_TO");
  const digestEmailFrom = requireEnv("DIGEST_EMAIL_FROM");
  const supabase = createSupabaseAdminClient();
  const summary = await loadLatestWeeklyDigest(supabase);
  const result = await sendWithResend({
    apiKey: resendApiKey,
    from: digestEmailFrom,
    to: digestEmailTo,
    summary,
  });

  console.log(JSON.stringify({ ok: true, result }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
