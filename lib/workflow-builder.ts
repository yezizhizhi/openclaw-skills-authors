import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

type WorkflowRuleSet = {
  preferredTags: string[];
  blockedTags: string[];
  minFinalScore: number;
  allowedSourceTypes: string[];
};

type WorkflowStepDefinition = {
  id: string;
  stepKey: string;
  stepName: string;
  stepDescription: string;
  sortOrder: number;
  inputContract: Record<string, string>;
  outputContract: Record<string, string>;
  rules: WorkflowRuleSet;
};

type WorkflowTemplateDefinition = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  audience: string;
  goal: string;
  description: string;
  sortOrder: number;
  package: {
    id: string;
    slug: string;
    name: string;
    version: string;
    description: string;
  };
  steps: WorkflowStepDefinition[];
};

type Candidate = {
  final_score: number;
  skill_version_id: string;
  name: string;
  description: string;
  source_type: string;
  source_key: string;
  category_slug: string;
  workflow: string;
  source_url: string | null;
  repository_url: string | null;
  tags: string[];
};

export const workflowTemplateDefinitions: WorkflowTemplateDefinition[] = [
  {
    id: "workflow-template-articles-wechat",
    slug: "wechat-article-workflow",
    name: "公众号文章从热点到成稿",
    categorySlug: "articles",
    audience: "内容团队、自媒体作者、品牌编辑",
    goal: "从热点判断一路走到标题与正文成稿，减少临时拼工具的时间。",
    description: "把选题、素材整理、结构搭建、正文写作和终稿润色串成一条更接近真实公众号生产流程的 workflow。",
    sortOrder: 0,
    package: {
      id: "workflow-package-articles-starter",
      slug: "wechat-article-starter-pack",
      name: "公众号成稿 Workflow Pack",
      version: "2026.04.13",
      description: "把热点调研、素材提炼、大纲、写作和润色串成一整套可下载流程。",
    },
    steps: [
      {
        id: "workflow-template-articles-step-trend",
        stepKey: "trend-research",
        stepName: "热点调研",
        stepDescription: "先判断话题是不是值得写，避免写到一半发现没有传播空间。",
        sortOrder: 0,
        inputContract: { topic: "你想写的主题或事件" },
        outputContract: { insight: "趋势判断、切入角度、参考来源" },
        rules: {
          preferredTags: ["trend", "research", "hot", "market", "搜索", "调研"],
          blockedTags: ["browser", "cli", "orchestration", "maintainer"],
          minFinalScore: 72,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-articles-step-material",
        stepKey: "material-distillation",
        stepName: "素材提炼",
        stepDescription: "把搜到的原始信息收束成可直接下笔的材料。",
        sortOrder: 1,
        inputContract: { sources: "文章、视频、评论、报告链接" },
        outputContract: { notes: "结构化素材笔记与核心论点" },
        rules: {
          preferredTags: ["summary", "summarize", "digest", "整理", "摘要"],
          blockedTags: ["browser", "cli", "maintainer"],
          minFinalScore: 70,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-articles-step-outline",
        stepKey: "outline",
        stepName: "大纲结构",
        stepDescription: "先固定论点和段落顺序，再开始正文扩写。",
        sortOrder: 2,
        inputContract: { notes: "已经提炼过的核心材料" },
        outputContract: { outline: "标题、开头、论点顺序、段落结构" },
        rules: {
          preferredTags: ["outline", "structure", "标题", "结构", "写作"],
          blockedTags: ["browser", "cli"],
          minFinalScore: 70,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-articles-step-draft",
        stepKey: "drafting",
        stepName: "正文写作",
        stepDescription: "围绕已定结构出第一版成稿。",
        sortOrder: 3,
        inputContract: { outline: "文章结构和关键信息" },
        outputContract: { draft: "公众号文章初稿" },
        rules: {
          preferredTags: ["write", "writer", "draft", "正文", "文章"],
          blockedTags: ["browser", "cli", "maintainer"],
          minFinalScore: 70,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-articles-step-polish",
        stepKey: "polish",
        stepName: "终稿质检",
        stepDescription: "检查语言自然度、标题吸引力和 AI 痕迹。",
        sortOrder: 4,
        inputContract: { draft: "文章初稿" },
        outputContract: { final: "可直接发布版本" },
        rules: {
          preferredTags: ["polish", "review", "qa", "humanizer", "润色", "质检"],
          blockedTags: ["browser", "cli"],
          minFinalScore: 70,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
    ],
  },
  {
    id: "workflow-template-reports-industry",
    slug: "industry-report-workflow",
    name: "行业报告从调研到汇报版",
    categorySlug: "reports",
    audience: "咨询团队、增长团队、策略分析师",
    goal: "让报告从资料搜集到管理层摘要有一条清晰产线。",
    description: "适合行业扫描、竞品分析、策略判断和汇报版改写等报告型工作。",
    sortOrder: 1,
    package: {
      id: "workflow-package-reports-starter",
      slug: "industry-report-delivery-pack",
      name: "行业报告交付 Workflow Pack",
      version: "2026.04.13",
      description: "让报告从搜索、提炼、结构化到管理层摘要形成一条交付路径。",
    },
    steps: [
      {
        id: "workflow-template-reports-step-research",
        stepKey: "research",
        stepName: "资料搜索",
        stepDescription: "先把可用资料和证据找齐。",
        sortOrder: 0,
        inputContract: { question: "要回答的行业问题" },
        outputContract: { sources: "报告、新闻、竞品、市场信号" },
        rules: {
          preferredTags: ["research", "search", "market", "industry", "搜索", "调研"],
          blockedTags: ["browser", "cli"],
          minFinalScore: 72,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-reports-step-synthesis",
        stepKey: "synthesis",
        stepName: "重点提炼",
        stepDescription: "把资料转成有判断力的要点。",
        sortOrder: 1,
        inputContract: { sources: "搜集到的多源材料" },
        outputContract: { findings: "可供汇报使用的核心结论" },
        rules: {
          preferredTags: ["summary", "synthesis", "analyze", "report", "maintainer", "提炼"],
          blockedTags: ["browser", "cli"],
          minFinalScore: 72,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-reports-step-frame",
        stepKey: "frame",
        stepName: "报告框架",
        stepDescription: "先搭汇报逻辑，再决定呈现顺序。",
        sortOrder: 2,
        inputContract: { findings: "提炼后的判断和证据" },
        outputContract: { structure: "报告目录、故事线和管理层摘要框架" },
        rules: {
          preferredTags: ["outline", "structure", "report", "框架", "结构"],
          blockedTags: ["browser", "cli"],
          minFinalScore: 70,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-reports-step-summary",
        stepKey: "executive-summary",
        stepName: "汇报版改写",
        stepDescription: "将完整报告压成高层可快速浏览的执行摘要。",
        sortOrder: 3,
        inputContract: { structure: "完整报告结构和结论" },
        outputContract: { summary: "管理层摘要 / briefing 版" },
        rules: {
          preferredTags: ["summary", "brief", "report", "管理层", "摘要"],
          blockedTags: ["browser", "cli"],
          minFinalScore: 70,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
    ],
  },
  {
    id: "workflow-template-academic-kickoff",
    slug: "academic-kickoff-workflow",
    name: "论文开题与综述起步包",
    categorySlug: "academic",
    audience: "研究生、学术作者、研究助理",
    goal: "从研究问题到文献综述初稿，快速搭出可继续推进的学术工作流。",
    description: "先定义研究问题，再收集材料、整理摘要、搭研究结构，减少开题期的无序摸索。",
    sortOrder: 2,
    package: {
      id: "workflow-package-academic-starter",
      slug: "academic-kickoff-pack",
      name: "论文开题 Workflow Pack",
      version: "2026.04.13",
      description: "把研究问题、文献收集、摘要提炼和开题结构编排成一套研究起步包。",
    },
    steps: [
      {
        id: "workflow-template-academic-step-question",
        stepKey: "question",
        stepName: "研究任务定义",
        stepDescription: "把模糊兴趣压缩成清晰问题。",
        sortOrder: 0,
        inputContract: { topic: "想研究的领域和问题方向" },
        outputContract: { question: "研究问题、范围、假设" },
        rules: {
          preferredTags: ["research", "topic", "trend", "question", "研究", "选题"],
          blockedTags: ["browser", "cli", "maintainer"],
          minFinalScore: 72,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-academic-step-literature",
        stepKey: "literature",
        stepName: "文献收集",
        stepDescription: "开始系统抓文献和引用线索。",
        sortOrder: 1,
        inputContract: { question: "已定义的研究问题" },
        outputContract: { library: "候选论文、资料和引用方向" },
        rules: {
          preferredTags: ["academic", "paper", "research", "citation", "文献", "学术"],
          blockedTags: ["browser", "cli"],
          minFinalScore: 72,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-academic-step-digest",
        stepKey: "digest",
        stepName: "摘要提炼",
        stepDescription: "把文献整理成能支持开题的笔记。",
        sortOrder: 2,
        inputContract: { library: "已收集的论文和资料" },
        outputContract: { digest: "摘要、差异点、可引用材料" },
        rules: {
          preferredTags: ["summary", "digest", "abstract", "整理", "摘要"],
          blockedTags: ["browser", "cli"],
          minFinalScore: 70,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
      {
        id: "workflow-template-academic-step-draft",
        stepKey: "draft",
        stepName: "开题结构",
        stepDescription: "形成综述和开题第一版结构。",
        sortOrder: 3,
        inputContract: { digest: "整理后的研究笔记" },
        outputContract: { draft: "开题报告 / 文献综述结构稿" },
        rules: {
          preferredTags: ["write", "draft", "structure", "academic", "写作", "结构"],
          blockedTags: ["browser", "cli"],
          minFinalScore: 70,
          allowedSourceTypes: ["clawhub", "github"],
        },
      },
    ],
  },
];

function getVersion() {
  const date = new Date();
  return [date.getUTCFullYear(), String(date.getUTCMonth() + 1).padStart(2, "0"), String(date.getUTCDate()).padStart(2, "0")].join(".");
}

function normalizeText(value: string) {
  return String(value || "").toLowerCase();
}

function scoreCandidateForStep(candidate: Candidate, step: WorkflowStepDefinition, template: WorkflowTemplateDefinition) {
  const haystack = [
    candidate.name,
    candidate.description,
    candidate.workflow,
    ...candidate.tags,
    candidate.category_slug,
    template.categorySlug,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const preferred = step.rules.preferredTags.reduce((sum, keyword) => sum + (haystack.includes(normalizeText(keyword)) ? 18 : 0), 0);
  const blocked = step.rules.blockedTags.reduce((sum, keyword) => sum + (haystack.includes(normalizeText(keyword)) ? 30 : 0), 0);
  const sourceBonus = candidate.source_type === "clawhub" ? 8 : 0;
  const categoryBonus = candidate.category_slug === template.categorySlug ? 16 : 0;
  const workflowBonus = haystack.includes(normalizeText(step.stepName)) ? 15 : 0;

  return candidate.final_score + preferred + sourceBonus + categoryBonus + workflowBonus - blocked;
}

async function loadCandidates(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("skill_evaluations")
    .select(`
      id,
      final_score,
      status,
      publish_decision,
      needs_review,
      suggested_category_slug,
      suggested_workflow,
      skill_version_id,
      skill_versions (
        id,
        name,
        description,
        source_type,
        source_key,
        category_slug,
        workflow,
        source_url,
        repository_url,
        tags
      )
    `)
    .eq("publish_decision", "publish")
    .eq("status", "approved")
    .eq("needs_review", false)
    .order("evaluated_at", { ascending: false });

  if (error) {
    throw error;
  }

  const byVersion = new Map<string, Candidate>();
  for (const row of data ?? []) {
    const version = Array.isArray(row.skill_versions) ? row.skill_versions[0] : row.skill_versions;
    if (!version?.id || byVersion.has(version.id)) continue;
    byVersion.set(version.id, {
      final_score: row.final_score,
      skill_version_id: version.id,
      name: version.name,
      description: version.description,
      source_type: version.source_type,
      source_key: version.source_key,
      category_slug: version.category_slug || row.suggested_category_slug,
      workflow: version.workflow || row.suggested_workflow,
      source_url: version.source_url,
      repository_url: version.repository_url,
      tags: Array.isArray(version.tags) ? version.tags.map(String) : [],
    });
  }
  return Array.from(byVersion.values());
}

async function resolveSkillId(supabase: SupabaseClient, candidate: Candidate) {
  const { data } = await supabase
    .from("skills")
    .select("id,name,source_url")
    .eq("source_type", candidate.source_type)
    .eq("source_key", candidate.source_key)
    .maybeSingle();
  return data ?? null;
}

export async function seedWorkflowTemplates(supabase: SupabaseClient) {
  for (const template of workflowTemplateDefinitions) {
    await supabase.from("workflow_templates").upsert({
      id: template.id,
      slug: template.slug,
      name: template.name,
      category_slug: template.categorySlug,
      audience: template.audience,
      goal: template.goal,
      description: template.description,
      status: "active",
      sort_order: template.sortOrder,
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });

    for (const step of template.steps) {
      await supabase.from("workflow_template_steps").upsert({
        id: step.id,
        template_id: template.id,
        step_key: step.stepKey,
        step_name: step.stepName,
        step_description: step.stepDescription,
        sort_order: step.sortOrder,
        is_required: true,
        input_contract: step.inputContract,
        output_contract: step.outputContract,
      }, { onConflict: "id" });

      const { data: existingRules } = await supabase
        .from("workflow_step_skill_rules")
        .select("id")
        .eq("template_step_id", step.id)
        .limit(1);

      if (!existingRules?.length) {
        await supabase.from("workflow_step_skill_rules").insert({
          template_step_id: step.id,
          preferred_tags: step.rules.preferredTags,
          blocked_tags: step.rules.blockedTags,
          min_final_score: step.rules.minFinalScore,
          allowed_source_types: step.rules.allowedSourceTypes,
        });
      }
    }
  }
}

export async function buildWorkflowPackages(supabase: SupabaseClient) {
  const candidates = await loadCandidates(supabase);
  const results: Array<{ template: string; package: string; assignedCount: number; totalSteps: number }> = [];

  for (const template of workflowTemplateDefinitions) {
    const manifestSteps = [];
    let assignedCount = 0;

    await supabase.from("workflow_packages").upsert({
      id: template.package.id,
      template_id: template.id,
      slug: template.package.slug,
      name: template.package.name,
      version: getVersion(),
      description: template.package.description,
      status: "published",
      build_source: "auto",
      manifest_json: {},
      updated_at: new Date().toISOString(),
      published_at: new Date().toISOString(),
    }, { onConflict: "id" });

    const { data: existingPackageSkills } = await supabase
      .from("workflow_package_skills")
      .select("id")
      .eq("package_id", template.package.id);

    if (existingPackageSkills?.length) {
      await supabase.from("workflow_package_skills").delete().eq("package_id", template.package.id);
    }

    const usedVersionIds = new Set<string>();
    for (const step of template.steps) {
      const allowedSources = new Set(step.rules.allowedSourceTypes);
      const filtered = candidates.filter((candidate) => {
        if (allowedSources.size && !allowedSources.has(candidate.source_type)) return false;
        if (candidate.final_score < step.rules.minFinalScore) return false;
        if (usedVersionIds.has(candidate.skill_version_id)) return false;
        return true;
      });

      const ranked = filtered
        .map((candidate) => ({ candidate, rank: scoreCandidateForStep(candidate, step, template) }))
        .sort((a, b) => b.rank - a.rank);

      const winner = ranked[0]?.candidate ?? null;
      const linkedSkill = winner ? await resolveSkillId(supabase, winner) : null;

      if (winner) {
        usedVersionIds.add(winner.skill_version_id);
        assignedCount += 1;
      }

      await supabase.from("workflow_package_skills").insert({
        package_id: template.package.id,
        template_step_id: step.id,
        skill_id: linkedSkill?.id ?? null,
        skill_version_id: winner?.skill_version_id ?? null,
        selection_reason: winner
          ? `Auto-selected from approved skills with score ${winner.final_score} for step "${step.stepName}".`
          : `No approved skill met the current rules for "${step.stepName}". Keep as placeholder for manual curation or future syncs.`,
        is_primary: true,
        sort_order: step.sortOrder,
      });

      manifestSteps.push({
        step_key: step.stepKey,
        step_name: step.stepName,
        skill_id: linkedSkill?.id ?? null,
        skill_version_id: winner?.skill_version_id ?? null,
        selected_skill_name: linkedSkill?.name || winner?.name || "Unassigned Skill",
      });
    }

    await supabase.from("workflow_packages").update({
      version: getVersion(),
      manifest_json: {
        template_slug: template.slug,
        generated_at: new Date().toISOString(),
        assigned_step_count: assignedCount,
        total_step_count: template.steps.length,
        steps: manifestSteps,
      },
      updated_at: new Date().toISOString(),
    }).eq("id", template.package.id);

    results.push({
      template: template.slug,
      package: template.package.slug,
      assignedCount,
      totalSteps: template.steps.length,
    });
  }

  return results;
}

export async function refreshWorkflowPackageManifest(supabase: SupabaseClient, packageId: string) {
  const { data: packageRow, error: packageError } = await supabase
    .from("workflow_packages")
    .select("id, slug, template_id")
    .eq("id", packageId)
    .maybeSingle();

  if (packageError || !packageRow) {
    throw packageError || new Error(`Workflow package ${packageId} not found.`);
  }

  const template = workflowTemplateDefinitions.find((item) => item.id === packageRow.template_id);
  if (!template) {
    throw new Error(`Template definition not found for package ${packageId}.`);
  }

  const { data: selections, error: selectionsError } = await supabase
    .from("workflow_package_skills")
    .select(`
      package_id,
      template_step_id,
      skill_id,
      skill_version_id,
      selection_reason,
      sort_order,
      skills ( id, name, source_url ),
      skill_versions ( id, name, source_url )
    `)
    .eq("package_id", packageId)
    .order("sort_order", { ascending: true });

  if (selectionsError) {
    throw selectionsError;
  }

  const assignedCount = (selections ?? []).filter((item) => item.skill_id || item.skill_version_id).length;
  const manifestSteps = (selections ?? []).map((item) => {
    const step = template.steps.find((currentStep) => currentStep.id === item.template_step_id);
    const selectedSkill = Array.isArray(item.skills) ? item.skills[0] : item.skills;
    const selectedVersion = Array.isArray(item.skill_versions) ? item.skill_versions[0] : item.skill_versions;

    return {
      step_key: step?.stepKey || item.template_step_id,
      step_name: step?.stepName || item.template_step_id,
      skill_id: item.skill_id,
      skill_version_id: item.skill_version_id,
      selected_skill_name: selectedSkill?.name || selectedVersion?.name || "Unassigned Skill",
    };
  });

  const { error: updateError } = await supabase
    .from("workflow_packages")
    .update({
      build_source: "manual_override",
      version: getVersion(),
      manifest_json: {
        template_slug: template.slug,
        generated_at: new Date().toISOString(),
        assigned_step_count: assignedCount,
        total_step_count: template.steps.length,
        steps: manifestSteps,
      },
      updated_at: new Date().toISOString(),
    })
    .eq("id", packageId);

  if (updateError) {
    throw updateError;
  }

  return {
    packageId,
    assignedCount,
    totalSteps: template.steps.length,
  };
}
