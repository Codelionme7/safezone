"use client";

import { useState } from "react";
import {
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Languages,
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
  Lock,
  PhoneCall,
} from "lucide-react";
import { SiteNav, SiteFooter } from "./SiteFrame";
import Link from "next/link";

const LANGUAGES = ["English", "Swahili", "Kikuyu", "Luo", "Luhya", "Kalenjin", "Maa (Maasai)", "Somali"];
const AREAS = [
  "Nairobi — Eastlands",
  "Nairobi — Westlands",
  "Nairobi — CBD",
  "Kiambu",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
];

export default function VolunteerSignup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [langs, setLangs] = useState<string[]>(["English", "Swahili"]);
  const [areas, setAreas] = useState<string[]>([]);
  const [ngo, setNgo] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const valid =
    name.trim().length > 1 &&
    phone.replace(/\D/g, "").length >= 9 &&
    langs.length > 0 &&
    areas.length > 0 &&
    accepted;

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  return (
    <main className="relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[800px] rounded-full bg-brand-600/15 blur-[160px] pointer-events-none" />

      <SiteNav />

      {/* Hero */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-300 mb-5">
          <HeartHandshake className="h-4 w-4" />
          Join the network
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
          Be the reason a child gets home.
        </h1>
        <p className="mt-5 text-lg text-ink-300 max-w-2xl leading-relaxed">
          SafeZone volunteers are verified neighbours who respond when a child goes missing nearby.
          You don&apos;t need a uniform or training — just a phone, your local knowledge, and a
          willingness to help in the first critical hour.
        </p>
      </section>

      {/* What volunteers do */}
      <section className="relative max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <InfoCard
            icon={<MapPin className="h-5 w-5" />}
            title="Search a zone"
            body="When an alert fires near you, claim a search zone. No overlap with other volunteers — full coverage, fast."
          />
          <InfoCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Report sightings"
            body="See something? Report it in your own language. AI checks it against the child's profile and alerts police if it's a strong match."
          />
          <InfoCard
            icon={<HeartHandshake className="h-5 w-5" />}
            title="Never act alone"
            body="Your job is to report — not to approach. Police handle physical recovery. You keep everyone, including yourself, safe."
          />
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {submitted ? (
              <SuccessState name={name} />
            ) : (
              <div className="rounded-3xl ring-1 ring-white/10 bg-white/[0.02] p-6 md:p-8">
                <h2 className="text-2xl font-semibold mb-1">Volunteer sign-up</h2>
                <p className="text-sm text-ink-400 mb-4">
                  Takes a minute. You&apos;ll be verified by an NGO coordinator before you can respond
                  to live alerts.
                </p>
                <div className="mb-6 flex items-start gap-2.5 rounded-xl ring-1 ring-alert-400/25 bg-alert-400/[0.06] px-4 py-3">
                  <PhoneCall className="h-4 w-4 text-alert-300 mt-0.5 shrink-0" />
                  <p className="text-xs text-ink-200 leading-relaxed">
                    <span className="font-semibold text-white">In an emergency, call 999 or 112.</span>{" "}
                    SafeZone supports the community response — it never replaces the police.
                  </p>
                </div>

                <div className="space-y-5">
                  <FormRow label="Full name">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Amani Otieno"
                      className="w-full bg-transparent text-white outline-none placeholder:text-ink-600"
                    />
                  </FormRow>

                  <FormRow label="Phone number">
                    <div className="flex items-center gap-2">
                      <span className="text-ink-400 text-sm">+254</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        placeholder="712 345 678"
                        className="flex-1 bg-transparent text-white outline-none placeholder:text-ink-600"
                      />
                    </div>
                  </FormRow>

                  <div>
                    <Label icon={<Languages className="h-3.5 w-3.5" />}>Languages you speak</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {LANGUAGES.map((l) => (
                        <Chip key={l} active={langs.includes(l)} onClick={() => toggle(langs, setLangs, l)}>
                          {l}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label icon={<MapPin className="h-3.5 w-3.5" />}>Areas you can respond in</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {AREAS.map((a) => (
                        <Chip key={a} active={areas.includes(a)} onClick={() => toggle(areas, setAreas, a)}>
                          {a}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <FormRow label="NGO / organisation (optional)">
                    <input
                      value={ngo}
                      onChange={(e) => setNgo(e.target.value)}
                      placeholder="e.g. Kenya Red Cross — leave blank if none"
                      className="w-full bg-transparent text-white outline-none placeholder:text-ink-600"
                    />
                  </FormRow>

                  <label className="flex items-start gap-3 cursor-pointer rounded-xl ring-1 ring-white/10 bg-white/[0.02] p-4">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(e) => setAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 accent-brand-500"
                    />
                    <span className="text-sm text-ink-300 leading-relaxed">
                      I agree to the{" "}
                      <Link href="/safeguarding" className="text-brand-300 underline underline-offset-2">
                        volunteer code of conduct
                      </Link>
                      . I will report sightings and never approach a child directly — physical recovery
                      is for the police.
                    </span>
                  </label>

                  <button
                    onClick={() => valid && setSubmitted(true)}
                    disabled={!valid}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-ink-700 disabled:text-ink-500 disabled:cursor-not-allowed transition-colors px-6 py-3.5 font-medium text-white glow w-full md:w-auto"
                  >
                    Submit application <ArrowRight className="h-4 w-4" />
                  </button>
                  {!valid && (
                    <p className="text-xs text-ink-500">
                      Fill in your name, phone, at least one language, one area, and accept the code of
                      conduct.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl ring-1 ring-brand-500/20 bg-brand-500/[0.04] p-6">
              <div className="text-xs uppercase tracking-widest text-brand-300 mb-2">For NGOs</div>
              <h3 className="text-lg font-semibold text-white">Partner with SafeZone</h3>
              <p className="mt-2 text-sm text-ink-300 leading-relaxed">
                We want to work with organisations that already coordinate volunteers — such as the
                Kenya Red Cross, activist networks, or children&apos;s homes. The plan: your team gets a
                verified, geo-targeted alert system at no cost, you approve your own volunteers, we
                handle the technology. We&apos;re not partnered with anyone yet — that&apos;s exactly who
                we&apos;re looking to talk to.
              </p>
              <a
                href="mailto:partners@safezone.app?subject=NGO%20Partnership%20Interest"
                className="mt-4 inline-flex items-center gap-2 text-sm text-brand-300 hover:text-brand-200 transition-colors"
              >
                Talk to us about a pilot <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-2xl ring-1 ring-white/10 bg-white/[0.02] p-6 space-y-4">
              <SideStat icon={<Lock className="h-4 w-4" />} title="Your data is protected" body="Phone numbers are hashed. We never sell or share your information." />
              <SideStat icon={<Users className="h-4 w-4" />} title="Verified members only" body="Every volunteer is checked by an NGO coordinator before going live." />
              <SideStat icon={<Clock className="h-4 w-4" />} title="Respond on your terms" body="You only get alerts for the areas you chose. Help when you can." />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SuccessState({ name }: { name: string }) {
  return (
    <div className="rounded-3xl ring-1 ring-brand-500/30 bg-brand-500/[0.06] p-8 md:p-10 animate-fade-in">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/15 ring-1 ring-brand-500/40 mb-5">
        <CheckCircle2 className="h-7 w-7 text-brand-300" />
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold">
        Thank you{name ? `, ${name.split(" ")[0]}` : ""}.
      </h2>
      <p className="mt-3 text-ink-300 leading-relaxed max-w-lg">
        Your application is in. A coordinator will verify you and you&apos;ll get a confirmation on your
        phone. Once verified, you&apos;ll receive alerts for the areas you selected.
      </p>
      <p className="mt-3 text-xs text-ink-500">
        In an emergency, always call 999 or 112 — SafeZone never replaces the police.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-400 transition-colors px-5 py-3 font-medium text-white"
        >
          See how a response works <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition-colors px-5 py-3 font-medium text-white"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
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

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-xl ring-1 ring-white/10 bg-white/[0.02] px-4 py-3 focus-within:ring-brand-500/40">
      <span className="block text-[10px] uppercase tracking-widest text-ink-400 mb-1">{label}</span>
      {children}
    </label>
  );
}

function Label({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-ink-400">
      {icon}
      {children}
    </span>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-sm px-3 py-1.5 rounded-full ring-1 transition-colors ${
        active
          ? "bg-brand-500/15 ring-brand-500/50 text-brand-200"
          : "bg-white/[0.02] ring-white/10 text-ink-300 hover:ring-white/20"
      }`}
    >
      {children}
    </button>
  );
}

function SideStat({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-3">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 text-ink-300">
        {icon}
      </span>
      <div>
        <div className="text-sm font-medium text-white">{title}</div>
        <div className="text-xs text-ink-400 leading-relaxed">{body}</div>
      </div>
    </div>
  );
}
