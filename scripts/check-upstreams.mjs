#!/usr/bin/env node
// Checks whether the upstream repos maestro distills from have changed since
// the pinned commits in upstreams.json.
//
//   node scripts/check-upstreams.mjs          report drift (exit 1 if any drift/error)
//   node scripts/check-upstreams.mjs --pin    re-pin every watched path to its current commit
//   node scripts/check-upstreams.mjs --json   machine-readable report
//
// Requires Node 18+ (built-in fetch). Set GITHUB_TOKEN to avoid rate limits.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "upstreams.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const pin = process.argv.includes("--pin");
const asJson = process.argv.includes("--json");

const headers = {
  "User-Agent": "maestro-upstream-watch",
  Accept: "application/vnd.github+json",
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function latestCommit(repo, path) {
  const url = `https://api.github.com/repos/${repo}/commits?path=${encodeURIComponent(path)}&per_page=1`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const [c] = await res.json();
  return c ? { sha: c.sha, date: c.commit.committer.date } : null;
}

const report = [];
for (const u of manifest.upstreams) {
  for (const path of u.watch) {
    let latest = null;
    let error = null;
    try {
      latest = await latestCommit(u.repo, path);
    } catch (e) {
      error = e.message;
    }
    const pinned = u.pins?.[path] ?? null;
    report.push({
      upstream: u.name,
      repo: u.repo,
      path,
      pinned: pinned?.sha ?? null,
      latest: latest?.sha ?? null,
      latestDate: latest?.date ?? null,
      drifted: Boolean(!error && latest && pinned && latest.sha !== pinned.sha),
      unpinned: !pinned,
      error,
      feeds: u.feeds,
    });
    if (pin && latest) {
      u.pins = u.pins || {};
      u.pins[path] = latest;
    }
  }
}

if (pin) writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

const drifted = report.filter((r) => r.drifted);
const errors = report.filter((r) => r.error);

if (asJson) {
  console.log(JSON.stringify({ drifted: drifted.length > 0, report }, null, 2));
} else {
  for (const r of report) {
    const label = `${r.upstream} : ${r.path}`.padEnd(40);
    const status = r.error
      ? `ERROR ${r.error}`
      : pin
        ? `pinned ${r.latest?.slice(0, 7) ?? "n/a"} (${r.latestDate?.slice(0, 10) ?? ""})`
        : r.unpinned
          ? "no pin — run with --pin"
          : r.drifted
            ? `DRIFT ${r.pinned.slice(0, 7)} -> ${r.latest.slice(0, 7)} (${r.latestDate?.slice(0, 10)})`
            : "up to date";
    console.log(`${label} ${status}`);
  }
  if (drifted.length) {
    const mods = [...new Set(drifted.flatMap((r) => r.feeds))].sort();
    console.log(`\n${drifted.length} watched path(s) drifted. Affected maestro modules:`);
    for (const m of mods) console.log(`  - skills/maestro/references/${m}`);
    console.log("\nRe-distill with UPDATING.md, then: node scripts/check-upstreams.mjs --pin");
  }
}

process.exitCode = pin ? 0 : drifted.length || errors.length ? 1 : 0;
