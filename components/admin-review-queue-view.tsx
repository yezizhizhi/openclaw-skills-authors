"use client";

import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthDialogTrigger } from "@/components/auth-dialog-trigger";
import { useLanguage } from "@/components/language-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type ReviewQueueItem = {
  id: number;
  final_score: number;
  status: string;
  publish_decision: string;
  needs_review: boolean;
  suggested_category_slug: string | null;
  suggested_workflow: string | null;
  evaluation_reason: string;
  evaluated_at: string;
  skill_versions: {
    id: string;
    name: string;
    description: string;
    source_type: string;
    source_key: string;
    source_url: string | null;
    repository_url: string | null;
    category_slug: string | null;
    workflow: string;
  } | null;
};

function formatTimestamp(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function AdminReviewQueueView() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [items, setItems] = useState<ReviewQueueItem[]>([]);
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
        const response = await fetch("/api/admin/review-queue", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });
        const payload = (await response.json()) as {
          error?: string;
          items?: ReviewQueueItem[];
        };

        if (!response.ok) {
          throw new Error(payload.error || (isZh ? "读取待审核队列失败。" : "Failed to load review queue."));
        }

        if (active) {
          setItems(payload.items ?? []);
        }
      } catch (fetchError) {
        if (active) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : isZh
                ? "读取待审核队列失败。"
                : "Failed to load review queue.",
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
          <h2 className="admin-empty-title">{isZh ? "请先登录后台账号" : "Sign In to Access Review Queue"}</h2>
          <p className="admin-empty-copy">
            {isZh ? "只有管理员账号可以查看自动采集后的待审核 Skills。" : "Only admin accounts can review auto-ingested skills."}
          </p>
          <div className="mx-auto w-full max-w-sm">
            <AuthDialogTrigger
              label={isZh ? "登录后查看待审核列表" : "Sign In to View Queue"}
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
          <h2 className="admin-empty-title">{isZh ? "正在载入待审核队列" : "Loading review queue"}</h2>
          <p className="admin-empty-copy">
            {isZh ? "请稍等，我们正在读取最新自动采集记录。" : "Please wait while we load the latest auto-ingested items."}
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">{isZh ? "暂时无法查看待审核队列" : "Review queue unavailable"}</h2>
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
          <p className="admin-summary-label">{isZh ? "待审核总数" : "Pending Review"}</p>
          <p className="admin-summary-value">{items.length}</p>
        </div>
      </div>

      <div className="admin-grid">
        {items.map((item) => {
          const version = item.skill_versions;
          return (
            <article key={item.id} className="admin-card">
              <div className="admin-card-meta">
                <span>#{item.id}</span>
                <span>{formatTimestamp(item.evaluated_at, isZh ? "zh-CN" : "en-US")}</span>
              </div>

              <h3 className="admin-card-title">{version?.name || (isZh ? "未命名 Skill" : "Unnamed Skill")}</h3>

              <div className="admin-card-block">
                <p className="admin-card-label">{isZh ? "评分 / 决策" : "Score / Decision"}</p>
                <p className="admin-card-value">
                  {item.final_score} / {item.publish_decision}
                </p>
              </div>

              <div className="admin-card-block">
                <p className="admin-card-label">{isZh ? "建议分类 / 环节" : "Suggested Category / Workflow"}</p>
                <p className="admin-card-value">
                  {item.suggested_category_slug || "-"} / {item.suggested_workflow || "-"}
                </p>
              </div>

              <div className="admin-card-block">
                <p className="admin-card-label">{isZh ? "来源" : "Source"}</p>
                <p className="admin-card-value">{version?.source_type || "-"}</p>
                {version?.source_url ? (
                  <a href={version.source_url} target="_blank" rel="noreferrer" className="admin-card-link">
                    {version.source_url}
                  </a>
                ) : null}
                {version?.repository_url ? (
                  <a href={version.repository_url} target="_blank" rel="noreferrer" className="admin-card-link">
                    {version.repository_url}
                  </a>
                ) : null}
              </div>

              <div className="admin-card-block">
                <p className="admin-card-label">{isZh ? "说明" : "Reason"}</p>
                <p className="admin-card-value">{item.evaluation_reason}</p>
              </div>

              {version?.description ? (
                <div className="admin-card-block">
                  <p className="admin-card-label">{isZh ? "抓取简介" : "Description"}</p>
                  <p className="admin-card-value">{version.description}</p>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
