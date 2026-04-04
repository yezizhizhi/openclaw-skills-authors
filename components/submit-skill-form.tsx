"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { GoogleLoginButton } from "@/components/google-login-button";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

function getSubmitterEmail(session: Session | null) {
  const user = session?.user;
  if (!user) return "";
  return user.email || user.phone || "";
}

export function SubmitSkillForm() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [skillLink, setSkillLink] = useState("");
  const [skillPackage, setSkillPackage] = useState("");
  const [recommendationReason, setRecommendationReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase || !session?.user) {
      setError("请先登录后再提交推荐。");
      return;
    }

    setBusy(true);
    setError("");
    setMessage("");

    const trimmedLink = skillLink.trim();
    const trimmedPackage = skillPackage.trim();
    const trimmedReason = recommendationReason.trim();

    if (!trimmedLink && !trimmedPackage) {
      setError("请至少填写一个 Skills 链接或 Skills 包地址。");
      setBusy(false);
      return;
    }

    const { error: insertError } = await supabase.from("skill_submissions").insert({
      skill_link: trimmedLink || null,
      skill_package: trimmedPackage || null,
      recommendation_reason: trimmedReason,
      submitter_email: getSubmitterEmail(session),
      submitter_user_id: session.user.id,
    });

    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }

    setSkillLink("");
    setSkillPackage("");
    setRecommendationReason("");
    setMessage("感谢你的推荐！");
    setBusy(false);
  }

  if (!session) {
    return (
      <div className="grid gap-5 text-center">
        <p className="text-[1rem] leading-8 text-[var(--muted-ink)]">
          推荐提交需要先登录，这样我们才能记录推荐来源，并在后续收录时和你同步结果。
        </p>
        <div className="mx-auto w-full max-w-sm">
          <GoogleLoginButton nextPath="/submit-skills" />
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <label className="grid gap-3">
        <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">Skills 链接</span>
        <input
          type="url"
          value={skillLink}
          onChange={(event) => setSkillLink(event.target.value)}
          placeholder="例如：https://clawhub.ai/... "
          className="submission-input"
        />
      </label>

      <label className="grid gap-3">
        <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">Skills 包地址</span>
        <input
          type="text"
          value={skillPackage}
          onChange={(event) => setSkillPackage(event.target.value)}
          placeholder="例如：GitHub Releases、Google Drive 或其它可安装包地址"
          className="submission-input"
        />
      </label>

      <label className="grid gap-3">
        <span className="text-sm font-semibold tracking-[0.08em] text-[var(--accent-soft)]">为什么推荐</span>
        <textarea
          rows={6}
          value={recommendationReason}
          onChange={(event) => setRecommendationReason(event.target.value)}
          placeholder="简单写一下它适合哪个创作环节、为什么值得收录。"
          className="submission-input submission-textarea"
          required
        />
      </label>

      <div className="flex justify-center pt-2">
        <button type="submit" className="secondary-button" disabled={busy}>
          {busy ? "提交中..." : "提交推荐"}
        </button>
      </div>

      {error ? <p className="text-center text-sm text-[var(--accent-soft)]">{error}</p> : null}
      <p className="text-center text-[1rem] font-semibold text-[var(--soft-ink)]">{message || "感谢你的推荐！"}</p>
    </form>
  );
}
