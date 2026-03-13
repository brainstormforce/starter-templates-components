# AI Agent Guide

Practical reference for AI agents working on this codebase.

## Key Code Locations

| What | Where |
|---|---|
| All component exports | `src/index.js` (lines 1-33) |
| Shared SVG icons | `src/icons.js` -- exports `ICONS` object with keys: search, cross, dropdown, favorite, close, success, error, toggle |
| Design tokens (CSS vars) | `src/style.scss` (lines 1-47) -- all `--stc-*` custom properties |
| Shared animation | `src/animations.scss` -- single `@keyframes stc-visible` |
| Webpack config | `webpack.config.js` (34 lines) |
| ESLint rules | `.eslintrc` (59 lines) |
| Babel presets | `.babelrc` (3 lines) |
| Root re-export | `index.js` (7 lines) -- re-exports from `./src/index.js` |
| Static data | `src/site-business-type/mega-menu-content.json` -- business category tree |

## Common Code Patterns

### 1. Component File Structure

Every component follows this pattern:

```javascript
// External Dependencies.
import React from 'react';

// Internal Dependencies.
import './style.scss';

const ComponentName = ( { prop1, prop2 } ) => {
    // Component logic
    return ( /* JSX */ );
};

export default ComponentName;
// or: export default memo( ComponentName );
```

**Note the WordPress-style spacing**: spaces inside parentheses `( { prop } )`, spaces inside JSX expressions `{ value }`, spaces inside CSS `var()` calls `var( --stc-color-accent )`.

### 2. Callback Safety Pattern

All event callbacks use this guard pattern before invoking:

```javascript
if ( 'function' === typeof onClick ) {
    onClick( event, data );
}
```

This appears in: Grid, Search, CategoryList, ToggleDropdown, Logo, SuggestionList, SiteOrder, SiteType, SiteBusinessType, MegaMenu.

### 3. Empty-State Guard

Components that receive `options` arrays guard against empty arrays:

```javascript
if ( ! options.length ) {
    return '';
}
```

Used in: Grid (line 25), ToggleDropdown (line 60), SuggestionList (line 7).

### 4. Memoization

Three components wrap their export in `React.memo()`:
- Search (`export default memo( Search )` -- line 101)
- CategoryList (`export default memo( CategoryList )` -- line 99)
- SuggestionList (`export default memo( SuggestionList )` -- line 38)
- SiteOrder (`export default memo( SiteOrder )` -- line 29)
- SiteType (`export default memo( SiteType )` -- line 29)

### 5. SCSS Import Pattern

Each component's SCSS file imports the global tokens:

```scss
// Core CSS.
@import url('../style.scss');
```

Some also import animations: `@import '../animations.scss';` (Grid's style.scss).

### 6. Internal Imports Between Components

Components import siblings via the package index:

```javascript
import { ToggleDropdown } from '..';       // CategoryList
import { ToggleDropdown } from '../index.js'; // SiteOrder, SiteType
import { Logo } from '../index';            // ToggleDropdown
import { PremiumBadge } from '..';          // Grid
import MegaMenu from '../mega-menu';        // SiteBusinessType (direct import)
```

### 7. CSS Custom Property Overrides

Components expose customization points via CSS custom properties with fallback values:

```scss
padding: var( --stc-toggle-dropdown-selected-padding, 6px 10px 6px 16px );
```

The consuming plugin can override these without touching source SCSS.

## Pitfalls and Gotchas

### 1. Misspelled Directory Name
The `suggession-list/` directory is misspelled (should be "suggestion"). The import in `src/index.js` line 8 uses `'./suggession-list'`. Do not rename without updating all references.

### 2. Inconsistent CSS Prefix
Toaster uses `st-toaster` class prefix (line 53 of `src/toaster/index.js`), while all other components use `stc-` prefix. The Toaster SCSS also uses `--st-*` CSS vars instead of `--stc-*`.

### 3. setTimeout in Render (Toaster)
`src/toaster/index.js` lines 29-31 call `setTimeout` directly in the component body (not in useEffect). This creates a new timeout on every render, which is a known anti-pattern that can cause state updates on unmounted components.

### 4. dangerouslySetInnerHTML (SuggestionList)
`src/suggession-list/index.js` line 23 uses `dangerouslySetInnerHTML` to render highlighted search terms. The input is processed through `decodeEntities` and regex replacement, but this is worth noting for security reviews.

### 5. Direct DOM Access (Search)
`src/search/index.js` line 89 uses `document.getElementsByClassName('stc-search-input')[0].focus()` instead of the React ref that is already defined (`inputRef`). This is fragile if multiple Search components exist on the same page.

### 6. Body Click Listener (ToggleDropdown)
`src/toggle-dropdown/index.js` lines 50-58 attach a click event listener to `document.querySelector('body')` for outside-click detection. This uses `addEventListener`/`removeEventListener` directly.

### 7. No PropTypes
`react/prop-types` is explicitly disabled in `.eslintrc` (line 47). No runtime prop validation exists. Refer to the component function signatures for expected props.

### 8. Style Injection Side Effect
Importing any component causes ALL styles (including global `style.scss`) to be injected into the DOM via style-loader. There is no tree-shaking for CSS.

### 9. React External
`react` is externalized in webpack (`externals: { react: "react" }`). The consuming environment MUST provide React via `require("react")`. If it does not, the bundle will fail at runtime.

### 10. `enableNewUi` Flag in Grid
`src/grid/index.js` has a prop `enableNewUi` that switches between two rendering modes (legacy direct-click screenshots vs. new link-wrapped screenshots with blur overlay). This is a feature flag pattern.

## Component Props Reference

### Button
```
children: ReactNode
```

### Grid
```
className: string
column: number|string (1-6, default '3')
options: Array<{ id, title, image, badge?, desc?, link?, livelink? }>
onClick: (event, item) => void
hasFavorite: boolean
onFavoriteClick: (event, item, newState) => void
favoriteList: string[] (format: 'id-{id}')
buttonLabel: string
livePreview: string
enableNewUi: boolean
```

### Search
```
apiUrl: string
onSearchResult: (response, searchedText) => void
beforeSearchResult: () => void
onSearch: (event, value) => void
value: string
placeholder: string
onKeyUp: (event) => void
```

### CategoryList
```
options: Array<{ id, name }>
value: string|number
onClick: (event, category) => void
limit: number
```

### ToggleDropdown
```
label: string
options: Array<{ id, title, image?, extraText? }>
className: string
value: string|number
onClick: (event, option) => void
icon: ReactNode
dismissAiPopup: () => void
```

### Logo
```
className: string
text: string
src: string (image URL)
alt: string
onClick: (event) => void
href: string (wraps image in anchor)
extraText: string
```

### Tooltip
```
children: ReactNode
content: ReactNode|string
```

### SuggestionList
```
value: string (current search text, used for highlighting)
options: string[]
onClick: (event, option) => void
```

### Toaster
```
type: 'success'|'error'
message: string|ReactNode
autoHideDuration: number (seconds, default 3)
topLeft/topRight/topCenter/bottomLeft/bottomRight/bottomCenter/leftCenter: boolean
style: object
```

### SiteOrder
```
value: string ('popular'|'latest')
onClick: (event, order) => void
```

### SiteType
```
value: string (''|'agency-mini')
onClick: (event, type) => void
```

### NoResultFound
```
searchTerm: string
```

### MegaMenu
```
options: Array<{ ID, title, parent, children?: Array<...> }>
parent: number|string (active parent ID)
menu: number|string (active menu item ID)
onClick: (event, parentOption, childItem) => void
```

### PremiumBadge
```
badge: string (defaults to 'Premium')
```

### SiteBusinessType
```
parent: number|string
menu: number|string
onClick: (event, option, childItem) => void
```

## Component Creation Checklist

When adding a new component to this library:

1. **Create directory**: `src/<component-name>/` (use kebab-case)

2. **Create component file**: `src/<component-name>/index.js`
   - Import React
   - Import `./style.scss`
   - Use `const` arrow function (enforced by `func-style: ["error", "expression"]`)
   - Use WordPress-style spacing in JSX
   - Guard callbacks with `'function' === typeof callback` pattern
   - Export default (optionally wrapped in `memo()`)

3. **Create style file**: `src/<component-name>/style.scss`
   - Start with `@import url('../style.scss');`
   - Use `stc-` prefix for all class names
   - Use design token CSS vars from `style.scss` (e.g., `var(--stc-color-accent)`)
   - Expose customization points as CSS custom properties with fallback values

4. **Register export**: Add to `src/index.js`
   - Add import line (alphabetical by path is not enforced but follow existing order)
   - Add to the named export block

5. **Register in root**: Add to `index.js` (root file)
   - Add component name to the destructured re-export

6. **If using shared icons**: Import `{ ICONS } from '../icons'` and reference by key

7. **Build and verify**: Run `npm run build` then `npm run lint:js`

## Editing Workflow

```bash
# Start watch mode for iterative development
npm run start

# After changes, lint
npm run lint:js:fix

# Final production build
npm run build
```

The built output is `build/index.js`. The consuming Starter Templates plugin imports from the built file.
