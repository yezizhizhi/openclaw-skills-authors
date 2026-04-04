"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { GoogleLoginButton } from "@/components/google-login-button";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

type AuthDialogTriggerProps = {
  label?: string;
  className?: string;
};

export function AuthDialogTrigger({
  label = "登录",
  className = "header-nav-link",
}: AuthDialogTriggerProps) {
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
        {label}
      </button>

      {open ? (
        <div className="auth-modal-backdrop" role="dialog" aria-modal="true" aria-label="登录">
          <div className="auth-modal-shell" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="auth-modal-close"
              aria-label="关闭登录框"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

            <p className="auth-modal-kicker">登录</p>
            <h2 className="auth-modal-title">登录账号</h2>
            <p className="auth-modal-copy">
              你可以直接用邮箱和密码登录，也可以继续使用 Google。Google 登录会跳转到 Google 官方授权页完成验证。
            </p>

            <form className="mt-8 grid gap-4" onSubmit={handleEmailLogin}>
              <label className="grid gap-3 text-left">
                <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">邮箱账号</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="submission-input"
                  placeholder="请输入邮箱账号"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="grid gap-3 text-left">
                <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">密码</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="submission-input"
                  placeholder="请输入密码"
                  autoComplete="current-password"
                  required
                />
              </label>

              <button type="submit" className="secondary-button w-full" disabled={busy || !hasSupabaseBrowserEnv()}>
                {busy ? "登录中..." : "邮箱密码登录"}
              </button>
            </form>

            <div className="auth-modal-divider">
              <span>或</span>
            </div>

            <div>
              <GoogleLoginButton
                label="使用 Google 登录"
                nextPath={pathname}
                className="primary-button w-full"
              />
            </div>

            {error ? <p className="mt-4 text-sm text-[var(--accent-soft)]">{error}</p> : null}
          </div>
          <button
            type="button"
            className="auth-modal-dismiss"
            aria-label="关闭遮罩"
            onClick={() => setOpen(false)}
          />
        </div>
      ) : null}
    </>
  );
}
