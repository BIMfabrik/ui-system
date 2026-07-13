import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, TableHTMLAttributes } from "react"

const cx = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(" ")

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <section className={cx("min-w-0 overflow-hidden rounded-lg border border-border bg-surface text-foreground", className)} {...props} />
}

export function ActionButton({ variant = "secondary", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "destructive" }) {
  const variants = { primary: "border-primary bg-primary text-primary-foreground hover:opacity-90", secondary: "border-border bg-background text-foreground hover:bg-surface-subtle active:bg-secondary", destructive: "border-destructive bg-destructive text-white hover:opacity-90" }
  return <button className={cx("inline-flex min-h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-45", variants[variant], className)} {...props} />
}

export function Field({ label, hint, error, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; hint?: ReactNode; error?: ReactNode }) {
  return <label className={cx("grid gap-1.5 text-sm font-semibold", error ? "text-destructive" : undefined, className)}>{label}<input aria-invalid={Boolean(error)} className="min-h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" {...props} />{error ? <span className="text-xs font-normal">{error}</span> : hint ? <span className="text-xs font-normal text-muted-foreground">{hint}</span> : null}</label>
}

export function DataTable({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <div className="max-w-full overflow-x-auto"><table className={cx("w-full border-collapse text-sm text-foreground [&_th]:border-b [&_th]:border-border [&_th]:bg-surface-subtle [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-xs [&_th]:font-semibold [&_th]:text-muted-foreground [&_td]:border-b [&_td]:border-border [&_td]:px-3 [&_td]:py-3 [&_tbody_tr:last-child_td]:border-0", className)} {...props} /></div>
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
