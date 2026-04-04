"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

function formatIdentity(session: Session | null) {
  const user = session?.user;
  if (!user) return "";
  return user.email || user.phone || "已登录";
}

export function HeaderAuthButton() {
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState(false);
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  useEffect(() => {
    if (!supabase) return;

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleSignOut() {
    if (!supabase) return;
    setBusy(true);
    await supabase.auth.signOut();
    setBusy(false);
  }

  if (!hasSupabaseBrowserEnv()) {
    return null;
  }

  if (!session) {
    return (
      <Link href="/login" className="header-nav-link">
        登录
      </Link>
    );
  }

  return (
    <div className="header-user-shell">
      <span className="header-user-badge" title={formatIdentity(session)}>
        {formatIdentity(session)}
      </span>
      <button type="button" onClick={handleSignOut} className="header-nav-link" disabled={busy}>
        {busy ? "退出中..." : "退出"}
      </button>
    </div>
  );
}
