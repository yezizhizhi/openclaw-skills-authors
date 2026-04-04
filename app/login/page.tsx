"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { GoogleLoginButton } from "@/components/google-login-button";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/");
      }
    });
  }, [router, supabase]);

  return (
    <main className="site-shell section-gap pb-24">
      <section className="mx-auto mt-16 max-w-xl rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(15,22,35,0.94),rgba(10,15,24,0.94))] px-6 py-8 text-center shadow-[var(--shadow)] md:mt-24 md:px-10 md:py-10">
        <p className="text-sm font-semibold tracking-[0.16em] text-[var(--accent-soft)]">登录</p>
        <h1 className="mt-4 text-[2.4rem] font-bold tracking-[-0.06em] text-[var(--ink)] md:text-[3rem]">
          继续使用 Google
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[1rem] leading-8 text-[var(--muted-ink)]">
          登录后你可以提交推荐的 Skills，后续也会支持收藏、权限控制和订阅功能。
        </p>

        <div className="mx-auto mt-8 max-w-sm">
          <GoogleLoginButton nextPath="/" />
        </div>

        {!hasSupabaseBrowserEnv() ? (
          <p className="mt-4 text-sm text-[var(--accent-soft)]">当前环境还没有配置 Supabase 登录参数。</p>
        ) : null}
      </section>
    </main>
  );
}
