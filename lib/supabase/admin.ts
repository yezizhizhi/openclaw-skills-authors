import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedAdminClient: SupabaseClient | null = null;
let cachedAuthClient: SupabaseClient | null = null;

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
}

function getSupabasePublishableKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim() ||
    ""
  );
}

function getSupabaseServiceKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";
}

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS?.trim() || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function hasSupabaseAdminEnv() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey() && getSupabaseServiceKey());
}

export function getSupabaseAuthVerifyClient() {
  if (!getSupabaseUrl() || !getSupabasePublishableKey()) {
    return null;
  }

  if (cachedAuthClient) {
    return cachedAuthClient;
  }

  cachedAuthClient = createClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return cachedAuthClient;
}

export function getSupabaseAdminClient() {
  if (!hasSupabaseAdminEnv()) {
    return null;
  }

  if (cachedAdminClient) {
    return cachedAdminClient;
  }

  cachedAdminClient = createClient(getSupabaseUrl(), getSupabaseServiceKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return cachedAdminClient;
}
