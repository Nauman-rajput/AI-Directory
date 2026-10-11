const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(root, 'tools.json'), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const key = name => name.replace(/^[^A-Za-z0-9]+/, '').toUpperCase();
const sentence = text => text.match(/^.+?[.!?](?:\s|$)/)?.[0].trim() || text;
const cards = [...data.tools].sort((a, b) => key(a.name).localeCompare(key(b.name))).slice(0, 24).map(tool => {
  const domain = new URL(tool.url).hostname.replace(/^www\./, '');
  const tier = tool.tier === 'unknown' ? 'Pricing unverified' : tool.tier;
  const tooltip = tool.tier === 'unknown' ? ' title="Visit the provider for current plans."' : '';
  const date = tool.pricing_verified ? `<span class="pricing-date">Verified ${new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(tool.pricing_verified + 'T00:00:00Z'))}</span>` : '';
  return `<article class="card" data-url="${escape(tool.url)}"><a class="card-link" href="${escape(tool.url)}" target="_blank" rel="noopener noreferrer"><div class="icon"><span class="fi">${escape(key(tool.name)[0] || '?')}</span></div><div class="info"><div class="cname">${escape(tool.name)}</div><div class="cdmn">${escape(domain)}</div></div><p class="card-description">${escape(sentence(data.TOOL_INTROS[tool.url]))}</p><div class="meta"><span class="tier t-${escape(tool.tier)}"${tooltip}>${escape(tier)}</span>${tool.categories.slice(0, 2).map(code => `<span class="tag">${escape(data.categories[code][1])}</span>`).join('')}${date}</div></a></article>`;
}).join('\n');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html.replace(/<!-- STATIC_TOOLS_START -->[\s\S]*?<!-- STATIC_TOOLS_END -->/, `<!-- STATIC_TOOLS_START -->\n${cards}\n<!-- STATIC_TOOLS_END -->`);
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log('Pre-rendered 24 tools from tools.json.');
