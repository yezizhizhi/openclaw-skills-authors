"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/");
      }
    });
  }, [router, supabase]);

  async function handleGoogleLogin() {
    if (!supabase || typeof window === "undefined") return;
    setBusy(true);
    setError("");

    const redirectTo = `${window.location.origin}/auth/callback`;

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (signInError) {
      setError(signInError.message);
      setBusy(false);
    }
  }

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-6 md:pt-10">
        <h1 className="display-title hero-headline">登录</h1>
        <h2 className="hero-subheadline">先接入 Google 登录，后续再补手机号与更多账号方式</h2>
        <p className="hero-copy hero-copy-lg">
          你可以先使用 Google 账号登录，用于后续的 Skill 推荐提交、收藏、权限控制和订阅功能。
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-2xl rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(15,22,35,0.94),rgba(10,15,24,0.94))] px-6 py-8 text-center shadow-[var(--shadow)] md:px-10">
        <p className="text-sm font-semibold tracking-[0.16em] text-[var(--accent-soft)]">当前登录方式</p>
        <h3 className="mt-4 text-[2rem] font-bold tracking-[-0.05em] text-[var(--ink)]">使用 Google 账号继续</h3>
        <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-8 text-[var(--muted-ink)]">
          这一版先开放 Google 登录，把账号体系先跑通。等功能稳定后，再补手机号验证码和更多登录方式。
        </p>

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={busy || !hasSupabaseBrowserEnv()}
            className="primary-button"
          >
            {busy ? "正在跳转..." : "使用 Google 登录"}
          </button>
        </div>

        {error ? <p className="mt-4 text-sm text-[var(--accent-soft)]">{error}</p> : null}
        {!hasSupabaseBrowserEnv() ? (
          <p className="mt-4 text-sm text-[var(--accent-soft)]">当前环境还没有配置 Supabase 登录参数。</p>
        ) : null}
      </section>
    </main>
  );
}
