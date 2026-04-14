"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthDialogTrigger } from "@/components/auth-dialog-trigger";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient, hasSupabaseBrowserEnv } from "@/lib/supabase/browser";

function formatIdentity(session: Session | null) {
  const user = session?.user;
  if (!user) return "";
  return user.email || user.phone || "";
}

export function HeaderAuthButton() {
  const { translations } = useLanguage();
  const headerTranslations = translations.header;
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
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
      if (!nextSession) {
        setIsAdmin(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !session?.access_token) {
      return;
    }

    let active = true;
    const accessToken = session.access_token;

    async function loadAdminStatus() {
      try {
        const response = await fetch("/api/admin/status", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });
        const payload = (await response.json()) as { isAdmin?: boolean };
        if (!active) return;
        setIsAdmin(Boolean(payload.isAdmin));
      } catch {
        if (!active) return;
        setIsAdmin(false);
      }
    }

    void loadAdminStatus();

    return () => {
      active = false;
    };
  }, [session, supabase]);

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
    return <AuthDialogTrigger label={headerTranslations.login} className="header-nav-link" />;
  }

  return (
    <div className="header-user-shell">
      {isAdmin ? (
        <Link href="/admin/skill-submissions" className="header-nav-link">
          {headerTranslations.admin}
        </Link>
      ) : null}
      <span className="header-user-badge" title={formatIdentity(session)}>
        {formatIdentity(session) || headerTranslations.signedIn}
      </span>
      <button type="button" onClick={handleSignOut} className="header-nav-link" disabled={busy}>
        {busy ? headerTranslations.loggingOut : headerTranslations.logout}
      </button>
    </div>
  );
}
