import type { ReactNode } from "react"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  meta?: ReactNode
  className?: string
}

export function PageHeader({ eyebrow, title, description, actions, meta, className = "" }: PageHeaderProps) {
  return (
    <header className={`border-b border-border pb-5 ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 max-w-3xl">
          {eyebrow ? <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{eyebrow}</p> : null}
          <h1 className="text-balance text-2xl font-semibold tracking-[-0.025em] text-foreground sm:text-[1.75rem]">{title}</h1>
          {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
          {meta ? <div className="mt-3 text-xs text-muted-foreground">{meta}</div> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </header>
  )
}
