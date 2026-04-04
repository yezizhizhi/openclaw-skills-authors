import { categories } from "@/lib/site-data";
import type { CategoryExplorerData, ExplorerScenario, ExplorerSkill } from "@/lib/skill-search";

export type StaticSkillDetail = ExplorerSkill & {
  categoryLabel: string;
  categoryTitle: string;
  categorySubtitle: string;
  categoryDescription: string;
  workflowTags: string[];
  scenarioNames: string[];
};

const scenarioAliases: Record<string, string[]> = {
  "books:选题调研": ["选题分析", "市场调研", "热点判断"],
  "books:资料搜集": ["资料收集", "深度研究", "一手资料"],
  "books:素材整理": ["资料整理", "知识库整理", "素材归纳"],
  "books:大纲创建": ["大纲生成", "结构搭建", "章节框架"],
  "books:正文写作": ["样稿写作", "全书写稿", "章节成稿"],
  "books:质检修订": ["终稿质检", "逻辑校对", "AI痕迹修订"],
  "articles:选题拆解": ["选题方向", "选题分析", "角度拆解"],
  "articles:提纲整理": ["提纲创建", "结构提纲", "文章提纲"],
  "articles:观点展开": ["论点展开", "内容展开", "观点延展"],
  "articles:标题优化": ["标题打磨", "标题生成", "标题修改"],
  "articles:段落润色": ["段落优化", "语句润色", "全文润色"],
  "articles:发布前校对": ["发布检查", "发布前检查", "发文校对"],
  "copywriting:爆款拆解": ["爆款分析", "热门拆解", "选题爆点"],
  "copywriting:情绪钩子": ["钩子设计", "情绪开场", "开头钩子"],
  "copywriting:内容生成": ["正文生成", "文案生成", "内容起稿"],
  "copywriting:平台改写": ["平台适配", "多平台改写", "渠道改写"],
  "copywriting:转化优化": ["转化提升", "行动引导", "cta优化"],
  "copywriting:发布适配": ["发布适配", "发布前适配", "渠道适配"],
  "reports:资料归纳": ["资料整理", "材料归纳", "原始资料处理"],
  "reports:框架整理": ["框架搭建", "结构梳理", "框架规划"],
  "reports:重点提炼": ["重点摘要", "关键提炼", "结论提炼"],
  "reports:报告成稿": ["报告撰写", "报告写稿", "报告写作"],
  "reports:摘要压缩": ["执行摘要", "摘要提炼", "摘要压缩"],
  "reports:逻辑校对": ["逻辑检查", "论证检查", "结构校对"],
  "academic:文献整理": ["文献归纳", "研究整理", "文献分类"],
  "academic:摘要提炼": ["摘要润色", "摘要优化", "研究摘要"],
  "academic:结构检查": ["结构校对", "章节检查", "逻辑结构"],
  "academic:语言润色": ["学术润色", "语言优化", "措辞校对"],
  "academic:引用辅助": ["引用整理", "参考文献", "引文辅助"],
  "academic:逻辑一致性": ["逻辑检查", "一致性校对", "前后统一"],
  "courses:课程定位": ["课程方向", "课程策划", "受众定位"],
  "courses:大纲规划": ["课程大纲", "课纲设计", "模块规划"],
  "courses:讲义整理": ["讲义编排", "讲义结构", "讲义制作"],
  "courses:案例设计": ["案例策划", "案例组织", "示例设计"],
  "courses:脚本编写": ["授课脚本", "课程脚本", "讲解脚本"],
  "courses:表达优化": ["表达润色", "讲解优化", "表达打磨"],
};

const skillScenarioNames: Record<string, string[]> = {
  "books:Last30days": ["选题调研"],
  "books:Google News API Skill": ["选题调研"],
  "books:Google Trends": ["选题调研"],
  "books:Web Search by Exa": ["选题调研", "资料搜集"],
  "books:Academic Deep Research": ["资料搜集"],
  "books:Deep Research Pro": ["资料搜集"],
  "books:Web Search Plus": ["资料搜集"],
  "books:Perplexity": ["资料搜集"],
  "books:Faster Whisper": ["资料搜集"],
  "books:OpenClaw YouTube Transcript": ["资料搜集"],
  "books:Summarize": ["素材整理"],
  "books:Nano Pdf": ["素材整理"],
  "books:Ontology": ["素材整理"],
  "books:Obsidian": ["素材整理"],
  "books:Notion": ["素材整理"],
  "books:SEO Content Writer": ["大纲创建", "正文写作"],
  "books:Marketing Mode": ["大纲创建", "正文写作"],
  "books:Marketing Skills": ["正文写作"],
  "books:Humanizer": ["质检修订"],
  "books:self-improving-agent": ["质检修订"],
  "articles:Angle Finder Brief": ["选题拆解", "提纲整理", "观点展开"],
  "articles:Headline Refinery": ["标题优化", "段落润色", "发布前校对"],
  "copywriting:Hook Pulse Lab": ["爆款拆解", "情绪钩子", "内容生成"],
  "copywriting:Platform Rewrite Switcher": ["平台改写", "转化优化", "发布适配"],
  "reports:Executive Summary Press": ["资料归纳", "重点提炼", "报告成稿", "摘要压缩"],
  "reports:Logic Line Checker": ["框架整理", "报告成稿", "逻辑校对"],
  "academic:Literature Review Mapper": ["文献整理", "摘要提炼", "结构检查"],
  "academic:Abstract Precision Editor": ["摘要提炼", "语言润色", "引用辅助", "逻辑一致性"],
  "courses:Course Outline Architect": ["课程定位", "大纲规划", "讲义整理"],
  "courses:Lesson Script Polish Coach": ["案例设计", "脚本编写", "表达优化"],
};

const skillSourceUrls: Record<string, string> = {
  "books:Last30days": "https://clawhub.ai/mvanhorn/last30days-official",
  "books:Google News API Skill": "https://clawhub.ai/phheng/google-news-api-skill",
  "books:Google Trends": "https://clawhub.ai/satnamra/google-trends",
  "books:Web Search by Exa": "https://clawhub.ai/theishangoswami/web-search-exa",
  "books:Academic Deep Research": "https://clawhub.ai/kesslerio/academic-deep-research",
  "books:Deep Research Pro": "https://clawhub.ai/parags/deep-research-pro",
  "books:Web Search Plus": "https://clawhub.ai/robbyczgw-cla/web-search-plus",
  "books:Perplexity": "https://clawhub.ai/zats/perplexity",
  "books:Faster Whisper": "https://clawhub.ai/theplasmak/faster-whisper",
  "books:OpenClaw YouTube Transcript": "https://clawhub.ai/YoavRez/openclaw-youtube-transcript",
  "books:Summarize": "https://clawhub.ai/steipete/summarize",
  "books:Nano Pdf": "https://clawhub.ai/steipete/nano-pdf",
  "books:Ontology": "https://clawhub.ai/oswalpalash/ontology",
  "books:Obsidian": "https://clawhub.ai/steipete/obsidian",
  "books:Notion": "https://clawhub.ai/steipete/notion",
  "books:SEO Content Writer": "https://clawhub.ai/aaron-he-zhu/seo-content-writer",
  "books:Marketing Mode": "https://clawhub.ai/TheSethRose/marketing-mode",
  "books:Marketing Skills": "https://clawhub.ai/jchopard69/marketing-skills",
  "books:Humanizer": "https://clawhub.ai/biostartechnology/humanizer",
  "books:self-improving-agent": "https://clawhub.ai/pskoett/self-improving-agent",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getScenarioId(categorySlug: string, scenarioName: string) {
  return `${categorySlug}-${slugify(scenarioName)}`;
}

function getSkillId(categorySlug: string, skillName: string) {
  return `${categorySlug}-${slugify(skillName)}`;
}

function buildScenarios(categorySlug: string, workflowTags: string[]): ExplorerScenario[] {
  return workflowTags.map((tag, index) => ({
    id: getScenarioId(categorySlug, tag),
    categorySlug,
    name: tag,
    sortOrder: index,
    aliases: scenarioAliases[`${categorySlug}:${tag}`] ?? [],
  }));
}

function buildSkills(
  categorySlug: string,
  categoryLabel: string,
  workflowTags: string[],
  featuredSkills: typeof categories[number]["featuredSkills"],
): ExplorerSkill[] {
  const scenarioIdByName = new Map(
    workflowTags.map((tag) => [tag, getScenarioId(categorySlug, tag)]),
  );

  return featuredSkills.map((skill, index) => {
    const mappedScenarioNames = skillScenarioNames[`${categorySlug}:${skill.name}`] ?? [skill.workflow];
    const scenarioIds = mappedScenarioNames
      .map((name) => scenarioIdByName.get(name))
      .filter((value): value is string => Boolean(value));

    return {
      id: getSkillId(categorySlug, skill.name),
      categorySlug,
      name: skill.name,
      workflow: skill.workflow,
      description: skill.description,
      models: skill.models,
      tags: [categoryLabel, skill.workflow, skill.badge ?? "精选"].filter(Boolean),
      badge: skill.badge,
      sourceUrl: skill.sourceUrl ?? skillSourceUrls[`${categorySlug}:${skill.name}`] ?? null,
      installMode:
        skill.primaryAction === "Download Skill Pack"
          ? "download"
          : skill.primaryAction === "View Source Notes"
            ? "view_source"
            : "copy_config",
      primaryAction: skill.primaryAction,
      inputPreview: skill.inputPreview,
      outputPreview: skill.outputPreview,
      configSnippet: skill.configSnippet,
      sortOrder: index,
      scenarioIds,
    };
  });
}

const staticCategoryExplorerData = new Map<string, CategoryExplorerData>(
  categories.map((category) => {
    const scenarios = buildScenarios(category.slug, category.workflowTags);
    const skills = buildSkills(
      category.slug,
      category.navLabel,
      category.workflowTags,
      category.catalogSkills ?? category.featuredSkills,
    );

    return [
      category.slug,
      {
        categorySlug: category.slug,
        workflowTags: scenarios.map((scenario) => scenario.name),
        scenarios,
        skills,
      },
    ];
  }),
);

const staticSkillDetails = new Map<string, StaticSkillDetail>();

for (const category of categories) {
  const categoryExplorer = staticCategoryExplorerData.get(category.slug);

  if (!categoryExplorer) {
    continue;
  }

  const scenarioNameById = new Map(
    categoryExplorer.scenarios.map((scenario) => [scenario.id, scenario.name]),
  );

  for (const skill of categoryExplorer.skills) {
    staticSkillDetails.set(skill.id, {
      ...skill,
      categoryLabel: category.navLabel,
      categoryTitle: category.heroTitle,
      categorySubtitle: category.heroSubtitle,
      categoryDescription: category.heroDescription,
      workflowTags: category.workflowTags,
      scenarioNames: skill.scenarioIds
        .map((scenarioId) => scenarioNameById.get(scenarioId))
        .filter((value): value is string => Boolean(value)),
    });
  }
}

export function getStaticCategoryExplorerData(categorySlug: string) {
  return staticCategoryExplorerData.get(categorySlug) ?? null;
}

export function getStaticSkillDetail(skillId: string) {
  return staticSkillDetails.get(skillId) ?? null;
}

export function getStaticSkillIds() {
  return Array.from(staticSkillDetails.keys());
}
