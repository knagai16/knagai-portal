import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { test } from "node:test";

function fixture(failUpload = false) {
  const root = mkdtempSync(join(tmpdir(), "portfolio-deploy-test-"));
  const bin = join(root, "bin");
  mkdirSync(bin);
  mkdirSync(join(root, "out/_next/static"), { recursive: true });
  for (const route of ["index", "contact", "portfolio"]) writeFileSync(join(root, `out/${route}.html`), "<!DOCTYPE html>");
  const log = join(root, "calls.jsonl");
  for (const tool of ["aws", "curl"]) {
    writeFileSync(join(bin, tool), `#!${process.execPath}
const fs = require('node:fs');
const args = process.argv.slice(2);
fs.appendFileSync(process.env.CALL_LOG, JSON.stringify({ tool: '${tool}', args }) + '\\n');
if ('${tool}' === 'aws' && args[0] === 's3' && process.env.FAIL_UPLOAD === 'true') process.exit(1);
if (args.includes('create-invalidation')) process.stdout.write('TESTINVALIDATION');
if (args.includes('https://knagai.com/deployment.json')) process.stdout.write(JSON.stringify({commit: process.env.GITHUB_SHA}));
`, { mode: 0o700 });
  }
  const env = { ...process.env, PATH: `${bin}:${process.env.PATH}`, CALL_LOG: log, FAIL_UPLOAD: String(failUpload),
    S3_BUCKET: "example-bucket", CLOUDFRONT_DISTRIBUTION_ID: "EXAMPLE", GITHUB_SHA: "a".repeat(40) };
  return { root, env, calls: () => readFileSync(log, "utf8").trim().split("\n").map((line) => JSON.parse(line)) };
}

test("publishes assets before pages and waits for invalidation before checking routes", () => {
  const f = fixture();
  try {
    execFileSync("bash", [resolve("scripts/deploy-static-site.sh")], { cwd: f.root, env: f.env });
    const calls = f.calls();
    assert(calls[0].args.includes("out/_next/static/"));
    assert(!calls[0].args.includes("--delete"));
    assert(calls[1].args.includes("--delete"));
    assert(calls[1].args.includes("_next/static/*"));
    assert(calls.slice(0, 2).every((c) => c.args.includes("--no-follow-symlinks")));
    assert.equal(calls[2].args[1], "create-invalidation");
    assert.equal(calls[3].args[1], "wait");
    assert.equal(calls.filter((c) => c.tool === "curl").length, 6);
  } finally { rmSync(f.root, { recursive: true, force: true }); }
});

test("an asset upload failure stops before replacing pages or invalidating caches", () => {
  const f = fixture(true);
  try {
    assert.throws(() => execFileSync("bash", [resolve("scripts/deploy-static-site.sh")], { cwd: f.root, env: f.env }));
    assert.equal(f.calls().length, 1);
  } finally { rmSync(f.root, { recursive: true, force: true }); }
});
