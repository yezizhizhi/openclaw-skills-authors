import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        skillId?: string;
        skillVersionId?: string;
        sourceType?: string;
        sourceKey?: string;
        eventType?: string;
        metadata?: Record<string, unknown>;
      }
    | null;

  const eventType = body?.eventType?.trim() || "";
  if (!eventType) {
    return NextResponse.json({ error: "Missing eventType." }, { status: 400 });
  }

  const { error } = await supabase.from("skill_events").insert({
    skill_id: body?.skillId?.trim() || null,
    skill_version_id: body?.skillVersionId?.trim() || null,
    source_type: body?.sourceType?.trim() || null,
    source_key: body?.sourceKey?.trim() || null,
    event_type: eventType,
    metadata: body?.metadata || {},
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
