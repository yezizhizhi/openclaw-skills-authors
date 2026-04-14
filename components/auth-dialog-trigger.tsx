"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { GoogleLoginButton } from "@/components/google-login-button";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

type AuthDialogTriggerProps = {
  label?: string;
  className?: string;
};

export function AuthDialogTrigger({
  label,
  className = "header-nav-link",
}: AuthDialogTriggerProps) {
  const { translations } = useLanguage();
  const authTranslations = translations.auth;
  const headerTranslations = translations.header;
  const pathname = usePathname() || "/";
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  async function handleEmailLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;

    setBusy(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setBusy(false);
      return;
    }

    setBusy(false);
    setOpen(false);
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {label || headerTranslations.login}
      </button>

      {open ? (
        <div className="auth-modal-backdrop" role="dialog" aria-modal="true" aria-label={authTranslations.dialogAria}>
          <div className="auth-modal-shell" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="auth-modal-close"
              aria-label={authTranslations.close}
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            <p className="auth-modal-kicker">{authTranslations.kicker}</p>
            <h2 className="auth-modal-title">{authTranslations.title}</h2>
            <p className="auth-modal-copy">{authTranslations.copy}</p>

            <form className="mt-8 grid gap-4" onSubmit={handleEmailLogin}>
              <label className="grid gap-3 text-left">
                <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">
                  {translations.auth.emailLabel}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="submission-input"
                  placeholder={translations.auth.emailPlaceholder}
                  autoComplete="email"
                  required
                />
              </label>

              <label className="grid gap-3 text-left">
                <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">
                  {translations.auth.passwordLabel}
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="submission-input"
                  placeholder={translations.auth.passwordPlaceholder}
                  autoComplete="current-password"
                  required
                />
              </label>

              <button type="submit" className="secondary-button w-full" disabled={busy || !hasSupabaseBrowserEnv()}>
                {busy ? authTranslations.loggingIn : authTranslations.emailLogin}
              </button>
            </form>

            <div className="auth-modal-divider">
              <span>{authTranslations.divider}</span>
            </div>

            <div>
              <GoogleLoginButton
                label={authTranslations.googleLogin}
                nextPath={pathname}
                className="primary-button w-full"
              />
            </div>

            {error ? <p className="mt-4 text-sm text-[var(--accent-soft)]">{error}</p> : null}
          </div>
          <button
            type="button"
            className="auth-modal-dismiss"
            aria-label={authTranslations.close}
            onClick={() => setOpen(false)}
          />
        </div>
      ) : null}
    </>
  );
}
