import { slugify } from "./skill-sync-lib.mjs";

function getRepos() {
  return (process.env.GITHUB_SKILL_REPOS?.trim() || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function getHeaders() {
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "OpenClaw Author Sync Bot/1.0",
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return headers;
}

async function fetchGitHubJson(url) {
  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status} ${url}`);
  }

  return response.json();
}

async function fetchText(url) {
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

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return { meta: {}, body: content };
  }

  const meta = {};
  for (const line of match[1].split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  }

  return {
    meta,
    body: content.slice(match[0].length),
  };
}

function extractFirstParagraph(body) {
  return body
    .replace(/^#+\s.*$/gm, " ")
    .split(/\n\s*\n/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .find(Boolean) || "";
}

function extractCodeBlock(body) {
  const match = body.match(/```(?:ya?ml|json|toml|text)?\n([\s\S]*?)```/i);
  return match?.[1]?.trim() || "";
}

export async function discoverGitHubSkills() {
  const repos = getRepos();
  if (!repos.length) {
    return [];
  }

  const items = [];
  const warnings = [];

  for (const repo of repos) {
    try {
      const tree = await fetchGitHubJson(`https://api.github.com/repos/${repo}/git/trees/HEAD?recursive=1`);
      const skillFiles = (tree.tree || []).filter((item) => {
        return item.type === "blob" && /(^|\/)(SKILL|skill)\.md$/.test(item.path);
      });

      for (const file of skillFiles) {
        const rawUrl = `https://raw.githubusercontent.com/${repo}/HEAD/${file.path}`;
        const content = await fetchText(rawUrl);
        const { meta, body } = parseFrontMatter(content);
        const name = meta.name || file.path.split("/").slice(-2, -1)[0] || file.path.split("/").pop().replace(/\.md$/i, "");
        const description = meta.description || extractFirstParagraph(body);
        const configSnippet = extractCodeBlock(body);
        const repositoryUrl = `https://github.com/${repo}`;
        const sourceUrl = `${repositoryUrl}/blob/HEAD/${file.path}`;

        items.push({
          sourceType: "github",
          sourceKey: `${repo}:${file.path}`,
          sourceUrl,
          repositoryUrl,
          name,
          description,
          installMode: "view_source",
          primaryAction: "View Source ↗",
          tags: ["GitHub", "auto-ingested", repo.split("/")[0]],
          models: [],
          inputPreview: "",
          outputPreview: "",
          configSnippet: configSnippet || `source: ${sourceUrl}`,
          rawPayload: {
            repo,
            path: file.path,
            sha: file.sha,
            meta,
          },
        });
      }
    } catch (error) {
      warnings.push({
        repo,
        error: error instanceof Error ? error.message : "Unknown GitHub sync error",
      });
    }
  }

  if (warnings.length) {
    console.warn(`[sync-github-skills] skipped ${warnings.length} repo(s): ${warnings.map((item) => `${item.repo}: ${item.error}`).join(" | ")}`);
  }

  return items.map((item) => ({
    ...item,
    sourceKey: slugify(item.sourceKey) || slugify(item.name),
  }));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const skills = await discoverGitHubSkills();
  console.log(JSON.stringify(skills, null, 2));
}
