"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

type GoogleLoginButtonProps = {
  label?: string;
  nextPath?: string;
  className?: string;
};

export function GoogleLoginButton({
  label,
  nextPath = "/",
  className = "primary-button",
}: GoogleLoginButtonProps) {
  const { translations } = useLanguage();
  const authTranslations = translations.auth;
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
        {busy ? authTranslations.googleRedirecting : label || authTranslations.googleLogin}
      </button>
      {error ? <p className="text-sm text-[var(--accent-soft)]">{error}</p> : null}
      {!hasSupabaseBrowserEnv() ? (
        <p className="text-sm text-[var(--accent-soft)]">{authTranslations.missingEnv}</p>
      ) : null}
    </div>
  );
}
