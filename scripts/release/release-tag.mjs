import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const CONFIG_PATH = ".claude/skills/orderly-release-tag/config.json";

function usageAndExit(code = 1) {
  console.log(
    `
Create a release tag using either the local tag scripts or the GitLab trigger pipeline.

Usage:
  node scripts/release/release-tag.mjs --env dev|prod [--dry-run]

Mode:
  ORDERLY_RELEASE_TAG_MODE=auto|trigger|local
  auto is the default. In auto mode, trigger is used when a project id and
  TRIGGER_PIPELINE_TOKEN are available; otherwise local npm tag scripts are used.

Env vars:
  ORDERLY_RELEASE_TAG_MODE
  TRIGGER_PIPELINE_PROJECT_ID (optional override for ${CONFIG_PATH})
  TRIGGER_PIPELINE_TOKEN
  TRIGGER_PIPELINE_BRANCH (optional for dev trigger pipelines)

  .env.local is loaded automatically when present. Existing shell environment
  variables take precedence over .env.local values.
`.trim()
  );
  process.exit(code);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;

    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      out[key] = true;
      continue;
    }

    out[key] = value;
    i++;
  }
  return out;
}

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

function readConfiguredProjectId() {
  if (!existsSync(CONFIG_PATH)) return "";

  const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
  return String(config.triggerPipelineProjectId || "").trim();
}

function run(command, args, { dryRun }) {
  const printable = [command, ...args].join(" ");
  if (dryRun) {
    console.log(`[dry-run] ${printable}`);
    return;
  }

  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function resolveMode({ projectId, triggerToken }) {
  const mode = String(process.env.ORDERLY_RELEASE_TAG_MODE || "auto").trim();

  if (mode !== "auto" && mode !== "trigger" && mode !== "local") {
    throw new Error(
      `ORDERLY_RELEASE_TAG_MODE must be auto, trigger, or local; got: ${mode}`
    );
  }

  if (mode === "local") return "local";

  if (mode === "trigger") {
    const missing = [];
    if (!projectId) missing.push("trigger project id");
    if (!triggerToken) missing.push("TRIGGER_PIPELINE_TOKEN");
    if (missing.length) {
      throw new Error(
        `ORDERLY_RELEASE_TAG_MODE=trigger requires ${missing.join(" and ")}.`
      );
    }
    return "trigger";
  }

  return projectId && triggerToken ? "trigger" : "local";
}

function main() {
  loadEnvLocal();

  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) usageAndExit(0);

  const env = String(args.env || "").trim();
  if (env !== "dev" && env !== "prod") usageAndExit(1);

  const projectId = String(
    process.env.TRIGGER_PIPELINE_PROJECT_ID || readConfiguredProjectId()
  ).trim();
  const triggerToken = String(process.env.TRIGGER_PIPELINE_TOKEN || "").trim();
  const mode = resolveMode({ projectId, triggerToken });

  console.log(`Release tag mode: ${mode}`);

  if (mode === "local") {
    run(process.execPath, ["scripts/release/create-git-tag.mjs", "--env", env], {
      dryRun: Boolean(args["dry-run"]),
    });
    return;
  }

  const triggerArgs = [
    "scripts/release/trigger-create-tag-pipeline.mjs",
    "--project-id",
    projectId,
    "--env",
    env,
  ];

  if (env === "prod") {
    triggerArgs.push("--branch", "main");
  }

  run(process.execPath, triggerArgs, { dryRun: Boolean(args["dry-run"]) });
}

try {
  main();
} catch (error) {
  console.error(error?.stack || String(error));
  process.exit(1);
}
