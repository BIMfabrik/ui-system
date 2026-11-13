# Zree Unity UI design contract

This package comes from BIMfabrik/ui-system, the single cross-platform identity authority.

Whenever creating or changing UI in a Unity game:
1. Inspect the current UXML, USS, runtime C# bindings and device layout before touching the screen.
2. Use com.zree.ui for semantic colors, spacing and shared settings controls. Prefer existing UI Toolkit templates/sections, not ad-hoc visuals.
3. A new settings section uses `ZreeSettings.CreateSection`, `CreateToggle`, `CreateSlider` or the equivalent `zree-*` UXML classes. The Unity project owns real behavior, saves and labels.
4. Load `/Packages/com.zree.ui/Runtime/Styles/ZreeTheme.uss` and `ZreeComponents.uss` in UXML (or a product-owned USS import). Apply `ds-root` and `ds-dark` on the appropriate root.
5. Product-owned runtime controls, UI element names, GUIDs, prefab/scene bindings and approved game art must be preserved. Do not introduce a replacement UI for an existing functioning HUD.
6. Respect Apple safe areas, gamepad/tvOS focus navigation, legibility, reduced motion, suitable touch targets and landscape/portrait. The package's 56-unit minimum is a *design* target; verify true UIKit point sizes at runtime.
7. No fabricated settings or dummy toggles in the shipped game. A control is complete only when its real feature and persistence are wired and tested.
8. Validate representative screens in the **real** Unity project. Use integrated game builds for human visual review. Avoid extra QA apps.
9. New shared patterns belong in the central package; product-specific input and behavior stay in the game repository.
10. Source-controlled Studio/Temporal/AirDev policies and mandatory integrity/release checks remain authoritative.

To change a new settings UI, inspect the package sample in Samples~/SettingsExample, use the project's established settings composition, and add a stable named visual element with a real binding.
