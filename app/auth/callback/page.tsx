"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AuthCallbackPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [message, setMessage] = useState(
    supabase
      ? isZh
        ? "正在完成登录..."
        : "Completing sign-in..."
      : isZh
        ? "当前环境缺少登录配置。"
        : "Missing authentication configuration in this environment.",
  );

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let redirected = false;
    const nextPath =
      typeof window === "undefined"
        ? "/"
        : new URL(window.location.href).searchParams.get("next") || "/";

    const tryRedirect = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session && !redirected) {
        redirected = true;
        router.replace(nextPath);
      }
    };

    void tryRedirect();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && !redirected) {
        redirected = true;
        router.replace(nextPath);
      }
    });

    const fallbackTimer = window.setTimeout(() => {
      if (!redirected) {
        setMessage(isZh ? "登录状态已返回，请稍候..." : "The sign-in state has returned. Please wait...");
        void tryRedirect();
      }
    }, 1200);

    return () => {
      subscription.unsubscribe();
      window.clearTimeout(fallbackTimer);
    };
  }, [isZh, router, supabase]);

  return (
    <main className="site-shell section-gap pb-24">
      <section className="hero-center pt-10">
        <h1 className="display-title hero-headline">{isZh ? "正在登录" : "Signing In"}</h1>
        <p className="hero-copy hero-copy-lg">{message}</p>
      </section>
    </main>
  );
}
