import { slugify } from "./skill-sync-lib.mjs";

function getSeedUrls() {
  return (process.env.CLAWHUB_SEED_URLS?.trim() || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function unique(items) {
  return Array.from(new Set(items));
}

function extractClawHubLinks(html) {
  const matches = html.match(/https:\/\/clawhub\.ai\/[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%-]+/g) || [];
  return unique(matches.map((value) => value.replace(/[)"'>\]]+$/g, "")));
}

function extractMeta(html, property) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, "i"),
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }

  return "";
}

function extractTitle(html) {
  const match = html.match(/<title>([^<]+)<\/title>/i);
  return match?.[1]?.trim() || "";
}

function extractTextSnippet(html) {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned.slice(0, 500);
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "OpenClaw Author Sync Bot/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

export async function discoverClawHubSkills() {
  const seedUrls = getSeedUrls();
  if (!seedUrls.length) {
    return [];
  }

  const discoveredSkillUrls = new Set();

  for (const url of seedUrls) {
    const html = await fetchHtml(url);
    const links = url.includes("clawhub.ai") ? [url] : extractClawHubLinks(html);
    for (const link of links) {
      discoveredSkillUrls.add(link);
    }
  }

  const items = [];

  for (const skillUrl of discoveredSkillUrls) {
    try {
      const html = await fetchHtml(skillUrl);
      const title = extractMeta(html, "og:title") || extractTitle(html) || skillUrl.split("/").pop() || "ClawHub Skill";
      const description = extractMeta(html, "og:description") || extractMeta(html, "description") || extractTextSnippet(html);
      const slug = slugify(title.replace(/\s*[|｜-].*$/, ""));

      items.push({
        sourceType: "clawhub",
        sourceKey: slug || slugify(skillUrl),
        sourceUrl: skillUrl,
        repositoryUrl: null,
        name: title.replace(/\s*[|｜-].*$/, "").trim(),
        description,
        installMode: "view_source",
        primaryAction: "前往 ClawHub ↗",
        tags: ["ClawHub", "auto-ingested"],
        models: ["OpenClaw"],
        inputPreview: "",
        outputPreview: "",
        configSnippet: `source: ${skillUrl}`,
        rawPayload: {
          seedUrl: skillUrl,
          title,
          description,
        },
      });
    } catch (error) {
      items.push({
        sourceType: "clawhub",
        sourceKey: slugify(skillUrl),
        sourceUrl: skillUrl,
        repositoryUrl: null,
        name: skillUrl.split("/").pop() || "ClawHub Skill",
        description: "",
        installMode: "view_source",
        primaryAction: "前往 ClawHub ↗",
        tags: ["ClawHub", "auto-ingested"],
        models: ["OpenClaw"],
        inputPreview: "",
        outputPreview: "",
        configSnippet: `source: ${skillUrl}`,
        rawPayload: {
          seedUrl: skillUrl,
          error: error instanceof Error ? error.message : "Unknown crawl error",
        },
      });
    }
  }

  return items;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const skills = await discoverClawHubSkills();
  console.log(JSON.stringify(skills, null, 2));
}
