import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const CATEGORY_RULES = [
  {
    slug: "books",
    keywords: ["book", "books", "novel", "memoir", "manuscript", "author", "chapter", "写书", "书稿", "章节"],
    workflows: ["选题调研", "资料搜集", "素材整理", "大纲创建", "正文写作", "质检修订"],
  },
  {
    slug: "articles",
    keywords: ["article", "newsletter", "blog", "post", "wechat", "公众号", "文章", "新闻", "评论"],
    workflows: ["全流程公众号写作", "选题热度调研", "选题策划", "素材处理", "大纲结构", "正文写作", "终稿质检"],
  },
  {
    slug: "copywriting",
    keywords: ["copywriting", "copy", "xhs", "xiaohongshu", "douyin", "marketing", "campaign", "文案", "带货", "口播"],
    workflows: ["热点/需求调研", "竞品调研与拆解", "内容策划与矩阵设计", "内容生产与平台改写", "成交链路与活动转化", "短视频与直播表达", "润色去 AI 味"],
  },
  {
    slug: "reports",
    keywords: ["report", "reports", "brief", "business plan", "analysis", "汇报", "报告", "商业计划", "演讲稿"],
    workflows: ["任务定义", "资料收集 / 信息搜索", "资料归档 / 输入接入", "清洗整理 / 重点提炼", "分析归纳 / 形成判断", "框架搭建 / 报告成稿", "摘要压缩 / 汇报版改写", "逻辑校对 / 终稿质检"],
  },
  {
    slug: "academic",
    keywords: ["academic", "paper", "research", "citation", "arxiv", "论文", "学术", "文献", "研究"],
    workflows: ["研究任务定义", "文献收集 / 研究材料归档", "学术检索 / 外部数据库补强", "文献整理 / 摘要提炼", "研究结构 / 正文写作", "语言润色 / 学术语体优化", "引用辅助 / 参考文献管理", "逻辑一致性 / 终稿审校"],
  },
  {
    slug: "courses",
    keywords: ["course", "curriculum", "lecture", "lesson", "slides", "课程", "讲义", "教学", "课件"],
    workflows: ["课程定义与定位", "大纲规划与学习路径", "讲义整理与资料重组", "转写与多源内容转课程", "案例、练习与测验设计", "脚本编写与课件展开", "表达优化与教学可理解性", "内容产品化与交付包装"],
  },
];

const WORKFLOW_RULES = [
  { keywords: ["trend", "hot", "topic", "research", "选题", "热点", "趋势"], label: "选题调研" },
  { keywords: ["source", "search", "collect", "crawl", "资料", "搜索", "收集"], label: "资料搜集" },
  { keywords: ["summary", "summarize", "digest", "整理", "摘要"], label: "素材整理" },
  { keywords: ["outline", "structure", "chapter", "大纲", "结构"], label: "大纲创建" },
  { keywords: ["draft", "write", "writer", "写作", "正文"], label: "正文写作" },
  { keywords: ["polish", "review", "qa", "quality", "润色", "质检", "审校"], label: "质检修订" },
];

export function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

  if (!url || !serviceKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function ensureArray(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map(String);
  }

  if (!value) {
    return [];
  }

  return [String(value)];
}

export function sha1(value) {
  return crypto.createHash("sha1").update(value).digest("hex");
}

function getCategoryMatch(record) {
  const haystack = [
    record.name,
    record.description,
    record.sourceUrl,
    record.repositoryUrl,
    ...(record.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let bestRule = CATEGORY_RULES[0];
  let bestScore = -1;

  for (const rule of CATEGORY_RULES) {
    const score = rule.keywords.reduce((sum, keyword) => {
      return sum + (haystack.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestRule = rule;
      bestScore = score;
    }
  }

  return {
    categorySlug: bestRule.slug,
    confidence: bestScore,
  };
}

function getWorkflowMatch(record) {
  const haystack = [
    record.name,
    record.description,
    ...(record.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let workflow = "";
  let score = -1;

  for (const rule of WORKFLOW_RULES) {
    const nextScore = rule.keywords.reduce((sum, keyword) => {
      return sum + (haystack.includes(keyword.toLowerCase()) ? 1 : 0);
    }, 0);

    if (nextScore > score) {
      workflow = rule.label;
      score = nextScore;
    }
  }

  return {
    workflow,
    confidence: score,
  };
}

export function inferCategory(record) {
  return getCategoryMatch(record).categorySlug;
}

export function inferWorkflow(record, categorySlug) {
  const { workflow } = getWorkflowMatch(record);

  if (workflow) {
    return workflow;
  }

  const categoryRule = CATEGORY_RULES.find((item) => item.slug === categorySlug);
  return categoryRule?.workflows[0] || "选题调研";
}

export function evaluateSkill(record) {
  const payloadText = JSON.stringify(record.rawPayload || {});
  const descriptionLength = (record.description || "").trim().length;
  const configLength = (record.configSnippet || "").trim().length;
  const tagCount = ensureArray(record.tags).length;
  const hasHttpSource = /^https?:\/\//.test(record.sourceUrl || "");
  const hasRepository = /^https?:\/\//.test(record.repositoryUrl || "");
  const hasModels = ensureArray(record.models).length > 0;
  const updatedHint = `${record.name} ${record.description} ${payloadText}`.toLowerCase();
  const categoryConfidence = Number(record.categoryConfidence ?? 0);
  const workflowConfidence = Number(record.workflowConfidence ?? 0);
  const isClawHub = record.sourceType === "clawhub";
  const isTrustedGithubSource = /github\.com\/(openclaw|vercel-labs)\//.test(record.repositoryUrl || "");
  const hasRichDescription = descriptionLength > 120;
  const hasStrongInstallSignal = configLength > 60;

  const accessibility = hasHttpSource ? 90 : 40;
  const installability = Math.min(
    100,
    (configLength > 0 ? 55 : 20) +
      (hasRepository ? 20 : 0) +
      (descriptionLength > 80 ? 20 : 0) +
      (hasStrongInstallSignal ? 10 : 0),
  );
  const maintenance = Math.min(
    100,
    (hasRepository ? 50 : 25) +
      (/202[45-9]|updated|recent|active/.test(updatedHint) ? 35 : 10) +
      (isClawHub || isTrustedGithubSource ? 10 : 0),
  );
  const workflowFit = Math.min(
    100,
    (record.categorySlug ? 35 : 15) +
      (record.workflow ? 25 : 0) +
      Math.min(20, tagCount * 5) +
      Math.min(20, Math.max(categoryConfidence, 0) * 10) +
      Math.min(15, Math.max(workflowConfidence, 0) * 8),
  );
  const compatibility = Math.min(
    100,
    (record.inputPreview ? 30 : hasStrongInstallSignal ? 20 : 10) +
      (record.outputPreview ? 30 : hasRichDescription ? 20 : 10) +
      (configLength > 0 ? 25 : 0),
  );
  const quality = Math.min(
    100,
    (descriptionLength > 60 ? 30 : 10) +
      (hasModels ? 20 : 0) +
      Math.min(30, tagCount * 6) +
      (payloadText.length > 200 ? 20 : 5) +
      (isClawHub || isTrustedGithubSource ? 10 : 0),
  );

  const finalScore = Math.round(
    accessibility * 0.2 +
    installability * 0.2 +
    maintenance * 0.15 +
    workflowFit * 0.2 +
    compatibility * 0.15 +
    quality * 0.1,
  );

  let status = "pending_review";
  let publishDecision = "review";
  let needsReview = true;

  const autoPublishEligible = (
    finalScore >= 72 &&
    hasHttpSource &&
    record.categorySlug &&
    record.workflow &&
    categoryConfidence >= 1 &&
    (workflowConfidence >= 1 || isClawHub) &&
    (isClawHub || isTrustedGithubSource || hasRepository)
  );

  if (autoPublishEligible) {
    status = "approved";
    publishDecision = "publish";
    needsReview = false;
  } else if (finalScore < 60) {
    status = "rejected";
    publishDecision = "hold";
  }

  return {
    accessibility,
    installability,
    maintenance,
    workflowFit,
    compatibility,
    quality,
    finalScore,
    status,
    publishDecision,
    needsReview,
    reason: `Score ${finalScore}. Category confidence ${categoryConfidence}. Workflow confidence ${workflowConfidence}. ${hasHttpSource ? "Source reachable." : "Missing source URL."} ${configLength > 0 ? "Install snippet present." : "Install snippet missing."}`,
    reasons: [
      { label: "accessibility", score: accessibility },
      { label: "installability", score: installability },
      { label: "maintenance", score: maintenance },
      { label: "workflow_fit", score: workflowFit },
      { label: "compatibility", score: compatibility },
      { label: "quality", score: quality },
    ],
  };
}

export function normalizeSkillRecord(record) {
  const categoryMatch = getCategoryMatch(record);
  const categorySlug = record.categorySlug || categoryMatch.categorySlug;
  const workflowMatch = getWorkflowMatch(record);
  const workflow = record.workflow || workflowMatch.workflow || inferWorkflow(record, categorySlug);
  const canonicalSlug = slugify(record.name || record.sourceKey || "skill");
  const sourceType = record.sourceType || "manual";
  const sourceKey = record.sourceKey || canonicalSlug;
  const versionDigest = sha1(JSON.stringify({
    name: record.name,
    description: record.description,
    sourceUrl: record.sourceUrl,
    repositoryUrl: record.repositoryUrl,
    installMode: record.installMode,
    primaryAction: record.primaryAction,
    tags: ensureArray(record.tags),
    models: ensureArray(record.models),
    inputPreview: record.inputPreview,
    outputPreview: record.outputPreview,
    configSnippet: record.configSnippet,
  }));

  return {
    sourceType,
    sourceKey,
    canonicalSlug,
    name: record.name || record.detectedName || canonicalSlug,
    description: record.description || "",
    authorName: record.authorName || null,
    categorySlug,
    workflow,
    sourceUrl: record.sourceUrl || null,
    repositoryUrl: record.repositoryUrl || null,
    installMode: record.installMode || "copy_config",
    primaryAction: record.primaryAction || "查看详情",
    models: ensureArray(record.models),
    tags: ensureArray(record.tags),
    inputPreview: record.inputPreview || "",
    outputPreview: record.outputPreview || "",
    configSnippet: record.configSnippet || "",
    categoryConfidence: categoryMatch.confidence,
    workflowConfidence: workflowMatch.confidence,
    versionDigest,
    rawPayload: record.rawPayload || {},
  };
}

export async function upsertLatestSkillVersion(supabase, rawSkillId, normalizedRecord) {
  const versionId = `${normalizedRecord.sourceType}-${normalizedRecord.sourceKey}-${normalizedRecord.versionDigest.slice(0, 12)}`;

  const { error: existingError } = await supabase
    .from("skill_versions")
    .update({ is_latest: false })
    .eq("source_type", normalizedRecord.sourceType)
    .eq("source_key", normalizedRecord.sourceKey)
    .eq("is_latest", true)
    .neq("id", versionId);

  if (existingError) {
    throw existingError;
  }

  const { error } = await supabase
    .from("skill_versions")
    .upsert({
      id: versionId,
      raw_skill_id: rawSkillId,
      source_type: normalizedRecord.sourceType,
      source_key: normalizedRecord.sourceKey,
      canonical_slug: normalizedRecord.canonicalSlug,
      name: normalizedRecord.name,
      description: normalizedRecord.description,
      author_name: normalizedRecord.authorName,
      category_slug: normalizedRecord.categorySlug,
      workflow: normalizedRecord.workflow,
      source_url: normalizedRecord.sourceUrl,
      repository_url: normalizedRecord.repositoryUrl,
      install_mode: normalizedRecord.installMode,
      primary_action: normalizedRecord.primaryAction,
      models: normalizedRecord.models,
      tags: normalizedRecord.tags,
      input_preview: normalizedRecord.inputPreview,
      output_preview: normalizedRecord.outputPreview,
      config_snippet: normalizedRecord.configSnippet,
      version_digest: normalizedRecord.versionDigest,
      last_seen_at: new Date().toISOString(),
      is_latest: true,
    }, { onConflict: "id" });

  if (error) {
    throw error;
  }

  return versionId;
}

export async function persistEvaluation(supabase, versionId, evaluation, normalizedRecord) {
  const { error } = await supabase
    .from("skill_evaluations")
    .insert({
      skill_version_id: versionId,
      accessibility_score: evaluation.accessibility,
      installability_score: evaluation.installability,
      maintenance_score: evaluation.maintenance,
      workflow_fit_score: evaluation.workflowFit,
      compatibility_score: evaluation.compatibility,
      quality_score: evaluation.quality,
      final_score: evaluation.finalScore,
      status: evaluation.status,
      publish_decision: evaluation.publishDecision,
      needs_review: evaluation.needsReview,
      suggested_category_slug: normalizedRecord.categorySlug,
      suggested_workflow: normalizedRecord.workflow,
      evaluation_reason: evaluation.reason,
      reasons: evaluation.reasons,
    });

  if (error) {
    throw error;
  }
}

export async function ensureScenarioId(supabase, categorySlug, workflow) {
  const scenarioId = `${categorySlug}-${slugify(workflow)}`;
  const { error } = await supabase
    .from("scenarios")
    .upsert({
      id: scenarioId,
      category_slug: categorySlug,
      name: workflow,
      sort_order: 999,
    }, { onConflict: "id" });

  if (error) {
    throw error;
  }

  return scenarioId;
}

export async function publishSkill(supabase, normalizedRecord, evaluation) {
  if (evaluation.publishDecision !== "publish") {
    return null;
  }

  const { data: existingSkill, error: existingSkillError } = await supabase
    .from("skills")
    .select("id")
    .eq("source_type", normalizedRecord.sourceType)
    .eq("source_key", normalizedRecord.sourceKey)
    .maybeSingle();

  if (existingSkillError) {
    throw existingSkillError;
  }

  const skillId = existingSkill?.id || `${normalizedRecord.categorySlug}-${normalizedRecord.canonicalSlug}`.slice(0, 120);
  const scenarioId = await ensureScenarioId(supabase, normalizedRecord.categorySlug, normalizedRecord.workflow);

  const { error: skillError } = await supabase
    .from("skills")
    .upsert({
      id: skillId,
      category_slug: normalizedRecord.categorySlug,
      name: normalizedRecord.name,
      workflow: normalizedRecord.workflow,
      description: normalizedRecord.description || "Auto-synced skill.",
      source_url: normalizedRecord.sourceUrl,
      install_mode: normalizedRecord.installMode,
      primary_action: normalizedRecord.primaryAction,
      badge: evaluation.finalScore >= 90 ? "Auto Verified" : null,
      models: normalizedRecord.models,
      tags: normalizedRecord.tags,
      input_preview: normalizedRecord.inputPreview,
      output_preview: normalizedRecord.outputPreview,
      config_snippet: normalizedRecord.configSnippet,
      sort_order: 999,
      is_published: true,
      source_type: normalizedRecord.sourceType,
      source_key: normalizedRecord.sourceKey,
      source_repository: normalizedRecord.repositoryUrl,
      review_status: evaluation.status,
      last_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });

  if (skillError) {
    throw skillError;
  }

  if (skillId) {
    const { error: mappingError } = await supabase
      .from("skill_scenarios")
      .upsert({
        skill_id: skillId,
        scenario_id: scenarioId,
        sort_order: 999,
        relevance_score: evaluation.finalScore,
      }, { onConflict: "skill_id,scenario_id" });

    if (mappingError) {
      throw mappingError;
    }
  }

  return skillId;
}

export function buildRawSkillPayload(sourceType, item, syncRunId) {
  return {
    source_type: sourceType,
    source_key: item.sourceKey,
    source_url: item.sourceUrl || null,
    repository_url: item.repositoryUrl || null,
    detected_name: item.name || null,
    payload: item.rawPayload || item,
    fetch_status: "fetched",
    sync_run_id: syncRunId,
    fetched_at: new Date().toISOString(),
  };
}
