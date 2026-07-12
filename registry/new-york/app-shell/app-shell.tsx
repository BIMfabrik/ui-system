import type { ReactNode } from "react"

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
}

export function AppShell({ brand, navigation, activeHref, topbar, footer, children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="hidden border-r border-border bg-surface-subtle lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
        <div className="flex h-14 items-center border-b border-border px-4 text-sm font-semibold tracking-[-0.01em]">{brand}</div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-2" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = item.href === activeHref
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-background data-[active=true]:font-medium data-[active=true]:text-foreground"
                data-active={active}
              >
                {item.icon ? <span className="flex size-4 items-center justify-center" aria-hidden="true">{item.icon}</span> : null}
                <span className="truncate">{item.label}</span>
              </a>
            )
          })}
        </nav>
        {footer ? <div className="border-t border-border p-3">{footer}</div> : null}
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/85 sm:px-6 lg:px-8">
          <div className="font-semibold lg:hidden">{brand}</div>
          <div className="ml-auto flex items-center gap-2">{topbar}</div>
        </header>
        <main className="mx-auto w-full max-w-[96rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
