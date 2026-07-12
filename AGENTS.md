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
