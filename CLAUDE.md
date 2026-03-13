# Starter Templates Components

React component library for the Starter Templates WordPress plugin by Brainstorm Force.

## Tech Stack

- **Frontend:** React 18 (JSX) with SCSS
- **Build:** Webpack 5 (custom config, not wp-scripts build)
- **Linting:** @wordpress/eslint-plugin, wp-prettier
- **Package:** Published as `@brainstormforce/starter-templates-components`
- **Node:** 18.15.0 (enforced via Volta + engines)
- **PHP tooling:** composer.json for PHPCompatibility checks (vendor/)

## Commands

```bash
npm run start          # Watch mode (webpack --mode development)
npm run build          # Production build (webpack --mode production)
npm run lint:js        # ESLint on src/
npm run lint:js:fix    # ESLint with auto-fix
npm run lint:css       # Stylelint via wp-scripts
npm run format:js      # Prettier via wp-scripts
npm run check-engines  # Verify Node/npm versions
npm run check-licenses # Check dependency licenses
```

## Architecture

This is a **component library** (not a standalone plugin). It exports React components consumed by the Starter Templates plugin.

- `src/index.js` — Entry point, re-exports all 15 components
- `src/<component>/` — Each component in its own directory (JS + SCSS)
- `src/icons.js` — Shared SVG icon constants (ICONS object)
- `src/style.scss` — Global CSS custom properties (design tokens on `body`)
- `src/animations.scss` — Shared keyframe animation
- `index.js` (root) — Re-exports from `./src/index.js` for dev convenience
- `build/index.js` — Webpack output (commonjs2), React is external

Components: Button, Grid, Search, CategoryList, ToggleDropdown, Logo, Tooltip, SuggestionList, Toaster, SiteOrder, SiteType, NoResultFound, MegaMenu, PremiumBadge, SiteBusinessType

## Conventions

- Follow WordPress coding standards for JS (@wordpress/eslint-plugin)
- Use wp-prettier for formatting (WordPress-style spacing: `( { prop } )`)
- Arrow/const functions required — `func-style: ["error", "expression"]`
- SCSS for styling (style-loader + css-loader + sass-loader pipeline)
- React is marked as external in webpack — do not bundle it
- Each component gets its own directory under `src/`
- All CSS classes use `stc-` prefix (Starter Templates Components)
- Guard all event callbacks: `if ( 'function' === typeof onClick ) { onClick( event, data ); }`
- Components expose CSS custom properties with fallbacks for consuming plugin overrides

### ESLint Disabled Rules (`.eslintrc`)

- `react/prop-types: off` — No PropTypes validation; refer to function signatures
- `jsx-a11y/no-static-element-interactions: off` — Click handlers on divs accepted
- `jsx-a11y/click-events-have-key-events: off` — Keyboard accessibility not enforced
- `react-hooks/exhaustive-deps: off` — Dependency arrays manually managed

## CSS Architecture

- Design tokens defined as `--stc-*` CSS custom properties on `body` in `src/style.scss`
- Per-component SCSS imports global tokens via `@import url('../style.scss')`
- **Style injection:** CSS is injected at runtime via style-loader — no separate CSS file. Importing any component injects ALL styles.
- Components expose customization via CSS vars with fallbacks (e.g., `var(--stc-search-input-height, 44px)`)

## Gotchas

- The `.npmignore` excludes `/src` from the published package — only `build/` is distributed
- Node version is pinned to 18.15.0 via Volta — use that exact version
- `react` is externalized in webpack config — the consuming plugin provides React at runtime
- `src/suggession-list/` directory is **misspelled** (should be "suggestion") — do not rename without updating all imports
- Toaster uses `st-toaster` CSS prefix instead of `stc-` — inconsistent with other components
- `src/toaster/index.js` calls `setTimeout` directly in component body (not in `useEffect`) — anti-pattern
- `src/suggession-list/index.js` uses `dangerouslySetInnerHTML` for search highlighting
- `src/search/index.js` uses `document.getElementsByClassName` instead of the existing React ref
- Importing any component causes ALL styles to be injected (no CSS tree-shaking)
- `src/grid/index.js` has an `enableNewUi` feature flag toggling legacy vs. new rendering

## Runtime Dependencies

- `@wordpress/html-entities` — `decodeEntities()` for safe HTML entity decoding
- `@wordpress/i18n` — `__()` and `sprintf()` for translation-ready strings
- `use-debounce` — `useDebouncedCallback` in Search component

## Internal Docs

See `internal-docs/` for detailed documentation:
- `README.md` — Project overview, component index
- `architecture.md` — Component hierarchy, data flow, build pipeline, CSS architecture
- `codebase-map.md` — Annotated directory tree with line numbers
- `ai-agent-guide.md` — Code patterns, pitfalls, props reference, component creation checklist
