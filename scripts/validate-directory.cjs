const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const { schema_version, categories: C, tools, TOOL_INTROS } = JSON.parse(fs.readFileSync(path.join(root, 'tools.json'), 'utf8'));
assert.equal(schema_version, 1, 'Unsupported tools.json schema');
assert.ok(tools.length > 0, 'The directory is empty');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.equal(scripts.length, 1, 'Keep a single application script');
for (const script of scripts) new vm.Script(script);
assert.ok(scripts[0].includes("fetch('tools.json')"), 'Load the external tool data');
const seen = new Set();
for (const tool of tools) {
  const { name, url, categories, tier, pricing_verified: verified } = tool;
  assert.ok(typeof name === 'string' && name.trim(), 'Missing tool name');
  assert.equal(new URL(url).protocol, 'https:', `Use HTTPS for ${name}`);
  assert.ok(['free', 'freemium', 'paid', 'unknown'].includes(tier), `Unknown tier for ${name}`);
  assert.ok(Array.isArray(categories) && categories.length, `Missing categories for ${name}`);
  for (const category of categories) assert.ok(C[category], `Unknown category ${category} for ${name}`);
  const key = url.toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/[?#].*$/, '').replace(/\/$/, '');
  assert.ok(!seen.has(key), `Duplicate URL: ${url}`);seen.add(key);
  assert.ok(typeof TOOL_INTROS[url] === 'string' && TOOL_INTROS[url].trim().length > 30, `Missing introduction for ${name}`);
  assert.ok(Object.hasOwn(tool, 'pricing_verified'), `Missing pricing_verified field for ${name}`);
  assert.ok(verified === null || /^\d{4}-\d{2}-\d{2}$/.test(verified), `Invalid pricing date for ${name}`);
  if (verified !== null) {
    const date = new Date(verified + 'T00:00:00Z');
    assert.ok(!Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === verified, `Invalid calendar date for ${name}`);
    assert.ok(date <= new Date(), `Future pricing verification date for ${name}`);
    assert.notEqual(tier, 'unknown', `Unverified pricing cannot have a verification date: ${name}`);
  }
}
assert.equal(Object.keys(TOOL_INTROS).length, tools.length, 'Introduction keys must match tool URLs');
const staticBlock = html.match(/<!-- STATIC_TOOLS_START -->([\s\S]*?)<!-- STATIC_TOOLS_END -->/)?.[1];
assert.ok(staticBlock, 'Static fallback cards are missing');
assert.equal((staticBlock.match(/<article class="card"/g) || []).length, 24, 'Pre-render 24 cards');
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const staticURLs = [...staticBlock.matchAll(/<article class="card" data-url="([^"]+)"/g)].map(match => decode(match[1]));
const sortKey = n => n.replace(/^[^A-Za-z0-9]+/, '').toUpperCase();
const first = [...tools].sort((a, b) => sortKey(a.name).localeCompare(sortKey(b.name))).slice(0, 24);
assert.deepEqual(staticURLs, first.map(tool => tool.url), 'Regenerate fallback cards with node scripts/prerender-directory.cjs');
assert.ok(html.includes('<noscript>'), 'Missing no-JS guidance');
assert.ok(html.includes('<title>AI Arsenal</title>'), 'Use consistent page branding');
assert.ok(html.includes(`id="cnt">${tools.length}</strong>`), 'Static tool count is stale');
assert.ok(!html.includes('id="hero-count"') && !html.includes('id="ft-n"') && !html.includes('id="sb-n"'), 'Duplicate total counters');
const meta = name => html.match(new RegExp(`(?:property|name)="${name}" content="([^"]+)"`))?.[1];
const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
assert.equal(meta('og:title'), 'AI Arsenal');assert.equal(meta('twitter:title'), 'AI Arsenal');
assert.equal(meta('og:url'), canonical);assert.equal(meta('og:description'), meta('description'));
assert.equal(meta('twitter:card'), 'summary_large_image');
assert.equal(meta('twitter:image'), meta('og:image'));
assert.equal(meta('og:image'), new URL('og-image.png', canonical).href);
assert.equal(meta('og:image:width'), '1200');assert.equal(meta('og:image:height'), '630');assert.ok(meta('og:image:alt'));
for (const [name, width, height] of [['og-image.png', 1200, 630], ['apple-touch-icon.png', 180, 180]]) {
  const png = fs.readFileSync(path.join(root, name));
  assert.equal(png.subarray(1, 4).toString(), 'PNG', `Invalid PNG: ${name}`);
  assert.equal(png.readUInt32BE(16), width, `Wrong width: ${name}`);assert.equal(png.readUInt32BE(20), height, `Wrong height: ${name}`);
}
const css = html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
assert.equal((css.match(/:root\{/g) || []).length, 1, 'Keep one palette');
assert.equal((css.match(/@media\(prefers-reduced-motion:reduce\)/g) || []).length, 1, 'Keep one reduced-motion rule');
assert.ok(!css.includes('--tool-hue') && !css.includes('45,212,191') && !css.includes('mix-blend-mode'), 'Remove legacy decorative effects');
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
assert.ok(readme.includes(`**${tools.length} tools**`), 'Update the README tool count');
assert.ok(readme.includes(`**${Object.keys(C).length} categories**`), 'Update the README category count');
console.log(`Validated ${tools.length} unique tools across ${Object.keys(C).length} categories; introductions, pricing dates, static fallback, JavaScript syntax and sharing assets passed.`);
