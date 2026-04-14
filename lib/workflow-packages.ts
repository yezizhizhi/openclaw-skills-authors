import "server-only";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type WorkflowPackageStep = {
  id: string;
  templateStepId?: string;
  stepKey: string;
  stepName: string;
  stepDescription: string;
  isRequired: boolean;
  inputContract: Record<string, string>;
  outputContract: Record<string, string>;
  selectedSkill: {
    skillId?: string | null;
    skillVersionId?: string | null;
    name: string;
    sourceUrl?: string | null;
    selectionReason: string;
  };
};

export type WorkflowPackageDetail = {
  id: string;
  slug: string;
  name: string;
  version: string;
  categorySlug: string;
  audience: string;
  goal: string;
  description: string;
  templateName: string;
  buildSource: string;
  status: string;
  updatedAt: string;
  steps: WorkflowPackageStep[];
};

const staticWorkflowPackages: WorkflowPackageDetail[] = [
  {
    id: "workflow-package-articles-starter",
    slug: "wechat-article-starter-pack",
    name: "公众号成稿 Workflow Pack",
    version: "2026.04.13",
    categorySlug: "articles",
    audience: "内容团队、自媒体作者、品牌编辑",
    goal: "从热点判断一路走到标题与正文成稿，减少临时拼工具的时间。",
    description: "把选题、素材整理、结构搭建、正文写作和终稿润色串成一条更接近真实公众号生产流程的 workflow。",
    templateName: "公众号文章从热点到成稿",
    buildSource: "manual",
    status: "published",
    updatedAt: "2026-04-13T00:00:00.000Z",
    steps: [
      {
        id: "articles-step-01",
        templateStepId: "articles-step-01",
        stepKey: "trend-research",
        stepName: "热点调研",
        stepDescription: "先判断话题是不是值得写，避免写到一半发现没有传播空间。",
        isRequired: true,
        inputContract: { topic: "你想写的主题或事件" },
        outputContract: { insight: "趋势判断、切入角度、参考来源" },
        selectedSkill: {
          skillId: "academic-last30days-clawhub",
          name: "last30days — ClawHub",
          sourceUrl: "https://clawhub.ai/mvanhorn/last30days-official",
          selectionReason: "适合先做热点密度和讨论方向判断。",
        },
      },
      {
        id: "articles-step-02",
        templateStepId: "articles-step-02",
        stepKey: "material-distillation",
        stepName: "素材提炼",
        stepDescription: "把搜到的原始信息收束成可直接下笔的材料。",
        isRequired: true,
        inputContract: { sources: "文章、视频、评论、报告链接" },
        outputContract: { notes: "结构化素材笔记与核心论点" },
        selectedSkill: {
          name: "Summarize / 素材归纳",
          selectionReason: "这一步先保留成通用占位，后续可自动从评分高的摘要类 skills 中选择。",
        },
      },
      {
        id: "articles-step-03",
        templateStepId: "articles-step-03",
        stepKey: "outline",
        stepName: "大纲结构",
        stepDescription: "先固定论点和段落顺序，再开始正文扩写。",
        isRequired: true,
        inputContract: { notes: "已经提炼过的核心材料" },
        outputContract: { outline: "标题、开头、论点顺序、段落结构" },
        selectedSkill: {
          name: "Outline Builder",
          selectionReason: "第二期先把流程骨架搭出来，后续接自动匹配。",
        },
      },
      {
        id: "articles-step-04",
        templateStepId: "articles-step-04",
        stepKey: "drafting",
        stepName: "正文写作",
        stepDescription: "围绕已定结构出第一版成稿。",
        isRequired: true,
        inputContract: { outline: "文章结构和关键信息" },
        outputContract: { draft: "公众号文章初稿" },
        selectedSkill: {
          name: "Article Draft Writer",
          selectionReason: "保留为工作流位点，等待后续接入更细的自动编排。",
        },
      },
      {
        id: "articles-step-05",
        templateStepId: "articles-step-05",
        stepKey: "polish",
        stepName: "终稿质检",
        stepDescription: "检查语言自然度、标题吸引力和 AI 痕迹。",
        isRequired: true,
        inputContract: { draft: "文章初稿" },
        outputContract: { final: "可直接发布版本" },
        selectedSkill: {
          name: "Humanizer / Final QA",
          selectionReason: "保留最后一道润色和发布前检查。",
        },
      },
    ],
  },
  {
    id: "workflow-package-reports-starter",
    slug: "industry-report-delivery-pack",
    name: "行业报告交付 Workflow Pack",
    version: "2026.04.13",
    categorySlug: "reports",
    audience: "咨询团队、增长团队、策略分析师",
    goal: "让报告从资料搜集到管理层摘要有一条清晰产线。",
    description: "适合行业扫描、竞品分析、策略判断和汇报版改写等报告型工作。",
    templateName: "行业报告从调研到汇报版",
    buildSource: "manual",
    status: "published",
    updatedAt: "2026-04-13T00:00:00.000Z",
    steps: [
      {
        id: "reports-step-01",
        templateStepId: "reports-step-01",
        stepKey: "research",
        stepName: "资料搜索",
        stepDescription: "先把可用资料和证据找齐。",
        isRequired: true,
        inputContract: { question: "要回答的行业问题" },
        outputContract: { sources: "报告、新闻、竞品、市场信号" },
        selectedSkill: {
          skillId: "academic-market-research-clawhub",
          name: "Market Research — ClawHub",
          sourceUrl: "https://clawhub.ai/ivangdavila/market-research",
          selectionReason: "适合市场 sizing、竞品映射和需求验证。",
        },
      },
      {
        id: "reports-step-02",
        templateStepId: "reports-step-02",
        stepKey: "synthesis",
        stepName: "重点提炼",
        stepDescription: "把资料转成有判断力的要点。",
        isRequired: true,
        inputContract: { sources: "搜集到的多源材料" },
        outputContract: { findings: "可供汇报使用的核心结论" },
        selectedSkill: {
          skillId: "reports-open-source-maintainer",
          skillVersionId: "github-numman-ali-n-skills-skills-workflow-open-source-maintainer-skills-open-source-ma-3ea8ed4e657d",
          name: "open-source-maintainer",
          sourceUrl: "https://github.com/numman-ali/n-skills/blob/HEAD/skills/workflow/open-source-maintainer/skills/open-source-maintainer/SKILL.md",
          selectionReason: "虽然偏开源维护，但它的 triage / synthesis 逻辑适合转译成报告优先级归纳。",
        },
      },
      {
        id: "reports-step-03",
        templateStepId: "reports-step-03",
        stepKey: "frame",
        stepName: "报告框架",
        stepDescription: "先搭汇报逻辑，再决定呈现顺序。",
        isRequired: true,
        inputContract: { findings: "提炼后的判断和证据" },
        outputContract: { structure: "报告目录、故事线和管理层摘要框架" },
        selectedSkill: {
          name: "Report Structurer",
          selectionReason: "留作结构位点，后续接自动规则挑选。",
        },
      },
      {
        id: "reports-step-04",
        templateStepId: "reports-step-04",
        stepKey: "executive-summary",
        stepName: "汇报版改写",
        stepDescription: "将完整报告压成高层可快速浏览的执行摘要。",
        isRequired: true,
        inputContract: { structure: "完整报告结构和结论" },
        outputContract: { summary: "管理层摘要 / briefing 版" },
        selectedSkill: {
          name: "Executive Summary Rewriter",
          selectionReason: "将第二期下载包做成真正可交付的成品。",
        },
      },
    ],
  },
  {
    id: "workflow-package-academic-starter",
    slug: "academic-kickoff-pack",
    name: "论文开题 Workflow Pack",
    version: "2026.04.13",
    categorySlug: "academic",
    audience: "研究生、学术作者、研究助理",
    goal: "从研究问题到文献综述初稿，快速搭出可继续推进的学术工作流。",
    description: "先定义研究问题，再收集材料、整理摘要、搭研究结构，减少开题期的无序摸索。",
    templateName: "论文开题与综述起步包",
    buildSource: "manual",
    status: "published",
    updatedAt: "2026-04-13T00:00:00.000Z",
    steps: [
      {
        id: "academic-step-01",
        templateStepId: "academic-step-01",
        stepKey: "question",
        stepName: "研究任务定义",
        stepDescription: "把模糊兴趣压缩成清晰问题。",
        isRequired: true,
        inputContract: { topic: "想研究的领域和问题方向" },
        outputContract: { question: "研究问题、范围、假设" },
        selectedSkill: {
          skillId: "academic-last30days-clawhub",
          name: "last30days — ClawHub",
          sourceUrl: "https://clawhub.ai/mvanhorn/last30days-official",
          selectionReason: "先快速看近期开源讨论和外部变化，帮助判断问题是否值得切入。",
        },
      },
      {
        id: "academic-step-02",
        templateStepId: "academic-step-02",
        stepKey: "literature",
        stepName: "文献收集",
        stepDescription: "开始系统抓文献和引用线索。",
        isRequired: true,
        inputContract: { question: "已定义的研究问题" },
        outputContract: { library: "候选论文、资料和引用方向" },
        selectedSkill: {
          skillId: "academic-academic-deep-research-clawhub",
          name: "Academic Deep Research — ClawHub",
          sourceUrl: "https://clawhub.ai/kesslerio/academic-deep-research",
          selectionReason: "这类严谨研究 skill 适合作为学术流程中的主力。",
        },
      },
      {
        id: "academic-step-03",
        templateStepId: "academic-step-03",
        stepKey: "digest",
        stepName: "摘要提炼",
        stepDescription: "把文献整理成能支持开题的笔记。",
        isRequired: true,
        inputContract: { library: "已收集的论文和资料" },
        outputContract: { digest: "摘要、差异点、可引用材料" },
        selectedSkill: {
          name: "Literature Digest",
          selectionReason: "作为摘要位点，后续可根据评分结果自动换成更优技能。",
        },
      },
      {
        id: "academic-step-04",
        templateStepId: "academic-step-04",
        stepKey: "draft",
        stepName: "开题结构",
        stepDescription: "形成综述和开题第一版结构。",
        isRequired: true,
        inputContract: { digest: "整理后的研究笔记" },
        outputContract: { draft: "开题报告 / 文献综述结构稿" },
        selectedSkill: {
          name: "Academic Structure Draft",
          selectionReason: "把 workflow 包先做成可直接下载的研究起步包。",
        },
      },
    ],
  },
];

type DbWorkflowTemplateRow = {
  id: string;
  slug: string;
  name: string;
  category_slug: string;
  audience: string;
  goal: string;
  description: string;
  status: string;
  updated_at: string;
};

type DbWorkflowPackageRow = {
  id: string;
  template_id: string;
  slug: string;
  name: string;
  version: string;
  description: string;
  status: string;
  build_source: string;
  updated_at: string;
};

type DbWorkflowTemplateStepRow = {
  id: string;
  template_id: string;
  step_key: string;
  step_name: string;
  step_description: string;
  is_required: boolean;
  sort_order: number;
  input_contract: Record<string, string>;
  output_contract: Record<string, string>;
};

type DbWorkflowPackageSkillRow = {
  package_id: string;
  template_step_id: string;
  skill_id: string | null;
  skill_version_id: string | null;
  selection_reason: string;
  sort_order: number;
  is_primary: boolean;
  skills: { id: string; name: string; source_url: string | null }[] | null;
  skill_versions: { id: string; name: string; source_url: string | null }[] | null;
};

function logFallback(reason: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[workflow-packages] Falling back to static data: ${reason}`);
  }
}

export function getStaticWorkflowPackages() {
  return staticWorkflowPackages;
}

export function getStaticWorkflowPackageSlugs() {
  return staticWorkflowPackages.map((item) => item.slug);
}

export function getStaticWorkflowPackageDetail(slug: string) {
  return staticWorkflowPackages.find((item) => item.slug === slug) ?? null;
}

export async function getWorkflowPackages() {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return staticWorkflowPackages;
  }

  try {
    const { data: templateRows, error: templateError } = await supabase
      .from("workflow_templates")
      .select("id, slug, name, category_slug, audience, goal, description, status, updated_at")
      .eq("status", "active")
      .order("sort_order", { ascending: true });

    const { data: packageRows, error: packageError } = await supabase
      .from("workflow_packages")
      .select("id, template_id, slug, name, version, description, status, build_source, updated_at")
      .eq("status", "published")
      .order("updated_at", { ascending: false });

    if (templateError || packageError || !templateRows?.length || !packageRows?.length) {
      logFallback(templateError?.message || packageError?.message || "No published workflow packages");
      return staticWorkflowPackages;
    }

    const details = await Promise.all((packageRows as DbWorkflowPackageRow[]).map((row) => getWorkflowPackageDetail(row.slug)));
    return details.filter((item): item is WorkflowPackageDetail => Boolean(item));
  } catch (error) {
    logFallback(error instanceof Error ? error.message : "Unknown error");
    return staticWorkflowPackages;
  }
}

export async function getWorkflowPackagesByCategory(categorySlug: string) {
  const packages = await getWorkflowPackages();
  return packages.filter((item) => item.categorySlug === categorySlug);
}

export async function getWorkflowPackageDetail(slug: string): Promise<WorkflowPackageDetail | null> {
  const fallback = getStaticWorkflowPackageDetail(slug);
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return fallback;
  }

  try {
    const { data: packageRow, error: packageError } = await supabase
      .from("workflow_packages")
      .select("id, template_id, slug, name, version, description, status, build_source, updated_at")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (packageError || !packageRow) {
      logFallback(packageError?.message || `Package ${slug} not found`);
      return fallback;
    }

    const { data: templateRow, error: templateError } = await supabase
      .from("workflow_templates")
      .select("id, slug, name, category_slug, audience, goal, description, status, updated_at")
      .eq("id", packageRow.template_id)
      .maybeSingle();

    if (templateError || !templateRow) {
      logFallback(templateError?.message || `Template for ${slug} not found`);
      return fallback;
    }

    const { data: stepRows, error: stepsError } = await supabase
      .from("workflow_template_steps")
      .select("id, template_id, step_key, step_name, step_description, is_required, sort_order, input_contract, output_contract")
      .eq("template_id", packageRow.template_id)
      .order("sort_order", { ascending: true });

    const { data: selectedSkills, error: selectedSkillsError } = await supabase
      .from("workflow_package_skills")
      .select(`
        package_id,
        template_step_id,
        skill_id,
        skill_version_id,
        selection_reason,
        sort_order,
        is_primary,
        skills ( id, name, source_url ),
        skill_versions ( id, name, source_url )
      `)
      .eq("package_id", packageRow.id)
      .order("sort_order", { ascending: true });

    if (stepsError || selectedSkillsError || !stepRows?.length) {
      logFallback(stepsError?.message || selectedSkillsError?.message || `Steps missing for ${slug}`);
      return fallback;
    }

    const selectedSkillsByStepId = new Map(
      ((selectedSkills ?? []) as DbWorkflowPackageSkillRow[]).map((item) => [item.template_step_id, item]),
    );

    return {
      id: packageRow.id,
      slug: packageRow.slug,
      name: packageRow.name,
      version: packageRow.version,
      categorySlug: (templateRow as DbWorkflowTemplateRow).category_slug,
      audience: (templateRow as DbWorkflowTemplateRow).audience,
      goal: (templateRow as DbWorkflowTemplateRow).goal,
      description: packageRow.description || (templateRow as DbWorkflowTemplateRow).description,
      templateName: (templateRow as DbWorkflowTemplateRow).name,
      buildSource: packageRow.build_source,
      status: packageRow.status,
      updatedAt: packageRow.updated_at,
      steps: (stepRows as DbWorkflowTemplateStepRow[]).map((step) => {
        const selected = selectedSkillsByStepId.get(step.id);
        return {
          id: step.id,
          templateStepId: step.id,
          stepKey: step.step_key,
          stepName: step.step_name,
          stepDescription: step.step_description,
          isRequired: step.is_required,
          inputContract: step.input_contract ?? {},
          outputContract: step.output_contract ?? {},
          selectedSkill: {
            skillId: selected?.skill_id ?? null,
            skillVersionId: selected?.skill_version_id ?? null,
            name: selected?.skills?.[0]?.name || selected?.skill_versions?.[0]?.name || "Unassigned Skill",
            sourceUrl: selected?.skills?.[0]?.source_url || selected?.skill_versions?.[0]?.source_url || null,
            selectionReason: selected?.selection_reason || "No selection reason recorded yet.",
          },
        };
      }),
    };
  } catch (error) {
    logFallback(error instanceof Error ? error.message : "Unknown error");
    return fallback;
  }
}

export async function getWorkflowTemplateOverview() {
  const packages = await getWorkflowPackages();
  return packages.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.templateName,
    categorySlug: item.categorySlug,
    audience: item.audience,
    stepCount: item.steps.length,
    status: item.status,
  }));
}
