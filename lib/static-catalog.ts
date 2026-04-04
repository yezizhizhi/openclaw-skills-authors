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
  "articles:全流程公众号写作": ["公众号写作", "公众号全流程", "公众号发稿"],
  "articles:选题热度调研": ["热度调研", "平台热点", "新闻追踪", "话题趋势"],
  "articles:选题策划": ["选题方向", "营销策划", "评论视角", "选题策划"],
  "articles:素材处理": ["素材整理", "资料处理", "视频转稿", "内容提炼"],
  "articles:大纲结构": ["大纲创建", "结构规划", "文章骨架", "长文提纲"],
  "articles:正文写作": ["正文生成", "长文写作", "稿件写作", "文章成稿"],
  "articles:终稿质检": ["终稿校对", "AI痕迹", "发布校对", "质检修订"],
  "copywriting:爆款拆解": ["爆款分析", "热门拆解", "选题爆点"],
  "copywriting:情绪钩子": ["钩子设计", "情绪开场", "开头钩子"],
  "copywriting:内容生成": ["正文生成", "文案生成", "内容起稿"],
  "copywriting:平台改写": ["平台适配", "多平台改写", "渠道改写"],
  "copywriting:转化优化": ["转化提升", "行动引导", "cta优化"],
  "copywriting:发布适配": ["发布适配", "发布前适配", "渠道适配"],
  "reports:任务定义": ["任务澄清", "brief", "目标拆解", "商业计划", "项目规划", "汇报目标"],
  "reports:资料收集 / 信息搜索": ["资料收集", "资料搜集", "信息搜索", "行业研究", "深度调研", "趋势验证"],
  "reports:资料归档 / 输入接入": ["资料归档", "输入接入", "文档接入", "pdf转markdown", "会议资料", "企业文档库"],
  "reports:清洗整理 / 重点提炼": ["清洗整理", "重点提炼", "摘要提炼", "转录整理", "重点归纳", "笔记整理"],
  "reports:分析归纳 / 形成判断": ["分析归纳", "形成判断", "竞品分析", "数据分析", "结论归纳", "需求洞察"],
  "reports:框架搭建 / 报告成稿": ["框架搭建", "报告成稿", "汇报逻辑", "ppt底稿", "正式报告", "pdf输出"],
  "reports:摘要压缩 / 汇报版改写": ["摘要压缩", "汇报版改写", "briefing", "日报摘要", "管理层速览", "简报生成"],
  "reports:逻辑校对 / 终稿质检": ["逻辑校对", "终稿质检", "语言润色", "格式统一", "一致性检查", "去ai味"],
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
  "articles:wechat-writer": ["全流程公众号写作", "正文写作", "终稿质检"],
  "articles:WeChat MP Multi-Publisher": ["全流程公众号写作"],
  "articles:Last30days": ["选题热度调研"],
  "articles:Hacker News Daily": ["选题热度调研"],
  "articles:Tavily Web Search": ["选题热度调研", "素材处理"],
  "articles:Brave Search": ["选题热度调研", "素材处理"],
  "articles:Marketing Mode": ["选题策划", "正文写作"],
  "articles:Marketing Skills": ["选题策划", "正文写作"],
  "articles:SEO": ["选题策划"],
  "articles:Summarize": ["素材处理"],
  "articles:OpenClaw YouTube Transcript": ["素材处理"],
  "articles:Nano Pdf": ["素材处理"],
  "articles:WeChat Article Extractor": ["素材处理"],
  "articles:SEO Content Writer": ["大纲结构", "正文写作"],
  "articles:Humanizer": ["终稿质检"],
  "articles:self-improving-agent": ["终稿质检"],
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
  "articles:wechat-writer": "https://clawhub.ai/wzdavid/wechat-writer",
  "articles:WeChat MP Multi-Publisher": "https://clawhub.ai/x402spark-jpg/wechat-multi-publisher",
  "articles:Last30days": "https://clawhub.ai/mvanhorn/last30days-official",
  "articles:Hacker News Daily": "https://clawhub.ai/osgood001/hn-daily",
  "articles:Tavily Web Search": "https://clawhub.ai/arun-8687/tavily-search",
  "articles:Brave Search": "https://clawhub.ai/steipete/brave-search",
  "articles:Marketing Mode": "https://clawhub.ai/TheSethRose/marketing-mode",
  "articles:Marketing Skills": "https://clawhub.ai/jchopard69/marketing-skills",
  "articles:SEO": "https://clawhub.ai/ivangdavila/seo",
  "articles:Summarize": "https://clawhub.ai/steipete/summarize",
  "articles:OpenClaw YouTube Transcript": "https://clawhub.ai/YoavRez/openclaw-youtube-transcript",
  "articles:Nano Pdf": "https://clawhub.ai/steipete/nano-pdf",
  "articles:WeChat Article Extractor": "https://clawhub.ai/freestylefly/wechat-article-extractor-skill",
  "articles:SEO Content Writer": "https://clawhub.ai/aaron-he-zhu/seo-content-writer",
  "articles:Humanizer": "https://clawhub.ai/biostartechnology/humanizer",
  "articles:self-improving-agent": "https://clawhub.ai/pskoett/self-improving-agent",
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
