import { spawnSync } from "node:child_process";

const RELEASE_TAG_PATTERN = /^v(\d+)\.(\d+)\.(\d+)$/;

function usageAndExit(code = 1) {
  console.log(
    `
Create and push a release Git tag from the local machine.

Usage:
  node scripts/release/create-git-tag.mjs --env dev|prod
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

function runGit(args, options = {}) {
  const result = spawnSync("git", args, {
    encoding: "utf8",
    stdio: options.inherit ? "inherit" : "pipe",
  });

  if (result.status !== 0) {
    const command = `git ${args.join(" ")}`;
    const stderr = result.stderr?.trim();
    const stdout = result.stdout?.trim();
    const output = [stderr, stdout].filter(Boolean).join("\n");
    throw new Error(output ? `${command}\n${output}` : `${command} failed`);
  }

  return result.stdout?.trim() ?? "";
}

function parseReleaseTag(tag) {
  const match = tag.match(RELEASE_TAG_PATTERN);
  if (!match) return null;

  return {
    tag,
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function compareReleaseTags(a, b) {
  return a.major - b.major || a.minor - b.minor || a.patch - b.patch;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getBranchTail(branchName) {
  const parts = branchName.split("/").filter(Boolean);
  return parts.at(-1) ?? branchName;
}

function sanitizeTagPart(value) {
  return value
    .trim()
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[.-]+|[.-]+$/g, "");
}

function getReleaseTags(tags) {
  return tags.map(parseReleaseTag).filter(Boolean).sort(compareReleaseTags);
}

function getLatestReleaseTag(tags) {
  return getReleaseTags(tags).at(-1);
}

function getNextDevTag(tags, prefix) {
  const pattern = new RegExp(`^${escapeRegExp(prefix)}(\\d+)$`);
  const latestNumber = tags.reduce((max, tag) => {
    const match = tag.match(pattern);
    if (!match) return max;
    return Math.max(max, Number(match[1]));
  }, -1);

  return `${prefix}${latestNumber + 1}`;
}

function getNextPatchTag(releaseTag) {
  return `v${releaseTag.major}.${releaseTag.minor}.${releaseTag.patch + 1}`;
}

function readTags() {
  return runGit(["tag", "--list"])
    .split("\n")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function createDevTag({ branchName, tags }) {
  if (!branchName || branchName === "HEAD") {
    throw new Error("Cannot create a dev tag from detached HEAD. Please checkout a branch first.");
  }

  const baseTag = getLatestReleaseTag(tags)?.tag;
  if (!baseTag) {
    throw new Error("No release tag found. Expected at least one tag like v1.0.0.");
  }

  const branchTagPart = branchName === "main" ? "" : sanitizeTagPart(getBranchTail(branchName));
  if (branchName !== "main" && !branchTagPart) {
    throw new Error(`Cannot derive a valid tag branch name from branch "${branchName}".`);
  }

  const prefix = branchName === "main" ? `${baseTag}-dev-` : `${baseTag}-${branchTagPart}-dev-`;
  const nextTag = getNextDevTag(tags, prefix);

  console.log(`Base tag: ${baseTag}`);
  console.log(`Current branch: ${branchName}`);
  if (branchName !== "main") {
    console.log(`Tag branch name: ${branchTagPart}`);
  }

  return nextTag;
}

function createProdTag({ branchName, tags }) {
  if (!branchName || branchName === "HEAD") {
    throw new Error("Cannot create a prod tag from detached HEAD. Please checkout main first.");
  }
  if (branchName !== "main") {
    throw new Error(`Cannot create a prod tag from branch "${branchName}". Please checkout main first.`);
  }

  const baseTag = getLatestReleaseTag(tags);
  if (!baseTag) {
    throw new Error("No release tag found. Expected at least one tag like v1.0.0.");
  }

  console.log(`Base tag: ${baseTag.tag}`);
  console.log(`Current branch: ${branchName}`);

  return getNextPatchTag(baseTag);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || args.h) usageAndExit(0);

  const env = String(args.env || "").trim();
  if (env !== "dev" && env !== "prod") usageAndExit(1);

  console.log("Fetching latest git tags...");
  runGit(["fetch", "--tags", "--force"], { inherit: true });

  const branchName = runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
  const tags = readTags();
  const nextTag =
    env === "dev"
      ? createDevTag({ branchName, tags })
      : createProdTag({ branchName, tags });

  console.log(`Creating tag: ${nextTag}`);
  runGit(["tag", nextTag], { inherit: true });

  console.log(`Pushing tag to origin: ${nextTag}`);
  runGit(["push", "origin", nextTag], { inherit: true });

  console.log(`Done: ${nextTag}`);
}

try {
  main();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
