import { NextRequest } from "next/server";
import {
  getAdminEmails,
  getSupabaseAdminClient,
  getSupabaseAuthVerifyClient,
  hasSupabaseAdminEnv,
} from "@/lib/supabase/admin";

export function getBearerToken(request: NextRequest) {
  const header = request.headers.get("authorization") || "";
  if (!header.toLowerCase().startsWith("bearer ")) {
    return "";
  }

  return header.slice(7).trim();
}

export async function requireAdminAccess(request: NextRequest) {
  if (!hasSupabaseAdminEnv()) {
    return { ok: false as const, status: 503, error: "Admin environment variables are not fully configured." };
  }

  const accessToken = getBearerToken(request);
  if (!accessToken) {
    return { ok: false as const, status: 401, error: "Missing access token." };
  }

  const authClient = getSupabaseAuthVerifyClient();
  const adminClient = getSupabaseAdminClient();

  if (!authClient || !adminClient) {
    return { ok: false as const, status: 503, error: "Supabase admin connection is unavailable." };
  }

  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser(accessToken);

  if (userError || !user) {
    return { ok: false as const, status: 401, error: "Your session has expired. Please sign in again." };
  }

  const adminEmails = getAdminEmails();
  const userEmail = user.email?.toLowerCase() || "";

  if (!adminEmails.length) {
    return { ok: false as const, status: 403, error: "Admin allowlist is empty. Please configure ADMIN_EMAILS." };
  }

  if (!userEmail || !adminEmails.includes(userEmail)) {
    return { ok: false as const, status: 403, error: "This account does not have admin access." };
  }

  return { ok: true as const, adminClient, user };
}
