# Contributing to AI Arsenal

Help keep the directory useful, accurate and easy to maintain. Focus each pull request on one clearly described improvement.

## Suggest a tool

Open a [tool suggestion](https://github.com/Nauman-rajput/AI-Directory/issues/new/choose) with its name, official URL, main use case, proposed category and current pricing source.

Before submitting:

- Check the directory for the same tool, another name or another URL for the same service.
- Prefer an official product page over affiliate links, mirrors or onboarding URLs.
- Confirm the URL is reachable and the pricing label matches the listed product.
- Use Free for free access, Freemium for limited free usage with upgrades, and Paid when payment is required after any temporary trial.
- Keep names descriptive and avoid unsupported promotional claims.

## Edit the directory

Tools are four-field entries in the `RAW` array in `index.html`:

```js
["Tool name", "https://official.example/", "CH WP", "freemium"],
```

Use existing category codes from `C`; the first code is the main category. Insert the entry in its primary category's section. Preserve the standalone HTML workflow and the maintainer's attribution.

If the number of entries changes, update the README tool count and badge, and the HTML meta description.

## Validate your change

Run `node scripts/validate-directory.cjs` with Node.js. No package installation is required.

In a modern browser, check relevant behavior: search, category and pricing filters, sorting, favorites after reload, and narrow-screen navigation. For interface changes, check Tab navigation, visible focus, Escape and reduced-motion preferences.

## Submit a pull request

1. Fork the repository and create a focused branch.
2. Make and validate your change.
3. Describe the resulting behavior and include validation performed.
4. For tool additions or pricing changes, link the official source.
5. Include screenshots for meaningful visual changes when possible.

Report ordinary bugs with the bug template. Follow [SECURITY.md](SECURITY.md) for sensitive vulnerabilities.
