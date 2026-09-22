#!/usr/bin/env node
// Higgsfield REST API helper. Zero dependencies, Node >= 18. See ../SKILL.md.
// Credentials come from the project .env (or the shell) and are never printed.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const BASE = (process.env.HF_API_BASE || "https://api.higgsfield.ai").replace(/\/+$/, "");
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../.."); // skills/higgsfield-motion-graphics/scripts -> project root
const DEFAULT_OUT = path.join(ROOT, "motion-studio", "public", "higgsfield");
const TERMINAL = new Set(["completed", "failed", "nsfw", "canceled"]);
const DEFAULT_MAX_USD = 1;

// List prices in USD, from open.higgsfield.ai/explore (checked 2026-09-21).
// Launch discounts change; the Higgsfield console is the source of truth.
// unit "s" = per second of video, "img" = per image. `max` = worst case for endpoints whose price varies.
const PRICES = {
  "bytedance/seedance-2.5/text-to-video": { unit: "s", usd: 0.144, max: 0.3236, kind: "video" },
  "bytedance/seedance-2.0/text-to-video": { unit: "s", usd: 0.0985, kind: "video" },
  "kling-video/v3.0/std/text-to-video": { unit: "s", usd: 0.042, kind: "video" },
  "minimax/h3/text-to-video": { unit: "s", usd: 0.0715, kind: "video" },
  "alibaba/wan-3.0-prime/text-to-video": { unit: "s", usd: 0.0476, kind: "video" },
  "alibaba/wan-3.0/text-to-video": { unit: "s", usd: 0.03, kind: "video" },
  "wan/v2.7/text-to-video": { unit: "s", usd: 0.1, kind: "video" },
  "alibaba/happy-horse/v1.1/text-to-video": { unit: "s", usd: 0.077, kind: "video" },
  "alibaba/happy-horse/text-to-video": { unit: "s", usd: 0.077, kind: "video" },
  "lightricks/ltx-2.5/text-to-video/fast": { unit: "s", usd: 0.09, kind: "video" },
  "lightricks/ltx-2.5/text-to-video/pro": { unit: "s", usd: 0.12, kind: "video" },
  "xai/grok-imagine-video/v1.5/reference-to-video": { unit: "s", usd: 0.08, kind: "video" },
  "higgsfield/cinema-studio/4.0": { unit: "s", usd: 0.2057, kind: "video" },
  "higgsfield-ai/soul/v2/standard": { unit: "img", usd: 0.0032, kind: "image" },
  "higgsfield-ai/soul/standard": { unit: "img", usd: 0.0938, kind: "image" },
  "z-image/turbo": { unit: "img", usd: 0.015, kind: "image" },
  "ideogram/v4.0": { unit: "img", usd: 0.03, kind: "image" },
  "recraft/v4.1/text-to-image": { unit: "img", usd: 0.035, kind: "image" },
  "alibaba/qwen-image-3/text-to-image": { unit: "img", usd: 0.04, kind: "image" },
  "xai/grok-imagine-image-2.0": { unit: "img", usd: 0.04, kind: "image" },
  "marketing-studio/image": { unit: "img", usd: 0.0121, kind: "image" },
  "workflows/product-shots": { unit: "img", usd: 0.0121, kind: "image" },
  "workflows/graphic-ads": { unit: "img", usd: 0.0121, kind: "image" },
  "workflows/marketplace-design": { unit: "img", usd: 0.0121, kind: "image" },
};

const UPLOAD_MIME = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".gif": "image/gif", ".wav": "audio/wav", ".mp4": "video/mp4",
};
const OUT_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".mp4", ".mov", ".webm", ".wav", ".mp3"]);
const BOOL_FLAGS = new Set(["dry-run", "no-download", "json", "help", "download"]);

// ---------- small utils ----------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.error(...a);
let SECRETS = [];

function redact(s) {
  let out = String(s);
  for (const secret of SECRETS) if (secret && secret.length > 3) out = out.split(secret).join("***");
  return out;
}
function fail(msg, code = 1) {
  console.error("error: " + redact(msg));
  process.exit(code);
}

// ---------- credentials ----------
function loadEnvFile() {
  const candidates = [process.env.HF_ENV_FILE, path.join(ROOT, ".env"), path.join(process.cwd(), ".env")].filter(Boolean);
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const env = {};
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!m) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      else v = v.replace(/\s+#.*$/, "");
      env[m[1]] = v;
    }
    return { file, env };
  }
  return { file: null, env: {} };
}

let CREDS;
function credentials() {
  if (CREDS) return CREDS;
  const { file, env } = loadEnvFile();
  const get = (k) => process.env[k] || env[k] || "";
  let id = get("HF_API_KEY_ID");
  let secret = get("HF_API_KEY_SECRET");
  if (!id || !secret) {
    const withColon = (k) => (get(k).includes(":") ? get(k) : "");
    const combo =
      get("HF_CREDENTIALS") || get("HF_KEY") || withColon("HIGGSFIELD_API_KEY") || withColon("HF_API_KEY");
    const i = combo.indexOf(":");
    if (i > 0) [id, secret] = [combo.slice(0, i), combo.slice(i + 1)];
  }
  if (!id || !secret) {
    id = get("HF_API_KEY");
    secret = get("HF_API_SECRET");
  }
  if (!id || !secret) {
    fail(
      `No Higgsfield API credentials found (looked in ${file ?? path.join(ROOT, ".env") + " (missing)"} and the shell environment).\n` +
        "Add ONE of these to the project .env, save the file, and retry:\n" +
        "  HF_API_KEY_ID=...  and  HF_API_KEY_SECRET=...      (official names)\n" +
        "  HF_CREDENTIALS=<key id>:<key secret>               (also accepted: HF_KEY, HIGGSFIELD_API_KEY)\n" +
        "  HF_API_KEY=...  and  HF_API_SECRET=...             (legacy SDK names)"
    );
  }
  SECRETS = [id, secret];
  CREDS = `${id}:${secret}`;
  return CREDS;
}

// ---------- HTTP ----------
function explain(r) {
  const d = r.data?.detail ?? r.data;
  const detail = typeof d === "string" ? d : JSON.stringify(d);
  const hints = {
    400: "Bad parameters, or the concurrency limit was hit. Fix the parameters or wait for running jobs.",
    401: "Invalid credentials. Check the key ID and secret in .env (never paste them into chat).",
    403: "Insufficient API credits. Top up the API balance in the Higgsfield console, then retry.",
    404: "Endpoint or request not found. Check the path against references/api.md.",
    422: "Validation failed. Check parameter names and values for this endpoint (see its docs page or playground).",
    423: "This model is temporarily blocked. Try later or pick another model.",
    503: "This model is disabled or unavailable. Pick another model.",
  };
  return `HTTP ${r.status}: ${detail}${hints[r.status] ? `\n-> ${hints[r.status]}` : ""}${r.correlationId ? `\n(X-Correlation-ID: ${r.correlationId})` : ""}`;
}

async function hf(method, urlPath, body, { retry = method === "GET" } = {}) {
  const url = urlPath.startsWith("http") ? urlPath : BASE + urlPath;
  if (new URL(url).origin !== new URL(BASE).origin) fail(`Refusing to send credentials to ${new URL(url).origin}`);
  const attempts = retry ? 5 : 1; // never retry POST: there is no idempotency key
  for (let i = 0; i < attempts; i++) {
    let res;
    try {
      res = await fetch(url, {
        method,
        headers: { Authorization: `Key ${credentials()}`, "Content-Type": "application/json", Accept: "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch (e) {
      if (i < attempts - 1) { await sleep(backoff(i)); continue; }
      fail(`Network error calling ${method} ${url}: ${e.message}`);
    }
    if (res.status >= 500 && i < attempts - 1) { await sleep(backoff(i)); continue; }
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text.slice(0, 500) }; }
    return { status: res.status, ok: res.ok, data, correlationId: res.headers.get("x-correlation-id") };
  }
}
const backoff = (i) => Math.min(1000 * 2 ** i, 15000) * (0.75 + Math.random() * 0.5);

// ---------- args ----------
function parseArgs(argv) {
  const pos = [];
  const flags = { param: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) { pos.push(a); continue; }
    const eq = a.indexOf("=");
    const key = a.slice(2, eq === -1 ? undefined : eq);
    let val = eq === -1 ? undefined : a.slice(eq + 1);
    if (BOOL_FLAGS.has(key)) { flags[key] = true; continue; }
    if (val === undefined) val = argv[++i];
    if (val === undefined) fail(`--${key} needs a value`);
    if (key === "param") flags.param.push(val);
    else flags[key] = val;
  }
  return { pos, flags };
}

function coerce(v) {
  if (v === "true") return true;
  if (v === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  if (/^[[{]/.test(v)) { try { return JSON.parse(v); } catch { /* keep as string */ } }
  return v;
}

function buildBody(flags) {
  let body = {};
  if (flags.json) {
    const raw = flags.json.startsWith("@") ? fs.readFileSync(flags.json.slice(1), "utf8") : flags.json;
    try { body = JSON.parse(raw); } catch (e) { fail(`--json is not valid JSON: ${e.message}`); }
  }
  for (const p of flags.param) {
    const i = p.indexOf("=");
    if (i < 1) fail(`--param expects key=value, got "${p}"`);
    body[p.slice(0, i)] = coerce(p.slice(i + 1));
  }
  if (flags.prompt !== undefined) body.prompt = flags.prompt;
  return body;
}

// ---------- cost ----------
function estimate(endpoint, body) {
  const p = PRICES[endpoint];
  if (!p) return null;
  if (p.unit === "s") {
    const d = Number(body.duration) || 5;
    const note = body.duration ? `${d}s` : "duration not set, assumed 5s";
    return { usd: d * p.usd, max: d * (p.max ?? p.usd), note };
  }
  const n = Number(body.batch_size ?? body.num_images) || 1;
  return { usd: n * p.usd, max: n * p.usd, note: `${n} image(s)` };
}
const fmt = (n) => "$" + n.toFixed(n < 0.1 ? 4 : 2);

// ---------- uploads ----------
const looksLocal = (s) => typeof s === "string" && /^(\.{1,2}\/|\/|~\/)/.test(s) && !/^https?:/.test(s);
const expand = (s) => (s.startsWith("~/") ? path.join(os.homedir(), s.slice(2)) : path.resolve(s));

async function uploadFile(file) {
  const ct = UPLOAD_MIME[path.extname(file).toLowerCase()];
  if (!ct) fail(`Unsupported upload type for ${file}. Supported: ${Object.keys(UPLOAD_MIME).join(" ")}`);
  const r = await hf("POST", "/files/generate-upload-url", { content_type: ct }, { retry: false });
  if (!r.ok) fail(explain(r));
  const { upload_url, public_url, upload_headers } = r.data;
  let headers = upload_headers || { "Content-Type": ct };
  if (Array.isArray(headers)) headers = Object.fromEntries(headers.map((h) => [h.name ?? h.key, h.value]));
  // Plain fetch on purpose: the docs say never to send API credentials to the presigned storage URL.
  const put = await fetch(upload_url, { method: "PUT", headers, body: fs.readFileSync(file) });
  if (!put.ok) fail(`Upload of ${file} failed: HTTP ${put.status}`);
  return public_url;
}

async function resolveLocalFiles(body, { dry }) {
  const swap = async (v) => {
    if (!looksLocal(v)) return v;
    const file = expand(v);
    if (!fs.existsSync(file)) fail(`Local file not found: ${v}`);
    if (dry) { log(`(dry run) would upload ${file}`); return v; }
    log(`uploading ${path.basename(file)} ...`);
    return uploadFile(file);
  };
  for (const [k, v] of Object.entries(body)) {
    if (Array.isArray(v)) body[k] = await Promise.all(v.map(swap));
    else body[k] = await swap(v);
  }
}

// ---------- polling & results ----------
async function waitFor(statusUrl, requestId, timeoutSec) {
  const t0 = Date.now();
  const onSigint = () => { log(`\ninterrupted. Request ${requestId} keeps running; resume with: node hf-api.mjs status ${requestId} --download`); process.exit(130); };
  process.once("SIGINT", onSigint);
  let last = "";
  let delay = 2000;
  for (;;) {
    const r = await hf("GET", statusUrl);
    if (!r.ok) fail(explain(r));
    const s = r.data.status;
    if (s !== last) { log(`[${Math.round((Date.now() - t0) / 1000)}s] ${s}`); last = s; }
    if (TERMINAL.has(s)) { process.removeListener("SIGINT", onSigint); return r.data; }
    if (Date.now() - t0 > timeoutSec * 1000) fail(`Timed out after ${timeoutSec}s; request ${requestId} is still "${s}". Resume with: node hf-api.mjs status ${requestId} --download`);
    await sleep(delay);
    delay = Math.min(delay * 1.4, 10000);
  }
}

function outputs(d) {
  const seen = new Set();
  const list = [];
  const add = (kind, url) => { if (url && !seen.has(url)) { seen.add(url); list.push({ kind, url }); } };
  for (const i of d.images || []) add("image", i?.url);
  add("video", d.video?.url);
  add("audio", d.audio?.url);
  for (const a of d.audios || []) add("audio", a?.url);
  return list;
}

const slug = (s) => s.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();

async function download(url, dest) {
  const res = await fetch(url); // no credentials on purpose
  if (!res.ok || !res.body) fail(`Download failed: HTTP ${res.status} for ${new URL(url).origin}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(dest));
}

async function finish(final, ctx) {
  const id = final.request_id || ctx.requestId;
  if (final.status !== "completed") {
    const charged = final.status === "failed" || final.status === "nsfw" ? " Not charged." : final.status === "canceled" ? " Refunded if it was queued." : "";
    fail(`Request ${id} ended as "${final.status}"${final.error ? `: ${final.error}` : ""}.${charged}`);
  }
  const outs = outputs(final);
  if (!outs.length) fail(`Request ${id} completed but returned no output URLs: ${JSON.stringify(final).slice(0, 400)}`);
  const result = { request_id: id, status: "completed", endpoint: ctx.endpoint ?? null, est_usd: ctx.est?.usd ?? null, urls: outs.map((o) => o.url), files: [] };

  if (!ctx.flags["no-download"]) {
    const outDir = ctx.flags.out ? path.resolve(ctx.flags.out) : DEFAULT_OUT;
    const base = ctx.flags.name ? slug(ctx.flags.name) : `${slug(ctx.endpoint ?? "asset")}-${id.slice(0, 8)}`;
    for (const [i, o] of outs.entries()) {
      let ext = path.extname(new URL(o.url).pathname).toLowerCase();
      if (!OUT_EXT.has(ext)) ext = { image: ".png", video: ".mp4", audio: ".wav" }[o.kind];
      let dest = path.join(outDir, `${base}${outs.length > 1 ? `-${i + 1}` : ""}${ext}`);
      if (fs.existsSync(dest)) dest = dest.replace(ext, `-${id.slice(0, 8)}${ext}`);
      await download(o.url, dest);
      result.files.push(dest);
    }
    const entry = { date: new Date().toISOString(), endpoint: ctx.endpoint, request_id: id, files: result.files.map((f) => path.relative(ROOT, f)), prompt: ctx.body?.prompt, est_usd: ctx.est?.usd };
    fs.appendFileSync(path.join(outDir, "manifest.jsonl"), JSON.stringify(entry) + "\n");
  }

  if (ctx.flags.json) console.log(JSON.stringify(result, null, 2));
  else {
    console.log(`request_id: ${id}`);
    for (const f of result.files) console.log(`saved: ${f}`);
    for (const u of result.urls) console.log(`url: ${u}`);
    if (ctx.est) console.log(`est_cost: ${fmt(ctx.est.usd)} (list price)`);
  }
}

// ---------- commands ----------
async function cmdRun(pos, flags) {
  if (!pos[0]) fail("usage: run <endpoint> --prompt \"...\" [--param key=value] [--json '{...}'] [--name slug] [--out dir] [--max-usd N] [--dry-run]");
  const endpoint = pos[0].replace(/^\/+/, "");
  const body = buildBody(flags);
  const est = estimate(endpoint, body);
  const maxGiven = flags["max-usd"] !== undefined;
  const maxUsd = maxGiven ? Number(flags["max-usd"]) : DEFAULT_MAX_USD;
  if (!Number.isFinite(maxUsd) || maxUsd < 0) fail(`--max-usd must be a number, got "${flags["max-usd"]}"`);

  log(`endpoint: /${endpoint}`);
  if (est) {
    log(`estimate: ${fmt(est.usd)}${est.max > est.usd ? ` (up to ${fmt(est.max)})` : ""} for ${est.note}, list price`);
    if (est.max > maxUsd) fail(`Estimated ${fmt(est.max)} exceeds the spend guard of ${fmt(maxUsd)}. Confirm the cost with Jaime, then re-run with --max-usd ${Math.ceil(est.max * 100) / 100}.`);
  } else {
    log("estimate: no list price known for this endpoint");
    if (!maxGiven && !flags["dry-run"]) fail("No known price for this endpoint. Check its price in the Higgsfield console, confirm it with Jaime, then re-run with --max-usd <N>.");
  }

  await resolveLocalFiles(body, { dry: !!flags["dry-run"] });
  if (flags["dry-run"]) {
    console.log(JSON.stringify({ endpoint: "/" + endpoint, body, estimate: est }, null, 2));
    return;
  }

  const r = await hf("POST", "/" + endpoint, body, { retry: false });
  if (!r.ok) fail(explain(r));
  const { request_id: requestId, status_url: statusUrl } = r.data;
  if (!requestId) fail(`Unexpected submit response: ${JSON.stringify(r.data).slice(0, 400)}`);
  log(`submitted ${requestId}`);
  const final = await waitFor(statusUrl || `/requests/${requestId}/status`, requestId, Number(flags.timeout) || 900);
  await finish(final, { endpoint, body, est, flags, requestId });
}

async function cmdStatus(pos, flags) {
  if (!pos[0]) fail("usage: status <request_id> [--download] [--name slug] [--out dir]");
  const r = await hf("GET", `/requests/${pos[0]}/status`);
  if (!r.ok) fail(explain(r));
  if (flags.download && r.data.status === "completed") return finish(r.data, { flags, requestId: pos[0] });
  console.log(JSON.stringify(r.data, null, 2));
}

async function cmdCancel(pos) {
  if (!pos[0]) fail("usage: cancel <request_id>");
  const r = await hf("POST", `/requests/${pos[0]}/cancel`, undefined, { retry: false });
  if (r.status === 202) return console.log("canceled (a queued request is refunded)");
  fail(explain(r));
}

async function cmdUpload(pos) {
  if (!pos[0]) fail("usage: upload <file>");
  const file = expand(pos[0]);
  if (!fs.existsSync(file)) fail(`File not found: ${pos[0]}`);
  console.log(await uploadFile(file));
}

async function cmdCheck() {
  credentials();
  log("credentials found; asking the API to verify them ...");
  // No documented whoami endpoint: look up a made-up request id. Bad credentials -> 401; good ones -> 404.
  const r = await hf("GET", `/requests/${crypto.randomUUID()}/status`);
  if (r.status === 401) fail(explain(r));
  if (r.status === 404 || r.status === 422) return console.log("OK: the API accepted the credentials (a 404 for a made-up request id is expected).\nNote: this does not show your balance; check it in the Higgsfield console.");
  fail(`Unexpected answer while checking credentials: ${explain(r)}`);
}

function cmdModels(flags) {
  const rows = Object.entries(PRICES).map(([endpoint, p]) => ({ endpoint: "/" + endpoint, kind: p.kind, price: `${fmt(p.usd)}${p.max ? `-${fmt(p.max)}` : ""}/${p.unit}` }));
  if (flags.json) return console.log(JSON.stringify(rows, null, 2));
  for (const kind of ["image", "video"]) {
    console.log(`\n${kind.toUpperCase()}`);
    for (const r of rows.filter((x) => x.kind === kind)) console.log(`  ${r.endpoint.padEnd(52)} ${r.price}`);
  }
  console.log("\nList prices, checked 2026-09-21. Parameters per model: references/api.md and https://open.higgsfield.ai/explore");
}

const USAGE = `Higgsfield API helper (uses HF credentials from the project .env)

  node hf-api.mjs check                          verify credentials, no cost
  node hf-api.mjs models                         known endpoints with list prices
  node hf-api.mjs run <endpoint> [options]       submit, wait, download to motion-studio/public/higgsfield/
      --prompt "..."          shortcut for the prompt field
      --param key=value       any other field (repeatable); local file paths are uploaded automatically
      --json '{...}' | @file  whole request body
      --name my-asset         output file name (no extension)
      --out <dir>             output directory (default motion-studio/public/higgsfield)
      --max-usd N             spend guard for this call (default ${DEFAULT_MAX_USD})
      --timeout <seconds>     polling limit (default 900)
      --dry-run               print the request and cost estimate, spend nothing
      --no-download           print the result URLs only (they expire after about 7 days)
      --json                  machine-readable result
  node hf-api.mjs status <request_id> [--download]   resume a request
  node hf-api.mjs cancel <request_id>                cancel while still queued (refunded)
  node hf-api.mjs upload <file>                      upload media, print the public URL`;

const { pos, flags } = parseArgs(process.argv.slice(2));
const cmd = pos.shift();
const commands = { run: cmdRun, status: cmdStatus, cancel: cmdCancel, upload: cmdUpload, check: cmdCheck, models: cmdModels };
if (!cmd || flags.help || !commands[cmd]) {
  console.log(USAGE);
  process.exit(cmd && !flags.help && !commands[cmd] ? 1 : 0);
}
await commands[cmd](pos, flags);
