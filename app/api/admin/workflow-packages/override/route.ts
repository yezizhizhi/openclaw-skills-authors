import { NextRequest, NextResponse } from "next/server";
import { requireAdminAccess } from "@/lib/admin-auth";
import { refreshWorkflowPackageManifest } from "@/lib/workflow-builder";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const access = await requireAdminAccess(request);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        packageId?: string;
        templateStepId?: string;
        skillVersionId?: string;
      }
    | null;

  const packageId = body?.packageId?.trim() || "";
  const templateStepId = body?.templateStepId?.trim() || "";
  const skillVersionId = body?.skillVersionId?.trim() || "";

  if (!packageId || !templateStepId || !skillVersionId) {
    return NextResponse.json({ error: "Missing packageId, templateStepId, or skillVersionId." }, { status: 400 });
  }

  const { data: skillVersion, error: versionError } = await access.adminClient
    .from("skill_versions")
    .select("id, source_type, source_key, name")
    .eq("id", skillVersionId)
    .maybeSingle();

  if (versionError || !skillVersion) {
    return NextResponse.json({ error: versionError?.message || "Skill version not found." }, { status: 404 });
  }

  const { data: skillRow } = await access.adminClient
    .from("skills")
    .select("id")
    .eq("source_type", skillVersion.source_type)
    .eq("source_key", skillVersion.source_key)
    .maybeSingle();

  const { error: updateError } = await access.adminClient
    .from("workflow_package_skills")
    .update({
      skill_id: skillRow?.id ?? null,
      skill_version_id: skillVersion.id,
      selection_reason: `Manually overridden in admin to use "${skillVersion.name}".`,
      is_primary: true,
    })
    .eq("package_id", packageId)
    .eq("template_step_id", templateStepId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  const manifest = await refreshWorkflowPackageManifest(access.adminClient, packageId);

  return NextResponse.json({
    ok: true,
    manifest,
  });
}
