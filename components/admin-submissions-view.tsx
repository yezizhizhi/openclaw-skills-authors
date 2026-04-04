"use client";

import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { AuthDialogTrigger } from "@/components/auth-dialog-trigger";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

type SkillSubmission = {
  id: number;
  skill_link: string | null;
  skill_package: string | null;
  recommendation_reason: string;
  submitter_email: string | null;
  submitter_user_id: string;
  created_at: string;
};

function formatTimestamp(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function AdminSubmissionsView() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [items, setItems] = useState<SkillSubmission[]>([]);
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
    if (!supabase || !session?.access_token) {
      return;
    }

    let active = true;
    const accessToken = session.access_token;

    async function loadSubmissions() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/admin/skill-submissions", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });
        const payload = (await response.json()) as {
          error?: string;
          submissions?: SkillSubmission[];
        };

        if (!response.ok) {
          throw new Error(payload.error || "读取后台提交列表失败。");
        }

        if (!active) return;
        setItems(payload.submissions ?? []);
      } catch (fetchError) {
        if (!active) return;
        setError(fetchError instanceof Error ? fetchError.message : "读取后台提交列表失败。");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadSubmissions();

    return () => {
      active = false;
    };
  }, [session, supabase]);

  if (!session) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">请先登录后台账号</h2>
          <p className="admin-empty-copy">
            只有管理员账号可以查看所有用户提交的 Skills 推荐记录。
          </p>
          <div className="mx-auto w-full max-w-sm">
            <AuthDialogTrigger label="登录后查看后台" className="primary-button w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">正在载入提交记录</h2>
          <p className="admin-empty-copy">请稍等，我们正在从数据库读取最新的推荐内容。</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="admin-shell">
        <div className="admin-empty">
          <h2 className="admin-empty-title">暂时无法查看后台</h2>
          <p className="admin-empty-copy">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-shell">
      <div className="admin-summary">
        <div>
          <p className="admin-summary-label">当前管理员</p>
          <p className="admin-summary-value">{session.user.email || "已登录账号"}</p>
        </div>
        <div>
          <p className="admin-summary-label">提交总数</p>
          <p className="admin-summary-value">{items.length}</p>
        </div>
      </div>

      <div className="admin-grid">
        {items.map((item) => (
          <article key={item.id} className="admin-card">
            <div className="admin-card-meta">
              <span>#{item.id}</span>
              <span>{formatTimestamp(item.created_at)}</span>
            </div>

            <h3 className="admin-card-title">{item.submitter_email || item.submitter_user_id}</h3>

            <div className="admin-card-block">
              <p className="admin-card-label">Skills 链接</p>
              {item.skill_link ? (
                <a href={item.skill_link} target="_blank" rel="noreferrer" className="admin-card-link">
                  {item.skill_link}
                </a>
              ) : (
                <p className="admin-card-value muted">未填写</p>
              )}
            </div>

            <div className="admin-card-block">
              <p className="admin-card-label">Skills 包地址</p>
              {item.skill_package ? (
                <p className="admin-card-value">{item.skill_package}</p>
              ) : (
                <p className="admin-card-value muted">未填写</p>
              )}
            </div>

            <div className="admin-card-block">
              <p className="admin-card-label">推荐理由</p>
              <p className="admin-card-value">{item.recommendation_reason}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
