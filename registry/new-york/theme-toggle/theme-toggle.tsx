"use client"

import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const options = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return (
    <div
      className={`inline-flex h-9 items-center gap-0.5 rounded-md border border-border bg-surface-subtle p-0.5 ${className}`}
      aria-label="Appearance"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const selected = mounted && theme === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={`Use ${label.toLowerCase()} theme`}
            aria-pressed={selected}
            title={label}
            className="inline-flex size-7 items-center justify-center rounded-[calc(var(--radius)-3px)] text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[selected=true]:bg-background data-[selected=true]:text-foreground data-[selected=true]:shadow-xs"
            data-selected={selected}
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
