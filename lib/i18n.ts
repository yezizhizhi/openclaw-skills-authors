export type LanguageCode = "zh" | "en" | "ru" | "ja" | "fr" | "ko" | "de" | "es";

export type LanguageOption = {
  code: LanguageCode;
  label: string;
};

export const languageOptions: LanguageOption[] = [
  { code: "zh", label: "中文" },
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
  { code: "fr", label: "Français" },
  { code: "ko", label: "한국어" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
];

export const defaultLanguage: LanguageCode = "zh";
export const languageStorageKey = "openclaw-language";

export const htmlLangByLanguage: Record<LanguageCode, string> = {
  zh: "zh-CN",
  en: "en",
  ru: "ru",
  ja: "ja",
  fr: "fr",
  ko: "ko",
  de: "de",
  es: "es",
};

export type HomeCategoryKey =
  | "books"
  | "articles"
  | "copywriting"
  | "reports"
  | "academic"
  | "courses";

type HomeCategoryContent = {
  title: string;
  subtitle: string;
  copy: string;
};

export type TranslationSet = {
  languageLabel: string;
  brandCopy: string;
  header: {
    quickSearch: string;
    submit: string;
    faq: string;
    login: string;
    admin: string;
    logout: string;
    loggingOut: string;
    signedIn: string;
  };
  auth: {
    dialogAria: string;
    close: string;
    kicker: string;
    title: string;
    copy: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    emailLogin: string;
    loggingIn: string;
    divider: string;
    googleLogin: string;
    googleRedirecting: string;
    missingEnv: string;
  };
  home: {
    heroTitle: string;
    heroSubheadlineLine1: string;
    heroSubheadlineLine2: string;
    heroCopy: string;
    browseAll: string;
    installGuide: string;
    categoriesTitle: string;
    categoriesDescription: string;
    categoryButton: string;
    spotlightTitle: string;
    spotlightDescription: string;
    spotlightName: string;
    spotlightScene: string;
    spotlightTags: string;
    spotlightCta: string;
    reasonsTitle: string;
    reasons: Array<{
      title: string;
      copy: string;
    }>;
    faqTitle: string;
    faqDescription: string;
    faqItems: Array<{
      question: string;
      answer: string;
    }>;
  };
  categories: Record<HomeCategoryKey, HomeCategoryContent>;
  categoryChips: Record<HomeCategoryKey, string>;
};

const translations: Record<LanguageCode, TranslationSet> = {
  zh: {
    languageLabel: "语言",
    brandCopy: "为创作者筛选可直达的优质 Skills",
    header: {
      quickSearch: "快速搜索skills",
      submit: "推荐/提交skills",
      faq: "FAQ",
      login: "登录",
      admin: "后台",
      logout: "退出",
      loggingOut: "退出中...",
      signedIn: "已登录",
    },
    auth: {
      dialogAria: "登录",
      close: "关闭登录框",
      kicker: "登录",
      title: "登录账号",
      copy: "直接使用邮箱和密码登录，或使用 Google 登录。",
      emailLabel: "邮箱账号",
      emailPlaceholder: "请输入邮箱账号",
      passwordLabel: "密码",
      passwordPlaceholder: "请输入密码",
      emailLogin: "邮箱密码登录",
      loggingIn: "登录中...",
      divider: "或",
      googleLogin: "使用 Google 登录",
      googleRedirecting: "正在跳转...",
      missingEnv: "当前环境还没有配置 Supabase 登录参数。",
    },
    home: {
      heroTitle: "OpenClaw Skills for Authors",
      heroSubheadlineLine1: "一站式创作者skills库",
      heroSubheadlineLine2: "覆盖写书、写文章、写文案、写报告、写论文、写课程",
      heroCopy:
        "我们将适合作者与内容创作者使用的 OpenClaw Skills 按题材与创作流程整理成清晰可用的技能库。你可以按写作场景快速找到合适的 Skill，通过复制配置或下载包，更高效地完成构思、写作、整理、润色与修订。",
      browseAll: "浏览全部 OpenClaw Skills",
      installGuide: "查看安装指南",
      categoriesTitle: "覆盖六大创作场景的 OpenClaw Skills",
      categoriesDescription:
        "无论你正在创作长篇书稿、打磨自媒体内容、整理课程结构，还是撰写专业报告与学术论文，这里都能找到更贴近实际工作流需要的 OpenClaw Skills，帮助你更快进入高质量创作。",
      categoryButton: "点击进入skills库",
      spotlightTitle: "热门精选 Skills",
      spotlightDescription: "从大量使用反馈中，挑出更好用的Skill",
      spotlightName: "Skill 名称：",
      spotlightScene: "适用场景：",
      spotlightTags: "标签：",
      spotlightCta: "前往 ClawHub ↗",
      reasonsTitle: "为什么创作者要选择这个skills库？",
      reasons: [
        {
          title: "先找场景，再找 Skill",
          copy: "不用先理解技术名词，而是先按写作类别和当前工作环节找到更对口的 Skills。",
        },
        {
          title: "只收录可直达的 Skill",
          copy: "站内优先保留能稳定跳到原始 Skill 页的条目，减少空页面和无效搜索结果。",
        },
        {
          title: "精选和搜索都很直接",
          copy: "你可以先看少量高质量推荐，也可以直接输入任务环节，快速缩小范围。",
        },
      ],
      faqTitle: "常见问题",
      faqDescription: "先回答最常见的几个问题，帮你更快判断从哪一类、哪一个环节开始找。",
      faqItems: [
        {
          question: "这个网站和直接去 ClawHub 搜 Skill，有什么区别？",
          answer: "这里先按创作类别和工作环节做筛选，再把你带到更贴近当前任务的 Skill。",
        },
        {
          question: "我是第一次来，应该先从哪里开始？",
          answer: "可以先看首页精选，也可以直接进入分类页，按当前卡住的环节检索。",
        },
        {
          question: "这里的 Skill 都能直接跳到原始安装页吗？",
          answer: "当前优先保留可直接跳转来源页的条目，尽量避免把用户带去坏链路。",
        },
        {
          question: "如果某个 Skill 失效了怎么办？",
          answer: "我们会持续替换失效链接，并把更稳定、可用的替代条目补进站内。",
        },
        {
          question: "我可以推荐新的 Skill 吗？",
          answer: "可以。登录后即可提交 Skill 链接、Skill 包地址和推荐理由。",
        },
      ],
    },
    categories: {
      books: { title: "写书", subtitle: "小说｜非虚构｜传记｜个人成长", copy: "从素材整理、结构搭建到章节扩写与审校修订，帮助你把零散灵感推进成完整书稿。" },
      articles: { title: "写文章", subtitle: "公众号｜专栏｜长文表达", copy: "适合选题拆解、结构优化、观点展开与标题打磨，让文章更清晰、更完整、更好读。" },
      copywriting: { title: "写文案", subtitle: "小红书｜营销内容｜带货脚本", copy: "围绕情绪钩子、内容节奏与转化表达，快速生成更适合传播与互动的文案内容。" },
      reports: { title: "写报告", subtitle: "商业计划｜行业分析｜汇报材料", copy: "帮助你梳理信息、组织结构、压缩表达与统一逻辑，让报告更专业、更有说服力。" },
      academic: { title: "写论文", subtitle: "开题报告｜文献综述｜润色校对", copy: "聚焦摘要提炼、资料整理、逻辑一致性与语言修订，减少重复性编辑工作。" },
      courses: { title: "写课程", subtitle: "课程大纲｜讲义设计｜脚本编排", copy: "从课程结构规划到讲义整理与表达打磨，帮助你更高效地完成内容产品化。" },
    },
    categoryChips: {
      books: "写书",
      articles: "写文章",
      copywriting: "写文案",
      reports: "写报告",
      academic: "写论文",
      courses: "写课程",
    },
  },
  en: {
    languageLabel: "Language",
    brandCopy: "Curated, direct-to-source skills for creators",
    header: {
      quickSearch: "Quick Search",
      submit: "Submit Skills",
      faq: "FAQ",
      login: "Log In",
      admin: "Admin",
      logout: "Log Out",
      loggingOut: "Logging out...",
      signedIn: "Signed in",
    },
    auth: {
      dialogAria: "Log in",
      close: "Close login dialog",
      kicker: "Log in",
      title: "Sign in",
      copy: "Use email and password, or continue with Google.",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      emailLogin: "Sign in with email",
      loggingIn: "Signing in...",
      divider: "or",
      googleLogin: "Continue with Google",
      googleRedirecting: "Redirecting...",
      missingEnv: "Supabase auth variables are not configured yet.",
    },
    home: {
      heroTitle: "OpenClaw Skills for Authors",
      heroSubheadlineLine1: "A creator-first skills library",
      heroSubheadlineLine2: "For books, articles, copy, reports, academic writing, and courses",
      heroCopy:
        "We organize OpenClaw Skills by format and workflow so writers can find the right tool faster and move from idea to draft, revision, and delivery with less friction.",
      browseAll: "Browse All OpenClaw Skills",
      installGuide: "View Installation Guide",
      categoriesTitle: "OpenClaw Skills across six creative tracks",
      categoriesDescription:
        "Whether you are drafting a book, polishing social content, structuring a course, or preparing a report or paper, you can start from the real workflow you are in right now.",
      categoryButton: "Open skills library",
      spotlightTitle: "Featured Skills",
      spotlightDescription: "A short list of skills people reach for first.",
      spotlightName: "Skill Name:",
      spotlightScene: "Best For:",
      spotlightTags: "Tags:",
      spotlightCta: "Open in ClawHub ↗",
      reasonsTitle: "Why use this skills library?",
      reasons: [
        {
          title: "Start from the task, not the jargon",
          copy: "Browse by writing format and current workflow step before you ever need to think about technical naming.",
        },
        {
          title: "Direct links over dead ends",
          copy: "We prioritize skills that can still open their original source pages, so the path from discovery to use stays short.",
        },
        {
          title: "Featured picks plus search",
          copy: "You can start from a short curated list or jump straight into a workflow search when you know what you need.",
        },
      ],
      faqTitle: "FAQ",
      faqDescription: "A quick overview of the questions people usually ask first.",
      faqItems: [
        {
          question: "How is this different from searching ClawHub directly?",
          answer: "This site filters skills by writing category and workflow stage before sending you to the original source.",
        },
        {
          question: "Where should I start if I am new here?",
          answer: "Start with the homepage picks or enter a category page and search by the workflow step you are stuck on.",
        },
        {
          question: "Do these skills open the original installation page?",
          answer: "We prioritize entries that can still open their original source pages directly.",
        },
        {
          question: "What if a skill stops working?",
          answer: "We keep replacing broken links with more stable alternatives as the catalog evolves.",
        },
        {
          question: "Can I recommend a new skill?",
          answer: "Yes. Logged-in users can submit a skill link, a package link, and a short reason for recommendation.",
        },
      ],
    },
    categories: {
      books: { title: "Books", subtitle: "Fiction | Non-fiction | Memoir | Personal Growth", copy: "Move from raw notes and structure planning to chapter drafting and revision." },
      articles: { title: "Articles", subtitle: "Newsletters | Columns | Long-form", copy: "Useful for topic framing, argument structure, outlining, and sharper headlines." },
      copywriting: { title: "Copywriting", subtitle: "Xiaohongshu | Marketing Copy | Sales Scripts", copy: "Built for hooks, pacing, persuasion, and platform-aware content adaptation." },
      reports: { title: "Reports", subtitle: "Business Plans | Industry Analysis | Briefings", copy: "Turn dense information into structured, persuasive, and readable reports." },
      academic: { title: "Academic Writing", subtitle: "Proposal | Literature Review | Polishing", copy: "Support for literature digestion, structure checks, and academic tone refinement." },
      courses: { title: "Courses", subtitle: "Course Outline | Teaching Notes | Scripts", copy: "Shape knowledge into teachable modules, notes, scripts, and delivery assets." },
    },
    categoryChips: {
      books: "Books",
      articles: "Articles",
      copywriting: "Copy",
      reports: "Reports",
      academic: "Academic",
      courses: "Courses",
    },
  },
  ru: {
    languageLabel: "Язык",
    brandCopy: "Подборка прямых и полезных skills для авторов",
    header: {
      quickSearch: "Быстрый поиск",
      submit: "Предложить skill",
      faq: "FAQ",
      login: "Войти",
      admin: "Админ",
      logout: "Выйти",
      loggingOut: "Выход...",
      signedIn: "Выполнен вход",
    },
    auth: {
      dialogAria: "Вход",
      close: "Закрыть окно входа",
      kicker: "Вход",
      title: "Войти в аккаунт",
      copy: "Войдите по почте и паролю или через Google.",
      emailLabel: "Эл. почта",
      emailPlaceholder: "Введите email",
      passwordLabel: "Пароль",
      passwordPlaceholder: "Введите пароль",
      emailLogin: "Войти по почте",
      loggingIn: "Вход...",
      divider: "или",
      googleLogin: "Продолжить через Google",
      googleRedirecting: "Переход...",
      missingEnv: "Переменные Supabase для входа пока не настроены.",
    },
    home: {
      heroTitle: "OpenClaw Skills for Authors",
      heroSubheadlineLine1: "Библиотека skills для авторов",
      heroSubheadlineLine2: "Для книг, статей, копирайтинга, отчетов, научных текстов и курсов",
      heroCopy: "Мы упорядочиваем OpenClaw Skills по формату и этапу работы, чтобы автору было проще быстрее перейти от идеи к черновику, правке и финальной сборке.",
      browseAll: "Открыть все OpenClaw Skills",
      installGuide: "Открыть инструкцию",
      categoriesTitle: "OpenClaw Skills для шести творческих направлений",
      categoriesDescription: "Начинайте не с названия инструмента, а с реального этапа работы: книга, статья, курс, отчет или исследование.",
      categoryButton: "Открыть библиотеку",
      spotlightTitle: "Избранные Skills",
      spotlightDescription: "Короткий список наиболее полезных навыков.",
      spotlightName: "Название Skill:",
      spotlightScene: "Подходит для:",
      spotlightTags: "Теги:",
      spotlightCta: "Открыть в ClawHub ↗",
      reasonsTitle: "Зачем нужен этот skills-каталог?",
      reasons: [
        { title: "Сначала задача, потом Skill", copy: "Вы входите через формат письма и этап работы, а не через технические названия." },
        { title: "Только прямые ссылки", copy: "Мы стараемся сохранять только те entries, которые по-прежнему открывают исходную страницу skill." },
        { title: "Подборка и поиск рядом", copy: "Можно начать с короткого списка рекомендаций или сразу искать по рабочему этапу." },
      ],
      faqTitle: "FAQ",
      faqDescription: "Короткие ответы на самые частые вопросы.",
      faqItems: [
        { question: "Чем это отличается от поиска в ClawHub?", answer: "Здесь skills сначала отбираются по категории и этапу работы, а уже потом ведут к источнику." },
        { question: "С чего начать новичку?", answer: "Смотрите подборки на главной или откройте нужную категорию и ищите по текущему этапу." },
        { question: "Все skills ведут на исходную страницу?", answer: "Приоритет отдается entries с рабочими прямыми ссылками на оригинальный источник." },
        { question: "Что если skill перестал открываться?", answer: "Каталог постепенно очищается и заменяется более стабильными альтернативами." },
        { question: "Можно предложить новый skill?", answer: "Да. После входа можно отправить ссылку, пакет и причину рекомендации." },
      ],
    },
    categories: {
      books: { title: "Книги", subtitle: "Художественное | Нон-фикшн | Мемуары", copy: "От заметок и структуры до черновиков глав и финальной правки." },
      articles: { title: "Статьи", subtitle: "Колонки | Longread | Публицистика", copy: "Для выбора темы, структуры аргумента и более сильных заголовков." },
      copywriting: { title: "Копирайтинг", subtitle: "Маркетинг | Соцсети | Продажи", copy: "Для хуков, темпа, убеждения и адаптации под площадку." },
      reports: { title: "Отчеты", subtitle: "Планы | Аналитика | Презентации", copy: "Превращает сложные данные в читаемый и убедительный отчет." },
      academic: { title: "Научные тексты", subtitle: "Proposal | Review | Полировка", copy: "Поддержка обзоров литературы, структуры и академического стиля." },
      courses: { title: "Курсы", subtitle: "План курса | Конспекты | Скрипты", copy: "Помогает превратить знания в учебные модули и материалы." },
    },
    categoryChips: {
      books: "Книги",
      articles: "Статьи",
      copywriting: "Копирайтинг",
      reports: "Отчеты",
      academic: "Научные",
      courses: "Курсы",
    },
  },
  ja: {
    languageLabel: "言語",
    brandCopy: "クリエイター向けに直行できるSkillsを整理",
    header: {
      quickSearch: "クイック検索",
      submit: "Skillを推薦",
      faq: "FAQ",
      login: "ログイン",
      admin: "管理",
      logout: "ログアウト",
      loggingOut: "ログアウト中...",
      signedIn: "ログイン済み",
    },
    auth: {
      dialogAria: "ログイン",
      close: "ログインを閉じる",
      kicker: "ログイン",
      title: "アカウントにログイン",
      copy: "メールとパスワード、または Google でログインできます。",
      emailLabel: "メールアドレス",
      emailPlaceholder: "メールアドレスを入力",
      passwordLabel: "パスワード",
      passwordPlaceholder: "パスワードを入力",
      emailLogin: "メールでログイン",
      loggingIn: "ログイン中...",
      divider: "または",
      googleLogin: "Googleで続行",
      googleRedirecting: "移動中...",
      missingEnv: "Supabase のログイン設定がまだ構成されていません。",
    },
    home: {
      heroTitle: "OpenClaw Skills for Authors",
      heroSubheadlineLine1: "クリエイター向け skills ライブラリ",
      heroSubheadlineLine2: "書籍・記事・コピー・レポート・論文・講座に対応",
      heroCopy: "OpenClaw Skills を制作カテゴリと作業フローで整理し、アイデア、下書き、推敲、仕上げまで必要な Skill を早く見つけられるようにしています。",
      browseAll: "すべての OpenClaw Skills",
      installGuide: "インストールガイドを見る",
      categoriesTitle: "6つの制作カテゴリを横断する OpenClaw Skills",
      categoriesDescription: "本、記事、講座、レポート、論文など、いま進めている作業段階から Skill を探せます。",
      categoryButton: "skills ライブラリへ",
      spotlightTitle: "注目 Skills",
      spotlightDescription: "まず見ておきたい少数の良質な Skill。",
      spotlightName: "Skill 名:",
      spotlightScene: "用途:",
      spotlightTags: "タグ:",
      spotlightCta: "ClawHubで開く ↗",
      reasonsTitle: "なぜこの skills ライブラリを使うのか？",
      reasons: [
        { title: "まず作業段階から探せる", copy: "技術用語ではなく、いま詰まっている作業から Skill を見つけられます。" },
        { title: "直リンクできる Skill を優先", copy: "原典ページへ安定して飛べる条目を優先し、無効な中間ページを減らします。" },
        { title: "厳選一覧と検索の両方", copy: "少数のおすすめから始めても、すぐに作業段階検索へ進んでも構いません。" },
      ],
      faqTitle: "よくある質問",
      faqDescription: "最初に気になりやすいポイントを先にまとめています。",
      faqItems: [
        { question: "ClawHub で直接検索するのと何が違いますか？", answer: "このサイトでは先にカテゴリと作業段階で絞り込んでから、元の Skill に案内します。" },
        { question: "初めて使うときはどこから始めればいいですか？", answer: "まずはホームの厳選一覧、またはカテゴリページで現在の工程を検索してください。" },
        { question: "ここにある Skill は元ページへ直接飛べますか？", answer: "できるだけ原典ページへ直接遷移できる条目を優先しています。" },
        { question: "リンク切れの Skill はどうなりますか？", answer: "リンク切れは順次差し替え、より安定した代替条目に更新します。" },
        { question: "新しい Skill を推薦できますか？", answer: "できます。ログイン後にリンク、パッケージ、推薦理由を送信できます。" },
      ],
    },
    categories: {
      books: { title: "書籍", subtitle: "小説｜ノンフィクション｜自伝", copy: "素材整理、構成設計、章執筆、推敲までを支える Skill。" },
      articles: { title: "記事", subtitle: "ニュースレター｜コラム｜長文", copy: "選題、構成、論点展開、見出し改善に役立ちます。" },
      copywriting: { title: "コピー", subtitle: "SNS｜販促｜販売スクリプト", copy: "フック、テンポ、訴求、媒体別の書き換えに対応。" },
      reports: { title: "レポート", subtitle: "事業計画｜分析｜報告資料", copy: "複雑な情報を読みやすく説得力ある形に整えます。" },
      academic: { title: "論文", subtitle: "計画書｜レビュー｜校正", copy: "文献整理、構造確認、学術表現の改善を支援します。" },
      courses: { title: "講座", subtitle: "講座設計｜講義ノート｜台本", copy: "知識を授業モジュールと教材に変えるための支援。" },
    },
    categoryChips: {
      books: "書籍",
      articles: "記事",
      copywriting: "コピー",
      reports: "レポート",
      academic: "論文",
      courses: "講座",
    },
  },
  fr: {
    languageLabel: "Langue",
    brandCopy: "Des skills directs et sélectionnés pour les créateurs",
    header: {
      quickSearch: "Recherche rapide",
      submit: "Soumettre un skill",
      faq: "FAQ",
      login: "Connexion",
      admin: "Admin",
      logout: "Déconnexion",
      loggingOut: "Déconnexion...",
      signedIn: "Connecté",
    },
    auth: {
      dialogAria: "Connexion",
      close: "Fermer la fenêtre de connexion",
      kicker: "Connexion",
      title: "Se connecter",
      copy: "Connectez-vous avec email et mot de passe, ou continuez avec Google.",
      emailLabel: "Email",
      emailPlaceholder: "Entrez votre email",
      passwordLabel: "Mot de passe",
      passwordPlaceholder: "Entrez votre mot de passe",
      emailLogin: "Connexion par email",
      loggingIn: "Connexion...",
      divider: "ou",
      googleLogin: "Continuer avec Google",
      googleRedirecting: "Redirection...",
      missingEnv: "Les variables Supabase ne sont pas encore configurées.",
    },
    home: {
      heroTitle: "OpenClaw Skills for Authors",
      heroSubheadlineLine1: "Une bibliothèque de skills pour créateurs",
      heroSubheadlineLine2: "Pour livres, articles, copywriting, rapports, recherche et cours",
      heroCopy: "Nous organisons les OpenClaw Skills par format et par étape de travail afin d’aider les auteurs à trouver plus vite l’outil utile, du plan initial à la révision finale.",
      browseAll: "Voir tous les OpenClaw Skills",
      installGuide: "Voir le guide d’installation",
      categoriesTitle: "OpenClaw Skills pour six types de création",
      categoriesDescription: "Commencez par votre format de travail et votre étape actuelle, puis allez vers le Skill le plus pertinent.",
      categoryButton: "Ouvrir la bibliothèque",
      spotlightTitle: "Skills en vedette",
      spotlightDescription: "Un petit ensemble de skills utiles à découvrir d’abord.",
      spotlightName: "Nom du Skill :",
      spotlightScene: "Cas d’usage :",
      spotlightTags: "Étiquettes :",
      spotlightCta: "Ouvrir dans ClawHub ↗",
      reasonsTitle: "Pourquoi utiliser cette bibliothèque de skills ?",
      reasons: [
        { title: "Commencer par le flux de travail", copy: "On cherche d’abord par catégorie d’écriture et par étape concrète, pas par jargon technique." },
        { title: "Des liens directs avant tout", copy: "Nous privilégions les skills qui ouvrent encore leur page source d’origine sans passer par des impasses." },
        { title: "Sélection courte ou recherche ciblée", copy: "Vous pouvez commencer par une courte sélection ou chercher immédiatement par étape de travail." },
      ],
      faqTitle: "FAQ",
      faqDescription: "Les réponses rapides aux questions les plus courantes.",
      faqItems: [
        { question: "Quelle différence avec une recherche directe sur ClawHub ?", answer: "Le site filtre d’abord par catégorie créative et étape de travail, puis vous envoie vers la source." },
        { question: "Par où commencer quand on découvre le site ?", answer: "Commencez par les sélections de la page d’accueil ou recherchez depuis une catégorie." },
        { question: "Les Skills ouvrent-ils la page source originale ?", answer: "Nous privilégions les entrées capables d’ouvrir directement la page source." },
        { question: "Que faire si un Skill ne fonctionne plus ?", answer: "Les liens cassés sont remplacés progressivement par des alternatives plus stables." },
        { question: "Puis-je recommander un nouveau Skill ?", answer: "Oui. Une fois connecté, vous pouvez envoyer un lien, un package et une raison." },
      ],
    },
    categories: {
      books: { title: "Livres", subtitle: "Roman | Non-fiction | Mémoire", copy: "De la matière brute à la structure, aux chapitres et à la révision." },
      articles: { title: "Articles", subtitle: "Newsletter | Tribune | Long format", copy: "Pour cadrer un angle, structurer une idée et renforcer un titre." },
      copywriting: { title: "Copywriting", subtitle: "Marketing | Social | Vente", copy: "Pour les hooks, le rythme, la persuasion et l’adaptation par canal." },
      reports: { title: "Rapports", subtitle: "Plan d’affaires | Analyse | Brief", copy: "Transforme une masse d’information en document clair et convaincant." },
      academic: { title: "Académique", subtitle: "Proposal | Revue | Polissage", copy: "Aide à la synthèse bibliographique, à la structure et au ton académique." },
      courses: { title: "Cours", subtitle: "Plan de cours | Notes | Scripts", copy: "Convertit un savoir en modules, supports et séquences enseignables." },
    },
    categoryChips: {
      books: "Livres",
      articles: "Articles",
      copywriting: "Copy",
      reports: "Rapports",
      academic: "Académique",
      courses: "Cours",
    },
  },
  ko: {
    languageLabel: "언어",
    brandCopy: "창작자를 위해 바로 쓸 수 있는 Skills를 선별",
    header: {
      quickSearch: "빠른 검색",
      submit: "Skill 추천",
      faq: "FAQ",
      login: "로그인",
      admin: "관리자",
      logout: "로그아웃",
      loggingOut: "로그아웃 중...",
      signedIn: "로그인됨",
    },
    auth: {
      dialogAria: "로그인",
      close: "로그인 창 닫기",
      kicker: "로그인",
      title: "계정 로그인",
      copy: "이메일과 비밀번호로 로그인하거나 Google로 계속할 수 있습니다.",
      emailLabel: "이메일",
      emailPlaceholder: "이메일을 입력하세요",
      passwordLabel: "비밀번호",
      passwordPlaceholder: "비밀번호를 입력하세요",
      emailLogin: "이메일 로그인",
      loggingIn: "로그인 중...",
      divider: "또는",
      googleLogin: "Google로 계속하기",
      googleRedirecting: "이동 중...",
      missingEnv: "Supabase 로그인 환경 변수가 아직 설정되지 않았습니다.",
    },
    home: {
      heroTitle: "OpenClaw Skills for Authors",
      heroSubheadlineLine1: "창작자용 skills 라이브러리",
      heroSubheadlineLine2: "책, 글, 카피, 보고서, 논문, 강의에 대응",
      heroCopy: "OpenClaw Skills를 작업 형식과 워크플로 단계별로 정리해, 아이디어부터 초안, 수정, 최종 정리까지 더 빠르게 맞는 Skill을 찾도록 돕습니다.",
      browseAll: "모든 OpenClaw Skills 보기",
      installGuide: "설치 가이드 보기",
      categoriesTitle: "여섯 가지 창작 트랙을 위한 OpenClaw Skills",
      categoriesDescription: "지금 하고 있는 작업 형식과 단계에서 시작해 더 적합한 Skill로 바로 이동할 수 있습니다.",
      categoryButton: "skills 라이브러리 열기",
      spotlightTitle: "추천 Skills",
      spotlightDescription: "먼저 살펴보기 좋은 핵심 Skill 모음입니다.",
      spotlightName: "Skill 이름:",
      spotlightScene: "적용 장면:",
      spotlightTags: "태그:",
      spotlightCta: "ClawHub로 이동 ↗",
      reasonsTitle: "왜 이 skills 라이브러리를 써야 할까요?",
      reasons: [
        { title: "기술명보다 작업 단계부터", copy: "기술 용어가 아니라 지금 막힌 작업 단계에서 Skill을 찾을 수 있습니다." },
        { title: "직접 열리는 Skill 우선", copy: "원본 Skill 페이지로 안정적으로 바로 갈 수 있는 항목을 우선적으로 남깁니다." },
        { title: "추천과 검색을 함께 제공", copy: "짧은 추천 목록으로 시작하거나 작업 단계 검색으로 바로 들어갈 수 있습니다." },
      ],
      faqTitle: "자주 묻는 질문",
      faqDescription: "처음 보는 분들이 가장 먼저 궁금해하는 내용을 먼저 정리했습니다.",
      faqItems: [
        { question: "ClawHub에서 직접 검색하는 것과 무엇이 다른가요?", answer: "이 사이트는 먼저 창작 카테고리와 작업 단계별로 추려서 원본 Skill로 안내합니다." },
        { question: "처음이면 어디서 시작하면 되나요?", answer: "홈 추천 목록을 보거나, 카테고리 페이지에서 현재 작업 단계를 검색하면 됩니다." },
        { question: "여기 있는 Skill은 원본 설치 페이지로 바로 가나요?", answer: "가능하면 원본 Skill 페이지로 직접 열리는 항목을 우선적으로 유지합니다." },
        { question: "어떤 Skill이 더 이상 작동하지 않으면 어떻게 하나요?", answer: "깨진 링크는 계속 교체하고 더 안정적인 대체 항목으로 갱신합니다." },
        { question: "새로운 Skill을 추천할 수 있나요?", answer: "네. 로그인 후 링크, 패키지, 추천 이유를 제출할 수 있습니다." },
      ],
    },
    categories: {
      books: { title: "책 쓰기", subtitle: "소설 | 논픽션 | 회고", copy: "메모 정리, 구조 설계, 장 초안, 수정까지 돕습니다." },
      articles: { title: "글쓰기", subtitle: "뉴스레터 | 칼럼 | 장문", copy: "주제 설정, 구조 정리, 논지 전개, 제목 보강에 적합합니다." },
      copywriting: { title: "카피", subtitle: "마케팅 | SNS | 세일즈", copy: "훅, 리듬, 설득, 플랫폼별 재작성에 초점을 둡니다." },
      reports: { title: "보고서", subtitle: "사업계획 | 분석 | 브리핑", copy: "복잡한 정보를 읽기 쉬운 보고서로 정리합니다." },
      academic: { title: "논문", subtitle: "계획서 | 문헌검토 | 교정", copy: "문헌 정리, 구조 점검, 학술 문체 다듬기를 지원합니다." },
      courses: { title: "강의", subtitle: "강의 개요 | 교안 | 스크립트", copy: "지식을 모듈, 교안, 전달 자료로 바꾸는 데 적합합니다." },
    },
    categoryChips: {
      books: "책",
      articles: "글",
      copywriting: "카피",
      reports: "보고서",
      academic: "논문",
      courses: "강의",
    },
  },
  de: {
    languageLabel: "Sprache",
    brandCopy: "Direkt nutzbare Skills für Creators, sorgfältig kuratiert",
    header: {
      quickSearch: "Schnellsuche",
      submit: "Skill einreichen",
      faq: "FAQ",
      login: "Login",
      admin: "Admin",
      logout: "Abmelden",
      loggingOut: "Melde ab...",
      signedIn: "Angemeldet",
    },
    auth: {
      dialogAria: "Anmelden",
      close: "Login-Dialog schließen",
      kicker: "Login",
      title: "Anmelden",
      copy: "Mit E-Mail und Passwort anmelden oder mit Google fortfahren.",
      emailLabel: "E-Mail",
      emailPlaceholder: "E-Mail eingeben",
      passwordLabel: "Passwort",
      passwordPlaceholder: "Passwort eingeben",
      emailLogin: "Mit E-Mail anmelden",
      loggingIn: "Melde an...",
      divider: "oder",
      googleLogin: "Mit Google fortfahren",
      googleRedirecting: "Weiterleitung...",
      missingEnv: "Die Supabase-Login-Variablen sind noch nicht konfiguriert.",
    },
    home: {
      heroTitle: "OpenClaw Skills for Authors",
      heroSubheadlineLine1: "Eine Skills-Bibliothek für Kreative",
      heroSubheadlineLine2: "Für Bücher, Artikel, Copy, Reports, Research und Kurse",
      heroCopy: "Wir ordnen OpenClaw Skills nach Format und Workflow, damit Autorinnen und Autoren schneller das passende Tool für Idee, Entwurf, Überarbeitung und Auslieferung finden.",
      browseAll: "Alle OpenClaw Skills ansehen",
      installGuide: "Installationshilfe ansehen",
      categoriesTitle: "OpenClaw Skills für sechs kreative Bereiche",
      categoriesDescription: "Starte bei deinem aktuellen Format und Arbeitsschritt und gehe dann direkt zum passenden Skill.",
      categoryButton: "Skills-Bibliothek öffnen",
      spotlightTitle: "Empfohlene Skills",
      spotlightDescription: "Ein kurzer Einstieg mit den nützlichsten Skills.",
      spotlightName: "Skill-Name:",
      spotlightScene: "Einsatzbereich:",
      spotlightTags: "Tags:",
      spotlightCta: "In ClawHub öffnen ↗",
      reasonsTitle: "Warum diese Skills-Bibliothek nutzen?",
      reasons: [
        { title: "Zuerst der Schritt, dann der Skill", copy: "Man startet über Schreibformat und Workflow-Schritt statt über technische Begriffe." },
        { title: "Direkte Quellen statt Sackgassen", copy: "Bevorzugt werden Einträge, die ihre originale Skill-Seite noch direkt öffnen können." },
        { title: "Kuratiert oder sofort suchen", copy: "Du kannst mit einer kurzen Auswahl beginnen oder direkt nach dem aktuellen Arbeitsschritt suchen." },
      ],
      faqTitle: "FAQ",
      faqDescription: "Die wichtigsten Fragen zuerst, kurz beantwortet.",
      faqItems: [
        { question: "Was ist der Unterschied zur direkten Suche in ClawHub?", answer: "Hier werden Skills zuerst nach Kategorie und Arbeitsschritt gefiltert und dann zur Quelle weitergeleitet." },
        { question: "Wo starte ich am besten?", answer: "Am einfachsten über die Startseiten-Auswahl oder über die Suche im passenden Kategorie-Bereich." },
        { question: "Öffnen diese Skills die Originalseite direkt?", answer: "Wir priorisieren Einträge, die direkt auf ihre Originalseite verweisen." },
        { question: "Was passiert bei einem kaputten Link?", answer: "Kaputte Einträge werden schrittweise durch stabilere Alternativen ersetzt." },
        { question: "Kann ich einen neuen Skill empfehlen?", answer: "Ja. Nach dem Login kannst du Link, Paket und Begründung einreichen." },
      ],
    },
    categories: {
      books: { title: "Bücher", subtitle: "Roman | Sachbuch | Memoir", copy: "Von Notizen und Struktur bis zu Kapiteln und Endredaktion." },
      articles: { title: "Artikel", subtitle: "Newsletter | Kolumne | Longform", copy: "Hilft bei Themenwahl, Struktur, Argumenten und Überschriften." },
      copywriting: { title: "Copywriting", subtitle: "Marketing | Social | Sales", copy: "Für Hooks, Timing, Überzeugungskraft und Kanal-Anpassung." },
      reports: { title: "Reports", subtitle: "Business Plan | Analyse | Briefing", copy: "Verdichtet komplexe Informationen zu klaren und überzeugenden Berichten." },
      academic: { title: "Wissenschaft", subtitle: "Proposal | Review | Polishing", copy: "Unterstützt Literaturarbeit, Strukturprüfung und akademischen Stil." },
      courses: { title: "Kurse", subtitle: "Kursstruktur | Notizen | Skripte", copy: "Macht aus Wissen lehrbare Module, Unterlagen und Skripte." },
    },
    categoryChips: {
      books: "Bücher",
      articles: "Artikel",
      copywriting: "Copy",
      reports: "Reports",
      academic: "Wissenschaft",
      courses: "Kurse",
    },
  },
  es: {
    languageLabel: "Idioma",
    brandCopy: "Skills útiles y directos para creadores",
    header: {
      quickSearch: "Búsqueda rápida",
      submit: "Enviar skill",
      faq: "FAQ",
      login: "Entrar",
      admin: "Admin",
      logout: "Salir",
      loggingOut: "Saliendo...",
      signedIn: "Con sesión",
    },
    auth: {
      dialogAria: "Iniciar sesión",
      close: "Cerrar acceso",
      kicker: "Acceso",
      title: "Iniciar sesión",
      copy: "Usa correo y contraseña o continúa con Google.",
      emailLabel: "Correo",
      emailPlaceholder: "Introduce tu correo",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "Introduce tu contraseña",
      emailLogin: "Entrar con correo",
      loggingIn: "Entrando...",
      divider: "o",
      googleLogin: "Continuar con Google",
      googleRedirecting: "Redirigiendo...",
      missingEnv: "Las variables de Supabase aún no están configuradas.",
    },
    home: {
      heroTitle: "OpenClaw Skills for Authors",
      heroSubheadlineLine1: "Una biblioteca de skills para creadores",
      heroSubheadlineLine2: "Para libros, artículos, copy, informes, textos académicos y cursos",
      heroCopy: "Organizamos OpenClaw Skills por formato y flujo de trabajo para que sea más fácil encontrar el skill adecuado desde la idea inicial hasta el borrador, la revisión y la entrega.",
      browseAll: "Ver todos los OpenClaw Skills",
      installGuide: "Ver guía de instalación",
      categoriesTitle: "OpenClaw Skills para seis tipos de creación",
      categoriesDescription: "Empieza desde el formato creativo y la etapa real del trabajo en la que estás ahora.",
      categoryButton: "Abrir biblioteca",
      spotlightTitle: "Skills destacados",
      spotlightDescription: "Una selección corta para empezar más rápido.",
      spotlightName: "Nombre del Skill:",
      spotlightScene: "Escenario:",
      spotlightTags: "Etiquetas:",
      spotlightCta: "Abrir en ClawHub ↗",
      reasonsTitle: "¿Por qué usar esta biblioteca de skills?",
      reasons: [
        { title: "Primero la tarea, luego el Skill", copy: "Se entra por categoría de escritura y etapa de trabajo, no por jerga técnica." },
        { title: "Solo enlaces que abren de verdad", copy: "Se priorizan skills que todavía pueden abrir su página original sin pasar por páginas vacías." },
        { title: "Curación y búsqueda en el mismo sitio", copy: "Puedes empezar con una selección breve o ir directo a buscar por la etapa que necesitas." },
      ],
      faqTitle: "Preguntas frecuentes",
      faqDescription: "Respuestas rápidas para las preguntas más comunes.",
      faqItems: [
        { question: "¿Qué diferencia hay con buscar en ClawHub directamente?", answer: "Aquí los skills se filtran primero por categoría creativa y etapa de trabajo." },
        { question: "¿Por dónde empiezo si soy nuevo?", answer: "Empieza por la selección de inicio o entra en una categoría y busca por etapa." },
        { question: "¿Estos skills abren la página original?", answer: "Priorizamos entradas que todavía abren su página original directamente." },
        { question: "¿Qué pasa si un skill deja de funcionar?", answer: "Los enlaces rotos se reemplazan gradualmente por alternativas más estables." },
        { question: "¿Puedo recomendar un nuevo skill?", answer: "Sí. Después de iniciar sesión puedes enviar el enlace, el paquete y una razón." },
      ],
    },
    categories: {
      books: { title: "Libros", subtitle: "Ficción | No ficción | Memorias", copy: "Desde notas y estructura hasta capítulos, borradores y revisión." },
      articles: { title: "Artículos", subtitle: "Newsletter | Columna | Largo formato", copy: "Ayuda con el enfoque, la estructura, la idea central y los títulos." },
      copywriting: { title: "Copywriting", subtitle: "Marketing | Social | Ventas", copy: "Pensado para hooks, ritmo, persuasión y adaptación por canal." },
      reports: { title: "Informes", subtitle: "Plan de negocio | Análisis | Briefing", copy: "Convierte información compleja en informes claros y convincentes." },
      academic: { title: "Académico", subtitle: "Propuesta | Revisión | Pulido", copy: "Apoya la revisión bibliográfica, la estructura y el tono académico." },
      courses: { title: "Cursos", subtitle: "Esquema | Apuntes | Guiones", copy: "Transforma conocimiento en módulos, materiales y guiones enseñables." },
    },
    categoryChips: {
      books: "Libros",
      articles: "Artículos",
      copywriting: "Copy",
      reports: "Informes",
      academic: "Académico",
      courses: "Cursos",
    },
  },
};

export function getTranslations(language: LanguageCode): TranslationSet {
  return translations[language] ?? translations[defaultLanguage];
}
