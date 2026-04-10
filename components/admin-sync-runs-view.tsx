"use client";

import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthDialogTrigger } from "@/components/auth-dialog-trigger";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type SyncRun = {
  id: number;
  source_type: string;
  status: string;
  started_at: string;
  finished_at: string | null;
  fetched_count: number;
  normalized_count: number;
  published_count: number;
  review_count: number;
  error_summary: string | null;
};

function formatTimestamp(value: string | null, locale: string) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function AdminSyncRunsView() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [items, setItems] = useState<SyncRun[]>([]);
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
    if (!supabase || !accessToken) {
      return;
    }

    let active = true;

    async function loadItems() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/admin/sync-runs", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });
        const payload = (await response.json()) as {
          error?: string;
          runs?: SyncRun[];
        };

        if (!response.ok) {
          throw new Error(payload.error || (isZh ? "读取同步记录失败。" : "Failed to load sync runs."));
        }

        if (active) {
          setItems(payload.runs ?? []);
        }
      } catch (fetchError) {
        if (active) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : isZh
                ? "读取同步记录失败。"
                : "Failed to load sync runs.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadItems();

    return () => {
      active = false;
    };
  }, [isZh, session?.access_token, supabase]);

  if (!session) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">{isZh ? "请先登录后台账号" : "Sign In to Access Sync Runs"}</h2>
          <p className="admin-empty-copy">
            {isZh ? "只有管理员账号可以查看自动同步执行记录。" : "Only admin accounts can view sync execution history."}
          </p>
          <div className="mx-auto w-full max-w-sm">
            <AuthDialogTrigger
              label={isZh ? "登录后查看同步记录" : "Sign In to View Sync Runs"}
              className="primary-button w-full"
            />
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">{isZh ? "正在载入同步记录" : "Loading sync runs"}</h2>
          <p className="admin-empty-copy">
            {isZh ? "请稍等，我们正在读取最近的自动化执行结果。" : "Please wait while we load the latest automation runs."}
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">{isZh ? "暂时无法查看同步记录" : "Sync history unavailable"}</h2>
          <p className="admin-empty-copy">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-shell">
      <div className="admin-summary">
        <div>
          <p className="admin-summary-label">{isZh ? "当前管理员" : "Current Admin"}</p>
          <p className="admin-summary-value">{session.user.email || (isZh ? "已登录账号" : "Signed-in account")}</p>
        </div>
        <div>
          <p className="admin-summary-label">{isZh ? "最近执行数" : "Recent Runs"}</p>
          <p className="admin-summary-value">{items.length}</p>
        </div>
      </div>

      <div className="admin-grid">
        {items.map((item) => (
          <article key={item.id} className="admin-card">
            <div className="admin-card-meta">
              <span>#{item.id}</span>
              <span>{item.source_type}</span>
            </div>

            <h3 className="admin-card-title">{item.status}</h3>

            <div className="admin-card-block">
              <p className="admin-card-label">{isZh ? "开始 / 结束" : "Start / End"}</p>
              <p className="admin-card-value">{formatTimestamp(item.started_at, isZh ? "zh-CN" : "en-US")}</p>
              <p className="admin-card-value">{formatTimestamp(item.finished_at, isZh ? "zh-CN" : "en-US")}</p>
            </div>

            <div className="admin-card-block">
              <p className="admin-card-label">{isZh ? "抓取 / 标准化 / 发布" : "Fetched / Normalized / Published"}</p>
              <p className="admin-card-value">
                {item.fetched_count} / {item.normalized_count} / {item.published_count}
              </p>
            </div>

            <div className="admin-card-block">
              <p className="admin-card-label">{isZh ? "待审核数" : "Review Count"}</p>
              <p className="admin-card-value">{item.review_count}</p>
            </div>

            {item.error_summary ? (
              <div className="admin-card-block">
                <p className="admin-card-label">{isZh ? "错误摘要" : "Error Summary"}</p>
                <p className="admin-card-value">{item.error_summary}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
