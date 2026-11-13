# Unified UI identity, native apps, game HUDs and product websites

## Purpose

`BIMfabrik/ui-system` is the *design authority* for BIMfabrik professional applications and ZREE consumer products. A product must not receive a new arbitrary visual style whenever a coding agent touches it. This is **not** a command to homogenize every screen: native controls, gameplay input, approved asset silhouettes and actual product content remain product-owned.

Existing sources of truth:

- BIMfabrik: `styles/tokens.css`, `docs/DESIGN_SYSTEM.md` and existing shadcn registry. The current blue/neutral corporate style is unchanged.
- ZREE: `design/zree.json`, initially grounded in `BIMfabrik/zree_web/assets/styles.css` and its existing ZREE mark. ZREE's website uses cream (`#f4f5ef`), evergreen (`#203b30`) and lime (`#d4efab`). The generated dark variant is a semantic extension, **not** a mandate to recolor existing games.
- Platform conventions: Apple Human Interface Guidelines for SwiftUI/iOS/tvOS, real input modes and accessibility; Unity/UGUI or UI Toolkit for games; Godot themes for Godot projects.

## Natural-language contract

An implementation agent receiving **"Create <product> using the UI system"** should:

1. Inspect the exact product brief and relevant existing repo/assets before creating anything; honor the one-product/one-project rule.
2. Reuse the established BIMfabrik or ZREE identity, never fabricate a new generic AI theme. Run `designctl init` for the **actual** product repository/platform.
3. For a new game, use shared game HUD metrics/components for pause, mission, compass, minimap and tool affordances. Keep the game's own physics, gameplay bindings, camera and hit regions. The script creates tokens, not a running Unity app or prefab automatically.
4. For a public product, create or update a product website in its *existing* hosting/repository workflow (`BIMfabrik/zree_web` for ZREE products), using real screenshots, support links, legal/privacy URLs and verified store links. Do not invent features, reviews, prices, metrics or an App Store link.
5. Connect the generated tokens to the real UI components. Test the real build at appropriate device sizes and compare the intended experience with the original. A generated palette alone is not a finished interface.
6. Commit product-specific implementation and produce the appropriate real-app TestFlight/web preview for owner visual acceptance. Do not create separate QA iOS apps.

An implementation agent receiving **"Redesign <product> using the UI system"** should:

1. Read the existing product UI, current `.ui-system.json` (if present), branding and screenshots.
2. Determine whether this is a low-risk token-only refresh or an explicit component/layout redesign; do not overwrite product-owned screens during a token refresh.
3. Sync shared tokens, then adapt the actual screens/menus/HUD in the consuming repository with real component code. Preserve features, input bindings, saves, entitlements, safe areas and native conventions.
4. Request **one** risk-appropriate independent code/visual critique; use a consolidated real-app build for visual acceptance. Cosmetic changes do not require repeated approval gates.

An implementation agent receiving **"Update the shared ZREE HUD"** should modify/review shared HUD components in the authoritative game UI/library location, add a versioned design contract, and open source-matched consumer changes. These updates must **not** silently replace Unity `.prefab` files or serialized GUID-bound controls. A palette update propagates automatically to connected tokens; a structural HUD redesign needs explicit bindings and focused gameplay validation in each consumer.

## Consumer setup

Requires Python 3.10+ only (standard library). From a checkout of this repository:

```bash
# New or existing native app: adds design config + generated SwiftUI colors
python3 scripts/designctl.py init --root ../turemi --name Turemi --brand zree --platform swiftui --surface app

# Game: adds Unity C# palette plus UI Toolkit USS. Existing UGUI prefabs are not replaced.
python3 scripts/designctl.py init --root ../bad_buggies --name 'Bad Buggies' --brand zree --platform unity --surface game

# Existing professional web application
python3 scripts/designctl.py init --root ../some-web-app --name 'Workspace' --brand bimfabrik --platform web --surface app

# A product website starter; writes editable product-site HTML+CSS, avoids existing index.html
python3 scripts/designctl.py init --root ../new-product-web --name Wakeski --brand zree --platform web --surface product-site

# Update only managed token files, or check for drift without touching files
python3 scripts/designctl.py sync --root ../bad_buggies
python3 scripts/designctl.py sync --root ../bad_buggies --check
```

Do not run `init` if `.ui-system.json` already exists. Hand-edited app UI, scenes, Xcode project files, logos, and website product copy are **never** rewritten by `sync`. Generated file paths are deterministic and each generated file carries an ownership marker. The CLI refuses to replace unmarked files and symlinks. Source digests are captured in `.ui-system.lock.json` for review. Existing React/shadcn consumers may continue to use `@bimfabrik/ui-theme`; the generated web CSS exposes `--ds-*` variables for cross-brand consumers and must be imported once by the actual app.

### Platform adapter integration

| Platform | Generated target | Product responsibility |
|---|---|---|
| React, static web | `ui-system/generated/theme.css` | Load CSS, set `<html data-ds-brand="...">`, use `var(--ds-*)`; keep semantic HTML, layout and copy product-owned |
| SwiftUI | `DesignSystem/Generated/CorporateDesignTokens.swift` | Add to the app's Xcode target or Swift package; use colors in brand-specific elements; use native system controls where appropriate |
| Unity | `Assets/ZreeUI/Generated/CorporateDesignTokens.cs` and `.uss` | Commit Unity-created `.meta` files once and bind C# colors to actual UGUI/HUD controls or USS to UI Toolkit; never silently replace scene/prefab GUIDs |
| Godot | `addons/zree_ui/generated/design_tokens.json` | Load JSON into a real Godot Theme/Control adapter, without changing gameplay |

### HUD contract

The shared game HUD vocabulary includes pause, mission progress, minimap, compass, speed and context-specific vehicle tools. These are **roles**, not absolute-position templates. A watercraft has different controls from a buggy; the UI should have familiar styling while preserving playable, device-specific input. Keep content inside the actual device safe area, avoid overlaps, respect accessibility/reduced motion, and show context tools only when they work. Use actual screenshots to assess visual coherence; passing a token check is not visual acceptance.

### Product-site contract

Every public product page should provide a useful introduction, authentic app/game screenshots, verified availability, accessible navigation, an accurate privacy/support destination, legal details where needed, and only genuine store buttons. Do not silently replace existing Cloudflare Pages routing or company-domain pages. The starter creates `product-site/index.html` and `product-site/site.css` as **editable**, never-sync-overwritten content.

## Automated propagation: PRs, not blind replacement

A central release can notify enrolled repositories after an adapter is installed. This is a release-driven code workflow, **not an hourly chatbot/watchdog**.

1. Enroll each consuming project with `.ui-system.json`, check in its generated files, integrate its visual components and install `templates/github/workflows/ui-system-consumer-sync.yml` as `.github/workflows/ui-system-consumer-sync.yml`.
2. Mark that project enabled in `design/consumers.json` after the first successful sync/real-app check. Do not pre-enable projects that have not been integrated.
3. Configure the upstream `UI_SYNC_TOKEN` **repository secret** with the least cross-repo permissions required to dispatch to enrolled repositories; this must be done through a GitHub App token or another approved credential. Do not place credentials in source.
4. Publish a tagged UI-system release. `.github/workflows/dispatch-consumers.yml` sends `repository_dispatch` events to enabled consumers. The receiver checks out the **tagged** design source and opens a deterministic token-update PR.
5. A normal product review/CI checks only impacted UI, code/build integrity, device safe areas and Apple-specific constraints. Merge and build as permitted by existing project policies. Structural HUD changes remain product-owned code changes.

The receiver requires the consuming repo's GitHub Actions setting permitting the workflow to open PRs and its `GITHUB_TOKEN` to have write permissions. If `UI_SYNC_TOKEN` is not configured, dispatch intentionally remains inactive with a clear log. No credentials or automatic production deployment are created here.

## Minimal quality gates

- **Blocking:** source/asset GUID corruption, UI build failures, unsafe touch/keyboard focus behavior, clipped mission controls, missing privacy/parental flow, unexpected existing data or gameplay behavior.
- **Warn for designer review:** inconsistent icon semantics, arbitrary styling, excessive decorative gradients/cards/shadows, poor hierarchy, clearly off-brand product pages or artificial marketing copy.
- **Visual check:** representative real iPhone portrait+landscape layouts, tvOS focus where applicable, narrow/wide web and light/dark modes. The owner decides subjective visual acceptance on consolidated builds.
- **No process overkill:** deterministic tokens plus one focused independent critique. Do not add separate iOS prefab viewer apps or multi-round cosmetic approval waterfalls.

## Existing deployment limits

This foundation is an **implementation aid**, not a one-command compiler, store submission tool, or autonomous refactoring engine. Wiring real React/SwiftUI/Unity/Godot components and consumer workflow installation is a project-by-project integration step. Until a consumer has that integration, changing `design/zree.json` cannot physically update its HUD or website. Avoid claiming otherwise.
