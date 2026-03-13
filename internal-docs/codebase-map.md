# Codebase Map

## Directory Tree

```
starter-templates-components/
|-- package.json                 # Package config, scripts, dependencies
|-- package-lock.json            # Lockfile
|-- webpack.config.js            # Webpack 5 build config (entry, output, loaders, externals)
|-- .babelrc                     # Babel presets (preset-react, preset-env)
|-- .eslintrc                    # ESLint config extending @wordpress/eslint-plugin
|-- .eslintignore                # ESLint ignore (contains "build")
|-- .gitignore                   # Ignores node_modules, vendor, .DS_Store
|-- .npmignore                   # Excludes /src from npm publish
|-- composer.json                # PHP compatibility tooling (vendor/)
|-- composer.lock                # PHP composer lockfile
|-- index.js                     # Root re-export from ./src/index.js (dev convenience)
|-- CLAUDE.md                    # AI agent context file
|-- build/
|   +-- index.js                 # Webpack production output (CommonJS2 bundle)
|-- .github/                     # GitHub config (workflows, etc.)
|-- src/
|   |-- index.js                 # Main entry: imports and re-exports all 15 components
|   |-- icons.js                 # Shared SVG icon constants (ICONS object)
|   |-- style.scss               # Global CSS custom properties (design tokens on body)
|   |-- animations.scss          # Shared keyframe animation (stc-visible)
|   |
|   |-- button/
|   |   |-- index.js             # Button component (line 7-9): simple <button> wrapper
|   |   +-- style.scss           # .stc-button styles using CSS vars
|   |
|   |-- grid/
|   |   |-- index.js             # Grid component (lines 13-171): template card grid
|   |   +-- style.scss           # CSS grid layout (1-6 columns), hover effects, responsive
|   |
|   |-- search/
|   |   |-- index.js             # Search component (lines 10-98): debounced API search input
|   |   +-- style.scss           # Search input + icon positioning
|   |
|   |-- category-list/
|   |   |-- index.js             # CategoryList component (lines 10-97): horizontal filter tabs
|   |   +-- style.scss           # Flexbox layout, active state styling
|   |
|   |-- toggle-dropdown/
|   |   |-- index.js             # ToggleDropdown component (lines 9-135): generic dropdown
|   |   +-- style.scss           # Dropdown popup positioning, active states
|   |
|   |-- logo/
|   |   |-- index.js             # Logo component (lines 7-55): image + text display
|   |   +-- style.scss           # Logo sizing via CSS vars (--stc-logo-width/height)
|   |
|   |-- tooltip/
|   |   |-- index.js             # Tooltip component (lines 7-48): hover tooltip
|   |   +-- style.scss           # Absolute positioning, visibility toggle
|   |
|   |-- suggession-list/         # NOTE: directory name is misspelled ("suggession" not "suggestion")
|   |   |-- index.js             # SuggestionList component (lines 6-36): autocomplete dropdown
|   |   +-- style.scss           # List item styles, highlight matching text
|   |
|   |-- toaster/
|   |   |-- index.js             # Toaster component (lines 8-77): toast notification
|   |   +-- style.scss           # Fixed positioning (7 positions), fade in/out animations
|   |
|   |-- site-order/
|   |   +-- index.js             # SiteOrder component (lines 5-27): ToggleDropdown(Popular/Latest)
|   |
|   |-- site-type/
|   |   +-- index.js             # SiteType component (lines 5-27): ToggleDropdown(All/Premium)
|   |
|   |-- no-result-found/
|   |   |-- index.js             # NoResultFound component (lines 9-27): empty state message
|   |   +-- style.scss           # Padded box with border and secondary background
|   |
|   |-- mega-menu/
|   |   |-- index.js             # MegaMenu component (lines 5-268): responsive multi-level nav
|   |   +-- style.scss           # Desktop flyouts, mobile hamburger, responsive breakpoints
|   |
|   |-- premium-badge/
|   |   +-- index.js             # PremiumBadge component (lines 4-10): simple badge span
|   |
|   +-- site-business-type/
|       |-- index.js             # SiteBusinessType component (lines 6-21): MegaMenu with JSON data
|       |-- style.scss           # CSS var overrides for MegaMenu spacing
|       +-- mega-menu-content.json  # Hardcoded business category hierarchy (455 lines)
```

## File Size Reference

| File | Lines | Description |
|---|---|---|
| `src/mega-menu/index.js` | 270 | Largest component (3-level responsive menu) |
| `src/mega-menu/style.scss` | 276 | Largest stylesheet (desktop + mobile layouts) |
| `src/grid/index.js` | 173 | Second largest (template card grid) |
| `src/grid/style.scss` | 232 | Grid layout, hover effects, responsive breakpoints |
| `src/toggle-dropdown/index.js` | 135 | Dropdown with body click-outside-to-close |
| `src/search/index.js` | 101 | Debounced search with API fetch |
| `src/site-business-type/mega-menu-content.json` | 455 | Static business category data |
| `src/icons.js` | 95 | 8 SVG icons as JSX constants |
| `src/style.scss` | 47 | Design token definitions |
| `src/button/index.js` | 11 | Smallest component |

## Components Without Dedicated SCSS

These components have no `style.scss` file in their directory:

- **SiteOrder** (`src/site-order/`) -- uses ToggleDropdown styles
- **SiteType** (`src/site-type/`) -- uses ToggleDropdown styles
- **PremiumBadge** (`src/premium-badge/`) -- styled by `.stc-grid-item-badge` in Grid's SCSS
