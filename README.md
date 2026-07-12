# BIMfabrik UI System

A restrained, content-first shadcn registry for BIMfabrik applications: dashboards, editorial pages, GIS/map workspaces, and real-estate project interfaces.

## Install directly from GitHub

```bash
npx shadcn@latest add BIMfabrik/ui-system/bimfabrik-theme
npx shadcn@latest add BIMfabrik/ui-system/theme-provider
npx shadcn@latest add BIMfabrik/ui-system/theme-toggle
npx shadcn@latest add BIMfabrik/ui-system/page-header
```

The public GitHub repository is the registry. It does not require a registry server or GitHub Pages.

## Inspect and validate

```bash
npx shadcn@latest list BIMfabrik/ui-system
npx shadcn@latest view BIMfabrik/ui-system/page-header
npx shadcn@latest registry validate BIMfabrik/ui-system
```

Use `--dry-run`, `--diff`, or `--view` with `shadcn add` to review changes before installation.

## Local development

```bash
npm install
npm run registry:build
npm run typecheck
npm run lint
npm run build
npm run dev
```

## Initial items

- `bimfabrik-theme` — semantic light/dark design tokens
- `theme-provider` — system/light/dark theme provider
- `theme-toggle` — accessible three-state theme control
- `page-header` — compact application page heading
- `app-shell` — responsive workspace shell
- `source-note` — source and data-status metadata
- `map-toolbar` — compact GIS/map action toolbar

See `docs/DESIGN_SYSTEM.md` and `AGENTS.md` before adding or changing components.
