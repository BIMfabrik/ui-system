import { ArrowUpRight, Boxes, Map, Newspaper, PanelsTopLeft } from "lucide-react"
import { ThemeToggle } from "@/registry/new-york/theme-toggle/theme-toggle"

const items = [
  { name: "bimfabrik-theme", type: "Theme", description: "Semantic tokens for restrained light and dark interfaces." },
  { name: "theme-provider", type: "Foundation", description: "System, light and dark mode using next-themes." },
  { name: "theme-toggle", type: "Control", description: "Compact accessible three-state appearance control." },
  { name: "page-header", type: "Pattern", description: "Application heading with actions, context and metadata." },
  { name: "app-shell", type: "Layout", description: "Responsive workspace shell with dense navigation." },
  { name: "source-note", type: "Content", description: "Source, verification status and update metadata." },
  { name: "map-toolbar", type: "Spatial", description: "Compact toolbar for GIS and map interactions." },
]

const archetypes = [
  { title: "Workspace", icon: PanelsTopLeft, text: "Dashboards, CRM and project administration." },
  { title: "Editorial", icon: Newspaper, text: "Reports, knowledge pages and public information." },
  { title: "Spatial", icon: Map, text: "GIS, portfolios and location-based applications." },
  { title: "Project detail", icon: Boxes, text: "Buildings, properties and real-estate projects." },
]

export default function Home() {
  return (
    <main className="min-h-dvh">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="text-sm font-semibold tracking-[-0.02em]">BIMfabrik UI</div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.7fr)] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Design system · v0.1</p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">A consistent interface foundation for BIMfabrik applications.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Restrained components for dashboards, editorial content, maps and real-estate workflows. Built as a public shadcn registry and designed for direct use by Codex.</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-subtle p-4 font-mono text-xs leading-6 text-muted-foreground">
            <span className="text-foreground">npx shadcn@latest add</span><br />
            BIMfabrik/ui-system/page-header
          </div>
        </section>

        <section className="py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div><h2 className="text-xl font-semibold tracking-[-0.02em]">Registry items</h2><p className="mt-1 text-sm text-muted-foreground">Initial components and foundations.</p></div>
            <a className="hidden items-center gap-1 text-sm font-medium sm:inline-flex" href="https://github.com/BIMfabrik/ui-system">GitHub <ArrowUpRight className="size-4" /></a>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            {items.map((item, index) => (
              <div key={item.name} className={`grid gap-2 px-4 py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:px-5 ${index ? "border-t border-border" : ""}`}>
                <code className="text-sm font-medium text-foreground">{item.name}</code>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <span className="w-fit rounded border border-border bg-surface-subtle px-1.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wide text-muted-foreground">{item.type}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border py-12">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">Application archetypes</h2>
          <p className="mt-1 text-sm text-muted-foreground">One visual language, different information structures.</p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {archetypes.map(({ title, icon: Icon, text }) => (
              <article key={title} className="bg-surface p-5">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
