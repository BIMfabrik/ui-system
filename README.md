# BIMfabrik UI System

A restrained, content-first design system for BIMfabrik applications: dashboards, editorial pages, GIS/map workspaces, and real-estate project interfaces.

## Shared CSS package

The repository publishes `@bimfabrik/ui-theme` through GitHub Packages. It contains shared light/dark tokens and base styles.

Install it in a consuming application:

```bash
npm install @bimfabrik/ui-theme
```

Add this to the application's `.npmrc` when installing from GitHub Packages:

```ini
@bimfabrik:registry=https://npm.pkg.github.com
```

Then import the complete theme once in the application's global stylesheet or root layout:

```css
@import "@bimfabrik/ui-theme";
```

Or import only part of it:

```css
@import "@bimfabrik/ui-theme/tokens.css";
@import "@bimfabrik/ui-theme/base.css";
```

Dark mode works with either `.dark` or `data-theme="dark"` on an ancestor, normally the `html` element.

Applications receive style changes after the package version is updated, installed, and redeployed. Dependabot or Renovate can automate those update pull requests.

## Publishing the CSS package

1. Update the version in `package.json`.
2. Commit the token or base-style changes.
3. Create and publish a GitHub release.
4. The `Publish CSS package` workflow publishes the package to GitHub Packages.

Validate the package contents locally with:

```bash
npm run package:check
```

Only the `styles/` directory is included in the published package.

## Install registry components directly from GitHub

```bash
npx shadcn@latest add BIMfabrik/ui-system/bimfabrik-theme
npx shadcn@latest add BIMfabrik/ui-system/theme-provider
npx shadcn@latest add BIMfabrik/ui-system/theme-toggle
npx shadcn@latest add BIMfabrik/ui-system/page-header
```

The public GitHub repository is the shadcn registry. It does not require a separate registry server.

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
npm run package:check
npm run dev
```

## Registry items

- `bimfabrik-theme` — semantic light/dark design tokens
- `theme-provider` — system/light/dark theme provider
- `theme-toggle` — accessible three-state theme control
- `page-header` — compact application page heading
- `app-shell` — responsive workspace shell
- `source-note` — source and data-status metadata
- `map-toolbar` — compact GIS/map action toolbar

See `docs/DESIGN_SYSTEM.md` and `AGENTS.md` before adding or changing components.
