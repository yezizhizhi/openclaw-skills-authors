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
  ["Last30days", "Deep Research Pro", "Summarize"].includes(skill.name),
);

const articlesSkills: SkillPreview[] = [
  {
    name: "Angle Finder Brief",
    version: "v0.1 static preview",
    workflow: "选题拆解",
    description:
      "适合从同类内容中拆出值得写的切入角度，避免文章刚开头就失去辨识度。",
    models: ["GPT-4.1", "Claude 3.7"],
    inputPreview: "主题方向有了，但不知道应该从哪个角度切进去才更容易被读完。",
    outputPreview: "给出多个写作角度、目标读者和篇章风险，帮助快速定题。",
    primaryAction: "Copy-first Setup",
    badge: "Editor’s Choice",
    configSnippet: `skill: angle_finder_brief
category: articles
workflow: ideation
inputs:
  - topic
  - audience
outputs:
  - three_angles
  - title_directions
  - avoid_points`,
  },
  {
    name: "Headline Refinery",
    version: "v0.1 static preview",
    workflow: "标题优化",
    description:
      "适合长文、公众号和观点文章的标题迭代，兼顾信息密度和可读性。",
    models: ["Claude 3.7", "Gemini 2.5"],
    inputPreview: "内容已经基本成稿，但标题要么太平，要么像平台文案，气质不对。",
    outputPreview: "输出多种不同力度的标题方向，便于根据平台和读者预期选择。",
    primaryAction: "Copy-first Setup",
    configSnippet: `skill: headline_refinery
category: articles
workflow: title
inputs:
  - article_summary
  - platform
style:
  tone_range:
    - calm
    - sharp
    - story-led`,
  },
];

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

const reportsSkills: SkillPreview[] = [
  {
    name: "Executive Summary Press",
    version: "v0.1 static preview",
    workflow: "摘要压缩",
    description:
      "适合把长报告的重点压成更清晰的执行摘要，减少汇报前的大段返工。",
    models: ["GPT-4.1", "Claude 3.7"],
    inputPreview: "内容很多，但面对汇报对象时不知道哪些信息该放在第一页。",
    outputPreview: "输出层级清晰的摘要结构和更适合决策阅读的重点排序。",
    primaryAction: "Copy-first Setup",
    configSnippet: `skill: executive_summary_press
category: reports
workflow: summary
inputs:
  - full_report
outputs:
  - key_points
  - risks
  - next_actions`,
  },
  {
    name: "Logic Line Checker",
    version: "v0.1 static preview",
    workflow: "逻辑校对",
    description:
      "用来检查章节之间的论证顺序、结论支撑和信息跳跃，减少报告说服力不足的问题。",
    models: ["Claude 3.7", "Gemini 2.5"],
    inputPreview: "信息不少，但结构读起来像素材拼接，结论和论据之间不够顺。",
    outputPreview: "标出逻辑断点、缺失环节和建议补强的位置。",
    primaryAction: "View Source Notes",
    configSnippet: `skill: logic_line_checker
category: reports
workflow: logic_review
inputs:
  - report_outline
  - key_claims
checks:
  evidence_chain: true
  section_transitions: true`,
  },
];

const academicSkills: SkillPreview[] = [
  {
    name: "Literature Review Mapper",
    version: "v0.1 static preview",
    workflow: "文献综述",
    description:
      "适合整理研究主题下的主要流派、核心观点和争议点，帮助文献综述更快成型。",
    models: ["GPT-4.1", "Claude 3.7"],
    inputPreview: "文献读了很多，但综述写出来像摘抄堆积，缺少组织结构。",
    outputPreview: "输出主题簇、研究脉络和待补空白，方便形成可写的综述框架。",
    primaryAction: "Download Skill Pack",
    badge: "Editor’s Choice",
    configSnippet: `skill: literature_review_mapper
category: academic
workflow: literature_review
inputs:
  - paper_notes
  - citation_list
outputs:
  - clusters
  - debates
  - gaps`,
  },
  {
    name: "Abstract Precision Editor",
    version: "v0.1 static preview",
    workflow: "摘要润色",
    description:
      "聚焦摘要里最容易出问题的目标、方法、结果和贡献表达，让学术摘要更紧凑。",
    models: ["Claude 3.7", "Gemini 2.5"],
    inputPreview: "摘要信息不完整或太松散，读者无法快速把握研究重点。",
    outputPreview: "输出结构更完整、术语更统一的摘要表达。",
    primaryAction: "Copy-first Setup",
    configSnippet: `skill: abstract_precision_editor
category: academic
workflow: abstract
inputs:
  - draft_abstract
checks:
  objective: true
  method: true
  result: true
  contribution: true`,
  },
];

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
    cardSubtitle: "公众号｜专栏｜长文表达",
    cardCopy:
      "适合选题拆解、结构优化、观点展开与标题打磨，让文章更清晰、更完整、更好读。",
    metaTitle: "OpenClaw Skills for Articles",
    metaDescription:
      "OpenClaw Skills for article writing, newsletters, columns, and long-form publishing.",
    heroTag: "Articles",
    heroTitle: "OpenClaw Skills for Articles",
    heroSubtitle: "适合公众号、专栏与长文表达的 OpenClaw Skills",
    heroDescription:
      "如果你正在写公众号文章、专题长文或观点类内容，这里的 OpenClaw Skills 可以帮助你更快完成选题拆解、结构优化、观点展开、标题打磨与全文润色，让文章更清晰、更有完成度。",
    workflowTags: ["选题拆解", "提纲整理", "观点展开", "标题优化", "段落润色", "发布前校对"],
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
    featuredSkills: articlesSkills,
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
    cardSubtitle: "商业计划｜行业分析｜汇报材料",
    cardCopy:
      "帮助你梳理信息、组织结构、压缩表达与统一逻辑，让报告更专业、更有说服力。",
    metaTitle: "OpenClaw Skills for Reports",
    metaDescription:
      "OpenClaw Skills for business reports, analysis, deck writing, and executive summaries.",
    heroTag: "Reports",
    heroTitle: "OpenClaw Skills for Reports",
    heroSubtitle: "适合商业计划、行业分析与汇报材料的 OpenClaw Skills",
    heroDescription:
      "面对信息量大、结构要求强的写作任务，这里的 OpenClaw Skills 可以帮助你完成资料归纳、逻辑梳理、章节组织、摘要压缩和表达统一，让报告更专业、更有条理。",
    workflowTags: ["资料归纳", "框架整理", "重点提炼", "报告成稿", "摘要压缩", "逻辑校对"],
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
    featuredSkills: reportsSkills,
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
    cardSubtitle: "开题报告｜文献综述｜润色校对",
    cardCopy:
      "聚焦摘要提炼、资料整理、逻辑一致性与语言修订，减少重复性编辑工作。",
    metaTitle: "OpenClaw Skills for Academic Writing",
    metaDescription:
      "OpenClaw Skills for academic writing, literature reviews, research summaries, and paper polishing.",
    heroTag: "Academic",
    heroTitle: "OpenClaw Skills for Academic Writing",
    heroSubtitle: "用于开题报告、文献综述、学术润色与研究整理的 OpenClaw Skills",
    heroDescription:
      "如果你的写作任务强调严谨性、引用规范和逻辑一致性，这里的 OpenClaw Skills 会更有帮助。它们更适合处理文献摘要、研究整理、段落润色、结构一致性检查与学术表达优化。",
    workflowTags: ["文献整理", "摘要提炼", "结构检查", "语言润色", "引用辅助", "逻辑一致性"],
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
    featuredSkills: academicSkills,
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
  academicSkills[0],
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
