#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const stage = join(dirname(fileURLToPath(import.meta.url)), "stage.mjs");

const res = spawnSync("node", [stage], { encoding: "utf8" });
if (res.status !== 0 || !/^stage:/m.test(res.stdout)) {
  console.error("FAIL - stage.mjs must exit 0 and print a stage line");
  process.exit(1);
}

const stop = spawnSync("node", [stage, "--stop"], { encoding: "utf8" });
let parsed;
try {
  parsed = JSON.parse(stop.stdout);
} catch {
  console.error("FAIL - stage --stop must print JSON hookSpecificOutput");
  process.exit(1);
}

if (!parsed.hookSpecificOutput?.additionalContext?.startsWith("stage:")) {
  console.error("FAIL - Stop hook missing additionalContext stage line");
  process.exit(1);
}

console.log("ok - stage prompter smoke tests");
process.exit(0);
