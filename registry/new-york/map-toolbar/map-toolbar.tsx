import type { ReactNode } from "react"

export interface MapToolbarAction {
  id: string
  label: string
  icon: ReactNode
  onClick?: () => void
  active?: boolean
  disabled?: boolean
}

interface MapToolbarProps {
  actions: MapToolbarAction[]
  orientation?: "horizontal" | "vertical"
  className?: string
}

export function MapToolbar({ actions, orientation = "vertical", className = "" }: MapToolbarProps) {
  return (
    <div
      className={`inline-flex rounded-lg border border-border bg-surface-elevated p-1 shadow-sm ${orientation === "vertical" ? "flex-col" : "flex-row"} ${className}`}
      role="toolbar"
      aria-orientation={orientation}
    >
      {actions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={action.onClick}
          disabled={action.disabled}
          aria-label={action.label}
          aria-pressed={action.active}
          title={action.label}
          className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-surface-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground"
          data-active={action.active}
        >
          {action.icon}
        </button>
      ))}
    </div>
  )
}
