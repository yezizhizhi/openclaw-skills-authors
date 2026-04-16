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
    id: "workflow-package-books-outline",
    slug: "book-outline-blueprint-pack",
    name: "Book Outline Blueprint Pack",
    version: "2026.04.14",
    categorySlug: "books",
    audience: "Authors shaping a book idea into a stable chapter plan",
    goal: "Move from scattered notes to a chapter-ready structure before drafting.",
    description: "A prototype package for book projects that need topic validation, source gathering, material compression, and a clearer outline before the first draft.",
    templateName: "Book writing: from research to chapter blueprint",
    buildSource: "manual",
    status: "published",
    updatedAt: "2026-04-14T00:00:00.000Z",
    steps: [
      {
        id: "books-outline-step-01",
        templateStepId: "books-outline-step-01",
        stepKey: "topic-research",
        stepName: "Topic research",
        stepDescription: "Check whether the idea has enough real discussion, demand, and signal to become a full book project.",
        isRequired: true,
        inputContract: { topic: "Book idea, angle, or working title" },
        outputContract: { insight: "Trend summary, topic direction, adjacent angles" },
        selectedSkill: {
          name: "Last30days",
          sourceUrl: "https://clawhub.ai/mvanhorn/last30days-official",
          selectionReason: "Useful for pressure-testing whether the topic is alive in public discussion before outlining.",
        },
      },
      {
        id: "books-outline-step-02",
        templateStepId: "books-outline-step-02",
        stepKey: "source-gathering",
        stepName: "Source gathering",
        stepDescription: "Pull in strong references, background reading, and supporting material before structure work begins.",
        isRequired: true,
        inputContract: { topic: "Refined topic and research angle" },
        outputContract: { sourceSet: "Research notes with citations and supporting links" },
        selectedSkill: {
          name: "Deep Research Pro",
          sourceUrl: "https://clawhub.ai/parags/deep-research-pro",
          selectionReason: "It breaks a broad topic into sub-questions and returns a cleaner research base for long-form writing.",
        },
      },
      {
        id: "books-outline-step-03",
        templateStepId: "books-outline-step-03",
        stepKey: "material-compression",
        stepName: "Material compression",
        stepDescription: "Turn the source pile into a smaller set of notes you can actually structure into chapters.",
        isRequired: true,
        inputContract: { sourceSet: "Collected notes, links, PDFs, transcripts" },
        outputContract: { brief: "Compressed notes, takeaways, reusable material" },
        selectedSkill: {
          name: "Summarize",
          sourceUrl: "https://clawhub.ai/steipete/summarize",
          selectionReason: "A fast way to compress large source sets before deciding chapter flow.",
        },
      },
      {
        id: "books-outline-step-04",
        templateStepId: "books-outline-step-04",
        stepKey: "outline-builder",
        stepName: "Outline builder",
        stepDescription: "Translate the idea and research into a top-level chapter structure with a usable sequence.",
        isRequired: true,
        inputContract: { brief: "Compressed notes and working themes" },
        outputContract: { outline: "Book structure, chapter order, and section logic" },
        selectedSkill: {
          name: "SEO Content Writer",
          sourceUrl: "https://clawhub.ai/aaron-he-zhu/seo-content-writer",
          selectionReason: "Originally a structured content skill, but especially strong for turning ideas into layered outline scaffolds.",
        },
      },
      {
        id: "books-outline-step-05",
        templateStepId: "books-outline-step-05",
        stepKey: "outline-review",
        stepName: "Outline review",
        stepDescription: "Run one final pass to reduce repetition, weak transitions, or obvious structure gaps before drafting.",
        isRequired: true,
        inputContract: { outline: "Draft chapter map" },
        outputContract: { reviewedOutline: "Cleaner, more stable chapter plan" },
        selectedSkill: {
          name: "Humanizer",
          sourceUrl: "https://clawhub.ai/biostartechnology/humanizer",
          selectionReason: "Used here as a final readability pass so the outline feels more natural and less mechanical.",
        },
      },
    ],
  },
  {
    id: "workflow-package-books-draft",
    slug: "book-draft-revision-pack",
    name: "Book Draft & Revision Pack",
    version: "2026.04.14",
    categorySlug: "books",
    audience: "Authors who already have a chapter plan and want smoother drafting and revision",
    goal: "Help a book project move from chapter blueprint to readable first draft and revision loop.",
    description: "A prototype package focused on draft support, chapter expansion, source-backed writing, and final cleanup for long-form book work.",
    templateName: "Book writing: from chapter plan to revised draft",
    buildSource: "manual",
    status: "published",
    updatedAt: "2026-04-14T00:00:00.000Z",
    steps: [
      {
        id: "books-draft-step-01",
        templateStepId: "books-draft-step-01",
        stepKey: "support-research",
        stepName: "Supporting research",
        stepDescription: "Fill the weaker sections of an existing outline with stronger references and examples.",
        isRequired: true,
        inputContract: { outline: "Existing outline with weak or empty sections" },
        outputContract: { supportNotes: "Additional references and source-backed notes" },
        selectedSkill: {
          name: "Academic Deep Research",
          sourceUrl: "https://clawhub.ai/kesslerio/academic-deep-research",
          selectionReason: "Strong when a chapter needs better evidence, references, or deeper source support.",
        },
      },
      {
        id: "books-draft-step-02",
        templateStepId: "books-draft-step-02",
        stepKey: "chapter-drafting",
        stepName: "Chapter drafting",
        stepDescription: "Expand the chapter plan into a fuller first draft while preserving the existing structure.",
        isRequired: true,
        inputContract: { outline: "Chapter structure and notes", supportNotes: "Optional supporting material" },
        outputContract: { chapterDraft: "Readable chapter draft" },
        selectedSkill: {
          name: "Marketing Skills",
          sourceUrl: "https://clawhub.ai/jchopard69/marketing-skills",
          selectionReason: "Useful for expanding structured arguments, examples, and action-oriented sections in nonfiction chapters.",
        },
      },
      {
        id: "books-draft-step-03",
        templateStepId: "books-draft-step-03",
        stepKey: "knowledge-base",
        stepName: "Material sync",
        stepDescription: "Keep chapter notes and reference material connected to your working knowledge base while you draft.",
        isRequired: false,
        inputContract: { notes: "Research notes, chapter ideas, excerpts" },
        outputContract: { syncedNotes: "Organized notes connected to the draft workflow" },
        selectedSkill: {
          name: "Obsidian",
          sourceUrl: "https://clawhub.ai/steipete/obsidian",
          selectionReason: "Good for writers already keeping book research and drafts inside an Obsidian vault.",
        },
      },
      {
        id: "books-draft-step-04",
        templateStepId: "books-draft-step-04",
        stepKey: "final-revision",
        stepName: "Final revision",
        stepDescription: "Run a cleanup pass to improve readability and reduce obvious AI-style artifacts before the next revision round.",
        isRequired: true,
        inputContract: { chapterDraft: "Draft chapter or long-form section" },
        outputContract: { revisedDraft: "Cleaner draft ready for editorial review" },
        selectedSkill: {
          name: "self-improving-agent",
          sourceUrl: "https://clawhub.ai/pskoett/self-improving-agent",
          selectionReason: "Useful for iterative revision where the system gradually learns your editorial preferences.",
        },
      },
    ],
  },
  {
    id: "workflow-package-articles-starter",
    slug: "wechat-article-starter-pack",
    name: "WeChat Article Workflow Pack",
    version: "2026.04.13",
    categorySlug: "articles",
    audience: "Content teams, newsletter writers, and brand editors",
    goal: "Move from trend validation to a publishable article draft without rebuilding the tool stack each time.",
    description: "A packaged article lane that connects topic testing, source gathering, outlining, drafting, and final polish into one usable workflow.",
    templateName: "From trend research to finished article draft",
    buildSource: "manual",
    status: "published",
    updatedAt: "2026-04-13T00:00:00.000Z",
    steps: [
      {
        id: "articles-step-01",
        templateStepId: "articles-step-01",
        stepKey: "trend-research",
        stepName: "Trend research",
        stepDescription: "Check whether the topic has enough attention and momentum before you commit to drafting.",
        isRequired: true,
        inputContract: { topic: "Topic, event, or angle you want to write about" },
        outputContract: { insight: "Trend signal, framing angle, and supporting sources" },
        selectedSkill: {
          skillId: "academic-last30days-clawhub",
          name: "last30days — ClawHub",
          sourceUrl: "https://clawhub.ai/mvanhorn/last30days-official",
          selectionReason: "Useful for validating whether the conversation is active enough to support a timely article.",
        },
      },
      {
        id: "articles-step-02",
        templateStepId: "articles-step-02",
        stepKey: "material-distillation",
        stepName: "Material distillation",
        stepDescription: "Condense raw source material into notes you can actually draft from.",
        isRequired: true,
        inputContract: { sources: "Articles, videos, comment threads, and report links" },
        outputContract: { notes: "Structured notes with reusable arguments and examples" },
        selectedSkill: {
          name: "Summarize",
          selectionReason: "Acts as a placeholder summary stage until the package builder can auto-pick the strongest summarization skill.",
        },
      },
      {
        id: "articles-step-03",
        templateStepId: "articles-step-03",
        stepKey: "outline",
        stepName: "Outline structure",
        stepDescription: "Lock the argument flow and section order before expanding into full prose.",
        isRequired: true,
        inputContract: { notes: "Condensed source material and core arguments" },
        outputContract: { outline: "Headline options, opening angle, and section sequence" },
        selectedSkill: {
          name: "Outline Builder",
          selectionReason: "Keeps the workflow scaffold in place now, with room for smarter skill matching later.",
        },
      },
      {
        id: "articles-step-04",
        templateStepId: "articles-step-04",
        stepKey: "drafting",
        stepName: "Draft writing",
        stepDescription: "Turn the approved structure into a readable first draft.",
        isRequired: true,
        inputContract: { outline: "Article structure and key material" },
        outputContract: { draft: "First article draft" },
        selectedSkill: {
          name: "Article Draft Writer",
          selectionReason: "Reserved as the drafting stage until a more specific writing skill is wired in.",
        },
      },
      {
        id: "articles-step-05",
        templateStepId: "articles-step-05",
        stepKey: "polish",
        stepName: "Final polish",
        stepDescription: "Check clarity, natural phrasing, headline strength, and obvious AI artifacts before publishing.",
        isRequired: true,
        inputContract: { draft: "Completed article draft" },
        outputContract: { final: "Publish-ready version" },
        selectedSkill: {
          name: "Humanizer / Final QA",
          selectionReason: "Keeps a final quality pass in place before publication.",
        },
      },
    ],
  },
  {
    id: "workflow-package-reports-starter",
    slug: "industry-report-delivery-pack",
    name: "Industry Report Delivery Pack",
    version: "2026.04.13",
    categorySlug: "reports",
    audience: "Consulting teams, strategy analysts, and growth leads",
    goal: "Create a clear path from evidence gathering to an executive-facing summary.",
    description: "Designed for industry scans, competitor breakdowns, strategic synthesis, and report rewrites meant for decision-makers.",
    templateName: "From research gathering to executive summary",
    buildSource: "manual",
    status: "published",
    updatedAt: "2026-04-13T00:00:00.000Z",
    steps: [
      {
        id: "reports-step-01",
        templateStepId: "reports-step-01",
        stepKey: "research",
        stepName: "Evidence search",
        stepDescription: "Gather the source material and supporting evidence before synthesis begins.",
        isRequired: true,
        inputContract: { question: "Industry question or strategic problem to answer" },
        outputContract: { sources: "Reports, news, competitors, and market signals" },
        selectedSkill: {
          skillId: "academic-market-research-clawhub",
          name: "Market Research — ClawHub",
          sourceUrl: "https://clawhub.ai/ivangdavila/market-research",
          selectionReason: "Useful for market sizing, competitor mapping, and early demand validation.",
        },
      },
      {
        id: "reports-step-02",
        templateStepId: "reports-step-02",
        stepKey: "synthesis",
        stepName: "Key synthesis",
        stepDescription: "Turn raw material into usable findings with ranking and judgment.",
        isRequired: true,
        inputContract: { sources: "Collected material from multiple channels" },
        outputContract: { findings: "Core conclusions suitable for a client or leadership readout" },
        selectedSkill: {
          skillId: "reports-open-source-maintainer",
          skillVersionId: "github-numman-ali-n-skills-skills-workflow-open-source-maintainer-skills-open-source-ma-3ea8ed4e657d",
          name: "open-source-maintainer",
          sourceUrl: "https://github.com/numman-ali/n-skills/blob/HEAD/skills/workflow/open-source-maintainer/skills/open-source-maintainer/SKILL.md",
          selectionReason: "Originally an OSS workflow, but its triage and synthesis behavior maps well to prioritizing report findings.",
        },
      },
      {
        id: "reports-step-03",
        templateStepId: "reports-step-03",
        stepKey: "frame",
        stepName: "Report framing",
        stepDescription: "Build the narrative structure before deciding how the report should be presented.",
        isRequired: true,
        inputContract: { findings: "Synthesized findings and evidence" },
        outputContract: { structure: "Report outline, story line, and executive-summary frame" },
        selectedSkill: {
          name: "Report Structurer",
          selectionReason: "Keeps the structure stage explicit until automatic package selection gets smarter.",
        },
      },
      {
        id: "reports-step-04",
        templateStepId: "reports-step-04",
        stepKey: "executive-summary",
        stepName: "Executive rewrite",
        stepDescription: "Compress the full report into a concise summary for senior readers.",
        isRequired: true,
        inputContract: { structure: "Completed report structure and conclusions" },
        outputContract: { summary: "Executive summary or briefing version" },
        selectedSkill: {
          name: "Executive Summary Rewriter",
          selectionReason: "Makes the package feel like a real delivery path instead of a loose draft scaffold.",
        },
      },
    ],
  },
  {
    id: "workflow-package-academic-starter",
    slug: "academic-kickoff-pack",
    name: "Academic Kickoff Pack",
    version: "2026.04.13",
    categorySlug: "academic",
    audience: "Graduate students, academic writers, and research assistants",
    goal: "Move from a rough research question to a first literature-review structure with less drift.",
    description: "Start by framing the question, then collect sources, summarize the literature, and shape a usable research structure.",
    templateName: "Research kickoff and literature review starter",
    buildSource: "manual",
    status: "published",
    updatedAt: "2026-04-13T00:00:00.000Z",
    steps: [
      {
        id: "academic-step-01",
        templateStepId: "academic-step-01",
        stepKey: "question",
        stepName: "Research question framing",
        stepDescription: "Compress a broad interest into a sharper question worth investigating.",
        isRequired: true,
        inputContract: { topic: "Research domain and tentative question" },
        outputContract: { question: "Research question, scope, and initial hypothesis" },
        selectedSkill: {
          skillId: "academic-last30days-clawhub",
          name: "last30days — ClawHub",
          sourceUrl: "https://clawhub.ai/mvanhorn/last30days-official",
          selectionReason: "Helps check whether the topic is active enough in current discussion to be worth pursuing.",
        },
      },
      {
        id: "academic-step-02",
        templateStepId: "academic-step-02",
        stepKey: "literature",
        stepName: "Literature collection",
        stepDescription: "Start gathering papers, citations, and useful source trails in a more systematic way.",
        isRequired: true,
        inputContract: { question: "Defined research question" },
        outputContract: { library: "Candidate papers, references, and citation paths" },
        selectedSkill: {
          skillId: "academic-academic-deep-research-clawhub",
          name: "Academic Deep Research — ClawHub",
          sourceUrl: "https://clawhub.ai/kesslerio/academic-deep-research",
          selectionReason: "A solid primary skill for academic workflows that need more rigorous source gathering.",
        },
      },
      {
        id: "academic-step-03",
        templateStepId: "academic-step-03",
        stepKey: "digest",
        stepName: "Digest and notes",
        stepDescription: "Convert the literature pile into notes that can support a proposal or early review draft.",
        isRequired: true,
        inputContract: { library: "Collected papers and source material" },
        outputContract: { digest: "Summaries, contrasts, and quotable material" },
        selectedSkill: {
          name: "Literature Digest",
          selectionReason: "Holds the digest stage for now and can later be swapped for a better-ranked summarization skill.",
        },
      },
      {
        id: "academic-step-04",
        templateStepId: "academic-step-04",
        stepKey: "draft",
        stepName: "Proposal structure",
        stepDescription: "Shape the first structure for a literature review or proposal draft.",
        isRequired: true,
        inputContract: { digest: "Organized research notes" },
        outputContract: { draft: "Proposal or literature-review structure draft" },
        selectedSkill: {
          name: "Academic Structure Draft",
          selectionReason: "Makes the package immediately usable as a research starter bundle.",
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
