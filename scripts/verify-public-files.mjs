import { execFileSync } from "node:child_process";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const publicExtensions = new Set([
  ".html", ".txt", ".js", ".css", ".json", ".svg", ".png", ".jpg", ".jpeg",
  ".webp", ".gif", ".ico", ".avif", ".woff", ".woff2", ".ttf", ".otf", ".xml", ".webmanifest",
]);
const credentialPatterns = [
  /(?:AKIA|ASIA)[A-Z0-9]{16}/,
  /-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /github_pat_[A-Za-z0-9_]{20,}/,
  /xox[baprs]-[A-Za-z0-9-]{20,}/,
  /(?:aws_secret_access_key|aws_session_token)\s*[=:]\s*["']?[A-Za-z0-9/+=]{20,}/i,
];

export function checkPath(path, { exampleAllowed = false } = {}) {
  if (exampleAllowed && path === ".env.example") return;
  const parts = path.split(/[\\/]/);
  if (parts.some((p) => /^(?:\.env(?:\..*)?|\.aws|\.git|\.ssh|\.codex|\.DS_Store|tmp|node_modules)$/i.test(p)) ||
      /(?:^|\/)(?:credentials|id_rsa|id_ed25519)(?:\.|$)/i.test(path) ||
      /\.(?:pem|key|p8|p12|pfx|tfstate|map)$/i.test(path)) {
    throw new Error(`Private or unsupported path: ${path}`);
  }
}

export function checkContents(path, bytes) {
  const text = bytes.toString("utf8");
  if (credentialPatterns.some((pattern) => pattern.test(text))) {
    // Never print the matching secret or a surrounding excerpt.
    throw new Error(`Possible credential in: ${path}`);
  }
  if (path === ".env.example" && text.split(/\r?\n/).some((line) =>
    line.trim() && !line.trim().startsWith("#") && !/^[A-Z_][A-Z0-9_]*=\s*$/.test(line))) {
    throw new Error(".env.example must contain empty placeholders only");
  }
}

export function verifyExport(directory) {
  const root = resolve(directory);
  if (lstatSync(root).isSymbolicLink() || !lstatSync(root).isDirectory()) throw new Error("Invalid export root");
  let count = 0;
  function visit(path) {
    const name = relative(root, path).split("\\").join("/");
    const stat = lstatSync(path);
    checkPath(name);
    if (name.split("/").some((part) => part.startsWith("."))) throw new Error(`Hidden export path: ${name}`);
    if (stat.isSymbolicLink()) throw new Error(`Export symlink: ${name}`);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(path)) visit(join(path, entry));
    } else {
      if (!stat.isFile() || !publicExtensions.has(extname(name).toLowerCase())) throw new Error(`Unsupported export: ${name}`);
      if (stat.size > 20 * 1024 * 1024) throw new Error(`Oversized export: ${name}`);
      checkContents(name, readFileSync(path));
      count++;
    }
  }
  for (const entry of readdirSync(root)) visit(join(root, entry));
  for (const route of ["index.html", "contact.html", "portfolio.html"]) {
    if (!readFileSync(join(root, route), "utf8").match(/<!doctype html>/i)) throw new Error(`Missing exported route: ${route}`);
  }
  return count;
}

export function verifyTrackedFiles() {
  const paths = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" }).split("\0").filter(Boolean);
  for (const path of paths) {
    checkPath(path, { exampleAllowed: true });
    if (lstatSync(path).isSymbolicLink()) throw new Error(`Tracked symlink: ${path}`);
    checkContents(path, readFileSync(path));
  }
  return paths.length;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const tracked = process.argv[2] === "--tracked";
  const count = tracked ? verifyTrackedFiles() : verifyExport(process.argv[2] || "out");
  console.log(`Verified ${count} ${tracked ? "tracked" : "exported"} public files.`);
}
