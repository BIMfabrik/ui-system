# BIMfabrik Design System

## Direction

A restrained, precise and content-first interface language for professional applications. The system combines Swiss editorial clarity, compact workspace density and deliberate mobile behaviour.

## Application archetypes

- **Workspace** — dashboards, CRM, administration and project management.
- **Editorial** — reports, LinkedIn-related information and knowledge pages.
- **Spatial** — GIS, maps and portfolio interfaces where the map is primary content.
- **Project detail** — buildings, properties and real-estate projects.
- **Public data** — charts, tables, research and source-based information.

Choose the archetype before composing a page. Do not force all content into dashboard cards.

## Principles

1. Preserve information hierarchy before adding decoration.
2. Use semantic tokens; never hard-code theme-specific colours in shared components.
3. Prefer borders, grouping and spacing over decorative shadows.
4. Use cards only for genuinely independent objects.
5. Keep typography compact, readable and aligned to a clear grid.
6. Treat light and dark modes as equal design targets.
7. Treat mobile as a deliberate layout, not a compressed desktop.
8. Keep sources and data status close to the information they support.

## Prohibited defaults

- Gradients and gradient text
- Glassmorphism
- Oversized hero headings
- Decorative blobs
- Generic welcome dashboards
- Fabricated statistics or placeholder business data
- Excessive cards, pills, shadows and animation
- Arbitrary icons or mixed icon families
- Large empty spaces without an information reason
- Low-contrast grey text

## Tokens

Use standard shadcn semantic tokens plus:

- `surface`
- `surface-subtle`
- `surface-elevated`
- `success`
- `warning`
- `info`

The functional accent is `primary`. Individual applications may adjust its hue while retaining the remaining neutral system.

## Theme behaviour

Applications must offer System, Light and Dark modes. Persist an explicit selection, follow the OS preference in System mode and avoid a wrong-theme flash during loading.

## Responsive validation

Validate important routes at 390×844, 768×1024 and 1440×1000. Check page overflow, fixed navigation, table handling, map overlays, tap targets and action visibility.
