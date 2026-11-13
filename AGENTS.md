# BIMfabrik UI System Instructions

## Before editing

1. Read `docs/DESIGN_SYSTEM.md` and this file.
2. Run `npm install`, `npm run registry:build`, `npm run typecheck` and `npm run build` when dependencies are available.
3. Inspect the registry catalogue in light and dark mode.
4. Preserve the public item names unless a breaking change is explicitly intended.

## Component rules

- Components must be useful across at least two applications or represent a documented domain pattern.
- Use semantic tokens and Tailwind utilities; do not add raw light/dark colour values inside components.
- Prefer native semantic elements and accessible interaction patterns.
- Keep dependencies minimal and list them in `registry.json`.
- Every registry file must define an explicit `target` using shadcn placeholders where appropriate.
- Support long German labels and compact professional content.
- Use Lucide as the single icon family.
- Do not add generic dashboard cards, fabricated metrics or marketing copy.

## Required states

Interactive components must account for default, hover, focus-visible, active, disabled and dark-mode states. Data components should also consider loading, empty and error states.

## Validation

- `npm run registry:build`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Visual inspection at 390×844 and 1440×1000 in light and dark mode
- Keyboard navigation and visible focus review

## Release discipline

Prefer additive changes. For breaking changes, document migration instructions and tag a release so downstream applications can pin registry dependencies.

## Cross-platform products and visual identity

For app, website or game-HUD creation/redesign, read
`docs/UNIFIED_DESIGN_AUTOMATION.md` and use the existing design profiles
instead of inventing an unrelated, generic UI theme. BIMfabrik professional
colors remain governed by `styles/tokens.css`. ZREE colors originate from
`design/zree.json` and the existing ZREE corporate website.

Generated adapter files are strictly token surfaces; never assume token
sync automatically redesigns product-owned SwiftUI screens, Unity prefabs,
Godot scenes or website copy. Maintain Apple-native interaction conventions,
true gameplay bindings, readable mobile layouts and visual consistency.
Publish design changes via reviewable source-pinned consumer PRs. Do not
create separate QA apps or add cosmetic approval waterfalls.

Run `python3 -m unittest discover -s tests -p 'test_designctl.py' -v`
for changes to the cross-platform token generator and its contract.

## Unity UPM package authority

`unity/com.zree.ui` owns the shared ZREE Unity styles and settings components.
`design/zree.json` owns canonical palette and metrics;
`scripts/export_unity_package.py` generates both Unity token assets. Keep new
UI controls scoped with `zree-*` classes; do not modify `settings-*` or `hud-*`
style selectors in product repos from this package. Do not copy/paste the entire
package into each game. Respect Unity .meta GUID stability, native input and
verified Apple display behavior. Test with both the package static tests and the
real app's Unity import/compile before shipping consumer updates.
