import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  Lock,
  Radio,
  Map as MapIcon,
  ShieldAlert,
} from "lucide-react";
import { SiteNav, SiteFooter } from "@/components/SiteFrame";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-brand-600/20 blur-[160px] pointer-events-none" />

      <SiteNav />

      <section className="relative max-w-6xl mx-auto px-6 pt-14 sm:pt-20 pb-20 sm:pb-28">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
          MVP preview · feedback wanted
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.08] sm:leading-[1.05] max-w-4xl text-balance">
          When a child goes missing, <span className="text-brand-400">coordination</span> beats chaos.
        </h1>
        <p className="mt-6 text-base sm:text-lg md:text-xl text-ink-300 max-w-2xl leading-relaxed">
          SafeZone helps a neighbourhood respond calmly in the first hour: verified
          neighbours get a precise alert, search zones prevent overlap, and AI helps
          triage sightings. You report what you see — police lead the recovery.
        </p>

        <div className="mt-6 inline-flex items-start gap-2.5 rounded-xl ring-1 ring-caution-400/30 bg-caution-400/[0.06] px-4 py-3 max-w-xl">
          <ShieldAlert className="h-4 w-4 text-caution-300 mt-0.5 shrink-0" />
          <p className="text-sm text-caution-100/90 leading-relaxed">
            <span className="font-semibold">Report, don&apos;t approach.</span> Volunteers share
            sightings and locations — never confront a child or suspect. Physical recovery is always
            the job of the police. In an emergency, call <span className="font-semibold text-white">999 / 112</span>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/demo"
            className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-500 transition-colors px-6 py-3.5 font-medium text-white glow"
          >
            Try the interactive demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition-colors px-6 py-3.5 font-medium text-white"
          >
            How it works
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden ring-1 ring-white/10">
          <Stat value="< 30s" label="Alert to broadcast" />
          <Stat value="2 km" label="Default radius" />
          <Stat value="AI 0–100" label="Match confidence" />
          <Stat value="$0" label="To run the MVP" />
        </div>
        <p className="mt-3 text-xs text-ink-500">
          Figures above are design targets for the MVP — not yet independently measured.
        </p>
      </section>

      <section id="problem" className="relative max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-300 mb-4">The problem</p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              The first hour decides the outcome. Most of it gets wasted.
            </h2>
          </div>
          <div className="space-y-5 text-ink-300 leading-relaxed">
            <p>
              When a child goes missing, families call neighbours, post in WhatsApp
              groups, then drive in circles. Police get involved late, with patchy
              second-hand details. Witnesses scroll past notices they never see.
            </p>
            <p>
              SafeZone closes that gap. The moment a parent triggers an alert,
              verified neighbours within range get a push notification, the search
              area is split into assigned zones so no street gets searched twice, and a
              coordinator can brief the police with a clear, structured summary instead
              of a panicked phone call.
            </p>
          </div>
        </div>
      </section>

      <section id="how" className="relative max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <p className="text-xs uppercase tracking-widest text-brand-300 mb-4">How it works</p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-14 max-w-2xl leading-tight">
          Four moving parts. Designed to work together in the first 15 minutes.
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <Step
            n="01"
            icon={<Radio className="h-5 w-5" />}
            title="Instant community broadcast"
            body="Verified neighbours within 2km get a high-priority push notification with last-seen location and a one-tap 'I'll help' response."
          />
          <Step
            n="02"
            icon={<MapIcon className="h-5 w-5" />}
            title="Coordinated search zones"
            body="The search area is auto-split into zones. Volunteers claim a zone — no overlap, no chaos, full coverage in minutes."
          />
          <Step
            n="03"
            icon={<Sparkles className="h-5 w-5" />}
            title="AI-matched sightings"
            body="A volunteer types what they saw. Gemini compares the description to the child's profile and returns a 0–100 confidence score with reasoning."
          />
          <Step
            n="04"
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Structured handoff to police"
            body="When a sighting is strong, SafeZone prepares a clear summary a verified coordinator can share with police. It never replaces calling 999 / 112 — it makes that call faster and clearer."
          />
        </div>

        <div className="mt-6 flex items-start gap-2.5 rounded-2xl ring-1 ring-caution-400/25 bg-caution-400/[0.05] px-5 py-4">
          <ShieldAlert className="h-5 w-5 text-caution-300 mt-0.5 shrink-0" />
          <p className="text-sm text-ink-200 leading-relaxed">
            <span className="font-semibold text-white">Report, don&apos;t approach.</span> Volunteers
            report sightings and share locations only — they never confront a child or a suspected
            person. Physical recovery is always the job of the police. SafeZone is a coordination
            tool, not a replacement for emergency services.
          </p>
        </div>
      </section>

      <section id="trust" className="relative max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <p className="text-xs uppercase tracking-widest text-brand-300 mb-4">Built right</p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 max-w-2xl leading-tight">
          Privacy and safety by design.
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          <Trust
            icon={<Lock className="h-5 w-5" />}
            title="Photos shown only during an alert"
            body="A child's photo is visible to verified volunteers only while an alert is active, then removed when the child is found. We never make it public."
          />
          <Trust
            icon={<Users className="h-5 w-5" />}
            title="Verified members only"
            body="Phone-based verification, neighbourhood join-codes, rate-limited alerts (1 per parent per 4 hours)."
          />
          <Trust
            icon={<Clock className="h-5 w-5" />}
            title="Auto-expiring data"
            body="Alerts close in 24h. Sighting descriptions are pruned. Every police notification is permanently audit-logged."
          />
        </div>
      </section>

      <section id="stack" className="relative max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="rounded-3xl ring-1 ring-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-8 md:p-12">
          <p className="text-xs uppercase tracking-widest text-brand-300 mb-3">100% free stack</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 leading-tight">
            $0 to run the MVP. Only cost: a $25 Play Store fee.
          </h2>
          <p className="text-ink-300 mb-8 max-w-2xl">
            Every layer is on a generous free tier so the project can stay
            community-funded from day one.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              ["Mobile app", "React Native"],
              ["AI matching", "Gemini 1.5 Flash"],
              ["Database & auth", "Supabase"],
              ["Backend hosting", "Render"],
              ["Push notifications", "Firebase FCM"],
              ["Maps", "OpenStreetMap"],
              ["SMS fallback", "WhatsApp Business"],
              ["Landing page", "Vercel"],
              ["CI/CD", "GitHub Actions"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-xl bg-white/[0.03] ring-1 ring-white/5 px-4 py-3 flex items-center justify-between"
              >
                <span className="text-ink-400">{k}</span>
                <span className="text-white font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-brand-300 mb-4">About</p>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              A Kenyan-built tool for the first hour.
            </h2>
          </div>
          <div className="space-y-5 text-ink-300 leading-relaxed">
            <p>
              SafeZone is an independent project started in Kenya, built around one belief: when a
              child goes missing, a calm, coordinated neighbourhood — working with the police, not
              instead of them — saves time that matters. We&apos;re building in the open and actively
              looking for feedback, partners, and people who care about child safety.
            </p>
            <p>
              This is an early MVP preview. It is not yet affiliated with any NGO or government body.
              Reach us at{" "}
              <a href="mailto:hello@safezone.app" className="text-brand-300 underline underline-offset-2">
                hello@safezone.app
              </a>{" "}
              — for partnerships, <a href="mailto:partners@safezone.app" className="text-brand-300 underline underline-offset-2">partners@safezone.app</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            Take it for a spin.
          </h2>
          <p className="mt-4 text-ink-300 text-lg">
            Walk through a full missing-child alert in under 60 seconds. Tell us what
            you'd change.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-400 transition-colors px-6 py-3.5 font-medium text-white glow"
            >
              Start the demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition-colors px-6 py-3.5 font-medium text-white"
            >
              Become a volunteer
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}


function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-ink-950 p-6">
      <div className="text-3xl md:text-4xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-ink-400">{label}</div>
    </div>
  );
}

function Step({
  n,
  icon,
  title,
  body,
}: {
  n: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] ring-1 ring-white/10 p-7 hover:ring-brand-500/30 transition">
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 ring-1 ring-brand-500/30 text-brand-300">
          {icon}
        </span>
        <span className="font-mono text-xs text-ink-500">{n}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-ink-300 leading-relaxed">{body}</p>
    </div>
  );
}

function Trust({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl ring-1 ring-white/10 bg-white/[0.02] p-6">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 ring-1 ring-brand-500/30 text-brand-300 mb-4">
        {icon}
      </span>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-ink-300 leading-relaxed">{body}</p>
    </div>
  );
}
