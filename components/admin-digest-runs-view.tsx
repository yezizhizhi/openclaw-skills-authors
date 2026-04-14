"use client";

import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthDialogTrigger } from "@/components/auth-dialog-trigger";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type DigestRun = {
  id: number;
  digest_type: string;
  status: string;
  summary: {
    generated_at?: string;
    new_skill_versions?: number;
    updated_workflow_packages?: number;
    top_skill_clicks?: Array<{ key: string; count: number }>;
    top_package_downloads?: Array<{ slug: string; count: number }>;
  } | null;
  error_message: string | null;
  created_at: string;
  completed_at: string | null;
};

function formatTimestamp(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function AdminDigestRunsView() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [items, setItems] = useState<DigestRun[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const accessToken = session?.access_token;
    if (!accessToken) {
      return;
    }

    let active = true;

    async function loadRuns() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/admin/digest-runs", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });
        const payload = (await response.json()) as {
          error?: string;
          runs?: DigestRun[];
        };

        if (!response.ok) {
          throw new Error(payload.error || "Failed to load digest runs.");
        }

        if (active) {
          setItems(payload.runs ?? []);
        }
      } catch (fetchError) {
        if (active) {
          setError(fetchError instanceof Error ? fetchError.message : "Failed to load digest runs.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadRuns();

    return () => {
      active = false;
    };
  }, [session?.access_token]);

  if (!session) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">Sign In to Access Weekly Digest</h2>
          <p className="admin-empty-copy">Only admin accounts can view weekly digest history.</p>
          <div className="mx-auto w-full max-w-sm">
            <AuthDialogTrigger label="Admin Sign In" className="primary-button w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">Loading Weekly Digest</h2>
          <p className="admin-empty-copy">Please wait while we load digest history.</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">Weekly Digest Unavailable</h2>
          <p className="admin-empty-copy">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-shell">
      <div className="admin-summary">
        <div>
          <p className="admin-summary-label">Current Admin</p>
          <p className="admin-summary-value">{session.user.email || "Signed-in account"}</p>
        </div>
        <div>
          <p className="admin-summary-label">Weekly Digest Runs</p>
          <p className="admin-summary-value">{items.length}</p>
        </div>
      </div>

      <div className="admin-grid">
        {items.map((item) => (
          <article key={item.id} className="admin-card">
            <div className="admin-card-meta">
              <span>#{item.id}</span>
              <span>{item.digest_type}</span>
            </div>

            <h3 className="admin-card-title">{item.status}</h3>

            <div className="admin-card-block">
              <p className="admin-card-label">Created / Completed</p>
              <p className="admin-card-value">{formatTimestamp(item.created_at)}</p>
              <p className="admin-card-value">{formatTimestamp(item.completed_at)}</p>
            </div>

            <div className="admin-card-block">
              <p className="admin-card-label">New Skills / Updated Packages</p>
              <p className="admin-card-value">
                {item.summary?.new_skill_versions ?? 0} / {item.summary?.updated_workflow_packages ?? 0}
              </p>
            </div>

            {item.summary?.top_skill_clicks?.length ? (
              <div className="admin-card-block">
                <p className="admin-card-label">Top Skill Clicks</p>
                {item.summary.top_skill_clicks.map((entry) => (
                  <p key={entry.key} className="admin-card-value">
                    {entry.key}: {entry.count}
                  </p>
                ))}
              </div>
            ) : null}

            {item.summary?.top_package_downloads?.length ? (
              <div className="admin-card-block">
                <p className="admin-card-label">Top Package Downloads</p>
                {item.summary.top_package_downloads.map((entry) => (
                  <p key={entry.slug} className="admin-card-value">
                    {entry.slug}: {entry.count}
                  </p>
                ))}
              </div>
            ) : null}

            {item.error_message ? (
              <div className="admin-card-block">
                <p className="admin-card-label">Error</p>
                <p className="admin-card-value">{item.error_message}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
