# Starter Templates Components -- Internal Documentation

## Project Overview

`@brainstormforce/starter-templates-components` is a React component library that provides UI building blocks for the **Starter Templates** WordPress plugin by Brainstorm Force. It is not a standalone plugin -- it is consumed as a dependency by the parent plugin, which provides React at runtime.

The library exports **15 React components** covering template browsing, filtering, search, and navigation UI. It ships as a single CommonJS2 bundle (`build/index.js`) built by Webpack 5.

## Key Facts

| Fact | Value |
|---|---|
| Package name | `@brainstormforce/starter-templates-components` |
| Entry point (source) | `src/index.js` |
| Entry point (built) | `build/index.js` |
| Output format | CommonJS2 (`libraryTarget: "commonjs2"`) |
| React | External (provided by consuming plugin) |
| Node version | 18.15.0 (Volta-pinned) |
| Styling | SCSS, injected at runtime via style-loader |
| Linting | `@wordpress/eslint-plugin` + `wp-prettier` |
| Components | 15 |

## Quick Start

```bash
# Install dependencies (use Node 18.15.0)
npm install

# Development (watch mode)
npm run start

# Production build
npm run build

# Lint
npm run lint:js
npm run lint:js:fix
npm run lint:css
npm run format:js
```

## Exported Components

| Component | Purpose |
|---|---|
| **Button** | Basic styled button wrapper |
| **Grid** | Template card grid with screenshots, favorites, premium badges |
| **Search** | Debounced search input with API integration |
| **CategoryList** | Horizontal category filter tabs with overflow dropdown |
| **ToggleDropdown** | Generic dropdown selector with logo/image support |
| **Logo** | Image + text logo display |
| **Tooltip** | Hover tooltip with auto-hide |
| **SuggestionList** | Search autocomplete suggestion list with highlighting |
| **Toaster** | Positioned toast notification with auto-dismiss |
| **SiteOrder** | Pre-configured ToggleDropdown for Popular/Latest sorting |
| **SiteType** | Pre-configured ToggleDropdown for All/Premium filtering |
| **NoResultFound** | Empty-state message for failed searches |
| **MegaMenu** | Responsive multi-level navigation menu |
| **PremiumBadge** | "Premium" label badge |
| **SiteBusinessType** | MegaMenu pre-loaded with business category data |

## Documentation Index

- [architecture.md](./architecture.md) -- High-level architecture, component hierarchy, data flow, build pipeline
- [codebase-map.md](./codebase-map.md) -- Directory tree with descriptions of every key file
- [ai-agent-guide.md](./ai-agent-guide.md) -- Key code locations, patterns, pitfalls, component creation checklist
