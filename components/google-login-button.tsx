"use client";

import { useMemo, useState } from "react";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

type GoogleLoginButtonProps = {
  label?: string;
  nextPath?: string;
  className?: string;
};

export function GoogleLoginButton({
  label = "使用 Google 登录",
  nextPath = "/",
  className = "primary-button",
}: GoogleLoginButtonProps) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleLogin() {
    if (!supabase || typeof window === "undefined") return;
    setBusy(true);
    setError("");

    const redirectUrl = new URL("/auth/callback", window.location.origin);
    redirectUrl.searchParams.set("next", nextPath);

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl.toString(),
      },
    });

    if (signInError) {
      setError(signInError.message);
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-3">
      <button type="button" onClick={handleGoogleLogin} disabled={busy || !hasSupabaseBrowserEnv()} className={className}>
        {busy ? "正在跳转..." : label}
      </button>
      {error ? <p className="text-sm text-[var(--accent-soft)]">{error}</p> : null}
      {!hasSupabaseBrowserEnv() ? (
        <p className="text-sm text-[var(--accent-soft)]">当前环境还没有配置 Supabase 登录参数。</p>
      ) : null}
    </div>
  );
}
