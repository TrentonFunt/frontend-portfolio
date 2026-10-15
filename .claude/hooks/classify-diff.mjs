import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../..");

function loadRepoConfig() {
  const raw = readFileSync(join(repoRoot, ".claude/repo.json"), "utf8");
  return JSON.parse(raw);
}

function git(args) {
  return execSync(`git ${args}`, { cwd: repoRoot, encoding: "utf8" }).trim();
}

/** Minimal glob: `**` and `*` only, for floor path matching. */
function globMatch(path, pattern) {
  const re = new RegExp(
    "^" +
      pattern
        .replace(/\./g, "\\.")
        .replace(/\*\*/g, ".*")
        .replace(/\*/g, "[^/]*") +
      "$"
  );
  return re.test(path);
}

function listChangedFiles(integrationBranch) {
  const out = git(`diff --name-only ${integrationBranch}...HEAD`);
  if (!out) return [];
  return out.split("\n").filter(Boolean);
}

function countChangedLines(integrationBranch) {
  const out = git(`diff --numstat ${integrationBranch}...HEAD`);
  if (!out) return 0;
  let total = 0;
  for (const line of out.split("\n")) {
    const parts = line.split("\t");
    if (parts.length < 2) continue;
    total += Number(parts[0]) + Number(parts[1]);
  }
  return total;
}

function pathHitsFloor(file, floorPaths) {
  return floorPaths.some((pattern) => globMatch(file, pattern));
}

/** @returns {{ tier: 0|1|2, changedLines: number, fileCount: number, floorHit: boolean, fingerprint: string }} */
export function classifyBranchDiff() {
  const cfg = loadRepoConfig();
  const integration = cfg.integrationBranch ?? "main";
  const review = cfg.review ?? {};

  let files = [];
  let changedLines = 0;
  try {
    files = listChangedFiles(integration);
    changedLines = countChangedLines(integration);
  } catch {
    return { tier: 0, changedLines: 0, fileCount: 0, floorHit: false, fingerprint: "no-diff" };
  }

  const floorPaths = review.floorPaths ?? [];
  const floorHit = files.some((f) => pathHitsFloor(f, floorPaths));

  const patch = git(`diff ${integration}...HEAD`) || "";
  const fingerprint = execSync("shasum -a 256", { input: patch, encoding: "utf8" })
    .split(" ")[0]
    .slice(0, 12);

  const tier2Min = review.tier2MinLines ?? 200;
  const tier1MaxLines = review.tier1MaxLines ?? 50;
  const tier1MaxFiles = review.tier1MaxFiles ?? 3;

  const docOnly =
    files.length > 0 &&
    files.every((f) => /\.(md|txt)$/i.test(f) || f.startsWith("docs/"));

  if (docOnly) {
    return { tier: 0, changedLines, fileCount: files.length, floorHit, fingerprint };
  }

  if (floorHit || changedLines > tier2Min) {
    return { tier: 2, changedLines, fileCount: files.length, floorHit, fingerprint };
  }

  if (
    changedLines <= tier1MaxLines &&
    files.length <= tier1MaxFiles &&
    files.length > 0
  ) {
    return { tier: 1, changedLines, fileCount: files.length, floorHit, fingerprint };
  }

  const profile = cfg.profile ?? "light";
  if (profile === "strict") {
    return { tier: 2, changedLines, fileCount: files.length, floorHit, fingerprint };
  }
  return { tier: 1, changedLines, fileCount: files.length, floorHit, fingerprint };
}
