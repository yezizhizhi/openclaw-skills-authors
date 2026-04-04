import { categories } from "@/lib/site-data";
import type { CategoryExplorerData, ExplorerScenario, ExplorerSkill } from "@/lib/skill-search";

const scenarioAliases: Record<string, string[]> = {
  "books:素材清洗": ["素材整理", "资料清洗", "资料整理"],
  "books:角色设定": ["人物设定", "角色创建", "角色塑造"],
  "books:章节大纲": ["大纲创建", "大纲生成", "章节规划"],
  "books:初稿扩写": ["样稿写作", "扩写正文", "正文扩写"],
  "books:风格润色": ["文风润色", "语气调整", "风格调整"],
  "books:交叉校对": ["终稿质检", "逻辑校对", "全文校对"],
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
  "books:Chapter Blueprint Forge": ["素材清洗", "章节大纲"],
  "books:Character Depth Studio": ["角色设定", "章节大纲"],
  "books:Draft Expansion Flow": ["初稿扩写", "风格润色"],
  "books:Continuity Revision Guard": ["风格润色", "交叉校对"],
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
      sourceUrl: null,
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
      category.featuredSkills,
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

export function getStaticCategoryExplorerData(categorySlug: string) {
  return staticCategoryExplorerData.get(categorySlug) ?? null;
}
