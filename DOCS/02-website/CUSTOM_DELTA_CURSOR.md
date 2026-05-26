# Custom Delta Cursor

Branded cursor that follows the mouse on desktop and morphs by context.

## Modes

| Mode | When | Shape | Colors |
|------|------|-------|--------|
| `default` | Empty areas | Nexus — hollow delta + ring | Ice white + sky blue |
| `interactive` | Links, buttons | Impulse — solid delta | Amber + white stroke |
| `text` | Paragraphs, inputs | Glyph — beam shape | Rose + white stroke |

Trail uses a **muted nexus ghost** so it does not conflict with the active mode color.

## Enable rules

- `(hover: hover) and (pointer: fine)` — real mouse/trackpad  
- `min-width: 768px` — tablet/desktop  
- Native cursor hidden via `body.delta-cursor-on`  

## File map

| File | Role |
|------|------|
| [`src/hooks/useDeltaCursor.ts`](../../src/hooks/useDeltaCursor.ts) | `useDeltaCursorController()` — RAF lerp, mode detection |
| [`src/components/cursor/DeltaCursor.tsx`](../../src/components/cursor/DeltaCursor.tsx) | Portal to `document.body` |
| [`src/components/cursor/DeltaCursorShapes.tsx`](../../src/components/cursor/DeltaCursorShapes.tsx) | SVG shapes |
| [`src/components/cursor/cursorColors.ts`](../../src/components/cursor/cursorColors.ts) | Color constants |
| [`src/index.css`](../../src/index.css) | Layer styles, per-mode `drop-shadow` |

## Override with data attributes

```html
<a data-cursor="interactive">...</a>
<p data-cursor="text">...</p>
<div data-cursor="none">...</div>
```

## Hooks stability

All hooks live in **one** `useDeltaCursorController()` to avoid React Fast Refresh hook-order errors during HMR. After major cursor edits, hard-reload the page.

## Related docs

- [Site features](SITE_FEATURES.md)
