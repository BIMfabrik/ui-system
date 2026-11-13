# Zree UI Toolkit for Unity 6

This UPM package lives in `BIMfabrik/ui-system/unity/com.zree.ui`. It contains approved
ZREE semantic design tokens, scoped UI Toolkit USS classes and reusable settings factories.
Game-specific HUD layout, panel binding, localization, input and persistence remain in the game.

## Install

Use a pinned immutable Git tag (replace VERSION with an existing release tag):

```json
"com.zree.ui": "https://github.com/BIMfabrik/ui-system.git?path=/unity/com.zree.ui#VERSION"
```

Git dependency paths and tags are supported by Unity Package Manager. Never install from
an unpinned mutable branch in release projects.

## Use in UXML / UI Builder

```xml
<ui:Style src="/Packages/com.zree.ui/Runtime/Styles/ZreeTheme.uss" />
<ui:Style src="/Packages/com.zree.ui/Runtime/Styles/ZreeComponents.uss" />
<ui:VisualElement name="settings-root" class="ds-root ds-dark zree-ui">
  <ui:VisualElement name="graphics" class="zree-section">
    <ui:Label text="GRAPHICS" class="zree-section__heading" />
    <ui:Toggle name="graphics-shadows" label="Shadows" class="zree-setting-toggle" />
  </ui:VisualElement>
</ui:VisualElement>
```

Bind controls to real app state. Add the shared style references **before** the
game's local USS so local exceptions remain possible. Keep existing element names.
For a reusable UI Builder section shell, instantiate `Runtime/Templates/ZreeSettingsSection.uxml`, rename the section and bind its controls. Use `Zree.UI.ZreeSettings` when creating sections dynamically; it produces the
same classes and named controls as UXML.

The brand palette is generated from `design/zree.json` by
`python3 scripts/export_unity_package.py`, and CI checks for drift.
Do not hand-edit `Runtime/Styles/ZreeTheme.uss` or
`Runtime/Scripts/CorporateDesignTokens.cs`.

## AI workers

The project must supply a source-controlled Unity Assistant text asset that
references `Documentation~/AI_DESIGN_RULES.md`; assign its GUID in
`ProjectSettings/Packages/com.unity.ai.assistant/Settings.json` without replacing
other preferences. External AI agents read the project's AGENTS.md and this contract.
The package does not modify Unity Assistant preferences on install.

## Safe evolution

Component styles are prefixed `zree-*`, never `settings-*` or `hud-*`.
Installing the package does **not** recolor old games or change their serialized
bindings. A consumer adds an explicit stylesheet and root class first; then it
opts into shared components as features are built. Pin tags; use PRs for upgrades.
