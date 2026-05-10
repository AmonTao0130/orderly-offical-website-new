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

function getMaxReleaseTag(tags) {
  const releaseTags = tags.map(parseReleaseTag).filter(Boolean).sort(compareReleaseTags);
  return releaseTags.at(-1);
}

function getNextPatchTag(releaseTag) {
  return `v${releaseTag.major}.${releaseTag.minor}.${releaseTag.patch + 1}`;
}

function main() {
  console.log("Fetching latest git tags...");
  runGit(["fetch", "--tags", "--force"], { inherit: true });

  const branchName = runGit(["rev-parse", "--abbrev-ref", "HEAD"]);
  if (!branchName || branchName === "HEAD") {
    throw new Error("Cannot create a prod tag from detached HEAD. Please checkout main first.");
  }
  if (branchName !== "main") {
    throw new Error(`Cannot create a prod tag from branch "${branchName}". Please checkout main first.`);
  }

  const tags = runGit(["tag", "--list"])
    .split("\n")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const baseTag = getMaxReleaseTag(tags);
  if (!baseTag) {
    throw new Error("No release tag found. Expected at least one tag like v1.0.0.");
  }

  const nextTag = getNextPatchTag(baseTag);

  console.log(`Base tag: ${baseTag.tag}`);
  console.log(`Current branch: ${branchName}`);
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
