export type FaqItem = {
  question: string;
  answer: string;
};

export type SkillPreview = {
  name: string;
  version: string;
  workflow: string;
  description: string;
  sourceUrl?: string;
  models: string[];
  inputPreview: string;
  outputPreview: string;
  primaryAction: string;
  configSnippet: string;
  badge?: string;
};

type AudienceBullet = {
  kicker: string;
  title: string;
  copy: string;
};

type FlowCard = {
  title: string;
  copy: string;
};

export type Category = {
  slug: string;
  navLabel: string;
  cardSubtitle: string;
  cardCopy: string;
  metaTitle: string;
  metaDescription: string;
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  workflowTags: string[];
  audienceTitle: string;
  audienceCopy: string;
  audienceBullets: AudienceBullet[];
  flowDescription: string;
  flowCards: FlowCard[];
  featuredSkills: SkillPreview[];
  catalogSkills?: SkillPreview[];
  pageCtaTitle: string;
  pageCtaCopy: string;
  faqs: FaqItem[];
};

export const workflowStages = [
  {
    title: "灵感捕捉",
    copy: "从采访记录、选题池、碎片笔记和参考资料里找出真正值得继续推进的写作方向。",
  },
  {
    title: "资料整理",
    copy: "把散落的信息源先清洗成可复用材料，避免边写边找、来回跳转。",
  },
  {
    title: "大纲搭建",
    copy: "把主题、结构、章节关系和节奏先搭好，让后续扩写更顺。",
  },
  {
    title: "初稿生成",
    copy: "围绕既定结构扩写内容，让草稿先成形，再进入风格和细节处理。",
  },
  {
    title: "风格润色",
    copy: "让语气、节奏和信息密度更符合目标读者，而不是只做表面替换。",
  },
  {
    title: "审校修订",
    copy: "检查逻辑一致性、信息重复、错漏和前后冲突，减少返工。",
  },
];

export const reasons = [
  {
    title: "按创作流程筛选，找 Skill 更快",
    copy: "不是把仓库链接堆在一起，而是按作者真实会遇到的任务和阶段整理，让入口更像工作流导航。",
  },
  {
    title: "更适合创作者的说明方式",
    copy: "先讲每个 Skill 帮你解决什么问题，再讲如何安装和使用，减少非技术背景用户的理解门槛。",
  },
  {
    title: "先验证视觉，再接动态数据",
    copy: "这一版先把首页、分类页和卡片交互做对，等版式和信息密度稳定下来，再接 Google Sheets 和嵌入层。",
  },
];

export const installModes = [
  {
    badge: "Quick Start",
    title: "Copy Config",
    copy: "适合想立刻试一下的用户。直接复制一段配置或提示模板，快速进入工作流。",
  },
  {
    badge: "Bundle",
    title: "Download Pack",
    copy: "适合需要完整模板包或补充文件的用户。下一阶段会接入真实下载链接和版本字段。",
  },
  {
    badge: "Inspect",
    title: "View Source",
    copy: "适合想进一步确认来源、许可证或自己二次调整的用户。现在先保留为结构入口。",
  },
];

export const homeFaqs: FaqItem[] = [
  {
    question: "为什么首页先做静态卡片，而不是直接接动态库？",
    answer:
      "因为现在最需要先验证的是视觉风格、信息密度和按钮路径。等版式确定后，再接数据层和外部嵌入会更稳。",
  },
  {
    question: "这个原型最终会部署到 Google Sites 吗？",
    answer:
      "可以。当前这版是 Next.js 静态原型，用来把结构和交互跑通；后续可以迁移视觉稿，或把动态列表作为嵌入层接到 Google Sites。",
  },
  {
    question: "首页为什么同时保留题材和流程两种入口？",
    answer:
      "因为作者找工具时通常有两种路径：一种是按自己正在写什么，一种是按自己卡在什么阶段。两种入口都保留，转化会更顺。",
  },
  {
    question: "现在这些 Skill 名称是真实收录项吗？",
    answer:
      "当前先作为卡片原型的样例字段，帮助我们确认页面节奏和说明方式。下一阶段接入真实来源后，这些位置会替换成实际数据。",
  },
];

const booksCatalogSkills: SkillPreview[] = [
  {
    name: "Last30days",
    version: "ClawHub verified",
    workflow: "选题调研",
    description: "聚合多平台近 30 天热点，自动去重评分并输出趋势报告，适合判断一本书值不值得写。",
    sourceUrl: "https://clawhub.ai/mvanhorn/last30days-official",
    models: ["OpenClaw"],
    inputPreview: "想知道某个选题最近是不是正在升温，读者真实在讨论什么。",
    outputPreview: "输出近期热点、话题趋势和带来源引用的调研结果。",
    primaryAction: "ClawHub ↗",
    badge: "Editor’s Choice",
    configSnippet: `skill: Last30days
source: https://clawhub.ai/mvanhorn/last30days-official
category: books
focus: 选题调研`,
  },
  {
    name: "Google News API Skill",
    version: "ClawHub verified",
    workflow: "选题调研",
    description: "按关键词和时间段抓取 Google News，适合纪实和商业书做行业监控、竞品追踪、媒体热度分析。",
    sourceUrl: "https://clawhub.ai/phheng/google-news-api-skill",
    models: ["OpenClaw"],
    inputPreview: "要判断某个领域最近的新闻密度、媒体关注度和事件脉络。",
    outputPreview: "返回标题、来源、时间和原文链接，快速搭起新闻素材池。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Google News API Skill
source: https://clawhub.ai/phheng/google-news-api-skill
category: books
focus: 选题调研`,
  },
  {
    name: "Google Trends",
    version: "ClawHub verified",
    workflow: "选题调研",
    description: "分析搜索量、地域分布和相关话题，适合判断方法论和商业类书稿的市场潜力。",
    sourceUrl: "https://clawhub.ai/satnamra/google-trends",
    models: ["OpenClaw"],
    inputPreview: "想判断某个书名方向或关键词是否具备持续增长空间。",
    outputPreview: "给出趋势对比、相关主题和热度变化信号。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Google Trends
source: https://clawhub.ai/satnamra/google-trends
category: books
focus: 选题调研`,
  },
  {
    name: "Web Search by Exa",
    version: "ClawHub verified",
    workflow: "选题调研",
    description: "按语义搜索论文、报告和人物资料，适合纪实、文学和方法论书的深度背景调研。",
    sourceUrl: "https://clawhub.ai/theishangoswami/web-search-exa",
    models: ["OpenClaw"],
    inputPreview: "需要跳出关键词检索，快速理解一个主题背后的背景材料。",
    outputPreview: "返回更贴近问题本身的语义检索结果和高质量来源。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Web Search by Exa
source: https://clawhub.ai/theishangoswami/web-search-exa
category: books
focus: 选题调研`,
  },
  {
    name: "Academic Deep Research",
    version: "ClawHub verified",
    workflow: "资料搜集",
    description: "按严谨研究流程循环搜集资料并生成 APA 7 引用，适合纪实、方法论和商业书稿。",
    sourceUrl: "https://clawhub.ai/kesslerio/academic-deep-research",
    models: ["OpenClaw"],
    inputPreview: "需要带引用地收集文献与研究材料，保证资料可信度。",
    outputPreview: "输出分轮研究结果、引用格式和研究计划检查点。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Academic Deep Research
source: https://clawhub.ai/kesslerio/academic-deep-research
category: books
focus: 资料搜集`,
  },
  {
    name: "Deep Research Pro",
    version: "ClawHub verified",
    workflow: "资料搜集",
    description: "把研究主题拆成子问题并行搜索多个来源，生成带引用的结构化 Markdown 报告。",
    sourceUrl: "https://clawhub.ai/parags/deep-research-pro",
    models: ["OpenClaw"],
    inputPreview: "一个主题下有很多支线问题，需要系统梳理后再写作。",
    outputPreview: "输出带引用的研究报告和已拆解的子问题结构。",
    primaryAction: "ClawHub ↗",
    badge: "Editor’s Choice",
    configSnippet: `skill: Deep Research Pro
source: https://clawhub.ai/parags/deep-research-pro
category: books
focus: 资料搜集`,
  },
  {
    name: "Web Search Plus",
    version: "ClawHub verified",
    workflow: "资料搜集",
    description: "聚合 7 大搜索引擎并自动路由最优引擎，适合做大批量资料搜集与事实查找。",
    sourceUrl: "https://clawhub.ai/robbyczgw-cla/web-search-plus",
    models: ["OpenClaw"],
    inputPreview: "想把多个搜索源的结果一次聚齐，减少来回切换。",
    outputPreview: "返回多来源搜索结果，适合快速搭建资料库。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Web Search Plus
source: https://clawhub.ai/robbyczgw-cla/web-search-plus
category: books
focus: 资料搜集`,
  },
  {
    name: "Perplexity",
    version: "ClawHub verified",
    workflow: "资料搜集",
    description: "用带引用的 AI 搜索快速核实事实，适合纪实和商业书稿的事实确认。",
    sourceUrl: "https://clawhub.ai/zats/perplexity",
    models: ["OpenClaw"],
    inputPreview: "要快速确认某个事实或数据点，而不是完整做一轮研究。",
    outputPreview: "直接给出答案和引用来源，适合事实核验。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Perplexity
source: https://clawhub.ai/zats/perplexity
category: books
focus: 资料搜集`,
  },
  {
    name: "Faster Whisper",
    version: "ClawHub verified",
    workflow: "资料搜集",
    description: "本地高速语音转文字，适合课程录音、访谈音频、讲座资料转稿。",
    sourceUrl: "https://clawhub.ai/theplasmak/faster-whisper",
    models: ["OpenClaw"],
    inputPreview: "需要把长音频或课程录音先转成文字资料再进入整理。",
    outputPreview: "输出可继续归纳的转录文本和字幕结果。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Faster Whisper
source: https://clawhub.ai/theplasmak/faster-whisper
category: books
focus: 资料搜集`,
  },
  {
    name: "OpenClaw YouTube Transcript",
    version: "ClawHub verified",
    workflow: "资料搜集",
    description: "直接提取 YouTube 字幕，适合课程转书、纪实素材整理和访谈转录。",
    sourceUrl: "https://clawhub.ai/YoavRez/openclaw-youtube-transcript",
    models: ["OpenClaw"],
    inputPreview: "想把公开视频或访谈的字幕快速纳入书稿素材池。",
    outputPreview: "返回可继续总结和拆分的文字稿。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: OpenClaw YouTube Transcript
source: https://clawhub.ai/YoavRez/openclaw-youtube-transcript
category: books
focus: 资料搜集`,
  },
  {
    name: "Summarize",
    version: "ClawHub verified",
    workflow: "素材整理",
    description: "通吃网页、PDF、图片、音频和 YouTube，快速压缩海量素材，适合任何书型。",
    sourceUrl: "https://clawhub.ai/steipete/summarize",
    models: ["OpenClaw"],
    inputPreview: "素材来源很多，信息量大，写作前需要先提炼重点。",
    outputPreview: "输出摘要、要点、详细拆解或行动项版本。",
    primaryAction: "ClawHub ↗",
    badge: "Editor’s Choice",
    configSnippet: `skill: Summarize
source: https://clawhub.ai/steipete/summarize
category: books
focus: 素材整理`,
  },
  {
    name: "Nano Pdf",
    version: "ClawHub verified",
    workflow: "素材整理",
    description: "用自然语言处理 PDF，提取段落、表格和数据，适合白皮书、报告和学术资料整理。",
    sourceUrl: "https://clawhub.ai/steipete/nano-pdf",
    models: ["OpenClaw"],
    inputPreview: "手头有大量 PDF 材料，需要快速抽出可写内容。",
    outputPreview: "输出表格、段落要点和可引用数据。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Nano Pdf
source: https://clawhub.ai/steipete/nano-pdf
category: books
focus: 素材整理`,
  },
  {
    name: "Ontology",
    version: "ClawHub verified",
    workflow: "素材整理",
    description: "构建人物、事件和概念之间的知识图谱，特别适合纪实类人物关系和时间线管理。",
    sourceUrl: "https://clawhub.ai/oswalpalash/ontology",
    models: ["OpenClaw"],
    inputPreview: "人物关系复杂、事件很多，普通笔记已经不好管理。",
    outputPreview: "输出结构化关系图，帮助后续章节编排。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Ontology
source: https://clawhub.ai/oswalpalash/ontology
category: books
focus: 素材整理`,
  },
  {
    name: "Obsidian",
    version: "ClawHub verified",
    workflow: "素材整理",
    description: "让 Agent 直接读写本地 Obsidian Vault，把阅读笔记和素材库接入写作流程。",
    sourceUrl: "https://clawhub.ai/steipete/obsidian",
    models: ["OpenClaw"],
    inputPreview: "已有 Obsidian 素材库，希望它直接服务写书流程。",
    outputPreview: "可直接搜索、创建双链并组织本地笔记。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Obsidian
source: https://clawhub.ai/steipete/obsidian
category: books
focus: 素材整理`,
  },
  {
    name: "Notion",
    version: "ClawHub verified",
    workflow: "素材整理",
    description: "读写 Notion 页面与数据库，适合团队协作整理素材、管理章节进度和内容库。",
    sourceUrl: "https://clawhub.ai/steipete/notion",
    models: ["OpenClaw"],
    inputPreview: "素材和章节计划都在 Notion 里，希望写作过程打通。",
    outputPreview: "让 Notion 数据库直接参与整理和管理。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Notion
source: https://clawhub.ai/steipete/notion
category: books
focus: 素材整理`,
  },
  {
    name: "SEO Content Writer",
    version: "ClawHub verified",
    workflow: "大纲创建",
    description: "按内容类型生成结构模板和完整层级规划，也能延伸到方法论和商业书的正文写作。",
    sourceUrl: "https://clawhub.ai/aaron-he-zhu/seo-content-writer",
    models: ["OpenClaw"],
    inputPreview: "要先搭一套结构清楚、可扩展的章节框架。",
    outputPreview: "给出完整层级规划，并可延展到正文草稿。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: SEO Content Writer
source: https://clawhub.ai/aaron-he-zhu/seo-content-writer
category: books
focus: 大纲创建`,
  },
  {
    name: "Marketing Mode",
    version: "ClawHub verified",
    workflow: "大纲创建",
    description: "内置 140+ 商业框架，适合商业书和方法论书做逻辑骨架设计，也适合后续正文推进。",
    sourceUrl: "https://clawhub.ai/TheSethRose/marketing-mode",
    models: ["OpenClaw"],
    inputPreview: "需要把方法论或商业逻辑先搭成有框架的章节体系。",
    outputPreview: "输出更清楚的商业框架、大纲和行动逻辑。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Marketing Mode
source: https://clawhub.ai/TheSethRose/marketing-mode
category: books
focus: 大纲创建`,
  },
  {
    name: "Marketing Skills",
    version: "ClawHub verified",
    workflow: "正文写作",
    description: "23 个独立营销写作模块，适合商业书、课程转书中的案例、对话与行动指南章节。",
    sourceUrl: "https://clawhub.ai/jchopard69/marketing-skills",
    models: ["OpenClaw"],
    inputPreview: "正文需要更强的案例、行动建议和转化表达。",
    outputPreview: "输出更适合商业叙事的章节内容和营销写作模块。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Marketing Skills
source: https://clawhub.ai/jchopard69/marketing-skills
category: books
focus: 正文写作`,
  },
  {
    name: "Humanizer",
    version: "ClawHub verified",
    workflow: "质检修订",
    description: "逐项消除 AI 写作痕迹和模板化表达，让书稿更接近真人写作质感。",
    sourceUrl: "https://clawhub.ai/biostartechnology/humanizer",
    models: ["OpenClaw"],
    inputPreview: "正文已经成型，但语感仍然偏模板化、像 AI 生成。",
    outputPreview: "输出更自然的语言节奏，减少明显 AI 痕迹。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Humanizer
source: https://clawhub.ai/biostartechnology/humanizer
category: books
focus: 质检修订`,
  },
  {
    name: "self-improving-agent",
    version: "ClawHub verified",
    workflow: "质检修订",
    description: "记录每轮修订错误与修正，持续积累你的写作偏好，适合长期打磨整本书稿。",
    sourceUrl: "https://clawhub.ai/pskoett/self-improving-agent",
    models: ["OpenClaw"],
    inputPreview: "希望修订过程能越改越懂你的标准，而不是每次从零开始。",
    outputPreview: "持续沉淀修订记忆，帮助后续章节风格越来越统一。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: self-improving-agent
source: https://clawhub.ai/pskoett/self-improving-agent
category: books
focus: 质检修订`,
  },
];

const booksFeaturedSkills = booksCatalogSkills.filter((skill) =>
  ["Last30days", "Deep Research Pro", "Academic Deep Research"].includes(skill.name),
);

const articlesCatalogSkills: SkillPreview[] = [
  {
    name: "wechat-writer",
    version: "ClawHub verified",
    workflow: "全流程公众号写作",
    description:
      "7 步公众号写作流水线，从确认需求、资料检索到三遍审校与最终稿，适合完整接管公众号文章生产。",
    sourceUrl: "https://clawhub.ai/wzdavid/wechat-writer",
    models: ["OpenClaw"],
    inputPreview: "需要从选题到定稿一条龙完成公众号文章，而不是只解决某一个局部环节。",
    outputPreview: "输出完整的公众号写作流程结果，覆盖选题、大纲、初稿和审校。",
    primaryAction: "ClawHub ↗",
    badge: "Editor’s Choice",
    configSnippet: `skill: wechat-writer
source: https://clawhub.ai/wzdavid/wechat-writer
category: articles
focus: 全流程公众号写作`,
  },
  {
    name: "WeChat MP Multi-Publisher",
    version: "ClawHub verified",
    workflow: "全流程公众号写作",
    description:
      "把 Markdown 文章一键推送到公众号草稿箱，支持封面图、引用块和微信 CDN 图片上传。",
    sourceUrl: "https://clawhub.ai/x402spark-jpg/wechat-multi-publisher",
    models: ["OpenClaw"],
    inputPreview: "文章已经写完，需要更快地进入公众号发布准备环节。",
    outputPreview: "返回可直接进入微信草稿箱的发布结果，减少手动排版工作。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: WeChat MP Multi-Publisher
source: https://clawhub.ai/x402spark-jpg/wechat-multi-publisher
category: articles
focus: 全流程公众号写作`,
  },
  {
    name: "Last30days",
    version: "ClawHub verified",
    workflow: "选题热度调研",
    description:
      "跨平台聚合近 30 天热点，自动去重评分，适合公众号选题、新闻追踪和评论文章找热度入口。",
    sourceUrl: "https://clawhub.ai/mvanhorn/last30days-official",
    models: ["OpenClaw"],
    inputPreview: "想知道最近哪些话题在持续发酵，值得进入公众号或评论选题池。",
    outputPreview: "输出带引用的热点报告和趋势判断，帮助快速筛题。",
    primaryAction: "ClawHub ↗",
    badge: "Editor’s Choice",
    configSnippet: `skill: Last30days
source: https://clawhub.ai/mvanhorn/last30days-official
category: articles
focus: 选题热度调研`,
  },
  {
    name: "Hacker News Daily",
    version: "ClawHub verified",
    workflow: "选题热度调研",
    description:
      "抓取 Hacker News 热门帖并按技术关键词过滤，适合科技类公众号和新闻报道做选题判断。",
    sourceUrl: "https://clawhub.ai/osgood001/hn-daily",
    models: ["OpenClaw"],
    inputPreview: "需要追踪技术圈最近的热门讨论，快速确定新闻和评论切口。",
    outputPreview: "返回按主题过滤的热门技术话题和原始讨论入口。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Hacker News Daily
source: https://clawhub.ai/osgood001/hn-daily
category: articles
focus: 选题热度调研`,
  },
  {
    name: "Tavily Web Search",
    version: "ClawHub verified",
    workflow: "选题热度调研",
    description:
      "为 AI Agent 优化的结构化搜索结果，适合快速调研选题背景、补充论据和新闻线索。",
    sourceUrl: "https://clawhub.ai/arun-8687/tavily-search",
    models: ["OpenClaw"],
    inputPreview: "想快速把一个选题的背景信息拉齐，不想自己在多个网页里来回跳转。",
    outputPreview: "输出精简且结构化的搜索结果，便于继续推理和写作。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Tavily Web Search
source: https://clawhub.ai/arun-8687/tavily-search
category: articles
focus: 选题热度调研`,
  },
  {
    name: "Brave Search",
    version: "ClawHub verified",
    workflow: "选题热度调研",
    description:
      "轻量级搜索和内容抓取工具，适合快速验证热度、补充信息和做第一轮新闻核查。",
    sourceUrl: "https://clawhub.ai/steipete/brave-search",
    models: ["OpenClaw"],
    inputPreview: "只想快速补几个事实点或验证话题热度，不需要完整研究流程。",
    outputPreview: "提供简洁的搜索和抓取结果，方便马上进入写作。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Brave Search
source: https://clawhub.ai/steipete/brave-search
category: articles
focus: 选题热度调研`,
  },
  {
    name: "Marketing Mode",
    version: "ClawHub verified",
    workflow: "选题策划",
    description:
      "集成大量营销框架和策略模块，适合公众号栏目策划、品牌内容方向设计和评论视角拆解。",
    sourceUrl: "https://clawhub.ai/TheSethRose/marketing-mode",
    models: ["OpenClaw"],
    inputPreview: "热点有了，但还需要把它变成可执行的选题方向和表达策略。",
    outputPreview: "输出更适合传播和转化的内容方向、框架和策略建议。",
    primaryAction: "ClawHub ↗",
    badge: "Editor’s Choice",
    configSnippet: `skill: Marketing Mode
source: https://clawhub.ai/TheSethRose/marketing-mode
category: articles
focus: 选题策划`,
  },
  {
    name: "Marketing Skills",
    version: "ClawHub verified",
    workflow: "选题策划",
    description:
      "包含多种独立营销模块，可按需调用做选题策划、社交内容拆解和宣传稿方向设计。",
    sourceUrl: "https://clawhub.ai/jchopard69/marketing-skills",
    models: ["OpenClaw"],
    inputPreview: "需要从营销目标倒推文章主题、结构和表达重点。",
    outputPreview: "返回适合品牌传播的内容策略和模块化策划建议。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Marketing Skills
source: https://clawhub.ai/jchopard69/marketing-skills
category: articles
focus: 选题策划`,
  },
  {
    name: "SEO",
    version: "ClawHub verified",
    workflow: "选题策划",
    description:
      "结合关键词研究、竞品分析和搜索意图，帮助判断稿件选题的搜索价值与差异化方向。",
    sourceUrl: "https://clawhub.ai/ivangdavila/seo",
    models: ["OpenClaw"],
    inputPreview: "想知道一个选题是否有搜索空间、竞品是否拥挤、该从哪个角度切入。",
    outputPreview: "给出关键词、竞品和内容差异化方向建议。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: SEO
source: https://clawhub.ai/ivangdavila/seo
category: articles
focus: 选题策划`,
  },
  {
    name: "Summarize",
    version: "ClawHub verified",
    workflow: "素材处理",
    description:
      "通吃网页、PDF、图片、音频和 YouTube，快速提炼要点、执行摘要和详细拆解。",
    sourceUrl: "https://clawhub.ai/steipete/summarize",
    models: ["OpenClaw"],
    inputPreview: "参考资料太杂，写之前需要先把关键信息压缩成可用笔记。",
    outputPreview: "输出摘要、要点、详细拆解或行动项，适合作为写作输入。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Summarize
source: https://clawhub.ai/steipete/summarize
category: articles
focus: 素材处理`,
  },
  {
    name: "OpenClaw YouTube Transcript",
    version: "ClawHub verified",
    workflow: "素材处理",
    description:
      "直接提取 YouTube 字幕，把视频内容快速转成可用文字素材，适合新闻评论和素材整理。",
    sourceUrl: "https://clawhub.ai/YoavRez/openclaw-youtube-transcript",
    models: ["OpenClaw"],
    inputPreview: "需要把视频或访谈内容快速纳入文章素材库。",
    outputPreview: "返回可继续摘要、整理和引用的字幕文本。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: OpenClaw YouTube Transcript
source: https://clawhub.ai/YoavRez/openclaw-youtube-transcript
category: articles
focus: 素材处理`,
  },
  {
    name: "Nano Pdf",
    version: "ClawHub verified",
    workflow: "素材处理",
    description:
      "用自然语言处理 PDF，适合报告、白皮书、研究文档等参考资料的快速消化。",
    sourceUrl: "https://clawhub.ai/steipete/nano-pdf",
    models: ["OpenClaw"],
    inputPreview: "参考 PDF 太多，需要快速抽取可写内容和关键数据。",
    outputPreview: "输出段落重点、表格信息和可引用数据。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Nano Pdf
source: https://clawhub.ai/steipete/nano-pdf
category: articles
focus: 素材处理`,
  },
  {
    name: "WeChat Article Extractor",
    version: "ClawHub verified",
    workflow: "素材处理",
    description:
      "直接解析公众号文章链接，提取标题、正文、作者和封面图，适合对标内容拆解和素材归档。",
    sourceUrl: "https://clawhub.ai/freestylefly/wechat-article-extractor-skill",
    models: ["OpenClaw"],
    inputPreview: "需要批量整理公众号参考文章，而不是手动复制内容。",
    outputPreview: "输出结构化的公众号文章素材，便于继续整理和对标。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: WeChat Article Extractor
source: https://clawhub.ai/freestylefly/wechat-article-extractor-skill
category: articles
focus: 素材处理`,
  },
  {
    name: "SEO Content Writer",
    version: "ClawHub verified",
    workflow: "大纲结构",
    description:
      "按不同内容类型输出 H1-H6 结构模板和关键词布局，适合长文、专题稿和品牌白皮书做骨架规划。",
    sourceUrl: "https://clawhub.ai/aaron-he-zhu/seo-content-writer",
    models: ["OpenClaw"],
    inputPreview: "需要先把文章骨架和层级规划清楚，再进入正文扩写。",
    outputPreview: "输出结构模板、标题层级和适合继续写作的大纲框架。",
    primaryAction: "ClawHub ↗",
    badge: "Editor’s Choice",
    configSnippet: `skill: SEO Content Writer
source: https://clawhub.ai/aaron-he-zhu/seo-content-writer
category: articles
focus: 大纲结构`,
  },
  {
    name: "Humanizer",
    version: "ClawHub verified",
    workflow: "终稿质检",
    description:
      "逐项消除 AI 写作痕迹，修复模板化结构和过度解释，让终稿读起来更像真人写的。",
    sourceUrl: "https://clawhub.ai/biostartechnology/humanizer",
    models: ["OpenClaw"],
    inputPreview: "稿子已经完成，但语感太像 AI，发布前需要做一轮去痕迹处理。",
    outputPreview: "输出更自然的表达节奏和更像人工写作的终稿版本。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: Humanizer
source: https://clawhub.ai/biostartechnology/humanizer
category: articles
focus: 终稿质检`,
  },
  {
    name: "self-improving-agent",
    version: "ClawHub verified",
    workflow: "终稿质检",
    description:
      "捕获每次修订错误与修正经验，持续积累你的风格和标准，更适合长期迭代内容质量。",
    sourceUrl: "https://clawhub.ai/pskoett/self-improving-agent",
    models: ["OpenClaw"],
    inputPreview: "希望每次终稿修订都能沉淀经验，而不是从零开始重复改同类问题。",
    outputPreview: "输出带记忆的修订结果，后续会越来越贴近你的标准。",
    primaryAction: "ClawHub ↗",
    configSnippet: `skill: self-improving-agent
source: https://clawhub.ai/pskoett/self-improving-agent
category: articles
focus: 终稿质检`,
  },
];

const articlesFeaturedSkills = articlesCatalogSkills.filter((skill) =>
  ["wechat-writer", "Last30days", "SEO Content Writer"].includes(skill.name),
);

const copywritingSkills: SkillPreview[] = [
  {
    name: "Hook Pulse Lab",
    version: "v0.1 static preview",
    workflow: "情绪钩子",
    description:
      "用来快速拆解用户情绪入口和内容开场方式，让短内容更容易抓住注意力。",
    models: ["GPT-4.1", "Claude 3.7"],
    inputPreview: "内容方向没问题，但开头缺少能让用户停下来的第一秒吸引力。",
    outputPreview: "给出多种不同强度的开场钩子和后续展开路径。",
    primaryAction: "Copy-first Setup",
    badge: "Editor’s Choice",
    configSnippet: `skill: hook_pulse_lab
category: copywriting
workflow: hook
inputs:
  - product
  - audience_pain
outputs:
  - emotional_hooks
  - opening_lines`,
  },
  {
    name: "Platform Rewrite Switcher",
    version: "v0.1 static preview",
    workflow: "平台适配",
    description:
      "把同一段核心内容快速转成小红书、公众号或短视频脚本可用的版本。",
    models: ["Gemini 2.5", "DeepSeek"],
    inputPreview: "有一段已经能用的核心内容，但每个平台都要重写一遍，效率太低。",
    outputPreview: "输出针对不同平台节奏、句长和 CTA 的改写版本。",
    primaryAction: "Download Skill Pack",
    configSnippet: `skill: platform_rewrite_switcher
category: copywriting
workflow: adaptation
inputs:
  - master_copy
targets:
  - xiaohongshu
  - wechat_article
  - video_script`,
  },
];

const reportWorkflowPrompts: Record<
  string,
  {
    input: string;
    output: string;
  }
> = {
  任务定义: {
    input: "需要先明确汇报目标、受众、决策口径和输出边界，避免一上来就堆材料。",
    output: "输出任务框架、目标拆解和更清晰的汇报范围定义。",
  },
  "资料收集 / 信息搜索": {
    input: "需要快速摸清行业背景、趋势数据和多源资料，先把研究基础铺起来。",
    output: "返回更完整的研究资料、来源线索和可继续分析的搜索结果。",
  },
  "资料归档 / 输入接入": {
    input: "需要把 PDF、网页、会议记录和企业文档接成可继续处理的统一输入。",
    output: "把原始资料转成更适合归档、检索和后续分析的标准化输入。",
  },
  "清洗整理 / 重点提炼": {
    input: "原始资料已经很多，但还没有被压缩成真正能支撑判断的重点信息。",
    output: "输出摘要、重点提炼和可继续汇报使用的结构化结论。",
  },
  "分析归纳 / 形成判断": {
    input: "需要从数据、竞品或结构化材料里抽出结论，而不是只停留在信息罗列。",
    output: "形成更清晰的分析判断、差异结论和可引用的洞察。",
  },
  "框架搭建 / 报告成稿": {
    input: "结论和材料都在，但还需要组织成正式报告、PPT 或可交付文档。",
    output: "输出更适合汇报的结构框架、成稿内容和正式交付格式。",
  },
  "摘要压缩 / 汇报版改写": {
    input: "需要把长报告压缩成给管理层、会议或简报场景更容易理解的版本。",
    output: "输出简报式摘要、管理层速览版和更适合快速汇报的内容。",
  },
  "逻辑校对 / 终稿质检": {
    input: "终稿接近完成，但还需要检查逻辑一致性、格式统一和语气自然度。",
    output: "标出逻辑缺口、表达问题和更适合最终交付的修订建议。",
  },
};

function createReportSkill(
  name: string,
  workflow: string,
  description: string,
  sourceUrl: string,
  badge?: string,
): SkillPreview {
  const prompts = reportWorkflowPrompts[workflow];

  return {
    name,
    version: "ClawHub verified",
    workflow,
    description,
    sourceUrl,
    models: ["OpenClaw"],
    inputPreview: prompts.input,
    outputPreview: prompts.output,
    primaryAction: "ClawHub ↗",
    badge,
    configSnippet: `skill: ${name}
source: ${sourceUrl}
category: reports
focus: ${workflow}`,
  };
}

const reportsCatalogSkills: SkillPreview[] = [
  createReportSkill(
    "deep-strategy",
    "任务定义",
    "适合做汇报目标拆解、决策口径设定和任务定义，先把报告真正要回答的问题定清楚。",
    "https://clawhub.ai/realroc/deep-strategy",
    "Editor’s Choice",
  ),
  createReportSkill(
    "agile-toolkit",
    "任务定义",
    "用来拆工作流、澄清任务和确认输出目标，适合复杂汇报项目前期快速定边界。",
    "https://clawhub.ai/olivermonneke/agile-toolkit",
  ),
  createReportSkill(
    "natural-language-planner",
    "任务定义",
    "把自然语言需求转成任务框架和项目规划，更适合把模糊要求先结构化。",
    "https://clawhub.ai/bparticle/natural-language-planner",
  ),
  createReportSkill(
    "writing-plans",
    "任务定义",
    "适合写作前规划、步骤拆解和章节前置设计，让大型材料不至于一开始就失控。",
    "https://clawhub.ai/zlc000190/writing-plans",
  ),
  createReportSkill(
    "briefing",
    "任务定义",
    "适合先生成 brief、确认汇报范围和梳理输入要求，减少反复返工。",
    "https://clawhub.ai/lstpsche/briefing",
  ),
  createReportSkill(
    "go-to-market",
    "任务定义",
    "适合商业计划、市场进入策略和业务目标定义，尤其适合偏增长和市场导向的报告。",
    "https://clawhub.ai/jk-0001/go-to-market",
  ),
  createReportSkill(
    "agent-deep-research",
    "资料收集 / 信息搜索",
    "适合多轮深度调研和行业资料搜集，把复杂研究任务推进成可引用的结果。",
    "https://clawhub.ai/24601/agent-deep-research",
    "Editor’s Choice",
  ),
  createReportSkill(
    "autonomous-research",
    "资料收集 / 信息搜索",
    "适合独立完成主题研究和资料收集，用于报告前期建立完整的信息底座。",
    "https://clawhub.ai/tobisamaa/autonomous-research",
  ),
  createReportSkill(
    "hybrid-deep-search",
    "资料收集 / 信息搜索",
    "把深搜与快搜结合，适合多源检索和资料覆盖度要求较高的研究任务。",
    "https://clawhub.ai/scsun1978/hybrid-deep-search",
  ),
  createReportSkill(
    "web-search-pro",
    "资料收集 / 信息搜索",
    "适合网页资料搜索、内容抓取和研究流起步，快速搭起报告所需的背景材料。",
    "https://clawhub.ai/zjianru/web-search-pro",
  ),
  createReportSkill(
    "content-research",
    "资料收集 / 信息搜索",
    "用于主题研究、趋势收集和内容前置调研，适合先把核心背景盘清楚。",
    "https://clawhub.ai/hazy2go/content-research",
  ),
  createReportSkill(
    "google-trends",
    "资料收集 / 信息搜索",
    "适合热点发现、趋势验证和关键词比较，用来判断议题热度与变化方向。",
    "https://clawhub.ai/satnamra/google-trends",
  ),
  createReportSkill(
    "social-intelligence",
    "资料收集 / 信息搜索",
    "聚焦社媒舆情、用户反馈和竞品观察，适合补足定性研究视角。",
    "https://clawhub.ai/atyachin/social-intelligence",
  ),
  createReportSkill(
    "boof",
    "资料归档 / 输入接入",
    "适合把 PDF 和文档转成 Markdown、本地索引并做文档分析，先把原始材料接进统一格式。",
    "https://clawhub.ai/chiefsegundo/boof",
  ),
  createReportSkill(
    "links-to-pdfs",
    "资料归档 / 输入接入",
    "适合从 Notion、DocSend 和 PDF 链接里批量收集资料，减少手工整理。",
    "https://clawhub.ai/chrisling-dev/links-to-pdfs",
  ),
  createReportSkill(
    "markdown-converter",
    "资料归档 / 输入接入",
    "适合把不同文档统一转成 Markdown，方便后续搜索、摘要和成稿流程。",
    "https://clawhub.ai/steipete/markdown-converter",
  ),
  createReportSkill(
    "paddleocr-doc-parsing",
    "资料归档 / 输入接入",
    "适合扫描件和 OCR 文档解析，把原本不易处理的材料转成可分析文本。",
    "https://clawhub.ai/bobholamovic/paddleocr-doc-parsing",
  ),
  createReportSkill(
    "sharepoint-by-altf1be",
    "资料归档 / 输入接入",
    "适合从企业 SharePoint 文档库接入 Office 资料，用于企业内部报告和汇报材料。",
    "https://clawhub.ai/abdelkrim/sharepoint-by-altf1be",
  ),
  createReportSkill(
    "clawemail",
    "资料归档 / 输入接入",
    "适合从邮件、Drive、Docs、Sheets 和 Slides 收集资料，把分散输入收进一个工作流。",
    "https://clawhub.ai/cto1/clawemail",
  ),
  createReportSkill(
    "ffcli",
    "资料归档 / 输入接入",
    "适合抓取会议记录和整理会议资料，让会议输入也能纳入报告材料池。",
    "https://clawhub.ai/ruigomeseu/ffcli",
  ),
  createReportSkill(
    "aliyun-asr",
    "清洗整理 / 重点提炼",
    "适合把访谈和会议音频转成文字，为后续重点提炼和汇报整理做准备。",
    "https://clawhub.ai/jixsonwang/aliyun-asr",
  ),
  createReportSkill(
    "assemblyai-transcribe",
    "清洗整理 / 重点提炼",
    "适合音视频转录和调研文本化，让会议、访谈和演讲内容可进入分析流程。",
    "https://clawhub.ai/tristanmanchester/assemblyai-transcribe",
  ),
  createReportSkill(
    "chain-of-density",
    "清洗整理 / 重点提炼",
    "适合长文本压缩和层层浓缩，把冗长资料提炼成更适合汇报的高密度摘要。",
    "https://clawhub.ai/killerapp/chain-of-density",
  ),
  createReportSkill(
    "dizest-summarize",
    "清洗整理 / 重点提炼",
    "适合对长文、PDF、播客和笔记做摘要，快速压缩高信息量输入。",
    "https://clawhub.ai/s-annam/dizest-summarize",
  ),
  createReportSkill(
    "ai-review",
    "清洗整理 / 重点提炼",
    "适合结构化总结、重点抽取和内容分类评论，让材料更快进入可判断状态。",
    "https://clawhub.ai/blackshady1130-jpg/ai-review",
  ),
  createReportSkill(
    "note-processor",
    "清洗整理 / 重点提炼",
    "适合研究笔记整理、重点归纳和把笔记推进成结论草稿。",
    "https://clawhub.ai/johstracke/note-processor",
  ),
  createReportSkill(
    "competitor-analysis-report",
    "分析归纳 / 形成判断",
    "适合竞品分析、差异化判断和报告结论形成，把资料推进成真正可用的判断。",
    "https://clawhub.ai/seanwyngaard/competitor-analysis-report",
  ),
  createReportSkill(
    "competitor-analyzer",
    "分析归纳 / 形成判断",
    "适合竞争格局分析和定位判断，帮助你更快归纳行业里的核心差异。",
    "https://clawhub.ai/claudiodrusus/competitor-analyzer",
  ),
  createReportSkill(
    "serp-analysis",
    "分析归纳 / 形成判断",
    "适合搜索结果分析、需求洞察和内容机会判断，为行业判断补足搜索面视角。",
    "https://clawhub.ai/aaron-he-zhu/serp-analysis",
  ),
  createReportSkill(
    "csv-pipeline",
    "分析归纳 / 形成判断",
    "适合 CSV 和 JSON 清洗、数据汇总与分析报告生成，处理结构化数据更高效。",
    "https://clawhub.ai/gitgoodordietrying/csv-pipeline",
  ),
  createReportSkill(
    "performance-reporter",
    "分析归纳 / 形成判断",
    "适合绩效、流量、SEO 和运营类报告输出，把指标材料整理成更可读的分析结果。",
    "https://clawhub.ai/aaron-he-zhu/performance-reporter",
  ),
  createReportSkill(
    "deck-builder",
    "框架搭建 / 报告成稿",
    "适合做 PPT 底稿、路演框架和汇报逻辑，是报告与演讲稿场景里很通用的一类工具。",
    "https://clawhub.ai/teamolab/deck-builder",
    "Editor’s Choice",
  ),
  createReportSkill(
    "research-report",
    "框架搭建 / 报告成稿",
    "适合研究报告成稿和 PDF 导出，把分析结果推进成正式报告。",
    "https://clawhub.ai/huaruoji/research-report",
  ),
  createReportSkill(
    "ai-pdf-builder",
    "框架搭建 / 报告成稿",
    "适合正式报告、Pitch 材料和 PDF 输出，让终稿格式更适合交付。",
    "https://clawhub.ai/nextfrontierbuilds/ai-pdf-builder",
  ),
  createReportSkill(
    "ppt-ooxml-tool",
    "框架搭建 / 报告成稿",
    "适合 PPT 结构生成和汇报稿件落地，更偏演示文稿成品输出。",
    "https://clawhub.ai/jason2be/ppt-ooxml-tool",
  ),
  createReportSkill(
    "convert-to-pdf",
    "框架搭建 / 报告成稿",
    "适合报告终稿导出和格式统一，用于最终交付前的收口动作。",
    "https://clawhub.ai/crossservicesolutions/convert-to-pdf",
  ),
  createReportSkill(
    "ai-daily-briefing",
    "摘要压缩 / 汇报版改写",
    "适合 briefing 模式和管理层速览版，把长材料压成更适合领导快速浏览的结构。",
    "https://clawhub.ai/jeffjhunter/ai-daily-briefing",
  ),
  createReportSkill(
    "daily-brief-digest",
    "摘要压缩 / 汇报版改写",
    "适合多源信息压缩和简报生成，适合作为日报和管理汇报的前置压缩层。",
    "https://clawhub.ai/rajtejani61/daily-brief-digest",
  ),
  createReportSkill(
    "sovereign-daily-digest",
    "摘要压缩 / 汇报版改写",
    "适合日报和摘要式汇报，把多条信息压成可快速阅读的 digest。",
    "https://clawhub.ai/ryudi84/sovereign-daily-digest",
  ),
  createReportSkill(
    "finance-news",
    "摘要压缩 / 汇报版改写",
    "适合把新闻材料压缩成资讯简报，用于财经、行业和市场汇报场景。",
    "https://clawhub.ai/kesslerio/finance-news",
  ),
  createReportSkill(
    "fund-news-summary",
    "摘要压缩 / 汇报版改写",
    "适合多源新闻汇总和结论摘要，帮助快速形成管理层可读版本。",
    "https://clawhub.ai/yonghaozhao722/fund-news-summary",
  ),
  createReportSkill(
    "x-actionbook-recap",
    "摘要压缩 / 汇报版改写",
    "适合社媒信息汇总和热点速览，用于汇报前快速补充舆情层输入。",
    "https://clawhub.ai/jack4world/x-actionbook-recap",
  ),
  createReportSkill(
    "feishu-minutes",
    "摘要压缩 / 汇报版改写",
    "适合会议纪要提炼和汇报摘要，帮你快速从会议输入中生成对外汇报版本。",
    "https://clawhub.ai/autogame-17/feishu-minutes",
  ),
  createReportSkill(
    "pocket-ai",
    "摘要压缩 / 汇报版改写",
    "适合会议智能摘要和跨会话结论检索，用于持续汇总多个会话里的重点信息。",
    "https://clawhub.ai/asabovetech/pocket-ai",
  ),
  createReportSkill(
    "self-review",
    "逻辑校对 / 终稿质检",
    "适合终稿自检和输出质量检查，在交付前先做一轮自我审计。",
    "https://clawhub.ai/leic8959-sudo/self-review",
  ),
  createReportSkill(
    "pls-copy-editing",
    "逻辑校对 / 终稿质检",
    "适合表达统一、语言润色和专业口径修正，让报告语气更干净统一。",
    "https://clawhub.ai/mattvalenta/pls-copy-editing",
  ),
  createReportSkill(
    "academic-writing-refiner",
    "逻辑校对 / 终稿质检",
    "适合把表达修到更严谨、更有论证质感，适合正式分析材料。",
    "https://clawhub.ai/zihan-zhu/academic-writing-refiner",
  ),
  createReportSkill(
    "academic-writing",
    "逻辑校对 / 终稿质检",
    "适合借鉴更正式分析材料的写法，让报告结构和论证更有秩序。",
    "https://clawhub.ai/teamolab/academic-writing",
  ),
  createReportSkill(
    "markdown-formatter",
    "逻辑校对 / 终稿质检",
    "适合做格式统一和文档规范化，让多来源内容看起来像一个整体。",
    "https://clawhub.ai/michael-laffin/markdown-formatter",
  ),
  createReportSkill(
    "docsync",
    "逻辑校对 / 终稿质检",
    "适合检查文档一致性和内容漂移，减少多个版本之间前后不一致的问题。",
    "https://clawhub.ai/suhteevah/docsync",
  ),
  createReportSkill(
    "solo-audit",
    "逻辑校对 / 终稿质检",
    "适合做缺口检查、覆盖度检查和结构审计，作为终稿前的最后一轮把关。",
    "https://clawhub.ai/fortunto2/solo-audit",
  ),
];

const reportsFeaturedSkills = reportsCatalogSkills.filter((skill) =>
  ["deep-strategy", "agent-deep-research", "deck-builder"].includes(skill.name),
);

const academicWorkflowPrompts: Record<
  string,
  {
    input: string;
    output: string;
  }
> = {
  研究任务定义: {
    input: "需要先明确研究问题、研究目标和工作边界，避免文献越看越散。",
    output: "输出更清晰的研究任务定义、研究路线和前置执行框架。",
  },
  "文献收集 / 研究材料归档": {
    input: "需要系统收集论文、PDF 和数据库材料，并把它们接入统一整理流程。",
    output: "返回更完整的文献来源、检索结果和可继续归档的研究材料。",
  },
  "学术检索 / 外部数据库补强": {
    input: "需要补充外部数据库、跨源论文和科学检索结果，扩大研究覆盖面。",
    output: "输出更多学术搜索结果、数据库来源和可继续分析的研究线索。",
  },
  "文献整理 / 摘要提炼": {
    input: "文献已经收集不少，但还需要提炼摘要、研究脉络和论文要点。",
    output: "输出摘要、论文 digest 和适合进入综述或研究笔记的整理结果。",
  },
  "研究结构 / 正文写作": {
    input: "需要把研究材料推进成论文结构、章节框架和正式正文草稿。",
    output: "输出更适合论文写作的结构框架、正文草稿和正式研究成稿。",
  },
  "语言润色 / 学术语体优化": {
    input: "正文已有基础，但还需要把表达修到更严谨、更符合学术语体。",
    output: "输出更自然严谨的学术表达、摘要浓缩和段落层改写建议。",
  },
  "引用辅助 / 参考文献管理": {
    input: "需要把引用关系、文献库和知识摄取整理成持续可复用的研究支持层。",
    output: "输出更清晰的引用线索、知识库管理结果和文献联动能力。",
  },
  "逻辑一致性 / 终稿审校": {
    input: "论文接近终稿，需要统一格式、检查逻辑一致性并做最后一轮审校。",
    output: "输出终稿自检结果、格式统一版本和更适合提交的最终修订建议。",
  },
};

function createAcademicSkill(
  name: string,
  workflow: string,
  description: string,
  sourceUrl: string,
  badge?: string,
): SkillPreview {
  const prompts = academicWorkflowPrompts[workflow];

  return {
    name,
    version: "ClawHub verified",
    workflow,
    description,
    sourceUrl,
    models: ["OpenClaw"],
    inputPreview: prompts.input,
    outputPreview: prompts.output,
    primaryAction: "ClawHub ↗",
    badge,
    configSnippet: `skill: ${name}
source: ${sourceUrl}
category: academic
focus: ${workflow}`,
  };
}

const academicCatalogSkills: SkillPreview[] = [
  createAcademicSkill(
    "academic-deep-research",
    "研究任务定义",
    "适合研究问题聚焦和研究路线定义，尤其适合开题和正式研究前的任务收束。",
    "https://clawhub.ai/kesslerio/academic-deep-research",
    "Editor’s Choice",
  ),
  createAcademicSkill(
    "aclawdemy",
    "研究任务定义",
    "适合学术研究任务入口和研究规划，把模糊的研究方向先拉成可执行框架。",
    "https://clawhub.ai/nimhar/aclawdemy",
  ),
  createAcademicSkill(
    "call-academic-search-agent",
    "研究任务定义",
    "适合启动学术检索任务和拆解研究目标，让搜索任务更有边界。",
    "https://clawhub.ai/teamolab/call-academic-search-agent",
  ),
  createAcademicSkill(
    "writing-plans",
    "研究任务定义",
    "适合开题和论文写作前的任务拆解，把后续写作步骤先排清楚。",
    "https://clawhub.ai/zlc000190/writing-plans",
  ),
  createAcademicSkill(
    "literature-manager",
    "文献收集 / 研究材料归档",
    "适合文献搜索、下载、整理和审计，是学术场景里很通用的材料管理入口。",
    "https://clawhub.ai/isonaei/literature-manager",
    "Editor’s Choice",
  ),
  createAcademicSkill(
    "paperzilla",
    "文献收集 / 研究材料归档",
    "适合高信号论文搜索与筛选，快速缩短从主题到论文池的距离。",
    "https://clawhub.ai/pors/paperzilla",
  ),
  createAcademicSkill(
    "pz",
    "文献收集 / 研究材料归档",
    "适合命令行环境下浏览和筛选论文，作为 Paperzilla 的轻量检索入口。",
    "https://clawhub.ai/pors/pz",
  ),
  createAcademicSkill(
    "pubmed-edirect",
    "文献收集 / 研究材料归档",
    "适合 PubMed 检索和文献抓取，偏生命科学和医学类研究很常用。",
    "https://clawhub.ai/killgfat/pubmed-edirect",
  ),
  createAcademicSkill(
    "xy-pubmed-pdf-downloader",
    "文献收集 / 研究材料归档",
    "适合 PMC 和 Europe PMC 的 PDF 抓取，补足全文资料搜集环节。",
    "https://clawhub.ai/xuyuan0805/xy-pubmed-pdf-downloader",
  ),
  createAcademicSkill(
    "aminer-open-academic",
    "文献收集 / 研究材料归档",
    "适合通过 AMiner 做学术资源检索，补充传统数据库之外的学术线索。",
    "https://clawhub.ai/canxiangcc/aminer-open-academic",
  ),
  createAcademicSkill(
    "swiftscholar-skill",
    "学术检索 / 外部数据库补强",
    "适合学术论文搜索与分析，用来补强核心数据库之外的检索入口。",
    "https://clawhub.ai/tokisakix/swiftscholar-skill",
  ),
  createAcademicSkill(
    "web-search-pro",
    "学术检索 / 外部数据库补强",
    "适合跨源研究检索和抓取，用于补充论文之外的研究背景与辅助材料。",
    "https://clawhub.ai/zjianru/web-search-pro",
  ),
  createAcademicSkill(
    "arxiv-cli-tools",
    "学术检索 / 外部数据库补强",
    "适合 arXiv 检索与命令行处理，方便跟踪最新论文流。",
    "https://clawhub.ai/killgfat/arxiv-cli-tools",
  ),
  createAcademicSkill(
    "agent-deep-research",
    "学术检索 / 外部数据库补强",
    "适合做深度学术检索和研究材料扩展，在复杂问题下比单轮检索更稳。",
    "https://clawhub.ai/24601/agent-deep-research",
  ),
  createAcademicSkill(
    "wolfram-alpha",
    "学术检索 / 外部数据库补强",
    "适合科学计算、公式验证和方法部分补强，尤其适合定量研究和技术性论文。",
    "https://clawhub.ai/robert-janssen/wolfram-alpha",
  ),
  createAcademicSkill(
    "agentic-paper-digest-skill",
    "文献整理 / 摘要提炼",
    "适合对 arXiv 和 Hugging Face 论文做摘要整理，快速建立论文 digest。",
    "https://clawhub.ai/matanle51/agentic-paper-digest-skill",
  ),
  createAcademicSkill(
    "arxiv-watcher",
    "文献整理 / 摘要提炼",
    "适合持续跟踪并总结论文，适合长期研究主题的日常输入管理。",
    "https://clawhub.ai/rubenfb23/arxiv-watcher",
  ),
  createAcademicSkill(
    "arxiv-paper-reviews",
    "文献整理 / 摘要提炼",
    "适合单篇论文阅读与评论式总结，帮助你更快形成研究判断。",
    "https://clawhub.ai/zxrys/arxiv-paper-reviews",
  ),
  createAcademicSkill(
    "arxiv-paper-processor",
    "文献整理 / 摘要提炼",
    "适合论文批处理、附件下载和材料整合，适合大批量论文输入。",
    "https://clawhub.ai/xukp20/arxiv-paper-processor",
  ),
  createAcademicSkill(
    "arxiv-summarizer-orchestrator",
    "文献整理 / 摘要提炼",
    "适合批量论文汇总和报告编排，把论文池整理成可读摘要输出。",
    "https://clawhub.ai/xukp20/arxiv-summarizer-orchestrator",
  ),
  createAcademicSkill(
    "note-processor",
    "文献整理 / 摘要提炼",
    "适合研究笔记总结、文献摘录整理和笔记向综述素材的转换。",
    "https://clawhub.ai/johstracke/note-processor",
  ),
  createAcademicSkill(
    "arxiv-batch-reporter",
    "文献整理 / 摘要提炼",
    "适合批量论文信息拼装成报告，适合周期性研究扫描和综述前整理。",
    "https://clawhub.ai/xukp20/arxiv-batch-reporter",
  ),
  createAcademicSkill(
    "academic-writing",
    "研究结构 / 正文写作",
    "适合学术论文、文献综述和方法论写作，是论文结构与写作的通用入口。",
    "https://clawhub.ai/teamolab/academic-writing",
    "Editor’s Choice",
  ),
  createAcademicSkill(
    "academic-writer",
    "研究结构 / 正文写作",
    "适合 LaTeX 和正式学术写作，偏向把内容组织成可提交的论文形态。",
    "https://clawhub.ai/dayunyan/academic-writer",
  ),
  createAcademicSkill(
    "research-report",
    "研究结构 / 正文写作",
    "适合研究报告和论文型输出成稿，把研究结果推进成正式文稿。",
    "https://clawhub.ai/huaruoji/research-report",
  ),
  createAcademicSkill(
    "agentarxiv",
    "研究结构 / 正文写作",
    "适合科研论文生成和 scientific publishing 相关场景，偏向从研究到成稿的推动。",
    "https://clawhub.ai/amanbhandula/agentarxiv",
  ),
  createAcademicSkill(
    "academic-writing-refiner",
    "语言润色 / 学术语体优化",
    "适合学术语体润色和顶会风格优化，把论文语言修到更像正式学术表达。",
    "https://clawhub.ai/zihan-zhu/academic-writing-refiner",
  ),
  createAcademicSkill(
    "ai-review",
    "语言润色 / 学术语体优化",
    "适合段落总结、结构化评论和表达改进，帮助发现论文表达里的薄弱点。",
    "https://clawhub.ai/blackshady1130-jpg/ai-review",
  ),
  createAcademicSkill(
    "chain-of-density",
    "语言润色 / 学术语体优化",
    "适合摘要压缩和学术摘要浓缩，把长解释层层压到更高密度版本。",
    "https://clawhub.ai/killerapp/chain-of-density",
  ),
  createAcademicSkill(
    "lore",
    "引用辅助 / 参考文献管理",
    "适合带 citations 的知识检索与摄取，帮助把引用信息持续纳入研究知识库。",
    "https://clawhub.ai/mishkinf/lore",
  ),
  createAcademicSkill(
    "research-paper-kb",
    "引用辅助 / 参考文献管理",
    "适合论文知识库和跨会话文献管理，让研究上下文持续可追踪。",
    "https://clawhub.ai/ilkhamfy/research-paper-kb",
  ),
  createAcademicSkill(
    "citation-finder",
    "引用辅助 / 参考文献管理",
    "适合引用查找和引文补全，帮助快速定位论文中的引用缺口。",
    "https://clawhub.ai/antonia-sz/citation-finder",
  ),
  createAcademicSkill(
    "capacities",
    "引用辅助 / 参考文献管理",
    "适合研究笔记和摘录管理，把分散的阅读记录沉淀成长期可检索的资料库。",
    "https://clawhub.ai/davidsmorais/capacities",
  ),
  createAcademicSkill(
    "aoi-triple-memory-lite",
    "引用辅助 / 参考文献管理",
    "适合研究资料检索与决策笔记模板，帮助在长期研究里持续追踪判断依据。",
    "https://clawhub.ai/edmonddantesj/aoi-triple-memory-lite",
  ),
  createAcademicSkill(
    "self-review",
    "逻辑一致性 / 终稿审校",
    "适合终稿自检和输出质量检查，在提交前先做一轮系统性审查。",
    "https://clawhub.ai/leic8959-sudo/self-review",
  ),
  createAcademicSkill(
    "boof",
    "逻辑一致性 / 终稿审校",
    "适合把 PDF 和文档转成 Markdown 后做深度分析，用于终稿前复核材料一致性。",
    "https://clawhub.ai/chiefsegundo/boof",
  ),
  createAcademicSkill(
    "markdown-converter",
    "逻辑一致性 / 终稿审校",
    "适合文档标准化，让不同来源内容进入统一格式，便于最终一致性检查。",
    "https://clawhub.ai/steipete/markdown-converter",
  ),
  createAcademicSkill(
    "markdown-formatter",
    "逻辑一致性 / 终稿审校",
    "适合终稿格式统一和文档规范化，让提交版本更整洁稳定。",
    "https://clawhub.ai/michael-laffin/markdown-formatter",
  ),
  createAcademicSkill(
    "docsync",
    "逻辑一致性 / 终稿审校",
    "适合文档漂移检查和一致性审计，避免摘要、正文和引用前后不一致。",
    "https://clawhub.ai/suhteevah/docsync",
  ),
];

const academicFeaturedSkills = academicCatalogSkills.filter((skill) =>
  ["academic-deep-research", "literature-manager", "academic-writing"].includes(skill.name),
);

const courseSkills: SkillPreview[] = [
  {
    name: "Course Outline Architect",
    version: "v0.1 static preview",
    workflow: "课程大纲",
    description:
      "帮助讲师和知识创作者把主题拆成模块、课次和学习成果，更快形成可交付的课程结构。",
    models: ["GPT-4.1", "Claude 3.7"],
    inputPreview: "课程主题有了，但内容层级和课次节奏还没有真正成型。",
    outputPreview: "输出模块设计、单元目标和课程节奏安排。",
    primaryAction: "Download Skill Pack",
    configSnippet: `skill: course_outline_architect
category: courses
workflow: outline
inputs:
  - topic
  - learner_level
outputs:
  - modules
  - outcomes
  - session_plan`,
  },
  {
    name: "Lesson Script Polish Coach",
    version: "v0.1 static preview",
    workflow: "脚本编写",
    description:
      "适合把讲义内容转成更适合讲述的授课脚本，减少文字感过重的问题。",
    models: ["Claude 3.7", "DeepSeek"],
    inputPreview: "讲义内容信息齐全，但直接拿来讲会太书面、不够顺口。",
    outputPreview: "输出更适合口头表达、节奏更清楚的授课脚本版本。",
    primaryAction: "Copy-first Setup",
    badge: "Editor’s Choice",
    configSnippet: `skill: lesson_script_polish_coach
category: courses
workflow: script
inputs:
  - lecture_notes
style:
  spoken_clarity: true
  example_density: medium`,
  },
];

export const categories: Category[] = [
  {
    slug: "books",
    navLabel: "写书",
    cardSubtitle: "文学｜纪实｜方法论｜商业｜课程转书",
    cardCopy:
      "从选题调研、资料搜集到正文写作与质检修订，帮助你把零散素材推进成完整书稿。",
    metaTitle: "OpenClaw Skills for Book Writing",
    metaDescription:
      "OpenClaw Skills for books, fiction, nonfiction, memoir, and long-form writing workflows.",
    heroTag: "Books",
    heroTitle: "OpenClaw Skills for Book Writing",
    heroSubtitle: "文学、纪实、方法论、商业、课程转书",
    heroDescription:
      "从选题调研、资料搜集、素材整理，到大纲创建、正文写作和质检修订，我们将适合长篇创作的 OpenClaw Skills 按流程整理，帮助作者把零散想法推进成可执行、可持续的写作系统。",
    workflowTags: ["选题调研", "资料搜集", "素材整理", "大纲创建", "正文写作", "质检修订"],
    audienceTitle: "这类页面最适合先服务哪些长篇创作场景",
    audienceCopy:
      "我们先把“写书”页做成模板页，因为它的流程最长、信息密度最高，也最能验证整站的视觉和结构是否成立。",
    audienceBullets: [
      {
        kicker: "Long-form",
        title: "长篇小说与系列写作",
        copy: "更适合需要持续推进人物线、世界观和章节节奏的创作任务。",
      },
      {
        kicker: "Nonfiction",
        title: "非虚构与方法论写作",
        copy: "适合做资料整合、框架分章和观点展开，避免内容只停留在材料堆积层面。",
      },
      {
        kicker: "Memoir",
        title: "传记、访谈与个人成长",
        copy: "适合处理素材整理、叙事顺序和主线聚焦，让故事更完整也更可读。",
      },
    ],
    flowDescription:
      "首页上强调题材入口，而分类页里更适合把作者带进一条可执行的分步流程。",
    flowCards: [
      {
        title: "先整理素材",
        copy: "把采访、笔记和世界观说明先转成可引用材料，不要一边写一边回头找。",
      },
      {
        title: "再搭章节结构",
        copy: "先把故事推进和信息揭示顺序搭出来，降低后面重写大段内容的概率。",
      },
      {
        title: "进入扩写与风格处理",
        copy: "在已有骨架上扩写，更容易保持语气、节奏和信息密度的一致性。",
      },
      {
        title: "最后集中修订",
        copy: "让前后设定对齐、删除重复信息，把读者最容易卡住的断点提前处理掉。",
      },
    ],
    featuredSkills: booksFeaturedSkills,
    catalogSkills: booksCatalogSkills,
    pageCtaTitle: "“写书”页已经可以作为后续 5 个分类页的结构模板",
    pageCtaCopy:
      "如果你认可这页的视觉密度、卡片交互和信息分层，我们接下来只需要替换文案与示例卡片，就能很快铺开写文章、写文案、写报告、写论文和写课程五类页面。",
    faqs: [
      {
        question: "为什么“写书”页最适合先做？",
        answer:
          "因为长篇创作的流程最长、环节最多，也最能检验分类页的信息层级是否够清楚。一旦这页成立，其余 5 个分类页复制会更顺。",
      },
      {
        question: "这页里的 Skill 卡片是真实收录数据吗？",
        answer:
          "当前先用静态样例卡片验证视觉和交互。后续接入动态技能库时，这些卡片会由真实数据源驱动。",
      },
      {
        question: "为什么卡片里保留了 Copy Config 按钮？",
        answer:
          "因为我们要先确认最终动作栏是否顺手。现在先复制样例配置，下一阶段再替换成真实字段和来源链接。",
      },
    ],
  },
  {
    slug: "articles",
    navLabel: "写文章",
    cardSubtitle: "公众号｜新闻报道｜评论文章｜品牌营销宣传稿",
    cardCopy:
      "围绕公众号、新闻报道、评论文章与品牌营销宣传稿的常见流程，筛出能直接跳转来源的通用 Skills。",
    metaTitle: "OpenClaw Skills for Articles",
    metaDescription:
      "OpenClaw Skills for article writing, newsletters, columns, and long-form publishing.",
    heroTag: "Articles",
    heroTitle: "OpenClaw Skills for Articles",
    heroSubtitle: "公众号、新闻报道、评论文章、品牌营销宣传稿等等",
    heroDescription:
      "适合这几类别的通用环节包括全流程公众号写作、选题热度调研、选题策划、素材处理、大纲结构、正文写作和终稿质检。你可以先看本周精选，再按具体环节检索更适合的 Skills。",
    workflowTags: ["全流程公众号写作", "选题热度调研", "选题策划", "素材处理", "大纲结构", "正文写作", "终稿质检"],
    audienceTitle: "这类页面适合怎样的文章型写作",
    audienceCopy:
      "文章页更强调观点组织和信息结构，因此保留同一套骨架，但文案会更偏向内容表达而不是长篇叙事。",
    audienceBullets: [
      {
        kicker: "Opinion",
        title: "观点型长文",
        copy: "适合需要论点展开、结构清晰和节奏把控的写作任务。",
      },
      {
        kicker: "Newsletter",
        title: "公众号与专栏",
        copy: "适合做选题梳理、提纲整理和标题优化，让文章更容易被读下去。",
      },
      {
        kicker: "Essays",
        title: "专题与深度表达",
        copy: "适合在信息量和可读性之间保持平衡，减少堆砌式输出。",
      },
    ],
    flowDescription: "文章页的流程更短，但对节奏和观点聚焦要求更高。",
    flowCards: [
      {
        title: "先定切入角度",
        copy: "明确这篇文章到底从哪里切进去，先避免泛泛地铺背景。",
      },
      {
        title: "再搭提纲",
        copy: "先决定论点和段落顺序，让正文写作更集中。",
      },
      {
        title: "写完再打磨标题",
        copy: "在核心信息清楚以后，标题会更自然地和正文对齐。",
      },
      {
        title: "最后校对语气",
        copy: "检查是否有重复表达、跳跃句和不必要的赘述。",
      },
    ],
    featuredSkills: articlesFeaturedSkills,
    catalogSkills: articlesCatalogSkills,
    pageCtaTitle: "文章页已经沿用同一套模板完成复制",
    pageCtaCopy:
      "这页和写书页使用同一套信息架构，只替换入口文案、流程标签和示例卡片，后续维护会很轻。",
    faqs: [
      {
        question: "文章页和文案页最大的区别是什么？",
        answer:
          "文章页更偏内容表达和逻辑展开，文案页更偏传播节奏、情绪钩子和转化目标。",
      },
      {
        question: "这类卡片适合公众号吗？",
        answer:
          "适合。公众号、专栏和长文内容都可以沿用这套结构，只需要在数据层里加平台标签即可。",
      },
    ],
  },
  {
    slug: "copywriting",
    navLabel: "写文案",
    cardSubtitle: "小红书｜营销内容｜带货脚本",
    cardCopy:
      "围绕情绪钩子、内容节奏与转化表达，快速生成更适合传播与互动的文案内容。",
    metaTitle: "OpenClaw Skills for Copywriting",
    metaDescription:
      "OpenClaw Skills for copywriting, Xiaohongshu, marketing scripts, and conversion content.",
    heroTag: "Copywriting",
    heroTitle: "OpenClaw Skills for Copywriting",
    heroSubtitle: "服务于小红书、营销内容与带货表达的 OpenClaw Skills",
    heroDescription:
      "这一区更适合需要传播力、节奏感和转化表达的写作任务。你可以找到用于爆款拆解、情绪钩子设计、内容重写、平台适配和行动引导优化的 OpenClaw Skills。",
    workflowTags: ["爆款拆解", "情绪钩子", "内容生成", "平台改写", "转化优化", "发布适配"],
    audienceTitle: "这类页面适合更偏传播与转化的创作任务",
    audienceCopy: "文案页会保持同一套版式，但语言和按钮导向会更偏强动作和平台感。",
    audienceBullets: [
      {
        kicker: "Social",
        title: "社交媒体内容",
        copy: "适合小红书和短内容创作，优先解决开头弱、节奏散的问题。",
      },
      {
        kicker: "Marketing",
        title: "营销与品牌表达",
        copy: "适合做卖点整理、情绪钩子和 CTA 迭代。",
      },
      {
        kicker: "Launch",
        title: "活动与带货脚本",
        copy: "适合需要更强行动引导和平台改写的内容场景。",
      },
    ],
    flowDescription: "文案页的核心在于更短链路、更强起手和更明确的转化动作。",
    flowCards: [
      {
        title: "先拆情绪入口",
        copy: "先明确读者为什么会停下来，不要直接堆卖点。",
      },
      {
        title: "再做内容节奏",
        copy: "把信息排成更适合滑动阅读或快速浏览的结构。",
      },
      {
        title: "按平台改写",
        copy: "根据平台差异调整句长、语气和 CTA 样式。",
      },
      {
        title: "最后检查转化感",
        copy: "确认文案有没有明确下一步动作，而不是停在信息说明层面。",
      },
    ],
    featuredSkills: copywritingSkills,
    pageCtaTitle: "文案页已经复制同一套页面结构",
    pageCtaCopy:
      "接下来如果你要继续扩首页卡片内容，只需要把真实数据补到这套模板里，不用再改整体布局。",
    faqs: [
      {
        question: "文案页适合放很多短卡片吗？",
        answer:
          "适合，但首页不建议一次放太多。当前先保留代表性卡片，避免信息噪音过大。",
      },
      {
        question: "这里能兼容多个平台吗？",
        answer:
          "可以。后续数据层里只要加入平台标签和过滤条件，就能在同一页里做平台切换。",
      },
    ],
  },
  {
    slug: "reports",
    navLabel: "写报告",
    cardSubtitle: "商业计划｜汇报材料｜行业报告｜演讲稿",
    cardCopy:
      "围绕任务定义、信息搜索、分析归纳和报告成稿，筛出能直接跳到 ClawHub 原 Skill 页的报告类工具。",
    metaTitle: "OpenClaw Skills for Reports",
    metaDescription:
      "OpenClaw Skills for business reports, analysis, deck writing, and executive summaries.",
    heroTag: "Reports",
    heroTitle: "OpenClaw Skills for Reports",
    heroSubtitle: "商业计划 、汇报材料  、 行业报告 、演讲稿等等",
    heroDescription:
      "适合这几类别的通用环节包括任务定义、资料收集 / 信息搜索、资料归档 / 输入接入、清洗整理 / 重点提炼、分析归纳 / 形成判断、框架搭建 / 报告成稿、摘要压缩 / 汇报版改写和逻辑校对 / 终稿质检。你可以先看本周精选，再按具体环节检索更适合的 Skills。",
    workflowTags: [
      "任务定义",
      "资料收集 / 信息搜索",
      "资料归档 / 输入接入",
      "清洗整理 / 重点提炼",
      "分析归纳 / 形成判断",
      "框架搭建 / 报告成稿",
      "摘要压缩 / 汇报版改写",
      "逻辑校对 / 终稿质检",
    ],
    audienceTitle: "这类页面更适合偏结构化表达的工作文档",
    audienceCopy: "报告页强调逻辑层级和决策阅读体验，因此卡片说明会比其他分类更理性、更结果导向。",
    audienceBullets: [
      {
        kicker: "Planning",
        title: "商业计划与提案",
        copy: "适合先把结构和重点排序明确，再去处理表达和材料深度。",
      },
      {
        kicker: "Analysis",
        title: "行业分析与研究材料",
        copy: "适合信息量大、需要提炼重点与风险判断的内容场景。",
      },
      {
        kicker: "Internal",
        title: "汇报与内部材料",
        copy: "适合把内容收缩成更适合决策者阅读的格式。",
      },
    ],
    flowDescription: "报告页更像从原始材料到结构化摘要的处理链，而不是从灵感到文风的链条。",
    flowCards: [
      {
        title: "先抽重点",
        copy: "先明确哪些是决策者真正需要看的信息。",
      },
      {
        title: "再理逻辑线",
        copy: "让章节和论点形成顺滑的推进，而不是信息拼盘。",
      },
      {
        title: "压缩成摘要",
        copy: "把长材料转成第一页就能读懂的结论性内容。",
      },
      {
        title: "检查表达一致",
        copy: "统一术语、格式和口径，减少材料显得松散的风险。",
      },
    ],
    featuredSkills: reportsFeaturedSkills,
    catalogSkills: reportsCatalogSkills,
    pageCtaTitle: "报告页已经和整站结构对齐",
    pageCtaCopy:
      "它保留同一套首页和分类页的视觉系统，但在说明语言上更偏理性，方便未来扩到商业和咨询类关键词。",
    faqs: [
      {
        question: "报告页应该和论文页合并吗？",
        answer:
          "不建议。两者都强调严谨，但论文页更强调引用与学术结构，报告页更强调结论呈现和决策阅读。",
      },
      {
        question: "报告页适合做摘要预览吗？",
        answer:
          "很适合。后续接真实数据时，可以把摘要预览做成卡片里的高优先级展示字段。",
      },
    ],
  },
  {
    slug: "academic",
    navLabel: "写论文",
    cardSubtitle: "学术写作｜研究支持｜文献综述｜终稿审校",
    cardCopy:
      "围绕研究任务定义、文献收集、摘要提炼、正文写作和终稿审校，筛出能直接跳到 ClawHub 原 Skill 页的学术类工具。",
    metaTitle: "OpenClaw Skills for Academic Writing",
    metaDescription:
      "OpenClaw Skills for academic writing, literature reviews, research summaries, and paper polishing.",
    heroTag: "Academic",
    heroTitle: "OpenClaw Skills for Academic Writing",
    heroSubtitle: "学术写作与研究支持",
    heroDescription:
      "如果你的写作任务强调严谨性、引用规范和逻辑一致性，这里的 OpenClaw Skills 会更有帮助。它们更适合处理研究任务定义、文献收集与归档、学术检索、摘要提炼、正文写作、学术语体优化、引用辅助和终稿审校。",
    workflowTags: [
      "研究任务定义",
      "文献收集 / 研究材料归档",
      "学术检索 / 外部数据库补强",
      "文献整理 / 摘要提炼",
      "研究结构 / 正文写作",
      "语言润色 / 学术语体优化",
      "引用辅助 / 参考文献管理",
      "逻辑一致性 / 终稿审校",
    ],
    audienceTitle: "这类页面适合更偏研究和规范表达的任务",
    audienceCopy: "论文页会保持安静、清晰的阅读感，不用太多强动作语言，让页面气质更贴近研究工作。",
    audienceBullets: [
      {
        kicker: "Research",
        title: "文献综述与研究整理",
        copy: "适合把大量阅读笔记归纳成更可写的研究脉络。",
      },
      {
        kicker: "Polish",
        title: "摘要与段落润色",
        copy: "适合在结构已成型后，优化术语一致性和表达准确度。",
      },
      {
        kicker: "Consistency",
        title: "逻辑与规范检查",
        copy: "适合检查论文前后是否一致，减少低级错误影响整体质量。",
      },
    ],
    flowDescription: "论文页更适合呈现安静、可信的节奏，重点不是炫技，而是把研究工作辅助得更顺。",
    flowCards: [
      {
        title: "先整文献",
        copy: "把笔记和引用整理成更容易调用的主题簇。",
      },
      {
        title: "再写综述或摘要",
        copy: "先明确研究脉络，再进入正式表达。",
      },
      {
        title: "检查结构一致性",
        copy: "确认各章节之间的研究逻辑没有前后冲突。",
      },
      {
        title: "最后统一语言和术语",
        copy: "让摘要、正文和标题使用同一套表达口径。",
      },
    ],
    featuredSkills: academicFeaturedSkills,
    catalogSkills: academicCatalogSkills,
    pageCtaTitle: "论文页已经按同样模板完成扩展",
    pageCtaCopy:
      "后续如果要优化学术场景的气质，我们更可能调整色彩和字重，而不是重写布局结构。",
    faqs: [
      {
        question: "论文页为什么不强调“爆款”或“高转化”之类的语言？",
        answer:
          "因为学术场景更重可信度和清晰度，这类页面需要更安静、更稳重的语言来建立信任。",
      },
      {
        question: "后续可以补引用格式功能吗？",
        answer:
          "可以。动态数据接入后，可以单独为引用辅助、摘要优化这类功能增加筛选标签。",
      },
    ],
  },
  {
    slug: "courses",
    navLabel: "写课程",
    cardSubtitle: "课程大纲｜讲义设计｜脚本编排",
    cardCopy:
      "从课程结构规划到讲义整理与表达打磨，帮助你更高效地完成内容产品化。",
    metaTitle: "OpenClaw Skills for Course Creation",
    metaDescription:
      "OpenClaw Skills for course creation, outlines, teaching scripts, and educational content systems.",
    heroTag: "Courses",
    heroTitle: "OpenClaw Skills for Course Creation",
    heroSubtitle: "适合课程大纲、讲义整理、脚本设计与内容产品化的 OpenClaw Skills",
    heroDescription:
      "从课程定位、结构拆分到讲义编排、案例组织与讲解脚本打磨，这里的 OpenClaw Skills 适合知识型创作者、老师与培训内容设计者，帮助你更系统地完成课程内容生产。",
    workflowTags: ["课程定位", "大纲规划", "讲义整理", "案例设计", "脚本编写", "表达优化"],
    audienceTitle: "这类页面适合知识型创作者和课程设计者",
    audienceCopy: "课程页需要兼顾结构感和可执行性，因此更适合用模块化内容来组织页面。",
    audienceBullets: [
      {
        kicker: "Education",
        title: "老师与培训讲师",
        copy: "适合快速搭出课程主线和单元目标，减少重复备课。",
      },
      {
        kicker: "Creators",
        title: "知识型内容创作者",
        copy: "适合把零散内容产品化，形成更有层次的课程结构。",
      },
      {
        kicker: "Teams",
        title: "课程研发与团队共创",
        copy: "适合把大纲、讲义和脚本分层整理，便于团队继续协作。",
      },
    ],
    flowDescription: "课程页更像内容产品化流程，强调模块结构、学习目标和讲解表达。",
    flowCards: [
      {
        title: "先定课程定位",
        copy: "明确受众是谁、课程解决什么问题、适合什么学习结果。",
      },
      {
        title: "再拆模块与课次",
        copy: "让整门课先有结构，再决定单元细节和案例配比。",
      },
      {
        title: "补讲义与案例",
        copy: "把关键信息转成更适合学习和复用的材料形式。",
      },
      {
        title: "最后润脚本",
        copy: "让讲解更像自然表达，而不是直接照着讲义念。",
      },
    ],
    featuredSkills: courseSkills,
    pageCtaTitle: "课程页同样已经落到统一模板里",
    pageCtaCopy:
      "这意味着首页和 6 个分类页的静态架构已经齐了，后续最主要的工作就会转向数据字段和嵌入逻辑。",
    faqs: [
      {
        question: "课程页和写书页会不会太像？",
        answer:
          "结构上会像，但内容重点不同。写书页强调叙事推进，课程页强调模块设计、学习目标和讲解节奏。",
      },
      {
        question: "这类页面未来适合加案例卡片吗？",
        answer:
          "很适合。课程页后续可以增加“讲义前后对比”或“课程模块拆分示例”等内容块。",
      },
    ],
  },
];

export const editorChoices: SkillPreview[] = [
  booksFeaturedSkills[0],
  copywritingSkills[0],
  academicFeaturedSkills[0],
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
