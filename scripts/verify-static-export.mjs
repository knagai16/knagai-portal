import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const routes = [
  { href: "/", file: "index.html" },
  { href: "/contact", file: "contact.html" },
  { href: "/portfolio", file: "portfolio.html" },
];

for (const route of routes) {
  const outputPath = join("out", route.file);
  assert.ok(existsSync(outputPath), `${outputPath} was not generated`);

  const html = readFileSync(outputPath, "utf8");
  assert.match(html, /<!DOCTYPE html>/i, `${outputPath} is not HTML`);
}

const homePage = readFileSync(join("out", "index.html"), "utf8");
for (const route of routes.slice(1)) {
  assert.ok(
    homePage.includes(`href="${route.href}"`),
    `out/index.html does not link to ${route.href}`,
  );
}

console.log("Static export routes verified: /, /contact, /portfolio");
