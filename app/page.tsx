import {
  ArrowUpRight,
  Building2,
  Database,
  FileText,
  Layers3,
  MapPin,
  Maximize2,
  MousePointer2,
  PanelLeft,
  Search,
  Settings2,
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
  { label: "Projects", href: "#projects", icon: <Building2 className="size-4" /> },
  { label: "Documents", href: "#documents", icon: <FileText className="size-4" /> },
  { label: "Spatial data", href: "#spatial", icon: <MapPin className="size-4" /> },
  { label: "Data sources", href: "#sources", icon: <Database className="size-4" /> },
]

const mapActions = [
  { id: "select", label: "Select feature", icon: <MousePointer2 className="size-4" />, active: true },
  { id: "layers", label: "Layers", icon: <Layers3 className="size-4" /> },
  { id: "zoom-in", label: "Zoom in", icon: <ZoomIn className="size-4" /> },
  { id: "zoom-out", label: "Zoom out", icon: <ZoomOut className="size-4" /> },
  { id: "extent", label: "Fit to extent", icon: <Maximize2 className="size-4" /> },
]

function ShowcaseSection({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: string
  description: string
  children: React.ReactNode
}) {
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

export default function Home() {
  return (
    <AppShell
      brand={<span>BIMfabrik UI</span>}
      navigation={navigation}
      activeHref="#overview"
      topbar={
        <>
          <a
            className="hidden h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium hover:bg-surface-subtle sm:inline-flex"
            href="https://github.com/BIMfabrik/ui-system"
          >
            GitHub <ArrowUpRight className="size-4" />
          </a>
          <ThemeToggle />
        </>
      }
      footer={<p className="text-xs leading-5 text-muted-foreground">Public shadcn registry<br />Version 0.2</p>}
    >
      <PageHeader
        eyebrow="Design system · live catalogue"
        title="BIMfabrik interface components"
        description="Rendered examples of the shared application shell, headers, source metadata, spatial controls and semantic theme. Resize the page and switch themes to inspect responsive behaviour."
        actions={
          <a
            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            href="https://github.com/BIMfabrik/ui-system"
          >
            View repository <ArrowUpRight className="size-4" />
          </a>
        }
        meta="Next.js · Tailwind CSS v4 · shadcn registry · Light / Dark / System"
      />

      <div className="mt-8">
        <ShowcaseSection
          id="overview"
          title="Foundation"
          description="Semantic surfaces and typography provide the shared visual baseline. The active theme applies to every example on this page."
        >
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Background", "bg-background"],
              ["Surface", "bg-surface"],
              ["Subtle surface", "bg-surface-subtle"],
              ["Elevated surface", "bg-surface-elevated"],
            ].map(([label, className]) => (
              <div key={label} className={`${className} min-h-28 p-4`}>
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="mt-8 font-mono text-xs text-foreground">{className}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["Primary", "bg-primary text-primary-foreground"],
              ["Success", "bg-success text-white"],
              ["Warning", "bg-warning text-black"],
              ["Information", "bg-info text-white"],
            ].map(([label, className]) => (
              <span key={label} className={`${className} rounded-md px-2.5 py-1.5 text-xs font-medium`}>{label}</span>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="projects"
          title="Page header"
          description="A compact page-level heading with context, metadata and actions. It stacks cleanly on small screens instead of forcing a desktop toolbar layout."
        >
          <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
            <PageHeader
              eyebrow="Portfolio · Project 042"
              title="Campus Mitte 1|2"
              description="Coordination of project information requirements, model checks and operational data handover."
              meta="Status: In review · Updated 12 July 2026 · Zürich"
              actions={
                <>
                  <button className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium hover:bg-surface-subtle" type="button">
                    <Settings2 className="size-4" /> Settings
                  </button>
                  <button className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:opacity-90" type="button">
                    Open project
                  </button>
                </>
              }
            />
            <div className="grid gap-3 pt-5 sm:grid-cols-3">
              {[["Models", "18"], ["Open checks", "7"], ["Data fields", "286"]].map(([label, value]) => (
                <div key={label} className="border-l border-border pl-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 text-xl font-semibold tracking-[-0.025em]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="documents"
          title="Source note"
          description="Editorial and data-heavy pages can state provenance, verification state and recency without adding another decorative card."
        >
          <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
            <h3 className="text-base font-semibold">Wohnungsmix nach Zimmerzahl</h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              The proposed distribution prioritises family apartments while retaining smaller units for demographic diversity.
            </p>
            <div className="mt-6 grid grid-cols-4 gap-px overflow-hidden rounded-md border border-border bg-border text-center">
              {["1–2 Zimmer", "3 Zimmer", "4 Zimmer", "5+ Zimmer"].map((label, index) => (
                <div key={label} className="bg-surface-subtle px-2 py-4">
                  <p className="text-lg font-semibold">{[18, 27, 38, 17][index]}%</p>
                  <p className="mt-1 text-[0.6875rem] text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <SourceNote
              className="mt-6"
              source="Stadt Zürich Open Data"
              href="https://data.stadt-zuerich.ch/"
              updatedAt="10 July 2026"
              status="verified"
              note="Percentages are rounded. The project proposal is not an official municipal forecast."
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="spatial"
          title="Map toolbar"
          description="Compact spatial controls use familiar icon actions, clear focus states and an active selection state. Both orientations are shown."
        >
          <div className="relative min-h-[24rem] overflow-hidden rounded-lg border border-border bg-surface-subtle">
            <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="absolute left-[18%] top-[22%] h-24 w-40 rotate-[-8deg] border border-primary/50 bg-primary/10" />
            <div className="absolute bottom-[18%] right-[20%] h-32 w-28 rotate-[12deg] border border-primary/50 bg-primary/10" />
            <div className="absolute left-4 top-4">
              <MapToolbar actions={mapActions} />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <MapToolbar actions={mapActions.slice(0, 3)} orientation="horizontal" />
            </div>
            <div className="absolute right-4 top-4 rounded-md border border-border bg-surface-elevated p-3 text-xs shadow-sm">
              <p className="font-medium">Layers</p>
              <label className="mt-3 flex items-center gap-2 text-muted-foreground"><input defaultChecked type="checkbox" /> Buildings</label>
              <label className="mt-2 flex items-center gap-2 text-muted-foreground"><input defaultChecked type="checkbox" /> Parcels</label>
              <label className="mt-2 flex items-center gap-2 text-muted-foreground"><input type="checkbox" /> Infrastructure</label>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="sources"
          title="Controls and states"
          description="Basic controls demonstrate the intended density, border treatment and restraint before more registry primitives are added."
        >
          <div className="grid gap-4 rounded-lg border border-border bg-surface p-5 sm:grid-cols-2 sm:p-6">
            <label className="block text-sm font-medium">
              Search projects
              <span className="mt-2 flex h-10 items-center gap-2 rounded-md border border-input bg-background px-3 text-muted-foreground focus-within:ring-2 focus-within:ring-ring">
                <Search className="size-4" />
                <input className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none" placeholder="Name, location or identifier" />
              </span>
            </label>
            <label className="block text-sm font-medium">
              Project status
              <select className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
                <option>All statuses</option>
                <option>Active</option>
                <option>In review</option>
                <option>Archived</option>
              </select>
            </label>
            <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
              <button className="h-9 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground">Primary action</button>
              <button className="h-9 rounded-md border border-border px-3 text-sm font-medium hover:bg-surface-subtle">Secondary action</button>
              <button className="h-9 rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-surface-subtle hover:text-foreground">Quiet action</button>
              <button className="h-9 rounded-md border border-border px-3 text-sm font-medium opacity-40" disabled>Disabled</button>
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </AppShell>
  )
}
