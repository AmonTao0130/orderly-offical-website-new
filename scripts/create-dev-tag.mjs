import { spawnSync } from "node:child_process";

const RELEASE_TAG_PATTERN = /^v(\d+)\.(\d+)\.(\d+)$/;

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

function getLatestReleaseTag(tags) {
  const releaseTags = tags.map(parseReleaseTag).filter(Boolean).sort(compareReleaseTags);
  return releaseTags.at(-1)?.tag;
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

function main() {
  console.log("Fetching latest git tags...");
  runGit(["fetch", "--tags", "--force"], { inherit: true });

  const tags = runGit(["tag", "--list"])
    .split("\n")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const baseTag = getLatestReleaseTag(tags);
  if (!baseTag) {
    throw new Error("No release tag found. Expected at least one tag like v1.0.0.");
  }

  const branchName = runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
  if (!branchName || branchName === "HEAD") {
    throw new Error("Cannot create a dev tag from detached HEAD. Please checkout a branch first.");
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
