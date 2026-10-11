<p align="center">
  <img src="assets/banner.svg" alt="AI Arsenal — Discover. Filter. Build." width="900" />
</p>

<p align="center">
  <a href="https://nauman-rajput.github.io/AI-Directory/">Explore the directory</a> ·
  <a href="#getting-started">Run locally</a> ·
  <a href="CONTRIBUTING.md">Contribute</a> ·
  <a href="https://github.com/Nauman-rajput/AI-Directory/issues/new/choose">Suggest a tool</a>
</p>

<p align="center">
  <a href="https://github.com/Nauman-rajput/AI-Directory/actions/workflows/deploy-pages.yml"><img src="https://github.com/Nauman-rajput/AI-Directory/actions/workflows/deploy-pages.yml/badge.svg" alt="Validation and deployment status" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-2dd4bf" alt="MIT license" /></a>
  <img src="https://img.shields.io/badge/tools-520-818cf8" alt="520 tools" />
  <img src="https://img.shields.io/badge/categories-29-38bdf8" alt="29 categories" />
  <img src="https://img.shields.io/badge/built_with-HTML_CSS_JavaScript-fb923c" alt="HTML, CSS and JavaScript" />
</p>

# AI Arsenal

A searchable directory of **520 tools** across **29 categories**, built for discovering AI assistants, creative tools, developer platforms and research resources.

A compact midnight and champagne interface keeps discovery controls close to the tools. Cards show a short description; open a card for its full introduction and provider link.

Search by name, domain or category; narrow the collection by pricing; and keep your favorite tools close. The application uses one HTML page and a separate tools.json catalog, with no framework, account or backend required. The first 24 tools are pre-rendered for crawlers and visitors without JavaScript.

## Features

| Feature | What you can do |
| --- | --- |
| Search and filters | Search instantly and combine category and Free, Freemium and Paid filters, plus a separate Pricing unverified chip. |
| Tool introductions | Open an accessible popup with an individual description, categories, a favorite button and an official website link. |
| Visual design | One champagne accent, a subtle rise-and-fade card reveal and a single optional orbit animation. |
| Motion controls | Toggle decorative motion; respect the system’s reduced-motion preference. |
| Navigation shortcuts | Sticky search and filters, `/` to focus search, scroll progress and a back-to-top button. |
| Sorting | Browse A → Z, Z → A, or starred tools first. |
| Saved favorites | Star tools and retain your choices in the same browser. |
| Responsive interface | Mobile category chips, search-only sticky controls and expandable filters. |
| Shareable views | Search, category, tier and sort are restored from the URL query string. |
| No-JS fallback | Browse 24 pre-rendered cards with descriptions and provider links. |
| Pricing verification | View verification dates when recorded; unknown prices are labeled explicitly. |
| Link previews | Open Graph and Twitter large-image cards plus an Apple touch icon. |
| Keyboard access | Skip to content, use labeled controls and close the mobile menu with Escape. |
| Lightweight delivery | Load icons lazily; use a letter fallback if icon sources fail. |
| Share previews | Page description and social metadata identify the directory when shared. |
| Automated validation | Check entry format, categories, pricing tiers, duplicate URLs and JavaScript syntax before deployment. |

## Categories

| Category | Category |
| --- | --- |
| Chatbots & Assistants | Miscellaneous |
| Image Generation | Marketing & Sales |
| Video Generation | Education & Research |
| Audio, Voice & Music | 3D Models & Worlds |
| Coding & Development | Architecture & Interiors |
| Design & UI/UX | Travel Planning |
| Automation & Workflow | Fashion & Beauty |
| Writing & Productivity | Careers & Hiring |
| Image Editing | Legal & Contracts |
| Branding & Logos | Accessibility |
| Platforms & Hubs | Healthcare & Wellness |
| Directories & Learning | Games & Storytelling |
| Video Editing | Finance & Business Planning |
| AI Models & Weights | Embeddings & Retrieval |
| Time-Series Forecasting | |

## Getting started

Use the [live directory](https://nauman-rajput.github.io/AI-Directory/), or clone and serve the repository locally so the browser can load tools.json.

To work with the repository:

```bash
git clone https://github.com/Nauman-rajput/AI-Directory.git
cd AI-Directory
```

Serve the repository locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. You can use any local HTTP server; Python is only needed for the example above. External fonts, icons and linked services require internet access.

## Adding a tool

Entries and individual introductions live in `tools.json`. Keep the category codes defined in its `categories` object.

```json
{
  "name": "Tool name",
  "url": "https://official.example/",
  "categories": ["CH", "WP"],
  "tier": "freemium",
  "pricing_verified": null
}
```

The first category is the primary category. Use `free`, `freemium`, `paid` or `unknown` for the tier. Unknown pricing is labeled **Pricing unverified** and can be selected with its separate chip. Use an actual `YYYY-MM-DD` date only when pricing has been checked; `null` means no verification date is recorded. A downloadable model license does not establish hosted API pricing.

Add a matching full description to the `TOOL_INTROS` object in the same JSON file, keyed by the exact URL. Prefer official pages and avoid unsupported claims or duplicate URLs.

After editing the catalog, regenerate the 24 static fallback cards and validate:

```bash
node scripts/prerender-directory.cjs
node scripts/validate-directory.cjs
```

## Validation and deployment

Run the dependency-free validator with Node.js:

```bash
node scripts/validate-directory.cjs
```

Also check search, filters, favorites and mobile navigation in a browser. The validator checks JSON data, pricing dates, introduction coverage, static-card ordering, JavaScript syntax and sharing asset dimensions. It does not confirm that external websites are reachable or that prices remain current.

GitHub Actions validates pushes to `main` and pull requests. Successful pushes to `main` publish the HTML application to GitHub Pages. Pull requests run validation without deploying.

## Project structure

```text
AI-Directory/
├── index.html                  # UI, static fallback, CSS and JavaScript
├── tools.json                  # Categories, tools, pricing dates and introductions
├── og-image.png                # 1200×630 sharing image
├── apple-touch-icon.png        # 180×180 home-screen icon
├── scripts/prerender-directory.cjs
├── assets/banner.svg           # Repository banner
├── scripts/validate-directory.cjs
├── .github/                    # Workflow and contribution templates
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

## Privacy and curation

Favorites and the motion preference are stored in your browser's local storage; they do not sync between devices. Clearing browser data removes them. Google Fonts and third-party favicon services receive requests when the page loads; visiting a tool follows that service's own policies.

The expanded collection includes tools discovered through Aixploria and other directories, with links to providers. The model addition was checked against author-owned model cards. This is a curated selection, not an exhaustive copy of any directory or a ranking of the latest releases.

Pricing, availability and regional access can change. Confirm current terms on each official website. Inclusion is a discovery reference, not an endorsement or a guarantee of accuracy.

## Maintainer and license

Created and maintained by **Muhammad Nauman Rajput** · [GitHub](https://github.com/Nauman-rajput) · [LinkedIn](https://www.linkedin.com/in/muhammad-nauman-800b50433/)

Released under the [MIT License](LICENSE). For vulnerability reporting, see [SECURITY.md](SECURITY.md).

