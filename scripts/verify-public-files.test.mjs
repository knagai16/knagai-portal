import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { checkContents, checkPath, verifyExport } from "./verify-public-files.mjs";

test("rejects private paths while allowing empty env examples", () => {
  for (const path of [".env", ".env.local", "tmp/docs/private.md", ".aws/credentials", "server.pem", "app.js.map"]) {
    assert.throws(() => checkPath(path));
  }
  assert.doesNotThrow(() => checkPath(".env.example", { exampleAllowed: true }));
  assert.doesNotThrow(() => checkContents(".env.example", Buffer.from("# public ID\nNEXT_PUBLIC_FORMSPREE_ENDPOINT=\n")));
  assert.throws(() => checkContents(".env.example", Buffer.from("TOKEN=filled-in")));
});

test("credential failures never disclose the matching value", () => {
  const key = "AK" + "IA" + "X".repeat(16);
  assert.throws(() => checkContents("app.js", Buffer.from(key)), (error) => {
    assert.equal(error.message, "Possible credential in: app.js");
    assert(!error.message.includes(key));
    return true;
  });
  const privateKey = "-----BEGIN " + "PRIVATE KEY-----";
  assert.throws(() => checkContents("app.txt", Buffer.from(privateKey)));
});

test("export validation fails closed on secret files, symlinks, source maps and missing routes", () => {
  const root = mkdtempSync(join(tmpdir(), "portfolio-public-test-"));
  try {
    for (const route of ["index.html", "contact.html", "portfolio.html"]) writeFileSync(join(root, route), "<!DOCTYPE html><p>Public</p>");
    mkdirSync(join(root, "_next"));
    writeFileSync(join(root, "_next/app.js"), "console.log('public');");
    assert.equal(verifyExport(root), 4);
    for (const file of [".env.local", "app.js.map", "source.ts"]) {
      writeFileSync(join(root, file), "private");
      assert.throws(() => verifyExport(root));
      rmSync(join(root, file));
    }
    symlinkSync(join(root, "index.html"), join(root, "linked.html"));
    assert.throws(() => verifyExport(root), /symlink/);
    rmSync(join(root, "linked.html"));
    rmSync(join(root, "contact.html"));
    assert.throws(() => verifyExport(root));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
