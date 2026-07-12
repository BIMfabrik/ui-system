# BIMfabrik UI System

A restrained, content-first shadcn registry for BIMfabrik applications: dashboards, editorial pages, GIS/map workspaces, and real-estate project interfaces.

## Install directly from GitHub

```bash
npx shadcn@latest add BIMfabrik/ui-system/bimfabrik-theme
npx shadcn@latest add BIMfabrik/ui-system/theme-provider
npx shadcn@latest add BIMfabrik/ui-system/theme-toggle
npx shadcn@latest add BIMfabrik/ui-system/page-header
```

Public GitHub registry items can be installed directly from the repository. The hosted registry build is also prepared for GitHub Pages at `https://bimfabrik.github.io/ui-system/r/{name}.json`.

## Add as a namespace

Add this to an application's `components.json`:

```json
{
  "registries": {
    "@bimfabrik": "https://bimfabrik.github.io/ui-system/r/{name}.json"
  }
}
```

Then install with:

```bash
npx shadcn@latest add @bimfabrik/page-header
```

## Local development

```bash
npm install
npm run registry:build
npm run typecheck
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
