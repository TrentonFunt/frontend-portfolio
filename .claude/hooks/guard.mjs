#!/usr/bin/env node
/**
 * PreToolUse guard — npm-only, no push to protected branch, no secrets/env artefacts.
 * Adapt stack rules here; principles are fixed in CLAUDE.md (Part A).
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../..");

function loadConfig() {
  return JSON.parse(readFileSync(join(repoRoot, ".claude/repo.json"), "utf8"));
}

function currentBranch() {
  try {
    return execSync("git symbolic-ref --short HEAD", {
      cwd: repoRoot,
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
}

function block(msg) {
  process.stderr.write(msg.endsWith("\n") ? msg : `${msg}\n`);
  process.exit(2);
}

function stripHeredocProse(cmd) {
  return cmd.replace(/<<-?['"]?\w+['"]?[\s\S]*?^\w+$/gm, " ");
}

function checkBashCommand(cmd) {
  const protectedBranch = loadConfig().protectedBranch ?? "main";
  const normalized = stripHeredocProse(cmd);

  if (/\b(pnpm|yarn|bun)\s+(install|add|remove|run)\b/.test(normalized)) {
    block("Use npm only in this repo (package-lock.json is canonical).\n");
  }

  const pushes =
    /\bgit\s+(-C\s+\S+\s+)?push\b/.test(normalized) &&
    (new RegExp(`[\\s:/]${protectedBranch}\\b`).test(normalized) ||
      (/\bgit\s+(-C\s+\S+\s+)?push\b/.test(normalized) &&
        !/\s+\S+:/.test(normalized) &&
        currentBranch() === protectedBranch));

  if (pushes) {
    block(
      `Push to ${protectedBranch} is forbidden — use a feature branch and open a PR.\n`
    );
  }

  if (/\bgit\s+commit\b/.test(normalized) && /\s&&\s.*\bgit\s+push\b/.test(normalized)) {
    block(
      "Do not chain commit and push in one command — keep them separate (A3).\n"
    );
  }
}

const SECRET_RE =
  /(sk_live_|sk_test_[a-zA-Z0-9]{20,}|AKIA[0-9A-Z]{16}|ghp_[a-zA-Z0-9]{36,}|xox[baprs]-)/;

function checkWritePath(filePath, content) {
  const rel = filePath.replace(repoRoot, "").replace(/^\//, "");
  if (/^\.env/.test(rel) || rel.endsWith(".pem") || rel.endsWith(".key")) {
    block(`Refusing to write secret/config material: ${rel}\n`);
  }
  if (/^(dist\/|node_modules\/)/.test(rel)) {
    block(`Do not commit build output: ${rel}\n`);
  }
  if (content && SECRET_RE.test(content) && /\.(tsx?|jsx?|json|env)/.test(rel)) {
    block(`Possible secret material in ${rel} — remove before saving.\n`);
  }
}

function main() {
  let input = "";
  try {
    input = readFileSync(0, "utf8");
  } catch {
    process.exit(0);
  }
  if (!input.trim()) process.exit(0);

  let payload;
  try {
    payload = JSON.parse(input);
  } catch {
    process.exit(0);
  }

  const tool = payload.tool_name ?? payload.toolName;
  const toolInput = payload.tool_input ?? payload.toolInput ?? {};

  if (tool === "Bash") {
    checkBashCommand(toolInput.command ?? "");
  }
  if (tool === "Edit" || tool === "Write") {
    const path = toolInput.file_path ?? toolInput.path ?? "";
    const content = toolInput.new_string ?? toolInput.content ?? "";
    if (path) checkWritePath(path, content);
  }
}

main();
