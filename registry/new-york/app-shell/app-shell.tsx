"use client"

import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react"
import { useState, type ReactNode } from "react"

export interface AppShellNavItem {
  label: string
  href: string
  icon?: ReactNode
}

interface AppShellProps {
  brand: ReactNode
  navigation: AppShellNavItem[]
  activeHref?: string
  topbar?: ReactNode
  footer?: ReactNode
  children: ReactNode
  defaultCollapsed?: boolean
}

export function AppShell({
  brand,
  navigation,
  activeHref,
  topbar,
  footer,
  children,
  defaultCollapsed = false,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navigationContent = (compact = false) => (
    <nav className="flex-1 space-y-1 overflow-y-auto p-2" aria-label="Primary navigation">
      {navigation.map((item) => {
        const active = item.href === activeHref
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            title={compact ? item.label : undefined}
            onClick={() => setMobileOpen(false)}
            className={`flex h-9 items-center rounded-md text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-background data-[active=true]:font-medium data-[active=true]:text-foreground ${compact ? "justify-center px-0" : "gap-2.5 px-2.5"}`}
            data-active={active}
          >
            {item.icon ? <span className="flex size-4 shrink-0 items-center justify-center" aria-hidden="true">{item.icon}</span> : null}
            <span className={compact ? "sr-only" : "truncate"}>{item.label}</span>
          </a>
        )
      })}
    </nav>
  )

  return (
    <div className={`min-h-dvh bg-background text-foreground lg:grid ${collapsed ? "lg:grid-cols-[4rem_minmax(0,1fr)]" : "lg:grid-cols-[15rem_minmax(0,1fr)]"}`}>
      <aside className="hidden border-r border-border bg-surface-subtle transition-[width] lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
        <div className={`flex h-14 items-center border-b border-border ${collapsed ? "justify-center px-2" : "justify-between gap-2 px-4"}`}>
          <div className={collapsed ? "sr-only" : "min-w-0 truncate text-sm font-semibold tracking-[-0.01em]"}>{brand}</div>
          <button
            type="button"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed((value) => !value)}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
          </button>
        </div>
        {navigationContent(collapsed)}
        {footer ? <div className={`border-t border-border ${collapsed ? "px-2 py-3 text-center" : "p-3"}`}>{collapsed ? <span className="text-xs text-muted-foreground">UI</span> : footer}</div> : null}
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-foreground/20 backdrop-blur-[1px]" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex h-dvh w-[min(20rem,88vw)] flex-col border-r border-border bg-surface-subtle shadow-xl">
            <div className="flex h-14 items-center justify-between gap-3 border-b border-border px-4">
              <div className="min-w-0 truncate text-sm font-semibold">{brand}</div>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMobileOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" />
              </button>
            </div>
            {navigationContent(false)}
            {footer ? <div className="border-t border-border p-3">{footer}</div> : null}
          </aside>
        </div>
      ) : null}

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/85 sm:px-6 lg:px-8">
          <button
            type="button"
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <div className="min-w-0 truncate text-sm font-semibold lg:hidden">{brand}</div>
          <div className="ml-auto flex items-center gap-2">{topbar}</div>
        </header>
        <main className="mx-auto w-full max-w-[96rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}