# Architecture

## High-Level Overview

```
Consuming WordPress Plugin (Starter Templates)
    |
    |-- imports from @brainstormforce/starter-templates-components
    |       |
    |       build/index.js  (CommonJS2 bundle)
    |           |
    |           src/index.js  (named re-exports of all 15 components)
    |               |
    |               src/<component>/index.js  (each component)
    |               src/<component>/style.scss (each component's styles)
    |               src/icons.js              (shared SVG icon constants)
    |               src/style.scss            (shared CSS custom properties)
    |               src/animations.scss       (shared keyframe animations)
```

The library is a leaf dependency. It has no routing, no state management, and no side effects beyond injecting CSS via style-loader at import time.

## Component Hierarchy

Components are mostly flat and independent. The key internal dependency relationships are:

```
Grid
  +-- Tooltip
  +-- PremiumBadge
  +-- ICONS (from icons.js)

CategoryList
  +-- ToggleDropdown (for "More" overflow items)

ToggleDropdown
  +-- Logo (renders image+text options)
  +-- ICONS.dropdown

Search
  +-- ICONS.search, ICONS.cross

SiteOrder
  +-- ToggleDropdown (hardcoded Popular/Latest options)

SiteType
  +-- ToggleDropdown (hardcoded All/Premium options)

SiteBusinessType
  +-- MegaMenu (loaded with mega-menu-content.json)

MegaMenu
  +-- ICONS.toggle, ICONS.dropdown

Toaster
  +-- ICONS[type] (success/error), ICONS.close

NoResultFound, Button, Logo, Tooltip, PremiumBadge, SuggestionList
  (standalone, no internal component dependencies)
```

## Data Flow

All components are **controlled** or **callback-driven**. There is no internal global state. The consuming plugin owns all state and passes it as props.

Common patterns:
- **value + onClick**: CategoryList, ToggleDropdown, SiteOrder, SiteType, SiteBusinessType, MegaMenu, SuggestionList
- **value + onSearch + apiUrl + onSearchResult**: Search (fetches from `apiUrl` on debounced input change, returns results via `onSearchResult` callback)
- **Display-only props**: Grid receives `options` array of template objects; Toaster receives `type`/`message`

The Search component is the only component that performs network requests (via `fetch(apiUrl)`). All other components are purely presentational.

## Build Pipeline

### Webpack Configuration (`webpack.config.js`)

```
Entry:    src/index.js
Output:   build/index.js (commonjs2)
External: react (not bundled)

Loaders:
  .scss/.sass  --> sass-loader --> css-loader --> style-loader (injected into DOM at runtime)
  .js/.jsx     --> babel-loader (presets: @babel/preset-react, @babel/preset-env)
```

Key implications:
1. **CSS is injected at runtime** via style-loader. There is no separate CSS file. Importing the library automatically injects all component styles into the page `<head>`.
2. **React is external**. The consuming environment must provide React. The bundle references `require("react")`.
3. **No code splitting**. Everything is bundled into a single `build/index.js`.

### Babel Configuration (`.babelrc`)

```json
{
    "presets": ["@babel/preset-react", "@babel/preset-env"]
}
```

### ESLint Configuration (`.eslintrc`)

Extends `plugin:@wordpress/eslint-plugin/recommended` with WordPress coding standards. Notable disabled rules:
- `react/prop-types: off` -- No PropTypes validation
- `jsx-a11y/no-static-element-interactions: off` -- Click handlers on divs are accepted
- `jsx-a11y/click-events-have-key-events: off` -- Keyboard accessibility not enforced
- `react-hooks/exhaustive-deps: off` -- Dependency arrays are manually managed
- `func-style: ["error", "expression"]` -- Arrow/const functions required, no function declarations

### npm Scripts

| Script | Command | Purpose |
|---|---|---|
| `start` | `webpack --watch --mode development` | Dev watch mode |
| `build` | `webpack --mode production` | Production bundle |
| `lint:js` | `wp-scripts lint-js ./src/` | ESLint check |
| `lint:js:fix` | `wp-scripts lint-js ./src/ --fix` | ESLint auto-fix |
| `lint:css` | `wp-scripts lint-style` | Stylelint |
| `format:js` | `wp-scripts format-js` | Prettier |

### Publishing

The `.npmignore` file excludes `/src` from the published npm package -- only `build/` is distributed. The root `index.js` re-exports from `./src/index.js` for local development convenience.

## CSS Architecture

### Design Tokens (`src/style.scss`)

All shared design values are defined as CSS custom properties on `body`:

- **Colors**: `--stc-color-accent`, `--stc-color-heading`, `--stc-color-body`, etc.
- **Font sizes**: `--stc-font-size-xxl` (30px) through `--stc-font-size-xxs` (11px)
- **Font weights**: `--stc-font-weight-extra-bold` (600), `--stc-font-weight-bold` (500), `--stc-font-weight-normal` (400)
- **Line heights**: `--stc-font-line-height-xl` (36px) through `--stc-font-line-height-xs` (20px)
- **Borders**: `--stc-border-color`, `--stc-border-radius-1` through `--stc-border-radius-5`
- **Backgrounds**: `--stc-background-primary`, `--stc-background-secondary`, `--stc-background-light`

### CSS Class Naming

All classes use the `stc-` prefix (Starter Templates Components). Examples:
- `.stc-button`, `.stc-grid-wrap`, `.stc-search`, `.stc-category-list`
- Exception: Toaster uses `st-toaster` prefix (inconsistent)

### Per-Component Customization

Several components expose CSS custom properties for the consuming plugin to override without modifying source. Examples:
- Search: `--stc-search-input-border`, `--stc-search-input-height`, `--stc-search-input--focus-border`
- ToggleDropdown: `--stc-toggle-dropdown-popup-min-width`, `--stc-toggle-dropdown-selected-padding`
- SuggestionList: `--stc-suggestion-list-max-width`, `--stc-suggestion-list-position`
- MegaMenu: `--stc-mega-menu-item-title-margin`, `--stc-mega-menu-group-margin`

## Dependencies

### Runtime Dependencies
- `@wordpress/html-entities` -- `decodeEntities()` for safe HTML entity decoding in Grid, CategoryList, SuggestionList, NoResultFound
- `@wordpress/i18n` -- `__()` and `sprintf()` for translation-ready strings
- `react` / `react-dom` -- UI framework (externalized in bundle)
- `use-debounce` -- `useDebouncedCallback` hook used in Search component

### Dev Dependencies
- Webpack 5 + loaders (babel-loader, css-loader, sass-loader, style-loader, svg-url-loader)
- `@wordpress/scripts` -- provides wp-scripts CLI for linting/formatting
- `@wordpress/eslint-plugin` + `wp-prettier` -- code quality tooling
