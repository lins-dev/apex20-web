import { WebUI } from "@/ui";

export default function DesignSystemPage() {
  return (
    <div className="p-10 space-y-10 min-h-screen bg-background text-foreground">
      <section>
        <h1 className="text-3xl font-bold mb-6">Apex20 Design System</h1>
        <p className="text-muted mb-4">Validando integração com @apex20/ui e Tailwind v4.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Cores & Tokens</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-md bg-surface border border-border">Surface / Border</div>
          <div className="p-4 rounded-md bg-elevated border border-border-strong">
            Elevated / Strong
          </div>
          <div className="p-4 rounded-md bg-primary text-white">Primary Base</div>
          <div className="p-4 rounded-md bg-success text-white">Success Base</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Componentes (@apex20/ui)</h2>
        <div className="flex flex-wrap gap-4">
          <WebUI.Button>Default Apex Button</WebUI.Button>
          <WebUI.Button variant="outline">Outline Button</WebUI.Button>
          <WebUI.Button variant="destructive">Destructive Action</WebUI.Button>
          <WebUI.Button variant="ghost">Ghost Button</WebUI.Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tipografia</h2>
        <div className="space-y-2">
          <p className="text-xs">Text XS (11px)</p>
          <p className="text-sm">Text SM (12px)</p>
          <p className="text-base font-mono">Text Base Mono (13px)</p>
          <p className="text-lg font-bold">Text LG (16px) Bold</p>
        </div>
      </section>
    </div>
  );
}
