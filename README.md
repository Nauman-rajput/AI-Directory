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

A midnight and champagne interface pairs animated gradients, orbital artwork and glass-style cards with practical discovery tools. Open any card to read its individual introduction before visiting the provider.

Search by name, domain or category; narrow the collection by pricing; and keep your favorite tools close. The application runs from one HTML file, with no build step, account or backend required.

## Features

| Feature | What you can do |
| --- | --- |
| Search and filters | Search instantly and combine category and Free, Freemium, Paid or Check plans filters. |
| Tool introductions | Open an accessible popup with an individual description, categories, a favorite button and an official website link. |
| Visual design | Animated hero artwork, gradient typography, card reveals, hover lighting and subtle tilt effects. |
| Motion controls | Toggle decorative motion; respect the system’s reduced-motion preference. |
| Navigation shortcuts | Sticky search and filters, `/` to focus search, scroll progress and a back-to-top button. |
| Sorting | Browse A → Z, Z → A, or starred tools first. |
| Saved favorites | Star tools and retain your choices in the same browser. |
| Responsive interface | Use the directory on mobile, tablet and desktop. |
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

Use the [live directory](https://nauman-rajput.github.io/AI-Directory/) or download `index.html` and open it in a modern browser.

To work with the repository:

```bash
git clone https://github.com/Nauman-rajput/AI-Directory.git
cd AI-Directory
```

Open `index.html`, or serve it locally for a consistent browser origin:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Python is optional; it is only needed for this local-server command. External fonts, icons and linked services require internet access.

## Adding a tool

Entries live in the `RAW` array inside `index.html`:

```js
["Tool name", "https://official.example/", "CH WP", "freemium"],
```

The fields are **name**, **official URL**, **category codes** and **pricing tier**. The first category is the primary category; additional codes make the tool discoverable in other categories.

- **Free:** the listed tool is available without a paid plan.
- **Freemium:** limited free usage or credits are available, with paid upgrades.
- **Paid:** a paid plan is required; a temporary trial alone does not make a tool free.

- **Check plans (`unknown`):** pricing has not been verified; check the provider’s current plans.

Add a matching description to `TOOL_INTROS`, keyed by the exact URL:

```js
"https://official.example/": "Tool name helps users perform a specific task. Describe its actual capabilities without unsupported claims.",
```

Prefer official product pages, verify pricing, and avoid duplicate URLs or unsupported promotional claims. See [CONTRIBUTING.md](CONTRIBUTING.md) for the complete process.

## Validation and deployment

Run the dependency-free validator with Node.js:

```bash
node scripts/validate-directory.cjs
```

Also check search, filters, favorites and mobile navigation in a browser. The validator checks data and syntax; it does not confirm that external websites are reachable or that their prices remain current.

GitHub Actions validates pushes to `main` and pull requests. Successful pushes to `main` publish the HTML application to GitHub Pages. Pull requests run validation without deploying.

## Project structure

```text
AI-Directory/
├── index.html                  # Standalone directory and tool data
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

