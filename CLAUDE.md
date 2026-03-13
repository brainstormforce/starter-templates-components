# Starter Templates Components

React component library for the Starter Templates WordPress plugin by Brainstorm Force.

## Tech Stack

- **Frontend:** React 18 (JSX) with SCSS
- **Build:** Webpack 5 (custom config, not wp-scripts build)
- **Linting:** @wordpress/eslint-plugin, wp-prettier
- **Package:** Published as `@brainstormforce/starter-templates-components`
- **Node:** 18.15.0 (enforced via Volta + engines)

## Commands

```bash
npm run start          # Watch mode (webpack --mode development)
npm run build          # Production build (webpack --mode production)
npm run lint:js        # ESLint on src/
npm run lint:js:fix    # ESLint with auto-fix
npm run lint:css       # Stylelint via wp-scripts
npm run format:js      # Prettier via wp-scripts
```

## Architecture

This is a **component library** (not a standalone plugin). It exports React components consumed by the Starter Templates plugin.

- `src/index.js` — Entry point, re-exports all components
- `src/<component>/` — Each component in its own directory (JS + SCSS)
- `build/index.js` — Webpack output (commonjs2), React is external
- Components: Button, Grid, Search, CategoryList, ToggleDropdown, Logo, Tooltip, SuggestionList, Toaster, SiteOrder, SiteType, NoResultFound, MegaMenu, PremiumBadge, SiteBusinessType

## Conventions

- Follow WordPress coding standards for JS (@wordpress/eslint-plugin)
- Use wp-prettier for formatting
- SCSS for styling (style-loader + css-loader + sass-loader pipeline)
- React is marked as external in webpack — do not bundle it
- Each component gets its own directory under `src/`

## Gotchas

- The `.npmignore` excludes `/src` from the published package — only `build/` is distributed
- Node version is pinned to 18.15.0 via Volta — use that exact version
- `react` is externalized in webpack config — the consuming plugin provides React
