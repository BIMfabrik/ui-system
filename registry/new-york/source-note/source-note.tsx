import { CircleCheck, Clock3, Database } from "lucide-react"

type SourceStatus = "verified" | "provisional" | "archived"

interface SourceNoteProps {
  source: string
  href?: string
  updatedAt?: string
  status?: SourceStatus
  note?: string
  className?: string
}

const statusLabel: Record<SourceStatus, string> = {
  verified: "Verified",
  provisional: "Provisional",
  archived: "Archived",
}

export function SourceNote({ source, href, updatedAt, status = "verified", note, className = "" }: SourceNoteProps) {
  const sourceContent = href ? (
    <a className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground" href={href}>
      {source}
    </a>
  ) : (
    <span className="font-medium text-foreground">{source}</span>
  )

  return (
    <div className={`flex flex-col gap-2 border-t border-border pt-3 text-xs leading-5 text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 ${className}`}>
      <span className="inline-flex items-center gap-1.5"><Database className="size-3.5" aria-hidden="true" />Source: {sourceContent}</span>
      <span className="inline-flex items-center gap-1.5"><CircleCheck className="size-3.5" aria-hidden="true" />{statusLabel[status]}</span>
      {updatedAt ? <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5" aria-hidden="true" />Updated {updatedAt}</span> : null}
      {note ? <span className="basis-full">{note}</span> : null}
    </div>
  )
}
