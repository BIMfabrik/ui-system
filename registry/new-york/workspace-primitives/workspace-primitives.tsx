import type { HTMLAttributes, ReactNode } from "react"

const cx = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ")

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={cx("min-w-0 overflow-hidden rounded-lg border border-border bg-surface text-foreground", className)} {...props} />
}

export function Metric({ label, value, detail, className }: { label: ReactNode; value: ReactNode; detail?: ReactNode; className?: string }) {
  return <div className={cx("min-w-0 rounded-lg border border-border bg-surface p-4", className)}><div className="text-[.6875rem] font-semibold uppercase tracking-[.07em] text-muted-foreground">{label}</div><div className="mt-1 text-xl font-bold tracking-[-.02em]">{value}</div>{detail ? <div className="mt-1 text-xs text-muted-foreground">{detail}</div> : null}</div>
}

export function StatusBadge({ tone = "neutral", children, className }: { tone?: "neutral" | "success" | "warning" | "danger"; children: ReactNode; className?: string }) {
  const tones = { neutral: "border-border bg-secondary text-secondary-foreground", success: "border-success/40 bg-success/15 text-success", warning: "border-warning/40 bg-warning/15 text-warning", danger: "border-destructive/40 bg-destructive/10 text-destructive" }
  return <span className={cx("inline-flex min-h-6 items-center rounded-full border px-2 py-0.5 text-[.6875rem] font-bold", tones[tone], className)}>{children}</span>
}

export function DataState({ title, description, action, tone = "neutral", className }: { title: ReactNode; description?: ReactNode; action?: ReactNode; tone?: "neutral" | "danger"; className?: string }) {
  return <div role={tone === "danger" ? "alert" : "status"} className={cx("grid min-h-32 place-content-center gap-2 rounded-lg border border-dashed border-border p-6 text-center", tone === "danger" && "border-destructive/40 text-destructive", className)}><strong className="text-sm">{title}</strong>{description ? <div className="text-sm text-muted-foreground">{description}</div> : null}{action ? <div className="mt-2">{action}</div> : null}</div>
}

export function SegmentedControl({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return <div role="group" aria-label={label} className={cx("inline-flex max-w-full gap-0.5 rounded-lg border border-border bg-surface-subtle p-[3px]", className)}>{children}</div>
}
