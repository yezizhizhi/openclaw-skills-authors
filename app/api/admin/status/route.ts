import { NextRequest, NextResponse } from "next/server";
import { getAdminEmails, getSupabaseAuthVerifyClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  if (!header.toLowerCase().startsWith("bearer ")) {
    return "";
  }

  return header.slice(7).trim();
}

export async function GET(request: NextRequest) {
  const accessToken = getBearerToken(request);
  if (!accessToken) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  const authClient = getSupabaseAuthVerifyClient();
  if (!authClient) {
    return NextResponse.json({ isAdmin: false }, { status: 503 });
  }

  const {
    data: { user },
  } = await authClient.auth.getUser(accessToken);

  const userEmail = user?.email?.toLowerCase() || "";
  const isAdmin = Boolean(userEmail && getAdminEmails().includes(userEmail));

  return NextResponse.json({ isAdmin });
}
