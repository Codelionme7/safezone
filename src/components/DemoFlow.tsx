"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  MapPin,
  Phone as PhoneIcon,
  Radio,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Home,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { mockMatch, AiMatchResult } from "@/lib/mockAiMatcher";
import {
  DemoChrome,
  Phone,
  PrimaryButton,
  SecondaryButton,
  SectionTitle,
} from "./DemoUI";
import Link from "next/link";

type Step =
  | "intro"
  | "signup"
  | "verify"
  | "child"
  | "trigger"
  | "broadcast"
  | "zones"
  | "sighting"
  | "match"
  | "resolved";

const STEP_ORDER: Step[] = [
  "intro",
  "signup",
  "verify",
  "child",
  "trigger",
  "broadcast",
  "zones",
  "sighting",
  "match",
  "resolved",
];

const TOTAL_STEPS = STEP_ORDER.length - 1; // intro doesn't count visually

type ChildProfile = {
  name: string;
  age: number;
  description: string;
  clothing: string;
  lastSeenLocation: string;
};

export default function DemoFlow() {
  const [step, setStep] = useState<Step>("intro");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [child, setChild] = useState<ChildProfile>({
    name: "Amara",
    age: 7,
    description: "short curly black hair, brown eyes, small scar on left cheek",
    clothing: "yellow t-shirt with a giraffe, blue denim shorts, white sneakers",
    lastSeenLocation: "Makindye market, near the fruit stalls",
  });
  const [sighting, setSighting] = useState(
    "Just saw a little girl about 7 walking alone near the bus stop on Salaama Road. Yellow shirt with what looked like a giraffe on it, denim shorts. Brown skin, curly hair.",
  );
  const [matchResult, setMatchResult] = useState<AiMatchResult | null>(null);
  const [matching, setMatching] = useState(false);

  const stepIndex = useMemo(() => STEP_ORDER.indexOf(step), [step]);
  const visibleStep = Math.max(0, stepIndex); // 0 for intro

  const go = (s: Step) => setStep(s);

  function runMatch() {
    setMatching(true);
    setTimeout(() => {
      const result = mockMatch(child, sighting);
      setMatchResult(result);
      setMatching(false);
    }, 1400);
  }

  function reset() {
    setStep("intro");
    setMatchResult(null);
    setPhone("");
    setOtp("");
  }

  return (
    <DemoChrome step={visibleStep} total={TOTAL_STEPS}>
      {step === "intro" && <Intro onStart={() => go("signup")} />}

      {step === "signup" && (
        <Signup
          phone={phone}
          setPhone={setPhone}
          onNext={() => go("verify")}
        />
      )}

      {step === "verify" && (
        <Verify
          phone={phone}
          otp={otp}
          setOtp={setOtp}
          onNext={() => go("child")}
          onBack={() => go("signup")}
        />
      )}

      {step === "child" && (
        <ChildSetup
          child={child}
          setChild={setChild}
          onNext={() => go("trigger")}
        />
      )}

      {step === "trigger" && (
        <Trigger
          child={child}
          onTrigger={() => go("broadcast")}
        />
      )}

      {step === "broadcast" && (
        <Broadcast
          child={child}
          onNext={() => go("zones")}
        />
      )}

      {step === "zones" && (
        <Zones onNext={() => go("sighting")} />
      )}

      {step === "sighting" && (
        <SightingStep
          sighting={sighting}
          setSighting={setSighting}
          matching={matching}
          onSubmit={() => {
            runMatch();
            go("match");
          }}
        />
      )}

      {step === "match" && (
        <Match
          result={matchResult}
          matching={matching}
          onNext={() => go("resolved")}
          onReplay={() => {
            setMatchResult(null);
            go("sighting");
          }}
        />
      )}

      {step === "resolved" && (
        <Resolved childName={child.name} onReset={reset} />
      )}
    </DemoChrome>
  );
}

/* ───────────────────── Steps ───────────────────── */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center max-w-2xl mx-auto pt-6">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/15 ring-1 ring-brand-500/40 mb-6">
        <Sparkles className="h-6 w-6 text-brand-300" />
      </span>
      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
        Walk through a real alert.
      </h1>
      <p className="mt-4 text-ink-300 text-lg leading-relaxed">
        You'll play three roles in about 60 seconds: a worried parent, a
        responding neighbour, and the system itself. Nothing here is real — it's
        a faithful mock of the actual product.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <PrimaryButton onClick={onStart}>
          Start the demo <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
        <Link href="/">
          <SecondaryButton>Not now</SecondaryButton>
        </Link>
      </div>

      <div className="mt-14 grid sm:grid-cols-3 gap-4 text-left">
        {[
          { icon: <UserCheck className="h-4 w-4" />, label: "Sign up & register a child" },
          { icon: <Radio className="h-4 w-4" />, label: "Trigger the community alert" },
          { icon: <Sparkles className="h-4 w-4" />, label: "Submit & AI-match a sighting" },
        ].map((it) => (
          <div
            key={it.label}
            className="rounded-xl ring-1 ring-white/10 bg-white/[0.02] p-4 text-sm"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-500/10 ring-1 ring-brand-500/30 text-brand-300 mb-3">
              {it.icon}
            </span>
            <div className="text-ink-200">{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Signup({
  phone,
  setPhone,
  onNext,
}: {
  phone: string;
  setPhone: (s: string) => void;
  onNext: () => void;
}) {
  const valid = phone.trim().length >= 9;
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <SectionTitle
          eyebrow="Step 1 · As the parent"
          title="Sign up with your phone."
          body="SafeZone never stores your full phone number — only a hash and the last 4 digits. You'll be verified as a real human before you can post anything."
        />
        <div className="space-y-4 max-w-md">
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-ink-400">Phone number</span>
            <div className="mt-1 flex rounded-xl ring-1 ring-white/10 bg-white/[0.02] focus-within:ring-brand-500/40 overflow-hidden">
              <span className="px-3 py-3 text-ink-400 text-sm bg-white/[0.03]">+256</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="700 000 000"
                className="flex-1 bg-transparent px-3 py-3 text-white placeholder:text-ink-500 outline-none"
              />
            </div>
          </label>
          <PrimaryButton onClick={onNext} disabled={!valid}>
            Send verification code <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>

      <Phone title="Sign up">
        <div className="space-y-5 py-3">
          <div className="text-white font-semibold text-lg">Join your neighbourhood watch</div>
          <p className="text-xs text-ink-400 leading-relaxed">
            Verified neighbours can respond to missing-child alerts within 2 km of your home.
          </p>
          <div className="rounded-xl ring-1 ring-white/10 px-3 py-2.5 flex items-center gap-2 text-sm">
            <PhoneIcon className="h-4 w-4 text-ink-400" />
            <span className="text-ink-300">+256 {phone || "···"}</span>
          </div>
          <button
            disabled={!valid}
            onClick={onNext}
            className="w-full rounded-xl bg-brand-500 disabled:bg-ink-700 disabled:text-ink-500 text-white py-2.5 text-sm font-medium"
          >
            Continue
          </button>
          <p className="text-[10px] text-ink-500 leading-relaxed">
            By continuing you agree to our community guidelines. We never store your full number.
          </p>
        </div>
      </Phone>
    </div>
  );
}

function Verify({
  phone,
  otp,
  setOtp,
  onNext,
  onBack,
}: {
  phone: string;
  otp: string;
  setOtp: (s: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const valid = otp.length === 6;
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <SectionTitle
          eyebrow="Step 2 · As the parent"
          title="Verify it's really you."
          body="One-time codes are throttled and expire fast. We just want to keep bad actors off the network. For the demo, any 6 digits work."
        />
        <div className="space-y-4 max-w-md">
          <label className="block">
            <span className="text-xs uppercase tracking-widest text-ink-400">6-digit code</span>
            <input
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              className="mt-1 w-full rounded-xl ring-1 ring-white/10 bg-white/[0.02] focus:ring-brand-500/40 px-4 py-3 font-mono text-2xl tracking-[0.5em] text-white placeholder:text-ink-600 outline-none"
            />
          </label>
          <div className="flex gap-3">
            <SecondaryButton onClick={onBack}>Back</SecondaryButton>
            <PrimaryButton onClick={onNext} disabled={!valid}>
              Verify <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          </div>
        </div>
      </div>

      <Phone title="Verify">
        <div className="space-y-4 py-3 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 ring-1 ring-brand-500/40">
            <PhoneIcon className="h-5 w-5 text-brand-300" />
          </span>
          <div className="text-white font-semibold">Check your messages</div>
          <p className="text-xs text-ink-400 leading-relaxed">
            We sent a code to +256 {phone || "···"}
          </p>
          <div className="mt-3 mx-auto rounded-lg bg-white/[0.03] ring-1 ring-white/5 px-3 py-2 text-xs text-ink-300 max-w-[220px]">
            SafeZone: <span className="font-mono">874 219</span> — never share this.
          </div>
        </div>
      </Phone>
    </div>
  );
}

function ChildSetup({
  child,
  setChild,
  onNext,
}: {
  child: ChildProfile;
  setChild: (c: ChildProfile) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <SectionTitle
        eyebrow="Step 3 · As the parent"
        title="Add your child's profile."
        body="Profiles stay private until you trigger an alert. Photos never leave your device — only a perceptual hash is stored. You can edit any field below to see how the AI matcher responds later."
      />

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Child's first name">
          <input
            value={child.name}
            onChange={(e) => setChild({ ...child, name: e.target.value })}
            className="w-full bg-transparent text-white outline-none"
          />
        </Field>
        <Field label="Age">
          <input
            type="number"
            min={1}
            max={17}
            value={child.age}
            onChange={(e) =>
              setChild({ ...child, age: Math.max(1, Math.min(17, parseInt(e.target.value || "0", 10))) })
            }
            className="w-full bg-transparent text-white outline-none"
          />
        </Field>
        <Field label="Physical description" full>
          <textarea
            rows={2}
            value={child.description}
            onChange={(e) => setChild({ ...child, description: e.target.value })}
            className="w-full bg-transparent text-white outline-none resize-none"
          />
        </Field>
        <Field label="What they were wearing today" full>
          <textarea
            rows={2}
            value={child.clothing}
            onChange={(e) => setChild({ ...child, clothing: e.target.value })}
            className="w-full bg-transparent text-white outline-none resize-none"
          />
        </Field>
        <Field label="Last seen location" full>
          <input
            value={child.lastSeenLocation}
            onChange={(e) => setChild({ ...child, lastSeenLocation: e.target.value })}
            className="w-full bg-transparent text-white outline-none"
          />
        </Field>
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={onNext}>
          Save profile <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block rounded-xl ring-1 ring-white/10 bg-white/[0.02] px-4 py-3 focus-within:ring-brand-500/40 ${full ? "md:col-span-2" : ""}`}>
      <span className="block text-[10px] uppercase tracking-widest text-ink-400 mb-1">{label}</span>
      {children}
    </label>
  );
}

function Trigger({
  child,
  onTrigger,
}: {
  child: ChildProfile;
  onTrigger: () => void;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <SectionTitle
          eyebrow="Step 4 · The emergency"
          title="Something's wrong. Trigger the alert."
          body="One tap fires a high-priority push to every verified neighbour within 2 km, notifies the nearest police stations, and starts the search-zone assigner."
        />
        <div className="rounded-2xl ring-1 ring-white/10 bg-white/[0.02] p-5 mb-6">
          <div className="text-xs uppercase tracking-widest text-ink-400 mb-2">Alerting about</div>
          <div className="text-xl font-semibold text-white">{child.name}, {child.age}</div>
          <div className="text-sm text-ink-300 mt-1">Last seen: {child.lastSeenLocation}</div>
        </div>
        <button
          onClick={onTrigger}
          className="group w-full md:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-alert-500 hover:bg-alert-400 text-white px-7 py-4 font-semibold text-lg transition-colors glow-alert"
        >
          <Bell className="h-5 w-5 group-hover:animate-bounce" />
          Trigger missing-child alert
        </button>
        <p className="mt-3 text-xs text-ink-500">
          Rate-limited to 1 alert per parent per 4 hours. Logged permanently for accountability.
        </p>
      </div>

      <Phone title="Trigger alert">
        <div className="space-y-4 py-3">
          <div className="rounded-xl bg-alert-500/10 ring-1 ring-alert-500/30 px-3 py-3">
            <div className="text-[10px] uppercase tracking-widest text-alert-300">High priority</div>
            <div className="mt-1 text-sm text-white font-medium">
              You're about to broadcast {child.name}'s details to ~{Math.floor(40 + Math.random() * 30)} verified neighbours and 3 police stations.
            </div>
          </div>
          <button
            onClick={onTrigger}
            className="w-full rounded-xl bg-alert-500 text-white py-3 font-semibold text-sm"
          >
            Send alert now
          </button>
          <button className="w-full rounded-xl ring-1 ring-white/10 text-ink-300 py-2.5 text-sm">
            Cancel
          </button>
        </div>
      </Phone>
    </div>
  );
}

function Broadcast({
  child,
  onNext,
}: {
  child: ChildProfile;
  onNext: () => void;
}) {
  return (
    <div>
      <SectionTitle
        eyebrow="Step 5 · Broadcasting"
        title="The alert is out."
        body={`Push notifications fired in parallel. Volunteers are seeing ${child.name}'s last-known location on their phones right now.`}
      />

      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3 rounded-2xl ring-1 ring-white/10 bg-white/[0.02] overflow-hidden">
          <MapMock child={child} />
        </div>
        <div className="md:col-span-2 space-y-3">
          <BroadcastFeed />
          <PrimaryButton onClick={onNext} className="w-full">
            See volunteer view <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function MapMock({ child }: { child: ChildProfile }) {
  // Fake "map" rendered with CSS — represents Makindye area
  const dots = useMemo(() => {
    const out: { x: number; y: number; delay: number }[] = [];
    for (let i = 0; i < 18; i++) {
      out.push({
        x: 20 + Math.random() * 60,
        y: 15 + Math.random() * 70,
        delay: Math.random() * 2,
      });
    }
    return out;
  }, []);

  return (
    <div className="relative h-[360px] bg-[radial-gradient(circle_at_50%_50%,_#1a1c28_0%,_#0a0b10_70%)]">
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* roads */}
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="0" y1="35" x2="100" y2="55" stroke="#4d4f5e" strokeWidth="0.4" />
        <line x1="15" y1="0" x2="60" y2="100" stroke="#4d4f5e" strokeWidth="0.3" />
        <line x1="100" y1="20" x2="40" y2="100" stroke="#4d4f5e" strokeWidth="0.3" />
        <line x1="0" y1="75" x2="100" y2="80" stroke="#4d4f5e" strokeWidth="0.25" />
      </svg>

      {/* alert radius */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="h-56 w-56 rounded-full ring-2 ring-alert-500/40 bg-alert-500/5" />
          <div className="absolute inset-0 rounded-full ring-2 ring-alert-500/30 animate-pulse-ring" />
          <div className="absolute inset-0 rounded-full ring-2 ring-alert-500/20 animate-pulse-ring" style={{ animationDelay: "0.8s" }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <MapPin className="h-6 w-6 text-alert-300 drop-shadow-[0_0_8px_rgba(240,68,56,0.8)]" />
            <span className="mt-1 text-[10px] text-white bg-alert-500/30 backdrop-blur px-2 py-0.5 rounded-md ring-1 ring-alert-500/40 whitespace-nowrap max-w-[160px] truncate">
              {child.lastSeenLocation}
            </span>
          </div>
        </div>
      </div>

      {/* volunteers */}
      {dots.map((d, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${d.x}%`, top: `${d.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <div className="relative">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <div
              className="absolute inset-0 rounded-full bg-emerald-400/40 animate-pulse-ring"
              style={{ animationDelay: `${d.delay}s` }}
            />
          </div>
        </div>
      ))}

      <div className="absolute bottom-3 left-3 text-[10px] text-ink-400 font-mono bg-ink-950/80 ring-1 ring-white/10 px-2 py-1 rounded">
        ◯ alert radius · ● verified neighbours
      </div>
    </div>
  );
}

function BroadcastFeed() {
  const events = [
    { t: "0s", text: "Alert created", icon: <Bell className="h-3.5 w-3.5" /> },
    { t: "2s", text: "Push sent to 67 neighbours", icon: <Radio className="h-3.5 w-3.5" /> },
    { t: "3s", text: "Makindye Police Station notified", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
    { t: "4s", text: "Katwe Police Station notified", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
    { t: "6s", text: "12 volunteers responded", icon: <Users className="h-3.5 w-3.5" /> },
    { t: "9s", text: "4 search zones generated", icon: <MapPin className="h-3.5 w-3.5" /> },
  ];
  return (
    <div className="rounded-2xl ring-1 ring-white/10 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-widest text-ink-400 mb-3">Activity feed</div>
      <ul className="space-y-2.5">
        {events.map((e, i) => (
          <li
            key={i}
            className="flex items-center gap-3 text-sm animate-slide-up"
            style={{ animationDelay: `${i * 120}ms`, animationFillMode: "backwards" }}
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-500/10 ring-1 ring-brand-500/30 text-brand-300">
              {e.icon}
            </span>
            <span className="text-white">{e.text}</span>
            <span className="ml-auto text-[10px] font-mono text-ink-500">+{e.t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Zones({ onNext }: { onNext: () => void }) {
  const [accepted, setAccepted] = useState<string | null>(null);

  const zones = [
    { id: "A", label: "Salaama Road — north", vols: 3, status: "open" },
    { id: "B", label: "Market lane & bus stop", vols: 2, status: "open" },
    { id: "C", label: "Riverside path", vols: 5, status: "open" },
    { id: "D", label: "School & playground", vols: 1, status: "open" },
  ];

  return (
    <div>
      <SectionTitle
        eyebrow="Step 6 · As a responding neighbour"
        title="Claim a search zone."
        body="The area around the last-known location is auto-split into zones so coverage is complete and no street gets searched twice. Pick one — the others will be claimed by other volunteers."
      />

      <div className="grid md:grid-cols-2 gap-4">
        {zones.map((z) => {
          const claimed = accepted === z.id;
          const otherClaimed = accepted && !claimed;
          return (
            <button
              key={z.id}
              onClick={() => setAccepted(z.id)}
              disabled={!!accepted}
              className={`text-left rounded-2xl ring-1 p-5 transition-all ${
                claimed
                  ? "ring-brand-500/60 bg-brand-500/10"
                  : otherClaimed
                  ? "ring-white/5 bg-white/[0.01] opacity-40 cursor-not-allowed"
                  : "ring-white/10 bg-white/[0.03] hover:ring-brand-500/40 hover:bg-white/[0.05] cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md font-mono text-sm ${
                  claimed ? "bg-brand-500 text-white" : "bg-white/5 ring-1 ring-white/10 text-ink-300"
                }`}>
                  {z.id}
                </span>
                {claimed && (
                  <span className="inline-flex items-center gap-1 text-xs text-brand-300">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Claimed by you
                  </span>
                )}
              </div>
              <div className="text-white font-medium">{z.label}</div>
              <div className="mt-1 text-xs text-ink-400">
                {z.vols} {z.vols === 1 ? "other volunteer" : "other volunteers"} en route
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <PrimaryButton onClick={onNext} disabled={!accepted}>
          Head to your zone <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
        {accepted && (
          <span className="text-sm text-ink-400">
            Navigation opened. You'll mark the zone &ldquo;cleared&rdquo; once you've finished searching.
          </span>
        )}
      </div>
    </div>
  );
}

function SightingStep({
  sighting,
  setSighting,
  matching,
  onSubmit,
}: {
  sighting: string;
  setSighting: (s: string) => void;
  matching: boolean;
  onSubmit: () => void;
}) {
  return (
    <div>
      <SectionTitle
        eyebrow="Step 7 · As a responding neighbour"
        title="You think you spotted them. Report it."
        body="Type what you actually saw — clothing, height, where, what they were doing. The AI compares this to the child's profile and decides whether to escalate to police automatically."
      />

      <div className="grid md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <textarea
            value={sighting}
            onChange={(e) => setSighting(e.target.value)}
            rows={8}
            className="w-full rounded-2xl ring-1 ring-white/10 bg-white/[0.02] focus:ring-brand-500/40 px-5 py-4 text-white outline-none leading-relaxed"
            placeholder="A girl about 7 in a yellow shirt, walking alone near the bus stop on Salaama Road..."
          />
          <div className="mt-2 text-xs text-ink-500">
            {sighting.length} characters · 10–500 allowed
          </div>
          <div className="mt-5 flex gap-3">
            <PrimaryButton
              onClick={onSubmit}
              disabled={sighting.length < 10 || matching}
            >
              {matching ? "Matching…" : "Run AI match"} <Sparkles className="h-4 w-4" />
            </PrimaryButton>
          </div>
        </div>

        <div className="rounded-2xl ring-1 ring-white/10 bg-white/[0.02] p-5 h-fit">
          <div className="text-[10px] uppercase tracking-widest text-ink-400 mb-2">Tips that improve matching</div>
          <ul className="space-y-2 text-sm text-ink-300">
            <li className="flex gap-2"><span className="text-brand-300">·</span> Mention an approximate age</li>
            <li className="flex gap-2"><span className="text-brand-300">·</span> Describe specific clothing details</li>
            <li className="flex gap-2"><span className="text-brand-300">·</span> Note any distinguishing features</li>
            <li className="flex gap-2"><span className="text-brand-300">·</span> Include the exact street or landmark</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Match({
  result,
  matching,
  onNext,
  onReplay,
}: {
  result: AiMatchResult | null;
  matching: boolean;
  onNext: () => void;
  onReplay: () => void;
}) {
  if (matching || !result) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/15 ring-1 ring-brand-500/40 mb-6">
          <Sparkles className="h-7 w-7 text-brand-300 animate-pulse" />
        </div>
        <h2 className="text-2xl font-semibold">Comparing the sighting to the child&apos;s profile…</h2>
        <p className="mt-2 text-ink-400">Gemini 1.5 Flash is scoring overlap on age, clothing, features, and location.</p>
      </div>
    );
  }

  const tone =
    result.score >= 85
      ? "emerald"
      : result.score >= 70
      ? "amber"
      : result.score >= 40
      ? "sky"
      : "ink";

  const toneClass = {
    emerald: "text-emerald-300 ring-emerald-400/30 bg-emerald-400/10",
    amber: "text-amber-300 ring-amber-400/30 bg-amber-400/10",
    sky: "text-sky-300 ring-sky-400/30 bg-sky-400/10",
    ink: "text-ink-300 ring-white/10 bg-white/[0.02]",
  }[tone];

  return (
    <div>
      <SectionTitle
        eyebrow="Step 8 · AI match result"
        title="Here's what the AI saw."
        body="Confidence is a 0–100 score. Anything ≥ 70 auto-notifies the nearest police stations with the sighting attached."
      />

      <div className="grid md:grid-cols-3 gap-5">
        <div className={`rounded-2xl ring-1 ${toneClass} p-6 text-center`}>
          <div className="text-[10px] uppercase tracking-widest opacity-70">Match confidence</div>
          <div className="mt-2 font-semibold text-5xl tracking-tight tabular-nums">
            {result.score}
            <span className="text-2xl opacity-60">/100</span>
          </div>
          <div className="mt-3 text-xs uppercase tracking-widest opacity-80">
            {result.score >= 85 ? "Strong match" : result.score >= 70 ? "Likely match" : result.score >= 40 ? "Possible" : "Unlikely"}
          </div>
        </div>

        <div className="md:col-span-2 rounded-2xl ring-1 ring-white/10 bg-white/[0.02] p-6">
          <div className="text-[10px] uppercase tracking-widest text-ink-400 mb-2">Reasoning</div>
          <p className="text-white leading-relaxed">{result.reasoning}</p>

          {result.keyMatches.length > 0 && (
            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-widest text-ink-400 mb-2">Key matches</div>
              <div className="flex flex-wrap gap-2">
                {result.keyMatches.map((m) => (
                  <span
                    key={m}
                    className="text-xs px-2.5 py-1 rounded-full bg-brand-500/10 ring-1 ring-brand-500/30 text-brand-200"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 flex items-center gap-2 text-sm">
            {result.shouldNotifyPolice ? (
              <>
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span className="text-emerald-300 font-medium">Auto-notifying nearest police stations.</span>
              </>
            ) : (
              <>
                <Bell className="h-4 w-4 text-ink-400" />
                <span className="text-ink-300">Logged. Not escalating yet — parents and admins notified.</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl ring-1 ring-amber-400/25 bg-amber-400/[0.06] px-4 py-3 flex gap-3 items-start">
        <AlertTriangle className="h-4 w-4 text-amber-300 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-100/90 leading-relaxed">
          <span className="font-semibold">AI is assistive only.</span> This score is a signal, not a
          decision. Police make the final identification. Never approach a child based on an AI match
          alone — report and let the authorities handle recovery. Face- and text-matching can be less
          accurate for African faces and local languages; treat low and high scores with care.
        </p>
      </div>

      <div className="mt-8 flex gap-3">
        <PrimaryButton onClick={onNext}>
          See resolution <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
        <SecondaryButton onClick={onReplay}>
          <RotateCcw className="h-4 w-4" /> Try a different sighting
        </SecondaryButton>
      </div>
    </div>
  );
}

function Resolved({ childName, onReset }: { childName: string; onReset: () => void }) {
  return (
    <div className="text-center max-w-2xl mx-auto py-10">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-400/40 mb-6">
        <CheckCircle2 className="h-8 w-8 text-emerald-300" />
      </div>
      <h2 className="text-4xl font-semibold tracking-tight">{childName} is safe.</h2>
      <p className="mt-4 text-ink-300 text-lg leading-relaxed">
        Officers from Makindye Police Station picked up {childName} near the bus
        stop after the AI-matched sighting. The alert is closed and every
        responding volunteer has been notified.
      </p>

      <div className="mt-10 grid sm:grid-cols-3 gap-3 text-left">
        <Tile k="Total time" v="14 min" />
        <Tile k="Volunteers active" v="23" />
        <Tile k="Police stations engaged" v="2" />
      </div>

      <div className="mt-12 rounded-2xl ring-1 ring-white/10 bg-white/[0.02] p-6 text-left">
        <h3 className="text-lg font-semibold text-white">We want your feedback.</h3>
        <p className="mt-2 text-sm text-ink-300 leading-relaxed">
          You just walked through every core flow. What worked? What felt wrong?
          What's missing? Open an issue on GitHub or send a note — every piece
          of feedback shapes the next version.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <SecondaryButton onClick={onReset}>
            <RotateCcw className="h-4 w-4" /> Run the demo again
          </SecondaryButton>
          <Link href="/">
            <SecondaryButton>
              <Home className="h-4 w-4" /> Back to site
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Tile({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl ring-1 ring-white/10 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-widest text-ink-400">{k}</div>
      <div className="mt-1 text-2xl font-semibold text-white">{v}</div>
    </div>
  );
}
