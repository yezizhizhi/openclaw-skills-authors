import { NextRequest, NextResponse } from "next/server";
import { requireAdminAccess } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const access = await requireAdminAccess(request);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const { data, error } = await access.adminClient
    .from("skill_evaluations")
    .select(`
      id,
      final_score,
      status,
      publish_decision,
      needs_review,
      suggested_category_slug,
      suggested_workflow,
      evaluation_reason,
      evaluated_at,
      skill_versions (
        id,
        name,
        description,
        source_type,
        source_key,
        source_url,
        repository_url,
        category_slug,
        workflow
      )
    `)
    .eq("needs_review", true)
    .order("evaluated_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}
