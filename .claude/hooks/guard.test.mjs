#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../..");
const guard = join(__dirname, "guard.mjs");

function runGuard(payload) {
  const res = spawnSync("node", [guard], {
    input: JSON.stringify(payload),
    encoding: "utf8",
  });
  return { status: res.status, stderr: res.stderr ?? "" };
}

let pass = 0;
let fail = 0;

function assertBlocked(desc, payload) {
  const { status, stderr } = runGuard(payload);
  if (status === 2) {
    console.log(`ok - ${desc}`);
    pass++;
  } else {
    console.log(`FAIL - ${desc} (expected exit 2, got ${status}, stderr: ${stderr.trim()})`);
    fail++;
  }
}

function assertAllowed(desc, payload) {
  const { status } = runGuard(payload);
  if (status === 0) {
    console.log(`ok - ${desc}`);
    pass++;
  } else {
    console.log(`FAIL - ${desc} (expected exit 0, got ${status})`);
    fail++;
  }
}

assertBlocked("blocks pnpm install", {
  tool_name: "Bash",
  tool_input: { command: "pnpm install" },
});

assertAllowed("allows npm install", {
  tool_name: "Bash",
  tool_input: { command: "npm install" },
});

assertBlocked("blocks explicit push to main", {
  tool_name: "Bash",
  tool_input: { command: "git push origin main" },
});

assertBlocked("blocks commit && push chain", {
  tool_name: "Bash",
  tool_input: { command: "git commit -m x && git push" },
});

assertBlocked("blocks .env write", {
  tool_name: "Write",
  tool_input: { file_path: join(repoRoot, ".env.local"), content: "x=1" },
});

assertAllowed("allows normal source write", {
  tool_name: "Write",
  tool_input: {
    file_path: join(repoRoot, "src/lib/example.ts"),
    content: "export const ok = true;\n",
  },
});

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
