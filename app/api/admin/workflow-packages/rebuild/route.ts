import { NextRequest, NextResponse } from "next/server";
import { requireAdminAccess } from "@/lib/admin-auth";
import { buildWorkflowPackages, seedWorkflowTemplates } from "@/lib/workflow-builder";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const access = await requireAdminAccess(request);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  try {
    await seedWorkflowTemplates(access.adminClient);
    const results = await buildWorkflowPackages(access.adminClient);
    return NextResponse.json({ ok: true, results });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to rebuild workflow packages.",
      },
      { status: 500 },
    );
  }
}
