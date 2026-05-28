import { SiteNav, SiteFooter } from "./SiteFrame";

export function LegalShell({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[360px] w-[700px] rounded-full bg-brand-600/10 blur-[160px] pointer-events-none" />

      <SiteNav />

      <article className="relative max-w-3xl mx-auto px-6 pt-14 pb-10">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 text-lg text-ink-300 leading-relaxed">{intro}</p>
        <p className="mt-3 text-xs uppercase tracking-widest text-ink-500">Last updated: {updated}</p>

        <div className="mt-10 space-y-8">{children}</div>

        <div className="mt-12 rounded-2xl ring-1 ring-amber-400/25 bg-amber-400/[0.06] p-5 text-sm text-amber-100/90 leading-relaxed">
          <strong>MVP notice:</strong> SafeZone is an early preview. These policies describe our
          intended standards and are not yet a substitute for legal advice. Before any real
          deployment they will be reviewed by a qualified data-protection lawyer and registered with
          Kenya&apos;s Office of the Data Protection Commissioner (ODPC).
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}

export function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-white mb-3">{heading}</h2>
      <div className="space-y-3 text-ink-300 leading-relaxed">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
