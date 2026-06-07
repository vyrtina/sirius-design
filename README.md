# Sirius Design

> A curated collection of reusable Web Components (built with Lit) for building accessible, themeable, and composable UIs.

> **DEPRECATED:** This project is deprecated and is no longer maintained. It is provided "as-is" for reference only; do not rely on it for new production work.

## Quick Overview

- **Package:** sirius-design
- **Stack:** TypeScript, Lit, Vite, Storybook
- **Components:** Prefixed with `sd-` (examples: `sd-button`, `sd-input`, ...).

## Installation

Install from npm:

```
npm install sirius-design
```

Or use directly from GitHub (not recommended for production):

```
npm install github:your-username/sirius-design
```

## Usage

Include components in your app (ES module environment):

```html
<script type="module">
    import "sirius-design/dist/main.js";
</script>

<!-- then use components in markup -->
<sd-button variant="filled">Save</sd-button>
<sd-input placeholder="Name"></sd-input>
```

If you prefer tree-shaking, import only what you need from the built `dist` entrypoints (see the package exports and build output).

## Styling

Components ship with scoped styles. You can also import global token or theme files from the package if you're building a design system integration.

## Scripts

- `npm run build` — build TypeScript and SCSS and prepare `dist`
- `npm run build-vite` — Vite-based build
- `npm run storybook` — run Storybook locally
- `npm test` — run unit tests (Vitest)

## API & Docs

Storybook stories are included in `src/components/*/*.stories.ts` for examples and interactive documentation. A `custom-elements.json` manifest is available for tooling.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Migration / Integration Notes

- Components are registered with the `sd-` prefix; to avoid collisions, keep the prefix consistent across integrations.
- Types are emitted to `dist/main.d.ts`; ensure your bundler resolves the `types` field in `package.json`.

---
