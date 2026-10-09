const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script, 'Inline application script is missing');
new vm.Script(script);
const data = script.slice(0, script.indexOf('/* ---------- helpers ---------- */'));
const context = vm.createContext({});
vm.runInContext(`${data}\nglobalThis.directory = { C, RAW };`, context, { timeout: 1000 });
const { C, RAW } = context.directory;
assert.ok(RAW.length > 0, 'The directory is empty');
const seen = new Set();
for (const row of RAW) {
  assert.equal(row.length, 4, 'Each entry needs name, URL, categories and tier');
  const [name, url, categories, tier] = row;
  assert.ok(typeof name === 'string' && name.trim(), 'Missing tool name');
  assert.equal(new URL(url).protocol, 'https:', `Use HTTPS for ${name}`);
  assert.ok(['free', 'freemium', 'paid'].includes(tier), `Unknown tier for ${name}`);
  for (const category of categories.split(' ')) {
    assert.ok(C[category], `Unknown category ${category} for ${name}`);
  }
  const key = url.toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/[?#].*$/, '').replace(/\/$/, '');
  assert.ok(!seen.has(key), `Duplicate URL: ${url}`);
  seen.add(key);
}
assert.ok(html.includes('name="description"'), 'Missing page description');
assert.ok(html.includes('property="og:title"'), 'Missing social title');
assert.ok(!html.includes('}\\nfooter'), 'Literal newline escape in footer CSS');
const readme = fs.readFileSync(path.join(__dirname, '..', 'README.md'), 'utf8');
assert.ok(readme.includes(`**${RAW.length} tools**`), 'Update the README tool count');
console.log(`Validated ${RAW.length} unique tools across ${Object.keys(C).length} categories; JavaScript syntax and metadata passed.`);
