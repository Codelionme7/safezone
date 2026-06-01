"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Bell, ArrowLeft, PhoneCall } from "lucide-react";

export function DemoChrome({ children, step, total }: { children: ReactNode; step: number; total: number }) {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[800px] rounded-full bg-brand-600/15 blur-[160px] pointer-events-none" />

      <header className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-5 sm:pt-6 flex items-center justify-between gap-3">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink-300 hover:text-white transition-colors shrink-0">
          <ArrowLeft className="h-4 w-4" />
          <span className="sm:hidden">Back</span>
          <span className="hidden sm:inline">Back to site</span>
        </Link>
        <div className="hidden sm:inline-flex items-center gap-2 text-sm text-ink-300">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-500/15 ring-1 ring-brand-500/30">
            <Bell className="h-3.5 w-3.5 text-brand-300" />
          </span>
          <span className="font-medium text-white">SafeZone</span>
          <span className="text-ink-500">/ demo</span>
        </div>
        <div className="text-xs text-ink-400 font-mono shrink-0">
          Step {step} of {total}
        </div>
      </header>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-3">
        <div className="h-1 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-brand-300 transition-all duration-500"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-3">
        <div className="flex items-center gap-2 text-[11px] text-ink-300 bg-alert-400/[0.06] ring-1 ring-alert-400/20 rounded-lg px-3 py-1.5">
          <PhoneCall className="h-3.5 w-3.5 shrink-0 text-alert-300" />
          <span>
            Interactive demo. In a real emergency, call{" "}
            <span className="font-semibold text-white">999 or 112</span>.
          </span>
        </div>
      </div>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 animate-fade-in">{children}</main>
    </div>
  );
}

export function Phone({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="mx-auto max-w-[360px] rounded-[36px] ring-1 ring-white/10 bg-ink-900/80 backdrop-blur p-3 shadow-2xl shadow-brand-900/30">
      <div className="rounded-[28px] bg-ink-950 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-2.5 text-[10px] text-ink-400 font-mono">
          <span>9:41</span>
          <span className="h-1.5 w-16 rounded-full bg-ink-700" />
          <span>· · ·</span>
        </div>
        {title && (
          <div className="px-5 pb-2 text-xs uppercase tracking-widest text-ink-500">{title}</div>
        )}
        <div className="px-4 pb-5">{children}</div>
      </div>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-ink-700 disabled:text-ink-500 disabled:cursor-not-allowed transition-colors px-5 py-3 font-medium text-white ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10 transition-colors px-5 py-3 font-medium text-white ${className}`}
    >
      {children}
    </button>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-widest text-brand-300 mb-3">{eyebrow}</p>
      <h2 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight">{title}</h2>
      {body && <p className="mt-3 text-ink-300 leading-relaxed max-w-2xl">{body}</p>}
    </div>
  );
}
