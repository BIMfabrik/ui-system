import type { ReactNode } from "react"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Clipboard,
  Database,
  Download,
  FileText,
  Filter,
  Info,
  Layers3,
  MapPin,
  Maximize2,
  Menu,
  MoreHorizontal,
  MousePointer2,
  PanelLeft,
  Plus,
  Search,
  Settings2,
  Trash2,
  Upload,
  User,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { AppShell } from "@/registry/new-york/app-shell/app-shell"
import { MapToolbar } from "@/registry/new-york/map-toolbar/map-toolbar"
import { PageHeader } from "@/registry/new-york/page-header/page-header"
import { SourceNote } from "@/registry/new-york/source-note/source-note"
import { ThemeToggle } from "@/registry/new-york/theme-toggle/theme-toggle"

const navigation = [
  { label: "Overview", href: "#overview", icon: <PanelLeft className="size-4" /> },
  { label: "Actions", href: "#actions", icon: <MousePointer2 className="size-4" /> },
  { label: "Forms", href: "#forms", icon: <FileText className="size-4" /> },
  { label: "Navigation", href: "#navigation", icon: <Menu className="size-4" /> },
  { label: "Data display", href: "#data", icon: <Database className="size-4" /> },
  { label: "Feedback", href: "#feedback", icon: <Bell className="size-4" /> },
  { label: "Overlays", href: "#overlays", icon: <Layers3 className="size-4" /> },
  { label: "Spatial", href: "#spatial", icon: <MapPin className="size-4" /> },
]

const mapActions = [
  { id: "select", label: "Select feature", icon: <MousePointer2 className="size-4" />, active: true },
  { id: "layers", label: "Layers", icon: <Layers3 className="size-4" /> },
  { id: "zoom-in", label: "Zoom in", icon: <ZoomIn className="size-4" /> },
  { id: "zoom-out", label: "Zoom out", icon: <ZoomOut className="size-4" /> },
  { id: "extent", label: "Fit to extent", icon: <Maximize2 className="size-4" /> },
]

const inventory = [
  "Accordion", "Alert", "Alert dialog", "Aspect ratio", "Avatar", "Badge", "Breadcrumb", "Button", "Button group", "Calendar", "Card", "Carousel", "Chart", "Checkbox", "Collapsible", "Combobox", "Command", "Context menu", "Data table", "Date picker", "Dialog", "Drawer", "Dropdown menu", "Empty state", "Field", "Hover card", "Input", "Input group", "Input OTP", "Item", "Kbd", "Label", "Menubar", "Navigation menu", "Pagination", "Popover", "Progress", "Radio group", "Resizable", "Scroll area", "Select", "Separator", "Sheet", "Sidebar", "Skeleton", "Slider", "Sonner / toast", "Spinner", "Switch", "Table", "Tabs", "Textarea", "Toggle", "Toggle group", "Tooltip", "Typography",
]

function Section({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-10 first:border-t-0 first:pt-0 sm:py-12">
      <div className="mb-6 grid gap-2 sm:grid-cols-[12rem_1fr] sm:gap-8">
        <h2 className="text-sm font-semibold tracking-[-0.01em]">{title}</h2>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

function Demo({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <article className={`min-w-0 rounded-lg border border-border bg-surface ${className}`}>
      <div className="border-b border-border px-4 py-3 text-xs font-medium text-muted-foreground">{title}</div>
      <div className="p-4 sm:p-5">{children}</div>
    </article>
  )
}

const buttonBase = "inline-flex h-9 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"

export default function Home() {
  return (
    <AppShell
      brand={<span>BIMfabrik UI</span>}
      navigation={navigation}
      activeHref="#overview"
      topbar={<><a className="hidden h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium hover:bg-surface-subtle sm:inline-flex" href="https://github.com/BIMfabrik/ui-system">GitHub <ArrowUpRight className="size-4" /></a><ThemeToggle /></>}
      footer={<p className="text-xs leading-5 text-muted-foreground">Public shadcn registry<br />Catalogue v0.3</p>}
    >
      <PageHeader
        eyebrow="Design system · comprehensive catalogue"
        title="BIMfabrik interface elements"
        description="A live visual inventory covering the standard shadcn component surface, the BIMfabrik semantic theme and the custom application patterns. Examples are intentionally compact and responsive."
        actions={<a className={`${buttonBase} bg-primary text-primary-foreground hover:opacity-90`} href="https://github.com/BIMfabrik/ui-system">Repository <ArrowUpRight className="size-4" /></a>}
        meta={`${inventory.length} documented element types · 7 installable BIMfabrik registry items · Light / Dark / System`}
      />

      <div className="mt-8">
        <Section id="overview" title="Inventory" description="The complete catalogue index. Custom BIMfabrik components are rendered alongside standard UI primitives and application patterns.">
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {inventory.map((item) => <div key={item} className="bg-surface px-3 py-2.5 text-sm">{item}</div>)}
          </div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {["Background", "Surface", "Subtle surface", "Elevated surface"].map((label, index) => (
              <div key={label} className={["bg-background", "bg-surface", "bg-surface-subtle", "bg-surface-elevated"][index] + " min-h-24 p-4"}>
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="mt-6 font-mono text-xs">{["bg-background", "bg-surface", "bg-surface-subtle", "bg-surface-elevated"][index]}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="actions" title="Actions" description="Buttons, icon actions, toggles, grouped actions and compact keyboard affordances.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Demo title="Buttons and states">
              <div className="flex flex-wrap gap-2">
                <button className={`${buttonBase} bg-primary text-primary-foreground`}>Primary</button>
                <button className={`${buttonBase} border border-border bg-background`}>Secondary</button>
                <button className={`${buttonBase} bg-secondary text-secondary-foreground`}>Subtle</button>
                <button className={`${buttonBase} text-muted-foreground`}>Ghost</button>
                <button className={`${buttonBase} bg-destructive text-white`}><Trash2 className="size-4" /> Delete</button>
                <button className={`${buttonBase} border border-border`} disabled>Disabled</button>
              </div>
            </Demo>
            <Demo title="Button group, icon buttons and toggle">
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex overflow-hidden rounded-md border border-border">
                  <button className="grid size-9 place-items-center border-r border-border"><ArrowLeft className="size-4" /></button>
                  <button className="h-9 px-3 text-sm font-medium">Page 2</button>
                  <button className="grid size-9 place-items-center border-l border-border"><ArrowRight className="size-4" /></button>
                </div>
                <button className="grid size-9 place-items-center rounded-md border border-border" title="Add"><Plus className="size-4" /></button>
                <button aria-pressed="true" className="inline-flex h-9 items-center gap-2 rounded-md bg-accent px-3 text-sm font-medium text-accent-foreground"><Filter className="size-4" /> Active</button>
                <kbd className="rounded border border-border bg-surface-subtle px-2 py-1 font-mono text-xs">⌘ K</kbd>
              </div>
            </Demo>
          </div>
        </Section>

        <Section id="forms" title="Forms" description="Text entry, selection, validation, switches, ranges and compound fields in realistic application density.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Demo title="Text fields">
              <div className="grid gap-4">
                <label className="grid gap-1.5 text-sm font-medium">Project name<input className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" defaultValue="Campus Mitte 1|2" /></label>
                <label className="grid gap-1.5 text-sm font-medium">Description<textarea className="min-h-24 rounded-md border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" defaultValue="Coordination of models and operational data." /></label>
                <label className="grid gap-1.5 text-sm font-medium">Search<div className="flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3"><Search className="size-4 text-muted-foreground" /><input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Name, location or ID" /></div></label>
                <label className="grid gap-1.5 text-sm font-medium text-destructive">Invalid field<input aria-invalid className="h-10 rounded-md border border-destructive bg-background px-3 text-sm outline-none" defaultValue="Missing identifier" /><span className="text-xs font-normal">Enter a valid project identifier.</span></label>
              </div>
            </Demo>
            <Demo title="Selection controls">
              <div className="grid gap-5">
                <label className="grid gap-1.5 text-sm font-medium">Status<select className="h-10 rounded-md border border-input bg-background px-3 text-sm"><option>Active</option><option>In review</option><option>Archived</option></select></label>
                <fieldset className="grid gap-2"><legend className="mb-1 text-sm font-medium">Delivery phase</legend>{["Planning", "Execution", "Operation"].map((x, i) => <label key={x} className="flex items-center gap-2 text-sm"><input defaultChecked={i === 1} name="phase" type="radio" /> {x}</label>)}</fieldset>
                <div className="grid gap-2">{["Models", "Documents", "Issues"].map((x, i) => <label key={x} className="flex items-center gap-2 text-sm"><input defaultChecked={i < 2} type="checkbox" /> {x}</label>)}</div>
                <label className="flex items-center justify-between gap-4 text-sm"><span><span className="font-medium">Notifications</span><span className="block text-xs text-muted-foreground">Receive project status changes.</span></span><span className="relative h-6 w-11 rounded-full bg-primary"><span className="absolute right-1 top-1 size-4 rounded-full bg-primary-foreground" /></span></label>
                <label className="grid gap-2 text-sm font-medium">Model detail<input defaultValue="65" type="range" /></label>
                <label className="flex h-20 cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border text-sm text-muted-foreground"><Upload className="size-4" /> Upload file<input className="sr-only" type="file" /></label>
              </div>
            </Demo>
          </div>
        </Section>

        <Section id="navigation" title="Navigation" description="Breadcrumbs, tabs, pagination, menus and sidebar patterns for dense professional applications.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Demo title="Breadcrumb and tabs">
              <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><a className="hover:text-foreground" href="#">Portfolio</a><span>/</span><a className="hover:text-foreground" href="#">Zürich</a><span>/</span><span className="text-foreground">Campus Mitte</span></nav>
              <div className="mt-6 flex overflow-x-auto border-b border-border"><button className="border-b-2 border-primary px-3 py-2 text-sm font-medium">Overview</button><button className="px-3 py-2 text-sm text-muted-foreground">Models</button><button className="px-3 py-2 text-sm text-muted-foreground">Documents</button><button className="px-3 py-2 text-sm text-muted-foreground">History</button></div>
            </Demo>
            <Demo title="Pagination and menus">
              <div className="flex items-center justify-between gap-4"><button className={`${buttonBase} border border-border`}><ArrowLeft className="size-4" /> Previous</button><div className="flex items-center gap-1"><button className="grid size-9 place-items-center rounded-md bg-primary text-sm text-primary-foreground">1</button><button className="grid size-9 place-items-center rounded-md text-sm">2</button><button className="grid size-9 place-items-center rounded-md text-sm">3</button></div><button className={`${buttonBase} border border-border`}>Next <ArrowRight className="size-4" /></button></div>
              <div className="mt-6 flex flex-wrap gap-3"><details className="relative"><summary className={`${buttonBase} cursor-pointer list-none border border-border`}>Project <ChevronDown className="size-4" /></summary><div className="absolute left-0 z-10 mt-2 w-48 rounded-md border border-border bg-popover p-1 shadow-md"><button className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Open</button><button className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-accent">Duplicate</button><button className="w-full rounded px-2 py-1.5 text-left text-sm text-destructive hover:bg-accent">Archive</button></div></details><button className="grid size-9 place-items-center rounded-md border border-border"><MoreHorizontal className="size-4" /></button></div>
            </Demo>
          </div>
        </Section>

        <Section id="data" title="Data display" description="Cards, badges, avatars, tables, lists, progress, skeletons, charts, calendar and empty states.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Demo title="Cards, badges and avatars">
              <div className="rounded-lg border border-border bg-background p-4"><div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-wide text-muted-foreground">Project 042</p><h3 className="mt-1 font-semibold">Campus Mitte 1|2</h3></div><span className="rounded-full bg-success/15 px-2 py-1 text-xs font-medium text-success">Active</span></div><p className="mt-3 text-sm leading-6 text-muted-foreground">Project information requirements and data handover.</p><div className="mt-4 flex -space-x-2">{["JH", "MS", "AK"].map(x => <span key={x} className="grid size-8 place-items-center rounded-full border-2 border-surface bg-secondary text-xs font-medium">{x}</span>)}</div></div>
            </Demo>
            <Demo title="Progress, spinner and skeleton">
              <div className="grid gap-5"><div><div className="mb-2 flex justify-between text-sm"><span>Data completeness</span><span className="font-medium">72%</span></div><div className="h-2 overflow-hidden rounded-full bg-secondary"><div className="h-full w-[72%] bg-primary" /></div></div><div className="flex items-center gap-3 text-sm text-muted-foreground"><span className="size-5 animate-spin rounded-full border-2 border-border border-t-primary" /> Synchronising models</div><div className="space-y-2"><div className="h-4 w-1/3 animate-pulse rounded bg-muted" /><div className="h-4 w-full animate-pulse rounded bg-muted" /><div className="h-4 w-4/5 animate-pulse rounded bg-muted" /></div></div>
            </Demo>
            <Demo title="Table" className="lg:col-span-2">
              <div className="overflow-x-auto"><table className="w-full min-w-[42rem] text-left text-sm"><thead className="border-b border-border text-xs text-muted-foreground"><tr><th className="px-3 py-2 font-medium">Project</th><th className="px-3 py-2 font-medium">Location</th><th className="px-3 py-2 font-medium">Status</th><th className="px-3 py-2 font-medium">Updated</th><th className="px-3 py-2 text-right font-medium">Models</th></tr></thead><tbody>{[["Campus Mitte", "Zürich", "Active", "12 Jul 2026", "18"], ["Liebefeld", "Bern", "Review", "10 Jul 2026", "9"], ["Roche B098", "Basel", "Archived", "03 Jul 2026", "24"]].map(row => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, i) => <td key={cell} className={`px-3 py-3 ${i === 4 ? "text-right font-mono" : i === 0 ? "font-medium" : "text-muted-foreground"}`}>{cell}</td>)}</tr>)}</tbody></table></div>
            </Demo>
            <Demo title="Calendar and chart">
              <div className="grid gap-5 sm:grid-cols-2"><div><div className="mb-3 flex items-center justify-between"><button className="grid size-8 place-items-center"><ArrowLeft className="size-4" /></button><span className="text-sm font-medium">July 2026</span><button className="grid size-8 place-items-center"><ArrowRight className="size-4" /></button></div><div className="grid grid-cols-7 gap-1 text-center text-xs">{"MTWTFSS".split("").map((d,i)=><span key={i} className="py-1 text-muted-foreground">{d}</span>)}{Array.from({length:31},(_,i)=><button key={i} className={`aspect-square rounded text-xs ${i===11 ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{i+1}</button>)}</div></div><div className="flex h-44 items-end gap-2 border-b border-l border-border p-3">{[38,62,47,78,55,88,70].map((v,i)=><div key={i} className="flex-1 rounded-t bg-primary/80" style={{height:`${v}%`}} title={`${v}%`} />)}</div></div>
            </Demo>
            <Demo title="Empty state and list item">
              <div className="grid place-items-center rounded-md border border-dashed border-border p-8 text-center"><div className="grid size-10 place-items-center rounded-full bg-secondary"><FileText className="size-5" /></div><h3 className="mt-3 text-sm font-semibold">No documents</h3><p className="mt-1 text-sm text-muted-foreground">Upload the first project document.</p><button className={`${buttonBase} mt-4 bg-primary text-primary-foreground`}><Plus className="size-4" /> Add document</button></div><div className="mt-4 flex items-center gap-3 rounded-md border border-border p-3"><span className="grid size-9 place-items-center rounded bg-secondary"><FileText className="size-4" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">AIA_Project_Requirements.pdf</p><p className="text-xs text-muted-foreground">2.4 MB · PDF</p></div><button className="grid size-8 place-items-center"><Download className="size-4" /></button></div>
            </Demo>
          </div>
        </Section>

        <Section id="feedback" title="Feedback" description="Alerts, status messaging, toast, tooltip, inline validation and provenance notes.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Demo title="Alerts">
              <div className="grid gap-3"><div className="flex gap-3 rounded-md border border-info/40 bg-info/10 p-3 text-sm"><Info className="mt-0.5 size-4 shrink-0 text-info" /><div><p className="font-medium">Information</p><p className="mt-1 text-muted-foreground">The model was last synchronised two hours ago.</p></div></div><div className="flex gap-3 rounded-md border border-warning/40 bg-warning/10 p-3 text-sm"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" /><div><p className="font-medium">Review required</p><p className="mt-1 text-muted-foreground">Seven data fields are incomplete.</p></div></div></div>
            </Demo>
            <Demo title="Toast and tooltip">
              <div className="ml-auto max-w-sm rounded-lg border border-border bg-surface-elevated p-4 shadow-md"><div className="flex gap-3"><span className="grid size-8 place-items-center rounded-full bg-success/15 text-success"><Check className="size-4" /></span><div className="min-w-0 flex-1"><p className="text-sm font-medium">Changes saved</p><p className="mt-1 text-xs text-muted-foreground">Project metadata was updated.</p></div><button className="grid size-7 place-items-center"><X className="size-4" /></button></div></div><div className="mt-5 flex items-center gap-3"><button className="grid size-9 place-items-center rounded-md border border-border" title="Help"><CircleHelp className="size-4" /></button><span className="rounded bg-foreground px-2 py-1 text-xs text-background">Tooltip content</span></div>
            </Demo>
            <Demo title="Source note" className="lg:col-span-2"><h3 className="font-semibold">Wohnungsmix nach Zimmerzahl</h3><p className="mt-2 text-sm text-muted-foreground">Family-oriented distribution with smaller units retained for demographic diversity.</p><SourceNote className="mt-5" source="Stadt Zürich Open Data" href="https://data.stadt-zuerich.ch/" updatedAt="10 July 2026" status="verified" note="Percentages are rounded. This is not an official municipal forecast." /></Demo>
          </div>
        </Section>

        <Section id="overlays" title="Overlays and disclosure" description="Dialogs, sheets, drawers, popovers, dropdowns, command surfaces, accordions and collapsible content.">
          <div className="grid gap-4 lg:grid-cols-2">
            <Demo title="Dialog and sheet">
              <div className="rounded-lg border border-border bg-background p-5 shadow-lg"><div className="flex items-start justify-between gap-4"><div><h3 className="font-semibold">Archive project?</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">The project remains searchable but is removed from active workspaces.</p></div><button className="grid size-8 place-items-center"><X className="size-4" /></button></div><div className="mt-5 flex justify-end gap-2"><button className={`${buttonBase} border border-border`}>Cancel</button><button className={`${buttonBase} bg-destructive text-white`}>Archive</button></div></div><div className="mt-4 ml-auto w-4/5 border-l border-border bg-surface-subtle p-4"><div className="flex items-center justify-between"><h3 className="font-semibold">Project settings</h3><X className="size-4" /></div><p className="mt-2 text-sm text-muted-foreground">Representative side sheet / drawer surface.</p></div>
            </Demo>
            <Demo title="Accordion, collapsible and popover">
              <div className="divide-y divide-border rounded-md border border-border">{["What is included?", "How is it installed?", "Is dark mode supported?"].map((x,i)=><details key={x} open={i===0} className="group"><summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium">{x}<ChevronDown className="size-4 transition-transform group-open:rotate-180" /></summary><p className="px-4 pb-4 text-sm leading-6 text-muted-foreground">Reusable, accessible interface patterns with semantic tokens and compact application density.</p></details>)}</div><div className="mt-4 w-64 rounded-md border border-border bg-popover p-3 shadow-md"><p className="text-sm font-medium">Popover title</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Contextual information anchored to a control.</p></div>
            </Demo>
            <Demo title="Command and combobox" className="lg:col-span-2"><div className="mx-auto max-w-xl overflow-hidden rounded-lg border border-border bg-popover shadow-lg"><div className="flex h-11 items-center gap-2 border-b border-border px-3"><Search className="size-4 text-muted-foreground" /><input className="flex-1 bg-transparent text-sm outline-none" placeholder="Search projects or commands…" /><kbd className="rounded border border-border px-1.5 py-0.5 text-xs">Esc</kbd></div><div className="p-2"><p className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Projects</p>{["Campus Mitte 1|2", "BBL Liebefeld", "Roche B098"].map((x,i)=><button key={x} className={`flex w-full items-center gap-3 rounded px-2 py-2 text-left text-sm ${i===0 ? "bg-accent text-accent-foreground" : ""}`}><Building2 className="size-4" />{x}<span className="ml-auto text-xs text-muted-foreground">Open</span></button>)}</div></div></Demo>
          </div>
        </Section>

        <Section id="spatial" title="Spatial and custom patterns" description="The BIMfabrik application shell, page header and GIS toolbar are custom registry items built on the same foundation.">
          <div className="rounded-lg border border-border bg-surface p-5 sm:p-6"><PageHeader eyebrow="Portfolio · Project 042" title="Campus Mitte 1|2" description="Coordination of project information requirements, model checks and operational data handover." meta="Status: In review · Updated 12 July 2026 · Zürich" actions={<><button className={`${buttonBase} border border-border`}><Settings2 className="size-4" /> Settings</button><button className={`${buttonBase} bg-primary text-primary-foreground`}>Open project</button></>} /></div>
          <div className="relative mt-4 min-h-[24rem] overflow-hidden rounded-lg border border-border bg-surface-subtle"><div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" /><div className="absolute left-[18%] top-[22%] h-24 w-40 rotate-[-8deg] border border-primary/50 bg-primary/10" /><div className="absolute bottom-[18%] right-[20%] h-32 w-28 rotate-[12deg] border border-primary/50 bg-primary/10" /><div className="absolute left-4 top-4"><MapToolbar actions={mapActions} /></div><div className="absolute bottom-4 left-1/2 -translate-x-1/2"><MapToolbar actions={mapActions.slice(0,3)} orientation="horizontal" /></div><div className="absolute right-4 top-4 rounded-md border border-border bg-surface-elevated p-3 text-xs shadow-sm"><p className="font-medium">Layers</p><label className="mt-3 flex items-center gap-2 text-muted-foreground"><input defaultChecked type="checkbox" /> Buildings</label><label className="mt-2 flex items-center gap-2 text-muted-foreground"><input defaultChecked type="checkbox" /> Parcels</label><label className="mt-2 flex items-center gap-2 text-muted-foreground"><input type="checkbox" /> Infrastructure</label></div></div>
        </Section>
      </div>
    </AppShell>
  )
}
