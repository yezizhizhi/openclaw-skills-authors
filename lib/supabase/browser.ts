"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

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

export function hasSupabaseBrowserEnv() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
}

export function getSupabaseBrowserClient() {
  if (!hasSupabaseBrowserEnv()) {
    return null;
  }

  if (browserClient) {
    return browserClient;
  }

  browserClient = createClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  return browserClient;
}
