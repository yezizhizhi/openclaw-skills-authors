import { NextResponse } from "next/server";
import { searchExplorerSkills } from "@/lib/skill-search";
import { getCategoryExplorerData } from "@/lib/skills-repository";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category");
  const query = searchParams.get("q") ?? "";

  if (!categorySlug) {
    return NextResponse.json({ error: "Missing category parameter." }, { status: 400 });
  }

  const explorerData = await getCategoryExplorerData(categorySlug);

  if (!explorerData) {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }

  return NextResponse.json({
    category: categorySlug,
    query,
    workflowTags: explorerData.workflowTags,
    skills: searchExplorerSkills(explorerData, query),
  });
}
