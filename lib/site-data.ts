export type FaqItem = {
  question: string;
  answer: string;
};

export type SkillPreview = {
  name: string;
  version: string;
  workflow: string;
  description: string;
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

const booksSkills: SkillPreview[] = [
  {
    name: "outline-mainline-extraction",
    version: "ClawHub verified",
    workflow: "全书主线提炼",
    description:
      "从大量素材和支线里提炼整本书真正要持续推进的主线，帮助作者先稳住主题、冲突和叙事方向。",
    models: ["GPT-4.1", "Claude 3.7"],
    inputPreview: "选题、素材和章节想法很多，但整本书到底围绕哪条主线推进还不够清晰。",
    outputPreview: "输出全书主问题、核心推进线、关键转折和可持续延展的叙事骨架。",
    primaryAction: "View Source Notes",
    badge: "Editor’s Choice",
    configSnippet: `skill: outline-mainline-extraction
source: https://clawhub.ai/skills/outline-mainline-extraction
category: books
focus: 全书主线提炼`,
  },
  {
    name: "structure-building",
    version: "ClawHub verified",
    workflow: "整体结构搭建",
    description:
      "把主线、章节层级和前后承接关系搭成可执行结构，减少写着写着整体散掉的风险。",
    models: ["GPT-4.1", "Gemini 2.5"],
    inputPreview: "知道大概要写什么，但全书结构层级和章节承接还没有真正搭起来。",
    outputPreview: "输出更清楚的上中下段、章节职责和结构推进顺序。",
    primaryAction: "View Source Notes",
    configSnippet: `skill: structure-building
source: https://clawhub.ai/skills/structure-building
category: books
focus: 整体结构搭建`,
  },
  {
    name: "chapter-responsibility-split",
    version: "ClawHub verified",
    workflow: "章节职责拆分",
    description:
      "为每一章分配明确职责，区分信息交代、冲突推进、人物变化和悬念承接。",
    models: ["Claude 3.7", "GPT-4.1"],
    inputPreview: "有全书大纲，但每章为什么存在、各自负责什么还比较模糊。",
    outputPreview: "输出章节职责清单，明确每章承担的推进任务和不可替代性。",
    primaryAction: "View Source Notes",
    configSnippet: `skill: chapter-responsibility-split
source: https://clawhub.ai/skills/chapter-responsibility-split
category: books
focus: 章节职责拆分`,
  },
  {
    name: "chapter-content-prompts",
    version: "ClawHub verified",
    workflow: "章节重点内容提示",
    description:
      "围绕章节目标生成更具体的内容提示，帮助作者在扩写前先抓住这一章最该写的内容。",
    models: ["GPT-4.1", "DeepSeek"],
    inputPreview: "已经知道这一章要写什么，但下笔时容易空、散、缺重点。",
    outputPreview: "输出每章应重点展开的场景、情绪、信息点和推进提示。",
    primaryAction: "View Source Notes",
    configSnippet: `skill: chapter-content-prompts
source: https://clawhub.ai/skills/chapter-content-prompts
category: books
focus: 章节重点内容提示`,
  },
  {
    name: "structure-conflict-check",
    version: "ClawHub verified",
    workflow: "结构重复与冲突检查",
    description:
      "检查章节之间是否有重复功能、信息打架或前后承接冲突，避免结构层面的返工。",
    models: ["Claude 3.7", "Gemini 2.5"],
    inputPreview: "大纲写出来了，但担心章节功能重复、冲突或前后不顺。",
    outputPreview: "标出结构重复、职责冲突和承接断点，方便在扩写前先修结构。",
    primaryAction: "View Source Notes",
    configSnippet: `skill: structure-conflict-check
source: https://clawhub.ai/skills/structure-conflict-check
category: books
focus: 结构重复与冲突检查`,
  },
  {
    name: "rhythm-control",
    version: "ClawHub verified",
    workflow: "节奏控制",
    description:
      "帮助作者检查整书或单章的推进节奏，平衡信息密度、情节推进和停顿位置。",
    models: ["Claude 3.7", "GPT-4.1"],
    inputPreview: "内容不算少，但读起来快慢失衡，有的地方拖，有的地方又跳太快。",
    outputPreview: "给出节奏调整建议，指出该压缩、放慢或提前铺垫的位置。",
    primaryAction: "View Source Notes",
    configSnippet: `skill: rhythm-control
source: https://clawhub.ai/skills/rhythm-control
category: books
focus: 节奏控制`,
  },
  {
    name: "writing-feasibility-check",
    version: "ClawHub verified",
    workflow: "写作可执行性验证",
    description:
      "在正式开写前检查当前大纲是否真的可写，识别空章、虚章和难以落地的部分。",
    models: ["GPT-4.1", "Claude 3.7"],
    inputPreview: "大纲看起来完整，但不确定每一部分是否真的能顺利写成正文。",
    outputPreview: "指出可执行性薄弱的章节、信息断层和需要补足的前置条件。",
    primaryAction: "View Source Notes",
    configSnippet: `skill: writing-feasibility-check
source: https://clawhub.ai/skills/writing-feasibility-check
category: books
focus: 写作可执行性验证`,
  },
  {
    name: "multi-outline-design",
    version: "ClawHub verified",
    workflow: "多方案大纲设计",
    description:
      "一次生成多套不同推进逻辑的大纲方案，帮助作者在正式定稿前比较路径和风险。",
    models: ["Claude 3.7", "Gemini 2.5"],
    inputPreview: "主题确定了，但不知道应该走线性推进、双线对照还是更强冲突的结构。",
    outputPreview: "给出多套大纲方案、各自优缺点和更适合的叙事方向。",
    primaryAction: "View Source Notes",
    badge: "Editor’s Choice",
    configSnippet: `skill: multi-outline-design
source: https://clawhub.ai/skills/multi-outline-design
category: books
focus: 多方案大纲设计`,
  },
];

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
    cardSubtitle: "小说｜非虚构｜传记｜个人成长",
    cardCopy:
      "从素材整理、结构搭建到章节扩写与审校修订，帮助你把零散灵感推进成完整书稿。",
    metaTitle: "OpenClaw Skills for Book Writing",
    metaDescription:
      "OpenClaw Skills for books, fiction, nonfiction, memoir, and long-form writing workflows.",
    heroTag: "Books",
    heroTitle: "OpenClaw Skills for Book Writing",
    heroSubtitle: "面向小说、非虚构、传记与个人成长写作的 OpenClaw Skills",
    heroDescription:
      "从素材整理、人物设定、结构搭建到章节扩写与审校修订，这里收录了更适合长篇创作流程的 OpenClaw Skills，帮助作者把零散想法推进成可执行、可持续的写作系统。",
    workflowTags: ["素材清洗", "角色设定", "章节大纲", "初稿扩写", "风格润色", "交叉校对"],
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
    featuredSkills: booksSkills,
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
  booksSkills[0],
  copywritingSkills[0],
  academicSkills[0],
];

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}
