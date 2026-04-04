import { NextRequest, NextResponse } from "next/server";
import {
  getAdminEmails,
  getSupabaseAdminClient,
  getSupabaseAuthVerifyClient,
  hasSupabaseAdminEnv,
} from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  if (!header.toLowerCase().startsWith("bearer ")) {
    return "";
  }

  return header.slice(7).trim();
}

export async function GET(request: NextRequest) {
  if (!hasSupabaseAdminEnv()) {
    return NextResponse.json(
      { error: "管理员环境变量未配置完成。" },
      { status: 503 },
    );
  }

  const accessToken = getBearerToken(request);
  if (!accessToken) {
    return NextResponse.json({ error: "缺少登录凭证。" }, { status: 401 });
  }

  const authClient = getSupabaseAuthVerifyClient();
  const adminClient = getSupabaseAdminClient();
  if (!authClient || !adminClient) {
    return NextResponse.json({ error: "Supabase 管理连接不可用。" }, { status: 503 });
  }

  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser(accessToken);

  if (userError || !user) {
    return NextResponse.json({ error: "登录状态已失效，请重新登录。" }, { status: 401 });
  }

  const adminEmails = getAdminEmails();
  const userEmail = user.email?.toLowerCase() || "";

  if (!adminEmails.length) {
    return NextResponse.json(
      { error: "后台白名单未配置，请先设置 ADMIN_EMAILS。" },
      { status: 403 },
    );
  }

  if (!userEmail || !adminEmails.includes(userEmail)) {
    return NextResponse.json({ error: "当前账号没有后台查看权限。" }, { status: 403 });
  }

  const { data, error } = await adminClient
    .from("skill_submissions")
    .select("id, skill_link, skill_package, recommendation_reason, submitter_email, submitter_user_id, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ submissions: data ?? [] });
}
