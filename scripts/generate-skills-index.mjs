import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");
const OUTPUT_DIR = join(PROJECT_ROOT, "public", ".well-known", "agent-skills");

const SKILLS_REPO = "OrderlyNetwork/skills";
const SKILLS_BRANCH = "master";
const RAW_BASE = `https://raw.githubusercontent.com/${SKILLS_REPO}/${SKILLS_BRANCH}/skills`;
const GITHUB_API = `https://api.github.com/repos/${SKILLS_REPO}/contents/skills?ref=${SKILLS_BRANCH}`;

async function discoverSkillNames() {
  const res = await fetch(GITHUB_API, {
    headers: { "User-Agent": "orderly-skills-generator" },
  });
  if (!res.ok)
    throw new Error(
      `GitHub API failed: ${res.status} ${res.statusText} (rate limit may apply)`,
    );
  const entries = await res.json();
  const dirs = entries.filter((e) => e.type === "dir");
  return dirs.map((e) => e.name);
}

function extractFrontmatterDescription(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error("No YAML frontmatter found");
  const frontmatter = match[1];
  const descMatch = frontmatter.match(/^description:\s*"([\s\S]*?)"\s*$/m);
  if (descMatch) return descMatch[1];
  const descMatch2 = frontmatter.match(/^description:\s*(.+)/m);
  if (descMatch2) return descMatch2[1].trim();
  throw new Error("No description field in frontmatter");
}

function sha256Hex(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

async function fetchSkill(name) {
  const url = `${RAW_BASE}/${name}/SKILL.md`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  const text = await res.text();
  return text;
}

async function main() {
  console.log(`Generating agent skills discovery index...\n`);

  mkdirSync(OUTPUT_DIR, { recursive: true });

  process.stdout.write("  Discovering skills from GitHub... ");
  const SKILL_NAMES = await discoverSkillNames();
  console.log(`found ${SKILL_NAMES.length}`);

  const skills = [];

  for (const name of SKILL_NAMES) {
    process.stdout.write(`  Fetching ${name}... `);
    const content = await fetchSkill(name);
    const description = extractFrontmatterDescription(content);
    const digest = `sha256:${sha256Hex(content)}`;
    const skillDir = join(OUTPUT_DIR, name);
    mkdirSync(skillDir, { recursive: true });
    writeFileSync(join(skillDir, "SKILL.md"), content);
    skills.push({
      name,
      type: "skill-md",
      description,
      url: `/.well-known/agent-skills/${name}/SKILL.md`,
      digest,
    });
    console.log(`OK (${(content.length / 1024).toFixed(1)} KB)`);
  }

  const index = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills,
  };

  const indexPath = join(OUTPUT_DIR, "index.json");
  writeFileSync(indexPath, JSON.stringify(index, null, 2) + "\n");

  console.log(`\nDone! ${skills.length} skills indexed.`);
  console.log(`  Index: ${indexPath}`);
  console.log(`  Size:  ${(JSON.stringify(index).length / 1024).toFixed(1)} KB\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
