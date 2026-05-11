import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

function unquoteEnvValue(value) {
  const trimmed = value.trim();
  if (trimmed.length < 2) return trimmed;

  const quote = trimmed[0];
  if ((quote !== '"' && quote !== "'") || trimmed.at(-1) !== quote) {
    return trimmed;
  }

  const inner = trimmed.slice(1, -1);
  if (quote === "'") return inner;

  return inner.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t");
}

function loadEnvLocal(filePath = ".env.local") {
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;

    process.env[key] = unquoteEnvValue(rawValue);
  }
}

function usageAndExit(code = 1) {
  console.log(
    `
Trigger the GitLab pipeline that runs the "create_tag" job (CI_PIPELINE_SOURCE=trigger).

Usage:
  node scripts/release/trigger-create-tag-pipeline.mjs \\
    --project-id <number> \\
    --token <pipeline_trigger_token> \\
    [--branch <branch>] \\
    --env dev|prod

  If --branch is omitted and TRIGGER_PIPELINE_BRANCH is unset, the current Git branch
  (git rev-parse --abbrev-ref HEAD) is used.

Token:
  You must use a GitLab Pipeline Trigger Token; do not use CI_JOB_TOKEN, or the create_tag rules will not match a trigger pipeline.

Env vars:
  TRIGGER_PIPELINE_PROJECT_ID
  TRIGGER_PIPELINE_TOKEN
  TRIGGER_PIPELINE_BRANCH (optional if running inside a git worktree)
  TRIGGER_PIPELINE_TAG_ENV

  .env.local is loaded automatically when present. Existing shell environment
  variables take precedence over .env.local values.

Examples:
  node scripts/release/trigger-create-tag-pipeline.mjs --project-id 123 --token xxx --branch main --env dev
  node scripts/release/trigger-create-tag-pipeline.mjs --project-id 123 --token xxx --branch feature/foo --env dev
  node scripts/release/trigger-create-tag-pipeline.mjs --project-id 123 --token xxx --env dev
`.trim()
  );
  process.exit(code);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const k = a.slice(2);
    const v = argv[i + 1];
    if (!v || v.startsWith("--")) out[k] = true;
    else {
      out[k] = v;
      i++;
    }
  }
  return out;
}

function getCurrentGitBranch() {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    throw new Error(
      "Could not read current branch (not a git repo or git failed). Pass --branch or set TRIGGER_PIPELINE_BRANCH."
    );
  }
}

function getOriginUrl() {
  return execSync("git remote get-url origin", { encoding: "utf8" }).trim();
}

function inferHostFromOrigin(originUrl) {
  if (originUrl.startsWith("http://") || originUrl.startsWith("https://")) {
    const u = new URL(originUrl);
    return `${u.protocol}//${u.host}`;
  }
  // git@gitlab.com:group/proj.git
  // ssh://git@gitlab.com/group/proj.git
  const m = originUrl.match(/^(?:git@([^:]+):|ssh:\/\/git@([^/]+)\/)/);
  if (m) return `https://${m[1] || m[2]}`;
  throw new Error(`Cannot infer host from origin: ${originUrl}`);
}

function resolveGitLabHost() {
  const ciServerUrl = String(process.env.CI_SERVER_URL || "").trim();
  if (ciServerUrl) return ciServerUrl.replace(/\/$/, "");

  return inferHostFromOrigin(getOriginUrl()).replace(/\/$/, "");
}

async function gitlabJson(url, { method = "GET", headers = {}, body } = {}) {
  const res = await fetch(url, { method, headers, body });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  if (!res.ok) {
    const msg = json?.message
      ? JSON.stringify(json.message)
      : text || res.statusText;
    throw new Error(`GitLab API error ${res.status} ${res.statusText}: ${msg}`);
  }
  return json;
}

async function main() {
  loadEnvLocal();

  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) usageAndExit(0);

  const projectId = String(
    args["project-id"] || process.env.TRIGGER_PIPELINE_PROJECT_ID || ""
  ).trim();
  const triggerToken = String(
    args.token || process.env.TRIGGER_PIPELINE_TOKEN || ""
  ).trim();
  let branch = String(
    args.branch || process.env.TRIGGER_PIPELINE_BRANCH || ""
  ).trim();
  if (!branch) {
    branch = getCurrentGitBranch();
    console.log(
      `No --branch / TRIGGER_PIPELINE_BRANCH; using current branch: ${branch}`
    );
  }
  const env = String(args.env || process.env.TRIGGER_PIPELINE_TAG_ENV || "").trim();
  const host = resolveGitLabHost();

  if (!projectId || !triggerToken || !branch || !env) usageAndExit(1);
  if (env !== "dev" && env !== "prod")
    throw new Error(`--env must be dev|prod, got: ${env}`);
  if (env === "prod" && branch !== "main") {
    throw new Error(
      "prod can only trigger the main branch (consistent with your .gitlab-ci.yml rules)."
    );
  }

  const url = `${host}/api/v4/projects/${encodeURIComponent(
    projectId
  )}/trigger/pipeline`;
  const form = new FormData();
  form.set("token", triggerToken);
  form.set("ref", branch);
  form.set("variables[TRIGGER_PIPELINE_BRANCH]", branch);
  form.set("variables[TRIGGER_PIPELINE_TAG_ENV]", env);

  const json = await gitlabJson(url, { method: "POST", body: form });
  const pipelineUrl = json?.web_url || "(no web_url returned)";
  const pid = json?.id ?? "(unknown id)";

  console.log(`Triggered pipeline: id=${pid}`);
  console.log(`Pipeline URL: ${pipelineUrl}`);
}

main().catch((e) => {
  console.error(e?.stack || String(e));
  process.exit(1);
});
