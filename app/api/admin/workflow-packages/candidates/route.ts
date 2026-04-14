import { NextRequest, NextResponse } from "next/server";
import { requireAdminAccess } from "@/lib/admin-auth";
import { workflowTemplateDefinitions } from "@/lib/workflow-builder";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const access = await requireAdminAccess(request);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const packageId = request.nextUrl.searchParams.get("packageId") || "";
  const templateStepId = request.nextUrl.searchParams.get("templateStepId") || "";

  if (!packageId || !templateStepId) {
    return NextResponse.json({ error: "Missing packageId or templateStepId." }, { status: 400 });
  }

  const { data: packageRow, error: packageError } = await access.adminClient
    .from("workflow_packages")
    .select("id, template_id")
    .eq("id", packageId)
    .maybeSingle();

  if (packageError || !packageRow) {
    return NextResponse.json({ error: packageError?.message || "Workflow package not found." }, { status: 404 });
  }

  const template = workflowTemplateDefinitions.find((item) => item.id === packageRow.template_id);
  const step = template?.steps.find((item) => item.id === templateStepId);

  if (!template || !step) {
    return NextResponse.json({ error: "Workflow step definition not found." }, { status: 404 });
  }

  const { data, error } = await access.adminClient
    .from("skill_evaluations")
    .select(`
      final_score,
      skill_version_id,
      skill_versions (
        id,
        name,
        description,
        source_type,
        source_key,
        category_slug,
        workflow,
        source_url,
        tags
      )
    `)
    .eq("publish_decision", "publish")
    .eq("status", "approved")
    .eq("needs_review", false)
    .order("final_score", { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const candidates = (data ?? [])
    .map((row) => {
      const version = Array.isArray(row.skill_versions) ? row.skill_versions[0] : row.skill_versions;
      if (!version?.id) {
        return null;
      }

      const tags = Array.isArray(version.tags) ? version.tags.map(String) : [];
      const haystack = [
        version.name,
        version.description,
        version.workflow,
        ...tags,
        version.category_slug,
      ].filter(Boolean).join(" ").toLowerCase();

      const blocked = step.rules.blockedTags.some((tag) => haystack.includes(tag.toLowerCase()));
      const preferredHits = step.rules.preferredTags.filter((tag) => haystack.includes(tag.toLowerCase())).length;

      if (blocked) {
        return null;
      }

      if (row.final_score < step.rules.minFinalScore) {
        return null;
      }

      return {
        skillVersionId: version.id,
        name: version.name,
        description: version.description,
        sourceType: version.source_type,
        sourceUrl: version.source_url,
        categorySlug: version.category_slug,
        workflow: version.workflow,
        finalScore: row.final_score,
        preferredHits,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((left, right) => {
      if (left.preferredHits !== right.preferredHits) {
        return right.preferredHits - left.preferredHits;
      }
      return right.finalScore - left.finalScore;
    });

  return NextResponse.json({
    packageId,
    templateStepId,
    stepName: step.stepName,
    candidates,
  });
}
